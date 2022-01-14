#!/usr/bin/env node

import { resolve, basename } from 'path';
import { mkdirSync, copyFileSync } from 'fs';
import { promisify } from 'util';
import figlet from 'figlet';
import { program, Option } from 'commander/esm.mjs';
import { read } from './lib/utils/reader.mjs';
import { sort } from './lib/utils/sorter.mjs';
import { progress } from './lib/utils/progress.mjs';

const logo = await promisify(figlet)('GASP', { font: 'Speed' });
program
  .version('1.0.0')
  .addHelpText('before', logo)
  .argument('<source>', 'path to directory with photos to group & sort')
  .argument('<target>', 'path to directory where grouped & sorted photos should be placed afterwards')
  .addOption(new Option('-s, --sort <dir>', 'sorting direction').choices(['asc', 'dsc']).default('asc', 'asc'))
  .addOption(new Option('-m, --mode <mode>', 'defines how to process files').choices(['copy', 'move']).default('copy', 'copy'));

program.parse(process.argv);

const options = program.opts();
const [source, target] = program.args;

const files = await read(source);
const sorted = sort(files, options);

const update = progress(files.length);

function build(model, target) {
  if (Array.isArray(model)) {
    model.forEach(({ name: oldPath }) => {
      const newPath = resolve(target, basename(oldPath));
      copyFileSync(oldPath, newPath);
      update();
    });
  } else {
    Object.keys(model).forEach((dir) => {
      const dirPath = resolve(target, dir);
      mkdirSync(dirPath, { recursive: true });
      build(model[dir], dirPath);
    });
  }
}

build(sorted, target);

console.log('Done!\n');
