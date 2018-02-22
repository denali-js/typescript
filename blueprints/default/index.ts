import { unlinkSync, renameSync } from 'fs';
import * as glob from 'glob';
import { Blueprint, ui } from '@denali-js/cli';
import * as createDebug from 'debug';

const debug = createDebug('@denali-js/typescript');

export default class DenaliTypescriptBlueprint extends Blueprint {
  static blueprintName = 'default';
  static description = 'Installs denali-typescript';

  async postInstall() {
    debug('removing babel & eslint specific files');
    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc'
    ].forEach((filepath) => {
      try {
        unlinkSync(filepath);
      } catch (e) {
        // ignore if the file doesn't exist
      }
    });
    debug('renaming .js -> .ts');
    glob.sync('{app,config,test}/**/*.js').forEach((filepath) => {
      renameSync(filepath, filepath.replace(/\.js$/, '.ts'));
    });
    ui.info('Removing babel and eslint specific packages ...');
    this.uninstallPackages([
      'babel-eslint',
      'babel-preset-env',
      'babel-plugin-transform-class-properties',
      'denali-babel',
      'denali-eslint'
    ]);
    ui.info('Installing typescript and tslint ...');
    this.installPackages([ 'typescript', 'tslint' ]);
  }
}
