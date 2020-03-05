// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/tsSupport/generatorHelper ../../../../../../core/tsSupport/awaiterHelper ../../../../../../core/Error ../../../../../../core/has ../../../../../../core/Logger ../../../../../../core/maybe ../../../../../../core/promiseUtils ../../../../../../geometry/SpatialReference ../../../../../../geometry/support/jsonUtils ../../../../../../symbols/SimpleLineSymbol ../../definitions ../../enums ../../WGLDisplayObject ../MeshData ../VertexVector ../templates/WGLLabelTemplate ../templates/WGLLineTemplate ../templates/WGLMarkerTemplate ../templates/WGLTemplateStore".split(" "),
function(z,A,R,D,E,F,S,G,q,H,I,B,J,x,h,K,L,l,M,N,O,C){function P(c){var b=(c.attributes?Object.keys(c.attributes):[]).map(function(a){return{name:a,alias:a,type:"string"===typeof c.attributes[a]?"esriFieldTypeString":"esriFieldTypeDouble"}});return{geometryType:null!=c.centroid?"esriGeometryPolygon":B.getJsonType(c.geometry),spatialReference:I.fromJSON(c.geometry.spatialReference),fields:b}}Object.defineProperty(A,"__esModule",{value:!0});var y=G.getLogger("esri.views.2d.engine.webgl.WGLMeshFactory"),
Q={esriGeometryPoint:"above-right above-center above-left center-center center-left center-right below-center below-left below-right".split(" "),esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null,esriGeometryEnvelope:null};z=function(){function c(b,a,d,r,c,e){this._isDD=!1;this._labelsDebugTemplate=null;this._isDD=q.isSome(d)&&"dot-density"===d.type;this._geometryType=b;this._idField=a;this._templateStore=r;this._setLabelTemplates(c,d,e)}c.prototype.update=
function(b,a,d){this._isDD=q.isSome(a)&&"dot-density"===a.type;this._setLabelTemplates(b,a,d)};c.prototype._setLabelTemplates=function(b,a,d){b&&this._validateLabelingInfo(b)&&(this._labelTemplates=b.map(function(b){return M.default.fromLabelClass(a,b,d)}))};Object.defineProperty(c.prototype,"templates",{get:function(){return this._templateStore},enumerable:!0,configurable:!0});c.prototype.createMeshData=function(b){var a=Array(5),d=this._labelTemplates&&0<this._labelTemplates.length,c="esriGeometryPolyline"===
this._geometryType?x.HEURISTIC_GLYPHS_PER_LINE:x.HEURISTIC_GLYPHS_PER_FEATURE;a[h.WGLGeometryType.MARKER]=new l.VertexVectors(h.WGLGeometryType.MARKER,b);a[h.WGLGeometryType.FILL]=new l.VertexVectors(h.WGLGeometryType.FILL,b,this._isDD);a[h.WGLGeometryType.LINE]=new l.VertexVectors(h.WGLGeometryType.LINE,b);a[h.WGLGeometryType.TEXT]=new l.VertexVectors(h.WGLGeometryType.TEXT,b);a[h.WGLGeometryType.LABEL]=new l.VertexVectors(h.WGLGeometryType.LABEL,d?c:0);return new L.MeshData([],a)};c.prototype.analyze=
function(b,a,d,c,t,e){return E(this,void 0,void 0,function(){var r,k,f,n,p,m,g,h,v,l,w;return D(this,function(u){switch(u.label){case 0:return r=b,H.isAborted(e)?[2,[]]:q.isSome(d)?[4,d.analyze(this._idField,b,t,e)]:[3,2];case 1:u.sent(),u.label=2;case 2:k=0,f=r,u.label=3;case 3:if(!(k<f.length))return[3,10];n=f[k];p=-1;if(!a)return[3,7];m=n;if(null==m.symbol)return[3,5];g=null;"cim"===m.symbol.type&&(g=P(n));return[4,this._templateStore.createTemplateGroup(m.symbol,null,null,g)];case 4:return p=
u.sent(),[3,6];case 5:q.isSome(d)&&(p=d.match(this._idField,n,null,null,t)),u.label=6;case 6:return[3,8];case 7:q.isSome(d)&&(p=d.match(this._idField,n,this._geometryType,c,t)),u.label=8;case 8:if(C.isDynamicId(p))for(h=this._templateStore.getDynamicTemplateGroup(p),v=0,l=h;v<l.length;v++)(w=l[v])&&w.analyze&&w.analyze(this._templateStore,n,c,t);n.groupId=p;u.label=9;case 9:return k++,[3,3];case 10:return[2,this._templateStore.finalize(e).then(function(){return r})]}})})};c.prototype.write=function(b,
a,d,c,t,e,h){var k=this._templateStore.getTemplateGroup(a.groupId),f=a.localId;if(null!=f){var n=new K(f),r=!!e&&!!this._labelTemplates&&e.has(f);if(C.isDynamicId(a.groupId))for(var m=0;m<k.length;m++){var g=k[m];g.bindFeature(a,d,c)}if(k&&(a.geometry||a.centroid)){c=n.displayRecords;g=a.insertAfter;void 0!==g&&(n.insertAfter=g);(d=this._geometryType)||(d=null!=a.centroid?"esriGeometryPolygon":B.getJsonType(a.geometry));for(m=0;m<k.length;m++){var g=k[m],l=b.get(g.geometryType);g.writeMesh(c,l,d,
f,a)}r&&(k=this._getLabelReference(k),e=e.get(f),this._writeLabelMesh(n,b,f,a,h,e,k,t,d));b.pushDisplayObject(n)}}};c.prototype._hasBadLabelClass=function(b,a){var d=b.labelPlacement,c=Q[a];if(!b.symbol)return y.warn("No LabelClass symbol specified."),!0;if(!c)return y.error(new F("mapview-labeling:unsupported-geometry-type","Unable to create labels for Feature Layer, "+a+" is not supported")),!0;c.some(function(a){return a===d})||(c=c[0],d&&y.warn("Found invalid label placement type "+d+" for "+
a+". Defaulting to "+c),b.labelPlacement=c);return!1};c.prototype._validateLabelingInfo=function(b){var a=this;return!b.some(function(b){return a._hasBadLabelClass(b,a._geometryType)})};c.prototype._getLabelReference=function(b){for(var a=0;a<b.length;a++){var c=b[a];if(c instanceof O.default)return c}return null};c.prototype._writeLabelMesh=function(b,a,c,h,t,e,l,k,f){for(var d=b.displayRecords,p=[],m=0;m<e.length;m++){var g=e[m],r=g.text,v=g.rtl,g=this._labelTemplates[g.id],q=a.get(g.geometryType),
w=t.get(g.symbolId).glyphMosaicItems;g.bindReferenceTemplate(l);g.bindTextInfo(w,r,v);g.writeMesh(d,q,f,c,h,k,p)}b.metrics=p;x.DEBUG_LABELS&&this._debugLabels(b,a)};c.prototype._debugLabels=function(b,a){var c=b.displayRecords,h=b.id,l=0;for(b=b.metrics;l<b.length;l++)for(var e=b[l],q=0,k=e.boxes?e.boxes.concat([e.bounds]):[e.bounds];q<k.length;q++){var f=k[q],f={geometry:{paths:[[[e.anchor[0]+e.offsetX+f.center[0]-f.width/2,e.anchor[1]+e.offsetY+f.center[1]+f.height/2],[0,-f.height],[f.width,0],
[0,f.height],[-f.width,0]]]},attributes:{}},n=this._getLabelDebugTemplate(),p=a.get(n.geometryType);n.writeMesh(c,p,"esriGeometryPolyline",h,f)}};c.prototype._getLabelDebugTemplate=function(){this._labelsDebugTemplate||(this._labelsDebugTemplate=this._createLabelsDebugTemplate());return this._labelsDebugTemplate};c.prototype._createLabelsDebugTemplate=function(){var b=new J({style:"solid",width:1,color:[255,0,0,1]});return N.default.fromSimpleLine(null,!1,b,null,!1)};return c}();A.WGLMeshFactory=
z});