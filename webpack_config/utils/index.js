const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const templateBuildedEmitPath = require('./templateBuildsConfig').templateBuildedEmitPath

exports.generateMultipleWebpackHTMLPluginInstanceInOneArr = 
    jspFilePathArr => {
       return jspFilePathArr.map(p => {

       let conf = {
         template: path.join('../WebContent', `./${p}`),  // 要inject的檔案在哪裡, 這路徑會以webpack在哪裡被require為基準，現在是預設jsp會被放在WebContent底下

         // inject完之後  要把重新產生的檔案放在哪裡, 這路徑會以webpack的output-path為基準, 或是用__dirname寫絕對路徑
        // 這個路徑不能在devServer的root裡，不然devServer會把它當靜態檔案提供  瀏覽器上就變成在下載檔案
        // 正式產出時，就把原本dev時build出來的jsp蓋掉，原始檔不動，這樣Spring那邊的ViewController也不用再變return的url
        // 正式環境  跟  開發環境 的jsp 最後都是到同一個地方
          filename: path.join(__dirname, '../../../WebContent', 'WEB-INF', 'views',`./${templateBuildedEmitPaths}/${p}`),
        
       }

       console.log(conf)

       return new HtmlWebPackPlugin(conf)
    })}