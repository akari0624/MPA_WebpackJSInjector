const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


exports.generateMultipleWebpackHTMLPluginInstanceInOneArr = 
    jspFilePathArr => {
       return jspFilePathArr.map(p => {

       let conf = {
        template: path.join('../', `./${p}`),  // 要inject的檔案在哪裡  這裡是讓他跑去JS的上一層，看JSP放哪裡 自行調整
        filename: path.join( `./${p}`)  // inject完之後  要把重新產生的檔案放在哪裡, 這路徑會以webpack的output-path為基準
       }

       return new HtmlWebPackPlugin(conf)
    })}