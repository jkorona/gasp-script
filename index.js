const fs = require('fs');
const util = require('util');
const exif = require('jpeg-exif');
const figlet = require('figlet');

const parseExif = util.promisify(exif.parse);
const renderLabel = util.promisify(figlet);

renderLabel('PHOTOCLASS', { font: 'Speed' }).then((data) => console.log(data));

(async function main() {
  const metadataList = await Promise.all(fs.readdirSync(__dirname + '/test/assets')
    .filter(file => /\.(jpg|jpeg|tiff)$/.test(file))
    .map(file => parseExif(__dirname + '/test/assets/' + file))
  );
  metadataList.map(metadata => metadata.SubExif.DateTimeOriginal)
})();
