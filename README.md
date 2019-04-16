# MPA_WebpackJSInjector

## 在傳統多頁應用程式上用modern javascript編譯流程寫JavaScript

### 需求
- 很多時候工作環境上用的技術沒那麼新
- 以`JAVA`來說，很多時候還是`多頁應用程式`
  - 指 用`JSP`, `thymeleaf`...等等那樣傳統的server side render的模板引擎，在  
    server端先準備好一堆HTML然後推送給瀏覽器的作法。通常一頁就會有一個`JSP`(雖然模板引擎非常多，但以下都以`JSP`為對象),  
    跟今天的`SPA`的作法不同。
- 即使如此，為了做出高互動式的使用介面，很多時候JS還是非常吃重。    
- 那怎麼在這樣的專案底下，一樣能`寫ES6`, `將JS模組化`, `用webpack將js打包` ???  

### 這個repo
- 能夠在一個傳統的JAVA webapp上建立起modern javascript的寫程式流程。
  - 建立好一個`multiple page application`在開發時應該做好的webpack設定  
  包括：
    1. 一個`jsp`作為一個webpack的entry point，所以多個`jsp`就會有多個`entry`提供給webpack
    2. 一個`jsp`就會產生一個`bundle.js`。
    3. 在開發時使用`webpack-dev-server`(以下稱`devServer`)，所以只要一修改編譯中的`js`檔案，一樣能支援Hot reload與瀏覽器自動刷新
    4. 在webpack設定檔裡設定好`devServer`的`proxy`，只有`bundle.js`是由`devServer`的記憶體裡提供，而`JSP`, 圖片檔等各種asset則是由`devServer` 去向給背後的JAVA web app請求。
    5. 使用`Webpack-HTML-Plugin`，在編譯出`bundle.js`完成之後，自動會在JAVA Webapp的硬碟空間裡多寫出一份，並在`</body>`前面加上`<script type=text/javascript src="/.....bundle.js" />`
    6. 已經設定好`babel`, `typescript`等環境，可以寫`ES6+`，也可以寫`typescript`

### 如何使用
- 首先，電腦裡要裝好`node.js`與`npm`。
- 用CMD cd到像是`JAVA Webapp`的`WebContent`那樣的地方
  ``` sh
    cd $path_to_webapp_WebContent
  ```
- 創好一個之後要在這個資料夾底下寫整個webapp的js的地方的資料夾，這裡先叫它`js_src`
  ``` sh 
  mkdir js_src
  ```  
- 進入這個資料夾
  ``` sh
  cd js_src
  ```  
- git clone 這個repo
  ``` sh
    git clone https://github.com/akari0624/MPA_WebpackJSInjector.git
  ```
- 安裝所有第三方套件
  ``` sh
    npm install
  ```
- 可以先把一些不重要的東西自己刪除 `.git`, `README.md`...等
- 建議是用`VS Code`之類的適合Web前端開發的編輯器來寫`js`，不要用`Eclipse`或`IDEA`，不然會缺少`Eslint`等擴充插件
- 在`page_config/index.js`底下，按照說明設定好一個個`jsp頁面`與其`對應的js打包的進入點`，有幾頁JSP要注入打包好後的js，就要有幾組`{jsp:..., entryJS:..., outputJS:...}`
``` javascript
exports.jspPageMap = [{
  jsp:'page1/page1.jsp', entryJS:'page1/index.js', outputJS:'path/to/your/jsdir' 
}];
```
- 在`webpack_config/utils/templateBuildsConfig.js`底下設定好Tomcat監聽的`port號`與當由`write-file-webpack-plugin`產生出注入`<script .... />`之後新產生出來的JSP要放在哪裡。
  - `templateBuildedEmitPath`這個屬性設定好的資料夾名稱會出現在`src`上一層(所以就是`WebContent`底下那一層)，之後放著重新產生的temp的JSP，以讓`Tomcat`去使用。
- 用CMD執行`npm run devWithBabel`，開啟`devServer`開始在src資料夾底下開始寫`javascript`

### 注意事項
- 所有在JSP裡要include的js, css, 圖片, 檔案等，都不可以寫`相對路徑`，必須用`request.getContectPath()`之類的方式來組出url


### 完成事項
-  設好WebpackHTMLPlugin，看會不會跑出多個build.js
- 要使用Webpack  WriteFilePlugin 在dev時 讓jsp真的會寫進硬碟裡，不然proxy過去tomcat後會沒jsp可編譯
- webpack devServer要設proxy去tomcat
- build 出product bundle js在硬碟裡

###  todo


###  thanks
本repo深受這篇文章啟發，在此銘謝
[掘金用戶 nqdy666 - WEBPACK + JSP 构建多页应用](https://juejin.im/post/5a620b0c6fb9a01cb3164346)
