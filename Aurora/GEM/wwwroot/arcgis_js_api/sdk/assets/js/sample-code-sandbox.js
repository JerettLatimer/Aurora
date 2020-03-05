/*! ArcGIS API for JavaScript 4.14 | Copyright (c) 2020 Esri. All rights reserved. | http://www.esri.com/legal/privacy | https://developers.arcgis.com/terms/faq */
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};require(["calcite-web","eligrey/FileSaver","mousetrap","dojo/_base/connect","dojo/_base/event","dojo/dom-construct","dojo/dom-style","dojo/Deferred","dojo/has","dojo/on","dojo/query","esri/config","esri/core/urlUtils","esri/portal/Portal","esri/request","@dojo/framework/has/has!es6-symbol?prettier/prettier-helper:dojo/has","dojo/NodeList-dom","dojo/domReady!"],function(i,e,o,t,a,n,s,c,r,l,d,m,u,f,p,b){var g=14.11,h=!1,v={title:"My first sample",editors:"100",html:"",layout:"left"},y=void 0,S=[],x=void 0,w=void 0,C=void 0,j={},O=void 0,k=void 0,q=void 0,z=!1,E=!1,F=void 0,K=!1,A=!1,T="https://codepen.io/pen/define/",D="codepen",V=!0;window.jsshare=function(e){"jsbin"===e?D="jsbin":"codepen"===e&&(D="codepen"),localStorage.jsShareType=D};var L,_=void(window.sandboxOutputRefreshDelayInMilliseconds=0),M=void 0,P=void 0,H=void 0,I=void 0,N=void 0,U=void 0,R=void 0,J=void 0;function B(t){var e=t.match(/issMeshUrl = ".+?"/g);if(e&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/url = ".+?"/g))&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/image: ".+?"/g))&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/url: ".+?"/g))&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/src='.+?'/g))&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split("'")[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/getUniqueValueSymbol\(".+?"/g))&&(e=(e=e.filter(function(e){return-1===e.indexOf("//")})).filter(function(e){return-1===e.indexOf("{")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/src=".+?"/g))&&(e=(e=e.filter(function(e){return-1===e.indexOf("//")})).filter(function(e){return-1===e.indexOf("{")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,C+"/"+o)}),(e=t.match(/"dojo\/text!.+?"/g))&&(e=e.filter(function(e){return-1===e.indexOf("//")})).forEach(function(e){var o=e.split('"')[1];t=t.replace(o,"dojo/text!"+C+"/brightest.txt")}),/layers-scenelayerview-query/.test(C)){var o=/<img[^>]*>/im,n=new RegExp(C+"/");if(o.test(t)){var a=t.match(o)[0].replace(n,"");t=t.replace(o,a)}}return t}function G(e){h&&console&&console.log&&console.log(Array.prototype.slice.call(arguments))}function W(){N.removeAttr("style"),R.removeAttr("style")}function X(){A&&Y(),R.toggleClass("sandbox-container-minimized"),N.toggleClass("sandbox-output-maximized"),_.toggleClass("sandbox-container-minimized"),W(),y.resize(!0),K=!K}function Y(){K&&X(),R.toggleClass("sandbox-container-maximized"),N.toggleClass("sandbox-output-minimized"),_.toggleClass("sandbox-container-minimized"),W(),y.resize(!0),A=!A}function $(){document.location=H.attr("data-sample-description-url")[0]}function Q(){G("saveFile");try{if(!!new Blob){var e=new Blob([y.getSession().getValue()],{type:"text/plain;charset='"+document.characterSet+"'"});saveAs(e,w+".html")}}catch(e){console.log("Download is not supported for %s",navigator.userAgent)}}function Z(){G("openJSShare");var e=window.open("about:blank",[o(2),o(1),o(1),o(1),o(3)].join("-"));function o(e){for(var o="",t=0;t<e;t++)o+=(65536*(1+Math.random())|0).toString(16).substring(1);return o}var t=function(e){var o=e,t=/<title>[^<]*<\/title>/im,n=e.match(t),a=n?n[0]:"",s=a.replace(/<\/?title>/gim,"");if(v.title=s,a&&""!==a){var r=C.match(/[-\w]*(?=\/live(\/index\.html)?)/im),i=r?r[0]:"sample",c="https://developers.arcgis.com/javascript/latest/sample-code/"+i+"/index.html",l="";"jsbin"===D&&(l+='<meta name="description" content="['+s+']">\n  '),l+="\x3c!--\n     ArcGIS API for JavaScript, https://js.arcgis.com\n     For more information about the {{ sample_name }} sample,\n     read the original sample description at developers.arcgis.com.\n     {{ sample_url }}\n     --\x3e\n".replace(/{{\ssample_name\s}}/,i).replace(/{{\ssample_url\s}}/,c)+a,o=e.replace(t,l)}var d=o;return"function"==typeof b.format&&(d=b.format(o,b.esriDefaultOptions)),d}(y.getSession().getValue());localStorage&&localStorage.jsShareType&&(D=localStorage.jsShareType);var n=["html"],a=e.document.createElement("form"),s=void 0;"jsbin"===D?T="https://jsbin.com?html,output":"codepen"===D&&(T="https://codepen.io/pen/define/"),a.setAttribute("target","_self"),a.setAttribute("method","post"),a.setAttribute("action",T),a.style.display="none";for(var r=0;r<n.length;r++)s=e.document.createElement("input"),a.appendChild(s),s.type="hidden","jsbin"===D?(s.name=n[r],s.value=encodeURIComponent(t)):"codepen"===D?(v.html=t.replace(/<!DOCTYPE html>\n?/i,""),s.name="data",s.value=JSON.stringify(v)):s.value="";e.document.body.appendChild(a),a.submit()}function ee(e){a.stop(e),_.addClass("resizing"),U.addClass("resizing");var n=s.get("wrapper","width");var o=l(window,"mousemove",function(e){var o,t;a.stop(e),50<e.pageX&&e.pageX+70<n&&(o=e.pageX+11,t=n,R[0].style.right=t-o+"px",N[0].style.left=o+"px",y.resize(!0))});l.once(parent.document,"mouseup",function(e){_.removeClass("resizing"),U.removeClass("resizing"),t.disconnect(o)})}function oe(){G("updateSandboxOutput"),J.addClass("is-active"),(U=d(".js-sandbox-iframe"))&&n.destroy(U[0]),q&&t.disconnect(q);var e=n.create("iframe",{class:"sandbox-iframe js-sandbox-iframe",allowfullscreen:"true"},N[0]);q=l(e,"load",function(){U=d(".js-sandbox-iframe"),setTimeout(function(){J.removeClass("is-active"),I.removeClass("btn-disabled")},3e3)}),G("sandboxIsLoaded");var o=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument;r("ie")?(o.contents=y.getSession().getValue(),e.src="javascript:window['contents']"):(o.document.open(),o.document.write(y.getSession().getValue()),o.document.close())}(L=new c,i.init(),L.resolve({success:!0}),L.promise).then(function(){var e=new c;return G("bindEventHandlers"),H=d(".js-btn-sample-description"),P=d(".js-btn-save-file"),M=d(".js-btn-jsshare"),I=d(".js-btn-refresh"),R=d(".js-sandbox-container"),_=d(".js-sandbox-handle"),N=d(".js-sandbox-output"),J=d(".js-loader"),H.on("click",$),P.on("click",Q),M.on("click",Z),I.on("click",oe),d(".js-btn-sandbox-keyboard-shortcuts").on("click",function(){i.bus.emit("modal:open",{id:"modal-keyboard-shortcuts"})}),_.on("mousedown",ee),l(window,"resize",W),e.resolve({success:!0}),e.promise}).then(function(){var e=new c;return x=document.documentElement.getAttribute("data-platform"),/mac/i.test(x)&&i.addClass(i.findElements("body")[0],"macintosh"),i.bus.on("keyboard:mousetrap",function(e){var o=e.event.key,t=e.combination;"?"===o?i.bus.emit("modal:open","modal-keyboard-shortcuts"):"s"===o&&"g s"===t?$():"c"===o?(e.event.preventDefault(),y.isFocused()||y.focus()):"d"===o?Q():"s"===o?Z():"Enter"!==o||"command+enter"!==t&&"ctrl+enter"!==t?"h"===o&&"t h"===t?X():"o"===o&&"t o"===t&&Y():oe()}),o.bind(["g s","c","d","s","command+enter","ctrl+enter","t h","t o","?"],function(e,o){i.bus.emit("keyboard:mousetrap",{event:e,combination:o})}),e.resolve({success:!0}),e.promise}).then(function(){var e=new c;G("setSampleFolder");var o=u.urlToObject(document.location.href);o.query=o.query||{};var t=document.location.pathname.replace("sample-code/sandbox/index.html","");return C=o.query&&o.query.sample?(w=o.query.sample,H.attr("data-sample-description-url","../../sample-code/"+w+"/index.html"),document.title="Sandbox: "+w,document.location.protocol+"//"+document.location.host+t+"sample-code/"+o.query.sample+"/live"):t+"sample-code/intro-mapview/live",o.query&&o.query.hasOwnProperty("share")&&"false"===o.query.share&&(V=!1),e.resolve({success:!0}),e.promise}).then(function(){return G("fetchSandboxSampleCode"),p(C+"/index.html",{responseType:"text"}).then(function(e){return G("handleSample"),O=B(e.data),k=B(e.data),H.toggleClass("btn-disabled"),{result:"success",code:O}})}).then(function(){var e=new c;G("startEditor"),ace.config.set("workerPath","../../../assets/js/libs/ace");var o=d(".js-sandbox-editor")[0];if((y=ace.edit(o)).$blockScrolling=1/0,y.setPrintMarginColumn(0),y.setTheme("ace/theme/esri"),y.getSession().setTabSize(2),y.getSession().setUseSoftTabs(!0),y.getSession().setMode("ace/mode/html_esri"),y.getSession().setUseWorker(!0),y.setOptions({enableLinking:!0,enableBasicAutocompletion:!0,wrap:!0}),F=g,localStorage){if(z=!0,function(){var e="";for(var o in window.localStorage)localStorage.hasOwnProperty(o)&&(e+=window.localStorage[o]);e&&e.length}(),localStorage.sandboxFontSize?localStorage.sandboxFontSize&&(F=parseInt(localStorage.sandboxFontSize),y.setFontSize(F)):localStorage.sandboxFontSize=F,localStorage.sandboxSourceCode)if((j=JSON.parse(localStorage.sandboxSourceCode)).hasOwnProperty(w)){var t=j[w];if(O=t,"function"==typeof b.format)try{O=b.format(t,b.esriDefaultOptions)}catch(e){console.log("Unable to format source from storage.\n"+e.message)}y.getSession().setValue(O),document.querySelector(".js-sandbox-editor").appendChild(document.createElement("div")).setAttribute("class","sandbox-revert-message-container");var n=document.querySelector(".sandbox-revert-message-container");n.innerHTML='<div class="alert is-active"><div class="inline-block margin-right-2">\n            <span class="avenir-bold">NOTE</span>: \n            This is a saved version, <a class="btn-link js-sandbox-revert-link">revert to the original?</a></div>\n            <button class="alert-close js-sandbox-revert-message-close">\n              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon">\n                <path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/>\n              </svg>\n            </button>\n          </div>';var a=document.querySelector(".js-sandbox-revert-message-close");i.addEvent(a,"click",function(){i.hasClass(n,"hide")||i.addClass(n,"hide")});var s=document.querySelector(".js-sandbox-revert-link");i.addEvent(s,"click",function(){O=k,E=!0,setTimeout(function(){y.getSession().setValue(k),oe()},1500),i.hasClass(n,"hide")||i.addClass(n,"hide")})}else y.getSession().setValue(O);else localStorage.sandboxSourceCode="{}",y.getSession().setValue(O);localStorage.sandboxKeybindings||(localStorage.sandboxKeybindings="ace")}else y.getSession().setValue(O);y.on("change",function(e){S.push(e),function(e){if(z&&"object"===(void 0===j?"undefined":_typeof(j))&&(O=y.getSession().getValue(),"function"==typeof b.format))try{b.format(O,b.esriDefaultOptions),j[w]=O,localStorage.sandboxSourceCode=JSON.stringify(j)}catch(e){console.log("Unable to save source to storage.\n"+e.message)}S=[],0<window.sandboxOutputRefreshDelayInMilliseconds&&setTimeout(function(){oe()},window.sandboxOutputRefreshDelayInMilliseconds),E&&"insert"===e.action&&(E=!1,delete j[w],localStorage.sandboxSourceCode=JSON.stringify(j))}(e)}),P.removeClass("btn-disabled"),V&&M.removeClass("btn-disabled");var r={current:"ace",ace:null,vim:void 0};return ace.config.loadModule("ace/keyboard/vim",function(e){r.vim=e.handler,e.CodeMirror.Vim.defineEx("write","w",function(e,o){e.ace.execCommand("sandboxSaveCommand")}),localStorage.sandboxKeybindings&&"vim"===localStorage.sandboxKeybindings&&"ace"===r.current&&(y.setKeyboardHandler(r.vim),r.current="vim")}),y.commands.removeCommand({name:"gotoline",bindKey:{win:"Ctrl-L",mac:"Command-L"}}),y.commands.addCommand({name:"gotoline",bindKey:{win:"Ctrl-Alt-G",mac:"Option-Command-G"},exec:function(e,o){"number"!=typeof o&&(o=parseInt(prompt("Enter line number:"),10)),isNaN(o)||e.gotoLine(o)},readOnly:!0}),y.commands.addCommand({name:"sandboxSaveCommand",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:function(){oe()}}),y.commands.addCommand({name:"sandboxKeybindingCommand",bindKey:{win:"Ctrl-K",mac:"Command-K"},exec:function(e){"ace"===r.current?(e.setKeyboardHandler(r.vim),r.current="vim"):(e.setKeyboardHandler(r.ace),r.current="ace")}}),y.commands.addCommand({name:"sandboxCommentLinesCommand",bindKey:{win:"Ctrl-/",mac:"Command-/"},exec:function(e){e.toggleCommentLines()}}),y.commands.addCommand({name:"sandboxPrettierCommand",bindKey:{win:"Ctrl-Alt-L",mac:"Option-Command-L"},exec:function(){var e,o;e=y.getSession().getValue(),o=e,"function"==typeof b.format&&(o=b.format(e,b.esriDefaultOptions)),y.getSession().setValue(o)}}),y.commands.addCommand({name:"sandboxToogleHTMLCommand",bindKey:{win:"Ctrl-1",mac:"Ctrl-1"},exec:function(){X()}}),y.commands.addCommand({name:"sandboxToogleOutputCommand",bindKey:{win:"Ctrl-2",mac:"Ctrl-2"},exec:function(){Y()}}),y.commands.addCommand({name:"sandboxIncreaseFontCommand",bindKey:{win:"Ctrl-Shift-.",mac:"Command-Shift-."},exec:function(e){F++,e.setFontSize(F),18<(localStorage.sandboxFontSize=F)&&""===document.querySelector(".js-sandbox-editor").style.lineHeight&&(document.querySelector(".js-sandbox-editor").style.lineHeight=1.4)}}),y.commands.addCommand({name:"sandboxDecreaseFontCommand",bindKey:{win:"Ctrl-Shift-,",mac:"Command-Shift-,"},exec:function(e){F--,e.setFontSize(F),(localStorage.sandboxFontSize=F)<18&&""!==document.querySelector(".js-sandbox-editor").style.lineHeight&&(document.querySelector(".js-sandbox-editor").style.lineHeight="")}}),y.commands.addCommand({name:"sandboxResetFontCommand",bindKey:{win:"Ctrl-0",mac:"Command-0"},exec:function(e){e.setFontSize(g),F=g,localStorage&&delete localStorage.sandboxFontSize,document.querySelector(".js-sandbox-editor").style.lineHeight="",document.querySelector(".js-sandbox-editor").style.fontSize=""}}),y.commands.addCommand({name:"blur",bindKey:{win:"Shift-Esc",mac:"Shift-Esc"},exec:function(e){e.isFocused()&&e.blur()}}),y.on("linkClick",function(e){var o=/[0-9a-fA-F]{32}/,t=e.token.value,n=t;if(o.test(t)){var a=t.match(o)?t.match(o)[0]:"";n="https://www.arcgis.com/home/search.html?q="+a;var s=new f;s.load().then(function(){var e={query:a,sortField:"numViews",sortOrder:"desc",num:20};Promise.all([s.queryItems(e),s.queryGroups(e)]).then(function(e){var o=e[0]&&e[0].hasOwnProperty("results")&&0<e[0].results.length,t=e[1]&&e[1].hasOwnProperty("results")&&0<e[1].results.length;o?n="https://www.arcgis.com/home/item.html?id="+a:t&&(n="https://www.arcgis.com/home/group.html?id="+a)}).catch(function(e){console.log("An error occurred while retrieving: item:"+a+", error: "+e)}).finally(function(){window.open(n,"_blank")})}).catch(function(e){console.log("An error occurred while loading portal: "+s.url+", error: "+e),window.open(n,"_blank")})}else if(/esri(\/\w+)+/.test(t)){var r="developers.arcgis.com";/(localhost|esri\.com)/.test(document.location.hostname)&&(r=document.location.hostname);var i=t.replace(/\//g,"-");n="https://"+r+"/javascript/latest/api-reference/"+i+".html",window.open(n,"_blank")}else/esri-url-href/.test(e.token.type)&&window.open(t,"_blank")}),e.resolve({success:!0}),e.promise}).then(function(e){return oe(),e}).catch(function(e){console.log("failed",e)})});