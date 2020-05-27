const path = require('path')

module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/build/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sweet.js'
  }
}