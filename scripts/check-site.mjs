const base = new URL(process.argv[2] || 'https://vishalsuhas-dev.vercel.app');
if (base.protocol !== 'https:') throw new Error('Use the HTTPS hosting URL');
for (const [path, type] of [['/', 'text/html'], ['/favicon.svg', 'image/svg+xml'], ['/models/character.enc', null], ['/draco/draco_wasm_wrapper.js', 'javascript']]) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  const mime = response.headers.get('content-type') || '';
  if (type && !mime.includes(type)) throw new Error(`${path}: unexpected content type ${mime}`);
  const body = new Uint8Array(await response.arrayBuffer());
  if (path.endsWith('.enc') && (body.length < 1000 || mime.includes('text/html'))) throw new Error('Model asset is missing or invalid');
  console.log(`OK ${path}`);
}
