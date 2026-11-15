import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, existsSync } from 'node:fs';
import { projectData } from '../src/data/projectData';
import { useProjectData } from '../src/hooks/useProjectData';
import { ArchitectureWorkspace } from '../src/components/workspace/ArchitectureWorkspace';
import { EngineeringWorkspace } from '../src/components/workspace/EngineeringWorkspace';
import { OperationsWorkspace } from '../src/components/workspace/OperationsWorkspace';
import { QualityWorkspace } from '../src/components/workspace/QualityWorkspace';
import { createElement } from 'react';
import { decryptFile } from '../src/components/Character/utils/decrypt';

for (const name of Object.keys(projectData)) {
  test(`${name}: all datasets connect and citations target rendered sections`, () => {
    const d = useProjectData(name);
    for (const [key, value] of Object.entries(d)) assert.ok(value, `${key} missing`);
    const props = { ...d, expandedSections: { decisions: true, testing: true, journal: true, notebook: true, performance: true, observability: true, pipeline: true }, toggleSection: () => {}, highlightedSectionId: null };
    const pages = {
      architecture: renderToStaticMarkup(createElement(ArchitectureWorkspace, props)),
      engineering: renderToStaticMarkup(createElement(EngineeringWorkspace, props)),
      operations: renderToStaticMarkup(createElement(OperationsWorkspace, props)),
      qa: renderToStaticMarkup(createElement(QualityWorkspace, props)),
    };
    for (const doc of d.assistant!.documents) {
      for (const citation of doc.citations) {
        assert.ok(pages[citation.targetTab as keyof typeof pages]?.includes(`id="${citation.targetSectionId}"`), `${doc.title}: missing ${citation.targetTab}/${citation.targetSectionId}`);
      }
    }
  });
}

test('model decrypts and required assets exist', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response(readFileSync('public/models/character.enc'));
  try {
    const data = await decryptFile('/models/character.enc', 'MyCharacter12');
    assert.equal(Buffer.from(data).subarray(0, 4).toString(), 'glTF');
  } finally { globalThis.fetch = original; }
  for (const file of ['favicon.svg', 'models/char_enviorment.hdr', 'draco/draco_wasm_wrapper.js', 'draco/draco_decoder.wasm', 'draco/draco_decoder.js']) assert.ok(existsSync(`public/${file}`), file);
});

test('HTTP errors fail before model decryption', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response('not found', { status: 404 });
  try { await assert.rejects(decryptFile('/missing.enc', 'MyCharacter12'), /Model request failed: 404/); }
  finally { globalThis.fetch = original; }
});
