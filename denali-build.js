const path = require('path');
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
    let transpiledTS = new Typescript(tree, {
      tsconfig: require(path.join(dir, 'tsconfig.json')),
      annotation: 'compile typescript'
    });
    let withoutTS = new Funnel(tree, {
      exclude: [ '**/*.ts' ]
    });
    return new MergeTree([ withoutTS, transpiledTS ], { overwrite: true, annotation: 'merge typescript output' });
  }

};
