const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
  client: path.resolve(__dirname, 'client'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = env => {
  return {
    entry: {
      app: path.resolve(PATHS.client, 'app', 'root.module.js')
    },
    output: {
      path: PATHS.dist,
      filename: `[name].js`
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 8080,
      https: false 
    },
    resolve: {
      modules: [path.resolve(__dirname, 'client'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [`ngtemplate-loader`, `html-loader`]
        },
        {
          test: /(\.css|\.scss)$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: `css-loader`, options: { sourceMap: true } },
              { loader: `sass-loader`, options: { sourceMap: true } },
            ]
          })
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
          use: ExtractTextPlugin.extract({
            use: [
              { loader: `url-loader?limit=1000`, options: { sourceMap: true } }
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: `/node_modules/`,
          use: [`ng-annotate-loader`, `babel-loader`]
        },
      ]
    },
    plugins: [
      new CopyWebpackPlugin([ 
        { 
          from: path.resolve( PATHS.client, 'index.html' ) 
        },
        { 
          context: path.resolve( PATHS.client, `img` ),
          from: `**/*`,
          to: path.resolve(PATHS.dist, `img`)
        }
      ]),
      new ExtractTextPlugin(`[name].css`)
    ]
  };
}


