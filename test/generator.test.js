import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
test('generates a draft from a minimal FiveM resource', async () => {
  const root = await mkdtemp(join(tmpdir(), 'peak-readme-'));
  await mkdir(join(root, 'shared'));
  await writeFile(join(root, 'fxmanifest.lua'), "fx_version 'cerulean'\ngame 'gta5'\ndependency 'ox_lib'\ndependencies { 'oxmysql', 'qbx_core' }\n");
  await writeFile(join(root, 'shared/config.lua'), "Config = {}\nRegisterCommand('hello', function() end)\nexports('GetValue', function() end)\n");
  const out = join(root, 'README.md');
  await run(process.execPath, ['bin/peak-readme.js', '--resource', root, '--out', out], { cwd: new URL('..', import.meta.url) });
  const result = await readFile(out, 'utf8');
  assert.match(result, /ox_lib/); assert.match(result, /oxmysql/); assert.match(result, /qbx_core/); assert.match(result, /hello/); assert.match(result, /GetValue/);
});
