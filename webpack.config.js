const path = require('path');

const config = {
  target: 'node',
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'networkteamEel',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.[cm]?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = config;
