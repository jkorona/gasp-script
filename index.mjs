#!/usr/bin/env node
import { promisify } from 'util';
import figlet from 'figlet';
import { program, Option } from 'commander/esm.mjs';
import { read } from './lib/utils/reader.mjs';
import { sort } from './lib/utils/sorter.mjs';
import { write } from './lib/utils/writer.mjs';

const log = (...messages) => options.verbose && console.log(...messages);
const logo = await promisify(figlet)('GASP', { font: 'Speed' });

program
  .version('1.0.1')
  .addHelpText('before', logo)
  .argument('<source>', 'path to directory with photos to group & sort')
  .argument('<target>', 'path to directory where grouped & sorted photos should be placed afterwards')
  .addOption(new Option('-s, --sort <dir>', 'sorting direction').choices(['asc', 'dsc']).default('asc', 'asc'))
  .addOption(new Option('-v, --verbose', 'enables additional logging dor debugging'))
  .addOption(new Option('-g, --groupby <level>', 'group photos by year, month, day, none').choices(['year', 'month', 'day', 'none']).default('none', 'none'));

program.parse(process.argv);

const options = program.opts();
const [source, target] = program.args;

log('Run with options:', options);

const files = await read(source);
log(`Found ${files.length} files in source directory ${source}.`);

const sorted = sort(files, options);
log('Sort tree:', JSON.stringify(sorted, '', 1));

write(sorted, target, files.length, options);
console.log('Done!\n');
