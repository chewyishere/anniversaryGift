/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "ed9fa36a242600c1a9f7"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (!installedModules[request].parents.includes(moduleId))
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (!me.children.includes(request)) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
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
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
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
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
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
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
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
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
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
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
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
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.includes(parentId)) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
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
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (!a.includes(item)) a.push(item);
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
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
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
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
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
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.includes(cb)) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "assets/js";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process, global) {/*!\n * @overview es6-promise - a tiny implementation of Promises/A+.\n * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)\n * @license   Licensed under MIT license\n *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE\n * @version   v4.2.4+314e4831\n */\n\n(function (global, factory) {\n\t true ? module.exports = factory() :\n\tundefined;\n}(this, (function () { 'use strict';\n\nfunction objectOrFunction(x) {\n  var type = typeof x;\n  return x !== null && (type === 'object' || type === 'function');\n}\n\nfunction isFunction(x) {\n  return typeof x === 'function';\n}\n\n\n\nvar _isArray = void 0;\nif (Array.isArray) {\n  _isArray = Array.isArray;\n} else {\n  _isArray = function (x) {\n    return Object.prototype.toString.call(x) === '[object Array]';\n  };\n}\n\nvar isArray = _isArray;\n\nvar len = 0;\nvar vertxNext = void 0;\nvar customSchedulerFn = void 0;\n\nvar asap = function asap(callback, arg) {\n  queue[len] = callback;\n  queue[len + 1] = arg;\n  len += 2;\n  if (len === 2) {\n    // If len is 2, that means that we need to schedule an async flush.\n    // If additional callbacks are queued before the queue is flushed, they\n    // will be processed by this flush that we are scheduling.\n    if (customSchedulerFn) {\n      customSchedulerFn(flush);\n    } else {\n      scheduleFlush();\n    }\n  }\n};\n\nfunction setScheduler(scheduleFn) {\n  customSchedulerFn = scheduleFn;\n}\n\nfunction setAsap(asapFn) {\n  asap = asapFn;\n}\n\nvar browserWindow = typeof window !== 'undefined' ? window : undefined;\nvar browserGlobal = browserWindow || {};\nvar BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;\nvar isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';\n\n// test for web worker but not in IE10\nvar isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';\n\n// node\nfunction useNextTick() {\n  // node version 0.10.x displays a deprecation warning when nextTick is used recursively\n  // see https://github.com/cujojs/when/issues/410 for details\n  return function () {\n    return process.nextTick(flush);\n  };\n}\n\n// vertx\nfunction useVertxTimer() {\n  if (typeof vertxNext !== 'undefined') {\n    return function () {\n      vertxNext(flush);\n    };\n  }\n\n  return useSetTimeout();\n}\n\nfunction useMutationObserver() {\n  var iterations = 0;\n  var observer = new BrowserMutationObserver(flush);\n  var node = document.createTextNode('');\n  observer.observe(node, { characterData: true });\n\n  return function () {\n    node.data = iterations = ++iterations % 2;\n  };\n}\n\n// web worker\nfunction useMessageChannel() {\n  var channel = new MessageChannel();\n  channel.port1.onmessage = flush;\n  return function () {\n    return channel.port2.postMessage(0);\n  };\n}\n\nfunction useSetTimeout() {\n  // Store setTimeout reference so es6-promise will be unaffected by\n  // other code modifying setTimeout (like sinon.useFakeTimers())\n  var globalSetTimeout = setTimeout;\n  return function () {\n    return globalSetTimeout(flush, 1);\n  };\n}\n\nvar queue = new Array(1000);\nfunction flush() {\n  for (var i = 0; i < len; i += 2) {\n    var callback = queue[i];\n    var arg = queue[i + 1];\n\n    callback(arg);\n\n    queue[i] = undefined;\n    queue[i + 1] = undefined;\n  }\n\n  len = 0;\n}\n\nfunction attemptVertx() {\n  try {\n    var vertx = Function('return this')().require('vertx');\n    vertxNext = vertx.runOnLoop || vertx.runOnContext;\n    return useVertxTimer();\n  } catch (e) {\n    return useSetTimeout();\n  }\n}\n\nvar scheduleFlush = void 0;\n// Decide what async method to use to triggering processing of queued callbacks:\nif (isNode) {\n  scheduleFlush = useNextTick();\n} else if (BrowserMutationObserver) {\n  scheduleFlush = useMutationObserver();\n} else if (isWorker) {\n  scheduleFlush = useMessageChannel();\n} else if (browserWindow === undefined && \"function\" === 'function') {\n  scheduleFlush = attemptVertx();\n} else {\n  scheduleFlush = useSetTimeout();\n}\n\nfunction then(onFulfillment, onRejection) {\n  var parent = this;\n\n  var child = new this.constructor(noop);\n\n  if (child[PROMISE_ID] === undefined) {\n    makePromise(child);\n  }\n\n  var _state = parent._state;\n\n\n  if (_state) {\n    var callback = arguments[_state - 1];\n    asap(function () {\n      return invokeCallback(_state, child, callback, parent._result);\n    });\n  } else {\n    subscribe(parent, child, onFulfillment, onRejection);\n  }\n\n  return child;\n}\n\n/**\n  `Promise.resolve` returns a promise that will become resolved with the\n  passed `value`. It is shorthand for the following:\n\n  ```javascript\n  let promise = new Promise(function(resolve, reject){\n    resolve(1);\n  });\n\n  promise.then(function(value){\n    // value === 1\n  });\n  ```\n\n  Instead of writing the above, your code now simply becomes the following:\n\n  ```javascript\n  let promise = Promise.resolve(1);\n\n  promise.then(function(value){\n    // value === 1\n  });\n  ```\n\n  @method resolve\n  @static\n  @param {Any} value value that the returned promise will be resolved with\n  Useful for tooling.\n  @return {Promise} a promise that will become fulfilled with the given\n  `value`\n*/\nfunction resolve$1(object) {\n  /*jshint validthis:true */\n  var Constructor = this;\n\n  if (object && typeof object === 'object' && object.constructor === Constructor) {\n    return object;\n  }\n\n  var promise = new Constructor(noop);\n  resolve(promise, object);\n  return promise;\n}\n\nvar PROMISE_ID = Math.random().toString(36).substring(2);\n\nfunction noop() {}\n\nvar PENDING = void 0;\nvar FULFILLED = 1;\nvar REJECTED = 2;\n\nvar TRY_CATCH_ERROR = { error: null };\n\nfunction selfFulfillment() {\n  return new TypeError(\"You cannot resolve a promise with itself\");\n}\n\nfunction cannotReturnOwn() {\n  return new TypeError('A promises callback cannot return that same promise.');\n}\n\nfunction getThen(promise) {\n  try {\n    return promise.then;\n  } catch (error) {\n    TRY_CATCH_ERROR.error = error;\n    return TRY_CATCH_ERROR;\n  }\n}\n\nfunction tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {\n  try {\n    then$$1.call(value, fulfillmentHandler, rejectionHandler);\n  } catch (e) {\n    return e;\n  }\n}\n\nfunction handleForeignThenable(promise, thenable, then$$1) {\n  asap(function (promise) {\n    var sealed = false;\n    var error = tryThen(then$$1, thenable, function (value) {\n      if (sealed) {\n        return;\n      }\n      sealed = true;\n      if (thenable !== value) {\n        resolve(promise, value);\n      } else {\n        fulfill(promise, value);\n      }\n    }, function (reason) {\n      if (sealed) {\n        return;\n      }\n      sealed = true;\n\n      reject(promise, reason);\n    }, 'Settle: ' + (promise._label || ' unknown promise'));\n\n    if (!sealed && error) {\n      sealed = true;\n      reject(promise, error);\n    }\n  }, promise);\n}\n\nfunction handleOwnThenable(promise, thenable) {\n  if (thenable._state === FULFILLED) {\n    fulfill(promise, thenable._result);\n  } else if (thenable._state === REJECTED) {\n    reject(promise, thenable._result);\n  } else {\n    subscribe(thenable, undefined, function (value) {\n      return resolve(promise, value);\n    }, function (reason) {\n      return reject(promise, reason);\n    });\n  }\n}\n\nfunction handleMaybeThenable(promise, maybeThenable, then$$1) {\n  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {\n    handleOwnThenable(promise, maybeThenable);\n  } else {\n    if (then$$1 === TRY_CATCH_ERROR) {\n      reject(promise, TRY_CATCH_ERROR.error);\n      TRY_CATCH_ERROR.error = null;\n    } else if (then$$1 === undefined) {\n      fulfill(promise, maybeThenable);\n    } else if (isFunction(then$$1)) {\n      handleForeignThenable(promise, maybeThenable, then$$1);\n    } else {\n      fulfill(promise, maybeThenable);\n    }\n  }\n}\n\nfunction resolve(promise, value) {\n  if (promise === value) {\n    reject(promise, selfFulfillment());\n  } else if (objectOrFunction(value)) {\n    handleMaybeThenable(promise, value, getThen(value));\n  } else {\n    fulfill(promise, value);\n  }\n}\n\nfunction publishRejection(promise) {\n  if (promise._onerror) {\n    promise._onerror(promise._result);\n  }\n\n  publish(promise);\n}\n\nfunction fulfill(promise, value) {\n  if (promise._state !== PENDING) {\n    return;\n  }\n\n  promise._result = value;\n  promise._state = FULFILLED;\n\n  if (promise._subscribers.length !== 0) {\n    asap(publish, promise);\n  }\n}\n\nfunction reject(promise, reason) {\n  if (promise._state !== PENDING) {\n    return;\n  }\n  promise._state = REJECTED;\n  promise._result = reason;\n\n  asap(publishRejection, promise);\n}\n\nfunction subscribe(parent, child, onFulfillment, onRejection) {\n  var _subscribers = parent._subscribers;\n  var length = _subscribers.length;\n\n\n  parent._onerror = null;\n\n  _subscribers[length] = child;\n  _subscribers[length + FULFILLED] = onFulfillment;\n  _subscribers[length + REJECTED] = onRejection;\n\n  if (length === 0 && parent._state) {\n    asap(publish, parent);\n  }\n}\n\nfunction publish(promise) {\n  var subscribers = promise._subscribers;\n  var settled = promise._state;\n\n  if (subscribers.length === 0) {\n    return;\n  }\n\n  var child = void 0,\n      callback = void 0,\n      detail = promise._result;\n\n  for (var i = 0; i < subscribers.length; i += 3) {\n    child = subscribers[i];\n    callback = subscribers[i + settled];\n\n    if (child) {\n      invokeCallback(settled, child, callback, detail);\n    } else {\n      callback(detail);\n    }\n  }\n\n  promise._subscribers.length = 0;\n}\n\nfunction tryCatch(callback, detail) {\n  try {\n    return callback(detail);\n  } catch (e) {\n    TRY_CATCH_ERROR.error = e;\n    return TRY_CATCH_ERROR;\n  }\n}\n\nfunction invokeCallback(settled, promise, callback, detail) {\n  var hasCallback = isFunction(callback),\n      value = void 0,\n      error = void 0,\n      succeeded = void 0,\n      failed = void 0;\n\n  if (hasCallback) {\n    value = tryCatch(callback, detail);\n\n    if (value === TRY_CATCH_ERROR) {\n      failed = true;\n      error = value.error;\n      value.error = null;\n    } else {\n      succeeded = true;\n    }\n\n    if (promise === value) {\n      reject(promise, cannotReturnOwn());\n      return;\n    }\n  } else {\n    value = detail;\n    succeeded = true;\n  }\n\n  if (promise._state !== PENDING) {\n    // noop\n  } else if (hasCallback && succeeded) {\n    resolve(promise, value);\n  } else if (failed) {\n    reject(promise, error);\n  } else if (settled === FULFILLED) {\n    fulfill(promise, value);\n  } else if (settled === REJECTED) {\n    reject(promise, value);\n  }\n}\n\nfunction initializePromise(promise, resolver) {\n  try {\n    resolver(function resolvePromise(value) {\n      resolve(promise, value);\n    }, function rejectPromise(reason) {\n      reject(promise, reason);\n    });\n  } catch (e) {\n    reject(promise, e);\n  }\n}\n\nvar id = 0;\nfunction nextId() {\n  return id++;\n}\n\nfunction makePromise(promise) {\n  promise[PROMISE_ID] = id++;\n  promise._state = undefined;\n  promise._result = undefined;\n  promise._subscribers = [];\n}\n\nfunction validationError() {\n  return new Error('Array Methods must be provided an Array');\n}\n\nvar Enumerator = function () {\n  function Enumerator(Constructor, input) {\n    this._instanceConstructor = Constructor;\n    this.promise = new Constructor(noop);\n\n    if (!this.promise[PROMISE_ID]) {\n      makePromise(this.promise);\n    }\n\n    if (isArray(input)) {\n      this.length = input.length;\n      this._remaining = input.length;\n\n      this._result = new Array(this.length);\n\n      if (this.length === 0) {\n        fulfill(this.promise, this._result);\n      } else {\n        this.length = this.length || 0;\n        this._enumerate(input);\n        if (this._remaining === 0) {\n          fulfill(this.promise, this._result);\n        }\n      }\n    } else {\n      reject(this.promise, validationError());\n    }\n  }\n\n  Enumerator.prototype._enumerate = function _enumerate(input) {\n    for (var i = 0; this._state === PENDING && i < input.length; i++) {\n      this._eachEntry(input[i], i);\n    }\n  };\n\n  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {\n    var c = this._instanceConstructor;\n    var resolve$$1 = c.resolve;\n\n\n    if (resolve$$1 === resolve$1) {\n      var _then = getThen(entry);\n\n      if (_then === then && entry._state !== PENDING) {\n        this._settledAt(entry._state, i, entry._result);\n      } else if (typeof _then !== 'function') {\n        this._remaining--;\n        this._result[i] = entry;\n      } else if (c === Promise$1) {\n        var promise = new c(noop);\n        handleMaybeThenable(promise, entry, _then);\n        this._willSettleAt(promise, i);\n      } else {\n        this._willSettleAt(new c(function (resolve$$1) {\n          return resolve$$1(entry);\n        }), i);\n      }\n    } else {\n      this._willSettleAt(resolve$$1(entry), i);\n    }\n  };\n\n  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {\n    var promise = this.promise;\n\n\n    if (promise._state === PENDING) {\n      this._remaining--;\n\n      if (state === REJECTED) {\n        reject(promise, value);\n      } else {\n        this._result[i] = value;\n      }\n    }\n\n    if (this._remaining === 0) {\n      fulfill(promise, this._result);\n    }\n  };\n\n  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {\n    var enumerator = this;\n\n    subscribe(promise, undefined, function (value) {\n      return enumerator._settledAt(FULFILLED, i, value);\n    }, function (reason) {\n      return enumerator._settledAt(REJECTED, i, reason);\n    });\n  };\n\n  return Enumerator;\n}();\n\n/**\n  `Promise.all` accepts an array of promises, and returns a new promise which\n  is fulfilled with an array of fulfillment values for the passed promises, or\n  rejected with the reason of the first passed promise to be rejected. It casts all\n  elements of the passed iterable to promises as it runs this algorithm.\n\n  Example:\n\n  ```javascript\n  let promise1 = resolve(1);\n  let promise2 = resolve(2);\n  let promise3 = resolve(3);\n  let promises = [ promise1, promise2, promise3 ];\n\n  Promise.all(promises).then(function(array){\n    // The array here would be [ 1, 2, 3 ];\n  });\n  ```\n\n  If any of the `promises` given to `all` are rejected, the first promise\n  that is rejected will be given as an argument to the returned promises's\n  rejection handler. For example:\n\n  Example:\n\n  ```javascript\n  let promise1 = resolve(1);\n  let promise2 = reject(new Error(\"2\"));\n  let promise3 = reject(new Error(\"3\"));\n  let promises = [ promise1, promise2, promise3 ];\n\n  Promise.all(promises).then(function(array){\n    // Code here never runs because there are rejected promises!\n  }, function(error) {\n    // error.message === \"2\"\n  });\n  ```\n\n  @method all\n  @static\n  @param {Array} entries array of promises\n  @param {String} label optional string for labeling the promise.\n  Useful for tooling.\n  @return {Promise} promise that is fulfilled when all `promises` have been\n  fulfilled, or rejected if any of them become rejected.\n  @static\n*/\nfunction all(entries) {\n  return new Enumerator(this, entries).promise;\n}\n\n/**\n  `Promise.race` returns a new promise which is settled in the same way as the\n  first passed promise to settle.\n\n  Example:\n\n  ```javascript\n  let promise1 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 1');\n    }, 200);\n  });\n\n  let promise2 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 2');\n    }, 100);\n  });\n\n  Promise.race([promise1, promise2]).then(function(result){\n    // result === 'promise 2' because it was resolved before promise1\n    // was resolved.\n  });\n  ```\n\n  `Promise.race` is deterministic in that only the state of the first\n  settled promise matters. For example, even if other promises given to the\n  `promises` array argument are resolved, but the first settled promise has\n  become rejected before the other promises became fulfilled, the returned\n  promise will become rejected:\n\n  ```javascript\n  let promise1 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 1');\n    }, 200);\n  });\n\n  let promise2 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      reject(new Error('promise 2'));\n    }, 100);\n  });\n\n  Promise.race([promise1, promise2]).then(function(result){\n    // Code here never runs\n  }, function(reason){\n    // reason.message === 'promise 2' because promise 2 became rejected before\n    // promise 1 became fulfilled\n  });\n  ```\n\n  An example real-world use case is implementing timeouts:\n\n  ```javascript\n  Promise.race([ajax('foo.json'), timeout(5000)])\n  ```\n\n  @method race\n  @static\n  @param {Array} promises array of promises to observe\n  Useful for tooling.\n  @return {Promise} a promise which settles in the same way as the first passed\n  promise to settle.\n*/\nfunction race(entries) {\n  /*jshint validthis:true */\n  var Constructor = this;\n\n  if (!isArray(entries)) {\n    return new Constructor(function (_, reject) {\n      return reject(new TypeError('You must pass an array to race.'));\n    });\n  } else {\n    return new Constructor(function (resolve, reject) {\n      var length = entries.length;\n      for (var i = 0; i < length; i++) {\n        Constructor.resolve(entries[i]).then(resolve, reject);\n      }\n    });\n  }\n}\n\n/**\n  `Promise.reject` returns a promise rejected with the passed `reason`.\n  It is shorthand for the following:\n\n  ```javascript\n  let promise = new Promise(function(resolve, reject){\n    reject(new Error('WHOOPS'));\n  });\n\n  promise.then(function(value){\n    // Code here doesn't run because the promise is rejected!\n  }, function(reason){\n    // reason.message === 'WHOOPS'\n  });\n  ```\n\n  Instead of writing the above, your code now simply becomes the following:\n\n  ```javascript\n  let promise = Promise.reject(new Error('WHOOPS'));\n\n  promise.then(function(value){\n    // Code here doesn't run because the promise is rejected!\n  }, function(reason){\n    // reason.message === 'WHOOPS'\n  });\n  ```\n\n  @method reject\n  @static\n  @param {Any} reason value that the returned promise will be rejected with.\n  Useful for tooling.\n  @return {Promise} a promise rejected with the given `reason`.\n*/\nfunction reject$1(reason) {\n  /*jshint validthis:true */\n  var Constructor = this;\n  var promise = new Constructor(noop);\n  reject(promise, reason);\n  return promise;\n}\n\nfunction needsResolver() {\n  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');\n}\n\nfunction needsNew() {\n  throw new TypeError(\"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.\");\n}\n\n/**\n  Promise objects represent the eventual result of an asynchronous operation. The\n  primary way of interacting with a promise is through its `then` method, which\n  registers callbacks to receive either a promise's eventual value or the reason\n  why the promise cannot be fulfilled.\n\n  Terminology\n  -----------\n\n  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.\n  - `thenable` is an object or function that defines a `then` method.\n  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).\n  - `exception` is a value that is thrown using the throw statement.\n  - `reason` is a value that indicates why a promise was rejected.\n  - `settled` the final resting state of a promise, fulfilled or rejected.\n\n  A promise can be in one of three states: pending, fulfilled, or rejected.\n\n  Promises that are fulfilled have a fulfillment value and are in the fulfilled\n  state.  Promises that are rejected have a rejection reason and are in the\n  rejected state.  A fulfillment value is never a thenable.\n\n  Promises can also be said to *resolve* a value.  If this value is also a\n  promise, then the original promise's settled state will match the value's\n  settled state.  So a promise that *resolves* a promise that rejects will\n  itself reject, and a promise that *resolves* a promise that fulfills will\n  itself fulfill.\n\n\n  Basic Usage:\n  ------------\n\n  ```js\n  let promise = new Promise(function(resolve, reject) {\n    // on success\n    resolve(value);\n\n    // on failure\n    reject(reason);\n  });\n\n  promise.then(function(value) {\n    // on fulfillment\n  }, function(reason) {\n    // on rejection\n  });\n  ```\n\n  Advanced Usage:\n  ---------------\n\n  Promises shine when abstracting away asynchronous interactions such as\n  `XMLHttpRequest`s.\n\n  ```js\n  function getJSON(url) {\n    return new Promise(function(resolve, reject){\n      let xhr = new XMLHttpRequest();\n\n      xhr.open('GET', url);\n      xhr.onreadystatechange = handler;\n      xhr.responseType = 'json';\n      xhr.setRequestHeader('Accept', 'application/json');\n      xhr.send();\n\n      function handler() {\n        if (this.readyState === this.DONE) {\n          if (this.status === 200) {\n            resolve(this.response);\n          } else {\n            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));\n          }\n        }\n      };\n    });\n  }\n\n  getJSON('/posts.json').then(function(json) {\n    // on fulfillment\n  }, function(reason) {\n    // on rejection\n  });\n  ```\n\n  Unlike callbacks, promises are great composable primitives.\n\n  ```js\n  Promise.all([\n    getJSON('/posts'),\n    getJSON('/comments')\n  ]).then(function(values){\n    values[0] // => postsJSON\n    values[1] // => commentsJSON\n\n    return values;\n  });\n  ```\n\n  @class Promise\n  @param {Function} resolver\n  Useful for tooling.\n  @constructor\n*/\n\nvar Promise$1 = function () {\n  function Promise(resolver) {\n    this[PROMISE_ID] = nextId();\n    this._result = this._state = undefined;\n    this._subscribers = [];\n\n    if (noop !== resolver) {\n      typeof resolver !== 'function' && needsResolver();\n      this instanceof Promise ? initializePromise(this, resolver) : needsNew();\n    }\n  }\n\n  /**\n  The primary way of interacting with a promise is through its `then` method,\n  which registers callbacks to receive either a promise's eventual value or the\n  reason why the promise cannot be fulfilled.\n   ```js\n  findUser().then(function(user){\n    // user is available\n  }, function(reason){\n    // user is unavailable, and you are given the reason why\n  });\n  ```\n   Chaining\n  --------\n   The return value of `then` is itself a promise.  This second, 'downstream'\n  promise is resolved with the return value of the first promise's fulfillment\n  or rejection handler, or rejected if the handler throws an exception.\n   ```js\n  findUser().then(function (user) {\n    return user.name;\n  }, function (reason) {\n    return 'default name';\n  }).then(function (userName) {\n    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it\n    // will be `'default name'`\n  });\n   findUser().then(function (user) {\n    throw new Error('Found user, but still unhappy');\n  }, function (reason) {\n    throw new Error('`findUser` rejected and we're unhappy');\n  }).then(function (value) {\n    // never reached\n  }, function (reason) {\n    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.\n    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.\n  });\n  ```\n  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.\n   ```js\n  findUser().then(function (user) {\n    throw new PedagogicalException('Upstream error');\n  }).then(function (value) {\n    // never reached\n  }).then(function (value) {\n    // never reached\n  }, function (reason) {\n    // The `PedgagocialException` is propagated all the way down to here\n  });\n  ```\n   Assimilation\n  ------------\n   Sometimes the value you want to propagate to a downstream promise can only be\n  retrieved asynchronously. This can be achieved by returning a promise in the\n  fulfillment or rejection handler. The downstream promise will then be pending\n  until the returned promise is settled. This is called *assimilation*.\n   ```js\n  findUser().then(function (user) {\n    return findCommentsByAuthor(user);\n  }).then(function (comments) {\n    // The user's comments are now available\n  });\n  ```\n   If the assimliated promise rejects, then the downstream promise will also reject.\n   ```js\n  findUser().then(function (user) {\n    return findCommentsByAuthor(user);\n  }).then(function (comments) {\n    // If `findCommentsByAuthor` fulfills, we'll have the value here\n  }, function (reason) {\n    // If `findCommentsByAuthor` rejects, we'll have the reason here\n  });\n  ```\n   Simple Example\n  --------------\n   Synchronous Example\n   ```javascript\n  let result;\n   try {\n    result = findResult();\n    // success\n  } catch(reason) {\n    // failure\n  }\n  ```\n   Errback Example\n   ```js\n  findResult(function(result, err){\n    if (err) {\n      // failure\n    } else {\n      // success\n    }\n  });\n  ```\n   Promise Example;\n   ```javascript\n  findResult().then(function(result){\n    // success\n  }, function(reason){\n    // failure\n  });\n  ```\n   Advanced Example\n  --------------\n   Synchronous Example\n   ```javascript\n  let author, books;\n   try {\n    author = findAuthor();\n    books  = findBooksByAuthor(author);\n    // success\n  } catch(reason) {\n    // failure\n  }\n  ```\n   Errback Example\n   ```js\n   function foundBooks(books) {\n   }\n   function failure(reason) {\n   }\n   findAuthor(function(author, err){\n    if (err) {\n      failure(err);\n      // failure\n    } else {\n      try {\n        findBoooksByAuthor(author, function(books, err) {\n          if (err) {\n            failure(err);\n          } else {\n            try {\n              foundBooks(books);\n            } catch(reason) {\n              failure(reason);\n            }\n          }\n        });\n      } catch(error) {\n        failure(err);\n      }\n      // success\n    }\n  });\n  ```\n   Promise Example;\n   ```javascript\n  findAuthor().\n    then(findBooksByAuthor).\n    then(function(books){\n      // found books\n  }).catch(function(reason){\n    // something went wrong\n  });\n  ```\n   @method then\n  @param {Function} onFulfilled\n  @param {Function} onRejected\n  Useful for tooling.\n  @return {Promise}\n  */\n\n  /**\n  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same\n  as the catch block of a try/catch statement.\n  ```js\n  function findAuthor(){\n  throw new Error('couldn't find that author');\n  }\n  // synchronous\n  try {\n  findAuthor();\n  } catch(reason) {\n  // something went wrong\n  }\n  // async with promises\n  findAuthor().catch(function(reason){\n  // something went wrong\n  });\n  ```\n  @method catch\n  @param {Function} onRejection\n  Useful for tooling.\n  @return {Promise}\n  */\n\n\n  Promise.prototype.catch = function _catch(onRejection) {\n    return this.then(null, onRejection);\n  };\n\n  /**\n    `finally` will be invoked regardless of the promise's fate just as native\n    try/catch/finally behaves\n  \n    Synchronous example:\n  \n    ```js\n    findAuthor() {\n      if (Math.random() > 0.5) {\n        throw new Error();\n      }\n      return new Author();\n    }\n  \n    try {\n      return findAuthor(); // succeed or fail\n    } catch(error) {\n      return findOtherAuther();\n    } finally {\n      // always runs\n      // doesn't affect the return value\n    }\n    ```\n  \n    Asynchronous example:\n  \n    ```js\n    findAuthor().catch(function(reason){\n      return findOtherAuther();\n    }).finally(function(){\n      // author was either found, or not\n    });\n    ```\n  \n    @method finally\n    @param {Function} callback\n    @return {Promise}\n  */\n\n\n  Promise.prototype.finally = function _finally(callback) {\n    var promise = this;\n    var constructor = promise.constructor;\n\n    return promise.then(function (value) {\n      return constructor.resolve(callback()).then(function () {\n        return value;\n      });\n    }, function (reason) {\n      return constructor.resolve(callback()).then(function () {\n        throw reason;\n      });\n    });\n  };\n\n  return Promise;\n}();\n\nPromise$1.prototype.then = then;\nPromise$1.all = all;\nPromise$1.race = race;\nPromise$1.resolve = resolve$1;\nPromise$1.reject = reject$1;\nPromise$1._setScheduler = setScheduler;\nPromise$1._setAsap = setAsap;\nPromise$1._asap = asap;\n\n/*global self*/\nfunction polyfill() {\n  var local = void 0;\n\n  if (typeof global !== 'undefined') {\n    local = global;\n  } else if (typeof self !== 'undefined') {\n    local = self;\n  } else {\n    try {\n      local = Function('return this')();\n    } catch (e) {\n      throw new Error('polyfill failed because global object is unavailable in this environment');\n    }\n  }\n\n  var P = local.Promise;\n\n  if (P) {\n    var promiseToString = null;\n    try {\n      promiseToString = Object.prototype.toString.call(P.resolve());\n    } catch (e) {\n      // silently ignored\n    }\n\n    if (promiseToString === '[object Promise]' && !P.cast) {\n      return;\n    }\n  }\n\n  local.Promise = Promise$1;\n}\n\n// Strange compat..\nPromise$1.polyfill = polyfill;\nPromise$1.Promise = Promise$1;\n\nreturn Promise$1;\n\n})));\n\n\n\n//# sourceMappingURL=es6-promise.map\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/es6-promise/dist/es6-promise.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! exports provided: WebGLRenderTargetCube, WebGLRenderTarget, WebGLRenderer, ShaderLib, UniformsLib, UniformsUtils, ShaderChunk, FogExp2, Fog, Scene, Sprite, LOD, SkinnedMesh, Skeleton, Bone, Mesh, LineSegments, LineLoop, Line, Points, Group, VideoTexture, DataTexture, CompressedTexture, CubeTexture, CanvasTexture, DepthTexture, Texture, CompressedTextureLoader, DataTextureLoader, CubeTextureLoader, TextureLoader, ObjectLoader, MaterialLoader, BufferGeometryLoader, DefaultLoadingManager, LoadingManager, JSONLoader, ImageLoader, ImageBitmapLoader, FontLoader, FileLoader, Loader, LoaderUtils, Cache, AudioLoader, SpotLightShadow, SpotLight, PointLight, RectAreaLight, HemisphereLight, DirectionalLightShadow, DirectionalLight, AmbientLight, LightShadow, Light, StereoCamera, PerspectiveCamera, OrthographicCamera, CubeCamera, ArrayCamera, Camera, AudioListener, PositionalAudio, AudioContext, AudioAnalyser, Audio, VectorKeyframeTrack, StringKeyframeTrack, QuaternionKeyframeTrack, NumberKeyframeTrack, ColorKeyframeTrack, BooleanKeyframeTrack, PropertyMixer, PropertyBinding, KeyframeTrack, AnimationUtils, AnimationObjectGroup, AnimationMixer, AnimationClip, Uniform, InstancedBufferGeometry, BufferGeometry, Geometry, InterleavedBufferAttribute, InstancedInterleavedBuffer, InterleavedBuffer, InstancedBufferAttribute, Face3, Object3D, Raycaster, Layers, EventDispatcher, Clock, QuaternionLinearInterpolant, LinearInterpolant, DiscreteInterpolant, CubicInterpolant, Interpolant, Triangle, Math, Spherical, Cylindrical, Plane, Frustum, Sphere, Ray, Matrix4, Matrix3, Box3, Box2, Line3, Euler, Vector4, Vector3, Vector2, Quaternion, Color, ImmediateRenderObject, VertexNormalsHelper, SpotLightHelper, SkeletonHelper, PointLightHelper, RectAreaLightHelper, HemisphereLightHelper, GridHelper, PolarGridHelper, FaceNormalsHelper, DirectionalLightHelper, CameraHelper, BoxHelper, Box3Helper, PlaneHelper, ArrowHelper, AxesHelper, Shape, Path, ShapePath, Font, CurvePath, Curve, ShapeUtils, WebGLUtils, WireframeGeometry, ParametricGeometry, ParametricBufferGeometry, TetrahedronGeometry, TetrahedronBufferGeometry, OctahedronGeometry, OctahedronBufferGeometry, IcosahedronGeometry, IcosahedronBufferGeometry, DodecahedronGeometry, DodecahedronBufferGeometry, PolyhedronGeometry, PolyhedronBufferGeometry, TubeGeometry, TubeBufferGeometry, TorusKnotGeometry, TorusKnotBufferGeometry, TorusGeometry, TorusBufferGeometry, TextGeometry, TextBufferGeometry, SphereGeometry, SphereBufferGeometry, RingGeometry, RingBufferGeometry, PlaneGeometry, PlaneBufferGeometry, LatheGeometry, LatheBufferGeometry, ShapeGeometry, ShapeBufferGeometry, ExtrudeGeometry, ExtrudeBufferGeometry, EdgesGeometry, ConeGeometry, ConeBufferGeometry, CylinderGeometry, CylinderBufferGeometry, CircleGeometry, CircleBufferGeometry, BoxGeometry, BoxBufferGeometry, ShadowMaterial, SpriteMaterial, RawShaderMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, LineDashedMaterial, LineBasicMaterial, Material, Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute, BufferAttribute, ArcCurve, CatmullRomCurve3, CubicBezierCurve, CubicBezierCurve3, EllipseCurve, LineCurve, LineCurve3, QuadraticBezierCurve, QuadraticBezierCurve3, SplineCurve, REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking, CubeGeometry, Face4, LineStrip, LinePieces, MeshFaceMaterial, MultiMaterial, PointCloud, Particle, ParticleSystem, PointCloudMaterial, ParticleBasicMaterial, ParticleSystemMaterial, Vertex, DynamicBufferAttribute, Int8Attribute, Uint8Attribute, Uint8ClampedAttribute, Int16Attribute, Uint16Attribute, Int32Attribute, Uint32Attribute, Float32Attribute, Float64Attribute, ClosedSplineCurve3, SplineCurve3, Spline, AxisHelper, BoundingBoxHelper, EdgesHelper, WireframeHelper, XHRLoader, BinaryTextureLoader, GeometryUtils, ImageUtils, Projector, CanvasRenderer, SceneUtils, LensFlare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./node_modules/tween.js/src/Tween.js":
/*!********************************************!*\
  !*** ./node_modules/tween.js/src/Tween.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Tween.js - Licensed under the MIT license\n * https://github.com/tweenjs/tween.js\n * ----------------------------------------------\n *\n * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.\n * Thank you all, you're awesome!\n */\n\nvar TWEEN = TWEEN || (function () {\n\n\tvar _tweens = [];\n\n\treturn {\n\n\t\tgetAll: function () {\n\n\t\t\treturn _tweens;\n\n\t\t},\n\n\t\tremoveAll: function () {\n\n\t\t\t_tweens = [];\n\n\t\t},\n\n\t\tadd: function (tween) {\n\n\t\t\t_tweens.push(tween);\n\n\t\t},\n\n\t\tremove: function (tween) {\n\n\t\t\tvar i = _tweens.indexOf(tween);\n\n\t\t\tif (i !== -1) {\n\t\t\t\t_tweens.splice(i, 1);\n\t\t\t}\n\n\t\t},\n\n\t\tupdate: function (time, preserve) {\n\n\t\t\tif (_tweens.length === 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tvar i = 0;\n\n\t\t\ttime = time !== undefined ? time : TWEEN.now();\n\n\t\t\twhile (i < _tweens.length) {\n\n\t\t\t\tif (_tweens[i].update(time) || preserve) {\n\t\t\t\t\ti++;\n\t\t\t\t} else {\n\t\t\t\t\t_tweens.splice(i, 1);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn true;\n\n\t\t}\n\t};\n\n})();\n\n\n// Include a performance.now polyfill.\n// In node.js, use process.hrtime.\nif (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {\n\tTWEEN.now = function () {\n\t\tvar time = process.hrtime();\n\n\t\t// Convert [seconds, nanoseconds] to milliseconds.\n\t\treturn time[0] * 1000 + time[1] / 1000000;\n\t};\n}\n// In a browser, use window.performance.now if it is available.\nelse if (typeof (window) !== 'undefined' &&\n         window.performance !== undefined &&\n\t\t window.performance.now !== undefined) {\n\t// This must be bound, because directly assigning this function\n\t// leads to an invocation exception in Chrome.\n\tTWEEN.now = window.performance.now.bind(window.performance);\n}\n// Use Date.now if it is available.\nelse if (Date.now !== undefined) {\n\tTWEEN.now = Date.now;\n}\n// Otherwise, use 'new Date().getTime()'.\nelse {\n\tTWEEN.now = function () {\n\t\treturn new Date().getTime();\n\t};\n}\n\n\nTWEEN.Tween = function (object) {\n\n\tvar _object = object;\n\tvar _valuesStart = {};\n\tvar _valuesEnd = {};\n\tvar _valuesStartRepeat = {};\n\tvar _duration = 1000;\n\tvar _repeat = 0;\n\tvar _repeatDelayTime;\n\tvar _yoyo = false;\n\tvar _isPlaying = false;\n\tvar _reversed = false;\n\tvar _delayTime = 0;\n\tvar _startTime = null;\n\tvar _easingFunction = TWEEN.Easing.Linear.None;\n\tvar _interpolationFunction = TWEEN.Interpolation.Linear;\n\tvar _chainedTweens = [];\n\tvar _onStartCallback = null;\n\tvar _onStartCallbackFired = false;\n\tvar _onUpdateCallback = null;\n\tvar _onCompleteCallback = null;\n\tvar _onStopCallback = null;\n\n\tthis.to = function (properties, duration) {\n\n\t\t_valuesEnd = properties;\n\n\t\tif (duration !== undefined) {\n\t\t\t_duration = duration;\n\t\t}\n\n\t\treturn this;\n\n\t};\n\n\tthis.start = function (time) {\n\n\t\tTWEEN.add(this);\n\n\t\t_isPlaying = true;\n\n\t\t_onStartCallbackFired = false;\n\n\t\t_startTime = time !== undefined ? time : TWEEN.now();\n\t\t_startTime += _delayTime;\n\n\t\tfor (var property in _valuesEnd) {\n\n\t\t\t// Check if an Array was provided as property value\n\t\t\tif (_valuesEnd[property] instanceof Array) {\n\n\t\t\t\tif (_valuesEnd[property].length === 0) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t// Create a local copy of the Array with the start value at the front\n\t\t\t\t_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);\n\n\t\t\t}\n\n\t\t\t// If `to()` specifies a property that doesn't exist in the source object,\n\t\t\t// we should not set that property in the object\n\t\t\tif (_object[property] === undefined) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// Save the starting value.\n\t\t\t_valuesStart[property] = _object[property];\n\n\t\t\tif ((_valuesStart[property] instanceof Array) === false) {\n\t\t\t\t_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings\n\t\t\t}\n\n\t\t\t_valuesStartRepeat[property] = _valuesStart[property] || 0;\n\n\t\t}\n\n\t\treturn this;\n\n\t};\n\n\tthis.stop = function () {\n\n\t\tif (!_isPlaying) {\n\t\t\treturn this;\n\t\t}\n\n\t\tTWEEN.remove(this);\n\t\t_isPlaying = false;\n\n\t\tif (_onStopCallback !== null) {\n\t\t\t_onStopCallback.call(_object, _object);\n\t\t}\n\n\t\tthis.stopChainedTweens();\n\t\treturn this;\n\n\t};\n\n\tthis.end = function () {\n\n\t\tthis.update(_startTime + _duration);\n\t\treturn this;\n\n\t};\n\n\tthis.stopChainedTweens = function () {\n\n\t\tfor (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {\n\t\t\t_chainedTweens[i].stop();\n\t\t}\n\n\t};\n\n\tthis.delay = function (amount) {\n\n\t\t_delayTime = amount;\n\t\treturn this;\n\n\t};\n\n\tthis.repeat = function (times) {\n\n\t\t_repeat = times;\n\t\treturn this;\n\n\t};\n\n\tthis.repeatDelay = function (amount) {\n\n\t\t_repeatDelayTime = amount;\n\t\treturn this;\n\n\t};\n\n\tthis.yoyo = function (yoyo) {\n\n\t\t_yoyo = yoyo;\n\t\treturn this;\n\n\t};\n\n\n\tthis.easing = function (easing) {\n\n\t\t_easingFunction = easing;\n\t\treturn this;\n\n\t};\n\n\tthis.interpolation = function (interpolation) {\n\n\t\t_interpolationFunction = interpolation;\n\t\treturn this;\n\n\t};\n\n\tthis.chain = function () {\n\n\t\t_chainedTweens = arguments;\n\t\treturn this;\n\n\t};\n\n\tthis.onStart = function (callback) {\n\n\t\t_onStartCallback = callback;\n\t\treturn this;\n\n\t};\n\n\tthis.onUpdate = function (callback) {\n\n\t\t_onUpdateCallback = callback;\n\t\treturn this;\n\n\t};\n\n\tthis.onComplete = function (callback) {\n\n\t\t_onCompleteCallback = callback;\n\t\treturn this;\n\n\t};\n\n\tthis.onStop = function (callback) {\n\n\t\t_onStopCallback = callback;\n\t\treturn this;\n\n\t};\n\n\tthis.update = function (time) {\n\n\t\tvar property;\n\t\tvar elapsed;\n\t\tvar value;\n\n\t\tif (time < _startTime) {\n\t\t\treturn true;\n\t\t}\n\n\t\tif (_onStartCallbackFired === false) {\n\n\t\t\tif (_onStartCallback !== null) {\n\t\t\t\t_onStartCallback.call(_object, _object);\n\t\t\t}\n\n\t\t\t_onStartCallbackFired = true;\n\t\t}\n\n\t\telapsed = (time - _startTime) / _duration;\n\t\telapsed = elapsed > 1 ? 1 : elapsed;\n\n\t\tvalue = _easingFunction(elapsed);\n\n\t\tfor (property in _valuesEnd) {\n\n\t\t\t// Don't update properties that do not exist in the source object\n\t\t\tif (_valuesStart[property] === undefined) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tvar start = _valuesStart[property] || 0;\n\t\t\tvar end = _valuesEnd[property];\n\n\t\t\tif (end instanceof Array) {\n\n\t\t\t\t_object[property] = _interpolationFunction(end, value);\n\n\t\t\t} else {\n\n\t\t\t\t// Parses relative end values with start as base (e.g.: +10, -3)\n\t\t\t\tif (typeof (end) === 'string') {\n\n\t\t\t\t\tif (end.charAt(0) === '+' || end.charAt(0) === '-') {\n\t\t\t\t\t\tend = start + parseFloat(end);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tend = parseFloat(end);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Protect against non numeric properties.\n\t\t\t\tif (typeof (end) === 'number') {\n\t\t\t\t\t_object[property] = start + (end - start) * value;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\tif (_onUpdateCallback !== null) {\n\t\t\t_onUpdateCallback.call(_object, value);\n\t\t}\n\n\t\tif (elapsed === 1) {\n\n\t\t\tif (_repeat > 0) {\n\n\t\t\t\tif (isFinite(_repeat)) {\n\t\t\t\t\t_repeat--;\n\t\t\t\t}\n\n\t\t\t\t// Reassign starting values, restart by making startTime = now\n\t\t\t\tfor (property in _valuesStartRepeat) {\n\n\t\t\t\t\tif (typeof (_valuesEnd[property]) === 'string') {\n\t\t\t\t\t\t_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (_yoyo) {\n\t\t\t\t\t\tvar tmp = _valuesStartRepeat[property];\n\n\t\t\t\t\t\t_valuesStartRepeat[property] = _valuesEnd[property];\n\t\t\t\t\t\t_valuesEnd[property] = tmp;\n\t\t\t\t\t}\n\n\t\t\t\t\t_valuesStart[property] = _valuesStartRepeat[property];\n\n\t\t\t\t}\n\n\t\t\t\tif (_yoyo) {\n\t\t\t\t\t_reversed = !_reversed;\n\t\t\t\t}\n\n\t\t\t\tif (_repeatDelayTime !== undefined) {\n\t\t\t\t\t_startTime = time + _repeatDelayTime;\n\t\t\t\t} else {\n\t\t\t\t\t_startTime = time + _delayTime;\n\t\t\t\t}\n\n\t\t\t\treturn true;\n\n\t\t\t} else {\n\n\t\t\t\tif (_onCompleteCallback !== null) {\n\n\t\t\t\t\t_onCompleteCallback.call(_object, _object);\n\t\t\t\t}\n\n\t\t\t\tfor (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {\n\t\t\t\t\t// Make the chained tweens start exactly at the time they should,\n\t\t\t\t\t// even if the `update()` method was called way past the duration of the tween\n\t\t\t\t\t_chainedTweens[i].start(_startTime + _duration);\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn true;\n\n\t};\n\n};\n\n\nTWEEN.Easing = {\n\n\tLinear: {\n\n\t\tNone: function (k) {\n\n\t\t\treturn k;\n\n\t\t}\n\n\t},\n\n\tQuadratic: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn k * k;\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn k * (2 - k);\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * k * k;\n\t\t\t}\n\n\t\t\treturn - 0.5 * (--k * (k - 2) - 1);\n\n\t\t}\n\n\t},\n\n\tCubic: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn k * k * k;\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn --k * k * k + 1;\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * k * k * k;\n\t\t\t}\n\n\t\t\treturn 0.5 * ((k -= 2) * k * k + 2);\n\n\t\t}\n\n\t},\n\n\tQuartic: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn k * k * k * k;\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn 1 - (--k * k * k * k);\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * k * k * k * k;\n\t\t\t}\n\n\t\t\treturn - 0.5 * ((k -= 2) * k * k * k - 2);\n\n\t\t}\n\n\t},\n\n\tQuintic: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn k * k * k * k * k;\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn --k * k * k * k * k + 1;\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * k * k * k * k * k;\n\t\t\t}\n\n\t\t\treturn 0.5 * ((k -= 2) * k * k * k * k + 2);\n\n\t\t}\n\n\t},\n\n\tSinusoidal: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn 1 - Math.cos(k * Math.PI / 2);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn Math.sin(k * Math.PI / 2);\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\treturn 0.5 * (1 - Math.cos(Math.PI * k));\n\n\t\t}\n\n\t},\n\n\tExponential: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn k === 0 ? 0 : Math.pow(1024, k - 1);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif (k === 0) {\n\t\t\t\treturn 0;\n\t\t\t}\n\n\t\t\tif (k === 1) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * Math.pow(1024, k - 1);\n\t\t\t}\n\n\t\t\treturn 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);\n\n\t\t}\n\n\t},\n\n\tCircular: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn 1 - Math.sqrt(1 - k * k);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\treturn Math.sqrt(1 - (--k * k));\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn - 0.5 * (Math.sqrt(1 - k * k) - 1);\n\t\t\t}\n\n\t\t\treturn 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);\n\n\t\t}\n\n\t},\n\n\tElastic: {\n\n\t\tIn: function (k) {\n\n\t\t\tif (k === 0) {\n\t\t\t\treturn 0;\n\t\t\t}\n\n\t\t\tif (k === 1) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\treturn -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\tif (k === 0) {\n\t\t\t\treturn 0;\n\t\t\t}\n\n\t\t\tif (k === 1) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\treturn Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif (k === 0) {\n\t\t\t\treturn 0;\n\t\t\t}\n\n\t\t\tif (k === 1) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\tk *= 2;\n\n\t\t\tif (k < 1) {\n\t\t\t\treturn -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);\n\t\t\t}\n\n\t\t\treturn 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;\n\n\t\t}\n\n\t},\n\n\tBack: {\n\n\t\tIn: function (k) {\n\n\t\t\tvar s = 1.70158;\n\n\t\t\treturn k * k * ((s + 1) * k - s);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\tvar s = 1.70158;\n\n\t\t\treturn --k * k * ((s + 1) * k + s) + 1;\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tvar s = 1.70158 * 1.525;\n\n\t\t\tif ((k *= 2) < 1) {\n\t\t\t\treturn 0.5 * (k * k * ((s + 1) * k - s));\n\t\t\t}\n\n\t\t\treturn 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);\n\n\t\t}\n\n\t},\n\n\tBounce: {\n\n\t\tIn: function (k) {\n\n\t\t\treturn 1 - TWEEN.Easing.Bounce.Out(1 - k);\n\n\t\t},\n\n\t\tOut: function (k) {\n\n\t\t\tif (k < (1 / 2.75)) {\n\t\t\t\treturn 7.5625 * k * k;\n\t\t\t} else if (k < (2 / 2.75)) {\n\t\t\t\treturn 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;\n\t\t\t} else if (k < (2.5 / 2.75)) {\n\t\t\t\treturn 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;\n\t\t\t} else {\n\t\t\t\treturn 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;\n\t\t\t}\n\n\t\t},\n\n\t\tInOut: function (k) {\n\n\t\t\tif (k < 0.5) {\n\t\t\t\treturn TWEEN.Easing.Bounce.In(k * 2) * 0.5;\n\t\t\t}\n\n\t\t\treturn TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;\n\n\t\t}\n\n\t}\n\n};\n\nTWEEN.Interpolation = {\n\n\tLinear: function (v, k) {\n\n\t\tvar m = v.length - 1;\n\t\tvar f = m * k;\n\t\tvar i = Math.floor(f);\n\t\tvar fn = TWEEN.Interpolation.Utils.Linear;\n\n\t\tif (k < 0) {\n\t\t\treturn fn(v[0], v[1], f);\n\t\t}\n\n\t\tif (k > 1) {\n\t\t\treturn fn(v[m], v[m - 1], m - f);\n\t\t}\n\n\t\treturn fn(v[i], v[i + 1 > m ? m : i + 1], f - i);\n\n\t},\n\n\tBezier: function (v, k) {\n\n\t\tvar b = 0;\n\t\tvar n = v.length - 1;\n\t\tvar pw = Math.pow;\n\t\tvar bn = TWEEN.Interpolation.Utils.Bernstein;\n\n\t\tfor (var i = 0; i <= n; i++) {\n\t\t\tb += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);\n\t\t}\n\n\t\treturn b;\n\n\t},\n\n\tCatmullRom: function (v, k) {\n\n\t\tvar m = v.length - 1;\n\t\tvar f = m * k;\n\t\tvar i = Math.floor(f);\n\t\tvar fn = TWEEN.Interpolation.Utils.CatmullRom;\n\n\t\tif (v[0] === v[m]) {\n\n\t\t\tif (k < 0) {\n\t\t\t\ti = Math.floor(f = m * (1 + k));\n\t\t\t}\n\n\t\t\treturn fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);\n\n\t\t} else {\n\n\t\t\tif (k < 0) {\n\t\t\t\treturn v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);\n\t\t\t}\n\n\t\t\tif (k > 1) {\n\t\t\t\treturn v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);\n\t\t\t}\n\n\t\t\treturn fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);\n\n\t\t}\n\n\t},\n\n\tUtils: {\n\n\t\tLinear: function (p0, p1, t) {\n\n\t\t\treturn (p1 - p0) * t + p0;\n\n\t\t},\n\n\t\tBernstein: function (n, i) {\n\n\t\t\tvar fc = TWEEN.Interpolation.Utils.Factorial;\n\n\t\t\treturn fc(n) / fc(i) / fc(n - i);\n\n\t\t},\n\n\t\tFactorial: (function () {\n\n\t\t\tvar a = [1];\n\n\t\t\treturn function (n) {\n\n\t\t\t\tvar s = 1;\n\n\t\t\t\tif (a[n]) {\n\t\t\t\t\treturn a[n];\n\t\t\t\t}\n\n\t\t\t\tfor (var i = n; i > 1; i--) {\n\t\t\t\t\ts *= i;\n\t\t\t\t}\n\n\t\t\t\ta[n] = s;\n\t\t\t\treturn s;\n\n\t\t\t};\n\n\t\t})(),\n\n\t\tCatmullRom: function (p0, p1, p2, p3, t) {\n\n\t\t\tvar v0 = (p2 - p0) * 0.5;\n\t\t\tvar v1 = (p3 - p1) * 0.5;\n\t\t\tvar t2 = t * t;\n\t\t\tvar t3 = t * t2;\n\n\t\t\treturn (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;\n\n\t\t}\n\n\t}\n\n};\n\n// UMD (Universal Module Definition)\n(function (root) {\n\n\tif (true) {\n\n\t\t// AMD\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n\t\t\treturn TWEEN;\n\t\t}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\t} else {}\n\n})(this);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/tween.js/src/Tween.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _config = __webpack_require__(/*! ./data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nvar _detector = __webpack_require__(/*! ./utils/detector */ \"./src/js/utils/detector.js\");\n\nvar _detector2 = _interopRequireDefault(_detector);\n\nvar _main = __webpack_require__(/*! ./app/main */ \"./src/js/app/main.js\");\n\nvar _main2 = _interopRequireDefault(_main);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Check environment and set the Config helper\nif (true) {\n  console.log('----- RUNNING IN DEV ENVIRONMENT! -----');\n\n  _config2.default.isDev = true;\n}\n\nfunction init() {\n  // Check for webGL capabilities\n  if (!_detector2.default.webgl) {\n    _detector2.default.addGetWebGLMessage();\n  } else {\n    var container = document.getElementById('appContainer');\n    new _main2.default(container);\n  }\n}\n\ninit();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/app/components/camera.js":
/*!*****************************************!*\
  !*** ./src/js/app/components/camera.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Class that creates and updates the main camera\nvar Camera = function () {\n  function Camera(renderer) {\n    var _this = this;\n\n    _classCallCheck(this, Camera);\n\n    var width = renderer.domElement.width;\n    var height = renderer.domElement.height;\n\n    // Create and position a Perspective Camera\n    this.threeCamera = new THREE.PerspectiveCamera(_config2.default.camera.fov, width / height, _config2.default.camera.near, _config2.default.camera.far);\n    this.threeCamera.position.set(_config2.default.camera.posX, _config2.default.camera.posY, _config2.default.camera.posZ);\n\n    // Initial sizing\n    this.updateSize(renderer);\n\n    // Listeners\n    window.addEventListener('resize', function () {\n      return _this.updateSize(renderer);\n    }, false);\n  }\n\n  _createClass(Camera, [{\n    key: 'updateSize',\n    value: function updateSize(renderer) {\n      // Multiply by dpr in case it is retina device\n      this.threeCamera.aspect = renderer.domElement.width * _config2.default.dpr / renderer.domElement.height * _config2.default.dpr;\n\n      // Always call updateProjectionMatrix on camera change\n      this.threeCamera.updateProjectionMatrix();\n    }\n  }]);\n\n  return Camera;\n}();\n\nexports.default = Camera;\n\n//# sourceURL=webpack:///./src/js/app/components/camera.js?");

/***/ }),

/***/ "./src/js/app/components/controls.js":
/*!*******************************************!*\
  !*** ./src/js/app/components/controls.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _orbitControls = __webpack_require__(/*! ../../utils/orbitControls */ \"./src/js/utils/orbitControls.js\");\n\nvar _orbitControls2 = _interopRequireDefault(_orbitControls);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Controls based on orbit controls\nvar Controls = function () {\n  function Controls(camera, container) {\n    _classCallCheck(this, Controls);\n\n    // Orbit controls first needs to pass in THREE to constructor\n    var orbitControls = new _orbitControls2.default(THREE);\n    this.threeControls = new orbitControls(camera, container);\n\n    this.init();\n  }\n\n  _createClass(Controls, [{\n    key: 'init',\n    value: function init() {\n      this.threeControls.target.set(_config2.default.controls.target.x, _config2.default.controls.target.y, _config2.default.controls.target.z);\n      this.threeControls.autoRotate = _config2.default.controls.autoRotate;\n      this.threeControls.autoRotateSpeed = _config2.default.controls.autoRotateSpeed;\n      this.threeControls.rotateSpeed = _config2.default.controls.rotateSpeed;\n      this.threeControls.zoomSpeed = _config2.default.controls.zoomSpeed;\n      this.threeControls.minDistance = _config2.default.controls.minDistance;\n      this.threeControls.maxDistance = _config2.default.controls.maxDistance;\n      this.threeControls.minPolarAngle = _config2.default.controls.minPolarAngle;\n      this.threeControls.maxPolarAngle = _config2.default.controls.maxPolarAngle;\n      this.threeControls.enableDamping = _config2.default.controls.enableDamping;\n      this.threeControls.enableZoom = _config2.default.controls.enableZoom;\n      this.threeControls.dampingFactor = _config2.default.controls.dampingFactor;\n    }\n  }]);\n\n  return Controls;\n}();\n\nexports.default = Controls;\n\n//# sourceURL=webpack:///./src/js/app/components/controls.js?");

/***/ }),

/***/ "./src/js/app/components/light.js":
/*!****************************************!*\
  !*** ./src/js/app/components/light.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Sets up and places all lights in scene\nvar Light = function () {\n  function Light(scene) {\n    _classCallCheck(this, Light);\n\n    this.scene = scene;\n\n    this.init();\n  }\n\n  _createClass(Light, [{\n    key: 'init',\n    value: function init() {\n      // Ambient\n      this.ambientLight = new THREE.AmbientLight(_config2.default.ambientLight.color);\n      this.ambientLight.visible = _config2.default.ambientLight.enabled;\n\n      // Point light\n      this.pointLight = new THREE.PointLight(_config2.default.pointLight.color, _config2.default.pointLight.intensity, _config2.default.pointLight.distance);\n      this.pointLight.position.set(_config2.default.pointLight.x, _config2.default.pointLight.y, _config2.default.pointLight.z);\n      this.pointLight.visible = _config2.default.pointLight.enabled;\n\n      // Directional light\n      this.directionalLight = new THREE.DirectionalLight(_config2.default.directionalLight.color, _config2.default.directionalLight.intensity);\n      this.directionalLight.position.set(_config2.default.directionalLight.x, _config2.default.directionalLight.y, _config2.default.directionalLight.z);\n      this.directionalLight.visible = _config2.default.directionalLight.enabled;\n\n      // Shadow map\n      this.directionalLight.castShadow = _config2.default.shadow.enabled;\n      this.directionalLight.shadow.bias = _config2.default.shadow.bias;\n      this.directionalLight.shadow.camera.near = _config2.default.shadow.near;\n      this.directionalLight.shadow.camera.far = _config2.default.shadow.far;\n      this.directionalLight.shadow.camera.left = _config2.default.shadow.left;\n      this.directionalLight.shadow.camera.right = _config2.default.shadow.right;\n      this.directionalLight.shadow.camera.top = _config2.default.shadow.top;\n      this.directionalLight.shadow.camera.bottom = _config2.default.shadow.bottom;\n      this.directionalLight.shadow.mapSize.width = _config2.default.shadow.mapWidth;\n      this.directionalLight.shadow.mapSize.height = _config2.default.shadow.mapHeight;\n\n      // Shadow camera helper\n      this.directionalLightHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);\n      this.directionalLightHelper.visible = _config2.default.shadow.helperEnabled;\n\n      // Hemisphere light\n      this.hemiLight = new THREE.HemisphereLight(_config2.default.hemiLight.color, _config2.default.hemiLight.groundColor, _config2.default.hemiLight.intensity);\n      this.hemiLight.position.set(_config2.default.hemiLight.x, _config2.default.hemiLight.y, _config2.default.hemiLight.z);\n      this.hemiLight.visible = _config2.default.hemiLight.enabled;\n    }\n  }, {\n    key: 'place',\n    value: function place(lightName) {\n      switch (lightName) {\n        case 'ambient':\n          this.scene.add(this.ambientLight);\n          break;\n\n        case 'directional':\n          this.scene.add(this.directionalLight);\n          this.scene.add(this.directionalLightHelper);\n          break;\n\n        case 'point':\n          this.scene.add(this.pointLight);\n          break;\n\n        case 'hemi':\n          this.scene.add(this.hemiLight);\n          break;\n      }\n    }\n  }]);\n\n  return Light;\n}();\n\nexports.default = Light;\n\n//# sourceURL=webpack:///./src/js/app/components/light.js?");

/***/ }),

/***/ "./src/js/app/components/renderer.js":
/*!*******************************************!*\
  !*** ./src/js/app/components/renderer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Main webGL renderer class\nvar Renderer = function () {\n  function Renderer(scene, container) {\n    var _this = this;\n\n    _classCallCheck(this, Renderer);\n\n    // Properties\n    this.scene = scene;\n    this.container = container;\n\n    // Create WebGL renderer and set its antialias\n    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true });\n\n    // Set clear color to fog to enable fog or to hex color for no fog\n    this.threeRenderer.setClearColor(scene.fog.color);\n    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina\n\n    // Appends canvas\n    container.appendChild(this.threeRenderer.domElement);\n\n    // Shadow map options\n    this.threeRenderer.shadowMap.enabled = true;\n    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;\n\n    // Get anisotropy for textures\n    _config2.default.maxAnisotropy = this.threeRenderer.getMaxAnisotropy();\n\n    // Initial size update set to canvas container\n    this.updateSize();\n\n    // Listeners\n    document.addEventListener('DOMContentLoaded', function () {\n      return _this.updateSize();\n    }, false);\n    window.addEventListener('resize', function () {\n      return _this.updateSize();\n    }, false);\n  }\n\n  _createClass(Renderer, [{\n    key: 'updateSize',\n    value: function updateSize() {\n      this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);\n    }\n  }, {\n    key: 'render',\n    value: function render(scene, camera) {\n      // Renders scene to canvas target\n      this.threeRenderer.render(scene, camera);\n    }\n  }]);\n\n  return Renderer;\n}();\n\nexports.default = Renderer;\n\n//# sourceURL=webpack:///./src/js/app/components/renderer.js?");

/***/ }),

/***/ "./src/js/app/helpers/geometry.js":
/*!****************************************!*\
  !*** ./src/js/app/helpers/geometry.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _material = __webpack_require__(/*! ./material */ \"./src/js/app/helpers/material.js\");\n\nvar _material2 = _interopRequireDefault(_material);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// This helper class can be used to create and then place geometry in the scene\nvar Geometry = function () {\n  function Geometry(scene) {\n    _classCallCheck(this, Geometry);\n\n    this.scene = scene;\n    this.geo = null;\n  }\n\n  _createClass(Geometry, [{\n    key: 'make',\n    value: function make(type) {\n      var _this = this;\n\n      if (type == 'plane') {\n        return function (width, height) {\n          var widthSegments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;\n          var heightSegments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;\n\n          _this.geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);\n        };\n      }\n\n      if (type == 'sphere') {\n        return function (radius) {\n          var widthSegments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;\n          var heightSegments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;\n\n          _this.geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);\n        };\n      }\n    }\n  }, {\n    key: 'place',\n    value: function place(position, rotation) {\n      var _mesh$position, _mesh$rotation;\n\n      var material = new _material2.default(0xeeeeee).standard;\n      var mesh = new THREE.Mesh(this.geo, material);\n\n      // Use ES6 spread to set position and rotation from passed in array\n      (_mesh$position = mesh.position).set.apply(_mesh$position, _toConsumableArray(position));\n      (_mesh$rotation = mesh.rotation).set.apply(_mesh$rotation, _toConsumableArray(rotation));\n\n      if (_config2.default.shadow.enabled) {\n        mesh.receiveShadow = true;\n      }\n\n      this.scene.add(mesh);\n    }\n  }]);\n\n  return Geometry;\n}();\n\nexports.default = Geometry;\n\n//# sourceURL=webpack:///./src/js/app/helpers/geometry.js?");

