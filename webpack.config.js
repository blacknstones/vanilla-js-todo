const path = require('path');
module.exports = {
  entry: {
    todo: './src/js/todo.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  devServer: {
    contentBase: './public',
  },
};
