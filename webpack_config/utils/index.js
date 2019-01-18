

const HtmlWebPackPlugin = require('html-webpack-plugin');


export const generateMultipleWebpackHTMLPluginInstanceInOneArr = 
    jspFilePathArr => jspFilePathArr.map(p => {

       let conf = {
        template: path.join(__dirname, '../', `./${p}`),  // 要inject的檔案在哪裡
        filename: path.join(__dirname, '../', `./builds/${p}`)  // inject完之後  要把重新產生的檔案放在哪裡
       }

    })