/***/ }),

/***/ "./src/js/app/helpers/material.js":
/*!****************************************!*\
  !*** ./src/js/app/helpers/material.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// USe this class as a helper to set up some default materials\nvar Material = function Material(color) {\n  _classCallCheck(this, Material);\n\n  this.basic = new THREE.MeshBasicMaterial({\n    color: color,\n    side: THREE.DoubleSide\n  });\n\n  this.standard = new THREE.MeshStandardMaterial({\n    color: color,\n    shading: THREE.FlatShading,\n    roughness: 1,\n    metalness: 0,\n    side: THREE.DoubleSide\n  });\n\n  this.wire = new THREE.MeshBasicMaterial({ wireframe: true });\n};\n\nexports.default = Material;\n\n//# sourceURL=webpack:///./src/js/app/helpers/material.js?");

/***/ }),

/***/ "./src/js/app/helpers/meshHelper.js":
/*!******************************************!*\
  !*** ./src/js/app/helpers/meshHelper.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Simple mesh helper that shows edges, wireframes, and face and vertex normals\nvar MeshHelper = function MeshHelper(scene, mesh) {\n  _classCallCheck(this, MeshHelper);\n\n  var wireframe = new THREE.WireframeGeometry(mesh.geometry);\n  var wireLine = new THREE.LineSegments(wireframe);\n  wireLine.material.depthTest = false;\n  wireLine.material.opacity = 0.25;\n  wireLine.material.transparent = true;\n  mesh.add(wireLine);\n\n  var edges = new THREE.EdgesGeometry(mesh.geometry);\n  var edgesLine = new THREE.LineSegments(edges);\n  edgesLine.material.depthTest = false;\n  edgesLine.material.opacity = 0.25;\n  edgesLine.material.transparent = true;\n  mesh.add(edgesLine);\n\n  scene.add(new THREE.BoxHelper(mesh));\n  scene.add(new THREE.FaceNormalsHelper(mesh, 2));\n  scene.add(new THREE.VertexNormalsHelper(mesh, 2));\n};\n\nexports.default = MeshHelper;\n\n//# sourceURL=webpack:///./src/js/app/helpers/meshHelper.js?");

/***/ }),

