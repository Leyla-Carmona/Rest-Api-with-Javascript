const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config(); 

module.exports = {
  mode: "development", 
  entry: "./src/main.js", 
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CAT_API_URL': JSON.stringify(process.env.CAT_API_URL),
      'process.env.DOG_API_URL': JSON.stringify(process.env.DOG_API_URL),
      'process.env.CAT_API_KEY': JSON.stringify(process.env.CAT_API_KEY),
      'process.env.DOG_API_KEY': JSON.stringify(process.env.DOG_API_KEY),
      'process.env.CAT_FAVOURITES_URL': JSON.stringify(process.env.CAT_FAVOURITES_URL),
      'process.env.DOG_FAVOURITES_URL': JSON.stringify(process.env.DOG_FAVOURITES_URL),
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
  },
};
