/** 
 * 1.有哪些jsp資料夾的路徑，路徑最前面代表 container的webapp資料夾,
 * 然後  
 * 2.對應到的js index.js(或index.ts)檔案，路徑最前面代表這個 repo的src
 * 以名值對的方式，放進以下的array裡，路徑最前面都不需再寫 '/'
 * 
 * ex: jspPageMap = [{jsp:'AG1/AG1.jsp',js:'ag1/index.js'}]
 * */ 
exports.jspPageMap = [];