/***/ "./src/js/app/main.js":
/*!****************************!*\
  !*** ./src/js/app/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Global imports -\n\n\n// Local imports -\n// Components\n\n\n// Helpers\n\n\n// Model\n\n\n// Managers\n\n\n// data\n\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _tween = __webpack_require__(/*! tween.js */ \"./node_modules/tween.js/src/Tween.js\");\n\nvar _tween2 = _interopRequireDefault(_tween);\n\nvar _renderer = __webpack_require__(/*! ./components/renderer */ \"./src/js/app/components/renderer.js\");\n\nvar _renderer2 = _interopRequireDefault(_renderer);\n\nvar _camera = __webpack_require__(/*! ./components/camera */ \"./src/js/app/components/camera.js\");\n\nvar _camera2 = _interopRequireDefault(_camera);\n\nvar _light = __webpack_require__(/*! ./components/light */ \"./src/js/app/components/light.js\");\n\nvar _light2 = _interopRequireDefault(_light);\n\nvar _controls = __webpack_require__(/*! ./components/controls */ \"./src/js/app/components/controls.js\");\n\nvar _controls2 = _interopRequireDefault(_controls);\n\nvar _geometry = __webpack_require__(/*! ./helpers/geometry */ \"./src/js/app/helpers/geometry.js\");\n\nvar _geometry2 = _interopRequireDefault(_geometry);\n\nvar _texture = __webpack_require__(/*! ./model/texture */ \"./src/js/app/model/texture.js\");\n\nvar _texture2 = _interopRequireDefault(_texture);\n\nvar _model = __webpack_require__(/*! ./model/model */ \"./src/js/app/model/model.js\");\n\nvar _model2 = _interopRequireDefault(_model);\n\nvar _interaction = __webpack_require__(/*! ./managers/interaction */ \"./src/js/app/managers/interaction.js\");\n\nvar _interaction2 = _interopRequireDefault(_interaction);\n\nvar _datGUI = __webpack_require__(/*! ./managers/datGUI */ \"./src/js/app/managers/datGUI.js\");\n\nvar _datGUI2 = _interopRequireDefault(_datGUI);\n\nvar _config = __webpack_require__(/*! ./../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// -- End of imports\n\n// Local vars for rStats\nvar rS = void 0,\n    bS = void 0,\n    glS = void 0,\n    tS = void 0;\n\n// This class instantiates and ties all of the components together, starts the loading process and renders the main loop\n\nvar Main = function () {\n  function Main(container) {\n    var _this = this;\n\n    _classCallCheck(this, Main);\n\n    // Set container property to container element\n    this.container = container;\n\n    // Start Three clock\n    this.clock = new THREE.Clock();\n\n    // Main scene creation\n    this.scene = new THREE.Scene();\n    this.scene.fog = new THREE.FogExp2(_config2.default.fog.color, _config2.default.fog.near);\n\n    // Get Device Pixel Ratio first for retina\n    if (window.devicePixelRatio) {\n      _config2.default.dpr = window.devicePixelRatio;\n    }\n\n    // Main renderer instantiation\n    this.renderer = new _renderer2.default(this.scene, container);\n\n    // Components instantiation\n    this.camera = new _camera2.default(this.renderer.threeRenderer);\n    this.controls = new _controls2.default(this.camera.threeCamera, container);\n    this.light = new _light2.default(this.scene);\n\n    // Create and place lights in scene\n    var lights = ['ambient', 'directional', 'point', 'hemi'];\n    for (var i = 0; i < lights.length; i++) {\n      this.light.place(lights[i]);\n    }\n\n    // Create and place geo in scene\n    this.geometry = new _geometry2.default(this.scene);\n    this.geometry.make('plane')(150, 150, 10, 10);\n    this.geometry.place([0, -20, 0], [Math.PI / 2, 0, 0]);\n\n    // Set up rStats if dev environment\n    if (_config2.default.isDev) {\n      bS = new BrowserStats();\n      glS = new glStats();\n      tS = new threeStats(this.renderer.threeRenderer);\n\n      rS = new rStats({\n        CSSPath: './assets/css/',\n        userTimingAPI: true,\n        values: {\n          frame: { caption: 'Total frame time (ms)', over: 16, average: true, avgMs: 100 },\n          fps: { caption: 'Framerate (FPS)', below: 30 },\n          calls: { caption: 'Calls (three.js)', over: 3000 },\n          raf: { caption: 'Time since last rAF (ms)', average: true, avgMs: 100 },\n          rstats: { caption: 'rStats update (ms)', average: true, avgMs: 100 },\n          texture: { caption: 'GenTex', average: true, avgMs: 100 }\n        },\n        groups: [{ caption: 'Framerate', values: ['fps', 'raf'] }, { caption: 'Frame Budget', values: ['frame', 'texture', 'setup', 'render'] }],\n        fractions: [{ base: 'frame', steps: ['texture', 'setup', 'render'] }],\n        plugins: [bS, tS, glS]\n      });\n    }\n\n    // Instantiate texture class\n    this.texture = new _texture2.default();\n\n    // Start loading the textures and then go on to load the model after the texture Promises have resolved\n    this.texture.load().then(function () {\n      _this.manager = new THREE.LoadingManager();\n\n      // Textures loaded, load model\n      _this.model = new _model2.default(_this.scene, _this.manager, _this.texture.textures);\n      _this.model.load();\n\n      // onProgress callback\n      _this.manager.onProgress = function (item, loaded, total) {\n        console.log(item + ': ' + loaded + ' ' + total);\n      };\n\n      // All loaders done now\n      _this.manager.onLoad = function () {\n        // Set up interaction manager with the app now that the model is finished loading\n        new _interaction2.default(_this.renderer.threeRenderer, _this.scene, _this.camera.threeCamera, _this.controls.threeControls);\n\n        // Add dat.GUI controls if dev\n        if (_config2.default.isDev) {\n          new _datGUI2.default(_this, _this.model.obj);\n        }\n\n        // Everything is now fully loaded\n        _config2.default.isLoaded = true;\n        _this.container.querySelector('#loading').style.display = 'none';\n      };\n    });\n\n    // Start render which does not wait for model fully loaded\n    this.render();\n  }\n\n  _createClass(Main, [{\n    key: 'render',\n    value: function render() {\n      // Render rStats if Dev\n      if (_config2.default.isDev) {\n        rS('frame').start();\n        glS.start();\n\n        rS('rAF').tick();\n        rS('FPS').frame();\n\n        rS('render').start();\n      }\n\n      // Call render function and pass in created scene and camera\n      this.renderer.render(this.scene, this.camera.threeCamera);\n\n      // rStats has finished determining render call now\n      if (_config2.default.isDev) {\n        rS('render').end(); // render finished\n        rS('frame').end(); // frame finished\n\n        // Local rStats update\n        rS('rStats').start();\n        rS().update();\n        rS('rStats').end();\n      }\n\n      // Delta time is sometimes needed for certain updates\n      //const delta = this.clock.getDelta();\n\n      // Call any vendor or module updates here\n      _tween2.default.update();\n      this.controls.threeControls.update();\n\n      // RAF\n      requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object\n    }\n  }]);\n\n  return Main;\n}();\n\nexports.default = Main;\n\n//# sourceURL=webpack:///./src/js/app/main.js?");

