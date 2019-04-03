'use strict';

const path = require('path');
const webpack = require('webpack');  //to get some module already exits in webpack
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WEBPACK_Config_Base = require('./webpack.config.base');

const pagePaths = require('../page_config').jspPageMap;
const jspPagePaths = pagePaths.map(o => o.jsp);
const MULTIPLE_HTMLPluginInstanceInArr = require('./utils').generateMultipleWebpackHTMLPluginInstanceInOneArr(jspPagePaths)




let __LOADERS_ARR;
if(process.env.NODE_ENV === WEBPACK_Config_Base.NODE_ENV_Keywords.TRANSPILE_WITH_BABEL){

  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL

}else{
  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER
}

module.exports = {
  entry: WEBPACK_Config_Base.ENTRY_POINT,
  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '/', // your webApp name(if has) on server put here.   eg:/MyWebApp
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: __LOADERS_ARR,
        exclude: /node_modules/
      },
      WEBPACK_Config_Base.ENFORCE_SOURCE_MAP_LOADER,
      WEBPACK_Config_Base.CSS_LOADER_CONFIG, 
      {
        use: 'url-loader?limit=8192',
        test: /\.(svg)$/
      }, {
        test: /\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '/' // your webApp name(if has) on server put here.   eg:/MyWebApp
            }
          }
        ]
      },
      // 處理JSP的那些特殊語法  如<%= ... %>
      { test: /\.jsp$/, loader: 'raw-loader' }
    ]
  },
  plugins: [
    ...MULTIPLE_HTMLPluginInstanceInArr,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor']
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true
        }
    })
  ],
  resolve: WEBPACK_Config_Base.RESOLVE_SETTING_CONFIG,

}
