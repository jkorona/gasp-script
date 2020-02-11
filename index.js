const fs = require('fs');
const util = require('util');
const exif = require('jpeg-exif');
const figlet = require('figlet');
const clui = require('clui');
const clear = require('clear');

const parseExif = util.promisify(exif.parse);
const renderLabel = util.promisify(figlet);

let progress = 1;
const progressBar = new clui.Progress(75);

function renderUI(label, progress, complete) {
  clear();
  console.log(label);
  console.log(progressBar.update(progress, complete));
}

(async function main() {

  const label = await renderLabel('PHOTOCLASS', { font: 'Speed' });

  const files = fs.readdirSync(__dirname + '/test/assets').filter(file => /\.(jpg|jpeg|tiff)$/.test(file));
  const filesLenght = files.length;

  renderUI(label, 0, filesLenght)

  const metadataList = await Promise.all(files.map(file => parseExif(__dirname + '/test/assets/' + file)));
  metadataList
    .map(metadata => metadata.SubExif.DateTimeOriginal)
    .forEach(() => renderUI(label, progress++, filesLenght));
})();
