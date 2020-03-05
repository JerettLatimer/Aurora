// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/maybe ../../../../core/screenUtils ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../support/geometryUtils ../../support/stack ../../webgl-engine/lib/Intersector ../../webgl-engine/lib/intersectorUtils".split(" "),function(B,C,H,w,m,I,n,g,q,u){function D(d,a,b){for(var c=0;c<d.length;c++){var E=d[c];a&&!a(E)||b.push(E)}return b}function F(d){y||(y=new q(d));y.viewingMode=d;return y}Object.defineProperty(C,"__esModule",{value:!0});
B=function(){function d(a,b,c){this.viewingMode=a;this.layerProvider=b;this.view=c;this.tmpRay=n.ray.create();this.externalIntersectionHandlers=new Set;this.tolerance=q.DEFAULT_TOLERANCE;this.validateHUDIntersector=new q(this.viewingMode);this.validateHUDIntersector.options.hud=!1}d.prototype.intersectScreen=function(a,b){return this.intersectRay(this.getPickRay(a,this.tmpRay),F(this.viewingMode),b)};d.prototype.intersectScreenFreePointFallback=function(a,b){return this.intersectRayFreePointFallback(this.getPickRay(a,
this.tmpRay),b)};d.prototype.intersectRayFreePointFallback=function(a,b){return this.intersectRay(a,F(this.viewingMode),b)||this.intersectRayFreePointLocal(a,b)};d.prototype.intersectRay=function(a,b,c,d){b.options.selectionMode=!1;b.options.store=0;this.computeIntersection(a,b,d);return b.results.min?b.results.min.getIntersectionPoint(c):!1};d.prototype.getCenterRayWithSubpixelOffset=function(a,b,c,d){void 0===c&&(c=.5);void 0===d&&(d=.5);a.getRenderCenter(k,c,d);k[0]+=.0466;k[1]-=.0123;return n.ray.fromRenderAtEye(a,
k,b)};d.prototype.intersectIntersectorScreen=function(a,b,c){this.computeIntersection(this.getPickRay(a,this.tmpRay),b,c)};d.prototype.intersectToolIntersectorScreen=function(a,b,c){a=this.getPickRay(a,this.tmpRay);this.intersectToolIntersectorRay(a,b,c)};d.prototype.intersectToolIntersectorRay=function(a,b,c){b.options.selectionMode=!0;this.computeIntersection(a,b,c);var d=b.results.min;this.view.basemapTerrain&&this.view.basemapTerrain.isOpaque()||d.hasIntersectionPoint&&"TerrainRenderer"!==d.intersector||
(b.options.selectionMode=!1,this.computeIntersection(a,b,c))};d.prototype.setTolerance=function(a){void 0===a&&(a=q.DEFAULT_TOLERANCE);this.tolerance=a};d.prototype.addIntersectionHandler=function(a){this.externalIntersectionHandlers.add(a)};d.prototype.removeIntersectionHandler=function(a){this.externalIntersectionHandlers.delete(a)};d.prototype.getPickRay=function(a,b){void 0===b&&(b=n.ray.create());return n.ray.fromScreen(this.view.state.camera,a,b)};d.prototype.intersectRayFreePointLocal=function(a,
b){if("local"!==this.viewingMode)return!1;var c=this.view.dataExtent,d=Math.max(c.xmax-c.xmin,c.ymax-c.ymin,8*Math.max(c.xmax-c.xmin,c.ymax-c.ymin));if(0===d)return m.vec3.add(b,a.origin,m.vec3.normalize(g.sv3d.get(),a.direction)),!0;var e=this.view.state.camera,l=Math.max(0,c.xmin-e.eye[0],e.eye[0]-c.xmax),c=Math.max(0,c.ymin-e.eye[1],e.eye[1]-c.ymax),e=d/Math.max(1,Math.pow(Math.max(0,Math.log(d/(Math.abs(e.relativeElevation)+Number.MIN_VALUE))),2)),e=Math.max(e,Math.min(Math.sqrt(l*l+c*c),d)),
d=m.vec3.scale(g.sv3d.get(),a.direction,e/m.vec3.length(a.direction));m.vec3.add(b,a.origin,d);return!0};d.prototype.intersectElevationFromScreen=function(a,b,c){void 0===c&&(c=0);return this.intersectElevation(this.getPickRay(a,this.tmpRay),b,c)};d.prototype.intersectElevation=function(a,b,c){void 0===c&&(c=0);var d="on-the-ground"!==b.mode?b.offset+c:0,e=d/this.view.renderCoordsHelper.unitInMeters;if("absolute-height"===b.mode)return c=this.view.computeMapPointFromVec3d(this.view.renderCoordsHelper.intersectManifoldClosestSilhouette(a,
d,A)),c.z-=b.offset,c;var l=this.view.state.camera,f=w.castRenderScreenPointArray3(g.sv3d.get());l.projectPoint(a.origin,f);var k=this.prepareFilters(null,v),G=this.view.slicePlane,t=G?u.sliceFilterPredicate(G):null,h=new q(this.viewingMode);h.options.store=0;var p=a.origin;0!==d&&("local"===this.viewingMode?p=m.vec3.set(g.sv3d.get(),a.origin[0],a.origin[1],a.origin[2]-e):(z&&z.offset===d||(z={offset:d,verticalOffset:new u.VerticalOffsetForGlobalViewingMode(d)}),h.options.verticalOffset=z.verticalOffset));
var r=m.vec3.add(g.sv3d.get(),p,a.direction);h.reset(p,r);h.point=f;h.camera=l;h.filterPredicate=null;switch(b.mode){case "relative-to-scene":h.intersect(k.layers,f,l,this.tolerance,null,function(a){return a.metadata&&a.metadata.isElevationSource});this.externalIntersectionHandlers.forEach(function(a){"I3S"!==a.type&&"Terrain"!==a.type||a.intersect(h,a.slicePlane?t:null,p,r,f)});break;case "on-the-ground":case "relative-to-ground":this.externalIntersectionHandlers.forEach(function(a){"Terrain"===
a.type&&a.intersect(h,a.slicePlane?t:null,p,r,f)})}return h.results.min.getIntersectionPoint(A)?(b=this.view.computeMapPointFromVec3d(A),b.z=c,b):null};d.prototype.computeIntersection=function(a,b,c){var d=this,e=this.view.state.camera,l=w.castRenderScreenPointArray3(g.sv3d.get());e.projectPoint(a.origin,l);var f=this.prepareFilters(c,v);b.options.storeTerrainResults=f.filterLayerUid(u.TERRAIN_ID);b.options.selectOpaqueTerrainOnly=!c||!("include"in c||"exclude"in c);var k=a.origin,q=m.vec3.add(g.sv3d.get(),
a.origin,a.direction);b.reset(k,q);b.intersect(f.layers,l,e,this.tolerance);var t=(a=this.view.slicePlane)?u.sliceFilterPredicate(a):null;b.intersect(f.sliceableLayers,l,e,this.tolerance,t);var h=c&&(c.terrainLocationFeedbackEnabled||c.enableDraped);this.externalIntersectionHandlers.forEach(function(a){if(a.intersectionHandlerId===u.TERRAIN_ID){if(!h&&!f.filterLayerUid(u.TERRAIN_ID))return}else if(!f.filterLayerUid(a.intersectionHandlerId))return;a.intersect(b,a.slicePlane?t:null,k,q,l)});a=g.sv3d.get();
if(c&&c.enableDraped&&b.results.terrain.getIntersectionPoint(a)){c=this.view.basemapTerrain.overlayManager.renderer;var p=g.sv3d.get();this.view.renderCoordsHelper.fromRenderCoords(a,p,this.view.spatialReference);p[2]=this.view.basemapTerrain.getElevation(a[0],a[1],a[2],this.view.renderCoordsHelper.spatialReference)||0;c.intersect(b,p,f.filterRenderGeometry)}b.sortResults();c=b.results.hud;if(c.hasIntersectionPoint){var r=w.castRenderScreenPointArray3(g.sv3d.get()),x=g.sv3d.get(),n=g.sv3d.get();this.unprojectHUDResultRay(c.center,
r,x,n);a=m.vec3.distance(c.center,x)/m.vec3.distance(x,n)*.99;this.validateHUDIntersector.reset(x,n);this.validateHUDIntersector.intersect(f.layers,r,e,this.tolerance);this.validateHUDIntersector.intersect(f.sliceableLayers,r,e,this.tolerance,t);this.externalIntersectionHandlers.forEach(function(a){f.filterLayerUid(a.intersectionHandlerId)&&a.intersect(d.validateHUDIntersector,a.slicePlane?t:null,x,n,r)});e=this.validateHUDIntersector.results.min;if(null==e.dist||a<=e.dist)b.results.min.copyFrom(c),
b.results.all.splice(0,0,c)}};d.prototype.prepareFilters=function(a,b){var c=[],d=[];this.layerProvider.forEachLayer(function(a){a.isPickable&&(a.isSliceable?d:c).push(a)});b.include=a&&a.include;b.exclude=a&&a.exclude;b.layers.length=0;b.sliceableLayers.length=0;D(c,b.filterLayer,b.layers);D(d,b.filterLayer,b.sliceableLayers);return b};d.prototype.unprojectHUDResultRay=function(a,b,c,d){var e=this.view.state.camera;e.projectPoint(a,b);a=w.castRenderScreenPointArray3(g.sv3d.get());a[0]=b[0];a[1]=
b[1];a[2]=0;e.unprojectPoint(a,c);a[2]=1;e.unprojectPoint(a,d)};return d}();C.SceneIntersectionHelper=B;var y,v={include:null,exclude:null,layers:[],sliceableLayers:[],filterLayer:function(d){return v.filterLayerUid(d.apiLayerUid)},filterLayerUid:function(d){var a=v.include,b=v.exclude;return H.isNone(d)?null==a&&null==b:(null==a||a.has(d))&&(null==b||!b.has(d))},filterRenderGeometry:function(d){return v.filterLayerUid(d.data.layerUid)}},A=I.vec3f64.create(),k=w.createRenderScreenPointArray(),z=null});