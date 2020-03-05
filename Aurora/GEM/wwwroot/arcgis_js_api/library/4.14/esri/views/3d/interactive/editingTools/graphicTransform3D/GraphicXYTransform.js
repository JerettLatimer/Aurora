// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper ../../../../../core/Handles ../../../../../core/watchUtils ../../../../../core/libs/gl-matrix-2/mat4 ../../../../../core/libs/gl-matrix-2/mat4f64 ../../../../../core/libs/gl-matrix-2/vec3f64 ../../../../../support/elevationInfoUtils ../../Manipulator3D ../../manipulatorUtils ../manipulatorDragUtils ./graphicTransform3DToolConfig ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/GeometryUtil ../../../webgl-engine/materials/ColorMaterial".split(" "),
function(e,f,w,x,y,z,l,k,m,n,g,p,q,r,d,c,t,u,v){Object.defineProperty(f,"__esModule",{value:!0});var h;(h||(h={})).Highlighted=512;e=function(){function a(b){this._handles=new l;this.tool=b.tool}a.prototype.destroy=function(){this._clear()};a.prototype._clear=function(){this._handles.removeAll();this.tool.manipulators.remove(this.discManipulator);this.discManipulator=null};Object.defineProperty(a.prototype,"focused",{get:function(){return this.discManipulator.focused},enumerable:!0,configurable:!0});
Object.defineProperty(a.prototype,"dragging",{get:function(){return this.discManipulator.dragging},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"renderLocation",{get:function(){return this.discManipulator.renderLocation},enumerable:!0,configurable:!0});a.prototype.recreateManipulators=function(){var b=this;this._clear();this.discManipulator=this.createDiscManipulator();this.tool.manipulators.add(this.discManipulator);var a=d.createManipulatorDragEventPipeline(this.discManipulator,
function(a,c){c.next(d.screenToMapXYForGraphicAtLocation(b.tool.view,b.tool.graphic,a.elevationAlignedLocation)).next(function(a){"start"===a.action&&b.tool.emit("graphic-translate-start",{graphic:b.tool.graphic});return a}).next(d.dragGraphic(b.tool.graphic)).next(function(a){switch(a.action){case "start":case "update":(a.translationX||a.translationY||a.translationZ)&&b.tool.emit("graphic-translate",{graphic:b.tool.graphic,dx:a.translationX,dy:a.translationY,dz:a.translationZ,type:"translate"});
break;case "end":b.tool.emit("graphic-translate-stop",{graphic:b.tool.graphic})}return a})});this._handles.add(a);this._handles.add([k.init(this.tool.graphic,"geometry",function(){r.placeManipulatorAtGraphic(b.discManipulator,b.tool.graphic)}),this.discManipulator.events.on("immediate-click",function(b){b.stopPropagation()}),k.init(this.tool.graphic,["visible","layer.visible"],function(){b.discManipulator.visible=b.tool.graphic.visible&&b.tool.graphic.layer.visible})]);this._handles.add([this.discManipulator.events.on("focus",
function(){b.tool.updateManipulators()})])};a.prototype.updateManipulators=function(b,a){this.discManipulator.modelTransform=b;this.discManipulator.state=a?h.Highlighted:0};a.prototype.createDiscManipulator=function(){var b=this.tool.view,a=new t(u.createCylinderGeometry(c.DISC_HEIGHT,1,c.GEOMETRY_SEGMENTS,g.vec3f64.fromValues(0,0,1),g.vec3f64.fromValues(0,0,0)),"graphic-transform-disc"),d=m.mat4.fromScaling(n.mat4f64.create(),g.vec3f64.fromValues(c.DISC_RADIUS,c.DISC_RADIUS,c.DISC_RADIUS)),e=this.createMaterial(),
f=this.createMaterial(.5);return new q.Manipulator3D({view:b,renderObjects:[{geometry:a,material:e,transform:d,stateMask:h.Highlighted},{geometry:a,material:f,transform:d}],worldSized:!1,autoScaleRenderObjects:!1,focusMultiplier:1,touchMultiplier:1,radius:c.DISC_COLLISION_RADIUS,elevationInfo:p.getGraphicEffectiveElevationInfo(this.tool.graphic),collisionType:{type:"disc",direction:g.vec3f64.fromValues(0,0,1)}})};a.prototype.createMaterial=function(a){void 0===a&&(a=1);var b=c.HANDLE_COLOR.concat([a]);
a=new v({color:b,transparent:1!==a,cullFace:2},"graphic-transform");a.renderOccluded=2;return a};return a}();f.GraphicXYTransform=e});