import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 844]) {
  test(`mobile ${width}px opens without 3D and supports normal navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const heavyRequests: string[] = [];
    const errors: string[] = [];
    page.on('request', request => { if (/\/models\/|\/assets\/(Character|three)-/.test(request.url())) heavyRequests.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('button', { name: /View 3D character/ })).toBeVisible();
    await expect(page.locator('.loading-screen')).toHaveCount(0);
    await expect(page.locator('canvas')).toHaveCount(0);
    await expect(page.locator('.navbar-connect')).toBeHidden();
    expect(heavyRequests).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    for (const card of await page.locator('.work-box').all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeInViewport();
      const box = await card.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    await page.getByRole('button', { name: 'Open engineering details for Personal Portfolio', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('tab', { name: /Operations/ }).click();
    await expect(page.locator('#pipeline')).toBeVisible();
    await page.getByRole('button', { name: 'Close Project Detail Panel' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeInViewport();
    expect(errors).toEqual([]);
  });
}

test('optional 3D stays in the hero and failure never blocks mobile content', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/models/character.enc', route => route.fulfill({ status: 404, body: 'Missing model' }));
  await page.goto('/');
  await page.getByRole('button', { name: /View 3D character/ }).click();
  await expect(page.locator('#landingDiv .character-container')).toBeVisible();
  await expect(page.getByRole('status')).toContainText(/could not load|unavailable/);
  await expect(page.locator('.loading-screen')).toHaveCount(0);
  await page.getByRole('button', { name: 'Close 3D character' }).click();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('reduced motion also avoids automatic 3D', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /View 3D character/ })).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
});


test('requested 3D renders inside the mobile hero', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'GPU rendering verified in Chromium; WebKit exercises the failure fallback.');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /View 3D character/ }).click();
  const canvas = page.locator('#landingDiv canvas');
  await expect(canvas).toHaveAttribute('data-model-status', 'ready', { timeout: 25000 });
  const hero = await page.locator('#landingDiv').boundingBox();
  const model = await canvas.boundingBox();
  expect(model!.y).toBeGreaterThanOrEqual(hero!.y);
  expect(model!.y + model!.height).toBeLessThanOrEqual(hero!.y + hero!.height + 1);
  expect(model!.width).toBeLessThanOrEqual(390);
  await expect(page.locator('.loading-screen')).toHaveCount(0);
});

test('NovaIsland architecture labels fit their nodes and the last step is reachable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const card = page.getByRole('button', { name: 'Open engineering details for NovaIsland', exact: true });
  await card.focus();
  await card.press('Enter');
  await page.getByRole('tab', { name: /Architecture/ }).click();
  const diagram = page.locator('.architecture-visualizer');
  for (const view of ['flow', 'components', 'pipeline']) {
    await diagram.getByRole('button', { name: `Switch to ${view} view` }).click();
    const nodes = diagram.locator('.svg-node-group');
    await expect(nodes).toHaveCount(10);
    const fits = await nodes.evaluateAll(groups => groups.every((group, index) => {
      const box = group.querySelector('rect')!.getBoundingClientRect();
      const label = group.querySelector('text')!.getBoundingClientRect();
      const previous = groups[index - 1]?.getBoundingClientRect();
      return label.left >= box.left && label.right <= box.right && (!previous || previous.right < box.left);
    }));
    expect(fits).toBe(true);
    await nodes.last().click();
    await expect(nodes.last()).toBeInViewport();
    await expect(diagram.locator('.selected-node-detail-card h5')).toHaveText((await nodes.last().locator('text').textContent())!);
  }
});

test('engineering slides stay in the chosen category across navigation methods', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const deck = page.locator('#techstack');
  const skill = deck.getByRole('combobox', { name: 'Jump to skill' });
  await deck.getByRole('combobox', { name: 'Category', exact: true }).selectOption('Backend Engineering');
  await skill.selectOption('python');
  await deck.getByRole('button', { name: 'Next skill' }).click();
  await expect(skill).not.toHaveValue('python');
  await page.keyboard.press('ArrowLeft');
  await expect(skill).toHaveValue('python');
  await deck.getByRole('button', { name: 'Inspect related skill Node.js' }).click();
  await expect(deck.getByRole('heading', { name: 'Node.js' })).toBeVisible();
  if (isMobile) {
    const slide = deck.locator('article');
    await slide.dispatchEvent('touchstart', { touches: [{ clientX: 200, clientY: 120 }] });
    await slide.dispatchEvent('touchend', { changedTouches: [{ clientX: 80, clientY: 122 }] });
    await expect(skill).not.toHaveValue('nodejs');
  }
  expect(await deck.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
});
