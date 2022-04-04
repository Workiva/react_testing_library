(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
            typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rtl = {}, global.React, global.ReactDOM));
})(this, (function (exports, l$1, m$1) { 'use strict';

            function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

            function _interopNamespace(e) {
                        if (e && e.__esModule) return e;
                        var n = Object.create(null);
                        if (e) {
                                    Object.keys(e).forEach(function (k) {
                                                if (k !== 'default') {
                                                            var d = Object.getOwnPropertyDescriptor(e, k);
                                                            Object.defineProperty(n, k, d.get ? d : {
                                                                        enumerable: true,
                                                                        get: function () { return e[k]; }
                                                            });
                                                }
                                    });
                        }
                        n["default"] = e;
                        return Object.freeze(n);
            }

            function _mergeNamespaces(n, m) {
                        m.forEach(function (e) {
                                    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
                                                if (k !== 'default' && !(k in n)) {
                                                            var d = Object.getOwnPropertyDescriptor(e, k);
                                                            Object.defineProperty(n, k, d.get ? d : {
                                                                        enumerable: true,
                                                                        get: function () { return e[k]; }
                                                            });
                                                }
                                    });
                        });
                        return Object.freeze(n);
            }

            var l__default = /*#__PURE__*/_interopDefaultLegacy(l$1);
            var l__namespace = /*#__PURE__*/_interopNamespace(l$1);
            var m__default = /*#__PURE__*/_interopDefaultLegacy(m$1);

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            // shim for using process in browser
            // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout () {
                throw new Error('clearTimeout has not been defined');
            }
            var cachedSetTimeout = defaultSetTimout;
            var cachedClearTimeout = defaultClearTimeout;
            if (typeof global$1.setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            }
            if (typeof global$1.clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            }

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
            function nextTick(fun) {
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
            }
            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            var title = 'browser';
            var platform = 'browser';
            var browser = true;
            var env = {};
            var argv = [];
            var version = ''; // empty string to avoid regexp issues
            var versions = {};
            var release = {};
            var config$1 = {};

            function noop() {}

            var on = noop;
            var addListener = noop;
            var once = noop;
            var off = noop;
            var removeListener = noop;
            var removeAllListeners = noop;
            var emit = noop;

            function binding(name) {
                throw new Error('process.binding is not supported');
            }

            function cwd () { return '/' }
            function chdir (dir) {
                throw new Error('process.chdir is not supported');
            }function umask() { return 0; }

            // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
            var performance$1 = global$1.performance || {};
            var performanceNow =
              performance$1.now        ||
              performance$1.mozNow     ||
              performance$1.msNow      ||
              performance$1.oNow       ||
              performance$1.webkitNow  ||
              function(){ return (new Date()).getTime() };

            // generate timestamp or delta
            // see http://nodejs.org/api/process.html#process_process_hrtime
            function hrtime(previousTimestamp){
              var clocktime = performanceNow.call(performance$1)*1e-3;
              var seconds = Math.floor(clocktime);
              var nanoseconds = Math.floor((clocktime%1)*1e9);
              if (previousTimestamp) {
                seconds = seconds - previousTimestamp[0];
                nanoseconds = nanoseconds - previousTimestamp[1];
                if (nanoseconds<0) {
                  seconds--;
                  nanoseconds += 1e9;
                }
              }
              return [seconds,nanoseconds]
            }

            var startTime = new Date();
            function uptime() {
              var currentTime = new Date();
              var dif = currentTime - startTime;
              return dif / 1000;
            }

            var process = {
              nextTick: nextTick,
              title: title,
              browser: browser,
              env: env,
              argv: argv,
              version: version,
              versions: versions,
              on: on,
              addListener: addListener,
              once: once,
              off: off,
              removeListener: removeListener,
              removeAllListeners: removeAllListeners,
              emit: emit,
              binding: binding,
              cwd: cwd,
              chdir: chdir,
              umask: umask,
              hrtime: hrtime,
              platform: platform,
              release: release,
              config: config$1,
              uptime: uptime
            };

            function _extends() {
              _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];

                  for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                      target[key] = source[key];
                    }
                  }
                }

                return target;
              };

              return _extends.apply(this, arguments);
            }

            function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                Promise.resolve(value).then(_next, _throw);
              }
            }

            function _asyncToGenerator(fn) {
              return function () {
                var self = this,
                    args = arguments;
                return new Promise(function (resolve, reject) {
                  var gen = fn.apply(self, args);

                  function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                  }

                  function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                  }

                  _next(undefined);
                });
              };
            }

            function getDefaultExportFromCjs (x) {
            	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
            }

            function getAugmentedNamespace(n) {
            	if (n.__esModule) return n;
            	var a = Object.defineProperty({}, '__esModule', {value: true});
            	Object.keys(n).forEach(function (k) {
            		var d = Object.getOwnPropertyDescriptor(n, k);
            		Object.defineProperty(a, k, d.get ? d : {
            			enumerable: true,
            			get: function () {
            				return n[k];
            			}
            		});
            	});
            	return a;
            }

            function createCommonjsModule(fn) {
              var module = { exports: {} };
            	return fn(module, module.exports), module.exports;
            }

            /**
             * Copyright (c) 2014-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            var runtime_1 = createCommonjsModule(function (module) {
            var runtime = (function (exports) {

              var Op = Object.prototype;
              var hasOwn = Op.hasOwnProperty;
              var undefined$1; // More compressible than void 0.
              var $Symbol = typeof Symbol === "function" ? Symbol : {};
              var iteratorSymbol = $Symbol.iterator || "@@iterator";
              var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
              var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

              function define(obj, key, value) {
                Object.defineProperty(obj, key, {
                  value: value,
                  enumerable: true,
                  configurable: true,
                  writable: true
                });
                return obj[key];
              }
              try {
                // IE 8 has a broken Object.defineProperty that only works on DOM objects.
                define({}, "");
              } catch (err) {
                define = function(obj, key, value) {
                  return obj[key] = value;
                };
              }

              function wrap(innerFn, outerFn, self, tryLocsList) {
                // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
                var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
                var generator = Object.create(protoGenerator.prototype);
                var context = new Context(tryLocsList || []);

                // The ._invoke method unifies the implementations of the .next,
                // .throw, and .return methods.
                generator._invoke = makeInvokeMethod(innerFn, self, context);

                return generator;
              }
              exports.wrap = wrap;

              // Try/catch helper to minimize deoptimizations. Returns a completion
              // record like context.tryEntries[i].completion. This interface could
              // have been (and was previously) designed to take a closure to be
              // invoked without arguments, but in all the cases we care about we
              // already have an existing method we want to call, so there's no need
              // to create a new function object. We can even get away with assuming
              // the method takes exactly one argument, since that happens to be true
              // in every case, so we don't have to touch the arguments object. The
              // only additional allocation required is the completion record, which
              // has a stable shape and so hopefully should be cheap to allocate.
              function tryCatch(fn, obj, arg) {
                try {
                  return { type: "normal", arg: fn.call(obj, arg) };
                } catch (err) {
                  return { type: "throw", arg: err };
                }
              }

              var GenStateSuspendedStart = "suspendedStart";
              var GenStateSuspendedYield = "suspendedYield";
              var GenStateExecuting = "executing";
              var GenStateCompleted = "completed";

              // Returning this object from the innerFn has the same effect as
              // breaking out of the dispatch switch statement.
              var ContinueSentinel = {};

              // Dummy constructor functions that we use as the .constructor and
              // .constructor.prototype properties for functions that return Generator
              // objects. For full spec compliance, you may wish to configure your
              // minifier not to mangle the names of these two functions.
              function Generator() {}
              function GeneratorFunction() {}
              function GeneratorFunctionPrototype() {}

              // This is a polyfill for %IteratorPrototype% for environments that
              // don't natively support it.
              var IteratorPrototype = {};
              define(IteratorPrototype, iteratorSymbol, function () {
                return this;
              });

              var getProto = Object.getPrototypeOf;
              var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
              if (NativeIteratorPrototype &&
                  NativeIteratorPrototype !== Op &&
                  hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
                // This environment has a native %IteratorPrototype%; use it instead
                // of the polyfill.
                IteratorPrototype = NativeIteratorPrototype;
              }

              var Gp = GeneratorFunctionPrototype.prototype =
                Generator.prototype = Object.create(IteratorPrototype);
              GeneratorFunction.prototype = GeneratorFunctionPrototype;
              define(Gp, "constructor", GeneratorFunctionPrototype);
              define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
              GeneratorFunction.displayName = define(
                GeneratorFunctionPrototype,
                toStringTagSymbol,
                "GeneratorFunction"
              );

              // Helper for defining the .next, .throw, and .return methods of the
              // Iterator interface in terms of a single ._invoke method.
              function defineIteratorMethods(prototype) {
                ["next", "throw", "return"].forEach(function(method) {
                  define(prototype, method, function(arg) {
                    return this._invoke(method, arg);
                  });
                });
              }

              exports.isGeneratorFunction = function(genFun) {
                var ctor = typeof genFun === "function" && genFun.constructor;
                return ctor
                  ? ctor === GeneratorFunction ||
                    // For the native GeneratorFunction constructor, the best we can
                    // do is to check its .name property.
                    (ctor.displayName || ctor.name) === "GeneratorFunction"
                  : false;
              };

              exports.mark = function(genFun) {
                if (Object.setPrototypeOf) {
                  Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
                } else {
                  genFun.__proto__ = GeneratorFunctionPrototype;
                  define(genFun, toStringTagSymbol, "GeneratorFunction");
                }
                genFun.prototype = Object.create(Gp);
                return genFun;
              };

              // Within the body of any async function, `await x` is transformed to
              // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
              // `hasOwn.call(value, "__await")` to determine if the yielded value is
              // meant to be awaited.
              exports.awrap = function(arg) {
                return { __await: arg };
              };

              function AsyncIterator(generator, PromiseImpl) {
                function invoke(method, arg, resolve, reject) {
                  var record = tryCatch(generator[method], generator, arg);
                  if (record.type === "throw") {
                    reject(record.arg);
                  } else {
                    var result = record.arg;
                    var value = result.value;
                    if (value &&
                        typeof value === "object" &&
                        hasOwn.call(value, "__await")) {
                      return PromiseImpl.resolve(value.__await).then(function(value) {
                        invoke("next", value, resolve, reject);
                      }, function(err) {
                        invoke("throw", err, resolve, reject);
                      });
                    }

                    return PromiseImpl.resolve(value).then(function(unwrapped) {
                      // When a yielded Promise is resolved, its final value becomes
                      // the .value of the Promise<{value,done}> result for the
                      // current iteration.
                      result.value = unwrapped;
                      resolve(result);
                    }, function(error) {
                      // If a rejected Promise was yielded, throw the rejection back
                      // into the async generator function so it can be handled there.
                      return invoke("throw", error, resolve, reject);
                    });
                  }
                }

                var previousPromise;

                function enqueue(method, arg) {
                  function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                      invoke(method, arg, resolve, reject);
                    });
                  }

                  return previousPromise =
                    // If enqueue has been called before, then we want to wait until
                    // all previous Promises have been resolved before calling invoke,
                    // so that results are always delivered in the correct order. If
                    // enqueue has not been called before, then it is important to
                    // call invoke immediately, without waiting on a callback to fire,
                    // so that the async generator function has the opportunity to do
                    // any necessary setup in a predictable way. This predictability
                    // is why the Promise constructor synchronously invokes its
                    // executor callback, and why async functions synchronously
                    // execute code before the first await. Since we implement simple
                    // async functions in terms of async generators, it is especially
                    // important to get this right, even though it requires care.
                    previousPromise ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      // Avoid propagating failures to Promises returned by later
                      // invocations of the iterator.
                      callInvokeWithMethodAndArg
                    ) : callInvokeWithMethodAndArg();
                }

                // Define the unified helper method that is used to implement .next,
                // .throw, and .return (see defineIteratorMethods).
                this._invoke = enqueue;
              }

              defineIteratorMethods(AsyncIterator.prototype);
              define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
                return this;
              });
              exports.AsyncIterator = AsyncIterator;

              // Note that simple async functions are implemented on top of
              // AsyncIterator objects; they just return a Promise for the value of
              // the final result produced by the iterator.
              exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
                if (PromiseImpl === void 0) PromiseImpl = Promise;

                var iter = new AsyncIterator(
                  wrap(innerFn, outerFn, self, tryLocsList),
                  PromiseImpl
                );

                return exports.isGeneratorFunction(outerFn)
                  ? iter // If outerFn is a generator, return the full iterator.
                  : iter.next().then(function(result) {
                      return result.done ? result.value : iter.next();
                    });
              };

              function makeInvokeMethod(innerFn, self, context) {
                var state = GenStateSuspendedStart;

                return function invoke(method, arg) {
                  if (state === GenStateExecuting) {
                    throw new Error("Generator is already running");
                  }

                  if (state === GenStateCompleted) {
                    if (method === "throw") {
                      throw arg;
                    }

                    // Be forgiving, per 25.3.3.3.3 of the spec:
                    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                    return doneResult();
                  }

                  context.method = method;
                  context.arg = arg;

                  while (true) {
                    var delegate = context.delegate;
                    if (delegate) {
                      var delegateResult = maybeInvokeDelegate(delegate, context);
                      if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                      }
                    }

                    if (context.method === "next") {
                      // Setting context._sent for legacy support of Babel's
                      // function.sent implementation.
                      context.sent = context._sent = context.arg;

                    } else if (context.method === "throw") {
                      if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                      }

                      context.dispatchException(context.arg);

                    } else if (context.method === "return") {
                      context.abrupt("return", context.arg);
                    }

                    state = GenStateExecuting;

                    var record = tryCatch(innerFn, self, context);
                    if (record.type === "normal") {
                      // If an exception is thrown from innerFn, we leave state ===
                      // GenStateExecuting and loop back for another invocation.
                      state = context.done
                        ? GenStateCompleted
                        : GenStateSuspendedYield;

                      if (record.arg === ContinueSentinel) {
                        continue;
                      }

                      return {
                        value: record.arg,
                        done: context.done
                      };

                    } else if (record.type === "throw") {
                      state = GenStateCompleted;
                      // Dispatch the exception by looping back around to the
                      // context.dispatchException(context.arg) call above.
                      context.method = "throw";
                      context.arg = record.arg;
                    }
                  }
                };
              }

              // Call delegate.iterator[context.method](context.arg) and handle the
              // result, either by returning a { value, done } result from the
              // delegate iterator, or by modifying context.method and context.arg,
              // setting context.delegate to null, and returning the ContinueSentinel.
              function maybeInvokeDelegate(delegate, context) {
                var method = delegate.iterator[context.method];
                if (method === undefined$1) {
                  // A .throw or .return when the delegate iterator has no .throw
                  // method always terminates the yield* loop.
                  context.delegate = null;

                  if (context.method === "throw") {
                    // Note: ["return"] must be used for ES3 parsing compatibility.
                    if (delegate.iterator["return"]) {
                      // If the delegate iterator has a return method, give it a
                      // chance to clean up.
                      context.method = "return";
                      context.arg = undefined$1;
                      maybeInvokeDelegate(delegate, context);

                      if (context.method === "throw") {
                        // If maybeInvokeDelegate(context) changed context.method from
                        // "return" to "throw", let that override the TypeError below.
                        return ContinueSentinel;
                      }
                    }

                    context.method = "throw";
                    context.arg = new TypeError(
                      "The iterator does not provide a 'throw' method");
                  }

                  return ContinueSentinel;
                }

                var record = tryCatch(method, delegate.iterator, context.arg);

                if (record.type === "throw") {
                  context.method = "throw";
                  context.arg = record.arg;
                  context.delegate = null;
                  return ContinueSentinel;
                }

                var info = record.arg;

                if (! info) {
                  context.method = "throw";
                  context.arg = new TypeError("iterator result is not an object");
                  context.delegate = null;
                  return ContinueSentinel;
                }

                if (info.done) {
                  // Assign the result of the finished delegate to the temporary
                  // variable specified by delegate.resultName (see delegateYield).
                  context[delegate.resultName] = info.value;

                  // Resume execution at the desired location (see delegateYield).
                  context.next = delegate.nextLoc;

                  // If context.method was "throw" but the delegate handled the
                  // exception, let the outer generator proceed normally. If
                  // context.method was "next", forget context.arg since it has been
                  // "consumed" by the delegate iterator. If context.method was
                  // "return", allow the original .return call to continue in the
                  // outer generator.
                  if (context.method !== "return") {
                    context.method = "next";
                    context.arg = undefined$1;
                  }

                } else {
                  // Re-yield the result returned by the delegate method.
                  return info;
                }

                // The delegate iterator is finished, so forget it and continue with
                // the outer generator.
                context.delegate = null;
                return ContinueSentinel;
              }

              // Define Generator.prototype.{next,throw,return} in terms of the
              // unified ._invoke helper method.
              defineIteratorMethods(Gp);

              define(Gp, toStringTagSymbol, "Generator");

              // A Generator should always return itself as the iterator object when the
              // @@iterator function is called on it. Some browsers' implementations of the
              // iterator prototype chain incorrectly implement this, causing the Generator
              // object to not be returned from this call. This ensures that doesn't happen.
              // See https://github.com/facebook/regenerator/issues/274 for more details.
              define(Gp, iteratorSymbol, function() {
                return this;
              });

              define(Gp, "toString", function() {
                return "[object Generator]";
              });

              function pushTryEntry(locs) {
                var entry = { tryLoc: locs[0] };

                if (1 in locs) {
                  entry.catchLoc = locs[1];
                }

                if (2 in locs) {
                  entry.finallyLoc = locs[2];
                  entry.afterLoc = locs[3];
                }

                this.tryEntries.push(entry);
              }

              function resetTryEntry(entry) {
                var record = entry.completion || {};
                record.type = "normal";
                delete record.arg;
                entry.completion = record;
              }

              function Context(tryLocsList) {
                // The root entry object (effectively a try statement without a catch
                // or a finally block) gives us a place to store values thrown from
                // locations where there is no enclosing try statement.
                this.tryEntries = [{ tryLoc: "root" }];
                tryLocsList.forEach(pushTryEntry, this);
                this.reset(true);
              }

              exports.keys = function(object) {
                var keys = [];
                for (var key in object) {
                  keys.push(key);
                }
                keys.reverse();

                // Rather than returning an object with a next method, we keep
                // things simple and return the next function itself.
                return function next() {
                  while (keys.length) {
                    var key = keys.pop();
                    if (key in object) {
                      next.value = key;
                      next.done = false;
                      return next;
                    }
                  }

                  // To avoid creating an additional object, we just hang the .value
                  // and .done properties off the next function object itself. This
                  // also ensures that the minifier will not anonymize the function.
                  next.done = true;
                  return next;
                };
              };

              function values(iterable) {
                if (iterable) {
                  var iteratorMethod = iterable[iteratorSymbol];
                  if (iteratorMethod) {
                    return iteratorMethod.call(iterable);
                  }

                  if (typeof iterable.next === "function") {
                    return iterable;
                  }

                  if (!isNaN(iterable.length)) {
                    var i = -1, next = function next() {
                      while (++i < iterable.length) {
                        if (hasOwn.call(iterable, i)) {
                          next.value = iterable[i];
                          next.done = false;
                          return next;
                        }
                      }

                      next.value = undefined$1;
                      next.done = true;

                      return next;
                    };

                    return next.next = next;
                  }
                }

                // Return an iterator with no values.
                return { next: doneResult };
              }
              exports.values = values;

              function doneResult() {
                return { value: undefined$1, done: true };
              }

              Context.prototype = {
                constructor: Context,

                reset: function(skipTempReset) {
                  this.prev = 0;
                  this.next = 0;
                  // Resetting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  this.sent = this._sent = undefined$1;
                  this.done = false;
                  this.delegate = null;

                  this.method = "next";
                  this.arg = undefined$1;

                  this.tryEntries.forEach(resetTryEntry);

                  if (!skipTempReset) {
                    for (var name in this) {
                      // Not sure about the optimal order of these conditions:
                      if (name.charAt(0) === "t" &&
                          hasOwn.call(this, name) &&
                          !isNaN(+name.slice(1))) {
                        this[name] = undefined$1;
                      }
                    }
                  }
                },

                stop: function() {
                  this.done = true;

                  var rootEntry = this.tryEntries[0];
                  var rootRecord = rootEntry.completion;
                  if (rootRecord.type === "throw") {
                    throw rootRecord.arg;
                  }

                  return this.rval;
                },

                dispatchException: function(exception) {
                  if (this.done) {
                    throw exception;
                  }

                  var context = this;
                  function handle(loc, caught) {
                    record.type = "throw";
                    record.arg = exception;
                    context.next = loc;

                    if (caught) {
                      // If the dispatched exception was caught by a catch block,
                      // then let that catch block handle the exception normally.
                      context.method = "next";
                      context.arg = undefined$1;
                    }

                    return !! caught;
                  }

                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    var record = entry.completion;

                    if (entry.tryLoc === "root") {
                      // Exception thrown outside of any try block that could handle
                      // it, so set the completion value of the entire function to
                      // throw the exception.
                      return handle("end");
                    }

                    if (entry.tryLoc <= this.prev) {
                      var hasCatch = hasOwn.call(entry, "catchLoc");
                      var hasFinally = hasOwn.call(entry, "finallyLoc");

                      if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) {
                          return handle(entry.catchLoc, true);
                        } else if (this.prev < entry.finallyLoc) {
                          return handle(entry.finallyLoc);
                        }

                      } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) {
                          return handle(entry.catchLoc, true);
                        }

                      } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) {
                          return handle(entry.finallyLoc);
                        }

                      } else {
                        throw new Error("try statement without catch or finally");
                      }
                    }
                  }
                },

                abrupt: function(type, arg) {
                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc <= this.prev &&
                        hasOwn.call(entry, "finallyLoc") &&
                        this.prev < entry.finallyLoc) {
                      var finallyEntry = entry;
                      break;
                    }
                  }

                  if (finallyEntry &&
                      (type === "break" ||
                       type === "continue") &&
                      finallyEntry.tryLoc <= arg &&
                      arg <= finallyEntry.finallyLoc) {
                    // Ignore the finally entry if control is not jumping to a
                    // location outside the try/catch block.
                    finallyEntry = null;
                  }

                  var record = finallyEntry ? finallyEntry.completion : {};
                  record.type = type;
                  record.arg = arg;

                  if (finallyEntry) {
                    this.method = "next";
                    this.next = finallyEntry.finallyLoc;
                    return ContinueSentinel;
                  }

                  return this.complete(record);
                },

                complete: function(record, afterLoc) {
                  if (record.type === "throw") {
                    throw record.arg;
                  }

                  if (record.type === "break" ||
                      record.type === "continue") {
                    this.next = record.arg;
                  } else if (record.type === "return") {
                    this.rval = this.arg = record.arg;
                    this.method = "return";
                    this.next = "end";
                  } else if (record.type === "normal" && afterLoc) {
                    this.next = afterLoc;
                  }

                  return ContinueSentinel;
                },

                finish: function(finallyLoc) {
                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.finallyLoc === finallyLoc) {
                      this.complete(entry.completion, entry.afterLoc);
                      resetTryEntry(entry);
                      return ContinueSentinel;
                    }
                  }
                },

                "catch": function(tryLoc) {
                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc === tryLoc) {
                      var record = entry.completion;
                      if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                      }
                      return thrown;
                    }
                  }

                  // The context.catch method must only be called with a location
                  // argument that corresponds to a known catch block.
                  throw new Error("illegal catch attempt");
                },

                delegateYield: function(iterable, resultName, nextLoc) {
                  this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc
                  };

                  if (this.method === "next") {
                    // Deliberately forget the last sent value so that we don't
                    // accidentally pass it on to the delegate.
                    this.arg = undefined$1;
                  }

                  return ContinueSentinel;
                }
              };

              // Regardless of whether this script is executing as a CommonJS module
              // or not, return the runtime object so that we can declare the variable
              // regeneratorRuntime in the outer scope, which allows this module to be
              // injected easily by `bin/regenerator --include-runtime script.js`.
              return exports;

            }(
              // If this script is executing as a CommonJS module, use module.exports
              // as the regeneratorRuntime namespace. Otherwise create a new empty
              // object. Either way, the resulting object will be used to initialize
              // the regeneratorRuntime variable at the top of this file.
              module.exports 
            ));

            try {
              regeneratorRuntime = runtime;
            } catch (accidentalStrictMode) {
              // This module should not be running in strict mode, so the above
              // assignment should always work unless something is misconfigured. Just
              // in case runtime.js accidentally runs in strict mode, in modern engines
              // we can explicitly access globalThis. In older engines we can escape
              // strict mode using a global Function call. This could conceivably fail
              // if a Content Security Policy forbids using Function, but in that case
              // the proper solution is to fix the accidental strict mode problem. If
              // you've misconfigured your bundler to force strict mode and applied a
              // CSP to forbid Function, and you're not willing to fix either of those
              // problems, please detail your unique predicament in a GitHub issue.
              if (typeof globalThis === "object") {
                globalThis.regeneratorRuntime = runtime;
              } else {
                Function("r", "regeneratorRuntime = r")(runtime);
              }
            }
            });

            var regenerator = runtime_1;

            function _objectWithoutPropertiesLoose(source, excluded) {
              if (source == null) return {};
              var target = {};
              var sourceKeys = Object.keys(source);
              var key, i;

              for (i = 0; i < sourceKeys.length; i++) {
                key = sourceKeys[i];
                if (excluded.indexOf(key) >= 0) continue;
                target[key] = source[key];
              }

              return target;
            }

            var ansiStyles = createCommonjsModule(function (module) {

            const ANSI_BACKGROUND_OFFSET = 10;

            const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

            const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

            function assembleStyles() {
            	const codes = new Map();
            	const styles = {
            		modifier: {
            			reset: [0, 0],
            			// 21 isn't widely supported and 22 does the same thing
            			bold: [1, 22],
            			dim: [2, 22],
            			italic: [3, 23],
            			underline: [4, 24],
            			overline: [53, 55],
            			inverse: [7, 27],
            			hidden: [8, 28],
            			strikethrough: [9, 29]
            		},
            		color: {
            			black: [30, 39],
            			red: [31, 39],
            			green: [32, 39],
            			yellow: [33, 39],
            			blue: [34, 39],
            			magenta: [35, 39],
            			cyan: [36, 39],
            			white: [37, 39],

            			// Bright color
            			blackBright: [90, 39],
            			redBright: [91, 39],
            			greenBright: [92, 39],
            			yellowBright: [93, 39],
            			blueBright: [94, 39],
            			magentaBright: [95, 39],
            			cyanBright: [96, 39],
            			whiteBright: [97, 39]
            		},
            		bgColor: {
            			bgBlack: [40, 49],
            			bgRed: [41, 49],
            			bgGreen: [42, 49],
            			bgYellow: [43, 49],
            			bgBlue: [44, 49],
            			bgMagenta: [45, 49],
            			bgCyan: [46, 49],
            			bgWhite: [47, 49],

            			// Bright color
            			bgBlackBright: [100, 49],
            			bgRedBright: [101, 49],
            			bgGreenBright: [102, 49],
            			bgYellowBright: [103, 49],
            			bgBlueBright: [104, 49],
            			bgMagentaBright: [105, 49],
            			bgCyanBright: [106, 49],
            			bgWhiteBright: [107, 49]
            		}
            	};

            	// Alias bright black as gray (and grey)
            	styles.color.gray = styles.color.blackBright;
            	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
            	styles.color.grey = styles.color.blackBright;
            	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

            	for (const [groupName, group] of Object.entries(styles)) {
            		for (const [styleName, style] of Object.entries(group)) {
            			styles[styleName] = {
            				open: `\u001B[${style[0]}m`,
            				close: `\u001B[${style[1]}m`
            			};

            			group[styleName] = styles[styleName];

            			codes.set(style[0], style[1]);
            		}

            		Object.defineProperty(styles, groupName, {
            			value: group,
            			enumerable: false
            		});
            	}

            	Object.defineProperty(styles, 'codes', {
            		value: codes,
            		enumerable: false
            	});

            	styles.color.close = '\u001B[39m';
            	styles.bgColor.close = '\u001B[49m';

            	styles.color.ansi256 = wrapAnsi256();
            	styles.color.ansi16m = wrapAnsi16m();
            	styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
            	styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

            	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
            	Object.defineProperties(styles, {
            		rgbToAnsi256: {
            			value: (red, green, blue) => {
            				// We use the extended greyscale palette here, with the exception of
            				// black and white. normal palette only has 4 greyscale shades.
            				if (red === green && green === blue) {
            					if (red < 8) {
            						return 16;
            					}

            					if (red > 248) {
            						return 231;
            					}

            					return Math.round(((red - 8) / 247) * 24) + 232;
            				}

            				return 16 +
            					(36 * Math.round(red / 255 * 5)) +
            					(6 * Math.round(green / 255 * 5)) +
            					Math.round(blue / 255 * 5);
            			},
            			enumerable: false
            		},
            		hexToRgb: {
            			value: hex => {
            				const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            				if (!matches) {
            					return [0, 0, 0];
            				}

            				let {colorString} = matches.groups;

            				if (colorString.length === 3) {
            					colorString = colorString.split('').map(character => character + character).join('');
            				}

            				const integer = Number.parseInt(colorString, 16);

            				return [
            					(integer >> 16) & 0xFF,
            					(integer >> 8) & 0xFF,
            					integer & 0xFF
            				];
            			},
            			enumerable: false
            		},
            		hexToAnsi256: {
            			value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
            			enumerable: false
            		}
            	});

            	return styles;
            }

            // Make the export immutable
            Object.defineProperty(module, 'exports', {
            	enumerable: true,
            	get: assembleStyles
            });
            });

            var printIteratorEntries_1 = printIteratorEntries;
            var printIteratorValues_1 = printIteratorValues;
            var printListItems_1 = printListItems;
            var printObjectProperties_1 = printObjectProperties;

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             *
             */
            const getKeysOfEnumerableProperties = (object, compareKeys) => {
              const keys = Object.keys(object).sort(compareKeys);

              if (Object.getOwnPropertySymbols) {
                Object.getOwnPropertySymbols(object).forEach(symbol => {
                  if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
                    keys.push(symbol);
                  }
                });
              }

              return keys;
            };
            /**
             * Return entries (for example, of a map)
             * with spacing, indentation, and comma
             * without surrounding punctuation (for example, braces)
             */

            function printIteratorEntries(
              iterator,
              config,
              indentation,
              depth,
              refs,
              printer, // Too bad, so sad that separator for ECMAScript Map has been ' => '
              // What a distracting diff if you change a data structure to/from
              // ECMAScript Object or Immutable.Map/OrderedMap which use the default.
              separator = ': '
            ) {
              let result = '';
              let current = iterator.next();

              if (!current.done) {
                result += config.spacingOuter;
                const indentationNext = indentation + config.indent;

                while (!current.done) {
                  const name = printer(
                    current.value[0],
                    config,
                    indentationNext,
                    depth,
                    refs
                  );
                  const value = printer(
                    current.value[1],
                    config,
                    indentationNext,
                    depth,
                    refs
                  );
                  result += indentationNext + name + separator + value;
                  current = iterator.next();

                  if (!current.done) {
                    result += ',' + config.spacingInner;
                  } else if (!config.min) {
                    result += ',';
                  }
                }

                result += config.spacingOuter + indentation;
              }

              return result;
            }
            /**
             * Return values (for example, of a set)
             * with spacing, indentation, and comma
             * without surrounding punctuation (braces or brackets)
             */

            function printIteratorValues(
              iterator,
              config,
              indentation,
              depth,
              refs,
              printer
            ) {
              let result = '';
              let current = iterator.next();

              if (!current.done) {
                result += config.spacingOuter;
                const indentationNext = indentation + config.indent;

                while (!current.done) {
                  result +=
                    indentationNext +
                    printer(current.value, config, indentationNext, depth, refs);
                  current = iterator.next();

                  if (!current.done) {
                    result += ',' + config.spacingInner;
                  } else if (!config.min) {
                    result += ',';
                  }
                }

                result += config.spacingOuter + indentation;
              }

              return result;
            }
            /**
             * Return items (for example, of an array)
             * with spacing, indentation, and comma
             * without surrounding punctuation (for example, brackets)
             **/

            function printListItems(list, config, indentation, depth, refs, printer) {
              let result = '';

              if (list.length) {
                result += config.spacingOuter;
                const indentationNext = indentation + config.indent;

                for (let i = 0; i < list.length; i++) {
                  result += indentationNext;

                  if (i in list) {
                    result += printer(list[i], config, indentationNext, depth, refs);
                  }

                  if (i < list.length - 1) {
                    result += ',' + config.spacingInner;
                  } else if (!config.min) {
                    result += ',';
                  }
                }

                result += config.spacingOuter + indentation;
              }

              return result;
            }
            /**
             * Return properties of an object
             * with spacing, indentation, and comma
             * without surrounding punctuation (for example, braces)
             */

            function printObjectProperties(val, config, indentation, depth, refs, printer) {
              let result = '';
              const keys = getKeysOfEnumerableProperties(val, config.compareKeys);

              if (keys.length) {
                result += config.spacingOuter;
                const indentationNext = indentation + config.indent;

                for (let i = 0; i < keys.length; i++) {
                  const key = keys[i];
                  const name = printer(key, config, indentationNext, depth, refs);
                  const value = printer(val[key], config, indentationNext, depth, refs);
                  result += indentationNext + name + ': ' + value;

                  if (i < keys.length - 1) {
                    result += ',' + config.spacingInner;
                  } else if (!config.min) {
                    result += ',';
                  }
                }

                result += config.spacingOuter + indentation;
              }

              return result;
            }

            var collections = /*#__PURE__*/Object.defineProperty({
            	printIteratorEntries: printIteratorEntries_1,
            	printIteratorValues: printIteratorValues_1,
            	printListItems: printListItems_1,
            	printObjectProperties: printObjectProperties_1
            }, '__esModule', {value: true});

            var AsymmetricMatcher = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;



            var global = (function () {
              if (typeof globalThis !== 'undefined') {
                return globalThis;
              } else if (typeof global !== 'undefined') {
                return global;
              } else if (typeof self !== 'undefined') {
                return self;
              } else if (typeof window !== 'undefined') {
                return window;
              } else {
                return Function('return this')();
              }
            })();

            var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
            const asymmetricMatcher =
              typeof Symbol === 'function' && Symbol.for
                ? Symbol.for('jest.asymmetricMatcher')
                : 0x1357a5;
            const SPACE = ' ';

            const serialize = (val, config, indentation, depth, refs, printer) => {
              const stringedValue = val.toString();

              if (
                stringedValue === 'ArrayContaining' ||
                stringedValue === 'ArrayNotContaining'
              ) {
                if (++depth > config.maxDepth) {
                  return '[' + stringedValue + ']';
                }

                return (
                  stringedValue +
                  SPACE +
                  '[' +
                  (0, collections.printListItems)(
                    val.sample,
                    config,
                    indentation,
                    depth,
                    refs,
                    printer
                  ) +
                  ']'
                );
              }

              if (
                stringedValue === 'ObjectContaining' ||
                stringedValue === 'ObjectNotContaining'
              ) {
                if (++depth > config.maxDepth) {
                  return '[' + stringedValue + ']';
                }

                return (
                  stringedValue +
                  SPACE +
                  '{' +
                  (0, collections.printObjectProperties)(
                    val.sample,
                    config,
                    indentation,
                    depth,
                    refs,
                    printer
                  ) +
                  '}'
                );
              }

              if (
                stringedValue === 'StringMatching' ||
                stringedValue === 'StringNotMatching'
              ) {
                return (
                  stringedValue +
                  SPACE +
                  printer(val.sample, config, indentation, depth, refs)
                );
              }

              if (
                stringedValue === 'StringContaining' ||
                stringedValue === 'StringNotContaining'
              ) {
                return (
                  stringedValue +
                  SPACE +
                  printer(val.sample, config, indentation, depth, refs)
                );
              }

              return val.toAsymmetricMatcher();
            };

            exports.serialize = serialize;

            const test = val => val && val.$$typeof === asymmetricMatcher;

            exports.test = test;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var ansiRegex = ({onlyFirst = false} = {}) => {
            	const pattern = [
            		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
            		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
            	].join('|');

            	return new RegExp(pattern, onlyFirst ? undefined : 'g');
            };

            var ConvertAnsi = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;

            var _ansiRegex = _interopRequireDefault(ansiRegex);

            var _ansiStyles = _interopRequireDefault(ansiStyles);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            const toHumanReadableAnsi = text =>
              text.replace((0, _ansiRegex.default)(), match => {
                switch (match) {
                  case _ansiStyles.default.red.close:
                  case _ansiStyles.default.green.close:
                  case _ansiStyles.default.cyan.close:
                  case _ansiStyles.default.gray.close:
                  case _ansiStyles.default.white.close:
                  case _ansiStyles.default.yellow.close:
                  case _ansiStyles.default.bgRed.close:
                  case _ansiStyles.default.bgGreen.close:
                  case _ansiStyles.default.bgYellow.close:
                  case _ansiStyles.default.inverse.close:
                  case _ansiStyles.default.dim.close:
                  case _ansiStyles.default.bold.close:
                  case _ansiStyles.default.reset.open:
                  case _ansiStyles.default.reset.close:
                    return '</>';

                  case _ansiStyles.default.red.open:
                    return '<red>';

                  case _ansiStyles.default.green.open:
                    return '<green>';

                  case _ansiStyles.default.cyan.open:
                    return '<cyan>';

                  case _ansiStyles.default.gray.open:
                    return '<gray>';

                  case _ansiStyles.default.white.open:
                    return '<white>';

                  case _ansiStyles.default.yellow.open:
                    return '<yellow>';

                  case _ansiStyles.default.bgRed.open:
                    return '<bgRed>';

                  case _ansiStyles.default.bgGreen.open:
                    return '<bgGreen>';

                  case _ansiStyles.default.bgYellow.open:
                    return '<bgYellow>';

                  case _ansiStyles.default.inverse.open:
                    return '<inverse>';

                  case _ansiStyles.default.dim.open:
                    return '<dim>';

                  case _ansiStyles.default.bold.open:
                    return '<bold>';

                  default:
                    return '';
                }
              });

            const test = val =>
              typeof val === 'string' && !!val.match((0, _ansiRegex.default)());

            exports.test = test;

            const serialize = (val, config, indentation, depth, refs, printer) =>
              printer(toHumanReadableAnsi(val), config, indentation, depth, refs);

            exports.serialize = serialize;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var DOMCollection$1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;



            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            /* eslint-disable local/ban-types-eventually */
            const SPACE = ' ';
            const OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];
            const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;

            const testName = name =>
              OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);

            const test = val =>
              val &&
              val.constructor &&
              !!val.constructor.name &&
              testName(val.constructor.name);

            exports.test = test;

            const isNamedNodeMap = collection =>
              collection.constructor.name === 'NamedNodeMap';

            const serialize = (collection, config, indentation, depth, refs, printer) => {
              const name = collection.constructor.name;

              if (++depth > config.maxDepth) {
                return '[' + name + ']';
              }

              return (
                (config.min ? '' : name + SPACE) +
                (OBJECT_NAMES.indexOf(name) !== -1
                  ? '{' +
                    (0, collections.printObjectProperties)(
                      isNamedNodeMap(collection)
                        ? Array.from(collection).reduce((props, attribute) => {
                            props[attribute.name] = attribute.value;
                            return props;
                          }, {})
                        : {...collection},
                      config,
                      indentation,
                      depth,
                      refs,
                      printer
                    ) +
                    '}'
                  : '[' +
                    (0, collections.printListItems)(
                      Array.from(collection),
                      config,
                      indentation,
                      depth,
                      refs,
                      printer
                    ) +
                    ']')
              );
            };

            exports.serialize = serialize;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var _default = escapeHTML$1;

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            function escapeHTML$1(str) {
              return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            var escapeHTML_1 = /*#__PURE__*/Object.defineProperty({
            	default: _default
            }, '__esModule', {value: true});

            var markup = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.printText =
              exports.printProps =
              exports.printElementAsLeaf =
              exports.printElement =
              exports.printComment =
              exports.printChildren =
                void 0;

            var _escapeHTML = _interopRequireDefault(escapeHTML_1);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            // Return empty string if keys is empty.
            const printProps = (keys, props, config, indentation, depth, refs, printer) => {
              const indentationNext = indentation + config.indent;
              const colors = config.colors;
              return keys
                .map(key => {
                  const value = props[key];
                  let printed = printer(value, config, indentationNext, depth, refs);

                  if (typeof value !== 'string') {
                    if (printed.indexOf('\n') !== -1) {
                      printed =
                        config.spacingOuter +
                        indentationNext +
                        printed +
                        config.spacingOuter +
                        indentation;
                    }

                    printed = '{' + printed + '}';
                  }

                  return (
                    config.spacingInner +
                    indentation +
                    colors.prop.open +
                    key +
                    colors.prop.close +
                    '=' +
                    colors.value.open +
                    printed +
                    colors.value.close
                  );
                })
                .join('');
            }; // Return empty string if children is empty.

            exports.printProps = printProps;

            const printChildren = (children, config, indentation, depth, refs, printer) =>
              children
                .map(
                  child =>
                    config.spacingOuter +
                    indentation +
                    (typeof child === 'string'
                      ? printText(child, config)
                      : printer(child, config, indentation, depth, refs))
                )
                .join('');

            exports.printChildren = printChildren;

            const printText = (text, config) => {
              const contentColor = config.colors.content;
              return (
                contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close
              );
            };

            exports.printText = printText;

            const printComment = (comment, config) => {
              const commentColor = config.colors.comment;
              return (
                commentColor.open +
                '<!--' +
                (0, _escapeHTML.default)(comment) +
                '-->' +
                commentColor.close
              );
            }; // Separate the functions to format props, children, and element,
            // so a plugin could override a particular function, if needed.
            // Too bad, so sad: the traditional (but unnecessary) space
            // in a self-closing tagColor requires a second test of printedProps.

            exports.printComment = printComment;

            const printElement = (
              type,
              printedProps,
              printedChildren,
              config,
              indentation
            ) => {
              const tagColor = config.colors.tag;
              return (
                tagColor.open +
                '<' +
                type +
                (printedProps &&
                  tagColor.close +
                    printedProps +
                    config.spacingOuter +
                    indentation +
                    tagColor.open) +
                (printedChildren
                  ? '>' +
                    tagColor.close +
                    printedChildren +
                    config.spacingOuter +
                    indentation +
                    tagColor.open +
                    '</' +
                    type
                  : (printedProps && !config.min ? '' : ' ') + '/') +
                '>' +
                tagColor.close
              );
            };

            exports.printElement = printElement;

            const printElementAsLeaf = (type, config) => {
              const tagColor = config.colors.tag;
              return (
                tagColor.open +
                '<' +
                type +
                tagColor.close +
                ' …' +
                tagColor.open +
                ' />' +
                tagColor.close
              );
            };

            exports.printElementAsLeaf = printElementAsLeaf;
            });

            var DOMElement = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;



            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            const ELEMENT_NODE = 1;
            const TEXT_NODE = 3;
            const COMMENT_NODE = 8;
            const FRAGMENT_NODE = 11;
            const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

            const testHasAttribute = val => {
              try {
                return typeof val.hasAttribute === 'function' && val.hasAttribute('is');
              } catch {
                return false;
              }
            };

            const testNode = val => {
              const constructorName = val.constructor.name;
              const {nodeType, tagName} = val;
              const isCustomElement =
                (typeof tagName === 'string' && tagName.includes('-')) ||
                testHasAttribute(val);
              return (
                (nodeType === ELEMENT_NODE &&
                  (ELEMENT_REGEXP.test(constructorName) || isCustomElement)) ||
                (nodeType === TEXT_NODE && constructorName === 'Text') ||
                (nodeType === COMMENT_NODE && constructorName === 'Comment') ||
                (nodeType === FRAGMENT_NODE && constructorName === 'DocumentFragment')
              );
            };

            const test = val => {
              var _val$constructor;

              return (
                (val === null || val === void 0
                  ? void 0
                  : (_val$constructor = val.constructor) === null ||
                    _val$constructor === void 0
                  ? void 0
                  : _val$constructor.name) && testNode(val)
              );
            };

            exports.test = test;

            function nodeIsText(node) {
              return node.nodeType === TEXT_NODE;
            }

            function nodeIsComment(node) {
              return node.nodeType === COMMENT_NODE;
            }

            function nodeIsFragment(node) {
              return node.nodeType === FRAGMENT_NODE;
            }

            const serialize = (node, config, indentation, depth, refs, printer) => {
              if (nodeIsText(node)) {
                return (0, markup.printText)(node.data, config);
              }

              if (nodeIsComment(node)) {
                return (0, markup.printComment)(node.data, config);
              }

              const type = nodeIsFragment(node)
                ? 'DocumentFragment'
                : node.tagName.toLowerCase();

              if (++depth > config.maxDepth) {
                return (0, markup.printElementAsLeaf)(type, config);
              }

              return (0, markup.printElement)(
                type,
                (0, markup.printProps)(
                  nodeIsFragment(node)
                    ? []
                    : Array.from(node.attributes)
                        .map(attr => attr.name)
                        .sort(),
                  nodeIsFragment(node)
                    ? {}
                    : Array.from(node.attributes).reduce((props, attribute) => {
                        props[attribute.name] = attribute.value;
                        return props;
                      }, {}),
                  config,
                  indentation + config.indent,
                  depth,
                  refs,
                  printer
                ),
                (0, markup.printChildren)(
                  Array.prototype.slice.call(node.childNodes || node.children),
                  config,
                  indentation + config.indent,
                  depth,
                  refs,
                  printer
                ),
                config,
                indentation
              );
            };

            exports.serialize = serialize;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var Immutable = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;



            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            // SENTINEL constants are from https://github.com/facebook/immutable-js
            const IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
            const IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
            const IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
            const IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';
            const IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
            const IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@'; // immutable v4

            const IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';
            const IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
            const IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

            const getImmutableName = name => 'Immutable.' + name;

            const printAsLeaf = name => '[' + name + ']';

            const SPACE = ' ';
            const LAZY = '…'; // Seq is lazy if it calls a method like filter

            const printImmutableEntries = (
              val,
              config,
              indentation,
              depth,
              refs,
              printer,
              type
            ) =>
              ++depth > config.maxDepth
                ? printAsLeaf(getImmutableName(type))
                : getImmutableName(type) +
                  SPACE +
                  '{' +
                  (0, collections.printIteratorEntries)(
                    val.entries(),
                    config,
                    indentation,
                    depth,
                    refs,
                    printer
                  ) +
                  '}'; // Record has an entries method because it is a collection in immutable v3.
            // Return an iterator for Immutable Record from version v3 or v4.

            function getRecordEntries(val) {
              let i = 0;
              return {
                next() {
                  if (i < val._keys.length) {
                    const key = val._keys[i++];
                    return {
                      done: false,
                      value: [key, val.get(key)]
                    };
                  }

                  return {
                    done: true,
                    value: undefined
                  };
                }
              };
            }

            const printImmutableRecord = (
              val,
              config,
              indentation,
              depth,
              refs,
              printer
            ) => {
              // _name property is defined only for an Immutable Record instance
              // which was constructed with a second optional descriptive name arg
              const name = getImmutableName(val._name || 'Record');
              return ++depth > config.maxDepth
                ? printAsLeaf(name)
                : name +
                    SPACE +
                    '{' +
                    (0, collections.printIteratorEntries)(
                      getRecordEntries(val),
                      config,
                      indentation,
                      depth,
                      refs,
                      printer
                    ) +
                    '}';
            };

            const printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
              const name = getImmutableName('Seq');

              if (++depth > config.maxDepth) {
                return printAsLeaf(name);
              }

              if (val[IS_KEYED_SENTINEL]) {
                return (
                  name +
                  SPACE +
                  '{' + // from Immutable collection of entries or from ECMAScript object
                  (val._iter || val._object
                    ? (0, collections.printIteratorEntries)(
                        val.entries(),
                        config,
                        indentation,
                        depth,
                        refs,
                        printer
                      )
                    : LAZY) +
                  '}'
                );
              }

              return (
                name +
                SPACE +
                '[' +
                (val._iter || // from Immutable collection of values
                val._array || // from ECMAScript array
                val._collection || // from ECMAScript collection in immutable v4
                val._iterable // from ECMAScript collection in immutable v3
                  ? (0, collections.printIteratorValues)(
                      val.values(),
                      config,
                      indentation,
                      depth,
                      refs,
                      printer
                    )
                  : LAZY) +
                ']'
              );
            };

            const printImmutableValues = (
              val,
              config,
              indentation,
              depth,
              refs,
              printer,
              type
            ) =>
              ++depth > config.maxDepth
                ? printAsLeaf(getImmutableName(type))
                : getImmutableName(type) +
                  SPACE +
                  '[' +
                  (0, collections.printIteratorValues)(
                    val.values(),
                    config,
                    indentation,
                    depth,
                    refs,
                    printer
                  ) +
                  ']';

            const serialize = (val, config, indentation, depth, refs, printer) => {
              if (val[IS_MAP_SENTINEL]) {
                return printImmutableEntries(
                  val,
                  config,
                  indentation,
                  depth,
                  refs,
                  printer,
                  val[IS_ORDERED_SENTINEL] ? 'OrderedMap' : 'Map'
                );
              }

              if (val[IS_LIST_SENTINEL]) {
                return printImmutableValues(
                  val,
                  config,
                  indentation,
                  depth,
                  refs,
                  printer,
                  'List'
                );
              }

              if (val[IS_SET_SENTINEL]) {
                return printImmutableValues(
                  val,
                  config,
                  indentation,
                  depth,
                  refs,
                  printer,
                  val[IS_ORDERED_SENTINEL] ? 'OrderedSet' : 'Set'
                );
              }

              if (val[IS_STACK_SENTINEL]) {
                return printImmutableValues(
                  val,
                  config,
                  indentation,
                  depth,
                  refs,
                  printer,
                  'Stack'
                );
              }

              if (val[IS_SEQ_SENTINEL]) {
                return printImmutableSeq(val, config, indentation, depth, refs, printer);
              } // For compatibility with immutable v3 and v4, let record be the default.

              return printImmutableRecord(val, config, indentation, depth, refs, printer);
            }; // Explicitly comparing sentinel properties to true avoids false positive
            // when mock identity-obj-proxy returns the key as the value for any key.

            exports.serialize = serialize;

            const test = val =>
              val &&
              (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);

            exports.test = test;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            /** @license React v17.0.2
             * react-is.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            var b=60103,c=60106,d=60107,e=60108,f=60114,g=60109,h=60110,k=60112,l=60113,m=60120,n=60115,p=60116,q=60121,r=60122,u=60117,v=60129,w=60131;
            if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element");c=x("react.portal");d=x("react.fragment");e=x("react.strict_mode");f=x("react.profiler");g=x("react.provider");h=x("react.context");k=x("react.forward_ref");l=x("react.suspense");m=x("react.suspense_list");n=x("react.memo");p=x("react.lazy");q=x("react.block");r=x("react.server.block");u=x("react.fundamental");v=x("react.debug_trace_mode");w=x("react.legacy_hidden");}
            function y(a){if("object"===typeof a&&null!==a){var t=a.$$typeof;switch(t){case b:switch(a=a.type,a){case d:case f:case e:case l:case m:return a;default:switch(a=a&&a.$$typeof,a){case h:case k:case p:case n:case g:return a;default:return t}}case c:return t}}}var z=g,A=b,B=k,C=d,D=p,E=n,F=c,G=f,H=e,I=l;var ContextConsumer=h;var ContextProvider=z;var Element=A;var ForwardRef=B;var Fragment=C;var Lazy=D;var Memo=E;var Portal=F;var Profiler=G;var StrictMode=H;
            var Suspense=I;var isAsyncMode=function(){return !1};var isConcurrentMode=function(){return !1};var isContextConsumer=function(a){return y(a)===h};var isContextProvider=function(a){return y(a)===g};var isElement$1=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};var isForwardRef=function(a){return y(a)===k};var isFragment=function(a){return y(a)===d};var isLazy=function(a){return y(a)===p};var isMemo=function(a){return y(a)===n};
            var isPortal=function(a){return y(a)===c};var isProfiler=function(a){return y(a)===f};var isStrictMode=function(a){return y(a)===e};var isSuspense=function(a){return y(a)===l};var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===v||a===e||a===l||a===m||a===w||"object"===typeof a&&null!==a&&(a.$$typeof===p||a.$$typeof===n||a.$$typeof===g||a.$$typeof===h||a.$$typeof===k||a.$$typeof===u||a.$$typeof===q||a[0]===r)?!0:!1};
            var typeOf=y;

            var reactIs_production_min = {
            	ContextConsumer: ContextConsumer,
            	ContextProvider: ContextProvider,
            	Element: Element,
            	ForwardRef: ForwardRef,
            	Fragment: Fragment,
            	Lazy: Lazy,
            	Memo: Memo,
            	Portal: Portal,
            	Profiler: Profiler,
            	StrictMode: StrictMode,
            	Suspense: Suspense,
            	isAsyncMode: isAsyncMode,
            	isConcurrentMode: isConcurrentMode,
            	isContextConsumer: isContextConsumer,
            	isContextProvider: isContextProvider,
            	isElement: isElement$1,
            	isForwardRef: isForwardRef,
            	isFragment: isFragment,
            	isLazy: isLazy,
            	isMemo: isMemo,
            	isPortal: isPortal,
            	isProfiler: isProfiler,
            	isStrictMode: isStrictMode,
            	isSuspense: isSuspense,
            	isValidElementType: isValidElementType,
            	typeOf: typeOf
            };

            var reactIs_development = createCommonjsModule(function (module, exports) {

            if (process.env.NODE_ENV !== "production") {
              (function() {

            // ATTENTION
            // When adding new symbols to this file,
            // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
            // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
            // nor polyfill, then a plain number is used for performance.
            var REACT_ELEMENT_TYPE = 0xeac7;
            var REACT_PORTAL_TYPE = 0xeaca;
            var REACT_FRAGMENT_TYPE = 0xeacb;
            var REACT_STRICT_MODE_TYPE = 0xeacc;
            var REACT_PROFILER_TYPE = 0xead2;
            var REACT_PROVIDER_TYPE = 0xeacd;
            var REACT_CONTEXT_TYPE = 0xeace;
            var REACT_FORWARD_REF_TYPE = 0xead0;
            var REACT_SUSPENSE_TYPE = 0xead1;
            var REACT_SUSPENSE_LIST_TYPE = 0xead8;
            var REACT_MEMO_TYPE = 0xead3;
            var REACT_LAZY_TYPE = 0xead4;
            var REACT_BLOCK_TYPE = 0xead9;
            var REACT_SERVER_BLOCK_TYPE = 0xeada;
            var REACT_FUNDAMENTAL_TYPE = 0xead5;
            var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
            var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

            if (typeof Symbol === 'function' && Symbol.for) {
              var symbolFor = Symbol.for;
              REACT_ELEMENT_TYPE = symbolFor('react.element');
              REACT_PORTAL_TYPE = symbolFor('react.portal');
              REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
              REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
              REACT_PROFILER_TYPE = symbolFor('react.profiler');
              REACT_PROVIDER_TYPE = symbolFor('react.provider');
              REACT_CONTEXT_TYPE = symbolFor('react.context');
              REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
              REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
              REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
              REACT_MEMO_TYPE = symbolFor('react.memo');
              REACT_LAZY_TYPE = symbolFor('react.lazy');
              REACT_BLOCK_TYPE = symbolFor('react.block');
              REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
              REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
              symbolFor('react.scope');
              symbolFor('react.opaque.id');
              REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
              symbolFor('react.offscreen');
              REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
            }

            // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

            var enableScopeAPI = false; // Experimental Create Event Handle API.

            function isValidElementType(type) {
              if (typeof type === 'string' || typeof type === 'function') {
                return true;
              } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


              if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
                return true;
              }

              if (typeof type === 'object' && type !== null) {
                if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
                  return true;
                }
              }

              return false;
            }

            function typeOf(object) {
              if (typeof object === 'object' && object !== null) {
                var $$typeof = object.$$typeof;

                switch ($$typeof) {
                  case REACT_ELEMENT_TYPE:
                    var type = object.type;

                    switch (type) {
                      case REACT_FRAGMENT_TYPE:
                      case REACT_PROFILER_TYPE:
                      case REACT_STRICT_MODE_TYPE:
                      case REACT_SUSPENSE_TYPE:
                      case REACT_SUSPENSE_LIST_TYPE:
                        return type;

                      default:
                        var $$typeofType = type && type.$$typeof;

                        switch ($$typeofType) {
                          case REACT_CONTEXT_TYPE:
                          case REACT_FORWARD_REF_TYPE:
                          case REACT_LAZY_TYPE:
                          case REACT_MEMO_TYPE:
                          case REACT_PROVIDER_TYPE:
                            return $$typeofType;

                          default:
                            return $$typeof;
                        }

                    }

                  case REACT_PORTAL_TYPE:
                    return $$typeof;
                }
              }

              return undefined;
            }
            var ContextConsumer = REACT_CONTEXT_TYPE;
            var ContextProvider = REACT_PROVIDER_TYPE;
            var Element = REACT_ELEMENT_TYPE;
            var ForwardRef = REACT_FORWARD_REF_TYPE;
            var Fragment = REACT_FRAGMENT_TYPE;
            var Lazy = REACT_LAZY_TYPE;
            var Memo = REACT_MEMO_TYPE;
            var Portal = REACT_PORTAL_TYPE;
            var Profiler = REACT_PROFILER_TYPE;
            var StrictMode = REACT_STRICT_MODE_TYPE;
            var Suspense = REACT_SUSPENSE_TYPE;
            var hasWarnedAboutDeprecatedIsAsyncMode = false;
            var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

            function isAsyncMode(object) {
              {
                if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                  hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

                  console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
                }
              }

              return false;
            }
            function isConcurrentMode(object) {
              {
                if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
                  hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

                  console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
                }
              }

              return false;
            }
            function isContextConsumer(object) {
              return typeOf(object) === REACT_CONTEXT_TYPE;
            }
            function isContextProvider(object) {
              return typeOf(object) === REACT_PROVIDER_TYPE;
            }
            function isElement(object) {
              return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function isForwardRef(object) {
              return typeOf(object) === REACT_FORWARD_REF_TYPE;
            }
            function isFragment(object) {
              return typeOf(object) === REACT_FRAGMENT_TYPE;
            }
            function isLazy(object) {
              return typeOf(object) === REACT_LAZY_TYPE;
            }
            function isMemo(object) {
              return typeOf(object) === REACT_MEMO_TYPE;
            }
            function isPortal(object) {
              return typeOf(object) === REACT_PORTAL_TYPE;
            }
            function isProfiler(object) {
              return typeOf(object) === REACT_PROFILER_TYPE;
            }
            function isStrictMode(object) {
              return typeOf(object) === REACT_STRICT_MODE_TYPE;
            }
            function isSuspense(object) {
              return typeOf(object) === REACT_SUSPENSE_TYPE;
            }

            exports.ContextConsumer = ContextConsumer;
            exports.ContextProvider = ContextProvider;
            exports.Element = Element;
            exports.ForwardRef = ForwardRef;
            exports.Fragment = Fragment;
            exports.Lazy = Lazy;
            exports.Memo = Memo;
            exports.Portal = Portal;
            exports.Profiler = Profiler;
            exports.StrictMode = StrictMode;
            exports.Suspense = Suspense;
            exports.isAsyncMode = isAsyncMode;
            exports.isConcurrentMode = isConcurrentMode;
            exports.isContextConsumer = isContextConsumer;
            exports.isContextProvider = isContextProvider;
            exports.isElement = isElement;
            exports.isForwardRef = isForwardRef;
            exports.isFragment = isFragment;
            exports.isLazy = isLazy;
            exports.isMemo = isMemo;
            exports.isPortal = isPortal;
            exports.isProfiler = isProfiler;
            exports.isStrictMode = isStrictMode;
            exports.isSuspense = isSuspense;
            exports.isValidElementType = isValidElementType;
            exports.typeOf = typeOf;
              })();
            }
            });

            var reactIs = createCommonjsModule(function (module) {

            if (process.env.NODE_ENV === 'production') {
              module.exports = reactIs_production_min;
            } else {
              module.exports = reactIs_development;
            }
            });

            var ReactElement = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;

            var ReactIs = _interopRequireWildcard(reactIs);



            function _getRequireWildcardCache(nodeInterop) {
              if (typeof WeakMap !== 'function') return null;
              var cacheBabelInterop = new WeakMap();
              var cacheNodeInterop = new WeakMap();
              return (_getRequireWildcardCache = function (nodeInterop) {
                return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
              })(nodeInterop);
            }

            function _interopRequireWildcard(obj, nodeInterop) {
              if (!nodeInterop && obj && obj.__esModule) {
                return obj;
              }
              if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
                return {default: obj};
              }
              var cache = _getRequireWildcardCache(nodeInterop);
              if (cache && cache.has(obj)) {
                return cache.get(obj);
              }
              var newObj = {};
              var hasPropertyDescriptor =
                Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var key in obj) {
                if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
                  var desc = hasPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(obj, key)
                    : null;
                  if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                  } else {
                    newObj[key] = obj[key];
                  }
                }
              }
              newObj.default = obj;
              if (cache) {
                cache.set(obj, newObj);
              }
              return newObj;
            }

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            // Given element.props.children, or subtree during recursive traversal,
            // return flattened array of children.
            const getChildren = (arg, children = []) => {
              if (Array.isArray(arg)) {
                arg.forEach(item => {
                  getChildren(item, children);
                });
              } else if (arg != null && arg !== false) {
                children.push(arg);
              }

              return children;
            };

            const getType = element => {
              const type = element.type;

              if (typeof type === 'string') {
                return type;
              }

              if (typeof type === 'function') {
                return type.displayName || type.name || 'Unknown';
              }

              if (ReactIs.isFragment(element)) {
                return 'React.Fragment';
              }

              if (ReactIs.isSuspense(element)) {
                return 'React.Suspense';
              }

              if (typeof type === 'object' && type !== null) {
                if (ReactIs.isContextProvider(element)) {
                  return 'Context.Provider';
                }

                if (ReactIs.isContextConsumer(element)) {
                  return 'Context.Consumer';
                }

                if (ReactIs.isForwardRef(element)) {
                  if (type.displayName) {
                    return type.displayName;
                  }

                  const functionName = type.render.displayName || type.render.name || '';
                  return functionName !== ''
                    ? 'ForwardRef(' + functionName + ')'
                    : 'ForwardRef';
                }

                if (ReactIs.isMemo(element)) {
                  const functionName =
                    type.displayName || type.type.displayName || type.type.name || '';
                  return functionName !== '' ? 'Memo(' + functionName + ')' : 'Memo';
                }
              }

              return 'UNDEFINED';
            };

            const getPropKeys = element => {
              const {props} = element;
              return Object.keys(props)
                .filter(key => key !== 'children' && props[key] !== undefined)
                .sort();
            };

            const serialize = (element, config, indentation, depth, refs, printer) =>
              ++depth > config.maxDepth
                ? (0, markup.printElementAsLeaf)(getType(element), config)
                : (0, markup.printElement)(
                    getType(element),
                    (0, markup.printProps)(
                      getPropKeys(element),
                      element.props,
                      config,
                      indentation + config.indent,
                      depth,
                      refs,
                      printer
                    ),
                    (0, markup.printChildren)(
                      getChildren(element.props.children),
                      config,
                      indentation + config.indent,
                      depth,
                      refs,
                      printer
                    ),
                    config,
                    indentation
                  );

            exports.serialize = serialize;

            const test = val => val != null && ReactIs.isElement(val);

            exports.test = test;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var ReactTestComponent = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.test = exports.serialize = exports.default = void 0;



            var global = (function () {
              if (typeof globalThis !== 'undefined') {
                return globalThis;
              } else if (typeof global !== 'undefined') {
                return global;
              } else if (typeof self !== 'undefined') {
                return self;
              } else if (typeof window !== 'undefined') {
                return window;
              } else {
                return Function('return this')();
              }
            })();

            var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
            const testSymbol =
              typeof Symbol === 'function' && Symbol.for
                ? Symbol.for('react.test.json')
                : 0xea71357;

            const getPropKeys = object => {
              const {props} = object;
              return props
                ? Object.keys(props)
                    .filter(key => props[key] !== undefined)
                    .sort()
                : [];
            };

            const serialize = (object, config, indentation, depth, refs, printer) =>
              ++depth > config.maxDepth
                ? (0, markup.printElementAsLeaf)(object.type, config)
                : (0, markup.printElement)(
                    object.type,
                    object.props
                      ? (0, markup.printProps)(
                          getPropKeys(object),
                          object.props,
                          config,
                          indentation + config.indent,
                          depth,
                          refs,
                          printer
                        )
                      : '',
                    object.children
                      ? (0, markup.printChildren)(
                          object.children,
                          config,
                          indentation + config.indent,
                          depth,
                          refs,
                          printer
                        )
                      : '',
                    config,
                    indentation
                  );

            exports.serialize = serialize;

            const test = val => val && val.$$typeof === testSymbol;

            exports.test = test;
            const plugin = {
              serialize,
              test
            };
            var _default = plugin;
            exports.default = _default;
            });

            var build$1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = exports.DEFAULT_OPTIONS = void 0;
            exports.format = format;
            exports.plugins = void 0;

            var _ansiStyles = _interopRequireDefault(ansiStyles);



            var _AsymmetricMatcher = _interopRequireDefault(
              AsymmetricMatcher
            );

            var _ConvertAnsi = _interopRequireDefault(ConvertAnsi);

            var _DOMCollection = _interopRequireDefault(DOMCollection$1);

            var _DOMElement = _interopRequireDefault(DOMElement);

            var _Immutable = _interopRequireDefault(Immutable);

            var _ReactElement = _interopRequireDefault(ReactElement);

            var _ReactTestComponent = _interopRequireDefault(
              ReactTestComponent
            );

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {default: obj};
            }

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            /* eslint-disable local/ban-types-eventually */
            const toString = Object.prototype.toString;
            const toISOString = Date.prototype.toISOString;
            const errorToString = Error.prototype.toString;
            const regExpToString = RegExp.prototype.toString;
            /**
             * Explicitly comparing typeof constructor to function avoids undefined as name
             * when mock identity-obj-proxy returns the key as the value for any key.
             */

            const getConstructorName = val =>
              (typeof val.constructor === 'function' && val.constructor.name) || 'Object';
            /* global window */

            /** Is val is equal to global window object? Works even if it does not exist :) */

            const isWindow = val => typeof window !== 'undefined' && val === window;

            const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
            const NEWLINE_REGEXP = /\n/gi;

            class PrettyFormatPluginError extends Error {
              constructor(message, stack) {
                super(message);
                this.stack = stack;
                this.name = this.constructor.name;
              }
            }

            function isToStringedArrayType(toStringed) {
              return (
                toStringed === '[object Array]' ||
                toStringed === '[object ArrayBuffer]' ||
                toStringed === '[object DataView]' ||
                toStringed === '[object Float32Array]' ||
                toStringed === '[object Float64Array]' ||
                toStringed === '[object Int8Array]' ||
                toStringed === '[object Int16Array]' ||
                toStringed === '[object Int32Array]' ||
                toStringed === '[object Uint8Array]' ||
                toStringed === '[object Uint8ClampedArray]' ||
                toStringed === '[object Uint16Array]' ||
                toStringed === '[object Uint32Array]'
              );
            }

            function printNumber(val) {
              return Object.is(val, -0) ? '-0' : String(val);
            }

            function printBigInt(val) {
              return String(`${val}n`);
            }

            function printFunction(val, printFunctionName) {
              if (!printFunctionName) {
                return '[Function]';
              }

              return '[Function ' + (val.name || 'anonymous') + ']';
            }

            function printSymbol(val) {
              return String(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
            }

            function printError(val) {
              return '[' + errorToString.call(val) + ']';
            }
            /**
             * The first port of call for printing an object, handles most of the
             * data-types in JS.
             */

            function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
              if (val === true || val === false) {
                return '' + val;
              }

              if (val === undefined) {
                return 'undefined';
              }

              if (val === null) {
                return 'null';
              }

              const typeOf = typeof val;

              if (typeOf === 'number') {
                return printNumber(val);
              }

              if (typeOf === 'bigint') {
                return printBigInt(val);
              }

              if (typeOf === 'string') {
                if (escapeString) {
                  return '"' + val.replace(/"|\\/g, '\\$&') + '"';
                }

                return '"' + val + '"';
              }

              if (typeOf === 'function') {
                return printFunction(val, printFunctionName);
              }

              if (typeOf === 'symbol') {
                return printSymbol(val);
              }

              const toStringed = toString.call(val);

              if (toStringed === '[object WeakMap]') {
                return 'WeakMap {}';
              }

              if (toStringed === '[object WeakSet]') {
                return 'WeakSet {}';
              }

              if (
                toStringed === '[object Function]' ||
                toStringed === '[object GeneratorFunction]'
              ) {
                return printFunction(val, printFunctionName);
              }

              if (toStringed === '[object Symbol]') {
                return printSymbol(val);
              }

              if (toStringed === '[object Date]') {
                return isNaN(+val) ? 'Date { NaN }' : toISOString.call(val);
              }

              if (toStringed === '[object Error]') {
                return printError(val);
              }

              if (toStringed === '[object RegExp]') {
                if (escapeRegex) {
                  // https://github.com/benjamingr/RegExp.escape/blob/main/polyfill.js
                  return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
                }

                return regExpToString.call(val);
              }

              if (val instanceof Error) {
                return printError(val);
              }

              return null;
            }
            /**
             * Handles more complex objects ( such as objects with circular references.
             * maps and sets etc )
             */

            function printComplexValue(
              val,
              config,
              indentation,
              depth,
              refs,
              hasCalledToJSON
            ) {
              if (refs.indexOf(val) !== -1) {
                return '[Circular]';
              }

              refs = refs.slice();
              refs.push(val);
              const hitMaxDepth = ++depth > config.maxDepth;
              const min = config.min;

              if (
                config.callToJSON &&
                !hitMaxDepth &&
                val.toJSON &&
                typeof val.toJSON === 'function' &&
                !hasCalledToJSON
              ) {
                return printer(val.toJSON(), config, indentation, depth, refs, true);
              }

              const toStringed = toString.call(val);

              if (toStringed === '[object Arguments]') {
                return hitMaxDepth
                  ? '[Arguments]'
                  : (min ? '' : 'Arguments ') +
                      '[' +
                      (0, collections.printListItems)(
                        val,
                        config,
                        indentation,
                        depth,
                        refs,
                        printer
                      ) +
                      ']';
              }

              if (isToStringedArrayType(toStringed)) {
                return hitMaxDepth
                  ? '[' + val.constructor.name + ']'
                  : (min
                      ? ''
                      : !config.printBasicPrototype && val.constructor.name === 'Array'
                      ? ''
                      : val.constructor.name + ' ') +
                      '[' +
                      (0, collections.printListItems)(
                        val,
                        config,
                        indentation,
                        depth,
                        refs,
                        printer
                      ) +
                      ']';
              }

              if (toStringed === '[object Map]') {
                return hitMaxDepth
                  ? '[Map]'
                  : 'Map {' +
                      (0, collections.printIteratorEntries)(
                        val.entries(),
                        config,
                        indentation,
                        depth,
                        refs,
                        printer,
                        ' => '
                      ) +
                      '}';
              }

              if (toStringed === '[object Set]') {
                return hitMaxDepth
                  ? '[Set]'
                  : 'Set {' +
                      (0, collections.printIteratorValues)(
                        val.values(),
                        config,
                        indentation,
                        depth,
                        refs,
                        printer
                      ) +
                      '}';
              } // Avoid failure to serialize global window object in jsdom test environment.
              // For example, not even relevant if window is prop of React element.

              return hitMaxDepth || isWindow(val)
                ? '[' + getConstructorName(val) + ']'
                : (min
                    ? ''
                    : !config.printBasicPrototype && getConstructorName(val) === 'Object'
                    ? ''
                    : getConstructorName(val) + ' ') +
                    '{' +
                    (0, collections.printObjectProperties)(
                      val,
                      config,
                      indentation,
                      depth,
                      refs,
                      printer
                    ) +
                    '}';
            }

            function isNewPlugin(plugin) {
              return plugin.serialize != null;
            }

            function printPlugin(plugin, val, config, indentation, depth, refs) {
              let printed;

              try {
                printed = isNewPlugin(plugin)
                  ? plugin.serialize(val, config, indentation, depth, refs, printer)
                  : plugin.print(
                      val,
                      valChild => printer(valChild, config, indentation, depth, refs),
                      str => {
                        const indentationNext = indentation + config.indent;
                        return (
                          indentationNext +
                          str.replace(NEWLINE_REGEXP, '\n' + indentationNext)
                        );
                      },
                      {
                        edgeSpacing: config.spacingOuter,
                        min: config.min,
                        spacing: config.spacingInner
                      },
                      config.colors
                    );
              } catch (error) {
                throw new PrettyFormatPluginError(error.message, error.stack);
              }

              if (typeof printed !== 'string') {
                throw new Error(
                  `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
                );
              }

              return printed;
            }

            function findPlugin(plugins, val) {
              for (let p = 0; p < plugins.length; p++) {
                try {
                  if (plugins[p].test(val)) {
                    return plugins[p];
                  }
                } catch (error) {
                  throw new PrettyFormatPluginError(error.message, error.stack);
                }
              }

              return null;
            }

            function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
              const plugin = findPlugin(config.plugins, val);

              if (plugin !== null) {
                return printPlugin(plugin, val, config, indentation, depth, refs);
              }

              const basicResult = printBasicValue(
                val,
                config.printFunctionName,
                config.escapeRegex,
                config.escapeString
              );

              if (basicResult !== null) {
                return basicResult;
              }

              return printComplexValue(
                val,
                config,
                indentation,
                depth,
                refs,
                hasCalledToJSON
              );
            }

            const DEFAULT_THEME = {
              comment: 'gray',
              content: 'reset',
              prop: 'yellow',
              tag: 'cyan',
              value: 'green'
            };
            const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
            const DEFAULT_OPTIONS = {
              callToJSON: true,
              compareKeys: undefined,
              escapeRegex: false,
              escapeString: true,
              highlight: false,
              indent: 2,
              maxDepth: Infinity,
              min: false,
              plugins: [],
              printBasicPrototype: true,
              printFunctionName: true,
              theme: DEFAULT_THEME
            };
            exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

            function validateOptions(options) {
              Object.keys(options).forEach(key => {
                if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
                  throw new Error(`pretty-format: Unknown option "${key}".`);
                }
              });

              if (options.min && options.indent !== undefined && options.indent !== 0) {
                throw new Error(
                  'pretty-format: Options "min" and "indent" cannot be used together.'
                );
              }

              if (options.theme !== undefined) {
                if (options.theme === null) {
                  throw new Error('pretty-format: Option "theme" must not be null.');
                }

                if (typeof options.theme !== 'object') {
                  throw new Error(
                    `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
                  );
                }
              }
            }

            const getColorsHighlight = options =>
              DEFAULT_THEME_KEYS.reduce((colors, key) => {
                const value =
                  options.theme && options.theme[key] !== undefined
                    ? options.theme[key]
                    : DEFAULT_THEME[key];
                const color = value && _ansiStyles.default[value];

                if (
                  color &&
                  typeof color.close === 'string' &&
                  typeof color.open === 'string'
                ) {
                  colors[key] = color;
                } else {
                  throw new Error(
                    `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
                  );
                }

                return colors;
              }, Object.create(null));

            const getColorsEmpty = () =>
              DEFAULT_THEME_KEYS.reduce((colors, key) => {
                colors[key] = {
                  close: '',
                  open: ''
                };
                return colors;
              }, Object.create(null));

            const getPrintFunctionName = options =>
              options && options.printFunctionName !== undefined
                ? options.printFunctionName
                : DEFAULT_OPTIONS.printFunctionName;

            const getEscapeRegex = options =>
              options && options.escapeRegex !== undefined
                ? options.escapeRegex
                : DEFAULT_OPTIONS.escapeRegex;

            const getEscapeString = options =>
              options && options.escapeString !== undefined
                ? options.escapeString
                : DEFAULT_OPTIONS.escapeString;

            const getConfig = options => {
              var _options$printBasicPr;

              return {
                callToJSON:
                  options && options.callToJSON !== undefined
                    ? options.callToJSON
                    : DEFAULT_OPTIONS.callToJSON,
                colors:
                  options && options.highlight
                    ? getColorsHighlight(options)
                    : getColorsEmpty(),
                compareKeys:
                  options && typeof options.compareKeys === 'function'
                    ? options.compareKeys
                    : DEFAULT_OPTIONS.compareKeys,
                escapeRegex: getEscapeRegex(options),
                escapeString: getEscapeString(options),
                indent:
                  options && options.min
                    ? ''
                    : createIndent(
                        options && options.indent !== undefined
                          ? options.indent
                          : DEFAULT_OPTIONS.indent
                      ),
                maxDepth:
                  options && options.maxDepth !== undefined
                    ? options.maxDepth
                    : DEFAULT_OPTIONS.maxDepth,
                min:
                  options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
                plugins:
                  options && options.plugins !== undefined
                    ? options.plugins
                    : DEFAULT_OPTIONS.plugins,
                printBasicPrototype:
                  (_options$printBasicPr =
                    options === null || options === void 0
                      ? void 0
                      : options.printBasicPrototype) !== null &&
                  _options$printBasicPr !== void 0
                    ? _options$printBasicPr
                    : true,
                printFunctionName: getPrintFunctionName(options),
                spacingInner: options && options.min ? ' ' : '\n',
                spacingOuter: options && options.min ? '' : '\n'
              };
            };

            function createIndent(indent) {
              return new Array(indent + 1).join(' ');
            }
            /**
             * Returns a presentation string of your `val` object
             * @param val any potential JavaScript object
             * @param options Custom settings
             */

            function format(val, options) {
              if (options) {
                validateOptions(options);

                if (options.plugins) {
                  const plugin = findPlugin(options.plugins, val);

                  if (plugin !== null) {
                    return printPlugin(plugin, val, getConfig(options), '', 0, []);
                  }
                }
              }

              const basicResult = printBasicValue(
                val,
                getPrintFunctionName(options),
                getEscapeRegex(options),
                getEscapeString(options)
              );

              if (basicResult !== null) {
                return basicResult;
              }

              return printComplexValue(val, getConfig(options), '', 0, []);
            }

            const plugins = {
              AsymmetricMatcher: _AsymmetricMatcher.default,
              ConvertAnsi: _ConvertAnsi.default,
              DOMCollection: _DOMCollection.default,
              DOMElement: _DOMElement.default,
              Immutable: _Immutable.default,
              ReactElement: _ReactElement.default,
              ReactTestComponent: _ReactTestComponent.default
            };
            exports.plugins = plugins;
            var _default = format;
            exports.default = _default;
            });

            var index$1 = /*@__PURE__*/getDefaultExportFromCjs(build$1);

            var index$2 = /*#__PURE__*/_mergeNamespaces({
                        __proto__: null,
                        'default': index$1
            }, [build$1]);

            /**
             * @source {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill}
             * but without thisArg (too hard to type, no need to `this`)
             */
            var toStr = Object.prototype.toString;

            function isCallable(fn) {
              return typeof fn === "function" || toStr.call(fn) === "[object Function]";
            }

            function toInteger(value) {
              var number = Number(value);

              if (isNaN(number)) {
                return 0;
              }

              if (number === 0 || !isFinite(number)) {
                return number;
              }

              return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            }

            var maxSafeInteger = Math.pow(2, 53) - 1;

            function toLength(value) {
              var len = toInteger(value);
              return Math.min(Math.max(len, 0), maxSafeInteger);
            }
            /**
             * Creates an array from an iterable object.
             * @param iterable An iterable object to convert to an array.
             */


            /**
             * Creates an array from an iterable object.
             * @param iterable An iterable object to convert to an array.
             * @param mapfn A mapping function to call on every element of the array.
             * @param thisArg Value of 'this' used to invoke the mapfn.
             */
            function arrayFrom(arrayLike, mapFn) {
              // 1. Let C be the this value.
              // edit(@eps1lon): we're not calling it as Array.from
              var C = Array; // 2. Let items be ToObject(arrayLike).

              var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

              if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
              } // 4. If mapfn is undefined, then let mapping be false.
              // const mapFn = arguments.length > 1 ? arguments[1] : void undefined;


              if (typeof mapFn !== "undefined") {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                  throw new TypeError("Array.from: when provided, the second argument must be a function");
                }
              } // 10. Let lenValue be Get(items, "length").
              // 11. Let len be ToLength(lenValue).


              var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
              // 13. a. Let A be the result of calling the [[Construct]] internal method
              // of C with an argument list containing the single item len.
              // 14. a. Else, Let A be ArrayCreate(len).

              var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

              var k = 0; // 17. Repeat, while k < len… (also steps a - h)

              var kValue;

              while (k < len) {
                kValue = items[k];

                if (mapFn) {
                  A[k] = mapFn(kValue, k);
                } else {
                  A[k] = kValue;
                }

                k += 1;
              } // 18. Let putStatus be Put(A, "length", len, true).


              A.length = len; // 20. Return A.

              return A;
            }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            // for environments without Set we fallback to arrays with unique members
            var SetLike = /*#__PURE__*/function () {
              function SetLike() {
                var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                _classCallCheck(this, SetLike);

                _defineProperty(this, "items", void 0);

                this.items = items;
              }

              _createClass(SetLike, [{
                key: "add",
                value: function add(value) {
                  if (this.has(value) === false) {
                    this.items.push(value);
                  }

                  return this;
                }
              }, {
                key: "clear",
                value: function clear() {
                  this.items = [];
                }
              }, {
                key: "delete",
                value: function _delete(value) {
                  var previousLength = this.items.length;
                  this.items = this.items.filter(function (item) {
                    return item !== value;
                  });
                  return previousLength !== this.items.length;
                }
              }, {
                key: "forEach",
                value: function forEach(callbackfn) {
                  var _this = this;

                  this.items.forEach(function (item) {
                    callbackfn(item, item, _this);
                  });
                }
              }, {
                key: "has",
                value: function has(value) {
                  return this.items.indexOf(value) !== -1;
                }
              }, {
                key: "size",
                get: function get() {
                  return this.items.length;
                }
              }]);

              return SetLike;
            }();

            var SetLike$1 = typeof Set === "undefined" ? Set : SetLike;

            // https://w3c.github.io/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html

            /**
             * Safe Element.localName for all supported environments
             * @param element
             */
            function getLocalName(element) {
              var _element$localName;

              return (// eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
                (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : // eslint-disable-next-line no-restricted-properties -- required for the fallback
                element.tagName.toLowerCase()
              );
            }
            var localNameToRoleMappings = {
              article: "article",
              aside: "complementary",
              button: "button",
              datalist: "listbox",
              dd: "definition",
              details: "group",
              dialog: "dialog",
              dt: "term",
              fieldset: "group",
              figure: "figure",
              // WARNING: Only with an accessible name
              form: "form",
              footer: "contentinfo",
              h1: "heading",
              h2: "heading",
              h3: "heading",
              h4: "heading",
              h5: "heading",
              h6: "heading",
              header: "banner",
              hr: "separator",
              html: "document",
              legend: "legend",
              li: "listitem",
              math: "math",
              main: "main",
              menu: "list",
              nav: "navigation",
              ol: "list",
              optgroup: "group",
              // WARNING: Only in certain context
              option: "option",
              output: "status",
              progress: "progressbar",
              // WARNING: Only with an accessible name
              section: "region",
              summary: "button",
              table: "table",
              tbody: "rowgroup",
              textarea: "textbox",
              tfoot: "rowgroup",
              // WARNING: Only in certain context
              td: "cell",
              th: "columnheader",
              thead: "rowgroup",
              tr: "row",
              ul: "list"
            };
            var prohibitedAttributes = {
              caption: new Set(["aria-label", "aria-labelledby"]),
              code: new Set(["aria-label", "aria-labelledby"]),
              deletion: new Set(["aria-label", "aria-labelledby"]),
              emphasis: new Set(["aria-label", "aria-labelledby"]),
              generic: new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
              insertion: new Set(["aria-label", "aria-labelledby"]),
              paragraph: new Set(["aria-label", "aria-labelledby"]),
              presentation: new Set(["aria-label", "aria-labelledby"]),
              strong: new Set(["aria-label", "aria-labelledby"]),
              subscript: new Set(["aria-label", "aria-labelledby"]),
              superscript: new Set(["aria-label", "aria-labelledby"])
            };
            /**
             *
             * @param element
             * @param role The role used for this element. This is specified to control whether you want to use the implicit or explicit role.
             */

            function hasGlobalAriaAttributes(element, role) {
              // https://rawgit.com/w3c/aria/stable/#global_states
              // commented attributes are deprecated
              return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", // "disabled",
              "aria-dropeffect", // "errormessage",
              "aria-flowto", "aria-grabbed", // "haspopup",
              "aria-hidden", // "invalid",
              "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function (attributeName) {
                var _prohibitedAttributes;

                return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
              });
            }

            function ignorePresentationalRole(element, implicitRole) {
              // https://rawgit.com/w3c/aria/stable/#conflict_resolution_presentation_none
              return hasGlobalAriaAttributes(element, implicitRole);
            }

            function getRole(element) {
              var explicitRole = getExplicitRole(element);

              if (explicitRole === null || explicitRole === "presentation") {
                var implicitRole = getImplicitRole(element);

                if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
                  return implicitRole;
                }
              }

              return explicitRole;
            }

            function getImplicitRole(element) {
              var mappedByTag = localNameToRoleMappings[getLocalName(element)];

              if (mappedByTag !== undefined) {
                return mappedByTag;
              }

              switch (getLocalName(element)) {
                case "a":
                case "area":
                case "link":
                  if (element.hasAttribute("href")) {
                    return "link";
                  }

                  break;

                case "img":
                  if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
                    return "presentation";
                  }

                  return "img";

                case "input":
                  {
                    var _ref = element,
                        type = _ref.type;

                    switch (type) {
                      case "button":
                      case "image":
                      case "reset":
                      case "submit":
                        return "button";

                      case "checkbox":
                      case "radio":
                        return type;

                      case "range":
                        return "slider";

                      case "email":
                      case "tel":
                      case "text":
                      case "url":
                        if (element.hasAttribute("list")) {
                          return "combobox";
                        }

                        return "textbox";

                      case "search":
                        if (element.hasAttribute("list")) {
                          return "combobox";
                        }

                        return "searchbox";

                      case "number":
                        return "spinbutton";

                      default:
                        return null;
                    }
                  }

                case "select":
                  if (element.hasAttribute("multiple") || element.size > 1) {
                    return "listbox";
                  }

                  return "combobox";
              }

              return null;
            }

            function getExplicitRole(element) {
              var role = element.getAttribute("role");

              if (role !== null) {
                var explicitRole = role.trim().split(" ")[0]; // String.prototype.split(sep, limit) will always return an array with at least one member
                // as long as limit is either undefined or > 0

                if (explicitRole.length > 0) {
                  return explicitRole;
                }
              }

              return null;
            }

            function isElement(node) {
              return node !== null && node.nodeType === node.ELEMENT_NODE;
            }
            function isHTMLTableCaptionElement(node) {
              return isElement(node) && getLocalName(node) === "caption";
            }
            function isHTMLInputElement(node) {
              return isElement(node) && getLocalName(node) === "input";
            }
            function isHTMLOptGroupElement(node) {
              return isElement(node) && getLocalName(node) === "optgroup";
            }
            function isHTMLSelectElement(node) {
              return isElement(node) && getLocalName(node) === "select";
            }
            function isHTMLTableElement(node) {
              return isElement(node) && getLocalName(node) === "table";
            }
            function isHTMLTextAreaElement(node) {
              return isElement(node) && getLocalName(node) === "textarea";
            }
            function safeWindow(node) {
              var _ref = node.ownerDocument === null ? node : node.ownerDocument,
                  defaultView = _ref.defaultView;

              if (defaultView === null) {
                throw new TypeError("no window available");
              }

              return defaultView;
            }
            function isHTMLFieldSetElement(node) {
              return isElement(node) && getLocalName(node) === "fieldset";
            }
            function isHTMLLegendElement(node) {
              return isElement(node) && getLocalName(node) === "legend";
            }
            function isHTMLSlotElement(node) {
              return isElement(node) && getLocalName(node) === "slot";
            }
            function isSVGElement(node) {
              return isElement(node) && node.ownerSVGElement !== undefined;
            }
            function isSVGSVGElement(node) {
              return isElement(node) && getLocalName(node) === "svg";
            }
            function isSVGTitleElement(node) {
              return isSVGElement(node) && getLocalName(node) === "title";
            }
            /**
             *
             * @param {Node} node -
             * @param {string} attributeName -
             * @returns {Element[]} -
             */

            function queryIdRefs(node, attributeName) {
              if (isElement(node) && node.hasAttribute(attributeName)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute check
                var ids = node.getAttribute(attributeName).split(" ");
                return ids.map(function (id) {
                  return node.ownerDocument.getElementById(id);
                }).filter(function (element) {
                  return element !== null;
                } // TODO: why does this not narrow?
                );
              }

              return [];
            }
            function hasAnyConcreteRoles(node, roles) {
              if (isElement(node)) {
                return roles.indexOf(getRole(node)) !== -1;
              }

              return false;
            }

            /**
             * implements https://w3c.github.io/accname/
             */
            /**
             *  A string of characters where all carriage returns, newlines, tabs, and form-feeds are replaced with a single space, and multiple spaces are reduced to a single space. The string contains only character data; it does not contain any markup.
             */

            /**
             *
             * @param {string} string -
             * @returns {FlatString} -
             */
            function asFlatString(s) {
              return s.trim().replace(/\s\s+/g, " ");
            }
            /**
             *
             * @param node -
             * @param options - These are not optional to prevent accidentally calling it without options in `computeAccessibleName`
             * @returns {boolean} -
             */


            function isHidden(node, getComputedStyleImplementation) {
              if (!isElement(node)) {
                return false;
              }

              if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
                return true;
              }

              var style = getComputedStyleImplementation(node);
              return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
            }
            /**
             * @param {Node} node -
             * @returns {boolean} - As defined in step 2E of https://w3c.github.io/accname/#mapping_additional_nd_te
             */


            function isControl(node) {
              return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
            }

            function hasAbstractRole(node, role) {
              if (!isElement(node)) {
                return false;
              }

              switch (role) {
                case "range":
                  return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);

                default:
                  throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
              }
            }
            /**
             * element.querySelectorAll but also considers owned tree
             * @param element
             * @param selectors
             */


            function querySelectorAllSubtree(element, selectors) {
              var elements = arrayFrom(element.querySelectorAll(selectors));
              queryIdRefs(element, "aria-owns").forEach(function (root) {
                // babel transpiles this assuming an iterator
                elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
              });
              return elements;
            }

            function querySelectedOptions(listbox) {
              if (isHTMLSelectElement(listbox)) {
                // IE11 polyfill
                return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
              }

              return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
            }

            function isMarkedPresentational(node) {
              return hasAnyConcreteRoles(node, ["none", "presentation"]);
            }
            /**
             * Elements specifically listed in html-aam
             *
             * We don't need this for `label` or `legend` elements.
             * Their implicit roles already allow "naming from content".
             *
             * sources:
             *
             * - https://w3c.github.io/html-aam/#table-element
             */


            function isNativeHostLanguageTextAlternativeElement(node) {
              return isHTMLTableCaptionElement(node);
            }
            /**
             * https://w3c.github.io/aria/#namefromcontent
             */


            function allowsNameFromContent(node) {
              return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
            }
            /**
             * TODO https://github.com/eps1lon/dom-accessibility-api/issues/100
             */


            function isDescendantOfNativeHostLanguageTextAlternativeElement( // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not implemented yet
            node) {
              return false;
            }

            function getValueOfTextbox(element) {
              if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
                return element.value;
              } // https://github.com/eps1lon/dom-accessibility-api/issues/4


              return element.textContent || "";
            }

            function getTextualContent(declaration) {
              var content = declaration.getPropertyValue("content");

              if (/^["'].*["']$/.test(content)) {
                return content.slice(1, -1);
              }

              return "";
            }
            /**
             * https://html.spec.whatwg.org/multipage/forms.html#category-label
             * TODO: form-associated custom elements
             * @param element
             */


            function isLabelableElement(element) {
              var localName = getLocalName(element);
              return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
            }
            /**
             * > [...], then the first such descendant in tree order is the label element's labeled control.
             * -- https://html.spec.whatwg.org/multipage/forms.html#labeled-control
             * @param element
             */


            function findLabelableElement(element) {
              if (isLabelableElement(element)) {
                return element;
              }

              var labelableElement = null;
              element.childNodes.forEach(function (childNode) {
                if (labelableElement === null && isElement(childNode)) {
                  var descendantLabelableElement = findLabelableElement(childNode);

                  if (descendantLabelableElement !== null) {
                    labelableElement = descendantLabelableElement;
                  }
                }
              });
              return labelableElement;
            }
            /**
             * Polyfill of HTMLLabelElement.control
             * https://html.spec.whatwg.org/multipage/forms.html#labeled-control
             * @param label
             */


            function getControlOfLabel(label) {
              if (label.control !== undefined) {
                return label.control;
              }

              var htmlFor = label.getAttribute("for");

              if (htmlFor !== null) {
                return label.ownerDocument.getElementById(htmlFor);
              }

              return findLabelableElement(label);
            }
            /**
             * Polyfill of HTMLInputElement.labels
             * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels
             * @param element
             */


            function getLabels$1(element) {
              var labelsProperty = element.labels;

              if (labelsProperty === null) {
                return labelsProperty;
              }

              if (labelsProperty !== undefined) {
                return arrayFrom(labelsProperty);
              } // polyfill


              if (!isLabelableElement(element)) {
                return null;
              }

              var document = element.ownerDocument;
              return arrayFrom(document.querySelectorAll("label")).filter(function (label) {
                return getControlOfLabel(label) === element;
              });
            }
            /**
             * Gets the contents of a slot used for computing the accname
             * @param slot
             */


            function getSlotContents(slot) {
              // Computing the accessible name for elements containing slots is not
              // currently defined in the spec. This implementation reflects the
              // behavior of NVDA 2020.2/Firefox 81 and iOS VoiceOver/Safari 13.6.
              var assignedNodes = slot.assignedNodes();

              if (assignedNodes.length === 0) {
                // if no nodes are assigned to the slot, it displays the default content
                return arrayFrom(slot.childNodes);
              }

              return assignedNodes;
            }
            /**
             * implements https://w3c.github.io/accname/#mapping_additional_nd_te
             * @param root
             * @param options
             * @returns
             */


            function computeTextAlternative(root) {
              var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              var consultedNodes = new SetLike$1();
              var window = safeWindow(root);
              var _options$compute = options.compute,
                  compute = _options$compute === void 0 ? "name" : _options$compute,
                  _options$computedStyl = options.computedStyleSupportsPseudoElements,
                  computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== undefined : _options$computedStyl,
                  _options$getComputedS = options.getComputedStyle,
                  getComputedStyle = _options$getComputedS === void 0 ? window.getComputedStyle.bind(window) : _options$getComputedS,
                  _options$hidden = options.hidden,
                  hidden = _options$hidden === void 0 ? false : _options$hidden; // 2F.i

              function computeMiscTextAlternative(node, context) {
                var accumulatedText = "";

                if (isElement(node) && computedStyleSupportsPseudoElements) {
                  var pseudoBefore = getComputedStyle(node, "::before");
                  var beforeContent = getTextualContent(pseudoBefore);
                  accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
                } // FIXME: Including aria-owns is not defined in the spec
                // But it is required in the web-platform-test


                var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
                childNodes.forEach(function (child) {
                  var result = computeTextAlternative(child, {
                    isEmbeddedInLabel: context.isEmbeddedInLabel,
                    isReferenced: false,
                    recursion: true
                  }); // TODO: Unclear why display affects delimiter
                  // see https://github.com/w3c/accname/issues/3

                  var display = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
                  var separator = display !== "inline" ? " " : ""; // trailing separator for wpt tests

                  accumulatedText += "".concat(separator).concat(result).concat(separator);
                });

                if (isElement(node) && computedStyleSupportsPseudoElements) {
                  var pseudoAfter = getComputedStyle(node, "::after");
                  var afterContent = getTextualContent(pseudoAfter);
                  accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
                }

                return accumulatedText.trim();
              }

              function computeElementTextAlternative(node) {
                if (!isElement(node)) {
                  return null;
                }
                /**
                 *
                 * @param element
                 * @param attributeName
                 * @returns A string non-empty string or `null`
                 */


                function useAttribute(element, attributeName) {
                  var attribute = element.getAttributeNode(attributeName);

                  if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
                    consultedNodes.add(attribute);
                    return attribute.value;
                  }

                  return null;
                } // https://w3c.github.io/html-aam/#fieldset-and-legend-elements


                if (isHTMLFieldSetElement(node)) {
                  consultedNodes.add(node);
                  var children = arrayFrom(node.childNodes);

                  for (var i = 0; i < children.length; i += 1) {
                    var child = children[i];

                    if (isHTMLLegendElement(child)) {
                      return computeTextAlternative(child, {
                        isEmbeddedInLabel: false,
                        isReferenced: false,
                        recursion: false
                      });
                    }
                  }
                } else if (isHTMLTableElement(node)) {
                  // https://w3c.github.io/html-aam/#table-element
                  consultedNodes.add(node);

                  var _children = arrayFrom(node.childNodes);

                  for (var _i = 0; _i < _children.length; _i += 1) {
                    var _child = _children[_i];

                    if (isHTMLTableCaptionElement(_child)) {
                      return computeTextAlternative(_child, {
                        isEmbeddedInLabel: false,
                        isReferenced: false,
                        recursion: false
                      });
                    }
                  }
                } else if (isSVGSVGElement(node)) {
                  // https://www.w3.org/TR/svg-aam-1.0/
                  consultedNodes.add(node);

                  var _children2 = arrayFrom(node.childNodes);

                  for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
                    var _child2 = _children2[_i2];

                    if (isSVGTitleElement(_child2)) {
                      return _child2.textContent;
                    }
                  }

                  return null;
                } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
                  // https://w3c.github.io/html-aam/#area-element
                  // https://w3c.github.io/html-aam/#img-element
                  var nameFromAlt = useAttribute(node, "alt");

                  if (nameFromAlt !== null) {
                    return nameFromAlt;
                  }
                } else if (isHTMLOptGroupElement(node)) {
                  var nameFromLabel = useAttribute(node, "label");

                  if (nameFromLabel !== null) {
                    return nameFromLabel;
                  }
                }

                if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
                  // https://w3c.github.io/html-aam/#input-type-text-input-type-password-input-type-search-input-type-tel-input-type-email-input-type-url-and-textarea-element-accessible-description-computation
                  var nameFromValue = useAttribute(node, "value");

                  if (nameFromValue !== null) {
                    return nameFromValue;
                  } // TODO: l10n


                  if (node.type === "submit") {
                    return "Submit";
                  } // TODO: l10n


                  if (node.type === "reset") {
                    return "Reset";
                  }
                }

                var labels = getLabels$1(node);

                if (labels !== null && labels.length !== 0) {
                  consultedNodes.add(node);
                  return arrayFrom(labels).map(function (element) {
                    return computeTextAlternative(element, {
                      isEmbeddedInLabel: true,
                      isReferenced: false,
                      recursion: true
                    });
                  }).filter(function (label) {
                    return label.length > 0;
                  }).join(" ");
                } // https://w3c.github.io/html-aam/#input-type-image-accessible-name-computation
                // TODO: wpt test consider label elements but html-aam does not mention them
                // We follow existing implementations over spec


                if (isHTMLInputElement(node) && node.type === "image") {
                  var _nameFromAlt = useAttribute(node, "alt");

                  if (_nameFromAlt !== null) {
                    return _nameFromAlt;
                  }

                  var nameFromTitle = useAttribute(node, "title");

                  if (nameFromTitle !== null) {
                    return nameFromTitle;
                  } // TODO: l10n


                  return "Submit Query";
                }

                if (hasAnyConcreteRoles(node, ["button"])) {
                  // https://www.w3.org/TR/html-aam-1.0/#button-element
                  var nameFromSubTree = computeMiscTextAlternative(node, {
                    isEmbeddedInLabel: false,
                    isReferenced: false
                  });

                  if (nameFromSubTree !== "") {
                    return nameFromSubTree;
                  }

                  return useAttribute(node, "title");
                }

                return useAttribute(node, "title");
              }

              function computeTextAlternative(current, context) {
                if (consultedNodes.has(current)) {
                  return "";
                } // 2A


                if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
                  consultedNodes.add(current);
                  return "";
                } // 2B


                var labelElements = queryIdRefs(current, "aria-labelledby");

                if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
                  return labelElements.map(function (element) {
                    return computeTextAlternative(element, {
                      isEmbeddedInLabel: context.isEmbeddedInLabel,
                      isReferenced: true,
                      // thais isn't recursion as specified, otherwise we would skip
                      // `aria-label` in
                      // <input id="myself" aria-label="foo" aria-labelledby="myself"
                      recursion: false
                    });
                  }).join(" ");
                } // 2C
                // Changed from the spec in anticipation of https://github.com/w3c/accname/issues/64
                // spec says we should only consider skipping if we have a non-empty label


                var skipToStep2E = context.recursion && isControl(current) && compute === "name";

                if (!skipToStep2E) {
                  var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();

                  if (ariaLabel !== "" && compute === "name") {
                    consultedNodes.add(current);
                    return ariaLabel;
                  } // 2D


                  if (!isMarkedPresentational(current)) {
                    var elementTextAlternative = computeElementTextAlternative(current);

                    if (elementTextAlternative !== null) {
                      consultedNodes.add(current);
                      return elementTextAlternative;
                    }
                  }
                } // special casing, cheating to make tests pass
                // https://github.com/w3c/accname/issues/67


                if (hasAnyConcreteRoles(current, ["menu"])) {
                  consultedNodes.add(current);
                  return "";
                } // 2E


                if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
                  if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
                    consultedNodes.add(current);
                    var selectedOptions = querySelectedOptions(current);

                    if (selectedOptions.length === 0) {
                      // defined per test `name_heading_combobox`
                      return isHTMLInputElement(current) ? current.value : "";
                    }

                    return arrayFrom(selectedOptions).map(function (selectedOption) {
                      return computeTextAlternative(selectedOption, {
                        isEmbeddedInLabel: context.isEmbeddedInLabel,
                        isReferenced: false,
                        recursion: true
                      });
                    }).join(" ");
                  }

                  if (hasAbstractRole(current, "range")) {
                    consultedNodes.add(current);

                    if (current.hasAttribute("aria-valuetext")) {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute guard
                      return current.getAttribute("aria-valuetext");
                    }

                    if (current.hasAttribute("aria-valuenow")) {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute guard
                      return current.getAttribute("aria-valuenow");
                    } // Otherwise, use the value as specified by a host language attribute.


                    return current.getAttribute("value") || "";
                  }

                  if (hasAnyConcreteRoles(current, ["textbox"])) {
                    consultedNodes.add(current);
                    return getValueOfTextbox(current);
                  }
                } // 2F: https://w3c.github.io/accname/#step2F


                if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
                  consultedNodes.add(current);
                  return computeMiscTextAlternative(current, {
                    isEmbeddedInLabel: context.isEmbeddedInLabel,
                    isReferenced: false
                  });
                }

                if (current.nodeType === current.TEXT_NODE) {
                  consultedNodes.add(current);
                  return current.textContent || "";
                }

                if (context.recursion) {
                  consultedNodes.add(current);
                  return computeMiscTextAlternative(current, {
                    isEmbeddedInLabel: context.isEmbeddedInLabel,
                    isReferenced: false
                  });
                }


                consultedNodes.add(current);
                return "";
              }

              return asFlatString(computeTextAlternative(root, {
                isEmbeddedInLabel: false,
                // by spec computeAccessibleDescription starts with the referenced elements as roots
                isReferenced: compute === "description",
                recursion: false
              }));
            }

            /**
             * https://w3c.github.io/aria/#namefromprohibited
             */

            function prohibitsNaming(node) {
              return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
            }
            /**
             * implements https://w3c.github.io/accname/#mapping_additional_nd_name
             * @param root
             * @param options
             * @returns
             */


            function computeAccessibleName(root) {
              var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

              if (prohibitsNaming(root)) {
                return "";
              }

              return computeTextAlternative(root, options);
            }

            var ariaPropsMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

            var properties = [['aria-activedescendant', {
              'type': 'id'
            }], ['aria-atomic', {
              'type': 'boolean'
            }], ['aria-autocomplete', {
              'type': 'token',
              'values': ['inline', 'list', 'both', 'none']
            }], ['aria-busy', {
              'type': 'boolean'
            }], ['aria-checked', {
              'type': 'tristate'
            }], ['aria-colcount', {
              type: 'integer'
            }], ['aria-colindex', {
              type: 'integer'
            }], ['aria-colspan', {
              type: 'integer'
            }], ['aria-controls', {
              'type': 'idlist'
            }], ['aria-current', {
              type: 'token',
              values: ['page', 'step', 'location', 'date', 'time', true, false]
            }], ['aria-describedby', {
              'type': 'idlist'
            }], ['aria-details', {
              'type': 'id'
            }], ['aria-disabled', {
              'type': 'boolean'
            }], ['aria-dropeffect', {
              'type': 'tokenlist',
              'values': ['copy', 'execute', 'link', 'move', 'none', 'popup']
            }], ['aria-errormessage', {
              'type': 'id'
            }], ['aria-expanded', {
              'type': 'boolean',
              'allowundefined': true
            }], ['aria-flowto', {
              'type': 'idlist'
            }], ['aria-grabbed', {
              'type': 'boolean',
              'allowundefined': true
            }], ['aria-haspopup', {
              'type': 'token',
              'values': [false, true, 'menu', 'listbox', 'tree', 'grid', 'dialog']
            }], ['aria-hidden', {
              'type': 'boolean',
              'allowundefined': true
            }], ['aria-invalid', {
              'type': 'token',
              'values': ['grammar', false, 'spelling', true]
            }], ['aria-keyshortcuts', {
              type: 'string'
            }], ['aria-label', {
              'type': 'string'
            }], ['aria-labelledby', {
              'type': 'idlist'
            }], ['aria-level', {
              'type': 'integer'
            }], ['aria-live', {
              'type': 'token',
              'values': ['assertive', 'off', 'polite']
            }], ['aria-modal', {
              type: 'boolean'
            }], ['aria-multiline', {
              'type': 'boolean'
            }], ['aria-multiselectable', {
              'type': 'boolean'
            }], ['aria-orientation', {
              'type': 'token',
              'values': ['vertical', 'undefined', 'horizontal']
            }], ['aria-owns', {
              'type': 'idlist'
            }], ['aria-placeholder', {
              type: 'string'
            }], ['aria-posinset', {
              'type': 'integer'
            }], ['aria-pressed', {
              'type': 'tristate'
            }], ['aria-readonly', {
              'type': 'boolean'
            }], ['aria-relevant', {
              'type': 'tokenlist',
              'values': ['additions', 'all', 'removals', 'text']
            }], ['aria-required', {
              'type': 'boolean'
            }], ['aria-roledescription', {
              type: 'string'
            }], ['aria-rowcount', {
              type: 'integer'
            }], ['aria-rowindex', {
              type: 'integer'
            }], ['aria-rowspan', {
              type: 'integer'
            }], ['aria-selected', {
              'type': 'boolean',
              'allowundefined': true
            }], ['aria-setsize', {
              'type': 'integer'
            }], ['aria-sort', {
              'type': 'token',
              'values': ['ascending', 'descending', 'none', 'other']
            }], ['aria-valuemax', {
              'type': 'number'
            }], ['aria-valuemin', {
              'type': 'number'
            }], ['aria-valuenow', {
              'type': 'number'
            }], ['aria-valuetext', {
              'type': 'string'
            }]];
            var ariaPropsMap = {
              entries: function entries() {
                return properties;
              },
              get: function get(key) {
                var item = properties.find(function (tuple) {
                  return tuple[0] === key ? true : false;
                });
                return item && item[1];
              },
              has: function has(key) {
                return !!this.get(key);
              },
              keys: function keys() {
                return properties.map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 1),
                      key = _ref2[0];

                  return key;
                });
              },
              values: function values() {
                return properties.map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      values = _ref4[1];

                  return values;
                });
              }
            };
            var _default = ariaPropsMap;
            exports.default = _default;
            });

            var domMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

            var dom = [['a', {
              reserved: false
            }], ['abbr', {
              reserved: false
            }], ['acronym', {
              reserved: false
            }], ['address', {
              reserved: false
            }], ['applet', {
              reserved: false
            }], ['area', {
              reserved: false
            }], ['article', {
              reserved: false
            }], ['aside', {
              reserved: false
            }], ['audio', {
              reserved: false
            }], ['b', {
              reserved: false
            }], ['base', {
              reserved: true
            }], ['bdi', {
              reserved: false
            }], ['bdo', {
              reserved: false
            }], ['big', {
              reserved: false
            }], ['blink', {
              reserved: false
            }], ['blockquote', {
              reserved: false
            }], ['body', {
              reserved: false
            }], ['br', {
              reserved: false
            }], ['button', {
              reserved: false
            }], ['canvas', {
              reserved: false
            }], ['caption', {
              reserved: false
            }], ['center', {
              reserved: false
            }], ['cite', {
              reserved: false
            }], ['code', {
              reserved: false
            }], ['col', {
              reserved: true
            }], ['colgroup', {
              reserved: true
            }], ['content', {
              reserved: false
            }], ['data', {
              reserved: false
            }], ['datalist', {
              reserved: false
            }], ['dd', {
              reserved: false
            }], ['del', {
              reserved: false
            }], ['details', {
              reserved: false
            }], ['dfn', {
              reserved: false
            }], ['dialog', {
              reserved: false
            }], ['dir', {
              reserved: false
            }], ['div', {
              reserved: false
            }], ['dl', {
              reserved: false
            }], ['dt', {
              reserved: false
            }], ['em', {
              reserved: false
            }], ['embed', {
              reserved: false
            }], ['fieldset', {
              reserved: false
            }], ['figcaption', {
              reserved: false
            }], ['figure', {
              reserved: false
            }], ['font', {
              reserved: false
            }], ['footer', {
              reserved: false
            }], ['form', {
              reserved: false
            }], ['frame', {
              reserved: false
            }], ['frameset', {
              reserved: false
            }], ['h1', {
              reserved: false
            }], ['h2', {
              reserved: false
            }], ['h3', {
              reserved: false
            }], ['h4', {
              reserved: false
            }], ['h5', {
              reserved: false
            }], ['h6', {
              reserved: false
            }], ['head', {
              reserved: true
            }], ['header', {
              reserved: false
            }], ['hgroup', {
              reserved: false
            }], ['hr', {
              reserved: false
            }], ['html', {
              reserved: true
            }], ['i', {
              reserved: false
            }], ['iframe', {
              reserved: false
            }], ['img', {
              reserved: false
            }], ['input', {
              reserved: false
            }], ['ins', {
              reserved: false
            }], ['kbd', {
              reserved: false
            }], ['keygen', {
              reserved: false
            }], ['label', {
              reserved: false
            }], ['legend', {
              reserved: false
            }], ['li', {
              reserved: false
            }], ['link', {
              reserved: true
            }], ['main', {
              reserved: false
            }], ['map', {
              reserved: false
            }], ['mark', {
              reserved: false
            }], ['marquee', {
              reserved: false
            }], ['menu', {
              reserved: false
            }], ['menuitem', {
              reserved: false
            }], ['meta', {
              reserved: true
            }], ['meter', {
              reserved: false
            }], ['nav', {
              reserved: false
            }], ['noembed', {
              reserved: true
            }], ['noscript', {
              reserved: true
            }], ['object', {
              reserved: false
            }], ['ol', {
              reserved: false
            }], ['optgroup', {
              reserved: false
            }], ['option', {
              reserved: false
            }], ['output', {
              reserved: false
            }], ['p', {
              reserved: false
            }], ['param', {
              reserved: true
            }], ['picture', {
              reserved: true
            }], ['pre', {
              reserved: false
            }], ['progress', {
              reserved: false
            }], ['q', {
              reserved: false
            }], ['rp', {
              reserved: false
            }], ['rt', {
              reserved: false
            }], ['rtc', {
              reserved: false
            }], ['ruby', {
              reserved: false
            }], ['s', {
              reserved: false
            }], ['samp', {
              reserved: false
            }], ['script', {
              reserved: true
            }], ['section', {
              reserved: false
            }], ['select', {
              reserved: false
            }], ['small', {
              reserved: false
            }], ['source', {
              reserved: true
            }], ['spacer', {
              reserved: false
            }], ['span', {
              reserved: false
            }], ['strike', {
              reserved: false
            }], ['strong', {
              reserved: false
            }], ['style', {
              reserved: true
            }], ['sub', {
              reserved: false
            }], ['summary', {
              reserved: false
            }], ['sup', {
              reserved: false
            }], ['table', {
              reserved: false
            }], ['tbody', {
              reserved: false
            }], ['td', {
              reserved: false
            }], ['textarea', {
              reserved: false
            }], ['tfoot', {
              reserved: false
            }], ['th', {
              reserved: false
            }], ['thead', {
              reserved: false
            }], ['time', {
              reserved: false
            }], ['title', {
              reserved: true
            }], ['tr', {
              reserved: false
            }], ['track', {
              reserved: true
            }], ['tt', {
              reserved: false
            }], ['u', {
              reserved: false
            }], ['ul', {
              reserved: false
            }], ['var', {
              reserved: false
            }], ['video', {
              reserved: false
            }], ['wbr', {
              reserved: false
            }], ['xmp', {
              reserved: false
            }]];
            var domMap = {
              entries: function entries() {
                return dom;
              },
              get: function get(key) {
                var item = dom.find(function (tuple) {
                  return tuple[0] === key ? true : false;
                });
                return item && item[1];
              },
              has: function has(key) {
                return !!this.get(key);
              },
              keys: function keys() {
                return dom.map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 1),
                      key = _ref2[0];

                  return key;
                });
              },
              values: function values() {
                return dom.map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      values = _ref4[1];

                  return values;
                });
              }
            };
            var _default = domMap;
            exports.default = _default;
            });

            var commandRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var commandRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'menuitem'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget']]
            };
            var _default = commandRole;
            exports.default = _default;
            });

            var compositeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var compositeRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-activedescendant': null,
                'aria-disabled': null
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget']]
            };
            var _default = compositeRole;
            exports.default = _default;
            });

            var inputRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var inputRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'input'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget']]
            };
            var _default = inputRole;
            exports.default = _default;
            });

            var landmarkRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var landmarkRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = landmarkRole;
            exports.default = _default;
            });

            var rangeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var rangeRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-valuemax': null,
                'aria-valuemin': null,
                'aria-valuenow': null
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = rangeRole;
            exports.default = _default;
            });

            var roletypeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var roletypeRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: [],
              prohibitedProps: [],
              props: {
                'aria-atomic': null,
                'aria-busy': null,
                'aria-controls': null,
                'aria-current': null,
                'aria-describedby': null,
                'aria-details': null,
                'aria-dropeffect': null,
                'aria-flowto': null,
                'aria-grabbed': null,
                'aria-hidden': null,
                'aria-keyshortcuts': null,
                'aria-label': null,
                'aria-labelledby': null,
                'aria-live': null,
                'aria-owns': null,
                'aria-relevant': null,
                'aria-roledescription': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'rel'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'role'
                },
                module: 'XHTML'
              }, {
                concept: {
                  name: 'type'
                },
                module: 'Dublin Core'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: []
            };
            var _default = roletypeRole;
            exports.default = _default;
            });

            var sectionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var sectionRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: [],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'frontmatter'
                },
                module: 'DTB'
              }, {
                concept: {
                  name: 'level'
                },
                module: 'DTB'
              }, {
                concept: {
                  name: 'level'
                },
                module: 'SMIL'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = sectionRole;
            exports.default = _default;
            });

            var sectionheadRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var sectionheadRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = sectionheadRole;
            exports.default = _default;
            });

            var selectRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var selectRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-orientation': null
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'group']]
            };
            var _default = selectRole;
            exports.default = _default;
            });

            var structureRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var structureRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: [],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype']]
            };
            var _default = structureRole;
            exports.default = _default;
            });

            var widgetRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var widgetRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: [],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype']]
            };
            var _default = widgetRole;
            exports.default = _default;
            });

            var windowRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var windowRole = {
              abstract: true,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-modal': null
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype']]
            };
            var _default = windowRole;
            exports.default = _default;
            });

            var ariaAbstractRoles_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _commandRole = _interopRequireDefault(commandRole_1);

            var _compositeRole = _interopRequireDefault(compositeRole_1);

            var _inputRole = _interopRequireDefault(inputRole_1);

            var _landmarkRole = _interopRequireDefault(landmarkRole_1);

            var _rangeRole = _interopRequireDefault(rangeRole_1);

            var _roletypeRole = _interopRequireDefault(roletypeRole_1);

            var _sectionRole = _interopRequireDefault(sectionRole_1);

            var _sectionheadRole = _interopRequireDefault(sectionheadRole_1);

            var _selectRole = _interopRequireDefault(selectRole_1);

            var _structureRole = _interopRequireDefault(structureRole_1);

            var _widgetRole = _interopRequireDefault(widgetRole_1);

            var _windowRole = _interopRequireDefault(windowRole_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var ariaAbstractRoles = [['command', _commandRole.default], ['composite', _compositeRole.default], ['input', _inputRole.default], ['landmark', _landmarkRole.default], ['range', _rangeRole.default], ['roletype', _roletypeRole.default], ['section', _sectionRole.default], ['sectionhead', _sectionheadRole.default], ['select', _selectRole.default], ['structure', _structureRole.default], ['widget', _widgetRole.default], ['window', _windowRole.default]];
            var _default = ariaAbstractRoles;
            exports.default = _default;
            });

            var alertRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var alertRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-atomic': 'true',
                'aria-live': 'assertive'
              },
              relatedConcepts: [{
                concept: {
                  name: 'alert'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = alertRole;
            exports.default = _default;
            });

            var alertdialogRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var alertdialogRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'alert'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'alert'], ['roletype', 'window', 'dialog']]
            };
            var _default = alertdialogRole;
            exports.default = _default;
            });

            var applicationRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var applicationRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-activedescendant': null,
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'Device Independence Delivery Unit'
                }
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = applicationRole;
            exports.default = _default;
            });

            var articleRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var articleRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-posinset': null,
                'aria-setsize': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'article'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'document']]
            };
            var _default = articleRole;
            exports.default = _default;
            });

            var bannerRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var bannerRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  constraints: ['direct descendant of document'],
                  name: 'header'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = bannerRole;
            exports.default = _default;
            });

            var blockquoteRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var blockquoteRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = blockquoteRole;
            exports.default = _default;
            });

            var buttonRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var buttonRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-pressed': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'aria-pressed'
                  }, {
                    name: 'type',
                    value: 'checkbox'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'aria-expanded',
                    value: 'false'
                  }],
                  name: 'summary'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'aria-expanded',
                    value: 'true'
                  }],
                  constraints: ['direct descendant of details element with the open attribute defined'],
                  name: 'summary'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'button'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'image'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'reset'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'submit'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'button'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'trigger'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command']]
            };
            var _default = buttonRole;
            exports.default = _default;
            });

            var captionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var captionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: ['figure', 'grid', 'table'],
              requiredContextRole: ['figure', 'grid', 'table'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = captionRole;
            exports.default = _default;
            });

            var cellRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var cellRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-colindex': null,
                'aria-colspan': null,
                'aria-rowindex': null,
                'aria-rowspan': null
              },
              relatedConcepts: [{
                concept: {
                  constraints: ['descendant of table'],
                  name: 'td'
                },
                module: 'HTML'
              }],
              requireContextRole: ['row'],
              requiredContextRole: ['row'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = cellRole;
            exports.default = _default;
            });

            var checkboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var checkboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-checked': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-required': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'checkbox'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'option'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-checked': null
              },
              superClass: [['roletype', 'widget', 'input']]
            };
            var _default = checkboxRole;
            exports.default = _default;
            });

            var codeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var codeRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = codeRole;
            exports.default = _default;
            });

            var columnheaderRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var columnheaderRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-sort': null
              },
              relatedConcepts: [{
                attributes: [{
                  name: 'scope',
                  value: 'col'
                }],
                concept: {
                  name: 'th'
                },
                module: 'HTML'
              }],
              requireContextRole: ['row'],
              requiredContextRole: ['row'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
            };
            var _default = columnheaderRole;
            exports.default = _default;
            });

            var comboboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var comboboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-activedescendant': null,
                'aria-autocomplete': null,
                'aria-errormessage': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-required': null,
                'aria-expanded': 'false',
                'aria-haspopup': 'listbox'
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'email'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'search'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'tel'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'text'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'url'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'url'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'multiple'
                  }, {
                    constraints: ['undefined'],
                    name: 'size'
                  }],
                  name: 'select'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'multiple'
                  }, {
                    name: 'size',
                    value: 1
                  }],
                  name: 'select'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'select'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-controls': null,
                'aria-expanded': 'false'
              },
              superClass: [['roletype', 'widget', 'input']]
            };
            var _default = comboboxRole;
            exports.default = _default;
            });

            var complementaryRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var complementaryRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'aside'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = complementaryRole;
            exports.default = _default;
            });

            var contentinfoRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var contentinfoRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  constraints: ['direct descendant of document'],
                  name: 'footer'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = contentinfoRole;
            exports.default = _default;
            });

            var definitionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var definitionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'dd'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = definitionRole;
            exports.default = _default;
            });

            var deletionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var deletionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = deletionRole;
            exports.default = _default;
            });

            var dialogRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var dialogRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'dialog'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'window']]
            };
            var _default = dialogRole;
            exports.default = _default;
            });

            var directoryRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var directoryRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                module: 'DAISY Guide'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'list']]
            };
            var _default = directoryRole;
            exports.default = _default;
            });

            var documentRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var documentRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'Device Independence Delivery Unit'
                }
              }, {
                concept: {
                  name: 'body'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = documentRole;
            exports.default = _default;
            });

            var emphasisRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var emphasisRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = emphasisRole;
            exports.default = _default;
            });

            var feedRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var feedRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['article']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'list']]
            };
            var _default = feedRole;
            exports.default = _default;
            });

            var figureRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var figureRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'figure'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = figureRole;
            exports.default = _default;
            });

            var formRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var formRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'aria-label'
                  }],
                  name: 'form'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'aria-labelledby'
                  }],
                  name: 'form'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'name'
                  }],
                  name: 'form'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = formRole;
            exports.default = _default;
            });

            var genericRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var genericRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'span'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'div'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = genericRole;
            exports.default = _default;
            });

            var gridRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var gridRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-multiselectable': null,
                'aria-readonly': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'role',
                    value: 'grid'
                  }],
                  name: 'table'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['row'], ['row', 'rowgroup']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'table']]
            };
            var _default = gridRole;
            exports.default = _default;
            });

            var gridcellRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var gridcellRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-required': null,
                'aria-selected': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'role',
                    value: 'gridcell'
                  }],
                  name: 'td'
                },
                module: 'HTML'
              }],
              requireContextRole: ['row'],
              requiredContextRole: ['row'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'widget']]
            };
            var _default = gridcellRole;
            exports.default = _default;
            });

            var groupRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var groupRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-activedescendant': null,
                'aria-disabled': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'details'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'fieldset'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'optgroup'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = groupRole;
            exports.default = _default;
            });

            var headingRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var headingRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-level': '2'
              },
              relatedConcepts: [{
                concept: {
                  name: 'h1'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'h2'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'h3'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'h4'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'h5'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'h6'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-level': '2'
              },
              superClass: [['roletype', 'structure', 'sectionhead']]
            };
            var _default = headingRole;
            exports.default = _default;
            });

            var imgRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var imgRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'alt'
                  }],
                  name: 'img'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'alt'
                  }],
                  name: 'img'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'imggroup'
                },
                module: 'DTB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = imgRole;
            exports.default = _default;
            });

            var insertionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var insertionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = insertionRole;
            exports.default = _default;
            });

            var linkRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var linkRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-expanded': null,
                'aria-haspopup': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'href'
                  }],
                  name: 'a'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'href'
                  }],
                  name: 'area'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'href'
                  }],
                  name: 'link'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command']]
            };
            var _default = linkRole;
            exports.default = _default;
            });

            var listRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var listRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'menu'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'ol'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'ul'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['listitem']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = listRole;
            exports.default = _default;
            });

            var listboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var listboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-invalid': null,
                'aria-multiselectable': null,
                'aria-readonly': null,
                'aria-required': null,
                'aria-orientation': 'vertical'
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['>1'],
                    name: 'size'
                  }, {
                    name: 'multiple'
                  }],
                  name: 'select'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['>1'],
                    name: 'size'
                  }],
                  name: 'select'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    name: 'multiple'
                  }],
                  name: 'select'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'datalist'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'list'
                },
                module: 'ARIA'
              }, {
                concept: {
                  name: 'select'
                },
                module: 'XForms'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['option', 'group'], ['option']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
            };
            var _default = listboxRole;
            exports.default = _default;
            });

            var listitemRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var listitemRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-level': null,
                'aria-posinset': null,
                'aria-setsize': null
              },
              relatedConcepts: [{
                concept: {
                  constraints: ['direct descendant of ol, ul or menu'],
                  name: 'li'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'item'
                },
                module: 'XForms'
              }],
              requireContextRole: ['directory', 'list'],
              requiredContextRole: ['directory', 'list'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = listitemRole;
            exports.default = _default;
            });

            var logRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var logRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-live': 'polite'
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = logRole;
            exports.default = _default;
            });

            var mainRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var mainRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'main'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = mainRole;
            exports.default = _default;
            });

            var marqueeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var marqueeRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = marqueeRole;
            exports.default = _default;
            });

            var mathRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var mathRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'math'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = mathRole;
            exports.default = _default;
            });

            var menuRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var menuRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-orientation': 'vertical'
              },
              relatedConcepts: [{
                concept: {
                  name: 'MENU'
                },
                module: 'JAPI'
              }, {
                concept: {
                  name: 'list'
                },
                module: 'ARIA'
              }, {
                concept: {
                  name: 'select'
                },
                module: 'XForms'
              }, {
                concept: {
                  name: 'sidebar'
                },
                module: 'DTB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['menuitem', 'group'], ['menuitemradio', 'group'], ['menuitemcheckbox', 'group'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
            };
            var _default = menuRole;
            exports.default = _default;
            });

            var menubarRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var menubarRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-orientation': 'horizontal'
              },
              relatedConcepts: [{
                concept: {
                  name: 'toolbar'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['menuitem', 'group'], ['menuitemradio', 'group'], ['menuitemcheckbox', 'group'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'select', 'menu'], ['roletype', 'structure', 'section', 'group', 'select', 'menu']]
            };
            var _default = menubarRole;
            exports.default = _default;
            });

            var menuitemRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var menuitemRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-posinset': null,
                'aria-setsize': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'MENU_ITEM'
                },
                module: 'JAPI'
              }, {
                concept: {
                  name: 'listitem'
                },
                module: 'ARIA'
              }, {
                concept: {
                  name: 'menuitem'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'option'
                },
                module: 'ARIA'
              }],
              requireContextRole: ['group', 'menu', 'menubar'],
              requiredContextRole: ['group', 'menu', 'menubar'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command']]
            };
            var _default = menuitemRole;
            exports.default = _default;
            });

            var menuitemcheckboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var menuitemcheckboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'menuitem'
                },
                module: 'ARIA'
              }],
              requireContextRole: ['group', 'menu', 'menubar'],
              requiredContextRole: ['group', 'menu', 'menubar'],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-checked': null
              },
              superClass: [['roletype', 'widget', 'input', 'checkbox'], ['roletype', 'widget', 'command', 'menuitem']]
            };
            var _default = menuitemcheckboxRole;
            exports.default = _default;
            });

            var menuitemradioRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var menuitemradioRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'menuitem'
                },
                module: 'ARIA'
              }],
              requireContextRole: ['group', 'menu', 'menubar'],
              requiredContextRole: ['group', 'menu', 'menubar'],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-checked': null
              },
              superClass: [['roletype', 'widget', 'input', 'checkbox', 'menuitemcheckbox'], ['roletype', 'widget', 'command', 'menuitem', 'menuitemcheckbox'], ['roletype', 'widget', 'input', 'radio']]
            };
            var _default = menuitemradioRole;
            exports.default = _default;
            });

            var meterRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var meterRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-valuetext': null,
                'aria-valuemax': '100',
                'aria-valuemin': '0'
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-valuenow': null
              },
              superClass: [['roletype', 'structure', 'range']]
            };
            var _default = meterRole;
            exports.default = _default;
            });

            var navigationRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var navigationRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'nav'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = navigationRole;
            exports.default = _default;
            });

            var noneRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var noneRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: [],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: []
            };
            var _default = noneRole;
            exports.default = _default;
            });

            var noteRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var noteRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = noteRole;
            exports.default = _default;
            });

            var optionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var optionRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-checked': null,
                'aria-posinset': null,
                'aria-setsize': null,
                'aria-selected': 'false'
              },
              relatedConcepts: [{
                concept: {
                  name: 'item'
                },
                module: 'XForms'
              }, {
                concept: {
                  name: 'listitem'
                },
                module: 'ARIA'
              }, {
                concept: {
                  name: 'option'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-selected': 'false'
              },
              superClass: [['roletype', 'widget', 'input']]
            };
            var _default = optionRole;
            exports.default = _default;
            });

            var paragraphRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var paragraphRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = paragraphRole;
            exports.default = _default;
            });

            var presentationRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var presentationRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = presentationRole;
            exports.default = _default;
            });

            var progressbarRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var progressbarRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-valuetext': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'progress'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'status'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'range'], ['roletype', 'widget']]
            };
            var _default = progressbarRole;
            exports.default = _default;
            });

            var radioRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var radioRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-checked': null,
                'aria-posinset': null,
                'aria-setsize': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'radio'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-checked': null
              },
              superClass: [['roletype', 'widget', 'input']]
            };
            var _default = radioRole;
            exports.default = _default;
            });

            var radiogroupRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var radiogroupRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-required': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'list'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['radio']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
            };
            var _default = radiogroupRole;
            exports.default = _default;
            });

            var regionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var regionRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'aria-label'
                  }],
                  name: 'section'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['set'],
                    name: 'aria-labelledby'
                  }],
                  name: 'section'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'Device Independence Glossart perceivable unit'
                }
              }, {
                concept: {
                  name: 'frame'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = regionRole;
            exports.default = _default;
            });

            var rowRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var rowRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-colindex': null,
                'aria-expanded': null,
                'aria-level': null,
                'aria-posinset': null,
                'aria-rowindex': null,
                'aria-selected': null,
                'aria-setsize': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'tr'
                },
                module: 'HTML'
              }],
              requireContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
              requiredContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
              requiredOwnedElements: [['cell'], ['columnheader'], ['gridcell'], ['rowheader']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'group'], ['roletype', 'widget']]
            };
            var _default = rowRole;
            exports.default = _default;
            });

            var rowgroupRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var rowgroupRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'tbody'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'tfoot'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'thead'
                },
                module: 'HTML'
              }],
              requireContextRole: ['grid', 'table', 'treegrid'],
              requiredContextRole: ['grid', 'table', 'treegrid'],
              requiredOwnedElements: [['row']],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = rowgroupRole;
            exports.default = _default;
            });

            var rowheaderRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var rowheaderRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-sort': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'scope',
                    value: 'row'
                  }],
                  name: 'th'
                },
                module: 'HTML'
              }],
              requireContextRole: ['row'],
              requiredContextRole: ['row'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
            };
            var _default = rowheaderRole;
            exports.default = _default;
            });

            var scrollbarRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var scrollbarRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-valuetext': null,
                'aria-orientation': 'vertical',
                'aria-valuemax': '100',
                'aria-valuemin': '0'
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-controls': null,
                'aria-valuenow': null
              },
              superClass: [['roletype', 'structure', 'range'], ['roletype', 'widget']]
            };
            var _default = scrollbarRole;
            exports.default = _default;
            });

            var searchRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var searchRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = searchRole;
            exports.default = _default;
            });

            var searchboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var searchboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'search'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'input', 'textbox']]
            };
            var _default = searchboxRole;
            exports.default = _default;
            });

            var separatorRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var separatorRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-orientation': 'horizontal',
                'aria-valuemax': '100',
                'aria-valuemin': '0',
                'aria-valuenow': null,
                'aria-valuetext': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'hr'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure']]
            };
            var _default = separatorRole;
            exports.default = _default;
            });

            var sliderRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var sliderRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-haspopup': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-valuetext': null,
                'aria-orientation': 'horizontal',
                'aria-valuemax': '100',
                'aria-valuemin': '0'
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'range'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-valuenow': null
              },
              superClass: [['roletype', 'widget', 'input'], ['roletype', 'structure', 'range']]
            };
            var _default = sliderRole;
            exports.default = _default;
            });

            var spinbuttonRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var spinbuttonRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null,
                'aria-readonly': null,
                'aria-required': null,
                'aria-valuetext': null,
                'aria-valuenow': '0'
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    name: 'type',
                    value: 'number'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite'], ['roletype', 'widget', 'input'], ['roletype', 'structure', 'range']]
            };
            var _default = spinbuttonRole;
            exports.default = _default;
            });

            var statusRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var statusRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-atomic': 'true',
                'aria-live': 'polite'
              },
              relatedConcepts: [{
                concept: {
                  name: 'output'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = statusRole;
            exports.default = _default;
            });

            var strongRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var strongRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = strongRole;
            exports.default = _default;
            });

            var subscriptRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var subscriptRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = subscriptRole;
            exports.default = _default;
            });

            var superscriptRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var superscriptRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['prohibited'],
              prohibitedProps: ['aria-label', 'aria-labelledby'],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = superscriptRole;
            exports.default = _default;
            });

            var switchRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var switchRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'button'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-checked': null
              },
              superClass: [['roletype', 'widget', 'input', 'checkbox']]
            };
            var _default = switchRole;
            exports.default = _default;
            });

            var tabRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var tabRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-posinset': null,
                'aria-setsize': null,
                'aria-selected': 'false'
              },
              relatedConcepts: [],
              requireContextRole: ['tablist'],
              requiredContextRole: ['tablist'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'sectionhead'], ['roletype', 'widget']]
            };
            var _default = tabRole;
            exports.default = _default;
            });

            var tableRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var tableRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-colcount': null,
                'aria-rowcount': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'table'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['row'], ['row', 'rowgroup']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = tableRole;
            exports.default = _default;
            });

            var tablistRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var tablistRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-level': null,
                'aria-multiselectable': null,
                'aria-orientation': 'horizontal'
              },
              relatedConcepts: [{
                module: 'DAISY',
                concept: {
                  name: 'guide'
                }
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['tab']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite']]
            };
            var _default = tablistRole;
            exports.default = _default;
            });

            var tabpanelRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var tabpanelRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = tabpanelRole;
            exports.default = _default;
            });

            var termRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var termRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'dfn'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'dt'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = termRole;
            exports.default = _default;
            });

            var textboxRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var textboxRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-activedescendant': null,
                'aria-autocomplete': null,
                'aria-errormessage': null,
                'aria-haspopup': null,
                'aria-invalid': null,
                'aria-multiline': null,
                'aria-placeholder': null,
                'aria-readonly': null,
                'aria-required': null
              },
              relatedConcepts: [{
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'type'
                  }, {
                    constraints: ['undefined'],
                    name: 'list'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'email'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'tel'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'text'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  attributes: [{
                    constraints: ['undefined'],
                    name: 'list'
                  }, {
                    name: 'type',
                    value: 'url'
                  }],
                  name: 'input'
                },
                module: 'HTML'
              }, {
                concept: {
                  name: 'input'
                },
                module: 'XForms'
              }, {
                concept: {
                  name: 'textarea'
                },
                module: 'HTML'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'input']]
            };
            var _default = textboxRole;
            exports.default = _default;
            });

            var timeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var timeRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = timeRole;
            exports.default = _default;
            });

            var timerRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var timerRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'status']]
            };
            var _default = timerRole;
            exports.default = _default;
            });

            var toolbarRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var toolbarRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-orientation': 'horizontal'
              },
              relatedConcepts: [{
                concept: {
                  name: 'menubar'
                },
                module: 'ARIA'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'group']]
            };
            var _default = toolbarRole;
            exports.default = _default;
            });

            var tooltipRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var tooltipRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = tooltipRole;
            exports.default = _default;
            });

            var treeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var treeRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null,
                'aria-multiselectable': null,
                'aria-required': null,
                'aria-orientation': 'vertical'
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['treeitem', 'group'], ['treeitem']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
            };
            var _default = treeRole;
            exports.default = _default;
            });

            var treegridRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var treegridRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['row'], ['row', 'rowgroup']],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'composite', 'grid'], ['roletype', 'structure', 'section', 'table', 'grid'], ['roletype', 'widget', 'composite', 'select', 'tree'], ['roletype', 'structure', 'section', 'group', 'select', 'tree']]
            };
            var _default = treegridRole;
            exports.default = _default;
            });

            var treeitemRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var treeitemRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-expanded': null,
                'aria-haspopup': null
              },
              relatedConcepts: [],
              requireContextRole: ['group', 'tree'],
              requiredContextRole: ['group', 'tree'],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-selected': null
              },
              superClass: [['roletype', 'structure', 'section', 'listitem'], ['roletype', 'widget', 'input', 'option']]
            };
            var _default = treeitemRole;
            exports.default = _default;
            });

            var ariaLiteralRoles_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _alertRole = _interopRequireDefault(alertRole_1);

            var _alertdialogRole = _interopRequireDefault(alertdialogRole_1);

            var _applicationRole = _interopRequireDefault(applicationRole_1);

            var _articleRole = _interopRequireDefault(articleRole_1);

            var _bannerRole = _interopRequireDefault(bannerRole_1);

            var _blockquoteRole = _interopRequireDefault(blockquoteRole_1);

            var _buttonRole = _interopRequireDefault(buttonRole_1);

            var _captionRole = _interopRequireDefault(captionRole_1);

            var _cellRole = _interopRequireDefault(cellRole_1);

            var _checkboxRole = _interopRequireDefault(checkboxRole_1);

            var _codeRole = _interopRequireDefault(codeRole_1);

            var _columnheaderRole = _interopRequireDefault(columnheaderRole_1);

            var _comboboxRole = _interopRequireDefault(comboboxRole_1);

            var _complementaryRole = _interopRequireDefault(complementaryRole_1);

            var _contentinfoRole = _interopRequireDefault(contentinfoRole_1);

            var _definitionRole = _interopRequireDefault(definitionRole_1);

            var _deletionRole = _interopRequireDefault(deletionRole_1);

            var _dialogRole = _interopRequireDefault(dialogRole_1);

            var _directoryRole = _interopRequireDefault(directoryRole_1);

            var _documentRole = _interopRequireDefault(documentRole_1);

            var _emphasisRole = _interopRequireDefault(emphasisRole_1);

            var _feedRole = _interopRequireDefault(feedRole_1);

            var _figureRole = _interopRequireDefault(figureRole_1);

            var _formRole = _interopRequireDefault(formRole_1);

            var _genericRole = _interopRequireDefault(genericRole_1);

            var _gridRole = _interopRequireDefault(gridRole_1);

            var _gridcellRole = _interopRequireDefault(gridcellRole_1);

            var _groupRole = _interopRequireDefault(groupRole_1);

            var _headingRole = _interopRequireDefault(headingRole_1);

            var _imgRole = _interopRequireDefault(imgRole_1);

            var _insertionRole = _interopRequireDefault(insertionRole_1);

            var _linkRole = _interopRequireDefault(linkRole_1);

            var _listRole = _interopRequireDefault(listRole_1);

            var _listboxRole = _interopRequireDefault(listboxRole_1);

            var _listitemRole = _interopRequireDefault(listitemRole_1);

            var _logRole = _interopRequireDefault(logRole_1);

            var _mainRole = _interopRequireDefault(mainRole_1);

            var _marqueeRole = _interopRequireDefault(marqueeRole_1);

            var _mathRole = _interopRequireDefault(mathRole_1);

            var _menuRole = _interopRequireDefault(menuRole_1);

            var _menubarRole = _interopRequireDefault(menubarRole_1);

            var _menuitemRole = _interopRequireDefault(menuitemRole_1);

            var _menuitemcheckboxRole = _interopRequireDefault(menuitemcheckboxRole_1);

            var _menuitemradioRole = _interopRequireDefault(menuitemradioRole_1);

            var _meterRole = _interopRequireDefault(meterRole_1);

            var _navigationRole = _interopRequireDefault(navigationRole_1);

            var _noneRole = _interopRequireDefault(noneRole_1);

            var _noteRole = _interopRequireDefault(noteRole_1);

            var _optionRole = _interopRequireDefault(optionRole_1);

            var _paragraphRole = _interopRequireDefault(paragraphRole_1);

            var _presentationRole = _interopRequireDefault(presentationRole_1);

            var _progressbarRole = _interopRequireDefault(progressbarRole_1);

            var _radioRole = _interopRequireDefault(radioRole_1);

            var _radiogroupRole = _interopRequireDefault(radiogroupRole_1);

            var _regionRole = _interopRequireDefault(regionRole_1);

            var _rowRole = _interopRequireDefault(rowRole_1);

            var _rowgroupRole = _interopRequireDefault(rowgroupRole_1);

            var _rowheaderRole = _interopRequireDefault(rowheaderRole_1);

            var _scrollbarRole = _interopRequireDefault(scrollbarRole_1);

            var _searchRole = _interopRequireDefault(searchRole_1);

            var _searchboxRole = _interopRequireDefault(searchboxRole_1);

            var _separatorRole = _interopRequireDefault(separatorRole_1);

            var _sliderRole = _interopRequireDefault(sliderRole_1);

            var _spinbuttonRole = _interopRequireDefault(spinbuttonRole_1);

            var _statusRole = _interopRequireDefault(statusRole_1);

            var _strongRole = _interopRequireDefault(strongRole_1);

            var _subscriptRole = _interopRequireDefault(subscriptRole_1);

            var _superscriptRole = _interopRequireDefault(superscriptRole_1);

            var _switchRole = _interopRequireDefault(switchRole_1);

            var _tabRole = _interopRequireDefault(tabRole_1);

            var _tableRole = _interopRequireDefault(tableRole_1);

            var _tablistRole = _interopRequireDefault(tablistRole_1);

            var _tabpanelRole = _interopRequireDefault(tabpanelRole_1);

            var _termRole = _interopRequireDefault(termRole_1);

            var _textboxRole = _interopRequireDefault(textboxRole_1);

            var _timeRole = _interopRequireDefault(timeRole_1);

            var _timerRole = _interopRequireDefault(timerRole_1);

            var _toolbarRole = _interopRequireDefault(toolbarRole_1);

            var _tooltipRole = _interopRequireDefault(tooltipRole_1);

            var _treeRole = _interopRequireDefault(treeRole_1);

            var _treegridRole = _interopRequireDefault(treegridRole_1);

            var _treeitemRole = _interopRequireDefault(treeitemRole_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var ariaLiteralRoles = [['alert', _alertRole.default], ['alertdialog', _alertdialogRole.default], ['application', _applicationRole.default], ['article', _articleRole.default], ['banner', _bannerRole.default], ['blockquote', _blockquoteRole.default], ['button', _buttonRole.default], ['caption', _captionRole.default], ['cell', _cellRole.default], ['checkbox', _checkboxRole.default], ['code', _codeRole.default], ['columnheader', _columnheaderRole.default], ['combobox', _comboboxRole.default], ['complementary', _complementaryRole.default], ['contentinfo', _contentinfoRole.default], ['definition', _definitionRole.default], ['deletion', _deletionRole.default], ['dialog', _dialogRole.default], ['directory', _directoryRole.default], ['document', _documentRole.default], ['emphasis', _emphasisRole.default], ['feed', _feedRole.default], ['figure', _figureRole.default], ['form', _formRole.default], ['generic', _genericRole.default], ['grid', _gridRole.default], ['gridcell', _gridcellRole.default], ['group', _groupRole.default], ['heading', _headingRole.default], ['img', _imgRole.default], ['insertion', _insertionRole.default], ['link', _linkRole.default], ['list', _listRole.default], ['listbox', _listboxRole.default], ['listitem', _listitemRole.default], ['log', _logRole.default], ['main', _mainRole.default], ['marquee', _marqueeRole.default], ['math', _mathRole.default], ['menu', _menuRole.default], ['menubar', _menubarRole.default], ['menuitem', _menuitemRole.default], ['menuitemcheckbox', _menuitemcheckboxRole.default], ['menuitemradio', _menuitemradioRole.default], ['meter', _meterRole.default], ['navigation', _navigationRole.default], ['none', _noneRole.default], ['note', _noteRole.default], ['option', _optionRole.default], ['paragraph', _paragraphRole.default], ['presentation', _presentationRole.default], ['progressbar', _progressbarRole.default], ['radio', _radioRole.default], ['radiogroup', _radiogroupRole.default], ['region', _regionRole.default], ['row', _rowRole.default], ['rowgroup', _rowgroupRole.default], ['rowheader', _rowheaderRole.default], ['scrollbar', _scrollbarRole.default], ['search', _searchRole.default], ['searchbox', _searchboxRole.default], ['separator', _separatorRole.default], ['slider', _sliderRole.default], ['spinbutton', _spinbuttonRole.default], ['status', _statusRole.default], ['strong', _strongRole.default], ['subscript', _subscriptRole.default], ['superscript', _superscriptRole.default], ['switch', _switchRole.default], ['tab', _tabRole.default], ['table', _tableRole.default], ['tablist', _tablistRole.default], ['tabpanel', _tabpanelRole.default], ['term', _termRole.default], ['textbox', _textboxRole.default], ['time', _timeRole.default], ['timer', _timerRole.default], ['toolbar', _toolbarRole.default], ['tooltip', _tooltipRole.default], ['tree', _treeRole.default], ['treegrid', _treegridRole.default], ['treeitem', _treeitemRole.default]];
            var _default = ariaLiteralRoles;
            exports.default = _default;
            });

            var docAbstractRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docAbstractRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'abstract [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docAbstractRole;
            exports.default = _default;
            });

            var docAcknowledgmentsRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docAcknowledgmentsRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'acknowledgments [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docAcknowledgmentsRole;
            exports.default = _default;
            });

            var docAfterwordRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docAfterwordRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'afterword [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docAfterwordRole;
            exports.default = _default;
            });

            var docAppendixRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docAppendixRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'appendix [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docAppendixRole;
            exports.default = _default;
            });

            var docBacklinkRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docBacklinkRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'content'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'referrer [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command', 'link']]
            };
            var _default = docBacklinkRole;
            exports.default = _default;
            });

            var docBiblioentryRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docBiblioentryRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'EPUB biblioentry [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: ['doc-bibliography'],
              requiredContextRole: ['doc-bibliography'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'listitem']]
            };
            var _default = docBiblioentryRole;
            exports.default = _default;
            });

            var docBibliographyRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docBibliographyRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'bibliography [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['doc-biblioentry']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docBibliographyRole;
            exports.default = _default;
            });

            var docBibliorefRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docBibliorefRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'biblioref [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command', 'link']]
            };
            var _default = docBibliorefRole;
            exports.default = _default;
            });

            var docChapterRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docChapterRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'chapter [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docChapterRole;
            exports.default = _default;
            });

            var docColophonRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docColophonRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'colophon [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docColophonRole;
            exports.default = _default;
            });

            var docConclusionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docConclusionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'conclusion [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docConclusionRole;
            exports.default = _default;
            });

            var docCoverRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docCoverRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'cover [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'img']]
            };
            var _default = docCoverRole;
            exports.default = _default;
            });

            var docCreditRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docCreditRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'credit [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docCreditRole;
            exports.default = _default;
            });

            var docCreditsRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docCreditsRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'credits [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docCreditsRole;
            exports.default = _default;
            });

            var docDedicationRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docDedicationRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'dedication [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docDedicationRole;
            exports.default = _default;
            });

            var docEndnoteRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docEndnoteRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'rearnote [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: ['doc-endnotes'],
              requiredContextRole: ['doc-endnotes'],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'listitem']]
            };
            var _default = docEndnoteRole;
            exports.default = _default;
            });

            var docEndnotesRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docEndnotesRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'rearnotes [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['doc-endnote']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docEndnotesRole;
            exports.default = _default;
            });

            var docEpigraphRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docEpigraphRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'epigraph [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docEpigraphRole;
            exports.default = _default;
            });

            var docEpilogueRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docEpilogueRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'epilogue [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docEpilogueRole;
            exports.default = _default;
            });

            var docErrataRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docErrataRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'errata [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docErrataRole;
            exports.default = _default;
            });

            var docExampleRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docExampleRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docExampleRole;
            exports.default = _default;
            });

            var docFootnoteRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docFootnoteRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'footnote [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docFootnoteRole;
            exports.default = _default;
            });

            var docForewordRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docForewordRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'foreword [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docForewordRole;
            exports.default = _default;
            });

            var docGlossaryRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docGlossaryRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'glossary [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [['definition'], ['term']],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docGlossaryRole;
            exports.default = _default;
            });

            var docGlossrefRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docGlossrefRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'glossref [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command', 'link']]
            };
            var _default = docGlossrefRole;
            exports.default = _default;
            });

            var docIndexRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docIndexRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'index [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
            };
            var _default = docIndexRole;
            exports.default = _default;
            });

            var docIntroductionRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docIntroductionRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'introduction [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docIntroductionRole;
            exports.default = _default;
            });

            var docNoterefRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docNoterefRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author', 'contents'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'noteref [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'widget', 'command', 'link']]
            };
            var _default = docNoterefRole;
            exports.default = _default;
            });

            var docNoticeRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docNoticeRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'notice [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'note']]
            };
            var _default = docNoticeRole;
            exports.default = _default;
            });

            var docPagebreakRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPagebreakRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: true,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'pagebreak [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'separator']]
            };
            var _default = docPagebreakRole;
            exports.default = _default;
            });

            var docPagelistRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPagelistRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'page-list [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
            };
            var _default = docPagelistRole;
            exports.default = _default;
            });

            var docPartRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPartRole = {
              abstract: false,
              accessibleNameRequired: true,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'part [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docPartRole;
            exports.default = _default;
            });

            var docPrefaceRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPrefaceRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'preface [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docPrefaceRole;
            exports.default = _default;
            });

            var docPrologueRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPrologueRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'prologue [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark']]
            };
            var _default = docPrologueRole;
            exports.default = _default;
            });

            var docPullquoteRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docPullquoteRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {},
              relatedConcepts: [{
                concept: {
                  name: 'pullquote [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['none']]
            };
            var _default = docPullquoteRole;
            exports.default = _default;
            });

            var docQnaRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docQnaRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'qna [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section']]
            };
            var _default = docQnaRole;
            exports.default = _default;
            });

            var docSubtitleRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docSubtitleRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'subtitle [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'sectionhead']]
            };
            var _default = docSubtitleRole;
            exports.default = _default;
            });

            var docTipRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docTipRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'help [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'note']]
            };
            var _default = docTipRole;
            exports.default = _default;
            });

            var docTocRole_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            var docTocRole = {
              abstract: false,
              accessibleNameRequired: false,
              baseConcepts: [],
              childrenPresentational: false,
              nameFrom: ['author'],
              prohibitedProps: [],
              props: {
                'aria-disabled': null,
                'aria-errormessage': null,
                'aria-expanded': null,
                'aria-haspopup': null,
                'aria-invalid': null
              },
              relatedConcepts: [{
                concept: {
                  name: 'toc [EPUB-SSV]'
                },
                module: 'EPUB'
              }],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
            };
            var _default = docTocRole;
            exports.default = _default;
            });

            var ariaDpubRoles_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _docAbstractRole = _interopRequireDefault(docAbstractRole_1);

            var _docAcknowledgmentsRole = _interopRequireDefault(docAcknowledgmentsRole_1);

            var _docAfterwordRole = _interopRequireDefault(docAfterwordRole_1);

            var _docAppendixRole = _interopRequireDefault(docAppendixRole_1);

            var _docBacklinkRole = _interopRequireDefault(docBacklinkRole_1);

            var _docBiblioentryRole = _interopRequireDefault(docBiblioentryRole_1);

            var _docBibliographyRole = _interopRequireDefault(docBibliographyRole_1);

            var _docBibliorefRole = _interopRequireDefault(docBibliorefRole_1);

            var _docChapterRole = _interopRequireDefault(docChapterRole_1);

            var _docColophonRole = _interopRequireDefault(docColophonRole_1);

            var _docConclusionRole = _interopRequireDefault(docConclusionRole_1);

            var _docCoverRole = _interopRequireDefault(docCoverRole_1);

            var _docCreditRole = _interopRequireDefault(docCreditRole_1);

            var _docCreditsRole = _interopRequireDefault(docCreditsRole_1);

            var _docDedicationRole = _interopRequireDefault(docDedicationRole_1);

            var _docEndnoteRole = _interopRequireDefault(docEndnoteRole_1);

            var _docEndnotesRole = _interopRequireDefault(docEndnotesRole_1);

            var _docEpigraphRole = _interopRequireDefault(docEpigraphRole_1);

            var _docEpilogueRole = _interopRequireDefault(docEpilogueRole_1);

            var _docErrataRole = _interopRequireDefault(docErrataRole_1);

            var _docExampleRole = _interopRequireDefault(docExampleRole_1);

            var _docFootnoteRole = _interopRequireDefault(docFootnoteRole_1);

            var _docForewordRole = _interopRequireDefault(docForewordRole_1);

            var _docGlossaryRole = _interopRequireDefault(docGlossaryRole_1);

            var _docGlossrefRole = _interopRequireDefault(docGlossrefRole_1);

            var _docIndexRole = _interopRequireDefault(docIndexRole_1);

            var _docIntroductionRole = _interopRequireDefault(docIntroductionRole_1);

            var _docNoterefRole = _interopRequireDefault(docNoterefRole_1);

            var _docNoticeRole = _interopRequireDefault(docNoticeRole_1);

            var _docPagebreakRole = _interopRequireDefault(docPagebreakRole_1);

            var _docPagelistRole = _interopRequireDefault(docPagelistRole_1);

            var _docPartRole = _interopRequireDefault(docPartRole_1);

            var _docPrefaceRole = _interopRequireDefault(docPrefaceRole_1);

            var _docPrologueRole = _interopRequireDefault(docPrologueRole_1);

            var _docPullquoteRole = _interopRequireDefault(docPullquoteRole_1);

            var _docQnaRole = _interopRequireDefault(docQnaRole_1);

            var _docSubtitleRole = _interopRequireDefault(docSubtitleRole_1);

            var _docTipRole = _interopRequireDefault(docTipRole_1);

            var _docTocRole = _interopRequireDefault(docTocRole_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var ariaDpubRoles = [['doc-abstract', _docAbstractRole.default], ['doc-acknowledgments', _docAcknowledgmentsRole.default], ['doc-afterword', _docAfterwordRole.default], ['doc-appendix', _docAppendixRole.default], ['doc-backlink', _docBacklinkRole.default], ['doc-biblioentry', _docBiblioentryRole.default], ['doc-bibliography', _docBibliographyRole.default], ['doc-biblioref', _docBibliorefRole.default], ['doc-chapter', _docChapterRole.default], ['doc-colophon', _docColophonRole.default], ['doc-conclusion', _docConclusionRole.default], ['doc-cover', _docCoverRole.default], ['doc-credit', _docCreditRole.default], ['doc-credits', _docCreditsRole.default], ['doc-dedication', _docDedicationRole.default], ['doc-endnote', _docEndnoteRole.default], ['doc-endnotes', _docEndnotesRole.default], ['doc-epigraph', _docEpigraphRole.default], ['doc-epilogue', _docEpilogueRole.default], ['doc-errata', _docErrataRole.default], ['doc-example', _docExampleRole.default], ['doc-footnote', _docFootnoteRole.default], ['doc-foreword', _docForewordRole.default], ['doc-glossary', _docGlossaryRole.default], ['doc-glossref', _docGlossrefRole.default], ['doc-index', _docIndexRole.default], ['doc-introduction', _docIntroductionRole.default], ['doc-noteref', _docNoterefRole.default], ['doc-notice', _docNoticeRole.default], ['doc-pagebreak', _docPagebreakRole.default], ['doc-pagelist', _docPagelistRole.default], ['doc-part', _docPartRole.default], ['doc-preface', _docPrefaceRole.default], ['doc-prologue', _docPrologueRole.default], ['doc-pullquote', _docPullquoteRole.default], ['doc-qna', _docQnaRole.default], ['doc-subtitle', _docSubtitleRole.default], ['doc-tip', _docTipRole.default], ['doc-toc', _docTocRole.default]];
            var _default = ariaDpubRoles;
            exports.default = _default;
            });

            var rolesMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _ariaAbstractRoles = _interopRequireDefault(ariaAbstractRoles_1);

            var _ariaLiteralRoles = _interopRequireDefault(ariaLiteralRoles_1);

            var _ariaDpubRoles = _interopRequireDefault(ariaDpubRoles_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

            var roles = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default);
            roles.forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  roleDefinition = _ref2[1];

              // Conglomerate the properties
              var _iterator = _createForOfIteratorHelper(roleDefinition.superClass),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var superClassIter = _step.value;

                  var _iterator2 = _createForOfIteratorHelper(superClassIter),
                      _step2;

                  try {
                    var _loop = function _loop() {
                      var superClassName = _step2.value;
                      var superClassRoleTuple = roles.find(function (_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 1),
                            name = _ref4[0];

                        return name === superClassName;
                      });

                      if (superClassRoleTuple) {
                        var superClassDefinition = superClassRoleTuple[1];

                        for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
                          var prop = _Object$keys[_i2];

                          if ( // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                          !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                            Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
                          }
                        }
                      }
                    };

                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      _loop();
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            });
            var rolesMap = {
              entries: function entries() {
                return roles;
              },
              get: function get(key) {
                var item = roles.find(function (tuple) {
                  return tuple[0] === key ? true : false;
                });
                return item && item[1];
              },
              has: function has(key) {
                return !!this.get(key);
              },
              keys: function keys() {
                return roles.map(function (_ref5) {
                  var _ref6 = _slicedToArray(_ref5, 1),
                      key = _ref6[0];

                  return key;
                });
              },
              values: function values() {
                return roles.map(function (_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2),
                      values = _ref8[1];

                  return values;
                });
              }
            };
            var _default = rolesMap;
            exports.default = _default;
            });

            var elementRoleMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _rolesMap = _interopRequireDefault(rolesMap_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

            var elementRoles = [];

            var keys = _rolesMap.default.keys();

            for (var i = 0; i < keys.length; i++) {
              var _key = keys[i];

              var role = _rolesMap.default.get(_key);

              if (role) {
                var concepts = [].concat(role.baseConcepts, role.relatedConcepts);

                for (var k = 0; k < concepts.length; k++) {
                  var relation = concepts[k];

                  if (relation.module === 'HTML') {
                    var concept = relation.concept;

                    if (concept) {
                      (function () {
                        var conceptStr = JSON.stringify(concept);
                        var elementRoleRelation = elementRoles.find(function (relation) {
                          return JSON.stringify(relation[0]) === conceptStr;
                        });
                        var roles = void 0;

                        if (elementRoleRelation) {
                          roles = elementRoleRelation[1];
                        } else {
                          roles = [];
                        }

                        var isUnique = true;

                        for (var _i = 0; _i < roles.length; _i++) {
                          if (roles[_i] === _key) {
                            isUnique = false;
                            break;
                          }
                        }

                        if (isUnique) {
                          roles.push(_key);
                        }

                        elementRoles.push([concept, roles]);
                      })();
                    }
                  }
                }
              }
            }

            var elementRoleMap = {
              entries: function entries() {
                return elementRoles;
              },
              get: function get(key) {
                var item = elementRoles.find(function (tuple) {
                  return JSON.stringify(tuple[0]) === JSON.stringify(key) ? true : false;
                });
                return item && item[1];
              },
              has: function has(key) {
                return !!this.get(key);
              },
              keys: function keys() {
                return elementRoles.map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 1),
                      key = _ref2[0];

                  return key;
                });
              },
              values: function values() {
                return elementRoles.map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      values = _ref4[1];

                  return values;
                });
              }
            };
            var _default = elementRoleMap;
            exports.default = _default;
            });

            var roleElementMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;

            var _rolesMap = _interopRequireDefault(rolesMap_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

            var roleElement = [];

            var keys = _rolesMap.default.keys();

            var _loop = function _loop(i) {
              var key = keys[i];

              var role = _rolesMap.default.get(key);

              if (role) {
                var concepts = [].concat(role.baseConcepts, role.relatedConcepts);

                for (var k = 0; k < concepts.length; k++) {
                  var relation = concepts[k];

                  if (relation.module === 'HTML') {
                    var concept = relation.concept;

                    if (concept) {
                      var roleElementRelation = roleElement.find(function (item) {
                        return item[0] === key;
                      });
                      var relationConcepts = void 0;

                      if (roleElementRelation) {
                        relationConcepts = roleElementRelation[1];
                      } else {
                        relationConcepts = [];
                      }

                      relationConcepts.push(concept);
                      roleElement.push([key, relationConcepts]);
                    }
                  }
                }
              }
            };

            for (var i = 0; i < keys.length; i++) {
              _loop(i);
            }

            var roleElementMap = {
              entries: function entries() {
                return roleElement;
              },
              get: function get(key) {
                var item = roleElement.find(function (tuple) {
                  return tuple[0] === key ? true : false;
                });
                return item && item[1];
              },
              has: function has(key) {
                return !!this.get(key);
              },
              keys: function keys() {
                return roleElement.map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 1),
                      key = _ref2[0];

                  return key;
                });
              },
              values: function values() {
                return roleElement.map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      values = _ref4[1];

                  return values;
                });
              }
            };
            var _default = roleElementMap;
            exports.default = _default;
            });

            var lib = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = void 0;

            var _ariaPropsMap = _interopRequireDefault(ariaPropsMap_1);

            var _domMap = _interopRequireDefault(domMap_1);

            var _rolesMap = _interopRequireDefault(rolesMap_1);

            var _elementRoleMap = _interopRequireDefault(elementRoleMap_1);

            var _roleElementMap = _interopRequireDefault(roleElementMap_1);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var aria = _ariaPropsMap.default;
            exports.aria = aria;
            var dom = _domMap.default;
            exports.dom = dom;
            var roles = _rolesMap.default;
            exports.roles = roles;
            var elementRoles = _elementRoleMap.default;
            exports.elementRoles = elementRoles;
            var roleElements = _roleElementMap.default;
            exports.roleElements = roleElements;
            });

            var lzString = createCommonjsModule(function (module) {
            // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
            // This work is free. You can redistribute it and/or modify it
            // under the terms of the WTFPL, Version 2
            // For more information see LICENSE.txt or http://www.wtfpl.net/
            //
            // For more information, the home page:
            // http://pieroxy.net/blog/pages/lz-string/testing.html
            //
            // LZ-based compression algorithm, version 1.4.4
            var LZString = (function() {

            // private property
            var f = String.fromCharCode;
            var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
            var baseReverseDic = {};

            function getBaseValue(alphabet, character) {
              if (!baseReverseDic[alphabet]) {
                baseReverseDic[alphabet] = {};
                for (var i=0 ; i<alphabet.length ; i++) {
                  baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                }
              }
              return baseReverseDic[alphabet][character];
            }

            var LZString = {
              compressToBase64 : function (input) {
                if (input == null) return "";
                var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
                switch (res.length % 4) { // To produce valid Base64
                default: // When could this happen ?
                case 0 : return res;
                case 1 : return res+"===";
                case 2 : return res+"==";
                case 3 : return res+"=";
                }
              },

              decompressFromBase64 : function (input) {
                if (input == null) return "";
                if (input == "") return null;
                return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
              },

              compressToUTF16 : function (input) {
                if (input == null) return "";
                return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
              },

              decompressFromUTF16: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
              },

              //compress into uint8array (UCS-2 big endian format)
              compressToUint8Array: function (uncompressed) {
                var compressed = LZString.compress(uncompressed);
                var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

                for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
                  var current_value = compressed.charCodeAt(i);
                  buf[i*2] = current_value >>> 8;
                  buf[i*2+1] = current_value % 256;
                }
                return buf;
              },

              //decompress from uint8array (UCS-2 big endian format)
              decompressFromUint8Array:function (compressed) {
                if (compressed===null || compressed===undefined){
                    return LZString.decompress(compressed);
                } else {
                    var buf=new Array(compressed.length/2); // 2 bytes per character
                    for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
                      buf[i]=compressed[i*2]*256+compressed[i*2+1];
                    }

                    var result = [];
                    buf.forEach(function (c) {
                      result.push(f(c));
                    });
                    return LZString.decompress(result.join(''));

                }

              },


              //compress into a string that is already URI encoded
              compressToEncodedURIComponent: function (input) {
                if (input == null) return "";
                return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
              },

              //decompress from an output of compressToEncodedURIComponent
              decompressFromEncodedURIComponent:function (input) {
                if (input == null) return "";
                if (input == "") return null;
                input = input.replace(/ /g, "+");
                return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
              },

              compress: function (uncompressed) {
                return LZString._compress(uncompressed, 16, function(a){return f(a);});
              },
              _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i, value,
                    context_dictionary= {},
                    context_dictionaryToCreate= {},
                    context_c="",
                    context_wc="",
                    context_w="",
                    context_enlargeIn= 2, // Compensate for the first entry which should not count
                    context_dictSize= 3,
                    context_numBits= 2,
                    context_data=[],
                    context_data_val=0,
                    context_data_position=0,
                    ii;

                for (ii = 0; ii < uncompressed.length; ii += 1) {
                  context_c = uncompressed.charAt(ii);
                  if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                  }

                  context_wc = context_w + context_c;
                  if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
                    context_w = context_wc;
                  } else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                      if (context_w.charCodeAt(0)<256) {
                        for (i=0 ; i<context_numBits ; i++) {
                          context_data_val = (context_data_val << 1);
                          if (context_data_position == bitsPerChar-1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                          } else {
                            context_data_position++;
                          }
                        }
                        value = context_w.charCodeAt(0);
                        for (i=0 ; i<8 ; i++) {
                          context_data_val = (context_data_val << 1) | (value&1);
                          if (context_data_position == bitsPerChar-1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                          } else {
                            context_data_position++;
                          }
                          value = value >> 1;
                        }
                      } else {
                        value = 1;
                        for (i=0 ; i<context_numBits ; i++) {
                          context_data_val = (context_data_val << 1) | value;
                          if (context_data_position ==bitsPerChar-1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                          } else {
                            context_data_position++;
                          }
                          value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for (i=0 ; i<16 ; i++) {
                          context_data_val = (context_data_val << 1) | (value&1);
                          if (context_data_position == bitsPerChar-1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                          } else {
                            context_data_position++;
                          }
                          value = value >> 1;
                        }
                      }
                      context_enlargeIn--;
                      if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                      }
                      delete context_dictionaryToCreate[context_w];
                    } else {
                      value = context_dictionary[context_w];
                      for (i=0 ; i<context_numBits ; i++) {
                        context_data_val = (context_data_val << 1) | (value&1);
                        if (context_data_position == bitsPerChar-1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0;
                        } else {
                          context_data_position++;
                        }
                        value = value >> 1;
                      }


                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                      context_enlargeIn = Math.pow(2, context_numBits);
                      context_numBits++;
                    }
                    // Add wc to the dictionary.
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                  }
                }

                // Output the code for w.
                if (context_w !== "") {
                  if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                    if (context_w.charCodeAt(0)<256) {
                      for (i=0 ; i<context_numBits ; i++) {
                        context_data_val = (context_data_val << 1);
                        if (context_data_position == bitsPerChar-1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0;
                        } else {
                          context_data_position++;
                        }
                      }
                      value = context_w.charCodeAt(0);
                      for (i=0 ; i<8 ; i++) {
                        context_data_val = (context_data_val << 1) | (value&1);
                        if (context_data_position == bitsPerChar-1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0;
                        } else {
                          context_data_position++;
                        }
                        value = value >> 1;
                      }
                    } else {
                      value = 1;
                      for (i=0 ; i<context_numBits ; i++) {
                        context_data_val = (context_data_val << 1) | value;
                        if (context_data_position == bitsPerChar-1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0;
                        } else {
                          context_data_position++;
                        }
                        value = 0;
                      }
                      value = context_w.charCodeAt(0);
                      for (i=0 ; i<16 ; i++) {
                        context_data_val = (context_data_val << 1) | (value&1);
                        if (context_data_position == bitsPerChar-1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0;
                        } else {
                          context_data_position++;
                        }
                        value = value >> 1;
                      }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                      context_enlargeIn = Math.pow(2, context_numBits);
                      context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                  } else {
                    value = context_dictionary[context_w];
                    for (i=0 ; i<context_numBits ; i++) {
                      context_data_val = (context_data_val << 1) | (value&1);
                      if (context_data_position == bitsPerChar-1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = value >> 1;
                    }


                  }
                  context_enlargeIn--;
                  if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }
                }

                // Mark the end of the stream
                value = 2;
                for (i=0 ; i<context_numBits ; i++) {
                  context_data_val = (context_data_val << 1) | (value&1);
                  if (context_data_position == bitsPerChar-1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }

                // Flush the last char
                while (true) {
                  context_data_val = (context_data_val << 1);
                  if (context_data_position == bitsPerChar-1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                  }
                  else context_data_position++;
                }
                return context_data.join('');
              },

              decompress: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
              },

              _decompress: function (length, resetValue, getNextValue) {
                var dictionary = [],
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits, resb, maxpower, power,
                    c,
                    data = {val:getNextValue(0), position:resetValue, index:1};

                for (i = 0; i < 3; i += 1) {
                  dictionary[i] = i;
                }

                bits = 0;
                maxpower = Math.pow(2,2);
                power=1;
                while (power!=maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb>0 ? 1 : 0) * power;
                  power <<= 1;
                }

                switch (bits) {
                  case 0:
                      bits = 0;
                      maxpower = Math.pow(2,8);
                      power=1;
                      while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                      }
                    c = f(bits);
                    break;
                  case 1:
                      bits = 0;
                      maxpower = Math.pow(2,16);
                      power=1;
                      while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                      }
                    c = f(bits);
                    break;
                  case 2:
                    return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                  if (data.index > length) {
                    return "";
                  }

                  bits = 0;
                  maxpower = Math.pow(2,numBits);
                  power=1;
                  while (power!=maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++);
                    }
                    bits |= (resb>0 ? 1 : 0) * power;
                    power <<= 1;
                  }

                  switch (c = bits) {
                    case 0:
                      bits = 0;
                      maxpower = Math.pow(2,8);
                      power=1;
                      while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                      }

                      dictionary[dictSize++] = f(bits);
                      c = dictSize-1;
                      enlargeIn--;
                      break;
                    case 1:
                      bits = 0;
                      maxpower = Math.pow(2,16);
                      power=1;
                      while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                      }
                      dictionary[dictSize++] = f(bits);
                      c = dictSize-1;
                      enlargeIn--;
                      break;
                    case 2:
                      return result.join('');
                  }

                  if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                  }

                  if (dictionary[c]) {
                    entry = dictionary[c];
                  } else {
                    if (c === dictSize) {
                      entry = w + w.charAt(0);
                    } else {
                      return null;
                    }
                  }
                  result.push(entry);

                  // Add w+entry[0] to the dictionary.
                  dictionary[dictSize++] = w + entry.charAt(0);
                  enlargeIn--;

                  w = entry;

                  if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                  }

                }
              }
            };
              return LZString;
            })();

            if( module != null ) {
              module.exports = LZString;
            }
            });

            /**
             * Source: https://github.com/facebook/jest/blob/e7bb6a1e26ffab90611b2593912df15b69315611/packages/pretty-format/src/plugins/DOMElement.ts
             */

            /* eslint-disable -- trying to stay as close to the original as possible */

            /* istanbul ignore file */
            function escapeHTML(str) {
              return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            } // Return empty string if keys is empty.


            var printProps = function printProps(keys, props, config, indentation, depth, refs, printer) {
              var indentationNext = indentation + config.indent;
              var colors = config.colors;
              return keys.map(function (key) {
                var value = props[key];
                var printed = printer(value, config, indentationNext, depth, refs);

                if (typeof value !== 'string') {
                  if (printed.indexOf('\n') !== -1) {
                    printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
                  }

                  printed = '{' + printed + '}';
                }

                return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
              }).join('');
            }; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants


            var NodeTypeTextNode = 3; // Return empty string if children is empty.

            var printChildren = function printChildren(children, config, indentation, depth, refs, printer) {
              return children.map(function (child) {
                var printedChild = typeof child === 'string' ? printText(child, config) : printer(child, config, indentation, depth, refs);

                if (printedChild === '' && typeof child === 'object' && child !== null && child.nodeType !== NodeTypeTextNode) {
                  // A plugin serialized this Node to '' meaning we should ignore it.
                  return '';
                }

                return config.spacingOuter + indentation + printedChild;
              }).join('');
            };

            var printText = function printText(text, config) {
              var contentColor = config.colors.content;
              return contentColor.open + escapeHTML(text) + contentColor.close;
            };

            var printComment = function printComment(comment, config) {
              var commentColor = config.colors.comment;
              return commentColor.open + '<!--' + escapeHTML(comment) + '-->' + commentColor.close;
            }; // Separate the functions to format props, children, and element,
            // so a plugin could override a particular function, if needed.
            // Too bad, so sad: the traditional (but unnecessary) space
            // in a self-closing tagColor requires a second test of printedProps.


            var printElement = function printElement(type, printedProps, printedChildren, config, indentation) {
              var tagColor = config.colors.tag;
              return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
            };

            var printElementAsLeaf = function printElementAsLeaf(type, config) {
              var tagColor = config.colors.tag;
              return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
            };

            var ELEMENT_NODE$1 = 1;
            var TEXT_NODE$1 = 3;
            var COMMENT_NODE$1 = 8;
            var FRAGMENT_NODE = 11;
            var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

            var testNode = function testNode(val) {
              var constructorName = val.constructor.name;
              var nodeType = val.nodeType,
                  tagName = val.tagName;
              var isCustomElement = typeof tagName === 'string' && tagName.includes('-') || typeof val.hasAttribute === 'function' && val.hasAttribute('is');
              return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === 'Text' || nodeType === COMMENT_NODE$1 && constructorName === 'Comment' || nodeType === FRAGMENT_NODE && constructorName === 'DocumentFragment';
            };

            function nodeIsText(node) {
              return node.nodeType === TEXT_NODE$1;
            }

            function nodeIsComment(node) {
              return node.nodeType === COMMENT_NODE$1;
            }

            function nodeIsFragment(node) {
              return node.nodeType === FRAGMENT_NODE;
            }

            function createDOMElementFilter(filterNode) {
              return {
                test: function test(val) {
                  var _val$constructor2;

                  return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
                },
                serialize: function serialize(node, config, indentation, depth, refs, printer) {
                  if (nodeIsText(node)) {
                    return printText(node.data, config);
                  }

                  if (nodeIsComment(node)) {
                    return printComment(node.data, config);
                  }

                  var type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();

                  if (++depth > config.maxDepth) {
                    return printElementAsLeaf(type, config);
                  }

                  return printElement(type, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map(function (attr) {
                    return attr.name;
                  }).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce(function (props, attribute) {
                    props[attribute.name] = attribute.value;
                    return props;
                  }, {}), config, indentation + config.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config, indentation + config.indent, depth, refs, printer), config, indentation);
                }
              };
            }

            // We try to load node dependencies
            var chalk = null;
            var readFileSync = null;
            var codeFrameColumns = null;

            try {
              var nodeRequire = module && module.require;
              readFileSync = nodeRequire.call(module, 'fs').readFileSync;
              codeFrameColumns = nodeRequire.call(module, '@babel/code-frame').codeFrameColumns;
              chalk = nodeRequire.call(module, 'chalk');
            } catch (_unused) {// We're in a browser environment
            } // frame has the form "at myMethod (location/to/my/file.js:10:2)"


            function getCodeFrame(frame) {
              var locationStart = frame.indexOf('(') + 1;
              var locationEnd = frame.indexOf(')');
              var frameLocation = frame.slice(locationStart, locationEnd);
              var frameLocationElements = frameLocation.split(':');
              var _ref = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)],
                  filename = _ref[0],
                  line = _ref[1],
                  column = _ref[2];
              var rawFileContents = '';

              try {
                rawFileContents = readFileSync(filename, 'utf-8');
              } catch (_unused2) {
                return '';
              }

              var codeFrame = codeFrameColumns(rawFileContents, {
                start: {
                  line: line,
                  column: column
                }
              }, {
                highlightCode: true,
                linesBelow: 0
              });
              return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
            }

            function getUserCodeFrame() {
              // If we couldn't load dependencies, we can't generate the user trace

              /* istanbul ignore next */
              if (!readFileSync || !codeFrameColumns) {
                return '';
              }

              var err = new Error();
              var firstClientCodeFrame = err.stack.split('\n').slice(1) // Remove first line which has the form "Error: TypeError"
              .find(function (frame) {
                return !frame.includes('node_modules/');
              }); // Ignore frames from 3rd party libraries

              return getCodeFrame(firstClientCodeFrame);
            }

            // Constant node.nodeType for text nodes, see:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
            var TEXT_NODE = 3;

            function jestFakeTimersAreEnabled() {
              /* istanbul ignore else */
              if (typeof jest !== 'undefined' && jest !== null) {
                return (// legacy timers
                  setTimeout._isMockFunction === true || // modern timers
                  Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
                );
              } // istanbul ignore next


              return false;
            }

            function getDocument() {
              /* istanbul ignore if */
              if (typeof window === 'undefined') {
                throw new Error('Could not find default container');
              }

              return window.document;
            }

            function getWindowFromNode(node) {
              if (node.defaultView) {
                // node is document
                return node.defaultView;
              } else if (node.ownerDocument && node.ownerDocument.defaultView) {
                // node is a DOM node
                return node.ownerDocument.defaultView;
              } else if (node.window) {
                // node is window
                return node.window;
              } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
                throw new Error("It looks like the window object is not available for the provided node.");
              } else if (node.then instanceof Function) {
                throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
              } else if (Array.isArray(node)) {
                throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
              } else if (typeof node.debug === 'function' && typeof node.logTestingPlaygroundURL === 'function') {
                throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
              } else {
                // The user passed something unusual to a calling function
                throw new Error("The given node is not an Element, the node type is: " + typeof node + ".");
              }
            }

            function checkContainerType(container) {
              if (!container || !(typeof container.querySelector === 'function') || !(typeof container.querySelectorAll === 'function')) {
                throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
              }

              function getTypeName(object) {
                if (typeof object === 'object') {
                  return object === null ? 'null' : object.constructor.name;
                }

                return typeof object;
              }
            }

            var DEFAULT_IGNORE_TAGS = 'script, style';

            var _excluded$1 = ["filterNode"];

            var inNode = function inNode() {
              return typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;
            };

            var DOMCollection = build$1.plugins.DOMCollection; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants

            var ELEMENT_NODE = 1;
            var COMMENT_NODE = 8; // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50

            function filterCommentsAndDefaultIgnoreTagsTags(value) {
              return value.nodeType !== COMMENT_NODE && ( // value.nodeType === ELEMENT_NODE => !value.matches(DEFAULT_IGNORE_TAGS)
              value.nodeType !== ELEMENT_NODE || !value.matches(DEFAULT_IGNORE_TAGS));
            }

            function prettyDOM(dom, maxLength, options) {
              if (options === void 0) {
                options = {};
              }

              if (!dom) {
                dom = getDocument().body;
              }

              if (typeof maxLength !== 'number') {
                maxLength = typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT || 7000;
              }

              if (maxLength === 0) {
                return '';
              }

              if (dom.documentElement) {
                dom = dom.documentElement;
              }

              var domTypeName = typeof dom;

              if (domTypeName === 'object') {
                domTypeName = dom.constructor.name;
              } else {
                // To don't fall with `in` operator
                dom = {};
              }

              if (!('outerHTML' in dom)) {
                throw new TypeError("Expected an element or document but got " + domTypeName);
              }

              var _options = options,
                  _options$filterNode = _options.filterNode,
                  filterNode = _options$filterNode === void 0 ? filterCommentsAndDefaultIgnoreTagsTags : _options$filterNode,
                  prettyFormatOptions = _objectWithoutPropertiesLoose(_options, _excluded$1);

              var debugContent = build$1.format(dom, _extends({
                plugins: [createDOMElementFilter(filterNode), DOMCollection],
                printFunctionName: false,
                highlight: inNode()
              }, prettyFormatOptions));
              return maxLength !== undefined && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
            }

            var logDOM = function logDOM() {
              var userCodeFrame = getUserCodeFrame();

              if (userCodeFrame) {
                console.log(prettyDOM.apply(void 0, arguments) + "\n\n" + userCodeFrame);
              } else {
                console.log(prettyDOM.apply(void 0, arguments));
              }
            };

            // It would be cleaner for this to live inside './queries', but
            // other parts of the code assume that all exports from
            // './queries' are query functions.
            var config = {
              testIdAttribute: 'data-testid',
              asyncUtilTimeout: 1000,
              // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
              // forcing react-testing-library to wrap all async functions would've been
              // a total nightmare (consider wrapping every findBy* query and then also
              // updating `within` so those would be wrapped too. Total nightmare).
              // so we have this config option that's really only intended for
              // react-testing-library to use. For that reason, this feature will remain
              // undocumented.
              asyncWrapper: function asyncWrapper(cb) {
                return cb();
              },
              unstable_advanceTimersWrapper: function unstable_advanceTimersWrapper(cb) {
                return cb();
              },
              eventWrapper: function eventWrapper(cb) {
                return cb();
              },
              // default value for the `hidden` option in `ByRole` queries
              defaultHidden: false,
              // showOriginalStackTrace flag to show the full error stack traces for async errors
              showOriginalStackTrace: false,
              // throw errors w/ suggestions for better queries. Opt in so off by default.
              throwSuggestions: false,
              // called when getBy* queries fail. (message, container) => Error
              getElementError: function getElementError(message, container) {
                var prettifiedDOM = prettyDOM(container);
                var error = new Error([message, "Ignored nodes: comments, <script />, <style />\n" + prettifiedDOM].filter(Boolean).join('\n\n'));
                error.name = 'TestingLibraryElementError';
                return error;
              },
              _disableExpensiveErrorDiagnostics: false,
              computedStyleSupportsPseudoElements: false
            };
            function runWithExpensiveErrorDiagnosticsDisabled(callback) {
              try {
                config._disableExpensiveErrorDiagnostics = true;
                return callback();
              } finally {
                config._disableExpensiveErrorDiagnostics = false;
              }
            }
            function configure(newConfig) {
              if (typeof newConfig === 'function') {
                // Pass the existing config out to the provided function
                // and accept a delta in return
                newConfig = newConfig(config);
              } // Merge the incoming config delta


              config = _extends({}, config, newConfig);
            }
            function getConfig() {
              return config;
            }

            var labelledNodeNames = ['button', 'meter', 'output', 'progress', 'select', 'textarea', 'input'];

            function getTextContent(node) {
              if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
                return '';
              }

              if (node.nodeType === TEXT_NODE) return node.textContent;
              return Array.from(node.childNodes).map(function (childNode) {
                return getTextContent(childNode);
              }).join('');
            }

            function getLabelContent(element) {
              var textContent;

              if (element.tagName.toLowerCase() === 'label') {
                textContent = getTextContent(element);
              } else {
                textContent = element.value || element.textContent;
              }

              return textContent;
            } // Based on https://github.com/eps1lon/dom-accessibility-api/pull/352


            function getRealLabels(element) {
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- types are not aware of older browsers that don't implement `labels`
              if (element.labels !== undefined) {
                var _labels;

                return (_labels = element.labels) != null ? _labels : [];
              }

              if (!isLabelable(element)) return [];
              var labels = element.ownerDocument.querySelectorAll('label');
              return Array.from(labels).filter(function (label) {
                return label.control === element;
              });
            }

            function isLabelable(element) {
              return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === 'INPUT' && element.getAttribute('type') !== 'hidden';
            }

            function getLabels(container, element, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$selector = _ref.selector,
                  selector = _ref$selector === void 0 ? '*' : _ref$selector;

              var ariaLabelledBy = element.getAttribute('aria-labelledby');
              var labelsId = ariaLabelledBy ? ariaLabelledBy.split(' ') : [];
              return labelsId.length ? labelsId.map(function (labelId) {
                var labellingElement = container.querySelector("[id=\"" + labelId + "\"]");
                return labellingElement ? {
                  content: getLabelContent(labellingElement),
                  formControl: null
                } : {
                  content: '',
                  formControl: null
                };
              }) : Array.from(getRealLabels(element)).map(function (label) {
                var textToMatch = getLabelContent(label);
                var formControlSelector = 'button, input, meter, output, progress, select, textarea';
                var labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter(function (formControlElement) {
                  return formControlElement.matches(selector);
                })[0];
                return {
                  content: textToMatch,
                  formControl: labelledFormControl
                };
              });
            }

            function assertNotNullOrUndefined(matcher) {
              if (matcher === null || matcher === undefined) {
                throw new Error( // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
                "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?");
              }
            }

            function fuzzyMatches(textToMatch, node, matcher, normalizer) {
              if (typeof textToMatch !== 'string') {
                return false;
              }

              assertNotNullOrUndefined(matcher);
              var normalizedText = normalizer(textToMatch);

              if (typeof matcher === 'string' || typeof matcher === 'number') {
                return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
              } else if (typeof matcher === 'function') {
                return matcher(normalizedText, node);
              } else {
                return matchRegExp(matcher, normalizedText);
              }
            }

            function matches(textToMatch, node, matcher, normalizer) {
              if (typeof textToMatch !== 'string') {
                return false;
              }

              assertNotNullOrUndefined(matcher);
              var normalizedText = normalizer(textToMatch);

              if (matcher instanceof Function) {
                return matcher(normalizedText, node);
              } else if (matcher instanceof RegExp) {
                return matchRegExp(matcher, normalizedText);
              } else {
                return normalizedText === String(matcher);
              }
            }

            function getDefaultNormalizer(_temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$trim = _ref.trim,
                  trim = _ref$trim === void 0 ? true : _ref$trim,
                  _ref$collapseWhitespa = _ref.collapseWhitespace,
                  collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;

              return function (text) {
                var normalizedText = text;
                normalizedText = trim ? normalizedText.trim() : normalizedText;
                normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
                return normalizedText;
              };
            }
            /**
             * Constructs a normalizer to pass to functions in matches.js
             * @param {boolean|undefined} trim The user-specified value for `trim`, without
             * any defaulting having been applied
             * @param {boolean|undefined} collapseWhitespace The user-specified value for
             * `collapseWhitespace`, without any defaulting having been applied
             * @param {Function|undefined} normalizer The user-specified normalizer
             * @returns {Function} A normalizer
             */


            function makeNormalizer(_ref2) {
              var trim = _ref2.trim,
                  collapseWhitespace = _ref2.collapseWhitespace,
                  normalizer = _ref2.normalizer;

              if (!normalizer) {
                // No custom normalizer specified. Just use default.
                return getDefaultNormalizer({
                  trim: trim,
                  collapseWhitespace: collapseWhitespace
                });
              }

              if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
                // They've also specified a value for trim or collapseWhitespace
                throw new Error('trim and collapseWhitespace are not supported with a normalizer. ' + 'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' + 'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
              }

              return normalizer;
            }

            function matchRegExp(matcher, text) {
              var match = matcher.test(text);

              if (matcher.global && matcher.lastIndex !== 0) {
                console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.");
                matcher.lastIndex = 0;
              }

              return match;
            }

            function getNodeText(node) {
              if (node.matches('input[type=submit], input[type=button], input[type=reset]')) {
                return node.value;
              }

              return Array.from(node.childNodes).filter(function (child) {
                return child.nodeType === TEXT_NODE && Boolean(child.textContent);
              }).map(function (c) {
                return c.textContent;
              }).join('');
            }

            function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
            var elementRoleList = buildElementRoleList(lib.elementRoles);
            /**
             * @param {Element} element -
             * @returns {boolean} - `true` if `element` and its subtree are inaccessible
             */

            function isSubtreeInaccessible(element) {
              if (element.hidden === true) {
                return true;
              }

              if (element.getAttribute('aria-hidden') === 'true') {
                return true;
              }

              var window = element.ownerDocument.defaultView;

              if (window.getComputedStyle(element).display === 'none') {
                return true;
              }

              return false;
            }
            /**
             * Partial implementation https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion
             * which should only be used for elements with a non-presentational role i.e.
             * `role="none"` and `role="presentation"` will not be excluded.
             *
             * Implements aria-hidden semantics (i.e. parent overrides child)
             * Ignores "Child Presentational: True" characteristics
             *
             * @param {Element} element -
             * @param {object} [options] -
             * @param {function (element: Element): boolean} options.isSubtreeInaccessible -
             * can be used to return cached results from previous isSubtreeInaccessible calls
             * @returns {boolean} true if excluded, otherwise false
             */


            function isInaccessible(element, options) {
              if (options === void 0) {
                options = {};
              }

              var _options = options,
                  _options$isSubtreeIna = _options.isSubtreeInaccessible,
                  isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
              var window = element.ownerDocument.defaultView; // since visibility is inherited we can exit early

              if (window.getComputedStyle(element).visibility === 'hidden') {
                return true;
              }

              var currentElement = element;

              while (currentElement) {
                if (isSubtreeInaccessibleImpl(currentElement)) {
                  return true;
                }

                currentElement = currentElement.parentElement;
              }

              return false;
            }

            function getImplicitAriaRoles(currentNode) {
              // eslint bug here:
              // eslint-disable-next-line no-unused-vars
              for (var _iterator = _createForOfIteratorHelperLoose(elementRoleList), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                    match = _step$value.match,
                    roles = _step$value.roles;

                if (match(currentNode)) {
                  return [].concat(roles);
                }
              }

              return [];
            }

            function buildElementRoleList(elementRolesMap) {
              function makeElementSelector(_ref) {
                var name = _ref.name,
                    attributes = _ref.attributes;
                return "" + name + attributes.map(function (_ref2) {
                  var attributeName = _ref2.name,
                      value = _ref2.value,
                      _ref2$constraints = _ref2.constraints,
                      constraints = _ref2$constraints === void 0 ? [] : _ref2$constraints;
                  var shouldNotExist = constraints.indexOf('undefined') !== -1;

                  if (shouldNotExist) {
                    return ":not([" + attributeName + "])";
                  } else if (value) {
                    return "[" + attributeName + "=\"" + value + "\"]";
                  } else {
                    return "[" + attributeName + "]";
                  }
                }).join('');
              }

              function getSelectorSpecificity(_ref3) {
                var _ref3$attributes = _ref3.attributes,
                    attributes = _ref3$attributes === void 0 ? [] : _ref3$attributes;
                return attributes.length;
              }

              function bySelectorSpecificity(_ref4, _ref5) {
                var leftSpecificity = _ref4.specificity;
                var rightSpecificity = _ref5.specificity;
                return rightSpecificity - leftSpecificity;
              }

              function match(element) {
                return function (node) {
                  var _element$attributes = element.attributes,
                      attributes = _element$attributes === void 0 ? [] : _element$attributes; // https://github.com/testing-library/dom-testing-library/issues/814

                  var typeTextIndex = attributes.findIndex(function (attribute) {
                    return attribute.value && attribute.name === 'type' && attribute.value === 'text';
                  });

                  if (typeTextIndex >= 0) {
                    // not using splice to not mutate the attributes array
                    attributes = [].concat(attributes.slice(0, typeTextIndex), attributes.slice(typeTextIndex + 1));

                    if (node.type !== 'text') {
                      return false;
                    }
                  }

                  return node.matches(makeElementSelector(_extends({}, element, {
                    attributes: attributes
                  })));
                };
              }

              var result = []; // eslint bug here:
              // eslint-disable-next-line no-unused-vars

              for (var _iterator2 = _createForOfIteratorHelperLoose(elementRolesMap.entries()), _step2; !(_step2 = _iterator2()).done;) {
                var _step2$value = _step2.value,
                    element = _step2$value[0],
                    roles = _step2$value[1];
                result = [].concat(result, [{
                  match: match(element),
                  roles: Array.from(roles),
                  specificity: getSelectorSpecificity(element)
                }]);
              }

              return result.sort(bySelectorSpecificity);
            }

            function getRoles(container, _temp) {
              var _ref6 = _temp === void 0 ? {} : _temp,
                  _ref6$hidden = _ref6.hidden,
                  hidden = _ref6$hidden === void 0 ? false : _ref6$hidden;

              function flattenDOM(node) {
                return [node].concat(Array.from(node.children).reduce(function (acc, child) {
                  return [].concat(acc, flattenDOM(child));
                }, []));
              }

              return flattenDOM(container).filter(function (element) {
                return hidden === false ? isInaccessible(element) === false : true;
              }).reduce(function (acc, node) {
                var roles = []; // TODO: This violates html-aria which does not allow any role on every element

                if (node.hasAttribute('role')) {
                  roles = node.getAttribute('role').split(' ').slice(0, 1);
                } else {
                  roles = getImplicitAriaRoles(node);
                }

                return roles.reduce(function (rolesAcc, role) {
                  var _extends2, _extends3;

                  return Array.isArray(rolesAcc[role]) ? _extends({}, rolesAcc, (_extends2 = {}, _extends2[role] = [].concat(rolesAcc[role], [node]), _extends2)) : _extends({}, rolesAcc, (_extends3 = {}, _extends3[role] = [node], _extends3));
                }, acc);
              }, {});
            }

            function prettyRoles(dom, _ref7) {
              var hidden = _ref7.hidden;
              var roles = getRoles(dom, {
                hidden: hidden
              }); // We prefer to skip generic role, we don't recommend it

              return Object.entries(roles).filter(function (_ref8) {
                var role = _ref8[0];
                return role !== 'generic';
              }).map(function (_ref9) {
                var role = _ref9[0],
                    elements = _ref9[1];
                var delimiterBar = '-'.repeat(50);
                var elementsString = elements.map(function (el) {
                  var nameString = "Name \"" + computeAccessibleName(el, {
                    computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
                  }) + "\":\n";
                  var domString = prettyDOM(el.cloneNode(false));
                  return "" + nameString + domString;
                }).join('\n\n');
                return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
              }).join('\n');
            }

            var logRoles = function logRoles(dom, _temp2) {
              var _ref10 = _temp2 === void 0 ? {} : _temp2,
                  _ref10$hidden = _ref10.hidden,
                  hidden = _ref10$hidden === void 0 ? false : _ref10$hidden;

              return console.log(prettyRoles(dom, {
                hidden: hidden
              }));
            };
            /**
             * @param {Element} element -
             * @returns {boolean | undefined} - false/true if (not)selected, undefined if not selectable
             */


            function computeAriaSelected(element) {
              // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
              // https://www.w3.org/TR/html-aam-1.0/#details-id-97
              if (element.tagName === 'OPTION') {
                return element.selected;
              } // explicit value


              return checkBooleanAttribute(element, 'aria-selected');
            }
            /**
             * @param {Element} element -
             * @returns {boolean | undefined} - false/true if (not)checked, undefined if not checked-able
             */


            function computeAriaChecked(element) {
              // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
              // https://www.w3.org/TR/html-aam-1.0/#details-id-56
              // https://www.w3.org/TR/html-aam-1.0/#details-id-67
              if ('indeterminate' in element && element.indeterminate) {
                return undefined;
              }

              if ('checked' in element) {
                return element.checked;
              } // explicit value


              return checkBooleanAttribute(element, 'aria-checked');
            }
            /**
             * @param {Element} element -
             * @returns {boolean | undefined} - false/true if (not)pressed, undefined if not press-able
             */


            function computeAriaPressed(element) {
              // https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
              return checkBooleanAttribute(element, 'aria-pressed');
            }
            /**
             * @param {Element} element -
             * @returns {boolean | string | null} -
             */


            function computeAriaCurrent(element) {
              var _ref11, _checkBooleanAttribut;

              // https://www.w3.org/TR/wai-aria-1.1/#aria-current
              return (_ref11 = (_checkBooleanAttribut = checkBooleanAttribute(element, 'aria-current')) != null ? _checkBooleanAttribut : element.getAttribute('aria-current')) != null ? _ref11 : false;
            }
            /**
             * @param {Element} element -
             * @returns {boolean | undefined} - false/true if (not)expanded, undefined if not expand-able
             */


            function computeAriaExpanded(element) {
              // https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
              return checkBooleanAttribute(element, 'aria-expanded');
            }

            function checkBooleanAttribute(element, attribute) {
              var attributeValue = element.getAttribute(attribute);

              if (attributeValue === 'true') {
                return true;
              }

              if (attributeValue === 'false') {
                return false;
              }

              return undefined;
            }
            /**
             * @param {Element} element -
             * @returns {number | undefined} - number if implicit heading or aria-level present, otherwise undefined
             */


            function computeHeadingLevel(element) {
              // https://w3c.github.io/html-aam/#el-h1-h6
              // https://w3c.github.io/html-aam/#el-h1-h6
              var implicitHeadingLevels = {
                H1: 1,
                H2: 2,
                H3: 3,
                H4: 4,
                H5: 5,
                H6: 6
              }; // explicit aria-level value
              // https://www.w3.org/TR/wai-aria-1.2/#aria-level

              var ariaLevelAttribute = element.getAttribute('aria-level') && Number(element.getAttribute('aria-level'));
              return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
            }

            var normalize = getDefaultNormalizer();

            function escapeRegExp(string) {
              return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
            }

            function getRegExpMatcher(string) {
              return new RegExp(escapeRegExp(string.toLowerCase()), 'i');
            }

            function makeSuggestion(queryName, element, content, _ref) {
              var variant = _ref.variant,
                  name = _ref.name;
              var warning = '';
              var queryOptions = {};
              var queryArgs = [['Role', 'TestId'].includes(queryName) ? content : getRegExpMatcher(content)];

              if (name) {
                queryOptions.name = getRegExpMatcher(name);
              }

              if (queryName === 'Role' && isInaccessible(element)) {
                queryOptions.hidden = true;
                warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
              }

              if (Object.keys(queryOptions).length > 0) {
                queryArgs.push(queryOptions);
              }

              var queryMethod = variant + "By" + queryName;
              return {
                queryName: queryName,
                queryMethod: queryMethod,
                queryArgs: queryArgs,
                variant: variant,
                warning: warning,
                toString: function toString() {
                  if (warning) {
                    console.warn(warning);
                  }

                  var text = queryArgs[0],
                      options = queryArgs[1];
                  text = typeof text === 'string' ? "'" + text + "'" : text;
                  options = options ? ", { " + Object.entries(options).map(function (_ref2) {
                    var k = _ref2[0],
                        v = _ref2[1];
                    return k + ": " + v;
                  }).join(', ') + " }" : '';
                  return queryMethod + "(" + text + options + ")";
                }
              };
            }

            function canSuggest(currentMethod, requestedMethod, data) {
              return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
            }

            function getSuggestedQuery(element, variant, method) {
              var _element$getAttribute, _getImplicitAriaRoles;

              if (variant === void 0) {
                variant = 'get';
              }

              // don't create suggestions for script and style elements
              if (element.matches(DEFAULT_IGNORE_TAGS)) {
                return undefined;
              } //We prefer to suggest something else if the role is generic


              var role = (_element$getAttribute = element.getAttribute('role')) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];

              if (role !== 'generic' && canSuggest('Role', method, role)) {
                return makeSuggestion('Role', element, role, {
                  variant: variant,
                  name: computeAccessibleName(element, {
                    computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
                  })
                });
              }

              var labelText = getLabels(document, element).map(function (label) {
                return label.content;
              }).join(' ');

              if (canSuggest('LabelText', method, labelText)) {
                return makeSuggestion('LabelText', element, labelText, {
                  variant: variant
                });
              }

              var placeholderText = element.getAttribute('placeholder');

              if (canSuggest('PlaceholderText', method, placeholderText)) {
                return makeSuggestion('PlaceholderText', element, placeholderText, {
                  variant: variant
                });
              }

              var textContent = normalize(getNodeText(element));

              if (canSuggest('Text', method, textContent)) {
                return makeSuggestion('Text', element, textContent, {
                  variant: variant
                });
              }

              if (canSuggest('DisplayValue', method, element.value)) {
                return makeSuggestion('DisplayValue', element, normalize(element.value), {
                  variant: variant
                });
              }

              var alt = element.getAttribute('alt');

              if (canSuggest('AltText', method, alt)) {
                return makeSuggestion('AltText', element, alt, {
                  variant: variant
                });
              }

              var title = element.getAttribute('title');

              if (canSuggest('Title', method, title)) {
                return makeSuggestion('Title', element, title, {
                  variant: variant
                });
              }

              var testId = element.getAttribute(getConfig().testIdAttribute);

              if (canSuggest('TestId', method, testId)) {
                return makeSuggestion('TestId', element, testId, {
                  variant: variant
                });
              }

              return undefined;
            }

            // closer to their code (because async stack traces are hard to follow).

            function copyStackTrace(target, source) {
              target.stack = source.stack.replace(source.message, target.message);
            }

            function waitFor(callback, _ref) {
              var _ref$container = _ref.container,
                  container = _ref$container === void 0 ? getDocument() : _ref$container,
                  _ref$timeout = _ref.timeout,
                  timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
                  _ref$showOriginalStac = _ref.showOriginalStackTrace,
                  showOriginalStackTrace = _ref$showOriginalStac === void 0 ? getConfig().showOriginalStackTrace : _ref$showOriginalStac,
                  stackTraceError = _ref.stackTraceError,
                  _ref$interval = _ref.interval,
                  interval = _ref$interval === void 0 ? 50 : _ref$interval,
                  _ref$onTimeout = _ref.onTimeout,
                  onTimeout = _ref$onTimeout === void 0 ? function (error) {
                error.message = getConfig().getElementError(error.message, container).message;
                return error;
              } : _ref$onTimeout,
                  _ref$mutationObserver = _ref.mutationObserverOptions,
                  mutationObserverOptions = _ref$mutationObserver === void 0 ? {
                subtree: true,
                childList: true,
                attributes: true,
                characterData: true
              } : _ref$mutationObserver;

              if (typeof callback !== 'function') {
                throw new TypeError('Received `callback` arg must be a function');
              }

              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(resolve, reject) {
                  var lastError, intervalId, observer, finished, promiseStatus, overallTimeoutTimer, usingJestFakeTimers, _getConfig, advanceTimersWrapper, error, _getWindowFromNode, MutationObserver, onDone, checkRealTimersCallback, checkCallback, handleTimeout;

                  return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          handleTimeout = function _handleTimeout() {
                            var error;

                            if (lastError) {
                              error = lastError;

                              if (!showOriginalStackTrace && error.name === 'TestingLibraryElementError') {
                                copyStackTrace(error, stackTraceError);
                              }
                            } else {
                              error = new Error('Timed out in waitFor.');

                              if (!showOriginalStackTrace) {
                                copyStackTrace(error, stackTraceError);
                              }
                            }

                            onDone(onTimeout(error), null);
                          };

                          checkCallback = function _checkCallback() {
                            if (promiseStatus === 'pending') return;

                            try {
                              var result = runWithExpensiveErrorDiagnosticsDisabled(callback);

                              if (typeof (result == null ? void 0 : result.then) === 'function') {
                                promiseStatus = 'pending';
                                result.then(function (resolvedValue) {
                                  promiseStatus = 'resolved';
                                  onDone(null, resolvedValue);
                                }, function (rejectedValue) {
                                  promiseStatus = 'rejected';
                                  lastError = rejectedValue;
                                });
                              } else {
                                onDone(null, result);
                              } // If `callback` throws, wait for the next mutation, interval, or timeout.

                            } catch (error) {
                              // Save the most recent callback error to reject the promise with it in the event of a timeout
                              lastError = error;
                            }
                          };

                          checkRealTimersCallback = function _checkRealTimersCallb() {
                            if (jestFakeTimersAreEnabled()) {
                              var _error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");

                              if (!showOriginalStackTrace) copyStackTrace(_error, stackTraceError);
                              return reject(_error);
                            } else {
                              return checkCallback();
                            }
                          };

                          onDone = function _onDone(error, result) {
                            finished = true;
                            clearTimeout(overallTimeoutTimer);

                            if (!usingJestFakeTimers) {
                              clearInterval(intervalId);
                              observer.disconnect();
                            }

                            if (error) {
                              reject(error);
                            } else {
                              resolve(result);
                            }
                          };

                          finished = false;
                          promiseStatus = 'idle';
                          overallTimeoutTimer = setTimeout(handleTimeout, timeout);
                          usingJestFakeTimers = jestFakeTimersAreEnabled();

                          if (!usingJestFakeTimers) {
                            _context2.next = 27;
                            break;
                          }

                          _getConfig = getConfig(), advanceTimersWrapper = _getConfig.unstable_advanceTimersWrapper;
                          checkCallback(); // this is a dangerous rule to disable because it could lead to an
                          // infinite loop. However, eslint isn't smart enough to know that we're
                          // setting finished inside `onDone` which will be called when we're done
                          // waiting or when we've timed out.
                          // eslint-disable-next-line no-unmodified-loop-condition

                        case 11:
                          if (finished) {
                            _context2.next = 25;
                            break;
                          }

                          if (jestFakeTimersAreEnabled()) {
                            _context2.next = 17;
                            break;
                          }

                          error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
                          if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
                          reject(error);
                          return _context2.abrupt("return");

                        case 17:
                          // we *could* (maybe should?) use `advanceTimersToNextTimer` but it's
                          // possible that could make this loop go on forever if someone is using
                          // third party code that's setting up recursive timers so rapidly that
                          // the user's timer's don't get a chance to resolve. So we'll advance
                          // by an interval instead. (We have a test for this case).
                          advanceTimersWrapper(function () {
                            jest.advanceTimersByTime(interval);
                          }); // It's really important that checkCallback is run *before* we flush
                          // in-flight promises. To be honest, I'm not sure why, and I can't quite
                          // think of a way to reproduce the problem in a test, but I spent
                          // an entire day banging my head against a wall on this.

                          checkCallback();

                          if (!finished) {
                            _context2.next = 21;
                            break;
                          }

                          return _context2.abrupt("break", 25);

                        case 21:
                          _context2.next = 23;
                          return advanceTimersWrapper( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                            return regenerator.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return new Promise(function (r) {
                                      setTimeout(r, 0);
                                      jest.advanceTimersByTime(0);
                                    });

                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          })));

                        case 23:
                          _context2.next = 11;
                          break;

                        case 25:
                          _context2.next = 40;
                          break;

                        case 27:
                          _context2.prev = 27;
                          checkContainerType(container);
                          _context2.next = 35;
                          break;

                        case 31:
                          _context2.prev = 31;
                          _context2.t0 = _context2["catch"](27);
                          reject(_context2.t0);
                          return _context2.abrupt("return");

                        case 35:
                          intervalId = setInterval(checkRealTimersCallback, interval);
                          _getWindowFromNode = getWindowFromNode(container), MutationObserver = _getWindowFromNode.MutationObserver;
                          observer = new MutationObserver(checkRealTimersCallback);
                          observer.observe(container, mutationObserverOptions);
                          checkCallback();

                        case 40:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[27, 31]]);
                }));

                return function (_x, _x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }

            function waitForWrapper(callback, options) {
              // create the error here so its stack trace is as close to the
              // calling code as possible
              var stackTraceError = new Error('STACK_TRACE_MESSAGE');
              return getConfig().asyncWrapper(function () {
                return waitFor(callback, _extends({
                  stackTraceError: stackTraceError
                }, options));
              });
            }
            /*
            eslint
              max-lines-per-function: ["error", {"max": 200}],
            */

            function getElementError(message, container) {
              return getConfig().getElementError(message, container);
            }

            function getMultipleElementsFoundError(message, container) {
              return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
            }

            function queryAllByAttribute(attribute, container, text, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$exact = _ref.exact,
                  exact = _ref$exact === void 0 ? true : _ref$exact,
                  collapseWhitespace = _ref.collapseWhitespace,
                  trim = _ref.trim,
                  normalizer = _ref.normalizer;

              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              return Array.from(container.querySelectorAll("[" + attribute + "]")).filter(function (node) {
                return matcher(node.getAttribute(attribute), node, text, matchNormalizer);
              });
            }

            function queryByAttribute(attribute, container, text, options) {
              var els = queryAllByAttribute(attribute, container, text, options);

              if (els.length > 1) {
                throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
              }

              return els[0] || null;
            } // this accepts a query function and returns a function which throws an error
            // if more than one elements is returned, otherwise it returns the first
            // element or null


            function makeSingleQuery(allQuery, getMultipleError) {
              return function (container) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }

                var els = allQuery.apply(void 0, [container].concat(args));

                if (els.length > 1) {
                  var elementStrings = els.map(function (element) {
                    return getElementError(null, element).message;
                  }).join('\n\n');
                  throw getMultipleElementsFoundError(getMultipleError.apply(void 0, [container].concat(args)) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
                }

                return els[0] || null;
              };
            }

            function getSuggestionError(suggestion, container) {
              return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
            } // this accepts a query function and returns a function which throws an error
            // if an empty list of elements is returned


            function makeGetAllQuery(allQuery, getMissingError) {
              return function (container) {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }

                var els = allQuery.apply(void 0, [container].concat(args));

                if (!els.length) {
                  throw getConfig().getElementError(getMissingError.apply(void 0, [container].concat(args)), container);
                }

                return els;
              };
            } // this accepts a getter query function and returns a function which calls
            // waitFor and passing a function which invokes the getter.


            function makeFindQuery(getter) {
              return function (container, text, options, waitForOptions) {
                return waitForWrapper(function () {
                  return getter(container, text, options);
                }, _extends({
                  container: container
                }, waitForOptions));
              };
            }

            var wrapSingleQueryWithSuggestion = function wrapSingleQueryWithSuggestion(query, queryAllByName, variant) {
              return function (container) {
                for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = arguments[_key3];
                }

                var element = query.apply(void 0, [container].concat(args));

                var _ref2 = args.slice(-1),
                    _ref2$ = _ref2[0];

                _ref2$ = _ref2$ === void 0 ? {} : _ref2$;
                var _ref2$$suggest = _ref2$.suggest,
                    suggest = _ref2$$suggest === void 0 ? getConfig().throwSuggestions : _ref2$$suggest;

                if (element && suggest) {
                  var suggestion = getSuggestedQuery(element, variant);

                  if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
                    throw getSuggestionError(suggestion.toString(), container);
                  }
                }

                return element;
              };
            };

            var wrapAllByQueryWithSuggestion = function wrapAllByQueryWithSuggestion(query, queryAllByName, variant) {
              return function (container) {
                for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = arguments[_key4];
                }

                var els = query.apply(void 0, [container].concat(args));

                var _ref3 = args.slice(-1),
                    _ref3$ = _ref3[0];

                _ref3$ = _ref3$ === void 0 ? {} : _ref3$;
                var _ref3$$suggest = _ref3$.suggest,
                    suggest = _ref3$$suggest === void 0 ? getConfig().throwSuggestions : _ref3$$suggest;

                if (els.length && suggest) {
                  // get a unique list of all suggestion messages.  We are only going to make a suggestion if
                  // all the suggestions are the same
                  var uniqueSuggestionMessages = [].concat(new Set(els.map(function (element) {
                    var _getSuggestedQuery;

                    return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
                  })));

                  if ( // only want to suggest if all the els have the same suggestion.
                  uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith( // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
                  getSuggestedQuery(els[0], variant).queryName)) {
                    throw getSuggestionError(uniqueSuggestionMessages[0], container);
                  }
                }

                return els;
              };
            }; // TODO: This deviates from the published declarations
            // However, the implementation always required a dyadic (after `container`) not variadic `queryAllBy` considering the implementation of `makeFindQuery`
            // This is at least statically true and can be verified by accepting `QueryMethod<Arguments, HTMLElement[]>`


            function buildQueries(queryAllBy, getMultipleError, getMissingError) {
              var queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError), queryAllBy.name, 'query');
              var getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
              var getBy = makeSingleQuery(getAllBy, getMultipleError);
              var getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'get');
              var getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace('query', 'get'), 'getAll');
              var findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, 'findAll'));
              var findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'find'));
              return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
            }

            var queryHelpers = /*#__PURE__*/Object.freeze({
              __proto__: null,
              getElementError: getElementError,
              wrapAllByQueryWithSuggestion: wrapAllByQueryWithSuggestion,
              wrapSingleQueryWithSuggestion: wrapSingleQueryWithSuggestion,
              getMultipleElementsFoundError: getMultipleElementsFoundError,
              queryAllByAttribute: queryAllByAttribute,
              queryByAttribute: queryByAttribute,
              makeSingleQuery: makeSingleQuery,
              makeGetAllQuery: makeGetAllQuery,
              makeFindQuery: makeFindQuery,
              buildQueries: buildQueries
            });

            function queryAllLabels(container) {
              return Array.from(container.querySelectorAll('label,input')).map(function (node) {
                return {
                  node: node,
                  textToMatch: getLabelContent(node)
                };
              }).filter(function (_ref) {
                var textToMatch = _ref.textToMatch;
                return textToMatch !== null;
              });
            }

            var queryAllLabelsByText = function queryAllLabelsByText(container, text, _temp) {
              var _ref2 = _temp === void 0 ? {} : _temp,
                  _ref2$exact = _ref2.exact,
                  exact = _ref2$exact === void 0 ? true : _ref2$exact,
                  trim = _ref2.trim,
                  collapseWhitespace = _ref2.collapseWhitespace,
                  normalizer = _ref2.normalizer;

              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              var textToMatchByLabels = queryAllLabels(container);
              return textToMatchByLabels.filter(function (_ref3) {
                var node = _ref3.node,
                    textToMatch = _ref3.textToMatch;
                return matcher(textToMatch, node, text, matchNormalizer);
              }).map(function (_ref4) {
                var node = _ref4.node;
                return node;
              });
            };

            var queryAllByLabelText = function queryAllByLabelText(container, text, _temp2) {
              var _ref5 = _temp2 === void 0 ? {} : _temp2,
                  _ref5$selector = _ref5.selector,
                  selector = _ref5$selector === void 0 ? '*' : _ref5$selector,
                  _ref5$exact = _ref5.exact,
                  exact = _ref5$exact === void 0 ? true : _ref5$exact,
                  collapseWhitespace = _ref5.collapseWhitespace,
                  trim = _ref5.trim,
                  normalizer = _ref5.normalizer;

              checkContainerType(container);
              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              var matchingLabelledElements = Array.from(container.querySelectorAll('*')).filter(function (element) {
                return getRealLabels(element).length || element.hasAttribute('aria-labelledby');
              }).reduce(function (labelledElements, labelledElement) {
                var labelList = getLabels(container, labelledElement, {
                  selector: selector
                });
                labelList.filter(function (label) {
                  return Boolean(label.formControl);
                }).forEach(function (label) {
                  if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) labelledElements.push(label.formControl);
                });
                var labelsValue = labelList.filter(function (label) {
                  return Boolean(label.content);
                }).map(function (label) {
                  return label.content;
                });
                if (matcher(labelsValue.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);

                if (labelsValue.length > 1) {
                  labelsValue.forEach(function (labelValue, index) {
                    if (matcher(labelValue, labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
                    var labelsFiltered = [].concat(labelsValue);
                    labelsFiltered.splice(index, 1);

                    if (labelsFiltered.length > 1) {
                      if (matcher(labelsFiltered.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
                    }
                  });
                }

                return labelledElements;
              }, []).concat(queryAllByAttribute('aria-label', container, text, {
                exact: exact,
                normalizer: matchNormalizer
              }));
              return Array.from(new Set(matchingLabelledElements)).filter(function (element) {
                return element.matches(selector);
              });
            }; // the getAll* query would normally look like this:
            // const getAllByLabelText = makeGetAllQuery(
            //   queryAllByLabelText,
            //   (c, text) => `Unable to find a label with the text of: ${text}`,
            // )
            // however, we can give a more helpful error message than the generic one,
            // so we're writing this one out by hand.


            var getAllByLabelText = function getAllByLabelText(container, text) {
              for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                rest[_key - 2] = arguments[_key];
              }

              var els = queryAllByLabelText.apply(void 0, [container, text].concat(rest));

              if (!els.length) {
                var labels = queryAllLabelsByText.apply(void 0, [container, text].concat(rest));

                if (labels.length) {
                  var tagNames = labels.map(function (label) {
                    return getTagNameOfElementAssociatedWithLabelViaFor(container, label);
                  }).filter(function (tagName) {
                    return !!tagName;
                  });

                  if (tagNames.length) {
                    throw getConfig().getElementError(tagNames.map(function (tagName) {
                      return "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.";
                    }).join('\n\n'), container);
                  } else {
                    throw getConfig().getElementError("Found a label with the text of: " + text + ", however no form control was found associated to that label. Make sure you're using the \"for\" attribute or \"aria-labelledby\" attribute correctly.", container);
                  }
                } else {
                  throw getConfig().getElementError("Unable to find a label with the text of: " + text, container);
                }
              }

              return els;
            };

            function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
              var htmlFor = label.getAttribute('for');

              if (!htmlFor) {
                return null;
              }

              var element = container.querySelector("[id=\"" + htmlFor + "\"]");
              return element ? element.tagName.toLowerCase() : null;
            } // the reason mentioned above is the same reason we're not using buildQueries


            var getMultipleError$7 = function getMultipleError(c, text) {
              return "Found multiple elements with the text of: " + text;
            };

            var queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, 'query');
            var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
            var findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'findAll'));
            var findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'find'));
            var getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'getAll');
            var getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'get');
            var queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, 'queryAll');

            var queryAllByPlaceholderText = function queryAllByPlaceholderText() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              checkContainerType(args[0]);
              return queryAllByAttribute.apply(void 0, ['placeholder'].concat(args));
            };

            var getMultipleError$6 = function getMultipleError(c, text) {
              return "Found multiple elements with the placeholder text of: " + text;
            };

            var getMissingError$6 = function getMissingError(c, text) {
              return "Unable to find an element with the placeholder text of: " + text;
            };

            var queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, 'queryAll');

            var _buildQueries$6 = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6),
                queryByPlaceholderText = _buildQueries$6[0],
                getAllByPlaceholderText = _buildQueries$6[1],
                getByPlaceholderText = _buildQueries$6[2],
                findAllByPlaceholderText = _buildQueries$6[3],
                findByPlaceholderText = _buildQueries$6[4];

            var queryAllByText = function queryAllByText(container, text, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$selector = _ref.selector,
                  selector = _ref$selector === void 0 ? '*' : _ref$selector,
                  _ref$exact = _ref.exact,
                  exact = _ref$exact === void 0 ? true : _ref$exact,
                  collapseWhitespace = _ref.collapseWhitespace,
                  trim = _ref.trim,
                  _ref$ignore = _ref.ignore,
                  ignore = _ref$ignore === void 0 ? DEFAULT_IGNORE_TAGS : _ref$ignore,
                  normalizer = _ref.normalizer;

              checkContainerType(container);
              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              var baseArray = [];

              if (typeof container.matches === 'function' && container.matches(selector)) {
                baseArray = [container];
              }

              return [].concat(baseArray, Array.from(container.querySelectorAll(selector))) // TODO: `matches` according lib.dom.d.ts can get only `string` but according our code it can handle also boolean :)
              .filter(function (node) {
                return !ignore || !node.matches(ignore);
              }).filter(function (node) {
                return matcher(getNodeText(node), node, text, matchNormalizer);
              });
            };

            var getMultipleError$5 = function getMultipleError(c, text) {
              return "Found multiple elements with the text: " + text;
            };

            var getMissingError$5 = function getMissingError(c, text, options) {
              if (options === void 0) {
                options = {};
              }

              var _options = options,
                  collapseWhitespace = _options.collapseWhitespace,
                  trim = _options.trim,
                  normalizer = _options.normalizer;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              var normalizedText = matchNormalizer(text.toString());
              var isNormalizedDifferent = normalizedText !== text.toString();
              return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text + "')" : text) + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
            };

            var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, 'queryAll');

            var _buildQueries$5 = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5),
                queryByText = _buildQueries$5[0],
                getAllByText = _buildQueries$5[1],
                getByText = _buildQueries$5[2],
                findAllByText = _buildQueries$5[3],
                findByText = _buildQueries$5[4];

            var queryAllByDisplayValue = function queryAllByDisplayValue(container, value, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$exact = _ref.exact,
                  exact = _ref$exact === void 0 ? true : _ref$exact,
                  collapseWhitespace = _ref.collapseWhitespace,
                  trim = _ref.trim,
                  normalizer = _ref.normalizer;

              checkContainerType(container);
              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              return Array.from(container.querySelectorAll("input,textarea,select")).filter(function (node) {
                if (node.tagName === 'SELECT') {
                  var selectedOptions = Array.from(node.options).filter(function (option) {
                    return option.selected;
                  });
                  return selectedOptions.some(function (optionNode) {
                    return matcher(getNodeText(optionNode), optionNode, value, matchNormalizer);
                  });
                } else {
                  return matcher(node.value, node, value, matchNormalizer);
                }
              });
            };

            var getMultipleError$4 = function getMultipleError(c, value) {
              return "Found multiple elements with the display value: " + value + ".";
            };

            var getMissingError$4 = function getMissingError(c, value) {
              return "Unable to find an element with the display value: " + value + ".";
            };

            var queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, 'queryAll');

            var _buildQueries$4 = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4),
                queryByDisplayValue = _buildQueries$4[0],
                getAllByDisplayValue = _buildQueries$4[1],
                getByDisplayValue = _buildQueries$4[2],
                findAllByDisplayValue = _buildQueries$4[3],
                findByDisplayValue = _buildQueries$4[4];

            var VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;

            var queryAllByAltText = function queryAllByAltText(container, alt, options) {
              if (options === void 0) {
                options = {};
              }

              checkContainerType(container);
              return queryAllByAttribute('alt', container, alt, options).filter(function (node) {
                return VALID_TAG_REGEXP.test(node.tagName);
              });
            };

            var getMultipleError$3 = function getMultipleError(c, alt) {
              return "Found multiple elements with the alt text: " + alt;
            };

            var getMissingError$3 = function getMissingError(c, alt) {
              return "Unable to find an element with the alt text: " + alt;
            };

            var queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, 'queryAll');

            var _buildQueries$3 = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3),
                queryByAltText = _buildQueries$3[0],
                getAllByAltText = _buildQueries$3[1],
                getByAltText = _buildQueries$3[2],
                findAllByAltText = _buildQueries$3[3],
                findByAltText = _buildQueries$3[4];

            var isSvgTitle = function isSvgTitle(node) {
              var _node$parentElement;

              return node.tagName.toLowerCase() === 'title' && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === 'svg';
            };

            var queryAllByTitle = function queryAllByTitle(container, text, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$exact = _ref.exact,
                  exact = _ref$exact === void 0 ? true : _ref$exact,
                  collapseWhitespace = _ref.collapseWhitespace,
                  trim = _ref.trim,
                  normalizer = _ref.normalizer;

              checkContainerType(container);
              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });
              return Array.from(container.querySelectorAll('[title], svg > title')).filter(function (node) {
                return matcher(node.getAttribute('title'), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer);
              });
            };

            var getMultipleError$2 = function getMultipleError(c, title) {
              return "Found multiple elements with the title: " + title + ".";
            };

            var getMissingError$2 = function getMissingError(c, title) {
              return "Unable to find an element with the title: " + title + ".";
            };

            var queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, 'queryAll');

            var _buildQueries$2 = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2),
                queryByTitle = _buildQueries$2[0],
                getAllByTitle = _buildQueries$2[1],
                getByTitle = _buildQueries$2[2],
                findAllByTitle = _buildQueries$2[3],
                findByTitle = _buildQueries$2[4];

            function queryAllByRole(container, role, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$exact = _ref.exact,
                  exact = _ref$exact === void 0 ? true : _ref$exact,
                  collapseWhitespace = _ref.collapseWhitespace,
                  _ref$hidden = _ref.hidden,
                  hidden = _ref$hidden === void 0 ? getConfig().defaultHidden : _ref$hidden,
                  name = _ref.name,
                  trim = _ref.trim,
                  normalizer = _ref.normalizer,
                  _ref$queryFallbacks = _ref.queryFallbacks,
                  queryFallbacks = _ref$queryFallbacks === void 0 ? false : _ref$queryFallbacks,
                  selected = _ref.selected,
                  checked = _ref.checked,
                  pressed = _ref.pressed,
                  current = _ref.current,
                  level = _ref.level,
                  expanded = _ref.expanded;

              checkContainerType(container);
              var matcher = exact ? matches : fuzzyMatches;
              var matchNormalizer = makeNormalizer({
                collapseWhitespace: collapseWhitespace,
                trim: trim,
                normalizer: normalizer
              });

              if (selected !== undefined) {
                var _allRoles$get;

                // guard against unknown roles
                if (((_allRoles$get = lib.roles.get(role)) == null ? void 0 : _allRoles$get.props['aria-selected']) === undefined) {
                  throw new Error("\"aria-selected\" is not supported on role \"" + role + "\".");
                }
              }

              if (checked !== undefined) {
                var _allRoles$get2;

                // guard against unknown roles
                if (((_allRoles$get2 = lib.roles.get(role)) == null ? void 0 : _allRoles$get2.props['aria-checked']) === undefined) {
                  throw new Error("\"aria-checked\" is not supported on role \"" + role + "\".");
                }
              }

              if (pressed !== undefined) {
                var _allRoles$get3;

                // guard against unknown roles
                if (((_allRoles$get3 = lib.roles.get(role)) == null ? void 0 : _allRoles$get3.props['aria-pressed']) === undefined) {
                  throw new Error("\"aria-pressed\" is not supported on role \"" + role + "\".");
                }
              }

              if (current !== undefined) {
                var _allRoles$get4;

                /* istanbul ignore next */
                // guard against unknown roles
                // All currently released ARIA versions support `aria-current` on all roles.
                // Leaving this for symetry and forward compatibility
                if (((_allRoles$get4 = lib.roles.get(role)) == null ? void 0 : _allRoles$get4.props['aria-current']) === undefined) {
                  throw new Error("\"aria-current\" is not supported on role \"" + role + "\".");
                }
              }

              if (level !== undefined) {
                // guard against using `level` option with any role other than `heading`
                if (role !== 'heading') {
                  throw new Error("Role \"" + role + "\" cannot have \"level\" property.");
                }
              }

              if (expanded !== undefined) {
                var _allRoles$get5;

                // guard against unknown roles
                if (((_allRoles$get5 = lib.roles.get(role)) == null ? void 0 : _allRoles$get5.props['aria-expanded']) === undefined) {
                  throw new Error("\"aria-expanded\" is not supported on role \"" + role + "\".");
                }
              }

              var subtreeIsInaccessibleCache = new WeakMap();

              function cachedIsSubtreeInaccessible(element) {
                if (!subtreeIsInaccessibleCache.has(element)) {
                  subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
                }

                return subtreeIsInaccessibleCache.get(element);
              }

              return Array.from(container.querySelectorAll( // Only query elements that can be matched by the following filters
              makeRoleSelector(role, exact, normalizer ? matchNormalizer : undefined))).filter(function (node) {
                var isRoleSpecifiedExplicitly = node.hasAttribute('role');

                if (isRoleSpecifiedExplicitly) {
                  var roleValue = node.getAttribute('role');

                  if (queryFallbacks) {
                    return roleValue.split(' ').filter(Boolean).some(function (text) {
                      return matcher(text, node, role, matchNormalizer);
                    });
                  } // if a custom normalizer is passed then let normalizer handle the role value


                  if (normalizer) {
                    return matcher(roleValue, node, role, matchNormalizer);
                  } // other wise only send the first word to match


                  var _roleValue$split = roleValue.split(' '),
                      firstWord = _roleValue$split[0];

                  return matcher(firstWord, node, role, matchNormalizer);
                }

                var implicitRoles = getImplicitAriaRoles(node);
                return implicitRoles.some(function (implicitRole) {
                  return matcher(implicitRole, node, role, matchNormalizer);
                });
              }).filter(function (element) {
                if (selected !== undefined) {
                  return selected === computeAriaSelected(element);
                }

                if (checked !== undefined) {
                  return checked === computeAriaChecked(element);
                }

                if (pressed !== undefined) {
                  return pressed === computeAriaPressed(element);
                }

                if (current !== undefined) {
                  return current === computeAriaCurrent(element);
                }

                if (expanded !== undefined) {
                  return expanded === computeAriaExpanded(element);
                }

                if (level !== undefined) {
                  return level === computeHeadingLevel(element);
                } // don't care if aria attributes are unspecified


                return true;
              }).filter(function (element) {
                if (name === undefined) {
                  // Don't care
                  return true;
                }

                return matches(computeAccessibleName(element, {
                  computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
                }), element, name, function (text) {
                  return text;
                });
              }).filter(function (element) {
                return hidden === false ? isInaccessible(element, {
                  isSubtreeInaccessible: cachedIsSubtreeInaccessible
                }) === false : true;
              });
            }

            function makeRoleSelector(role, exact, customNormalizer) {
              var _roleElements$get;

              if (typeof role !== 'string') {
                // For non-string role parameters we can not determine the implicitRoleSelectors.
                return '*';
              }

              var explicitRoleSelector = exact && !customNormalizer ? "*[role~=\"" + role + "\"]" : '*[role]';
              var roleRelations = (_roleElements$get = lib.roleElements.get(role)) != null ? _roleElements$get : new Set();
              var implicitRoleSelectors = new Set(Array.from(roleRelations).map(function (_ref2) {
                var name = _ref2.name;
                return name;
              })); // Current transpilation config sometimes assumes `...` is always applied to arrays.
              // `...` is equivalent to `Array.prototype.concat` for arrays.
              // If you replace this code with `[explicitRoleSelector, ...implicitRoleSelectors]`, make sure every transpilation target retains the `...` in favor of `Array.prototype.concat`.

              return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(',');
            }

            var getMultipleError$1 = function getMultipleError(c, role, _temp2) {
              var _ref3 = _temp2 === void 0 ? {} : _temp2,
                  name = _ref3.name;

              var nameHint = '';

              if (name === undefined) {
                nameHint = '';
              } else if (typeof name === 'string') {
                nameHint = " and name \"" + name + "\"";
              } else {
                nameHint = " and name `" + name + "`";
              }

              return "Found multiple elements with the role \"" + role + "\"" + nameHint;
            };

            var getMissingError$1 = function getMissingError(container, role, _temp3) {
              var _ref4 = _temp3 === void 0 ? {} : _temp3,
                  _ref4$hidden = _ref4.hidden,
                  hidden = _ref4$hidden === void 0 ? getConfig().defaultHidden : _ref4$hidden,
                  name = _ref4.name;

              if (getConfig()._disableExpensiveErrorDiagnostics) {
                return "Unable to find role=\"" + role + "\"";
              }

              var roles = '';
              Array.from(container.children).forEach(function (childElement) {
                roles += prettyRoles(childElement, {
                  hidden: hidden,
                  includeName: name !== undefined
                });
              });
              var roleMessage;

              if (roles.length === 0) {
                if (hidden === false) {
                  roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
                } else {
                  roleMessage = 'There are no available roles.';
                }
              } else {
                roleMessage = ("\nHere are the " + (hidden === false ? 'accessible' : 'available') + " roles:\n\n  " + roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n') + "\n").trim();
              }

              var nameHint = '';

              if (name === undefined) {
                nameHint = '';
              } else if (typeof name === 'string') {
                nameHint = " and name \"" + name + "\"";
              } else {
                nameHint = " and name `" + name + "`";
              }

              return ("\nUnable to find an " + (hidden === false ? 'accessible ' : '') + "element with the role \"" + role + "\"" + nameHint + "\n\n" + roleMessage).trim();
            };

            var queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, 'queryAll');

            var _buildQueries$1 = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1),
                queryByRole = _buildQueries$1[0],
                getAllByRole = _buildQueries$1[1],
                getByRole = _buildQueries$1[2],
                findAllByRole = _buildQueries$1[3],
                findByRole = _buildQueries$1[4];

            var getTestIdAttribute = function getTestIdAttribute() {
              return getConfig().testIdAttribute;
            };

            var queryAllByTestId = function queryAllByTestId() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              checkContainerType(args[0]);
              return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
            };

            var getMultipleError = function getMultipleError(c, id) {
              return "Found multiple elements by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
            };

            var getMissingError = function getMissingError(c, id) {
              return "Unable to find an element by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
            };

            var queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, 'queryAll');

            var _buildQueries = buildQueries(queryAllByTestId, getMultipleError, getMissingError),
                queryByTestId = _buildQueries[0],
                getAllByTestId = _buildQueries[1],
                getByTestId = _buildQueries[2],
                findAllByTestId = _buildQueries[3],
                findByTestId = _buildQueries[4];

            var queries = /*#__PURE__*/Object.freeze({
              __proto__: null,
              queryAllByLabelText: queryAllByLabelTextWithSuggestions,
              queryByLabelText: queryByLabelText,
              getAllByLabelText: getAllByLabelTextWithSuggestions,
              getByLabelText: getByLabelTextWithSuggestions,
              findAllByLabelText: findAllByLabelText,
              findByLabelText: findByLabelText,
              queryByPlaceholderText: queryByPlaceholderText,
              queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
              getByPlaceholderText: getByPlaceholderText,
              getAllByPlaceholderText: getAllByPlaceholderText,
              findAllByPlaceholderText: findAllByPlaceholderText,
              findByPlaceholderText: findByPlaceholderText,
              queryByText: queryByText,
              queryAllByText: queryAllByTextWithSuggestions,
              getByText: getByText,
              getAllByText: getAllByText,
              findAllByText: findAllByText,
              findByText: findByText,
              queryByDisplayValue: queryByDisplayValue,
              queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
              getByDisplayValue: getByDisplayValue,
              getAllByDisplayValue: getAllByDisplayValue,
              findAllByDisplayValue: findAllByDisplayValue,
              findByDisplayValue: findByDisplayValue,
              queryByAltText: queryByAltText,
              queryAllByAltText: queryAllByAltTextWithSuggestions,
              getByAltText: getByAltText,
              getAllByAltText: getAllByAltText,
              findAllByAltText: findAllByAltText,
              findByAltText: findByAltText,
              queryByTitle: queryByTitle,
              queryAllByTitle: queryAllByTitleWithSuggestions,
              getByTitle: getByTitle,
              getAllByTitle: getAllByTitle,
              findAllByTitle: findAllByTitle,
              findByTitle: findByTitle,
              queryByRole: queryByRole,
              queryAllByRole: queryAllByRoleWithSuggestions,
              getAllByRole: getAllByRole,
              getByRole: getByRole,
              findAllByRole: findAllByRole,
              findByRole: findByRole,
              queryByTestId: queryByTestId,
              queryAllByTestId: queryAllByTestIdWithSuggestions,
              getByTestId: getByTestId,
              getAllByTestId: getAllByTestId,
              findAllByTestId: findAllByTestId,
              findByTestId: findByTestId
            });

            /**
             * @typedef {{[key: string]: Function}} FuncMap
             */

            /**
             * @param {HTMLElement} element container
             * @param {FuncMap} queries object of functions
             * @param {Object} initialValue for reducer
             * @returns {FuncMap} returns object of functions bound to container
             */

            function getQueriesForElement(element, queries$1, initialValue) {
              if (queries$1 === void 0) {
                queries$1 = queries;
              }

              if (initialValue === void 0) {
                initialValue = {};
              }

              return Object.keys(queries$1).reduce(function (helpers, key) {
                var fn = queries$1[key];
                helpers[key] = fn.bind(null, element);
                return helpers;
              }, initialValue);
            }

            var isRemoved = function isRemoved(result) {
              return !result || Array.isArray(result) && !result.length;
            }; // Check if the element is not present.
            // As the name implies, waitForElementToBeRemoved should check `present` --> `removed`


            function initialCheck(elements) {
              if (isRemoved(elements)) {
                throw new Error('The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.');
              }
            }

            function waitForElementToBeRemoved(_x, _x2) {
              return _waitForElementToBeRemoved.apply(this, arguments);
            }

            function _waitForElementToBeRemoved() {
              _waitForElementToBeRemoved = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback, options) {
                var timeoutError, elements, getRemainingElements;
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // created here so we get a nice stacktrace
                        timeoutError = new Error('Timed out in waitForElementToBeRemoved.');

                        if (typeof callback !== 'function') {
                          initialCheck(callback);
                          elements = Array.isArray(callback) ? callback : [callback];
                          getRemainingElements = elements.map(function (element) {
                            var parent = element.parentElement;
                            if (parent === null) return function () {
                              return null;
                            };

                            while (parent.parentElement) {
                              parent = parent.parentElement;
                            }

                            return function () {
                              return parent.contains(element) ? element : null;
                            };
                          });

                          callback = function callback() {
                            return getRemainingElements.map(function (c) {
                              return c();
                            }).filter(Boolean);
                          };
                        }

                        initialCheck(callback());
                        return _context.abrupt("return", waitForWrapper(function () {
                          var result;

                          try {
                            result = callback();
                          } catch (error) {
                            if (error.name === 'TestingLibraryElementError') {
                              return undefined;
                            }

                            throw error;
                          }

                          if (!isRemoved(result)) {
                            throw timeoutError;
                          }

                          return undefined;
                        }, options));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _waitForElementToBeRemoved.apply(this, arguments);
            }
            /*
            eslint
              require-await: "off"
            */

            var eventMap = {
              // Clipboard Events
              copy: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              cut: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              paste: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Composition Events
              compositionEnd: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              compositionStart: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              compositionUpdate: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Keyboard Events
              keyDown: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              keyPress: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              keyUp: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              // Focus Events
              focus: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              blur: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              focusIn: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              focusOut: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              // Form Events
              change: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              input: {
                EventType: 'InputEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              invalid: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: true
                }
              },
              submit: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              reset: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              // Mouse Events
              click: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  button: 0,
                  composed: true
                }
              },
              contextMenu: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dblClick: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              drag: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragEnd: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragEnter: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragExit: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragLeave: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragOver: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragStart: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              drop: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseDown: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseEnter: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              mouseLeave: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              mouseMove: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseOut: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseOver: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseUp: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Selection Events
              select: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // Touch Events
              touchCancel: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              touchEnd: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              touchMove: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              touchStart: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // UI Events
              resize: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              scroll: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Wheel Events
              wheel: {
                EventType: 'WheelEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Media Events
              abort: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              canPlay: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              canPlayThrough: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              durationChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              emptied: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              encrypted: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              ended: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadedData: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadedMetadata: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadStart: {
                EventType: 'ProgressEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              pause: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              play: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              playing: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              progress: {
                EventType: 'ProgressEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              rateChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              seeked: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              seeking: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              stalled: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              suspend: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              timeUpdate: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              volumeChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              waiting: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Image Events
              load: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              error: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Animation Events
              animationStart: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              animationEnd: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              animationIteration: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // Transition Events
              transitionCancel: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              transitionEnd: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              transitionRun: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              transitionStart: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // pointer events
              pointerOver: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerEnter: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              pointerDown: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerMove: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerUp: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerCancel: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              pointerOut: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerLeave: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              gotPointerCapture: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              lostPointerCapture: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              // history events
              popState: {
                EventType: 'PopStateEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              }
            };
            var eventAliasMap = {
              doubleClick: 'dblClick'
            };

            var _excluded = ["value", "files"],
                _excluded2 = ["bubbles", "cancelable", "detail"];

            function fireEvent$1(element, event) {
              return getConfig().eventWrapper(function () {
                if (!event) {
                  throw new Error("Unable to fire an event - please provide an event object.");
                }

                if (!element) {
                  throw new Error("Unable to fire a \"" + event.type + "\" event - please provide a DOM element.");
                }

                return element.dispatchEvent(event);
              });
            }

            function createEvent(eventName, node, init, _temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$EventType = _ref.EventType,
                  EventType = _ref$EventType === void 0 ? 'Event' : _ref$EventType,
                  _ref$defaultInit = _ref.defaultInit,
                  defaultInit = _ref$defaultInit === void 0 ? {} : _ref$defaultInit;

              if (!node) {
                throw new Error("Unable to fire a \"" + eventName + "\" event - please provide a DOM element.");
              }

              var eventInit = _extends({}, defaultInit, init);

              var _eventInit$target = eventInit.target;
              _eventInit$target = _eventInit$target === void 0 ? {} : _eventInit$target;

              var value = _eventInit$target.value,
                  files = _eventInit$target.files,
                  targetProperties = _objectWithoutPropertiesLoose(_eventInit$target, _excluded);

              if (value !== undefined) {
                setNativeValue(node, value);
              }

              if (files !== undefined) {
                // input.files is a read-only property so this is not allowed:
                // input.files = [file]
                // so we have to use this workaround to set the property
                Object.defineProperty(node, 'files', {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: files
                });
              }

              Object.assign(node, targetProperties);
              var window = getWindowFromNode(node);
              var EventConstructor = window[EventType] || window.Event;
              var event;
              /* istanbul ignore else  */

              if (typeof EventConstructor === 'function') {
                event = new EventConstructor(eventName, eventInit);
              } else {
                // IE11 polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
                event = window.document.createEvent(EventType);

                var bubbles = eventInit.bubbles,
                    cancelable = eventInit.cancelable,
                    detail = eventInit.detail,
                    otherInit = _objectWithoutPropertiesLoose(eventInit, _excluded2);

                event.initEvent(eventName, bubbles, cancelable, detail);
                Object.keys(otherInit).forEach(function (eventKey) {
                  event[eventKey] = otherInit[eventKey];
                });
              } // DataTransfer is not supported in jsdom: https://github.com/jsdom/jsdom/issues/1568


              var dataTransferProperties = ['dataTransfer', 'clipboardData'];
              dataTransferProperties.forEach(function (dataTransferKey) {
                var dataTransferValue = eventInit[dataTransferKey];

                if (typeof dataTransferValue === 'object') {
                  /* istanbul ignore if  */
                  if (typeof window.DataTransfer === 'function') {
                    Object.defineProperty(event, dataTransferKey, {
                      value: Object.getOwnPropertyNames(dataTransferValue).reduce(function (acc, propName) {
                        Object.defineProperty(acc, propName, {
                          value: dataTransferValue[propName]
                        });
                        return acc;
                      }, new window.DataTransfer())
                    });
                  } else {
                    Object.defineProperty(event, dataTransferKey, {
                      value: dataTransferValue
                    });
                  }
                }
              });
              return event;
            }

            Object.keys(eventMap).forEach(function (key) {
              var _eventMap$key = eventMap[key],
                  EventType = _eventMap$key.EventType,
                  defaultInit = _eventMap$key.defaultInit;
              var eventName = key.toLowerCase();

              createEvent[key] = function (node, init) {
                return createEvent(eventName, node, init, {
                  EventType: EventType,
                  defaultInit: defaultInit
                });
              };

              fireEvent$1[key] = function (node, init) {
                return fireEvent$1(node, createEvent[key](node, init));
              };
            }); // function written after some investigation here:
            // https://github.com/facebook/react/issues/10135#issuecomment-401496776

            function setNativeValue(element, value) {
              var _ref2 = Object.getOwnPropertyDescriptor(element, 'value') || {},
                  valueSetter = _ref2.set;

              var prototype = Object.getPrototypeOf(element);

              var _ref3 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
                  prototypeValueSetter = _ref3.set;

              if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
                prototypeValueSetter.call(element, value);
              } else {
                /* istanbul ignore if */
                // eslint-disable-next-line no-lonely-if -- Can't be ignored by istanbul otherwise
                if (valueSetter) {
                  valueSetter.call(element, value);
                } else {
                  throw new Error('The given element does not have a value setter');
                }
              }
            }

            Object.keys(eventAliasMap).forEach(function (aliasKey) {
              var key = eventAliasMap[aliasKey];

              fireEvent$1[aliasKey] = function () {
                return fireEvent$1[key].apply(fireEvent$1, arguments);
              };
            });
            /* eslint complexity:["error", 9] */

            function unindent(string) {
              // remove white spaces first, to save a few bytes.
              // testing-playground will reformat on load any ways.
              return string.replace(/[ \t]*[\n][ \t]*/g, '\n');
            }

            function encode(value) {
              return lzString.compressToEncodedURIComponent(unindent(value));
            }

            function getPlaygroundUrl(markup) {
              return "https://testing-playground.com/#markup=" + encode(markup);
            }

            var debug = function debug(element, maxLength, options) {
              return Array.isArray(element) ? element.forEach(function (el) {
                return logDOM(el, maxLength, options);
              }) : logDOM(element, maxLength, options);
            };

            var logTestingPlaygroundURL = function logTestingPlaygroundURL(element) {
              if (element === void 0) {
                element = getDocument().body;
              }

              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              if (!element || !('innerHTML' in element)) {
                console.log("The element you're providing isn't a valid DOM element.");
                return;
              } // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition


              if (!element.innerHTML) {
                console.log("The provided element doesn't have any children.");
                return;
              }

              console.log("Open this URL in your browser\n\n" + getPlaygroundUrl(element.innerHTML));
            };

            var initialValue = {
              debug: debug,
              logTestingPlaygroundURL: logTestingPlaygroundURL
            };
            var screen = typeof document !== 'undefined' && document.body // eslint-disable-line @typescript-eslint/no-unnecessary-condition
            ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce(function (helpers, key) {
              // `key` is for all intents and purposes the type of keyof `helpers`, which itself is the type of `initialValue` plus incoming properties from `queries`
              // if `Object.keys(something)` returned Array<keyof typeof something> this explicit type assertion would not be necessary
              // see https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
              helpers[key] = function () {
                throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
              };

              return helpers;
            }, initialValue);

            var dom_esm = /*#__PURE__*/Object.freeze({
                        __proto__: null,
                        prettyFormat: index$2,
                        buildQueries: buildQueries,
                        configure: configure,
                        createEvent: createEvent,
                        findAllByAltText: findAllByAltText,
                        findAllByDisplayValue: findAllByDisplayValue,
                        findAllByLabelText: findAllByLabelText,
                        findAllByPlaceholderText: findAllByPlaceholderText,
                        findAllByRole: findAllByRole,
                        findAllByTestId: findAllByTestId,
                        findAllByText: findAllByText,
                        findAllByTitle: findAllByTitle,
                        findByAltText: findByAltText,
                        findByDisplayValue: findByDisplayValue,
                        findByLabelText: findByLabelText,
                        findByPlaceholderText: findByPlaceholderText,
                        findByRole: findByRole,
                        findByTestId: findByTestId,
                        findByText: findByText,
                        findByTitle: findByTitle,
                        fireEvent: fireEvent$1,
                        getAllByAltText: getAllByAltText,
                        getAllByDisplayValue: getAllByDisplayValue,
                        getAllByLabelText: getAllByLabelTextWithSuggestions,
                        getAllByPlaceholderText: getAllByPlaceholderText,
                        getAllByRole: getAllByRole,
                        getAllByTestId: getAllByTestId,
                        getAllByText: getAllByText,
                        getAllByTitle: getAllByTitle,
                        getByAltText: getByAltText,
                        getByDisplayValue: getByDisplayValue,
                        getByLabelText: getByLabelTextWithSuggestions,
                        getByPlaceholderText: getByPlaceholderText,
                        getByRole: getByRole,
                        getByTestId: getByTestId,
                        getByText: getByText,
                        getByTitle: getByTitle,
                        getConfig: getConfig,
                        getDefaultNormalizer: getDefaultNormalizer,
                        getElementError: getElementError,
                        getMultipleElementsFoundError: getMultipleElementsFoundError,
                        getNodeText: getNodeText,
                        getQueriesForElement: getQueriesForElement,
                        getRoles: getRoles,
                        getSuggestedQuery: getSuggestedQuery,
                        isInaccessible: isInaccessible,
                        logDOM: logDOM,
                        logRoles: logRoles,
                        makeFindQuery: makeFindQuery,
                        makeGetAllQuery: makeGetAllQuery,
                        makeSingleQuery: makeSingleQuery,
                        prettyDOM: prettyDOM,
                        queries: queries,
                        queryAllByAltText: queryAllByAltTextWithSuggestions,
                        queryAllByAttribute: queryAllByAttribute,
                        queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
                        queryAllByLabelText: queryAllByLabelTextWithSuggestions,
                        queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
                        queryAllByRole: queryAllByRoleWithSuggestions,
                        queryAllByTestId: queryAllByTestIdWithSuggestions,
                        queryAllByText: queryAllByTextWithSuggestions,
                        queryAllByTitle: queryAllByTitleWithSuggestions,
                        queryByAltText: queryByAltText,
                        queryByAttribute: queryByAttribute,
                        queryByDisplayValue: queryByDisplayValue,
                        queryByLabelText: queryByLabelText,
                        queryByPlaceholderText: queryByPlaceholderText,
                        queryByRole: queryByRole,
                        queryByTestId: queryByTestId,
                        queryByText: queryByText,
                        queryByTitle: queryByTitle,
                        queryHelpers: queryHelpers,
                        screen: screen,
                        waitFor: waitForWrapper,
                        waitForElementToBeRemoved: waitForElementToBeRemoved,
                        within: getQueriesForElement,
                        wrapAllByQueryWithSuggestion: wrapAllByQueryWithSuggestion,
                        wrapSingleQueryWithSuggestion: wrapSingleQueryWithSuggestion
            });

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

            var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
            	var from;
            	var to = toObject(target);
            	var symbols;

            	for (var s = 1; s < arguments.length; s++) {
            		from = Object(arguments[s]);

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

            /** @license React v0.20.2
             * scheduler.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            var scheduler_production_min = createCommonjsModule(function (module, exports) {
            var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}
            if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null;}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0));};g=function(a,b){u=setTimeout(a,b);};h=function(){clearTimeout(u);};exports.unstable_shouldYield=function(){return !1};k=exports.unstable_forceFrameRate=function(){};}else {var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
            window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
            E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5;};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null);}catch(b){throw G.postMessage(null),b;}}else A=!1;};f=function(a){B=a;A||(A=!0,G.postMessage(null));};g=function(a,b){C=
            x(function(){a(exports.unstable_now());},b);};h=function(){y(C);C=-1;};}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
            function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
            function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M);}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else {var b=J(M);null!==b&&g(U,b.startTime-a);}}
            function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b);}else K(L);O=J(L);}if(null!==O)var m=!0;else {var n=J(M);null!==n&&g(U,n.startTime-b);m=!1;}return m}finally{O=null,P=c,Q=!1;}}var W=k;exports.unstable_IdlePriority=5;
            exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V));};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
            exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P;}var c=P;P=b;try{return a()}finally{P=c;}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=P;P=a;try{return b()}finally{P=c;}};
            exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
            exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c;}}};
            });

            var scheduler_development = createCommonjsModule(function (module, exports) {

            if (process.env.NODE_ENV !== "production") {
              (function() {

            var enableSchedulerDebugging = false;
            var enableProfiling = false;

            var requestHostCallback;
            var requestHostTimeout;
            var cancelHostTimeout;
            var requestPaint;
            var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

            if (hasPerformanceNow) {
              var localPerformance = performance;

              exports.unstable_now = function () {
                return localPerformance.now();
              };
            } else {
              var localDate = Date;
              var initialTime = localDate.now();

              exports.unstable_now = function () {
                return localDate.now() - initialTime;
              };
            }

            if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
            // implementation using setTimeout.
            typeof window === 'undefined' || // Check if MessageChannel is supported, too.
            typeof MessageChannel !== 'function') {
              // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
              // fallback to a naive implementation.
              var _callback = null;
              var _timeoutID = null;

              var _flushCallback = function () {
                if (_callback !== null) {
                  try {
                    var currentTime = exports.unstable_now();
                    var hasRemainingTime = true;

                    _callback(hasRemainingTime, currentTime);

                    _callback = null;
                  } catch (e) {
                    setTimeout(_flushCallback, 0);
                    throw e;
                  }
                }
              };

              requestHostCallback = function (cb) {
                if (_callback !== null) {
                  // Protect against re-entrancy.
                  setTimeout(requestHostCallback, 0, cb);
                } else {
                  _callback = cb;
                  setTimeout(_flushCallback, 0);
                }
              };

              requestHostTimeout = function (cb, ms) {
                _timeoutID = setTimeout(cb, ms);
              };

              cancelHostTimeout = function () {
                clearTimeout(_timeoutID);
              };

              exports.unstable_shouldYield = function () {
                return false;
              };

              requestPaint = exports.unstable_forceFrameRate = function () {};
            } else {
              // Capture local references to native APIs, in case a polyfill overrides them.
              var _setTimeout = window.setTimeout;
              var _clearTimeout = window.clearTimeout;

              if (typeof console !== 'undefined') {
                // TODO: Scheduler no longer requires these methods to be polyfilled. But
                // maybe we want to continue warning if they don't exist, to preserve the
                // option to rely on it in the future?
                var requestAnimationFrame = window.requestAnimationFrame;
                var cancelAnimationFrame = window.cancelAnimationFrame;

                if (typeof requestAnimationFrame !== 'function') {
                  // Using console['error'] to evade Babel and ESLint
                  console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
                }

                if (typeof cancelAnimationFrame !== 'function') {
                  // Using console['error'] to evade Babel and ESLint
                  console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
                }
              }

              var isMessageLoopRunning = false;
              var scheduledHostCallback = null;
              var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
              // thread, like user events. By default, it yields multiple times per frame.
              // It does not attempt to align with frame boundaries, since most tasks don't
              // need to be frame aligned; for those that do, use requestAnimationFrame.

              var yieldInterval = 5;
              var deadline = 0; // TODO: Make this configurable

              {
                // `isInputPending` is not available. Since we have no way of knowing if
                // there's pending input, always yield at the end of the frame.
                exports.unstable_shouldYield = function () {
                  return exports.unstable_now() >= deadline;
                }; // Since we yield every frame regardless, `requestPaint` has no effect.


                requestPaint = function () {};
              }

              exports.unstable_forceFrameRate = function (fps) {
                if (fps < 0 || fps > 125) {
                  // Using console['error'] to evade Babel and ESLint
                  console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                  return;
                }

                if (fps > 0) {
                  yieldInterval = Math.floor(1000 / fps);
                } else {
                  // reset the framerate
                  yieldInterval = 5;
                }
              };

              var performWorkUntilDeadline = function () {
                if (scheduledHostCallback !== null) {
                  var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
                  // cycle. This means there's always time remaining at the beginning of
                  // the message event.

                  deadline = currentTime + yieldInterval;
                  var hasTimeRemaining = true;

                  try {
                    var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

                    if (!hasMoreWork) {
                      isMessageLoopRunning = false;
                      scheduledHostCallback = null;
                    } else {
                      // If there's more work, schedule the next message event at the end
                      // of the preceding one.
                      port.postMessage(null);
                    }
                  } catch (error) {
                    // If a scheduler task throws, exit the current browser task so the
                    // error can be observed.
                    port.postMessage(null);
                    throw error;
                  }
                } else {
                  isMessageLoopRunning = false;
                } // Yielding to the browser will give it a chance to paint, so we can
              };

              var channel = new MessageChannel();
              var port = channel.port2;
              channel.port1.onmessage = performWorkUntilDeadline;

              requestHostCallback = function (callback) {
                scheduledHostCallback = callback;

                if (!isMessageLoopRunning) {
                  isMessageLoopRunning = true;
                  port.postMessage(null);
                }
              };

              requestHostTimeout = function (callback, ms) {
                taskTimeoutID = _setTimeout(function () {
                  callback(exports.unstable_now());
                }, ms);
              };

              cancelHostTimeout = function () {
                _clearTimeout(taskTimeoutID);

                taskTimeoutID = -1;
              };
            }

            function push(heap, node) {
              var index = heap.length;
              heap.push(node);
              siftUp(heap, node, index);
            }
            function peek(heap) {
              var first = heap[0];
              return first === undefined ? null : first;
            }
            function pop(heap) {
              var first = heap[0];

              if (first !== undefined) {
                var last = heap.pop();

                if (last !== first) {
                  heap[0] = last;
                  siftDown(heap, last, 0);
                }

                return first;
              } else {
                return null;
              }
            }

            function siftUp(heap, node, i) {
              var index = i;

              while (true) {
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];

                if (parent !== undefined && compare(parent, node) > 0) {
                  // The parent is larger. Swap positions.
                  heap[parentIndex] = node;
                  heap[index] = parent;
                  index = parentIndex;
                } else {
                  // The parent is smaller. Exit.
                  return;
                }
              }
            }

            function siftDown(heap, node, i) {
              var index = i;
              var length = heap.length;

              while (index < length) {
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

                if (left !== undefined && compare(left, node) < 0) {
                  if (right !== undefined && compare(right, left) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                  } else {
                    heap[index] = left;
                    heap[leftIndex] = node;
                    index = leftIndex;
                  }
                } else if (right !== undefined && compare(right, node) < 0) {
                  heap[index] = right;
                  heap[rightIndex] = node;
                  index = rightIndex;
                } else {
                  // Neither child is smaller. Exit.
                  return;
                }
              }
            }

            function compare(a, b) {
              // Compare sort index first, then task id.
              var diff = a.sortIndex - b.sortIndex;
              return diff !== 0 ? diff : a.id - b.id;
            }

            // TODO: Use symbols?
            var ImmediatePriority = 1;
            var UserBlockingPriority = 2;
            var NormalPriority = 3;
            var LowPriority = 4;
            var IdlePriority = 5;

            function markTaskErrored(task, ms) {
            }

            /* eslint-disable no-var */
            // Math.pow(2, 30) - 1
            // 0b111111111111111111111111111111

            var maxSigned31BitInt = 1073741823; // Times out immediately

            var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

            var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
            var NORMAL_PRIORITY_TIMEOUT = 5000;
            var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

            var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap

            var taskQueue = [];
            var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

            var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
            var currentTask = null;
            var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

            var isPerformingWork = false;
            var isHostCallbackScheduled = false;
            var isHostTimeoutScheduled = false;

            function advanceTimers(currentTime) {
              // Check for tasks that are no longer delayed and add them to the queue.
              var timer = peek(timerQueue);

              while (timer !== null) {
                if (timer.callback === null) {
                  // Timer was cancelled.
                  pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                  // Timer fired. Transfer to the task queue.
                  pop(timerQueue);
                  timer.sortIndex = timer.expirationTime;
                  push(taskQueue, timer);
                } else {
                  // Remaining timers are pending.
                  return;
                }

                timer = peek(timerQueue);
              }
            }

            function handleTimeout(currentTime) {
              isHostTimeoutScheduled = false;
              advanceTimers(currentTime);

              if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                  isHostCallbackScheduled = true;
                  requestHostCallback(flushWork);
                } else {
                  var firstTimer = peek(timerQueue);

                  if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                  }
                }
              }
            }

            function flushWork(hasTimeRemaining, initialTime) {


              isHostCallbackScheduled = false;

              if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
              }

              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;

              try {
                var currentTime; if (enableProfiling) ; else {
                  // No catch in prod code path.
                  return workLoop(hasTimeRemaining, initialTime);
                }
              } finally {
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
              }
            }

            function workLoop(hasTimeRemaining, initialTime) {
              var currentTime = initialTime;
              advanceTimers(currentTime);
              currentTask = peek(taskQueue);

              while (currentTask !== null && !(enableSchedulerDebugging )) {
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || exports.unstable_shouldYield())) {
                  // This currentTask hasn't expired, and we've reached the deadline.
                  break;
                }

                var callback = currentTask.callback;

                if (typeof callback === 'function') {
                  currentTask.callback = null;
                  currentPriorityLevel = currentTask.priorityLevel;
                  var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;

                  var continuationCallback = callback(didUserCallbackTimeout);
                  currentTime = exports.unstable_now();

                  if (typeof continuationCallback === 'function') {
                    currentTask.callback = continuationCallback;
                  } else {

                    if (currentTask === peek(taskQueue)) {
                      pop(taskQueue);
                    }
                  }

                  advanceTimers(currentTime);
                } else {
                  pop(taskQueue);
                }

                currentTask = peek(taskQueue);
              } // Return whether there's additional work


              if (currentTask !== null) {
                return true;
              } else {
                var firstTimer = peek(timerQueue);

                if (firstTimer !== null) {
                  requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }

                return false;
              }
            }

            function unstable_runWithPriority(priorityLevel, eventHandler) {
              switch (priorityLevel) {
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                  break;

                default:
                  priorityLevel = NormalPriority;
              }

              var previousPriorityLevel = currentPriorityLevel;
              currentPriorityLevel = priorityLevel;

              try {
                return eventHandler();
              } finally {
                currentPriorityLevel = previousPriorityLevel;
              }
            }

            function unstable_next(eventHandler) {
              var priorityLevel;

              switch (currentPriorityLevel) {
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                  // Shift down to normal priority
                  priorityLevel = NormalPriority;
                  break;

                default:
                  // Anything lower than normal priority should remain at the current level.
                  priorityLevel = currentPriorityLevel;
                  break;
              }

              var previousPriorityLevel = currentPriorityLevel;
              currentPriorityLevel = priorityLevel;

              try {
                return eventHandler();
              } finally {
                currentPriorityLevel = previousPriorityLevel;
              }
            }

            function unstable_wrapCallback(callback) {
              var parentPriorityLevel = currentPriorityLevel;
              return function () {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;

                try {
                  return callback.apply(this, arguments);
                } finally {
                  currentPriorityLevel = previousPriorityLevel;
                }
              };
            }

            function unstable_scheduleCallback(priorityLevel, callback, options) {
              var currentTime = exports.unstable_now();
              var startTime;

              if (typeof options === 'object' && options !== null) {
                var delay = options.delay;

                if (typeof delay === 'number' && delay > 0) {
                  startTime = currentTime + delay;
                } else {
                  startTime = currentTime;
                }
              } else {
                startTime = currentTime;
              }

              var timeout;

              switch (priorityLevel) {
                case ImmediatePriority:
                  timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                  break;

                case UserBlockingPriority:
                  timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                  break;

                case IdlePriority:
                  timeout = IDLE_PRIORITY_TIMEOUT;
                  break;

                case LowPriority:
                  timeout = LOW_PRIORITY_TIMEOUT;
                  break;

                case NormalPriority:
                default:
                  timeout = NORMAL_PRIORITY_TIMEOUT;
                  break;
              }

              var expirationTime = startTime + timeout;
              var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
              };

              if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);

                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                  // All tasks are delayed, and this is the task with the earliest delay.
                  if (isHostTimeoutScheduled) {
                    // Cancel an existing timeout.
                    cancelHostTimeout();
                  } else {
                    isHostTimeoutScheduled = true;
                  } // Schedule a timeout.


                  requestHostTimeout(handleTimeout, startTime - currentTime);
                }
              } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.


                if (!isHostCallbackScheduled && !isPerformingWork) {
                  isHostCallbackScheduled = true;
                  requestHostCallback(flushWork);
                }
              }

              return newTask;
            }

            function unstable_pauseExecution() {
            }

            function unstable_continueExecution() {

              if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
              }
            }

            function unstable_getFirstCallbackNode() {
              return peek(taskQueue);
            }

            function unstable_cancelCallback(task) {
              // remove from the queue because you can't remove arbitrary nodes from an
              // array based heap, only the first one.)


              task.callback = null;
            }

            function unstable_getCurrentPriorityLevel() {
              return currentPriorityLevel;
            }

            var unstable_requestPaint = requestPaint;
            var unstable_Profiling =  null;

            exports.unstable_IdlePriority = IdlePriority;
            exports.unstable_ImmediatePriority = ImmediatePriority;
            exports.unstable_LowPriority = LowPriority;
            exports.unstable_NormalPriority = NormalPriority;
            exports.unstable_Profiling = unstable_Profiling;
            exports.unstable_UserBlockingPriority = UserBlockingPriority;
            exports.unstable_cancelCallback = unstable_cancelCallback;
            exports.unstable_continueExecution = unstable_continueExecution;
            exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
            exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
            exports.unstable_next = unstable_next;
            exports.unstable_pauseExecution = unstable_pauseExecution;
            exports.unstable_requestPaint = unstable_requestPaint;
            exports.unstable_runWithPriority = unstable_runWithPriority;
            exports.unstable_scheduleCallback = unstable_scheduleCallback;
            exports.unstable_wrapCallback = unstable_wrapCallback;
              })();
            }
            });

            var scheduler = createCommonjsModule(function (module) {

            if (process.env.NODE_ENV === 'production') {
              module.exports = scheduler_production_min;
            } else {
              module.exports = scheduler_development;
            }
            });

            /** @license React v17.0.2
             * react-dom-test-utils.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            var reactDomTestUtils_production_min = createCommonjsModule(function (module, exports) {
            function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q=l__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
            function r(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function t(a){if(r(a)!==a)throw Error(p(188));}
            function aa(a){var b=a.alternate;if(!b){b=r(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var g=e.alternate;if(null===g){d=e.return;if(null!==d){c=d;continue}break}if(e.child===g.child){for(g=e.child;g;){if(g===c)return t(e),a;if(g===d)return t(e),b;g=g.sibling;}throw Error(p(188));}if(c.return!==d.return)c=e,d=g;else {for(var f=!1,k=e.child;k;){if(k===c){f=!0;c=e;d=g;break}if(k===d){f=!0;d=e;c=g;break}k=k.sibling;}if(!f){for(k=g.child;k;){if(k===
            c){f=!0;c=g;d=e;break}if(k===d){f=!0;d=g;c=e;break}k=k.sibling;}if(!f)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function u(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function v(){return !0}function w(){return !1}
            function x(a){function b(c,b,e,g,f){this._reactName=c;this._targetInst=e;this.type=b;this.nativeEvent=g;this.target=f;this.currentTarget=null;for(var d in a)a.hasOwnProperty(d)&&(c=a[d],this[d]=c?c(g):g[d]);this.isDefaultPrevented=(null!=g.defaultPrevented?g.defaultPrevented:!1===g.returnValue)?v:w;this.isPropagationStopped=w;return this}objectAssign(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
            (a.returnValue=!1),this.isDefaultPrevented=v);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v);},persist:function(){},isPersistent:v});return b}var y={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ba=x(y),z=objectAssign({},y,{view:0,detail:0});x(z);
            var A,B,C,E=objectAssign({},z,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:D,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==C&&(C&&"mousemove"===a.type?(A=a.screenX-C.screenX,B=a.screenY-C.screenY):B=A=0,C=a);return A},movementY:function(a){return "movementY"in a?a.movementY:B}});
            x(E);var da=objectAssign({},E,{dataTransfer:0});x(da);var ea=objectAssign({},z,{relatedTarget:0});x(ea);var fa=objectAssign({},y,{animationName:0,elapsedTime:0,pseudoElement:0});x(fa);var ha=objectAssign({},y,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}});x(ha);var ia=objectAssign({},y,{data:0});x(ia);
            var ja={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ka={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
            116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},la={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ma(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=la[a])?!!b[a]:!1}function D(){return ma}
            var na=objectAssign({},z,{key:function(a){if(a.key){var b=ja[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=u(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?ka[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:D,charCode:function(a){return "keypress"===a.type?u(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
            a.type?u(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});x(na);var oa=objectAssign({},E,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0});x(oa);var pa=objectAssign({},z,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:D});x(pa);var qa=objectAssign({},y,{propertyName:0,elapsedTime:0,pseudoElement:0});x(qa);
            var ra=objectAssign({},E,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0});x(ra);var F=null;function G(a){if(null===F)try{var b=("require"+Math.random()).slice(0,7);F=(module&&module[b]).call(module,"timers").setImmediate;}catch(c){F=function(a){var b=new MessageChannel;b.port1.onmessage=a;b.port2.postMessage(void 0);};}return F(a)}
            var H=m__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,sa=H[5],I=H[6],ta=m__default["default"].unstable_batchedUpdates,J=q.IsSomeRendererActing,K="function"===typeof scheduler.unstable_flushAllWithoutAsserting,L=scheduler.unstable_flushAllWithoutAsserting||function(){for(var a=!1;sa();)a=!0;return a};function M(a){try{L(),G(function(){L()?M(a):a();});}catch(b){a(b);}}var N=0,ua=!1,O=m__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events[6],va=m__default["default"].unstable_batchedUpdates,Q=q.IsSomeRendererActing;
            function wa(a,b){jest.runOnlyPendingTimers();G(function(){try{scheduler.unstable_flushAllWithoutAsserting()?wa(a,b):a();}catch(c){b(c);}});}function xa(a,b,c,d,e,g,f,k,ca){var P=Array.prototype.slice.call(arguments,3);try{b.apply(c,P);}catch(Ga){this.onError(Ga);}}var R=!1,S=null,T=!1,U=null,ya={onError:function(a){R=!0;S=a;}};function za(a,b,c,d,e,g,f,k,ca){R=!1;S=null;xa.apply(ya,arguments);}
            function Aa(a,b,c,d,e,g,f,k,ca){za.apply(this,arguments);if(R){if(R){var P=S;R=!1;S=null;}else throw Error(p(198));T||(T=!0,U=P);}}var V=m__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,Ba=V[0],Ca=V[1],Da=V[2],Ea=V[3],Fa=V[4];function Ha(){}
            function Ia(a,b){if(!a)return [];a=aa(a);if(!a)return [];for(var c=a,d=[];;){if(5===c.tag||6===c.tag||1===c.tag||0===c.tag){var e=c.stateNode;b(e)&&d.push(e);}if(c.child)c.child.return=c,c=c.child;else {if(c===a)return d;for(;!c.sibling;){if(!c.return||c.return===a)return d;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}}
            function W(a,b){if(a&&!a._reactInternals){var c=""+a;a=Array.isArray(a)?"an array":a&&1===a.nodeType&&a.tagName?"a DOM node":"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c;throw Error(p(286,b,a));}}function X(a){return !(!a||1!==a.nodeType||!a.tagName)}function Y(a){return X(a)?!1:null!=a&&"function"===typeof a.render&&"function"===typeof a.setState}function Ja(a,b){return Y(a)?a._reactInternals.type===b:!1}
            function Z(a,b){W(a,"findAllInRenderedTree");return a?Ia(a._reactInternals,b):[]}function Ka(a,b){W(a,"scryRenderedDOMComponentsWithClass");return Z(a,function(a){if(X(a)){var c=a.className;"string"!==typeof c&&(c=a.getAttribute("class")||"");var e=c.split(/\s+/);if(!Array.isArray(b)){if(void 0===b)throw Error(p(11));b=b.split(/\s+/);}return b.every(function(a){return -1!==e.indexOf(a)})}return !1})}
            function La(a,b){W(a,"scryRenderedDOMComponentsWithTag");return Z(a,function(a){return X(a)&&a.tagName.toUpperCase()===b.toUpperCase()})}function Ma(a,b){W(a,"scryRenderedComponentsWithType");return Z(a,function(a){return Ja(a,b)})}function Na(a,b,c){var d=a.type||"unknown-event";a.currentTarget=Ca(c);Aa(d,b,void 0,a);a.currentTarget=null;}
            function Oa(a,b,c){for(var d=[];a;){d.push(a);do a=a.return;while(a&&5!==a.tag);a=a?a:null;}for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c);}
            function Pa(a,b){var c=a.stateNode;if(!c)return null;var d=Da(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;if(c&&"function"!==typeof c)throw Error(p(231,
            b,typeof c));return c}function Qa(a,b,c){a&&c&&c._reactName&&(b=Pa(a,c._reactName))&&(null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a));}
            function Ra(a,b,c){var d=c._reactName;"captured"===b&&(d+="Capture");if(b=Pa(a,d))null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a);}var Sa={},Ta=new Set(["mouseEnter","mouseLeave","pointerEnter","pointerLeave"]);
            function Ua(a){return function(b,c){if(l__default["default"].isValidElement(b))throw Error(p(228));if(Y(b))throw Error(p(229));var d="on"+a[0].toUpperCase()+a.slice(1),e=new Ha;e.target=b;e.type=a.toLowerCase();var g=Ba(b),f=new ba(d,e.type,g,e,b);f.persist();objectAssign(f,c);Ta.has(a)?f&&f._reactName&&Qa(f._targetInst,null,f):f&&f._reactName&&Oa(f._targetInst,Ra,f);m__default["default"].unstable_batchedUpdates(function(){Ea(b);if(f){var a=f._dispatchListeners,c=f._dispatchInstances;if(Array.isArray(a))for(var d=0;d<a.length&&!f.isPropagationStopped();d++)Na(f,
            a[d],c[d]);else a&&Na(f,a,c);f._dispatchListeners=null;f._dispatchInstances=null;f.isPersistent()||f.constructor.release(f);}if(T)throw a=U,T=!1,U=null,a;});Fa();}}
            "blur cancel click close contextMenu copy cut auxClick doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play pointerCancel pointerDown pointerUp rateChange reset seeked submit touchCancel touchEnd touchStart volumeChange drag dragEnter dragExit dragLeave dragOver mouseMove mouseOut mouseOver pointerMove pointerOut pointerOver scroll toggle touchMove wheel abort animationEnd animationIteration animationStart canPlay canPlayThrough durationChange emptied encrypted ended error gotPointerCapture load loadedData loadedMetadata loadStart lostPointerCapture playing progress seeking stalled suspend timeUpdate transitionEnd waiting mouseEnter mouseLeave pointerEnter pointerLeave change select beforeInput compositionEnd compositionStart compositionUpdate".split(" ").forEach(function(a){Sa[a]=Ua(a);});
            exports.Simulate=Sa;
            exports.act=function(a){function b(){N--;J.current=c;I.current=d;}!1===ua&&(ua=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected."));N++;var c=J.current,d=I.current;J.current=!0;I.current=!0;try{var e=ta(a);}catch(g){throw b(),g;}if(null!==e&&"object"===typeof e&&"function"===typeof e.then)return {then:function(a,d){e.then(function(){1<N||!0===K&&!0===c?(b(),a()):M(function(c){b();c?d(c):a();});},function(a){b();d(a);});}};try{1!==N||!1!==K&&!1!==
            c||L(),b();}catch(g){throw b(),g;}return {then:function(a){a();}}};exports.findAllInRenderedTree=Z;exports.findRenderedComponentWithType=function(a,b){W(a,"findRenderedComponentWithType");a=Ma(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for componentType:"+b);return a[0]};
            exports.findRenderedDOMComponentWithClass=function(a,b){W(a,"findRenderedDOMComponentWithClass");a=Ka(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for class:"+b);return a[0]};exports.findRenderedDOMComponentWithTag=function(a,b){W(a,"findRenderedDOMComponentWithTag");a=La(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for tag:"+b);return a[0]};exports.isCompositeComponent=Y;exports.isCompositeComponentWithType=Ja;
            exports.isDOMComponent=X;exports.isDOMComponentElement=function(a){return !!(a&&l__default["default"].isValidElement(a)&&a.tagName)};exports.isElement=function(a){return l__default["default"].isValidElement(a)};exports.isElementOfType=function(a,b){return l__default["default"].isValidElement(a)&&a.type===b};exports.mockComponent=function(a,b){b=b||a.mockTagName||"div";a.prototype.render.mockImplementation(function(){return l__default["default"].createElement(b,null,this.props.children)});return this};exports.nativeTouchData=function(a,b){return {touches:[{pageX:a,pageY:b}]}};
            exports.renderIntoDocument=function(a){var b=document.createElement("div");return m__default["default"].render(a,b)};exports.scryRenderedComponentsWithType=Ma;exports.scryRenderedDOMComponentsWithClass=Ka;exports.scryRenderedDOMComponentsWithTag=La;exports.traverseTwoPhase=Oa;
            exports.unstable_concurrentAct=function(a){function b(){Q.current=c;O.current=d;}if(void 0===scheduler.unstable_flushAllWithoutAsserting)throw Error("This version of `act` requires a special mock build of Scheduler.");if(!0!==setTimeout._isMockFunction)throw Error("This version of `act` requires Jest's timer mocks (i.e. jest.useFakeTimers).");var c=Q.current,d=O.current;Q.current=!0;O.current=!0;try{var e=va(a);if("object"===typeof e&&null!==e&&"function"===typeof e.then)return {then:function(a,c){e.then(function(){wa(function(){b();
            a();},function(a){b();c(a);});},function(a){b();c(a);});}};try{do var g=scheduler.unstable_flushAllWithoutAsserting();while(g)}finally{b();}}catch(f){throw b(),f;}};
            });

            var reactDomTestUtils_development = createCommonjsModule(function (module, exports) {

            if (process.env.NODE_ENV !== "production") {
              (function() {

            var _assign = objectAssign;
            var React = l__default["default"];
            var ReactDOM = m__default["default"];
            var Scheduler = scheduler;

            var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

            // by calls to these methods by a Babel plugin.
            //
            // In PROD (or in packages without access to React internals),
            // they are left as they are instead.

            function warn(format) {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }

                printWarning('warn', format, args);
              }
            }
            function error(format) {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }

                printWarning('error', format, args);
              }
            }

            function printWarning(level, format, args) {
              // When changing this logic, you might want to also
              // update consoleWithStackDev.www.js as well.
              {
                var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
                var stack = ReactDebugCurrentFrame.getStackAddendum();

                if (stack !== '') {
                  format += '%s';
                  args = args.concat([stack]);
                }

                var argsWithFormat = args.map(function (item) {
                  return '' + item;
                }); // Careful: RN currently depends on this prefix

                argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
                // breaks IE9: https://github.com/facebook/react/issues/13610
                // eslint-disable-next-line react-internal/no-production-logging

                Function.prototype.apply.call(console[level], console, argsWithFormat);
              }
            }

            /**
             * `ReactInstanceMap` maintains a mapping from a public facing stateful
             * instance (key) and the internal representation (value). This allows public
             * methods to accept the user facing instance as an argument and map them back
             * to internal methods.
             *
             * Note that this module is currently shared and assumed to be stateless.
             * If this becomes an actual Map, that will break.
             */
            function get(key) {
              return key._reactInternals;
            }

            if (typeof Symbol === 'function' && Symbol.for) {
              var symbolFor = Symbol.for;
              symbolFor('react.element');
              symbolFor('react.portal');
              symbolFor('react.fragment');
              symbolFor('react.strict_mode');
              symbolFor('react.profiler');
              symbolFor('react.provider');
              symbolFor('react.context');
              symbolFor('react.forward_ref');
              symbolFor('react.suspense');
              symbolFor('react.suspense_list');
              symbolFor('react.memo');
              symbolFor('react.lazy');
              symbolFor('react.block');
              symbolFor('react.server.block');
              symbolFor('react.fundamental');
              symbolFor('react.scope');
              symbolFor('react.opaque.id');
              symbolFor('react.debug_trace_mode');
              symbolFor('react.offscreen');
              symbolFor('react.legacy_hidden');
            }

            var FunctionComponent = 0;
            var ClassComponent = 1;

            var HostRoot = 3; // Root of a host tree. Could be nested inside another node.

            var HostComponent = 5;
            var HostText = 6;

            // Don't change these two values. They're used by React Dev Tools.
            var NoFlags =
            /*                      */
            0;

            var Placement =
            /*                    */
            2;
            var Hydrating =
            /*                    */
            1024;

            ReactSharedInternals.ReactCurrentOwner;
            function getNearestMountedFiber(fiber) {
              var node = fiber;
              var nearestMounted = fiber;

              if (!fiber.alternate) {
                // If there is no alternate, this might be a new tree that isn't inserted
                // yet. If it is, then it will have a pending insertion effect on it.
                var nextNode = node;

                do {
                  node = nextNode;

                  if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
                    // This is an insertion or in-progress hydration. The nearest possible
                    // mounted fiber is the parent but we need to continue to figure out
                    // if that one is still mounted.
                    nearestMounted = node.return;
                  }

                  nextNode = node.return;
                } while (nextNode);
              } else {
                while (node.return) {
                  node = node.return;
                }
              }

              if (node.tag === HostRoot) {
                // TODO: Check if this was a nested HostRoot when used with
                // renderContainerIntoSubtree.
                return nearestMounted;
              } // If we didn't hit the root, that means that we're in an disconnected tree
              // that has been unmounted.


              return null;
            }

            function assertIsMounted(fiber) {
              if (!(getNearestMountedFiber(fiber) === fiber)) {
                {
                  throw Error( "Unable to find node on an unmounted component." );
                }
              }
            }

            function findCurrentFiberUsingSlowPath(fiber) {
              var alternate = fiber.alternate;

              if (!alternate) {
                // If there is no alternate, then we only need to check if it is mounted.
                var nearestMounted = getNearestMountedFiber(fiber);

                if (!(nearestMounted !== null)) {
                  {
                    throw Error( "Unable to find node on an unmounted component." );
                  }
                }

                if (nearestMounted !== fiber) {
                  return null;
                }

                return fiber;
              } // If we have two possible branches, we'll walk backwards up to the root
              // to see what path the root points to. On the way we may hit one of the
              // special cases and we'll deal with them.


              var a = fiber;
              var b = alternate;

              while (true) {
                var parentA = a.return;

                if (parentA === null) {
                  // We're at the root.
                  break;
                }

                var parentB = parentA.alternate;

                if (parentB === null) {
                  // There is no alternate. This is an unusual case. Currently, it only
                  // happens when a Suspense component is hidden. An extra fragment fiber
                  // is inserted in between the Suspense fiber and its children. Skip
                  // over this extra fragment fiber and proceed to the next parent.
                  var nextParent = parentA.return;

                  if (nextParent !== null) {
                    a = b = nextParent;
                    continue;
                  } // If there's no parent, we're at the root.


                  break;
                } // If both copies of the parent fiber point to the same child, we can
                // assume that the child is current. This happens when we bailout on low
                // priority: the bailed out fiber's child reuses the current child.


                if (parentA.child === parentB.child) {
                  var child = parentA.child;

                  while (child) {
                    if (child === a) {
                      // We've determined that A is the current branch.
                      assertIsMounted(parentA);
                      return fiber;
                    }

                    if (child === b) {
                      // We've determined that B is the current branch.
                      assertIsMounted(parentA);
                      return alternate;
                    }

                    child = child.sibling;
                  } // We should never have an alternate for any mounting node. So the only
                  // way this could possibly happen is if this was unmounted, if at all.


                  {
                    {
                      throw Error( "Unable to find node on an unmounted component." );
                    }
                  }
                }

                if (a.return !== b.return) {
                  // The return pointer of A and the return pointer of B point to different
                  // fibers. We assume that return pointers never criss-cross, so A must
                  // belong to the child set of A.return, and B must belong to the child
                  // set of B.return.
                  a = parentA;
                  b = parentB;
                } else {
                  // The return pointers point to the same fiber. We'll have to use the
                  // default, slow path: scan the child sets of each parent alternate to see
                  // which child belongs to which set.
                  //
                  // Search parent A's child set
                  var didFindChild = false;
                  var _child = parentA.child;

                  while (_child) {
                    if (_child === a) {
                      didFindChild = true;
                      a = parentA;
                      b = parentB;
                      break;
                    }

                    if (_child === b) {
                      didFindChild = true;
                      b = parentA;
                      a = parentB;
                      break;
                    }

                    _child = _child.sibling;
                  }

                  if (!didFindChild) {
                    // Search parent B's child set
                    _child = parentB.child;

                    while (_child) {
                      if (_child === a) {
                        didFindChild = true;
                        a = parentB;
                        b = parentA;
                        break;
                      }

                      if (_child === b) {
                        didFindChild = true;
                        b = parentB;
                        a = parentA;
                        break;
                      }

                      _child = _child.sibling;
                    }

                    if (!didFindChild) {
                      {
                        throw Error( "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue." );
                      }
                    }
                  }
                }

                if (!(a.alternate === b)) {
                  {
                    throw Error( "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue." );
                  }
                }
              } // If the root is not a host container, we're in a disconnected tree. I.e.
              // unmounted.


              if (!(a.tag === HostRoot)) {
                {
                  throw Error( "Unable to find node on an unmounted component." );
                }
              }

              if (a.stateNode.current === a) {
                // We've determined that A is the current branch.
                return fiber;
              } // Otherwise B has to be current branch.


              return alternate;
            }

            /**
             * `charCode` represents the actual "character code" and is safe to use with
             * `String.fromCharCode`. As such, only keys that correspond to printable
             * characters produce a valid `charCode`, the only exception to this is Enter.
             * The Tab-key is considered non-printable and does not have a `charCode`,
             * presumably because it does not produce a tab-character in browsers.
             *
             * @param {object} nativeEvent Native browser event.
             * @return {number} Normalized `charCode` property.
             */
            function getEventCharCode(nativeEvent) {
              var charCode;
              var keyCode = nativeEvent.keyCode;

              if ('charCode' in nativeEvent) {
                charCode = nativeEvent.charCode; // FF does not set `charCode` for the Enter-key, check against `keyCode`.

                if (charCode === 0 && keyCode === 13) {
                  charCode = 13;
                }
              } else {
                // IE8 does not implement `charCode`, but `keyCode` has the correct value.
                charCode = keyCode;
              } // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
              // report Enter as charCode 10 when ctrl is pressed.


              if (charCode === 10) {
                charCode = 13;
              } // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
              // Must not discard the (non-)printable Enter-key.


              if (charCode >= 32 || charCode === 13) {
                return charCode;
              }

              return 0;
            }

            function functionThatReturnsTrue() {
              return true;
            }

            function functionThatReturnsFalse() {
              return false;
            } // This is intentionally a factory so that we have different returned constructors.
            // If we had a single constructor, it would be megamorphic and engines would deopt.


            function createSyntheticEvent(Interface) {
              /**
               * Synthetic events are dispatched by event plugins, typically in response to a
               * top-level event delegation handler.
               *
               * These systems should generally use pooling to reduce the frequency of garbage
               * collection. The system should check `isPersistent` to determine whether the
               * event should be released into the pool after being dispatched. Users that
               * need a persisted event should invoke `persist`.
               *
               * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
               * normalizing browser quirks. Subclasses do not necessarily have to implement a
               * DOM interface; custom application-specific events can also subclass this.
               */
              function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
                this._reactName = reactName;
                this._targetInst = targetInst;
                this.type = reactEventType;
                this.nativeEvent = nativeEvent;
                this.target = nativeEventTarget;
                this.currentTarget = null;

                for (var _propName in Interface) {
                  if (!Interface.hasOwnProperty(_propName)) {
                    continue;
                  }

                  var normalize = Interface[_propName];

                  if (normalize) {
                    this[_propName] = normalize(nativeEvent);
                  } else {
                    this[_propName] = nativeEvent[_propName];
                  }
                }

                var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;

                if (defaultPrevented) {
                  this.isDefaultPrevented = functionThatReturnsTrue;
                } else {
                  this.isDefaultPrevented = functionThatReturnsFalse;
                }

                this.isPropagationStopped = functionThatReturnsFalse;
                return this;
              }

              _assign(SyntheticBaseEvent.prototype, {
                preventDefault: function () {
                  this.defaultPrevented = true;
                  var event = this.nativeEvent;

                  if (!event) {
                    return;
                  }

                  if (event.preventDefault) {
                    event.preventDefault(); // $FlowFixMe - flow is not aware of `unknown` in IE
                  } else if (typeof event.returnValue !== 'unknown') {
                    event.returnValue = false;
                  }

                  this.isDefaultPrevented = functionThatReturnsTrue;
                },
                stopPropagation: function () {
                  var event = this.nativeEvent;

                  if (!event) {
                    return;
                  }

                  if (event.stopPropagation) {
                    event.stopPropagation(); // $FlowFixMe - flow is not aware of `unknown` in IE
                  } else if (typeof event.cancelBubble !== 'unknown') {
                    // The ChangeEventPlugin registers a "propertychange" event for
                    // IE. This event does not support bubbling or cancelling, and
                    // any references to cancelBubble throw "Member not found".  A
                    // typeof check of "unknown" circumvents this issue (and is also
                    // IE specific).
                    event.cancelBubble = true;
                  }

                  this.isPropagationStopped = functionThatReturnsTrue;
                },

                /**
                 * We release all dispatched `SyntheticEvent`s after each event loop, adding
                 * them back into the pool. This allows a way to hold onto a reference that
                 * won't be added back into the pool.
                 */
                persist: function () {// Modern event system doesn't use pooling.
                },

                /**
                 * Checks if this event should be released back into the pool.
                 *
                 * @return {boolean} True if this should not be released, false otherwise.
                 */
                isPersistent: functionThatReturnsTrue
              });

              return SyntheticBaseEvent;
            }
            /**
             * @interface Event
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */


            var EventInterface = {
              eventPhase: 0,
              bubbles: 0,
              cancelable: 0,
              timeStamp: function (event) {
                return event.timeStamp || Date.now();
              },
              defaultPrevented: 0,
              isTrusted: 0
            };
            var SyntheticEvent = createSyntheticEvent(EventInterface);

            var UIEventInterface = _assign({}, EventInterface, {
              view: 0,
              detail: 0
            });

            createSyntheticEvent(UIEventInterface);
            var lastMovementX;
            var lastMovementY;
            var lastMouseEvent;

            function updateMouseMovementPolyfillState(event) {
              if (event !== lastMouseEvent) {
                if (lastMouseEvent && event.type === 'mousemove') {
                  lastMovementX = event.screenX - lastMouseEvent.screenX;
                  lastMovementY = event.screenY - lastMouseEvent.screenY;
                } else {
                  lastMovementX = 0;
                  lastMovementY = 0;
                }

                lastMouseEvent = event;
              }
            }
            /**
             * @interface MouseEvent
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */


            var MouseEventInterface = _assign({}, UIEventInterface, {
              screenX: 0,
              screenY: 0,
              clientX: 0,
              clientY: 0,
              pageX: 0,
              pageY: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              getModifierState: getEventModifierState,
              button: 0,
              buttons: 0,
              relatedTarget: function (event) {
                if (event.relatedTarget === undefined) return event.fromElement === event.srcElement ? event.toElement : event.fromElement;
                return event.relatedTarget;
              },
              movementX: function (event) {
                if ('movementX' in event) {
                  return event.movementX;
                }

                updateMouseMovementPolyfillState(event);
                return lastMovementX;
              },
              movementY: function (event) {
                if ('movementY' in event) {
                  return event.movementY;
                } // Don't need to call updateMouseMovementPolyfillState() here
                // because it's guaranteed to have already run when movementX
                // was copied.


                return lastMovementY;
              }
            });

            createSyntheticEvent(MouseEventInterface);
            /**
             * @interface DragEvent
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */

            var DragEventInterface = _assign({}, MouseEventInterface, {
              dataTransfer: 0
            });

            createSyntheticEvent(DragEventInterface);
            /**
             * @interface FocusEvent
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */

            var FocusEventInterface = _assign({}, UIEventInterface, {
              relatedTarget: 0
            });

            createSyntheticEvent(FocusEventInterface);
            /**
             * @interface Event
             * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
             * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
             */

            var AnimationEventInterface = _assign({}, EventInterface, {
              animationName: 0,
              elapsedTime: 0,
              pseudoElement: 0
            });

            createSyntheticEvent(AnimationEventInterface);
            /**
             * @interface Event
             * @see http://www.w3.org/TR/clipboard-apis/
             */

            var ClipboardEventInterface = _assign({}, EventInterface, {
              clipboardData: function (event) {
                return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
              }
            });

            createSyntheticEvent(ClipboardEventInterface);
            /**
             * @interface Event
             * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
             */

            var CompositionEventInterface = _assign({}, EventInterface, {
              data: 0
            });

            createSyntheticEvent(CompositionEventInterface);
            /**
             * Normalization of deprecated HTML5 `key` values
             * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
             */

            var normalizeKey = {
              Esc: 'Escape',
              Spacebar: ' ',
              Left: 'ArrowLeft',
              Up: 'ArrowUp',
              Right: 'ArrowRight',
              Down: 'ArrowDown',
              Del: 'Delete',
              Win: 'OS',
              Menu: 'ContextMenu',
              Apps: 'ContextMenu',
              Scroll: 'ScrollLock',
              MozPrintableKey: 'Unidentified'
            };
            /**
             * Translation from legacy `keyCode` to HTML5 `key`
             * Only special keys supported, all others depend on keyboard layout or browser
             * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
             */

            var translateToKey = {
              '8': 'Backspace',
              '9': 'Tab',
              '12': 'Clear',
              '13': 'Enter',
              '16': 'Shift',
              '17': 'Control',
              '18': 'Alt',
              '19': 'Pause',
              '20': 'CapsLock',
              '27': 'Escape',
              '32': ' ',
              '33': 'PageUp',
              '34': 'PageDown',
              '35': 'End',
              '36': 'Home',
              '37': 'ArrowLeft',
              '38': 'ArrowUp',
              '39': 'ArrowRight',
              '40': 'ArrowDown',
              '45': 'Insert',
              '46': 'Delete',
              '112': 'F1',
              '113': 'F2',
              '114': 'F3',
              '115': 'F4',
              '116': 'F5',
              '117': 'F6',
              '118': 'F7',
              '119': 'F8',
              '120': 'F9',
              '121': 'F10',
              '122': 'F11',
              '123': 'F12',
              '144': 'NumLock',
              '145': 'ScrollLock',
              '224': 'Meta'
            };
            /**
             * @param {object} nativeEvent Native browser event.
             * @return {string} Normalized `key` property.
             */

            function getEventKey(nativeEvent) {
              if (nativeEvent.key) {
                // Normalize inconsistent values reported by browsers due to
                // implementations of a working draft specification.
                // FireFox implements `key` but returns `MozPrintableKey` for all
                // printable characters (normalized to `Unidentified`), ignore it.
                var key = normalizeKey[nativeEvent.key] || nativeEvent.key;

                if (key !== 'Unidentified') {
                  return key;
                }
              } // Browser does not implement `key`, polyfill as much of it as we can.


              if (nativeEvent.type === 'keypress') {
                var charCode = getEventCharCode(nativeEvent); // The enter-key is technically both printable and non-printable and can
                // thus be captured by `keypress`, no other non-printable key should.

                return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
              }

              if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
                // While user keyboard layout determines the actual meaning of each
                // `keyCode` value, almost all function keys have a universal value.
                return translateToKey[nativeEvent.keyCode] || 'Unidentified';
              }

              return '';
            }
            /**
             * Translation from modifier key to the associated property in the event.
             * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
             */


            var modifierKeyToProp = {
              Alt: 'altKey',
              Control: 'ctrlKey',
              Meta: 'metaKey',
              Shift: 'shiftKey'
            }; // Older browsers (Safari <= 10, iOS Safari <= 10.2) do not support
            // getModifierState. If getModifierState is not supported, we map it to a set of
            // modifier keys exposed by the event. In this case, Lock-keys are not supported.

            function modifierStateGetter(keyArg) {
              var syntheticEvent = this;
              var nativeEvent = syntheticEvent.nativeEvent;

              if (nativeEvent.getModifierState) {
                return nativeEvent.getModifierState(keyArg);
              }

              var keyProp = modifierKeyToProp[keyArg];
              return keyProp ? !!nativeEvent[keyProp] : false;
            }

            function getEventModifierState(nativeEvent) {
              return modifierStateGetter;
            }
            /**
             * @interface KeyboardEvent
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */


            var KeyboardEventInterface = _assign({}, UIEventInterface, {
              key: getEventKey,
              code: 0,
              location: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              repeat: 0,
              locale: 0,
              getModifierState: getEventModifierState,
              // Legacy Interface
              charCode: function (event) {
                // `charCode` is the result of a KeyPress event and represents the value of
                // the actual printable character.
                // KeyPress is deprecated, but its replacement is not yet final and not
                // implemented in any major browser. Only KeyPress has charCode.
                if (event.type === 'keypress') {
                  return getEventCharCode(event);
                }

                return 0;
              },
              keyCode: function (event) {
                // `keyCode` is the result of a KeyDown/Up event and represents the value of
                // physical keyboard key.
                // The actual meaning of the value depends on the users' keyboard layout
                // which cannot be detected. Assuming that it is a US keyboard layout
                // provides a surprisingly accurate mapping for US and European users.
                // Due to this, it is left to the user to implement at this time.
                if (event.type === 'keydown' || event.type === 'keyup') {
                  return event.keyCode;
                }

                return 0;
              },
              which: function (event) {
                // `which` is an alias for either `keyCode` or `charCode` depending on the
                // type of the event.
                if (event.type === 'keypress') {
                  return getEventCharCode(event);
                }

                if (event.type === 'keydown' || event.type === 'keyup') {
                  return event.keyCode;
                }

                return 0;
              }
            });

            createSyntheticEvent(KeyboardEventInterface);
            /**
             * @interface PointerEvent
             * @see http://www.w3.org/TR/pointerevents/
             */

            var PointerEventInterface = _assign({}, MouseEventInterface, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0
            });

            createSyntheticEvent(PointerEventInterface);
            /**
             * @interface TouchEvent
             * @see http://www.w3.org/TR/touch-events/
             */

            var TouchEventInterface = _assign({}, UIEventInterface, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: getEventModifierState
            });

            createSyntheticEvent(TouchEventInterface);
            /**
             * @interface Event
             * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
             * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
             */

            var TransitionEventInterface = _assign({}, EventInterface, {
              propertyName: 0,
              elapsedTime: 0,
              pseudoElement: 0
            });

            createSyntheticEvent(TransitionEventInterface);
            /**
             * @interface WheelEvent
             * @see http://www.w3.org/TR/DOM-Level-3-Events/
             */

            var WheelEventInterface = _assign({}, MouseEventInterface, {
              deltaX: function (event) {
                return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
                'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
              },
              deltaY: function (event) {
                return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
                'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
                'wheelDelta' in event ? -event.wheelDelta : 0;
              },
              deltaZ: 0,
              // Browsers without "deltaMode" is reporting in raw wheel delta where one
              // notch on the scroll is always +/- 120, roughly equivalent to pixels.
              // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
              // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
              deltaMode: 0
            });

            createSyntheticEvent(WheelEventInterface);

            /**
             * HTML nodeType values that represent the type of the node
             */
            var ELEMENT_NODE = 1;

            var didWarnAboutMessageChannel = false;
            var enqueueTaskImpl = null;
            function enqueueTask(task) {
              if (enqueueTaskImpl === null) {
                try {
                  // read require off the module object to get around the bundlers.
                  // we don't want them to detect a require and bundle a Node polyfill.
                  var requireString = ('require' + Math.random()).slice(0, 7);
                  var nodeRequire = module && module[requireString]; // assuming we're in node, let's try to get node's
                  // version of setImmediate, bypassing fake timers if any.

                  enqueueTaskImpl = nodeRequire.call(module, 'timers').setImmediate;
                } catch (_err) {
                  // we're in a browser
                  // we can't use regular timers because they may still be faked
                  // so we try MessageChannel+postMessage instead
                  enqueueTaskImpl = function (callback) {
                    {
                      if (didWarnAboutMessageChannel === false) {
                        didWarnAboutMessageChannel = true;

                        if (typeof MessageChannel === 'undefined') {
                          error('This browser does not have a MessageChannel implementation, ' + 'so enqueuing tasks via await act(async () => ...) will fail. ' + 'Please file an issue at https://github.com/facebook/react/issues ' + 'if you encounter this warning.');
                        }
                      }
                    }

                    var channel = new MessageChannel();
                    channel.port1.onmessage = callback;
                    channel.port2.postMessage(undefined);
                  };
                }
              }

              return enqueueTaskImpl(task);
            }

            var EventInternals = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events; // const getInstanceFromNode = EventInternals[0];
            // const getNodeFromInstance = EventInternals[1];
            // const getFiberCurrentPropsFromNode = EventInternals[2];
            // const enqueueStateRestore = EventInternals[3];
            // const restoreStateIfNeeded = EventInternals[4];

            var flushPassiveEffects = EventInternals[5];
            var IsThisRendererActing = EventInternals[6];
            var batchedUpdates = ReactDOM.unstable_batchedUpdates;
            var IsSomeRendererActing = ReactSharedInternals.IsSomeRendererActing; // This is the public version of `ReactTestUtils.act`. It is implemented in
            // "userspace" (i.e. not the reconciler), so that it doesn't add to the
            // production bundle size.
            // TODO: Remove this implementation of `act` in favor of the one exported by
            // the reconciler. To do this, we must first drop support for `act` in
            // production mode.
            // TODO: Remove support for the mock scheduler build, which was only added for
            // the purposes of internal testing. Internal tests should use
            // `unstable_concurrentAct` instead.

            var isSchedulerMocked = typeof Scheduler.unstable_flushAllWithoutAsserting === 'function';

            var flushWork = Scheduler.unstable_flushAllWithoutAsserting || function () {
              var didFlushWork = false;

              while (flushPassiveEffects()) {
                didFlushWork = true;
              }

              return didFlushWork;
            };

            function flushWorkAndMicroTasks(onDone) {
              try {
                flushWork();
                enqueueTask(function () {
                  if (flushWork()) {
                    flushWorkAndMicroTasks(onDone);
                  } else {
                    onDone();
                  }
                });
              } catch (err) {
                onDone(err);
              }
            } // we track the 'depth' of the act() calls with this counter,
            // so we can tell if any async act() calls try to run in parallel.


            var actingUpdatesScopeDepth = 0;
            function act(callback) {

              var previousActingUpdatesScopeDepth = actingUpdatesScopeDepth;
              actingUpdatesScopeDepth++;
              var previousIsSomeRendererActing = IsSomeRendererActing.current;
              var previousIsThisRendererActing = IsThisRendererActing.current;
              IsSomeRendererActing.current = true;
              IsThisRendererActing.current = true;

              function onDone() {
                actingUpdatesScopeDepth--;
                IsSomeRendererActing.current = previousIsSomeRendererActing;
                IsThisRendererActing.current = previousIsThisRendererActing;

                {
                  if (actingUpdatesScopeDepth > previousActingUpdatesScopeDepth) {
                    // if it's _less than_ previousActingUpdatesScopeDepth, then we can assume the 'other' one has warned
                    error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
                  }
                }
              }

              var result;

              try {
                result = batchedUpdates(callback);
              } catch (error) {
                // on sync errors, we still want to 'cleanup' and decrement actingUpdatesScopeDepth
                onDone();
                throw error;
              }

              if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
                // setup a boolean that gets set to true only
                // once this act() call is await-ed
                var called = false;

                {
                  if (typeof Promise !== 'undefined') {
                    //eslint-disable-next-line no-undef
                    Promise.resolve().then(function () {}).then(function () {
                      if (called === false) {
                        error('You called act(async () => ...) without await. ' + 'This could lead to unexpected testing behaviour, interleaving multiple act ' + 'calls and mixing their scopes. You should - await act(async () => ...);');
                      }
                    });
                  }
                } // in the async case, the returned thenable runs the callback, flushes
                // effects and  microtasks in a loop until flushPassiveEffects() === false,
                // and cleans up


                return {
                  then: function (resolve, reject) {
                    called = true;
                    result.then(function () {
                      if (actingUpdatesScopeDepth > 1 || isSchedulerMocked === true && previousIsSomeRendererActing === true) {
                        onDone();
                        resolve();
                        return;
                      } // we're about to exit the act() scope,
                      // now's the time to flush tasks/effects


                      flushWorkAndMicroTasks(function (err) {
                        onDone();

                        if (err) {
                          reject(err);
                        } else {
                          resolve();
                        }
                      });
                    }, function (err) {
                      onDone();
                      reject(err);
                    });
                  }
                };
              } else {
                {
                  if (result !== undefined) {
                    error('The callback passed to act(...) function ' + 'must return undefined, or a Promise. You returned %s', result);
                  }
                } // flush effects until none remain, and cleanup


                try {
                  if (actingUpdatesScopeDepth === 1 && (isSchedulerMocked === false || previousIsSomeRendererActing === false)) {
                    // we're about to exit the act() scope,
                    // now's the time to flush effects
                    flushWork();
                  }

                  onDone();
                } catch (err) {
                  onDone();
                  throw err;
                } // in the sync case, the returned thenable only warns *if* await-ed


                return {
                  then: function (resolve) {
                    {
                      error('Do not await the result of calling act(...) with sync logic, it is not a Promise.');
                    }

                    resolve();
                  }
                };
              }
            }

            var EventInternals$1 = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events; // const getInstanceFromNode = EventInternals[0];
            // const getNodeFromInstance = EventInternals[1];
            // const getFiberCurrentPropsFromNode = EventInternals[2];
            // const enqueueStateRestore = EventInternals[3];
            // const restoreStateIfNeeded = EventInternals[4];
            // const flushPassiveEffects = EventInternals[5];

            var IsThisRendererActing$1 = EventInternals$1[6];
            var batchedUpdates$1 = ReactDOM.unstable_batchedUpdates;
            var IsSomeRendererActing$1 = ReactSharedInternals.IsSomeRendererActing; // This version of `act` is only used by our tests. Unlike the public version
            // of `act`, it's designed to work identically in both production and
            // development. It may have slightly different behavior from the public
            // version, too, since our constraints in our test suite are not the same as
            // those of developers using React — we're testing React itself, as opposed to
            // building an app with React.

            var actingUpdatesScopeDepth$1 = 0;
            function unstable_concurrentAct(scope) {
              if (Scheduler.unstable_flushAllWithoutAsserting === undefined) {
                throw Error('This version of `act` requires a special mock build of Scheduler.');
              }

              if (setTimeout._isMockFunction !== true) {
                throw Error("This version of `act` requires Jest's timer mocks " + '(i.e. jest.useFakeTimers).');
              }

              var previousActingUpdatesScopeDepth = actingUpdatesScopeDepth$1;
              var previousIsSomeRendererActing = IsSomeRendererActing$1.current;
              var previousIsThisRendererActing = IsThisRendererActing$1.current;
              IsSomeRendererActing$1.current = true;
              IsThisRendererActing$1.current = true;
              actingUpdatesScopeDepth$1++;

              var unwind = function () {
                actingUpdatesScopeDepth$1--;
                IsSomeRendererActing$1.current = previousIsSomeRendererActing;
                IsThisRendererActing$1.current = previousIsThisRendererActing;

                {
                  if (actingUpdatesScopeDepth$1 > previousActingUpdatesScopeDepth) {
                    // if it's _less than_ previousActingUpdatesScopeDepth, then we can
                    // assume the 'other' one has warned
                    error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
                  }
                }
              }; // TODO: This would be way simpler if 1) we required a promise to be
              // returned and 2) we could use async/await. Since it's only our used in
              // our test suite, we should be able to.


              try {
                var thenable = batchedUpdates$1(scope);

                if (typeof thenable === 'object' && thenable !== null && typeof thenable.then === 'function') {
                  return {
                    then: function (resolve, reject) {
                      thenable.then(function () {
                        flushActWork(function () {
                          unwind();
                          resolve();
                        }, function (error) {
                          unwind();
                          reject(error);
                        });
                      }, function (error) {
                        unwind();
                        reject(error);
                      });
                    }
                  };
                } else {
                  try {
                    // TODO: Let's not support non-async scopes at all in our tests. Need to
                    // migrate existing tests.
                    var didFlushWork;

                    do {
                      didFlushWork = Scheduler.unstable_flushAllWithoutAsserting();
                    } while (didFlushWork);
                  } finally {
                    unwind();
                  }
                }
              } catch (error) {
                unwind();
                throw error;
              }
            }

            function flushActWork(resolve, reject) {
              // Flush suspended fallbacks
              // $FlowFixMe: Flow doesn't know about global Jest object
              jest.runOnlyPendingTimers();
              enqueueTask(function () {
                try {
                  var didFlushWork = Scheduler.unstable_flushAllWithoutAsserting();

                  if (didFlushWork) {
                    flushActWork(resolve, reject);
                  } else {
                    resolve();
                  }
                } catch (error) {
                  reject(error);
                }
              });
            }

            function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
              var funcArgs = Array.prototype.slice.call(arguments, 3);

              try {
                func.apply(context, funcArgs);
              } catch (error) {
                this.onError(error);
              }
            }

            var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;

            {
              // In DEV mode, we swap out invokeGuardedCallback for a special version
              // that plays more nicely with the browser's DevTools. The idea is to preserve
              // "Pause on exceptions" behavior. Because React wraps all user-provided
              // functions in invokeGuardedCallback, and the production version of
              // invokeGuardedCallback uses a try-catch, all user exceptions are treated
              // like caught exceptions, and the DevTools won't pause unless the developer
              // takes the extra step of enabling pause on caught exceptions. This is
              // unintuitive, though, because even though React has caught the error, from
              // the developer's perspective, the error is uncaught.
              //
              // To preserve the expected "Pause on exceptions" behavior, we don't use a
              // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
              // DOM node, and call the user-provided callback from inside an event handler
              // for that fake event. If the callback throws, the error is "captured" using
              // a global event handler. But because the error happens in a different
              // event loop context, it does not interrupt the normal program flow.
              // Effectively, this gives us try-catch behavior without actually using
              // try-catch. Neat!
              // Check that the browser supports the APIs we need to implement our special
              // DEV version of invokeGuardedCallback
              if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
                var fakeNode = document.createElement('react');

                invokeGuardedCallbackImpl = function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
                  // If document doesn't exist we know for sure we will crash in this method
                  // when we call document.createEvent(). However this can cause confusing
                  // errors: https://github.com/facebookincubator/create-react-app/issues/3482
                  // So we preemptively throw with a better message instead.
                  if (!(typeof document !== 'undefined')) {
                    {
                      throw Error( "The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous." );
                    }
                  }

                  var evt = document.createEvent('Event');
                  var didCall = false; // Keeps track of whether the user-provided callback threw an error. We
                  // set this to true at the beginning, then set it to false right after
                  // calling the function. If the function errors, `didError` will never be
                  // set to false. This strategy works even if the browser is flaky and
                  // fails to call our global error handler, because it doesn't rely on
                  // the error event at all.

                  var didError = true; // Keeps track of the value of window.event so that we can reset it
                  // during the callback to let user code access window.event in the
                  // browsers that support it.

                  var windowEvent = window.event; // Keeps track of the descriptor of window.event to restore it after event
                  // dispatching: https://github.com/facebook/react/issues/13688

                  var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, 'event');

                  function restoreAfterDispatch() {
                    // We immediately remove the callback from event listeners so that
                    // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
                    // nested call would trigger the fake event handlers of any call higher
                    // in the stack.
                    fakeNode.removeEventListener(evtType, callCallback, false); // We check for window.hasOwnProperty('event') to prevent the
                    // window.event assignment in both IE <= 10 as they throw an error
                    // "Member not found" in strict mode, and in Firefox which does not
                    // support window.event.

                    if (typeof window.event !== 'undefined' && window.hasOwnProperty('event')) {
                      window.event = windowEvent;
                    }
                  } // Create an event handler for our fake event. We will synchronously
                  // dispatch our fake event using `dispatchEvent`. Inside the handler, we
                  // call the user-provided callback.


                  var funcArgs = Array.prototype.slice.call(arguments, 3);

                  function callCallback() {
                    didCall = true;
                    restoreAfterDispatch();
                    func.apply(context, funcArgs);
                    didError = false;
                  } // Create a global error event handler. We use this to capture the value
                  // that was thrown. It's possible that this error handler will fire more
                  // than once; for example, if non-React code also calls `dispatchEvent`
                  // and a handler for that event throws. We should be resilient to most of
                  // those cases. Even if our error event handler fires more than once, the
                  // last error event is always used. If the callback actually does error,
                  // we know that the last error event is the correct one, because it's not
                  // possible for anything else to have happened in between our callback
                  // erroring and the code that follows the `dispatchEvent` call below. If
                  // the callback doesn't error, but the error event was fired, we know to
                  // ignore it because `didError` will be false, as described above.


                  var error; // Use this to track whether the error event is ever called.

                  var didSetError = false;
                  var isCrossOriginError = false;

                  function handleWindowError(event) {
                    error = event.error;
                    didSetError = true;

                    if (error === null && event.colno === 0 && event.lineno === 0) {
                      isCrossOriginError = true;
                    }

                    if (event.defaultPrevented) {
                      // Some other error handler has prevented default.
                      // Browsers silence the error report if this happens.
                      // We'll remember this to later decide whether to log it or not.
                      if (error != null && typeof error === 'object') {
                        try {
                          error._suppressLogging = true;
                        } catch (inner) {// Ignore.
                        }
                      }
                    }
                  } // Create a fake event type.


                  var evtType = "react-" + (name ? name : 'invokeguardedcallback'); // Attach our event handlers

                  window.addEventListener('error', handleWindowError);
                  fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function
                  // errors, it will trigger our global error handler.

                  evt.initEvent(evtType, false, false);
                  fakeNode.dispatchEvent(evt);

                  if (windowEventDescriptor) {
                    Object.defineProperty(window, 'event', windowEventDescriptor);
                  }

                  if (didCall && didError) {
                    if (!didSetError) {
                      // The callback errored, but the error event never fired.
                      error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
                    } else if (isCrossOriginError) {
                      error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://reactjs.org/link/crossorigin-error for more information.');
                    }

                    this.onError(error);
                  } // Remove our event listeners


                  window.removeEventListener('error', handleWindowError);

                  if (!didCall) {
                    // Something went really wrong, and our event was not dispatched.
                    // https://github.com/facebook/react/issues/16734
                    // https://github.com/facebook/react/issues/16585
                    // Fall back to the production implementation.
                    restoreAfterDispatch();
                    return invokeGuardedCallbackProd.apply(this, arguments);
                  }
                };
              }
            }

            var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;

            var hasError = false;
            var caughtError = null; // Used by event system to capture/rethrow the first error.

            var hasRethrowError = false;
            var rethrowError = null;
            var reporter = {
              onError: function (error) {
                hasError = true;
                caughtError = error;
              }
            };
            /**
             * Call a function while guarding against errors that happens within it.
             * Returns an error if it throws, otherwise null.
             *
             * In production, this is implemented using a try-catch. The reason we don't
             * use a try-catch directly is so that we can swap out a different
             * implementation in DEV mode.
             *
             * @param {String} name of the guard to use for logging or debugging
             * @param {Function} func The function to invoke
             * @param {*} context The context to use when calling the function
             * @param {...*} args Arguments for function
             */

            function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
              hasError = false;
              caughtError = null;
              invokeGuardedCallbackImpl$1.apply(reporter, arguments);
            }
            /**
             * Same as invokeGuardedCallback, but instead of returning an error, it stores
             * it in a global so it can be rethrown by `rethrowCaughtError` later.
             * TODO: See if caughtError and rethrowError can be unified.
             *
             * @param {String} name of the guard to use for logging or debugging
             * @param {Function} func The function to invoke
             * @param {*} context The context to use when calling the function
             * @param {...*} args Arguments for function
             */

            function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
              invokeGuardedCallback.apply(this, arguments);

              if (hasError) {
                var error = clearCaughtError();

                if (!hasRethrowError) {
                  hasRethrowError = true;
                  rethrowError = error;
                }
              }
            }
            /**
             * During execution of guarded functions we will capture the first error which
             * we will rethrow to be handled by the top level error handler.
             */

            function rethrowCaughtError() {
              if (hasRethrowError) {
                var error = rethrowError;
                hasRethrowError = false;
                rethrowError = null;
                throw error;
              }
            }
            function clearCaughtError() {
              if (hasError) {
                var error = caughtError;
                hasError = false;
                caughtError = null;
                return error;
              } else {
                {
                  {
                    throw Error( "clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue." );
                  }
                }
              }
            }

            var EventInternals$2 = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events;
            var getInstanceFromNode = EventInternals$2[0];
            var getNodeFromInstance = EventInternals$2[1];
            var getFiberCurrentPropsFromNode = EventInternals$2[2];
            var enqueueStateRestore = EventInternals$2[3];
            var restoreStateIfNeeded = EventInternals$2[4]; // const flushPassiveEffects = EventInternals[5];
            // TODO: This is related to `act`, not events. Move to separate key?
            // const IsThisRendererActing = EventInternals[6];

            function Event(suffix) {}

            var hasWarnedAboutDeprecatedMockComponent = false;
            /**
             * @class ReactTestUtils
             */

            function findAllInRenderedFiberTreeInternal(fiber, test) {
              if (!fiber) {
                return [];
              }

              var currentParent = findCurrentFiberUsingSlowPath(fiber);

              if (!currentParent) {
                return [];
              }

              var node = currentParent;
              var ret = [];

              while (true) {
                if (node.tag === HostComponent || node.tag === HostText || node.tag === ClassComponent || node.tag === FunctionComponent) {
                  var publicInst = node.stateNode;

                  if (test(publicInst)) {
                    ret.push(publicInst);
                  }
                }

                if (node.child) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }

                if (node === currentParent) {
                  return ret;
                }

                while (!node.sibling) {
                  if (!node.return || node.return === currentParent) {
                    return ret;
                  }

                  node = node.return;
                }

                node.sibling.return = node.return;
                node = node.sibling;
              }
            }

            function validateClassInstance(inst, methodName) {
              if (!inst) {
                // This is probably too relaxed but it's existing behavior.
                return;
              }

              if (get(inst)) {
                // This is a public instance indeed.
                return;
              }

              var received;
              var stringified = '' + inst;

              if (Array.isArray(inst)) {
                received = 'an array';
              } else if (inst && inst.nodeType === ELEMENT_NODE && inst.tagName) {
                received = 'a DOM node';
              } else if (stringified === '[object Object]') {
                received = 'object with keys {' + Object.keys(inst).join(', ') + '}';
              } else {
                received = stringified;
              }

              {
                {
                  throw Error( methodName + "(...): the first argument must be a React class instance. Instead received: " + received + "." );
                }
              }
            }
            /**
             * Utilities for making it easy to test React components.
             *
             * See https://reactjs.org/docs/test-utils.html
             *
             * Todo: Support the entire DOM.scry query syntax. For now, these simple
             * utilities will suffice for testing purposes.
             * @lends ReactTestUtils
             */


            function renderIntoDocument(element) {
              var div = document.createElement('div'); // None of our tests actually require attaching the container to the
              // DOM, and doing so creates a mess that we rely on test isolation to
              // clean up, so we're going to stop honoring the name of this method
              // (and probably rename it eventually) if no problems arise.
              // document.documentElement.appendChild(div);

              return ReactDOM.render(element, div);
            }

            function isElement(element) {
              return React.isValidElement(element);
            }

            function isElementOfType(inst, convenienceConstructor) {
              return React.isValidElement(inst) && inst.type === convenienceConstructor;
            }

            function isDOMComponent(inst) {
              return !!(inst && inst.nodeType === ELEMENT_NODE && inst.tagName);
            }

            function isDOMComponentElement(inst) {
              return !!(inst && React.isValidElement(inst) && !!inst.tagName);
            }

            function isCompositeComponent(inst) {
              if (isDOMComponent(inst)) {
                // Accessing inst.setState warns; just return false as that'll be what
                // this returns when we have DOM nodes as refs directly
                return false;
              }

              return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
            }

            function isCompositeComponentWithType(inst, type) {
              if (!isCompositeComponent(inst)) {
                return false;
              }

              var internalInstance = get(inst);
              var constructor = internalInstance.type;
              return constructor === type;
            }

            function findAllInRenderedTree(inst, test) {
              validateClassInstance(inst, 'findAllInRenderedTree');

              if (!inst) {
                return [];
              }

              var internalInstance = get(inst);
              return findAllInRenderedFiberTreeInternal(internalInstance, test);
            }
            /**
             * Finds all instance of components in the rendered tree that are DOM
             * components with the class name matching `className`.
             * @return {array} an array of all the matches.
             */


            function scryRenderedDOMComponentsWithClass(root, classNames) {
              validateClassInstance(root, 'scryRenderedDOMComponentsWithClass');
              return findAllInRenderedTree(root, function (inst) {
                if (isDOMComponent(inst)) {
                  var className = inst.className;

                  if (typeof className !== 'string') {
                    // SVG, probably.
                    className = inst.getAttribute('class') || '';
                  }

                  var classList = className.split(/\s+/);

                  if (!Array.isArray(classNames)) {
                    if (!(classNames !== undefined)) {
                      {
                        throw Error( "TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument." );
                      }
                    }

                    classNames = classNames.split(/\s+/);
                  }

                  return classNames.every(function (name) {
                    return classList.indexOf(name) !== -1;
                  });
                }

                return false;
              });
            }
            /**
             * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
             * and returns that one result, or throws exception if there is any other
             * number of matches besides one.
             * @return {!ReactDOMComponent} The one match.
             */


            function findRenderedDOMComponentWithClass(root, className) {
              validateClassInstance(root, 'findRenderedDOMComponentWithClass');
              var all = scryRenderedDOMComponentsWithClass(root, className);

              if (all.length !== 1) {
                throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
              }

              return all[0];
            }
            /**
             * Finds all instance of components in the rendered tree that are DOM
             * components with the tag name matching `tagName`.
             * @return {array} an array of all the matches.
             */


            function scryRenderedDOMComponentsWithTag(root, tagName) {
              validateClassInstance(root, 'scryRenderedDOMComponentsWithTag');
              return findAllInRenderedTree(root, function (inst) {
                return isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
              });
            }
            /**
             * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
             * and returns that one result, or throws exception if there is any other
             * number of matches besides one.
             * @return {!ReactDOMComponent} The one match.
             */


            function findRenderedDOMComponentWithTag(root, tagName) {
              validateClassInstance(root, 'findRenderedDOMComponentWithTag');
              var all = scryRenderedDOMComponentsWithTag(root, tagName);

              if (all.length !== 1) {
                throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
              }

              return all[0];
            }
            /**
             * Finds all instances of components with type equal to `componentType`.
             * @return {array} an array of all the matches.
             */


            function scryRenderedComponentsWithType(root, componentType) {
              validateClassInstance(root, 'scryRenderedComponentsWithType');
              return findAllInRenderedTree(root, function (inst) {
                return isCompositeComponentWithType(inst, componentType);
              });
            }
            /**
             * Same as `scryRenderedComponentsWithType` but expects there to be one result
             * and returns that one result, or throws exception if there is any other
             * number of matches besides one.
             * @return {!ReactComponent} The one match.
             */


            function findRenderedComponentWithType(root, componentType) {
              validateClassInstance(root, 'findRenderedComponentWithType');
              var all = scryRenderedComponentsWithType(root, componentType);

              if (all.length !== 1) {
                throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
              }

              return all[0];
            }
            /**
             * Pass a mocked component module to this method to augment it with
             * useful methods that allow it to be used as a dummy React component.
             * Instead of rendering as usual, the component will become a simple
             * <div> containing any provided children.
             *
             * @param {object} module the mock function object exported from a
             *                        module that defines the component to be mocked
             * @param {?string} mockTagName optional dummy root tag name to return
             *                              from render method (overrides
             *                              module.mockTagName if provided)
             * @return {object} the ReactTestUtils object (for chaining)
             */


            function mockComponent(module, mockTagName) {
              {
                if (!hasWarnedAboutDeprecatedMockComponent) {
                  hasWarnedAboutDeprecatedMockComponent = true;

                  warn('ReactTestUtils.mockComponent() is deprecated. ' + 'Use shallow rendering or jest.mock() instead.\n\n' + 'See https://reactjs.org/link/test-utils-mock-component for more information.');
                }
              }

              mockTagName = mockTagName || module.mockTagName || 'div';
              module.prototype.render.mockImplementation(function () {
                return React.createElement(mockTagName, null, this.props.children);
              });
              return this;
            }

            function nativeTouchData(x, y) {
              return {
                touches: [{
                  pageX: x,
                  pageY: y
                }]
              };
            } // Start of inline: the below functions were inlined from
            // EventPropagator.js, as they deviated from ReactDOM's newer
            // implementations.

            /**
             * Dispatch the event to the listener.
             * @param {SyntheticEvent} event SyntheticEvent to handle
             * @param {function} listener Application-level callback
             * @param {*} inst Internal component instance
             */


            function executeDispatch(event, listener, inst) {
              var type = event.type || 'unknown-event';
              event.currentTarget = getNodeFromInstance(inst);
              invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
              event.currentTarget = null;
            }
            /**
             * Standard/simple iteration through an event's collected dispatches.
             */


            function executeDispatchesInOrder(event) {
              var dispatchListeners = event._dispatchListeners;
              var dispatchInstances = event._dispatchInstances;

              if (Array.isArray(dispatchListeners)) {
                for (var i = 0; i < dispatchListeners.length; i++) {
                  if (event.isPropagationStopped()) {
                    break;
                  } // Listeners and Instances are two parallel arrays that are always in sync.


                  executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
                }
              } else if (dispatchListeners) {
                executeDispatch(event, dispatchListeners, dispatchInstances);
              }

              event._dispatchListeners = null;
              event._dispatchInstances = null;
            }
            /**
             * Dispatches an event and releases it back into the pool, unless persistent.
             *
             * @param {?object} event Synthetic event to be dispatched.
             * @private
             */


            var executeDispatchesAndRelease = function (event) {
              if (event) {
                executeDispatchesInOrder(event);

                if (!event.isPersistent()) {
                  event.constructor.release(event);
                }
              }
            };

            function isInteractive(tag) {
              return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
            }

            function getParent(inst) {
              do {
                inst = inst.return; // TODO: If this is a HostRoot we might want to bail out.
                // That is depending on if we want nested subtrees (layers) to bubble
                // events to their parent. We could also go through parentNode on the
                // host node but that wouldn't work for React Native and doesn't let us
                // do the portal feature.
              } while (inst && inst.tag !== HostComponent);

              if (inst) {
                return inst;
              }

              return null;
            }
            /**
             * Simulates the traversal of a two-phase, capture/bubble event dispatch.
             */


            function traverseTwoPhase(inst, fn, arg) {
              var path = [];

              while (inst) {
                path.push(inst);
                inst = getParent(inst);
              }

              var i;

              for (i = path.length; i-- > 0;) {
                fn(path[i], 'captured', arg);
              }

              for (i = 0; i < path.length; i++) {
                fn(path[i], 'bubbled', arg);
              }
            }

            function shouldPreventMouseEvent(name, type, props) {
              switch (name) {
                case 'onClick':
                case 'onClickCapture':
                case 'onDoubleClick':
                case 'onDoubleClickCapture':
                case 'onMouseDown':
                case 'onMouseDownCapture':
                case 'onMouseMove':
                case 'onMouseMoveCapture':
                case 'onMouseUp':
                case 'onMouseUpCapture':
                case 'onMouseEnter':
                  return !!(props.disabled && isInteractive(type));

                default:
                  return false;
              }
            }
            /**
             * @param {object} inst The instance, which is the source of events.
             * @param {string} registrationName Name of listener (e.g. `onClick`).
             * @return {?function} The stored callback.
             */


            function getListener(inst, registrationName) {
              // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
              // live here; needs to be moved to a better place soon
              var stateNode = inst.stateNode;

              if (!stateNode) {
                // Work in progress (ex: onload events in incremental mode).
                return null;
              }

              var props = getFiberCurrentPropsFromNode(stateNode);

              if (!props) {
                // Work in progress.
                return null;
              }

              var listener = props[registrationName];

              if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
                return null;
              }

              if (!(!listener || typeof listener === 'function')) {
                {
                  throw Error( "Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type." );
                }
              }

              return listener;
            }

            function listenerAtPhase(inst, event, propagationPhase) {
              var registrationName = event._reactName;

              if (propagationPhase === 'captured') {
                registrationName += 'Capture';
              }

              return getListener(inst, registrationName);
            }

            function accumulateDispatches(inst, ignoredDirection, event) {
              if (inst && event && event._reactName) {
                var registrationName = event._reactName;
                var listener = getListener(inst, registrationName);

                if (listener) {
                  if (event._dispatchListeners == null) {
                    event._dispatchListeners = [];
                  }

                  if (event._dispatchInstances == null) {
                    event._dispatchInstances = [];
                  }

                  event._dispatchListeners.push(listener);

                  event._dispatchInstances.push(inst);
                }
              }
            }

            function accumulateDirectionalDispatches(inst, phase, event) {
              {
                if (!inst) {
                  error('Dispatching inst must not be null');
                }
              }

              var listener = listenerAtPhase(inst, event, phase);

              if (listener) {
                if (event._dispatchListeners == null) {
                  event._dispatchListeners = [];
                }

                if (event._dispatchInstances == null) {
                  event._dispatchInstances = [];
                }

                event._dispatchListeners.push(listener);

                event._dispatchInstances.push(inst);
              }
            }

            function accumulateDirectDispatchesSingle(event) {
              if (event && event._reactName) {
                accumulateDispatches(event._targetInst, null, event);
              }
            }

            function accumulateTwoPhaseDispatchesSingle(event) {
              if (event && event._reactName) {
                traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
              }
            } // End of inline


            var Simulate = {};
            var directDispatchEventTypes = new Set(['mouseEnter', 'mouseLeave', 'pointerEnter', 'pointerLeave']);
            /**
             * Exports:
             *
             * - `Simulate.click(Element)`
             * - `Simulate.mouseMove(Element)`
             * - `Simulate.change(Element)`
             * - ... (All keys from event plugin `eventTypes` objects)
             */

            function makeSimulator(eventType) {
              return function (domNode, eventData) {
                if (!!React.isValidElement(domNode)) {
                  {
                    throw Error( "TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering." );
                  }
                }

                if (!!isCompositeComponent(domNode)) {
                  {
                    throw Error( "TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead." );
                  }
                }

                var reactName = 'on' + eventType[0].toUpperCase() + eventType.slice(1);
                var fakeNativeEvent = new Event();
                fakeNativeEvent.target = domNode;
                fakeNativeEvent.type = eventType.toLowerCase();
                var targetInst = getInstanceFromNode(domNode);
                var event = new SyntheticEvent(reactName, fakeNativeEvent.type, targetInst, fakeNativeEvent, domNode); // Since we aren't using pooling, always persist the event. This will make
                // sure it's marked and won't warn when setting additional properties.

                event.persist();

                _assign(event, eventData);

                if (directDispatchEventTypes.has(eventType)) {
                  accumulateDirectDispatchesSingle(event);
                } else {
                  accumulateTwoPhaseDispatchesSingle(event);
                }

                ReactDOM.unstable_batchedUpdates(function () {
                  // Normally extractEvent enqueues a state restore, but we'll just always
                  // do that since we're by-passing it here.
                  enqueueStateRestore(domNode);
                  executeDispatchesAndRelease(event);
                  rethrowCaughtError();
                });
                restoreStateIfNeeded();
              };
            } // A one-time snapshot with no plans to update. We'll probably want to deprecate Simulate API.


            var simulatedEventTypes = ['blur', 'cancel', 'click', 'close', 'contextMenu', 'copy', 'cut', 'auxClick', 'doubleClick', 'dragEnd', 'dragStart', 'drop', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'mouseDown', 'mouseUp', 'paste', 'pause', 'play', 'pointerCancel', 'pointerDown', 'pointerUp', 'rateChange', 'reset', 'seeked', 'submit', 'touchCancel', 'touchEnd', 'touchStart', 'volumeChange', 'drag', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'mouseMove', 'mouseOut', 'mouseOver', 'pointerMove', 'pointerOut', 'pointerOver', 'scroll', 'toggle', 'touchMove', 'wheel', 'abort', 'animationEnd', 'animationIteration', 'animationStart', 'canPlay', 'canPlayThrough', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'gotPointerCapture', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'lostPointerCapture', 'playing', 'progress', 'seeking', 'stalled', 'suspend', 'timeUpdate', 'transitionEnd', 'waiting', 'mouseEnter', 'mouseLeave', 'pointerEnter', 'pointerLeave', 'change', 'select', 'beforeInput', 'compositionEnd', 'compositionStart', 'compositionUpdate'];

            function buildSimulators() {
              simulatedEventTypes.forEach(function (eventType) {
                Simulate[eventType] = makeSimulator(eventType);
              });
            }

            buildSimulators();

            exports.Simulate = Simulate;
            exports.act = act;
            exports.findAllInRenderedTree = findAllInRenderedTree;
            exports.findRenderedComponentWithType = findRenderedComponentWithType;
            exports.findRenderedDOMComponentWithClass = findRenderedDOMComponentWithClass;
            exports.findRenderedDOMComponentWithTag = findRenderedDOMComponentWithTag;
            exports.isCompositeComponent = isCompositeComponent;
            exports.isCompositeComponentWithType = isCompositeComponentWithType;
            exports.isDOMComponent = isDOMComponent;
            exports.isDOMComponentElement = isDOMComponentElement;
            exports.isElement = isElement;
            exports.isElementOfType = isElementOfType;
            exports.mockComponent = mockComponent;
            exports.nativeTouchData = nativeTouchData;
            exports.renderIntoDocument = renderIntoDocument;
            exports.scryRenderedComponentsWithType = scryRenderedComponentsWithType;
            exports.scryRenderedDOMComponentsWithClass = scryRenderedDOMComponentsWithClass;
            exports.scryRenderedDOMComponentsWithTag = scryRenderedDOMComponentsWithTag;
            exports.traverseTwoPhase = traverseTwoPhase;
            exports.unstable_concurrentAct = unstable_concurrentAct;
              })();
            }
            });

            var testUtils = createCommonjsModule(function (module) {

            if (process.env.NODE_ENV === 'production') {
              module.exports = reactDomTestUtils_production_min;
            } else {
              module.exports = reactDomTestUtils_development;
            }
            });

            var reactAct = testUtils.act;
            var actSupported = reactAct !== undefined; // act is supported react-dom@16.8.0
            // so for versions that don't have act from test utils
            // we do this little polyfill. No warnings, but it's
            // better than nothing.

            function actPolyfill(cb) {
              m__default["default"].unstable_batchedUpdates(cb);
              m__default["default"].render( /*#__PURE__*/l__namespace.createElement("div", null), document.createElement('div'));
            }

            var act = reactAct || actPolyfill;
            var youHaveBeenWarned = false;
            var isAsyncActSupported = null;

            function asyncAct(cb) {
              if (actSupported === true) {
                if (isAsyncActSupported === null) {
                  return new Promise(function (resolve, reject) {
                    // patch console.error here
                    var originalConsoleError = console.error;

                    console.error = function error() {
                      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                      }

                      /* if console.error fired *with that specific message* */

                      /* istanbul ignore next */
                      var firstArgIsString = typeof args[0] === 'string';

                      if (firstArgIsString && args[0].indexOf('Warning: Do not await the result of calling ReactTestUtils.act') === 0) {
                        // v16.8.6
                        isAsyncActSupported = false;
                      } else if (firstArgIsString && args[0].indexOf('Warning: The callback passed to ReactTestUtils.act(...) function must not return anything') === 0) ; else {
                        originalConsoleError.apply(console, args);
                      }
                    };

                    var cbReturn, result;

                    try {
                      result = reactAct(function () {
                        cbReturn = cb();
                        return cbReturn;
                      });
                    } catch (err) {
                      console.error = originalConsoleError;
                      reject(err);
                      return;
                    }

                    result.then(function () {
                      console.error = originalConsoleError; // if it got here, it means async act is supported

                      isAsyncActSupported = true;
                      resolve();
                    }, function (err) {
                      console.error = originalConsoleError;
                      isAsyncActSupported = true;
                      reject(err);
                    }); // 16.8.6's act().then() doesn't call a resolve handler, so we need to manually flush here, sigh

                    if (isAsyncActSupported === false) {
                      console.error = originalConsoleError;
                      /* istanbul ignore next */

                      if (!youHaveBeenWarned) {
                        // if act is supported and async act isn't and they're trying to use async
                        // act, then they need to upgrade from 16.8 to 16.9.
                        // This is a seamless upgrade, so we'll add a warning
                        console.error("It looks like you're using a version of react-dom that supports the \"act\" function, but not an awaitable version of \"act\" which you will need. Please upgrade to at least react-dom@16.9.0 to remove this warning.");
                        youHaveBeenWarned = true;
                      }

                      cbReturn.then(function () {
                        // a faux-version.
                        // todo - copy https://github.com/facebook/react/blob/master/packages/shared/enqueueTask.js
                        Promise.resolve().then(function () {
                          // use sync act to flush effects
                          act(function () {});
                          resolve();
                        });
                      }, reject);
                    }
                  });
                } else if (isAsyncActSupported === false) {
                  // use the polyfill directly
                  var _result;

                  act(function () {
                    _result = cb();
                  });
                  return _result.then(function () {
                    return Promise.resolve().then(function () {
                      // use sync act to flush effects
                      act(function () {});
                    });
                  });
                } // all good! regular act


                return act(cb);
              } // use the polyfill


              var result;
              act(function () {
                result = cb();
              });
              return result.then(function () {
                return Promise.resolve().then(function () {
                  // use sync act to flush effects
                  act(function () {});
                });
              });
            }
            /* eslint no-console:0 */

            // dom-testing-library's version of fireEvent. The reason
            // we make this distinction however is because we have
            // a few extra events that work a bit differently

            var fireEvent = function fireEvent() {
              return fireEvent$1.apply(void 0, arguments);
            };

            Object.keys(fireEvent$1).forEach(function (key) {
              fireEvent[key] = function () {
                return fireEvent$1[key].apply(fireEvent$1, arguments);
              };
            }); // React event system tracks native mouseOver/mouseOut events for
            // running onMouseEnter/onMouseLeave handlers
            // @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/EnterLeaveEventPlugin.js#L24-L31

            var mouseEnter = fireEvent.mouseEnter;
            var mouseLeave = fireEvent.mouseLeave;

            fireEvent.mouseEnter = function () {
              mouseEnter.apply(void 0, arguments);
              return fireEvent.mouseOver.apply(fireEvent, arguments);
            };

            fireEvent.mouseLeave = function () {
              mouseLeave.apply(void 0, arguments);
              return fireEvent.mouseOut.apply(fireEvent, arguments);
            };

            var pointerEnter = fireEvent.pointerEnter;
            var pointerLeave = fireEvent.pointerLeave;

            fireEvent.pointerEnter = function () {
              pointerEnter.apply(void 0, arguments);
              return fireEvent.pointerOver.apply(fireEvent, arguments);
            };

            fireEvent.pointerLeave = function () {
              pointerLeave.apply(void 0, arguments);
              return fireEvent.pointerOut.apply(fireEvent, arguments);
            };

            var select = fireEvent.select;

            fireEvent.select = function (node, init) {
              select(node, init); // React tracks this event only on focused inputs

              node.focus(); // React creates this event when one of the following native events happens
              // - contextMenu
              // - mouseUp
              // - dragEnd
              // - keyUp
              // - keyDown
              // so we can use any here
              // @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/SelectEventPlugin.js#L203-L224

              fireEvent.keyUp(node, init);
            }; // React event system tracks native focusout/focusin events for
            // running blur/focus handlers
            // @link https://github.com/facebook/react/pull/19186


            var blur$1 = fireEvent.blur;
            var focus$1 = fireEvent.focus;

            fireEvent.blur = function () {
              fireEvent.focusOut.apply(fireEvent, arguments);
              return blur$1.apply(void 0, arguments);
            };

            fireEvent.focus = function () {
              fireEvent.focusIn.apply(fireEvent, arguments);
              return focus$1.apply(void 0, arguments);
            };

            configure({
              asyncWrapper: function () {
                var _asyncWrapper = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(cb) {
                  var result;
                  return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return asyncAct( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                            return regenerator.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return cb();

                                  case 2:
                                    result = _context.sent;

                                  case 3:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          })));

                        case 2:
                          return _context2.abrupt("return", result);

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function asyncWrapper(_x) {
                  return _asyncWrapper.apply(this, arguments);
                }

                return asyncWrapper;
              }(),
              eventWrapper: function eventWrapper(cb) {
                var result;
                act(function () {
                  result = cb();
                });
                return result;
              }
            });
            var mountedContainers = new Set();

            function render(ui, _temp) {
              var _ref2 = _temp === void 0 ? {} : _temp,
                  container = _ref2.container,
                  _ref2$baseElement = _ref2.baseElement,
                  baseElement = _ref2$baseElement === void 0 ? container : _ref2$baseElement,
                  queries = _ref2.queries,
                  _ref2$hydrate = _ref2.hydrate,
                  hydrate = _ref2$hydrate === void 0 ? false : _ref2$hydrate,
                  WrapperComponent = _ref2.wrapper;

              if (!baseElement) {
                // default to document.body instead of documentElement to avoid output of potentially-large
                // head elements (such as JSS style blocks) in debug output
                baseElement = document.body;
              }

              if (!container) {
                container = baseElement.appendChild(document.createElement('div'));
              } // we'll add it to the mounted containers regardless of whether it's actually
              // added to document.body so the cleanup method works regardless of whether
              // they're passing us a custom container or not.


              mountedContainers.add(container);

              var wrapUiIfNeeded = function wrapUiIfNeeded(innerElement) {
                return WrapperComponent ? /*#__PURE__*/l__namespace.createElement(WrapperComponent, null, innerElement) : innerElement;
              };

              act(function () {
                if (hydrate) {
                  m__default["default"].hydrate(wrapUiIfNeeded(ui), container);
                } else {
                  m__default["default"].render(wrapUiIfNeeded(ui), container);
                }
              });
              return _extends({
                container: container,
                baseElement: baseElement,
                debug: function debug(el, maxLength, options) {
                  if (el === void 0) {
                    el = baseElement;
                  }

                  return Array.isArray(el) ? // eslint-disable-next-line no-console
                  el.forEach(function (e) {
                    return console.log(prettyDOM(e, maxLength, options));
                  }) : // eslint-disable-next-line no-console,
                  console.log(prettyDOM(el, maxLength, options));
                },
                unmount: function unmount() {
                  act(function () {
                    m__default["default"].unmountComponentAtNode(container);
                  });
                },
                rerender: function rerender(rerenderUi) {
                  render(wrapUiIfNeeded(rerenderUi), {
                    container: container,
                    baseElement: baseElement
                  }); // Intentionally do not return anything to avoid unnecessarily complicating the API.
                  // folks can use all the same utilities we return in the first place that are bound to the container
                },
                asFragment: function asFragment() {
                  /* istanbul ignore else (old jsdom limitation) */
                  if (typeof document.createRange === 'function') {
                    return document.createRange().createContextualFragment(container.innerHTML);
                  } else {
                    var template = document.createElement('template');
                    template.innerHTML = container.innerHTML;
                    return template.content;
                  }
                }
              }, getQueriesForElement(baseElement, queries));
            }

            function cleanup() {
              mountedContainers.forEach(cleanupAtContainer);
            } // maybe one day we'll expose this (perhaps even as a utility returned by render).
            // but let's wait until someone asks for it.


            function cleanupAtContainer(container) {
              act(function () {
                m__default["default"].unmountComponentAtNode(container);
              });

              if (container.parentNode === document.body) {
                document.body.removeChild(container);
              }

              mountedContainers.delete(container);
            } // just re-export everything from dom-testing-library
            // thing for people using react-dom@16.8.0. Anyone else doesn't need it and
            // people should just upgrade anyway.

            /* eslint func-name-matching:0 */

            var _process$env;
            // or teardown then we'll automatically run cleanup afterEach test
            // this ensures that tests run in isolation from each other
            // if you don't like this then either import the `pure` module
            // or set the RTL_SKIP_AUTO_CLEANUP env variable to 'true'.

            if (typeof process === 'undefined' || !((_process$env = process.env) != null && _process$env.RTL_SKIP_AUTO_CLEANUP)) {
              // ignore teardown() in code coverage because Jest does not support it

              /* istanbul ignore else */
              if (typeof afterEach === 'function') {
                afterEach(function () {
                  cleanup();
                });
              } else if (typeof teardown === 'function') {
                // Block is guarded by `typeof` check.
                // eslint does not support `typeof` guards.
                // eslint-disable-next-line no-undef
                teardown(function () {
                  cleanup();
                });
              }
            }

            // Copyright 2021 Workiva Inc.

            var buildTestingLibraryElementError = function buildTestingLibraryElementError(message) {
              var err = new Error(message);
              err.name = 'TestingLibraryElementError';
              return err;
            };

            var buildJsGetElementError = function buildJsGetElementError(message, container) {
              var _message$replace;

              // With findBy* async queries, there is a race condition during which `originalMessage` will already
              // contain the prettyDOM-printed HTML of the `container`. This causes the prettyDOM-printed HTML to be
              // output twice in the error because of the call to `setEphemeralElementErrorMessage`,
              // which calls `buildCustomTestingLibraryElementJsError`, which assumes that the prettyDOM-printed output
              // is not already there. So we'll do an additional replace here to get rid of the prettyDOM-printed output
              // if found.
              var prettyDOMRegex = /(?<=[\s\S]*)\s*<\w+>[\s\S]+/gm;
              var newMessage = (_message$replace = message === null || message === void 0 ? void 0 : message.replace(prettyDOMRegex, '')) !== null && _message$replace !== void 0 ? _message$replace : '';
              var prettyDomOutput = prettyDOM(container);
              return buildTestingLibraryElementError([newMessage, prettyDomOutput].filter(Boolean).join('\n\n'));
            };

            var getMouseEventOptions_2 = getMouseEventOptions;

            function isMousePressEvent(event) {
              return event === 'mousedown' || event === 'mouseup' || event === 'click' || event === 'dblclick';
            } // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons


            const BUTTONS_NAMES = {
              none: 0,
              primary: 1,
              secondary: 2,
              auxiliary: 4
            }; // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button

            const BUTTON_NAMES = {
              primary: 0,
              auxiliary: 1,
              secondary: 2
            };

            function translateButtonNumber(value, from) {
              var _Object$entries$find;

              const [mapIn, mapOut] = from === 'button' ? [BUTTON_NAMES, BUTTONS_NAMES] : [BUTTONS_NAMES, BUTTON_NAMES];
              const name = (_Object$entries$find = Object.entries(mapIn).find(([, i]) => i === value)) == null ? void 0 : _Object$entries$find[0]; // istanbul ignore next

              return name && Object.prototype.hasOwnProperty.call(mapOut, name) ? mapOut[name] : 0;
            }

            function convertMouseButtons(event, init, property) {
              if (!isMousePressEvent(event)) {
                return 0;
              }

              if (typeof init[property] === 'number') {
                return init[property];
              } else if (property === 'button' && typeof init.buttons === 'number') {
                return translateButtonNumber(init.buttons, 'buttons');
              } else if (property === 'buttons' && typeof init.button === 'number') {
                return translateButtonNumber(init.button, 'button');
              }

              return property != 'button' && isMousePressEvent(event) ? 1 : 0;
            }

            function getMouseEventOptions(event, init, clickCount = 0) {
              var _init;

              init = (_init = init) != null ? _init : {};
              return { ...init,
                // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
                detail: event === 'mousedown' || event === 'mouseup' || event === 'click' ? 1 + clickCount : clickCount,
                buttons: convertMouseButtons(event, init, 'buttons'),
                button: convertMouseButtons(event, init, 'button')
              };
            }

            var getMouseEventOptions_1 = /*#__PURE__*/Object.defineProperty({
            	getMouseEventOptions: getMouseEventOptions_2
            }, '__esModule', {value: true});

            var isElementType_2 = isElementType;

            function isElementType(element, tag, props) {
              if (element.namespaceURI && element.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
                return false;
              }

              tag = Array.isArray(tag) ? tag : [tag]; // tagName is uppercase in HTMLDocument and lowercase in XMLDocument

              if (!tag.includes(element.tagName.toLowerCase())) {
                return false;
              }

              if (props) {
                return Object.entries(props).every(([k, v]) => element[k] === v);
              }

              return true;
            }

            var isElementType_1 = /*#__PURE__*/Object.defineProperty({
            	isElementType: isElementType_2
            }, '__esModule', {value: true});

            var isClickableInput_2 = isClickableInput;



            const CLICKABLE_INPUT_TYPES = ['button', 'color', 'file', 'image', 'reset', 'submit', 'checkbox', 'radio'];

            function isClickableInput(element) {
              return (0, isElementType_1.isElementType)(element, 'button') || (0, isElementType_1.isElementType)(element, 'input') && CLICKABLE_INPUT_TYPES.includes(element.type);
            }

            var isClickableInput_1 = /*#__PURE__*/Object.defineProperty({
            	isClickableInput: isClickableInput_2
            }, '__esModule', {value: true});

            var buildTimeValue_2 = buildTimeValue;

            function buildTimeValue(value) {
              const onlyDigitsValue = value.replace(/\D/g, '');

              if (onlyDigitsValue.length < 2) {
                return value;
              }

              const firstDigit = parseInt(onlyDigitsValue[0], 10);
              const secondDigit = parseInt(onlyDigitsValue[1], 10);

              if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
                let index;

                if (firstDigit >= 3) {
                  index = 1;
                } else {
                  index = 2;
                }

                return build(onlyDigitsValue, index);
              }

              if (value.length === 2) {
                return value;
              }

              return build(onlyDigitsValue, 2);
            }

            function build(onlyDigitsValue, index) {
              const hours = onlyDigitsValue.slice(0, index);
              const validHours = Math.min(parseInt(hours, 10), 23);
              const minuteCharacters = onlyDigitsValue.slice(index);
              const parsedMinutes = parseInt(minuteCharacters, 10);
              const validMinutes = Math.min(parsedMinutes, 59);
              return `${validHours.toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
            }

            var buildTimeValue_1 = /*#__PURE__*/Object.defineProperty({
            	buildTimeValue: buildTimeValue_2
            }, '__esModule', {value: true});

            var getSelectionRange_1 = getSelectionRange;
            var hasSelectionSupport_1 = hasSelectionSupport;
            var setSelectionRange_1 = setSelectionRange;



            // https://github.com/jsdom/jsdom/blob/c2fb8ff94917a4d45e2398543f5dd2a8fed0bdab/lib/jsdom/living/nodes/HTMLInputElement-impl.js#L45
            var selectionSupportType;

            (function (selectionSupportType) {
              selectionSupportType["text"] = "text";
              selectionSupportType["search"] = "search";
              selectionSupportType["url"] = "url";
              selectionSupportType["tel"] = "tel";
              selectionSupportType["password"] = "password";
            })(selectionSupportType || (selectionSupportType = {}));

            const InputSelection = Symbol('inputSelection');

            function hasSelectionSupport(element) {
              return (0, isElementType_1.isElementType)(element, 'textarea') || (0, isElementType_1.isElementType)(element, 'input') && Boolean(selectionSupportType[element.type]);
            }

            function getSelectionRange(element) {
              if (hasSelectionSupport(element)) {
                return {
                  selectionStart: element.selectionStart,
                  selectionEnd: element.selectionEnd
                };
              }

              if ((0, isElementType_1.isElementType)(element, 'input')) {
                var _InputSelection;

                return (_InputSelection = element[InputSelection]) != null ? _InputSelection : {
                  selectionStart: null,
                  selectionEnd: null
                };
              }

              const selection = element.ownerDocument.getSelection(); // there should be no editing if the focusNode is outside of element
              // TODO: properly handle selection ranges

              if (selection != null && selection.rangeCount && element.contains(selection.focusNode)) {
                const range = selection.getRangeAt(0);
                return {
                  selectionStart: range.startOffset,
                  selectionEnd: range.endOffset
                };
              } else {
                return {
                  selectionStart: null,
                  selectionEnd: null
                };
              }
            }

            function setSelectionRange(element, newSelectionStart, newSelectionEnd) {
              const {
                selectionStart,
                selectionEnd
              } = getSelectionRange(element);

              if (selectionStart === newSelectionStart && selectionEnd === newSelectionEnd) {
                return;
              }

              if (hasSelectionSupport(element)) {
                element.setSelectionRange(newSelectionStart, newSelectionEnd);
              }

              if ((0, isElementType_1.isElementType)(element, 'input')) {
                element[InputSelection] = {
                  selectionStart: newSelectionStart,
                  selectionEnd: newSelectionEnd
                };
              } // Moving the selection inside <input> or <textarea> does not alter the document Selection.


              if ((0, isElementType_1.isElementType)(element, 'input') || (0, isElementType_1.isElementType)(element, 'textarea')) {
                return;
              }

              const range = element.ownerDocument.createRange();
              range.selectNodeContents(element); // istanbul ignore else

              if (element.firstChild) {
                range.setStart(element.firstChild, newSelectionStart);
                range.setEnd(element.firstChild, newSelectionEnd);
              }

              const selection = element.ownerDocument.getSelection(); // istanbul ignore else

              if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }

            var selectionRange = /*#__PURE__*/Object.defineProperty({
            	getSelectionRange: getSelectionRange_1,
            	hasSelectionSupport: hasSelectionSupport_1,
            	setSelectionRange: setSelectionRange_1
            }, '__esModule', {value: true});

            var isContentEditable_2 = isContentEditable;

            //jsdom is not supporting isContentEditable
            function isContentEditable(element) {
              return element.hasAttribute('contenteditable') && (element.getAttribute('contenteditable') == 'true' || element.getAttribute('contenteditable') == '');
            }

            var isContentEditable_1 = /*#__PURE__*/Object.defineProperty({
            	isContentEditable: isContentEditable_2
            }, '__esModule', {value: true});

            var getValue_2 = getValue;



            function getValue(element) {
              // istanbul ignore if
              if (!element) {
                return null;
              }

              if ((0, isContentEditable_1.isContentEditable)(element)) {
                return element.textContent;
              }

              return element.value;
            }

            var getValue_1 = /*#__PURE__*/Object.defineProperty({
            	getValue: getValue_2
            }, '__esModule', {value: true});

            var isValidDateValue_2 = isValidDateValue;

            function isValidDateValue(element, value) {
              const clone = element.cloneNode();
              clone.value = value;
              return clone.value === value;
            }

            var isValidDateValue_1 = /*#__PURE__*/Object.defineProperty({
            	isValidDateValue: isValidDateValue_2
            }, '__esModule', {value: true});

            var isValidInputTimeValue_2 = isValidInputTimeValue;

            function isValidInputTimeValue(element, timeValue) {
              const clone = element.cloneNode();
              clone.value = timeValue;
              return clone.value === timeValue;
            }

            var isValidInputTimeValue_1 = /*#__PURE__*/Object.defineProperty({
            	isValidInputTimeValue: isValidInputTimeValue_2
            }, '__esModule', {value: true});

            var calculateNewValue_2 = calculateNewValue;









            function calculateNewValue(newEntry, element, value = (() => {
              var _getValue;

              return (_getValue = (0, getValue_1.getValue)(element)) != null ? _getValue :
              /* istanbul ignore next */
              '';
            })(), selectionRange$1 = (0, selectionRange.getSelectionRange)(element), deleteContent) {
              const selectionStart = selectionRange$1.selectionStart === null ? value.length : selectionRange$1.selectionStart;
              const selectionEnd = selectionRange$1.selectionEnd === null ? value.length : selectionRange$1.selectionEnd;
              const prologEnd = Math.max(0, selectionStart === selectionEnd && deleteContent === 'backward' ? selectionStart - 1 : selectionStart);
              const prolog = value.substring(0, prologEnd);
              const epilogStart = Math.min(value.length, selectionStart === selectionEnd && deleteContent === 'forward' ? selectionEnd + 1 : selectionEnd);
              const epilog = value.substring(epilogStart, value.length);
              let newValue = `${prolog}${newEntry}${epilog}`;
              const newSelectionStart = prologEnd + newEntry.length;

              if (element.type === 'date' && !(0, isValidDateValue_1.isValidDateValue)(element, newValue)) {
                newValue = value;
              }

              if (element.type === 'time' && !(0, isValidInputTimeValue_1.isValidInputTimeValue)(element, newValue)) {
                if ((0, isValidInputTimeValue_1.isValidInputTimeValue)(element, newEntry)) {
                  newValue = newEntry;
                } else {
                  newValue = value;
                }
              }

              return {
                newValue,
                newSelectionStart
              };
            }

            var calculateNewValue_1 = /*#__PURE__*/Object.defineProperty({
            	calculateNewValue: calculateNewValue_2
            }, '__esModule', {value: true});

            var isCursorAtEnd_1 = isCursorAtEnd;
            var isCursorAtStart_1 = isCursorAtStart;





            function isCursorAtEnd(element) {
              var _getValue;

              const {
                selectionStart,
                selectionEnd
              } = (0, selectionRange.getSelectionRange)(element);
              return selectionStart === selectionEnd && (selectionStart != null ? selectionStart :
              /* istanbul ignore next */
              0) === ((_getValue = (0, getValue_1.getValue)(element)) != null ? _getValue :
              /* istanbul ignore next */
              '').length;
            }

            function isCursorAtStart(element) {
              const {
                selectionStart,
                selectionEnd
              } = (0, selectionRange.getSelectionRange)(element);
              return selectionStart === selectionEnd && (selectionStart != null ? selectionStart :
              /* istanbul ignore next */
              0) === 0;
            }

            var cursorPosition = /*#__PURE__*/Object.defineProperty({
            	isCursorAtEnd: isCursorAtEnd_1,
            	isCursorAtStart: isCursorAtStart_1
            }, '__esModule', {value: true});

            var hasUnreliableEmptyValue_2 = hasUnreliableEmptyValue;



            var unreliableValueInputTypes;
            /**
             * Check if an empty IDL value on the element could mean a derivation of displayed value and IDL value
             */

            (function (unreliableValueInputTypes) {
              unreliableValueInputTypes["number"] = "number";
            })(unreliableValueInputTypes || (unreliableValueInputTypes = {}));

            function hasUnreliableEmptyValue(element) {
              return (0, isElementType_1.isElementType)(element, 'input') && Boolean(unreliableValueInputTypes[element.type]);
            }

            var hasUnreliableEmptyValue_1 = /*#__PURE__*/Object.defineProperty({
            	hasUnreliableEmptyValue: hasUnreliableEmptyValue_2
            }, '__esModule', {value: true});

            var isEditable_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.editableInputTypes = void 0;
            exports.isEditable = isEditable;
            exports.isEditableInput = isEditableInput;





            function isEditable(element) {
              return isEditableInput(element) || (0, isElementType_1.isElementType)(element, 'textarea', {
                readOnly: false
              }) || (0, isContentEditable_1.isContentEditable)(element);
            }

            let editableInputTypes;
            exports.editableInputTypes = editableInputTypes;

            (function (editableInputTypes) {
              editableInputTypes["text"] = "text";
              editableInputTypes["date"] = "date";
              editableInputTypes["datetime-local"] = "datetime-local";
              editableInputTypes["email"] = "email";
              editableInputTypes["month"] = "month";
              editableInputTypes["number"] = "number";
              editableInputTypes["password"] = "password";
              editableInputTypes["search"] = "search";
              editableInputTypes["tel"] = "tel";
              editableInputTypes["time"] = "time";
              editableInputTypes["url"] = "url";
              editableInputTypes["week"] = "week";
            })(editableInputTypes || (exports.editableInputTypes = editableInputTypes = {}));

            function isEditableInput(element) {
              return (0, isElementType_1.isElementType)(element, 'input', {
                readOnly: false
              }) && Boolean(editableInputTypes[element.type]);
            }
            });

            var getSpaceUntilMaxLength_1 = getSpaceUntilMaxLength;





            var maxLengthSupportedTypes;

            (function (maxLengthSupportedTypes) {
              maxLengthSupportedTypes["email"] = "email";
              maxLengthSupportedTypes["password"] = "password";
              maxLengthSupportedTypes["search"] = "search";
              maxLengthSupportedTypes["telephone"] = "telephone";
              maxLengthSupportedTypes["text"] = "text";
              maxLengthSupportedTypes["url"] = "url";
            })(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));

            function getSpaceUntilMaxLength(element) {
              const value = (0, getValue_1.getValue)(element);
              /* istanbul ignore if */

              if (value === null) {
                return undefined;
              }

              const maxLength = getSanitizedMaxLength(element);
              return maxLength ? maxLength - value.length : undefined;
            } // can't use .maxLength property because of a jsdom bug:
            // https://github.com/jsdom/jsdom/issues/2927


            function getSanitizedMaxLength(element) {
              var _element$getAttribute;

              if (!supportsMaxLength(element)) {
                return undefined;
              }

              const attr = (_element$getAttribute = element.getAttribute('maxlength')) != null ? _element$getAttribute : '';
              return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : undefined;
            }

            function supportsMaxLength(element) {
              return (0, isElementType_1.isElementType)(element, 'textarea') || (0, isElementType_1.isElementType)(element, 'input') && Boolean(maxLengthSupportedTypes[element.type]);
            }

            var maxLength = /*#__PURE__*/Object.defineProperty({
            	getSpaceUntilMaxLength: getSpaceUntilMaxLength_1
            }, '__esModule', {value: true});

            var isDisabled_2 = isDisabled;

            // This should probably be extended with checking the element type
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
            function isDisabled(element) {
              return Boolean(element && element.disabled);
            }

            var isDisabled_1 = /*#__PURE__*/Object.defineProperty({
            	isDisabled: isDisabled_2
            }, '__esModule', {value: true});

            var getActiveElement_2 = getActiveElement;



            function getActiveElement(document) {
              const activeElement = document.activeElement;

              if (activeElement != null && activeElement.shadowRoot) {
                return getActiveElement(activeElement.shadowRoot);
              } else {
                // Browser does not yield disabled elements as document.activeElement - jsdom does
                if ((0, isDisabled_1.isDisabled)(activeElement)) {
                  return document.ownerDocument ? // TODO: verify behavior in ShadowRoot

                  /* istanbul ignore next */
                  document.ownerDocument.body : document.body;
                }

                return activeElement;
              }
            }

            var getActiveElement_1 = /*#__PURE__*/Object.defineProperty({
            	getActiveElement: getActiveElement_2
            }, '__esModule', {value: true});

            var isLabelWithInternallyDisabledControl_2 = isLabelWithInternallyDisabledControl;





            // Absolutely NO events fire on label elements that contain their control
            // if that control is disabled. NUTS!
            // no joke. There are NO events for: <label><input disabled /><label>
            function isLabelWithInternallyDisabledControl(element) {
              if (!(0, isElementType_1.isElementType)(element, 'label')) {
                return false;
              }

              const control = element.control;
              return Boolean(control && element.contains(control) && (0, isDisabled_1.isDisabled)(control));
            }

            var isLabelWithInternallyDisabledControl_1 = /*#__PURE__*/Object.defineProperty({
            	isLabelWithInternallyDisabledControl: isLabelWithInternallyDisabledControl_2
            }, '__esModule', {value: true});

            var selector = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.FOCUSABLE_SELECTOR = void 0;
            const FOCUSABLE_SELECTOR = ['input:not([type=hidden]):not([disabled])', 'button:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[contenteditable=""]', '[contenteditable="true"]', 'a[href]', '[tabindex]:not([disabled])'].join(', ');
            exports.FOCUSABLE_SELECTOR = FOCUSABLE_SELECTOR;
            });

            var isFocusable_2 = isFocusable;





            function isFocusable(element) {
              return !(0, isLabelWithInternallyDisabledControl_1.isLabelWithInternallyDisabledControl)(element) && element.matches(selector.FOCUSABLE_SELECTOR);
            }

            var isFocusable_1 = /*#__PURE__*/Object.defineProperty({
            	isFocusable: isFocusable_2
            }, '__esModule', {value: true});

            var _dom = /*@__PURE__*/getAugmentedNamespace(dom_esm);

            var eventWrapper_2 = eventWrapper;



            function eventWrapper(cb) {
              let result;
              (0, _dom.getConfig)().eventWrapper(() => {
                result = cb();
              });
              return result;
            }

            var eventWrapper_1 = /*#__PURE__*/Object.defineProperty({
            	eventWrapper: eventWrapper_2
            }, '__esModule', {value: true});

            var helpers = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.TEXT_NODE = void 0;
            exports.checkContainerType = checkContainerType;
            exports.getDocument = getDocument;
            exports.getWindowFromNode = getWindowFromNode;
            exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
            // Constant node.nodeType for text nodes, see:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
            const TEXT_NODE = 3;
            exports.TEXT_NODE = TEXT_NODE;

            function jestFakeTimersAreEnabled() {
              /* istanbul ignore else */
              if (typeof jest !== 'undefined' && jest !== null) {
                return (// legacy timers
                  setTimeout._isMockFunction === true || // modern timers
                  Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
                );
              } // istanbul ignore next


              return false;
            }

            function getDocument() {
              /* istanbul ignore if */
              if (typeof window === 'undefined') {
                throw new Error('Could not find default container');
              }

              return window.document;
            }

            function getWindowFromNode(node) {
              if (node.defaultView) {
                // node is document
                return node.defaultView;
              } else if (node.ownerDocument && node.ownerDocument.defaultView) {
                // node is a DOM node
                return node.ownerDocument.defaultView;
              } else if (node.window) {
                // node is window
                return node.window;
              } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
                throw new Error(`It looks like the window object is not available for the provided node.`);
              } else if (node.then instanceof Function) {
                throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
              } else if (Array.isArray(node)) {
                throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
              } else if (typeof node.debug === 'function' && typeof node.logTestingPlaygroundURL === 'function') {
                throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
              } else {
                // The user passed something unusual to a calling function
                throw new Error(`The given node is not an Element, the node type is: ${typeof node}.`);
              }
            }

            function checkContainerType(container) {
              if (!container || !(typeof container.querySelector === 'function') || !(typeof container.querySelectorAll === 'function')) {
                throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
              }

              function getTypeName(object) {
                if (typeof object === 'object') {
                  return object === null ? 'null' : object.constructor.name;
                }

                return typeof object;
              }
            }
            });

            var isVisible_2 = isVisible;



            function isVisible(element) {
              const window = (0, helpers.getWindowFromNode)(element);

              for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
                var _el;

                const display = window.getComputedStyle(el).display;

                if (display === 'none') {
                  return false;
                }
              }

              return true;
            }

            var isVisible_1 = /*#__PURE__*/Object.defineProperty({
            	isVisible: isVisible_2
            }, '__esModule', {value: true});

            var isDocument_2 = isDocument;

            function isDocument(el) {
              return el.nodeType === el.DOCUMENT_NODE;
            }

            var isDocument_1 = /*#__PURE__*/Object.defineProperty({
            	isDocument: isDocument_2
            }, '__esModule', {value: true});

            var wait_2 = wait;

            function wait(time) {
              return new Promise(resolve => setTimeout(() => resolve(), time));
            }

            var wait_1 = /*#__PURE__*/Object.defineProperty({
            	wait: wait_2
            }, '__esModule', {value: true});

            var hasPointerEvents_2 = hasPointerEvents;



            function hasPointerEvents(element) {
              const window = (0, helpers.getWindowFromNode)(element);

              for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
                var _el;

                const pointerEvents = window.getComputedStyle(el).pointerEvents;

                if (pointerEvents && !['inherit', 'unset'].includes(pointerEvents)) {
                  return pointerEvents !== 'none';
                }
              }

              return true;
            }

            var hasPointerEvents_1 = /*#__PURE__*/Object.defineProperty({
            	hasPointerEvents: hasPointerEvents_2
            }, '__esModule', {value: true});

            var hasFormSubmit_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.hasFormSubmit = void 0;

            const hasFormSubmit = form => !!(form && (form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]')));

            exports.hasFormSubmit = hasFormSubmit;
            });

            var utils = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });



            Object.keys(getMouseEventOptions_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === getMouseEventOptions_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return getMouseEventOptions_1[key];
                }
              });
            });



            Object.keys(isClickableInput_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isClickableInput_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isClickableInput_1[key];
                }
              });
            });



            Object.keys(buildTimeValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === buildTimeValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return buildTimeValue_1[key];
                }
              });
            });



            Object.keys(calculateNewValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === calculateNewValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return calculateNewValue_1[key];
                }
              });
            });



            Object.keys(cursorPosition).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === cursorPosition[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return cursorPosition[key];
                }
              });
            });



            Object.keys(getValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === getValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return getValue_1[key];
                }
              });
            });



            Object.keys(hasUnreliableEmptyValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === hasUnreliableEmptyValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return hasUnreliableEmptyValue_1[key];
                }
              });
            });



            Object.keys(isContentEditable_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isContentEditable_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isContentEditable_1[key];
                }
              });
            });



            Object.keys(isEditable_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isEditable_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isEditable_1[key];
                }
              });
            });



            Object.keys(isValidDateValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isValidDateValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isValidDateValue_1[key];
                }
              });
            });



            Object.keys(isValidInputTimeValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isValidInputTimeValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isValidInputTimeValue_1[key];
                }
              });
            });



            Object.keys(maxLength).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === maxLength[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return maxLength[key];
                }
              });
            });



            Object.keys(selectionRange).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === selectionRange[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return selectionRange[key];
                }
              });
            });



            Object.keys(getActiveElement_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === getActiveElement_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return getActiveElement_1[key];
                }
              });
            });



            Object.keys(isFocusable_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isFocusable_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isFocusable_1[key];
                }
              });
            });



            Object.keys(selector).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === selector[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return selector[key];
                }
              });
            });



            Object.keys(eventWrapper_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === eventWrapper_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return eventWrapper_1[key];
                }
              });
            });



            Object.keys(isElementType_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isElementType_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isElementType_1[key];
                }
              });
            });



            Object.keys(isLabelWithInternallyDisabledControl_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isLabelWithInternallyDisabledControl_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isLabelWithInternallyDisabledControl_1[key];
                }
              });
            });



            Object.keys(isVisible_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isVisible_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isVisible_1[key];
                }
              });
            });



            Object.keys(isDisabled_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isDisabled_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isDisabled_1[key];
                }
              });
            });



            Object.keys(isDocument_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === isDocument_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return isDocument_1[key];
                }
              });
            });



            Object.keys(wait_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === wait_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return wait_1[key];
                }
              });
            });



            Object.keys(hasPointerEvents_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === hasPointerEvents_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return hasPointerEvents_1[key];
                }
              });
            });



            Object.keys(hasFormSubmit_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === hasFormSubmit_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return hasFormSubmit_1[key];
                }
              });
            });
            });

            var hover_2 = hover;
            var unhover_1 = unhover;





            // includes `element`
            function getParentElements(element) {
              const parentElements = [element];
              let currentElement = element;

              while ((currentElement = currentElement.parentElement) != null) {
                parentElements.push(currentElement);
              }

              return parentElements;
            }

            function hover(element, init, {
              skipPointerEventsCheck = false
            } = {}) {
              if (!skipPointerEventsCheck && !(0, utils.hasPointerEvents)(element)) {
                throw new Error('unable to hover element as it has or inherits pointer-events set to "none".');
              }

              if ((0, utils.isLabelWithInternallyDisabledControl)(element)) return;
              const parentElements = getParentElements(element).reverse();

              _dom.fireEvent.pointerOver(element, init);

              for (const el of parentElements) {
                _dom.fireEvent.pointerEnter(el, init);
              }

              if (!(0, utils.isDisabled)(element)) {
                _dom.fireEvent.mouseOver(element, (0, utils.getMouseEventOptions)('mouseover', init));

                for (const el of parentElements) {
                  _dom.fireEvent.mouseEnter(el, (0, utils.getMouseEventOptions)('mouseenter', init));
                }
              }

              _dom.fireEvent.pointerMove(element, init);

              if (!(0, utils.isDisabled)(element)) {
                _dom.fireEvent.mouseMove(element, (0, utils.getMouseEventOptions)('mousemove', init));
              }
            }

            function unhover(element, init, {
              skipPointerEventsCheck = false
            } = {}) {
              if (!skipPointerEventsCheck && !(0, utils.hasPointerEvents)(element)) {
                throw new Error('unable to unhover element as it has or inherits pointer-events set to "none".');
              }

              if ((0, utils.isLabelWithInternallyDisabledControl)(element)) return;
              const parentElements = getParentElements(element);

              _dom.fireEvent.pointerMove(element, init);

              if (!(0, utils.isDisabled)(element)) {
                _dom.fireEvent.mouseMove(element, (0, utils.getMouseEventOptions)('mousemove', init));
              }

              _dom.fireEvent.pointerOut(element, init);

              for (const el of parentElements) {
                _dom.fireEvent.pointerLeave(el, init);
              }

              if (!(0, utils.isDisabled)(element)) {
                _dom.fireEvent.mouseOut(element, (0, utils.getMouseEventOptions)('mouseout', init));

                for (const el of parentElements) {
                  _dom.fireEvent.mouseLeave(el, (0, utils.getMouseEventOptions)('mouseleave', init));
                }
              }
            }

            var hover_1 = /*#__PURE__*/Object.defineProperty({
            	hover: hover_2,
            	unhover: unhover_1
            }, '__esModule', {value: true});

            var blur_2 = blur;



            function blur(element) {
              if (!(0, utils.isFocusable)(element)) return;
              const wasActive = (0, utils.getActiveElement)(element.ownerDocument) === element;
              if (!wasActive) return;
              (0, utils.eventWrapper)(() => element.blur());
            }

            var blur_1 = /*#__PURE__*/Object.defineProperty({
            	blur: blur_2
            }, '__esModule', {value: true});

            var focus_2 = focus;



            function focus(element) {
              if (!(0, utils.isFocusable)(element)) return;
              const isAlreadyActive = (0, utils.getActiveElement)(element.ownerDocument) === element;
              if (isAlreadyActive) return;
              (0, utils.eventWrapper)(() => element.focus());
            }

            var focus_1 = /*#__PURE__*/Object.defineProperty({
            	focus: focus_2
            }, '__esModule', {value: true});

            var click_2 = click;
            var dblClick_1 = dblClick;











            function getPreviouslyFocusedElement(element) {
              const focusedElement = element.ownerDocument.activeElement;
              const wasAnotherElementFocused = focusedElement && focusedElement !== element.ownerDocument.body && focusedElement !== element;
              return wasAnotherElementFocused ? focusedElement : null;
            }

            function clickLabel(label, init, {
              clickCount
            }) {
              if ((0, utils.isLabelWithInternallyDisabledControl)(label)) return;

              _dom.fireEvent.pointerDown(label, init);

              _dom.fireEvent.mouseDown(label, (0, utils.getMouseEventOptions)('mousedown', init, clickCount));

              _dom.fireEvent.pointerUp(label, init);

              _dom.fireEvent.mouseUp(label, (0, utils.getMouseEventOptions)('mouseup', init, clickCount));

              fireClick(label, (0, utils.getMouseEventOptions)('click', init, clickCount)); // clicking the label will trigger a click of the label.control
              // however, it will not focus the label.control so we have to do it
              // ourselves.

              if (label.control) (0, focus_1.focus)(label.control);
            }

            function clickBooleanElement(element, init, {
              clickCount
            }) {
              _dom.fireEvent.pointerDown(element, init);

              if (!element.disabled) {
                _dom.fireEvent.mouseDown(element, (0, utils.getMouseEventOptions)('mousedown', init, clickCount));
              }

              (0, focus_1.focus)(element);

              _dom.fireEvent.pointerUp(element, init);

              if (!element.disabled) {
                _dom.fireEvent.mouseUp(element, (0, utils.getMouseEventOptions)('mouseup', init, clickCount));

                fireClick(element, (0, utils.getMouseEventOptions)('click', init, clickCount));
              }
            }

            function clickElement(element, init, {
              clickCount
            }) {
              const previousElement = getPreviouslyFocusedElement(element);

              _dom.fireEvent.pointerDown(element, init);

              if (!(0, utils.isDisabled)(element)) {
                const continueDefaultHandling = _dom.fireEvent.mouseDown(element, (0, utils.getMouseEventOptions)('mousedown', init, clickCount));

                if (continueDefaultHandling) {
                  const closestFocusable = findClosest(element, utils.isFocusable);

                  if (previousElement && !closestFocusable) {
                    (0, blur_1.blur)(previousElement);
                  } else if (closestFocusable) {
                    (0, focus_1.focus)(closestFocusable);
                  }
                }
              }

              _dom.fireEvent.pointerUp(element, init);

              if (!(0, utils.isDisabled)(element)) {
                _dom.fireEvent.mouseUp(element, (0, utils.getMouseEventOptions)('mouseup', init, clickCount));

                fireClick(element, (0, utils.getMouseEventOptions)('click', init, clickCount));
                const parentLabel = element.closest('label');
                if (parentLabel != null && parentLabel.control) (0, focus_1.focus)(parentLabel.control);
              }
            }

            function findClosest(element, callback) {
              let el = element;

              do {
                if (callback(el)) {
                  return el;
                }

                el = el.parentElement;
              } while (el && el !== element.ownerDocument.body);

              return undefined;
            }

            function click(element, init, {
              skipHover = false,
              clickCount = 0,
              skipPointerEventsCheck = false
            } = {}) {
              if (!skipPointerEventsCheck && !(0, utils.hasPointerEvents)(element)) {
                throw new Error('unable to click element as it has or inherits pointer-events set to "none".');
              } // We just checked for `pointerEvents`. We can always skip this one in `hover`.


              if (!skipHover) (0, hover_1.hover)(element, init, {
                skipPointerEventsCheck: true
              });

              if ((0, utils.isElementType)(element, 'label')) {
                clickLabel(element, init, {
                  clickCount
                });
              } else if ((0, utils.isElementType)(element, 'input')) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                  clickBooleanElement(element, init, {
                    clickCount
                  });
                } else {
                  clickElement(element, init, {
                    clickCount
                  });
                }
              } else {
                clickElement(element, init, {
                  clickCount
                });
              }
            }

            function fireClick(element, mouseEventOptions) {
              if (mouseEventOptions.button === 2) {
                _dom.fireEvent.contextMenu(element, mouseEventOptions);
              } else {
                _dom.fireEvent.click(element, mouseEventOptions);
              }
            }

            function dblClick(element, init, {
              skipPointerEventsCheck = false
            } = {}) {
              if (!skipPointerEventsCheck && !(0, utils.hasPointerEvents)(element)) {
                throw new Error('unable to double-click element as it has or inherits pointer-events set to "none".');
              }

              (0, hover_1.hover)(element, init, {
                skipPointerEventsCheck
              });
              click(element, init, {
                skipHover: true,
                clickCount: 0,
                skipPointerEventsCheck
              });
              click(element, init, {
                skipHover: true,
                clickCount: 1,
                skipPointerEventsCheck
              });

              _dom.fireEvent.dblClick(element, (0, utils.getMouseEventOptions)('dblclick', init, 2));
            }

            var click_1 = /*#__PURE__*/Object.defineProperty({
            	click: click_2,
            	dblClick: dblClick_1
            }, '__esModule', {value: true});

            var getNextKeyDef_2 = getNextKeyDef;
            var bracketDict;

            (function (bracketDict) {
              bracketDict["{"] = "}";
              bracketDict["["] = "]";
            })(bracketDict || (bracketDict = {}));

            var legacyModifiers;

            (function (legacyModifiers) {
              legacyModifiers["alt"] = "alt";
              legacyModifiers["ctrl"] = "ctrl";
              legacyModifiers["meta"] = "meta";
              legacyModifiers["shift"] = "shift";
            })(legacyModifiers || (legacyModifiers = {}));

            var legacyKeyMap;
            /**
             * Get the next key from keyMap
             *
             * Keys can be referenced by `{key}` or `{special}` as well as physical locations per `[code]`.
             * Everything else will be interpreted as a typed character - e.g. `a`.
             * Brackets `{` and `[` can be escaped by doubling - e.g. `foo[[bar` translates to `foo[bar`.
             * Keeping the key pressed can be written as `{key>}`.
             * When keeping the key pressed you can choose how long (how many keydown and keypress) the key is pressed `{key>3}`.
             * You can then release the key per `{key>3/}` or keep it pressed and continue with the next key.
             * Modifiers like `{shift}` imply being kept pressed. This can be turned of per `{shift/}`.
             */

            (function (legacyKeyMap) {
              legacyKeyMap["ctrl"] = "Control";
              legacyKeyMap["del"] = "Delete";
              legacyKeyMap["esc"] = "Escape";
              legacyKeyMap["space"] = " ";
            })(legacyKeyMap || (legacyKeyMap = {}));

            function getNextKeyDef(text, options) {
              var _options$keyboardMap$;

              const {
                type,
                descriptor,
                consumedLength,
                releasePrevious,
                releaseSelf,
                repeat
              } = readNextDescriptor(text);
              const keyDef = (_options$keyboardMap$ = options.keyboardMap.find(def => {
                if (type === '[') {
                  var _def$code;

                  return ((_def$code = def.code) == null ? void 0 : _def$code.toLowerCase()) === descriptor.toLowerCase();
                } else if (type === '{') {
                  var _def$key;

                  const key = mapLegacyKey(descriptor);
                  return ((_def$key = def.key) == null ? void 0 : _def$key.toLowerCase()) === key.toLowerCase();
                }

                return def.key === descriptor;
              })) != null ? _options$keyboardMap$ : {
                key: 'Unknown',
                code: 'Unknown',
                [type === '[' ? 'code' : 'key']: descriptor
              };
              return {
                keyDef,
                consumedLength,
                releasePrevious,
                releaseSelf,
                repeat
              };
            }

            function readNextDescriptor(text) {
              let pos = 0;
              const startBracket = text[pos] in bracketDict ? text[pos] : '';
              pos += startBracket.length; // `foo{{bar` is an escaped char at position 3,
              // but `foo{{{>5}bar` should be treated as `{` pressed down for 5 keydowns.

              const startBracketRepeated = startBracket ? text.match(new RegExp(`^\\${startBracket}+`))[0].length : 0;
              const isEscapedChar = startBracketRepeated === 2 || startBracket === '{' && startBracketRepeated > 3;
              const type = isEscapedChar ? '' : startBracket;
              return {
                type,
                ...(type === '' ? readPrintableChar(text, pos) : readTag(text, pos, type))
              };
            }

            function readPrintableChar(text, pos) {
              const descriptor = text[pos];
              assertDescriptor(descriptor, text, pos);
              pos += descriptor.length;
              return {
                consumedLength: pos,
                descriptor,
                releasePrevious: false,
                releaseSelf: true,
                repeat: 1
              };
            }

            function readTag(text, pos, startBracket) {
              var _text$slice$match, _text$slice$match$, _text$slice$match2;

              const releasePreviousModifier = text[pos] === '/' ? '/' : '';
              pos += releasePreviousModifier.length;
              const descriptor = (_text$slice$match = text.slice(pos).match(/^\w+/)) == null ? void 0 : _text$slice$match[0];
              assertDescriptor(descriptor, text, pos);
              pos += descriptor.length;
              const repeatModifier = (_text$slice$match$ = (_text$slice$match2 = text.slice(pos).match(/^>\d+/)) == null ? void 0 : _text$slice$match2[0]) != null ? _text$slice$match$ : '';
              pos += repeatModifier.length;
              const releaseSelfModifier = text[pos] === '/' || !repeatModifier && text[pos] === '>' ? text[pos] : '';
              pos += releaseSelfModifier.length;
              const expectedEndBracket = bracketDict[startBracket];
              const endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : '';

              if (!endBracket) {
                throw new Error(getErrorMessage([!repeatModifier && 'repeat modifier', !releaseSelfModifier && 'release modifier', `"${expectedEndBracket}"`].filter(Boolean).join(' or '), text[pos], text));
              }

              pos += endBracket.length;
              return {
                consumedLength: pos,
                descriptor,
                releasePrevious: !!releasePreviousModifier,
                repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
                releaseSelf: hasReleaseSelf(startBracket, descriptor, releaseSelfModifier, repeatModifier)
              };
            }

            function assertDescriptor(descriptor, text, pos) {
              if (!descriptor) {
                throw new Error(getErrorMessage('key descriptor', text[pos], text));
              }
            }

            function getEnumValue(f, key) {
              return f[key];
            }

            function hasReleaseSelf(startBracket, descriptor, releaseSelfModifier, repeatModifier) {
              if (releaseSelfModifier) {
                return releaseSelfModifier === '/';
              }

              if (repeatModifier) {
                return false;
              }

              if (startBracket === '{' && getEnumValue(legacyModifiers, descriptor.toLowerCase())) {
                return false;
              }

              return true;
            }

            function mapLegacyKey(descriptor) {
              var _getEnumValue;

              return (_getEnumValue = getEnumValue(legacyKeyMap, descriptor)) != null ? _getEnumValue : descriptor;
            }

            function getErrorMessage(expected, found, text) {
              return `Expected ${expected} but found "${found != null ? found : ''}" in "${text}"
    See https://github.com/testing-library/user-event/blob/main/README.md#keyboardtext-options
    for more information about how userEvent parses your input.`;
            }

            var getNextKeyDef_1 = /*#__PURE__*/Object.defineProperty({
            	getNextKeyDef: getNextKeyDef_2
            }, '__esModule', {value: true});

            var arrow = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.keydownBehavior = void 0;



            /**
             * This file should contain behavior for arrow keys as described here:
             * https://w3c.github.io/uievents-code/#key-arrowpad-section
             */
            const keydownBehavior = [{
              // TODO: implement for contentEditable
              matches: (keyDef, element) => (keyDef.key === 'ArrowLeft' || keyDef.key === 'ArrowRight') && (0, utils.isElementType)(element, ['input', 'textarea']),
              handle: (keyDef, element) => {
                var _ref;

                const {
                  selectionStart,
                  selectionEnd
                } = (0, utils.getSelectionRange)(element);
                const direction = keyDef.key === 'ArrowLeft' ? -1 : 1;
                const newPos = (_ref = selectionStart === selectionEnd ? (selectionStart != null ? selectionStart :
                /* istanbul ignore next */
                0) + direction : direction < 0 ? selectionStart : selectionEnd) != null ? _ref :
                /* istanbul ignore next */
                0;
                (0, utils.setSelectionRange)(element, newPos, newPos);
              }
            }];
            exports.keydownBehavior = keydownBehavior;
            });

            var carryValue_2 = carryValue;



            function carryValue(element, state, newValue) {
              const value = (0, utils.getValue)(element);
              state.carryValue = value !== newValue && value === '' && (0, utils.hasUnreliableEmptyValue)(element) ? newValue : undefined;
            }

            var carryValue_1 = /*#__PURE__*/Object.defineProperty({
            	carryValue: carryValue_2
            }, '__esModule', {value: true});

            var fireChangeForInputTimeIfValid_2 = fireChangeForInputTimeIfValid;





            function fireChangeForInputTimeIfValid(el, prevValue, timeNewEntry) {
              if ((0, utils.isValidInputTimeValue)(el, timeNewEntry) && prevValue !== timeNewEntry) {
                _dom.fireEvent.change(el, {
                  target: {
                    value: timeNewEntry
                  }
                });
              }
            }

            var fireChangeForInputTimeIfValid_1 = /*#__PURE__*/Object.defineProperty({
            	fireChangeForInputTimeIfValid: fireChangeForInputTimeIfValid_2
            }, '__esModule', {value: true});

            var fireInputEvent_2 = fireInputEvent;





            function fireInputEvent(element, {
              newValue,
              newSelectionStart,
              eventOverrides
            }) {
              // apply the changes before firing the input event, so that input handlers can access the altered dom and selection
              if ((0, utils.isContentEditable)(element)) {
                applyNative(element, 'textContent', newValue);
              } else
                /* istanbul ignore else */
                if ((0, utils.isElementType)(element, ['input', 'textarea'])) {
                  applyNative(element, 'value', newValue);
                } else {
                  // TODO: properly type guard
                  throw new Error('Invalid Element');
                }

              setSelectionRangeAfterInput(element, newSelectionStart);

              _dom.fireEvent.input(element, { ...eventOverrides
              });

              setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart);
            }

            function setSelectionRangeAfterInput(element, newSelectionStart) {
              (0, utils.setSelectionRange)(element, newSelectionStart, newSelectionStart);
            }

            function setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart) {
              const value = (0, utils.getValue)(element); // don't apply this workaround on elements that don't necessarily report the visible value - e.g. number
              // TODO: this could probably be only applied when there is keyboardState.carryValue

              const isUnreliableValue = value === '' && (0, utils.hasUnreliableEmptyValue)(element);

              if (!isUnreliableValue && value === newValue) {
                const {
                  selectionStart
                } = (0, utils.getSelectionRange)(element);

                if (selectionStart === value.length) {
                  // The value was changed as expected, but the cursor was moved to the end
                  // TODO: this could probably be only applied when we work around a framework setter on the element in applyNative
                  (0, utils.setSelectionRange)(element, newSelectionStart, newSelectionStart);
                }
              }
            }

            const initial = Symbol('initial input value/textContent');
            const onBlur = Symbol('onBlur');

            /**
             * React tracks the changes on element properties.
             * This workaround tries to alter the DOM element without React noticing,
             * so that it later picks up the change.
             *
             * @see https://github.com/facebook/react/blob/148f8e497c7d37a3c7ab99f01dec2692427272b1/packages/react-dom/src/client/inputValueTracking.js#L51-L104
             */
            function applyNative(element, propName, propValue) {
              const descriptor = Object.getOwnPropertyDescriptor(element, propName);
              const nativeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName);

              if (descriptor && nativeDescriptor) {
                Object.defineProperty(element, propName, nativeDescriptor);
              } // Keep track of the initial value to determine if a change event should be dispatched.
              // CONSTRAINT: We can not determine what happened between focus event and our first API call.


              if (element[initial] === undefined) {
                element[initial] = String(element[propName]);
              }

              element[propName] = propValue; // Add an event listener for the blur event to the capture phase on the window.
              // CONSTRAINT: Currently there is no cross-platform solution to unshift the event handler stack.
              // Our change event might occur after other event handlers on the blur event have been processed.

              if (!element[onBlur]) {
                var _element$ownerDocumen;

                (_element$ownerDocumen = element.ownerDocument.defaultView) == null ? void 0 : _element$ownerDocumen.addEventListener('blur', element[onBlur] = () => {
                  const initV = element[initial]; // eslint-disable-next-line @typescript-eslint/no-dynamic-delete

                  delete element[onBlur]; // eslint-disable-next-line @typescript-eslint/no-dynamic-delete

                  delete element[initial];

                  if (String(element[propName]) !== initV) {
                    _dom.fireEvent.change(element);
                  }
                }, {
                  capture: true,
                  once: true
                });
              }

              if (descriptor) {
                Object.defineProperty(element, propName, descriptor);
              }
            }

            var fireInputEvent_1 = /*#__PURE__*/Object.defineProperty({
            	fireInputEvent: fireInputEvent_2
            }, '__esModule', {value: true});

            var shared = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });



            Object.keys(carryValue_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === carryValue_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return carryValue_1[key];
                }
              });
            });



            Object.keys(fireChangeForInputTimeIfValid_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === fireChangeForInputTimeIfValid_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return fireChangeForInputTimeIfValid_1[key];
                }
              });
            });



            Object.keys(fireInputEvent_1).forEach(function (key) {
              if (key === "default" || key === "__esModule") return;
              if (key in exports && exports[key] === fireInputEvent_1[key]) return;
              Object.defineProperty(exports, key, {
                enumerable: true,
                get: function () {
                  return fireInputEvent_1[key];
                }
              });
            });
            });

            var control = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.keydownBehavior = void 0;





            /**
             * This file should contain behavior for arrow keys as described here:
             * https://w3c.github.io/uievents-code/#key-controlpad-section
             */
            const keydownBehavior = [{
              matches: (keyDef, element) => (keyDef.key === 'Home' || keyDef.key === 'End') && ((0, utils.isElementType)(element, ['input', 'textarea']) || (0, utils.isContentEditable)(element)),
              handle: (keyDef, element) => {
                // This could probably been improved by collapsing a selection range
                if (keyDef.key === 'Home') {
                  (0, utils.setSelectionRange)(element, 0, 0);
                } else {
                  var _getValue$length, _getValue;

                  const newPos = (_getValue$length = (_getValue = (0, utils.getValue)(element)) == null ? void 0 : _getValue.length) != null ? _getValue$length :
                  /* istanbul ignore next */
                  0;
                  (0, utils.setSelectionRange)(element, newPos, newPos);
                }
              }
            }, {
              matches: (keyDef, element) => (keyDef.key === 'PageUp' || keyDef.key === 'PageDown') && (0, utils.isElementType)(element, ['input']),
              handle: (keyDef, element) => {
                // This could probably been improved by collapsing a selection range
                if (keyDef.key === 'PageUp') {
                  (0, utils.setSelectionRange)(element, 0, 0);
                } else {
                  var _getValue$length2, _getValue2;

                  const newPos = (_getValue$length2 = (_getValue2 = (0, utils.getValue)(element)) == null ? void 0 : _getValue2.length) != null ? _getValue$length2 :
                  /* istanbul ignore next */
                  0;
                  (0, utils.setSelectionRange)(element, newPos, newPos);
                }
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Delete' && (0, utils.isEditable)(element) && !(0, utils.isCursorAtEnd)(element),
              handle: (keDef, element, options, state) => {
                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)('', element, state.carryValue, undefined, 'forward');
                (0, shared.fireInputEvent)(element, {
                  newValue,
                  newSelectionStart,
                  eventOverrides: {
                    inputType: 'deleteContentForward'
                  }
                });
                (0, shared.carryValue)(element, state, newValue);
              }
            }];
            exports.keydownBehavior = keydownBehavior;
            });

            var character = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.keypressBehavior = void 0;







            /**
             * This file should cover the behavior for keys that produce character input
             */
            const keypressBehavior = [{
              matches: (keyDef, element) => {
                var _keyDef$key;

                return ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 && (0, utils.isElementType)(element, 'input', {
                  type: 'time',
                  readOnly: false
                });
              },
              handle: (keyDef, element, options, state) => {
                var _state$carryValue;

                let newEntry = keyDef.key;
                const textToBeTyped = ((_state$carryValue = state.carryValue) != null ? _state$carryValue : '') + newEntry;
                const timeNewEntry = (0, utils.buildTimeValue)(textToBeTyped);

                if ((0, utils.isValidInputTimeValue)(element, timeNewEntry)) {
                  newEntry = timeNewEntry;
                }

                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)(newEntry, element);
                const prevValue = (0, utils.getValue)(element); // this check was provided by fireInputEventIfNeeded
                // TODO: verify if it is even needed by this handler

                if (prevValue !== newValue) {
                  (0, shared.fireInputEvent)(element, {
                    newValue,
                    newSelectionStart,
                    eventOverrides: {
                      data: keyDef.key,
                      inputType: 'insertText'
                    }
                  });
                }

                (0, shared.fireChangeForInputTimeIfValid)(element, prevValue, timeNewEntry);
                state.carryValue = textToBeTyped;
              }
            }, {
              matches: (keyDef, element) => {
                var _keyDef$key2;

                return ((_keyDef$key2 = keyDef.key) == null ? void 0 : _keyDef$key2.length) === 1 && (0, utils.isElementType)(element, 'input', {
                  type: 'date',
                  readOnly: false
                });
              },
              handle: (keyDef, element, options, state) => {
                var _state$carryValue2;

                let newEntry = keyDef.key;
                const textToBeTyped = ((_state$carryValue2 = state.carryValue) != null ? _state$carryValue2 : '') + newEntry;
                const isValidToBeTyped = (0, utils.isValidDateValue)(element, textToBeTyped);

                if (isValidToBeTyped) {
                  newEntry = textToBeTyped;
                }

                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)(newEntry, element);
                const prevValue = (0, utils.getValue)(element); // this check was provided by fireInputEventIfNeeded
                // TODO: verify if it is even needed by this handler

                if (prevValue !== newValue) {
                  (0, shared.fireInputEvent)(element, {
                    newValue,
                    newSelectionStart,
                    eventOverrides: {
                      data: keyDef.key,
                      inputType: 'insertText'
                    }
                  });
                }

                if (isValidToBeTyped) {
                  _dom.fireEvent.change(element, {
                    target: {
                      value: textToBeTyped
                    }
                  });
                }

                state.carryValue = textToBeTyped;
              }
            }, {
              matches: (keyDef, element) => {
                var _keyDef$key3;

                return ((_keyDef$key3 = keyDef.key) == null ? void 0 : _keyDef$key3.length) === 1 && (0, utils.isElementType)(element, 'input', {
                  type: 'number',
                  readOnly: false
                });
              },
              handle: (keyDef, element, options, state) => {
                var _ref, _state$carryValue3, _newValue$match, _newValue$match2;

                if (!/[\d.\-e]/.test(keyDef.key)) {
                  return;
                }

                const oldValue = (_ref = (_state$carryValue3 = state.carryValue) != null ? _state$carryValue3 : (0, utils.getValue)(element)) != null ? _ref :
                /* istanbul ignore next */
                '';
                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)(keyDef.key, element, oldValue); // the browser allows some invalid input but not others
                // it allows up to two '-' at any place before any 'e' or one directly following 'e'
                // it allows one '.' at any place before e

                const valueParts = newValue.split('e', 2);

                if (Number((_newValue$match = newValue.match(/-/g)) == null ? void 0 : _newValue$match.length) > 2 || Number((_newValue$match2 = newValue.match(/\./g)) == null ? void 0 : _newValue$match2.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1])) {
                  return;
                }

                (0, shared.fireInputEvent)(element, {
                  newValue,
                  newSelectionStart,
                  eventOverrides: {
                    data: keyDef.key,
                    inputType: 'insertText'
                  }
                });
                const appliedValue = (0, utils.getValue)(element);

                if (appliedValue === newValue) {
                  state.carryValue = undefined;
                } else {
                  state.carryValue = newValue;
                }
              }
            }, {
              matches: (keyDef, element) => {
                var _keyDef$key4;

                return ((_keyDef$key4 = keyDef.key) == null ? void 0 : _keyDef$key4.length) === 1 && ((0, utils.isElementType)(element, ['input', 'textarea'], {
                  readOnly: false
                }) && !(0, utils.isClickableInput)(element) || (0, utils.isContentEditable)(element)) && (0, utils.getSpaceUntilMaxLength)(element) !== 0;
              },
              handle: (keyDef, element) => {
                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)(keyDef.key, element);
                (0, shared.fireInputEvent)(element, {
                  newValue,
                  newSelectionStart,
                  eventOverrides: {
                    data: keyDef.key,
                    inputType: 'insertText'
                  }
                });
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Enter' && ((0, utils.isElementType)(element, 'textarea', {
                readOnly: false
              }) || (0, utils.isContentEditable)(element)) && (0, utils.getSpaceUntilMaxLength)(element) !== 0,
              handle: (keyDef, element, options, state) => {
                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)('\n', element);
                const inputType = (0, utils.isContentEditable)(element) && !state.modifiers.shift ? 'insertParagraph' : 'insertLineBreak';
                (0, shared.fireInputEvent)(element, {
                  newValue,
                  newSelectionStart,
                  eventOverrides: {
                    inputType
                  }
                });
              }
            }];
            exports.keypressBehavior = keypressBehavior;
            });

            var getKeyEventProps_1 = getKeyEventProps;
            var getMouseEventProps_1 = getMouseEventProps;

            function getKeyEventProps(keyDef, state) {
              var _keyDef$keyCode, _keyDef$key;

              return {
                key: keyDef.key,
                code: keyDef.code,
                altKey: state.modifiers.alt,
                ctrlKey: state.modifiers.ctrl,
                metaKey: state.modifiers.meta,
                shiftKey: state.modifiers.shift,

                /** @deprecated use code instead */
                keyCode: (_keyDef$keyCode = keyDef.keyCode) != null ? _keyDef$keyCode : // istanbul ignore next
                ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 ? keyDef.key.charCodeAt(0) : undefined
              };
            }

            function getMouseEventProps(state) {
              return {
                altKey: state.modifiers.alt,
                ctrlKey: state.modifiers.ctrl,
                metaKey: state.modifiers.meta,
                shiftKey: state.modifiers.shift
              };
            }

            var getEventProps = /*#__PURE__*/Object.defineProperty({
            	getKeyEventProps: getKeyEventProps_1,
            	getMouseEventProps: getMouseEventProps_1
            }, '__esModule', {value: true});

            var functional = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.preKeyupBehavior = exports.preKeydownBehavior = exports.postKeyupBehavior = exports.keyupBehavior = exports.keypressBehavior = exports.keydownBehavior = void 0;









            /**
             * This file should contain behavior for functional keys as described here:
             * https://w3c.github.io/uievents-code/#key-alphanumeric-functional
             */
            const modifierKeys = {
              Alt: 'alt',
              Control: 'ctrl',
              Shift: 'shift',
              Meta: 'meta'
            };
            const preKeydownBehavior = [// modifierKeys switch on the modifier BEFORE the keydown event
            ...Object.entries(modifierKeys).map(([key, modKey]) => ({
              matches: keyDef => keyDef.key === key,
              handle: (keyDef, element, options, state) => {
                state.modifiers[modKey] = true;
              }
            })), // AltGraph produces an extra keydown for Control
            // The modifier does not change
            {
              matches: keyDef => keyDef.key === 'AltGraph',
              handle: (keyDef, element, options, state) => {
                var _options$keyboardMap$;

                const ctrlKeyDef = (_options$keyboardMap$ = options.keyboardMap.find(k => k.key === 'Control')) != null ? _options$keyboardMap$ :
                /* istanbul ignore next */
                {
                  key: 'Control',
                  code: 'Control'
                };

                _dom.fireEvent.keyDown(element, (0, getEventProps.getKeyEventProps)(ctrlKeyDef, state));
              }
            }];
            exports.preKeydownBehavior = preKeydownBehavior;
            const keydownBehavior = [{
              matches: keyDef => keyDef.key === 'CapsLock',
              handle: (keyDef, element, options, state) => {
                state.modifiers.caps = !state.modifiers.caps;
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Backspace' && (0, utils.isEditable)(element) && !(0, utils.isCursorAtStart)(element),
              handle: (keyDef, element, options, state) => {
                const {
                  newValue,
                  newSelectionStart
                } = (0, utils.calculateNewValue)('', element, state.carryValue, undefined, 'backward');
                (0, shared.fireInputEvent)(element, {
                  newValue,
                  newSelectionStart,
                  eventOverrides: {
                    inputType: 'deleteContentBackward'
                  }
                });
                (0, shared.carryValue)(element, state, newValue);
              }
            }];
            exports.keydownBehavior = keydownBehavior;
            const keypressBehavior = [{
              matches: (keyDef, element) => keyDef.key === 'Enter' && (0, utils.isElementType)(element, 'input') && ['checkbox', 'radio'].includes(element.type),
              handle: (keyDef, element) => {
                const form = element.form;

                if ((0, utils.hasFormSubmit)(form)) {
                  _dom.fireEvent.submit(form);
                }
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Enter' && ((0, utils.isClickableInput)(element) || // Links with href defined should handle Enter the same as a click
              (0, utils.isElementType)(element, 'a') && Boolean(element.href)),
              handle: (keyDef, element, options, state) => {
                _dom.fireEvent.click(element, (0, getEventProps.getMouseEventProps)(state));
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Enter' && (0, utils.isElementType)(element, 'input'),
              handle: (keyDef, element) => {
                const form = element.form;

                if (form && (form.querySelectorAll('input').length === 1 || (0, utils.hasFormSubmit)(form))) {
                  _dom.fireEvent.submit(form);
                }
              }
            }];
            exports.keypressBehavior = keypressBehavior;
            const preKeyupBehavior = [// modifierKeys switch off the modifier BEFORE the keyup event
            ...Object.entries(modifierKeys).map(([key, modKey]) => ({
              matches: keyDef => keyDef.key === key,
              handle: (keyDef, element, options, state) => {
                state.modifiers[modKey] = false;
              }
            }))];
            exports.preKeyupBehavior = preKeyupBehavior;
            const keyupBehavior = [{
              matches: (keyDef, element) => keyDef.key === ' ' && (0, utils.isClickableInput)(element),
              handle: (keyDef, element, options, state) => {
                _dom.fireEvent.click(element, (0, getEventProps.getMouseEventProps)(state));
              }
            }];
            exports.keyupBehavior = keyupBehavior;
            const postKeyupBehavior = [// AltGraph produces an extra keyup for Control
            // The modifier does not change
            {
              matches: keyDef => keyDef.key === 'AltGraph',
              handle: (keyDef, element, options, state) => {
                var _options$keyboardMap$2;

                const ctrlKeyDef = (_options$keyboardMap$2 = options.keyboardMap.find(k => k.key === 'Control')) != null ? _options$keyboardMap$2 :
                /* istanbul ignore next */
                {
                  key: 'Control',
                  code: 'Control'
                };

                _dom.fireEvent.keyUp(element, (0, getEventProps.getKeyEventProps)(ctrlKeyDef, state));
              }
            }];
            exports.postKeyupBehavior = postKeyupBehavior;
            });

            var plugins$1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.replaceBehavior = exports.preKeyupBehavior = exports.preKeydownBehavior = exports.postKeyupBehavior = exports.keyupBehavior = exports.keypressBehavior = exports.keydownBehavior = void 0;



            var arrowKeys = _interopRequireWildcard(arrow);

            var controlKeys = _interopRequireWildcard(control);

            var characterKeys = _interopRequireWildcard(character);

            var functionalKeys = _interopRequireWildcard(functional);

            function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

            function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

            const replaceBehavior = [{
              matches: (keyDef, element) => keyDef.key === 'selectall' && (0, utils.isElementType)(element, ['input', 'textarea']),
              handle: (keyDef, element, options, state) => {
                var _state$carryValue;

                (0, utils.setSelectionRange)(element, 0, ((_state$carryValue = state.carryValue) != null ? _state$carryValue : element.value).length);
              }
            }];
            exports.replaceBehavior = replaceBehavior;
            const preKeydownBehavior = [...functionalKeys.preKeydownBehavior];
            exports.preKeydownBehavior = preKeydownBehavior;
            const keydownBehavior = [...arrowKeys.keydownBehavior, ...controlKeys.keydownBehavior, ...functionalKeys.keydownBehavior];
            exports.keydownBehavior = keydownBehavior;
            const keypressBehavior = [...functionalKeys.keypressBehavior, ...characterKeys.keypressBehavior];
            exports.keypressBehavior = keypressBehavior;
            const preKeyupBehavior = [...functionalKeys.preKeyupBehavior];
            exports.preKeyupBehavior = preKeyupBehavior;
            const keyupBehavior = [...functionalKeys.keyupBehavior];
            exports.keyupBehavior = keyupBehavior;
            const postKeyupBehavior = [...functionalKeys.postKeyupBehavior];
            exports.postKeyupBehavior = postKeyupBehavior;
            });

            var keyboardImplementation_2 = keyboardImplementation;
            var releaseAllKeys_1 = releaseAllKeys;







            var plugins = _interopRequireWildcard(plugins$1);



            function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

            function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

            async function keyboardImplementation(text, options, state) {
              var _state$repeatKey;

              const {
                document
              } = options;

              const getCurrentElement = () => getActive(document);

              const {
                keyDef,
                consumedLength,
                releasePrevious,
                releaseSelf,
                repeat
              } = (_state$repeatKey = state.repeatKey) != null ? _state$repeatKey : (0, getNextKeyDef_1.getNextKeyDef)(text, options);
              const replace = applyPlugins(plugins.replaceBehavior, keyDef, getCurrentElement(), options, state);

              if (!replace) {
                const pressed = state.pressed.find(p => p.keyDef === keyDef); // Release the key automatically if it was pressed before.
                // Do not release the key on iterations on `state.repeatKey`.

                if (pressed && !state.repeatKey) {
                  keyup(keyDef, getCurrentElement, options, state, pressed.unpreventedDefault);
                }

                if (!releasePrevious) {
                  const unpreventedDefault = keydown(keyDef, getCurrentElement, options, state);

                  if (unpreventedDefault && hasKeyPress(keyDef, state)) {
                    keypress(keyDef, getCurrentElement, options, state);
                  } // Release the key only on the last iteration on `state.repeatKey`.


                  if (releaseSelf && repeat <= 1) {
                    keyup(keyDef, getCurrentElement, options, state, unpreventedDefault);
                  }
                }
              }

              if (repeat > 1) {
                state.repeatKey = {
                  // don't consume again on the next iteration
                  consumedLength: 0,
                  keyDef,
                  releasePrevious,
                  releaseSelf,
                  repeat: repeat - 1
                };
              } else {
                delete state.repeatKey;
              }

              if (text.length > consumedLength || repeat > 1) {
                if (options.delay > 0) {
                  await (0, utils.wait)(options.delay);
                }

                return keyboardImplementation(text.slice(consumedLength), options, state);
              }

              return void undefined;
            }

            function getActive(document) {
              var _getActiveElement;

              return (_getActiveElement = (0, utils.getActiveElement)(document)) != null ? _getActiveElement :
              /* istanbul ignore next */
              document.body;
            }

            function releaseAllKeys(options, state) {
              const getCurrentElement = () => getActive(options.document);

              for (const k of state.pressed) {
                keyup(k.keyDef, getCurrentElement, options, state, k.unpreventedDefault);
              }
            }

            function keydown(keyDef, getCurrentElement, options, state) {
              const element = getCurrentElement(); // clear carried characters when focus is moved

              if (element !== state.activeElement) {
                state.carryValue = undefined;
                state.carryChar = '';
              }

              state.activeElement = element;
              applyPlugins(plugins.preKeydownBehavior, keyDef, element, options, state);

              const unpreventedDefault = _dom.fireEvent.keyDown(element, (0, getEventProps.getKeyEventProps)(keyDef, state));

              state.pressed.push({
                keyDef,
                unpreventedDefault
              });

              if (unpreventedDefault) {
                // all default behavior like keypress/submit etc is applied to the currentElement
                applyPlugins(plugins.keydownBehavior, keyDef, getCurrentElement(), options, state);
              }

              return unpreventedDefault;
            }

            function keypress(keyDef, getCurrentElement, options, state) {
              const element = getCurrentElement();

              const unpreventedDefault = _dom.fireEvent.keyPress(element, (0, getEventProps.getKeyEventProps)(keyDef, state));

              if (unpreventedDefault) {
                applyPlugins(plugins.keypressBehavior, keyDef, getCurrentElement(), options, state);
              }
            }

            function keyup(keyDef, getCurrentElement, options, state, unprevented) {
              const element = getCurrentElement();
              applyPlugins(plugins.preKeyupBehavior, keyDef, element, options, state);

              const unpreventedDefault = _dom.fireEvent.keyUp(element, (0, getEventProps.getKeyEventProps)(keyDef, state));

              if (unprevented && unpreventedDefault) {
                applyPlugins(plugins.keyupBehavior, keyDef, getCurrentElement(), options, state);
              }

              state.pressed = state.pressed.filter(k => k.keyDef !== keyDef);
              applyPlugins(plugins.postKeyupBehavior, keyDef, element, options, state);
            }

            function applyPlugins(pluginCollection, keyDef, element, options, state) {
              const plugin = pluginCollection.find(p => p.matches(keyDef, element, options, state));

              if (plugin) {
                plugin.handle(keyDef, element, options, state);
              }

              return !!plugin;
            }

            function hasKeyPress(keyDef, state) {
              var _keyDef$key;

              return (((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 || keyDef.key === 'Enter') && !state.modifiers.ctrl && !state.modifiers.alt;
            }

            var keyboardImplementation_1 = /*#__PURE__*/Object.defineProperty({
            	keyboardImplementation: keyboardImplementation_2,
            	releaseAllKeys: releaseAllKeys_1
            }, '__esModule', {value: true});

            var types = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.DOM_KEY_LOCATION = void 0;

            /**
             * @internal Do not create/alter this by yourself as this type might be subject to changes.
             */
            let DOM_KEY_LOCATION;
            exports.DOM_KEY_LOCATION = DOM_KEY_LOCATION;

            (function (DOM_KEY_LOCATION) {
              DOM_KEY_LOCATION[DOM_KEY_LOCATION["STANDARD"] = 0] = "STANDARD";
              DOM_KEY_LOCATION[DOM_KEY_LOCATION["LEFT"] = 1] = "LEFT";
              DOM_KEY_LOCATION[DOM_KEY_LOCATION["RIGHT"] = 2] = "RIGHT";
              DOM_KEY_LOCATION[DOM_KEY_LOCATION["NUMPAD"] = 3] = "NUMPAD";
            })(DOM_KEY_LOCATION || (exports.DOM_KEY_LOCATION = DOM_KEY_LOCATION = {}));
            });

            var keyMap = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.defaultKeyMap = void 0;



            /**
             * Mapping for a default US-104-QWERTY keyboard
             */
            const defaultKeyMap = [// alphanumeric keys
            ...'0123456789'.split('').map(c => ({
              code: `Digit${c}`,
              key: c
            })), ...')!@#$%^&*('.split('').map((c, i) => ({
              code: `Digit${i}`,
              key: c,
              shiftKey: true
            })), ...'abcdefghijklmnopqrstuvwxyz'.split('').map(c => ({
              code: `Key${c.toUpperCase()}`,
              key: c
            })), ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => ({
              code: `Key${c}`,
              key: c,
              shiftKey: true
            })), // alphanumeric block - functional
            {
              code: 'Space',
              key: ' '
            }, {
              code: 'AltLeft',
              key: 'Alt',
              location: types.DOM_KEY_LOCATION.LEFT,
              keyCode: 18
            }, {
              code: 'AltRight',
              key: 'Alt',
              location: types.DOM_KEY_LOCATION.RIGHT,
              keyCode: 18
            }, {
              code: 'ShiftLeft',
              key: 'Shift',
              location: types.DOM_KEY_LOCATION.LEFT,
              keyCode: 16
            }, {
              code: 'ShiftRight',
              key: 'Shift',
              location: types.DOM_KEY_LOCATION.RIGHT,
              keyCode: 16
            }, {
              code: 'ControlLeft',
              key: 'Control',
              location: types.DOM_KEY_LOCATION.LEFT,
              keyCode: 17
            }, {
              code: 'ControlRight',
              key: 'Control',
              location: types.DOM_KEY_LOCATION.RIGHT,
              keyCode: 17
            }, {
              code: 'MetaLeft',
              key: 'Meta',
              location: types.DOM_KEY_LOCATION.LEFT,
              keyCode: 93
            }, {
              code: 'MetaRight',
              key: 'Meta',
              location: types.DOM_KEY_LOCATION.RIGHT,
              keyCode: 93
            }, {
              code: 'OSLeft',
              key: 'OS',
              location: types.DOM_KEY_LOCATION.LEFT,
              keyCode: 91
            }, {
              code: 'OSRight',
              key: 'OS',
              location: types.DOM_KEY_LOCATION.RIGHT,
              keyCode: 91
            }, {
              code: 'CapsLock',
              key: 'CapsLock',
              keyCode: 20
            }, {
              code: 'Backspace',
              key: 'Backspace',
              keyCode: 8
            }, {
              code: 'Enter',
              key: 'Enter',
              keyCode: 13
            }, // function
            {
              code: 'Escape',
              key: 'Escape',
              keyCode: 27
            }, // arrows
            {
              code: 'ArrowUp',
              key: 'ArrowUp',
              keyCode: 38
            }, {
              code: 'ArrowDown',
              key: 'ArrowDown',
              keyCode: 40
            }, {
              code: 'ArrowLeft',
              key: 'ArrowLeft',
              keyCode: 37
            }, {
              code: 'ArrowRight',
              key: 'ArrowRight',
              keyCode: 39
            }, // control pad
            {
              code: 'Home',
              key: 'Home',
              keyCode: 36
            }, {
              code: 'End',
              key: 'End',
              keyCode: 35
            }, {
              code: 'Delete',
              key: 'Delete',
              keyCode: 46
            }, {
              code: 'PageUp',
              key: 'PageUp',
              keyCode: 33
            }, {
              code: 'PageDown',
              key: 'PageDown',
              keyCode: 34
            } // TODO: add mappings
            ];
            exports.defaultKeyMap = defaultKeyMap;
            });

            var specialCharMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.specialCharMap = void 0;

            /**
             * @deprecated This list of strings with special meaning is no longer necessary
             * as we've introduced a standardized way to describe any keystroke for `userEvent`.
             * @see https://testing-library.com/docs/ecosystem-user-event#keyboardtext-options
             */
            const specialCharMap = {
              arrowLeft: '{arrowleft}',
              arrowRight: '{arrowright}',
              arrowDown: '{arrowdown}',
              arrowUp: '{arrowup}',
              enter: '{enter}',
              escape: '{esc}',
              delete: '{del}',
              backspace: '{backspace}',
              home: '{home}',
              end: '{end}',
              selectAll: '{selectall}',
              space: '{space}',
              whitespace: ' ',
              pageUp: '{pageUp}',
              pageDown: '{pageDown}'
            };
            exports.specialCharMap = specialCharMap;
            });

            var keyboard_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.keyboard = keyboard;
            exports.keyboardImplementationWrapper = keyboardImplementationWrapper;
            Object.defineProperty(exports, "specialCharMap", {
              enumerable: true,
              get: function () {
                return specialCharMap_1.specialCharMap;
              }
            });









            function keyboard(text, options) {
              var _options$delay;

              const {
                promise,
                state
              } = keyboardImplementationWrapper(text, options);

              if (((_options$delay = options == null ? void 0 : options.delay) != null ? _options$delay : 0) > 0) {
                return (0, _dom.getConfig)().asyncWrapper(() => promise.then(() => state));
              } else {
                // prevent users from dealing with UnhandledPromiseRejectionWarning in sync call
                promise.catch(console.error);
                return state;
              }
            }

            function keyboardImplementationWrapper(text, config = {}) {
              const {
                keyboardState: state = createKeyboardState(),
                delay = 0,
                document: doc = document,
                autoModify = false,
                keyboardMap = keyMap.defaultKeyMap
              } = config;
              const options = {
                delay,
                document: doc,
                autoModify,
                keyboardMap
              };
              return {
                promise: (0, keyboardImplementation_1.keyboardImplementation)(text, options, state),
                state,
                releaseAllKeys: () => (0, keyboardImplementation_1.releaseAllKeys)(options, state)
              };
            }

            function createKeyboardState() {
              return {
                activeElement: null,
                pressed: [],
                carryChar: '',
                modifiers: {
                  alt: false,
                  caps: false,
                  ctrl: false,
                  meta: false,
                  shift: false
                }
              };
            }
            });

            var typeImplementation_2 = typeImplementation;







            async function typeImplementation(element, text, {
              delay,
              skipClick = false,
              skipAutoClose = false,
              initialSelectionStart = undefined,
              initialSelectionEnd = undefined
            }) {
              // TODO: properly type guard
              // we use this workaround for now to prevent changing behavior
              if (element.disabled) return;
              if (!skipClick) (0, click_1.click)(element); // The focused element could change between each event, so get the currently active element each time

              const currentElement = () => (0, utils.getActiveElement)(element.ownerDocument); // by default, a new element has its selection start and end at 0
              // but most of the time when people call "type", they expect it to type
              // at the end of the current input value. So, if the selection start
              // and end are both the default of 0, then we'll go ahead and change
              // them to the length of the current value.
              // the only time it would make sense to pass the initialSelectionStart or
              // initialSelectionEnd is if you have an input with a value and want to
              // explicitly start typing with the cursor at 0. Not super common.


              const value = (0, utils.getValue)(currentElement());
              const {
                selectionStart,
                selectionEnd
              } = (0, utils.getSelectionRange)(element);

              if (value != null && (selectionStart === null || selectionStart === 0) && (selectionEnd === null || selectionEnd === 0)) {
                (0, utils.setSelectionRange)(currentElement(), initialSelectionStart != null ? initialSelectionStart : value.length, initialSelectionEnd != null ? initialSelectionEnd : value.length);
              }

              const {
                promise,
                releaseAllKeys
              } = (0, keyboard_1.keyboardImplementationWrapper)(text, {
                delay,
                document: element.ownerDocument
              });

              if (delay > 0) {
                await promise;
              }

              if (!skipAutoClose) {
                releaseAllKeys();
              } // eslint-disable-next-line consistent-return -- we need to return the internal Promise so that it is catchable if we don't await


              return promise;
            }

            var typeImplementation_1 = /*#__PURE__*/Object.defineProperty({
            	typeImplementation: typeImplementation_2
            }, '__esModule', {value: true});

            var type_2 = type;





            // this needs to be wrapped in the event/asyncWrapper for React's act and angular's change detection
            // depending on whether it will be async.
            function type(element, text, {
              delay = 0,
              ...options
            } = {}) {
              // we do not want to wrap in the asyncWrapper if we're not
              // going to actually be doing anything async, so we only wrap
              // if the delay is greater than 0
              if (delay > 0) {
                return (0, _dom.getConfig)().asyncWrapper(() => (0, typeImplementation_1.typeImplementation)(element, text, {
                  delay,
                  ...options
                }));
              } else {
                return void (0, typeImplementation_1.typeImplementation)(element, text, {
                  delay,
                  ...options
                }) // prevents users from dealing with UnhandledPromiseRejectionWarning
                .catch(console.error);
              }
            }

            var type_1 = /*#__PURE__*/Object.defineProperty({
            	type: type_2
            }, '__esModule', {value: true});

            var clear_2 = clear;





            function clear(element) {
              var _element$selectionSta, _element$selectionEnd;

              if (!(0, utils.isElementType)(element, ['input', 'textarea'])) {
                // TODO: support contenteditable
                throw new Error('clear currently only supports input and textarea elements.');
              }

              if ((0, utils.isDisabled)(element)) {
                return;
              } // TODO: track the selection range ourselves so we don't have to do this input "type" trickery
              // just like cypress does: https://github.com/cypress-io/cypress/blob/8d7f1a0bedc3c45a2ebf1ff50324b34129fdc683/packages/driver/src/dom/selection.ts#L16-L37


              const elementType = element.type;

              if (elementType !== 'textarea') {
                element.type = 'text';
              }

              (0, type_1.type)(element, '{selectall}{del}', {
                delay: 0,
                initialSelectionStart: (_element$selectionSta = element.selectionStart) != null ? _element$selectionSta :
                /* istanbul ignore next */
                undefined,
                initialSelectionEnd: (_element$selectionEnd = element.selectionEnd) != null ? _element$selectionEnd :
                /* istanbul ignore next */
                undefined
              });

              if (elementType !== 'textarea') {
                element.type = elementType;
              }
            }

            var clear_1 = /*#__PURE__*/Object.defineProperty({
            	clear: clear_2
            }, '__esModule', {value: true});

            var tab_2 = tab;









            function getNextElement(currentIndex, shift, elements, focusTrap) {
              if ((0, utils.isDocument)(focusTrap) && (currentIndex === 0 && shift || currentIndex === elements.length - 1 && !shift)) {
                return focusTrap.body;
              }

              const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
              const defaultIndex = shift ? elements.length - 1 : 0;
              return elements[nextIndex] || elements[defaultIndex];
            }

            function tab({
              shift = false,
              focusTrap
            } = {}) {
              var _focusTrap$ownerDocum, _focusTrap;

              const doc = (_focusTrap$ownerDocum = (_focusTrap = focusTrap) == null ? void 0 : _focusTrap.ownerDocument) != null ? _focusTrap$ownerDocum : document;
              const previousElement = (0, utils.getActiveElement)(doc);

              if (!focusTrap) {
                focusTrap = doc;
              }

              const focusableElements = focusTrap.querySelectorAll(utils.FOCUSABLE_SELECTOR);
              const enabledElements = Array.from(focusableElements).filter(el => el === previousElement || el.getAttribute('tabindex') !== '-1' && !(0, utils.isDisabled)(el) && // Hidden elements are not tabable
              (0, utils.isVisible)(el));
              if (enabledElements.length === 0) return;
              const orderedElements = enabledElements.map((el, idx) => ({
                el,
                idx
              })).sort((a, b) => {
                // tabindex has no effect if the active element has tabindex="-1"
                if (previousElement && previousElement.getAttribute('tabindex') === '-1') {
                  return a.idx - b.idx;
                }

                const tabIndexA = Number(a.el.getAttribute('tabindex'));
                const tabIndexB = Number(b.el.getAttribute('tabindex'));
                const diff = tabIndexA - tabIndexB;
                return diff === 0 ? a.idx - b.idx : diff;
              }).map(({
                el
              }) => el); // TODO: verify/remove type casts

              const checkedRadio = {};
              let prunedElements = [];
              orderedElements.forEach(currentElement => {
                // For radio groups keep only the active radio
                // If there is no active radio, keep only the checked radio
                // If there is no checked radio, treat like everything else
                const el = currentElement;

                if (el.type === 'radio' && el.name) {
                  // If the active element is part of the group, add only that
                  const prev = previousElement;

                  if (prev && prev.type === el.type && prev.name === el.name) {
                    if (el === prev) {
                      prunedElements.push(el);
                    }

                    return;
                  } // If we stumble upon a checked radio, remove the others


                  if (el.checked) {
                    prunedElements = prunedElements.filter(e => e.type !== el.type || e.name !== el.name);
                    prunedElements.push(el);
                    checkedRadio[el.name] = el;
                    return;
                  } // If we already found the checked one, skip


                  if (typeof checkedRadio[el.name] !== 'undefined') {
                    return;
                  }
                }

                prunedElements.push(el);
              });
              const index = prunedElements.findIndex(el => el === previousElement);
              const nextElement = getNextElement(index, shift, prunedElements, focusTrap);
              const shiftKeyInit = {
                key: 'Shift',
                keyCode: 16,
                shiftKey: true
              };
              const tabKeyInit = {
                key: 'Tab',
                keyCode: 9,
                shiftKey: shift
              };
              let continueToTab = true; // not sure how to make it so there's no previous element...
              // istanbul ignore else

              if (previousElement) {
                // preventDefault on the shift key makes no difference
                if (shift) _dom.fireEvent.keyDown(previousElement, { ...shiftKeyInit
                });
                continueToTab = _dom.fireEvent.keyDown(previousElement, { ...tabKeyInit
                });
              }

              const keyUpTarget = !continueToTab && previousElement ? previousElement : nextElement;

              if (continueToTab) {
                if (nextElement === doc.body) {
                  /* istanbul ignore else */
                  if (previousElement) {
                    (0, blur_1.blur)(previousElement);
                  }
                } else {
                  (0, focus_1.focus)(nextElement);
                }
              }

              _dom.fireEvent.keyUp(keyUpTarget, { ...tabKeyInit
              });

              if (shift) {
                _dom.fireEvent.keyUp(keyUpTarget, { ...shiftKeyInit,
                  shiftKey: false
                });
              }
            }
            /*
            eslint
              complexity: "off",
              max-statements: "off",
            */

            var tab_1 = /*#__PURE__*/Object.defineProperty({
            	tab: tab_2
            }, '__esModule', {value: true});

            var upload_2 = upload;











            function upload(element, fileOrFiles, init, {
              applyAccept = false
            } = {}) {
              var _input$files;

              const input = (0, utils.isElementType)(element, 'label') ? element.control : element;

              if (!input || !(0, utils.isElementType)(input, 'input', {
                type: 'file'
              })) {
                throw new TypeError(`The ${input === element ? 'given' : 'associated'} ${input == null ? void 0 : input.tagName} element does not accept file uploads`);
              }

              if ((0, utils.isDisabled)(element)) return;
              (0, click_1.click)(element, init == null ? void 0 : init.clickInit);
              const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]).filter(file => !applyAccept || isAcceptableFile(file, input.accept)).slice(0, input.multiple ? undefined : 1); // blur fires when the file selector pops up

              (0, blur_1.blur)(element); // focus fires when they make their selection

              (0, focus_1.focus)(element); // do not fire an input event if the file selection does not change

              if (files.length === ((_input$files = input.files) == null ? void 0 : _input$files.length) && files.every((f, i) => {
                var _input$files2;

                return f === ((_input$files2 = input.files) == null ? void 0 : _input$files2.item(i));
              })) {
                return;
              } // the event fired in the browser isn't actually an "input" or "change" event
              // but a new Event with a type set to "input" and "change"
              // Kinda odd...


              const inputFiles = { ...files,
                length: files.length,
                item: index => files[index],

                [Symbol.iterator]() {
                  let i = 0;
                  return {
                    next: () => ({
                      done: i >= files.length,
                      value: files[i++]
                    })
                  };
                }

              };
              (0, _dom.fireEvent)(input, (0, _dom.createEvent)('input', input, {
                target: {
                  files: inputFiles
                },
                bubbles: true,
                cancelable: false,
                composed: true
              }));

              _dom.fireEvent.change(input, {
                target: {
                  files: inputFiles
                },
                ...(init == null ? void 0 : init.changeInit)
              });
            }

            function isAcceptableFile(file, accept) {
              if (!accept) {
                return true;
              }

              const wildcards = ['audio/*', 'image/*', 'video/*'];
              return accept.split(',').some(acceptToken => {
                if (acceptToken.startsWith('.')) {
                  // tokens starting with a dot represent a file extension
                  return file.name.endsWith(acceptToken);
                } else if (wildcards.includes(acceptToken)) {
                  return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
                }

                return file.type === acceptToken;
              });
            }

            var upload_1 = /*#__PURE__*/Object.defineProperty({
            	upload: upload_2
            }, '__esModule', {value: true});

            var selectOptions_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.selectOptions = exports.deselectOptions = void 0;











            function selectOptionsBase(newValue, select, values, init, {
              skipPointerEventsCheck = false
            } = {}) {
              if (!newValue && !select.multiple) {
                throw (0, _dom.getConfig)().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select);
              }

              const valArray = Array.isArray(values) ? values : [values];
              const allOptions = Array.from(select.querySelectorAll('option, [role="option"]'));
              const selectedOptions = valArray.map(val => {
                if (typeof val !== 'string' && allOptions.includes(val)) {
                  return val;
                } else {
                  const matchingOption = allOptions.find(o => o.value === val || o.innerHTML === val);

                  if (matchingOption) {
                    return matchingOption;
                  } else {
                    throw (0, _dom.getConfig)().getElementError(`Value "${String(val)}" not found in options`, select);
                  }
                }
              }).filter(option => !(0, utils.isDisabled)(option));
              if ((0, utils.isDisabled)(select) || !selectedOptions.length) return;

              if ((0, utils.isElementType)(select, 'select')) {
                if (select.multiple) {
                  for (const option of selectedOptions) {
                    const withPointerEvents = skipPointerEventsCheck ? true : (0, utils.hasPointerEvents)(option); // events fired for multiple select are weird. Can't use hover...

                    if (withPointerEvents) {
                      _dom.fireEvent.pointerOver(option, init);

                      _dom.fireEvent.pointerEnter(select, init);

                      _dom.fireEvent.mouseOver(option);

                      _dom.fireEvent.mouseEnter(select);

                      _dom.fireEvent.pointerMove(option, init);

                      _dom.fireEvent.mouseMove(option, init);

                      _dom.fireEvent.pointerDown(option, init);

                      _dom.fireEvent.mouseDown(option, init);
                    }

                    (0, focus_1.focus)(select);

                    if (withPointerEvents) {
                      _dom.fireEvent.pointerUp(option, init);

                      _dom.fireEvent.mouseUp(option, init);
                    }

                    selectOption(option);

                    if (withPointerEvents) {
                      _dom.fireEvent.click(option, init);
                    }
                  }
                } else if (selectedOptions.length === 1) {
                  const withPointerEvents = skipPointerEventsCheck ? true : (0, utils.hasPointerEvents)(select); // the click to open the select options

                  if (withPointerEvents) {
                    (0, click_1.click)(select, init, {
                      skipPointerEventsCheck
                    });
                  } else {
                    (0, focus_1.focus)(select);
                  }

                  selectOption(selectedOptions[0]);

                  if (withPointerEvents) {
                    // the browser triggers another click event on the select for the click on the option
                    // this second click has no 'down' phase
                    _dom.fireEvent.pointerOver(select, init);

                    _dom.fireEvent.pointerEnter(select, init);

                    _dom.fireEvent.mouseOver(select);

                    _dom.fireEvent.mouseEnter(select);

                    _dom.fireEvent.pointerUp(select, init);

                    _dom.fireEvent.mouseUp(select, init);

                    _dom.fireEvent.click(select, init);
                  }
                } else {
                  throw (0, _dom.getConfig)().getElementError(`Cannot select multiple options on a non-multiple select`, select);
                }
              } else if (select.getAttribute('role') === 'listbox') {
                selectedOptions.forEach(option => {
                  (0, hover_1.hover)(option, init, {
                    skipPointerEventsCheck
                  });
                  (0, click_1.click)(option, init, {
                    skipPointerEventsCheck
                  });
                  (0, hover_1.unhover)(option, init, {
                    skipPointerEventsCheck
                  });
                });
              } else {
                throw (0, _dom.getConfig)().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select);
              }

              function selectOption(option) {
                option.selected = newValue;
                (0, _dom.fireEvent)(select, (0, _dom.createEvent)('input', select, {
                  bubbles: true,
                  cancelable: false,
                  composed: true,
                  ...init
                }));

                _dom.fireEvent.change(select, init);
              }
            }

            const selectOptions = selectOptionsBase.bind(null, true);
            exports.selectOptions = selectOptions;
            const deselectOptions = selectOptionsBase.bind(null, false);
            exports.deselectOptions = deselectOptions;
            });

            var paste_2 = paste;





            function isSupportedElement(element) {
              return (0, utils.isElementType)(element, 'input') && Boolean(utils.editableInputTypes[element.type]) || (0, utils.isElementType)(element, 'textarea');
            }

            function paste(element, text, init, {
              initialSelectionStart,
              initialSelectionEnd
            } = {}) {
              // TODO: implement for contenteditable
              if (!isSupportedElement(element)) {
                throw new TypeError(`The given ${element.tagName} element is currently unsupported.
      A PR extending this implementation would be very much welcome at https://github.com/testing-library/user-event`);
              }

              if ((0, utils.isDisabled)(element)) {
                return;
              }

              (0, utils.eventWrapper)(() => element.focus()); // by default, a new element has it's selection start and end at 0
              // but most of the time when people call "paste", they expect it to paste
              // at the end of the current input value. So, if the selection start
              // and end are both the default of 0, then we'll go ahead and change
              // them to the length of the current value.
              // the only time it would make sense to pass the initialSelectionStart or
              // initialSelectionEnd is if you have an input with a value and want to
              // explicitely start typing with the cursor at 0. Not super common.

              if (element.selectionStart === 0 && element.selectionEnd === 0) {
                (0, utils.setSelectionRange)(element, initialSelectionStart != null ? initialSelectionStart : element.value.length, initialSelectionEnd != null ? initialSelectionEnd : element.value.length);
              }

              _dom.fireEvent.paste(element, init);

              if (element.readOnly) {
                return;
              }

              text = text.substr(0, (0, utils.getSpaceUntilMaxLength)(element));
              const {
                newValue,
                newSelectionStart
              } = (0, utils.calculateNewValue)(text, element);

              _dom.fireEvent.input(element, {
                inputType: 'insertFromPaste',
                target: {
                  value: newValue
                }
              });

              (0, utils.setSelectionRange)(element, // TODO: investigate why the selection caused by invalid parameters was expected
              {
                newSelectionStart,
                selectionEnd: newSelectionStart
              }, {});
            }

            var paste_1 = /*#__PURE__*/Object.defineProperty({
            	paste: paste_2
            }, '__esModule', {value: true});

            var dist = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.default = void 0;
            Object.defineProperty(exports, "specialChars", {
              enumerable: true,
              get: function () {
                return keyboard_1.specialCharMap;
              }
            });



















            const userEvent = {
              click: click_1.click,
              dblClick: click_1.dblClick,
              type: type_1.type,
              clear: clear_1.clear,
              tab: tab_1.tab,
              hover: hover_1.hover,
              unhover: hover_1.unhover,
              upload: upload_1.upload,
              selectOptions: selectOptions_1.selectOptions,
              deselectOptions: selectOptions_1.deselectOptions,
              paste: paste_1.paste,
              keyboard: keyboard_1.keyboard
            };
            var _default = userEvent;
            exports.default = _default;
            });

            var index = /*@__PURE__*/getDefaultExportFromCjs(dist);

            var eventMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.eventMap = exports.eventAliasMap = void 0;
            const eventMap = {
              // Clipboard Events
              copy: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              cut: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              paste: {
                EventType: 'ClipboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Composition Events
              compositionEnd: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              compositionStart: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              compositionUpdate: {
                EventType: 'CompositionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Keyboard Events
              keyDown: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              keyPress: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              keyUp: {
                EventType: 'KeyboardEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  charCode: 0,
                  composed: true
                }
              },
              // Focus Events
              focus: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              blur: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              focusIn: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              focusOut: {
                EventType: 'FocusEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              // Form Events
              change: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              input: {
                EventType: 'InputEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              invalid: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: true
                }
              },
              submit: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              reset: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              // Mouse Events
              click: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  button: 0,
                  composed: true
                }
              },
              contextMenu: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dblClick: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              drag: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragEnd: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragEnter: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragExit: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragLeave: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              dragOver: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              dragStart: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              drop: {
                EventType: 'DragEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseDown: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseEnter: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              mouseLeave: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false,
                  composed: true
                }
              },
              mouseMove: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseOut: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseOver: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              mouseUp: {
                EventType: 'MouseEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Selection Events
              select: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // Touch Events
              touchCancel: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              touchEnd: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              touchMove: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              touchStart: {
                EventType: 'TouchEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // UI Events
              resize: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              scroll: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Wheel Events
              wheel: {
                EventType: 'WheelEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              // Media Events
              abort: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              canPlay: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              canPlayThrough: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              durationChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              emptied: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              encrypted: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              ended: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadedData: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadedMetadata: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              loadStart: {
                EventType: 'ProgressEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              pause: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              play: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              playing: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              progress: {
                EventType: 'ProgressEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              rateChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              seeked: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              seeking: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              stalled: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              suspend: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              timeUpdate: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              volumeChange: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              waiting: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Image Events
              load: {
                EventType: 'UIEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              error: {
                EventType: 'Event',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              // Animation Events
              animationStart: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              animationEnd: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              animationIteration: {
                EventType: 'AnimationEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // Transition Events
              transitionCancel: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              transitionEnd: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
                }
              },
              transitionRun: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              transitionStart: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              },
              // pointer events
              pointerOver: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerEnter: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              pointerDown: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerMove: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerUp: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerCancel: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              pointerOut: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true,
                  composed: true
                }
              },
              pointerLeave: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: false,
                  cancelable: false
                }
              },
              gotPointerCapture: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              lostPointerCapture: {
                EventType: 'PointerEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false,
                  composed: true
                }
              },
              // history events
              popState: {
                EventType: 'PopStateEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: false
                }
              }
            };
            exports.eventMap = eventMap;
            const eventAliasMap = {
              doubleClick: 'dblClick'
            };
            exports.eventAliasMap = eventAliasMap;
            });

            // Copyright 2021 Workiva Inc.

            configure({
              testIdAttribute: 'data-test-id',
              getElementError: buildJsGetElementError
            }); // In order to allow us to interop `fireEvent` as both a function, and an object with function values,
            // we need two vars exported so we can `@JS()` annotate each one separately with the type Dart expects.

            var fireEventObj = fireEvent;

            exports.act = act;
            exports.buildJsGetElementError = buildJsGetElementError;
            exports.buildQueries = buildQueries;
            exports.cleanup = cleanup;
            exports.configure = configure;
            exports.createEvent = createEvent;
            exports.eventMap = eventMap_1.eventMap;
            exports.findAllByAltText = findAllByAltText;
            exports.findAllByDisplayValue = findAllByDisplayValue;
            exports.findAllByLabelText = findAllByLabelText;
            exports.findAllByPlaceholderText = findAllByPlaceholderText;
            exports.findAllByRole = findAllByRole;
            exports.findAllByTestId = findAllByTestId;
            exports.findAllByText = findAllByText;
            exports.findAllByTitle = findAllByTitle;
            exports.findByAltText = findByAltText;
            exports.findByDisplayValue = findByDisplayValue;
            exports.findByLabelText = findByLabelText;
            exports.findByPlaceholderText = findByPlaceholderText;
            exports.findByRole = findByRole;
            exports.findByTestId = findByTestId;
            exports.findByText = findByText;
            exports.findByTitle = findByTitle;
            exports.fireEvent = fireEvent;
            exports.fireEventObj = fireEventObj;
            exports.getAllByAltText = getAllByAltText;
            exports.getAllByDisplayValue = getAllByDisplayValue;
            exports.getAllByLabelText = getAllByLabelTextWithSuggestions;
            exports.getAllByPlaceholderText = getAllByPlaceholderText;
            exports.getAllByRole = getAllByRole;
            exports.getAllByTestId = getAllByTestId;
            exports.getAllByText = getAllByText;
            exports.getAllByTitle = getAllByTitle;
            exports.getByAltText = getByAltText;
            exports.getByDisplayValue = getByDisplayValue;
            exports.getByLabelText = getByLabelTextWithSuggestions;
            exports.getByPlaceholderText = getByPlaceholderText;
            exports.getByRole = getByRole;
            exports.getByTestId = getByTestId;
            exports.getByText = getByText;
            exports.getByTitle = getByTitle;
            exports.getConfig = getConfig;
            exports.getDefaultNormalizer = getDefaultNormalizer;
            exports.getElementError = getElementError;
            exports.getMultipleElementsFoundError = getMultipleElementsFoundError;
            exports.getNodeText = getNodeText;
            exports.getQueriesForElement = getQueriesForElement;
            exports.getRoles = getRoles;
            exports.getSuggestedQuery = getSuggestedQuery;
            exports.isInaccessible = isInaccessible;
            exports.logDOM = logDOM;
            exports.logRoles = logRoles;
            exports.makeFindQuery = makeFindQuery;
            exports.makeGetAllQuery = makeGetAllQuery;
            exports.makeSingleQuery = makeSingleQuery;
            exports.prettyDOM = prettyDOM;
            exports.prettyFormat = index$2;
            exports.queries = queries;
            exports.queryAllByAltText = queryAllByAltTextWithSuggestions;
            exports.queryAllByAttribute = queryAllByAttribute;
            exports.queryAllByDisplayValue = queryAllByDisplayValueWithSuggestions;
            exports.queryAllByLabelText = queryAllByLabelTextWithSuggestions;
            exports.queryAllByPlaceholderText = queryAllByPlaceholderTextWithSuggestions;
            exports.queryAllByRole = queryAllByRoleWithSuggestions;
            exports.queryAllByTestId = queryAllByTestIdWithSuggestions;
            exports.queryAllByText = queryAllByTextWithSuggestions;
            exports.queryAllByTitle = queryAllByTitleWithSuggestions;
            exports.queryByAltText = queryByAltText;
            exports.queryByAttribute = queryByAttribute;
            exports.queryByDisplayValue = queryByDisplayValue;
            exports.queryByLabelText = queryByLabelText;
            exports.queryByPlaceholderText = queryByPlaceholderText;
            exports.queryByRole = queryByRole;
            exports.queryByTestId = queryByTestId;
            exports.queryByText = queryByText;
            exports.queryByTitle = queryByTitle;
            exports.queryHelpers = queryHelpers;
            exports.render = render;
            exports.screen = screen;
            exports.userEvent = index;
            exports.waitFor = waitForWrapper;
            exports.waitForElementToBeRemoved = waitForElementToBeRemoved;
            exports.within = getQueriesForElement;
            exports.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
            exports.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;

            Object.defineProperty(exports, '__esModule', { value: true });

}));
