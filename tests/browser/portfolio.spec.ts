import { test, expect } from '@playwright/test';

test('legal pages and favicon are reachable from the portfolio', async ({ page, request }) => {
  await page.goto('/');
  const privacy = page.getByRole('link', { name: 'Privacy policy' });
  const terms = page.getByRole('link', { name: 'Terms and conditions' });
  await expect(privacy).toHaveAttribute('href', '/privacy.html');
  await expect(terms).toHaveAttribute('href', '/terms.html');
  for (const path of ['/privacy.html', '/terms.html', '/favicon.svg']) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
  }
});

test('missing model cannot block navigation, project data, or resume access', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => { errors.push(error.message); console.log(error.stack); });
  await page.route('**/models/character.enc', route => route.fulfill({ status: 404, body: 'Not found' }));
  await page.goto('/');
  await expect(page.locator('.resume-button')).toBeAttached({ timeout: 15000 });
  await expect(page.locator('.loading-screen')).toHaveCount(0, { timeout: 25000 });
  await expect(page.locator('.resume-button')).toHaveAttribute('href', '/documents/vishal-suhas-cv.pdf');
  const project = page.getByRole('button', { name: 'Open engineering details for NovaIsland', exact: true });
  await project.focus();
  await project.press('Enter');
  await expect(page.getByRole('tab', { name: /Operations|Quality|AI Assistant/ })).toHaveCount(0);
  await page.getByRole('tab', { name: /Architecture/ }).click();
  await expect(page.locator('#architecture-section')).toBeVisible();
  await expect(page.getByRole('tab', { name: /Architecture/ })).toHaveAttribute('aria-selected', 'true');
  expect(errors).toEqual([]);
});

test('normal model load completes without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => { errors.push(error.message); console.log(error.stack); });
  await page.goto('/');
  await expect(page.locator('.resume-button')).toBeAttached({ timeout: 15000 });
  await expect(page.locator('.loading-screen')).toHaveCount(0, { timeout: 30000 });
  await expect(page.locator('.character-model canvas')).toHaveAttribute('data-model-status', 'ready', { timeout: 25000 });
  await page.setViewportSize({ width: 800, height: 900 });
  await expect(page.getByRole('button', { name: /View 3D character/ })).toBeVisible();
  await expect(page.locator('.character-model canvas')).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('.character-model canvas')).toHaveAttribute('data-model-status', 'ready', { timeout: 25000 });
  expect(errors).toEqual([]);
});


test('unavailable WebGL still exposes the portfolio', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type.startsWith('webgl')) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.locator('.resume-button')).toBeAttached();
  await expect(page.locator('.loading-screen')).toHaveCount(0, { timeout: 25000 });
  await expect(page.getByRole('button', { name: 'Open Recruiter Mode Side Panel' })).toBeVisible();
});

test('a failed character module does not blank the page', async ({ page }) => {
  await page.route('**/assets/Character-*.js', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.resume-button')).toBeAttached({ timeout: 15000 });
  await expect(page.locator('.loading-screen')).toHaveCount(0, { timeout: 25000 });
  await expect(page.getByRole('button', { name: 'Open Recruiter Mode Side Panel' })).toBeVisible();
});

test('desktop project browsing leaves the skill deck below every project card', async ({ page }) => {
  await page.setViewportSize({ width: 1710, height: 990 });
  await page.route('**/models/character.enc', route => route.abort());
  await page.goto('/');
  const track = page.locator('#work .work-flex');
  await page.locator('.loading-screen').waitFor({ state: 'hidden' });
  await page.locator('.header a[href="#work"]').click();
  await page.getByRole('button', { name: 'Scroll projects right' }).click();
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await page.evaluate(() => window.scrollBy(0, document.querySelector('#engineering-title')!.getBoundingClientRect().top - innerHeight / 2));
  await expect(page.locator('#engineering-title')).toBeInViewport();
  const gap = await page.evaluate(() => {
    const deckTop = document.querySelector('#techstack')!.getBoundingClientRect().top;
    const bottoms = Array.from(document.querySelectorAll('.work-box'), card => card.getBoundingClientRect().bottom);
    return deckTop - Math.max(...bottoms);
  });
  expect(gap).toBeGreaterThanOrEqual(-1);
});
