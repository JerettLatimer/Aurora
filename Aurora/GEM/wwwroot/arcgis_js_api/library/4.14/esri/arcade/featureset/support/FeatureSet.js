// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../support/FeatureSetIterator ../support/IdSet ../support/shared ./cache ./stats ../../../core/promiseUtils ../../../core/sql/WhereClause ../../../geometry/geometryEngineAsync ../../../geometry/SpatialReference ../../../layers/support/FieldsIndex".split(" "),function(A,B,w,v,l,q,n,h,p,r,x,y){return function(){function c(a){this.recentlyUsedQueries=null;this._idstates=[];this._mainSetInUse=this._wset=this._parent=null;this._maxProcessing=200;this._maxQuery=500;this._totalCount=
-1;this._databaseType=l.FeatureServiceDatabaseType.NotEvaluated;this._databaseTypeProbed=null;this.declaredRootClass="esri.arcade.featureset.support.FeatureSet";this._featureCache=[];this.fields=this.types=null;this.objectIdField=this.geometryType="";this.spatialReference=null;this.loaded=this._transparent=this.hasZ=this.hasM=!1;this._fieldsIndex=this._loadPromise=null;a&&a.lrucache&&(this.recentlyUsedQueries=a.lrucache)}c.prototype.optimisePagingFeatureQueries=function(a){this._parent&&this._parent.optimisePagingFeatureQueries(a)};
c.prototype._hasMemorySource=function(){return!0};c.prototype.prop=function(a,b){if(void 0===b)return this[a];void 0!==this[a]&&(this[a]=b);return this};c.prototype.end=function(){return null!==this._parent&&!0===this._parent._transparent?this._parent.end():this._parent};c.prototype._ensureLoaded=function(){return this.load()};c.prototype.load=function(){var a=this;null===this._loadPromise&&(this._loadPromise=h.create(function(b,e){!0===a._parent.loaded?(a._initialiseFeatureSet(),b(a)):a._parent.load().then(function(){try{a._initialiseFeatureSet(),
b(a)}catch(d){e(d)}},e)}));return this._loadPromise};c.prototype._initialiseFeatureSet=function(){null!==this._parent?(this.fields=this._parent.fields.slice(0),this.geometryType=this._parent.geometryType,this.objectIdField=this._parent.objectIdField,this.spatialReference=this._parent.spatialReference,this.hasM=this._parent.hasM,this.hasZ=this._parent.hasZ,this.typeIdField=this._parent.typeIdField,this.types=this._parent.types):(this.fields=[],this.objectIdField=this.typeIdField="",this.spatialReference=
new x({wkid:4326}),this.geometryType=l.layerGeometryEsriConstants.point)};c.prototype.getField=function(a,b){var e;if(b=b||this.fields)a=a.toLowerCase(),b.some(function(b){b&&b.name.toLowerCase()===a&&(e=b);return!!e});return e};c.prototype.getFieldsIndex=function(){null===this._fieldsIndex&&(this._fieldsIndex=new y(this.fields));return this._fieldsIndex};c.prototype._maxProcessingRate=function(){return null!==this._parent?Math.min(this._maxProcessing,this._parent._maxProcessingRate()):Math.min(this._maxProcessing,
this._maxQueryRate())};c.prototype._maxQueryRate=function(){return null!==this._parent?Math.max(this._maxQuery,this._parent._maxQueryRate()):this._maxQuery};c.prototype._checkCancelled=function(a){if(null!==a&&a.aborted)throw Error("Operation has been cancelled.");};c.prototype.nativeCapabilities=function(){return this._parent.nativeCapabilities()};c.prototype._canDoAggregates=function(a,b,e,d,g){return null===this._parent?h.resolve(!1):this._parent._canDoAggregates(a,b,e,d,g)};c.prototype._getAggregatePagesDataSourceDefinition=
function(a,b,e,d,g,c,k){return null===this._parent?h.reject(Error("Should never be called")):this._parent._getAggregatePagesDataSourceDefinition(a,b,e,d,g,c,k)};c.prototype._getAgregagtePhysicalPage=function(a,b,e){return null===this._parent?h.reject(Error("Should never be called")):this._parent._getAgregagtePhysicalPage(a,b,e)};c.prototype.databaseType=function(){var a=this;if(this._databaseType===l.FeatureServiceDatabaseType.NotEvaluated){if(null!==q.applicationCache){var b=q.applicationCache.getDatabaseType(this._cacheableFeatureSetSourceKey());
if(null!==b)return b}if(null!==this._databaseTypeProbed)return this._databaseTypeProbed;var e=[{thetype:l.FeatureServiceDatabaseType.SqlServer,testwhere:"(CAST( '2015-01-01' as DATETIME) \x3d CAST( '2015-01-01' as DATETIME)) AND OBJECTID\x3c0"},{thetype:l.FeatureServiceDatabaseType.Oracle,testwhere:"(TO_DATE('2003-11-18','YYYY-MM-DD') \x3d TO_DATE('2003-11-18','YYYY-MM-DD')) AND OBJECTID\x3c0"},{thetype:l.FeatureServiceDatabaseType.StandardisedNoInterval,testwhere:"(date '2015-01-01 10:10:10' \x3d date '2015-01-01 10:10:10') AND OBJECTID\x3c0"}],
b=h.create(function(b,g){a._getDatabaseTypeImpl(e,0).then(function(d){a._databaseType=d;b(a._databaseType)},function(a){g(a)})});null!==q.applicationCache&&(q.applicationCache.setDatabaseType(this._cacheableFeatureSetSourceKey(),b),b=b.catch(function(b){q.applicationCache.clearDatabaseType(a._cacheableFeatureSetSourceKey());throw b;}));return this._databaseTypeProbed=b}return h.resolve(this._databaseType)};c.prototype._cacheableFeatureSetSourceKey=function(){return"MUSTBESET"};c.prototype._getDatabaseTypeImpl=
function(a,b){var e=this;return b>=a.length?h.resolve(l.FeatureServiceDatabaseType.StandardisedNoInterval):this._runDatabaseProbe(a[b].testwhere).then(function(d){return!0===d?a[b].thetype:e._getDatabaseTypeImpl(a,b+1)})};c.prototype._runDatabaseProbe=function(a){return null!==this._parent?this._parent._runDatabaseProbe(a):h.reject(Error("Not Implemented"))};c.prototype.isTable=function(){return this._parent.isTable()};c.prototype._featureFromCache=function(a){if(void 0!==this._featureCache[a])return this._featureCache[a]};
c.prototype._isInFeatureSet=function(a){return l.IdState.Unknown};c.prototype._getSet=function(a){throw Error("Not implemented in abstract class");};c.prototype._getFeature=function(a,b,e){var d=this;try{return this._checkCancelled(e),void 0!==this._featureFromCache(b)?h.resolve(this._featureFromCache(b)):this._getFeatures(a,b,this._maxProcessingRate(),e).then(function(){d._checkCancelled(e);return void 0!==d._featureFromCache(b)?d._featureFromCache(b):h.reject(Error("Feature Not Found"))})}catch(g){return h.reject(g)}};
c.prototype._getFeatureBatch=function(a,b){var e=this;try{this._checkCancelled(b);var d=new v([],a,!1,null),g=[];return this._getFeatures(d,-1,a.length,b).then(function(){e._checkCancelled(b);for(var d=0;d<a.length;d++){var c=a[d];void 0!==e._featureFromCache(c)&&g.push(e._featureFromCache(c))}return g})}catch(f){return h.reject(f)}};c.prototype._getFeatures=function(a,b,e,d){return h.resolve("success")};c.prototype._getFilteredSet=function(a,b,e,d,c){throw Error("Not implemented in abstract class");
};c.prototype._refineSetBlock=function(a,b,e){var d=this;try{if(!0===this._checkIfNeedToExpandCandidatePage(a,this._maxQueryRate()))return this._expandPagedSet(a,this._maxQueryRate(),0,0,e).then(function(){return d._refineSetBlock(a,b,e)});this._checkCancelled(e);var c=a._candidates.length;this._refineKnowns(a,b);var f=c-a._candidates.length;return 0===a._candidates.length||f>=b?h.resolve(a):this._refineIfParentKnown(a,b-f,e).then(function(){d._checkCancelled(e);d._refineKnowns(a,b-f);f=c-a._candidates.length;
if(f<b&&0<a._candidates.length){var g=b-f,h=d._prepareFetchAndRefineSet(a._candidates);return d._fetchAndRefineFeatures(h,h.length>g?g:a._candidates.length,e).then(function(){d._checkCancelled(e);d._refineKnowns(a,b-f);return a})}return a})}catch(k){return h.reject(k)}};c.prototype._fetchAndRefineFeatures=function(a,b,e){return null};c.prototype._prepareFetchAndRefineSet=function(a){for(var b=[],e=0;e<a.length;e++)this._isPhysicalFeature(a[e])&&b.push(a[e]);return b};c.prototype._isPhysicalFeature=
function(a){return null===this._parent?!0:this._parent._isPhysicalFeature(a)};c.prototype._refineKnowns=function(a,b){var e=0,d=null,c=[];b=this._maxQueryRate();for(var f=0;f<a._candidates.length&&"GETPAGES"!==a._candidates[f];f++){var k=!1,h=this._candidateIdTransform(a._candidates[f]);h!==a._candidates[f]&&(k=!0);var m=this._isInFeatureSet(h);if(m===l.IdState.InFeatureSet)!0===k?0>a._known.indexOf(h)&&(a._known.push(h),e+=1):(a._known.push(a._candidates[f]),e+=1),null===d?d={start:f,end:f}:d.end===
f-1?d.end=f:(c.push(d),d={start:f,end:f});else if(m===l.IdState.NotInFeatureSet)null===d?d={start:f,end:f}:d.end===f-1?d.end=f:(c.push(d),d={start:f,end:f}),e+=1;else if(m===l.IdState.Unknown&&(e+=1,!0===a._ordered))break;if(e>=b)break}null!==d&&c.push(d);for(b=c.length-1;0<=b;b--)a._candidates.splice(c[b].start,c[b].end-c[b].start+1)};c.prototype._refineIfParentKnown=function(a,b,e){var d=new v([],[],a._ordered,null);d._candidates=a._candidates.slice(0);return this._parent._refineSetBlock(d,b,e)};
c.prototype._candidateIdTransform=function(a){return this._parent._candidateIdTransform(a)};c.prototype._checkIfNeedToExpandKnownPage=function(a,b){if(null===a.pagesDefinition)return!1;for(var e=0,d=a._lastFetchedIndex;d<a._known.length;d++){if("GETPAGES"===a._known[d])return!0;if(void 0===this._featureCache[a._known[d]]&&(e+=1,e>=b))break}return!1};c.prototype._checkIfNeedToExpandCandidatePage=function(a,b){if(null===a.pagesDefinition)return!1;for(var e=0,d=0;d<a._candidates.length;d++){if("GETPAGES"===
a._candidates[d])return!0;e+=1;if(e>=b)break}return!1};c.prototype._expandPagedSet=function(a,b,e,d,c){return null===this._parent?h.reject(Error("Parent Paging not implemented")):this._parent._expandPagedSet(a,b,e,d,c)};c.prototype._expandPagedSetFeatureSet=function(a,b,e,d,c){var g=this;0<a._known.length&&"GETPAGES"===a._known[a._known.length-1]&&(d=1);0===d&&0<a._candidates.length&&"GETPAGES"===a._candidates[a._candidates.length-1]&&(d=2);return 0===d?h.resolve("finished"):this._getPage(a,d,c).then(function(d){return e+
d<b?g._expandPagedSet(a,b,e+d,0,c):"success"})};c.prototype._getPage=function(a,b,e){var d=this,c=1===b?a._known:a._candidates;if(a.pagesDefinition.internal.set.length>a.pagesDefinition.resultOffset||!0===a.pagesDefinition.internal.fullyResolved){--c.length;for(var f=0,k=0;k<a.pagesDefinition.resultRecordCount&&!(a.pagesDefinition.resultOffset+k>=a.pagesDefinition.internal.set.length);k++)c[c.length]=a.pagesDefinition.internal.set[a.pagesDefinition.resultOffset+k],f++;a.pagesDefinition.resultOffset+=
f;k=!1;!0===a.pagesDefinition.internal.fullyResolved&&a.pagesDefinition.internal.set.length<=a.pagesDefinition.resultOffset&&(k=!0);!1===k&&c.push("GETPAGES");return h.resolve(f)}return this._getPhysicalPage(a,b,e).then(function(){return d._getPage(a,b,e)})};c.prototype._getPhysicalPage=function(a,b,e){return null};c.prototype._clonePageDefinition=function(a){return null===this._parent?null:this._parent._clonePageDefinition(a)};c.prototype._first=function(a){return this.iterator(a).next()};c.prototype.first=
function(a){return this._first(a)};c.prototype.calculateStatistic=function(a,b,e,d){var c=this;return this._ensureLoaded().then(function(){return c._stat(a,b,"",null,null,e,d).then(function(g){return!1===g.calculated?c._manualStat(a,b,e,d).then(function(a){return a.result}):g.result})})};c.prototype._manualStat=function(a,b,e,d){switch(a.toLowerCase()){case "count":return n.count(this,d).then(function(a){return{calculated:!0,result:a}});case "distinct":return n.distinct(this,b,e).then(function(a){return{calculated:!0,
result:a}});case "avg":case "mean":return n.mean(this,b,d).then(function(a){return{calculated:!0,result:a}});case "stdev":return n.stdev(this,b,d).then(function(a){return{calculated:!0,result:a}});case "variance":return n.variance(this,b,d).then(function(a){return{calculated:!0,result:a}});case "sum":return n.sum(this,b,d).then(function(a){return{calculated:!0,result:a}});case "min":return n.min(this,b,d).then(function(a){return{calculated:!0,result:a}});case "max":return n.max(this,b,d).then(function(a){return{calculated:!0,
result:a}});default:return h.resolve({calculated:!0,result:0})}};c.prototype._stat=function(a,b,e,d,c,f,k){var g=this;return this._parent._stat(a,b,e,d,c,f,k).then(function(h){return!1===h.calculated?null===c&&""===e&&null===d?g._manualStat(a,b,f,k):{calculated:!1}:h})};c.prototype._unionAllGeomSelf=function(a){var b=this,c=this.iterator(this._defaultTracker(a)),d=[];return h.create(function(a,e){b._unionShapeInBatches(d,c,a,e)})};c.prototype._unionAllGeom=function(a){var b=this;return h.create(function(c,
d){var e=b.iterator(b._defaultTracker(a));b._unionShapeInBatches([],e,c,d)})};c.prototype._unionShapeInBatches=function(a,b,c,d){var e=this;b.next().then(function(g){try{null!==g&&null!==g.geometry&&a.push(g.geometry),30<a.length||null===g&&1<a.length?r.union(a).then(function(f){try{null===g?c(f):(a=[f],e._unionShapeInBatches(a,b,c,d))}catch(t){d(t)}},d):null===g?1===a.length?c(a[0]):c(null):e._unionShapeInBatches(a,b,c,d)}catch(k){d(k)}},d)};c.prototype.iterator=function(a){return new w(this,a)};
c.prototype.intersection=function(a,b){void 0===b&&(b=!1);return c._featuresetFunctions.intersection.bind(this)(a,b)};c.prototype.difference=function(a,b,e){void 0===b&&(b=!1);void 0===e&&(e=!0);return c._featuresetFunctions.difference.bind(this)(a,b,e)};c.prototype.symmetricDifference=function(a,b,e){void 0===b&&(b=!1);void 0===e&&(e=!0);return c._featuresetFunctions.symmetricDifference.bind(this)(a,b,e)};c.prototype.morphShape=function(a,b,e,d){void 0===e&&(e="unknown");void 0===d&&(d=null);return c._featuresetFunctions.morphShape.bind(this)(a,
b,e,d)};c.prototype.morphShapeAndAttributes=function(a,b,e){void 0===e&&(e="unknown");return c._featuresetFunctions.morphShapeAndAttributes.bind(this)(a,b,e)};c.prototype.union=function(a,b){void 0===b&&(b=!1);return c._featuresetFunctions.union.bind(this)(a,b)};c.prototype.intersects=function(a){return c._featuresetFunctions.intersects.bind(this)(a)};c.prototype.envelopeIntersects=function(a){return c._featuresetFunctions.envelopeIntersects.bind(this)(a)};c.prototype.contains=function(a){return c._featuresetFunctions.contains.bind(this)(a)};
c.prototype.overlaps=function(a){return c._featuresetFunctions.overlaps.bind(this)(a)};c.prototype.relate=function(a,b){return c._featuresetFunctions.relate.bind(this)(a,b)};c.prototype.within=function(a){return c._featuresetFunctions.within.bind(this)(a)};c.prototype.touches=function(a){return c._featuresetFunctions.touches.bind(this)(a)};c.prototype.top=function(a){return c._featuresetFunctions.top.bind(this)(a)};c.prototype.crosses=function(a){return c._featuresetFunctions.crosses.bind(this)(a)};
c.prototype.buffer=function(a,b,e,d){void 0===d&&(d=!0);return c._featuresetFunctions.buffer.bind(this)(a,b,e,d)};c.prototype.filter=function(a,b){void 0===b&&(b=null);return c._featuresetFunctions.filter.bind(this)(a,b)};c.prototype.orderBy=function(a){return c._featuresetFunctions.orderBy.bind(this)(a)};c.prototype.dissolve=function(a,b){return c._featuresetFunctions.dissolve.bind(this)(a,b)};c.prototype.groupby=function(a,b){return c._featuresetFunctions.groupby.bind(this)(a,b)};c.prototype.reduce=
function(a,b,c){var d=this;void 0===b&&(b=null);return h.create(function(e,f){d._reduceImpl(d.iterator(d._defaultTracker(c)),a,b,0,e,f,0)})};c.prototype._reduceImpl=function(a,b,c,d,g,f,k){var e=this;try{k++,1E3<k?setTimeout(function(){k=0;e._reduceImpl(a,b,c,d,g,f,k)}):a.next().then(function(l){try{if(null===l)g(c);else{var m=b(c,l,d,e);h.isPromiseLike(m)?m.then(function(c){e._reduceImpl(a,b,c,d+1,g,f,k)},f):e._reduceImpl(a,b,m,d+1,g,f,k)}}catch(z){f(z)}},f)}catch(m){f(m)}};c.prototype.removeField=
function(a){return c._featuresetFunctions.removeField.bind(this)(a)};c.prototype.addField=function(a,b,e){void 0===e&&(e=null);return c._featuresetFunctions.addField.bind(this)(a,b,e)};c.prototype.sumArea=function(a,b,c){void 0===b&&(b=!1);var d=l.convertSquareUnitsToCode(a);return this.reduce(function(a,c){return null===c.geometry?0:b?r.geodesicArea(c.geometry,d).then(function(b){return a+b}):r.planarArea(c.geometry,d).then(function(b){return a+b})},0,c)};c.prototype.sumLength=function(a,b,c){void 0===
b&&(b=!1);var d=l.convertLinearUnitsToCode(a);return this.reduce(function(a,c){return null===c.geometry?0:b?r.geodesicLength(c.geometry,d).then(function(b){return a+b}):r.planarLength(c.geometry,d).then(function(b){return a+b})},0,c)};c.prototype._substituteVars=function(a,b){if(null!==b){var c={},d;for(d in b)c[d.toLowerCase()]=b[d];a.parameters=c}};c.prototype.distinct=function(a,b,c,d){var e=this;void 0===b&&(b=1E3);void 0===c&&(c=null);return this.load().then(function(){var g=p.WhereClause.create(a,
e.getFieldsIndex());e._substituteVars(g,c);return e.calculateStatistic("distinct",g,b,e._defaultTracker(d))})};c.prototype.min=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,b);return d.calculateStatistic("min",e,-1,d._defaultTracker(c))})};c.prototype.max=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,
b);return d.calculateStatistic("max",e,-1,d._defaultTracker(c))})};c.prototype.avg=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,b);return d.calculateStatistic("avg",e,-1,d._defaultTracker(c))})};c.prototype.sum=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,b);return d.calculateStatistic("sum",
e,-1,d._defaultTracker(c))})};c.prototype.stdev=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,b);return d.calculateStatistic("stdev",e,-1,d._defaultTracker(c))})};c.prototype.variance=function(a,b,c){var d=this;void 0===b&&(b=null);return this.load().then(function(){var e=p.WhereClause.create(a,d.getFieldsIndex());d._substituteVars(e,b);return d.calculateStatistic("variance",e,-1,d._defaultTracker(c))})};
c.prototype.count=function(a){var b=this;return this.load().then(function(){return b.calculateStatistic("count",p.WhereClause.create("1",b.getFieldsIndex()),-1,b._defaultTracker(a))})};c.prototype._defaultTracker=function(a){return a?a:{aborted:!1}};c.prototype.forEach=function(a,b){var c=this;return h.create(function(d,e){c._forEachImpl(c.iterator(c._defaultTracker(b)),a,c,d,e,0)})};c.prototype._forEachImpl=function(a,b,c,d,g,f){var e=this;try{f++,1E3<f?setTimeout(function(){f=0;e._forEachImpl(a,
b,c,d,g,f)},0):a.next().then(function(k){try{if(null===k)d(c);else{var l=b(k);void 0===l||null===l?e._forEachImpl(a,b,c,d,g,f):h.isPromiseLike(l)?l.then(function(){try{e._forEachImpl(a,b,c,d,g,f)}catch(u){g(u)}},g):e._forEachImpl(a,b,c,d,g,f)}}catch(u){g(u)}},g)}catch(t){g(t)}};c.prototype.convertToJSON=function(a){for(var b=[],c=[],d=0;d<this.fields.length;d++)b.push(l.esriFieldToJson(this.fields[d]));return this.reduce(function(a){var b={geometry:a.geometry&&a.geometry.toJSON(),attributes:{}},d;
for(d in a.attributes)b.attributes[d]=a.attributes[d];c.push(b);return 1},0,a)};c.prototype.castToText=function(){return"object, FeatureSet"};c.prototype.queryAttachments=function(a,b,c,d){return this._parent.queryAttachments(a,b,c,d)};c.prototype.serviceUrl=function(){return this._parent.serviceUrl()};c.prototype.relationshipMetaData=function(){return this._parent.relationshipMetaData()};c.prototype.schema=function(){for(var a=[],b=0,c=this.fields;b<c.length;b++)a.push(l.esriFieldToJson(c[b]));return{objectIdField:this.objectIdField,
typeIdField:this.typeIdField,geometryType:void 0===l.layerGeometryEsriConstants[this.geometryType]?"":l.layerGeometryEsriConstants[this.geometryType],hasZ:this.hasZ,hasM:this.hasM,fields:a}};c.prototype.convertToText=function(a,b){var c=this;return"schema"===a?this._ensureLoaded().then(function(){return JSON.stringify(c.schema())}):"featureset"===a?this._ensureLoaded().then(function(){var a=[];return c.reduce(function(b,c){b={geometry:c.geometry?c.geometry.toJSON():null,attributes:c.attributes};null!==
b.geometry&&b.geometry.spatialReference&&delete b.geometry.spatialReference;a.push(b);return 1},0,b).then(function(){var b=c.schema();b.features=a;b.spatialReference=c.spatialReference.toJSON();return JSON.stringify(b)})}):h.resolve(this.castToText())};c.prototype.getFeatureByObjectId=function(a,b){return this._parent.getFeatureByObjectId(a,b)};c._featuresetFunctions={};return c}()});