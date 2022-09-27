var Jimp = require('jimp');

// open a file called "lenna.png"
Jimp.read('./images/sphere_geo.png', (err, lenna) => {
  if (err) throw err;
  lenna
    .invert() // invert the image
    .write('./images/invert_spheregeo.png'); // save
});