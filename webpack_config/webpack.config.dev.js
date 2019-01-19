'use strict';

const path = require('path');
const webpack = require('webpack');
const WEBPACK_Config_Base = require('./webpack.config.base');
const pagePaths = require('../page_config').jspPageMap
const WriteFilePlugin = require('write-file-webpack-plugin')
const jspPagePaths = pagePaths.map(o => o.jsp)

const  templateBuildConfig = require('./utils/templateBuildsConfig')

const {templateBuildedEmitPath, theMPApplicationPort} = templateBuildConfig
const MULTIPLE_HTMLPluginInstanceInArr = require('./utils').generateMultipleWebpackHTMLPluginInstanceInOneArr(jspPagePaths)



let __LOADERS_ARR;
if(process.env.NODE_ENV === WEBPACK_Config_Base.NODE_ENV_Keywords.TRANSPILE_WITH_BABEL){

  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL

}else{
  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER
}



module.exports = {
  entry: WEBPACK_Config_Base.ENTRY_POINT,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../', './'),
    publicPath: '/',     // put the webapp name here
    filename: 'bundle.js'
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
              publicPath: '/'
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
    new webpack.HotModuleReplacementPlugin(),
    // 讓Webpack dev-server真的會在硬碟裡產生檔案，不然Tomcat沒辦法用
    new WriteFilePlugin({
      test: /\.jsp|\.tld|\.xml$/,
    })
  ],
  resolve: WEBPACK_Config_Base.RESOLVE_SETTING_CONFIG,
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../'),
    port: 9999,
    proxy:{
      '/wp_dev':{
        target:`http://127.0.0.1:${theMPApplicationPort}/KCGRP_QRY/${templateBuildedEmitPath}`,
       pathRewrite:{'^/wp_dev':''}
      },
      '/KCGRP_QRY':{
        target:`http://127.0.0.1:${theMPApplicationPort}/KCGRP_QRY/`,
        pathRewrite:{'^/KCGRP_QRY':''},
       }
    }
  }
};
