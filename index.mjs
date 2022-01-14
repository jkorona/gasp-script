
import { read } from './lib/utils/reader.mjs';
import { sort } from './lib/utils/sorter.mjs';

const options = {
  group: 'month', // 'none' | 'month',
  sort: 'asc', // 'asc' | 'dsc' 
};

const files = await read(process.argv[2]);
const sorted = sort(files, options);

console.log(JSON.stringify(sorted, null, 1));


// const fs = require('fs');
// const util = require('util');
// const exif = require('jpeg-exif');
// const figlet = require('figlet');
// const clui = require('clui');
// const clear = require('clear');

// const { default: scan } = require('./lib/utils/scanner.mjs');

// const parseExif = util.promisify(exif.parse);
// const renderLabel = util.promisify(figlet);

// const progressBar = new clui.Progress(75);

// function renderUI(label, progress, complete) {
//   // clear();
//   // console.log(label);
//   // console.log(progressBar.update(progress, complete));
// }

// async function main(directory, target) {
//   const label = await renderLabel('PHOTOCLASS', { font: 'Speed' });

//   const files = fs.readdirSync(__dirname + directory).filter(file => /\.(jpg|jpeg|tiff)$/.test(file));
//   const filesLenght = files.length;

//   renderUI(label, 0, filesLenght)
//   let progress = 1;

//   console.log(filesLenght)

//   const metadataList = await Promise.all(files.map(file => parseExif(__dirname + directory + '/' + file)));
//   metadataList
//     .map(metadata => console.log(metadata.SubExif.DateTimeOriginal))
//     .forEach(() => renderUI(label, progress++, filesLenght));
// }

// if (process.argv.length !== 3) {
//   console.log('Please provide directory to scan in script argument, like: \n\n> photoclass ./my/photos\n');
// } else {
//   main(process.argv[2]);
// }
