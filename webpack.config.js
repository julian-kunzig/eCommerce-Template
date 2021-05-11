const path = require('path');

let sassImplementation;
try {
  // tslint:disable-next-line:no-implicit-dependencies
  sassImplementation = require('node-sass');
} catch {
  sassImplementation = require('sass');
}

module.exports = {
  // Fix for: https://github.com/recharts/recharts/issues/1463
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              syntax: 'postcss-scss',
              plugins: () => [
                require('tailwindcss')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sassImplementation,
              sourceMap: false,
              sassOptions: {
                precision: 8
              }
            }
          }
        ]
      }
    ]
  }
};