/***/ }),

/***/ "./src/js/app/managers/datGUI.js":
/*!***************************************!*\
  !*** ./src/js/app/managers/datGUI.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Manages all dat.GUI interactions\nvar DatGUI = function DatGUI(main, mesh) {\n  var _this = this;\n\n  _classCallCheck(this, DatGUI);\n\n  var gui = new dat.GUI();\n\n  this.camera = main.camera.threeCamera;\n  this.controls = main.controls.threeControls;\n  this.light = main.light;\n\n  /* Global */\n  //gui.close();\n\n  /* Camera */\n  var cameraFolder = gui.addFolder('Camera');\n  var cameraFOVGui = cameraFolder.add(_config2.default.camera, 'fov', 0, 180).name('Camera FOV');\n  cameraFOVGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.camera.fov = value;\n  });\n  cameraFOVGui.onFinishChange(function () {\n    _this.camera.updateProjectionMatrix();\n\n    _this.controls.enableRotate = true;\n  });\n  var cameraAspectGui = cameraFolder.add(_config2.default.camera, 'aspect', 0, 4).name('Camera Aspect');\n  cameraAspectGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.camera.aspect = value;\n  });\n  cameraAspectGui.onFinishChange(function () {\n    _this.camera.updateProjectionMatrix();\n\n    _this.controls.enableRotate = true;\n  });\n  var cameraFogColorGui = cameraFolder.addColor(_config2.default.fog, 'color').name('Fog Color');\n  cameraFogColorGui.onChange(function (value) {\n    main.scene.fog.color.setHex(value);\n  });\n  var cameraFogNearGui = cameraFolder.add(_config2.default.fog, 'near', 0.000, 0.010).name('Fog Near');\n  cameraFogNearGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    main.scene.fog.density = value;\n  });\n  cameraFogNearGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n\n  /* Controls */\n  var controlsFolder = gui.addFolder('Controls');\n  controlsFolder.add(_config2.default.controls, 'autoRotate').name('Auto Rotate').onChange(function (value) {\n    _this.controls.autoRotate = value;\n  });\n  var controlsAutoRotateSpeedGui = controlsFolder.add(_config2.default.controls, 'autoRotateSpeed', -1, 1).name('Rotation Speed');\n  controlsAutoRotateSpeedGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n    _this.controls.autoRotateSpeed = value;\n  });\n  controlsAutoRotateSpeedGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n\n  /* Mesh */\n  var meshFolder = gui.addFolder('Mesh');\n  meshFolder.add(_config2.default.mesh, 'translucent', true).name('Translucent').onChange(function (value) {\n    if (value) {\n      mesh.material.transparent = true;\n      mesh.material.opacity = 0.5;\n    } else {\n      mesh.material.opacity = 1.0;\n    }\n  });\n  meshFolder.add(_config2.default.mesh, 'wireframe', true).name('Wireframe').onChange(function (value) {\n    mesh.material.wireframe = value;\n  });\n\n  /* Lights */\n  // Ambient Light\n  var ambientLightFolder = gui.addFolder('Ambient Light');\n  ambientLightFolder.add(_config2.default.ambientLight, 'enabled').name('Enabled').onChange(function (value) {\n    _this.light.ambientLight.visible = value;\n  });\n  ambientLightFolder.addColor(_config2.default.ambientLight, 'color').name('Color').onChange(function (value) {\n    _this.light.ambientLight.color.setHex(value);\n  });\n\n  // Directional Light\n  var directionalLightFolder = gui.addFolder('Directional Light');\n  directionalLightFolder.add(_config2.default.directionalLight, 'enabled').name('Enabled').onChange(function (value) {\n    _this.light.directionalLight.visible = value;\n  });\n  directionalLightFolder.addColor(_config2.default.directionalLight, 'color').name('Color').onChange(function (value) {\n    _this.light.directionalLight.color.setHex(value);\n  });\n  var directionalLightIntensityGui = directionalLightFolder.add(_config2.default.directionalLight, 'intensity', 0, 2).name('Intensity');\n  directionalLightIntensityGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.intensity = value;\n  });\n  directionalLightIntensityGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var directionalLightPositionXGui = directionalLightFolder.add(_config2.default.directionalLight, 'x', -1000, 1000).name('Position X');\n  directionalLightPositionXGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.position.x = value;\n  });\n  directionalLightPositionXGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var directionalLightPositionYGui = directionalLightFolder.add(_config2.default.directionalLight, 'y', -1000, 1000).name('Position Y');\n  directionalLightPositionYGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.position.y = value;\n  });\n  directionalLightPositionYGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var directionalLightPositionZGui = directionalLightFolder.add(_config2.default.directionalLight, 'z', -1000, 1000).name('Position Z');\n  directionalLightPositionZGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.position.z = value;\n  });\n  directionalLightPositionZGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n\n  // Shadow Map\n  var shadowFolder = gui.addFolder('Shadow Map');\n  shadowFolder.add(_config2.default.shadow, 'enabled').name('Enabled').onChange(function (value) {\n    _this.light.directionalLight.castShadow = value;\n  });\n  shadowFolder.add(_config2.default.shadow, 'helperEnabled').name('Helper Enabled').onChange(function (value) {\n    _this.light.directionalLightHelper.visible = value;\n  });\n  var shadowNearGui = shadowFolder.add(_config2.default.shadow, 'near', 0, 400).name('Near');\n  shadowNearGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.near = value;\n  });\n  shadowNearGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowFarGui = shadowFolder.add(_config2.default.shadow, 'far', 0, 1200).name('Far');\n  shadowFarGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.far = value;\n  });\n  shadowFarGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowTopGui = shadowFolder.add(_config2.default.shadow, 'top', -400, 400).name('Top');\n  shadowTopGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.top = value;\n  });\n  shadowTopGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowRightGui = shadowFolder.add(_config2.default.shadow, 'right', -400, 400).name('Right');\n  shadowRightGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.right = value;\n  });\n  shadowRightGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowBottomGui = shadowFolder.add(_config2.default.shadow, 'bottom', -400, 400).name('Bottom');\n  shadowBottomGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.bottom = value;\n  });\n  shadowBottomGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowLeftGui = shadowFolder.add(_config2.default.shadow, 'left', -400, 400).name('Left');\n  shadowLeftGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.camera.left = value;\n  });\n  shadowLeftGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n  var shadowBiasGui = shadowFolder.add(_config2.default.shadow, 'bias', -0.000010, 1).name('Bias');\n  shadowBiasGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.directionalLight.shadow.bias = value;\n  });\n  shadowBiasGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n    _this.light.directionalLight.shadow.map.dispose();\n    _this.light.directionalLight.shadow.map = null;\n    _this.light.directionalLightHelper.update();\n  });\n\n  // Point Light\n  var pointLightFolder = gui.addFolder('Point Light');\n  pointLightFolder.add(_config2.default.pointLight, 'enabled').name('Enabled').onChange(function (value) {\n    _this.light.pointLight.visible = value;\n  });\n  pointLightFolder.addColor(_config2.default.pointLight, 'color').name('Color').onChange(function (value) {\n    _this.light.pointLight.color.setHex(value);\n  });\n  var pointLightIntensityGui = pointLightFolder.add(_config2.default.pointLight, 'intensity', 0, 2).name('Intensity');\n  pointLightIntensityGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.pointLight.intensity = value;\n  });\n  pointLightIntensityGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var pointLightDistanceGui = pointLightFolder.add(_config2.default.pointLight, 'distance', 0, 1000).name('Distance');\n  pointLightDistanceGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.pointLight.distance = value;\n  });\n  pointLightDistanceGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var pointLightPositionXGui = pointLightFolder.add(_config2.default.pointLight, 'x', -1000, 1000).name('Position X');\n  pointLightPositionXGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.pointLight.position.x = value;\n  });\n  pointLightPositionXGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var pointLightPositionYGui = pointLightFolder.add(_config2.default.pointLight, 'y', -1000, 1000).name('Position Y');\n  pointLightPositionYGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.pointLight.position.y = value;\n  });\n  pointLightPositionYGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var pointLightPositionZGui = pointLightFolder.add(_config2.default.pointLight, 'z', -1000, 1000).name('Position Z');\n  pointLightPositionZGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.pointLight.position.z = value;\n  });\n  pointLightPositionZGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n\n  // Hemi Light\n  var hemiLightFolder = gui.addFolder('Hemi Light');\n  hemiLightFolder.add(_config2.default.hemiLight, 'enabled').name('Enabled').onChange(function (value) {\n    _this.light.hemiLight.visible = value;\n  });\n  hemiLightFolder.addColor(_config2.default.hemiLight, 'color').name('Color').onChange(function (value) {\n    _this.light.hemiLight.color.setHex(value);\n  });\n  hemiLightFolder.addColor(_config2.default.hemiLight, 'groundColor').name('ground Color').onChange(function (value) {\n    _this.light.hemiLight.groundColor.setHex(value);\n  });\n  var hemiLightIntensityGui = hemiLightFolder.add(_config2.default.hemiLight, 'intensity', 0, 2).name('Intensity');\n  hemiLightIntensityGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.hemiLight.intensity = value;\n  });\n  hemiLightIntensityGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var hemiLightPositionXGui = hemiLightFolder.add(_config2.default.hemiLight, 'x', -1000, 1000).name('Position X');\n  hemiLightPositionXGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.hemiLight.position.x = value;\n  });\n  hemiLightPositionXGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var hemiLightPositionYGui = hemiLightFolder.add(_config2.default.hemiLight, 'y', -500, 1000).name('Position Y');\n  hemiLightPositionYGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.hemiLight.position.y = value;\n  });\n  hemiLightPositionYGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n  var hemiLightPositionZGui = hemiLightFolder.add(_config2.default.hemiLight, 'z', -1000, 1000).name('Position Z');\n  hemiLightPositionZGui.onChange(function (value) {\n    _this.controls.enableRotate = false;\n\n    _this.light.hemiLight.position.z = value;\n  });\n  hemiLightPositionZGui.onFinishChange(function () {\n    _this.controls.enableRotate = true;\n  });\n};\n\nexports.default = DatGUI;\n\n//# sourceURL=webpack:///./src/js/app/managers/datGUI.js?");

