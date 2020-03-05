/*! ArcGIS API for JavaScript 4.14 | Copyright (c) 2020 Esri. All rights reserved. | http://www.esri.com/legal/privacy | https://developers.arcgis.com/terms/faq */
define(["dojo/Stateful","dojo/_base/declare","dojo/_base/lang","esri/core/HandleRegistry","esri-playground-js/utils/CodeGenerator","esri-playground-js/utils/ObjectProvider","prettier/prettier-helper"],function(Stateful,declare,lang,HandleRegistry,CodeGenerator,ObjectProvider,prettierHelper){var prettierOptions=Object.assign({},prettierHelper.esriDefaultOptions,{parser:"babylon"});var currentState={};var CurrentState=declare([Stateful],{ast:null,config:null,editor:null,statefulObject:null,view:null});var destroy=function(){currentState._instance.handles.destroy();currentState._instance.handles=null;currentState._instance.required=null;currentState._instance=null};var getInstance=function(){if(!currentState._instance){currentState._instance=new CurrentState;currentState._instance.handles=new HandleRegistry;currentState._instance.required={paths:[],reqModules:[],commentReqModules:["// Modules required: "],reqVariables:[]};var astHandler=currentState._instance.watch("ast",function(){var ast=currentState._instance.get("ast");if(ast){var configData=currentState._instance.get("config");var autocastType=configData["autocastType"];if(autocastType){var autocastAST=CodeGenerator.getAutocastAST(configData["variable"],autocastType,ast);var autocastCode=CodeGenerator.generateCode(autocastAST);currentState._instance.editor.getDoc().setValue("// autocasts as new "+configData["className"]+"() \n\n"+prettierHelper.format(autocastCode,prettierOptions))}else{var code=CodeGenerator.generateCode(ast);code=currentState._instance.required.commentReqModules.join("\n")+"\n\n"+prettierHelper.format(code,prettierOptions);currentState._instance.editor.getDoc().setValue(code)}_updateStorageItem("ast")}});currentState._instance.handles.add(astHandler,"ast-handler");var configHandler=currentState._instance.watch("config",function(){_updateStorageItem("config")});currentState._instance.handles.add(configHandler,"config-handler");var statefulHandler=currentState._instance.watch("statefulObject",function(){_enableObjWatch(currentState._instance.config,currentState._instance.statefulObject);var storageObj=JSON.parse(sessionStorage.getItem(currentState._instance.config.className)),urlArray=window.location.hash.split("?")[1],urlObject=urlArray&&JSON.parse(decodeURIComponent(urlArray.split("=")[1]));if(urlObject||storageObj&&storageObj.statefulObject){_copyObjValues(currentState._instance.statefulObject,urlObject||storageObj.statefulObject);var ast=CodeGenerator.constructAST(currentState._instance);currentState._instance.set("ast",ast)}if(urlObject){var hash=window.location.hash;window.location.hash=hash.split("?")[0]}});currentState._instance.handles.add(statefulHandler,"stateful-handler");var requiredHandler=currentState._instance.watch("required",function(){});currentState._instance.handles.add(requiredHandler,"required-handler")}return currentState._instance};var _updateStorageItem=function(propertyName){var className=currentState._instance.config&&currentState._instance.config.className;if(className){var storageItem=JSON.parse(sessionStorage.getItem(className))||{};storageItem[propertyName]=currentState._instance.get(propertyName);sessionStorage.setItem(className,JSON.stringify(storageItem))}};var _copyObjValues=function(stateObj,obj){for(var prop in obj){if(obj[prop]instanceof Array){stateObj.set(prop,obj[prop])}else if(obj[prop]instanceof Object){_copyObjValues(stateObj[prop],obj[prop])}else if(obj[prop]!=null&&prop!=="className"){stateObj.set(prop,obj[prop])}}};var _enableObjWatch=function(configData,obj){for(var prop in obj){if(obj[prop]instanceof ObjectProvider.StatefulClass){_enableObjWatch(configData,obj[prop])}}var handler=obj.watch(function(name,oldValue,value){if(oldValue!=value){if(Array.isArray(value)&&name!=="color"){value.forEach(function(valObj){if(valObj instanceof ObjectProvider.StatefulClass){_enableObjWatch(configData,valObj)}})}else if(value instanceof ObjectProvider.StatefulClass){_enableObjWatch(configData,value)}var ast=CodeGenerator.constructAST(currentState._instance);currentState._instance.set("ast",ast);_updateStorageItem("statefulObject")}});currentState._instance.handles.add(handler,"obj-watch")};currentState.getInstance=getInstance;currentState.destroy=destroy;return currentState});