const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CAT_API_URL': JSON.stringify(process.env.CAT_API_URL),
      'process.env.DOG_API_URL': JSON.stringify(process.env.DOG_API_URL),
      'process.env.CAT_API_KEY': JSON.stringify(process.env.CAT_API_KEY),
      'process.env.CAT_FAVOURITES_URL': JSON.stringify(process.env.CAT_FAVOURITES_URL),
      'process.env.DOG_API_KEY': JSON.stringify(process.env.DOG_API_KEY),
      'process.env.DOG_FAVOURITES_URL': JSON.stringify(process.env.DOG_FAVOURITES_URL),
    }),
  ],
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
};
