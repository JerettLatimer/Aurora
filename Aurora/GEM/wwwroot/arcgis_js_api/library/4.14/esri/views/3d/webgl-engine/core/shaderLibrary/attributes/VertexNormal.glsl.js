// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","./NormalAttribute.glsl","../../shaderModules/interfaces"],function(l,b,d,k,e){function f(a,c){0===c.normalType||1===c.normalType?(a.include(k.NormalAttribute,c),a.varyings.add("vNormalWorld","vec3"),a.varyings.add("vNormalView","vec3"),a.vertex.uniforms.add("uTransformNormal_GlobalFromModel","mat3"),a.vertex.uniforms.add("uTransformNormal_ViewFromGlobal","mat3"),a.vertex.code.add(e.glsl(g||(g=d(["\n      void forwardNormal() {\n        vNormalWorld \x3d uTransformNormal_GlobalFromModel * normalModel();\n        vNormalView \x3d uTransformNormal_ViewFromGlobal * vNormalWorld;\n      }\n    "],
["\n      void forwardNormal() {\n        vNormalWorld \x3d uTransformNormal_GlobalFromModel * normalModel();\n        vNormalView \x3d uTransformNormal_ViewFromGlobal * vNormalWorld;\n      }\n    "]))))):a.vertex.code.add(e.glsl(h||(h=d(["\n      void forwardNormal() {}\n    "],["\n      void forwardNormal() {}\n    "]))))}Object.defineProperty(b,"__esModule",{value:!0});b.VertexNormal=f;(function(a){a.bindUniforms=function(a,b){a.setUniformMatrix4fv("viewNormal",b.viewInvTransp)}})(f=b.VertexNormal||
(b.VertexNormal={}));var g,h});