import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const port = '5294';
let server;
before(async () => {
  server = spawn(process.execPath, ['server.js'], { env: { ...process.env, PORT: port }, stdio: ['ignore', 'pipe', 'pipe'] });
  await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(([code]) => { throw new Error(`Server exited: ${code}`); }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Server startup timed out')), 5000).unref()),
  ]);
});
after(async () => { if (server && server.exitCode === null) { server.kill('SIGTERM'); await once(server, 'exit'); } });
const request = (path, options) => fetch(`http://127.0.0.1:${port}${path}`, options);
test('serves every page directly on the configured PORT', async () => {
  for (const route of ['/', '/car-hire', '/courier', '/courier/', '/shuttles-tours', '/about']) {
    const response = await request(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /HookedUp/);
  }
});
test('serves built JS with correct MIME type and caching', async () => {
  const html = await (await request('/')).text();
  const asset = html.match(/src="([^"]+\.js)"/)[1];
  const response = await request(asset);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /javascript/);
  assert.match(response.headers.get('cache-control'), /immutable/);
});
test('handles HEAD, missing assets, private paths and unsupported methods', async () => {
  const head = await request('/', { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  for (const path of ['/assets/missing.js', '/.env', '/%2e%2e%2fpackage.json']) assert.equal((await request(path)).status, 404);
  assert.equal((await request('/%ZZ')).status, 400);
  assert.equal((await request('/', { method: 'POST' })).status, 405);
});
