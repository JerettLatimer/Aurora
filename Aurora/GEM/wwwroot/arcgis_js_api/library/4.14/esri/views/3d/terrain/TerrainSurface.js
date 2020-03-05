// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../Color ../../../core/Accessor ../../../core/arrayUtils ../../../core/CollectionFlattener ../../../core/Evented ../../../core/Handles ../../../core/Logger ../../../core/mathUtils ../../../core/maybe ../../../core/ObjectPool ../../../core/PooledArray ../../../core/promiseUtils ../../../core/scheduling ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../core/libs/gl-matrix-2/mat4 ../../../core/libs/gl-matrix-2/mat4f64 ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../core/libs/gl-matrix-2/vec4f64 ../../../geometry/support/aaBoundingRect ../../../layers/support/LercWorker ../../../layers/support/TilemapCache ../../2d/engine/vectorTiles/VectorTile ../layers/ElevationLayerView3D ../support/debugFlags ../support/geometryUtils ../support/projectionUtils ../support/StreamDataLoader ./ElevationBounds ./ElevationData ./ElevationTileAgent ./MapTileAgent ./OverlayManager ./PlanarPatch ./SphericalPatch ./SurfaceExtentHelper ./SurfaceTilingSchemeLogic ./TerrainConst ./TerrainRenderer ./terrainUtils ./Tile ./TilemapOnlyTile ./TileTexture ./tileUtils ./tileUtils ./UpsampleInfo ../../support/index ../../webgl/Util @dojo/framework/shim/Promise".split(" "),
function(V,y,W,X,k,Y,Z,I,aa,ba,ca,da,ea,J,D,K,n,fa,z,g,ga,ha,ia,M,ja,r,N,w,ka,la,L,O,E,ma,na,P,oa,pa,qa,ra,sa,Q,ta,q,ua,m,va,wa,xa,x,R,ya,za,S){function T(g,b){return g[0]===b[0]&&g[1]===b[1]&&g[2]===b[2]}function U(g,b){var a=!1;b=b||g;var c=0;for(g=g.children;c<g.length;c++){var d=g[c];if(d){for(var e=0;e<d.layerInfo.length;e++)for(var h=0,f=d.layerInfo[e];h<f.length;h++){var l=f[h].upsampleInfo;if(l&&l.tile===b)return!0}a=a||U(d,b)}}return a}function A(g){return g.isLeaf?!1:g.children[0].shouldRender||
g.children[1].shouldRender||g.children[2].shouldRender||g.children[3].shouldRender||A(g.children[0])||A(g.children[1])||A(g.children[2])||A(g.children[3])}var t=da.getLogger("esri.views.3d.terrain.TerrainSurface");y=function(y){function b(a){a=y.call(this,a)||this;a.defaultTileBackground=q.DEFAULT_TILE_BACKGROUND;a.hideSkirtsDistanceFromExtentMargin=Aa;a.hideSkirtsMinimumCameraTilt=Ba;a.hideSkirtsMaximumCameraTilt=Ca;a._clippingExtent=null;a._dataExtent=null;a._elevationBounds=new na.ElevationBounds;
a._rootExtent=r.create();a._iteratorPool=new D(R.IteratorPreorder);a._postorderIterator=new R.IteratorPostorder;a._visible=!1;a._pendingUpdates=!1;a._asyncWorkItems=0;a._usedMemory=B;a._isFrameProcessing=!1;a._viewChangeUpdateDirty=!1;a._overlayOpacity=1;a._eyePosRenderSR=M.vec3f64.create();a._eyePosSurfaceSR=M.vec3f64.create();a._splitLimits=new va.SplitLimits;a._snapLevel=Infinity;a._frustum=O.frustum.create();a._viewProjectionMatrix=ha.mat4f64.create();a._layerViews=[[],[]];a._layerIndexByLayerViewId=
[new Map,new Map];a._basemapLayerViewHandles=new Map;a._handles=new ca;a._allTiles=new K;a._topLevelTilemapOnlyTiles=[];a._upsampleInfoPool=new D(ya);a._visibleLevels=new K({deallocator:null});a._getElevationData={spatialReference:null,rootTiles:null};a.maxTextureScale=1.2;a.rootTiles=null;a.backgroundImage=q.DEFAULT_TILE_BACKGROUND;a.backgroundColor=null;a._scheduledLayerViewChangesHandle=null;return a}X(b,y);b.prototype.initialize=function(){var a=this;this._stage=this.view._stage;this._lercWorker=
N.acquireInstance(this.view.resourceController.scheduler);this._tilePool="planar"===this.manifold?new D(ra.PlanarPatch):new D(sa.SphericalPatch);this._upsampleMapCache=this.view.resourceController.memoryController.getMemCache("esri.views.3d.terrain.upsample",function(a){return a.unloadMapData()});this._set("overlayManager",new qa.OverlayManager({terrainSurface:this,view:this.view}));this._handles.add(this.watch("overlayManager.hasHighlights",function(c){return a._handleHasHighlights(c)}),"overlayManager");
this._renderer=new ua({manifold:this.manifold,overlayRenderer:this.overlayManager.renderer});this._renderer.install(this.view._stage);z.init(this,"_background",function(){a._renderer.setTileBackground(a._background)},!0);this._handles.add([this.view.watch("pointsOfInterest",function(c){a._renderer.pointsOfInterest=c}),z.whenTrue(L,"TERRAIN_DEBUG_POPUP",function(){(new Promise(function(a,c){V(["./support/TerrainDebugPopupOpener"],a,c)})).then(function(c){var d=new c.TerrainDebugPopupOpener({surface:a});
z.whenFalseOnce(L,"TERRAIN_DEBUG_POPUP",function(){return d.destroy()})})})]);var c={layers:this.view.map.allLayers,layerViews:this.view.allLayerViews,spatialReference:this.view.spatialReference};this.extentHelper="spherical"===this.manifold?new Q.SurfaceExtentHelperGlobal(c):new Q.SurfaceExtentHelperLocal(c);this._handles.add(z.init(this.extentHelper,"stencilEnabledExtents",function(c){return a._renderer.setStencilEnabledLayerExtents(c)}),"extentHelper");c=this.view.defaultsFromMap?new aa({root:this.view.map,
rootCollectionNames:this.view.defaultsFromMap.mapCollectionPaths,getChildrenFunction:function(a){return a.layers}}):this.view.map.allLayers;c=new ta({layers:c,extentHelper:this.extentHelper,manifold:this.manifold,viewSpatialReference:this.view.spatialReference});this._set("tilingSchemeLogic",c);this._handles.add([this.tilingSchemeLogic.watch("tilingScheme",function(){return a._updateTilingSchemeAndExtent()},!0),this.tilingSchemeLogic.watch("extent",function(){return a._updateTilingSchemeAndExtent()},
!0)],"tilingSchemeLogic");this._updateTilingSchemeAndExtent();this._elevationDataRequester=this.view.resourceController.createStreamDataRequester(0);this._mapDataRequester=this.view.resourceController.createStreamDataRequester(1);this._handles.add(this.view.resourceController.scheduler.registerTask(za.Task.TERRAIN_SURFACE,function(c){return a._frame(c)},function(){return a.updating}));this.view.resourceController.memoryController.events.on("quality-changed",function(){return a._viewChangeUpdate()});
this._handles.add([this.view.on("resize",function(){return a._viewChangeUpdate()}),this.view.watch("state.camera",function(){return a._viewChangeUpdate()},!0),this.view.watch("qualitySettings.tiledSurface.lodBias",function(){return a._viewChangeUpdate()}),z.init(this.view,"qualitySettings.tiledSurface.textureBlendTime",function(c){return a._renderer.blendingEnabled=0<c}),this.view.watch("lodSnapping",function(){return a._viewChangeUpdate()}),this.view.watch("clippingArea",function(){return a._clippingChanged()})]);
this._handles.add(this.view.allLayerViews.on("after-changes",function(){return a._scheduleLayerViewChangesUpdate()}));this._handleLayerViewChanges();this._updateClippingExtent();this.notifyChange("extent")};b.prototype.destroy=function(){var a=this;this._handles.destroy();N.releaseInstance(this._lercWorker);this._lercWorker=null;this._removeAllTiles();this._upsampleMapCache.destroy();this._upsampleMapCache=null;this.tilingSchemeLogic.destroy();this._set("tilingSchemeLogic",null);this.extentHelper.destroy();
this.extentHelper=null;this._basemapLayerViewHandles.forEach(function(c,d){return a._unregisterTiledLayerView(d)});this._mapDataRequester=this._elevationDataRequester=null;this.overlayManager&&(this.overlayManager.destroy(),this._set("overlayManager",null));this._tilePool.destroy();this._tilePool=null;oa.Pool.prune(0);pa.Pool.prune(0);this._renderer.uninstall(this._stage);this._renderer.destroy();this._renderer=null;this._iteratorPool.destroy();this._iteratorPool=null;this._set("view",null);this._stage=
null;this._upsampleInfoPool.destroy();this._upsampleInfoPool=null};Object.defineProperty(b.prototype,"renderer",{get:function(){return this._renderer},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"frustum",{get:function(){return this._frustum},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"snapLevel",{get:function(){return Math.round(this._snapLevel)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"upsampleInfoPool",{get:function(){return this._upsampleInfoPool},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"upsampleMapCache",{get:function(){return this._upsampleMapCache},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"cullBackFaces",{set:function(a){this._renderer.cullBackFaces=a;this._set("cullBackFaces",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"extent",{get:function(){return this._clippingExtent||this._rootExtent},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",
{get:function(){return!(!(this._pendingUpdates||this._renderer.updating||this._scheduledLayerViewChangesHandle)||!this.ready||this._get("suspended"))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"baseOpacity",{set:function(a){var c=this._renderer.opaque;this._renderer.opaque=1<=a;this._set("baseOpacity",a);this._updateTileTextures(c!==this._renderer.opaque)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"ready",{get:function(){return!!this.rootTiles},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"renderOrder",{set:function(a){this._renderer.renderOrder=a;this._set("renderOrder",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"skirtScale",{set:function(a){this._renderer.skirtScale=a;this._set("skirtScale",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"spatialReference",{get:function(){var a=this.tilingScheme&&this.tilingScheme.spatialReference||null;return this._getElevationData.spatialReference=
a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_background",{get:function(){return null!=this.backgroundColor?this.backgroundColor:this.backgroundImage},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"slicePlaneEnabled",{set:function(a){this._renderer.slicePlane=a;this._set("slicePlaneEnabled",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"velvetOverground",{set:function(a){a!==this.velvetOverground&&(this._renderer.velvetOverground=
a);this._set("velvetOverground",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"wireframe",{set:function(a){this._renderer.setWireframe(a);this._set("wireframe",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"visible",{set:function(a){a!==this._visible&&(this._visible=a,this._renderer.setVisibility(a),this.suspended=!a)},enumerable:!0,configurable:!0});b.prototype.isOpaque=function(){return this._renderer.opaque};Object.defineProperty(b.prototype,"suspended",
{set:function(a){this._set("suspended",a);this._viewChangeUpdate()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"lodSnapping",{get:function(){return this.view.qualitySettings.tiledSurface.reduceTileLevelDifferences?0:1},enumerable:!0,configurable:!0});b.prototype.intersect=function(a,c,d,b){this._renderer.intersect(a,c,d,b)};b.prototype.getElevation=function(a,c,d,b){var e=this._getElevationData.rootTiles;if(!e||!e.length||0===e[0].layerInfo[0].length)return null;var f=C;f[0]=
a;f[1]=c;f[2]=d;if(!E.vectorToVector(f,b,f,this._getElevationData.spatialReference))return t.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;for(c=0;c<e.length;c++)if(a=e[c],a.containsPoint(f)){for(;a&&!a.rendered&&!a.isLeaf;)e=0,f[0]>.5*(a.extent[0]+a.extent[2])&&(e+=1),f[1]<.5*(a.extent[1]+a.extent[3])&&(e+=2),a=a.children[e];if(e=(e=a.renderData)&&e.geometryState?e.geometryState.samplerData:null)return P.ElevationData.sample(f[0],f[1],
e);break}return null};Object.defineProperty(b.prototype,"elevationBounds",{get:function(){return this._elevationBounds},enumerable:!0,configurable:!0});b.prototype.getScale=function(a){if(this.tilingScheme){if(!E.pointToVector(a,C,this.spatialReference))return t.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;var c=this.rootTiles;if(c)for(var d=0;d<c.length;d++)if(a=c[d],a.containsPoint(C)){for(;null!=a.children[0];)c=0,C[0]>a.children[0].extent[2]&&
(c+=1),C[1]<a.children[0].extent[1]&&(c+=2),a=a.children[c];return this._getLodBiasCorrectedScale(a.level)}}return 1E100};b.prototype.queryVisibleScaleRange=function(a,c,d,b){c=c?this.tilingScheme.levelAtScale(c):0;d=d?this.tilingScheme.levelAtScale(d):Infinity;var e=this.lodBias;this._renderer.queryVisibleLevelRange(a,c+e,d+e,b)};b.prototype._updateTilingSchemeAndExtent=function(){var a=this.tilingSchemeLogic.extent,c=a&&!r.equals(a,this._dataExtent);c&&(this._dataExtent?r.set(this._dataExtent,a):
this._dataExtent=r.create(a));var a=this.tilingSchemeLogic.tilingScheme,d=a!==this.tilingScheme;d&&(m.weakAssert(!!a,"tiling scheme cannot be reset to undefined"),this.tilingScheme&&this._removeAllTiles(),this._set("tilingScheme",a),this._updateClippingExtent(),a&&(this._updateTiledLayers(),this._renderer.setTileSize(a.pixelSize),this.overlayManager.setSpatialReference(a.spatialReference,"spherical"===this.manifold)));(c||d)&&this._updateRootTiles()};b.prototype._acquireTile=function(a,c,d,b){var e=
this._tilePool.acquire();F[0]=a;F[1]=c;F[2]=d;e.init(F,b,this);return e};b.prototype._updateRootTiles=function(){var a=this,c=this._clippingExtent||this._dataExtent,d=this.tilingScheme;if(c&&d){var b=Da,h=d.rootTilesInExtent(c,b,5*q.MAX_ROOT_TILES),f=function(c){c=a._acquireTile(0,c[1],c[2],null);1===c.shouldSplit(a._splitLimits,a._eyePosRenderSR,a.lodSnapping)&&c.setPendingUpdate(1);a._loadTile(c);return c};if(this.rootTiles){if(h.length>q.MAX_ROOT_TILES){t.warn(q.TOO_MANY_ROOT_TILES_AFTER_CHANGE_ERROR);
return}var c=this.rootTiles.map(function(a){return a.lij}),l=I.difference(c,h,T);if(0<l.removed.length||0<l.added.length){var p=this.rootTiles.filter(function(c){return-1<I.findIndex(l.removed,T.bind(null,c.lij))?(a._purgeTile(c),!1):!0});l.added.forEach(function(a){return p.push(f(a))});this._setRootTiles(p)}}else h.length>q.MAX_ROOT_TILES&&(t.warn(q.TOO_MANY_ROOT_TILES_FOR_LAYER_ERROR),h=d.rootTilesInExtent(c,b,q.MAX_ROOT_TILES)),this._setRootTiles(h.map(function(a){return f(a)}));r.equals(b,this._rootExtent)||
(this._rootExtent=r.create(b),this._hasFixedExtent()||this.notifyChange("extent"));this.visible=!0;this._viewChangeUpdate();this.overlayManager.setOverlayPlacementDirty();this.notifyChange("ready")}};b.prototype._setRootTiles=function(a){this._set("rootTiles",a);this._allTiles.clear();a&&this._allTiles.pushArray(a);this._getElevationData.rootTiles=a;this._renderer.setRootTiles(this.rootTiles);this._updateTiles(a)};b.prototype._runViewChangeUpdateIfDirty=function(){this._viewChangeUpdateDirty&&(this._viewChangeUpdateDirty=
!1,this._viewChangeUpdate())};b.prototype._viewChangeUpdate=function(){this._stage&&!this.suspended&&this.tilingScheme&&this._visible&&(this._isFrameProcessing?this._viewChangeUpdateDirty=!0:(this._viewChangeUpdateDirty=!1,this._updateViewDependentParameters(),this._updateSkirts(),this.updateOverlayOpacity(),this._updateTiles(this.rootTiles)))};b.prototype._updateClippingStatus=function(a){a.updateClippingStatus(this._clippingExtent)&&a.resetPendingUpdate(16)&&this._updateTileGeometry(a)};b.prototype._updateTiles=
function(a){if(a){var c=this._iteratorPool.acquire();c.reset(a);var d;x.hasVisibleSiblings(a)?(a=this._elevationBounds.min,d=this._elevationBounds.max):(a=Infinity,d=-Infinity);for(;!c.done;){var b=c.next();this._updateClippingStatus(b);b.updateVisibility();b.setPendingUpdate(8);if(b.visible){b.updateScreenDepth(this._viewProjectionMatrix);b.renderData&&(a=Math.min(b.elevationBounds[0],a),d=Math.max(b.elevationBounds[1],d));var h=b.shouldSplit(this._splitLimits,this._eyePosRenderSR,this.lodSnapping);
if(1===h){b.resetPendingUpdate(4);b.isLeaf&&(b.setPendingUpdate(1),c.skipSubtree());this._pendingUpdates=this._pendingUpdates||b.updating;continue}b.resetPendingUpdate(1)&&b.updateAgentSuspension();2===h&&b.updateAgents(0)}c.skipSubtree();if(!b.isLeaf){b.setPendingUpdate(4);b.resetPendingUpdate(1);h=this._iteratorPool.acquire();for(h.resetOne(b);!h.done;){var f=h.next();this._updateClippingStatus(f);f.updateVisibility();f.visible&&f.updateScreenDepth(this._viewProjectionMatrix)}this._iteratorPool.release(h)}this._pendingUpdates=
this._pendingUpdates||b.updating}this._iteratorPool.release(c);isFinite(a)&&isFinite(d)&&(this._elevationBounds.min!==a||this._elevationBounds.max!==d)&&(this._elevationBounds.min=a,this._elevationBounds.max=d,this.emit("elevation-bounds-change",null))}};b.prototype._updateViewDependentParameters=function(){var a=this.view.state.camera,c=Math.tan(.5*a.fovX),b=Math.tan(.5*a.fovY),e=this.tilingScheme.pixelSize,h=Math.pow(2,-this.lodBias)*a.pixelRatio;this._splitLimits.aboveGround=a.aboveGround;this._splitLimits.fovX=
c;this._splitLimits.fovY=b;this._splitLimits.relativeWidthLimit=e/a.width*this.maxTextureScale*h;this._splitLimits.relativeHeightLimit=e/a.height*this.maxTextureScale*h;this._splitLimits.maxLod=this.tilingScheme.getMaxLod();this._splitLimits.angledSplitBias=this.view.qualitySettings.tiledSurface.angledSplitBias;O.frustum.copy(a.frustum,this._frustum);ga.mat4.multiply(this._viewProjectionMatrix,a.projectionMatrix,a.viewMatrix);ia.vec3.copy(this._eyePosRenderSR,a.eye);E.vectorToVector(this._eyePosRenderSR,
this.view.renderSpatialReference,this._eyePosSurfaceSR,this.spatialReference)};b.prototype._updateSnapLevel=function(){if(1!==this.lodSnapping){var a=L.TESTS_DISABLE_UPDATE_THRESHOLDS?0:.1,c=this._findSnapLevel();Math.abs(this._snapLevel-c)<a||(a=this.snapLevel,this._snapLevel=c,a!==this.snapLevel&&this._updateTiles(this.rootTiles))}};b.prototype._findSnapLevel=function(){if(0>=this._visibleLevels.length)return this._snapLevel;var a=this._visibleLevels,c=Math.round(a.length*(Math.abs(this.view.camera.tilt-
90)/90*.4+.3));if(c>=a.length)return this._snapLevel;a.sort(function(a,c){return a-c});for(var b=0,e=c;e<a.length;++e)b+=a.getItemAt(e);e=a.getItemAt(Math.round(.95*a.length)-1);return Math.max(b/(a.length-c),e-1)};b.prototype._updateSkirts=function(){var a=this.view.state.camera;m.autoUpdateSkirtsVisibility(this,this._eyePosSurfaceSR,this.spatialReference,this.view.state.constraints.collision.enabled?0:1.11*a.near)};b.prototype._updateRender=function(a){a.rendered&&!a.shouldRender&&(A(a)?this._loadChildren(a):
a.isLeaf&&a.parent&&a.parent.shouldRender&&this._loadParent(a))};b.prototype._updateTileGeometry=function(a){a.updateVisibility();this._renderer.updateTileGeometry(a);this._elevationUpdate(a);this._usedMemory=B};b.prototype._elevationUpdate=function(a){G.spatialReference=this.spatialReference;G.tile=a;G.extent=a.extent;this.emit("elevation-change",G);r.containsPoint(a.extent,this._eyePosSurfaceSR)&&this._updateSkirts()};b.prototype._frame=function(a){var c=this;this._isFrameProcessing=!0;this._frameTraversal(a);
a.run(function(){return c._processElevation(a)});a.run(function(){return c._processTextures(a)});0!==this._asyncWorkItems&&(this._pendingUpdates=!0);this._isFrameProcessing=!1;this._runViewChangeUpdateIfDirty();this.notifyChange("updating")};b.prototype._frameTraversal=function(a){var c=this;if(!this.suspended&&this._pendingUpdates){var b=this._eyePosRenderSR,e=0,h=!1;this._pendingUpdates=!1;this._visibleLevels.clear();for(var f=function(){},l=0===this.lodSnapping?function(a){a.visible&&1!==a.shouldSplit(c._splitLimits,
b,1)&&a.parent&&1===a.parent.shouldSplit(c._splitLimits,b,1)&&c._visibleLevels.push(a.level)}:f;!a.done;){var p=!this._allTiles.some(function(b){e+=b.usedMemory;l(b);b.resetPendingUpdate(4)?(c._mergeTile(b),h=!0,a.madeProgress()):b.resetPendingUpdate(1)&&(c._splitTile(b),h=!0,a.madeProgress());b.resetPendingUpdate(8)&&(c._updateRender(b),a.madeProgress());c._pendingUpdates=c._pendingUpdates||b.updating;return a.done});this._pendingUpdates=this._pendingUpdates||!p;p&&l!==f&&this._updateSnapLevel();
l=f;if(h)this._pendingUpdates=!0,h=!1,x.sortTiles(this._renderer.renderOrder,this._allTiles);else if(p){this._usedMemory=e;break}}this._visibleLevels.clear()}};b.prototype._processElevation=function(a){var c=this;this._allTiles.some(function(b){b.resetPendingUpdate(16)&&(c._updateTileGeometry(b),a.madeProgress());return a.done});return a.hasProgressed};b.prototype._processTextures=function(a){var c=this;this._allTiles.some(function(b){b.resetPendingUpdate(32)&&(c._renderer.updateTileTexture(b),c._usedMemory=
B,a.madeProgress());return a.done});return a.hasProgressed};b.prototype._updateClippingExtent=function(){if(!this.spatialReference)return!1;var a=r.create(),c=null;E.extentToBoundingRect(this.view.clippingArea,a,this.spatialReference)&&(c=a);if(r.equals(c,this._clippingExtent))return!1;this._clippingExtent=c;this._renderer.clippingExtent=c;this.notifyChange("extent");this.updateTileOverlayParams();this.overlayManager.setOverlayPlacementDirty();return!0};b.prototype._clippingChanged=function(){this._updateClippingExtent()&&
this._updateRootTiles()};Object.defineProperty(b.prototype,"lodBias",{get:function(){return this.view.qualitySettings.tiledSurface.lodBias-(1-this.view.resourceController.memoryController.memoryFactor)*q.MAX_MEMORY_LOD_BIAS},enumerable:!0,configurable:!0});b.prototype._getLodBiasCorrectedScale=function(a){var c=this.tilingScheme.levels;a=ea.clamp(a-this.lodBias,0,c.length-1);var b=a-Math.floor(a);return c[Math.floor(a)].scale*(1-b)+c[Math.ceil(a)].scale*b};b.prototype._cancelTilemapRequests=function(a){var c=
0;for(a=a.layerInfo;c<a.length;c++){var b=a[c];if(b)for(var e=0;e<b.length;e++)b[e].abortTilemapRequest()}};b.prototype._removeAllTiles=function(){var a=this;this.rootTiles&&(this.rootTiles.forEach(function(c){return a._purgeTile(c)}),this._setRootTiles(null),this.notifyChange("ready"));this._allTiles.clear();for(var c=0,b=this._topLevelTilemapOnlyTiles;c<b.length;c++){var e=b[c];J.isSome(e)&&this._cancelTilemapRequests(e)}this.visible=!1};b.prototype._purgeChildTiles=function(a){if(a.isLeaf)return!1;
var c=this._purgeTile(a.children[0]),c=this._purgeTile(a.children[1])||c,c=this._purgeTile(a.children[2])||c,c=this._purgeTile(a.children[3])||c;a.unsetChildren();return c};b.prototype._purgeTile=function(a){var c=this._purgeChildTiles(a)||a.rendered;this._allTiles.removeUnordered(a);a.unload(this._renderer);this._cancelTilemapRequests(a);this._tilePool.release(a);return c};b.prototype._splitTile=function(a){m.weakAssert(a.isLeaf,"tile that is already split should not be split again!");var c=a.level+
1,b=2*a.lij[1],e=2*a.lij[2];a.setChildren(this._createTile(c,b,e,a),this._createTile(c,b,e+1,a),this._createTile(c,b+1,e,a),this._createTile(c,b+1,e+1,a));a.setPendingUpdate(8);a.updateAgentSuspension();this._allTiles.pushArray(a.children);u.spatialReference=this.spatialReference;u.extent=a.extent;u.scale=this._getLodBiasCorrectedScale(c);this._pendingUpdates=!0;this.emit("scale-change",u);return a.children[0].hasPendingUpdate(1)||a.children[1].hasPendingUpdate(1)||a.children[2].hasPendingUpdate(1)||
a.children[3].hasPendingUpdate(1)};b.prototype._createTile=function(a,c,b,e){m.weakAssert(!!e,"_createTile sanity check");a=this._acquireTile(a,c,b,e);a.updateClippingStatus(this._clippingExtent);a.visible&&(a.updateScreenDepth(this._viewProjectionMatrix),1===a.shouldSplit(this._splitLimits,this._eyePosRenderSR,this.lodSnapping)&&a.setPendingUpdate(1));return a};b.prototype._mergeTile=function(a){m.weakAssert(!a.hasPendingUpdate(1),"_mergeTile sanity check");this._purgeChildTiles(a)&&(m.weakAssert(!a.renderData,
"_mergeTile sanity check"),this._loadTile(a));u.spatialReference=this.spatialReference;u.extent=a.extent;u.scale=this._getLodBiasCorrectedScale(a.level);this._pendingUpdates=!0;this.emit("scale-change",u)};b.prototype._loadChildren=function(a){m.weakAssert(a.rendered,"parent should be rendered");a.unload(this._renderer);this._loadTile(a.children[0]);this._loadTile(a.children[1]);this._loadTile(a.children[2]);this._loadTile(a.children[3])};b.prototype._loadParent=function(a){a=a.parent;this._unloadChildren(a);
this._loadTile(a)};b.prototype._unloadChildren=function(a){a.isLeaf||(this._unloadChildren(a.children[0]),a.children[0].unload(this._renderer),this._unloadChildren(a.children[1]),a.children[1].unload(this._renderer),this._unloadChildren(a.children[2]),a.children[2].unload(this._renderer),this._unloadChildren(a.children[3]),a.children[3].unload(this._renderer))};b.prototype._loadTile=function(a){a.load(this._renderer);a.setPendingUpdate(8);this.overlayManager&&this.overlayManager.hasOverlays()&&this.overlayManager.setTileParameters(a,
a.renderData,this._overlayOpacity);this._elevationUpdate(a)};b.prototype._handleHasHighlights=function(a){this._renderer.setNeedsHighlight(a)};b.prototype._elevationDataArrived=function(a,c,b){b=new P.ElevationData(a.lij,a.extent,b);a.dataArrived(c,0,b);b=[a];a=a.level;var d=this._iteratorPool.acquire();for(d.reset(b);!d.done;){var h=d.next();h.findElevationBoundsForLayer(c,a);h.computeElevationBounds()}this._iteratorPool.release(d);this._updateTiles(b)};b.prototype._scheduleLayerViewChangesUpdate=
function(){var a=this;this._scheduledLayerViewChangesHandle||(this._scheduledLayerViewChangesHandle=fa.schedule(function(){return a._handleLayerViewChanges()}),this._handles.add(this._scheduledLayerViewChangesHandle,"scheduledLayerViewChangesHandle"))};b.prototype._handleLayerViewChanges=function(){var a=this;this._handles.remove("scheduledLayerViewChangesHandle");this._scheduledLayerViewChangesHandle=null;for(var c=!1,b=new Set,e=-1,h=0,f=this.view.allLayerViews.items;h<f.length;h++){var l=f[h];
b.add(l.uid);if(m.isTiledLayerView(l))if(this._basemapLayerViewHandles.has(l.uid)){var p=this.layerClassFromLayerView(l),l=this._layerIndexByLayerViewId[p].get(l.uid);l<e&&(c=!0);e=l}else this._registerTiledLayerView(l),l.layer.loaded&&(c=!0)}this._basemapLayerViewHandles.forEach(function(d,e){b.has(e)||(a._unregisterTiledLayerView(e),c=!0)});this.overlayManager&&this.overlayManager.updateLayerViews(b);c&&this._updateTiledLayers()};b.prototype.layerClassFromLayerView=function(a){return m.isElevationLayerView(a)?
0:1};b.prototype._registerTiledLayerView=function(a){var c=this,b=[],e=this.layerClassFromLayerView(a);b.push(a.watch("suspended",function(){return c._updateTiledLayers()}));b.push(a.watch("fullOpacity",function(){return c._updateTileTextures(!1)}));b.push(a.layer.watch("scaleRangeId",function(){return c._restartAllAgents(e)}));a.on("data-changed",function(){var b=c._layerIndexByLayerViewId[e].get(a.uid);null!=b&&c._invalidateLayerData(b,e)});this._basemapLayerViewHandles.set(a.uid,b)};b.prototype._unregisterTiledLayerView=
function(a){var c=this._basemapLayerViewHandles.get(a);if(c){for(var b=0;b<c.length;b++)c[b].remove();this._basemapLayerViewHandles.delete(a)}};b.prototype._updateTiledLayers=function(){var a=this;if(this.tilingScheme&&!this.view.suspended){var c=this.view.allLayerViews,b=[[],[]],e=null,h=r.empty();c.forEach(function(c){var d=c.layer;if(d&&!c.suspended&&m.isTiledLayerView(c)){var f=c.fullExtent;f?a.tilingScheme.compatibleWith(c.tileInfo)?(r.expand(h,f),d=a.layerClassFromLayerView(c),1===d&&(f=c.displayLevelRange,
Infinity!==f.maxLevel&&(null===e||f.maxLevel>e)&&(e=f.maxLevel)),b[d].push(c)):t.warn("Terrain: tiling scheme of layer "+d.id+" is incompatible with other tiled layers, will not be drawn"):t.warn("Terrain: Map or elevation layer does not have fullExtent: "+d.id)}});for(c=0;2>c;c++){var f=this._layerViews[c],l=b[c];l.reverse();var p=l.length,g=f.length!==p,k=Array(p),n=Array(f.length);this._layerIndexByLayerViewId[c].clear();for(var v=0;v<p;v++){this._layerIndexByLayerViewId[c].set(l[v].uid,v);var q=
f.indexOf(l[v]);k[v]=q;v!==q&&(g=!0);-1<q&&(n[q]=v)}if(g){f=0;for(p=this._topLevelTilemapOnlyTiles;f<p.length;f++)g=p[f],J.isSome(g)&&g.modifyLayers(n,k,c);f=this._postorderIterator;for(f.reset(this.rootTiles);!f.done;)f.next().modifyLayers(n,k,c);this._layerViews[c]=l;this._restartAllAgents(c);this._updateTiles(this.rootTiles)}}this.tilingScheme.ensureMaxLod(e)&&this._viewChangeUpdate()}};b.prototype._restartAllAgents=function(a){var c=this._postorderIterator;for(c.reset(this.rootTiles);!c.done;){var b=
c.next();b.restartAgents(a);0===a&&b.computeElevationBounds()}};b.prototype._hasFixedExtent=function(){return!!this._clippingExtent};b.prototype.layerViewByIndex=function(a,c){return this._layerViews[c][a]};b.prototype.numLayers=function(a){return this._layerViews[a].length};b.prototype._updateTileTextures=function(a){var c=this;this._allTiles.forEach(function(b){b.updateAgents(1);a?c.renderer.updateTileTexture(b):b.updateRenderData(1)})};b.prototype._invalidateLayerData=function(a,c){this._allTiles.forEach(function(b){return b.removeLayerAgent(a,
c)});this._allTiles.forEach(function(b){return b.invalidateLayerData(a,c)})};b.prototype.requestRender=function(a){void 0===a&&(a=1);this.renderer.setNeedsRender(a)};b.prototype.setPendingUpdates=function(){this._pendingUpdates||(this._pendingUpdates=!0,this.notifyChange("updating"))};b.prototype.requestTileData=function(a,c,b,e){var d=this,f=this.layerViewByIndex(c,b),g=f.layer;if(g.tilemapCache&&!m.isVectorTileLayerView(f)){var p=this.getTilemapTile(a),k=p.layerInfo[b][c];if(k.tilemap){if(!p.hasDataAvailable(a,
c,b))return this._dataMissing(a,b,f,{notInTilemap:!0}),n.reject()}else return k.tilemapRequestPromise||(k.tilemapRequestAbort=n.createAbortController(),k.tilemapRequestPromise=this.requestTilemap(p,c,b,f,g,{signal:k.tilemapRequestAbort.signal})),++this._asyncWorkItems,k.tilemapRequestPromise.catch(function(){}).then(function(){--d._asyncWorkItems;k.tilemapRequestPromise=null;k.tilemapRequestAbort=null;n.throwIfAborted(e);var c=d._layerIndexByLayerViewId[b].get(f.uid);if(null!=c){if(p.hasDataAvailable(a,
c,b))return d._requestTileData(a,b,f,e);d._dataMissing(a,b,f,{notInTilemap:!0});return n.reject()}})}return this._requestTileData(a,b,f,e)};b.prototype._requestTileData=function(a,c,b,e){return 0===c?this._requestElevationTileData(a,b,e):this._requestMapTileData(a,b,e)};b.prototype._requestElevationTileData=function(a,c,b){var d=this;if(m.isElevationLayerView(c)){var g=function(e){--d._asyncWorkItems;if(!n.isAborted(b)){var f=d._layerIndexByLayerViewId[0].get(c.uid);null==f?t.warn("TerrainSurface: received data from unknown layer %d %s",
0,a.lij.toString()):(d._usedMemory=B,d._pendingUpdates=!0,d._elevationDataArrived(a,f,e))}},f=function(b){--d._asyncWorkItems;n.isAbortError(b)||d._dataMissing(a,0,c,b)};++this._asyncWorkItems;if(m.useFetchTileForLayer(c.layer))return c.layer.fetchTile(a.lij[0],a.lij[1],a.lij[2],{noDataValue:q.ELEVATION_NODATA_VALUE,signal:b.signal}).then(function(a){n.isAborted(b)?(t.warnOnce("A call to fetchTile resolved even though the request was aborted. fetchTile should not resolve if options.signal.aborted is true."),
f(n.createAbortError())):g(a)},f);var l=c.getTileUrl(a.lij[0],a.lij[1],a.lij[2]);return this._elevationDataRequester.request(l,"binary",b).then(function(a){return d._lercWorker.decode(a,{noDataValue:q.ELEVATION_NODATA_VALUE},b.signal)}).then(function(a){g({values:a.pixelData,width:a.width,height:a.height,noDataValue:a.noDataValue,minValue:a.minValue,maxValue:a.maxValue})},f)}m.weakAssert(!1,"_requestElevationTileData can only be called for elevation layer views")};b.prototype._requestMapTileData=
function(a,c,b){var d=this;if(c instanceof la)return n.reject();++this._asyncWorkItems;var g=function(f){--d._asyncWorkItems;n.isAborted(b)||d._dataArrived(a,1,c,f)},f=function(b){--d._asyncWorkItems;n.isAbortError(b)||d._dataMissing(a,1,c,b)};if(m.isVectorTileLayerView(c)){var l=c.schemaHelper.getLevelRowColumn(a.lij);return c.tileHandler.getVectorTile(l[0],l[1],l[2]).then(g,f)}if(m.useFetchTileForLayer(c.layer)&&m.isTileLayerView(c))return c.layer.fetchTile(a.lij[0],a.lij[1],a.lij[2],b).then(function(a){n.isAborted(b)?
(t.warnOnce("A call to fetchTile resolved even though the request was aborted. fetchTile should not resolve if options.signal.aborted is true."),f(n.createAbortError())):g(a)},f);l=c.getTileUrl(a.lij[0],a.lij[1],a.lij[2]);null!=c.refreshInterval&&c.refreshTimestamp&&(l+=(-1<l.indexOf("?")?"\x26":"?")+"_ts\x3d"+c.refreshTimestamp);return this._mapDataRequester.request(l,c.hasMixedImageFormats?"image+type":"image",b).then(g,f)};b.prototype.requestTilemap=function(a,b,d,e,g,f){var c=this;return g.tilemapCache.fetchTilemap(a.lij[0]+
w.TILEMAP_SIZE_EXP,Math.round(a.lij[1]*Math.pow(2,w.TILEMAP_SIZE_EXP)),Math.round(a.lij[2]*Math.pow(2,w.TILEMAP_SIZE_EXP)),W({},f,{timeout:6E3})).then(function(f){b=c._layerIndexByLayerViewId[d].get(e.uid);null!=b&&(a.layerInfo[d][b].tilemap=f)}).catch(function(){})};b.prototype.getTilemapTile=function(a){var b=a.level;if(b>w.TILEMAP_SIZE_EXP)return x.getTileNLevelsUp(a,w.TILEMAP_SIZE_EXP);var d=this._topLevelTilemapOnlyTiles[b];if(J.isSome(d))return d;a=x.getRootTile(a);d=w.TILEMAP_SIZE_EXP-b+a.level;
d=new wa([b-w.TILEMAP_SIZE_EXP,a.lij[1]/Math.pow(2,d),a.lij[2]/Math.pow(2,d)],this._upsampleInfoPool,[this._layerViews[0].length,this._layerViews[1].length]);return this._topLevelTilemapOnlyTiles[b]=d};b.prototype._dataArrived=function(a,b,d,e){d=this._layerIndexByLayerViewId[b].get(d.uid);null!=d?a.dataArrived(d,b,e):t.warn("TerrainSurface: received data from unknown layer")};b.prototype._dataMissing=function(a,b,d,e){d=this._layerIndexByLayerViewId[b].get(d.uid);null!=d?a.dataMissing(d,b,e):t.warn("TerrainSurface: received data from unknown layer")};
b.prototype.updateTileOverlayParams=function(){var a=this;this.rootTiles&&(this._allTiles.forEach(function(b){b.renderData&&a.overlayManager&&a.overlayManager.setTileParameters(b,b.renderData,a._overlayOpacity)}),this._renderer.setNeedsRender())};b.prototype.updateOverlayOpacity=function(){if(this.overlayManager){var a=this.overlayManager.updateOpacity(this._eyePosSurfaceSR[2]);isNaN(a)||a===this._overlayOpacity||(this._allTiles.forEach(function(b){return b.renderData&&(b.renderData.overlayOpacity=
a)}),this._overlayOpacity=a,this._renderer.setNeedsRender())}};b.prototype.getStats=function(){var a={numNodes:this._allTiles.length,numLeaves:0,numVisible:0,numRendered:0,numRenderedPerLevel:[],numLoadedPerLevel:[]};this._allTiles.forEach(function(b){b.isLeaf&&a.numLeaves++;var c=b.level;b.renderData&&(a.numLoadedPerLevel[c]=(a.numLoadedPerLevel[c]||0)+1);b.visible&&(a.numVisible++,b.rendered&&(a.numRenderedPerLevel[c]=(a.numRenderedPerLevel[c]||0)+1,a.numRendered++))});return a};b.prototype.getUsedMemory=
function(){var a=this;if(!this.tilingScheme)return 0;this._usedMemory===B&&(this._usedMemory=0,this._allTiles.forEach(function(b){return a._usedMemory+=b.usedMemory}));return this._usedMemory};b.prototype.getUsedMemoryForLayerView=function(a){var b=0,d=this.layerClassFromLayerView(a),e=this._layerIndexByLayerViewId[d].get(a.uid);this._allTiles.forEach(function(a){return b+=a.getUsedMemoryForLayer(d,e)});return b};b.prototype.getMemoryUsage=function(){if(!this.tilingScheme)return{};var a=0,b=0,d=0,
e=this.tilingScheme.pixelSize,g=e*e*4;this._allTiles.forEach(function(c){for(var e=U(c),f=0,k=c.layerInfo[1];f<k.length;f++){var h=k[f],h=h.data,m=0,n=0;h instanceof xa.TileTexture?m+=S.getGpuMemoryUsage(h.texture):h instanceof HTMLImageElement||h instanceof ma.ImageWithType?n+=g:h instanceof ka.VectorTile&&(d+=h.getMemoryUsage());c.renderData||e?(a+=n,a+=m):(b+=n,b+=m)}e=0;for(f=c.layerInfo[0];e<f.length;e++)h=f[e],h=h.data,a+=h?g:0;c.renderData&&(h=c.renderData.textureDescriptor,a+=h?S.getGpuMemoryUsage(h):
0,c=c.renderData.estimatedGeometryMemoryUsage,d+=c,d+=c)});return{visibleImageData:a,invisibleImageData:b,geometryData:d}};b.prototype.getTile=function(a){var b=a.split("/").map(function(a){return+a});if(0===b[0])return I.find(this.rootTiles,function(a){return a.lij[1]===b[1]&&a.lij[2]===b[2]});var d=Math.pow(2,b[0]),e=Math.floor(b[1]/d),g=Math.floor(b[2]/d),f;this.rootTiles.some(function(a){return a.lij[1]===e&&a.lij[2]===g?(f=a,!0):!1});if(f){for(d=1<<b[0]-1;f.lij[0]<b[0];){var k=b[1]&d?2:0;0<(b[2]&
d)&&k++;if(!f.children[k])return console.log("Tile "+a+" doesn't exist, smallest ancestor is "+x.tile2str(f)),null;f=f.children[k];d>>=1}m.weakAssert(f.lij[0]===b[0]&&f.lij[1]===b[1]&&f.lij[2]===b[2],"not the right tile?");return f}return null};b.prototype.setBorders=function(a){this._renderer.renderPatchBorders=a};b.prototype.setDisableRendering=function(a){this._renderer.renderingDisabled=a};b.prototype.getRenderedTiles=function(){H.clear();this._allTiles.forEach(function(a){a.visible&&a.rendered&&
H.push(a)});x.sortTiles(this.renderOrder,H);return H.toArray()};Object.defineProperty(b.prototype,"test",{get:function(){var a=this;return{renderer:this._renderer,lercWorker:this._lercWorker,mergeTile:function(b){return a._mergeTile(b)},updateTiles:function(b){return a._updateTiles(b)},getTiles:function(){return a._allTiles.toArray()}}},enumerable:!0,configurable:!0});k([g.property()],b.prototype,"_renderer",void 0);k([g.property({constructOnly:!0})],b.prototype,"view",void 0);k([g.property({value:!1})],
b.prototype,"cullBackFaces",null);k([g.property({readOnly:!0})],b.prototype,"extent",null);k([g.property({readOnly:!0,dependsOn:["ready","_renderer.updating","_scheduledLayerViewChangesHandle"]})],b.prototype,"updating",null);k([g.property({value:1})],b.prototype,"baseOpacity",null);k([g.property({readOnly:!0})],b.prototype,"overlayManager",void 0);k([g.property({constructOnly:!0})],b.prototype,"manifold",void 0);k([g.property()],b.prototype,"maxTextureScale",void 0);k([g.property({readOnly:!0})],
b.prototype,"ready",null);k([g.property({value:1})],b.prototype,"renderOrder",null);k([g.property({readOnly:!0})],b.prototype,"rootTiles",void 0);k([g.property({value:!0})],b.prototype,"skirtScale",null);k([g.property({readOnly:!0,dependsOn:["tilingScheme.spatialReference"]})],b.prototype,"spatialReference",null);k([g.property()],b.prototype,"backgroundImage",void 0);k([g.property({type:Y})],b.prototype,"backgroundColor",void 0);k([g.property({dependsOn:["backgroundColor","backgroundImage"]})],b.prototype,
"_background",null);k([g.property({value:!1})],b.prototype,"slicePlaneEnabled",null);k([g.property({readOnly:!0})],b.prototype,"tilingScheme",void 0);k([g.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeLocked"})],b.prototype,"tilingSchemeLocked",void 0);k([g.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeDone"})],b.prototype,"tilingSchemeDone",void 0);k([g.property({readOnly:!0})],b.prototype,"tilingSchemeLogic",void 0);k([g.property({value:!0})],b.prototype,"velvetOverground",
null);k([g.property({value:!1})],b.prototype,"wireframe",null);k([g.property({value:!1})],b.prototype,"suspended",null);k([g.property({readOnly:!0,dependsOn:["view.qualitySettings.tiledSurface.reduceTileLevelDifferences"]})],b.prototype,"lodSnapping",null);k([g.property({readOnly:!0,aliasOf:"view.qualitySettings.tiledSurface.textureBlendTime"})],b.prototype,"textureBlendTime",void 0);k([g.property()],b.prototype,"_scheduledLayerViewChangesHandle",void 0);return b=k([g.subclass("esri.views.3d.terrain.TerrainSurface")],
b)}(g.declared(ba.EventedMixin(Z)));var Aa=1.2,Ba=80/180*Math.PI,Ca=110/180*Math.PI,B=-1,C=ja.vec4f64.create(),Da=r.create(),F=[0,0,0],H=new K,G={spatialReference:null,tile:null,extent:null,context:"ground"},u={spatialReference:null,extent:null,scale:0};return y});