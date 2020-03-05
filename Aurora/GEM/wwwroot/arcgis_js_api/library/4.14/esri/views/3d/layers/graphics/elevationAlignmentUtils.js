// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/compilerUtils ../../../../core/libs/gl-matrix-2/mat4 ../../../../core/libs/gl-matrix-2/mat4f64 ../../../../core/libs/gl-matrix-2/vec3f64 ./graphicUtils ../../support/ElevationProvider ../../support/projectionUtils".split(" "),function(H,k,A,B,C,D,E,u,w){function y(a,b,d,c,f){var g=a.z||0,h=d.featureExpressionInfoContext;switch(d.mode){case "on-the-ground":var e=u.getElevationAtPoint(b,a,"ground")||0;f&&(f.verticalDistanceToGround=0,f.sampledElevation=e);return e;
case "relative-to-ground":return e=u.getElevationAtPoint(b,a,"ground")||0,a=d.calculateOffsetRenderUnits(c),null==h&&(a+=g),f&&(f.verticalDistanceToGround=a,f.sampledElevation=e),a+e;case "relative-to-scene":return e=u.getElevationAtPoint(b,a,"scene")||0,a=d.calculateOffsetRenderUnits(c),null==h&&(a+=g),f&&(f.verticalDistanceToGround=a,f.sampledElevation=e),a+e;case "absolute-height":return e=d.calculateOffsetRenderUnits(c),null==h&&(e+=g),f&&(g=u.getElevationAtPoint(b,a,"ground")||0,f.verticalDistanceToGround=
e-g,f.sampledElevation=g),e;default:return A.neverReached(d.mode),0}}Object.defineProperty(k,"__esModule",{value:!0});k.applyPerVertexElevationAlignment=function(a,b,d,c,f,g,h,e,n,q,l){var m=F[l.mode],k=0;if(w.bufferToBuffer(a,b,d,c,n.spatialReference,f,e)&&(m.requiresAlignment(l)?(k=m.applyElevationAlignmentBuffer(c,f,g,h,e,n,q,l),a=g,f=h):a=c,w.bufferToBuffer(a,n.spatialReference,f,g,q.spatialReference,h,e)))return k};k.evaluateElevationAlignmentAtPoint=y;k.elevationModeChangeUpdateType=function(a,
b,d){return null==b||null==d?a.definedChanged:"on-the-ground"===b&&"on-the-ground"===d?a.staysOnTheGround:b===d||"on-the-ground"!==b&&"on-the-ground"!==d?z.UPDATE:a.onTheGroundChanged};k.needsElevationUpdates2D=function(a){return"relative-to-ground"===a||"relative-to-scene"===a};k.needsElevationUpdates3D=function(a){return"absolute-height"!==a};k.applyElevationAlignmentForHUD=function(a,b,d,c,f){d=y(b,d,f,c,x);E.updateVertexAttributeAuxpos1w(a,x.verticalDistanceToGround);f=x.sampledElevation;var g=
B.mat4.copy(G,a.objectTransformation);v[0]=b.x;v[1]=b.y;v[2]=d;w.computeLinearTransformation(b.spatialReference,v,g,c.spatialReference)?a.objectTransformation=g:console.warn("Could not locate symbol object properly, it might be misplaced");return f};var z;(function(a){a[a.NONE=0]="NONE";a[a.UPDATE=1]="UPDATE";a[a.RECREATE=2]="RECREATE"})(z=k.SymbolUpdateType||(k.SymbolUpdateType={}));var F={"absolute-height":{applyElevationAlignmentBuffer:function(a,b,d,c,f,g,h,e){g=e.calculateOffsetRenderUnits(h);
e=e.featureExpressionInfoContext;b*=3;c*=3;for(h=0;h<f;++h){var n=a[b+1],k=a[b+2];d[c+0]=a[b+0];d[c+1]=n;d[c+2]=null==e?k+g:g;b+=3;c+=3}return 0},requiresAlignment:function(a){var b=a.featureExpressionInfoContext;return 0!==a.meterUnitOffset||null==b}},"on-the-ground":{applyElevationAlignmentBuffer:function(a,b,d,c,f,g){var h=0,e=g.spatialReference;b*=3;c*=3;for(var n=0;n<f;++n){var k=a[b+0],l=a[b+1],m=g.getElevation(k,l,a[b+2],e,"ground")||0,h=h+m;d[c+0]=k;d[c+1]=l;d[c+2]=m;b+=3;c+=3}return h/f},
requiresAlignment:function(){return!0}},"relative-to-ground":{applyElevationAlignmentBuffer:function(a,b,d,c,f,g,h,e){var k=0;h=e.calculateOffsetRenderUnits(h);e=e.featureExpressionInfoContext;var q=g.spatialReference;b*=3;c*=3;for(var l=0;l<f;++l){var m=a[b+0],r=a[b+1],t=a[b+2],p=g.getElevation(m,r,t,q,"ground")||0,k=k+p;d[c+0]=m;d[c+1]=r;d[c+2]=null==e?t+p+h:p+h;b+=3;c+=3}return k/f},requiresAlignment:function(){return!0}},"relative-to-scene":{applyElevationAlignmentBuffer:function(a,b,d,c,f,g,
h,e){var k=0;h=e.calculateOffsetRenderUnits(h);e=e.featureExpressionInfoContext;var q=g.spatialReference;b*=3;c*=3;for(var l=0;l<f;++l){var m=a[b+0],r=a[b+1],t=a[b+2],p=g.getElevation(m,r,t,q,"scene")||0,k=k+p;d[c+0]=m;d[c+1]=r;d[c+2]=null==e?t+p+h:p+h;b+=3;c+=3}return k/f},requiresAlignment:function(){return!0}}},G=C.mat4f64.create(),x={verticalDistanceToGround:0,sampledElevation:0},v=D.vec3f64.create()});