// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils/triangle"],function(B,n,b,u,y){Object.defineProperty(n,"__esModule",{value:!0});var t=1,v=null,z=new Uint32Array([0]);n.generateDefaultIndexArray=function(a){if(1===a)return z;if(a>t||null==v){for(;a>t;)t*=2;v=new Uint32Array(t);for(var b=0;b<t;b++)v[b]=b}return new Uint32Array(v.buffer,0,a)};n.computeAttachmentOriginTriangles=function(a,g,d){if(!a)return!1;
var q=a.strideIdx,x=a.offsetIdx;a=a.data;b.vec3.set(d,0,0,0);b.vec3.set(f,0,0,0);for(var k=0,h=0,l=0;l<g.length-2;l+=3){var e=g[l+0]*q+x,m=g[l+1]*q+x,r=g[l+2]*q+x;b.vec3.set(c,a[e+0],a[e+1],a[e+2]);b.vec3.set(p,a[m+0],a[m+1],a[m+2]);b.vec3.set(w,a[r+0],a[r+1],a[r+2]);(e=y.areaPoints3d(c,p,w))?(b.vec3.add(c,c,p),b.vec3.add(c,c,w),b.vec3.scale(c,c,1/3*e),b.vec3.add(d,d,c),k+=e):(b.vec3.add(f,f,c),b.vec3.add(f,f,p),b.vec3.add(f,f,w),h+=3)}return 0===h&&0===k?!1:0!==k?(b.vec3.scale(d,d,1/k),!0):0!==h?
(b.vec3.scale(d,f,1/h),!0):!1};n.computeAttachmentOriginPoints=function(a,c,d){if(!a||!c)return!1;var f=a.strideIdx,g=a.offsetIdx;a=a.data;b.vec3.set(d,0,0,0);for(var k=-1,h=0,l=0;l<c.length;l++){var e=c[l]*f+g;k!==e&&(d[0]+=a[e+0],d[1]+=a[e+1],d[2]+=a[e+2],h++);k=e}1<h&&b.vec3.scale(d,d,1/h);return 0<h};n.computeAttachmentOriginLines=function(a,g,d){if(!a)return!1;var q=a.strideIdx,n=a.offsetIdx;a=a.data;b.vec3.set(d,0,0,0);b.vec3.set(f,0,0,0);for(var k=0,h=0,l=g?g.length-1:a.length/q-1,e=0;e<l;e+=
2){var m=(g?g[e+0]:e+0)*q+n,r=(g?g[e+1]:e+1)*q+n;c[0]=a[m+0];c[1]=a[m+1];c[2]=a[m+2];p[0]=a[r+0];p[1]=a[r+1];p[2]=a[r+2];b.vec3.scale(c,b.vec3.add(c,c,p),.5);m=b.vec3.dist(c,p);0<m?(b.vec3.add(d,d,b.vec3.scale(c,c,m)),k+=m):(b.vec3.add(f,f,c),h++)}return 0!==k?(b.vec3.scale(d,d,1/k),!0):0!==h?(b.vec3.scale(d,f,1/h),!0):!1};var A=0;n.getNewId=function(){return A++};var c=u.vec3f64.create(),p=u.vec3f64.create(),w=u.vec3f64.create(),f=u.vec3f64.create()});