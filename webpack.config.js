const HtmlWebpackPlug = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const HtmlPlug = new HtmlWebpackPlug({
  template: './src/index.html',
  filename: './index.html'
})
const isProd = process.env.NODE_ENV === 'production'

const targetEnv = process.env.TARGET_ENV

const cssPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: '[name].css',
  chunkFilename: '[name].css',
})

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // '@babel/polyfill',
    // 'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            // test: /\.(ttf|otf|eot|woff(2)?)?$/,
            test: [/\.ttf$/, /\.otf$/, /\.woff$/, /\.eot$/],
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
          {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {
              name: 'static/media/image/svg/[name].[ext]',
            },
          },
          {
            test: [/\.scss$/, /\.css$/],
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  //   modules: true,
                  //   importLoaders: 1,
                  //   localIdentName: '[name]_[local]_[hash:8]',

                },
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },

        ]
      }

    ]
  },
  plugins: [
    HtmlPlug
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  }

}
