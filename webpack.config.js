const path = require('path');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.obj$/,
        loader: 'webpack-obj-loader'
      },
      {
        test: /\.mtl$/,
        loader: 'mtl-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css'],
    plugins: [
     new DirectoryNamedWebpackPlugin(true)
    ]
  },
};
