// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/assignHelper ../../../geometry ../../../core/compilerUtils ../../../core/Evented ../../../core/maybe ../../../core/screenUtils ../../../core/libs/gl-matrix-2/mat3 ../../../core/libs/gl-matrix-2/mat3f64 ../../../core/libs/gl-matrix-2/mat4 ../../../core/libs/gl-matrix-2/mat4f64 ../../../core/libs/gl-matrix-2/vec2 ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../geometry/support/aaBoundingRect ../../../layers/graphics/dehydratedFeatures ../../3d/support/ElevationProvider ../../3d/support/geometryUtils ../../3d/support/projectionUtils ../../3d/support/stack ../../3d/webgl-engine/lib/Camera ../../3d/webgl-engine/lib/Layer ../../3d/webgl-engine/lib/Object3D".split(" "),
function(B,C,Z,aa,y,O,P,l,q,D,Q,t,u,R,h,p,S,E,z,n,F,v,T,U,V){function G(b){return 0!==b[12]||0!==b[13]||0!==b[14]}Object.defineProperty(C,"__esModule",{value:!0});B=function(){function b(a){this.camera=new T.default;this._elevation={offset:0,override:0};this._hideOnGrab=!1;this.collisionType={type:"point"};this.collisionPriority=0;this.renderObjects=[];this._visible=this.autoScaleRenderObjects=!0;this._radius=10;this._worldSized=!1;this.focusMultiplier=2;this.touchMultiplier=2.5;this.worldOriented=
!1;this._modelTransform=u.mat4f64.create();this._worldFrame=null;this._renderLocation=p.vec3f64.create();this._renderLocationDirty=!0;this._elevationAlignedLocation=new y.Point;this.interactive=this._elevationAlignedLocationDirty=!0;this.selectable=!1;this.cursor=null;this._selected=this._hovering=this.dragging=this._grabbing=!1;this._state=0;this._focused=!1;this.events=new P({target:this});this._screenLocation={screenPointArray:q.createScreenPointArray(),renderScreenPointArray:q.createRenderScreenPointArray3(),
pixelSize:0};this._screenLocationDirty=!0;this._engineResourcesAddedToStage=!1;this._engineResources=null;this._attached=!1;this._materialIdReferences=this._engineLayerId=null;this._location=new y.Point({x:0,y:0,z:0,spatialReference:a.view.spatialReference});for(var c in a)this[c]=a[c];this.view.state&&this.view.state.camera&&this.camera.copyFrom(this.view.state.camera)}b.prototype.destroy=function(){this._removeResourcesFromStage();this.camera=this.view=this._engineResources=null};Object.defineProperty(b.prototype,
"elevationInfo",{get:function(){return this._elevationInfo},set:function(a){this._elevationInfo=a;this._elevationAlignedLocationDirty=!0;this._updateEngineObject()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hideOnGrab",{get:function(){return this._hideOnGrab},set:function(a){this._hideOnGrab!==a&&(this._hideOnGrab=a,this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"visible",{get:function(){return this._visible},set:function(a){a!==
this._visible&&(this._visible=a,this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"radius",{get:function(){return this._radius},set:function(a){a!==this._radius&&(this._radius=a,this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"worldSized",{get:function(){return this._worldSized},set:function(a){a!==this._worldSized&&(this._worldSized=a,this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,
"modelTransform",{get:function(){return this._modelTransform},set:function(a){G(a)&&(this._screenLocationDirty=!0);t.mat4.copy(this._modelTransform,a);this._updateEngineObject()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"renderLocation",{get:function(){this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=u.mat4f64.create()),
F.computeLinearTransformation(this.view.renderSpatialReference,this._renderLocation,this._worldFrame,this.view.renderSpatialReference),this._worldFrame[12]=0,this._worldFrame[13]=0,this._worldFrame[14]=0):this._worldFrame&&(this._worldFrame=null));return this._renderLocation},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"location",{get:function(){return this._location},set:function(a){E.clonePoint(a,this._location);this._elevationAlignedLocationDirty=this._screenLocationDirty=
this._renderLocationDirty=!0;this._updateEngineObject()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"elevationAlignedLocation",{get:function(){if(!this._elevationAlignedLocationDirty)return this.elevationAlignedLocation;this._evaluateElevationAlignment();this._updateElevationAlignedLocation();return this._elevationAlignedLocation},set:function(a){E.clonePoint(a,this._location);this._evaluateElevationAlignment();this._location.z-=this._elevation.offset;this._updateElevationAlignedLocation();
this._updateEngineObject()},enumerable:!0,configurable:!0});b.prototype._updateElevationAlignedLocation=function(){this._elevationAlignedLocation.x=this.location.x;this._elevationAlignedLocation.y=this.location.y;var a=l.isSome(this._elevation.override)?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.z=a+this._elevation.offset;this._elevationAlignedLocation.spatialReference=this.location.spatialReference;this._screenLocationDirty=this._renderLocationDirty=!0};Object.defineProperty(b.prototype,
"grabbing",{get:function(){return this._grabbing},set:function(a){a!==this._grabbing&&(this._grabbing=a,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hovering",{get:function(){return this._hovering},set:function(a){a!==this._hovering&&(this._hovering=a,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"selected",
{get:function(){return this._selected},set:function(a){a!==this._selected&&(this._selected=a,this._updateEngineObject())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"state",{get:function(){return this._state},set:function(a){a!==this._state&&(this._state=a,this._updateEngineObject())},enumerable:!0,configurable:!0});b.prototype._setFocused=function(a){a!==this._focused&&(this._focused=a,this.events.emit("focus",{action:!0===a?"focus":"unfocus"}))};Object.defineProperty(b.prototype,
"focused",{get:function(){return this._focused},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"screenLocation",{get:function(){this.ensureScreenLocation();return this._screenLocation},enumerable:!0,configurable:!0});b.prototype.ensureScreenLocation=function(){if(this._screenLocationDirty){this._screenLocation.pixelSize=this.camera.computeScreenPixelSizeAt(this.renderLocation);this._screenLocationDirty=!1;var a;G(this._modelTransform)?(a=this._calculateModelTransformOffset(W),a=
h.vec3.add(a,a,this.renderLocation)):a=this.renderLocation;this.camera.projectPoint(a,this._screenLocation.renderScreenPointArray);this.camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)}};b.prototype.intersectionDistance=function(a,c){if(!this.visible)return null;var b=q.screenPointObjectToArray(a,X),g=this._getCollisionRadius(c);c=-1*this.collisionPriority;switch(this.collisionType.type){case "point":if(R.vec2.squaredDistance(this.screenLocation.screenPointArray,
b)<g*g)return this.screenLocation.renderScreenPointArray[2]+c;break;case "line":var k=this.collisionType.paths;a=this._getWorldToScreenObjectScale();a=this._calculateObjectTransform(a,w);for(var g=g*this.screenLocation.pixelSize,b=n.ray.fromScreen(this.camera,b,A),f=0,d=k;f<d.length;f++)if(k=d[f],0!==k.length)for(var e=h.vec3.transformMat4(H,k[0],a),m=1;m<k.length;m++){var l=h.vec3.transformMat4(I,k[m],a),r=n.lineSegment.closestRayDistance2(n.lineSegment.fromPoints(e,l,J),b);if(null!=r&&r<g*g)return a=
h.vec3.add(v.sv3d.get(),e,l),h.vec3.scale(a,a,.5),g=q.castRenderScreenPointArray(v.sv3d.get()),this.camera.projectPoint(a,g),g[2]+c;h.vec3.copy(e,l)}break;case "disc":e=this.collisionType.direction;a=this._getWorldToScreenObjectScale();a=this._calculateObjectTransform(a,w);g*=this.screenLocation.pixelSize;b=n.ray.fromScreen(this.camera,b,A);m=D.mat3.fromMat4(K,a);m=h.vec3.transformMat3(L,e,m);e=this._calculateModelTransformPosition(M);n.plane.fromPositionAndNormal(e,m,x);f=N;if(n.plane.intersectRay(x,
b,f)&&h.vec3.squaredDistance(f,e)<g*g)return this.screenLocation.renderScreenPointArray[2]+c;break;case "ribbon":a=this.collisionType;k=a.paths;e=a.direction;a=this._getWorldToScreenObjectScale();a=this._calculateObjectTransform(a,w);g*=this.camera.computeScreenPixelSizeAt(this.renderLocation);b=n.ray.fromScreen(this.camera,b,A);m=D.mat3.fromMat4(K,a);m=h.vec3.transformMat3(L,e,m);e=this._calculateModelTransformPosition(M);n.plane.fromPositionAndNormal(e,m,x);f=N;if(!n.plane.intersectRay(x,b,f))break;
b=0;for(d=k;b<d.length;b++)if(k=d[b],0!==k.length)for(e=h.vec3.transformMat4(H,k[0],a),m=1;m<k.length;m++){l=h.vec3.transformMat4(I,k[m],a);r=n.lineSegment.distance2(n.lineSegment.fromPoints(e,l,J),f);if(null!=r&&r<g*g)return a=h.vec3.add(v.sv3d.get(),e,l),h.vec3.scale(a,a,.5),g=q.castRenderScreenPointArray(v.sv3d.get()),this.camera.projectPoint(a,g),g[2]+c;h.vec3.copy(e,l)}break;default:O.neverReached(this.collisionType)}return null};b.prototype.attach=function(a){void 0===a&&(a={manipulator3D:{}});
if(this.view._stage){a=a.manipulator3D;this._engineLayerId=a.engineLayerId;if(l.isNone(this._engineLayerId)){var c=new U("manipulator-3d",{isPickable:!1});this.view._stage.add(0,c);this.view._stage.addToViewContent([c.id]);this._engineLayerId=c.id;a.engineLayerId=c.id}a.engineLayerReferences=(a.engineLayerReferences||0)+1;this._materialIdReferences=a.materialIdReferences;l.isNone(this._materialIdReferences)&&(this._materialIdReferences=new Map,a.materialIdReferences=this._materialIdReferences);this.camera.copyFrom(this.view.state.camera);
this._attached=!0;this._updateEngineObject();F.canProject(this._location.spatialReference,this.view.spatialReference)||(this.location=new y.Point({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))}};b.prototype.detach=function(a){void 0===a&&(a={manipulator3D:{}});a=a.manipulator3D;a.engineLayerReferences--;var c=0===a.engineLayerReferences;c&&(a.engineLayerId=null);this._removeResourcesFromStage(c);this._materialIdReferences=this._engineLayerId=this._engineResources=null;this._attached=
!1};b.prototype.onViewChange=function(){this.camera.copyFrom(this.view.state.camera);this._screenLocationDirty=!0;this._updateEngineObject()};b.prototype.onElevationChange=function(a){S.containsPointObject(a.extent,this.location)&&(this._elevationAlignedLocationDirty=!0,this._updateEngineObject())};b.prototype._evaluateElevationAlignment=function(a){void 0===a&&(a=this.location);if(l.isNone(this.elevationInfo))return!1;var c=null,b=0;switch(this.elevationInfo.mode){case "on-the-ground":c=z.getElevationAtPoint(this.view.elevationProvider,
a,"ground")||0;break;case "relative-to-ground":b=(z.getElevationAtPoint(this.view.elevationProvider,a,"ground")||0)+(this.elevationInfo.offset||0);break;case "relative-to-scene":b=(z.getElevationAtPoint(this.view.elevationProvider,a,"scene")||0)+(this.elevationInfo.offset||0);break;case "absolute-height":b=this.elevationInfo.offset||0}return b!==this._elevation.offset||c!==this._elevation.override?(this._elevation.offset=b,this._elevation.override=c,!0):!1};b.prototype._updateEngineObject=function(){if(this._attached)if(!1===
this.visible)this._removeResourcesFromStage();else{var a=this._getWorldToScreenObjectScale(),b=w;!0===this.autoScaleRenderObjects&&(a*=this._getFocusedSize(this._radius,this.focused));this._calculateObjectTransform(a,b);for(var a=this._ensureEngineResources().objectsByState,l=(this.focused?2:1)|(this.selected?8:4),g=this.hideOnGrab&&this.grabbing,k=0;k<a.length;k++){var f=a[k],d=f.stateMask,f=f.objects;if(g)for(var d=0,e=f;d<e.length;d++)f=e[d],f.hideAllComponents();else if(e=0===(d&65520)||(this.state&
d)===(d&65520),0!==(d&15)&&(l&d)!==(d&15)||!e)for(d=0,e=f;d<e.length;d++)f=e[d],f.hideAllComponents();else for(d=0,e=f;d<e.length;d++)f=e[d],f.unhideAllComponents(),f.objectTransformation=b}}};b.prototype._ensureEngineResources=function(){if(l.isNone(this._engineResources)){var a=this.view._stage.getContent(0,l.expect(this._engineLayerId)),b=[],h=new Set;this.renderObjects.forEach(function(a){a=a.material;h.has(a)||(b.push(a),h.add(a))});var g=function(a,b){var c=b.geometry,d=b.material,f=b.transform;
Array.isArray(c)?c.forEach(function(b){return a.addGeometry(b,d,f)}):a.addGeometry(c,d,f)},k=new Map;this.renderObjects.forEach(function(a){var b=new V({idHint:"manipulator"});g(b,a);a=a.stateMask||0;var c=k.get(a)||[];c.push(b);k.set(a,c)});var f=[];k.forEach(function(a,b){f.push({stateMask:b,objects:a})});this._engineResources={objectsByState:f,layer:a,materials:b}}this._addResourcesToStage();return this._engineResources};b.prototype._addResourcesToStage=function(){var a=this;if(!this._engineResourcesAddedToStage&&
!l.isNone(this._engineResources)){var b=this._engineResources,h=b.objectsByState,g=b.layer;b.materials.forEach(function(b){var c=l.expect(a._materialIdReferences),d=c.get(b.id)||0;0===d&&a.view._stage.add(3,b);c.set(b.id,d+1)});h.forEach(function(b){b.objects.forEach(function(b){g.addObject(b);a.view._stage.add(1,b)})});this._engineResourcesAddedToStage=!0}};b.prototype._removeResourcesFromStage=function(a){var b=this;void 0===a&&(a=!1);if(this._engineResourcesAddedToStage&&!l.isNone(this._engineResources)){var h=
this._engineResources,g=h.layer,k=h.materials;h.objectsByState.forEach(function(a){a.objects.forEach(function(a){g.removeObject(a);b.view._stage.remove(1,a.id)})});k.forEach(function(a){var c=l.expect(b._materialIdReferences),e=c.get(a.id);1===e?(b.view._stage.remove(3,a.id),c.delete(a.id)):c.set(a.id,e-1)});a&&this.view._stage.remove(0,g.id);this._engineResourcesAddedToStage=!1}};b.prototype._getCollisionRadius=function(a){return this._getFocusedSize(this.radius,!0)*("touch"===a?this.touchMultiplier:
1)};b.prototype._getFocusedSize=function(a,b){return a*(b?this.focusMultiplier:1)};b.prototype._getWorldToScreenObjectScale=function(){return this._worldSized?1:this.screenLocation.pixelSize};b.prototype._calculateModelTransformPosition=function(a){var b=this._getWorldToScreenObjectScale(),b=this._calculateObjectTransform(b,Y);return h.vec3.set(a,b[12],b[13],b[14])};b.prototype._calculateModelTransformOffset=function(a){var b=this._calculateModelTransformPosition(a);return h.vec3.subtract(a,b,this.renderLocation)};
b.prototype._calculateObjectTransform=function(a,b){t.mat4.set(b,a,0,0,0,0,a,0,0,0,0,a,0,0,0,0,1);t.mat4.multiply(b,b,this._modelTransform);this._worldFrame&&t.mat4.multiply(b,b,this._worldFrame);b[12]+=this.renderLocation[0];b[13]+=this.renderLocation[1];b[14]+=this.renderLocation[2];b[15]=1;return b};return b}();C.Manipulator3D=B;var X=q.createScreenPointArray(),J=n.lineSegment.create(),A=n.ray.create(),K=Q.mat3f64.create(),Y=u.mat4f64.create(),w=u.mat4f64.create(),x=n.plane.create(),H=p.vec3f64.create(),
I=p.vec3f64.create(),N=p.vec3f64.create(),L=p.vec3f64.create(),M=p.vec3f64.create(),W=p.vec3f64.create()});