(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
            typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rtl = {}, global.React, global.ReactDOM));
}(this, (function (exports, l$1, m$1) { 'use strict';

            function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

            var l__default = /*#__PURE__*/_interopDefaultLegacy(l$1);
            var m__default = /*#__PURE__*/_interopDefaultLegacy(m$1);

            var global$2 = (typeof global !== "undefined" ? global :
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
            if (typeof global$2.setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            }
            if (typeof global$2.clearTimeout === 'function') {
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
            var version$1 = ''; // empty string to avoid regexp issues
            var versions$1 = {};
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
            var performance$1 = global$2.performance || {};
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

            var process$1 = {
              nextTick: nextTick,
              title: title,
              browser: browser,
              env: env,
              argv: argv,
              version: version$1,
              versions: versions$1,
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
              IteratorPrototype[iteratorSymbol] = function () {
                return this;
              };

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
              GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
              GeneratorFunctionPrototype.constructor = GeneratorFunction;
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
              AsyncIterator.prototype[asyncIteratorSymbol] = function () {
                return this;
              };
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
              Gp[iteratorSymbol] = function() {
                return this;
              };

              Gp.toString = function() {
                return "[object Generator]";
              };

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
              // in case runtime.js accidentally runs in strict mode, we can escape
              // strict mode using a global Function call. This could conceivably fail
              // if a Content Security Policy forbids using Function, but in that case
              // the proper solution is to fix the accidental strict mode problem. If
              // you've misconfigured your bundler to force strict mode and applied a
              // CSP to forbid Function, and you're not willing to fix either of those
              // problems, please detail your unique predicament in a GitHub issue.
              Function("r", "regeneratorRuntime = r")(runtime);
            }
            });

            var regenerator = runtime_1;

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

            var colorName = {
            	"aliceblue": [240, 248, 255],
            	"antiquewhite": [250, 235, 215],
            	"aqua": [0, 255, 255],
            	"aquamarine": [127, 255, 212],
            	"azure": [240, 255, 255],
            	"beige": [245, 245, 220],
            	"bisque": [255, 228, 196],
            	"black": [0, 0, 0],
            	"blanchedalmond": [255, 235, 205],
            	"blue": [0, 0, 255],
            	"blueviolet": [138, 43, 226],
            	"brown": [165, 42, 42],
            	"burlywood": [222, 184, 135],
            	"cadetblue": [95, 158, 160],
            	"chartreuse": [127, 255, 0],
            	"chocolate": [210, 105, 30],
            	"coral": [255, 127, 80],
            	"cornflowerblue": [100, 149, 237],
            	"cornsilk": [255, 248, 220],
            	"crimson": [220, 20, 60],
            	"cyan": [0, 255, 255],
            	"darkblue": [0, 0, 139],
            	"darkcyan": [0, 139, 139],
            	"darkgoldenrod": [184, 134, 11],
            	"darkgray": [169, 169, 169],
            	"darkgreen": [0, 100, 0],
            	"darkgrey": [169, 169, 169],
            	"darkkhaki": [189, 183, 107],
            	"darkmagenta": [139, 0, 139],
            	"darkolivegreen": [85, 107, 47],
            	"darkorange": [255, 140, 0],
            	"darkorchid": [153, 50, 204],
            	"darkred": [139, 0, 0],
            	"darksalmon": [233, 150, 122],
            	"darkseagreen": [143, 188, 143],
            	"darkslateblue": [72, 61, 139],
            	"darkslategray": [47, 79, 79],
            	"darkslategrey": [47, 79, 79],
            	"darkturquoise": [0, 206, 209],
            	"darkviolet": [148, 0, 211],
            	"deeppink": [255, 20, 147],
            	"deepskyblue": [0, 191, 255],
            	"dimgray": [105, 105, 105],
            	"dimgrey": [105, 105, 105],
            	"dodgerblue": [30, 144, 255],
            	"firebrick": [178, 34, 34],
            	"floralwhite": [255, 250, 240],
            	"forestgreen": [34, 139, 34],
            	"fuchsia": [255, 0, 255],
            	"gainsboro": [220, 220, 220],
            	"ghostwhite": [248, 248, 255],
            	"gold": [255, 215, 0],
            	"goldenrod": [218, 165, 32],
            	"gray": [128, 128, 128],
            	"green": [0, 128, 0],
            	"greenyellow": [173, 255, 47],
            	"grey": [128, 128, 128],
            	"honeydew": [240, 255, 240],
            	"hotpink": [255, 105, 180],
            	"indianred": [205, 92, 92],
            	"indigo": [75, 0, 130],
            	"ivory": [255, 255, 240],
            	"khaki": [240, 230, 140],
            	"lavender": [230, 230, 250],
            	"lavenderblush": [255, 240, 245],
            	"lawngreen": [124, 252, 0],
            	"lemonchiffon": [255, 250, 205],
            	"lightblue": [173, 216, 230],
            	"lightcoral": [240, 128, 128],
            	"lightcyan": [224, 255, 255],
            	"lightgoldenrodyellow": [250, 250, 210],
            	"lightgray": [211, 211, 211],
            	"lightgreen": [144, 238, 144],
            	"lightgrey": [211, 211, 211],
            	"lightpink": [255, 182, 193],
            	"lightsalmon": [255, 160, 122],
            	"lightseagreen": [32, 178, 170],
            	"lightskyblue": [135, 206, 250],
            	"lightslategray": [119, 136, 153],
            	"lightslategrey": [119, 136, 153],
            	"lightsteelblue": [176, 196, 222],
            	"lightyellow": [255, 255, 224],
            	"lime": [0, 255, 0],
            	"limegreen": [50, 205, 50],
            	"linen": [250, 240, 230],
            	"magenta": [255, 0, 255],
            	"maroon": [128, 0, 0],
            	"mediumaquamarine": [102, 205, 170],
            	"mediumblue": [0, 0, 205],
            	"mediumorchid": [186, 85, 211],
            	"mediumpurple": [147, 112, 219],
            	"mediumseagreen": [60, 179, 113],
            	"mediumslateblue": [123, 104, 238],
            	"mediumspringgreen": [0, 250, 154],
            	"mediumturquoise": [72, 209, 204],
            	"mediumvioletred": [199, 21, 133],
            	"midnightblue": [25, 25, 112],
            	"mintcream": [245, 255, 250],
            	"mistyrose": [255, 228, 225],
            	"moccasin": [255, 228, 181],
            	"navajowhite": [255, 222, 173],
            	"navy": [0, 0, 128],
            	"oldlace": [253, 245, 230],
            	"olive": [128, 128, 0],
            	"olivedrab": [107, 142, 35],
            	"orange": [255, 165, 0],
            	"orangered": [255, 69, 0],
            	"orchid": [218, 112, 214],
            	"palegoldenrod": [238, 232, 170],
            	"palegreen": [152, 251, 152],
            	"paleturquoise": [175, 238, 238],
            	"palevioletred": [219, 112, 147],
            	"papayawhip": [255, 239, 213],
            	"peachpuff": [255, 218, 185],
            	"peru": [205, 133, 63],
            	"pink": [255, 192, 203],
            	"plum": [221, 160, 221],
            	"powderblue": [176, 224, 230],
            	"purple": [128, 0, 128],
            	"rebeccapurple": [102, 51, 153],
            	"red": [255, 0, 0],
            	"rosybrown": [188, 143, 143],
            	"royalblue": [65, 105, 225],
            	"saddlebrown": [139, 69, 19],
            	"salmon": [250, 128, 114],
            	"sandybrown": [244, 164, 96],
            	"seagreen": [46, 139, 87],
            	"seashell": [255, 245, 238],
            	"sienna": [160, 82, 45],
            	"silver": [192, 192, 192],
            	"skyblue": [135, 206, 235],
            	"slateblue": [106, 90, 205],
            	"slategray": [112, 128, 144],
            	"slategrey": [112, 128, 144],
            	"snow": [255, 250, 250],
            	"springgreen": [0, 255, 127],
            	"steelblue": [70, 130, 180],
            	"tan": [210, 180, 140],
            	"teal": [0, 128, 128],
            	"thistle": [216, 191, 216],
            	"tomato": [255, 99, 71],
            	"turquoise": [64, 224, 208],
            	"violet": [238, 130, 238],
            	"wheat": [245, 222, 179],
            	"white": [255, 255, 255],
            	"whitesmoke": [245, 245, 245],
            	"yellow": [255, 255, 0],
            	"yellowgreen": [154, 205, 50]
            };

            /* MIT license */

            /* eslint-disable no-mixed-operators */


            // NOTE: conversions should only return primitive values (i.e. arrays, or
            //       values that give correct `typeof` results).
            //       do not use box values types (i.e. Number(), String(), etc.)

            const reverseKeywords = {};
            for (const key of Object.keys(colorName)) {
            	reverseKeywords[colorName[key]] = key;
            }

            const convert$1 = {
            	rgb: {channels: 3, labels: 'rgb'},
            	hsl: {channels: 3, labels: 'hsl'},
            	hsv: {channels: 3, labels: 'hsv'},
            	hwb: {channels: 3, labels: 'hwb'},
            	cmyk: {channels: 4, labels: 'cmyk'},
            	xyz: {channels: 3, labels: 'xyz'},
            	lab: {channels: 3, labels: 'lab'},
            	lch: {channels: 3, labels: 'lch'},
            	hex: {channels: 1, labels: ['hex']},
            	keyword: {channels: 1, labels: ['keyword']},
            	ansi16: {channels: 1, labels: ['ansi16']},
            	ansi256: {channels: 1, labels: ['ansi256']},
            	hcg: {channels: 3, labels: ['h', 'c', 'g']},
            	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
            	gray: {channels: 1, labels: ['gray']}
            };

            var conversions = convert$1;

            // Hide .channels and .labels properties
            for (const model of Object.keys(convert$1)) {
            	if (!('channels' in convert$1[model])) {
            		throw new Error('missing channels property: ' + model);
            	}

            	if (!('labels' in convert$1[model])) {
            		throw new Error('missing channel labels property: ' + model);
            	}

            	if (convert$1[model].labels.length !== convert$1[model].channels) {
            		throw new Error('channel and label counts mismatch: ' + model);
            	}

            	const {channels, labels} = convert$1[model];
            	delete convert$1[model].channels;
            	delete convert$1[model].labels;
            	Object.defineProperty(convert$1[model], 'channels', {value: channels});
            	Object.defineProperty(convert$1[model], 'labels', {value: labels});
            }

            convert$1.rgb.hsl = function (rgb) {
            	const r = rgb[0] / 255;
            	const g = rgb[1] / 255;
            	const b = rgb[2] / 255;
            	const min = Math.min(r, g, b);
            	const max = Math.max(r, g, b);
            	const delta = max - min;
            	let h;
            	let s;

            	if (max === min) {
            		h = 0;
            	} else if (r === max) {
            		h = (g - b) / delta;
            	} else if (g === max) {
            		h = 2 + (b - r) / delta;
            	} else if (b === max) {
            		h = 4 + (r - g) / delta;
            	}

            	h = Math.min(h * 60, 360);

            	if (h < 0) {
            		h += 360;
            	}

            	const l = (min + max) / 2;

            	if (max === min) {
            		s = 0;
            	} else if (l <= 0.5) {
            		s = delta / (max + min);
            	} else {
            		s = delta / (2 - max - min);
            	}

            	return [h, s * 100, l * 100];
            };

            convert$1.rgb.hsv = function (rgb) {
            	let rdif;
            	let gdif;
            	let bdif;
            	let h;
            	let s;

            	const r = rgb[0] / 255;
            	const g = rgb[1] / 255;
            	const b = rgb[2] / 255;
            	const v = Math.max(r, g, b);
            	const diff = v - Math.min(r, g, b);
            	const diffc = function (c) {
            		return (v - c) / 6 / diff + 1 / 2;
            	};

            	if (diff === 0) {
            		h = 0;
            		s = 0;
            	} else {
            		s = diff / v;
            		rdif = diffc(r);
            		gdif = diffc(g);
            		bdif = diffc(b);

            		if (r === v) {
            			h = bdif - gdif;
            		} else if (g === v) {
            			h = (1 / 3) + rdif - bdif;
            		} else if (b === v) {
            			h = (2 / 3) + gdif - rdif;
            		}

            		if (h < 0) {
            			h += 1;
            		} else if (h > 1) {
            			h -= 1;
            		}
            	}

            	return [
            		h * 360,
            		s * 100,
            		v * 100
            	];
            };

            convert$1.rgb.hwb = function (rgb) {
            	const r = rgb[0];
            	const g = rgb[1];
            	let b = rgb[2];
            	const h = convert$1.rgb.hsl(rgb)[0];
            	const w = 1 / 255 * Math.min(r, Math.min(g, b));

            	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

            	return [h, w * 100, b * 100];
            };

            convert$1.rgb.cmyk = function (rgb) {
            	const r = rgb[0] / 255;
            	const g = rgb[1] / 255;
            	const b = rgb[2] / 255;

            	const k = Math.min(1 - r, 1 - g, 1 - b);
            	const c = (1 - r - k) / (1 - k) || 0;
            	const m = (1 - g - k) / (1 - k) || 0;
            	const y = (1 - b - k) / (1 - k) || 0;

            	return [c * 100, m * 100, y * 100, k * 100];
            };

            function comparativeDistance(x, y) {
            	/*
            		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
            	*/
            	return (
            		((x[0] - y[0]) ** 2) +
            		((x[1] - y[1]) ** 2) +
            		((x[2] - y[2]) ** 2)
            	);
            }

            convert$1.rgb.keyword = function (rgb) {
            	const reversed = reverseKeywords[rgb];
            	if (reversed) {
            		return reversed;
            	}

            	let currentClosestDistance = Infinity;
            	let currentClosestKeyword;

            	for (const keyword of Object.keys(colorName)) {
            		const value = colorName[keyword];

            		// Compute comparative distance
            		const distance = comparativeDistance(rgb, value);

            		// Check if its less, if so set as closest
            		if (distance < currentClosestDistance) {
            			currentClosestDistance = distance;
            			currentClosestKeyword = keyword;
            		}
            	}

            	return currentClosestKeyword;
            };

            convert$1.keyword.rgb = function (keyword) {
            	return colorName[keyword];
            };

            convert$1.rgb.xyz = function (rgb) {
            	let r = rgb[0] / 255;
            	let g = rgb[1] / 255;
            	let b = rgb[2] / 255;

            	// Assume sRGB
            	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
            	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
            	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

            	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
            	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
            	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

            	return [x * 100, y * 100, z * 100];
            };

            convert$1.rgb.lab = function (rgb) {
            	const xyz = convert$1.rgb.xyz(rgb);
            	let x = xyz[0];
            	let y = xyz[1];
            	let z = xyz[2];

            	x /= 95.047;
            	y /= 100;
            	z /= 108.883;

            	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
            	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
            	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

            	const l = (116 * y) - 16;
            	const a = 500 * (x - y);
            	const b = 200 * (y - z);

            	return [l, a, b];
            };

            convert$1.hsl.rgb = function (hsl) {
            	const h = hsl[0] / 360;
            	const s = hsl[1] / 100;
            	const l = hsl[2] / 100;
            	let t2;
            	let t3;
            	let val;

            	if (s === 0) {
            		val = l * 255;
            		return [val, val, val];
            	}

            	if (l < 0.5) {
            		t2 = l * (1 + s);
            	} else {
            		t2 = l + s - l * s;
            	}

            	const t1 = 2 * l - t2;

            	const rgb = [0, 0, 0];
            	for (let i = 0; i < 3; i++) {
            		t3 = h + 1 / 3 * -(i - 1);
            		if (t3 < 0) {
            			t3++;
            		}

            		if (t3 > 1) {
            			t3--;
            		}

            		if (6 * t3 < 1) {
            			val = t1 + (t2 - t1) * 6 * t3;
            		} else if (2 * t3 < 1) {
            			val = t2;
            		} else if (3 * t3 < 2) {
            			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            		} else {
            			val = t1;
            		}

            		rgb[i] = val * 255;
            	}

            	return rgb;
            };

            convert$1.hsl.hsv = function (hsl) {
            	const h = hsl[0];
            	let s = hsl[1] / 100;
            	let l = hsl[2] / 100;
            	let smin = s;
            	const lmin = Math.max(l, 0.01);

            	l *= 2;
            	s *= (l <= 1) ? l : 2 - l;
            	smin *= lmin <= 1 ? lmin : 2 - lmin;
            	const v = (l + s) / 2;
            	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

            	return [h, sv * 100, v * 100];
            };

            convert$1.hsv.rgb = function (hsv) {
            	const h = hsv[0] / 60;
            	const s = hsv[1] / 100;
            	let v = hsv[2] / 100;
            	const hi = Math.floor(h) % 6;

            	const f = h - Math.floor(h);
            	const p = 255 * v * (1 - s);
            	const q = 255 * v * (1 - (s * f));
            	const t = 255 * v * (1 - (s * (1 - f)));
            	v *= 255;

            	switch (hi) {
            		case 0:
            			return [v, t, p];
            		case 1:
            			return [q, v, p];
            		case 2:
            			return [p, v, t];
            		case 3:
            			return [p, q, v];
            		case 4:
            			return [t, p, v];
            		case 5:
            			return [v, p, q];
            	}
            };

            convert$1.hsv.hsl = function (hsv) {
            	const h = hsv[0];
            	const s = hsv[1] / 100;
            	const v = hsv[2] / 100;
            	const vmin = Math.max(v, 0.01);
            	let sl;
            	let l;

            	l = (2 - s) * v;
            	const lmin = (2 - s) * vmin;
            	sl = s * vmin;
            	sl /= (lmin <= 1) ? lmin : 2 - lmin;
            	sl = sl || 0;
            	l /= 2;

            	return [h, sl * 100, l * 100];
            };

            // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
            convert$1.hwb.rgb = function (hwb) {
            	const h = hwb[0] / 360;
            	let wh = hwb[1] / 100;
            	let bl = hwb[2] / 100;
            	const ratio = wh + bl;
            	let f;

            	// Wh + bl cant be > 1
            	if (ratio > 1) {
            		wh /= ratio;
            		bl /= ratio;
            	}

            	const i = Math.floor(6 * h);
            	const v = 1 - bl;
            	f = 6 * h - i;

            	if ((i & 0x01) !== 0) {
            		f = 1 - f;
            	}

            	const n = wh + f * (v - wh); // Linear interpolation

            	let r;
            	let g;
            	let b;
            	/* eslint-disable max-statements-per-line,no-multi-spaces */
            	switch (i) {
            		default:
            		case 6:
            		case 0: r = v;  g = n;  b = wh; break;
            		case 1: r = n;  g = v;  b = wh; break;
            		case 2: r = wh; g = v;  b = n; break;
            		case 3: r = wh; g = n;  b = v; break;
            		case 4: r = n;  g = wh; b = v; break;
            		case 5: r = v;  g = wh; b = n; break;
            	}
            	/* eslint-enable max-statements-per-line,no-multi-spaces */

            	return [r * 255, g * 255, b * 255];
            };

            convert$1.cmyk.rgb = function (cmyk) {
            	const c = cmyk[0] / 100;
            	const m = cmyk[1] / 100;
            	const y = cmyk[2] / 100;
            	const k = cmyk[3] / 100;

            	const r = 1 - Math.min(1, c * (1 - k) + k);
            	const g = 1 - Math.min(1, m * (1 - k) + k);
            	const b = 1 - Math.min(1, y * (1 - k) + k);

            	return [r * 255, g * 255, b * 255];
            };

            convert$1.xyz.rgb = function (xyz) {
            	const x = xyz[0] / 100;
            	const y = xyz[1] / 100;
            	const z = xyz[2] / 100;
            	let r;
            	let g;
            	let b;

            	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
            	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
            	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

            	// Assume sRGB
            	r = r > 0.0031308
            		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
            		: r * 12.92;

            	g = g > 0.0031308
            		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
            		: g * 12.92;

            	b = b > 0.0031308
            		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
            		: b * 12.92;

            	r = Math.min(Math.max(0, r), 1);
            	g = Math.min(Math.max(0, g), 1);
            	b = Math.min(Math.max(0, b), 1);

            	return [r * 255, g * 255, b * 255];
            };

            convert$1.xyz.lab = function (xyz) {
            	let x = xyz[0];
            	let y = xyz[1];
            	let z = xyz[2];

            	x /= 95.047;
            	y /= 100;
            	z /= 108.883;

            	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
            	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
            	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

            	const l = (116 * y) - 16;
            	const a = 500 * (x - y);
            	const b = 200 * (y - z);

            	return [l, a, b];
            };

            convert$1.lab.xyz = function (lab) {
            	const l = lab[0];
            	const a = lab[1];
            	const b = lab[2];
            	let x;
            	let y;
            	let z;

            	y = (l + 16) / 116;
            	x = a / 500 + y;
            	z = y - b / 200;

            	const y2 = y ** 3;
            	const x2 = x ** 3;
            	const z2 = z ** 3;
            	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
            	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
            	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

            	x *= 95.047;
            	y *= 100;
            	z *= 108.883;

            	return [x, y, z];
            };

            convert$1.lab.lch = function (lab) {
            	const l = lab[0];
            	const a = lab[1];
            	const b = lab[2];
            	let h;

            	const hr = Math.atan2(b, a);
            	h = hr * 360 / 2 / Math.PI;

            	if (h < 0) {
            		h += 360;
            	}

            	const c = Math.sqrt(a * a + b * b);

            	return [l, c, h];
            };

            convert$1.lch.lab = function (lch) {
            	const l = lch[0];
            	const c = lch[1];
            	const h = lch[2];

            	const hr = h / 360 * 2 * Math.PI;
            	const a = c * Math.cos(hr);
            	const b = c * Math.sin(hr);

            	return [l, a, b];
            };

            convert$1.rgb.ansi16 = function (args, saturation = null) {
            	const [r, g, b] = args;
            	let value = saturation === null ? convert$1.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

            	value = Math.round(value / 50);

            	if (value === 0) {
            		return 30;
            	}

            	let ansi = 30
            		+ ((Math.round(b / 255) << 2)
            		| (Math.round(g / 255) << 1)
            		| Math.round(r / 255));

            	if (value === 2) {
            		ansi += 60;
            	}

            	return ansi;
            };

            convert$1.hsv.ansi16 = function (args) {
            	// Optimization here; we already know the value and don't need to get
            	// it converted for us.
            	return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2]);
            };

            convert$1.rgb.ansi256 = function (args) {
            	const r = args[0];
            	const g = args[1];
            	const b = args[2];

            	// We use the extended greyscale palette here, with the exception of
            	// black and white. normal palette only has 4 greyscale shades.
            	if (r === g && g === b) {
            		if (r < 8) {
            			return 16;
            		}

            		if (r > 248) {
            			return 231;
            		}

            		return Math.round(((r - 8) / 247) * 24) + 232;
            	}

            	const ansi = 16
            		+ (36 * Math.round(r / 255 * 5))
            		+ (6 * Math.round(g / 255 * 5))
            		+ Math.round(b / 255 * 5);

            	return ansi;
            };

            convert$1.ansi16.rgb = function (args) {
            	let color = args % 10;

            	// Handle greyscale
            	if (color === 0 || color === 7) {
            		if (args > 50) {
            			color += 3.5;
            		}

            		color = color / 10.5 * 255;

            		return [color, color, color];
            	}

            	const mult = (~~(args > 50) + 1) * 0.5;
            	const r = ((color & 1) * mult) * 255;
            	const g = (((color >> 1) & 1) * mult) * 255;
            	const b = (((color >> 2) & 1) * mult) * 255;

            	return [r, g, b];
            };

            convert$1.ansi256.rgb = function (args) {
            	// Handle greyscale
            	if (args >= 232) {
            		const c = (args - 232) * 10 + 8;
            		return [c, c, c];
            	}

            	args -= 16;

            	let rem;
            	const r = Math.floor(args / 36) / 5 * 255;
            	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
            	const b = (rem % 6) / 5 * 255;

            	return [r, g, b];
            };

            convert$1.rgb.hex = function (args) {
            	const integer = ((Math.round(args[0]) & 0xFF) << 16)
            		+ ((Math.round(args[1]) & 0xFF) << 8)
            		+ (Math.round(args[2]) & 0xFF);

            	const string = integer.toString(16).toUpperCase();
            	return '000000'.substring(string.length) + string;
            };

            convert$1.hex.rgb = function (args) {
            	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            	if (!match) {
            		return [0, 0, 0];
            	}

            	let colorString = match[0];

            	if (match[0].length === 3) {
            		colorString = colorString.split('').map(char => {
            			return char + char;
            		}).join('');
            	}

            	const integer = parseInt(colorString, 16);
            	const r = (integer >> 16) & 0xFF;
            	const g = (integer >> 8) & 0xFF;
            	const b = integer & 0xFF;

            	return [r, g, b];
            };

            convert$1.rgb.hcg = function (rgb) {
            	const r = rgb[0] / 255;
            	const g = rgb[1] / 255;
            	const b = rgb[2] / 255;
            	const max = Math.max(Math.max(r, g), b);
            	const min = Math.min(Math.min(r, g), b);
            	const chroma = (max - min);
            	let grayscale;
            	let hue;

            	if (chroma < 1) {
            		grayscale = min / (1 - chroma);
            	} else {
            		grayscale = 0;
            	}

            	if (chroma <= 0) {
            		hue = 0;
            	} else
            	if (max === r) {
            		hue = ((g - b) / chroma) % 6;
            	} else
            	if (max === g) {
            		hue = 2 + (b - r) / chroma;
            	} else {
            		hue = 4 + (r - g) / chroma;
            	}

            	hue /= 6;
            	hue %= 1;

            	return [hue * 360, chroma * 100, grayscale * 100];
            };

            convert$1.hsl.hcg = function (hsl) {
            	const s = hsl[1] / 100;
            	const l = hsl[2] / 100;

            	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

            	let f = 0;
            	if (c < 1.0) {
            		f = (l - 0.5 * c) / (1.0 - c);
            	}

            	return [hsl[0], c * 100, f * 100];
            };

            convert$1.hsv.hcg = function (hsv) {
            	const s = hsv[1] / 100;
            	const v = hsv[2] / 100;

            	const c = s * v;
            	let f = 0;

            	if (c < 1.0) {
            		f = (v - c) / (1 - c);
            	}

            	return [hsv[0], c * 100, f * 100];
            };

            convert$1.hcg.rgb = function (hcg) {
            	const h = hcg[0] / 360;
            	const c = hcg[1] / 100;
            	const g = hcg[2] / 100;

            	if (c === 0.0) {
            		return [g * 255, g * 255, g * 255];
            	}

            	const pure = [0, 0, 0];
            	const hi = (h % 1) * 6;
            	const v = hi % 1;
            	const w = 1 - v;
            	let mg = 0;

            	/* eslint-disable max-statements-per-line */
            	switch (Math.floor(hi)) {
            		case 0:
            			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
            		case 1:
            			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
            		case 2:
            			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
            		case 3:
            			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
            		case 4:
            			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
            		default:
            			pure[0] = 1; pure[1] = 0; pure[2] = w;
            	}
            	/* eslint-enable max-statements-per-line */

            	mg = (1.0 - c) * g;

            	return [
            		(c * pure[0] + mg) * 255,
            		(c * pure[1] + mg) * 255,
            		(c * pure[2] + mg) * 255
            	];
            };

            convert$1.hcg.hsv = function (hcg) {
            	const c = hcg[1] / 100;
            	const g = hcg[2] / 100;

            	const v = c + g * (1.0 - c);
            	let f = 0;

            	if (v > 0.0) {
            		f = c / v;
            	}

            	return [hcg[0], f * 100, v * 100];
            };

            convert$1.hcg.hsl = function (hcg) {
            	const c = hcg[1] / 100;
            	const g = hcg[2] / 100;

            	const l = g * (1.0 - c) + 0.5 * c;
            	let s = 0;

            	if (l > 0.0 && l < 0.5) {
            		s = c / (2 * l);
            	} else
            	if (l >= 0.5 && l < 1.0) {
            		s = c / (2 * (1 - l));
            	}

            	return [hcg[0], s * 100, l * 100];
            };

            convert$1.hcg.hwb = function (hcg) {
            	const c = hcg[1] / 100;
            	const g = hcg[2] / 100;
            	const v = c + g * (1.0 - c);
            	return [hcg[0], (v - c) * 100, (1 - v) * 100];
            };

            convert$1.hwb.hcg = function (hwb) {
            	const w = hwb[1] / 100;
            	const b = hwb[2] / 100;
            	const v = 1 - b;
            	const c = v - w;
            	let g = 0;

            	if (c < 1) {
            		g = (v - c) / (1 - c);
            	}

            	return [hwb[0], c * 100, g * 100];
            };

            convert$1.apple.rgb = function (apple) {
            	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
            };

            convert$1.rgb.apple = function (rgb) {
            	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
            };

            convert$1.gray.rgb = function (args) {
            	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
            };

            convert$1.gray.hsl = function (args) {
            	return [0, 0, args[0]];
            };

            convert$1.gray.hsv = convert$1.gray.hsl;

            convert$1.gray.hwb = function (gray) {
            	return [0, 100, gray[0]];
            };

            convert$1.gray.cmyk = function (gray) {
            	return [0, 0, 0, gray[0]];
            };

            convert$1.gray.lab = function (gray) {
            	return [gray[0], 0, 0];
            };

            convert$1.gray.hex = function (gray) {
            	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
            	const integer = (val << 16) + (val << 8) + val;

            	const string = integer.toString(16).toUpperCase();
            	return '000000'.substring(string.length) + string;
            };

            convert$1.rgb.gray = function (rgb) {
            	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
            	return [val / 255 * 100];
            };

            /*
            	This function routes a model to all other models.

            	all functions that are routed have a property `.conversion` attached
            	to the returned synthetic function. This property is an array
            	of strings, each with the steps in between the 'from' and 'to'
            	color models (inclusive).

            	conversions that are not possible simply are not included.
            */

            function buildGraph() {
            	const graph = {};
            	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
            	const models = Object.keys(conversions);

            	for (let len = models.length, i = 0; i < len; i++) {
            		graph[models[i]] = {
            			// http://jsperf.com/1-vs-infinity
            			// micro-opt, but this is simple.
            			distance: -1,
            			parent: null
            		};
            	}

            	return graph;
            }

            // https://en.wikipedia.org/wiki/Breadth-first_search
            function deriveBFS(fromModel) {
            	const graph = buildGraph();
            	const queue = [fromModel]; // Unshift -> queue -> pop

            	graph[fromModel].distance = 0;

            	while (queue.length) {
            		const current = queue.pop();
            		const adjacents = Object.keys(conversions[current]);

            		for (let len = adjacents.length, i = 0; i < len; i++) {
            			const adjacent = adjacents[i];
            			const node = graph[adjacent];

            			if (node.distance === -1) {
            				node.distance = graph[current].distance + 1;
            				node.parent = current;
            				queue.unshift(adjacent);
            			}
            		}
            	}

            	return graph;
            }

            function link(from, to) {
            	return function (args) {
            		return to(from(args));
            	};
            }

            function wrapConversion(toModel, graph) {
            	const path = [graph[toModel].parent, toModel];
            	let fn = conversions[graph[toModel].parent][toModel];

            	let cur = graph[toModel].parent;
            	while (graph[cur].parent) {
            		path.unshift(graph[cur].parent);
            		fn = link(conversions[graph[cur].parent][cur], fn);
            		cur = graph[cur].parent;
            	}

            	fn.conversion = path;
            	return fn;
            }

            var route = function (fromModel) {
            	const graph = deriveBFS(fromModel);
            	const conversion = {};

            	const models = Object.keys(graph);
            	for (let len = models.length, i = 0; i < len; i++) {
            		const toModel = models[i];
            		const node = graph[toModel];

            		if (node.parent === null) {
            			// No possible conversion, or this node is the source model.
            			continue;
            		}

            		conversion[toModel] = wrapConversion(toModel, graph);
            	}

            	return conversion;
            };

            const convert = {};

            const models = Object.keys(conversions);

            function wrapRaw(fn) {
            	const wrappedFn = function (...args) {
            		const arg0 = args[0];
            		if (arg0 === undefined || arg0 === null) {
            			return arg0;
            		}

            		if (arg0.length > 1) {
            			args = arg0;
            		}

            		return fn(args);
            	};

            	// Preserve .conversion property if there is one
            	if ('conversion' in fn) {
            		wrappedFn.conversion = fn.conversion;
            	}

            	return wrappedFn;
            }

            function wrapRounded(fn) {
            	const wrappedFn = function (...args) {
            		const arg0 = args[0];

            		if (arg0 === undefined || arg0 === null) {
            			return arg0;
            		}

            		if (arg0.length > 1) {
            			args = arg0;
            		}

            		const result = fn(args);

            		// We're assuming the result is an array here.
            		// see notice in conversions.js; don't use box types
            		// in conversion functions.
            		if (typeof result === 'object') {
            			for (let len = result.length, i = 0; i < len; i++) {
            				result[i] = Math.round(result[i]);
            			}
            		}

            		return result;
            	};

            	// Preserve .conversion property if there is one
            	if ('conversion' in fn) {
            		wrappedFn.conversion = fn.conversion;
            	}

            	return wrappedFn;
            }

            models.forEach(fromModel => {
            	convert[fromModel] = {};

            	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
            	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

            	const routes = route(fromModel);
            	const routeModels = Object.keys(routes);

            	routeModels.forEach(toModel => {
            		const fn = routes[toModel];

            		convert[fromModel][toModel] = wrapRounded(fn);
            		convert[fromModel][toModel].raw = wrapRaw(fn);
            	});
            });

            var colorConvert = convert;

            var ansiStyles = createCommonjsModule(function (module) {

            const wrapAnsi16 = (fn, offset) => (...args) => {
            	const code = fn(...args);
            	return `\u001B[${code + offset}m`;
            };

            const wrapAnsi256 = (fn, offset) => (...args) => {
            	const code = fn(...args);
            	return `\u001B[${38 + offset};5;${code}m`;
            };

            const wrapAnsi16m = (fn, offset) => (...args) => {
            	const rgb = fn(...args);
            	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
            };

            const ansi2ansi = n => n;
            const rgb2rgb = (r, g, b) => [r, g, b];

            const setLazyProperty = (object, property, get) => {
            	Object.defineProperty(object, property, {
            		get: () => {
            			const value = get();

            			Object.defineProperty(object, property, {
            				value,
            				enumerable: true,
            				configurable: true
            			});

            			return value;
            		},
            		enumerable: true,
            		configurable: true
            	});
            };

            /** @type {typeof import('color-convert')} */
            let colorConvert$1;
            const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
            	if (colorConvert$1 === undefined) {
            		colorConvert$1 = colorConvert;
            	}

            	const offset = isBackground ? 10 : 0;
            	const styles = {};

            	for (const [sourceSpace, suite] of Object.entries(colorConvert$1)) {
            		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
            		if (sourceSpace === targetSpace) {
            			styles[name] = wrap(identity, offset);
            		} else if (typeof suite === 'object') {
            			styles[name] = wrap(suite[targetSpace], offset);
            		}
            	}

            	return styles;
            };

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

            	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
            	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
            	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
            	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
            	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
            	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

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
            const getKeysOfEnumerableProperties = object => {
              const keys = Object.keys(object).sort();

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
                  result +=
                    indentationNext +
                    printer(list[i], config, indentationNext, depth, refs);

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
              const keys = getKeysOfEnumerableProperties(val);

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
            exports.default = exports.test = exports.serialize = void 0;



            var Symbol = global$2['jest-symbol-do-not-touch'] || global$2.Symbol;
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
            		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
            		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
            	].join('|');

            	return new RegExp(pattern, onlyFirst ? undefined : 'g');
            };

            var ConvertAnsi = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = exports.serialize = exports.test = void 0;

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
            exports.default = exports.serialize = exports.test = void 0;



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

            var _default = escapeHTML;

            /**
             * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            function escapeHTML(str) {
              return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            var escapeHTML_1 = /*#__PURE__*/Object.defineProperty({
            	default: _default
            }, '__esModule', {value: true});

            var markup = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printText = exports.printChildren = exports.printProps = void 0;

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

            var DOMElement$1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = exports.serialize = exports.test = void 0;



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

            const testNode = val => {
              var _val$hasAttribute;

              const constructorName = val.constructor.name;
              const {nodeType, tagName} = val;
              const isCustomElement =
                (typeof tagName === 'string' && tagName.includes('-')) ||
                ((_val$hasAttribute = val.hasAttribute) === null ||
                _val$hasAttribute === void 0
                  ? void 0
                  : _val$hasAttribute.call(val, 'is'));
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
                ? `DocumentFragment`
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
            exports.default = exports.test = exports.serialize = void 0;



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
            var b=60103,c=60106,d=60107,e=60108,f$7=60114,g=60109,h=60110,k=60112,l=60113,m=60120,n=60115,p=60116,q=60121,r=60122,u=60117,v=60129,w=60131;
            if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element");c=x("react.portal");d=x("react.fragment");e=x("react.strict_mode");f$7=x("react.profiler");g=x("react.provider");h=x("react.context");k=x("react.forward_ref");l=x("react.suspense");m=x("react.suspense_list");n=x("react.memo");p=x("react.lazy");q=x("react.block");r=x("react.server.block");u=x("react.fundamental");v=x("react.debug_trace_mode");w=x("react.legacy_hidden");}
            function y(a){if("object"===typeof a&&null!==a){var t=a.$$typeof;switch(t){case b:switch(a=a.type,a){case d:case f$7:case e:case l:case m:return a;default:switch(a=a&&a.$$typeof,a){case h:case k:case p:case n:case g:return a;default:return t}}case c:return t}}}var z=g,A=b,B=k,C=d,D=p,E=n,F=c,G=f$7,H=e,I=l;var ContextConsumer=h;var ContextProvider=z;var Element=A;var ForwardRef=B;var Fragment=C;var Lazy=D;var Memo=E;var Portal=F;var Profiler=G;var StrictMode=H;
            var Suspense=I;var isAsyncMode=function(){return !1};var isConcurrentMode=function(){return !1};var isContextConsumer=function(a){return y(a)===h};var isContextProvider=function(a){return y(a)===g};var isElement$1=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};var isForwardRef=function(a){return y(a)===k};var isFragment=function(a){return y(a)===d};var isLazy=function(a){return y(a)===p};var isMemo=function(a){return y(a)===n};
            var isPortal=function(a){return y(a)===c};var isProfiler=function(a){return y(a)===f$7};var isStrictMode=function(a){return y(a)===e};var isSuspense=function(a){return y(a)===l};var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f$7||a===v||a===e||a===l||a===m||a===w||"object"===typeof a&&null!==a&&(a.$$typeof===p||a.$$typeof===n||a.$$typeof===g||a.$$typeof===h||a.$$typeof===k||a.$$typeof===u||a.$$typeof===q||a[0]===r)?!0:!1};
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

            createCommonjsModule(function (module, exports) {
            });

            var reactIs = createCommonjsModule(function (module) {

            {
              module.exports = reactIs_production_min;
            }
            });

            var ReactElement = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            exports.default = exports.test = exports.serialize = void 0;

            var ReactIs = _interopRequireWildcard(reactIs);



            function _getRequireWildcardCache() {
              if (typeof WeakMap !== 'function') return null;
              var cache = new WeakMap();
              _getRequireWildcardCache = function () {
                return cache;
              };
              return cache;
            }

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              }
              if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
                return {default: obj};
              }
              var cache = _getRequireWildcardCache();
              if (cache && cache.has(obj)) {
                return cache.get(obj);
              }
              var newObj = {};
              var hasPropertyDescriptor =
                Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

            const test = val => val && ReactIs.isElement(val);

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
            exports.default = exports.test = exports.serialize = void 0;



            var Symbol = global$2['jest-symbol-do-not-touch'] || global$2.Symbol;
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

            var _ansiStyles = _interopRequireDefault(ansiStyles);



            var _AsymmetricMatcher = _interopRequireDefault(
              AsymmetricMatcher
            );

            var _ConvertAnsi = _interopRequireDefault(ConvertAnsi);

            var _DOMCollection = _interopRequireDefault(DOMCollection$1);

            var _DOMElement = _interopRequireDefault(DOMElement$1);

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
            const toString$2 = Object.prototype.toString;
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

              const toStringed = toString$2.call(val);

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
                  // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
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

              const toStringed = toString$2.call(val);

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
                  : (min ? '' : val.constructor.name + ' ') +
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
                : (min ? '' : getConstructorName(val) + ' ') +
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
              escapeRegex: false,
              escapeString: true,
              highlight: false,
              indent: 2,
              maxDepth: Infinity,
              min: false,
              plugins: [],
              printFunctionName: true,
              theme: DEFAULT_THEME
            };

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
                  throw new Error(`pretty-format: Option "theme" must not be null.`);
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

            const getConfig$1 = options => ({
              callToJSON:
                options && options.callToJSON !== undefined
                  ? options.callToJSON
                  : DEFAULT_OPTIONS.callToJSON,
              colors:
                options && options.highlight
                  ? getColorsHighlight(options)
                  : getColorsEmpty(),
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
              min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
              plugins:
                options && options.plugins !== undefined
                  ? options.plugins
                  : DEFAULT_OPTIONS.plugins,
              printFunctionName: getPrintFunctionName(options),
              spacingInner: options && options.min ? ' ' : '\n',
              spacingOuter: options && options.min ? '' : '\n'
            });

            function createIndent(indent) {
              return new Array(indent + 1).join(' ');
            }
            /**
             * Returns a presentation string of your `val` object
             * @param val any potential JavaScript object
             * @param options Custom settings
             */

            function prettyFormat(val, options) {
              if (options) {
                validateOptions(options);

                if (options.plugins) {
                  const plugin = findPlugin(options.plugins, val);

                  if (plugin !== null) {
                    return printPlugin(plugin, val, getConfig$1(options), '', 0, []);
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

              return printComplexValue(val, getConfig$1(options), '', 0, []);
            }

            prettyFormat.plugins = {
              AsymmetricMatcher: _AsymmetricMatcher.default,
              ConvertAnsi: _ConvertAnsi.default,
              DOMCollection: _DOMCollection.default,
              DOMElement: _DOMElement.default,
              Immutable: _Immutable.default,
              ReactElement: _ReactElement.default,
              ReactTestComponent: _ReactTestComponent.default
            };
            var build$1 = prettyFormat;

            /**
             * @source {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill}
             * but without thisArg (too hard to type, no need to `this`)
             */
            var toStr = Object.prototype.toString;

            function isCallable(fn) {
              return typeof fn === "function" || toStr.call(fn) === "[object Function]";
            }

            function toInteger$1(value) {
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

            function toLength$1(value) {
              var len = toInteger$1(value);
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
            function arrayFrom$1(arrayLike, mapFn) {
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


              var len = toLength$1(items.length); // 13. If IsConstructor(C) is true, then
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

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

            function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest(); }

            function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

            function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

            function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

            function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
            var localNameToRoleMappings = {
              article: "article",
              aside: "complementary",
              body: "document",
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

                return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) === null || _prohibitedAttributes === void 0 ? void 0 : _prohibitedAttributes.has(attributeName));
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
              if (element.hasAttribute("role")) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute check
                var _trim$split = element.getAttribute("role").trim().split(" "),
                    _trim$split2 = _slicedToArray(_trim$split, 1),
                    explicitRole = _trim$split2[0];

                if (explicitRole !== undefined && explicitRole.length > 0) {
                  return explicitRole;
                }
              }

              return null;
            }

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
            function isElement(node) {
              return node !== null && node.nodeType === node.ELEMENT_NODE;
            }
            function isHTMLTableCaptionElement(node) {
              return isElement(node) && getLocalName(node) === "caption";
            }
            function isHTMLInputElement(node) {
              return isElement(node) && getLocalName(node) === "input";
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
              var elements = arrayFrom$1(element.querySelectorAll(selectors));
              queryIdRefs(element, "aria-owns").forEach(function (root) {
                // babel transpiles this assuming an iterator
                elements.push.apply(elements, arrayFrom$1(root.querySelectorAll(selectors)));
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
                return arrayFrom$1(labelsProperty);
              }

              if (!isLabelableElement(element)) {
                return null;
              }

              var document = element.ownerDocument;
              return arrayFrom$1(document.querySelectorAll("label")).filter(function (label) {
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
                return arrayFrom$1(slot.childNodes);
              }

              return assignedNodes;
            }
            /**
             * implements https://w3c.github.io/accname/#mapping_additional_nd_te
             * @param root
             * @param [options]
             * @param [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
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
                  getComputedStyle = _options$getComputedS === void 0 ? window.getComputedStyle.bind(window) : _options$getComputedS; // 2F.i

              function computeMiscTextAlternative(node, context) {
                var accumulatedText = "";

                if (isElement(node) && computedStyleSupportsPseudoElements) {
                  var pseudoBefore = getComputedStyle(node, "::before");
                  var beforeContent = getTextualContent(pseudoBefore);
                  accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
                } // FIXME: Including aria-owns is not defined in the spec
                // But it is required in the web-platform-test


                var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom$1(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
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

                return accumulatedText;
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
                  var children = arrayFrom$1(node.childNodes);

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

                  var _children = arrayFrom$1(node.childNodes);

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

                  var _children2 = arrayFrom$1(node.childNodes);

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

                if (isHTMLInputElement(node) || isHTMLSelectElement(node) || isHTMLTextAreaElement(node)) {
                  var input = node;
                  var labels = getLabels$1(input);

                  if (labels !== null && labels.length !== 0) {
                    consultedNodes.add(input);
                    return arrayFrom$1(labels).map(function (element) {
                      return computeTextAlternative(element, {
                        isEmbeddedInLabel: true,
                        isReferenced: false,
                        recursion: true
                      });
                    }).filter(function (label) {
                      return label.length > 0;
                    }).join(" ");
                  }
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

                return useAttribute(node, "title");
              }

              function computeTextAlternative(current, context) {
                if (consultedNodes.has(current)) {
                  return "";
                } // special casing, cheating to make tests pass
                // https://github.com/w3c/accname/issues/67


                if (hasAnyConcreteRoles(current, ["menu"])) {
                  consultedNodes.add(current);
                  return "";
                } // 2A


                if (isHidden(current, getComputedStyle) && !context.isReferenced) {
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
                } // 2E


                if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
                  if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
                    consultedNodes.add(current);
                    var selectedOptions = querySelectedOptions(current);

                    if (selectedOptions.length === 0) {
                      // defined per test `name_heading_combobox`
                      return isHTMLInputElement(current) ? current.value : "";
                    }

                    return arrayFrom$1(selectedOptions).map(function (selectedOption) {
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
             * @param [options]
             * @parma [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
             */


            function computeAccessibleName(root) {
              var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

              if (prohibitsNaming(root)) {
                return "";
              }

              return computeTextAlternative(root, options);
            }

            var interopRequireDefault = createCommonjsModule(function (module) {
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            }

            module.exports = _interopRequireDefault;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var check = function (it) {
              return it && it.Math == Math && it;
            };

            // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
            var global$1 =
              /* global globalThis -- safe */
              check(typeof globalThis == 'object' && globalThis) ||
              check(typeof window == 'object' && window) ||
              check(typeof self == 'object' && self) ||
              check(typeof global$1 == 'object' && global$1) ||
              // eslint-disable-next-line no-new-func -- fallback
              (function () { return this; })() || Function('return this')();

            var fails = function (exec) {
              try {
                return !!exec();
              } catch (error) {
                return true;
              }
            };

            // Detect IE8's incomplete defineProperty implementation
            var descriptors = !fails(function () {
              return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
            });

            var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
            var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

            // Nashorn ~ JDK8 bug
            var NASHORN_BUG = getOwnPropertyDescriptor$1 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

            // `Object.prototype.propertyIsEnumerable` method implementation
            // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
            var f$6 = NASHORN_BUG ? function propertyIsEnumerable(V) {
              var descriptor = getOwnPropertyDescriptor$1(this, V);
              return !!descriptor && descriptor.enumerable;
            } : nativePropertyIsEnumerable$1;

            var objectPropertyIsEnumerable = {
            	f: f$6
            };

            var createPropertyDescriptor = function (bitmap, value) {
              return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value: value
              };
            };

            var toString$1 = {}.toString;

            var classofRaw = function (it) {
              return toString$1.call(it).slice(8, -1);
            };

            var split = ''.split;

            // fallback for non-array-like ES3 and non-enumerable old V8 strings
            var indexedObject = fails(function () {
              // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
              // eslint-disable-next-line no-prototype-builtins -- safe
              return !Object('z').propertyIsEnumerable(0);
            }) ? function (it) {
              return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
            } : Object;

            // `RequireObjectCoercible` abstract operation
            // https://tc39.es/ecma262/#sec-requireobjectcoercible
            var requireObjectCoercible = function (it) {
              if (it == undefined) throw TypeError("Can't call method on " + it);
              return it;
            };

            // toObject with fallback for non-array-like ES3 strings



            var toIndexedObject = function (it) {
              return indexedObject(requireObjectCoercible(it));
            };

            var isObject = function (it) {
              return typeof it === 'object' ? it !== null : typeof it === 'function';
            };

            // `ToPrimitive` abstract operation
            // https://tc39.es/ecma262/#sec-toprimitive
            // instead of the ES6 spec version, we didn't implement @@toPrimitive case
            // and the second argument - flag - preferred type is a string
            var toPrimitive = function (input, PREFERRED_STRING) {
              if (!isObject(input)) return input;
              var fn, val;
              if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
              if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
              if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
              throw TypeError("Can't convert object to primitive value");
            };

            var hasOwnProperty$1 = {}.hasOwnProperty;

            var has$1 = function (it, key) {
              return hasOwnProperty$1.call(it, key);
            };

            var document$1 = global$1.document;
            // typeof document.createElement is 'object' in old IE
            var EXISTS = isObject(document$1) && isObject(document$1.createElement);

            var documentCreateElement = function (it) {
              return EXISTS ? document$1.createElement(it) : {};
            };

            // Thank's IE8 for his funny defineProperty
            var ie8DomDefine = !descriptors && !fails(function () {
              return Object.defineProperty(documentCreateElement('div'), 'a', {
                get: function () { return 7; }
              }).a != 7;
            });

            var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

            // `Object.getOwnPropertyDescriptor` method
            // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
            var f$5 = descriptors ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
              O = toIndexedObject(O);
              P = toPrimitive(P, true);
              if (ie8DomDefine) try {
                return nativeGetOwnPropertyDescriptor$1(O, P);
              } catch (error) { /* empty */ }
              if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
            };

            var objectGetOwnPropertyDescriptor = {
            	f: f$5
            };

            var replacement = /#|\.prototype\./;

            var isForced = function (feature, detection) {
              var value = data[normalize$1(feature)];
              return value == POLYFILL ? true
                : value == NATIVE ? false
                : typeof detection == 'function' ? fails(detection)
                : !!detection;
            };

            var normalize$1 = isForced.normalize = function (string) {
              return String(string).replace(replacement, '.').toLowerCase();
            };

            var data = isForced.data = {};
            var NATIVE = isForced.NATIVE = 'N';
            var POLYFILL = isForced.POLYFILL = 'P';

            var isForced_1 = isForced;

            var path = {};

            var aFunction$1 = function (it) {
              if (typeof it != 'function') {
                throw TypeError(String(it) + ' is not a function');
              } return it;
            };

            // optional / simple context binding
            var functionBindContext = function (fn, that, length) {
              aFunction$1(fn);
              if (that === undefined) return fn;
              switch (length) {
                case 0: return function () {
                  return fn.call(that);
                };
                case 1: return function (a) {
                  return fn.call(that, a);
                };
                case 2: return function (a, b) {
                  return fn.call(that, a, b);
                };
                case 3: return function (a, b, c) {
                  return fn.call(that, a, b, c);
                };
              }
              return function (/* ...args */) {
                return fn.apply(that, arguments);
              };
            };

            var anObject = function (it) {
              if (!isObject(it)) {
                throw TypeError(String(it) + ' is not an object');
              } return it;
            };

            var nativeDefineProperty$1 = Object.defineProperty;

            // `Object.defineProperty` method
            // https://tc39.es/ecma262/#sec-object.defineproperty
            var f$4 = descriptors ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPrimitive(P, true);
              anObject(Attributes);
              if (ie8DomDefine) try {
                return nativeDefineProperty$1(O, P, Attributes);
              } catch (error) { /* empty */ }
              if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
              if ('value' in Attributes) O[P] = Attributes.value;
              return O;
            };

            var objectDefineProperty = {
            	f: f$4
            };

            var createNonEnumerableProperty = descriptors ? function (object, key, value) {
              return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
            } : function (object, key, value) {
              object[key] = value;
              return object;
            };

            var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






            var wrapConstructor = function (NativeConstructor) {
              var Wrapper = function (a, b, c) {
                if (this instanceof NativeConstructor) {
                  switch (arguments.length) {
                    case 0: return new NativeConstructor();
                    case 1: return new NativeConstructor(a);
                    case 2: return new NativeConstructor(a, b);
                  } return new NativeConstructor(a, b, c);
                } return NativeConstructor.apply(this, arguments);
              };
              Wrapper.prototype = NativeConstructor.prototype;
              return Wrapper;
            };

            /*
              options.target      - name of the target object
              options.global      - target is the global object
              options.stat        - export as static methods of target
              options.proto       - export as prototype methods of target
              options.real        - real prototype method for the `pure` version
              options.forced      - export even if the native feature is available
              options.bind        - bind methods to the target, required for the `pure` version
              options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
              options.unsafe      - use the simple assignment of property instead of delete + defineProperty
              options.sham        - add a flag to not completely full polyfills
              options.enumerable  - export as enumerable property
              options.noTargetGet - prevent calling a getter on target
            */
            var _export = function (options, source) {
              var TARGET = options.target;
              var GLOBAL = options.global;
              var STATIC = options.stat;
              var PROTO = options.proto;

              var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

              var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
              var targetPrototype = target.prototype;

              var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
              var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

              for (key in source) {
                FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
                // contains in native
                USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);

                targetProperty = target[key];

                if (USE_NATIVE) if (options.noTargetGet) {
                  descriptor = getOwnPropertyDescriptor(nativeSource, key);
                  nativeProperty = descriptor && descriptor.value;
                } else nativeProperty = nativeSource[key];

                // export native or implementation
                sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

                if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

                // bind timers to global for call from export context
                if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$1);
                // wrap global constructors for prevent changs in this version
                else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
                // make static versions for prototype methods
                else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
                // default case
                else resultProperty = sourceProperty;

                // add a flag to not completely full polyfills
                if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
                  createNonEnumerableProperty(resultProperty, 'sham', true);
                }

                target[key] = resultProperty;

                if (PROTO) {
                  VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
                  if (!has$1(path, VIRTUAL_PROTOTYPE)) {
                    createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
                  }
                  // export virtual prototype methods
                  path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
                  // export real prototype methods
                  if (options.real && targetPrototype && !targetPrototype[key]) {
                    createNonEnumerableProperty(targetPrototype, key, sourceProperty);
                  }
                }
              }
            };

            // `Object.defineProperty` method
            // https://tc39.es/ecma262/#sec-object.defineproperty
            _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
              defineProperty: objectDefineProperty.f
            });

            var defineProperty_1 = createCommonjsModule(function (module) {
            var Object = path.Object;

            var defineProperty = module.exports = function defineProperty(it, key, desc) {
              return Object.defineProperty(it, key, desc);
            };

            if (Object.defineProperty.sham) defineProperty.sham = true;
            });

            var defineProperty$9 = defineProperty_1;

            var defineProperty$8 = defineProperty$9;

            var hiddenKeys$1 = {};

            var id = 0;
            var postfix = Math.random();

            var uid = function (key) {
              return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
            };

            var freezing = !fails(function () {
              return Object.isExtensible(Object.preventExtensions({}));
            });

            var internalMetadata = createCommonjsModule(function (module) {
            var defineProperty = objectDefineProperty.f;



            var METADATA = uid('meta');
            var id = 0;

            var isExtensible = Object.isExtensible || function () {
              return true;
            };

            var setMetadata = function (it) {
              defineProperty(it, METADATA, { value: {
                objectID: 'O' + ++id, // object ID
                weakData: {}          // weak collections IDs
              } });
            };

            var fastKey = function (it, create) {
              // return a primitive with prefix
              if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
              if (!has$1(it, METADATA)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return 'F';
                // not necessary to add metadata
                if (!create) return 'E';
                // add missing metadata
                setMetadata(it);
              // return object ID
              } return it[METADATA].objectID;
            };

            var getWeakData = function (it, create) {
              if (!has$1(it, METADATA)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return true;
                // not necessary to add metadata
                if (!create) return false;
                // add missing metadata
                setMetadata(it);
              // return the store of weak collections IDs
              } return it[METADATA].weakData;
            };

            // add metadata on freeze-family methods calling
            var onFreeze = function (it) {
              if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
              return it;
            };

            var meta = module.exports = {
              REQUIRED: false,
              fastKey: fastKey,
              getWeakData: getWeakData,
              onFreeze: onFreeze
            };

            hiddenKeys$1[METADATA] = true;
            });

            var setGlobal = function (key, value) {
              try {
                createNonEnumerableProperty(global$1, key, value);
              } catch (error) {
                global$1[key] = value;
              } return value;
            };

            var SHARED = '__core-js_shared__';
            var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

            var sharedStore = store$1;

            var shared$1 = createCommonjsModule(function (module) {
            (module.exports = function (key, value) {
              return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
            })('versions', []).push({
              version: '3.9.1',
              mode: 'pure' ,
              copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
            });
            });

            var engineIsNode = classofRaw(global$1.process) == 'process';

            var aFunction = function (variable) {
              return typeof variable == 'function' ? variable : undefined;
            };

            var getBuiltIn = function (namespace, method) {
              return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
                : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
            };

            var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

            var process = global$1.process;
            var versions = process && process.versions;
            var v8 = versions && versions.v8;
            var match, version;

            if (v8) {
              match = v8.split('.');
              version = match[0] + match[1];
            } else if (engineUserAgent) {
              match = engineUserAgent.match(/Edge\/(\d+)/);
              if (!match || match[1] >= 74) {
                match = engineUserAgent.match(/Chrome\/(\d+)/);
                if (match) version = match[1];
              }
            }

            var engineV8Version = version && +version;

            var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
              /* global Symbol -- required for testing */
              return !Symbol.sham &&
                // Chrome 38 Symbol has incorrect toString conversion
                // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
                (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
            });

            var useSymbolAsUid = nativeSymbol
              /* global Symbol -- safe */
              && !Symbol.sham
              && typeof Symbol.iterator == 'symbol';

            var WellKnownSymbolsStore$1 = shared$1('wks');
            var Symbol$1 = global$1.Symbol;
            var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

            var wellKnownSymbol = function (name) {
              if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
                if (nativeSymbol && has$1(Symbol$1, name)) {
                  WellKnownSymbolsStore$1[name] = Symbol$1[name];
                } else {
                  WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
                }
              } return WellKnownSymbolsStore$1[name];
            };

            var iterators = {};

            var ITERATOR$5 = wellKnownSymbol('iterator');
            var ArrayPrototype$6 = Array.prototype;

            // check on default Array iterator
            var isArrayIteratorMethod = function (it) {
              return it !== undefined && (iterators.Array === it || ArrayPrototype$6[ITERATOR$5] === it);
            };

            var ceil = Math.ceil;
            var floor = Math.floor;

            // `ToInteger` abstract operation
            // https://tc39.es/ecma262/#sec-tointeger
            var toInteger = function (argument) {
              return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
            };

            var min$1 = Math.min;

            // `ToLength` abstract operation
            // https://tc39.es/ecma262/#sec-tolength
            var toLength = function (argument) {
              return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
            };

            var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
            var test = {};

            test[TO_STRING_TAG$3] = 'z';

            var toStringTagSupport = String(test) === '[object z]';

            var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
            // ES3 wrong here
            var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

            // fallback for IE11 Script Access Denied error
            var tryGet = function (it, key) {
              try {
                return it[key];
              } catch (error) { /* empty */ }
            };

            // getting tag from ES6+ `Object.prototype.toString`
            var classof = toStringTagSupport ? classofRaw : function (it) {
              var O, tag, result;
              return it === undefined ? 'Undefined' : it === null ? 'Null'
                // @@toStringTag case
                : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
                // builtinTag case
                : CORRECT_ARGUMENTS ? classofRaw(O)
                // ES3 arguments fallback
                : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
            };

            var ITERATOR$4 = wellKnownSymbol('iterator');

            var getIteratorMethod$1 = function (it) {
              if (it != undefined) return it[ITERATOR$4]
                || it['@@iterator']
                || iterators[classof(it)];
            };

            var iteratorClose = function (iterator) {
              var returnMethod = iterator['return'];
              if (returnMethod !== undefined) {
                return anObject(returnMethod.call(iterator)).value;
              }
            };

            var Result = function (stopped, result) {
              this.stopped = stopped;
              this.result = result;
            };

            var iterate = function (iterable, unboundFunction, options) {
              var that = options && options.that;
              var AS_ENTRIES = !!(options && options.AS_ENTRIES);
              var IS_ITERATOR = !!(options && options.IS_ITERATOR);
              var INTERRUPTED = !!(options && options.INTERRUPTED);
              var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
              var iterator, iterFn, index, length, result, next, step;

              var stop = function (condition) {
                if (iterator) iteratorClose(iterator);
                return new Result(true, condition);
              };

              var callFn = function (value) {
                if (AS_ENTRIES) {
                  anObject(value);
                  return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
                } return INTERRUPTED ? fn(value, stop) : fn(value);
              };

              if (IS_ITERATOR) {
                iterator = iterable;
              } else {
                iterFn = getIteratorMethod$1(iterable);
                if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
                // optimisation for array iterators
                if (isArrayIteratorMethod(iterFn)) {
                  for (index = 0, length = toLength(iterable.length); length > index; index++) {
                    result = callFn(iterable[index]);
                    if (result && result instanceof Result) return result;
                  } return new Result(false);
                }
                iterator = iterFn.call(iterable);
              }

              next = iterator.next;
              while (!(step = next.call(iterator)).done) {
                try {
                  result = callFn(step.value);
                } catch (error) {
                  iteratorClose(iterator);
                  throw error;
                }
                if (typeof result == 'object' && result && result instanceof Result) return result;
              } return new Result(false);
            };

            var anInstance = function (it, Constructor, name) {
              if (!(it instanceof Constructor)) {
                throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
              } return it;
            };

            // `Object.prototype.toString` method implementation
            // https://tc39.es/ecma262/#sec-object.prototype.tostring
            var objectToString = toStringTagSupport ? {}.toString : function toString() {
              return '[object ' + classof(this) + ']';
            };

            var defineProperty$7 = objectDefineProperty.f;





            var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

            var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
              if (it) {
                var target = STATIC ? it : it.prototype;
                if (!has$1(target, TO_STRING_TAG$1)) {
                  defineProperty$7(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
                }
                if (SET_METHOD && !toStringTagSupport) {
                  createNonEnumerableProperty(target, 'toString', objectToString);
                }
              }
            };

            // `ToObject` abstract operation
            // https://tc39.es/ecma262/#sec-toobject
            var toObject$1 = function (argument) {
              return Object(requireObjectCoercible(argument));
            };

            // `IsArray` abstract operation
            // https://tc39.es/ecma262/#sec-isarray
            var isArray$5 = Array.isArray || function isArray(arg) {
              return classofRaw(arg) == 'Array';
            };

            var SPECIES$3 = wellKnownSymbol('species');

            // `ArraySpeciesCreate` abstract operation
            // https://tc39.es/ecma262/#sec-arrayspeciescreate
            var arraySpeciesCreate = function (originalArray, length) {
              var C;
              if (isArray$5(originalArray)) {
                C = originalArray.constructor;
                // cross-realm fallback
                if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
                else if (isObject(C)) {
                  C = C[SPECIES$3];
                  if (C === null) C = undefined;
                }
              } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
            };

            var push = [].push;

            // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
            var createMethod$2 = function (TYPE) {
              var IS_MAP = TYPE == 1;
              var IS_FILTER = TYPE == 2;
              var IS_SOME = TYPE == 3;
              var IS_EVERY = TYPE == 4;
              var IS_FIND_INDEX = TYPE == 6;
              var IS_FILTER_OUT = TYPE == 7;
              var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
              return function ($this, callbackfn, that, specificCreate) {
                var O = toObject$1($this);
                var self = indexedObject(O);
                var boundFunction = functionBindContext(callbackfn, that, 3);
                var length = toLength(self.length);
                var index = 0;
                var create = specificCreate || arraySpeciesCreate;
                var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
                var value, result;
                for (;length > index; index++) if (NO_HOLES || index in self) {
                  value = self[index];
                  result = boundFunction(value, index, O);
                  if (TYPE) {
                    if (IS_MAP) target[index] = result; // map
                    else if (result) switch (TYPE) {
                      case 3: return true;              // some
                      case 5: return value;             // find
                      case 6: return index;             // findIndex
                      case 2: push.call(target, value); // filter
                    } else switch (TYPE) {
                      case 4: return false;             // every
                      case 7: push.call(target, value); // filterOut
                    }
                  }
                }
                return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
              };
            };

            var arrayIteration = {
              // `Array.prototype.forEach` method
              // https://tc39.es/ecma262/#sec-array.prototype.foreach
              forEach: createMethod$2(0),
              // `Array.prototype.map` method
              // https://tc39.es/ecma262/#sec-array.prototype.map
              map: createMethod$2(1),
              // `Array.prototype.filter` method
              // https://tc39.es/ecma262/#sec-array.prototype.filter
              filter: createMethod$2(2),
              // `Array.prototype.some` method
              // https://tc39.es/ecma262/#sec-array.prototype.some
              some: createMethod$2(3),
              // `Array.prototype.every` method
              // https://tc39.es/ecma262/#sec-array.prototype.every
              every: createMethod$2(4),
              // `Array.prototype.find` method
              // https://tc39.es/ecma262/#sec-array.prototype.find
              find: createMethod$2(5),
              // `Array.prototype.findIndex` method
              // https://tc39.es/ecma262/#sec-array.prototype.findIndex
              findIndex: createMethod$2(6),
              // `Array.prototype.filterOut` method
              // https://github.com/tc39/proposal-array-filtering
              filterOut: createMethod$2(7)
            };

            var functionToString = Function.toString;

            // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
            if (typeof sharedStore.inspectSource != 'function') {
              sharedStore.inspectSource = function (it) {
                return functionToString.call(it);
              };
            }

            var inspectSource = sharedStore.inspectSource;

            var WeakMap$2 = global$1.WeakMap;

            var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource(WeakMap$2));

            var keys$6 = shared$1('keys');

            var sharedKey = function (key) {
              return keys$6[key] || (keys$6[key] = uid(key));
            };

            var WeakMap$1 = global$1.WeakMap;
            var set$3, get, has;

            var enforce = function (it) {
              return has(it) ? get(it) : set$3(it, {});
            };

            var getterFor = function (TYPE) {
              return function (it) {
                var state;
                if (!isObject(it) || (state = get(it)).type !== TYPE) {
                  throw TypeError('Incompatible receiver, ' + TYPE + ' required');
                } return state;
              };
            };

            if (nativeWeakMap) {
              var store = sharedStore.state || (sharedStore.state = new WeakMap$1());
              var wmget = store.get;
              var wmhas = store.has;
              var wmset = store.set;
              set$3 = function (it, metadata) {
                metadata.facade = it;
                wmset.call(store, it, metadata);
                return metadata;
              };
              get = function (it) {
                return wmget.call(store, it) || {};
              };
              has = function (it) {
                return wmhas.call(store, it);
              };
            } else {
              var STATE = sharedKey('state');
              hiddenKeys$1[STATE] = true;
              set$3 = function (it, metadata) {
                metadata.facade = it;
                createNonEnumerableProperty(it, STATE, metadata);
                return metadata;
              };
              get = function (it) {
                return has$1(it, STATE) ? it[STATE] : {};
              };
              has = function (it) {
                return has$1(it, STATE);
              };
            }

            var internalState = {
              set: set$3,
              get: get,
              has: has,
              enforce: enforce,
              getterFor: getterFor
            };

            var defineProperty$6 = objectDefineProperty.f;
            var forEach$3 = arrayIteration.forEach;



            var setInternalState$4 = internalState.set;
            var internalStateGetterFor$1 = internalState.getterFor;

            var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
              var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
              var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
              var ADDER = IS_MAP ? 'set' : 'add';
              var NativeConstructor = global$1[CONSTRUCTOR_NAME];
              var NativePrototype = NativeConstructor && NativeConstructor.prototype;
              var exported = {};
              var Constructor;

              if (!descriptors || typeof NativeConstructor != 'function'
                || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
              ) {
                // create collection constructor
                Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
                internalMetadata.REQUIRED = true;
              } else {
                Constructor = wrapper(function (target, iterable) {
                  setInternalState$4(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
                    type: CONSTRUCTOR_NAME,
                    collection: new NativeConstructor()
                  });
                  if (iterable != undefined) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
                });

                var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

                forEach$3(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
                  var IS_ADDER = KEY == 'add' || KEY == 'set';
                  if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
                    createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
                      var collection = getInternalState(this).collection;
                      if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
                      var result = collection[KEY](a === 0 ? 0 : a, b);
                      return IS_ADDER ? this : result;
                    });
                  }
                });

                IS_WEAK || defineProperty$6(Constructor.prototype, 'size', {
                  configurable: true,
                  get: function () {
                    return getInternalState(this).collection.size;
                  }
                });
              }

              setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

              exported[CONSTRUCTOR_NAME] = Constructor;
              _export({ global: true, forced: true }, exported);

              if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

              return Constructor;
            };

            var max$1 = Math.max;
            var min = Math.min;

            // Helper for a popular repeating case of the spec:
            // Let integer be ? ToInteger(index).
            // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
            var toAbsoluteIndex = function (index, length) {
              var integer = toInteger(index);
              return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
            };

            // `Array.prototype.{ indexOf, includes }` methods implementation
            var createMethod$1 = function (IS_INCLUDES) {
              return function ($this, el, fromIndex) {
                var O = toIndexedObject($this);
                var length = toLength(O.length);
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                // Array#includes uses SameValueZero equality algorithm
                // eslint-disable-next-line no-self-compare -- NaN check
                if (IS_INCLUDES && el != el) while (length > index) {
                  value = O[index++];
                  // eslint-disable-next-line no-self-compare -- NaN check
                  if (value != value) return true;
                // Array#indexOf ignores holes, Array#includes - not
                } else for (;length > index; index++) {
                  if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                } return !IS_INCLUDES && -1;
              };
            };

            var arrayIncludes = {
              // `Array.prototype.includes` method
              // https://tc39.es/ecma262/#sec-array.prototype.includes
              includes: createMethod$1(true),
              // `Array.prototype.indexOf` method
              // https://tc39.es/ecma262/#sec-array.prototype.indexof
              indexOf: createMethod$1(false)
            };

            var indexOf = arrayIncludes.indexOf;


            var objectKeysInternal = function (object, names) {
              var O = toIndexedObject(object);
              var i = 0;
              var result = [];
              var key;
              for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
              // Don't enum bug & hidden keys
              while (names.length > i) if (has$1(O, key = names[i++])) {
                ~indexOf(result, key) || result.push(key);
              }
              return result;
            };

            // IE8- don't enum bug keys
            var enumBugKeys = [
              'constructor',
              'hasOwnProperty',
              'isPrototypeOf',
              'propertyIsEnumerable',
              'toLocaleString',
              'toString',
              'valueOf'
            ];

            // `Object.keys` method
            // https://tc39.es/ecma262/#sec-object.keys
            var objectKeys = Object.keys || function keys(O) {
              return objectKeysInternal(O, enumBugKeys);
            };

            // `Object.defineProperties` method
            // https://tc39.es/ecma262/#sec-object.defineproperties
            var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
              anObject(O);
              var keys = objectKeys(Properties);
              var length = keys.length;
              var index = 0;
              var key;
              while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
              return O;
            };

            var html = getBuiltIn('document', 'documentElement');

            var GT = '>';
            var LT = '<';
            var PROTOTYPE$1 = 'prototype';
            var SCRIPT = 'script';
            var IE_PROTO$1 = sharedKey('IE_PROTO');

            var EmptyConstructor = function () { /* empty */ };

            var scriptTag = function (content) {
              return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
            };

            // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
            var NullProtoObjectViaActiveX = function (activeXDocument) {
              activeXDocument.write(scriptTag(''));
              activeXDocument.close();
              var temp = activeXDocument.parentWindow.Object;
              activeXDocument = null; // avoid memory leak
              return temp;
            };

            // Create object with fake `null` prototype: use iframe Object with cleared prototype
            var NullProtoObjectViaIFrame = function () {
              // Thrash, waste and sodomy: IE GC bug
              var iframe = documentCreateElement('iframe');
              var JS = 'java' + SCRIPT + ':';
              var iframeDocument;
              iframe.style.display = 'none';
              html.appendChild(iframe);
              // https://github.com/zloirock/core-js/issues/475
              iframe.src = String(JS);
              iframeDocument = iframe.contentWindow.document;
              iframeDocument.open();
              iframeDocument.write(scriptTag('document.F=Object'));
              iframeDocument.close();
              return iframeDocument.F;
            };

            // Check for document.domain and active x support
            // No need to use active x approach when document.domain is not set
            // see https://github.com/es-shims/es5-shim/issues/150
            // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
            // avoid IE GC bug
            var activeXDocument;
            var NullProtoObject = function () {
              try {
                /* global ActiveXObject -- old IE */
                activeXDocument = document.domain && new ActiveXObject('htmlfile');
              } catch (error) { /* ignore */ }
              NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
              var length = enumBugKeys.length;
              while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
              return NullProtoObject();
            };

            hiddenKeys$1[IE_PROTO$1] = true;

            // `Object.create` method
            // https://tc39.es/ecma262/#sec-object.create
            var objectCreate = Object.create || function create(O, Properties) {
              var result;
              if (O !== null) {
                EmptyConstructor[PROTOTYPE$1] = anObject(O);
                result = new EmptyConstructor();
                EmptyConstructor[PROTOTYPE$1] = null;
                // add "__proto__" for Object.getPrototypeOf polyfill
                result[IE_PROTO$1] = O;
              } else result = NullProtoObject();
              return Properties === undefined ? result : objectDefineProperties(result, Properties);
            };

            var redefine = function (target, key, value, options) {
              if (options && options.enumerable) target[key] = value;
              else createNonEnumerableProperty(target, key, value);
            };

            var redefineAll = function (target, src, options) {
              for (var key in src) {
                if (options && options.unsafe && target[key]) target[key] = src[key];
                else redefine(target, key, src[key], options);
              } return target;
            };

            var correctPrototypeGetter = !fails(function () {
              function F() { /* empty */ }
              F.prototype.constructor = null;
              return Object.getPrototypeOf(new F()) !== F.prototype;
            });

            var IE_PROTO = sharedKey('IE_PROTO');
            var ObjectPrototype$1 = Object.prototype;

            // `Object.getPrototypeOf` method
            // https://tc39.es/ecma262/#sec-object.getprototypeof
            var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
              O = toObject$1(O);
              if (has$1(O, IE_PROTO)) return O[IE_PROTO];
              if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                return O.constructor.prototype;
              } return O instanceof Object ? ObjectPrototype$1 : null;
            };

            var ITERATOR$3 = wellKnownSymbol('iterator');
            var BUGGY_SAFARI_ITERATORS$1 = false;

            var returnThis$2 = function () { return this; };

            // `%IteratorPrototype%` object
            // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
            var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

            if ([].keys) {
              arrayIterator = [].keys();
              // Safari 8 has buggy iterators w/o `next`
              if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
              else {
                PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
                if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
              }
            }

            var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
              var test = {};
              // FF44- legacy iterators case
              return IteratorPrototype$2[ITERATOR$3].call(test) !== test;
            });

            if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

            // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
            if ((NEW_ITERATOR_PROTOTYPE) && !has$1(IteratorPrototype$2, ITERATOR$3)) {
              createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$3, returnThis$2);
            }

            var iteratorsCore = {
              IteratorPrototype: IteratorPrototype$2,
              BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
            };

            var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





            var returnThis$1 = function () { return this; };

            var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
              var TO_STRING_TAG = NAME + ' Iterator';
              IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
              setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
              iterators[TO_STRING_TAG] = returnThis$1;
              return IteratorConstructor;
            };

            var aPossiblePrototype = function (it) {
              if (!isObject(it) && it !== null) {
                throw TypeError("Can't set " + String(it) + ' as a prototype');
              } return it;
            };

            /* eslint-disable no-proto -- safe */

            // `Object.setPrototypeOf` method
            // https://tc39.es/ecma262/#sec-object.setprototypeof
            // Works with __proto__ only. Old v8 can't work with null proto objects.
            Object.setPrototypeOf || ('__proto__' in {} ? function () {
              var CORRECT_SETTER = false;
              var test = {};
              var setter;
              try {
                setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
                setter.call(test, []);
                CORRECT_SETTER = test instanceof Array;
              } catch (error) { /* empty */ }
              return function setPrototypeOf(O, proto) {
                anObject(O);
                aPossiblePrototype(proto);
                if (CORRECT_SETTER) setter.call(O, proto);
                else O.__proto__ = proto;
                return O;
              };
            }() : undefined);

            var IteratorPrototype = iteratorsCore.IteratorPrototype;
            var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
            var ITERATOR$2 = wellKnownSymbol('iterator');
            var KEYS = 'keys';
            var VALUES = 'values';
            var ENTRIES = 'entries';

            var returnThis = function () { return this; };

            var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
              createIteratorConstructor(IteratorConstructor, NAME, next);

              var getIterationMethod = function (KIND) {
                if (KIND === DEFAULT && defaultIterator) return defaultIterator;
                if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
                switch (KIND) {
                  case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
                  case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
                  case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
                } return function () { return new IteratorConstructor(this); };
              };

              var TO_STRING_TAG = NAME + ' Iterator';
              var INCORRECT_VALUES_NAME = false;
              var IterablePrototype = Iterable.prototype;
              var nativeIterator = IterablePrototype[ITERATOR$2]
                || IterablePrototype['@@iterator']
                || DEFAULT && IterablePrototype[DEFAULT];
              var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
              var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
              var CurrentIteratorPrototype, methods, KEY;

              // fix native
              if (anyNativeIterator) {
                CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
                if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                  // Set @@toStringTag to native iterators
                  setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                  iterators[TO_STRING_TAG] = returnThis;
                }
              }

              // fix Array#{values, @@iterator}.name in V8 / FF
              if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                INCORRECT_VALUES_NAME = true;
                defaultIterator = function values() { return nativeIterator.call(this); };
              }

              // define iterator
              if ((FORCED) && IterablePrototype[ITERATOR$2] !== defaultIterator) {
                createNonEnumerableProperty(IterablePrototype, ITERATOR$2, defaultIterator);
              }
              iterators[NAME] = defaultIterator;

              // export additional methods
              if (DEFAULT) {
                methods = {
                  values: getIterationMethod(VALUES),
                  keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                  entries: getIterationMethod(ENTRIES)
                };
                if (FORCED) for (KEY in methods) {
                  if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                    redefine(IterablePrototype, KEY, methods[KEY]);
                  }
                } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
              }

              return methods;
            };

            var SPECIES$2 = wellKnownSymbol('species');

            var setSpecies = function (CONSTRUCTOR_NAME) {
              var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
              var defineProperty = objectDefineProperty.f;

              if (descriptors && Constructor && !Constructor[SPECIES$2]) {
                defineProperty(Constructor, SPECIES$2, {
                  configurable: true,
                  get: function () { return this; }
                });
              }
            };

            var defineProperty$5 = objectDefineProperty.f;








            var fastKey = internalMetadata.fastKey;


            var setInternalState$3 = internalState.set;
            var internalStateGetterFor = internalState.getterFor;

            var collectionStrong = {
              getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
                var C = wrapper(function (that, iterable) {
                  anInstance(that, C, CONSTRUCTOR_NAME);
                  setInternalState$3(that, {
                    type: CONSTRUCTOR_NAME,
                    index: objectCreate(null),
                    first: undefined,
                    last: undefined,
                    size: 0
                  });
                  if (!descriptors) that.size = 0;
                  if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
                });

                var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

                var define = function (that, key, value) {
                  var state = getInternalState(that);
                  var entry = getEntry(that, key);
                  var previous, index;
                  // change existing entry
                  if (entry) {
                    entry.value = value;
                  // create new entry
                  } else {
                    state.last = entry = {
                      index: index = fastKey(key, true),
                      key: key,
                      value: value,
                      previous: previous = state.last,
                      next: undefined,
                      removed: false
                    };
                    if (!state.first) state.first = entry;
                    if (previous) previous.next = entry;
                    if (descriptors) state.size++;
                    else that.size++;
                    // add to index
                    if (index !== 'F') state.index[index] = entry;
                  } return that;
                };

                var getEntry = function (that, key) {
                  var state = getInternalState(that);
                  // fast case
                  var index = fastKey(key);
                  var entry;
                  if (index !== 'F') return state.index[index];
                  // frozen object case
                  for (entry = state.first; entry; entry = entry.next) {
                    if (entry.key == key) return entry;
                  }
                };

                redefineAll(C.prototype, {
                  // 23.1.3.1 Map.prototype.clear()
                  // 23.2.3.2 Set.prototype.clear()
                  clear: function clear() {
                    var that = this;
                    var state = getInternalState(that);
                    var data = state.index;
                    var entry = state.first;
                    while (entry) {
                      entry.removed = true;
                      if (entry.previous) entry.previous = entry.previous.next = undefined;
                      delete data[entry.index];
                      entry = entry.next;
                    }
                    state.first = state.last = undefined;
                    if (descriptors) state.size = 0;
                    else that.size = 0;
                  },
                  // 23.1.3.3 Map.prototype.delete(key)
                  // 23.2.3.4 Set.prototype.delete(value)
                  'delete': function (key) {
                    var that = this;
                    var state = getInternalState(that);
                    var entry = getEntry(that, key);
                    if (entry) {
                      var next = entry.next;
                      var prev = entry.previous;
                      delete state.index[entry.index];
                      entry.removed = true;
                      if (prev) prev.next = next;
                      if (next) next.previous = prev;
                      if (state.first == entry) state.first = next;
                      if (state.last == entry) state.last = prev;
                      if (descriptors) state.size--;
                      else that.size--;
                    } return !!entry;
                  },
                  // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                  // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                  forEach: function forEach(callbackfn /* , that = undefined */) {
                    var state = getInternalState(this);
                    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
                    var entry;
                    while (entry = entry ? entry.next : state.first) {
                      boundFunction(entry.value, entry.key, this);
                      // revert to the last existing entry
                      while (entry && entry.removed) entry = entry.previous;
                    }
                  },
                  // 23.1.3.7 Map.prototype.has(key)
                  // 23.2.3.7 Set.prototype.has(value)
                  has: function has(key) {
                    return !!getEntry(this, key);
                  }
                });

                redefineAll(C.prototype, IS_MAP ? {
                  // 23.1.3.6 Map.prototype.get(key)
                  get: function get(key) {
                    var entry = getEntry(this, key);
                    return entry && entry.value;
                  },
                  // 23.1.3.9 Map.prototype.set(key, value)
                  set: function set(key, value) {
                    return define(this, key === 0 ? 0 : key, value);
                  }
                } : {
                  // 23.2.3.1 Set.prototype.add(value)
                  add: function add(value) {
                    return define(this, value = value === 0 ? 0 : value, value);
                  }
                });
                if (descriptors) defineProperty$5(C.prototype, 'size', {
                  get: function () {
                    return getInternalState(this).size;
                  }
                });
                return C;
              },
              setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
                var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
                var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
                var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
                // add .keys, .values, .entries, [@@iterator]
                // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
                defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
                  setInternalState$3(this, {
                    type: ITERATOR_NAME,
                    target: iterated,
                    state: getInternalCollectionState(iterated),
                    kind: kind,
                    last: undefined
                  });
                }, function () {
                  var state = getInternalIteratorState(this);
                  var kind = state.kind;
                  var entry = state.last;
                  // revert to the last existing entry
                  while (entry && entry.removed) entry = entry.previous;
                  // get next entry
                  if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                    // or finish the iteration
                    state.target = undefined;
                    return { value: undefined, done: true };
                  }
                  // return step by kind
                  if (kind == 'keys') return { value: entry.key, done: false };
                  if (kind == 'values') return { value: entry.value, done: false };
                  return { value: [entry.key, entry.value], done: false };
                }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

                // add [@@species], 23.1.2.2, 23.2.2.2
                setSpecies(CONSTRUCTOR_NAME);
              }
            };

            // `Map` constructor
            // https://tc39.es/ecma262/#sec-map-objects
            collection('Map', function (init) {
              return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
            }, collectionStrong);

            // `String.prototype.{ codePointAt, at }` methods implementation
            var createMethod = function (CONVERT_TO_STRING) {
              return function ($this, pos) {
                var S = String(requireObjectCoercible($this));
                var position = toInteger(pos);
                var size = S.length;
                var first, second;
                if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
                first = S.charCodeAt(position);
                return first < 0xD800 || first > 0xDBFF || position + 1 === size
                  || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
                    ? CONVERT_TO_STRING ? S.charAt(position) : first
                    : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
              };
            };

            var stringMultibyte = {
              // `String.prototype.codePointAt` method
              // https://tc39.es/ecma262/#sec-string.prototype.codepointat
              codeAt: createMethod(false),
              // `String.prototype.at` method
              // https://github.com/mathiasbynens/String.prototype.at
              charAt: createMethod(true)
            };

            var charAt = stringMultibyte.charAt;



            var STRING_ITERATOR = 'String Iterator';
            var setInternalState$2 = internalState.set;
            var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

            // `String.prototype[@@iterator]` method
            // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
            defineIterator(String, 'String', function (iterated) {
              setInternalState$2(this, {
                type: STRING_ITERATOR,
                string: String(iterated),
                index: 0
              });
            // `%StringIteratorPrototype%.next` method
            // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
            }, function next() {
              var state = getInternalState$2(this);
              var string = state.string;
              var index = state.index;
              var point;
              if (index >= string.length) return { value: undefined, done: true };
              point = charAt(string, index);
              state.index += point.length;
              return { value: point, done: false };
            });

            var ARRAY_ITERATOR = 'Array Iterator';
            var setInternalState$1 = internalState.set;
            var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

            // `Array.prototype.entries` method
            // https://tc39.es/ecma262/#sec-array.prototype.entries
            // `Array.prototype.keys` method
            // https://tc39.es/ecma262/#sec-array.prototype.keys
            // `Array.prototype.values` method
            // https://tc39.es/ecma262/#sec-array.prototype.values
            // `Array.prototype[@@iterator]` method
            // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
            // `CreateArrayIterator` internal method
            // https://tc39.es/ecma262/#sec-createarrayiterator
            defineIterator(Array, 'Array', function (iterated, kind) {
              setInternalState$1(this, {
                type: ARRAY_ITERATOR,
                target: toIndexedObject(iterated), // target
                index: 0,                          // next index
                kind: kind                         // kind
              });
            // `%ArrayIteratorPrototype%.next` method
            // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
            }, function () {
              var state = getInternalState$1(this);
              var target = state.target;
              var kind = state.kind;
              var index = state.index++;
              if (!target || index >= target.length) {
                state.target = undefined;
                return { value: undefined, done: true };
              }
              if (kind == 'keys') return { value: index, done: false };
              if (kind == 'values') return { value: target[index], done: false };
              return { value: [index, target[index]], done: false };
            }, 'values');

            // argumentsList[@@iterator] is %ArrayProto_values%
            // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
            // https://tc39.es/ecma262/#sec-createmappedargumentsobject
            iterators.Arguments = iterators.Array;

            // iterable DOM collections
            // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
            var domIterables = {
              CSSRuleList: 0,
              CSSStyleDeclaration: 0,
              CSSValueList: 0,
              ClientRectList: 0,
              DOMRectList: 0,
              DOMStringList: 0,
              DOMTokenList: 1,
              DataTransferItemList: 0,
              FileList: 0,
              HTMLAllCollection: 0,
              HTMLCollection: 0,
              HTMLFormElement: 0,
              HTMLSelectElement: 0,
              MediaList: 0,
              MimeTypeArray: 0,
              NamedNodeMap: 0,
              NodeList: 1,
              PaintRequestList: 0,
              Plugin: 0,
              PluginArray: 0,
              SVGLengthList: 0,
              SVGNumberList: 0,
              SVGPathSegList: 0,
              SVGPointList: 0,
              SVGStringList: 0,
              SVGTransformList: 0,
              SourceBufferList: 0,
              StyleSheetList: 0,
              TextTrackCueList: 0,
              TextTrackList: 0,
              TouchList: 0
            };

            var TO_STRING_TAG = wellKnownSymbol('toStringTag');

            for (var COLLECTION_NAME in domIterables) {
              var Collection = global$1[COLLECTION_NAME];
              var CollectionPrototype = Collection && Collection.prototype;
              if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
                createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
              }
              iterators[COLLECTION_NAME] = iterators.Array;
            }

            var map$2 = path.Map;

            var map$1 = map$2;

            var map = map$1;

            var ariaPropsMap_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _map = interopRequireDefault(map);

            var ariaPropsMap = new _map.default([['aria-activedescendant', {
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
            }]]);
            var _default = ariaPropsMap;
            exports.default = _default;
            });

            var domMap_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _map = interopRequireDefault(map);

            var domMap = new _map.default([['a', {
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
            }]]);
            var _default = domMap;
            exports.default = _default;
            });

            var getIterator$1 = function (it) {
              var iteratorMethod = getIteratorMethod$1(it);
              if (typeof iteratorMethod != 'function') {
                throw TypeError(String(it) + ' is not iterable');
              } return anObject(iteratorMethod.call(it));
            };

            var getIterator_1 = getIterator$1;

            var getIterator = getIterator_1;

            // `Array.isArray` method
            // https://tc39.es/ecma262/#sec-array.isarray
            _export({ target: 'Array', stat: true }, {
              isArray: isArray$5
            });

            var isArray$4 = path.Array.isArray;

            var isArray$3 = isArray$4;

            var isArray$2 = isArray$3;

            var getIteratorMethod_1 = getIteratorMethod$1;

            var getIteratorMethod = getIteratorMethod_1;

            var createProperty = function (object, key, value) {
              var propertyKey = toPrimitive(key);
              if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
              else object[propertyKey] = value;
            };

            var SPECIES$1 = wellKnownSymbol('species');

            var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
              // We can't use this feature detection in V8 since it causes
              // deoptimization and serious performance degradation
              // https://github.com/zloirock/core-js/issues/677
              return engineV8Version >= 51 || !fails(function () {
                var array = [];
                var constructor = array.constructor = {};
                constructor[SPECIES$1] = function () {
                  return { foo: 1 };
                };
                return array[METHOD_NAME](Boolean).foo !== 1;
              });
            };

            var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
            var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
            var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

            // We can't use this feature detection in V8 since it causes
            // deoptimization and serious performance degradation
            // https://github.com/zloirock/core-js/issues/679
            var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
              var array = [];
              array[IS_CONCAT_SPREADABLE] = false;
              return array.concat()[0] !== array;
            });

            var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

            var isConcatSpreadable = function (O) {
              if (!isObject(O)) return false;
              var spreadable = O[IS_CONCAT_SPREADABLE];
              return spreadable !== undefined ? !!spreadable : isArray$5(O);
            };

            var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

            // `Array.prototype.concat` method
            // https://tc39.es/ecma262/#sec-array.prototype.concat
            // with adding support of @@isConcatSpreadable and @@species
            _export({ target: 'Array', proto: true, forced: FORCED$1 }, {
              // eslint-disable-next-line no-unused-vars -- required for `.length`
              concat: function concat(arg) {
                var O = toObject$1(this);
                var A = arraySpeciesCreate(O, 0);
                var n = 0;
                var i, k, length, len, E;
                for (i = -1, length = arguments.length; i < length; i++) {
                  E = i === -1 ? O : arguments[i];
                  if (isConcatSpreadable(E)) {
                    len = toLength(E.length);
                    if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                    for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
                  } else {
                    if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                    createProperty(A, n++, E);
                  }
                }
                A.length = n;
                return A;
              }
            });

            var hiddenKeys = enumBugKeys.concat('length', 'prototype');

            // `Object.getOwnPropertyNames` method
            // https://tc39.es/ecma262/#sec-object.getownpropertynames
            var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
              return objectKeysInternal(O, hiddenKeys);
            };

            var objectGetOwnPropertyNames = {
            	f: f$3
            };

            var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

            var toString = {}.toString;

            var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
              ? Object.getOwnPropertyNames(window) : [];

            var getWindowNames = function (it) {
              try {
                return nativeGetOwnPropertyNames$1(it);
              } catch (error) {
                return windowNames.slice();
              }
            };

            // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
            var f$2 = function getOwnPropertyNames(it) {
              return windowNames && toString.call(it) == '[object Window]'
                ? getWindowNames(it)
                : nativeGetOwnPropertyNames$1(toIndexedObject(it));
            };

            var objectGetOwnPropertyNamesExternal = {
            	f: f$2
            };

            var f$1 = Object.getOwnPropertySymbols;

            var objectGetOwnPropertySymbols = {
            	f: f$1
            };

            var f = wellKnownSymbol;

            var wellKnownSymbolWrapped = {
            	f: f
            };

            var defineProperty$4 = objectDefineProperty.f;

            var defineWellKnownSymbol = function (NAME) {
              var Symbol = path.Symbol || (path.Symbol = {});
              if (!has$1(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
                value: wellKnownSymbolWrapped.f(NAME)
              });
            };

            var $forEach$1 = arrayIteration.forEach;

            var HIDDEN = sharedKey('hidden');
            var SYMBOL = 'Symbol';
            var PROTOTYPE = 'prototype';
            var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
            var setInternalState = internalState.set;
            var getInternalState = internalState.getterFor(SYMBOL);
            var ObjectPrototype = Object[PROTOTYPE];
            var $Symbol = global$1.Symbol;
            var $stringify$1 = getBuiltIn('JSON', 'stringify');
            var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
            var nativeDefineProperty = objectDefineProperty.f;
            var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
            var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
            var AllSymbols = shared$1('symbols');
            var ObjectPrototypeSymbols = shared$1('op-symbols');
            var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
            var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
            var WellKnownSymbolsStore = shared$1('wks');
            var QObject = global$1.QObject;
            // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
            var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

            // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
            var setSymbolDescriptor = descriptors && fails(function () {
              return objectCreate(nativeDefineProperty({}, 'a', {
                get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
              })).a != 7;
            }) ? function (O, P, Attributes) {
              var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
              if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
              nativeDefineProperty(O, P, Attributes);
              if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
                nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
              }
            } : nativeDefineProperty;

            var wrap = function (tag, description) {
              var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
              setInternalState(symbol, {
                type: SYMBOL,
                tag: tag,
                description: description
              });
              if (!descriptors) symbol.description = description;
              return symbol;
            };

            var isSymbol = useSymbolAsUid ? function (it) {
              return typeof it == 'symbol';
            } : function (it) {
              return Object(it) instanceof $Symbol;
            };

            var $defineProperty = function defineProperty(O, P, Attributes) {
              if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
              anObject(O);
              var key = toPrimitive(P, true);
              anObject(Attributes);
              if (has$1(AllSymbols, key)) {
                if (!Attributes.enumerable) {
                  if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                  O[HIDDEN][key] = true;
                } else {
                  if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                  Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
                } return setSymbolDescriptor(O, key, Attributes);
              } return nativeDefineProperty(O, key, Attributes);
            };

            var $defineProperties = function defineProperties(O, Properties) {
              anObject(O);
              var properties = toIndexedObject(Properties);
              var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
              $forEach$1(keys, function (key) {
                if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
              });
              return O;
            };

            var $create = function create(O, Properties) {
              return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
            };

            var $propertyIsEnumerable = function propertyIsEnumerable(V) {
              var P = toPrimitive(V, true);
              var enumerable = nativePropertyIsEnumerable.call(this, P);
              if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
              return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
            };

            var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
              var it = toIndexedObject(O);
              var key = toPrimitive(P, true);
              if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
              var descriptor = nativeGetOwnPropertyDescriptor(it, key);
              if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
                descriptor.enumerable = true;
              }
              return descriptor;
            };

            var $getOwnPropertyNames = function getOwnPropertyNames(O) {
              var names = nativeGetOwnPropertyNames(toIndexedObject(O));
              var result = [];
              $forEach$1(names, function (key) {
                if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
              });
              return result;
            };

            var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
              var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
              var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
              var result = [];
              $forEach$1(names, function (key) {
                if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
                  result.push(AllSymbols[key]);
                }
              });
              return result;
            };

            // `Symbol` constructor
            // https://tc39.es/ecma262/#sec-symbol-constructor
            if (!nativeSymbol) {
              $Symbol = function Symbol() {
                if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
                var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
                var tag = uid(description);
                var setter = function (value) {
                  if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
                  if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                  setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
                };
                if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
                return wrap(tag, description);
              };

              redefine($Symbol[PROTOTYPE], 'toString', function toString() {
                return getInternalState(this).tag;
              });

              redefine($Symbol, 'withoutSetter', function (description) {
                return wrap(uid(description), description);
              });

              objectPropertyIsEnumerable.f = $propertyIsEnumerable;
              objectDefineProperty.f = $defineProperty;
              objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
              objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
              objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

              wellKnownSymbolWrapped.f = function (name) {
                return wrap(wellKnownSymbol(name), name);
              };

              if (descriptors) {
                // https://github.com/tc39/proposal-Symbol-description
                nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
                  configurable: true,
                  get: function description() {
                    return getInternalState(this).description;
                  }
                });
              }
            }

            _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
              Symbol: $Symbol
            });

            $forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
              defineWellKnownSymbol(name);
            });

            _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
              // `Symbol.for` method
              // https://tc39.es/ecma262/#sec-symbol.for
              'for': function (key) {
                var string = String(key);
                if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
                var symbol = $Symbol(string);
                StringToSymbolRegistry[string] = symbol;
                SymbolToStringRegistry[symbol] = string;
                return symbol;
              },
              // `Symbol.keyFor` method
              // https://tc39.es/ecma262/#sec-symbol.keyfor
              keyFor: function keyFor(sym) {
                if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
                if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
              },
              useSetter: function () { USE_SETTER = true; },
              useSimple: function () { USE_SETTER = false; }
            });

            _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
              // `Object.create` method
              // https://tc39.es/ecma262/#sec-object.create
              create: $create,
              // `Object.defineProperty` method
              // https://tc39.es/ecma262/#sec-object.defineproperty
              defineProperty: $defineProperty,
              // `Object.defineProperties` method
              // https://tc39.es/ecma262/#sec-object.defineproperties
              defineProperties: $defineProperties,
              // `Object.getOwnPropertyDescriptor` method
              // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
              getOwnPropertyDescriptor: $getOwnPropertyDescriptor
            });

            _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
              // `Object.getOwnPropertyNames` method
              // https://tc39.es/ecma262/#sec-object.getownpropertynames
              getOwnPropertyNames: $getOwnPropertyNames,
              // `Object.getOwnPropertySymbols` method
              // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
              getOwnPropertySymbols: $getOwnPropertySymbols
            });

            // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
            // https://bugs.chromium.org/p/v8/issues/detail?id=3443
            _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
              getOwnPropertySymbols: function getOwnPropertySymbols(it) {
                return objectGetOwnPropertySymbols.f(toObject$1(it));
              }
            });

            // `JSON.stringify` method behavior with symbols
            // https://tc39.es/ecma262/#sec-json.stringify
            if ($stringify$1) {
              var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
                var symbol = $Symbol();
                // MS Edge converts symbol values to JSON as {}
                return $stringify$1([symbol]) != '[null]'
                  // WebKit converts symbol values to JSON as null
                  || $stringify$1({ a: symbol }) != '{}'
                  // V8 throws on boxed symbols
                  || $stringify$1(Object(symbol)) != '{}';
              });

              _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
                // eslint-disable-next-line no-unused-vars -- required for `.length`
                stringify: function stringify(it, replacer, space) {
                  var args = [it];
                  var index = 1;
                  var $replacer;
                  while (arguments.length > index) args.push(arguments[index++]);
                  $replacer = replacer;
                  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
                  if (!isArray$5(replacer)) replacer = function (key, value) {
                    if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
                    if (!isSymbol(value)) return value;
                  };
                  args[1] = replacer;
                  return $stringify$1.apply(null, args);
                }
              });
            }

            // `Symbol.prototype[@@toPrimitive]` method
            // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
            if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
              createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
            }
            // `Symbol.prototype[@@toStringTag]` property
            // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
            setToStringTag($Symbol, SYMBOL);

            hiddenKeys$1[HIDDEN] = true;

            // `Symbol.asyncIterator` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.asynciterator
            defineWellKnownSymbol('asyncIterator');

            // `Symbol.hasInstance` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.hasinstance
            defineWellKnownSymbol('hasInstance');

            // `Symbol.isConcatSpreadable` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
            defineWellKnownSymbol('isConcatSpreadable');

            // `Symbol.iterator` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.iterator
            defineWellKnownSymbol('iterator');

            // `Symbol.match` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.match
            defineWellKnownSymbol('match');

            // `Symbol.matchAll` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.matchall
            defineWellKnownSymbol('matchAll');

            // `Symbol.replace` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.replace
            defineWellKnownSymbol('replace');

            // `Symbol.search` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.search
            defineWellKnownSymbol('search');

            // `Symbol.species` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.species
            defineWellKnownSymbol('species');

            // `Symbol.split` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.split
            defineWellKnownSymbol('split');

            // `Symbol.toPrimitive` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.toprimitive
            defineWellKnownSymbol('toPrimitive');

            // `Symbol.toStringTag` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.tostringtag
            defineWellKnownSymbol('toStringTag');

            // `Symbol.unscopables` well-known symbol
            // https://tc39.es/ecma262/#sec-symbol.unscopables
            defineWellKnownSymbol('unscopables');

            // JSON[@@toStringTag] property
            // https://tc39.es/ecma262/#sec-json-@@tostringtag
            setToStringTag(global$1.JSON, 'JSON', true);

            var symbol$4 = path.Symbol;

            var symbol$3 = symbol$4;

            var symbol$2 = symbol$3;

            // call something on iterator step with safe closing on error
            var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
              try {
                return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
              // 7.4.6 IteratorClose(iterator, completion)
              } catch (error) {
                iteratorClose(iterator);
                throw error;
              }
            };

            // `Array.from` method implementation
            // https://tc39.es/ecma262/#sec-array.from
            var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
              var O = toObject$1(arrayLike);
              var C = typeof this == 'function' ? this : Array;
              var argumentsLength = arguments.length;
              var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
              var mapping = mapfn !== undefined;
              var iteratorMethod = getIteratorMethod$1(O);
              var index = 0;
              var length, result, step, iterator, next, value;
              if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
              // if the target is not iterable or it's an array with the default iterator - use a simple case
              if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
                iterator = iteratorMethod.call(O);
                next = iterator.next;
                result = new C();
                for (;!(step = next.call(iterator)).done; index++) {
                  value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
                  createProperty(result, index, value);
                }
              } else {
                length = toLength(O.length);
                result = new C(length);
                for (;length > index; index++) {
                  value = mapping ? mapfn(O[index], index) : O[index];
                  createProperty(result, index, value);
                }
              }
              result.length = index;
              return result;
            };

            var ITERATOR$1 = wellKnownSymbol('iterator');
            var SAFE_CLOSING = false;

            try {
              var called = 0;
              var iteratorWithReturn = {
                next: function () {
                  return { done: !!called++ };
                },
                'return': function () {
                  SAFE_CLOSING = true;
                }
              };
              iteratorWithReturn[ITERATOR$1] = function () {
                return this;
              };
              // eslint-disable-next-line no-throw-literal -- required for testing
              Array.from(iteratorWithReturn, function () { throw 2; });
            } catch (error) { /* empty */ }

            var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
              if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
              var ITERATION_SUPPORT = false;
              try {
                var object = {};
                object[ITERATOR$1] = function () {
                  return {
                    next: function () {
                      return { done: ITERATION_SUPPORT = true };
                    }
                  };
                };
                exec(object);
              } catch (error) { /* empty */ }
              return ITERATION_SUPPORT;
            };

            var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
              Array.from(iterable);
            });

            // `Array.from` method
            // https://tc39.es/ecma262/#sec-array.from
            _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
              from: arrayFrom
            });

            var from$4 = path.Array.from;

            var from$3 = from$4;

            var from$2 = from$3;

            var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

            var SPECIES = wellKnownSymbol('species');
            var nativeSlice = [].slice;
            var max = Math.max;

            // `Array.prototype.slice` method
            // https://tc39.es/ecma262/#sec-array.prototype.slice
            // fallback for not array-like ES3 strings and DOM objects
            _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
              slice: function slice(start, end) {
                var O = toIndexedObject(this);
                var length = toLength(O.length);
                var k = toAbsoluteIndex(start, length);
                var fin = toAbsoluteIndex(end === undefined ? length : end, length);
                // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
                var Constructor, result, n;
                if (isArray$5(O)) {
                  Constructor = O.constructor;
                  // cross-realm fallback
                  if (typeof Constructor == 'function' && (Constructor === Array || isArray$5(Constructor.prototype))) {
                    Constructor = undefined;
                  } else if (isObject(Constructor)) {
                    Constructor = Constructor[SPECIES];
                    if (Constructor === null) Constructor = undefined;
                  }
                  if (Constructor === Array || Constructor === undefined) {
                    return nativeSlice.call(O, k, fin);
                  }
                }
                result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
                for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
                result.length = n;
                return result;
              }
            });

            var entryVirtual = function (CONSTRUCTOR) {
              return path[CONSTRUCTOR + 'Prototype'];
            };

            var slice$4 = entryVirtual('Array').slice;

            var ArrayPrototype$5 = Array.prototype;

            var slice_1 = function (it) {
              var own = it.slice;
              return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.slice) ? slice$4 : own;
            };

            var slice$3 = slice_1;

            var slice$2 = slice$3;

            var defineProperty$3 = defineProperty_1;

            var defineProperty$2 = defineProperty$3;

            var defineProperty$1 = createCommonjsModule(function (module) {
            function _defineProperty(obj, key, value) {
              if (key in obj) {
                defineProperty$2(obj, key, {
                  value: value,
                  enumerable: true,
                  configurable: true,
                  writable: true
                });
              } else {
                obj[key] = value;
              }

              return obj;
            }

            module.exports = _defineProperty;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var nativeAssign = Object.assign;
            var defineProperty = Object.defineProperty;

            // `Object.assign` method
            // https://tc39.es/ecma262/#sec-object.assign
            var objectAssign$1 = !nativeAssign || fails(function () {
              // should have correct order of operations (Edge bug)
              if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
                enumerable: true,
                get: function () {
                  defineProperty(this, 'b', {
                    value: 3,
                    enumerable: false
                  });
                }
              }), { b: 2 })).b !== 1) return true;
              // should work with symbols and should have deterministic property order (V8 bug)
              var A = {};
              var B = {};
              /* global Symbol -- required for testing */
              var symbol = Symbol();
              var alphabet = 'abcdefghijklmnopqrst';
              A[symbol] = 7;
              alphabet.split('').forEach(function (chr) { B[chr] = chr; });
              return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
            }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
              var T = toObject$1(target);
              var argumentsLength = arguments.length;
              var index = 1;
              var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
              var propertyIsEnumerable = objectPropertyIsEnumerable.f;
              while (argumentsLength > index) {
                var S = indexedObject(arguments[index++]);
                var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
                var length = keys.length;
                var j = 0;
                var key;
                while (length > j) {
                  key = keys[j++];
                  if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
                }
              } return T;
            } : nativeAssign;

            // `Object.assign` method
            // https://tc39.es/ecma262/#sec-object.assign
            _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign$1 }, {
              assign: objectAssign$1
            });

            var assign$2 = path.Object.assign;

            var assign$1 = assign$2;

            var assign = assign$1;

            var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

            // `Object.keys` method
            // https://tc39.es/ecma262/#sec-object.keys
            _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
              keys: function keys(it) {
                return objectKeys(toObject$1(it));
              }
            });

            var keys$5 = path.Object.keys;

            var keys$4 = keys$5;

            var keys$3 = keys$4;

            var arrayMethodIsStrict = function (METHOD_NAME, argument) {
              var method = [][METHOD_NAME];
              return !!method && fails(function () {
                // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
                method.call(null, argument || function () { throw 1; }, 1);
              });
            };

            var $forEach = arrayIteration.forEach;


            var STRICT_METHOD = arrayMethodIsStrict('forEach');

            // `Array.prototype.forEach` method implementation
            // https://tc39.es/ecma262/#sec-array.prototype.foreach
            var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
              return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            } : [].forEach;

            // `Array.prototype.forEach` method
            // https://tc39.es/ecma262/#sec-array.prototype.foreach
            _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
              forEach: arrayForEach
            });

            var forEach$2 = entryVirtual('Array').forEach;

            var forEach$1 = forEach$2;

            var ArrayPrototype$4 = Array.prototype;

            var DOMIterables$2 = {
              DOMTokenList: true,
              NodeList: true
            };

            var forEach_1 = function (it) {
              var own = it.forEach;
              return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.forEach)
                // eslint-disable-next-line no-prototype-builtins -- safe
                || DOMIterables$2.hasOwnProperty(classof(it)) ? forEach$1 : own;
            };

            var forEach = forEach_1;

            var commandRole_1 = createCommonjsModule(function (module, exports) {



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-valuenow': null,
                'aria-valuetext': null
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _map = interopRequireDefault(map);

            var _commandRole = interopRequireDefault(commandRole_1);

            var _compositeRole = interopRequireDefault(compositeRole_1);

            var _inputRole = interopRequireDefault(inputRole_1);

            var _landmarkRole = interopRequireDefault(landmarkRole_1);

            var _rangeRole = interopRequireDefault(rangeRole_1);

            var _roletypeRole = interopRequireDefault(roletypeRole_1);

            var _sectionRole = interopRequireDefault(sectionRole_1);

            var _sectionheadRole = interopRequireDefault(sectionheadRole_1);

            var _selectRole = interopRequireDefault(selectRole_1);

            var _structureRole = interopRequireDefault(structureRole_1);

            var _widgetRole = interopRequireDefault(widgetRole_1);

            var _windowRole = interopRequireDefault(windowRole_1);

            var ariaAbstractRoles = new _map.default([['command', _commandRole.default], ['composite', _compositeRole.default], ['input', _inputRole.default], ['landmark', _landmarkRole.default], ['range', _rangeRole.default], ['roletype', _roletypeRole.default], ['section', _sectionRole.default], ['sectionhead', _sectionheadRole.default], ['select', _selectRole.default], ['structure', _structureRole.default], ['widget', _widgetRole.default], ['window', _windowRole.default]]);
            var _default = ariaAbstractRoles;
            exports.default = _default;
            });

            var alertRole_1 = createCommonjsModule(function (module, exports) {



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-level': null
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
                'aria-level': 2
              },
              superClass: [['roletype', 'structure', 'sectionhead']]
            };
            var _default = headingRole;
            exports.default = _default;
            });

            var imgRole_1 = createCommonjsModule(function (module, exports) {



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-expanded': null
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
              props: {},
              relatedConcepts: [],
              requireContextRole: [],
              requiredContextRole: [],
              requiredOwnedElements: [],
              requiredProps: {
                'aria-valuemax': null,
                'aria-valuemin': null,
                'aria-valuenow': null
              },
              superClass: [['roletype', 'structure', 'range']]
            };
            var _default = meterRole;
            exports.default = _default;
            });

            var navigationRole_1 = createCommonjsModule(function (module, exports) {



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
              props: {},
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-valuetext': null,
                'aria-orientation': 'horizontal',
                'aria-valuemax': '100',
                'aria-valuemin': '0'
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
              requiredProps: {},
              superClass: [['roletype', 'structure', 'section', 'listitem'], ['roletype', 'widget', 'input', 'option']]
            };
            var _default = treeitemRole;
            exports.default = _default;
            });

            var ariaLiteralRoles_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _map = interopRequireDefault(map);

            var _alertRole = interopRequireDefault(alertRole_1);

            var _alertdialogRole = interopRequireDefault(alertdialogRole_1);

            var _applicationRole = interopRequireDefault(applicationRole_1);

            var _articleRole = interopRequireDefault(articleRole_1);

            var _bannerRole = interopRequireDefault(bannerRole_1);

            var _blockquoteRole = interopRequireDefault(blockquoteRole_1);

            var _buttonRole = interopRequireDefault(buttonRole_1);

            var _captionRole = interopRequireDefault(captionRole_1);

            var _cellRole = interopRequireDefault(cellRole_1);

            var _checkboxRole = interopRequireDefault(checkboxRole_1);

            var _codeRole = interopRequireDefault(codeRole_1);

            var _columnheaderRole = interopRequireDefault(columnheaderRole_1);

            var _comboboxRole = interopRequireDefault(comboboxRole_1);

            var _complementaryRole = interopRequireDefault(complementaryRole_1);

            var _contentinfoRole = interopRequireDefault(contentinfoRole_1);

            var _definitionRole = interopRequireDefault(definitionRole_1);

            var _deletionRole = interopRequireDefault(deletionRole_1);

            var _dialogRole = interopRequireDefault(dialogRole_1);

            var _directoryRole = interopRequireDefault(directoryRole_1);

            var _documentRole = interopRequireDefault(documentRole_1);

            var _emphasisRole = interopRequireDefault(emphasisRole_1);

            var _feedRole = interopRequireDefault(feedRole_1);

            var _figureRole = interopRequireDefault(figureRole_1);

            var _formRole = interopRequireDefault(formRole_1);

            var _genericRole = interopRequireDefault(genericRole_1);

            var _gridRole = interopRequireDefault(gridRole_1);

            var _gridcellRole = interopRequireDefault(gridcellRole_1);

            var _groupRole = interopRequireDefault(groupRole_1);

            var _headingRole = interopRequireDefault(headingRole_1);

            var _imgRole = interopRequireDefault(imgRole_1);

            var _insertionRole = interopRequireDefault(insertionRole_1);

            var _linkRole = interopRequireDefault(linkRole_1);

            var _listRole = interopRequireDefault(listRole_1);

            var _listboxRole = interopRequireDefault(listboxRole_1);

            var _listitemRole = interopRequireDefault(listitemRole_1);

            var _logRole = interopRequireDefault(logRole_1);

            var _mainRole = interopRequireDefault(mainRole_1);

            var _marqueeRole = interopRequireDefault(marqueeRole_1);

            var _mathRole = interopRequireDefault(mathRole_1);

            var _menuRole = interopRequireDefault(menuRole_1);

            var _menubarRole = interopRequireDefault(menubarRole_1);

            var _menuitemRole = interopRequireDefault(menuitemRole_1);

            var _menuitemcheckboxRole = interopRequireDefault(menuitemcheckboxRole_1);

            var _menuitemradioRole = interopRequireDefault(menuitemradioRole_1);

            var _meterRole = interopRequireDefault(meterRole_1);

            var _navigationRole = interopRequireDefault(navigationRole_1);

            var _noneRole = interopRequireDefault(noneRole_1);

            var _noteRole = interopRequireDefault(noteRole_1);

            var _optionRole = interopRequireDefault(optionRole_1);

            var _paragraphRole = interopRequireDefault(paragraphRole_1);

            var _presentationRole = interopRequireDefault(presentationRole_1);

            var _progressbarRole = interopRequireDefault(progressbarRole_1);

            var _radioRole = interopRequireDefault(radioRole_1);

            var _radiogroupRole = interopRequireDefault(radiogroupRole_1);

            var _regionRole = interopRequireDefault(regionRole_1);

            var _rowRole = interopRequireDefault(rowRole_1);

            var _rowgroupRole = interopRequireDefault(rowgroupRole_1);

            var _rowheaderRole = interopRequireDefault(rowheaderRole_1);

            var _scrollbarRole = interopRequireDefault(scrollbarRole_1);

            var _searchRole = interopRequireDefault(searchRole_1);

            var _searchboxRole = interopRequireDefault(searchboxRole_1);

            var _separatorRole = interopRequireDefault(separatorRole_1);

            var _sliderRole = interopRequireDefault(sliderRole_1);

            var _spinbuttonRole = interopRequireDefault(spinbuttonRole_1);

            var _statusRole = interopRequireDefault(statusRole_1);

            var _strongRole = interopRequireDefault(strongRole_1);

            var _subscriptRole = interopRequireDefault(subscriptRole_1);

            var _superscriptRole = interopRequireDefault(superscriptRole_1);

            var _switchRole = interopRequireDefault(switchRole_1);

            var _tabRole = interopRequireDefault(tabRole_1);

            var _tableRole = interopRequireDefault(tableRole_1);

            var _tablistRole = interopRequireDefault(tablistRole_1);

            var _tabpanelRole = interopRequireDefault(tabpanelRole_1);

            var _termRole = interopRequireDefault(termRole_1);

            var _textboxRole = interopRequireDefault(textboxRole_1);

            var _timeRole = interopRequireDefault(timeRole_1);

            var _timerRole = interopRequireDefault(timerRole_1);

            var _toolbarRole = interopRequireDefault(toolbarRole_1);

            var _tooltipRole = interopRequireDefault(tooltipRole_1);

            var _treeRole = interopRequireDefault(treeRole_1);

            var _treegridRole = interopRequireDefault(treegridRole_1);

            var _treeitemRole = interopRequireDefault(treeitemRole_1);

            var ariaLiteralRoles = new _map.default([['alert', _alertRole.default], ['alertdialog', _alertdialogRole.default], ['application', _applicationRole.default], ['article', _articleRole.default], ['banner', _bannerRole.default], ['blockquote', _blockquoteRole.default], ['button', _buttonRole.default], ['caption', _captionRole.default], ['cell', _cellRole.default], ['checkbox', _checkboxRole.default], ['code', _codeRole.default], ['columnheader', _columnheaderRole.default], ['combobox', _comboboxRole.default], ['complementary', _complementaryRole.default], ['contentinfo', _contentinfoRole.default], ['definition', _definitionRole.default], ['deletion', _deletionRole.default], ['dialog', _dialogRole.default], ['directory', _directoryRole.default], ['document', _documentRole.default], ['emphasis', _emphasisRole.default], ['feed', _feedRole.default], ['figure', _figureRole.default], ['form', _formRole.default], ['generic', _genericRole.default], ['grid', _gridRole.default], ['gridcell', _gridcellRole.default], ['group', _groupRole.default], ['heading', _headingRole.default], ['img', _imgRole.default], ['insertion', _insertionRole.default], ['link', _linkRole.default], ['list', _listRole.default], ['listbox', _listboxRole.default], ['listitem', _listitemRole.default], ['log', _logRole.default], ['main', _mainRole.default], ['marquee', _marqueeRole.default], ['math', _mathRole.default], ['menu', _menuRole.default], ['menubar', _menubarRole.default], ['menuitem', _menuitemRole.default], ['menuitemcheckbox', _menuitemcheckboxRole.default], ['menuitemradio', _menuitemradioRole.default], ['meter', _meterRole.default], ['navigation', _navigationRole.default], ['none', _noneRole.default], ['note', _noteRole.default], ['option', _optionRole.default], ['paragraph', _paragraphRole.default], ['presentation', _presentationRole.default], ['progressbar', _progressbarRole.default], ['radio', _radioRole.default], ['radiogroup', _radiogroupRole.default], ['region', _regionRole.default], ['row', _rowRole.default], ['rowgroup', _rowgroupRole.default], ['rowheader', _rowheaderRole.default], ['scrollbar', _scrollbarRole.default], ['search', _searchRole.default], ['searchbox', _searchboxRole.default], ['separator', _separatorRole.default], ['slider', _sliderRole.default], ['spinbutton', _spinbuttonRole.default], ['status', _statusRole.default], ['strong', _strongRole.default], ['subscript', _subscriptRole.default], ['superscript', _superscriptRole.default], ['switch', _switchRole.default], ['tab', _tabRole.default], ['table', _tableRole.default], ['tablist', _tablistRole.default], ['tabpanel', _tabpanelRole.default], ['term', _termRole.default], ['textbox', _textboxRole.default], ['time', _timeRole.default], ['timer', _timerRole.default], ['toolbar', _toolbarRole.default], ['tooltip', _tooltipRole.default], ['tree', _treeRole.default], ['treegrid', _treegridRole.default], ['treeitem', _treeitemRole.default]]);
            var _default = ariaLiteralRoles;
            exports.default = _default;
            });

            var docAbstractRole_1 = createCommonjsModule(function (module, exports) {



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-haspopup': null,
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-haspopup': null,
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-haspopup': null,
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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
                'aria-haspopup': null,
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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



            defineProperty$8(exports, "__esModule", {
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





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _map = interopRequireDefault(map);

            var _docAbstractRole = interopRequireDefault(docAbstractRole_1);

            var _docAcknowledgmentsRole = interopRequireDefault(docAcknowledgmentsRole_1);

            var _docAfterwordRole = interopRequireDefault(docAfterwordRole_1);

            var _docAppendixRole = interopRequireDefault(docAppendixRole_1);

            var _docBacklinkRole = interopRequireDefault(docBacklinkRole_1);

            var _docBiblioentryRole = interopRequireDefault(docBiblioentryRole_1);

            var _docBibliographyRole = interopRequireDefault(docBibliographyRole_1);

            var _docBibliorefRole = interopRequireDefault(docBibliorefRole_1);

            var _docChapterRole = interopRequireDefault(docChapterRole_1);

            var _docColophonRole = interopRequireDefault(docColophonRole_1);

            var _docConclusionRole = interopRequireDefault(docConclusionRole_1);

            var _docCoverRole = interopRequireDefault(docCoverRole_1);

            var _docCreditRole = interopRequireDefault(docCreditRole_1);

            var _docCreditsRole = interopRequireDefault(docCreditsRole_1);

            var _docDedicationRole = interopRequireDefault(docDedicationRole_1);

            var _docEndnoteRole = interopRequireDefault(docEndnoteRole_1);

            var _docEndnotesRole = interopRequireDefault(docEndnotesRole_1);

            var _docEpigraphRole = interopRequireDefault(docEpigraphRole_1);

            var _docEpilogueRole = interopRequireDefault(docEpilogueRole_1);

            var _docErrataRole = interopRequireDefault(docErrataRole_1);

            var _docExampleRole = interopRequireDefault(docExampleRole_1);

            var _docFootnoteRole = interopRequireDefault(docFootnoteRole_1);

            var _docForewordRole = interopRequireDefault(docForewordRole_1);

            var _docGlossaryRole = interopRequireDefault(docGlossaryRole_1);

            var _docGlossrefRole = interopRequireDefault(docGlossrefRole_1);

            var _docIndexRole = interopRequireDefault(docIndexRole_1);

            var _docIntroductionRole = interopRequireDefault(docIntroductionRole_1);

            var _docNoterefRole = interopRequireDefault(docNoterefRole_1);

            var _docNoticeRole = interopRequireDefault(docNoticeRole_1);

            var _docPagebreakRole = interopRequireDefault(docPagebreakRole_1);

            var _docPagelistRole = interopRequireDefault(docPagelistRole_1);

            var _docPartRole = interopRequireDefault(docPartRole_1);

            var _docPrefaceRole = interopRequireDefault(docPrefaceRole_1);

            var _docPrologueRole = interopRequireDefault(docPrologueRole_1);

            var _docPullquoteRole = interopRequireDefault(docPullquoteRole_1);

            var _docQnaRole = interopRequireDefault(docQnaRole_1);

            var _docSubtitleRole = interopRequireDefault(docSubtitleRole_1);

            var _docTipRole = interopRequireDefault(docTipRole_1);

            var _docTocRole = interopRequireDefault(docTocRole_1);

            var ariaDpubRoles = new _map.default([['doc-abstract', _docAbstractRole.default], ['doc-acknowledgments', _docAcknowledgmentsRole.default], ['doc-afterword', _docAfterwordRole.default], ['doc-appendix', _docAppendixRole.default], ['doc-backlink', _docBacklinkRole.default], ['doc-biblioentry', _docBiblioentryRole.default], ['doc-bibliography', _docBibliographyRole.default], ['doc-biblioref', _docBibliorefRole.default], ['doc-chapter', _docChapterRole.default], ['doc-colophon', _docColophonRole.default], ['doc-conclusion', _docConclusionRole.default], ['doc-cover', _docCoverRole.default], ['doc-credit', _docCreditRole.default], ['doc-credits', _docCreditsRole.default], ['doc-dedication', _docDedicationRole.default], ['doc-endnote', _docEndnoteRole.default], ['doc-endnotes', _docEndnotesRole.default], ['doc-epigraph', _docEpigraphRole.default], ['doc-epilogue', _docEpilogueRole.default], ['doc-errata', _docErrataRole.default], ['doc-example', _docExampleRole.default], ['doc-footnote', _docFootnoteRole.default], ['doc-foreword', _docForewordRole.default], ['doc-glossary', _docGlossaryRole.default], ['doc-glossref', _docGlossrefRole.default], ['doc-index', _docIndexRole.default], ['doc-introduction', _docIntroductionRole.default], ['doc-noteref', _docNoterefRole.default], ['doc-notice', _docNoticeRole.default], ['doc-pagebreak', _docPagebreakRole.default], ['doc-pagelist', _docPagelistRole.default], ['doc-part', _docPartRole.default], ['doc-preface', _docPrefaceRole.default], ['doc-prologue', _docPrologueRole.default], ['doc-pullquote', _docPullquoteRole.default], ['doc-qna', _docQnaRole.default], ['doc-subtitle', _docSubtitleRole.default], ['doc-tip', _docTipRole.default], ['doc-toc', _docTocRole.default]]);
            var _default = ariaDpubRoles;
            exports.default = _default;
            });

            var rolesMap_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _getIterator2 = interopRequireDefault(getIterator);

            var _isArray = interopRequireDefault(isArray$2);

            var _getIteratorMethod2 = interopRequireDefault(getIteratorMethod);

            var _symbol = interopRequireDefault(symbol$2);

            var _from = interopRequireDefault(from$2);

            var _slice = interopRequireDefault(slice$2);

            var _defineProperty2 = interopRequireDefault(defineProperty$1);

            var _assign = interopRequireDefault(assign);

            var _keys = interopRequireDefault(keys$3);

            var _forEach = interopRequireDefault(forEach);

            var _map = interopRequireDefault(map);

            var _ariaAbstractRoles = interopRequireDefault(ariaAbstractRoles_1);

            var _ariaLiteralRoles = interopRequireDefault(ariaLiteralRoles_1);

            var _ariaDpubRoles = interopRequireDefault(ariaDpubRoles_1);

            var _context;

            function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _symbol.default === "undefined" || (0, _getIteratorMethod2.default)(o) == null) { if ((0, _isArray.default)(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = (0, _getIterator2.default)(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

            function _unsupportedIterableToArray(o, minLen) { var _context2; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = (0, _slice.default)(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return (0, _from.default)(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

            var rolesMap = new _map.default([]);
            (0, _forEach.default)(_context = [_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default]).call(_context, function (roleSet) {
              (0, _forEach.default)(roleSet).call(roleSet, function (roleDefinition, name) {
                return rolesMap.set(name, roleDefinition);
              });
            });
            (0, _forEach.default)(rolesMap).call(rolesMap, function (roleDefinition, name) {
              // Conglomerate the properties
              var _iterator = _createForOfIteratorHelper(roleDefinition.superClass),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var superClassIter = _step.value;

                  var _iterator2 = _createForOfIteratorHelper(superClassIter),
                      _step2;

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var superClassName = _step2.value;
                      var superClassDefinition = rolesMap.get(superClassName);

                      if (superClassDefinition) {
                        for (var _i = 0, _Object$keys = (0, _keys.default)(superClassDefinition.props); _i < _Object$keys.length; _i++) {
                          var prop = _Object$keys[_i];

                          if (!Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                            (0, _assign.default)(roleDefinition.props, (0, _defineProperty2.default)({}, prop, superClassDefinition.props[prop]));
                          }
                        }
                      }
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
            var _default = rolesMap;
            exports.default = _default;
            });

            // `Set` constructor
            // https://tc39.es/ecma262/#sec-set-objects
            collection('Set', function (init) {
              return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
            }, collectionStrong);

            var set$2 = path.Set;

            var set$1 = set$2;

            var set = set$1;

            var isArray$1 = isArray$4;

            var isArray = isArray$1;

            var arrayWithHoles = createCommonjsModule(function (module) {
            function _arrayWithHoles(arr) {
              if (isArray(arr)) return arr;
            }

            module.exports = _arrayWithHoles;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            // `Symbol.asyncDispose` well-known symbol
            // https://github.com/tc39/proposal-using-statement
            defineWellKnownSymbol('asyncDispose');

            // `Symbol.dispose` well-known symbol
            // https://github.com/tc39/proposal-using-statement
            defineWellKnownSymbol('dispose');

            // `Symbol.observable` well-known symbol
            // https://github.com/tc39/proposal-observable
            defineWellKnownSymbol('observable');

            // `Symbol.patternMatch` well-known symbol
            // https://github.com/tc39/proposal-pattern-matching
            defineWellKnownSymbol('patternMatch');

            // TODO: remove from `core-js@4`


            defineWellKnownSymbol('replaceAll');

            // TODO: Remove from `core-js@4`


            var symbol$1 = symbol$4;

            var symbol = symbol$1;

            var ITERATOR = wellKnownSymbol('iterator');

            var isIterable$1 = function (it) {
              var O = Object(it);
              return O[ITERATOR] !== undefined
                || '@@iterator' in O
                // eslint-disable-next-line no-prototype-builtins -- safe
                || iterators.hasOwnProperty(classof(O));
            };

            var isIterable_1 = isIterable$1;

            var isIterable = isIterable_1;

            var iterableToArrayLimit = createCommonjsModule(function (module) {
            function _iterableToArrayLimit(arr, i) {
              if (typeof symbol === "undefined" || !isIterable(Object(arr))) return;
              var _arr = [];
              var _n = true;
              var _d = false;
              var _e = undefined;

              try {
                for (var _i = getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
                  _arr.push(_s.value);

                  if (i && _arr.length === i) break;
                }
              } catch (err) {
                _d = true;
                _e = err;
              } finally {
                try {
                  if (!_n && _i["return"] != null) _i["return"]();
                } finally {
                  if (_d) throw _e;
                }
              }

              return _arr;
            }

            module.exports = _iterableToArrayLimit;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var slice$1 = slice_1;

            var slice = slice$1;

            var from$1 = from$4;

            var from = from$1;

            var arrayLikeToArray = createCommonjsModule(function (module) {
            function _arrayLikeToArray(arr, len) {
              if (len == null || len > arr.length) len = arr.length;

              for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
              }

              return arr2;
            }

            module.exports = _arrayLikeToArray;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var unsupportedIterableToArray = createCommonjsModule(function (module) {
            function _unsupportedIterableToArray(o, minLen) {
              var _context;

              if (!o) return;
              if (typeof o === "string") return arrayLikeToArray(o, minLen);

              var n = slice(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

              if (n === "Object" && o.constructor) n = o.constructor.name;
              if (n === "Map" || n === "Set") return from(o);
              if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
            }

            module.exports = _unsupportedIterableToArray;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var nonIterableRest = createCommonjsModule(function (module) {
            function _nonIterableRest() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }

            module.exports = _nonIterableRest;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var slicedToArray = createCommonjsModule(function (module) {
            function _slicedToArray(arr, i) {
              return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
            }

            module.exports = _slicedToArray;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var entries$2 = entryVirtual('Array').entries;

            var entries$1 = entries$2;

            var ArrayPrototype$3 = Array.prototype;

            var DOMIterables$1 = {
              DOMTokenList: true,
              NodeList: true
            };

            var entries_1 = function (it) {
              var own = it.entries;
              return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.entries)
                // eslint-disable-next-line no-prototype-builtins -- safe
                || DOMIterables$1.hasOwnProperty(classof(it)) ? entries$1 : own;
            };

            var entries = entries_1;

            var $find = arrayIteration.find;


            var FIND = 'find';
            var SKIPS_HOLES = true;

            // Shouldn't skip holes
            if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

            // `Array.prototype.find` method
            // https://tc39.es/ecma262/#sec-array.prototype.find
            _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
              find: function find(callbackfn /* , that = undefined */) {
                return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
              }
            });

            var find$2 = entryVirtual('Array').find;

            var ArrayPrototype$2 = Array.prototype;

            var find_1 = function (it) {
              var own = it.find;
              return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.find) ? find$2 : own;
            };

            var find$1 = find_1;

            var find = find$1;

            var $stringify = getBuiltIn('JSON', 'stringify');
            var re = /[\uD800-\uDFFF]/g;
            var low = /^[\uD800-\uDBFF]$/;
            var hi = /^[\uDC00-\uDFFF]$/;

            var fix = function (match, offset, string) {
              var prev = string.charAt(offset - 1);
              var next = string.charAt(offset + 1);
              if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
                return '\\u' + match.charCodeAt(0).toString(16);
              } return match;
            };

            var FORCED = fails(function () {
              return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
                || $stringify('\uDEAD') !== '"\\udead"';
            });

            if ($stringify) {
              // `JSON.stringify` method
              // https://tc39.es/ecma262/#sec-json.stringify
              // https://github.com/tc39/proposal-well-formed-stringify
              _export({ target: 'JSON', stat: true, forced: FORCED }, {
                // eslint-disable-next-line no-unused-vars -- required for `.length`
                stringify: function stringify(it, replacer, space) {
                  var result = $stringify.apply(null, arguments);
                  return typeof result == 'string' ? result.replace(re, fix) : result;
                }
              });
            }

            if (!path.JSON) path.JSON = { stringify: JSON.stringify };

            // eslint-disable-next-line no-unused-vars -- required for `.length`
            var stringify$2 = function stringify(it, replacer, space) {
              return path.JSON.stringify.apply(null, arguments);
            };

            var stringify$1 = stringify$2;

            var stringify = stringify$1;

            var concat$2 = entryVirtual('Array').concat;

            var ArrayPrototype$1 = Array.prototype;

            var concat_1 = function (it) {
              var own = it.concat;
              return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.concat) ? concat$2 : own;
            };

            var concat$1 = concat_1;

            var concat = concat$1;

            var keys$2 = entryVirtual('Array').keys;

            var keys$1 = keys$2;

            var ArrayPrototype = Array.prototype;

            var DOMIterables = {
              DOMTokenList: true,
              NodeList: true
            };

            var keys_1 = function (it) {
              var own = it.keys;
              return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.keys)
                // eslint-disable-next-line no-prototype-builtins -- safe
                || DOMIterables.hasOwnProperty(classof(it)) ? keys$1 : own;
            };

            var keys = keys_1;

            var arrayWithoutHoles = createCommonjsModule(function (module) {
            function _arrayWithoutHoles(arr) {
              if (isArray(arr)) return arrayLikeToArray(arr);
            }

            module.exports = _arrayWithoutHoles;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var iterableToArray = createCommonjsModule(function (module) {
            function _iterableToArray(iter) {
              if (typeof symbol !== "undefined" && isIterable(Object(iter))) return from(iter);
            }

            module.exports = _iterableToArray;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var nonIterableSpread = createCommonjsModule(function (module) {
            function _nonIterableSpread() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }

            module.exports = _nonIterableSpread;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var toConsumableArray = createCommonjsModule(function (module) {
            function _toConsumableArray(arr) {
              return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
            }

            module.exports = _toConsumableArray;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var elementRoleMap_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _set = interopRequireDefault(set);

            var _slicedToArray2 = interopRequireDefault(slicedToArray);

            var _entries = interopRequireDefault(entries);

            var _find = interopRequireDefault(find);

            var _stringify = interopRequireDefault(stringify);

            var _concat = interopRequireDefault(concat);

            var _keys = interopRequireDefault(keys);

            var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

            var _forEach = interopRequireDefault(forEach);

            var _map = interopRequireDefault(map);

            var _rolesMap = interopRequireDefault(rolesMap_1);

            var _context;

            var elementRoleMap = new _map.default([]);
            (0, _forEach.default)(_context = (0, _toConsumableArray2.default)((0, _keys.default)(_rolesMap.default).call(_rolesMap.default))).call(_context, function (key) {
              var role = _rolesMap.default.get(key);

              if (role) {
                var _context2, _context3;

                (0, _forEach.default)(_context2 = (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(role.baseConcepts), (0, _toConsumableArray2.default)(role.relatedConcepts))).call(_context2, function (relation) {
                  if (relation.module === 'HTML') {
                    var concept = relation.concept;

                    if (concept) {
                      var _context4;

                      var conceptStr = (0, _stringify.default)(concept);
                      var roles = ((0, _find.default)(_context4 = (0, _toConsumableArray2.default)((0, _entries.default)(elementRoleMap).call(elementRoleMap))).call(_context4, function (_ref) {
                        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                            key = _ref2[0];
                            _ref2[1];

                        return (0, _stringify.default)(key) === conceptStr;
                      }) || [])[1];

                      if (!roles) {
                        roles = new _set.default([]);
                      }

                      roles.add(key);
                      elementRoleMap.set(concept, roles);
                    }
                  }
                });
              }
            });
            var _default = elementRoleMap;
            exports.default = _default;
            });

            var roleElementMap_1 = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.default = void 0;

            var _set = interopRequireDefault(set);

            var _concat = interopRequireDefault(concat);

            var _keys = interopRequireDefault(keys);

            var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

            var _forEach = interopRequireDefault(forEach);

            var _map = interopRequireDefault(map);

            var _rolesMap = interopRequireDefault(rolesMap_1);

            var _context;

            var roleElementMap = new _map.default([]);
            (0, _forEach.default)(_context = (0, _toConsumableArray2.default)((0, _keys.default)(_rolesMap.default).call(_rolesMap.default))).call(_context, function (key) {
              var role = _rolesMap.default.get(key);

              if (role) {
                var _context2, _context3;

                (0, _forEach.default)(_context2 = (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(role.baseConcepts), (0, _toConsumableArray2.default)(role.relatedConcepts))).call(_context2, function (relation) {
                  if (relation.module === 'HTML') {
                    var concept = relation.concept;

                    if (concept) {
                      var relationConcepts = roleElementMap.get(key) || new _set.default([]);
                      relationConcepts.add(concept);
                      roleElementMap.set(key, relationConcepts);
                    }
                  }
                });
              }
            });
            var _default = roleElementMap;
            exports.default = _default;
            });

            var lib = createCommonjsModule(function (module, exports) {





            defineProperty$8(exports, "__esModule", {
              value: true
            });

            exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = void 0;

            var _ariaPropsMap = interopRequireDefault(ariaPropsMap_1);

            var _domMap = interopRequireDefault(domMap_1);

            var _rolesMap = interopRequireDefault(rolesMap_1);

            var _elementRoleMap = interopRequireDefault(elementRoleMap_1);

            var _roleElementMap = interopRequireDefault(roleElementMap_1);

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

            var globalObj = typeof window === 'undefined' ? global$2 : window; // Constant node.nodeType for text nodes, see:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants

            var TEXT_NODE = 3; // Currently this fn only supports jest timers, but it could support other test runners in the future.

            function runWithRealTimers(callback) {
              // istanbul ignore else
              if (typeof jest !== 'undefined') {
                return runWithJestRealTimers(callback).callbackReturnValue;
              } // istanbul ignore next


              return callback();
            }

            function runWithJestRealTimers(callback) {
              var timerAPI = {
                clearInterval: clearInterval,
                clearTimeout: clearTimeout,
                setInterval: setInterval,
                setTimeout: setTimeout
              }; // For more on why we have the check here,
              // checkout https://github.com/testing-library/dom-testing-library/issues/914

              if (typeof setImmediate === 'function') {
                timerAPI.setImmediate = setImmediate;
              }

              if (typeof clearImmediate === 'function') {
                timerAPI.clearImmediate = clearImmediate;
              }

              jest.useRealTimers();
              var callbackReturnValue = callback();
              var usedFakeTimers = Object.entries(timerAPI).some(function (_ref) {
                var name = _ref[0],
                    func = _ref[1];
                return func !== globalObj[name];
              });

              if (usedFakeTimers) {
                var _timerAPI$setTimeout;

                jest.useFakeTimers((_timerAPI$setTimeout = timerAPI.setTimeout) != null && _timerAPI$setTimeout.clock ? 'modern' : 'legacy');
              }

              return {
                callbackReturnValue: callbackReturnValue,
                usedFakeTimers: usedFakeTimers
              };
            }

            function jestFakeTimersAreEnabled() {
              // istanbul ignore else
              if (typeof jest !== 'undefined') {
                return runWithJestRealTimers(function () {}).usedFakeTimers;
              } // istanbul ignore next


              return false;
            } // we only run our tests in node, and setImmediate is supported in node.
            // istanbul ignore next


            function setImmediatePolyfill(fn) {
              return globalObj.setTimeout(fn, 0);
            }

            function getTimeFunctions() {
              // istanbul ignore next
              return {
                clearTimeoutFn: globalObj.clearTimeout,
                setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
                setTimeoutFn: globalObj.setTimeout
              };
            }

            var _runWithRealTimers = runWithRealTimers(getTimeFunctions),
                clearTimeoutFn = _runWithRealTimers.clearTimeoutFn,
                setImmediateFn = _runWithRealTimers.setImmediateFn,
                setTimeoutFn = _runWithRealTimers.setTimeoutFn;

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
              } else if (node.then instanceof Function) {
                throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
              } else if (Array.isArray(node)) {
                throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
              } else {
                // The user passed something unusual to a calling function
                throw new Error("Unable to find the \"window\" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new");
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

            function inCypress(dom) {
              var window = dom.ownerDocument && dom.ownerDocument.defaultView || undefined;
              return typeof global$2 !== 'undefined' && global$2.Cypress || typeof window !== 'undefined' && window.Cypress;
            }

            var inNode = function inNode() {
              return typeof process$1 !== 'undefined' && process$1.versions !== undefined && process$1.versions.node !== undefined;
            };

            var getMaxLength = function getMaxLength(dom) {
              return inCypress(dom) ? 0 : typeof process$1 !== 'undefined' && process$1.env.DEBUG_PRINT_LIMIT || 7000;
            };

            var _prettyFormat$plugins = build$1.plugins,
                DOMElement = _prettyFormat$plugins.DOMElement,
                DOMCollection = _prettyFormat$plugins.DOMCollection;

            function prettyDOM(dom, maxLength, options) {
              if (!dom) {
                dom = getDocument().body;
              }

              if (typeof maxLength !== 'number') {
                maxLength = getMaxLength(dom);
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

              var debugContent = build$1(dom, _extends({
                plugins: [DOMElement, DOMCollection],
                printFunctionName: false,
                highlight: inNode()
              }, options));
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
              // this is to support React's async `act` function.
              // forcing react-testing-library to wrap all async functions would've been
              // a total nightmare (consider wrapping every findBy* query and then also
              // updating `within` so those would be wrapped too. Total nightmare).
              // so we have this config option that's really only intended for
              // react-testing-library to use. For that reason, this feature will remain
              // undocumented.
              asyncWrapper: function asyncWrapper(cb) {
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
                var error = new Error([message, prettyDOM(container)].filter(Boolean).join('\n\n'));
                error.name = 'TestingLibraryElementError';
                return error;
              },
              _disableExpensiveErrorDiagnostics: false,
              computedStyleSupportsPseudoElements: false
            };
            var DEFAULT_IGNORE_TAGS = 'script, style';
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
                return matcher.test(normalizedText);
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
                return matcher.test(normalizedText);
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

              if (normalizer) {
                // User has specified a custom normalizer
                if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
                  // They've also specified a value for trim or collapseWhitespace
                  throw new Error('trim and collapseWhitespace are not supported with a normalizer. ' + 'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' + 'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
                }

                return normalizer;
              } else {
                // No custom normalizer specified. Just use default.
                return getDefaultNormalizer({
                  trim: trim,
                  collapseWhitespace: collapseWhitespace
                });
              }
            }

            function getNodeText(node) {
              if (node.matches('input[type=submit], input[type=button]')) {
                return node.value;
              }

              return Array.from(node.childNodes).filter(function (child) {
                return child.nodeType === TEXT_NODE && Boolean(child.textContent);
              }).map(function (c) {
                return c.textContent;
              }).join('');
            }

            function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

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
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
                  var lastError, intervalId, observer, finished, promiseStatus, overallTimeoutTimer, usingJestFakeTimers, error, _getWindowFromNode, MutationObserver, onDone, checkRealTimersCallback, checkCallback, handleTimeout;

                  return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
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
                            clearTimeoutFn(overallTimeoutTimer);

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
                          overallTimeoutTimer = setTimeoutFn(handleTimeout, timeout);
                          usingJestFakeTimers = jestFakeTimersAreEnabled();

                          if (!usingJestFakeTimers) {
                            _context.next = 24;
                            break;
                          }

                          checkCallback(); // this is a dangerous rule to disable because it could lead to an
                          // infinite loop. However, eslint isn't smart enough to know that we're
                          // setting finished inside `onDone` which will be called when we're done
                          // waiting or when we've timed out.
                          // eslint-disable-next-line no-unmodified-loop-condition

                        case 10:
                          if (finished) {
                            _context.next = 22;
                            break;
                          }

                          if (jestFakeTimersAreEnabled()) {
                            _context.next = 16;
                            break;
                          }

                          error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
                          if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
                          reject(error);
                          return _context.abrupt("return");

                        case 16:
                          // we *could* (maybe should?) use `advanceTimersToNextTimer` but it's
                          // possible that could make this loop go on forever if someone is using
                          // third party code that's setting up recursive timers so rapidly that
                          // the user's timer's don't get a chance to resolve. So we'll advance
                          // by an interval instead. (We have a test for this case).
                          jest.advanceTimersByTime(interval); // It's really important that checkCallback is run *before* we flush
                          // in-flight promises. To be honest, I'm not sure why, and I can't quite
                          // think of a way to reproduce the problem in a test, but I spent
                          // an entire day banging my head against a wall on this.

                          checkCallback(); // In this rare case, we *need* to wait for in-flight promises
                          // to resolve before continuing. We don't need to take advantage
                          // of parallelization so we're fine.
                          // https://stackoverflow.com/a/59243586/971592
                          // eslint-disable-next-line no-await-in-loop

                          _context.next = 20;
                          return new Promise(function (r) {
                            return setImmediateFn(r);
                          });

                        case 20:
                          _context.next = 10;
                          break;

                        case 22:
                          _context.next = 37;
                          break;

                        case 24:
                          _context.prev = 24;
                          checkContainerType(container);
                          _context.next = 32;
                          break;

                        case 28:
                          _context.prev = 28;
                          _context.t0 = _context["catch"](24);
                          reject(_context.t0);
                          return _context.abrupt("return");

                        case 32:
                          intervalId = setInterval(checkRealTimersCallback, interval);
                          _getWindowFromNode = getWindowFromNode(container), MutationObserver = _getWindowFromNode.MutationObserver;
                          observer = new MutationObserver(checkRealTimersCallback);
                          observer.observe(container, mutationObserverOptions);
                          checkCallback();

                        case 37:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[24, 28]]);
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

            var hasWarned$2 = false; // deprecated... TODO: remove this method. We renamed this to `waitFor` so the
            // code people write reads more clearly.

            function wait$1() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // istanbul ignore next
              var _args$ = args[0],
                  first = _args$ === void 0 ? function () {} : _args$,
                  rest = args.slice(1);

              if (!hasWarned$2) {
                hasWarned$2 = true;
                console.warn("`wait` has been deprecated and replaced by `waitFor` instead. In most cases you should be able to find/replace `wait` with `waitFor`. Learn more: https://testing-library.com/docs/dom-testing-library/api-async#waitfor.");
              }

              return waitForWrapper.apply(void 0, [first].concat(rest));
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

            function queryByAttribute(attribute, container, text) {
              for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                args[_key - 3] = arguments[_key];
              }

              var els = queryAllByAttribute.apply(void 0, [attribute, container, text].concat(args));

              if (els.length > 1) {
                throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
              }

              return els[0] || null;
            } // this accepts a query function and returns a function which throws an error
            // if more than one elements is returned, otherwise it returns the first
            // element or null


            function makeSingleQuery(allQuery, getMultipleError) {
              return function (container) {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
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
                for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = arguments[_key3];
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
                for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = arguments[_key4];
                }

                var element = query.apply(void 0, [container].concat(args));

                var _args$slice = args.slice(-1),
                    _args$slice$ = _args$slice[0];

                _args$slice$ = _args$slice$ === void 0 ? {} : _args$slice$;
                var _args$slice$$suggest = _args$slice$.suggest,
                    suggest = _args$slice$$suggest === void 0 ? getConfig().throwSuggestions : _args$slice$$suggest;

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
                for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                  args[_key5 - 1] = arguments[_key5];
                }

                var els = query.apply(void 0, [container].concat(args));

                var _args$slice2 = args.slice(-1),
                    _args$slice2$ = _args$slice2[0];

                _args$slice2$ = _args$slice2$ === void 0 ? {} : _args$slice2$;
                var _args$slice2$$suggest = _args$slice2$.suggest,
                    suggest = _args$slice2$$suggest === void 0 ? getConfig().throwSuggestions : _args$slice2$$suggest;

                if (els.length && suggest) {
                  // get a unique list of all suggestion messages.  We are only going to make a suggestion if
                  // all the suggestions are the same
                  var uniqueSuggestionMessages = [].concat(new Set(els.map(function (element) {
                    var _getSuggestedQuery;

                    return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
                  })));

                  if ( // only want to suggest if all the els have the same suggestion.
                  uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(getSuggestedQuery(els[0], variant).queryName)) {
                    throw getSuggestionError(uniqueSuggestionMessages[0], container);
                  }
                }

                return els;
              };
            };

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

            function queryAllLabelsByText(container, text, _temp) {
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
            }

            function queryAllByLabelText(container, text, _temp2) {
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
                  if (matcher(label.content, label.formControl, text, matchNormalizer)) labelledElements.push(label.formControl);
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
            } // the getAll* query would normally look like this:
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

            function queryAllByPlaceholderText() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              checkContainerType.apply(void 0, args);
              return queryAllByAttribute.apply(void 0, ['placeholder'].concat(args));
            }

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

            function queryAllByText(container, text, _temp) {
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

              return [].concat(baseArray, Array.from(container.querySelectorAll(selector))).filter(function (node) {
                return !ignore || !node.matches(ignore);
              }).filter(function (node) {
                return matcher(getNodeText(node), node, text, matchNormalizer);
              });
            }

            var getMultipleError$5 = function getMultipleError(c, text) {
              return "Found multiple elements with the text: " + text;
            };

            var getMissingError$5 = function getMissingError(c, text) {
              return "Unable to find an element with the text: " + text + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
            };

            var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, 'queryAll');

            var _buildQueries$5 = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5),
                queryByText = _buildQueries$5[0],
                getAllByText = _buildQueries$5[1],
                getByText = _buildQueries$5[2],
                findAllByText = _buildQueries$5[3],
                findByText = _buildQueries$5[4];

            function queryAllByDisplayValue(container, value, _temp) {
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
            }

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

            function queryAllByAltText(container, alt, _temp) {
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
              return Array.from(container.querySelectorAll('img,input,area')).filter(function (node) {
                return matcher(node.getAttribute('alt'), node, alt, matchNormalizer);
              });
            }

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

            function queryAllByTitle(container, text, _temp) {
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
            }

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

              if (level !== undefined) {
                // guard against using `level` option with any role other than `heading`
                if (role !== 'heading') {
                  throw new Error("Role \"" + role + "\" cannot have \"level\" property.");
                }
              }

              if (expanded !== undefined) {
                var _allRoles$get4;

                // guard against unknown roles
                if (((_allRoles$get4 = lib.roles.get(role)) == null ? void 0 : _allRoles$get4.props['aria-expanded']) === undefined) {
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

              return Array.from(container.querySelectorAll('*')).filter(function (node) {
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

                if (expanded !== undefined) {
                  return expanded === computeAriaExpanded(element);
                }

                if (level !== undefined) {
                  return level === computeHeadingLevel(element);
                } // don't care if aria attributes are unspecified


                return true;
              }).filter(function (element) {
                return hidden === false ? isInaccessible(element, {
                  isSubtreeInaccessible: cachedIsSubtreeInaccessible
                }) === false : true;
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
              });
            }

            var getMultipleError$1 = function getMultipleError(c, role, _temp2) {
              var _ref2 = _temp2 === void 0 ? {} : _temp2,
                  name = _ref2.name;

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
              var _ref3 = _temp3 === void 0 ? {} : _temp3,
                  _ref3$hidden = _ref3.hidden,
                  hidden = _ref3$hidden === void 0 ? getConfig().defaultHidden : _ref3$hidden,
                  name = _ref3.name;

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

            function queryAllByTestId() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              checkContainerType.apply(void 0, args);
              return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
            }

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

            var hasWarned$1 = false; // deprecated... TODO: remove this method. People should use a find* query or
            // wait instead the reasoning is that this doesn't really do anything useful
            // that you can't get from using find* or wait.

            function waitForElement(_x, _x2) {
              return _waitForElement.apply(this, arguments);
            }

            function _waitForElement() {
              _waitForElement = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback, options) {
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!hasWarned$1) {
                          hasWarned$1 = true;
                          console.warn("`waitForElement` has been deprecated. Use a `find*` query (preferred: https://testing-library.com/docs/dom-testing-library/api-queries#findby) or use `waitFor` instead: https://testing-library.com/docs/dom-testing-library/api-async#waitfor");
                        }

                        if (callback) {
                          _context.next = 3;
                          break;
                        }

                        throw new Error('waitForElement requires a callback as the first parameter');

                      case 3:
                        return _context.abrupt("return", waitForWrapper(function () {
                          var result = callback();

                          if (!result) {
                            throw new Error('Timed out in waitForElement.');
                          }

                          return result;
                        }, options));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _waitForElement.apply(this, arguments);
            }
            /*
            eslint
              require-await: "off"
            */

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

            var hasWarned = false; // deprecated... TODO: remove this method. People should use wait instead
            // the reasoning is that waiting for just any DOM change is an implementation
            // detail. People should be waiting for a specific thing to change.

            function waitForDomChange(_temp) {
              var _ref = _temp === void 0 ? {} : _temp,
                  _ref$container = _ref.container,
                  container = _ref$container === void 0 ? getDocument() : _ref$container,
                  _ref$timeout = _ref.timeout,
                  timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
                  _ref$mutationObserver = _ref.mutationObserverOptions,
                  mutationObserverOptions = _ref$mutationObserver === void 0 ? {
                subtree: true,
                childList: true,
                attributes: true,
                characterData: true
              } : _ref$mutationObserver;

              if (!hasWarned) {
                hasWarned = true;
                console.warn("`waitForDomChange` has been deprecated. Use `waitFor` instead: https://testing-library.com/docs/dom-testing-library/api-async#waitfor.");
              }

              return new Promise(function (resolve, reject) {
                var timer = setTimeoutFn(onTimeout, timeout);

                var _getWindowFromNode = getWindowFromNode(container),
                    MutationObserver = _getWindowFromNode.MutationObserver;

                var observer = new MutationObserver(onMutation);
                runWithRealTimers(function () {
                  return observer.observe(container, mutationObserverOptions);
                });

                function onDone(error, result) {
                  clearTimeoutFn(timer);
                  setImmediateFn(function () {
                    return observer.disconnect();
                  });

                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }

                function onMutation(mutationsList) {
                  onDone(null, mutationsList);
                }

                function onTimeout() {
                  onDone(new Error('Timed out in waitForDomChange.'), null);
                }
              });
            }

            function waitForDomChangeWrapper() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return getConfig().asyncWrapper(function () {
                return waitForDomChange.apply(void 0, args);
              });
            }

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
              transitionEnd: {
                EventType: 'TransitionEvent',
                defaultInit: {
                  bubbles: true,
                  cancelable: true
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
                  targetProperties = _objectWithoutPropertiesLoose(_eventInit$target, ["value", "files"]);

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
                    otherInit = _objectWithoutPropertiesLoose(eventInit, ["bubbles", "cancelable", "detail"]);

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
              }
              /* istanbul ignore next (I don't want to bother) */
              else if (valueSetter) {
                  valueSetter.call(element, value);
                } else {
                  throw new Error('The given element does not have a value setter');
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

              if (!element || !('innerHTML' in element)) {
                console.log("The element you're providing isn't a valid DOM element.");
                return;
              }

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
            var screen = typeof document !== 'undefined' && document.body ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce(function (helpers, key) {
              helpers[key] = function () {
                throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
              };

              return helpers;
            }, initialValue);

            var dom_esm = /*#__PURE__*/Object.freeze({
                        __proto__: null,
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
                        wait: wait$1,
                        waitFor: waitForWrapper,
                        waitForDomChange: waitForDomChangeWrapper,
                        waitForElement: waitForElement,
                        waitForElementToBeRemoved: waitForElementToBeRemoved,
                        within: getQueriesForElement,
                        wrapAllByQueryWithSuggestion: wrapAllByQueryWithSuggestion,
                        wrapSingleQueryWithSuggestion: wrapSingleQueryWithSuggestion,
                        prettyFormat: build$1
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

            createCommonjsModule(function (module, exports) {
            });

            var scheduler = createCommonjsModule(function (module) {

            {
              module.exports = scheduler_production_min;
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
            function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q=l__default['default'].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
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
            var H=m__default['default'].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,sa=H[5],I=H[6],ta=m__default['default'].unstable_batchedUpdates,J=q.IsSomeRendererActing,K="function"===typeof scheduler.unstable_flushAllWithoutAsserting,L=scheduler.unstable_flushAllWithoutAsserting||function(){for(var a=!1;sa();)a=!0;return a};function M(a){try{L(),G(function(){L()?M(a):a();});}catch(b){a(b);}}var N=0,ua=!1,O=m__default['default'].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events[6],va=m__default['default'].unstable_batchedUpdates,Q=q.IsSomeRendererActing;
            function wa(a,b){jest.runOnlyPendingTimers();G(function(){try{scheduler.unstable_flushAllWithoutAsserting()?wa(a,b):a();}catch(c){b(c);}});}function xa(a,b,c,d,e,g,f,k,ca){var P=Array.prototype.slice.call(arguments,3);try{b.apply(c,P);}catch(Ga){this.onError(Ga);}}var R=!1,S=null,T=!1,U=null,ya={onError:function(a){R=!0;S=a;}};function za(a,b,c,d,e,g,f,k,ca){R=!1;S=null;xa.apply(ya,arguments);}
            function Aa(a,b,c,d,e,g,f,k,ca){za.apply(this,arguments);if(R){if(R){var P=S;R=!1;S=null;}else throw Error(p(198));T||(T=!0,U=P);}}var V=m__default['default'].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,Ba=V[0],Ca=V[1],Da=V[2],Ea=V[3],Fa=V[4];function Ha(){}
            function Ia(a,b){if(!a)return [];a=aa(a);if(!a)return [];for(var c=a,d=[];;){if(5===c.tag||6===c.tag||1===c.tag||0===c.tag){var e=c.stateNode;b(e)&&d.push(e);}if(c.child)c.child.return=c,c=c.child;else {if(c===a)return d;for(;!c.sibling;){if(!c.return||c.return===a)return d;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}}
            function W(a,b){if(a&&!a._reactInternals){var c=""+a;a=Array.isArray(a)?"an array":a&&1===a.nodeType&&a.tagName?"a DOM node":"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c;throw Error(p(286,b,a));}}function X(a){return !(!a||1!==a.nodeType||!a.tagName)}function Y(a){return X(a)?!1:null!=a&&"function"===typeof a.render&&"function"===typeof a.setState}function Ja(a,b){return Y(a)?a._reactInternals.type===b:!1}
            function Z(a,b){W(a,"findAllInRenderedTree");return a?Ia(a._reactInternals,b):[]}function Ka(a,b){W(a,"scryRenderedDOMComponentsWithClass");return Z(a,function(a){if(X(a)){var c=a.className;"string"!==typeof c&&(c=a.getAttribute("class")||"");var e=c.split(/\s+/);if(!Array.isArray(b)){if(void 0===b)throw Error(p(11));b=b.split(/\s+/);}return b.every(function(a){return -1!==e.indexOf(a)})}return !1})}
            function La(a,b){W(a,"scryRenderedDOMComponentsWithTag");return Z(a,function(a){return X(a)&&a.tagName.toUpperCase()===b.toUpperCase()})}function Ma(a,b){W(a,"scryRenderedComponentsWithType");return Z(a,function(a){return Ja(a,b)})}function Na(a,b,c){var d=a.type||"unknown-event";a.currentTarget=Ca(c);Aa(d,b,void 0,a);a.currentTarget=null;}
            function Oa(a,b,c){for(var d=[];a;){d.push(a);do a=a.return;while(a&&5!==a.tag);a=a?a:null;}for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c);}
            function Pa(a,b){var c=a.stateNode;if(!c)return null;var d=Da(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;if(c&&"function"!==typeof c)throw Error(p(231,
            b,typeof c));return c}function Qa(a,b,c){a&&c&&c._reactName&&(b=Pa(a,c._reactName))&&(null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a));}
            function Ra(a,b,c){var d=c._reactName;"captured"===b&&(d+="Capture");if(b=Pa(a,d))null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a);}var Sa={},Ta=new Set(["mouseEnter","mouseLeave","pointerEnter","pointerLeave"]);
            function Ua(a){return function(b,c){if(l__default['default'].isValidElement(b))throw Error(p(228));if(Y(b))throw Error(p(229));var d="on"+a[0].toUpperCase()+a.slice(1),e=new Ha;e.target=b;e.type=a.toLowerCase();var g=Ba(b),f=new ba(d,e.type,g,e,b);f.persist();objectAssign(f,c);Ta.has(a)?f&&f._reactName&&Qa(f._targetInst,null,f):f&&f._reactName&&Oa(f._targetInst,Ra,f);m__default['default'].unstable_batchedUpdates(function(){Ea(b);if(f){var a=f._dispatchListeners,c=f._dispatchInstances;if(Array.isArray(a))for(var d=0;d<a.length&&!f.isPropagationStopped();d++)Na(f,
            a[d],c[d]);else a&&Na(f,a,c);f._dispatchListeners=null;f._dispatchInstances=null;f.isPersistent()||f.constructor.release(f);}if(T)throw a=U,T=!1,U=null,a;});Fa();}}
            "blur cancel click close contextMenu copy cut auxClick doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play pointerCancel pointerDown pointerUp rateChange reset seeked submit touchCancel touchEnd touchStart volumeChange drag dragEnter dragExit dragLeave dragOver mouseMove mouseOut mouseOver pointerMove pointerOut pointerOver scroll toggle touchMove wheel abort animationEnd animationIteration animationStart canPlay canPlayThrough durationChange emptied encrypted ended error gotPointerCapture load loadedData loadedMetadata loadStart lostPointerCapture playing progress seeking stalled suspend timeUpdate transitionEnd waiting mouseEnter mouseLeave pointerEnter pointerLeave change select beforeInput compositionEnd compositionStart compositionUpdate".split(" ").forEach(function(a){Sa[a]=Ua(a);});
            exports.Simulate=Sa;
            exports.act=function(a){function b(){N--;J.current=c;I.current=d;}!1===ua&&(ua=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected."));N++;var c=J.current,d=I.current;J.current=!0;I.current=!0;try{var e=ta(a);}catch(g){throw b(),g;}if(null!==e&&"object"===typeof e&&"function"===typeof e.then)return {then:function(a,d){e.then(function(){1<N||!0===K&&!0===c?(b(),a()):M(function(c){b();c?d(c):a();});},function(a){b();d(a);});}};try{1!==N||!1!==K&&!1!==
            c||L(),b();}catch(g){throw b(),g;}return {then:function(a){a();}}};exports.findAllInRenderedTree=Z;exports.findRenderedComponentWithType=function(a,b){W(a,"findRenderedComponentWithType");a=Ma(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for componentType:"+b);return a[0]};
            exports.findRenderedDOMComponentWithClass=function(a,b){W(a,"findRenderedDOMComponentWithClass");a=Ka(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for class:"+b);return a[0]};exports.findRenderedDOMComponentWithTag=function(a,b){W(a,"findRenderedDOMComponentWithTag");a=La(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for tag:"+b);return a[0]};exports.isCompositeComponent=Y;exports.isCompositeComponentWithType=Ja;
            exports.isDOMComponent=X;exports.isDOMComponentElement=function(a){return !!(a&&l__default['default'].isValidElement(a)&&a.tagName)};exports.isElement=function(a){return l__default['default'].isValidElement(a)};exports.isElementOfType=function(a,b){return l__default['default'].isValidElement(a)&&a.type===b};exports.mockComponent=function(a,b){b=b||a.mockTagName||"div";a.prototype.render.mockImplementation(function(){return l__default['default'].createElement(b,null,this.props.children)});return this};exports.nativeTouchData=function(a,b){return {touches:[{pageX:a,pageY:b}]}};
            exports.renderIntoDocument=function(a){var b=document.createElement("div");return m__default['default'].render(a,b)};exports.scryRenderedComponentsWithType=Ma;exports.scryRenderedDOMComponentsWithClass=Ka;exports.scryRenderedDOMComponentsWithTag=La;exports.traverseTwoPhase=Oa;
            exports.unstable_concurrentAct=function(a){function b(){Q.current=c;O.current=d;}if(void 0===scheduler.unstable_flushAllWithoutAsserting)throw Error("This version of `act` requires a special mock build of Scheduler.");if(!0!==setTimeout._isMockFunction)throw Error("This version of `act` requires Jest's timer mocks (i.e. jest.useFakeTimers).");var c=Q.current,d=O.current;Q.current=!0;O.current=!0;try{var e=va(a);if("object"===typeof e&&null!==e&&"function"===typeof e.then)return {then:function(a,c){e.then(function(){wa(function(){b();
            a();},function(a){b();c(a);});},function(a){b();c(a);});}};try{do var g=scheduler.unstable_flushAllWithoutAsserting();while(g)}finally{b();}}catch(f){throw b(),f;}};
            });

            createCommonjsModule(function (module, exports) {
            });

            var testUtils = createCommonjsModule(function (module) {

            {
              module.exports = reactDomTestUtils_production_min;
            }
            });

            var reactAct = testUtils.act;
            var actSupported = reactAct !== undefined; // act is supported react-dom@16.8.0
            // so for versions that don't have act from test utils
            // we do this little polyfill. No warnings, but it's
            // better than nothing.

            function actPolyfill(cb) {
              m__default['default'].unstable_batchedUpdates(cb);
              m__default['default'].render( /*#__PURE__*/l$1.createElement("div", null), document.createElement('div'));
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
                return WrapperComponent ? /*#__PURE__*/l$1.createElement(WrapperComponent, null, innerElement) : innerElement;
              };

              act(function () {
                if (hydrate) {
                  m__default['default'].hydrate(wrapUiIfNeeded(ui), container);
                } else {
                  m__default['default'].render(wrapUiIfNeeded(ui), container);
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
                    m__default['default'].unmountComponentAtNode(container);
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
                m__default['default'].unmountComponentAtNode(container);
              });

              if (container.parentNode === document.body) {
                document.body.removeChild(container);
              }

              mountedContainers.delete(container);
            } // just re-export everything from dom-testing-library
            // thing for people using react-dom@16.8.0. Anyone else doesn't need it and
            // people should just upgrade anyway.

            /* eslint func-name-matching:0 */

            // or teardown then we'll automatically run cleanup afterEach test
            // this ensures that tests run in isolation from each other
            // if you don't like this then either import the `pure` module
            // or set the RTL_SKIP_AUTO_CLEANUP env variable to 'true'.

            {
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



            const CLICKABLE_INPUT_TYPES = ['button', 'color', 'file', 'image', 'reset', 'submit'];

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

            var hasSelectionSupport_1 = hasSelectionSupport;
            var getSelectionRange_1 = getSelectionRange;
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
            	hasSelectionSupport: hasSelectionSupport_1,
            	getSelectionRange: getSelectionRange_1,
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

            var isEditable_2 = isEditable;
            var isEditableInput_1 = isEditableInput;





            function isEditable(element) {
              return isEditableInput(element) || (0, isElementType_1.isElementType)(element, 'textarea', {
                readOnly: false
              }) || (0, isContentEditable_1.isContentEditable)(element);
            }

            var editableInputTypes;

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
            })(editableInputTypes || (editableInputTypes = {}));

            function isEditableInput(element) {
              return (0, isElementType_1.isElementType)(element, 'input', {
                readOnly: false
              }) && Boolean(editableInputTypes[element.type]);
            }

            var isEditable_1 = /*#__PURE__*/Object.defineProperty({
            	isEditable: isEditable_2,
            	isEditableInput: isEditableInput_1
            }, '__esModule', {value: true});

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
            exports.getWindowFromNode = getWindowFromNode;
            exports.getDocument = getDocument;
            exports.runWithRealTimers = runWithRealTimers;
            exports.checkContainerType = checkContainerType;
            exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
            exports.TEXT_NODE = exports.setTimeout = exports.setImmediate = exports.clearTimeout = void 0;
            const globalObj = typeof window === 'undefined' ? global$2 : window; // Constant node.nodeType for text nodes, see:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants

            const TEXT_NODE = 3; // Currently this fn only supports jest timers, but it could support other test runners in the future.

            exports.TEXT_NODE = TEXT_NODE;

            function runWithRealTimers(callback) {
              // istanbul ignore else
              if (typeof jest !== 'undefined') {
                return runWithJestRealTimers(callback).callbackReturnValue;
              } // istanbul ignore next


              return callback();
            }

            function runWithJestRealTimers(callback) {
              const timerAPI = {
                clearInterval,
                clearTimeout,
                setInterval,
                setTimeout
              }; // For more on why we have the check here,
              // checkout https://github.com/testing-library/dom-testing-library/issues/914

              if (typeof setImmediate === 'function') {
                timerAPI.setImmediate = setImmediate;
              }

              if (typeof clearImmediate === 'function') {
                timerAPI.clearImmediate = clearImmediate;
              }

              jest.useRealTimers();
              const callbackReturnValue = callback();
              const usedFakeTimers = Object.entries(timerAPI).some(([name, func]) => func !== globalObj[name]);

              if (usedFakeTimers) {
                var _timerAPI$setTimeout;

                jest.useFakeTimers((_timerAPI$setTimeout = timerAPI.setTimeout) != null && _timerAPI$setTimeout.clock ? 'modern' : 'legacy');
              }

              return {
                callbackReturnValue,
                usedFakeTimers
              };
            }

            function jestFakeTimersAreEnabled() {
              // istanbul ignore else
              if (typeof jest !== 'undefined') {
                return runWithJestRealTimers(() => {}).usedFakeTimers;
              } // istanbul ignore next


              return false;
            } // we only run our tests in node, and setImmediate is supported in node.
            // istanbul ignore next


            function setImmediatePolyfill(fn) {
              return globalObj.setTimeout(fn, 0);
            }

            function getTimeFunctions() {
              // istanbul ignore next
              return {
                clearTimeoutFn: globalObj.clearTimeout,
                setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
                setTimeoutFn: globalObj.setTimeout
              };
            }

            const {
              clearTimeoutFn,
              setImmediateFn,
              setTimeoutFn
            } = runWithRealTimers(getTimeFunctions);
            exports.setTimeout = setTimeoutFn;
            exports.setImmediate = setImmediateFn;
            exports.clearTimeout = clearTimeoutFn;

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
              } else if (node.then instanceof Function) {
                throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
              } else if (Array.isArray(node)) {
                throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
              } else {
                // The user passed something unusual to a calling function
                throw new Error(`Unable to find the "window" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new`);
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

            var wait_2 = wait;

            function wait(time) {
              return new Promise(resolve => setTimeout(() => resolve(), time));
            }

            var wait_1 = /*#__PURE__*/Object.defineProperty({
            	wait: wait_2
            }, '__esModule', {value: true});

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

            function hover(element, init) {
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

            function unhover(element, init) {
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
              } while (el && el !== document.body);

              return undefined;
            }

            function click(element, init, {
              skipHover = false,
              clickCount = 0
            } = {}) {
              if (!skipHover) (0, hover_1.hover)(element, init);

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

            function dblClick(element, init) {
              (0, hover_1.hover)(element, init);
              click(element, init, {
                skipHover: true,
                clickCount: 0
              });
              click(element, init, {
                skipHover: true,
                clickCount: 1
              });

              _dom.fireEvent.dblClick(element, (0, utils.getMouseEventOptions)('dblclick', init, 2));
            }

            var click_1 = /*#__PURE__*/Object.defineProperty({
            	click: click_2,
            	dblClick: dblClick_1
            }, '__esModule', {value: true});

            var _typeof_1 = createCommonjsModule(function (module) {
            function _typeof(obj) {
              "@babel/helpers - typeof";

              if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                module.exports = _typeof = function _typeof(obj) {
                  return typeof obj;
                };

                module.exports["default"] = module.exports, module.exports.__esModule = true;
              } else {
                module.exports = _typeof = function _typeof(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };

                module.exports["default"] = module.exports, module.exports.__esModule = true;
              }

              return _typeof(obj);
            }

            module.exports = _typeof;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var interopRequireWildcard = createCommonjsModule(function (module) {
            var _typeof = _typeof_1["default"];

            function _getRequireWildcardCache() {
              if (typeof WeakMap !== "function") return null;
              var cache = new WeakMap();

              _getRequireWildcardCache = function _getRequireWildcardCache() {
                return cache;
              };

              return cache;
            }

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              }

              if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                return {
                  "default": obj
                };
              }

              var cache = _getRequireWildcardCache();

              if (cache && cache.has(obj)) {
                return cache.get(obj);
              }

              var newObj = {};
              var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

                  if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                  } else {
                    newObj[key] = obj[key];
                  }
                }
              }

              newObj["default"] = obj;

              if (cache) {
                cache.set(obj, newObj);
              }

              return newObj;
            }

            module.exports = _interopRequireWildcard;
            module.exports["default"] = module.exports, module.exports.__esModule = true;
            });

            var getNextKeyDef_2 = getNextKeyDef;

            /**
             * Get the next key from keyMap
             *
             * Keys can be referenced by `{key}` or `{special}` as well as physical locations per `[code]`.
             * Everything else will be interpreted as a typed character - e.g. `a`.
             * Brackets `{` and `[` can be escaped by doubling - e.g. `foo[[bar` translates to `foo[bar`.
             * Keeping the key pressed can be written as `{key>}`.
             * Modifiers like `{shift}` imply being kept pressed. This can be turned of per `{shift/}`.
             */
            function getNextKeyDef(text, options) {
              var _text$slice$match;

              const startBracket = ['{', '['].includes(text[0]) ? text[0] : '';
              const startModifier = startBracket && text[1] === '/' ? '/' : '';
              const descriptorStart = startBracket.length + startModifier.length;
              const descriptor = startBracket ? text[descriptorStart] === startBracket ? startBracket : (_text$slice$match = text.slice(descriptorStart).match(/^\w+/)) == null ? void 0 : _text$slice$match[0] : text[descriptorStart]; // istanbul ignore if

              if (!descriptor) {
                throw new Error(`Expected key descriptor but found "${text[descriptorStart]}" in "${text}"`);
              }

              const descriptorEnd = descriptorStart + descriptor.length;
              const endModifier = startBracket && descriptor !== startBracket && ['/', '>'].includes(text[descriptorEnd]) ? text[descriptorEnd] : '';
              const endBracket = !startBracket || descriptor === startBracket ? '' : startBracket === '{' ? '}' : ']'; // istanbul ignore if

              if (endBracket && text[descriptorEnd + endModifier.length] !== endBracket) {
                throw new Error(`Expected closing bracket but found "${text[descriptorEnd + endModifier.length]}" in "${text}"`);
              }

              const modifiers = {
                consumedLength: [startBracket, startModifier, descriptor, endModifier, endBracket].map(c => c.length).reduce((a, b) => a + b),
                releasePrevious: startModifier === '/',
                releaseSelf: hasReleaseSelf(startBracket, descriptor, endModifier)
              };

              if (isPrintableCharacter(startBracket, descriptor)) {
                var _options$keyboardMap$;

                return { ...modifiers,
                  keyDef: (_options$keyboardMap$ = options.keyboardMap.find(k => k.key === descriptor)) != null ? _options$keyboardMap$ : {
                    key: descriptor,
                    code: 'Unknown'
                  }
                };
              } else if (startBracket === '{') {
                var _options$keyboardMap$2;

                const key = mapLegacyKey(descriptor);
                return { ...modifiers,
                  keyDef: (_options$keyboardMap$2 = options.keyboardMap.find(k => {
                    var _k$key;

                    return ((_k$key = k.key) == null ? void 0 : _k$key.toLowerCase()) === key.toLowerCase();
                  })) != null ? _options$keyboardMap$2 : {
                    key: descriptor,
                    code: 'Unknown'
                  }
                };
              } else {
                var _options$keyboardMap$3;

                return { ...modifiers,
                  keyDef: (_options$keyboardMap$3 = options.keyboardMap.find(k => {
                    var _k$code;

                    return ((_k$code = k.code) == null ? void 0 : _k$code.toLowerCase()) === descriptor.toLowerCase();
                  })) != null ? _options$keyboardMap$3 : {
                    key: 'Unknown',
                    code: descriptor
                  }
                };
              }
            }

            function hasReleaseSelf(startBracket, descriptor, endModifier) {
              if (endModifier === '/' || !startBracket) {
                return true;
              }

              if (startBracket === '{' && ['alt', 'ctrl', 'meta', 'shift'].includes(descriptor.toLowerCase())) {
                return false;
              }

              return endModifier !== '>';
            }

            function mapLegacyKey(descriptor) {
              var _ctrl$del$esc$space$d;

              return (_ctrl$del$esc$space$d = {
                ctrl: 'Control',
                del: 'Delete',
                esc: 'Escape',
                space: ' '
              }[descriptor]) != null ? _ctrl$del$esc$space$d : descriptor;
            }

            function isPrintableCharacter(startBracket, descriptor) {
              return !startBracket || startBracket === descriptor || startBracket === '{' && descriptor.length === 1;
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
              // TODO: implement for textarea and contentEditable
              matches: (keyDef, element) => (keyDef.key === 'ArrowLeft' || keyDef.key === 'ArrowRight') && (0, utils.isElementType)(element, 'input'),
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
              }
              /* istanbul ignore else */
              else if ((0, utils.isElementType)(element, ['input', 'textarea'])) {
                  applyNative(element, 'value', newValue);
                } else {
                  // TODO: properly type guard
                  throw new Error('Invalid Element');
                }

              setSelectionRangeAfterInput(element, newSelectionStart);

              _dom.fireEvent.input(element, { ...eventOverrides
              });

              setSelectionRangeAfterInputHandler(element, newValue);
            }

            function setSelectionRangeAfterInput(element, newSelectionStart) {
              (0, utils.setSelectionRange)(element, newSelectionStart, newSelectionStart);
            }

            function setSelectionRangeAfterInputHandler(element, newValue) {
              // if we *can* change the selection start, then we will if the new value
              // is the same as the current value (so it wasn't programatically changed
              // when the fireEvent.input was triggered).
              // The reason we have to do this at all is because it actually *is*
              // programmatically changed by fireEvent.input, so we have to simulate the
              // browser's default behavior
              const value = (0, utils.getValue)(element); // don't apply this workaround on elements that don't necessarily report the visible value - e.g. number
              // TODO: this could probably be only applied when there is keyboardState.carryValue

              const expectedValue = value === newValue || value === '' && (0, utils.hasUnreliableEmptyValue)(element);

              if (!expectedValue) {
                // If the currentValue is different than the expected newValue and we *can*
                // change the selection range, than we should set it to the length of the
                // currentValue to ensure that the browser behavior is mimicked.
                (0, utils.setSelectionRange)(element, value.length, value.length);
              }
            }
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
              }

              element[propName] = propValue;

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
            exports.postKeyupBehavior = exports.keyupBehavior = exports.preKeyupBehavior = exports.keypressBehavior = exports.keydownBehavior = exports.preKeydownBehavior = void 0;









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
              matches: (keyDef, element) => keyDef.key === 'Enter' && ((0, utils.isClickableInput)(element) || // Links with href defined should handle Enter the same as a click
              (0, utils.isElementType)(element, 'a') && Boolean(element.href)),
              handle: (keyDef, element, options, state) => {
                _dom.fireEvent.click(element, (0, getEventProps.getMouseEventProps)(state));
              }
            }, {
              matches: (keyDef, element) => keyDef.key === 'Enter' && (0, utils.isElementType)(element, 'input'),
              handle: (keyDef, element) => {
                const form = element.form;

                if (form && (form.querySelectorAll('input').length === 1 || form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]'))) {
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
            exports.postKeyupBehavior = exports.keyupBehavior = exports.preKeyupBehavior = exports.keypressBehavior = exports.keydownBehavior = exports.preKeydownBehavior = exports.replaceBehavior = void 0;



            var arrowKeys = interopRequireWildcard(arrow);

            var controlKeys = interopRequireWildcard(control);

            var characterKeys = interopRequireWildcard(character);

            var functionalKeys = interopRequireWildcard(functional);

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







            var plugins = interopRequireWildcard(plugins$1);



            async function keyboardImplementation(text, options, state) {
              const {
                document
              } = options;

              const getCurrentElement = () => getActive(document);

              const {
                keyDef,
                consumedLength,
                releasePrevious,
                releaseSelf
              } = (0, getNextKeyDef_1.getNextKeyDef)(text, options);
              const replace = applyPlugins(plugins.replaceBehavior, keyDef, getCurrentElement(), options, state);

              if (!replace) {
                const pressed = state.pressed.find(p => p.keyDef === keyDef);

                if (pressed) {
                  keyup(keyDef, getCurrentElement, options, state, pressed.unpreventedDefault);
                }

                if (!releasePrevious) {
                  const unpreventedDefault = keydown(keyDef, getCurrentElement, options, state);

                  if (unpreventedDefault && hasKeyPress(keyDef, state)) {
                    keypress(keyDef, getCurrentElement, options, state);
                  }

                  if (releaseSelf) {
                    keyup(keyDef, getCurrentElement, options, state, unpreventedDefault);
                  }
                }
              }

              if (text.length > consumedLength) {
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
              code: 'Escape',
              key: 'CapsLock',
              keyCode: 20
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
            } // TODO: add mappings
            ];
            exports.defaultKeyMap = defaultKeyMap;
            });

            var specialCharMap_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.specialCharMap = void 0;
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
              whitespace: ' '
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

              const currentElement = () => (0, utils.getActiveElement)(element.ownerDocument); // by default, a new element has it's selection start and end at 0
              // but most of the time when people call "type", they expect it to type
              // at the end of the current input value. So, if the selection start
              // and end are both the default of 0, then we'll go ahead and change
              // them to the length of the current value.
              // the only time it would make sense to pass the initialSelectionStart or
              // initialSelectionEnd is if you have an input with a value and want to
              // explicitely start typing with the cursor at 0. Not super common.


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
              }
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
              if (focusTrap === document && currentIndex === 0 && shift) {
                return document.body;
              } else if (focusTrap === document && currentIndex === elements.length - 1 && !shift) {
                return document.body;
              } else {
                const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
                const defaultIndex = shift ? elements.length - 1 : 0;
                return elements[nextIndex] || elements[defaultIndex];
              }
            }

            function tab({
              shift = false,
              focusTrap
            } = {}) {
              var _focusTrap$ownerDocum, _focusTrap;

              const previousElement = (0, utils.getActiveElement)((_focusTrap$ownerDocum = (_focusTrap = focusTrap) == null ? void 0 : _focusTrap.ownerDocument) != null ? _focusTrap$ownerDocum : document);

              if (!focusTrap) {
                focusTrap = document;
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
                if (nextElement === document.body) {
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

              if ((0, utils.isDisabled)(element)) return;
              (0, click_1.click)(element, init == null ? void 0 : init.clickInit);
              const input = (0, utils.isElementType)(element, 'label') ? element.control : element;
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
                composed: true,
                ...init
              }));

              _dom.fireEvent.change(input, {
                target: {
                  files: inputFiles
                },
                ...init
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
            exports.deselectOptions = exports.selectOptions = void 0;











            function selectOptionsBase(newValue, select, values, init) {
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
                    // events fired for multiple select are weird. Can't use hover...
                    _dom.fireEvent.pointerOver(option, init);

                    _dom.fireEvent.pointerEnter(select, init);

                    _dom.fireEvent.mouseOver(option);

                    _dom.fireEvent.mouseEnter(select);

                    _dom.fireEvent.pointerMove(option, init);

                    _dom.fireEvent.mouseMove(option, init);

                    _dom.fireEvent.pointerDown(option, init);

                    _dom.fireEvent.mouseDown(option, init);

                    (0, focus_1.focus)(select);

                    _dom.fireEvent.pointerUp(option, init);

                    _dom.fireEvent.mouseUp(option, init);

                    selectOption(option);

                    _dom.fireEvent.click(option, init);
                  }
                } else if (selectedOptions.length === 1) {
                  // the click to open the select options
                  (0, click_1.click)(select, init);
                  selectOption(selectedOptions[0]); // the browser triggers another click event on the select for the click on the option
                  // this second click has no 'down' phase

                  _dom.fireEvent.pointerOver(select, init);

                  _dom.fireEvent.pointerEnter(select, init);

                  _dom.fireEvent.mouseOver(select);

                  _dom.fireEvent.mouseEnter(select);

                  _dom.fireEvent.pointerUp(select, init);

                  _dom.fireEvent.mouseUp(select, init);

                  _dom.fireEvent.click(select, init);
                } else {
                  throw (0, _dom.getConfig)().getElementError(`Cannot select multiple options on a non-multiple select`, select);
                }
              } else if (select.getAttribute('role') === 'listbox') {
                selectedOptions.forEach(option => {
                  (0, hover_1.hover)(option, init);
                  (0, click_1.click)(option, init);
                  (0, hover_1.unhover)(option, init);
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





            function paste(element, text, init, {
              initialSelectionStart,
              initialSelectionEnd
            } = {}) {
              if ((0, utils.isDisabled)(element)) {
                return;
              } // TODO: implement for contenteditable


              if (typeof element.value === 'undefined') {
                throw new TypeError(`the current element is of type ${element.tagName} and doesn't have a valid value`);
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
            Object.defineProperty(exports, "specialChars", {
              enumerable: true,
              get: function () {
                return keyboard_1.specialCharMap;
              }
            });
            exports.default = void 0;



















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

            configure({
              testIdAttribute: 'data-test-id',
              getElementError: buildJsGetElementError
            }); // In order to allow us to interop `fireEvent` as both a function, and an object with function values,
            // we need two vars exported so we can `@JS()` annotate each one separately with the type Dart expects.

            var fireEventObj = fireEvent;

            exports.__moduleExports = dist;
            exports.act = act;
            exports.buildJsGetElementError = buildJsGetElementError;
            exports.buildQueries = buildQueries;
            exports.buildTestingLibraryElementError = buildTestingLibraryElementError;
            exports.cleanup = cleanup;
            exports.configure = configure;
            exports.createEvent = createEvent;
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
            exports.prettyFormat = build$1;
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
            exports.wait = wait$1;
            exports.waitFor = waitForWrapper;
            exports.waitForDomChange = waitForDomChangeWrapper;
            exports.waitForElement = waitForElement;
            exports.waitForElementToBeRemoved = waitForElementToBeRemoved;
            exports.within = getQueriesForElement;
            exports.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
            exports.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;

            Object.defineProperty(exports, '__esModule', { value: true });

})));
