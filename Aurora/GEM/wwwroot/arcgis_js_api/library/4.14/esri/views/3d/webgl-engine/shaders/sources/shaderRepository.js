// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(a,b){return{renderer:{laserLine:{"laserLine.frag":"#include \x3cutil/enableExtensions.glsl\x3e\n#include \x3cutil/fsPrecision.glsl\x3e\n#include \x3cutil/depth.glsl\x3e\nuniform sampler2D depthMap;\nuniform vec2 nearFar;\nuniform vec4 projInfo;\nuniform vec2 zScale;\nuniform float maxPixelDistance;\nuniform vec4 focusPlane;\nuniform vec4 focusSphere;\nuniform vec4 segmentPlane;\nuniform vec3 segmentStart;\nuniform vec3 segmentEnd;\nuniform vec3 glowColor;\nuniform float glowWidth;\nuniform vec3 innerColor;\nuniform float innerWidth;\nuniform float globalAlpha;\nvarying vec2 uv;\n#define INFINITY 100000.0\nvec3 reconstructPosition(vec2 fragCoord, float depth) {\n  return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);\n}\nfloat planeDistancePixels(vec4 plane, vec3 pos) {\n  float dist \x3d dot(plane.xyz, pos) + plane.w;\n  float width \x3d fwidth(dist);\n  dist /\x3d min(width, maxPixelDistance);\n  return abs(dist);\n}\nfloat sphereDistancePixels(vec4 sphere, vec3 pos) {\n  float dist \x3d distance(sphere.xyz, pos) - sphere.w;\n  float width \x3d fwidth(dist);\n  dist /\x3d min(width, maxPixelDistance);\n  return abs(dist);\n}\nvec4 blendPremultiplied(vec4 source, vec4 dest) {\n  float oneMinusSourceAlpha \x3d 1.0 - source.a;\n  return vec4(\n    source.rgb + dest.rgb * oneMinusSourceAlpha,\n    source.a + dest.a * oneMinusSourceAlpha\n  );\n}\nvec4 premultipliedColor(vec3 rgb, float alpha) {\n  return vec4(rgb * alpha, alpha);\n}\nvec4 laserLineProfile(float dist) {\n  if (dist \x3e glowWidth) {\n    return vec4(0.0);\n  }\n  float innerAlpha \x3d (1.0 - smoothstep(0.0, innerWidth, dist));\n  float glowAlpha \x3d pow(max(0.0, 1.0 - dist / glowWidth), 8.0);\n  return blendPremultiplied(\n    premultipliedColor(innerColor, innerAlpha),\n    premultipliedColor(glowColor, glowAlpha)\n  );\n}\nvoid main() {\n  float depth \x3d linearDepth(depthMap, uv, nearFar);\n  if (-depth \x3d\x3d nearFar[0]) {\n    discard;\n  }\n  vec3 pos \x3d reconstructPosition(gl_FragCoord.xy, depth);\n  float ddepth \x3d fwidth(depth);\n  float depthDiscontinuityAlpha \x3d 1.0 - smoothstep(0.0, 0.01, -ddepth / depth);\n  vec3 normal \x3d normalize(cross(dFdx(pos), dFdy(pos)));\n  float focusPlaneDistance \x3d planeDistancePixels(focusPlane, pos);\n  float focusSphereDistance \x3d sphereDistancePixels(focusSphere, pos);\n  float segmentDistance \x3d INFINITY;\n  float segmentLength \x3d length(segmentEnd - segmentStart);\n  vec3 segmentDir \x3d (segmentEnd - segmentStart) / segmentLength;\n  float t \x3d dot(segmentDir, pos - segmentStart);\n  if (segmentLength \x3e 0.0 \x26\x26 t \x3e\x3d 0.0 \x26\x26 t \x3c\x3d segmentLength) {\n    segmentDistance \x3d planeDistancePixels(segmentPlane, pos);\n  }\n  vec4 focusPlaneColor \x3d laserLineProfile(focusPlaneDistance);\n  vec4 focusSphereColor \x3d laserLineProfile(focusSphereDistance);\n  vec4 segmentColor \x3d laserLineProfile(segmentDistance);\n  float focusPlaneAlpha \x3d 1.0 - smoothstep(0.995, 0.999, abs(dot(normal, focusPlane.xyz)));\n  float focusSphereAlpha \x3d 1.0 - smoothstep(0.995, 0.999, abs(dot(normal, normalize(pos - focusSphere.xyz))));\n  float segmentAlpha \x3d 1.0 - smoothstep(0.995, 0.999, abs(dot(normal, segmentPlane.xyz)));\n  vec4 color \x3d max(\n    focusPlaneColor * focusPlaneAlpha,\n    max(\n      focusSphereColor * focusSphereAlpha,\n      segmentColor * segmentAlpha\n    )\n  );\n  gl_FragColor \x3d color * globalAlpha * depthDiscontinuityAlpha;\n}"},
offscreen:{"composite.frag":"#include \x3cutil/fsPrecision.glsl\x3e\nuniform sampler2D tex;\nvarying vec2 vtc;\nvoid main() {\n  gl_FragColor \x3d texture2D(tex, vtc);\n}","compositeOccluded.frag":"#include \x3cutil/fsPrecision.glsl\x3e\nuniform sampler2D occludedColorMap;\nuniform float opacity;\nvarying vec2 vtc;\nvoid main() {\n  vec4 occludedColor \x3d texture2D(occludedColorMap, vtc);\n  gl_FragColor \x3d occludedColor * opacity;\n}","compositeTransparentToHUDVisibility.frag":"#include \x3cutil/fsPrecision.glsl\x3e\nuniform sampler2D tex;\nvarying vec2 vtc;\nvoid main() {\n  gl_FragColor \x3d vec4(1.0 - texture2D(tex, vtc).a);\n}",
"offscreen.vert":"#include \x3cutil/vsPrecision.glsl\x3e\nattribute vec2 position;\nvarying vec2 vtc;\nvoid main(void) {\n  gl_Position \x3d vec4(position.xy, 0.0, 1.0);\n  vtc \x3d position.xy * 0.5 + 0.5;\n}"}},util:{"color.glsl":"vec4 premultiplyAlpha(vec4 v) {\n  return vec4(v.rgb * v.a, v.a);\n}\nvec3 rgb2hsv(vec3 c) {\n  vec4 K \x3d vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n  vec4 p \x3d c.g \x3c c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);\n  vec4 q \x3d c.r \x3c p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);\n  float d \x3d q.x - min(q.w, q.y);\n  float e \x3d 1.0e-10;\n  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);\n}\nvec3 hsv2rgb(vec3 c) {\n  vec4 K \x3d vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p \x3d abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\nfloat rgb2v(vec3 c) {\n  return max(c.x, max(c.y, c.z));\n}",
"depth.glsl":"#include \x3cutil/encoding.glsl\x3e\nfloat linearDepth(sampler2D depthTex, vec2 uv, vec2 nearFar) {\n  return -(rgba2float(texture2D(depthTex, uv)) * (nearFar[1] - nearFar[0]) + nearFar[0]);\n}\nfloat calcFragDepth(const in float depth) {\n  const float SLOPE_SCALE \x3d 2.0;\n  const float BIAS \x3d 2.0 * .000015259;\n  float m \x3d max(abs(dFdx(depth)), abs(dFdy(depth)));\n  float result \x3d depth + SLOPE_SCALE * m + BIAS;\n  return clamp(result, .0, .999999);\n}","doublePrecision.glsl":"#ifdef DOUBLE_PRECISION_REQUIRES_OBFUSCATION\nvec3 dpPlusFrc(vec3 a, vec3 b) {\n  return mix(a, a + b, vec3(notEqual(b, vec3(0))));\n}\nvec3 dpMinusFrc(vec3 a, vec3 b) {\n  return mix(vec3(0), a - b, vec3(notEqual(a, b)));\n}\nvec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n  vec3 t1 \x3d dpPlusFrc(hiA, hiB);\n  vec3 e \x3d dpMinusFrc(t1, hiA);\n  vec3 t2 \x3d dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;\n  return t1 + t2;\n}\n#else\nvec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n  vec3 t1 \x3d hiA + hiB;\n  vec3 e \x3d t1 - hiA;\n  vec3 t2 \x3d ((hiB - e) + (hiA - (t1 - e))) + loA + loB;\n  return t1 + t2;\n}\n#endif",
"enableExtensions.glsl":"#define EXTENSIONS_ENABLED\n#extension GL_OES_standard_derivatives : enable\n#extension GL_EXT_shader_texture_lod : enable","encoding.glsl":"const float MAX_RGBA_FLOAT \x3d\n  255.0 / 256.0 +\n  255.0 / 256.0 / 256.0 +\n  255.0 / 256.0 / 256.0 / 256.0 +\n  255.0 / 256.0 / 256.0 / 256.0 / 256.0;\nconst vec4 fixedPointFactors \x3d vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\nvec4 float2rgba(const float value) {\n  float valueInValidDomain \x3d clamp(value, 0.0, MAX_RGBA_FLOAT);\n  vec4 fixedPointU8 \x3d floor(fract(valueInValidDomain * fixedPointFactors) * 256.0);\n  const float toU8AsFloat \x3d 1.0 / 255.0;\n  return fixedPointU8 * toU8AsFloat;\n}\nconst vec4 rgba2float_factors \x3d vec4(\n  255.0 / (256.0),\n  255.0 / (256.0 * 256.0),\n  255.0 / (256.0 * 256.0 * 256.0),\n  255.0 / (256.0 * 256.0 * 256.0 * 256.0)\n);\nfloat rgba2float(vec4 rgba) {\n  return dot(rgba, rgba2float_factors);\n}",
"fsPrecision.glsl":"#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\nprecision highp sampler2D;\n#else\nprecision mediump float;\nprecision mediump sampler2D;\n#endif","quad.vert":"#include \x3cutil/vsPrecision.glsl\x3e\nattribute vec2 position;\nvarying vec2 uv;\nvoid main(void) {\n  gl_Position \x3d vec4(position.x, position.y, .0, 1.0);\n  uv \x3d position * .5 + vec2(.5);\n}","vsPrecision.glsl":"precision highp float;\nprecision highp sampler2D;"}}});