// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../core/tsSupport/generatorHelper ../../../core/tsSupport/awaiterHelper ../../../core/Error ../../../core/promiseUtils ./summaryStatistics ./support/ageUtils ./support/ageUtils ../support/utils".split(" "),function(x,y,q,h,k,e,t,u,d,v,l){function w(b){return k(this,void 0,void 0,function(){var a,f,c,g,m;return h(this,function(n){switch(n.label){case 0:if(!(b&&b.layer&&b.startTime&&b.endTime&&b.unit))throw new e("summary-statistics-for-age:missing-parameters",
"'layer', 'startTime', 'endTime' and 'unit' parameters are required");a=q({},b);f=[0,2,1,3];c=l.createLayerAdapter(a.layer,f);a.layer=c;if(!c)throw new e("summary-statistics-for-age:invalid-parameters","'layer' must be one of these types: "+l.getLayerTypeLabels(f).join(", "));g=a.view;return[4,t.all([g&&g.when(),c.load()])];case 1:n.sent();if(m=d.verifyDates(c,a.startTime,a.endTime,"summary-statistics-for-age:invalid-parameters"))throw m;if(-1===d.supportedAgeUnits.indexOf(a.unit))throw new e("summary-statistics-for-age:invalid-parameters",
"Supported units are: "+d.supportedAgeUnits.join(", "));return[2,a]}})})}return function(b){return k(this,void 0,void 0,function(){var a,f,c,g,m,n,e,d,p,k,l,r;return h(this,function(h){switch(h.label){case 0:return[4,w(b)];case 1:return a=h.sent(),f=a.view,c=a.startTime,g=a.endTime,m=a.unit,n=a.minValue,e=a.maxValue,d=a.layer,p=v.getAgeExpressions({layer:d,startTime:c,endTime:g,unit:m}),k=p.valueExpression,l=p.statisticsQuery,r=q({layer:d,valueExpression:k},l,{minValue:n,maxValue:e,view:f}),[2,u(r)]}})})}});