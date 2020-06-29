const path = require('path');

module.exports = {
	entry: './showcase.js',
	mode: 'production',
  output: {
    path: path.resolve(__dirname),
    filename: 'showcase.min.js'
  }
};