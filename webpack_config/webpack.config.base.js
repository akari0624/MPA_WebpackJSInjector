'use strict'
 
const path = require('path');

const jspPageMapArr = require('../page_config').jspPageMap;



// webpack2的 entry的基準很像是看它指令在哪個資料夾底下下的  跟4不一樣
const _returnMultipleJSEntryPoint = (pJspPageMapArr, isWithPolyfill) => { 
  
  let entryPointArr = []

  
  if(isWithPolyfill) {
    entryPointArr.push('@babel/polyfill')
  }

  pJspPageMapArr.forEach( p => {entryPointArr.push( `./src/${p.js}`)})

  return entryPointArr

}

module.exports = {

  ENTRY_POINT: _returnMultipleJSEntryPoint(jspPageMapArr, true),
  JS_TRANSPILE_LOADER_ARR_OPTIONS:{
    ONLY_TS_LOADER:[{loader:'ts-loader'}],
    TS_THEN_BABEL:[{loader:'babel-loader'},{loader:'ts-loader'}],
    ONLY_TS_LOADER_FAST_BUILD: [{loader:'ts-loader', options:{transpileOnly: true}}], // IMPORTANT! use transpileOnly mode to speed-up compilation},
    TS_THEN_BABEL_FAST_BUILD:[{loader:'babel-loader'},{loader:'ts-loader', options:{transpileOnly: true}}],
  },

  CSS_LOADER_CONFIG: {
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }
    ],
    test: /\.(css|less)$/

  },

  RESOLVE_SETTING_CONFIG: {
    modules: [
      path.join(__dirname, '../', 'node_modules'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },

  ENFORCE_SOURCE_MAP_LOADER: {
    enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' 
  },

  NODE_ENV_Keywords: {

    TRANSPILE_WITH_BABEL: 'withBabel'

  }

}

