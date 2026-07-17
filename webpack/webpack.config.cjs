const path = require('path');

function generateConfig(name) {
  var config = {
    entry: './dist/cjs/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: name,
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
    mode: 'production',

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
      alias: {
        process: "process/browser",
      },
      fallback: {
        // Node.js core modules not available in browsers
        // The REST client's https.Agent (for keepAlive) is Node.js-only and won't work in browsers
        "http": false,
        "https": false,
      }
    },

    module: {
      rules: [
        // Code is already transpiled from TypeScript, no additional loaders needed
      ],
    },
  };

  return config;
}

module.exports = generateConfig('bitgetapi');
