const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: false,
  allChunks: true,
});
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      production ? 'production' : 'development'
    )
  }),
  extractSass,
];

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
} else {
  plugins.push(
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 2001,
      proxy: 'http://localhost:2000/',
    })
  );
}

module.exports = {
  entry: {
    'app': './client/app.js'
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      './',
      './node_modules'
    ],
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            'es2015',
            'stage-1'
          ]
        }
      },
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              './',
              './node_modules/materialize-css/sass',
              './node_modules/vulcanval/src/scss'
            ],
            sourceMap: !production,
            outputStyle: production ? 'compressed' : 'nested',
          },
        }],
        fallback: 'style-loader'
      })
    }],
  },
  devtool: production ? false : 'inline-source-map',
  plugins,
};