/***/ }),

/***/ "./src/js/app/managers/interaction.js":
/*!********************************************!*\
  !*** ./src/js/app/managers/interaction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _keyboard = __webpack_require__(/*! ../../utils/keyboard */ \"./src/js/utils/keyboard.js\");\n\nvar _keyboard2 = _interopRequireDefault(_keyboard);\n\nvar _helpers = __webpack_require__(/*! ../../utils/helpers */ \"./src/js/utils/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Manages all input interactions\nvar Interaction = function () {\n  function Interaction(renderer, scene, camera, controls) {\n    var _this = this;\n\n    _classCallCheck(this, Interaction);\n\n    // Properties\n    this.renderer = renderer;\n    this.scene = scene;\n    this.camera = camera;\n    this.controls = controls;\n\n    this.timeout = null;\n\n    // Instantiate keyboard helper\n    this.keyboard = new _keyboard2.default();\n\n    // Listeners\n    // Mouse events\n    this.renderer.domElement.addEventListener('mousemove', function (event) {\n      return _helpers2.default.throttle(_this.onMouseMove(event), 250);\n    }, false);\n    this.renderer.domElement.addEventListener('mouseleave', function (event) {\n      return _this.onMouseLeave(event);\n    }, false);\n    this.renderer.domElement.addEventListener('mouseover', function (event) {\n      return _this.onMouseOver(event);\n    }, false);\n\n    // Keyboard events\n    this.keyboard.domElement.addEventListener('keydown', function (event) {\n      // Only once\n      if (event.repeat) {\n        return;\n      }\n\n      if (_this.keyboard.eventMatches(event, 'escape')) {\n        console.log('Escape pressed');\n      }\n    });\n  }\n\n  _createClass(Interaction, [{\n    key: 'onMouseOver',\n    value: function onMouseOver(event) {\n      event.preventDefault();\n\n      _config2.default.isMouseOver = true;\n    }\n  }, {\n    key: 'onMouseLeave',\n    value: function onMouseLeave(event) {\n      event.preventDefault();\n\n      _config2.default.isMouseOver = false;\n    }\n  }, {\n    key: 'onMouseMove',\n    value: function onMouseMove(event) {\n      event.preventDefault();\n\n      clearTimeout(this.timeout);\n\n      this.timeout = setTimeout(function () {\n        _config2.default.isMouseMoving = false;\n      }, 200);\n\n      _config2.default.isMouseMoving = true;\n    }\n  }]);\n\n  return Interaction;\n}();\n\nexports.default = Interaction;\n\n//# sourceURL=webpack:///./src/js/app/managers/interaction.js?");

