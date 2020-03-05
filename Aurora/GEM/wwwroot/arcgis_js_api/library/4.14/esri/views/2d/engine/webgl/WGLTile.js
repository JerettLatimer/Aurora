// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/libs/gl-matrix-2/mat2d ../../../../core/libs/gl-matrix-2/mat2df32 ../../../../core/libs/gl-matrix-2/vec2 ../../../../core/libs/gl-matrix-2/vec2f32 ./definitions ./DirtyMap ./DisplayRecordStore ./Fader ./TiledDisplayObject ./WGLBuffers".split(" "),function(x,y,B,u,C,D,E,p,z,A,F,G,H){Object.defineProperty(y,"__esModule",{value:!0});var v=new Set;x=function(w){function b(a,l,f){void 0===f&&(f=!1);a=w.call(this,a,l,[p.TILE_SIZE,
p.TILE_SIZE])||this;a._data=null;a._displayList=null;a._wglBuffers=null;a._dirtyMap=new z.default;a._labelIndex=null;a._dirty=!0;a.fader=new F.default;a._ensureCorrectZOrder=f;a.transforms.labelMat2d=C.mat2df32.create();return a}B(b,w);b.prototype.destroy=function(){this.clear()};Object.defineProperty(b.prototype,"displayObjects",{get:function(){return this._data.tileDisplayData.displayObjects},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"canDisplay",{get:function(){return!!this.attached},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"isDirty",{get:function(){return this._dirty},set:function(a){(this._dirty=a)||this.isReady||this.ready();this.requestRender()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hasData",{get:function(){return!!this._data},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"labelIndex",{get:function(){return this._labelIndex},enumerable:!0,configurable:!0});b.prototype.getGeometry=function(a){return this._wglBuffers&&
this._wglBuffers.has(a)?this._wglBuffers.get(a):null};b.prototype.getDisplayList=function(){return this._data&&this._displayList};Object.defineProperty(b.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0});b.prototype.setTransform=function(a,l){w.prototype.setTransform.call(this,a,l);var f=this.transforms.labelMat2d;l=a.getScreenTransform(f,l);var b=E.vec2f32.create();D.vec2.transformMat2d(b,this.coords,l);u.mat2d.identity(f);u.mat2d.translate(f,f,b);u.mat2d.multiply(f,
a.viewMat2d,f)};b.prototype.setData=function(a,b,f){var l=a.addOrUpdate,c=a.remove;!a.clear&&this.hasData||a.addOrUpdate?!a.clear&&this.hasData||!a.addOrUpdate?this.hasData&&this._doPatchData({addOrUpdate:l,remove:c},b,f):(l.tileDisplayData.computeDisplayList(this._ensureCorrectZOrder),this._dirtyMap=new z.default,this._dispRecStore=A.default.fromTileData(l,this._dirtyMap),this._data=l,this._readyTileIfNoLabels(b,f),this._dirtyMap.markAllDirty(),this._displayList||(this._displayList=l.tileDisplayData.displayList.clone())):
(this.clear(),this.ready());this.emit("change")};b.prototype.commitChanges=function(){this.fader.step()||this.requestRender();this._wglBuffers||(this._wglBuffers=new H.default(this.stage.context));this._wglBuffers.upload(this._data.tileBufferData,this._dirtyMap);this._displayList=this._data.tileDisplayData.displayList.clone();this._dirtyMap.markAllClean()};b.prototype.clear=function(){this._dispRecStore=this._displayList=this._data=null;this._wglBuffers&&(this._wglBuffers.dispose(),this._wglBuffers=
null)};b.prototype.attach=function(){return!0};b.prototype._readyTileIfNoLabels=function(a,b){a&&this._rebuildLabelIndex();this.isDirty=a&&b?!0:!1};b.prototype._doPatchData=function(a,b,f){this._patchData(a)||(this._dirtyMap.markAllDirty(),this._data.reshuffle(),this._dispRecStore=A.default.fromTileData(this._data,this._dirtyMap));this._readyTileIfNoLabels(b,f);this.requestRender()};b.prototype._rebuildLabelIndex=function(){this._labelIndex=this._initLabelIndex();for(var a=0,b=this.displayObjects;a<
b.length;a++)for(var f=0,n=b[a].metrics;f<n.length;f++)this._insertIntoLabelIndex(n[f])};b.prototype._insertIntoLabelIndex=function(a){-1!==a.xBucket&&this.labelIndex[a.yBucket][a.xBucket].push(a)};b.prototype._initLabelIndex=function(){for(var a=[],b=0;b<p.TILE_SIZE/p.COLLISION_BUCKET_SIZE;b++){a.push([]);for(var f=0;f<p.TILE_SIZE/p.COLLISION_BUCKET_SIZE;f++)a[b].push([])}return a};b.prototype._patchData=function(a){for(var b=!0,f=a.addOrUpdate&&a.addOrUpdate.tileDisplayData&&a.addOrUpdate.tileDisplayData.displayObjects||
[],n=(a.remove||[]).slice(),c=0;c<f.length;c++){var g=f[c];null!=g.insertAfter&&n.push(g.id)}for(g=0;g<n.length;g++){var m=n[g];if(c=this._data.tileDisplayData.displayObjectRegistry.get(m)){this._data.tileDisplayData.displayList.removeFromList(c.displayRecords);for(var k=0,d=c.displayRecords;k<d.length;k++)this._dispRecStore.delete(d[k]);this._data.tileDisplayData.displayObjectRegistry.delete(m);c=this._data.tileDisplayData.displayObjects.indexOf(c);this._data.tileDisplayData.displayObjects.splice(c,
1)}}for(n=0;n<f.length;n++){g=f[n];c=this._data.tileDisplayData.displayObjectRegistry.get(g.id);m=void 0;if(c){k=c.displayRecords;c.set(g);c.displayRecords=k;k=c.displayRecords.length;for(d=0;d<k;++d){var e=c.displayRecords[d],h=g.displayRecords[d];if(d>=g.displayRecords.length||e.geometryType!==h.geometryType||e.symbolLevel!==h.symbolLevel||e.zOrder!==h.zOrder||e.materialKey!==h.materialKey)this._dispRecStore.delete(c.displayRecords[d]),d<g.displayRecords.length&&(c.displayRecords[d]=void 0)}c.displayRecords.length=
g.displayRecords.length;c.metrics=g.metrics}else if(c=g.copy(),c.displayRecords=[],this._data.tileDisplayData.displayObjectRegistry.set(g.id,c),d=void 0,e=this._data.tileDisplayData.displayObjects,null!=c.insertAfter?(m={},0<=c.insertAfter?(k=this._data.tileDisplayData.displayObjectRegistry.get(c.insertAfter))?(d=e.indexOf(k)+1,d<e.length?e.splice(d,0,c):(e.push(c),d=e.length)):(e.push(c),d=e.length):(e.unshift(c),d=0)):(e.push(c),d=e.length),m){h=void 0;if(this._data.tileDisplayData.displayList.unified)h=
0<g.displayRecords.length?1:0;else{v.clear();for(var h=0,q=g.displayRecords;h<q.length;h++)k=this._data.tileDisplayData.displayList.getDPInfoType(q[h].geometryType),v.add(k);h=v.size}q=0;for(--d;0<=d&&q<h;--d)for(var r=e[d].displayRecords.length-1;0<=r&&q<h;--r){var t=e[d].displayRecords[r],k=this._data.tileDisplayData.displayList.getDPInfoType(t.geometryType);m[k]||(m[k]=t,++q)}}q=g.displayRecords.length;for(d=0;d<q;++d){h=g.displayRecords[d];(e=c.displayRecords[d])?(e.meshData=h.meshData,e.materialKey=
h.materialKey):(e=h.copy(),e.vertexFrom=void 0,e.indexFrom=void 0,c.displayRecords[d]=e);var r=h.geometryType,k=this._data.tileDisplayData.displayList.getDPInfoType(r),t=a.addOrUpdate.tileBufferData.geometries[r],r=t.vertexBuffer,t=t.indexBuffer,p=void 0;m&&(p=m[k]?this._data.tileDisplayData.displayList.splitAfter(m[k]):-1);b=this._dispRecStore.setMeshData(e,h,r,t,p)&&b;m&&null!=e.indexFrom&&null!=e.indexFrom&&(m[k]=e)}}return b};return b}(G.TiledDisplayObject);y.WGLTile=x});