//>>built
define(["dojo/_base/array","dojo/_base/lang","dojo/sniff"],function(n,k,l){var d={};k.setObject("dijit._editor.html",d);var m=d.escapeXml=function(a,b){a=a.replace(/&/gm,"\x26amp;").replace(/</gm,"\x26lt;").replace(/>/gm,"\x26gt;").replace(/"/gm,"\x26quot;");b||(a=a.replace(/'/gm,"\x26#39;"));return a};d.getNodeHtml=function(a){var b=[];d.getNodeHtmlHelper(a,b);return b.join("")};d.getNodeHtmlHelper=function(a,b){switch(a.nodeType){case 1:var e=a.nodeName.toLowerCase();if(!e||"/"==e.charAt(0))return"";
b.push("\x3c",e);for(var h=[],f={},c,k=0;c=a.attributes[k++];){var g=c.name;"_dj"===g.substr(0,3)||l("dom-attributes-specified-flag")&&!c.specified||g in f||(c=c.value,("src"==g||"href"==g)&&a.getAttribute("_djrealurl")&&(c=a.getAttribute("_djrealurl")),8===l("ie")&&"style"===g&&(c=c.replace("HEIGHT:","height:").replace("WIDTH:","width:")),h.push([g,c]),f[g]=c)}h.sort(function(a,b){return a[0]<b[0]?-1:a[0]==b[0]?0:1});for(f=0;c=h[f++];)b.push(" ",c[0],'\x3d"',"string"===typeof c[1]?m(c[1],!0):c[1],
'"');switch(e){case "br":case "hr":case "img":case "input":case "base":case "meta":case "area":case "basefont":b.push(" /\x3e");break;case "script":b.push("\x3e",a.innerHTML,"\x3c/",e,"\x3e");break;default:b.push("\x3e"),a.hasChildNodes()&&d.getChildrenHtmlHelper(a,b),b.push("\x3c/",e,"\x3e")}break;case 4:case 3:b.push(m(a.nodeValue,!0));break;case 8:b.push("\x3c!--",m(a.nodeValue,!0),"--\x3e");break;default:b.push("\x3c!-- Element not recognized - Type: ",a.nodeType," Name: ",a.nodeName,"--\x3e")}};
d.getChildrenHtml=function(a){var b=[];d.getChildrenHtmlHelper(a,b);return b.join("")};d.getChildrenHtmlHelper=function(a,b){if(a)for(var e=a.childNodes||a,h=!l("ie")||e!==a,f,c=0;f=e[c++];)h&&f.parentNode!=a||d.getNodeHtmlHelper(f,b)};return d});