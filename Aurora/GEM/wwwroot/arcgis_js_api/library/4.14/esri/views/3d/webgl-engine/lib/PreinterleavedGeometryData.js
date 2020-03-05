// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/compilerUtils ./ComponentUtils ./geometryDataUtils ../../../webgl/Util".split(" "),function(t,u,h,q,m,n){function r(a){switch(a){case 5120:return Int8Array;case 5126:return Float32Array;case 5124:return Int32Array;case 5122:return Int16Array;case 5121:return Uint8Array;case 5125:return Uint32Array;case 5123:return Uint16Array;default:h.neverReached(a)}}return function(){function a(f,g,e,k,c){void 0===e&&(e=null);void 0===k&&(k=a.DefaultOffsets);void 0===c&&
(c=a.DefaultIndices);this.preinterleaved=!0;this.primitiveType="triangle";this._positionData=null;var b=n.getStride(g)/4,b=f.length/b;this._hasDefaultIndices=c===a.DefaultIndices;this.indexCount=c.length;this._hasDefaultIndices&&(c=m.generateDefaultIndexArray(b),this.indexCount=b);for(var b={},l=0;l<g.length;l++){var d=g[l],h=new (r(d.type))(f.buffer),p=n.getBytesPerElement(d.type);b[d.name]={data:h,size:d.count,offsetIdx:d.offset/p,strideIdx:d.stride/p}}e&&(this._positionData=e,b.position={data:e.data,
size:3,offsetIdx:0,strideIdx:3});this._id=m.getNewId();this._vertexData=f;this._vertexAttributes=b;this._layout=g;this._indexData=c;this._componentOffsets=q.createOffsets(k);this._gpuMemoryUsage=f.byteLength+(this._hasDefaultIndices?0:c.byteLength)}Object.defineProperty(a.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"layout",{get:function(){return this._layout},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"componentOffsets",
{get:function(){return this._componentOffsets},enumerable:!0,configurable:!0});a.prototype.toRenderData=function(){var a={id:this._id.toString(),preinterleaved:!0,indexData:this._hasDefaultIndices?null:this._indexData,indexCount:this.indexCount,vertexData:this._vertexData,layout:this._layout};this._indexData=this._vertexData=null;this._vertexAttributes={position:this._vertexAttributes.position};return a};a.prototype.getIndices=function(a){return"position"===a&&this._positionData?this._positionData.indices:
this._indexData};a.prototype.getAttribute=function(a){return this._vertexAttributes[a]};a.prototype.estimateGpuMemoryUsage=function(){return this._gpuMemoryUsage};Object.defineProperty(a.prototype,"hasPositionData",{get:function(){return!!this._positionData},enumerable:!0,configurable:!0});a.DefaultOffsets=new Uint32Array(0);a.DefaultIndices=new Uint32Array(0);return a}()});