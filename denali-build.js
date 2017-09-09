const path = require('path');
const chalk = require('chalk');
const { Builder, ui } = require(`denali-cli`);
const Funnel = require('broccoli-funnel');
const MergeTree = require('broccoli-merge-trees');
const { typescript: Typescript } = require('broccoli-typescript-compiler');

module.exports = class DenaliBuilder extends Builder {

  processSelf(tree, dir) {
    return this.transpileTree(tree, dir);
  }

  processParent(tree, dir) {
    return this.transpileTree(tree, dir);
  }

  transpileTree(tree, dir) {
    let tsconfig = require(path.join(dir, 'tsconfig.json'));
    tsconfig.baseUrl = dir;
    let transpiledTS = new Typescript(tree, {
      tsconfig, 
      workingPath: dir,
      annotation: 'compile typescript'
    });
    transpiledTS.setDiagnosticWriter((message) => {
      if (this.parentBuilder) {
        ui.warn(chalk.bold(`==> [${ this.parentBuilder.pkg.name }] Typescript compilation errors: `));
      }
      ui.warn(message);
    });
    let withoutTS = new Funnel(tree, {
      exclude: [ '**/*.ts' ]
    });
    return new MergeTree([ withoutTS, transpiledTS ], { overwrite: true, annotation: 'merge typescript output' });
  }

};
