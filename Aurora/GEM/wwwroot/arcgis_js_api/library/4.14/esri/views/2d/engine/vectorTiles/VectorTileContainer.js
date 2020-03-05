// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../core/iteratorUtils ../../../../core/maybe ../../../../core/promiseUtils ../../../../geometry/support/aaBoundingRect ../../../webgl ../../engine ../vectorTiles/VectorTile ./FadeRecorder ../webgl/definitions ../webgl/enums ../webgl/TiledDisplayObject ../../tiling/TileCoverage ../../tiling/TileKey".split(" "),
function(r,p,u,z,A,B,C,D,E,v,L,F,G,H,q,m,I,J,K){Object.defineProperty(p,"__esModule",{value:!0});r=function(h){function f(a,b){a=h.call(this,a,b)||this;a._backgroundTiles=[];a._fadeRecorder=new H.FadeRecorder(400);a._pointToCallbacks=new Map;a._parsedDataQueue=new Map;return a}u(f,h);f.prototype.destroy=function(){this.removeAllChildren();this.children.forEach(function(a){return a.destroy()})};f.prototype.dispose=function(){this._spriteMosaic&&this._spriteMosaic.dispose();this._glyphMosaic&&this._glyphMosaic.dispose();
h.prototype.dispose.call(this)};f.prototype.setStyleResources=function(a,b,d){this._spriteMosaic=a;this._glyphMosaic=b;this._styleRepository=d};f.prototype.hitTest=function(a,b){return B(this,void 0,void 0,function(){var d,g;return A(this,function(c){d=[a,b];g=E.createResolver();this._pointToCallbacks.set(d,g);this.requestRender();return[2,g.promise]})})};f.prototype.setTileData=function(a,b){var d=this.stage;d.dataUploadCounter<q.MAX_GPU_UPLOADS_PER_FRAME&&b?(a.setData(b.tileData,b.client,b.refKeys),
d.dataUploadCounter++):b?this._parsedDataQueue.set(a,b):a.setData(null,null)};f.prototype.createRenderParams=function(a){return z({},h.prototype.createRenderParams.call(this,a),{renderPass:null,styleLayer:null,styleLayerId:-1,glyphMosaic:this._glyphMosaic,spriteMosaic:this._spriteMosaic,fadeRecorder:this._fadeRecorder,hasClipping:!!this._clippingInfos})};f.prototype.doRender=function(a){!this.visible||a.drawPhase!==m.WGLDrawPhase.MAP&&a.drawPhase!==m.WGLDrawPhase.DEBUG||void 0===this._spriteMosaic||
h.prototype.doRender.call(this,a)};f.prototype.createTile=function(a){var b=this._tileInfoView.getTileBounds(v.create(),a);a=new G.VectorTile(a,this._styleRepository,b,[512,512]);a.rotation=this.stage.state.rotation;return a};f.prototype.destroyTile=function(a){a.destroy()};f.prototype.removeChild=function(a){this._parsedDataQueue.has(a)&&this._parsedDataQueue.delete(a);return h.prototype.removeChild.call(this,a)};f.prototype.renderChildren=function(a){if(a.drawPhase===m.WGLDrawPhase.DEBUG)h.prototype.renderChildren.call(this,
a);else{var b=this.stage;if(0<this._parsedDataQueue.size&&b.dataUploadCounter<q.MAX_GPU_UPLOADS_PER_FRAME)for(var d=C.pairsOfMap(this._parsedDataQueue),g=0;g<d.length&&b.dataUploadCounter<q.MAX_GPU_UPLOADS_PER_FRAME;g++){var c=d[g][0],e=d[g][1];c.setData(e.tileData,e.client,e.refKeys);this._parsedDataQueue.delete(c);b.dataUploadCounter++}this._fadeRecorder.recordLevel(a.displayLevel);this._doRender(a);(0<this._parsedDataQueue.size||this._fadeRecorder.needsRedraw())&&this.requestRender();0<this._pointToCallbacks.size&&
(b=a.context,d=b.getBoundFramebufferObject(),a.drawPhase=m.WGLDrawPhase.HITTEST,g=a.painter.effects.hittest,g.bind(a),this._doRender(a),g.draw(a,this._pointToCallbacks,6),b.bindFramebuffer(d))}};f.prototype.removeAllChildren=function(){this._parsedDataQueue.clear();for(var a=0;a<this.children.length;a++)this.children[a].dispose();h.prototype.removeAllChildren.call(this)};f.prototype._doRender=function(a){var b=a.context,d=this._styleRepository,g=d.layers;0<d.backgroundBucketIds.length&&(a.renderPass=
"background",this._renderBackgroundLayers(a,d.backgroundBucketIds));h.prototype.renderChildren.call(this,a);for(var d=this.children.filter(function(a){return a.visible}),c=0;c<d.length;c++){var e=d[c];e.triangleCount=0;e.commitChanges()}b.setStencilWriteMask(0);b.setColorMask(!0,!0,!0,!0);b.setStencilOp(7680,7680,7681);b.setStencilTestEnabled(!0);b.setBlendingEnabled(!1);b.setDepthTestEnabled(!0);b.setDepthWriteEnabled(!0);b.setDepthFunction(515);b.setClearDepth(1);b.clear(b.gl.DEPTH_BUFFER_BIT);
a.renderPass="opaque";for(c=g.length-1;0<=c;c--)this._renderStyleLayer(c,a,d);b.setDepthWriteEnabled(!1);b.setBlendingEnabled(!0);b.setBlendFunctionSeparate(1,771,1,771);a.renderPass="translucent";for(c=0;c<g.length;c++)this._renderStyleLayer(c,a,d);b.setDepthTestEnabled(!1);a.renderPass="symbol";for(c=0;c<g.length;c++)this._renderStyleLayer(c,a,d);b.bindVAO();b.setStencilTestEnabled(!0)};f.prototype._renderStyleLayer=function(a,b,d){var g=b.painter,c=b.renderPass,e=this._styleRepository.layers[a];
if(void 0!==e){var f;switch(e.type){case 0:return;case 1:if("opaque"!==c&&"translucent"!==b.renderPass)return;f="vtlFill";break;case 2:if("translucent"!==c)return;f="vtlLine";break;case 4:if("symbol"!==c)return;f="vtlCircle";break;case 3:if("symbol"!==c)return;f="vtlSymbol"}c=b.displayLevel;if(!(0===d.length||void 0!==e.minzoom&&e.minzoom>=c+1E-6||void 0!==e.maxzoom&&e.maxzoom<c-1E-6))for(b.styleLayerId=a,b.styleLayer=e,e=0;e<d.length;e++)if(d[e].layerData[a]){g.renderObjects(b,d,f);break}}};f.prototype._renderBackgroundLayers=
function(a,b){var d=this._tileInfoView.getTileCoverage(a.state,0,"smallest"),g=d.spans,c=d.lodInfo,e=c.level,f=this._styleRepository,h=a.context,m=a.displayLevel,q=a.painter,r=a.state,t=v.create(),p=[];if(this._renderPasses){var n=this._renderPasses[0];D.isSome(this._clippingInfos)&&(n.brushes[0].prepareState(a,this._clippingInfos[0]),n.brushes[0].drawMany(a,this._clippingInfos))}for(var n=this._backgroundTiles,w=0,k,x=0;x<g.length;x++)for(var l=g[x],y=l.row,u=l.colTo,l=l.colFrom;l<=u;l++)w<n.length?
(k=n[w],k.key.set(e,y,c.normalizeCol(l),c.getWorldForColumn(l)),this._tileInfoView.getTileBounds(t,k.key,!1),k.bounds=t,k.coords[0]=t[0],k.coords[1]=t[3]):(k=new K(e,y,c.normalizeCol(l),c.getWorldForColumn(l)),k=new I.TiledDisplayObject(k,this._tileInfoView.getTileBounds(v.create(),k),[512,512],[4096,4096]),n.push(k)),k.setTransform(r,this._tileInfoView.getTileResolution(k.key)),p.push(k),w++;h.setStencilWriteMask(0);h.setColorMask(!0,!0,!0,!0);h.setStencilOp(7680,7680,7681);h.setStencilFunction(514,
0,255);h.setStencilTestEnabled(!0);for(g=0;g<b.length;g++)c=b[g],e=f.layers[c],!e||void 0!==e.minzoom&&e.minzoom>=m+1E-6||void 0!==e.maxzoom&&e.maxzoom<m-1E-6||(a.styleLayerId=c,a.styleLayer=e,q.renderObjects(a,p,"vtlBackground"));J.pool.release(d)};return f}(F.TileContainer);p.VectorTileContainer=r});