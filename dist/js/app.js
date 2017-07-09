/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "fe39cc80d1c348524156"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(8)(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*! bulma.io v0.4.2 | MIT License | github.com/jgthms/bulma */\n@-webkit-keyframes spinAround{\n  from{\n    -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n  }\n  to{\n    -webkit-transform:rotate(359deg);\n            transform:rotate(359deg);\n  }\n}\n@keyframes spinAround{\n  from{\n    -webkit-transform:rotate(0deg);\n            transform:rotate(0deg);\n  }\n  to{\n    -webkit-transform:rotate(359deg);\n            transform:rotate(359deg);\n  }\n}\n\n/*! minireset.css v0.0.2 | MIT License | github.com/jgthms/minireset.css */\nhtml,\nbody,\np,\nol,\nul,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfieldset,\nlegend,\ntextarea,\npre,\niframe,\nhr,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6{\n  margin:0;\n  padding:0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6{\n  font-size:100%;\n  font-weight:normal;\n}\n\nul{\n  list-style:none;\n}\n\nbutton,\ninput,\nselect,\ntextarea{\n  margin:0;\n}\n\nhtml{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n}\n\n*{\n  -webkit-box-sizing:inherit;\n          box-sizing:inherit;\n}\n\n*:before, *:after{\n  -webkit-box-sizing:inherit;\n          box-sizing:inherit;\n}\n\nimg,\nembed,\nobject,\naudio,\nvideo{\n  max-width:100%;\n}\n\niframe{\n  border:0;\n}\n\ntable{\n  border-collapse:collapse;\n  border-spacing:0;\n}\n\ntd,\nth{\n  padding:0;\n  text-align:left;\n}\n\nhtml{\n  background-color:#fff;\n  font-size:16px;\n  -moz-osx-font-smoothing:grayscale;\n  -webkit-font-smoothing:antialiased;\n  min-width:300px;\n  overflow-x:hidden;\n  overflow-y:scroll;\n  text-rendering:optimizeLegibility;\n}\n\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nsection{\n  display:block;\n}\n\nbody,\nbutton,\ninput,\nselect,\ntextarea{\n  font-family:BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n}\n\ncode,\npre{\n  -moz-osx-font-smoothing:auto;\n  -webkit-font-smoothing:auto;\n  font-family:monospace;\n}\n\nbody{\n  color:#4a4a4a;\n  font-size:1rem;\n  font-weight:400;\n  line-height:1.5;\n  overflow-x:hidden;\n}\n\na{\n  color:#00d1b2;\n  cursor:pointer;\n  text-decoration:none;\n  -webkit-transition:none 86ms ease-out;\n  -o-transition:none 86ms ease-out;\n  transition:none 86ms ease-out;\n}\n\na:hover{\n  color:#363636;\n}\n\ncode{\n  background-color:whitesmoke;\n  color:#ff3860;\n  font-size:0.8em;\n  font-weight:normal;\n  padding:0.25em 0.5em 0.25em;\n}\n\nhr{\n  background-color:#dbdbdb;\n  border:none;\n  display:block;\n  height:1px;\n  margin:1.5rem 0;\n}\n\nimg{\n  max-width:100%;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"]{\n  vertical-align:baseline;\n}\n\nsmall{\n  font-size:0.875em;\n}\n\nspan{\n  font-style:inherit;\n  font-weight:inherit;\n}\n\nstrong{\n  color:#363636;\n  font-weight:700;\n}\n\npre{\n  background-color:whitesmoke;\n  color:#4a4a4a;\n  font-size:0.8em;\n  white-space:pre;\n  word-wrap:normal;\n}\n\npre code{\n  -webkit-overflow-scrolling:touch;\n  background:none;\n  color:inherit;\n  display:block;\n  font-size:1em;\n  overflow-x:auto;\n  padding:1.25rem 1.5rem;\n}\n\ntable{\n  width:100%;\n}\n\ntable td,\ntable th{\n  text-align:left;\n  vertical-align:top;\n}\n\ntable th{\n  color:#363636;\n}\n\n.is-block{\n  display:block;\n}\n\n.is-flex{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.is-inline{\n  display:inline;\n}\n\n.is-inline-block{\n  display:inline-block;\n}\n\n.is-inline-flex{\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n}\n\n.is-clearfix:after{\n  clear:both;\n  content:\" \";\n  display:table;\n}\n\n.is-pulled-left{\n  float:left;\n}\n\n.is-pulled-right{\n  float:right;\n}\n\n.is-clipped{\n  overflow:hidden !important;\n}\n\n.is-overlay{\n  bottom:0;\n  left:0;\n  position:absolute;\n  right:0;\n  top:0;\n}\n\n.has-text-centered{\n  text-align:center;\n}\n\n.has-text-left{\n  text-align:left;\n}\n\n.has-text-right{\n  text-align:right;\n}\n\n.has-text-white{\n  color:white;\n}\n\na.has-text-white:hover, a.has-text-white:focus{\n  color:#e6e6e6;\n}\n\n.has-text-black{\n  color:#0a0a0a;\n}\n\na.has-text-black:hover, a.has-text-black:focus{\n  color:black;\n}\n\n.has-text-light{\n  color:whitesmoke;\n}\n\na.has-text-light:hover, a.has-text-light:focus{\n  color:#dbdbdb;\n}\n\n.has-text-dark{\n  color:#363636;\n}\n\na.has-text-dark:hover, a.has-text-dark:focus{\n  color:#1c1c1c;\n}\n\n.has-text-primary{\n  color:#00d1b2;\n}\n\na.has-text-primary:hover, a.has-text-primary:focus{\n  color:#009e86;\n}\n\n.has-text-info{\n  color:#3273dc;\n}\n\na.has-text-info:hover, a.has-text-info:focus{\n  color:#205bbc;\n}\n\n.has-text-success{\n  color:#23d160;\n}\n\na.has-text-success:hover, a.has-text-success:focus{\n  color:#1ca64c;\n}\n\n.has-text-warning{\n  color:#ffdd57;\n}\n\na.has-text-warning:hover, a.has-text-warning:focus{\n  color:#ffd324;\n}\n\n.has-text-danger{\n  color:#ff3860;\n}\n\na.has-text-danger:hover, a.has-text-danger:focus{\n  color:#ff0537;\n}\n\n.is-hidden{\n  display:none !important;\n}\n\n.is-marginless{\n  margin:0 !important;\n}\n\n.is-paddingless{\n  padding:0 !important;\n}\n\n.is-unselectable{\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n}\n\n.box{\n  background-color:white;\n  border-radius:5px;\n  -webkit-box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n          box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  display:block;\n  padding:1.25rem;\n}\n\n.box:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\na.box:hover, a.box:focus{\n  -webkit-box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #00d1b2;\n          box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #00d1b2;\n}\n\na.box:active{\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #00d1b2;\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #00d1b2;\n}\n\n.button{\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border:1px solid transparent;\n  border-radius:3px;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:1rem;\n  height:2.25em;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  line-height:1.5;\n  padding-bottom:calc(0.375em - 1px);\n  padding-left:calc(0.625em - 1px);\n  padding-right:calc(0.625em - 1px);\n  padding-top:calc(0.375em - 1px);\n  position:relative;\n  vertical-align:top;\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  background-color:white;\n  border-color:#dbdbdb;\n  color:#363636;\n  cursor:pointer;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  padding-left:0.75em;\n  padding-right:0.75em;\n  text-align:center;\n  white-space:nowrap;\n}\n\n.button:focus, .button.is-focused, .button:active, .button.is-active{\n  outline:none;\n}\n\n.button[disabled]{\n  cursor:not-allowed;\n}\n\n.button strong{\n  color:inherit;\n}\n\n.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large{\n  height:1.5em;\n  width:1.5em;\n}\n\n.button .icon:first-child:not(:last-child){\n  margin-left:calc(-0.375em - 1px);\n  margin-right:0.1875em;\n}\n\n.button .icon:last-child:not(:first-child){\n  margin-left:0.1875em;\n  margin-right:calc(-0.375em - 1px);\n}\n\n.button .icon:first-child:last-child{\n  margin-left:calc(-0.375em - 1px);\n  margin-right:calc(-0.375em - 1px);\n}\n\n.button:hover, .button.is-hovered{\n  border-color:#b5b5b5;\n  color:#363636;\n}\n\n.button:focus, .button.is-focused{\n  border-color:#00d1b2;\n  -webkit-box-shadow:0 0 0.5em rgba(0, 209, 178, 0.25);\n          box-shadow:0 0 0.5em rgba(0, 209, 178, 0.25);\n  color:#363636;\n}\n\n.button:active, .button.is-active{\n  border-color:#4a4a4a;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#363636;\n}\n\n.button.is-link{\n  background-color:transparent;\n  border-color:transparent;\n  color:#4a4a4a;\n  text-decoration:underline;\n}\n\n.button.is-link:hover, .button.is-link.is-hovered, .button.is-link:focus, .button.is-link.is-focused, .button.is-link:active, .button.is-link.is-active{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.button.is-link[disabled]{\n  background-color:transparent;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-white{\n  background-color:white;\n  border-color:transparent;\n  color:#0a0a0a;\n}\n\n.button.is-white:hover, .button.is-white.is-hovered{\n  background-color:#f9f9f9;\n  border-color:transparent;\n  color:#0a0a0a;\n}\n\n.button.is-white:focus, .button.is-white.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(255, 255, 255, 0.25);\n          box-shadow:0 0 0.5em rgba(255, 255, 255, 0.25);\n  color:#0a0a0a;\n}\n\n.button.is-white:active, .button.is-white.is-active{\n  background-color:#f2f2f2;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#0a0a0a;\n}\n\n.button.is-white[disabled]{\n  background-color:white;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-white.is-inverted{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.button.is-white.is-inverted:hover{\n  background-color:black;\n}\n\n.button.is-white.is-inverted[disabled]{\n  background-color:#0a0a0a;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:white;\n}\n\n.button.is-white.is-loading:after{\n  border-color:transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-white.is-outlined{\n  background-color:transparent;\n  border-color:white;\n  color:white;\n}\n\n.button.is-white.is-outlined:hover, .button.is-white.is-outlined:focus{\n  background-color:white;\n  border-color:white;\n  color:#0a0a0a;\n}\n\n.button.is-white.is-outlined.is-loading:after{\n  border-color:transparent transparent white white !important;\n}\n\n.button.is-white.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:white;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:white;\n}\n\n.button.is-white.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#0a0a0a;\n  color:#0a0a0a;\n}\n\n.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined:focus{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.button.is-white.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#0a0a0a;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#0a0a0a;\n}\n\n.button.is-black{\n  background-color:#0a0a0a;\n  border-color:transparent;\n  color:white;\n}\n\n.button.is-black:hover, .button.is-black.is-hovered{\n  background-color:#040404;\n  border-color:transparent;\n  color:white;\n}\n\n.button.is-black:focus, .button.is-black.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(10, 10, 10, 0.25);\n          box-shadow:0 0 0.5em rgba(10, 10, 10, 0.25);\n  color:white;\n}\n\n.button.is-black:active, .button.is-black.is-active{\n  background-color:black;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:white;\n}\n\n.button.is-black[disabled]{\n  background-color:#0a0a0a;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-black.is-inverted{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.button.is-black.is-inverted:hover{\n  background-color:#f2f2f2;\n}\n\n.button.is-black.is-inverted[disabled]{\n  background-color:white;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#0a0a0a;\n}\n\n.button.is-black.is-loading:after{\n  border-color:transparent transparent white white !important;\n}\n\n.button.is-black.is-outlined{\n  background-color:transparent;\n  border-color:#0a0a0a;\n  color:#0a0a0a;\n}\n\n.button.is-black.is-outlined:hover, .button.is-black.is-outlined:focus{\n  background-color:#0a0a0a;\n  border-color:#0a0a0a;\n  color:white;\n}\n\n.button.is-black.is-outlined.is-loading:after{\n  border-color:transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-black.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#0a0a0a;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#0a0a0a;\n}\n\n.button.is-black.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:white;\n  color:white;\n}\n\n.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined:focus{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.button.is-black.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:white;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:white;\n}\n\n.button.is-light{\n  background-color:whitesmoke;\n  border-color:transparent;\n  color:#363636;\n}\n\n.button.is-light:hover, .button.is-light.is-hovered{\n  background-color:#eeeeee;\n  border-color:transparent;\n  color:#363636;\n}\n\n.button.is-light:focus, .button.is-light.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(245, 245, 245, 0.25);\n          box-shadow:0 0 0.5em rgba(245, 245, 245, 0.25);\n  color:#363636;\n}\n\n.button.is-light:active, .button.is-light.is-active{\n  background-color:#e8e8e8;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#363636;\n}\n\n.button.is-light[disabled]{\n  background-color:whitesmoke;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-light.is-inverted{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.button.is-light.is-inverted:hover{\n  background-color:#292929;\n}\n\n.button.is-light.is-inverted[disabled]{\n  background-color:#363636;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:whitesmoke;\n}\n\n.button.is-light.is-loading:after{\n  border-color:transparent transparent #363636 #363636 !important;\n}\n\n.button.is-light.is-outlined{\n  background-color:transparent;\n  border-color:whitesmoke;\n  color:whitesmoke;\n}\n\n.button.is-light.is-outlined:hover, .button.is-light.is-outlined:focus{\n  background-color:whitesmoke;\n  border-color:whitesmoke;\n  color:#363636;\n}\n\n.button.is-light.is-outlined.is-loading:after{\n  border-color:transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-light.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:whitesmoke;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:whitesmoke;\n}\n\n.button.is-light.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#363636;\n  color:#363636;\n}\n\n.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined:focus{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.button.is-light.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#363636;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#363636;\n}\n\n.button.is-dark{\n  background-color:#363636;\n  border-color:transparent;\n  color:whitesmoke;\n}\n\n.button.is-dark:hover, .button.is-dark.is-hovered{\n  background-color:#2f2f2f;\n  border-color:transparent;\n  color:whitesmoke;\n}\n\n.button.is-dark:focus, .button.is-dark.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(54, 54, 54, 0.25);\n          box-shadow:0 0 0.5em rgba(54, 54, 54, 0.25);\n  color:whitesmoke;\n}\n\n.button.is-dark:active, .button.is-dark.is-active{\n  background-color:#292929;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:whitesmoke;\n}\n\n.button.is-dark[disabled]{\n  background-color:#363636;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-dark.is-inverted{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.button.is-dark.is-inverted:hover{\n  background-color:#e8e8e8;\n}\n\n.button.is-dark.is-inverted[disabled]{\n  background-color:whitesmoke;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#363636;\n}\n\n.button.is-dark.is-loading:after{\n  border-color:transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-dark.is-outlined{\n  background-color:transparent;\n  border-color:#363636;\n  color:#363636;\n}\n\n.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined:focus{\n  background-color:#363636;\n  border-color:#363636;\n  color:whitesmoke;\n}\n\n.button.is-dark.is-outlined.is-loading:after{\n  border-color:transparent transparent #363636 #363636 !important;\n}\n\n.button.is-dark.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#363636;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#363636;\n}\n\n.button.is-dark.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:whitesmoke;\n  color:whitesmoke;\n}\n\n.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined:focus{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.button.is-dark.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:whitesmoke;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:whitesmoke;\n}\n\n.button.is-primary{\n  background-color:#00d1b2;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-primary:hover, .button.is-primary.is-hovered{\n  background-color:#00c4a7;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-primary:focus, .button.is-primary.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(0, 209, 178, 0.25);\n          box-shadow:0 0 0.5em rgba(0, 209, 178, 0.25);\n  color:#fff;\n}\n\n.button.is-primary:active, .button.is-primary.is-active{\n  background-color:#00b89c;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#fff;\n}\n\n.button.is-primary[disabled]{\n  background-color:#00d1b2;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-primary.is-inverted{\n  background-color:#fff;\n  color:#00d1b2;\n}\n\n.button.is-primary.is-inverted:hover{\n  background-color:#f2f2f2;\n}\n\n.button.is-primary.is-inverted[disabled]{\n  background-color:#fff;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#00d1b2;\n}\n\n.button.is-primary.is-loading:after{\n  border-color:transparent transparent #fff #fff !important;\n}\n\n.button.is-primary.is-outlined{\n  background-color:transparent;\n  border-color:#00d1b2;\n  color:#00d1b2;\n}\n\n.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus{\n  background-color:#00d1b2;\n  border-color:#00d1b2;\n  color:#fff;\n}\n\n.button.is-primary.is-outlined.is-loading:after{\n  border-color:transparent transparent #00d1b2 #00d1b2 !important;\n}\n\n.button.is-primary.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#00d1b2;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#00d1b2;\n}\n\n.button.is-primary.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#fff;\n  color:#fff;\n}\n\n.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined:focus{\n  background-color:#fff;\n  color:#00d1b2;\n}\n\n.button.is-primary.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#fff;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#fff;\n}\n\n.button.is-info{\n  background-color:#3273dc;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-info:hover, .button.is-info.is-hovered{\n  background-color:#276cda;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-info:focus, .button.is-info.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(50, 115, 220, 0.25);\n          box-shadow:0 0 0.5em rgba(50, 115, 220, 0.25);\n  color:#fff;\n}\n\n.button.is-info:active, .button.is-info.is-active{\n  background-color:#2366d1;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#fff;\n}\n\n.button.is-info[disabled]{\n  background-color:#3273dc;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-info.is-inverted{\n  background-color:#fff;\n  color:#3273dc;\n}\n\n.button.is-info.is-inverted:hover{\n  background-color:#f2f2f2;\n}\n\n.button.is-info.is-inverted[disabled]{\n  background-color:#fff;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#3273dc;\n}\n\n.button.is-info.is-loading:after{\n  border-color:transparent transparent #fff #fff !important;\n}\n\n.button.is-info.is-outlined{\n  background-color:transparent;\n  border-color:#3273dc;\n  color:#3273dc;\n}\n\n.button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus{\n  background-color:#3273dc;\n  border-color:#3273dc;\n  color:#fff;\n}\n\n.button.is-info.is-outlined.is-loading:after{\n  border-color:transparent transparent #3273dc #3273dc !important;\n}\n\n.button.is-info.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#3273dc;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#3273dc;\n}\n\n.button.is-info.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#fff;\n  color:#fff;\n}\n\n.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined:focus{\n  background-color:#fff;\n  color:#3273dc;\n}\n\n.button.is-info.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#fff;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#fff;\n}\n\n.button.is-success{\n  background-color:#23d160;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-success:hover, .button.is-success.is-hovered{\n  background-color:#22c65b;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-success:focus, .button.is-success.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(35, 209, 96, 0.25);\n          box-shadow:0 0 0.5em rgba(35, 209, 96, 0.25);\n  color:#fff;\n}\n\n.button.is-success:active, .button.is-success.is-active{\n  background-color:#20bc56;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#fff;\n}\n\n.button.is-success[disabled]{\n  background-color:#23d160;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-success.is-inverted{\n  background-color:#fff;\n  color:#23d160;\n}\n\n.button.is-success.is-inverted:hover{\n  background-color:#f2f2f2;\n}\n\n.button.is-success.is-inverted[disabled]{\n  background-color:#fff;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#23d160;\n}\n\n.button.is-success.is-loading:after{\n  border-color:transparent transparent #fff #fff !important;\n}\n\n.button.is-success.is-outlined{\n  background-color:transparent;\n  border-color:#23d160;\n  color:#23d160;\n}\n\n.button.is-success.is-outlined:hover, .button.is-success.is-outlined:focus{\n  background-color:#23d160;\n  border-color:#23d160;\n  color:#fff;\n}\n\n.button.is-success.is-outlined.is-loading:after{\n  border-color:transparent transparent #23d160 #23d160 !important;\n}\n\n.button.is-success.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#23d160;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#23d160;\n}\n\n.button.is-success.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#fff;\n  color:#fff;\n}\n\n.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined:focus{\n  background-color:#fff;\n  color:#23d160;\n}\n\n.button.is-success.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#fff;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#fff;\n}\n\n.button.is-warning{\n  background-color:#ffdd57;\n  border-color:transparent;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:hover, .button.is-warning.is-hovered{\n  background-color:#ffdb4a;\n  border-color:transparent;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:focus, .button.is-warning.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(255, 221, 87, 0.25);\n          box-shadow:0 0 0.5em rgba(255, 221, 87, 0.25);\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:active, .button.is-warning.is-active{\n  background-color:#ffd83d;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning[disabled]{\n  background-color:#ffdd57;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-warning.is-inverted{\n  background-color:rgba(0, 0, 0, 0.7);\n  color:#ffdd57;\n}\n\n.button.is-warning.is-inverted:hover{\n  background-color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted[disabled]{\n  background-color:rgba(0, 0, 0, 0.7);\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#ffdd57;\n}\n\n.button.is-warning.is-loading:after{\n  border-color:transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;\n}\n\n.button.is-warning.is-outlined{\n  background-color:transparent;\n  border-color:#ffdd57;\n  color:#ffdd57;\n}\n\n.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined:focus{\n  background-color:#ffdd57;\n  border-color:#ffdd57;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-outlined.is-loading:after{\n  border-color:transparent transparent #ffdd57 #ffdd57 !important;\n}\n\n.button.is-warning.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#ffdd57;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#ffdd57;\n}\n\n.button.is-warning.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:rgba(0, 0, 0, 0.7);\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined:focus{\n  background-color:rgba(0, 0, 0, 0.7);\n  color:#ffdd57;\n}\n\n.button.is-warning.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:rgba(0, 0, 0, 0.7);\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.button.is-danger{\n  background-color:#ff3860;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-danger:hover, .button.is-danger.is-hovered{\n  background-color:#ff2b56;\n  border-color:transparent;\n  color:#fff;\n}\n\n.button.is-danger:focus, .button.is-danger.is-focused{\n  border-color:transparent;\n  -webkit-box-shadow:0 0 0.5em rgba(255, 56, 96, 0.25);\n          box-shadow:0 0 0.5em rgba(255, 56, 96, 0.25);\n  color:#fff;\n}\n\n.button.is-danger:active, .button.is-danger.is-active{\n  background-color:#ff1f4b;\n  border-color:transparent;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color:#fff;\n}\n\n.button.is-danger[disabled]{\n  background-color:#ff3860;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n}\n\n.button.is-danger.is-inverted{\n  background-color:#fff;\n  color:#ff3860;\n}\n\n.button.is-danger.is-inverted:hover{\n  background-color:#f2f2f2;\n}\n\n.button.is-danger.is-inverted[disabled]{\n  background-color:#fff;\n  border-color:transparent;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#ff3860;\n}\n\n.button.is-danger.is-loading:after{\n  border-color:transparent transparent #fff #fff !important;\n}\n\n.button.is-danger.is-outlined{\n  background-color:transparent;\n  border-color:#ff3860;\n  color:#ff3860;\n}\n\n.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus{\n  background-color:#ff3860;\n  border-color:#ff3860;\n  color:#fff;\n}\n\n.button.is-danger.is-outlined.is-loading:after{\n  border-color:transparent transparent #ff3860 #ff3860 !important;\n}\n\n.button.is-danger.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#ff3860;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#ff3860;\n}\n\n.button.is-danger.is-inverted.is-outlined{\n  background-color:transparent;\n  border-color:#fff;\n  color:#fff;\n}\n\n.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined:focus{\n  background-color:#fff;\n  color:#ff3860;\n}\n\n.button.is-danger.is-inverted.is-outlined[disabled]{\n  background-color:transparent;\n  border-color:#fff;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#fff;\n}\n\n.button.is-small{\n  border-radius:2px;\n  font-size:0.75rem;\n}\n\n.button.is-medium{\n  font-size:1.25rem;\n}\n\n.button.is-large{\n  font-size:1.5rem;\n}\n\n.button[disabled]{\n  background-color:white;\n  border-color:#dbdbdb;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  opacity:0.5;\n}\n\n.button.is-fullwidth{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  width:100%;\n}\n\n.button.is-loading{\n  color:transparent !important;\n  pointer-events:none;\n}\n\n.button.is-loading:after{\n  -webkit-animation:spinAround 500ms infinite linear;\n          animation:spinAround 500ms infinite linear;\n  border:2px solid #dbdbdb;\n  border-radius:290486px;\n  border-right-color:transparent;\n  border-top-color:transparent;\n  content:\"\";\n  display:block;\n  height:1em;\n  position:relative;\n  width:1em;\n  position:absolute;\n  left:calc(50% - (1em / 2));\n  top:calc(50% - (1em / 2));\n  position:absolute !important;\n}\n\n.button.is-static{\n  background-color:whitesmoke;\n  border-color:#dbdbdb;\n  color:#7a7a7a;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  pointer-events:none;\n}\n\nbutton.button,\ninput[type=\"submit\"].button{\n  line-height:1;\n  padding-bottom:0.4em;\n  padding-top:0.35em;\n}\n\n.content{\n  color:#4a4a4a;\n}\n\n.content:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.content li + li{\n  margin-top:0.25em;\n}\n\n.content p:not(:last-child),\n.content dl:not(:last-child),\n.content ol:not(:last-child),\n.content ul:not(:last-child),\n.content blockquote:not(:last-child),\n.content pre:not(:last-child),\n.content table:not(:last-child){\n  margin-bottom:1em;\n}\n\n.content h1,\n.content h2,\n.content h3,\n.content h4,\n.content h5,\n.content h6{\n  color:#363636;\n  font-weight:400;\n  line-height:1.125;\n}\n\n.content h1{\n  font-size:2em;\n  margin-bottom:0.5em;\n}\n\n.content h1:not(:first-child){\n  margin-top:1em;\n}\n\n.content h2{\n  font-size:1.75em;\n  margin-bottom:0.5714em;\n}\n\n.content h2:not(:first-child){\n  margin-top:1.1428em;\n}\n\n.content h3{\n  font-size:1.5em;\n  margin-bottom:0.6666em;\n}\n\n.content h3:not(:first-child){\n  margin-top:1.3333em;\n}\n\n.content h4{\n  font-size:1.25em;\n  margin-bottom:0.8em;\n}\n\n.content h5{\n  font-size:1.125em;\n  margin-bottom:0.8888em;\n}\n\n.content h6{\n  font-size:1em;\n  margin-bottom:1em;\n}\n\n.content blockquote{\n  background-color:whitesmoke;\n  border-left:5px solid #dbdbdb;\n  padding:1.25em 1.5em;\n}\n\n.content ol{\n  list-style:decimal outside;\n  margin-left:2em;\n  margin-top:1em;\n}\n\n.content ul{\n  list-style:disc outside;\n  margin-left:2em;\n  margin-top:1em;\n}\n\n.content ul ul{\n  list-style-type:circle;\n  margin-top:0.5em;\n}\n\n.content ul ul ul{\n  list-style-type:square;\n}\n\n.content dd{\n  margin-left:2em;\n}\n\n.content figure{\n  text-align:center;\n}\n\n.content figure img{\n  display:inline-block;\n}\n\n.content figure figcaption{\n  font-style:italic;\n}\n\n.content pre{\n  -webkit-overflow-scrolling:touch;\n  overflow-x:auto;\n  padding:1.25em 1.5em;\n  white-space:pre;\n  word-wrap:normal;\n}\n\n.content sup,\n.content sub{\n  font-size:70%;\n}\n\n.content table{\n  width:100%;\n}\n\n.content table td,\n.content table th{\n  border:1px solid #dbdbdb;\n  border-width:0 0 1px;\n  padding:0.5em 0.75em;\n  vertical-align:top;\n}\n\n.content table th{\n  color:#363636;\n  text-align:left;\n}\n\n.content table tr:hover{\n  background-color:whitesmoke;\n}\n\n.content table thead td,\n.content table thead th{\n  border-width:0 0 2px;\n  color:#363636;\n}\n\n.content table tfoot td,\n.content table tfoot th{\n  border-width:2px 0 0;\n  color:#363636;\n}\n\n.content table tbody tr:last-child td,\n.content table tbody tr:last-child th{\n  border-bottom-width:0;\n}\n\n.content.is-small{\n  font-size:0.75rem;\n}\n\n.content.is-medium{\n  font-size:1.25rem;\n}\n\n.content.is-large{\n  font-size:1.5rem;\n}\n\n.input,\n.textarea{\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border:1px solid transparent;\n  border-radius:3px;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:1rem;\n  height:2.25em;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  line-height:1.5;\n  padding-bottom:calc(0.375em - 1px);\n  padding-left:calc(0.625em - 1px);\n  padding-right:calc(0.625em - 1px);\n  padding-top:calc(0.375em - 1px);\n  position:relative;\n  vertical-align:top;\n  background-color:white;\n  border-color:#dbdbdb;\n  color:#363636;\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.1);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width:100%;\n  width:100%;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active{\n  outline:none;\n}\n\n.input[disabled],\n.textarea[disabled]{\n  cursor:not-allowed;\n}\n\n.input:hover, .input.is-hovered,\n.textarea:hover,\n.textarea.is-hovered{\n  border-color:#b5b5b5;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active{\n  border-color:#00d1b2;\n}\n\n.input[disabled],\n.textarea[disabled]{\n  background-color:whitesmoke;\n  border-color:whitesmoke;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#7a7a7a;\n}\n\n.input[disabled]::-moz-placeholder,\n.textarea[disabled]::-moz-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]::-webkit-input-placeholder,\n.textarea[disabled]::-webkit-input-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-moz-placeholder,\n.textarea[disabled]:-moz-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-ms-input-placeholder,\n.textarea[disabled]:-ms-input-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.input[type=\"search\"],\n.textarea[type=\"search\"]{\n  border-radius:290486px;\n}\n\n.input.is-white,\n.textarea.is-white{\n  border-color:white;\n}\n\n.input.is-black,\n.textarea.is-black{\n  border-color:#0a0a0a;\n}\n\n.input.is-light,\n.textarea.is-light{\n  border-color:whitesmoke;\n}\n\n.input.is-dark,\n.textarea.is-dark{\n  border-color:#363636;\n}\n\n.input.is-primary,\n.textarea.is-primary{\n  border-color:#00d1b2;\n}\n\n.input.is-info,\n.textarea.is-info{\n  border-color:#3273dc;\n}\n\n.input.is-success,\n.textarea.is-success{\n  border-color:#23d160;\n}\n\n.input.is-warning,\n.textarea.is-warning{\n  border-color:#ffdd57;\n}\n\n.input.is-danger,\n.textarea.is-danger{\n  border-color:#ff3860;\n}\n\n.input.is-small,\n.textarea.is-small{\n  border-radius:2px;\n  font-size:0.75rem;\n}\n\n.input.is-medium,\n.textarea.is-medium{\n  font-size:1.25rem;\n}\n\n.input.is-large,\n.textarea.is-large{\n  font-size:1.5rem;\n}\n\n.input.is-fullwidth,\n.textarea.is-fullwidth{\n  display:block;\n  width:100%;\n}\n\n.input.is-inline,\n.textarea.is-inline{\n  display:inline;\n  width:auto;\n}\n\n.textarea{\n  display:block;\n  max-height:600px;\n  max-width:100%;\n  min-height:120px;\n  min-width:100%;\n  padding:0.625em;\n  resize:vertical;\n}\n\n.checkbox,\n.radio{\n  cursor:pointer;\n  display:inline-block;\n  line-height:1.25;\n  position:relative;\n}\n\n.checkbox input,\n.radio input{\n  cursor:pointer;\n}\n\n.checkbox:hover,\n.radio:hover{\n  color:#363636;\n}\n\n.checkbox[disabled],\n.radio[disabled]{\n  color:#7a7a7a;\n  cursor:not-allowed;\n}\n\n.radio + .radio{\n  margin-left:0.5em;\n}\n\n.select{\n  display:inline-block;\n  height:2.25em;\n  max-width:100%;\n  position:relative;\n  vertical-align:top;\n}\n\n.select:after{\n  border:1px solid #00d1b2;\n  border-right:0;\n  border-top:0;\n  content:\" \";\n  display:block;\n  height:0.5em;\n  pointer-events:none;\n  position:absolute;\n  -webkit-transform:rotate(-45deg);\n          -ms-transform:rotate(-45deg);\n      transform:rotate(-45deg);\n  width:0.5em;\n  margin-top:-0.375em;\n  right:1.125em;\n  top:50%;\n  z-index:4;\n}\n\n.select select{\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border:1px solid transparent;\n  border-radius:3px;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:1rem;\n  height:2.25em;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  line-height:1.5;\n  padding-bottom:calc(0.375em - 1px);\n  padding-left:calc(0.625em - 1px);\n  padding-right:calc(0.625em - 1px);\n  padding-top:calc(0.375em - 1px);\n  position:relative;\n  vertical-align:top;\n  background-color:white;\n  border-color:#dbdbdb;\n  color:#363636;\n  cursor:pointer;\n  display:block;\n  font-size:1em;\n  max-width:100%;\n  outline:none;\n  padding-right:2.5em;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active{\n  outline:none;\n}\n\n.select select[disabled]{\n  cursor:not-allowed;\n}\n\n.select select:hover, .select select.is-hovered{\n  border-color:#b5b5b5;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active{\n  border-color:#00d1b2;\n}\n\n.select select[disabled]{\n  background-color:whitesmoke;\n  border-color:whitesmoke;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#7a7a7a;\n}\n\n.select select[disabled]::-moz-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]::-webkit-input-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-moz-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-ms-input-placeholder{\n  color:rgba(54, 54, 54, 0.3);\n}\n\n.select select:hover{\n  border-color:#b5b5b5;\n}\n\n.select select::-ms-expand{\n  display:none;\n}\n\n.select select[disabled]:hover{\n  border-color:whitesmoke;\n}\n\n.select:hover:after{\n  border-color:#363636;\n}\n\n.select.is-white select{\n  border-color:white;\n}\n\n.select.is-black select{\n  border-color:#0a0a0a;\n}\n\n.select.is-light select{\n  border-color:whitesmoke;\n}\n\n.select.is-dark select{\n  border-color:#363636;\n}\n\n.select.is-primary select{\n  border-color:#00d1b2;\n}\n\n.select.is-info select{\n  border-color:#3273dc;\n}\n\n.select.is-success select{\n  border-color:#23d160;\n}\n\n.select.is-warning select{\n  border-color:#ffdd57;\n}\n\n.select.is-danger select{\n  border-color:#ff3860;\n}\n\n.select.is-small{\n  border-radius:2px;\n  font-size:0.75rem;\n}\n\n.select.is-medium{\n  font-size:1.25rem;\n}\n\n.select.is-large{\n  font-size:1.5rem;\n}\n\n.select.is-disabled:after{\n  border-color:#7a7a7a;\n}\n\n.select.is-fullwidth{\n  width:100%;\n}\n\n.select.is-fullwidth select{\n  width:100%;\n}\n\n.select.is-loading:after{\n  -webkit-animation:spinAround 500ms infinite linear;\n          animation:spinAround 500ms infinite linear;\n  border:2px solid #dbdbdb;\n  border-radius:290486px;\n  border-right-color:transparent;\n  border-top-color:transparent;\n  content:\"\";\n  display:block;\n  height:1em;\n  position:relative;\n  width:1em;\n  margin-top:0;\n  position:absolute;\n  right:0.625em;\n  top:0.625em;\n  -webkit-transform:none;\n          -ms-transform:none;\n      transform:none;\n}\n\n.select.is-loading.is-small:after{\n  font-size:0.75rem;\n}\n\n.select.is-loading.is-medium:after{\n  font-size:1.25rem;\n}\n\n.select.is-loading.is-large:after{\n  font-size:1.5rem;\n}\n\n.label{\n  color:#363636;\n  display:block;\n  font-size:1rem;\n  font-weight:700;\n}\n\n.label:not(:last-child){\n  margin-bottom:0.5em;\n}\n\n.label.is-small{\n  font-size:0.75rem;\n}\n\n.label.is-medium{\n  font-size:1.25rem;\n}\n\n.label.is-large{\n  font-size:1.5rem;\n}\n\n.help{\n  display:block;\n  font-size:0.75rem;\n  margin-top:0.25rem;\n}\n\n.help.is-white{\n  color:white;\n}\n\n.help.is-black{\n  color:#0a0a0a;\n}\n\n.help.is-light{\n  color:whitesmoke;\n}\n\n.help.is-dark{\n  color:#363636;\n}\n\n.help.is-primary{\n  color:#00d1b2;\n}\n\n.help.is-info{\n  color:#3273dc;\n}\n\n.help.is-success{\n  color:#23d160;\n}\n\n.help.is-warning{\n  color:#ffdd57;\n}\n\n.help.is-danger{\n  color:#ff3860;\n}\n\n.field:not(:last-child){\n  margin-bottom:0.75rem;\n}\n\n.field.has-addons{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n}\n\n.field.has-addons .control{\n  margin-right:-1px;\n}\n\n.field.has-addons .control:first-child .button,\n.field.has-addons .control:first-child .input,\n.field.has-addons .control:first-child .select select{\n  border-bottom-left-radius:3px;\n  border-top-left-radius:3px;\n}\n\n.field.has-addons .control:last-child .button,\n.field.has-addons .control:last-child .input,\n.field.has-addons .control:last-child .select select{\n  border-bottom-right-radius:3px;\n  border-top-right-radius:3px;\n}\n\n.field.has-addons .control .button,\n.field.has-addons .control .input,\n.field.has-addons .control .select select{\n  border-radius:0;\n}\n\n.field.has-addons .control .button:hover, .field.has-addons .control .button.is-hovered,\n.field.has-addons .control .input:hover,\n.field.has-addons .control .input.is-hovered,\n.field.has-addons .control .select select:hover,\n.field.has-addons .control .select select.is-hovered{\n  z-index:2;\n}\n\n.field.has-addons .control .button:focus, .field.has-addons .control .button.is-focused, .field.has-addons .control .button:active, .field.has-addons .control .button.is-active,\n.field.has-addons .control .input:focus,\n.field.has-addons .control .input.is-focused,\n.field.has-addons .control .input:active,\n.field.has-addons .control .input.is-active,\n.field.has-addons .control .select select:focus,\n.field.has-addons .control .select select.is-focused,\n.field.has-addons .control .select select:active,\n.field.has-addons .control .select select.is-active{\n  z-index:3;\n}\n\n.field.has-addons .control .button:focus:hover, .field.has-addons .control .button.is-focused:hover, .field.has-addons .control .button:active:hover, .field.has-addons .control .button.is-active:hover,\n.field.has-addons .control .input:focus:hover,\n.field.has-addons .control .input.is-focused:hover,\n.field.has-addons .control .input:active:hover,\n.field.has-addons .control .input.is-active:hover,\n.field.has-addons .control .select select:focus:hover,\n.field.has-addons .control .select select.is-focused:hover,\n.field.has-addons .control .select select:active:hover,\n.field.has-addons .control .select select.is-active:hover{\n  z-index:4;\n}\n\n.field.has-addons .control.is-expanded{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n}\n\n.field.has-addons.has-addons-centered{\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.field.has-addons.has-addons-right{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.field.has-addons.has-addons-fullwidth .control{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.field.is-grouped{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n}\n\n.field.is-grouped > .control{\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.field.is-grouped > .control:not(:last-child){\n  margin-bottom:0;\n  margin-right:0.75rem;\n}\n\n.field.is-grouped > .control.is-expanded{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n}\n\n.field.is-grouped.is-grouped-centered{\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.field.is-grouped.is-grouped-right{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.field-label .label{\n  font-size:inherit;\n}\n\n.control{\n  font-size:1rem;\n  position:relative;\n  text-align:left;\n}\n\n.control.has-icon .icon{\n  color:#dbdbdb;\n  height:2.25em;\n  pointer-events:none;\n  position:absolute;\n  top:0;\n  width:2.25em;\n  z-index:4;\n}\n\n.control.has-icon .input:focus + .icon{\n  color:#7a7a7a;\n}\n\n.control.has-icon .input.is-small + .icon{\n  font-size:0.75rem;\n}\n\n.control.has-icon .input.is-medium + .icon{\n  font-size:1.25rem;\n}\n\n.control.has-icon .input.is-large + .icon{\n  font-size:1.5rem;\n}\n\n.control.has-icon:not(.has-icon-right) .icon{\n  left:0;\n}\n\n.control.has-icon:not(.has-icon-right) .input{\n  padding-left:2.25em;\n}\n\n.control.has-icon.has-icon-right .icon{\n  right:0;\n}\n\n.control.has-icon.has-icon-right .input{\n  padding-right:2.25em;\n}\n\n.control.has-icons-left .input:focus ~ .icon,\n.control.has-icons-left .select select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,\n.control.has-icons-right .select select:focus ~ .icon{\n  color:#7a7a7a;\n}\n\n.control.has-icons-left .input.is-small ~ .icon,\n.control.has-icons-left .select select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,\n.control.has-icons-right .select select.is-small ~ .icon{\n  font-size:0.75rem;\n}\n\n.control.has-icons-left .input.is-medium ~ .icon,\n.control.has-icons-left .select select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,\n.control.has-icons-right .select select.is-medium ~ .icon{\n  font-size:1.25rem;\n}\n\n.control.has-icons-left .input.is-large ~ .icon,\n.control.has-icons-left .select select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,\n.control.has-icons-right .select select.is-large ~ .icon{\n  font-size:1.5rem;\n}\n\n.control.has-icons-left .icon, .control.has-icons-right .icon{\n  color:#dbdbdb;\n  height:2.25em;\n  pointer-events:none;\n  position:absolute;\n  top:0;\n  width:2.25em;\n  z-index:4;\n}\n\n.control.has-icons-left .input,\n.control.has-icons-left .select select{\n  padding-left:2.25em;\n}\n\n.control.has-icons-left .icon.is-left{\n  left:0;\n}\n\n.control.has-icons-right .input,\n.control.has-icons-right .select select{\n  padding-right:2.25em;\n}\n\n.control.has-icons-right .icon.is-right{\n  right:0;\n}\n\n.control.is-loading:after{\n  -webkit-animation:spinAround 500ms infinite linear;\n          animation:spinAround 500ms infinite linear;\n  border:2px solid #dbdbdb;\n  border-radius:290486px;\n  border-right-color:transparent;\n  border-top-color:transparent;\n  content:\"\";\n  display:block;\n  height:1em;\n  position:relative;\n  width:1em;\n  position:absolute !important;\n  right:0.625em;\n  top:0.625em;\n}\n\n.control.is-loading.is-small:after{\n  font-size:0.75rem;\n}\n\n.control.is-loading.is-medium:after{\n  font-size:1.25rem;\n}\n\n.control.is-loading.is-large:after{\n  font-size:1.5rem;\n}\n\n.icon{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  height:1.5rem;\n  width:1.5rem;\n}\n\n.icon .fa{\n  font-size:21px;\n}\n\n.icon.is-small{\n  height:1rem;\n  width:1rem;\n}\n\n.icon.is-small .fa{\n  font-size:14px;\n}\n\n.icon.is-medium{\n  height:2rem;\n  width:2rem;\n}\n\n.icon.is-medium .fa{\n  font-size:28px;\n}\n\n.icon.is-large{\n  height:3rem;\n  width:3rem;\n}\n\n.icon.is-large .fa{\n  font-size:42px;\n}\n\n.image{\n  display:block;\n  position:relative;\n}\n\n.image img{\n  display:block;\n  height:auto;\n  width:100%;\n}\n\n.image.is-square img, .image.is-1by1 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-16by9 img, .image.is-2by1 img{\n  bottom:0;\n  left:0;\n  position:absolute;\n  right:0;\n  top:0;\n  height:100%;\n  width:100%;\n}\n\n.image.is-square, .image.is-1by1{\n  padding-top:100%;\n}\n\n.image.is-4by3{\n  padding-top:75%;\n}\n\n.image.is-3by2{\n  padding-top:66.6666%;\n}\n\n.image.is-16by9{\n  padding-top:56.25%;\n}\n\n.image.is-2by1{\n  padding-top:50%;\n}\n\n.image.is-16x16{\n  height:16px;\n  width:16px;\n}\n\n.image.is-24x24{\n  height:24px;\n  width:24px;\n}\n\n.image.is-32x32{\n  height:32px;\n  width:32px;\n}\n\n.image.is-48x48{\n  height:48px;\n  width:48px;\n}\n\n.image.is-64x64{\n  height:64px;\n  width:64px;\n}\n\n.image.is-96x96{\n  height:96px;\n  width:96px;\n}\n\n.image.is-128x128{\n  height:128px;\n  width:128px;\n}\n\n.notification{\n  background-color:whitesmoke;\n  border-radius:3px;\n  padding:1.25rem 2.5rem 1.25rem 1.5rem;\n  position:relative;\n}\n\n.notification:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.notification a:not(.button){\n  color:currentColor;\n  text-decoration:underline;\n}\n\n.notification code,\n.notification pre{\n  background:white;\n}\n\n.notification pre code{\n  background:transparent;\n}\n\n.notification > .delete{\n  position:absolute;\n  right:0.5em;\n  top:0.5em;\n}\n\n.notification .title,\n.notification .subtitle,\n.notification .content{\n  color:inherit;\n}\n\n.notification.is-white{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.notification.is-black{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.notification.is-light{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.notification.is-dark{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.notification.is-primary{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.notification.is-info{\n  background-color:#3273dc;\n  color:#fff;\n}\n\n.notification.is-success{\n  background-color:#23d160;\n  color:#fff;\n}\n\n.notification.is-warning{\n  background-color:#ffdd57;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.notification.is-danger{\n  background-color:#ff3860;\n  color:#fff;\n}\n\n.progress{\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  border:none;\n  border-radius:290486px;\n  display:block;\n  height:1rem;\n  overflow:hidden;\n  padding:0;\n  width:100%;\n}\n\n.progress:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.progress::-webkit-progress-bar{\n  background-color:#dbdbdb;\n}\n\n.progress::-webkit-progress-value{\n  background-color:#4a4a4a;\n}\n\n.progress::-moz-progress-bar{\n  background-color:#4a4a4a;\n}\n\n.progress.is-white::-webkit-progress-value{\n  background-color:white;\n}\n\n.progress.is-white::-moz-progress-bar{\n  background-color:white;\n}\n\n.progress.is-black::-webkit-progress-value{\n  background-color:#0a0a0a;\n}\n\n.progress.is-black::-moz-progress-bar{\n  background-color:#0a0a0a;\n}\n\n.progress.is-light::-webkit-progress-value{\n  background-color:whitesmoke;\n}\n\n.progress.is-light::-moz-progress-bar{\n  background-color:whitesmoke;\n}\n\n.progress.is-dark::-webkit-progress-value{\n  background-color:#363636;\n}\n\n.progress.is-dark::-moz-progress-bar{\n  background-color:#363636;\n}\n\n.progress.is-primary::-webkit-progress-value{\n  background-color:#00d1b2;\n}\n\n.progress.is-primary::-moz-progress-bar{\n  background-color:#00d1b2;\n}\n\n.progress.is-info::-webkit-progress-value{\n  background-color:#3273dc;\n}\n\n.progress.is-info::-moz-progress-bar{\n  background-color:#3273dc;\n}\n\n.progress.is-success::-webkit-progress-value{\n  background-color:#23d160;\n}\n\n.progress.is-success::-moz-progress-bar{\n  background-color:#23d160;\n}\n\n.progress.is-warning::-webkit-progress-value{\n  background-color:#ffdd57;\n}\n\n.progress.is-warning::-moz-progress-bar{\n  background-color:#ffdd57;\n}\n\n.progress.is-danger::-webkit-progress-value{\n  background-color:#ff3860;\n}\n\n.progress.is-danger::-moz-progress-bar{\n  background-color:#ff3860;\n}\n\n.progress.is-small{\n  height:0.75rem;\n}\n\n.progress.is-medium{\n  height:1.25rem;\n}\n\n.progress.is-large{\n  height:1.5rem;\n}\n\n.table{\n  background-color:white;\n  color:#363636;\n  margin-bottom:1.5rem;\n  width:100%;\n}\n\n.table td,\n.table th{\n  border:1px solid #dbdbdb;\n  border-width:0 0 1px;\n  padding:0.5em 0.75em;\n  vertical-align:top;\n}\n\n.table td.is-narrow,\n.table th.is-narrow{\n  white-space:nowrap;\n  width:1%;\n}\n\n.table th{\n  color:#363636;\n  text-align:left;\n}\n\n.table tr:hover{\n  background-color:#fafafa;\n}\n\n.table tr.is-selected{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.table tr.is-selected a,\n.table tr.is-selected strong{\n  color:currentColor;\n}\n\n.table tr.is-selected td,\n.table tr.is-selected th{\n  border-color:#fff;\n  color:currentColor;\n}\n\n.table thead td,\n.table thead th{\n  border-width:0 0 2px;\n  color:#7a7a7a;\n}\n\n.table tfoot td,\n.table tfoot th{\n  border-width:2px 0 0;\n  color:#7a7a7a;\n}\n\n.table tbody tr:last-child td,\n.table tbody tr:last-child th{\n  border-bottom-width:0;\n}\n\n.table.is-bordered td,\n.table.is-bordered th{\n  border-width:1px;\n}\n\n.table.is-bordered tr:last-child td,\n.table.is-bordered tr:last-child th{\n  border-bottom-width:1px;\n}\n\n.table.is-narrow td,\n.table.is-narrow th{\n  padding:0.25em 0.5em;\n}\n\n.table.is-striped tbody tr:not(.is-selected):nth-child(even){\n  background-color:#fafafa;\n}\n\n.table.is-striped tbody tr:not(.is-selected):nth-child(even):hover{\n  background-color:whitesmoke;\n}\n\n.tag{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  background-color:whitesmoke;\n  border-radius:290486px;\n  color:#4a4a4a;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:0.75rem;\n  height:2em;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  line-height:1.5;\n  padding-left:0.875em;\n  padding-right:0.875em;\n  white-space:nowrap;\n}\n\n.tag .delete{\n  margin-left:0.25em;\n  margin-right:-0.375em;\n}\n\n.tag.is-white{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.tag.is-black{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.tag.is-light{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.tag.is-dark{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.tag.is-primary{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.tag.is-info{\n  background-color:#3273dc;\n  color:#fff;\n}\n\n.tag.is-success{\n  background-color:#23d160;\n  color:#fff;\n}\n\n.tag.is-warning{\n  background-color:#ffdd57;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.tag.is-danger{\n  background-color:#ff3860;\n  color:#fff;\n}\n\n.tag.is-medium{\n  font-size:1rem;\n}\n\n.tag.is-large{\n  font-size:1.25rem;\n}\n\n.title,\n.subtitle{\n  word-break:break-word;\n}\n\n.title:not(:last-child),\n.subtitle:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.title em,\n.title span,\n.subtitle em,\n.subtitle span{\n  font-weight:300;\n}\n\n.title strong,\n.subtitle strong{\n  font-weight:500;\n}\n\n.title .tag,\n.subtitle .tag{\n  vertical-align:middle;\n}\n\n.title{\n  color:#363636;\n  font-size:2rem;\n  font-weight:300;\n  line-height:1.125;\n}\n\n.title strong{\n  color:inherit;\n}\n\n.title + .highlight{\n  margin-top:-0.75rem;\n}\n\n.title:not(.is-spaced) + .subtitle{\n  margin-top:-1.5rem;\n}\n\n.title.is-1{\n  font-size:3rem;\n}\n\n.title.is-2{\n  font-size:2.5rem;\n}\n\n.title.is-3{\n  font-size:2rem;\n}\n\n.title.is-4{\n  font-size:1.5rem;\n}\n\n.title.is-5{\n  font-size:1.25rem;\n}\n\n.title.is-6{\n  font-size:1rem;\n}\n\n.subtitle{\n  color:#4a4a4a;\n  font-size:1.25rem;\n  font-weight:300;\n  line-height:1.25;\n}\n\n.subtitle strong{\n  color:#363636;\n}\n\n.subtitle:not(.is-spaced) + .title{\n  margin-top:-1.5rem;\n}\n\n.subtitle.is-1{\n  font-size:3rem;\n}\n\n.subtitle.is-2{\n  font-size:2.5rem;\n}\n\n.subtitle.is-3{\n  font-size:2rem;\n}\n\n.subtitle.is-4{\n  font-size:1.5rem;\n}\n\n.subtitle.is-5{\n  font-size:1.25rem;\n}\n\n.subtitle.is-6{\n  font-size:1rem;\n}\n\n.block:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.container{\n  position:relative;\n}\n\n.delete{\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  background-color:rgba(10, 10, 10, 0.2);\n  border:none;\n  border-radius:290486px;\n  cursor:pointer;\n  display:inline-block;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  font-size:1rem;\n  height:20px;\n  max-height:20px;\n  max-width:20px;\n  min-height:20px;\n  min-width:20px;\n  outline:none;\n  position:relative;\n  vertical-align:top;\n  width:20px;\n}\n\n.delete:before, .delete:after{\n  background-color:white;\n  content:\"\";\n  display:block;\n  left:50%;\n  position:absolute;\n  top:50%;\n  -webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);\n          -ms-transform:translateX(-50%) translateY(-50%) rotate(45deg);\n      transform:translateX(-50%) translateY(-50%) rotate(45deg);\n  -webkit-transform-origin:center center;\n          -ms-transform-origin:center center;\n      transform-origin:center center;\n}\n\n.delete:before{\n  height:2px;\n  width:50%;\n}\n\n.delete:after{\n  height:50%;\n  width:2px;\n}\n\n.delete:hover, .delete:focus{\n  background-color:rgba(10, 10, 10, 0.3);\n}\n\n.delete:active{\n  background-color:rgba(10, 10, 10, 0.4);\n}\n\n.delete.is-small{\n  height:16px;\n  max-height:16px;\n  max-width:16px;\n  min-height:16px;\n  min-width:16px;\n  width:16px;\n}\n\n.delete.is-medium{\n  height:24px;\n  max-height:24px;\n  max-width:24px;\n  min-height:24px;\n  min-width:24px;\n  width:24px;\n}\n\n.delete.is-large{\n  height:32px;\n  max-height:32px;\n  max-width:32px;\n  min-height:32px;\n  min-width:32px;\n  width:32px;\n}\n\n.fa{\n  font-size:21px;\n  text-align:center;\n  vertical-align:top;\n}\n\n.heading{\n  display:block;\n  font-size:11px;\n  letter-spacing:1px;\n  margin-bottom:5px;\n  text-transform:uppercase;\n}\n\n.highlight{\n  font-weight:400;\n  max-width:100%;\n  overflow:hidden;\n  padding:0;\n}\n\n.highlight:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.highlight pre{\n  overflow:auto;\n  max-width:100%;\n}\n\n.loader{\n  -webkit-animation:spinAround 500ms infinite linear;\n          animation:spinAround 500ms infinite linear;\n  border:2px solid #dbdbdb;\n  border-radius:290486px;\n  border-right-color:transparent;\n  border-top-color:transparent;\n  content:\"\";\n  display:block;\n  height:1em;\n  position:relative;\n  width:1em;\n}\n\n.number{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  background-color:whitesmoke;\n  border-radius:290486px;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:1.25rem;\n  height:2em;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  margin-right:1.5rem;\n  min-width:2.5em;\n  padding:0.25rem 0.5rem;\n  text-align:center;\n  vertical-align:top;\n}\n\n.breadcrumb{\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  font-size:1rem;\n  overflow:hidden;\n  overflow-x:auto;\n  white-space:nowrap;\n}\n\n.breadcrumb:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.breadcrumb a{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  color:#7a7a7a;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  padding:0.5em 0.75em;\n}\n\n.breadcrumb a:hover{\n  color:#363636;\n}\n\n.breadcrumb li{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.breadcrumb li.is-active a{\n  color:#363636;\n  cursor:default;\n  pointer-events:none;\n}\n\n.breadcrumb li + li:before{\n  color:#4a4a4a;\n  content:'/';\n}\n\n.breadcrumb ul, .breadcrumb ol{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n}\n\n.breadcrumb .icon:first-child{\n  margin-right:0.5em;\n}\n\n.breadcrumb .icon:last-child{\n  margin-left:0.5em;\n}\n\n.breadcrumb.is-centered ol, .breadcrumb.is-centered ul{\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.breadcrumb.is-right ol, .breadcrumb.is-right ul{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.breadcrumb.is-small{\n  font-size:0.75rem;\n}\n\n.breadcrumb.is-medium{\n  font-size:1.25rem;\n}\n\n.breadcrumb.is-large{\n  font-size:1.5rem;\n}\n\n.breadcrumb.has-arrow-separator li + li:before{\n  content:'\\2192';\n}\n\n.breadcrumb.has-bullet-separator li + li:before{\n  content:'\\2022';\n}\n\n.breadcrumb.has-dot-separator li + li:before{\n  content:'\\B7';\n}\n\n.breadcrumb.has-succeeds-separator li + li:before{\n  content:'\\227B';\n}\n\n.card-header{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  -webkit-box-shadow:0 1px 2px rgba(10, 10, 10, 0.1);\n          box-shadow:0 1px 2px rgba(10, 10, 10, 0.1);\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.card-header-title{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  color:#363636;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  font-weight:700;\n  padding:0.75rem;\n}\n\n.card-header-icon{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  cursor:pointer;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  padding:0.75rem;\n}\n\n.card-image{\n  display:block;\n  position:relative;\n}\n\n.card-content{\n  padding:1.5rem;\n}\n\n.card-footer{\n  border-top:1px solid #dbdbdb;\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.card-footer-item{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-preferred-size:0;\n      flex-basis:0;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  padding:0.75rem;\n}\n\n.card-footer-item:not(:last-child){\n  border-right:1px solid #dbdbdb;\n}\n\n.card{\n  background-color:white;\n  -webkit-box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n          box-shadow:0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color:#4a4a4a;\n  max-width:100%;\n  position:relative;\n}\n\n.card .media:not(:last-child){\n  margin-bottom:0.75rem;\n}\n\n.level-item{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-preferred-size:auto;\n      flex-basis:auto;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.level-item .title,\n.level-item .subtitle{\n  margin-bottom:0;\n}\n\n.level-left,\n.level-right{\n  -ms-flex-preferred-size:auto;\n      flex-basis:auto;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.level-left .level-item:not(:last-child),\n.level-right .level-item:not(:last-child){\n  margin-right:0.75rem;\n}\n\n.level-left .level-item.is-flexible,\n.level-right .level-item.is-flexible{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n}\n\n.level-left{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n}\n\n.level-right{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.level{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  -webkit-box-pack:justify;\n      -ms-flex-pack:justify;\n          justify-content:space-between;\n}\n\n.level:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.level code{\n  border-radius:3px;\n}\n\n.level img{\n  display:inline-block;\n  vertical-align:top;\n}\n\n.level.is-mobile{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.level.is-mobile .level-left,\n.level.is-mobile .level-right{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.level.is-mobile .level-left + .level-right{\n  margin-top:0;\n}\n\n.level.is-mobile .level-item:not(:last-child){\n  margin-bottom:0;\n}\n\n.level.is-mobile .level-item:not(.is-narrow){\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n}\n\n.media-left,\n.media-right{\n  -ms-flex-preferred-size:auto;\n      flex-basis:auto;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.media-left{\n  margin-right:1rem;\n}\n\n.media-right{\n  margin-left:1rem;\n}\n\n.media-content{\n  -ms-flex-preferred-size:auto;\n      flex-basis:auto;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n  text-align:left;\n}\n\n.media{\n  -webkit-box-align:start;\n      -ms-flex-align:start;\n          align-items:flex-start;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  text-align:left;\n}\n\n.media .content:not(:last-child){\n  margin-bottom:0.75rem;\n}\n\n.media .media{\n  border-top:1px solid rgba(219, 219, 219, 0.5);\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  padding-top:0.75rem;\n}\n\n.media .media .content:not(:last-child),\n.media .media .control:not(:last-child){\n  margin-bottom:0.5rem;\n}\n\n.media .media .media{\n  padding-top:0.5rem;\n}\n\n.media .media .media + .media{\n  margin-top:0.5rem;\n}\n\n.media + .media{\n  border-top:1px solid rgba(219, 219, 219, 0.5);\n  margin-top:1rem;\n  padding-top:1rem;\n}\n\n.media.is-large + .media{\n  margin-top:1.5rem;\n  padding-top:1.5rem;\n}\n\n.menu{\n  font-size:1rem;\n}\n\n.menu-list{\n  line-height:1.25;\n}\n\n.menu-list a{\n  border-radius:2px;\n  color:#4a4a4a;\n  display:block;\n  padding:0.5em 0.75em;\n}\n\n.menu-list a:hover{\n  background-color:whitesmoke;\n  color:#00d1b2;\n}\n\n.menu-list a.is-active{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.menu-list li ul{\n  border-left:1px solid #dbdbdb;\n  margin:0.75em;\n  padding-left:0.75em;\n}\n\n.menu-label{\n  color:#7a7a7a;\n  font-size:0.8em;\n  letter-spacing:0.1em;\n  text-transform:uppercase;\n}\n\n.menu-label:not(:first-child){\n  margin-top:1em;\n}\n\n.menu-label:not(:last-child){\n  margin-bottom:1em;\n}\n\n.message{\n  background-color:whitesmoke;\n  border-radius:3px;\n  font-size:1rem;\n}\n\n.message:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.message.is-white{\n  background-color:white;\n}\n\n.message.is-white .message-header{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.message.is-white .message-body{\n  border-color:white;\n  color:#4d4d4d;\n}\n\n.message.is-black{\n  background-color:#fafafa;\n}\n\n.message.is-black .message-header{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.message.is-black .message-body{\n  border-color:#0a0a0a;\n  color:#090909;\n}\n\n.message.is-light{\n  background-color:#fafafa;\n}\n\n.message.is-light .message-header{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.message.is-light .message-body{\n  border-color:whitesmoke;\n  color:#505050;\n}\n\n.message.is-dark{\n  background-color:#fafafa;\n}\n\n.message.is-dark .message-header{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.message.is-dark .message-body{\n  border-color:#363636;\n  color:#2a2a2a;\n}\n\n.message.is-primary{\n  background-color:#f5fffd;\n}\n\n.message.is-primary .message-header{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.message.is-primary .message-body{\n  border-color:#00d1b2;\n  color:#021310;\n}\n\n.message.is-info{\n  background-color:#f6f9fe;\n}\n\n.message.is-info .message-header{\n  background-color:#3273dc;\n  color:#fff;\n}\n\n.message.is-info .message-body{\n  border-color:#3273dc;\n  color:#22509a;\n}\n\n.message.is-success{\n  background-color:#f6fef9;\n}\n\n.message.is-success .message-header{\n  background-color:#23d160;\n  color:#fff;\n}\n\n.message.is-success .message-body{\n  border-color:#23d160;\n  color:#0e301a;\n}\n\n.message.is-warning{\n  background-color:#fffdf5;\n}\n\n.message.is-warning .message-header{\n  background-color:#ffdd57;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.message.is-warning .message-body{\n  border-color:#ffdd57;\n  color:#3b3108;\n}\n\n.message.is-danger{\n  background-color:#fff5f7;\n}\n\n.message.is-danger .message-header{\n  background-color:#ff3860;\n  color:#fff;\n}\n\n.message.is-danger .message-body{\n  border-color:#ff3860;\n  color:#cd0930;\n}\n\n.message-header{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  background-color:#4a4a4a;\n  border-radius:3px 3px 0 0;\n  color:#fff;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:justify;\n      -ms-flex-pack:justify;\n          justify-content:space-between;\n  line-height:1.25;\n  padding:0.5em 0.75em;\n  position:relative;\n}\n\n.message-header a,\n.message-header strong{\n  color:inherit;\n}\n\n.message-header a{\n  text-decoration:underline;\n}\n\n.message-header .delete{\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  margin-left:0.75em;\n}\n\n.message-header + .message-body{\n  border-top-left-radius:0;\n  border-top-right-radius:0;\n  border-top:none;\n}\n\n.message-body{\n  border:1px solid #dbdbdb;\n  border-radius:3px;\n  color:#4a4a4a;\n  padding:1em 1.25em;\n}\n\n.message-body a,\n.message-body strong{\n  color:inherit;\n}\n\n.message-body a{\n  text-decoration:underline;\n}\n\n.message-body code,\n.message-body pre{\n  background:white;\n}\n\n.message-body pre code{\n  background:transparent;\n}\n\n.modal-background{\n  bottom:0;\n  left:0;\n  position:absolute;\n  right:0;\n  top:0;\n  background-color:rgba(10, 10, 10, 0.86);\n}\n\n.modal-content,\n.modal-card{\n  margin:0 20px;\n  max-height:calc(100vh - 160px);\n  overflow:auto;\n  position:relative;\n  width:100%;\n}\n\n.modal-close{\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  background-color:rgba(10, 10, 10, 0.2);\n  border:none;\n  border-radius:290486px;\n  cursor:pointer;\n  display:inline-block;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  font-size:1rem;\n  height:20px;\n  max-height:20px;\n  max-width:20px;\n  min-height:20px;\n  min-width:20px;\n  outline:none;\n  position:relative;\n  vertical-align:top;\n  width:20px;\n  background:none;\n  height:40px;\n  position:fixed;\n  right:20px;\n  top:20px;\n  width:40px;\n}\n\n.modal-close:before, .modal-close:after{\n  background-color:white;\n  content:\"\";\n  display:block;\n  left:50%;\n  position:absolute;\n  top:50%;\n  -webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);\n          -ms-transform:translateX(-50%) translateY(-50%) rotate(45deg);\n      transform:translateX(-50%) translateY(-50%) rotate(45deg);\n  -webkit-transform-origin:center center;\n          -ms-transform-origin:center center;\n      transform-origin:center center;\n}\n\n.modal-close:before{\n  height:2px;\n  width:50%;\n}\n\n.modal-close:after{\n  height:50%;\n  width:2px;\n}\n\n.modal-close:hover, .modal-close:focus{\n  background-color:rgba(10, 10, 10, 0.3);\n}\n\n.modal-close:active{\n  background-color:rgba(10, 10, 10, 0.4);\n}\n\n.modal-close.is-small{\n  height:16px;\n  max-height:16px;\n  max-width:16px;\n  min-height:16px;\n  min-width:16px;\n  width:16px;\n}\n\n.modal-close.is-medium{\n  height:24px;\n  max-height:24px;\n  max-width:24px;\n  min-height:24px;\n  min-width:24px;\n  width:24px;\n}\n\n.modal-close.is-large{\n  height:32px;\n  max-height:32px;\n  max-width:32px;\n  min-height:32px;\n  min-width:32px;\n  width:32px;\n}\n\n.modal-card{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:column;\n          flex-direction:column;\n  max-height:calc(100vh - 40px);\n  overflow:hidden;\n}\n\n.modal-card-head,\n.modal-card-foot{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  background-color:whitesmoke;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  padding:20px;\n  position:relative;\n}\n\n.modal-card-head{\n  border-bottom:1px solid #dbdbdb;\n  border-top-left-radius:5px;\n  border-top-right-radius:5px;\n}\n\n.modal-card-title{\n  color:#363636;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  font-size:1.5rem;\n  line-height:1;\n}\n\n.modal-card-foot{\n  border-bottom-left-radius:5px;\n  border-bottom-right-radius:5px;\n  border-top:1px solid #dbdbdb;\n}\n\n.modal-card-foot .button:not(:last-child){\n  margin-right:10px;\n}\n\n.modal-card-body{\n  -webkit-overflow-scrolling:touch;\n  background-color:white;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n  overflow:auto;\n  padding:20px;\n}\n\n.modal{\n  bottom:0;\n  left:0;\n  position:absolute;\n  right:0;\n  top:0;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:none;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  overflow:hidden;\n  position:fixed;\n  z-index:20;\n}\n\n.modal.is-active{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.nav-toggle{\n  cursor:pointer;\n  display:block;\n  height:3.25rem;\n  position:relative;\n  width:3.25rem;\n}\n\n.nav-toggle span{\n  background-color:#4a4a4a;\n  display:block;\n  height:1px;\n  left:50%;\n  margin-left:-7px;\n  position:absolute;\n  top:50%;\n  -webkit-transition:none 86ms ease-out;\n  -o-transition:none 86ms ease-out;\n  transition:none 86ms ease-out;\n  -webkit-transition-property:background, left, opacity, -webkit-transform;\n  transition-property:background, left, opacity, -webkit-transform;\n  -o-transition-property:background, left, opacity, transform;\n  transition-property:background, left, opacity, transform;\n  transition-property:background, left, opacity, transform, -webkit-transform;\n  width:15px;\n}\n\n.nav-toggle span:nth-child(1){\n  margin-top:-6px;\n}\n\n.nav-toggle span:nth-child(2){\n  margin-top:-1px;\n}\n\n.nav-toggle span:nth-child(3){\n  margin-top:4px;\n}\n\n.nav-toggle:hover{\n  background-color:whitesmoke;\n}\n\n.nav-toggle.is-active span{\n  background-color:#00d1b2;\n}\n\n.nav-toggle.is-active span:nth-child(1){\n  margin-left:-5px;\n  -webkit-transform:rotate(45deg);\n          -ms-transform:rotate(45deg);\n      transform:rotate(45deg);\n  -webkit-transform-origin:left top;\n          -ms-transform-origin:left top;\n      transform-origin:left top;\n}\n\n.nav-toggle.is-active span:nth-child(2){\n  opacity:0;\n}\n\n.nav-toggle.is-active span:nth-child(3){\n  margin-left:-5px;\n  -webkit-transform:rotate(-45deg);\n          -ms-transform:rotate(-45deg);\n      transform:rotate(-45deg);\n  -webkit-transform-origin:left bottom;\n          -ms-transform-origin:left bottom;\n      transform-origin:left bottom;\n}\n\n.nav-item{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  font-size:1rem;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  line-height:1.5;\n  padding:0.5rem 0.75rem;\n}\n\n.nav-item a{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.nav-item img{\n  max-height:1.75rem;\n}\n\n.nav-item .tag:first-child:not(:last-child){\n  margin-right:0.5rem;\n}\n\n.nav-item .tag:last-child:not(:first-child){\n  margin-left:0.5rem;\n}\n\n.nav-item a:not(.button),\na.nav-item:not(.button){\n  color:#7a7a7a;\n}\n\n.nav-item a:not(.button):hover,\na.nav-item:not(.button):hover{\n  color:#363636;\n}\n\n.nav-item a:not(.button).is-active,\na.nav-item:not(.button).is-active{\n  color:#363636;\n}\n\n.nav-item a:not(.button).is-tab,\na.nav-item:not(.button).is-tab{\n  border-bottom:1px solid transparent;\n  border-top:1px solid transparent;\n  padding-bottom:calc(0.75rem - 1px);\n  padding-left:1rem;\n  padding-right:1rem;\n  padding-top:calc(0.75rem - 1px);\n}\n\n.nav-item a:not(.button).is-tab:hover,\na.nav-item:not(.button).is-tab:hover{\n  border-bottom-color:#00d1b2;\n  border-top-color:transparent;\n}\n\n.nav-item a:not(.button).is-tab.is-active,\na.nav-item:not(.button).is-tab.is-active{\n  border-bottom:3px solid #00d1b2;\n  color:#00d1b2;\n  padding-bottom:calc(0.75rem - 3px);\n}\n\n.nav-left,\n.nav-right{\n  -webkit-overflow-scrolling:touch;\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  max-width:100%;\n  overflow:auto;\n}\n\n.nav-left{\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  white-space:nowrap;\n}\n\n.nav-right{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.nav-center{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  margin-left:auto;\n  margin-right:auto;\n}\n\n.nav{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  background-color:white;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  height:3.25rem;\n  position:relative;\n  text-align:center;\n  z-index:10;\n}\n\n.nav > .container{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  min-height:3.25rem;\n  width:100%;\n}\n\n.nav.has-shadow{\n  -webkit-box-shadow:0 2px 3px rgba(10, 10, 10, 0.1);\n          box-shadow:0 2px 3px rgba(10, 10, 10, 0.1);\n}\n\n.navbar{\n  background-color:white;\n  min-height:3.25rem;\n  position:relative;\n}\n\n.navbar-brand{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  height:3.25rem;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.navbar-burger{\n  cursor:pointer;\n  display:block;\n  height:3.25rem;\n  position:relative;\n  width:3.25rem;\n  margin-left:auto;\n}\n\n.navbar-burger span{\n  background-color:#4a4a4a;\n  display:block;\n  height:1px;\n  left:50%;\n  margin-left:-7px;\n  position:absolute;\n  top:50%;\n  -webkit-transition:none 86ms ease-out;\n  -o-transition:none 86ms ease-out;\n  transition:none 86ms ease-out;\n  -webkit-transition-property:background, left, opacity, -webkit-transform;\n  transition-property:background, left, opacity, -webkit-transform;\n  -o-transition-property:background, left, opacity, transform;\n  transition-property:background, left, opacity, transform;\n  transition-property:background, left, opacity, transform, -webkit-transform;\n  width:15px;\n}\n\n.navbar-burger span:nth-child(1){\n  margin-top:-6px;\n}\n\n.navbar-burger span:nth-child(2){\n  margin-top:-1px;\n}\n\n.navbar-burger span:nth-child(3){\n  margin-top:4px;\n}\n\n.navbar-burger:hover{\n  background-color:whitesmoke;\n}\n\n.navbar-burger.is-active span{\n  background-color:#00d1b2;\n}\n\n.navbar-burger.is-active span:nth-child(1){\n  margin-left:-5px;\n  -webkit-transform:rotate(45deg);\n          -ms-transform:rotate(45deg);\n      transform:rotate(45deg);\n  -webkit-transform-origin:left top;\n          -ms-transform-origin:left top;\n      transform-origin:left top;\n}\n\n.navbar-burger.is-active span:nth-child(2){\n  opacity:0;\n}\n\n.navbar-burger.is-active span:nth-child(3){\n  margin-left:-5px;\n  -webkit-transform:rotate(-45deg);\n          -ms-transform:rotate(-45deg);\n      transform:rotate(-45deg);\n  -webkit-transform-origin:left bottom;\n          -ms-transform-origin:left bottom;\n      transform-origin:left bottom;\n}\n\n.navbar-menu{\n  display:none;\n}\n\n.navbar-item,\n.navbar-link{\n  color:#4a4a4a;\n  display:block;\n  line-height:1.5;\n  padding:0.5rem 1rem;\n  position:relative;\n}\n\na.navbar-item:hover, a.navbar-item.is-active,\n.navbar-link:hover,\n.navbar-link.is-active{\n  background-color:whitesmoke;\n  color:#0a0a0a;\n}\n\n.navbar-item{\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.navbar-item img{\n  max-height:1.75rem;\n}\n\n.navbar-item.has-dropdown{\n  padding:0;\n}\n\n.navbar-content{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n}\n\n.navbar-link{\n  padding-right:2.5em;\n}\n\n.navbar-dropdown{\n  font-size:0.875rem;\n  padding-bottom:0.5rem;\n  padding-top:0.5rem;\n}\n\n.navbar-dropdown .navbar-item{\n  padding-left:1.5rem;\n  padding-right:1.5rem;\n}\n\n.navbar-divider{\n  background-color:#dbdbdb;\n  border:none;\n  display:none;\n  height:1px;\n  margin:0.5rem 0;\n}\n\n.pagination{\n  font-size:1rem;\n  margin:-0.25rem;\n}\n\n.pagination.is-small{\n  font-size:0.75rem;\n}\n\n.pagination.is-medium{\n  font-size:1.25rem;\n}\n\n.pagination.is-large{\n  font-size:1.5rem;\n}\n\n.pagination,\n.pagination-list{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  text-align:center;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis{\n  -moz-appearance:none;\n  -webkit-appearance:none;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border:1px solid transparent;\n  border-radius:3px;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  display:-webkit-inline-box;\n  display:-ms-inline-flexbox;\n  display:inline-flex;\n  font-size:1rem;\n  height:2.25em;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  line-height:1.5;\n  padding-bottom:calc(0.375em - 1px);\n  padding-left:calc(0.625em - 1px);\n  padding-right:calc(0.625em - 1px);\n  padding-top:calc(0.375em - 1px);\n  position:relative;\n  vertical-align:top;\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  font-size:1em;\n  padding-left:0.5em;\n  padding-right:0.5em;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  margin:0.25rem;\n  text-align:center;\n}\n\n.pagination-previous:focus, .pagination-previous.is-focused, .pagination-previous:active, .pagination-previous.is-active,\n.pagination-next:focus,\n.pagination-next.is-focused,\n.pagination-next:active,\n.pagination-next.is-active,\n.pagination-link:focus,\n.pagination-link.is-focused,\n.pagination-link:active,\n.pagination-link.is-active,\n.pagination-ellipsis:focus,\n.pagination-ellipsis.is-focused,\n.pagination-ellipsis:active,\n.pagination-ellipsis.is-active{\n  outline:none;\n}\n\n.pagination-previous[disabled],\n.pagination-next[disabled],\n.pagination-link[disabled],\n.pagination-ellipsis[disabled]{\n  cursor:not-allowed;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link{\n  border-color:#dbdbdb;\n  min-width:2.25em;\n}\n\n.pagination-previous:hover,\n.pagination-next:hover,\n.pagination-link:hover{\n  border-color:#b5b5b5;\n  color:#363636;\n}\n\n.pagination-previous:focus,\n.pagination-next:focus,\n.pagination-link:focus{\n  border-color:#00d1b2;\n}\n\n.pagination-previous:active,\n.pagination-next:active,\n.pagination-link:active{\n  -webkit-box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2);\n}\n\n.pagination-previous[disabled],\n.pagination-next[disabled],\n.pagination-link[disabled]{\n  background-color:#dbdbdb;\n  border-color:#dbdbdb;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  color:#7a7a7a;\n  opacity:0.5;\n}\n\n.pagination-previous,\n.pagination-next{\n  padding-left:0.75em;\n  padding-right:0.75em;\n  white-space:nowrap;\n}\n\n.pagination-link.is-current{\n  background-color:#00d1b2;\n  border-color:#00d1b2;\n  color:#fff;\n}\n\n.pagination-ellipsis{\n  color:#b5b5b5;\n  pointer-events:none;\n}\n\n.pagination-list{\n  -ms-flex-wrap:wrap;\n      flex-wrap:wrap;\n}\n\n.panel{\n  font-size:1rem;\n}\n\n.panel:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.panel-heading,\n.panel-tabs,\n.panel-block{\n  border-bottom:1px solid #dbdbdb;\n  border-left:1px solid #dbdbdb;\n  border-right:1px solid #dbdbdb;\n}\n\n.panel-heading:first-child,\n.panel-tabs:first-child,\n.panel-block:first-child{\n  border-top:1px solid #dbdbdb;\n}\n\n.panel-heading{\n  background-color:whitesmoke;\n  border-radius:3px 3px 0 0;\n  color:#363636;\n  font-size:1.25em;\n  font-weight:300;\n  line-height:1.25;\n  padding:0.5em 0.75em;\n}\n\n.panel-tabs{\n  -webkit-box-align:end;\n      -ms-flex-align:end;\n          align-items:flex-end;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  font-size:0.875em;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.panel-tabs a{\n  border-bottom:1px solid #dbdbdb;\n  margin-bottom:-1px;\n  padding:0.5em;\n}\n\n.panel-tabs a.is-active{\n  border-bottom-color:#4a4a4a;\n  color:#363636;\n}\n\n.panel-list a{\n  color:#4a4a4a;\n}\n\n.panel-list a:hover{\n  color:#00d1b2;\n}\n\n.panel-block{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  color:#363636;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  padding:0.5em 0.75em;\n}\n\n.panel-block input[type=\"checkbox\"]{\n  margin-right:0.75em;\n}\n\n.panel-block > .control{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n  width:100%;\n}\n\n.panel-block.is-wrapped{\n  -ms-flex-wrap:wrap;\n      flex-wrap:wrap;\n}\n\n.panel-block.is-active{\n  border-left-color:#00d1b2;\n  color:#363636;\n}\n\n.panel-block.is-active .panel-icon{\n  color:#00d1b2;\n}\n\na.panel-block,\nlabel.panel-block{\n  cursor:pointer;\n}\n\na.panel-block:hover,\nlabel.panel-block:hover{\n  background-color:whitesmoke;\n}\n\n.panel-icon{\n  display:inline-block;\n  font-size:14px;\n  height:1em;\n  line-height:1em;\n  text-align:center;\n  vertical-align:top;\n  width:1em;\n  color:#7a7a7a;\n  margin-right:0.75em;\n}\n\n.panel-icon .fa{\n  font-size:inherit;\n  line-height:inherit;\n}\n\n.tabs{\n  -webkit-overflow-scrolling:touch;\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  font-size:1rem;\n  -webkit-box-pack:justify;\n      -ms-flex-pack:justify;\n          justify-content:space-between;\n  overflow:hidden;\n  overflow-x:auto;\n  white-space:nowrap;\n}\n\n.tabs:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.tabs a{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border-bottom:1px solid #dbdbdb;\n  color:#4a4a4a;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  margin-bottom:-1px;\n  padding:0.5em 1em;\n  vertical-align:top;\n}\n\n.tabs a:hover{\n  border-bottom-color:#363636;\n  color:#363636;\n}\n\n.tabs li{\n  display:block;\n}\n\n.tabs li.is-active a{\n  border-bottom-color:#00d1b2;\n  color:#00d1b2;\n}\n\n.tabs ul{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  border-bottom:1px solid #dbdbdb;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n}\n\n.tabs ul.is-left{\n  padding-right:0.75em;\n}\n\n.tabs ul.is-center{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  padding-left:0.75em;\n  padding-right:0.75em;\n}\n\n.tabs ul.is-right{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n  padding-left:0.75em;\n}\n\n.tabs .icon:first-child{\n  margin-right:0.5em;\n}\n\n.tabs .icon:last-child{\n  margin-left:0.5em;\n}\n\n.tabs.is-centered ul{\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.tabs.is-right ul{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end;\n}\n\n.tabs.is-boxed a{\n  border:1px solid transparent;\n  border-radius:3px 3px 0 0;\n}\n\n.tabs.is-boxed a:hover{\n  background-color:whitesmoke;\n  border-bottom-color:#dbdbdb;\n}\n\n.tabs.is-boxed li.is-active a{\n  background-color:white;\n  border-color:#dbdbdb;\n  border-bottom-color:transparent !important;\n}\n\n.tabs.is-fullwidth li{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.tabs.is-toggle a{\n  border:1px solid #dbdbdb;\n  margin-bottom:0;\n  position:relative;\n}\n\n.tabs.is-toggle a:hover{\n  background-color:whitesmoke;\n  border-color:#b5b5b5;\n  z-index:2;\n}\n\n.tabs.is-toggle li + li{\n  margin-left:-1px;\n}\n\n.tabs.is-toggle li:first-child a{\n  border-radius:3px 0 0 3px;\n}\n\n.tabs.is-toggle li:last-child a{\n  border-radius:0 3px 3px 0;\n}\n\n.tabs.is-toggle li.is-active a{\n  background-color:#00d1b2;\n  border-color:#00d1b2;\n  color:#fff;\n  z-index:1;\n}\n\n.tabs.is-toggle ul{\n  border-bottom:none;\n}\n\n.tabs.is-small{\n  font-size:0.75rem;\n}\n\n.tabs.is-medium{\n  font-size:1.25rem;\n}\n\n.tabs.is-large{\n  font-size:1.5rem;\n}\n\n.column{\n  display:block;\n  -ms-flex-preferred-size:0;\n      flex-basis:0;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n  padding:0.75rem;\n}\n\n.columns.is-mobile > .column.is-narrow{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n}\n\n.columns.is-mobile > .column.is-full{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:100%;\n}\n\n.columns.is-mobile > .column.is-three-quarters{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:75%;\n}\n\n.columns.is-mobile > .column.is-two-thirds{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:66.6666%;\n}\n\n.columns.is-mobile > .column.is-half{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:50%;\n}\n\n.columns.is-mobile > .column.is-one-third{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:33.3333%;\n}\n\n.columns.is-mobile > .column.is-one-quarter{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:25%;\n}\n\n.columns.is-mobile > .column.is-offset-three-quarters{\n  margin-left:75%;\n}\n\n.columns.is-mobile > .column.is-offset-two-thirds{\n  margin-left:66.6666%;\n}\n\n.columns.is-mobile > .column.is-offset-half{\n  margin-left:50%;\n}\n\n.columns.is-mobile > .column.is-offset-one-third{\n  margin-left:33.3333%;\n}\n\n.columns.is-mobile > .column.is-offset-one-quarter{\n  margin-left:25%;\n}\n\n.columns.is-mobile > .column.is-1{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:8.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-1{\n  margin-left:8.33333%;\n}\n\n.columns.is-mobile > .column.is-2{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:16.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-2{\n  margin-left:16.66667%;\n}\n\n.columns.is-mobile > .column.is-3{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:25%;\n}\n\n.columns.is-mobile > .column.is-offset-3{\n  margin-left:25%;\n}\n\n.columns.is-mobile > .column.is-4{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:33.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-4{\n  margin-left:33.33333%;\n}\n\n.columns.is-mobile > .column.is-5{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:41.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-5{\n  margin-left:41.66667%;\n}\n\n.columns.is-mobile > .column.is-6{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:50%;\n}\n\n.columns.is-mobile > .column.is-offset-6{\n  margin-left:50%;\n}\n\n.columns.is-mobile > .column.is-7{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:58.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-7{\n  margin-left:58.33333%;\n}\n\n.columns.is-mobile > .column.is-8{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:66.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-8{\n  margin-left:66.66667%;\n}\n\n.columns.is-mobile > .column.is-9{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:75%;\n}\n\n.columns.is-mobile > .column.is-offset-9{\n  margin-left:75%;\n}\n\n.columns.is-mobile > .column.is-10{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:83.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-10{\n  margin-left:83.33333%;\n}\n\n.columns.is-mobile > .column.is-11{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:91.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-11{\n  margin-left:91.66667%;\n}\n\n.columns.is-mobile > .column.is-12{\n  -webkit-box-flex:0;\n      -ms-flex:none;\n          flex:none;\n  width:100%;\n}\n\n.columns.is-mobile > .column.is-offset-12{\n  margin-left:100%;\n}\n\n.columns{\n  margin-left:-0.75rem;\n  margin-right:-0.75rem;\n  margin-top:-0.75rem;\n}\n\n.columns:last-child{\n  margin-bottom:-0.75rem;\n}\n\n.columns:not(:last-child){\n  margin-bottom:0.75rem;\n}\n\n.columns.is-centered{\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n}\n\n.columns.is-gapless{\n  margin-left:0;\n  margin-right:0;\n  margin-top:0;\n}\n\n.columns.is-gapless:last-child{\n  margin-bottom:0;\n}\n\n.columns.is-gapless:not(:last-child){\n  margin-bottom:1.5rem;\n}\n\n.columns.is-gapless > .column{\n  margin:0;\n  padding:0;\n}\n\n.columns.is-mobile{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.columns.is-multiline{\n  -ms-flex-wrap:wrap;\n      flex-wrap:wrap;\n}\n\n.columns.is-vcentered{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n}\n\n.tile{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  display:block;\n  -ms-flex-preferred-size:0;\n      flex-basis:0;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n  min-height:-webkit-min-content;\n  min-height:-moz-min-content;\n  min-height:min-content;\n}\n\n.tile.is-ancestor{\n  margin-left:-0.75rem;\n  margin-right:-0.75rem;\n  margin-top:-0.75rem;\n}\n\n.tile.is-ancestor:last-child{\n  margin-bottom:-0.75rem;\n}\n\n.tile.is-ancestor:not(:last-child){\n  margin-bottom:0.75rem;\n}\n\n.tile.is-child{\n  margin:0 !important;\n}\n\n.tile.is-parent{\n  padding:0.75rem;\n}\n\n.tile.is-vertical{\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:column;\n          flex-direction:column;\n}\n\n.tile.is-vertical > .tile.is-child:not(:last-child){\n  margin-bottom:1.5rem !important;\n}\n\n.hero-video{\n  bottom:0;\n  left:0;\n  position:absolute;\n  right:0;\n  top:0;\n  overflow:hidden;\n}\n\n.hero-video video{\n  left:50%;\n  min-height:100%;\n  min-width:100%;\n  position:absolute;\n  top:50%;\n  -webkit-transform:translate3d(-50%, -50%, 0);\n          transform:translate3d(-50%, -50%, 0);\n}\n\n.hero-video.is-transparent{\n  opacity:0.3;\n}\n\n.hero-buttons{\n  margin-top:1.5rem;\n}\n\n.hero-head,\n.hero-foot{\n  -webkit-box-flex:0;\n      -ms-flex-positive:0;\n          flex-grow:0;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n}\n\n.hero-body{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  padding:3rem 1.5rem;\n}\n\n.hero{\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  background-color:white;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:column;\n          flex-direction:column;\n  -webkit-box-pack:justify;\n      -ms-flex-pack:justify;\n          justify-content:space-between;\n}\n\n.hero .nav{\n  background:none;\n  -webkit-box-shadow:0 1px 0 rgba(219, 219, 219, 0.3);\n          box-shadow:0 1px 0 rgba(219, 219, 219, 0.3);\n}\n\n.hero .tabs ul{\n  border-bottom:none;\n}\n\n.hero.is-white{\n  background-color:white;\n  color:#0a0a0a;\n}\n\n.hero.is-white a:not(.button),\n.hero.is-white strong{\n  color:inherit;\n}\n\n.hero.is-white .title{\n  color:#0a0a0a;\n}\n\n.hero.is-white .subtitle{\n  color:rgba(10, 10, 10, 0.9);\n}\n\n.hero.is-white .subtitle a:not(.button),\n.hero.is-white .subtitle strong{\n  color:#0a0a0a;\n}\n\n.hero.is-white .nav{\n  -webkit-box-shadow:0 1px 0 rgba(10, 10, 10, 0.2);\n          box-shadow:0 1px 0 rgba(10, 10, 10, 0.2);\n}\n\n.hero.is-white a.nav-item,\n.hero.is-white .nav-item a:not(.button){\n  color:rgba(10, 10, 10, 0.7);\n}\n\n.hero.is-white a.nav-item:hover, .hero.is-white a.nav-item.is-active,\n.hero.is-white .nav-item a:not(.button):hover,\n.hero.is-white .nav-item a:not(.button).is-active{\n  color:#0a0a0a;\n}\n\n.hero.is-white .tabs a{\n  color:#0a0a0a;\n  opacity:0.9;\n}\n\n.hero.is-white .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-white .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a{\n  color:#0a0a0a;\n}\n\n.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover{\n  background-color:#0a0a0a;\n  border-color:#0a0a0a;\n  color:white;\n}\n\n.hero.is-white.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n  background-image:-o-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n  background-image:linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n\n.hero.is-black{\n  background-color:#0a0a0a;\n  color:white;\n}\n\n.hero.is-black a:not(.button),\n.hero.is-black strong{\n  color:inherit;\n}\n\n.hero.is-black .title{\n  color:white;\n}\n\n.hero.is-black .subtitle{\n  color:rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-black .subtitle a:not(.button),\n.hero.is-black .subtitle strong{\n  color:white;\n}\n\n.hero.is-black .nav{\n  -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n          box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.hero.is-black a.nav-item,\n.hero.is-black .nav-item a:not(.button){\n  color:rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-black a.nav-item:hover, .hero.is-black a.nav-item.is-active,\n.hero.is-black .nav-item a:not(.button):hover,\n.hero.is-black .nav-item a:not(.button).is-active{\n  color:white;\n}\n\n.hero.is-black .tabs a{\n  color:white;\n  opacity:0.9;\n}\n\n.hero.is-black .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-black .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a{\n  color:white;\n}\n\n.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover{\n  background-color:white;\n  border-color:white;\n  color:#0a0a0a;\n}\n\n.hero.is-black.is-bold{\n  background-image:-webkit-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n  background-image:-o-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n  background-image:linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n\n.hero.is-light{\n  background-color:whitesmoke;\n  color:#363636;\n}\n\n.hero.is-light a:not(.button),\n.hero.is-light strong{\n  color:inherit;\n}\n\n.hero.is-light .title{\n  color:#363636;\n}\n\n.hero.is-light .subtitle{\n  color:rgba(54, 54, 54, 0.9);\n}\n\n.hero.is-light .subtitle a:not(.button),\n.hero.is-light .subtitle strong{\n  color:#363636;\n}\n\n.hero.is-light .nav{\n  -webkit-box-shadow:0 1px 0 rgba(54, 54, 54, 0.2);\n          box-shadow:0 1px 0 rgba(54, 54, 54, 0.2);\n}\n\n.hero.is-light a.nav-item,\n.hero.is-light .nav-item a:not(.button){\n  color:rgba(54, 54, 54, 0.7);\n}\n\n.hero.is-light a.nav-item:hover, .hero.is-light a.nav-item.is-active,\n.hero.is-light .nav-item a:not(.button):hover,\n.hero.is-light .nav-item a:not(.button).is-active{\n  color:#363636;\n}\n\n.hero.is-light .tabs a{\n  color:#363636;\n  opacity:0.9;\n}\n\n.hero.is-light .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-light .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a{\n  color:#363636;\n}\n\n.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover{\n  background-color:#363636;\n  border-color:#363636;\n  color:whitesmoke;\n}\n\n.hero.is-light.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n  background-image:-o-linear-gradient(309deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n  background-image:linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n}\n\n.hero.is-dark{\n  background-color:#363636;\n  color:whitesmoke;\n}\n\n.hero.is-dark a:not(.button),\n.hero.is-dark strong{\n  color:inherit;\n}\n\n.hero.is-dark .title{\n  color:whitesmoke;\n}\n\n.hero.is-dark .subtitle{\n  color:rgba(245, 245, 245, 0.9);\n}\n\n.hero.is-dark .subtitle a:not(.button),\n.hero.is-dark .subtitle strong{\n  color:whitesmoke;\n}\n\n.hero.is-dark .nav{\n  -webkit-box-shadow:0 1px 0 rgba(245, 245, 245, 0.2);\n          box-shadow:0 1px 0 rgba(245, 245, 245, 0.2);\n}\n\n.hero.is-dark a.nav-item,\n.hero.is-dark .nav-item a:not(.button){\n  color:rgba(245, 245, 245, 0.7);\n}\n\n.hero.is-dark a.nav-item:hover, .hero.is-dark a.nav-item.is-active,\n.hero.is-dark .nav-item a:not(.button):hover,\n.hero.is-dark .nav-item a:not(.button).is-active{\n  color:whitesmoke;\n}\n\n.hero.is-dark .tabs a{\n  color:whitesmoke;\n  opacity:0.9;\n}\n\n.hero.is-dark .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-dark .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a{\n  color:whitesmoke;\n}\n\n.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover{\n  background-color:whitesmoke;\n  border-color:whitesmoke;\n  color:#363636;\n}\n\n.hero.is-dark.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #1f191a 0%, #363636 71%, #46403f 100%);\n  background-image:-o-linear-gradient(309deg, #1f191a 0%, #363636 71%, #46403f 100%);\n  background-image:linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n}\n\n.hero.is-primary{\n  background-color:#00d1b2;\n  color:#fff;\n}\n\n.hero.is-primary a:not(.button),\n.hero.is-primary strong{\n  color:inherit;\n}\n\n.hero.is-primary .title{\n  color:#fff;\n}\n\n.hero.is-primary .subtitle{\n  color:rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-primary .subtitle a:not(.button),\n.hero.is-primary .subtitle strong{\n  color:#fff;\n}\n\n.hero.is-primary .nav{\n  -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n          box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.hero.is-primary a.nav-item,\n.hero.is-primary .nav-item a:not(.button){\n  color:rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-primary a.nav-item:hover, .hero.is-primary a.nav-item.is-active,\n.hero.is-primary .nav-item a:not(.button):hover,\n.hero.is-primary .nav-item a:not(.button).is-active{\n  color:#fff;\n}\n\n.hero.is-primary .tabs a{\n  color:#fff;\n  opacity:0.9;\n}\n\n.hero.is-primary .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-primary .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a{\n  color:#fff;\n}\n\n.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover{\n  background-color:#fff;\n  border-color:#fff;\n  color:#00d1b2;\n}\n\n.hero.is-primary.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n  background-image:-o-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n  background-image:linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n}\n\n.hero.is-info{\n  background-color:#3273dc;\n  color:#fff;\n}\n\n.hero.is-info a:not(.button),\n.hero.is-info strong{\n  color:inherit;\n}\n\n.hero.is-info .title{\n  color:#fff;\n}\n\n.hero.is-info .subtitle{\n  color:rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-info .subtitle a:not(.button),\n.hero.is-info .subtitle strong{\n  color:#fff;\n}\n\n.hero.is-info .nav{\n  -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n          box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.hero.is-info a.nav-item,\n.hero.is-info .nav-item a:not(.button){\n  color:rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-info a.nav-item:hover, .hero.is-info a.nav-item.is-active,\n.hero.is-info .nav-item a:not(.button):hover,\n.hero.is-info .nav-item a:not(.button).is-active{\n  color:#fff;\n}\n\n.hero.is-info .tabs a{\n  color:#fff;\n  opacity:0.9;\n}\n\n.hero.is-info .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-info .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a{\n  color:#fff;\n}\n\n.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover{\n  background-color:#fff;\n  border-color:#fff;\n  color:#3273dc;\n}\n\n.hero.is-info.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n  background-image:-o-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n  background-image:linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n}\n\n.hero.is-success{\n  background-color:#23d160;\n  color:#fff;\n}\n\n.hero.is-success a:not(.button),\n.hero.is-success strong{\n  color:inherit;\n}\n\n.hero.is-success .title{\n  color:#fff;\n}\n\n.hero.is-success .subtitle{\n  color:rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-success .subtitle a:not(.button),\n.hero.is-success .subtitle strong{\n  color:#fff;\n}\n\n.hero.is-success .nav{\n  -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n          box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.hero.is-success a.nav-item,\n.hero.is-success .nav-item a:not(.button){\n  color:rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-success a.nav-item:hover, .hero.is-success a.nav-item.is-active,\n.hero.is-success .nav-item a:not(.button):hover,\n.hero.is-success .nav-item a:not(.button).is-active{\n  color:#fff;\n}\n\n.hero.is-success .tabs a{\n  color:#fff;\n  opacity:0.9;\n}\n\n.hero.is-success .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-success .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a{\n  color:#fff;\n}\n\n.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover{\n  background-color:#fff;\n  border-color:#fff;\n  color:#23d160;\n}\n\n.hero.is-success.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  background-image:-o-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  background-image:linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n\n.hero.is-warning{\n  background-color:#ffdd57;\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a:not(.button),\n.hero.is-warning strong{\n  color:inherit;\n}\n\n.hero.is-warning .title{\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .subtitle{\n  color:rgba(0, 0, 0, 0.9);\n}\n\n.hero.is-warning .subtitle a:not(.button),\n.hero.is-warning .subtitle strong{\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .nav{\n  -webkit-box-shadow:0 1px 0 rgba(0, 0, 0, 0.2);\n          box-shadow:0 1px 0 rgba(0, 0, 0, 0.2);\n}\n\n.hero.is-warning a.nav-item,\n.hero.is-warning .nav-item a:not(.button){\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a.nav-item:hover, .hero.is-warning a.nav-item.is-active,\n.hero.is-warning .nav-item a:not(.button):hover,\n.hero.is-warning .nav-item a:not(.button).is-active{\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs a{\n  color:rgba(0, 0, 0, 0.7);\n  opacity:0.9;\n}\n\n.hero.is-warning .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-warning .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a{\n  color:rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover{\n  background-color:rgba(0, 0, 0, 0.7);\n  border-color:rgba(0, 0, 0, 0.7);\n  color:#ffdd57;\n}\n\n.hero.is-warning.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  background-image:-o-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  background-image:linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n\n.hero.is-danger{\n  background-color:#ff3860;\n  color:#fff;\n}\n\n.hero.is-danger a:not(.button),\n.hero.is-danger strong{\n  color:inherit;\n}\n\n.hero.is-danger .title{\n  color:#fff;\n}\n\n.hero.is-danger .subtitle{\n  color:rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-danger .subtitle a:not(.button),\n.hero.is-danger .subtitle strong{\n  color:#fff;\n}\n\n.hero.is-danger .nav{\n  -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n          box-shadow:0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.hero.is-danger a.nav-item,\n.hero.is-danger .nav-item a:not(.button){\n  color:rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-danger a.nav-item:hover, .hero.is-danger a.nav-item.is-active,\n.hero.is-danger .nav-item a:not(.button):hover,\n.hero.is-danger .nav-item a:not(.button).is-active{\n  color:#fff;\n}\n\n.hero.is-danger .tabs a{\n  color:#fff;\n  opacity:0.9;\n}\n\n.hero.is-danger .tabs a:hover{\n  opacity:1;\n}\n\n.hero.is-danger .tabs li.is-active a{\n  opacity:1;\n}\n\n.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a{\n  color:#fff;\n}\n\n.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover{\n  background-color:rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover{\n  background-color:#fff;\n  border-color:#fff;\n  color:#ff3860;\n}\n\n.hero.is-danger.is-bold{\n  background-image:-webkit-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  background-image:-o-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  background-image:linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n\n.hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body{\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container{\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1;\n  -ms-flex-negative:1;\n      flex-shrink:1;\n}\n\n.hero.is-halfheight{\n  min-height:50vh;\n}\n\n.hero.is-fullheight{\n  min-height:100vh;\n}\n\n.section{\n  background-color:white;\n  padding:3rem 1.5rem;\n}\n\n.footer{\n  background-color:whitesmoke;\n  padding:3rem 1.5rem 6rem;\n}\n@media screen and (max-width: 768px){\n  .is-block-mobile{\n    display:block !important;\n  }\n  .is-flex-mobile{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-mobile{\n    display:inline !important;\n  }\n  .is-inline-block-mobile{\n    display:inline-block !important;\n  }\n  .is-inline-flex-mobile{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-mobile{\n    display:none !important;\n  }\n  .field-label{\n    margin-bottom:0.5rem;\n  }\n  .level-item:not(:last-child){\n    margin-bottom:0.75rem;\n  }\n  .level-left + .level-right{\n    margin-top:1.5rem;\n  }\n  .nav-item{\n    -webkit-box-pack:start;\n        -ms-flex-pack:start;\n            justify-content:flex-start;\n  }\n  .nav-menu.nav-right{\n    background-color:white;\n    -webkit-box-shadow:0 4px 7px rgba(10, 10, 10, 0.1);\n            box-shadow:0 4px 7px rgba(10, 10, 10, 0.1);\n    left:0;\n    display:none;\n    right:0;\n    top:100%;\n    position:absolute;\n  }\n  .nav-menu.nav-right .nav-item{\n    border-top:1px solid rgba(219, 219, 219, 0.5);\n    padding:0.75rem;\n  }\n  .nav-menu.nav-right.is-active{\n    display:block;\n  }\n  .pagination{\n    -ms-flex-wrap:wrap;\n        flex-wrap:wrap;\n  }\n  .pagination-previous,\n  .pagination-next{\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n    -ms-flex-negative:1;\n        flex-shrink:1;\n  }\n  .pagination-list li{\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n    -ms-flex-negative:1;\n        flex-shrink:1;\n  }\n  .column.is-narrow-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters-mobile{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds-mobile{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half-mobile{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third-mobile{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter-mobile{\n    margin-left:25%;\n  }\n  .column.is-1-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1-mobile{\n    margin-left:8.33333%;\n  }\n  .column.is-2-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2-mobile{\n    margin-left:16.66667%;\n  }\n  .column.is-3-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3-mobile{\n    margin-left:25%;\n  }\n  .column.is-4-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4-mobile{\n    margin-left:33.33333%;\n  }\n  .column.is-5-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5-mobile{\n    margin-left:41.66667%;\n  }\n  .column.is-6-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6-mobile{\n    margin-left:50%;\n  }\n  .column.is-7-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7-mobile{\n    margin-left:58.33333%;\n  }\n  .column.is-8-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8-mobile{\n    margin-left:66.66667%;\n  }\n  .column.is-9-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9-mobile{\n    margin-left:75%;\n  }\n  .column.is-10-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10-mobile{\n    margin-left:83.33333%;\n  }\n  .column.is-11-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11-mobile{\n    margin-left:91.66667%;\n  }\n  .column.is-12-mobile{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12-mobile{\n    margin-left:100%;\n  }\n  .hero-video{\n    display:none;\n  }\n  .hero-buttons .button{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .hero-buttons .button:not(:last-child){\n    margin-bottom:0.75rem;\n  }\n  .hero.is-white .nav-menu{\n    background-color:white;\n  }\n  .hero.is-white.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n    background-image:-o-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n    background-image:linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n  }\n  .hero.is-white .nav-toggle span{\n    background-color:#0a0a0a;\n  }\n  .hero.is-white .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-white .nav-toggle.is-active span{\n    background-color:#0a0a0a;\n  }\n  .hero.is-white .nav-menu .nav-item{\n    border-top-color:rgba(10, 10, 10, 0.2);\n  }\n  .hero.is-black .nav-menu{\n    background-color:#0a0a0a;\n  }\n  .hero.is-black.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n    background-image:-o-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n    background-image:linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n  }\n  .hero.is-black .nav-toggle span{\n    background-color:white;\n  }\n  .hero.is-black .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-black .nav-toggle.is-active span{\n    background-color:white;\n  }\n  .hero.is-black .nav-menu .nav-item{\n    border-top-color:rgba(255, 255, 255, 0.2);\n  }\n  .hero.is-light .nav-menu{\n    background-color:whitesmoke;\n  }\n  .hero.is-light.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n    background-image:-o-linear-gradient(309deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n    background-image:linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n  }\n  .hero.is-light .nav-toggle span{\n    background-color:#363636;\n  }\n  .hero.is-light .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-light .nav-toggle.is-active span{\n    background-color:#363636;\n  }\n  .hero.is-light .nav-menu .nav-item{\n    border-top-color:rgba(54, 54, 54, 0.2);\n  }\n  .hero.is-dark .nav-menu{\n    background-color:#363636;\n  }\n  .hero.is-dark.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #1f191a 0%, #363636 71%, #46403f 100%);\n    background-image:-o-linear-gradient(309deg, #1f191a 0%, #363636 71%, #46403f 100%);\n    background-image:linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n  }\n  .hero.is-dark .nav-toggle span{\n    background-color:whitesmoke;\n  }\n  .hero.is-dark .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-dark .nav-toggle.is-active span{\n    background-color:whitesmoke;\n  }\n  .hero.is-dark .nav-menu .nav-item{\n    border-top-color:rgba(245, 245, 245, 0.2);\n  }\n  .hero.is-primary .nav-menu{\n    background-color:#00d1b2;\n  }\n  .hero.is-primary.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n    background-image:-o-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n    background-image:linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n  }\n  .hero.is-primary .nav-toggle span{\n    background-color:#fff;\n  }\n  .hero.is-primary .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-primary .nav-toggle.is-active span{\n    background-color:#fff;\n  }\n  .hero.is-primary .nav-menu .nav-item{\n    border-top-color:rgba(255, 255, 255, 0.2);\n  }\n  .hero.is-info .nav-menu{\n    background-color:#3273dc;\n  }\n  .hero.is-info.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n    background-image:-o-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n    background-image:linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n  }\n  .hero.is-info .nav-toggle span{\n    background-color:#fff;\n  }\n  .hero.is-info .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-info .nav-toggle.is-active span{\n    background-color:#fff;\n  }\n  .hero.is-info .nav-menu .nav-item{\n    border-top-color:rgba(255, 255, 255, 0.2);\n  }\n  .hero.is-success .nav-menu{\n    background-color:#23d160;\n  }\n  .hero.is-success.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n    background-image:-o-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n    background-image:linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  }\n  .hero.is-success .nav-toggle span{\n    background-color:#fff;\n  }\n  .hero.is-success .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-success .nav-toggle.is-active span{\n    background-color:#fff;\n  }\n  .hero.is-success .nav-menu .nav-item{\n    border-top-color:rgba(255, 255, 255, 0.2);\n  }\n  .hero.is-warning .nav-menu{\n    background-color:#ffdd57;\n  }\n  .hero.is-warning.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n    background-image:-o-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n    background-image:linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  }\n  .hero.is-warning .nav-toggle span{\n    background-color:rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-warning .nav-toggle.is-active span{\n    background-color:rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-menu .nav-item{\n    border-top-color:rgba(0, 0, 0, 0.2);\n  }\n  .hero.is-danger .nav-menu{\n    background-color:#ff3860;\n  }\n  .hero.is-danger.is-bold .nav-menu{\n    background-image:-webkit-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n    background-image:-o-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n    background-image:linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  }\n  .hero.is-danger .nav-toggle span{\n    background-color:#fff;\n  }\n  .hero.is-danger .nav-toggle:hover{\n    background-color:rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-danger .nav-toggle.is-active span{\n    background-color:#fff;\n  }\n  .hero.is-danger .nav-menu .nav-item{\n    border-top-color:rgba(255, 255, 255, 0.2);\n  }\n}\n@media screen and (min-width: 769px), print{\n  .is-block-tablet{\n    display:block !important;\n  }\n  .is-flex-tablet{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-tablet{\n    display:inline !important;\n  }\n  .is-inline-block-tablet{\n    display:inline-block !important;\n  }\n  .is-inline-flex-tablet{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-tablet{\n    display:none !important;\n  }\n  .field.is-horizontal{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .field-label{\n    -ms-flex-preferred-size:0;\n        flex-basis:0;\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n    -ms-flex-negative:0;\n        flex-shrink:0;\n    margin-right:1.5rem;\n    text-align:right;\n  }\n  .field-label.is-small{\n    font-size:0.75rem;\n    padding-top:0.375em;\n  }\n  .field-label.is-normal{\n    padding-top:0.375em;\n  }\n  .field-label.is-medium{\n    font-size:1.25rem;\n    padding-top:0.375em;\n  }\n  .field-label.is-large{\n    font-size:1.5rem;\n    padding-top:0.375em;\n  }\n  .field-body{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n    -ms-flex-preferred-size:0;\n        flex-basis:0;\n    -webkit-box-flex:5;\n        -ms-flex-positive:5;\n            flex-grow:5;\n    -ms-flex-negative:1;\n        flex-shrink:1;\n  }\n  .field-body .field{\n    -ms-flex-negative:1;\n        flex-shrink:1;\n  }\n  .field-body .field:not(.is-narrow){\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n  }\n  .field-body .field:not(:last-child){\n    margin-bottom:0;\n    margin-right:0.75rem;\n  }\n  .level-left{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .level-right{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .level{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .level > .level-item:not(.is-narrow){\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n  }\n  .modal-content,\n  .modal-card{\n    margin:0 auto;\n    max-height:calc(100vh - 40px);\n    width:640px;\n  }\n  .nav-toggle{\n    display:none;\n  }\n  .pagination-list{\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n    -ms-flex-negative:1;\n        flex-shrink:1;\n    -webkit-box-pack:start;\n        -ms-flex-pack:start;\n            justify-content:flex-start;\n    -webkit-box-ordinal-group:2;\n        -ms-flex-order:1;\n            order:1;\n  }\n  .pagination-previous{\n    -webkit-box-ordinal-group:3;\n        -ms-flex-order:2;\n            order:2;\n  }\n  .pagination-next{\n    -webkit-box-ordinal-group:4;\n        -ms-flex-order:3;\n            order:3;\n  }\n  .pagination{\n    -webkit-box-pack:justify;\n        -ms-flex-pack:justify;\n            justify-content:space-between;\n  }\n  .pagination.is-centered .pagination-previous{\n    -webkit-box-ordinal-group:2;\n        -ms-flex-order:1;\n            order:1;\n  }\n  .pagination.is-centered .pagination-list{\n    -webkit-box-pack:center;\n        -ms-flex-pack:center;\n            justify-content:center;\n    -webkit-box-ordinal-group:3;\n        -ms-flex-order:2;\n            order:2;\n  }\n  .pagination.is-centered .pagination-next{\n    -webkit-box-ordinal-group:4;\n        -ms-flex-order:3;\n            order:3;\n  }\n  .pagination.is-right .pagination-previous{\n    -webkit-box-ordinal-group:2;\n        -ms-flex-order:1;\n            order:1;\n  }\n  .pagination.is-right .pagination-next{\n    -webkit-box-ordinal-group:3;\n        -ms-flex-order:2;\n            order:2;\n  }\n  .pagination.is-right .pagination-list{\n    -webkit-box-pack:end;\n        -ms-flex-pack:end;\n            justify-content:flex-end;\n    -webkit-box-ordinal-group:4;\n        -ms-flex-order:3;\n            order:3;\n  }\n  .column.is-narrow, .column.is-narrow-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full, .column.is-full-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters, .column.is-three-quarters-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds, .column.is-two-thirds-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half, .column.is-half-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third, .column.is-one-third-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter, .column.is-one-quarter-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half, .column.is-offset-half-tablet{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third, .column.is-offset-one-third-tablet{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet{\n    margin-left:25%;\n  }\n  .column.is-1, .column.is-1-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1, .column.is-offset-1-tablet{\n    margin-left:8.33333%;\n  }\n  .column.is-2, .column.is-2-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2, .column.is-offset-2-tablet{\n    margin-left:16.66667%;\n  }\n  .column.is-3, .column.is-3-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3, .column.is-offset-3-tablet{\n    margin-left:25%;\n  }\n  .column.is-4, .column.is-4-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4, .column.is-offset-4-tablet{\n    margin-left:33.33333%;\n  }\n  .column.is-5, .column.is-5-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5, .column.is-offset-5-tablet{\n    margin-left:41.66667%;\n  }\n  .column.is-6, .column.is-6-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6, .column.is-offset-6-tablet{\n    margin-left:50%;\n  }\n  .column.is-7, .column.is-7-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7, .column.is-offset-7-tablet{\n    margin-left:58.33333%;\n  }\n  .column.is-8, .column.is-8-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8, .column.is-offset-8-tablet{\n    margin-left:66.66667%;\n  }\n  .column.is-9, .column.is-9-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9, .column.is-offset-9-tablet{\n    margin-left:75%;\n  }\n  .column.is-10, .column.is-10-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10, .column.is-offset-10-tablet{\n    margin-left:83.33333%;\n  }\n  .column.is-11, .column.is-11-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11, .column.is-offset-11-tablet{\n    margin-left:91.66667%;\n  }\n  .column.is-12, .column.is-12-tablet{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12, .column.is-offset-12-tablet{\n    margin-left:100%;\n  }\n  .columns.is-grid{\n    -ms-flex-wrap:wrap;\n        flex-wrap:wrap;\n  }\n  .columns.is-grid > .column{\n    max-width:33.3333%;\n    padding:0.75rem;\n    width:33.3333%;\n  }\n  .columns.is-grid > .column + .column{\n    margin-left:0;\n  }\n  .columns:not(.is-desktop){\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .tile:not(.is-child){\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .tile.is-1{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .tile.is-2{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .tile.is-3{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .tile.is-4{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .tile.is-5{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .tile.is-6{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .tile.is-7{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .tile.is-8{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .tile.is-9{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .tile.is-10{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .tile.is-11{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .tile.is-12{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .hero-buttons{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n    -webkit-box-pack:center;\n        -ms-flex-pack:center;\n            justify-content:center;\n  }\n  .hero-buttons .button:not(:last-child){\n    margin-right:1.5rem;\n  }\n  .hero.is-medium .hero-body{\n    padding-bottom:9rem;\n    padding-top:9rem;\n  }\n  .hero.is-large .hero-body{\n    padding-bottom:18rem;\n    padding-top:18rem;\n  }\n}\n@media screen and (min-width: 769px) and (max-width: 999px){\n  .is-block-tablet-only{\n    display:block !important;\n  }\n  .is-flex-tablet-only{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-tablet-only{\n    display:inline !important;\n  }\n  .is-inline-block-tablet-only{\n    display:inline-block !important;\n  }\n  .is-inline-flex-tablet-only{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-tablet-only{\n    display:none !important;\n  }\n}\n@media screen and (max-width: 999px){\n  .is-block-touch{\n    display:block !important;\n  }\n  .is-flex-touch{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-touch{\n    display:inline !important;\n  }\n  .is-inline-block-touch{\n    display:inline-block !important;\n  }\n  .is-inline-flex-touch{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-touch{\n    display:none !important;\n  }\n  .navbar-brand .navbar-item{\n    -webkit-box-align:center;\n        -ms-flex-align:center;\n            align-items:center;\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .navbar-menu{\n    -webkit-box-shadow:0 8px 16px rgba(10, 10, 10, 0.1);\n            box-shadow:0 8px 16px rgba(10, 10, 10, 0.1);\n    padding:0.5rem 0;\n  }\n  .navbar-menu.is-active{\n    display:block;\n  }\n  .column.is-narrow-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters-touch{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds-touch{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half-touch{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third-touch{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter-touch{\n    margin-left:25%;\n  }\n  .column.is-1-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1-touch{\n    margin-left:8.33333%;\n  }\n  .column.is-2-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2-touch{\n    margin-left:16.66667%;\n  }\n  .column.is-3-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3-touch{\n    margin-left:25%;\n  }\n  .column.is-4-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4-touch{\n    margin-left:33.33333%;\n  }\n  .column.is-5-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5-touch{\n    margin-left:41.66667%;\n  }\n  .column.is-6-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6-touch{\n    margin-left:50%;\n  }\n  .column.is-7-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7-touch{\n    margin-left:58.33333%;\n  }\n  .column.is-8-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8-touch{\n    margin-left:66.66667%;\n  }\n  .column.is-9-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9-touch{\n    margin-left:75%;\n  }\n  .column.is-10-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10-touch{\n    margin-left:83.33333%;\n  }\n  .column.is-11-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11-touch{\n    margin-left:91.66667%;\n  }\n  .column.is-12-touch{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12-touch{\n    margin-left:100%;\n  }\n}\n@media screen and (min-width: 1000px){\n  .is-block-desktop{\n    display:block !important;\n  }\n  .is-flex-desktop{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-desktop{\n    display:inline !important;\n  }\n  .is-inline-block-desktop{\n    display:inline-block !important;\n  }\n  .is-inline-flex-desktop{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-desktop{\n    display:none !important;\n  }\n  .container{\n    margin:0 auto;\n    max-width:960px;\n    width:960px;\n  }\n  .container.is-fluid{\n    margin:0 20px;\n    max-width:none;\n    width:auto;\n  }\n  .nav-item a:not(.button).is-brand,\n  a.nav-item:not(.button).is-brand{\n    padding-left:0;\n  }\n  .navbar,\n  .navbar-menu,\n  .navbar-start,\n  .navbar-end{\n    -webkit-box-align:stretch;\n        -ms-flex-align:stretch;\n            align-items:stretch;\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .navbar{\n    height:3.25rem;\n  }\n  .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,\n  .navbar.is-transparent .navbar-link:hover,\n  .navbar.is-transparent .navbar-link.is-active{\n    background-color:transparent;\n  }\n  .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{\n    background-color:transparent;\n  }\n  .navbar.is-transparent .navbar-dropdown a.navbar-item:hover{\n    background-color:whitesmoke;\n    color:#0a0a0a;\n  }\n  .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{\n    background-color:whitesmoke;\n    color:#00d1b2;\n  }\n  .navbar-burger{\n    display:none;\n  }\n  .navbar-item,\n  .navbar-link{\n    -webkit-box-align:center;\n        -ms-flex-align:center;\n            align-items:center;\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .navbar-item.has-dropdown{\n    -webkit-box-align:stretch;\n        -ms-flex-align:stretch;\n            align-items:stretch;\n  }\n  .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown{\n    display:block;\n  }\n  .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed{\n    opacity:1;\n    pointer-events:auto;\n    -webkit-transform:translateY(0);\n            -ms-transform:translateY(0);\n        transform:translateY(0);\n  }\n  .navbar-link::after{\n    border:1px solid #00d1b2;\n    border-right:0;\n    border-top:0;\n    content:\" \";\n    display:block;\n    height:0.5em;\n    pointer-events:none;\n    position:absolute;\n    -webkit-transform:rotate(-45deg);\n            -ms-transform:rotate(-45deg);\n        transform:rotate(-45deg);\n    width:0.5em;\n    margin-top:-0.375em;\n    right:1.125em;\n    top:50%;\n  }\n  .navbar-menu{\n    -webkit-box-flex:1;\n        -ms-flex-positive:1;\n            flex-grow:1;\n    -ms-flex-negative:0;\n        flex-shrink:0;\n  }\n  .navbar-start{\n    -webkit-box-pack:start;\n        -ms-flex-pack:start;\n            justify-content:flex-start;\n    margin-right:auto;\n  }\n  .navbar-end{\n    -webkit-box-pack:end;\n        -ms-flex-pack:end;\n            justify-content:flex-end;\n    margin-left:auto;\n  }\n  .navbar-dropdown{\n    background-color:white;\n    border-bottom-left-radius:5px;\n    border-bottom-right-radius:5px;\n    border-top:1px solid #dbdbdb;\n    -webkit-box-shadow:0 8px 8px rgba(10, 10, 10, 0.1);\n            box-shadow:0 8px 8px rgba(10, 10, 10, 0.1);\n    display:none;\n    font-size:0.875rem;\n    left:0;\n    min-width:100%;\n    position:absolute;\n    top:100%;\n    z-index:20;\n  }\n  .navbar-dropdown .navbar-item{\n    padding:0.375rem 1rem;\n    white-space:nowrap;\n  }\n  .navbar-dropdown a.navbar-item{\n    padding-right:3rem;\n  }\n  .navbar-dropdown a.navbar-item:hover{\n    background-color:whitesmoke;\n    color:#0a0a0a;\n  }\n  .navbar-dropdown a.navbar-item.is-active{\n    background-color:whitesmoke;\n    color:#00d1b2;\n  }\n  .navbar-dropdown.is-boxed{\n    border-radius:5px;\n    border-top:none;\n    -webkit-box-shadow:0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n            box-shadow:0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n    display:block;\n    opacity:0;\n    pointer-events:none;\n    top:calc(100% + (-4px));\n    -webkit-transform:translateY(-5px);\n            -ms-transform:translateY(-5px);\n        transform:translateY(-5px);\n    -webkit-transition-duration:86ms;\n            -o-transition-duration:86ms;\n       transition-duration:86ms;\n    -webkit-transition-property:opacity, -webkit-transform;\n    transition-property:opacity, -webkit-transform;\n    -o-transition-property:opacity, transform;\n    transition-property:opacity, transform;\n    transition-property:opacity, transform, -webkit-transform;\n  }\n  .navbar-divider{\n    display:block;\n  }\n  .container > .navbar{\n    margin-left:-1rem;\n    margin-right:-1rem;\n  }\n  a.navbar-item.is-active,\n  .navbar-link.is-active{\n    color:#0a0a0a;\n  }\n  a.navbar-item.is-active:not(:hover),\n  .navbar-link.is-active:not(:hover){\n    background-color:transparent;\n  }\n  .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link{\n    background-color:whitesmoke;\n  }\n  .column.is-narrow-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters-desktop{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds-desktop{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half-desktop{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third-desktop{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter-desktop{\n    margin-left:25%;\n  }\n  .column.is-1-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1-desktop{\n    margin-left:8.33333%;\n  }\n  .column.is-2-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2-desktop{\n    margin-left:16.66667%;\n  }\n  .column.is-3-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3-desktop{\n    margin-left:25%;\n  }\n  .column.is-4-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4-desktop{\n    margin-left:33.33333%;\n  }\n  .column.is-5-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5-desktop{\n    margin-left:41.66667%;\n  }\n  .column.is-6-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6-desktop{\n    margin-left:50%;\n  }\n  .column.is-7-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7-desktop{\n    margin-left:58.33333%;\n  }\n  .column.is-8-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8-desktop{\n    margin-left:66.66667%;\n  }\n  .column.is-9-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9-desktop{\n    margin-left:75%;\n  }\n  .column.is-10-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10-desktop{\n    margin-left:83.33333%;\n  }\n  .column.is-11-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11-desktop{\n    margin-left:91.66667%;\n  }\n  .column.is-12-desktop{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12-desktop{\n    margin-left:100%;\n  }\n  .columns.is-desktop{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n  }\n  .section.is-medium{\n    padding:9rem 1.5rem;\n  }\n  .section.is-large{\n    padding:18rem 1.5rem;\n  }\n}\n@media screen and (min-width: 1000px) and (max-width: 1191px){\n  .is-block-desktop-only{\n    display:block !important;\n  }\n  .is-flex-desktop-only{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-desktop-only{\n    display:inline !important;\n  }\n  .is-inline-block-desktop-only{\n    display:inline-block !important;\n  }\n  .is-inline-flex-desktop-only{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-desktop-only{\n    display:none !important;\n  }\n}\n@media screen and (min-width: 1192px){\n  .is-block-widescreen{\n    display:block !important;\n  }\n  .is-flex-widescreen{\n    display:-webkit-box !important;\n    display:-ms-flexbox !important;\n    display:flex !important;\n  }\n  .is-inline-widescreen{\n    display:inline !important;\n  }\n  .is-inline-block-widescreen{\n    display:inline-block !important;\n  }\n  .is-inline-flex-widescreen{\n    display:-webkit-inline-box !important;\n    display:-ms-inline-flexbox !important;\n    display:inline-flex !important;\n  }\n  .is-hidden-widescreen{\n    display:none !important;\n  }\n  .container{\n    max-width:1152px;\n    width:1152px;\n  }\n  .nav-left,\n  .nav-right{\n    -ms-flex-preferred-size:0;\n        flex-basis:0;\n  }\n  .column.is-narrow-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters-widescreen{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds-widescreen{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half-widescreen{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third-widescreen{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter-widescreen{\n    margin-left:25%;\n  }\n  .column.is-1-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1-widescreen{\n    margin-left:8.33333%;\n  }\n  .column.is-2-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2-widescreen{\n    margin-left:16.66667%;\n  }\n  .column.is-3-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3-widescreen{\n    margin-left:25%;\n  }\n  .column.is-4-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4-widescreen{\n    margin-left:33.33333%;\n  }\n  .column.is-5-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5-widescreen{\n    margin-left:41.66667%;\n  }\n  .column.is-6-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6-widescreen{\n    margin-left:50%;\n  }\n  .column.is-7-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7-widescreen{\n    margin-left:58.33333%;\n  }\n  .column.is-8-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8-widescreen{\n    margin-left:66.66667%;\n  }\n  .column.is-9-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9-widescreen{\n    margin-left:75%;\n  }\n  .column.is-10-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10-widescreen{\n    margin-left:83.33333%;\n  }\n  .column.is-11-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11-widescreen{\n    margin-left:91.66667%;\n  }\n  .column.is-12-widescreen{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12-widescreen{\n    margin-left:100%;\n  }\n}\n@media screen and (min-width: 1384px){\n  .container{\n    max-width:1344px;\n    width:1344px;\n  }\n  .column.is-narrow-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n  }\n  .column.is-full-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-three-quarters-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-two-thirds-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.6666%;\n  }\n  .column.is-half-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-one-third-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.3333%;\n  }\n  .column.is-one-quarter-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-three-quarters-fullhd{\n    margin-left:75%;\n  }\n  .column.is-offset-two-thirds-fullhd{\n    margin-left:66.6666%;\n  }\n  .column.is-offset-half-fullhd{\n    margin-left:50%;\n  }\n  .column.is-offset-one-third-fullhd{\n    margin-left:33.3333%;\n  }\n  .column.is-offset-one-quarter-fullhd{\n    margin-left:25%;\n  }\n  .column.is-1-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:8.33333%;\n  }\n  .column.is-offset-1-fullhd{\n    margin-left:8.33333%;\n  }\n  .column.is-2-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:16.66667%;\n  }\n  .column.is-offset-2-fullhd{\n    margin-left:16.66667%;\n  }\n  .column.is-3-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:25%;\n  }\n  .column.is-offset-3-fullhd{\n    margin-left:25%;\n  }\n  .column.is-4-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:33.33333%;\n  }\n  .column.is-offset-4-fullhd{\n    margin-left:33.33333%;\n  }\n  .column.is-5-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:41.66667%;\n  }\n  .column.is-offset-5-fullhd{\n    margin-left:41.66667%;\n  }\n  .column.is-6-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:50%;\n  }\n  .column.is-offset-6-fullhd{\n    margin-left:50%;\n  }\n  .column.is-7-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:58.33333%;\n  }\n  .column.is-offset-7-fullhd{\n    margin-left:58.33333%;\n  }\n  .column.is-8-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:66.66667%;\n  }\n  .column.is-offset-8-fullhd{\n    margin-left:66.66667%;\n  }\n  .column.is-9-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:75%;\n  }\n  .column.is-offset-9-fullhd{\n    margin-left:75%;\n  }\n  .column.is-10-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:83.33333%;\n  }\n  .column.is-offset-10-fullhd{\n    margin-left:83.33333%;\n  }\n  .column.is-11-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:91.66667%;\n  }\n  .column.is-offset-11-fullhd{\n    margin-left:91.66667%;\n  }\n  .column.is-12-fullhd{\n    -webkit-box-flex:0;\n        -ms-flex:none;\n            flex:none;\n    width:100%;\n  }\n  .column.is-offset-12-fullhd{\n    margin-left:100%;\n  }\n}", ""]);

// exports


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".flex-center{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n}\nbody{\n  font-family:'Roboto', sans-serif;\n  overflow:hidden;\n  height:100vh;\n  background:#eee;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n}\n.myApp-container{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-flow:column nowrap;\n          flex-flow:column nowrap;\n}\n.myApp-container h1{\n  font-size:40px;\n  -webkit-transition:700ms;\n  -o-transition:700ms;\n  transition:700ms;\n  text-align:center;\n}\n.myApp-container .bg-decor{\n  font-size:130vh;\n  position:absolute;\n  opacity:0.07;\n  -webkit-transition:1000ms;\n  -o-transition:1000ms;\n  transition:1000ms;\n}\n.myApp-container .notification{\n  width:50vw;\n  height:35vw;\n  -webkit-transition:1000ms;\n  -o-transition:1000ms;\n  transition:1000ms;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-flow:column wrap;\n          flex-flow:column wrap;\n  background-color:rgba(245, 245, 245, 0.8);\n}\n.myApp-container .result{\n  font-size:10vw;\n  -webkit-transition:color 1000ms ease-out;\n  -o-transition:color 1000ms ease-out;\n  transition:color 1000ms ease-out;\n}\n.myApp-container .btn-group{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack:center;\n      -ms-flex-pack:center;\n          justify-content:center;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n}\n.myApp-container .btn-group button{\n  margin:0 24px;\n}\n.myApp-container.all-is-well .bg-decor{\n  color:#23d160;\n  opacity:0.2;\n}\n.myApp-container.all-is-well .notification{\n  -webkit-box-shadow:0 0 30px #23d160;\n          box-shadow:0 0 30px #23d160;\n}\n.myApp-container.all-is-well .notification .result{\n  color:#23d160;\n}\n.myApp-container.all-is-well .notification h1{\n  color:#1ca54c;\n}\n.myApp-container.not-so-good .bg-decor{\n  color:#ff3860;\n  opacity:0.2;\n}\n.myApp-container.not-so-good .notification{\n  -webkit-box-shadow:0 0 30px #ff3860;\n          box-shadow:0 0 30px #ff3860;\n}\n.myApp-container.not-so-good .notification .result{\n  color:#ff3860;\n}\n.myApp-container.not-so-good .notification h1{\n  color:#ff0537;\n}\n@media screen and (max-width: 1200px){\n  .myApp-container .notification{\n    overflow:hidden;\n    width:100vw;\n    height:100vh;\n  }\n  .myApp-container .notification h1{\n    font-size:22px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.3.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.4';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (process.env.NODE_ENV !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    process.env.NODE_ENV !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(6)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.message[data-v-99ecdc1c]{\n  cursor:pointer;\n  margin-bottom:24px;\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var Vue // late bind
var version
var map = window.__VUE_HOT_MAP__ = Object.create(null)
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) return
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
      'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Vue.extend(options),
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  injectHook(options, initHookName, function () {
    map[id].instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    var instances = map[id].instances
    instances.splice(instances.indexOf(this), 1)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

function tryWrap (fn) {
  return function (id, arg) {
    try { fn(id, arg) } catch (e) {
      console.error(e)
      console.warn('Something went wrong during Vue component hot-reload. Full reload required.')
    }
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  record.Ctor.options.render = options.render
  record.Ctor.options.staticRenderFns = options.staticRenderFns
  record.instances.slice().forEach(function (instance) {
    instance.$options.render = options.render
    instance.$options.staticRenderFns = options.staticRenderFns
    instance._staticTrees = [] // reset static trees
    instance.$forceUpdate()
  })
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (version[1] < 2) {
      // preserve pre 2.2 behavior for global mixin handling
      record.Ctor.extendOptions = options
    }
    var newCtor = record.Ctor.super.extend(options)
    record.Ctor.options = newCtor.options
    record.Ctor.cid = newCtor.cid
    record.Ctor.prototype = newCtor.prototype
    if (newCtor.release) {
      // temporary global mixin strategy used in < 2.0.0-alpha.6
      newCtor.release()
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn('Root or manually mounted instance modified. Full reload required.')
    }
  })
})


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bulma = __webpack_require__(10);

var _bulma2 = _interopRequireDefault(_bulma);

var _styles = __webpack_require__(12);

var _styles2 = _interopRequireDefault(_styles);

var _app = __webpack_require__(13);

var myApp = _interopRequireWildcard(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(0);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(0, function() {
			var newContent = __webpack_require__(0);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(2, function() {
			var newContent = __webpack_require__(2);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueMeta = __webpack_require__(15);

var _vueMeta2 = _interopRequireDefault(_vueMeta);

var _store = __webpack_require__(16);

var _store2 = _interopRequireDefault(_store);

var _component = __webpack_require__(21);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.debug = true;
_vue2.default.config.devtools = true;
_vue2.default.productionTip = false;

_vue2.default.use(_vueMeta2.default);

var myApp = new _vue2.default({
  name: 'myApp',
  template: '#myApp',
  el: '#app', // instance startig container
  components: {
    'my-component': _component2.default
  },
  metaInfo: {
    title: 'New App',
    titleTemplate: '%s | Vue Jump Start',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }]
  },
  data: function data() {
    return {};
  },

  computed: {
    result: function result() {
      return _store2.default.state.result;
    }
  },
  methods: {
    increment: function increment() {
      _store2.default.dispatch('increment');
    },
    decrement: function decrement() {
      _store2.default.dispatch('decrement');
    }
  }
});

exports.default = myApp;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * vue-meta v1.0.4
 * (c) 2017 Declan de Wet
 * @license MIT
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMeta = factory());
}(this, (function () { 'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$1 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {
        undefined(factory);
    } else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

var index$2 = isPlainObject;

/**
 * checks if passed argument is an array
 * @param  {any}  arr - the object to check
 * @return {Boolean} - true if `arr` is an array
 */
function isArray (arr) {
  return Array.isArray
    ? Array.isArray(arr)
    : Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * Returns the `opts.option` $option value of the given `opts.component`.
 * If methods are encountered, they will be bound to the component context.
 * If `opts.deep` is true, will recursively merge all child component
 * `opts.option` $option values into the returned result.
 *
 * @param  {Object} opts - options
 * @param  {Object} opts.component - Vue component to fetch option data from
 * @param  {String} opts.option - what option to look for
 * @param  {Boolean} opts.deep - look for data in child components as well?
 * @param  {Function} opts.arrayMerge - how should arrays be merged?
 * @param  {Object} [result={}] - result so far
 * @return {Object} result - final aggregated result
 */
function getComponentOption (opts, result) {
  if ( result === void 0 ) result = {};

  var component = opts.component;
  var option = opts.option;
  var deep = opts.deep;
  var arrayMerge = opts.arrayMerge;
  var $options = component.$options;

  // only collect option data if it exists
  if (typeof $options[option] !== 'undefined' && $options[option] !== null) {
    var data = $options[option];

    // if option is a function, replace it with it's result
    if (typeof data === 'function') {
      data = data.call(component);
    }

    if (typeof data === 'object') {
      // merge with existing options
      result = index$1(result, data, {
        clone: true,
        arrayMerge: arrayMerge
      });
    } else {
      result = data;
    }
  }

  // collect & aggregate child options if deep = true
  if (deep && component.$children.length) {
    component.$children.forEach(function (childComponent) {
      result = getComponentOption({
        component: childComponent,
        option: option,
        deep: deep,
        arrayMerge: arrayMerge
      }, result);
    });
  }

  return result
}

var escapeHTML = function (str) { return typeof window === 'undefined'
  // server-side escape sequence
  ? String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
  // client-side escape sequence
  : String(str)
    .replace(/&/g, '\u0026')
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/"/g, '\u0022')
    .replace(/'/g, '\u0027'); };

function _getMetaInfo (options) {
  if ( options === void 0 ) options = {};

  var keyName = options.keyName;
  var tagIDKeyName = options.tagIDKeyName;
  /**
   * Returns the correct meta info for the given component
   * (child components will overwrite parent meta info)
   *
   * @param  {Object} component - the Vue instance to get meta info from
   * @return {Object} - returned meta info
   */
  return function getMetaInfo (component) {
    // set some sane defaults
    var defaultInfo = {
      title: '',
      titleChunk: '',
      titleTemplate: '%s',
      htmlAttrs: {},
      bodyAttrs: {},
      meta: [],
      base: [],
      link: [],
      style: [],
      script: [],
      noscript: [],
      __dangerouslyDisableSanitizers: []
    };

    // collect & aggregate all metaInfo $options
    var info = getComponentOption({
      component: component,
      option: keyName,
      deep: true,
      arrayMerge: function arrayMerge (target, source) {
        // we concat the arrays without merging objects contained therein,
        // but we check for a `vmid` property on each object in the array
        // using an O(1) lookup associative array exploit
        // note the use of "for in" - we are looping through arrays here, not
        // plain objects
        var destination = [];
        for (var targetIndex in target) {
          var targetItem = target[targetIndex];
          var shared = false;
          for (var sourceIndex in source) {
            var sourceItem = source[sourceIndex];
            if (targetItem[tagIDKeyName] && targetItem[tagIDKeyName] === sourceItem[tagIDKeyName]) {
              shared = true;
              break
            }
          }
          if (!shared) {
            destination.push(targetItem);
          }
        }

        return destination.concat(source)
      }
    });

    // backup the title chunk in case user wants access to it
    if (info.title) {
      info.titleChunk = info.title;
    }

    // replace title with populated template
    if (info.titleTemplate) {
      info.title = info.titleTemplate.replace(/%s/g, info.titleChunk);
    }

    // convert base tag to an array so it can be handled the same way
    // as the other tags
    if (info.base) {
      info.base = Object.keys(info.base).length ? [info.base] : [];
    }

    // sanitizes potentially dangerous characters
    var escape = function (info) { return Object.keys(info).reduce(function (escaped, key) {
      var ref = info.__dangerouslyDisableSanitizers;
      var isDisabled = ref && ref.indexOf(key) > -1;
      var val = info[key];
      escaped[key] = val;
      if (key === '__dangerouslyDisableSanitizers') {
        return escaped
      }
      if (!isDisabled) {
        if (typeof val === 'string') {
          escaped[key] = escapeHTML(val);
        } else if (index$2(val)) {
          escaped[key] = escape(val);
        } else if (isArray(val)) {
          escaped[key] = val.map(escape);
        } else {
          escaped[key] = val;
        }
      } else {
        escaped[key] = val;
      }

      return escaped
    }, {}); };

    // merge with defaults
    info = index$1(defaultInfo, info);

    // begin sanitization
    info = escape(info);

    return info
  }
}

function _titleGenerator (options) {
  if ( options === void 0 ) options = {};

  var attribute = options.attribute;

  /**
   * Generates title output for the server
   *
   * @param  {'title'} type - the string "title"
   * @param  {String} data - the title text
   * @return {Object} - the title generator
   */
  return function titleGenerator (type, data) {
    return {
      text: function text () {
        return ("<" + type + " " + attribute + "=\"true\">" + data + "</" + type + ">")
      }
    }
  }
}

function _attrsGenerator (options) {
  if ( options === void 0 ) options = {};

  var attribute = options.attribute;

  /**
   * Generates tag attributes for use on the server.
   *
   * @param  {('bodyAttrs'|'htmlAttrs')} type - the type of attributes to generate
   * @param  {Object} data - the attributes to generate
   * @return {Object} - the attribute generator
   */
  return function attrsGenerator (type, data) {
    return {
      text: function text () {
        var attributeStr = '';
        var watchedAttrs = [];
        for (var attr in data) {
          if (data.hasOwnProperty(attr)) {
            watchedAttrs.push(attr);
            attributeStr += (typeof data[attr] !== 'undefined'
                ? (attr + "=\"" + (data[attr]) + "\"")
                : attr) + " ";
          }
        }
        attributeStr += attribute + "=\"" + (watchedAttrs.join(',')) + "\"";
        return attributeStr.trim()
      }
    }
  }
}

function _tagGenerator (options) {
  if ( options === void 0 ) options = {};

  var attribute = options.attribute;

  /**
   * Generates meta, base, link, style, script, noscript tags for use on the server
   *
   * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} the name of the tag
   * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
   * @return {Object} - the tag generator
   */
  return function tagGenerator (type, tags) {
    return {
      text: function text () {
        // build a string containing all tags of this type
        return tags.reduce(function (tagsStr, tag) {
          // build a string containing all attributes of this tag
          var attrs = Object.keys(tag).reduce(function (attrsStr, attr) {
            switch (attr) {
              // these attributes are treated as children on the tag
              case 'innerHTML':
              case 'cssText':
              case 'once':
                return attrsStr
              // these form the attribute list for this tag
              default:
                if (attr === options.tagIDKeyName) {
                  return (attrsStr + " data-" + attr + "=\"" + (tag[attr]) + "\"")
                }
                return typeof tag[attr] === 'undefined'
                  ? (attrsStr + " " + attr)
                  : (attrsStr + " " + attr + "=\"" + (tag[attr]) + "\"")
            }
          }, '').trim();

          // grab child content from one of these attributes, if possible
          var content = tag.innerHTML || tag.cssText || '';

          // these tag types will have content inserted
          var closed = ['noscript', 'script', 'style'].indexOf(type) === -1;

          // generate tag exactly without any other redundance attribute
          var observeTag = tag.once
            ? ''
            : (attribute + "=\"true\" ");

          // the final string for this specific tag
          return closed
            ? (tagsStr + "<" + type + " " + observeTag + attrs + "/>")
            : (tagsStr + "<" + type + " " + observeTag + attrs + ">" + content + "</" + type + ">")
        }, '')
      }
    }
  }
}

function _generateServerInjector (options) {
  if ( options === void 0 ) options = {};

  /**
   * Converts a meta info property to one that can be stringified on the server
   *
   * @param  {String} type - the type of data to convert
   * @param  {(String|Object|Array<Object>)} data - the data value
   * @return {Object} - the new injector
   */
  return function generateServerInjector (type, data) {
    switch (type) {
      case 'title':
        return _titleGenerator(options)(type, data)
      case 'htmlAttrs':
      case 'bodyAttrs':
        return _attrsGenerator(options)(type, data)
      default:
        return _tagGenerator(options)(type, data)
    }
  }
}

function _inject (options) {
  if ( options === void 0 ) options = {};

  /**
   * Converts the state of the meta info object such that each item
   * can be compiled to a tag string on the server
   *
   * @this {Object} - Vue instance - ideally the root component
   * @return {Object} - server meta info with `toString` methods
   */
  return function inject () {
    // get meta info with sensible defaults
    var info = _getMetaInfo(options)(this.$root);

    // generate server injectors
    for (var key in info) {
      if (info.hasOwnProperty(key) && key !== 'titleTemplate' && key !== 'titleChunk') {
        info[key] = _generateServerInjector(options)(key, info[key]);
      }
    }

    return info
  }
}

function _updateTitle () {
  /**
   * updates the document title
   *
   * @param  {String} title - the new title of the document
   */
  return function updateTitle (title) {
    if ( title === void 0 ) title = document.title;

    document.title = title;
  }
}

function _updateTagAttributes (options) {
  if ( options === void 0 ) options = {};

  var attribute = options.attribute;

  /**
   * updates the document's html tag attributes
   *
   * @param  {Object} attrs - the new document html attributes
   * @param  {HTMLElement} tag - the HTMLElment tag to update with new attrs
   */
  return function updateTagAttributes (attrs, tag) {
    var vueMetaAttrString = tag.getAttribute(attribute);
    var vueMetaAttrs = vueMetaAttrString ? vueMetaAttrString.split(',') : [];
    var toRemove = [].concat(vueMetaAttrs);
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        var val = attrs[attr] || '';
        tag.setAttribute(attr, val);
        if (vueMetaAttrs.indexOf(attr) === -1) {
          vueMetaAttrs.push(attr);
        }
        var saveIndex = toRemove.indexOf(attr);
        if (saveIndex !== -1) {
          toRemove.splice(saveIndex, 1);
        }
      }
    }
    var i = toRemove.length - 1;
    for (; i >= 0; i--) {
      tag.removeAttribute(toRemove[i]);
    }
    if (vueMetaAttrs.length === toRemove.length) {
      tag.removeAttribute(attribute);
    } else {
      tag.setAttribute(attribute, vueMetaAttrs.join(','));
    }
  }
}

// borrow the slice method
var toArray = Function.prototype.call.bind(Array.prototype.slice);

function _updateTags (options) {
  if ( options === void 0 ) options = {};

  var attribute = options.attribute;

  /**
   * Updates meta tags inside <head> on the client. Borrowed from `react-helmet`:
   * https://github.com/nfl/react-helmet/blob/004d448f8de5f823d10f838b02317521180f34da/src/Helmet.js#L195-L245
   *
   * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} type - the name of the tag
   * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
   * @return {Object} - a representation of what tags changed
   */
  return function updateTags (type, tags, headTag) {
    var nodes = headTag.querySelectorAll((type + "[" + attribute + "]"));
    var oldTags = toArray(nodes);
    var newTags = [];
    var indexToDelete;

    if (tags.length > 1) {
      // remove duplicates that could have been found by merging tags
      // which include a mixin with metaInfo and that mixin is used
      // by multiple components on the same page
      var found = [];
      tags = tags.map(function (x) {
        var k = JSON.stringify(x);
        if (found.indexOf(k) < 0) {
          found.push(k);
          return x
        }
      }).filter(function (x) { return x; });
    }

    if (tags && tags.length) {
      tags.forEach(function (tag) {
        var newElement = document.createElement(type);

        for (var attr in tag) {
          if (tag.hasOwnProperty(attr)) {
            if (attr === 'innerHTML') {
              newElement.innerHTML = tag.innerHTML;
            } else if (attr === 'cssText') {
              if (newElement.styleSheet) {
                newElement.styleSheet.cssText = tag.cssText;
              } else {
                newElement.appendChild(document.createTextNode(tag.cssText));
              }
            } else if (attr === options.tagIDKeyName) {
              var _attr = "data-" + attr;
              var value = (typeof tag[attr] === 'undefined') ? '' : tag[attr];
              newElement.setAttribute(_attr, value);
            } else {
              var value$1 = (typeof tag[attr] === 'undefined') ? '' : tag[attr];
              newElement.setAttribute(attr, value$1);
            }
          }
        }

        newElement.setAttribute(attribute, 'true');

        // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
        if (oldTags.some(function (existingTag, index) {
          indexToDelete = index;
          return newElement.isEqualNode(existingTag)
        })) {
          oldTags.splice(indexToDelete, 1);
        } else {
          newTags.push(newElement);
        }
      });
    }

    oldTags.forEach(function (tag) { return tag.parentNode.removeChild(tag); });
    newTags.forEach(function (tag) { return headTag.appendChild(tag); });

    return { oldTags: oldTags, newTags: newTags }
  }
}

function _updateClientMetaInfo (options) {
  if ( options === void 0 ) options = {};

  var ssrAttribute = options.ssrAttribute;

  /**
   * Performs client-side updates when new meta info is received
   *
   * @param  {Object} newInfo - the meta info to update to
   */
  return function updateClientMetaInfo (newInfo) {
    var htmlTag = document.getElementsByTagName('html')[0];
    // if this is not a server render, then update
    if (htmlTag.getAttribute(ssrAttribute) === null) {
      // initialize tracked changes
      var addedTags = {};
      var removedTags = {};

      Object.keys(newInfo).forEach(function (key) {
        switch (key) {
          // update the title
          case 'title':
            _updateTitle(options)(newInfo.title);
            break
          // update attributes
          case 'htmlAttrs':
          case 'bodyAttrs':
            _updateTagAttributes(options)(newInfo[key], key === 'htmlAttrs' ? htmlTag : document.getElementsByTagName('body')[0]);
            break
          // ignore these
          case 'titleChunk':
          case 'titleTemplate':
          case 'changed':
          case '__dangerouslyDisableSanitizers':
            break
          // catch-all update tags
          default:
            var ref = _updateTags(options)(key, newInfo[key], document.getElementsByTagName('head')[0]);
        var oldTags = ref.oldTags;
        var newTags = ref.newTags;
            if (newTags.length) {
              addedTags[key] = newTags;
              removedTags[key] = oldTags;
            }
        }
      });

      // emit "event" with new info
      if (typeof newInfo.changed === 'function') {
        newInfo.changed(newInfo, addedTags, removedTags);
      }
    } else {
      // remove the server render attribute so we can update on changes
      htmlTag.removeAttribute(ssrAttribute);
    }
  }
}

function _refresh (options) {
  if ( options === void 0 ) options = {};

  /**
   * When called, will update the current meta info with new meta info.
   * Useful when updating meta info as the result of an asynchronous
   * action that resolves after the initial render takes place.
   *
   * Credit to [Sébastien Chopin](https://github.com/Atinux) for the suggestion
   * to implement this method.
   *
   * @return {Object} - new meta info
   */
  return function refresh () {
    var info = _getMetaInfo(options)(this.$root);
    _updateClientMetaInfo(options)(info);
    return info
  }
}

function _$meta (options) {
  if ( options === void 0 ) options = {};

  /**
   * Returns an injector for server-side rendering.
   * @this {Object} - the Vue instance (a root component)
   * @return {Object} - injector
   */
  return function $meta () {
    return {
      inject: _inject(options).bind(this),
      refresh: _refresh(options).bind(this)
    }
  }
}

// fallback to timers if rAF not present
var stopUpdate = (typeof window !== 'undefined' ? window.cancelAnimationFrame : null) || clearTimeout;
var startUpdate = (typeof window !== 'undefined' ? window.requestAnimationFrame : null) || (function (cb) { return setTimeout(cb, 0); });

/**
 * Performs a batched update. Uses requestAnimationFrame to prevent
 * calling a function too many times in quick succession.
 * You need to pass it an ID (which can initially be `null`),
 * but be sure to overwrite that ID with the return value of batchUpdate.
 *
 * @param  {(null|Number)} id - the ID of this update
 * @param  {Function} callback - the update to perform
 * @return {Number} id - a new ID
 */
function batchUpdate (id, callback) {
  stopUpdate(id);
  return startUpdate(function () {
    id = null;
    callback();
  })
}

/**
 * These are constant variables used throughout the application.
 */

// This is the name of the component option that contains all the information that
// gets converted to the various meta tags & attributes for the page.
var VUE_META_KEY_NAME = 'metaInfo';

// This is the attribute vue-meta augments on elements to know which it should
// manage and which it should ignore.
var VUE_META_ATTRIBUTE = 'data-vue-meta';

// This is the attribute that goes on the `html` tag to inform `vue-meta`
// that the server has already generated the meta tags for the initial render.
var VUE_META_SERVER_RENDERED_ATTRIBUTE = 'data-vue-meta-server-rendered';

// This is the property that tells vue-meta to overwrite (instead of append)
// an item in a tag list. For example, if you have two `meta` tag list items
// that both have `vmid` of "description", then vue-meta will overwrite the
// shallowest one with the deepest one.
var VUE_META_TAG_LIST_ID_KEY_NAME = 'vmid';

// automatic install
if (typeof Vue !== 'undefined') {
  Vue.use(VueMeta);
}

/**
 * Plugin install function.
 * @param {Function} Vue - the Vue constructor.
 */
function VueMeta (Vue, options) {
  if ( options === void 0 ) options = {};

  // set some default options
  var defaultOptions = {
    keyName: VUE_META_KEY_NAME,
    attribute: VUE_META_ATTRIBUTE,
    ssrAttribute: VUE_META_SERVER_RENDERED_ATTRIBUTE,
    tagIDKeyName: VUE_META_TAG_LIST_ID_KEY_NAME
  };
  // combine options
  options = index(defaultOptions, options);

  // bind the $meta method to this component instance
  Vue.prototype.$meta = _$meta(options);

  // store an id to keep track of DOM updates
  var batchID = null;

  // watch for client side component updates
  Vue.mixin({
    beforeCreate: function beforeCreate () {
      // Add a marker to know if it uses metaInfo
      if (typeof this.$options[options.keyName] !== 'undefined') {
        this._hasMetaInfo = true;
      }
      // coerce function-style metaInfo to a computed prop so we can observe
      // it on creation
      if (typeof this.$options[options.keyName] === 'function') {
        if (typeof this.$options.computed === 'undefined') {
          this.$options.computed = {};
        }
        this.$options.computed.$metaInfo = this.$options[options.keyName];
      }
    },
    created: function created () {
      var this$1 = this;

      // if computed $metaInfo exists, watch it for updates & trigger a refresh
      // when it changes (i.e. automatically handle async actions that affect metaInfo)
      // credit for this suggestion goes to [Sébastien Chopin](https://github.com/Atinux)
      if (this.$metaInfo) {
        this.$watch('$metaInfo', function () {
          // batch potential DOM updates to prevent extraneous re-rendering
          batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
        });
      }
    },
    beforeMount: function beforeMount () {
      var this$1 = this;

      // batch potential DOM updates to prevent extraneous re-rendering
      if (this._hasMetaInfo) {
        batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
      }
    },
    destroyed: function destroyed () {
      var this$1 = this;

      // do not trigger refresh on the server side
      if (this.$isServer) { return }
      // re-render meta data when returning from a child component to parent
      if (this._hasMetaInfo) {
        batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
      }
    }
  });
}

var version = "1.0.4";

VueMeta.version = version;

return VueMeta;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(17);

var _vuex2 = _interopRequireDefault(_vuex);

var _state = __webpack_require__(18);

var _state2 = _interopRequireDefault(_state);

var _actions = __webpack_require__(19);

var _actions2 = _interopRequireDefault(_actions);

var _mutations = __webpack_require__(20);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default); // Vuex vault


var myAppData = new _vuex2.default.Store({
  state: _state2.default,
  mutations: _mutations2.default,
  actions: _actions2.default
});

// test
myAppData.commit('increment');

exports.default = myAppData;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {
  result: 0
};

exports.default = state;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var actions = {
  increment: function increment(context) {
    context.commit('increment');
  },
  decrement: function decrement(context) {
    context.commit('decrement');
  }
};

exports.default = actions;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mutations = {
  increment: function increment(state) {
    state.result += 1;
  },
  decrement: function decrement(state) {
    state.result -= 1;
  }
};

exports.default = mutations;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99ecdc1c_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__ = __webpack_require__(27);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var normalizeComponent = __webpack_require__(25)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-99ecdc1c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99ecdc1c_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\component.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] component.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(7)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-99ecdc1c", Component.options)
  } else {
    hotAPI.reload("data-v-99ecdc1c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(23)("66a8eeb1", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(4, function() {
     var newContent = __webpack_require__(4);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(24)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'custom-component',
    data: function data() {
        return {

            path: 'https://raw.githubusercontent.com/tehaiks/webSpring-Vue/master/src/components/component.vue',
            title: 'Imported Goodies',
            content: 'This is a single file <strong>.Vue</strong> component'

        };
    },
    mounted: function mounted() {

        console.log('component loaded!');
    },
    methods: {}
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    attrs: {
      "href": _vm.path,
      "title": "Single File Vue Components"
    }
  }, [_c('article', {
    staticClass: "message"
  }, [_c('div', {
    staticClass: "message-header"
  }, [_c('p', [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('div', {
    staticClass: "message-body",
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])])
}
var staticRenderFns = []
render._withStripped = true
/* harmony default export */ __webpack_exports__["a"] = ({ render: render, staticRenderFns: staticRenderFns });
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(7).rerender("data-v-99ecdc1c", module.exports)
  }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);