/***/ }),

/***/ "./src/js/app/model/model.js":
/*!***********************************!*\
  !*** ./src/js/app/model/model.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _material = __webpack_require__(/*! ../helpers/material */ \"./src/js/app/helpers/material.js\");\n\nvar _material2 = _interopRequireDefault(_material);\n\nvar _meshHelper = __webpack_require__(/*! ../helpers/meshHelper */ \"./src/js/app/helpers/meshHelper.js\");\n\nvar _meshHelper2 = _interopRequireDefault(_meshHelper);\n\nvar _helpers = __webpack_require__(/*! ../../utils/helpers */ \"./src/js/utils/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Loads in a single object from the config file\nvar Model = function () {\n  function Model(scene, manager, textures) {\n    _classCallCheck(this, Model);\n\n    this.scene = scene;\n    this.textures = textures;\n\n    // Manager is passed in to loader to determine when loading done in main\n    this.loader = new THREE.ObjectLoader(manager);\n    this.obj = null;\n  }\n\n  _createClass(Model, [{\n    key: 'load',\n    value: function load() {\n      var _this = this;\n\n      // Load model with ObjectLoader\n      this.loader.load(_config2.default.model.path, function (obj) {\n        obj.traverse(function (child) {\n          if (child instanceof THREE.Mesh) {\n            // Create material for mesh and set its map to texture by name from preloaded textures\n            var material = new _material2.default(0xffffff).standard;\n            material.map = _this.textures.UV;\n            child.material = material;\n\n            // Set to cast and receive shadow if enabled\n            if (_config2.default.shadow.enabled) {\n              child.receiveShadow = true;\n              child.castShadow = true;\n            }\n          }\n        });\n\n        // Add mesh helper if Dev\n        if (_config2.default.isDev && _config2.default.mesh.enableHelper) {\n          new _meshHelper2.default(_this.scene, obj);\n        }\n\n        // Set prop to obj\n        _this.obj = obj;\n\n        obj.scale.multiplyScalar(_config2.default.model.scale);\n        _this.scene.add(obj);\n      }, _helpers2.default.logProgress(), _helpers2.default.logError());\n    }\n  }]);\n\n  return Model;\n}();\n\nexports.default = Model;\n\n//# sourceURL=webpack:///./src/js/app/model/model.js?");

/***/ }),

/***/ "./src/js/app/model/texture.js":
/*!*************************************!*\
  !*** ./src/js/app/model/texture.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n// Promise polyfill for IE\n\n\nvar _three = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar THREE = _interopRequireWildcard(_three);\n\nvar _es6Promise = __webpack_require__(/*! es6-promise */ \"./node_modules/es6-promise/dist/es6-promise.js\");\n\nvar _helpers = __webpack_require__(/*! ../../utils/helpers */ \"./src/js/utils/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nvar _config = __webpack_require__(/*! ../../data/config */ \"./src/js/data/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// This class preloads all textures in the imageFiles array in the Config via ES6 Promises.\n// Once all textures are done loading the model itself will be loaded after the Promise .then() callback.\n// Using promises to preload textures prevents issues when applying textures to materials\n// before the textures have loaded.\nvar Texture = function () {\n  function Texture() {\n    _classCallCheck(this, Texture);\n\n    // Prop that will contain all loaded textures\n    this.textures = {};\n  }\n\n  _createClass(Texture, [{\n    key: 'load',\n    value: function load() {\n      var _this = this;\n\n      var loader = new THREE.TextureLoader();\n      var maxAnisotropy = _config2.default.maxAnisotropy;\n      var imageFiles = _config2.default.texture.imageFiles;\n      var promiseArray = [];\n\n      loader.setPath(_config2.default.texture.path);\n\n      imageFiles.forEach(function (imageFile) {\n        // Add an individual Promise for each image in array\n        promiseArray.push(new _es6Promise.Promise(function (resolve, reject) {\n          // Each Promise will attempt to load the image file\n          loader.load(imageFile.image,\n          // This gets called on load with the loaded texture\n          function (texture) {\n            texture.anisotropy = maxAnisotropy;\n\n            // Resolve Promise with object of texture if it is instance of THREE.Texture\n            var modelOBJ = {};\n            modelOBJ[imageFile.name] = texture;\n            if (modelOBJ[imageFile.name] instanceof THREE.Texture) resolve(modelOBJ);\n          }, _helpers2.default.logProgress(), function (xhr) {\n            return reject(new Error(xhr + 'An error occurred loading while loading ' + imageFile.image));\n          });\n        }));\n      });\n\n      // Iterate through all Promises in array and return another Promise when all have resolved or console log reason when any reject\n      return _es6Promise.Promise.all(promiseArray).then(function (textures) {\n        // Set the textures prop object to have name be the resolved texture\n        for (var i = 0; i < textures.length; i++) {\n          _this.textures[Object.keys(textures[i])[0]] = textures[i][Object.keys(textures[i])[0]];\n        }\n      }, function (reason) {\n        return console.log(reason);\n      });\n    }\n  }]);\n\n  return Texture;\n}();\n\nexports.default = Texture;\n\n//# sourceURL=webpack:///./src/js/app/model/texture.js?");

/***/ }),

/***/ "./src/js/data/config.js":
/*!*******************************!*\
  !*** ./src/js/data/config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _tween = __webpack_require__(/*! tween.js */ \"./node_modules/tween.js/src/Tween.js\");\n\nvar _tween2 = _interopRequireDefault(_tween);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// This object contains the state of the app\nexports.default = {\n  isDev: false,\n  isLoaded: false,\n  isTweening: false,\n  isRotating: true,\n  isMouseMoving: false,\n  isMouseOver: false,\n  maxAnisotropy: 1,\n  dpr: 1,\n  easing: _tween2.default.Easing.Quadratic.InOut,\n  duration: 500,\n  model: {\n    path: './assets/models/Teapot.json',\n    scale: 20\n  },\n  texture: {\n    path: './assets/textures/',\n    imageFiles: [{ name: 'UV', image: 'UV_Grid_Sm.jpg' }]\n  },\n  mesh: {\n    enableHelper: false,\n    wireframe: false,\n    translucent: false,\n    material: {\n      color: 0xffffff,\n      emissive: 0xffffff\n    }\n  },\n  fog: {\n    color: 0xffffff,\n    near: 0.0008\n  },\n  camera: {\n    fov: 40,\n    near: 2,\n    far: 1000,\n    aspect: 1,\n    posX: 0,\n    posY: 30,\n    posZ: 40\n  },\n  controls: {\n    autoRotate: true,\n    autoRotateSpeed: -0.5,\n    rotateSpeed: 0.5,\n    zoomSpeed: 0.8,\n    minDistance: 200,\n    maxDistance: 600,\n    minPolarAngle: Math.PI / 5,\n    maxPolarAngle: Math.PI / 2,\n    minAzimuthAngle: -Infinity,\n    maxAzimuthAngle: Infinity,\n    enableDamping: true,\n    dampingFactor: 0.5,\n    enableZoom: true,\n    target: {\n      x: 0,\n      y: 0,\n      z: 0\n    }\n  },\n  ambientLight: {\n    enabled: false,\n    color: 0x141414\n  },\n  directionalLight: {\n    enabled: true,\n    color: 0xf0f0f0,\n    intensity: 0.4,\n    x: -75,\n    y: 280,\n    z: 150\n  },\n  shadow: {\n    enabled: true,\n    helperEnabled: true,\n    bias: 0,\n    mapWidth: 2048,\n    mapHeight: 2048,\n    near: 250,\n    far: 400,\n    top: 100,\n    right: 100,\n    bottom: -100,\n    left: -100\n  },\n  pointLight: {\n    enabled: true,\n    color: 0xffffff,\n    intensity: 0.34,\n    distance: 115,\n    x: 0,\n    y: 0,\n    z: 0\n  },\n  hemiLight: {\n    enabled: true,\n    color: 0xc8c8c8,\n    groundColor: 0xffffff,\n    intensity: 0.55,\n    x: 0,\n    y: 0,\n    z: 0\n  }\n};\n\n//# sourceURL=webpack:///./src/js/data/config.js?");

/***/ }),

