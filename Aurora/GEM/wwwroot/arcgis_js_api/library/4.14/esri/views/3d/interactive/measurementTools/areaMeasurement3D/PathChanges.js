// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define(["require","exports","../support/setUtils"],function(d,e,c){return function(){function b(){this.change="none";this.updatedVertices=new Set}b.prototype.fullChange=function(){this.change="full"};b.prototype.incrementalChange=function(a){"none"===this.change&&(this.change="incremental");this.updatedVertices.add(a)};b.prototype.clear=function(){this.change="none";this.updatedVertices.clear()};b.prototype.assign=function(a){this.change=a.change;this.updatedVertices=c.clone(a.updatedVertices)};b.prototype.merge=
function(a){var b=this;switch(this.change){case "none":this.assign(a);break;case "incremental":"incremental"===a.change?a.updatedVertices.forEach(function(a){b.updatedVertices.add(a)}):"full"===a.change&&(this.change="full")}};return b}()});