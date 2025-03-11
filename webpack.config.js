const path = require('path');
const webpack = require('webpack');
require('dotenv').config();  // Carga el archivo .env (si estás usándolo)

module.exports = {
  entry: './src/index.js',  // Cambia esto según la ubicación de tu archivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
