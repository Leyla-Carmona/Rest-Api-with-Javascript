const path = require('path');
const webpack = require('webpack');
require('dotenv').config();  

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),  
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),  // Inyecta las variables de entorno
    }),
  ],
};
