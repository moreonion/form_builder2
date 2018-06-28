const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

const banner = `
mo-fb2 v${pkg.version}
(c) 2018 ${pkg.author}
License: ${pkg.license}
`

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {importLoaders: 2}},
          {loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {importLoaders: 2}},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'mo-vue-dnd/mo-vue-dnd.css': 'mo-vue-dnd/dist/mo-vue-dnd.css'
    }
  },
  externals: {
    'axios': 'campaignion_vue.axios',
    'element-ui': 'campaignion_vue.element',
    'element-ui/lib/locale': 'campaignion_vue.elementLocale',
    'element-ui/lib/transitions/collapse-transition': 'campaignion_vue.element',
    'vue': 'campaignion_vue.Vue',
    'vuex': 'campaignion_vue.Vuex'
  },
  plugins: [
    // element-ui: replace default Chinese strings with English strings.
    new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en'),
    new webpack.BannerPlugin(banner)
  ],
  devServer: {
    contentBase: [
      __dirname,
      // For development, the `mfb-plugins` and `mfb-plugin-commons` directories
      // have to be in the same directory as the form builder app.
      path.join(__dirname, '..', 'mfb-plugins', 'lib'),
      path.join(__dirname, '..', 'mfb-plugin-commons', 'lib'),
      '/home/maya/mo/camp/overrides/campaignion/campaignion_vue/js'
    ],
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: false
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
