import { resolve, extname } from 'path';
import { mkdirSync, copyFileSync } from 'fs';
import { progress } from './progress.mjs';
import { flatten } from './flatten.mjs';

function adjustModel(model, groupBy) {
  switch (groupBy) {
    case 'year':
      return Object.keys(model).reduce((acc, year) => {
        acc[year] = flatten(model[year]);
        return acc;
      }, {});
    case 'month':
      return Object.entries(model).reduce((acc, [year, yearModel]) => {
        acc[year] = Object.keys(yearModel).reduce((acc, month) => {
          acc[month] = flatten(yearModel[month]);
          return acc;
        }, {});
        return acc;
      }, {});
    case 'day':
      return model;
    case 'none':
      return flatten(model);
  }
}

function build(model, target, update) {
  if (Array.isArray(model)) {
    model.forEach(({ name: oldPath }, index) => {
      const newPath = resolve(target, index + 1 + extname(oldPath).toLowerCase());
      copyFileSync(oldPath, newPath);
      update();
    });
  } else {
    Object.keys(model).forEach((dir) => {
      const dirPath = resolve(target, dir);
      mkdirSync(dirPath, { recursive: true });
      build(model[dir], dirPath, update);
    });
  }
}

export function write(model, target, size, options) {
  const adjustedModel = adjustModel(model, options.groupby);
  const update = progress(size, options.verbose);

  build(adjustedModel, target, update);
}
