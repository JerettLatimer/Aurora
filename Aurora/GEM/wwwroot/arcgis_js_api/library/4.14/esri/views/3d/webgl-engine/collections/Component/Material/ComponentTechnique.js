// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/assignHelper ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/tsSupport/decorateHelper ../../../../../../core/maybe ../../../../../../core/libs/gl-matrix-2/mat3f64 ./shader/ComponentShader.glsl ../../../core/shaderLibrary/Slice.glsl ../../../core/shaderLibrary/attributes/VertexPosition.glsl ../../../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../../../core/shaderLibrary/util/DoublePrecision.glsl ../../../core/shaderTechnique/ReloadableShaderModule ../../../core/shaderTechnique/ShaderTechnique ../../../core/shaderTechnique/ShaderTechniqueConfiguration ../../../lib/DefaultTextureUnits ../../../materials/internal/MaterialUtil ../../../../../webgl/Program ../../../../../webgl/renderState".split(" "),
function(q,l,g,n,f,h,r,t,u,p,v,w,x,y,e,k,z,A,m){Object.defineProperty(l,"__esModule",{value:!0});g=function(e){function d(){return null!==e&&e.apply(this,arguments)||this}n(d,e);d.prototype.bindPass=function(a,b){var c=this.program;p.VertexPosition.bindViewProjTransform(c,b.viewTransform);u.Slice.bindUniforms(this.program,this.configuration,b.slicePlane);0===b.identifier&&(c.setUniformMatrix3fv("uTransformNormal_ViewFromGlobal",b.transformNormal_ViewFromGlobal),1===b.subPass&&c.setUniform2fv("uCameraNearFar",
b.cameraNearFar),0===b.subPass&&(b.ambientOcclusionEnabled&&b.ambientOcclusion.bind(c),b.shadowsEnabled&&b.shadowMap.bind(c),b.lighting.setUniforms(this.program,b.integratedMesh)));1===b.identifier&&this.program.setUniform2fv("uCameraNearFar",b.cameraNearFar);2===b.identifier&&z.bindHighlightRendering(a,b,this.program)};d.prototype.bindDraw=function(a){p.VertexPosition.bindModelTransform(this.program,a);this.program.setUniformMatrix3fv("uTransformNormal_GlobalFromModel",a.transformNormal_GlobalFromModel)};
d.prototype.bindMaterial=function(a,b){var c=this.program;c.setUniform4fv("uBaseColor",b.baseColor);c.setUniform1f("uObjectOpacity",b.objectOpacity);c.setUniform1f("textureAlphaCutoff",b.alphaCutoff);1===b.componentParameters.type?b.componentParameters.texture.bind(c,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:1}):(c.setUniform4fv("uExternalColor",b.componentParameters.externalColor),c.setUniform1i("uExternalColorMixMode",b.componentParameters.externalColorMixMode));h.isSome(b.baseColorTexture)&&
b.baseColorTexture.bind(a,c,"uBaseColorTexture",k.DefaultTextureUnits.DIFFUSE,"uBaseColorTextureSize");0===this.configuration.output&&(v.PhysicallyBasedRenderingParameters.bindUniforms(this.program,b),h.isSome(b.metallicRoughnessTexture)&&b.metallicRoughnessTexture.bind(a,c,"texMetallicRoughness",k.DefaultTextureUnits.METALLIC_ROUGHNESS,"texMetallicRoughnessSize"),h.isSome(b.emissionTexture)&&b.emissionTexture.bind(a,c,"texEmission",k.DefaultTextureUnits.EMISSION,"texEmissionSize"),h.isSome(b.occlusionTexture)&&
b.occlusionTexture.bind(a,c,"texOcclusion",k.DefaultTextureUnits.OCCLUSION,"texOcclusionSize"),h.isSome(b.normalTexture)&&b.normalTexture.bind(a,c,"normalTexture",k.DefaultTextureUnits.NORMAL,"normalTextureSize"))};d.prototype.initializeProgram=function(a){var b=d.shader.get(),c=this.configuration,c=b.build({output:c.output,normalType:c.normalMode,attributeColor:c.vertexColors,attributeTextureCoordinates:c.vertexTextureCoordinates,componentData:c.componentData,alphaDiscardMode:c.alphaDiscardMode,
baseColorTexture:c.baseColorTexture,doubleSidedMode:c.doubleSidedMode,receiveAmbientOcclusion:c.receiveAmbientOcclusion,receiveShadows:c.receiveShadows,slicePlaneEnabled:c.slicePlaneEnabled,sliceHighlightDisabled:c.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,viewingMode:a.viewingMode,vertexDiscardMode:c.vertexDiscardMode,usePBR:c.usePBR,hasMetalnessAndRoughnessTexture:c.hasMetalnessAndRoughnessTexture,hasEmissionTexture:c.hasEmissionTexture,hasOcclusionTexture:c.hasOcclusionTexture,hasNormalTexture:c.hasNormalTexture,
vertexTangets:!1,useOldSceneLightInterface:!1,supportsTextureAtlas:!0,doublePrecisionRequiresObfuscation:w.doublePrecisionRequiresObfuscation(a.rctx)});return new A(a.rctx,c.generateSource("vertex"),c.generateSource("fragment"),b.attributeLocations)};d.prototype.initializePipeline=function(){var a=this.configuration;return m.makePipelineState({blending:0===a.output&&a.blendingEnabled?B:null,culling:C[a.cullFace],depthTest:{func:513},depthWrite:m.defaultDepthWriteParams,colorWrite:m.defaultColorWriteParams,
stencilWrite:a.stencilWriteEnabled?D:null,stencilTest:a.stencilWriteEnabled?E:null,polygonOffset:a.polygonOffsetEnabled?F:null})};d.shader=new x.ReloadableShaderModule(t,"./shader/ComponentShader.glsl",q);return d}(y.ShaderTechnique);l.ComponentTechnique=g;var B=m.separateBlendingParams(770,1,771,771),D={mask:255},E={function:{func:519,ref:1,mask:255},operation:{fail:7680,zFail:7680,zPass:7681}},F={factor:2,units:2},C=[null,{face:1028,mode:2305},{face:1029,mode:2305}];g=function(e){function d(){var a=
null!==e&&e.apply(this,arguments)||this;a.transformNormal_GlobalFromModel=r.mat3f64.create();return a}n(d,e);return d}(p.VertexPosition.ModelTransform);l.ComponentDrawParameters=g;g=function(g){function d(){var a=null!==g&&g.apply(this,arguments)||this;a.output=0;a.vertexColors=!1;a.normalMode=3;a.vertexTextureCoordinates=0;a.componentData=0;a.slicePlaneEnabled=!1;a.sliceHighlightDisabled=!1;a.cullFace=2;a.baseColorTexture=!1;a.receiveAmbientOcclusion=!0;a.receiveShadows=!0;a.vertexDiscardMode=0;
a.doubleSidedMode=2;a.blendingEnabled=!0;a.alphaDiscardMode=1;a.stencilWriteEnabled=!1;a.polygonOffsetEnabled=!1;a.usePBR=!1;a.hasMetalnessAndRoughnessTexture=!1;a.hasEmissionTexture=!1;a.hasOcclusionTexture=!1;a.hasNormalTexture=!1;return a}n(d,g);f([e.parameter({count:7})],d.prototype,"output",void 0);f([e.parameter()],d.prototype,"vertexColors",void 0);f([e.parameter({count:4})],d.prototype,"normalMode",void 0);f([e.parameter({count:3})],d.prototype,"vertexTextureCoordinates",void 0);f([e.parameter({count:2})],
d.prototype,"componentData",void 0);f([e.parameter()],d.prototype,"slicePlaneEnabled",void 0);f([e.parameter()],d.prototype,"sliceHighlightDisabled",void 0);f([e.parameter({count:3})],d.prototype,"cullFace",void 0);f([e.parameter()],d.prototype,"baseColorTexture",void 0);f([e.parameter()],d.prototype,"receiveAmbientOcclusion",void 0);f([e.parameter()],d.prototype,"receiveShadows",void 0);f([e.parameter({count:3})],d.prototype,"vertexDiscardMode",void 0);f([e.parameter({count:3})],d.prototype,"doubleSidedMode",
void 0);f([e.parameter()],d.prototype,"blendingEnabled",void 0);f([e.parameter({count:4})],d.prototype,"alphaDiscardMode",void 0);f([e.parameter()],d.prototype,"stencilWriteEnabled",void 0);f([e.parameter()],d.prototype,"polygonOffsetEnabled",void 0);f([e.parameter()],d.prototype,"usePBR",void 0);f([e.parameter()],d.prototype,"hasMetalnessAndRoughnessTexture",void 0);f([e.parameter()],d.prototype,"hasEmissionTexture",void 0);f([e.parameter()],d.prototype,"hasOcclusionTexture",void 0);f([e.parameter()],
d.prototype,"hasNormalTexture",void 0);return d}(e.ShaderTechniqueConfiguration);l.ComponentTechniqueConfiguration=g});