/***/ "./src/js/utils/detector.js":
/*!**********************************!*\
  !*** ./src/js/utils/detector.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\r\n * @author alteredq / http://alteredqualia.com/\r\n * @author mr.doob / http://mrdoob.com/\r\n */\n\nexports.default = {\n  canvas: !!window.CanvasRenderingContext2D,\n  webgl: function () {\n    try {\n      var canvas = document.createElement('canvas');\n\n      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));\n    } catch (e) {\n      return false;\n    }\n  }(),\n\n  workers: !!window.Worker,\n  fileapi: window.File && window.FileReader && window.FileList && window.Blob,\n\n  getWebGLErrorMessage: function getWebGLErrorMessage() {\n    var element = document.createElement('div');\n    element.id = 'webgl-error-message';\n    element.style.fontFamily = 'monospace';\n    element.style.fontSize = '13px';\n    element.style.fontWeight = 'normal';\n    element.style.textAlign = 'center';\n    element.style.background = '#fff';\n    element.style.color = '#000';\n    element.style.padding = '1.5em';\n    element.style.width = '400px';\n    element.style.margin = '5em auto 0';\n\n    if (!this.webgl) {\n      element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href=\"http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation\" style=\"color:#000000\">WebGL</a>.<br />', 'Find out how to get it <a href=\"http://get.webgl.org/\" style=\"color:#000000\">here</a>.'].join('\\n') : ['Your browser does not seem to support <a href=\"http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation\" style=\"color:#000000\">WebGL</a>.<br/>', 'Find out how to get it <a href=\"http://get.webgl.org/\" style=\"color:#000000\">here</a>.'].join('\\n');\n    }\n\n    return element;\n  },\n\n  addGetWebGLMessage: function addGetWebGLMessage(parameters) {\n    var parent, id, element;\n\n    parameters = parameters || {};\n\n    parent = parameters.parent !== undefined ? parameters.parent : document.body;\n    id = parameters.id !== undefined ? parameters.id : 'oldie';\n\n    element = this.getWebGLErrorMessage();\n    element.id = id;\n\n    parent.appendChild(element);\n  }\n};\n\n//# sourceURL=webpack:///./src/js/utils/detector.js?");

/***/ }),

/***/ "./src/js/utils/helpers.js":
/*!*********************************!*\
  !*** ./src/js/utils/helpers.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Provides simple static functions that are used multiple times in the app\nvar Helpers = function () {\n  function Helpers() {\n    _classCallCheck(this, Helpers);\n  }\n\n  _createClass(Helpers, null, [{\n    key: 'throttle',\n    value: function throttle(fn, threshhold, scope) {\n      threshhold || (threshhold = 250);\n      var last = void 0,\n          deferTimer = void 0;\n\n      return function () {\n        var context = scope || this;\n\n        var now = +new Date(),\n            args = arguments;\n\n        if (last && now < last + threshhold) {\n          clearTimeout(deferTimer);\n          deferTimer = setTimeout(function () {\n            last = now;\n            fn.apply(context, args);\n          }, threshhold);\n        } else {\n          last = now;\n          fn.apply(context, args);\n        }\n      };\n    }\n  }, {\n    key: 'logProgress',\n    value: function logProgress() {\n      return function (xhr) {\n        if (xhr.lengthComputable) {\n          var percentComplete = xhr.loaded / xhr.total * 100;\n\n          console.log(Math.round(percentComplete, 2) + '% downloaded');\n        }\n      };\n    }\n  }, {\n    key: 'logError',\n    value: function logError() {\n      return function (xhr) {\n        console.error(xhr);\n      };\n    }\n  }, {\n    key: 'handleColorChange',\n    value: function handleColorChange(color) {\n      return function (value) {\n        if (typeof value === 'string') {\n          value = value.replace('#', '0x');\n        }\n\n        color.setHex(value);\n      };\n    }\n  }, {\n    key: 'update',\n    value: function update(mesh) {\n      this.needsUpdate(mesh.material, mesh.geometry);\n    }\n  }, {\n    key: 'needsUpdate',\n    value: function needsUpdate(material, geometry) {\n      return function () {\n        material.shading = +material.shading; //Ensure number\n        material.vertexColors = +material.vertexColors; //Ensure number\n        material.side = +material.side; //Ensure number\n        material.needsUpdate = true;\n        geometry.verticesNeedUpdate = true;\n        geometry.normalsNeedUpdate = true;\n        geometry.colorsNeedUpdate = true;\n      };\n    }\n  }, {\n    key: 'updateTexture',\n    value: function updateTexture(material, materialKey, textures) {\n      return function (key) {\n        material[materialKey] = textures[key];\n        material.needsUpdate = true;\n      };\n    }\n  }]);\n\n  return Helpers;\n}();\n\nexports.default = Helpers;\n\n//# sourceURL=webpack:///./src/js/utils/helpers.js?");

/***/ }),

/***/ "./src/js/utils/keyboard.js":
/*!**********************************!*\
  !*** ./src/js/utils/keyboard.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ALIAS = {\n  'left': 37,\n  'up': 38,\n  'right': 39,\n  'down': 40,\n  'space': 32,\n  'tab': 9,\n  'escape': 27\n};\n\nvar Keyboard = function () {\n  function Keyboard(domElement) {\n    var _this = this;\n\n    _classCallCheck(this, Keyboard);\n\n    this.domElement = domElement || document;\n    this.keyCodes = {};\n\n    // bind keyEvents\n    this.domElement.addEventListener('keydown', function () {\n      return _this.onKeyChange(event);\n    }, false);\n    this.domElement.addEventListener('keyup', function () {\n      return _this.onKeyChange(event);\n    }, false);\n\n    // bind window blur\n    window.addEventListener('blur', function () {\n      return _this.onBlur;\n    }, false);\n  }\n\n  _createClass(Keyboard, [{\n    key: 'destroy',\n    value: function destroy() {\n      var _this2 = this;\n\n      this.domElement.removeEventListener('keydown', function () {\n        return _this2.onKeyChange(event);\n      }, false);\n      this.domElement.removeEventListener('keyup', function () {\n        return _this2.onKeyChange(event);\n      }, false);\n\n      // unbind window blur event\n      window.removeEventListener('blur', function () {\n        return _this2.onBlur;\n      }, false);\n    }\n  }, {\n    key: 'onBlur',\n    value: function onBlur() {\n      for (var prop in this.keyCodes) {\n        this.keyCodes[prop] = false;\n      }\n    }\n  }, {\n    key: 'onKeyChange',\n    value: function onKeyChange(event) {\n      // log to debug\n      //console.log('onKeyChange', event, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)\n\n      // update this.keyCodes\n      var keyCode = event.keyCode;\n      this.keyCodes[keyCode] = event.type === 'keydown';\n    }\n  }, {\n    key: 'pressed',\n    value: function pressed(keyDesc) {\n      var keys = keyDesc.split('+');\n      for (var i = 0; i < keys.length; i++) {\n        var key = keys[i];\n        var pressed = false;\n        if (Object.keys(ALIAS).indexOf(key) != -1) {\n          pressed = this.keyCodes[ALIAS[key]];\n        } else {\n          pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)];\n        }\n        if (!pressed) return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: 'eventMatches',\n    value: function eventMatches(event, keyDesc) {\n      var aliases = ALIAS;\n      var aliasKeys = Object.keys(aliases);\n      var keys = keyDesc.split('+');\n      // log to debug\n      // console.log('eventMatches', event, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)\n      for (var i = 0; i < keys.length; i++) {\n        var key = keys[i];\n        var pressed = false;\n        if (key === 'shift') {\n          pressed = event.shiftKey ? true : false;\n        } else if (key === 'ctrl') {\n          pressed = event.ctrlKey ? true : false;\n        } else if (key === 'alt') {\n          pressed = event.altKey ? true : false;\n        } else if (key === 'meta') {\n          pressed = event.metaKey ? true : false;\n        } else if (aliasKeys.indexOf(key) !== -1) {\n          pressed = event.keyCode === aliases[key];\n        } else if (event.keyCode === key.toUpperCase().charCodeAt(0)) {\n          pressed = true;\n        }\n        if (!pressed) return false;\n      }\n\n      return true;\n    }\n  }]);\n\n  return Keyboard;\n}();\n\nexports.default = Keyboard;\n\n//# sourceURL=webpack:///./src/js/utils/keyboard.js?");

/***/ }),

