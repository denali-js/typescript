import { unlinkSync, renameSync } from 'fs';
import * as glob from 'glob';
import { Blueprint } from 'denali-cli';
import * as createDebug from 'debug';

const debug = createDebug('denali-typescript');

export default class DenaliTypescriptBlueprint extends Blueprint {
  static blueprintName = 'denali-typescript';
  static description = 'Installs denali-typescript';

  async postInstall() {
    debug('removing babel & eslint specific files');
    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      'test/.eslintrc'
    ].forEach((filepath) => {
      unlinkSync(filepath);
    });
    debug('renaming .js -> .ts');
    glob.sync('{app,config,test}/**/*.js').forEach((filepath) => {
      renameSync(filepath, filepath.replace(/\.js$/, '.ts'));
    });
    debug('uninstalling babel and eslint specific packages');
    this.uninstallPackages([
      'babel-eslint',
      'babel-plugin-syntax-async-functions',
      'babel-plugin-syntax-trailing-function-commas',
      'babel-plugin-transform-async-to-generator',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-es2015-destructuring',
      'babel-plugin-transform-es2015-modules-commonjs',
      'babel-plugin-transform-es2015-shorthand-properties',
      'babel-plugin-transform-es2015-spread',
      'babel-plugin-transform-es2015-template-literals',
      'babel-plugin-transform-exponentiation-operator',
      'babel-plugin-transform-regenerator',
      'babel-plugin-transform-runtime',
      'denali-babel',
      'denali-eslint',
      'eslint-config-denali'
    ]);
    debug('installing typescript and tslint');
    this.installPackages([ 'typescript', 'tslint' ]);
  }
}
