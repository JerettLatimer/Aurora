// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/assignHelper ../../../core/tsSupport/generatorHelper ../../../core/tsSupport/awaiterHelper ../../../request ../../../core/Error ../../../core/Loadable ../../../core/maybe ../../../core/promiseUtils ../../../core/urlUtils ../../../core/accessorSupport/decorators ../../../tasks/QueryTask ../../../tasks/operations/queryAttachments".split(" "),function(u,v,C,n,l,x,q,r,w,
D,A,B,t,k,E,F){function G(f){return q(this,void 0,void 0,function(){var b;return x(this,function(a){return"string"===typeof f?(b=t.dataComponents(f),[2,b?b:{data:f}]):[2,B.create(function(a,d){var c=new FileReader;c.readAsDataURL(f);c.onload=function(){return a(t.dataComponents(c.result))};c.onerror=function(a){return d(a)}})]})})}Object.defineProperty(v,"__esModule",{value:!0});u=function(f){function b(){var a=null!==f&&f.apply(this,arguments)||this;a.type="feature-layer";return a}C(b,f);b.prototype.load=
function(a){a=A.isSome(a)?a.signal:null;this.addResolvingPromise(this._fetchService(a));return this.when()};Object.defineProperty(b.prototype,"queryTask",{get:function(){var a=this.layer,c=a.parsedUrl,d=a.gdbVersion;return new E({url:null!=a.dynamicDataSource?c.path+"?"+t.objectToQuery(c.query):c.path,gdbVersion:d})},enumerable:!0,configurable:!0});b.prototype.addAttachment=function(a,c){var d=this;return this.load().then(function(){var b=a.attributes[d.layer.objectIdField],p=d.layer.parsedUrl.path+
"/"+b+"/addAttachment",m=l({f:"json"},d.layer.parsedUrl.query),m=d._getFormDataForAttachment(c,m);return r(p,{body:m}).then(function(a){return d._createFeatureEditResult(a.data.addAttachmentResult)}).catch(function(a){throw d._createAttachmentErrorResult(b,a);})})};b.prototype.updateAttachment=function(a,c,d){var b=this;return this.load().then(function(){var e=a.attributes[b.layer.objectIdField],m=b.layer.parsedUrl.path+"/"+e+"/updateAttachment",g=l({f:"json"},b.layer.parsedUrl.query,{attachmentId:c}),
g=b._getFormDataForAttachment(d,g);return r(m,{body:g}).then(function(a){return b._createFeatureEditResult(a.data.updateAttachmentResult)}).catch(function(a){throw b._createAttachmentErrorResult(e,a);})})};b.prototype.applyEdits=function(a,c){return q(this,void 0,void 0,function(){var d,b,p,m,g,y,h,z,f,l,k,n,q,t,u,v,w;return x(this,function(e){switch(e.label){case 0:return[4,this.load()];case 1:e.sent(),d=a.addFeatures.map(this._serializeFeature,this),b=a.updateFeatures.map(this._serializeFeature,
this),p=this._getFeatureIds(a.deleteFeatures),m=[],g=[],y=0,h=a.addAttachments,e.label=2;case 2:if(!(y<h.length))return[3,5];z=h[y];l=(f=m).push;return[4,this._serializeAttachment(z)];case 3:l.apply(f,[e.sent()]),e.label=4;case 4:return y++,[3,2];case 5:k=0,n=a.updateAttachments,e.label=6;case 6:if(!(k<n.length))return[3,9];z=n[k];t=(q=g).push;return[4,this._serializeAttachment(z)];case 7:t.apply(q,[e.sent()]),e.label=8;case 8:return k++,[3,6];case 9:return u={adds:m,updates:g,deletes:a.deleteAttachments.slice()},
v={f:"json",adds:d.length?JSON.stringify(d):null,updates:b.length?JSON.stringify(b):null,deletes:p.length?p.join(","):null,gdbVersion:c&&c.gdbVersion,rollbackOnFailure:c&&c.rollbackOnFailureEnabled,useGlobalIds:c&&c.globalIdUsed,attachments:JSON.stringify(u)},[4,r(this.layer.parsedUrl.path+"/applyEdits",{query:v,method:"post",responseType:"json"})];case 10:return w=e.sent(),[2,this._createEditsResult(w)]}})})};b.prototype.deleteAttachments=function(a,c){var d=this;return this.load().then(function(){var b=
a.attributes[d.layer.objectIdField];return r(d.layer.parsedUrl.path+"/"+b+"/deleteAttachments",{query:l({f:"json"},d.layer.parsedUrl.query,{attachmentIds:c.join(",")}),method:"post",responseType:"json"}).then(function(a){return a.data.deleteAttachmentResults.map(d._createFeatureEditResult)}).catch(function(a){throw d._createAttachmentErrorResult(b,a);})})};b.prototype.queryAttachments=function(a,c){var d=this;void 0===c&&(c={});var b=this.layer.parsedUrl,p=b.path;return this.load().then(function(){var e=
l({},c,{query:l({},b.query,{f:"json"}),responseType:"json"});if(!d.layer.get("capabilities.operations.supportsQueryAttachments")){for(var g=a.objectIds,f=[],h=0;h<g.length;h++)f.push(r(p+"/"+g[h]+"/attachments",e));return B.all(f).then(function(a){return g.map(function(c,b){return{parentObjectId:c,attachmentInfos:a[b].data.attachmentInfos}})}).then(function(a){return F.processAttachmentQueryResult(a,p)})}return d.queryTask.executeAttachmentQuery(a,e)})};b.prototype.queryFeatures=function(a,c){var b=
this;return this.load().then(function(){return b.queryTask.execute(a,c)})};b.prototype.queryFeaturesJSON=function(a,c){var b=this;return this.load().then(function(){return b.queryTask.executeJSON(a,c)})};b.prototype.queryObjectIds=function(a,c){var b=this;return this.load().then(function(){return b.queryTask.executeForIds(a,c)})};b.prototype.queryFeatureCount=function(a,c){var b=this;return this.load().then(function(){return b.queryTask.executeForCount(a,c)})};b.prototype.queryExtent=function(a,c){var b=
this;return this.load().then(function(){return b.queryTask.executeForExtent(a,c)})};b.prototype.queryRelatedFeatures=function(a,c){var b=this;return this.load().then(function(){return b.queryTask.executeRelationshipQuery(a,c)})};b.prototype._fetchService=function(a){return q(this,void 0,void 0,function(){var c,b;return x(this,function(d){switch(d.label){case 0:return(c=this.layer.sourceJSON)?(this.sourceJSON=c,[2]):[4,r(this.layer.parsedUrl.path,{query:l({f:"json"},this.layer.parsedUrl.query),responseType:"json",
signal:a})];case 1:return this.sourceJSON=b=d.sent().data,[2]}})})};b.prototype._serializeFeature=function(a){var c=a.geometry;a=a.attributes;return A.isNone(c)?{attributes:a}:"mesh"===c.type||"extent"===c.type?null:{geometry:c.toJSON(),attributes:a}};b.prototype._serializeAttachment=function(a){return q(this,void 0,void 0,function(){var c,b,e,f,m,g,k,h,l;return x(this,function(d){switch(d.label){case 0:c=a.feature;b=a.attachment;e=b.globalId;f=b.name;m=b.contentType;g=b.data;k=b.uploadId;h={globalId:e,
parentGlobalId:null,contentType:null,name:null,uploadId:null,data:null};c&&(h.parentGlobalId="attributes"in c?c.attributes&&c.attributes[this.layer.globalIdField]:c.globalId);if(!k)return[3,1];h.uploadId=k;return[3,3];case 1:return g?[4,G(g)]:[3,3];case 2:l=d.sent(),h.contentType=l.mediaType,h.data=l.data,g instanceof File&&(h.name=g.name),d.label=3;case 3:return f&&(h.name=f),m&&(h.contentType=m),[2,h]}})})};b.prototype._getFeatureIds=function(a){var c=a[0];return c?"objectId"in c?this._getIdsFromFeatureIdentifier(a):
this._getIdsFromFeatures(a):[]};b.prototype._getIdsFromFeatures=function(a){var c=this.layer.objectIdField;return a.map(function(a){return a.attributes&&a.attributes[c]})};b.prototype._getIdsFromFeatureIdentifier=function(a){return a.map(function(a){return a.objectId})};b.prototype._createEditsResult=function(a){var c=a.data;a=a.data&&a.data.attachments;return{addFeatureResults:c.addResults?c.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:c.updateResults?c.updateResults.map(this._createFeatureEditResult,
this):[],deleteFeatureResults:c.deleteResults?c.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:a&&a.addResults?a.addResults.map(this._createFeatureEditResult,this):[],updateAttachmentResults:a&&a.updateResults?a.updateResults.map(this._createFeatureEditResult,this):[],deleteAttachmentResults:a&&a.deleteResults?a.deleteResults.map(this._createFeatureEditResult,this):[]}};b.prototype._createFeatureEditResult=function(a){var c=!0===a.success?null:a.error||{code:void 0,
description:void 0};return{objectId:a.objectId,globalId:a.globalId,error:c?new w("feature-layer-source:edit-failure",c.description,{code:c.code}):null}};b.prototype._createAttachmentErrorResult=function(a,c){return{objectId:a,globalId:null,error:new w("feature-layer-source:attachment-failure",c.details.messages&&c.details.messages[0]||c.message,{code:c.details.httpStatus||c.details.messageCode})}};b.prototype._getFormDataForAttachment=function(a,c){if(a=a instanceof FormData?a:a&&a.elements?new FormData(a):
null)for(var b in c){var e=c[b];null!=e&&(a.set?a.set(b,e):a.append(b,e))}return a};n([k.property()],b.prototype,"type",void 0);n([k.property({constructOnly:!0})],b.prototype,"layer",void 0);n([k.property({readOnly:!0,dependsOn:["layer.parsedUrl","layer.gdbVersion","layer.dynamicDataSource"]})],b.prototype,"queryTask",null);return b=n([k.subclass("esri.layers.graphics.sources.FeatureLayerSource")],b)}(k.declared(D));v.default=u});