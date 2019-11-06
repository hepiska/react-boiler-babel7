const HtmlWebpackPlug = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackCompretion = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')



const isProd = process.env.NODE_ENV === 'production'
const targetEnv = process.env.TARGET_ENV

const HtmlPlug = new HtmlWebpackPlug({
  template: './src/index.html',
  filename: './index.html'
})
// const swPlugin = new ServiceWorkerWebpackPlugin({
//   entry: path.join(__dirname, 'public/OneSignalSDKWorker.js'),
// })

// copy src to dist
const copyPlugin = new CopyWebpackPlugin([{ from: 'public' }])

// gzip
const gziPlugin = new WebpackCompretion({
  filename(asset) {
    const newAsset = asset.file.replace('.gz', '')
    return newAsset
  },
  algorithm: 'gzip',
  test: /\.(js)$/,
  deleteOriginalAssets: false,
})

const uglifyjs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true, // set to true if you want JS source maps
})

const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({})

const cssPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: '[name].css',
  chunkFilename: '[name].css',
})

const constant =
  targetEnv === 'prod'
    ? new webpack.DefinePlugin({
      CONF_BASE_URL: JSON.stringify('https://api.pomona.id/'),
      CONF_POMONA_WEB: JSON.stringify('https://web.pomona.id/'),
      CONF_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })
    : new webpack.DefinePlugin({
      // CONF_BASE_URL: JSON.stringify('https://api.pomona.id/'), 
      // CONF_BASE_URL: JSON.stringify('https://api.stage.pomona.id/'),
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
  plugins: isProd
    ? [
      HtmlPlug,
      constant,
      cssPlugin,
      // uglifyjs,
      new webpack.optimize.AggressiveMergingPlugin(),
      gziPlugin,
      copyPlugin,
      // new BundleAnalyzerPlugin(),
      // manifestPlugin,
      // SWplugins,
    ] : [
      constant,
      HtmlPlug
    ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', ".css", '.gql'],
  }

}
