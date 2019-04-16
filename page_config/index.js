/** 
 * 1.有哪些jsp資料夾的路徑，路徑最前面代表 container的webapp資料夾,
 * 然後  
 * 2.對應到的js index.js(或index.ts)檔案，路徑最前面代表這個 repo的src
 * 以名值對的方式，放進以下的array裡，路徑最前面都不需再寫 '/'
 * 3. outputJS: 最後產生的js要放到哪裡以及叫怎樣的名字  /path/path/path/fileName.js  會以webpack config output為基準，通常必須要參考Spring resource mapping的
 * 設定，最後不需要有 .js   webpack會自動加上去
 * 
 * ex: jspPageMap = [{jsp:'AG1/AG1.jsp', entryJS:'ag1/index.js', outputJS:... }]
 * 
 * */ 
exports.jspPageMap = [];