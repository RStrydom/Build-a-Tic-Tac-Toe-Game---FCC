var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

extractPlugin = new ExtractTextPlugin({
  filename: 'style.css'
})

module.exports = {
  entry: './app/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: 'es2015'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        }]
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  plugins: [
    extractPlugin
  ]

};
