
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
Object.keys(sorted).forEach((year) => {
  const yearDir = resolve(target, year);
  mkdirSync(yearDir, { recursive: true });

  Object.keys(sorted[year]).forEach((month) => {
    const monthDir = resolve(yearDir, month);
    mkdirSync(monthDir, { recursive: true });

    Object.keys(sorted[year][month]).forEach((day) => {
      const dayDir = resolve(monthDir, day);
      mkdirSync(dayDir, { recursive: true });

      sorted[year][month][day].forEach(({ name: oldPath }) => {
        const newPath = resolve(dayDir, basename(oldPath));
        copyFileSync(oldPath, newPath);
        update();
      });
    });

  });
});

//   const label = await renderLabel('PHOTOCLASS', { font: 'Speed' });
