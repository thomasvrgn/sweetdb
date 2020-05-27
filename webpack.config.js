const path = require('path')

module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/build/main.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sweet.js'
  }
}