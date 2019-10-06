const HtmlWebpackPlug = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



const isProd = process.env.NODE_ENV === 'production'
const targetEnv = process.env.TARGET_ENV

const HtmlPlug = new HtmlWebpackPlug({
  template: './src/index.html',
  filename: './index.html'
})


const constant =
  targetEnv === 'prod'
    ? new webpack.DefinePlugin({
      CONF_BASE_URL: JSON.stringify('https://api.pomona.id/'),
      CONF_POMONA_WEB: JSON.stringify('https://web.pomona.id/'),
      CONF_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })
    : new webpack.DefinePlugin({
      CONF_BASE_URL: JSON.stringify('https://api.stage.pomona.id/'),
      CONF_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      CONF_POMONA_WEB: JSON.stringify('https://web.stage.pomona.id/'),
    })

module.exports = {
  entry: [
    'react-hot-loader/patch',
    '@babel/polyfill',
    // 'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  devServer: {
    historyApiFallback: true,
  },
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
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
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

          {
            // test: /\.(ttf|otf|eot|woff(2)?)?$/,
            test: [/\.ttf$/, /\.otf$/, /\.woff$/, /\.eot$/],
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
          {
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: '/static/media/[name].[ext]',
            },
          }
        ]
      }

    ]
  },
  plugins: [
    constant,
    HtmlPlug
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', ".css", '.gql'],
  }

}
