import test from 'ava';
import * as fs from 'fs';
import * as path from 'path';
import { CommandAcceptanceTest } from '@denali-js/cli';

test('transpiles source with typescript', async (t) => {
  let build = new CommandAcceptanceTest('build', { name: 'build-command' });
  await build.run({ failOnStderr: true });
  let builtFile = path.join(build.dir, 'dist', 'app', 'application.js');

  t.true(fs.existsSync(builtFile), 'built files were created');
  t.false(fs.readFileSync(builtFile, 'utf-8').includes('import'), 'built files were transpiled');
});

test.failing('checks code with tslint', async (t) => {
  let build = new CommandAcceptanceTest('build', { name: 'build-command' });
  let { output } = await build.run();

  t.true(output.includes('foo'));
});
