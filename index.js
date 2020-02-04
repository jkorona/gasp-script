const exif = require('jpeg-exif');

const path = __dirname + '/test/assets/1.jpg';

exif.parse(path, (err, data) => {
  if (err) {
      console.log(err);
  } else {
      console.log(data);
  }
});