/***/ "./src/js/utils/orbitControls.js":
/*!***************************************!*\
  !*** ./src/js/utils/orbitControls.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (THREE) {\n  var MOUSE = THREE.MOUSE;\n  if (!MOUSE) MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };\n\n  /**\n   * @author qiao / https://github.com/qiao\n   * @author mrdoob / http://mrdoob.com\n   * @author alteredq / http://alteredqualia.com/\n   * @author WestLangley / http://github.com/WestLangley\n   * @author erich666 / http://erichaines.com\n   */\n  /*global THREE, console */\n\n  function OrbitConstraint(object) {\n\n    this.object = object;\n\n    // \"target\" sets the location of focus, where the object orbits around\n    // and where it pans with respect to.\n    this.target = new THREE.Vector3();\n\n    // Limits to how far you can dolly in and out ( PerspectiveCamera only )\n    this.minDistance = 0;\n    this.maxDistance = Infinity;\n\n    // Limits to how far you can zoom in and out ( OrthographicCamera only )\n    this.minZoom = 0;\n    this.maxZoom = Infinity;\n\n    // How far you can orbit vertically, upper and lower limits.\n    // Range is 0 to Math.PI radians.\n    this.minPolarAngle = 0; // radians\n    this.maxPolarAngle = Math.PI; // radians\n\n    // How far you can orbit horizontally, upper and lower limits.\n    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].\n    this.minAzimuthAngle = -Infinity; // radians\n    this.maxAzimuthAngle = Infinity; // radians\n\n    // Set to true to enable damping (inertia)\n    // If damping is enabled, you must call controls.update() in your animation loop\n    this.enableDamping = false;\n    this.dampingFactor = 0.25;\n\n    ////////////\n    // internals\n\n    var scope = this;\n\n    var EPS = 0.000001;\n\n    // Current position in spherical coordinate system.\n    var theta;\n    var phi;\n\n    // Pending changes\n    var phiDelta = 0;\n    var thetaDelta = 0;\n    var scale = 1;\n    var panOffset = new THREE.Vector3();\n    var zoomChanged = false;\n\n    // API\n\n    this.getPolarAngle = function () {\n\n      return phi;\n    };\n\n    this.getAzimuthalAngle = function () {\n\n      return theta;\n    };\n\n    this.rotateLeft = function (angle) {\n\n      thetaDelta -= angle;\n    };\n\n    this.rotateUp = function (angle) {\n\n      phiDelta -= angle;\n    };\n\n    // pass in distance in world space to move left\n    this.panLeft = function () {\n\n      var v = new THREE.Vector3();\n\n      return function panLeft(distance) {\n\n        var te = this.object.matrix.elements;\n\n        // get X column of matrix\n        v.set(te[0], te[1], te[2]);\n        v.multiplyScalar(-distance);\n\n        panOffset.add(v);\n      };\n    }();\n\n    // pass in distance in world space to move up\n    this.panUp = function () {\n\n      var v = new THREE.Vector3();\n\n      return function panUp(distance) {\n\n        var te = this.object.matrix.elements;\n\n        // get Y column of matrix\n        v.set(te[4], te[5], te[6]);\n        v.multiplyScalar(distance);\n\n        panOffset.add(v);\n      };\n    }();\n\n    // pass in x,y of change desired in pixel space,\n    // right and down are positive\n    this.pan = function (deltaX, deltaY, screenWidth, screenHeight) {\n\n      if (scope.object instanceof THREE.PerspectiveCamera) {\n\n        // perspective\n        var position = scope.object.position;\n        var offset = position.clone().sub(scope.target);\n        var targetDistance = offset.length();\n\n        // half of the fov is center to top of screen\n        targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);\n\n        // we actually don't use screenWidth, since perspective camera is fixed to screen height\n        scope.panLeft(2 * deltaX * targetDistance / screenHeight);\n        scope.panUp(2 * deltaY * targetDistance / screenHeight);\n      } else if (scope.object instanceof THREE.OrthographicCamera) {\n\n        // orthographic\n        scope.panLeft(deltaX * (scope.object.right - scope.object.left) / screenWidth);\n        scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / screenHeight);\n      } else {\n\n        // camera neither orthographic or perspective\n        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');\n      }\n    };\n\n    this.dollyIn = function (dollyScale) {\n\n      if (scope.object instanceof THREE.PerspectiveCamera) {\n\n        scale /= dollyScale;\n      } else if (scope.object instanceof THREE.OrthographicCamera) {\n\n        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));\n        scope.object.updateProjectionMatrix();\n        zoomChanged = true;\n      } else {\n\n        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');\n      }\n    };\n\n    this.dollyOut = function (dollyScale) {\n\n      if (scope.object instanceof THREE.PerspectiveCamera) {\n\n        scale *= dollyScale;\n      } else if (scope.object instanceof THREE.OrthographicCamera) {\n\n        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));\n        scope.object.updateProjectionMatrix();\n        zoomChanged = true;\n      } else {\n\n        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');\n      }\n    };\n\n    this.update = function () {\n\n      var offset = new THREE.Vector3();\n\n      // so camera.up is the orbit axis\n      var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));\n      var quatInverse = quat.clone().inverse();\n\n      var lastPosition = new THREE.Vector3();\n      var lastQuaternion = new THREE.Quaternion();\n\n      return function () {\n\n        var position = this.object.position;\n\n        offset.copy(position).sub(this.target);\n\n        // rotate offset to \"y-axis-is-up\" space\n        offset.applyQuaternion(quat);\n\n        // angle from z-axis around y-axis\n\n        theta = Math.atan2(offset.x, offset.z);\n\n        // angle from y-axis\n\n        phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);\n\n        theta += thetaDelta;\n        phi += phiDelta;\n\n        // restrict theta to be between desired limits\n        theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, theta));\n\n        // restrict phi to be between desired limits\n        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));\n\n        // restrict phi to be betwee EPS and PI-EPS\n        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));\n\n        var radius = offset.length() * scale;\n\n        // restrict radius to be between desired limits\n        radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));\n\n        // move target to panned location\n        this.target.add(panOffset);\n\n        offset.x = radius * Math.sin(phi) * Math.sin(theta);\n        offset.y = radius * Math.cos(phi);\n        offset.z = radius * Math.sin(phi) * Math.cos(theta);\n\n        // rotate offset back to \"camera-up-vector-is-up\" space\n        offset.applyQuaternion(quatInverse);\n\n        position.copy(this.target).add(offset);\n\n        this.object.lookAt(this.target);\n\n        if (this.enableDamping === true) {\n\n          thetaDelta *= 1 - this.dampingFactor;\n          phiDelta *= 1 - this.dampingFactor;\n        } else {\n\n          thetaDelta = 0;\n          phiDelta = 0;\n        }\n\n        scale = 1;\n        panOffset.set(0, 0, 0);\n\n        // update condition is:\n        // min(camera displacement, camera rotation in radians)^2 > EPS\n        // using small-angle approximation cos(x/2) = 1 - x^2 / 8\n\n        if (zoomChanged || lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {\n\n          lastPosition.copy(this.object.position);\n          lastQuaternion.copy(this.object.quaternion);\n          zoomChanged = false;\n\n          return true;\n        }\n\n        return false;\n      };\n    }();\n  };\n\n  // This set of controls performs orbiting, dollying (zooming), and panning. It maintains\n  // the \"up\" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is\n  // supported.\n  //\n  //    Orbit - left mouse / touch: one finger move\n  //    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish\n  //    Pan - right mouse, or arrow keys / touch: three finter swipe\n\n  function OrbitControls(object, domElement) {\n\n    var constraint = new OrbitConstraint(object);\n\n    this.domElement = domElement !== undefined ? domElement : document;\n\n    // API\n\n    Object.defineProperty(this, 'constraint', {\n\n      get: function get() {\n\n        return constraint;\n      }\n\n    });\n\n    this.getPolarAngle = function () {\n\n      return constraint.getPolarAngle();\n    };\n\n    this.getAzimuthalAngle = function () {\n\n      return constraint.getAzimuthalAngle();\n    };\n\n    // Set to false to disable this control\n    this.enabled = true;\n\n    // center is old, deprecated; use \"target\" instead\n    this.center = this.target;\n\n    // This option actually enables dollying in and out; left as \"zoom\" for\n    // backwards compatibility.\n    // Set to false to disable zooming\n    this.enableZoom = true;\n    this.zoomSpeed = 1.0;\n\n    // Set to false to disable rotating\n    this.enableRotate = true;\n    this.rotateSpeed = 1.0;\n\n    // Set to false to disable panning\n    this.enablePan = true;\n    this.keyPanSpeed = 7.0; // pixels moved per arrow key push\n\n    // Set to true to automatically rotate around the target\n    // If auto-rotate is enabled, you must call controls.update() in your animation loop\n    this.autoRotate = false;\n    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60\n\n    // Set to false to disable use of the keys\n    this.enableKeys = true;\n\n    // The four arrow keys\n    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };\n\n    // Mouse buttons\n    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };\n\n    ////////////\n    // internals\n\n    var scope = this;\n\n    var rotateStart = new THREE.Vector2();\n    var rotateEnd = new THREE.Vector2();\n    var rotateDelta = new THREE.Vector2();\n\n    var panStart = new THREE.Vector2();\n    var panEnd = new THREE.Vector2();\n    var panDelta = new THREE.Vector2();\n\n    var dollyStart = new THREE.Vector2();\n    var dollyEnd = new THREE.Vector2();\n    var dollyDelta = new THREE.Vector2();\n\n    var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };\n\n    var state = STATE.NONE;\n\n    // for reset\n\n    this.target0 = this.target.clone();\n    this.position0 = this.object.position.clone();\n    this.zoom0 = this.object.zoom;\n\n    // events\n\n    var changeEvent = { type: 'change' };\n    var startEvent = { type: 'start' };\n    var endEvent = { type: 'end' };\n\n    // pass in x,y of change desired in pixel space,\n    // right and down are positive\n    function pan(deltaX, deltaY) {\n\n      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n      constraint.pan(deltaX, deltaY, element.clientWidth, element.clientHeight);\n    }\n\n    this.update = function () {\n\n      if (this.autoRotate && state === STATE.NONE) {\n\n        constraint.rotateLeft(getAutoRotationAngle());\n      }\n\n      if (constraint.update() === true) {\n\n        this.dispatchEvent(changeEvent);\n      }\n    };\n\n    this.reset = function () {\n\n      state = STATE.NONE;\n\n      this.target.copy(this.target0);\n      this.object.position.copy(this.position0);\n      this.object.zoom = this.zoom0;\n\n      this.object.updateProjectionMatrix();\n      this.dispatchEvent(changeEvent);\n\n      this.update();\n    };\n\n    function getAutoRotationAngle() {\n\n      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n    }\n\n    function getZoomScale() {\n\n      return Math.pow(0.95, scope.zoomSpeed);\n    }\n\n    function onMouseDown(event) {\n\n      if (scope.enabled === false) return;\n\n      event.preventDefault();\n\n      if (event.button === scope.mouseButtons.ORBIT) {\n\n        if (scope.enableRotate === false) return;\n\n        state = STATE.ROTATE;\n\n        rotateStart.set(event.clientX, event.clientY);\n      } else if (event.button === scope.mouseButtons.ZOOM) {\n\n        if (scope.enableZoom === false) return;\n\n        state = STATE.DOLLY;\n\n        dollyStart.set(event.clientX, event.clientY);\n      } else if (event.button === scope.mouseButtons.PAN) {\n\n        if (scope.enablePan === false) return;\n\n        state = STATE.PAN;\n\n        panStart.set(event.clientX, event.clientY);\n      }\n\n      if (state !== STATE.NONE) {\n\n        document.addEventListener('mousemove', onMouseMove, false);\n        document.addEventListener('mouseup', onMouseUp, false);\n        scope.dispatchEvent(startEvent);\n      }\n    }\n\n    function onMouseMove(event) {\n\n      if (scope.enabled === false) return;\n\n      event.preventDefault();\n\n      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n      if (state === STATE.ROTATE) {\n\n        if (scope.enableRotate === false) return;\n\n        rotateEnd.set(event.clientX, event.clientY);\n        rotateDelta.subVectors(rotateEnd, rotateStart);\n\n        // rotating across whole screen goes 360 degrees around\n        constraint.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);\n\n        // rotating up and down along whole screen attempts to go 360, but limited to 180\n        constraint.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);\n\n        rotateStart.copy(rotateEnd);\n      } else if (state === STATE.DOLLY) {\n\n        if (scope.enableZoom === false) return;\n\n        dollyEnd.set(event.clientX, event.clientY);\n        dollyDelta.subVectors(dollyEnd, dollyStart);\n\n        if (dollyDelta.y > 0) {\n\n          constraint.dollyIn(getZoomScale());\n        } else if (dollyDelta.y < 0) {\n\n          constraint.dollyOut(getZoomScale());\n        }\n\n        dollyStart.copy(dollyEnd);\n      } else if (state === STATE.PAN) {\n\n        if (scope.enablePan === false) return;\n\n        panEnd.set(event.clientX, event.clientY);\n        panDelta.subVectors(panEnd, panStart);\n\n        pan(panDelta.x, panDelta.y);\n\n        panStart.copy(panEnd);\n      }\n\n      if (state !== STATE.NONE) scope.update();\n    }\n\n    function onMouseUp() /* event */{\n\n      if (scope.enabled === false) return;\n\n      document.removeEventListener('mousemove', onMouseMove, false);\n      document.removeEventListener('mouseup', onMouseUp, false);\n      scope.dispatchEvent(endEvent);\n      state = STATE.NONE;\n    }\n\n    function onMouseWheel(event) {\n\n      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE) return;\n\n      event.preventDefault();\n      event.stopPropagation();\n\n      var delta = 0;\n\n      if (event.wheelDelta !== undefined) {\n\n        // WebKit / Opera / Explorer 9\n\n        delta = event.wheelDelta;\n      } else if (event.detail !== undefined) {\n\n        // Firefox\n\n        delta = -event.detail;\n      }\n\n      if (delta > 0) {\n\n        constraint.dollyOut(getZoomScale());\n      } else if (delta < 0) {\n\n        constraint.dollyIn(getZoomScale());\n      }\n\n      scope.update();\n      scope.dispatchEvent(startEvent);\n      scope.dispatchEvent(endEvent);\n    }\n\n    function onKeyDown(event) {\n\n      if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;\n\n      switch (event.keyCode) {\n\n        case scope.keys.UP:\n          pan(0, scope.keyPanSpeed);\n          scope.update();\n          break;\n\n        case scope.keys.BOTTOM:\n          pan(0, -scope.keyPanSpeed);\n          scope.update();\n          break;\n\n        case scope.keys.LEFT:\n          pan(scope.keyPanSpeed, 0);\n          scope.update();\n          break;\n\n        case scope.keys.RIGHT:\n          pan(-scope.keyPanSpeed, 0);\n          scope.update();\n          break;\n\n      }\n    }\n\n    function touchstart(event) {\n\n      if (scope.enabled === false) return;\n\n      switch (event.touches.length) {\n\n        case 1:\n          // one-fingered touch: rotate\n\n          if (scope.enableRotate === false) return;\n\n          state = STATE.TOUCH_ROTATE;\n\n          rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);\n          break;\n\n        case 2:\n          // two-fingered touch: dolly\n\n          if (scope.enableZoom === false) return;\n\n          state = STATE.TOUCH_DOLLY;\n\n          var dx = event.touches[0].pageX - event.touches[1].pageX;\n          var dy = event.touches[0].pageY - event.touches[1].pageY;\n          var distance = Math.sqrt(dx * dx + dy * dy);\n          dollyStart.set(0, distance);\n          break;\n\n        case 3:\n          // three-fingered touch: pan\n\n          if (scope.enablePan === false) return;\n\n          state = STATE.TOUCH_PAN;\n\n          panStart.set(event.touches[0].pageX, event.touches[0].pageY);\n          break;\n\n        default:\n\n          state = STATE.NONE;\n\n      }\n\n      if (state !== STATE.NONE) scope.dispatchEvent(startEvent);\n    }\n\n    function touchmove(event) {\n\n      if (scope.enabled === false) return;\n\n      event.preventDefault();\n      event.stopPropagation();\n\n      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n      switch (event.touches.length) {\n\n        case 1:\n          // one-fingered touch: rotate\n\n          if (scope.enableRotate === false) return;\n          if (state !== STATE.TOUCH_ROTATE) return;\n\n          rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);\n          rotateDelta.subVectors(rotateEnd, rotateStart);\n\n          // rotating across whole screen goes 360 degrees around\n          constraint.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);\n          // rotating up and down along whole screen attempts to go 360, but limited to 180\n          constraint.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);\n\n          rotateStart.copy(rotateEnd);\n\n          scope.update();\n          break;\n\n        case 2:\n          // two-fingered touch: dolly\n\n          if (scope.enableZoom === false) return;\n          if (state !== STATE.TOUCH_DOLLY) return;\n\n          var dx = event.touches[0].pageX - event.touches[1].pageX;\n          var dy = event.touches[0].pageY - event.touches[1].pageY;\n          var distance = Math.sqrt(dx * dx + dy * dy);\n\n          dollyEnd.set(0, distance);\n          dollyDelta.subVectors(dollyEnd, dollyStart);\n\n          if (dollyDelta.y > 0) {\n\n            constraint.dollyOut(getZoomScale());\n          } else if (dollyDelta.y < 0) {\n\n            constraint.dollyIn(getZoomScale());\n          }\n\n          dollyStart.copy(dollyEnd);\n\n          scope.update();\n          break;\n\n        case 3:\n          // three-fingered touch: pan\n\n          if (scope.enablePan === false) return;\n          if (state !== STATE.TOUCH_PAN) return;\n\n          panEnd.set(event.touches[0].pageX, event.touches[0].pageY);\n          panDelta.subVectors(panEnd, panStart);\n\n          pan(panDelta.x, panDelta.y);\n\n          panStart.copy(panEnd);\n\n          scope.update();\n          break;\n\n        default:\n\n          state = STATE.NONE;\n\n      }\n    }\n\n    function touchend() /* event */{\n\n      if (scope.enabled === false) return;\n\n      scope.dispatchEvent(endEvent);\n      state = STATE.NONE;\n    }\n\n    function contextmenu(event) {\n\n      event.preventDefault();\n    }\n\n    this.dispose = function () {\n\n      this.domElement.removeEventListener('contextmenu', contextmenu, false);\n      this.domElement.removeEventListener('mousedown', onMouseDown, false);\n      this.domElement.removeEventListener('mousewheel', onMouseWheel, false);\n      this.domElement.removeEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox\n\n      this.domElement.removeEventListener('touchstart', touchstart, false);\n      this.domElement.removeEventListener('touchend', touchend, false);\n      this.domElement.removeEventListener('touchmove', touchmove, false);\n\n      document.removeEventListener('mousemove', onMouseMove, false);\n      document.removeEventListener('mouseup', onMouseUp, false);\n\n      window.removeEventListener('keydown', onKeyDown, false);\n    };\n\n    this.domElement.addEventListener('contextmenu', contextmenu, false);\n\n    this.domElement.addEventListener('mousedown', onMouseDown, false);\n    this.domElement.addEventListener('mousewheel', onMouseWheel, false);\n    this.domElement.addEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox\n\n    this.domElement.addEventListener('touchstart', touchstart, false);\n    this.domElement.addEventListener('touchend', touchend, false);\n    this.domElement.addEventListener('touchmove', touchmove, false);\n\n    window.addEventListener('keydown', onKeyDown, false);\n\n    // force an update at start\n    this.update();\n  };\n\n  OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);\n  OrbitControls.prototype.constructor = OrbitControls;\n\n  Object.defineProperties(OrbitControls.prototype, {\n\n    object: {\n\n      get: function get() {\n\n        return this.constraint.object;\n      }\n\n    },\n\n    target: {\n\n      get: function get() {\n\n        return this.constraint.target;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: target is now immutable. Use target.set() instead.');\n        this.constraint.target.copy(value);\n      }\n\n    },\n\n    minDistance: {\n\n      get: function get() {\n\n        return this.constraint.minDistance;\n      },\n\n      set: function set(value) {\n\n        this.constraint.minDistance = value;\n      }\n\n    },\n\n    maxDistance: {\n\n      get: function get() {\n\n        return this.constraint.maxDistance;\n      },\n\n      set: function set(value) {\n\n        this.constraint.maxDistance = value;\n      }\n\n    },\n\n    minZoom: {\n\n      get: function get() {\n\n        return this.constraint.minZoom;\n      },\n\n      set: function set(value) {\n\n        this.constraint.minZoom = value;\n      }\n\n    },\n\n    maxZoom: {\n\n      get: function get() {\n\n        return this.constraint.maxZoom;\n      },\n\n      set: function set(value) {\n\n        this.constraint.maxZoom = value;\n      }\n\n    },\n\n    minPolarAngle: {\n\n      get: function get() {\n\n        return this.constraint.minPolarAngle;\n      },\n\n      set: function set(value) {\n\n        this.constraint.minPolarAngle = value;\n      }\n\n    },\n\n    maxPolarAngle: {\n\n      get: function get() {\n\n        return this.constraint.maxPolarAngle;\n      },\n\n      set: function set(value) {\n\n        this.constraint.maxPolarAngle = value;\n      }\n\n    },\n\n    minAzimuthAngle: {\n\n      get: function get() {\n\n        return this.constraint.minAzimuthAngle;\n      },\n\n      set: function set(value) {\n\n        this.constraint.minAzimuthAngle = value;\n      }\n\n    },\n\n    maxAzimuthAngle: {\n\n      get: function get() {\n\n        return this.constraint.maxAzimuthAngle;\n      },\n\n      set: function set(value) {\n\n        this.constraint.maxAzimuthAngle = value;\n      }\n\n    },\n\n    enableDamping: {\n\n      get: function get() {\n\n        return this.constraint.enableDamping;\n      },\n\n      set: function set(value) {\n\n        this.constraint.enableDamping = value;\n      }\n\n    },\n\n    dampingFactor: {\n\n      get: function get() {\n\n        return this.constraint.dampingFactor;\n      },\n\n      set: function set(value) {\n\n        this.constraint.dampingFactor = value;\n      }\n\n    },\n\n    // backward compatibility\n\n    noZoom: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');\n        return !this.enableZoom;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');\n        this.enableZoom = !value;\n      }\n\n    },\n\n    noRotate: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');\n        return !this.enableRotate;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');\n        this.enableRotate = !value;\n      }\n\n    },\n\n    noPan: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');\n        return !this.enablePan;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');\n        this.enablePan = !value;\n      }\n\n    },\n\n    noKeys: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');\n        return !this.enableKeys;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');\n        this.enableKeys = !value;\n      }\n\n    },\n\n    staticMoving: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');\n        return !this.constraint.enableDamping;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');\n        this.constraint.enableDamping = !value;\n      }\n\n    },\n\n    dynamicDampingFactor: {\n\n      get: function get() {\n\n        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');\n        return this.constraint.dampingFactor;\n      },\n\n      set: function set(value) {\n\n        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');\n        this.constraint.dampingFactor = value;\n      }\n\n    }\n\n  });\n\n  return OrbitControls;\n};\n\n//# sourceURL=webpack:///./src/js/utils/orbitControls.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

/******/ });