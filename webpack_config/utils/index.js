const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const templateBuildedEmitPath = require('./templateBuildsConfig').templateBuildedEmitPath

exports.generateMultipleWebpackHTMLPluginInstanceInOneArr = 
    jspFilePathArr => {
       return jspFilePathArr.map(p => {

       let conf = {
        template: path.join('../', `./${p}`),  // 要inject的檔案在哪裡

        // inject完之後  要把重新產生的檔案放在哪裡, 這路徑會以webpack的output-path為基準
        // 這個路徑不能在devServer的root裡，不然devServer會把它當靜態檔案提供  瀏覽器上就變成在下載檔案
        filename: process.env.IS_PRODUCT === 'Y' ? path.join( '../dist','WEB-INF', 'views', `./${templateBuildedEmitPath}/${p}`) : path.join( '../','WEB-INF', 'views', `./${templateBuildedEmitPath}/${p}`),
        chunks:[p],  
       }

       console.log(conf)

       return new HtmlWebPackPlugin(conf)
    })}