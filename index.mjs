
import { resolve, basename } from 'path';
import { mkdirSync, copyFileSync } from 'fs';
import { read } from './lib/utils/reader.mjs';
import { sort } from './lib/utils/sorter.mjs';
import { progress } from './lib/utils/progress.mjs';

const options = {
  group: 'month', // 'none' | 'month',
  sort: 'asc', // 'asc' | 'dsc',
  mode: 'copy',  // copy | move
};

const source = process.argv[2];
const target = process.argv[3]

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

//   const label = await renderLabel('PHOTOCLASS', { font: 'Speed' });
