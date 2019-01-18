const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


exports.generateMultipleWebpackHTMLPluginInstanceInOneArr = 
    jspFilePathArr => {
       return jspFilePathArr.map(p => {

       let conf = {
        template: path.join('../', `./${p}`),  // 要inject的檔案在哪裡
        filename: path.join( `./builds/${p}`)  // inject完之後  要把重新產生的檔案放在哪裡
       }

       return new HtmlWebPackPlugin(conf)
    })}