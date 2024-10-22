(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("react-dom")) : typeof define === "function" && define.amd ? define(["exports", "react", "react-dom"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.rtl = {}, global2.React, global2.ReactDOM));
})(this, function(exports2, React, ReactDOM) {
  "use strict";
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k2 in e) {
        if (k2 !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k2);
          Object.defineProperty(n, k2, d.get ? d : {
            enumerable: true,
            get: () => e[k2]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  function _mergeNamespaces(n, m2) {
    for (var i2 = 0; i2 < m2.length; i2++) {
      const e = m2[i2];
      if (typeof e !== "string" && !Array.isArray(e)) {
        for (const k2 in e) {
          if (k2 !== "default" && !(k2 in n)) {
            const d = Object.getOwnPropertyDescriptor(e, k2);
            if (d) {
              Object.defineProperty(n, k2, d.get ? d : {
                enumerable: true,
                get: () => e[k2]
              });
            }
          }
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
  }
  const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k2) {
      var d = Object.getOwnPropertyDescriptor(n, k2);
      Object.defineProperty(a, k2, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k2];
        }
      });
    });
    return a;
  }
  var testUtils = { exports: {} };
  var reactDomTestUtils_production_min = {};
  /**
   * @license React
   * react-dom-test-utils.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactDomTestUtils_production_min;
  function requireReactDomTestUtils_production_min() {
    if (hasRequiredReactDomTestUtils_production_min) return reactDomTestUtils_production_min;
    hasRequiredReactDomTestUtils_production_min = 1;
    var k2 = React, l = ReactDOM;
    function m2(a) {
      var b = a, c = a;
      if (a.alternate) for (; b.return; ) b = b.return;
      else {
        a = b;
        do
          b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
        while (a);
      }
      return 3 === b.tag ? c : null;
    }
    function n(a) {
      if (m2(a) !== a) throw Error("Unable to find node on an unmounted component.");
    }
    function p(a) {
      var b = a.alternate;
      if (!b) {
        b = m2(a);
        if (null === b) throw Error("Unable to find node on an unmounted component.");
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var f = c.return;
        if (null === f) break;
        var g2 = f.alternate;
        if (null === g2) {
          d = f.return;
          if (null !== d) {
            c = d;
            continue;
          }
          break;
        }
        if (f.child === g2.child) {
          for (g2 = f.child; g2; ) {
            if (g2 === c) return n(f), a;
            if (g2 === d) return n(f), b;
            g2 = g2.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (c.return !== d.return) c = f, d = g2;
        else {
          for (var e = false, h = f.child; h; ) {
            if (h === c) {
              e = true;
              c = f;
              d = g2;
              break;
            }
            if (h === d) {
              e = true;
              d = f;
              c = g2;
              break;
            }
            h = h.sibling;
          }
          if (!e) {
            for (h = g2.child; h; ) {
              if (h === c) {
                e = true;
                c = g2;
                d = f;
                break;
              }
              if (h === d) {
                e = true;
                d = g2;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!e) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (c.alternate !== d) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (3 !== c.tag) throw Error("Unable to find node on an unmounted component.");
      return c.stateNode.current === c ? a : b;
    }
    var q = Object.assign;
    function r(a) {
      var b = a.keyCode;
      "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
      10 === a && (a = 13);
      return 32 <= a || 13 === a ? a : 0;
    }
    function t() {
      return true;
    }
    function u() {
      return false;
    }
    function v(a) {
      function b(c, b2, f, g2, e) {
        this._reactName = c;
        this._targetInst = f;
        this.type = b2;
        this.nativeEvent = g2;
        this.target = e;
        this.currentTarget = null;
        for (var d in a) a.hasOwnProperty(d) && (c = a[d], this[d] = c ? c(g2) : g2[d]);
        this.isDefaultPrevented = (null != g2.defaultPrevented ? g2.defaultPrevented : false === g2.returnValue) ? t : u;
        this.isPropagationStopped = u;
        return this;
      }
      q(b.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = t);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = t);
      }, persist: function() {
      }, isPersistent: t });
      return b;
    }
    var w = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, x = v(w), y = q({}, w, { view: 0, detail: 0 });
    v(y);
    var z, A, B, D = q({}, y, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: C, button: 0, buttons: 0, relatedTarget: function(a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      if ("movementX" in a) return a.movementX;
      a !== B && (B && "mousemove" === a.type ? (z = a.screenX - B.screenX, A = a.screenY - B.screenY) : A = z = 0, B = a);
      return z;
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : A;
    } });
    v(D);
    var E = q({}, D, { dataTransfer: 0 });
    v(E);
    var F = q({}, y, { relatedTarget: 0 });
    v(F);
    var aa = q({}, w, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
    v(aa);
    var ba = q({}, w, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } });
    v(ba);
    var ca = q({}, w, { data: 0 });
    v(ca);
    var da = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, ea = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, fa = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function ha(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = fa[a]) ? !!b[a] : false;
    }
    function C() {
      return ha;
    }
    var ia = q({}, y, { key: function(a) {
      if (a.key) {
        var b = da[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = r(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? ea[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: C, charCode: function(a) {
      return "keypress" === a.type ? r(a) : 0;
    }, keyCode: function(a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }, which: function(a) {
      return "keypress" === a.type ? r(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    } });
    v(ia);
    var ja = q({}, D, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
    v(ja);
    var ka = q({}, y, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: C });
    v(ka);
    var la = q({}, w, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
    v(la);
    var ma = q({}, D, { deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    }, deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 });
    v(ma);
    function na(a, b, c, d, f, g2, e, h, N) {
      var G = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, G);
      } catch (oa) {
        this.onError(oa);
      }
    }
    var H = false, I = null, J = false, K = null, pa = { onError: function(a) {
      H = true;
      I = a;
    } };
    function qa(a, b, c, d, f, g2, e, h, N) {
      H = false;
      I = null;
      na.apply(pa, arguments);
    }
    function ra(a, b, c, d, f, g2, e, h, N) {
      qa.apply(this, arguments);
      if (H) {
        if (H) {
          var G = I;
          H = false;
          I = null;
        } else throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
        J || (J = true, K = G);
      }
    }
    var L = Array.isArray, M = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events, sa = M[0], ta = M[1], ua = M[2], va = M[3], wa = M[4], xa = k2.unstable_act;
    function ya() {
    }
    function za(a, b) {
      if (!a) return [];
      a = p(a);
      if (!a) return [];
      for (var c = a, d = []; ; ) {
        if (5 === c.tag || 6 === c.tag || 1 === c.tag || 0 === c.tag) {
          var f = c.stateNode;
          b(f) && d.push(f);
        }
        if (c.child) c.child.return = c, c = c.child;
        else {
          if (c === a) return d;
          for (; !c.sibling; ) {
            if (!c.return || c.return === a) return d;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
    }
    function O(a, b) {
      if (a && !a._reactInternals) {
        var c = String(a);
        a = L(a) ? "an array" : a && 1 === a.nodeType && a.tagName ? "a DOM node" : "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c;
        throw Error(b + "(...): the first argument must be a React class instance. Instead received: " + (a + "."));
      }
    }
    function P(a) {
      return !(!a || 1 !== a.nodeType || !a.tagName);
    }
    function Q(a) {
      return P(a) ? false : null != a && "function" === typeof a.render && "function" === typeof a.setState;
    }
    function R(a, b) {
      return Q(a) ? a._reactInternals.type === b : false;
    }
    function S(a, b) {
      O(a, "findAllInRenderedTree");
      return a ? za(a._reactInternals, b) : [];
    }
    function T(a, b) {
      O(a, "scryRenderedDOMComponentsWithClass");
      return S(a, function(a2) {
        if (P(a2)) {
          var c = a2.className;
          "string" !== typeof c && (c = a2.getAttribute("class") || "");
          var f = c.split(/\s+/);
          if (!L(b)) {
            if (void 0 === b) throw Error("TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.");
            b = b.split(/\s+/);
          }
          return b.every(function(a3) {
            return -1 !== f.indexOf(a3);
          });
        }
        return false;
      });
    }
    function U(a, b) {
      O(a, "scryRenderedDOMComponentsWithTag");
      return S(a, function(a2) {
        return P(a2) && a2.tagName.toUpperCase() === b.toUpperCase();
      });
    }
    function V(a, b) {
      O(a, "scryRenderedComponentsWithType");
      return S(a, function(a2) {
        return R(a2, b);
      });
    }
    function W(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = ta(c);
      ra(d, b, void 0, a);
      a.currentTarget = null;
    }
    function X(a, b, c) {
      for (var d = []; a; ) {
        d.push(a);
        do
          a = a.return;
        while (a && 5 !== a.tag);
        a = a ? a : null;
      }
      for (a = d.length; 0 < a--; ) b(d[a], "captured", c);
      for (a = 0; a < d.length; a++) b(d[a], "bubbled", c);
    }
    function Y(a, b) {
      var c = a.stateNode;
      if (!c) return null;
      var d = ua(c);
      if (!d) return null;
      c = d[b];
      a: switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
          a = !d;
          break a;
        default:
          a = false;
      }
      if (a) return null;
      if (c && "function" !== typeof c) throw Error("Expected `" + b + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    function Aa(a, b, c) {
      a && c && c._reactName && (b = Y(a, c._reactName)) && (null == c._dispatchListeners && (c._dispatchListeners = []), null == c._dispatchInstances && (c._dispatchInstances = []), c._dispatchListeners.push(b), c._dispatchInstances.push(a));
    }
    function Ba(a, b, c) {
      var d = c._reactName;
      "captured" === b && (d += "Capture");
      if (b = Y(a, d)) null == c._dispatchListeners && (c._dispatchListeners = []), null == c._dispatchInstances && (c._dispatchInstances = []), c._dispatchListeners.push(b), c._dispatchInstances.push(a);
    }
    var Z = {}, Ca = /* @__PURE__ */ new Set(["mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave"]);
    function Da(a) {
      return function(b, c) {
        if (k2.isValidElement(b)) throw Error("TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering.");
        if (Q(b)) throw Error("TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead.");
        var d = "on" + a[0].toUpperCase() + a.slice(1), f = new ya();
        f.target = b;
        f.type = a.toLowerCase();
        var g2 = sa(b), e = new x(d, f.type, g2, f, b);
        e.persist();
        q(e, c);
        Ca.has(a) ? e && e._reactName && Aa(e._targetInst, null, e) : e && e._reactName && X(e._targetInst, Ba, e);
        l.unstable_batchedUpdates(function() {
          va(b);
          if (e) {
            var a2 = e._dispatchListeners, c2 = e._dispatchInstances;
            if (L(a2)) for (var d2 = 0; d2 < a2.length && !e.isPropagationStopped(); d2++) W(e, a2[d2], c2[d2]);
            else a2 && W(e, a2, c2);
            e._dispatchListeners = null;
            e._dispatchInstances = null;
            e.isPersistent() || e.constructor.release(e);
          }
          if (J) throw a2 = K, J = false, K = null, a2;
        });
        wa();
      };
    }
    "blur cancel click close contextMenu copy cut auxClick doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play pointerCancel pointerDown pointerUp rateChange reset resize seeked submit touchCancel touchEnd touchStart volumeChange drag dragEnter dragExit dragLeave dragOver mouseMove mouseOut mouseOver pointerMove pointerOut pointerOver scroll toggle touchMove wheel abort animationEnd animationIteration animationStart canPlay canPlayThrough durationChange emptied encrypted ended error gotPointerCapture load loadedData loadedMetadata loadStart lostPointerCapture playing progress seeking stalled suspend timeUpdate transitionEnd waiting mouseEnter mouseLeave pointerEnter pointerLeave change select beforeInput compositionEnd compositionStart compositionUpdate".split(" ").forEach(function(a) {
      Z[a] = Da(a);
    });
    reactDomTestUtils_production_min.Simulate = Z;
    reactDomTestUtils_production_min.act = xa;
    reactDomTestUtils_production_min.findAllInRenderedTree = S;
    reactDomTestUtils_production_min.findRenderedComponentWithType = function(a, b) {
      O(a, "findRenderedComponentWithType");
      a = V(a, b);
      if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for componentType:" + b);
      return a[0];
    };
    reactDomTestUtils_production_min.findRenderedDOMComponentWithClass = function(a, b) {
      O(a, "findRenderedDOMComponentWithClass");
      a = T(a, b);
      if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for class:" + b);
      return a[0];
    };
    reactDomTestUtils_production_min.findRenderedDOMComponentWithTag = function(a, b) {
      O(a, "findRenderedDOMComponentWithTag");
      a = U(a, b);
      if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for tag:" + b);
      return a[0];
    };
    reactDomTestUtils_production_min.isCompositeComponent = Q;
    reactDomTestUtils_production_min.isCompositeComponentWithType = R;
    reactDomTestUtils_production_min.isDOMComponent = P;
    reactDomTestUtils_production_min.isDOMComponentElement = function(a) {
      return !!(a && k2.isValidElement(a) && a.tagName);
    };
    reactDomTestUtils_production_min.isElement = function(a) {
      return k2.isValidElement(a);
    };
    reactDomTestUtils_production_min.isElementOfType = function(a, b) {
      return k2.isValidElement(a) && a.type === b;
    };
    reactDomTestUtils_production_min.mockComponent = function(a, b) {
      b = b || a.mockTagName || "div";
      a.prototype.render.mockImplementation(function() {
        return k2.createElement(b, null, this.props.children);
      });
      return this;
    };
    reactDomTestUtils_production_min.nativeTouchData = function(a, b) {
      return { touches: [{ pageX: a, pageY: b }] };
    };
    reactDomTestUtils_production_min.renderIntoDocument = function(a) {
      var b = document.createElement("div");
      return l.render(a, b);
    };
    reactDomTestUtils_production_min.scryRenderedComponentsWithType = V;
    reactDomTestUtils_production_min.scryRenderedDOMComponentsWithClass = T;
    reactDomTestUtils_production_min.scryRenderedDOMComponentsWithTag = U;
    reactDomTestUtils_production_min.traverseTwoPhase = X;
    return reactDomTestUtils_production_min;
  }
  var reactDomTestUtils_development = {};
  /**
   * @license React
   * react-dom-test-utils.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactDomTestUtils_development;
  function requireReactDomTestUtils_development() {
    if (hasRequiredReactDomTestUtils_development) return reactDomTestUtils_development;
    hasRequiredReactDomTestUtils_development = 1;
    if (process.env.NODE_ENV !== "production") {
      (function() {
        var React$1 = React;
        var ReactDOM$1 = ReactDOM;
        var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format2) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format2, args);
            }
          }
        }
        function error(format2) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format2, args);
            }
          }
        }
        function printWarning(level, format2, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format2 += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format2);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function get(key2) {
          return key2._reactInternals;
        }
        var FunctionComponent = 0;
        var ClassComponent = 1;
        var HostRoot = 3;
        var HostComponent = 5;
        var HostText = 6;
        var NoFlags = (
          /*                      */
          0
        );
        var Placement = (
          /*                    */
          2
        );
        var Hydrating = (
          /*                    */
          4096
        );
        ReactSharedInternals.ReactCurrentOwner;
        function getNearestMountedFiber(fiber) {
          var node = fiber;
          var nearestMounted = fiber;
          if (!fiber.alternate) {
            var nextNode = node;
            do {
              node = nextNode;
              if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
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
            return nearestMounted;
          }
          return null;
        }
        function assertIsMounted(fiber) {
          if (getNearestMountedFiber(fiber) !== fiber) {
            throw new Error("Unable to find node on an unmounted component.");
          }
        }
        function findCurrentFiberUsingSlowPath(fiber) {
          var alternate = fiber.alternate;
          if (!alternate) {
            var nearestMounted = getNearestMountedFiber(fiber);
            if (nearestMounted === null) {
              throw new Error("Unable to find node on an unmounted component.");
            }
            if (nearestMounted !== fiber) {
              return null;
            }
            return fiber;
          }
          var a = fiber;
          var b = alternate;
          while (true) {
            var parentA = a.return;
            if (parentA === null) {
              break;
            }
            var parentB = parentA.alternate;
            if (parentB === null) {
              var nextParent = parentA.return;
              if (nextParent !== null) {
                a = b = nextParent;
                continue;
              }
              break;
            }
            if (parentA.child === parentB.child) {
              var child = parentA.child;
              while (child) {
                if (child === a) {
                  assertIsMounted(parentA);
                  return fiber;
                }
                if (child === b) {
                  assertIsMounted(parentA);
                  return alternate;
                }
                child = child.sibling;
              }
              throw new Error("Unable to find node on an unmounted component.");
            }
            if (a.return !== b.return) {
              a = parentA;
              b = parentB;
            } else {
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
                  throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
                }
              }
            }
            if (a.alternate !== b) {
              throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          if (a.tag !== HostRoot) {
            throw new Error("Unable to find node on an unmounted component.");
          }
          if (a.stateNode.current === a) {
            return fiber;
          }
          return alternate;
        }
        var assign2 = Object.assign;
        function getEventCharCode(nativeEvent) {
          var charCode;
          var keyCode = nativeEvent.keyCode;
          if ("charCode" in nativeEvent) {
            charCode = nativeEvent.charCode;
            if (charCode === 0 && keyCode === 13) {
              charCode = 13;
            }
          } else {
            charCode = keyCode;
          }
          if (charCode === 10) {
            charCode = 13;
          }
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
        }
        function createSyntheticEvent(Interface) {
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
              var normalize2 = Interface[_propName];
              if (normalize2) {
                this[_propName] = normalize2(nativeEvent);
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
          assign2(SyntheticBaseEvent.prototype, {
            preventDefault: function() {
              this.defaultPrevented = true;
              var event = this.nativeEvent;
              if (!event) {
                return;
              }
              if (event.preventDefault) {
                event.preventDefault();
              } else if (typeof event.returnValue !== "unknown") {
                event.returnValue = false;
              }
              this.isDefaultPrevented = functionThatReturnsTrue;
            },
            stopPropagation: function() {
              var event = this.nativeEvent;
              if (!event) {
                return;
              }
              if (event.stopPropagation) {
                event.stopPropagation();
              } else if (typeof event.cancelBubble !== "unknown") {
                event.cancelBubble = true;
              }
              this.isPropagationStopped = functionThatReturnsTrue;
            },
            /**
             * We release all dispatched `SyntheticEvent`s after each event loop, adding
             * them back into the pool. This allows a way to hold onto a reference that
             * won't be added back into the pool.
             */
            persist: function() {
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
        var EventInterface = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: function(event) {
            return event.timeStamp || Date.now();
          },
          defaultPrevented: 0,
          isTrusted: 0
        };
        var SyntheticEvent = createSyntheticEvent(EventInterface);
        var UIEventInterface = assign2({}, EventInterface, {
          view: 0,
          detail: 0
        });
        createSyntheticEvent(UIEventInterface);
        var lastMovementX;
        var lastMovementY;
        var lastMouseEvent;
        function updateMouseMovementPolyfillState(event) {
          if (event !== lastMouseEvent) {
            if (lastMouseEvent && event.type === "mousemove") {
              lastMovementX = event.screenX - lastMouseEvent.screenX;
              lastMovementY = event.screenY - lastMouseEvent.screenY;
            } else {
              lastMovementX = 0;
              lastMovementY = 0;
            }
            lastMouseEvent = event;
          }
        }
        var MouseEventInterface = assign2({}, UIEventInterface, {
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
          relatedTarget: function(event) {
            if (event.relatedTarget === void 0) return event.fromElement === event.srcElement ? event.toElement : event.fromElement;
            return event.relatedTarget;
          },
          movementX: function(event) {
            if ("movementX" in event) {
              return event.movementX;
            }
            updateMouseMovementPolyfillState(event);
            return lastMovementX;
          },
          movementY: function(event) {
            if ("movementY" in event) {
              return event.movementY;
            }
            return lastMovementY;
          }
        });
        createSyntheticEvent(MouseEventInterface);
        var DragEventInterface = assign2({}, MouseEventInterface, {
          dataTransfer: 0
        });
        createSyntheticEvent(DragEventInterface);
        var FocusEventInterface = assign2({}, UIEventInterface, {
          relatedTarget: 0
        });
        createSyntheticEvent(FocusEventInterface);
        var AnimationEventInterface = assign2({}, EventInterface, {
          animationName: 0,
          elapsedTime: 0,
          pseudoElement: 0
        });
        createSyntheticEvent(AnimationEventInterface);
        var ClipboardEventInterface = assign2({}, EventInterface, {
          clipboardData: function(event) {
            return "clipboardData" in event ? event.clipboardData : window.clipboardData;
          }
        });
        createSyntheticEvent(ClipboardEventInterface);
        var CompositionEventInterface = assign2({}, EventInterface, {
          data: 0
        });
        createSyntheticEvent(CompositionEventInterface);
        var normalizeKey = {
          Esc: "Escape",
          Spacebar: " ",
          Left: "ArrowLeft",
          Up: "ArrowUp",
          Right: "ArrowRight",
          Down: "ArrowDown",
          Del: "Delete",
          Win: "OS",
          Menu: "ContextMenu",
          Apps: "ContextMenu",
          Scroll: "ScrollLock",
          MozPrintableKey: "Unidentified"
        };
        var translateToKey = {
          "8": "Backspace",
          "9": "Tab",
          "12": "Clear",
          "13": "Enter",
          "16": "Shift",
          "17": "Control",
          "18": "Alt",
          "19": "Pause",
          "20": "CapsLock",
          "27": "Escape",
          "32": " ",
          "33": "PageUp",
          "34": "PageDown",
          "35": "End",
          "36": "Home",
          "37": "ArrowLeft",
          "38": "ArrowUp",
          "39": "ArrowRight",
          "40": "ArrowDown",
          "45": "Insert",
          "46": "Delete",
          "112": "F1",
          "113": "F2",
          "114": "F3",
          "115": "F4",
          "116": "F5",
          "117": "F6",
          "118": "F7",
          "119": "F8",
          "120": "F9",
          "121": "F10",
          "122": "F11",
          "123": "F12",
          "144": "NumLock",
          "145": "ScrollLock",
          "224": "Meta"
        };
        function getEventKey(nativeEvent) {
          if (nativeEvent.key) {
            var key2 = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if (key2 !== "Unidentified") {
              return key2;
            }
          }
          if (nativeEvent.type === "keypress") {
            var charCode = getEventCharCode(nativeEvent);
            return charCode === 13 ? "Enter" : String.fromCharCode(charCode);
          }
          if (nativeEvent.type === "keydown" || nativeEvent.type === "keyup") {
            return translateToKey[nativeEvent.keyCode] || "Unidentified";
          }
          return "";
        }
        var modifierKeyToProp = {
          Alt: "altKey",
          Control: "ctrlKey",
          Meta: "metaKey",
          Shift: "shiftKey"
        };
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
        var KeyboardEventInterface = assign2({}, UIEventInterface, {
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
          charCode: function(event) {
            if (event.type === "keypress") {
              return getEventCharCode(event);
            }
            return 0;
          },
          keyCode: function(event) {
            if (event.type === "keydown" || event.type === "keyup") {
              return event.keyCode;
            }
            return 0;
          },
          which: function(event) {
            if (event.type === "keypress") {
              return getEventCharCode(event);
            }
            if (event.type === "keydown" || event.type === "keyup") {
              return event.keyCode;
            }
            return 0;
          }
        });
        createSyntheticEvent(KeyboardEventInterface);
        var PointerEventInterface = assign2({}, MouseEventInterface, {
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
        var TouchEventInterface = assign2({}, UIEventInterface, {
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
        var TransitionEventInterface = assign2({}, EventInterface, {
          propertyName: 0,
          elapsedTime: 0,
          pseudoElement: 0
        });
        createSyntheticEvent(TransitionEventInterface);
        var WheelEventInterface = assign2({}, MouseEventInterface, {
          deltaX: function(event) {
            return "deltaX" in event ? event.deltaX : (
              // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
              "wheelDeltaX" in event ? -event.wheelDeltaX : 0
            );
          },
          deltaY: function(event) {
            return "deltaY" in event ? event.deltaY : (
              // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
              "wheelDeltaY" in event ? -event.wheelDeltaY : (
                // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
                "wheelDelta" in event ? -event.wheelDelta : 0
              )
            );
          },
          deltaZ: 0,
          // Browsers without "deltaMode" is reporting in raw wheel delta where one
          // notch on the scroll is always +/- 120, roughly equivalent to pixels.
          // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
          // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
          deltaMode: 0
        });
        createSyntheticEvent(WheelEventInterface);
        var ELEMENT_NODE2 = 1;
        function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          try {
            func.apply(context, funcArgs);
          } catch (error2) {
            this.onError(error2);
          }
        }
        var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;
        {
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
            var fakeNode = document.createElement("react");
            invokeGuardedCallbackImpl = function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
              if (typeof document === "undefined" || document === null) {
                throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
              }
              var evt = document.createEvent("Event");
              var didCall = false;
              var didError = true;
              var windowEvent = window.event;
              var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, "event");
              function restoreAfterDispatch() {
                fakeNode.removeEventListener(evtType, callCallback, false);
                if (typeof window.event !== "undefined" && window.hasOwnProperty("event")) {
                  window.event = windowEvent;
                }
              }
              var funcArgs = Array.prototype.slice.call(arguments, 3);
              function callCallback() {
                didCall = true;
                restoreAfterDispatch();
                func.apply(context, funcArgs);
                didError = false;
              }
              var error2;
              var didSetError = false;
              var isCrossOriginError = false;
              function handleWindowError(event) {
                error2 = event.error;
                didSetError = true;
                if (error2 === null && event.colno === 0 && event.lineno === 0) {
                  isCrossOriginError = true;
                }
                if (event.defaultPrevented) {
                  if (error2 != null && typeof error2 === "object") {
                    try {
                      error2._suppressLogging = true;
                    } catch (inner) {
                    }
                  }
                }
              }
              var evtType = "react-" + (name ? name : "invokeguardedcallback");
              window.addEventListener("error", handleWindowError);
              fakeNode.addEventListener(evtType, callCallback, false);
              evt.initEvent(evtType, false, false);
              fakeNode.dispatchEvent(evt);
              if (windowEventDescriptor) {
                Object.defineProperty(window, "event", windowEventDescriptor);
              }
              if (didCall && didError) {
                if (!didSetError) {
                  error2 = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
                } else if (isCrossOriginError) {
                  error2 = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
                }
                this.onError(error2);
              }
              window.removeEventListener("error", handleWindowError);
              if (!didCall) {
                restoreAfterDispatch();
                return invokeGuardedCallbackProd.apply(this, arguments);
              }
            };
          }
        }
        var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;
        var hasError = false;
        var caughtError = null;
        var hasRethrowError = false;
        var rethrowError = null;
        var reporter = {
          onError: function(error2) {
            hasError = true;
            caughtError = error2;
          }
        };
        function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
          hasError = false;
          caughtError = null;
          invokeGuardedCallbackImpl$1.apply(reporter, arguments);
        }
        function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
          invokeGuardedCallback.apply(this, arguments);
          if (hasError) {
            var error2 = clearCaughtError();
            if (!hasRethrowError) {
              hasRethrowError = true;
              rethrowError = error2;
            }
          }
        }
        function rethrowCaughtError() {
          if (hasRethrowError) {
            var error2 = rethrowError;
            hasRethrowError = false;
            rethrowError = null;
            throw error2;
          }
        }
        function clearCaughtError() {
          if (hasError) {
            var error2 = caughtError;
            hasError = false;
            caughtError = null;
            return error2;
          } else {
            throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray2(a) {
          return isArrayImpl(a);
        }
        var SecretInternals = ReactDOM$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        var EventInternals = SecretInternals.Events;
        var getInstanceFromNode = EventInternals[0];
        var getNodeFromInstance = EventInternals[1];
        var getFiberCurrentPropsFromNode = EventInternals[2];
        var enqueueStateRestore = EventInternals[3];
        var restoreStateIfNeeded = EventInternals[4];
        var reactAct = React$1.unstable_act;
        function Event(suffix) {
        }
        var hasWarnedAboutDeprecatedMockComponent = false;
        function findAllInRenderedFiberTreeInternal(fiber, test2) {
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
              if (test2(publicInst)) {
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
            return;
          }
          if (get(inst)) {
            return;
          }
          var received;
          var stringified = String(inst);
          if (isArray2(inst)) {
            received = "an array";
          } else if (inst && inst.nodeType === ELEMENT_NODE2 && inst.tagName) {
            received = "a DOM node";
          } else if (stringified === "[object Object]") {
            received = "object with keys {" + Object.keys(inst).join(", ") + "}";
          } else {
            received = stringified;
          }
          throw new Error(methodName + "(...): the first argument must be a React class instance. " + ("Instead received: " + received + "."));
        }
        var didWarnAboutReactTestUtilsDeprecation = false;
        function renderIntoDocument(element) {
          {
            if (!didWarnAboutReactTestUtilsDeprecation) {
              didWarnAboutReactTestUtilsDeprecation = true;
              error("ReactDOMTestUtils is deprecated and will be removed in a future major release, because it exposes internal implementation details that are highly likely to change between releases. Upgrade to a modern testing library, such as @testing-library/react. See https://react.dev/warnings/react-dom-test-utils for more info.");
            }
          }
          var div = document.createElement("div");
          return ReactDOM$1.render(element, div);
        }
        function isElement2(element) {
          return React$1.isValidElement(element);
        }
        function isElementOfType(inst, convenienceConstructor) {
          return React$1.isValidElement(inst) && inst.type === convenienceConstructor;
        }
        function isDOMComponent(inst) {
          return !!(inst && inst.nodeType === ELEMENT_NODE2 && inst.tagName);
        }
        function isDOMComponentElement(inst) {
          return !!(inst && React$1.isValidElement(inst) && !!inst.tagName);
        }
        function isCompositeComponent(inst) {
          if (isDOMComponent(inst)) {
            return false;
          }
          return inst != null && typeof inst.render === "function" && typeof inst.setState === "function";
        }
        function isCompositeComponentWithType(inst, type2) {
          if (!isCompositeComponent(inst)) {
            return false;
          }
          var internalInstance = get(inst);
          var constructor = internalInstance.type;
          return constructor === type2;
        }
        function findAllInRenderedTree(inst, test2) {
          validateClassInstance(inst, "findAllInRenderedTree");
          if (!inst) {
            return [];
          }
          var internalInstance = get(inst);
          return findAllInRenderedFiberTreeInternal(internalInstance, test2);
        }
        function scryRenderedDOMComponentsWithClass(root, classNames) {
          validateClassInstance(root, "scryRenderedDOMComponentsWithClass");
          return findAllInRenderedTree(root, function(inst) {
            if (isDOMComponent(inst)) {
              var className = inst.className;
              if (typeof className !== "string") {
                className = inst.getAttribute("class") || "";
              }
              var classList = className.split(/\s+/);
              if (!isArray2(classNames)) {
                if (classNames === void 0) {
                  throw new Error("TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.");
                }
                classNames = classNames.split(/\s+/);
              }
              return classNames.every(function(name) {
                return classList.indexOf(name) !== -1;
              });
            }
            return false;
          });
        }
        function findRenderedDOMComponentWithClass(root, className) {
          validateClassInstance(root, "findRenderedDOMComponentWithClass");
          var all2 = scryRenderedDOMComponentsWithClass(root, className);
          if (all2.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all2.length + ") for class:" + className);
          }
          return all2[0];
        }
        function scryRenderedDOMComponentsWithTag(root, tagName) {
          validateClassInstance(root, "scryRenderedDOMComponentsWithTag");
          return findAllInRenderedTree(root, function(inst) {
            return isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
          });
        }
        function findRenderedDOMComponentWithTag(root, tagName) {
          validateClassInstance(root, "findRenderedDOMComponentWithTag");
          var all2 = scryRenderedDOMComponentsWithTag(root, tagName);
          if (all2.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all2.length + ") for tag:" + tagName);
          }
          return all2[0];
        }
        function scryRenderedComponentsWithType(root, componentType) {
          validateClassInstance(root, "scryRenderedComponentsWithType");
          return findAllInRenderedTree(root, function(inst) {
            return isCompositeComponentWithType(inst, componentType);
          });
        }
        function findRenderedComponentWithType(root, componentType) {
          validateClassInstance(root, "findRenderedComponentWithType");
          var all2 = scryRenderedComponentsWithType(root, componentType);
          if (all2.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all2.length + ") for componentType:" + componentType);
          }
          return all2[0];
        }
        function mockComponent(module2, mockTagName) {
          {
            if (!hasWarnedAboutDeprecatedMockComponent) {
              hasWarnedAboutDeprecatedMockComponent = true;
              warn("ReactTestUtils.mockComponent() is deprecated. Use shallow rendering or jest.mock() instead.\n\nSee https://reactjs.org/link/test-utils-mock-component for more information.");
            }
          }
          mockTagName = mockTagName || module2.mockTagName || "div";
          module2.prototype.render.mockImplementation(function() {
            return React$1.createElement(mockTagName, null, this.props.children);
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
        }
        function executeDispatch(event, listener, inst) {
          var type2 = event.type || "unknown-event";
          event.currentTarget = getNodeFromInstance(inst);
          invokeGuardedCallbackAndCatchFirstError(type2, listener, void 0, event);
          event.currentTarget = null;
        }
        function executeDispatchesInOrder(event) {
          var dispatchListeners = event._dispatchListeners;
          var dispatchInstances = event._dispatchInstances;
          if (isArray2(dispatchListeners)) {
            for (var i2 = 0; i2 < dispatchListeners.length; i2++) {
              if (event.isPropagationStopped()) {
                break;
              }
              executeDispatch(event, dispatchListeners[i2], dispatchInstances[i2]);
            }
          } else if (dispatchListeners) {
            executeDispatch(event, dispatchListeners, dispatchInstances);
          }
          event._dispatchListeners = null;
          event._dispatchInstances = null;
        }
        var executeDispatchesAndRelease = function(event) {
          if (event) {
            executeDispatchesInOrder(event);
            if (!event.isPersistent()) {
              event.constructor.release(event);
            }
          }
        };
        function isInteractive(tag) {
          return tag === "button" || tag === "input" || tag === "select" || tag === "textarea";
        }
        function getParent(inst) {
          do {
            inst = inst.return;
          } while (inst && inst.tag !== HostComponent);
          if (inst) {
            return inst;
          }
          return null;
        }
        function traverseTwoPhase(inst, fn, arg) {
          var path = [];
          while (inst) {
            path.push(inst);
            inst = getParent(inst);
          }
          var i2;
          for (i2 = path.length; i2-- > 0; ) {
            fn(path[i2], "captured", arg);
          }
          for (i2 = 0; i2 < path.length; i2++) {
            fn(path[i2], "bubbled", arg);
          }
        }
        function shouldPreventMouseEvent(name, type2, props) {
          switch (name) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              return !!(props.disabled && isInteractive(type2));
            default:
              return false;
          }
        }
        function getListener(inst, registrationName) {
          var stateNode = inst.stateNode;
          if (!stateNode) {
            return null;
          }
          var props = getFiberCurrentPropsFromNode(stateNode);
          if (!props) {
            return null;
          }
          var listener = props[registrationName];
          if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
            return null;
          }
          if (listener && typeof listener !== "function") {
            throw new Error("Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type.");
          }
          return listener;
        }
        function listenerAtPhase(inst, event, propagationPhase) {
          var registrationName = event._reactName;
          if (propagationPhase === "captured") {
            registrationName += "Capture";
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
              error("Dispatching inst must not be null");
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
        }
        var Simulate = {};
        var directDispatchEventTypes = /* @__PURE__ */ new Set(["mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave"]);
        function makeSimulator(eventType) {
          return function(domNode, eventData) {
            if (React$1.isValidElement(domNode)) {
              throw new Error("TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering.");
            }
            if (isCompositeComponent(domNode)) {
              throw new Error("TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead.");
            }
            var reactName = "on" + eventType[0].toUpperCase() + eventType.slice(1);
            var fakeNativeEvent = new Event();
            fakeNativeEvent.target = domNode;
            fakeNativeEvent.type = eventType.toLowerCase();
            var targetInst = getInstanceFromNode(domNode);
            var event = new SyntheticEvent(reactName, fakeNativeEvent.type, targetInst, fakeNativeEvent, domNode);
            event.persist();
            assign2(event, eventData);
            if (directDispatchEventTypes.has(eventType)) {
              accumulateDirectDispatchesSingle(event);
            } else {
              accumulateTwoPhaseDispatchesSingle(event);
            }
            ReactDOM$1.unstable_batchedUpdates(function() {
              enqueueStateRestore(domNode);
              executeDispatchesAndRelease(event);
              rethrowCaughtError();
            });
            restoreStateIfNeeded();
          };
        }
        var simulatedEventTypes = ["blur", "cancel", "click", "close", "contextMenu", "copy", "cut", "auxClick", "doubleClick", "dragEnd", "dragStart", "drop", "focus", "input", "invalid", "keyDown", "keyPress", "keyUp", "mouseDown", "mouseUp", "paste", "pause", "play", "pointerCancel", "pointerDown", "pointerUp", "rateChange", "reset", "resize", "seeked", "submit", "touchCancel", "touchEnd", "touchStart", "volumeChange", "drag", "dragEnter", "dragExit", "dragLeave", "dragOver", "mouseMove", "mouseOut", "mouseOver", "pointerMove", "pointerOut", "pointerOver", "scroll", "toggle", "touchMove", "wheel", "abort", "animationEnd", "animationIteration", "animationStart", "canPlay", "canPlayThrough", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "playing", "progress", "seeking", "stalled", "suspend", "timeUpdate", "transitionEnd", "waiting", "mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave", "change", "select", "beforeInput", "compositionEnd", "compositionStart", "compositionUpdate"];
        function buildSimulators() {
          simulatedEventTypes.forEach(function(eventType) {
            Simulate[eventType] = makeSimulator(eventType);
          });
        }
        buildSimulators();
        var didWarnAboutUsingAct = false;
        var act2 = function actWithWarning(callback) {
          {
            if (!didWarnAboutUsingAct) {
              didWarnAboutUsingAct = true;
              error("`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.");
            }
          }
          return reactAct(callback);
        };
        reactDomTestUtils_development.Simulate = Simulate;
        reactDomTestUtils_development.act = act2;
        reactDomTestUtils_development.findAllInRenderedTree = findAllInRenderedTree;
        reactDomTestUtils_development.findRenderedComponentWithType = findRenderedComponentWithType;
        reactDomTestUtils_development.findRenderedDOMComponentWithClass = findRenderedDOMComponentWithClass;
        reactDomTestUtils_development.findRenderedDOMComponentWithTag = findRenderedDOMComponentWithTag;
        reactDomTestUtils_development.isCompositeComponent = isCompositeComponent;
        reactDomTestUtils_development.isCompositeComponentWithType = isCompositeComponentWithType;
        reactDomTestUtils_development.isDOMComponent = isDOMComponent;
        reactDomTestUtils_development.isDOMComponentElement = isDOMComponentElement;
        reactDomTestUtils_development.isElement = isElement2;
        reactDomTestUtils_development.isElementOfType = isElementOfType;
        reactDomTestUtils_development.mockComponent = mockComponent;
        reactDomTestUtils_development.nativeTouchData = nativeTouchData;
        reactDomTestUtils_development.renderIntoDocument = renderIntoDocument;
        reactDomTestUtils_development.scryRenderedComponentsWithType = scryRenderedComponentsWithType;
        reactDomTestUtils_development.scryRenderedDOMComponentsWithClass = scryRenderedDOMComponentsWithClass;
        reactDomTestUtils_development.scryRenderedDOMComponentsWithTag = scryRenderedDOMComponentsWithTag;
        reactDomTestUtils_development.traverseTwoPhase = traverseTwoPhase;
      })();
    }
    return reactDomTestUtils_development;
  }
  if (process.env.NODE_ENV === "production") {
    testUtils.exports = requireReactDomTestUtils_production_min();
  } else {
    testUtils.exports = requireReactDomTestUtils_development();
  }
  var testUtilsExports = testUtils.exports;
  var hydrateRoot;
  var createRoot;
  var m = ReactDOM;
  if (process.env.NODE_ENV === "production") {
    createRoot = m.createRoot;
    hydrateRoot = m.hydrateRoot;
  } else {
    var i$2 = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    createRoot = function(c, o) {
      i$2.usingClientEntryPoint = true;
      try {
        return m.createRoot(c, o);
      } finally {
        i$2.usingClientEntryPoint = false;
      }
    };
    hydrateRoot = function(c, h, o) {
      i$2.usingClientEntryPoint = true;
      try {
        return m.hydrateRoot(c, h, o);
      } finally {
        i$2.usingClientEntryPoint = false;
      }
    };
  }
  var build$1 = {};
  var ansiStyles = { exports: {} };
  ansiStyles.exports;
  (function(module2) {
    const ANSI_BACKGROUND_OFFSET = 10;
    const wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
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
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi256 = wrapAnsi256();
      styles.color.ansi16m = wrapAnsi16m();
      styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches2 = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches2) {
              return [0, 0, 0];
            }
            let { colorString } = matches2.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character2) => character2 + character2).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  })(ansiStyles);
  var ansiStylesExports = ansiStyles.exports;
  var collections = {};
  Object.defineProperty(collections, "__esModule", {
    value: true
  });
  collections.printIteratorEntries = printIteratorEntries;
  collections.printIteratorValues = printIteratorValues;
  collections.printListItems = printListItems;
  collections.printObjectProperties = printObjectProperties;
  const getKeysOfEnumerableProperties = (object, compareKeys) => {
    const keys2 = Object.keys(object).sort(compareKeys);
    if (Object.getOwnPropertySymbols) {
      Object.getOwnPropertySymbols(object).forEach((symbol) => {
        if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
          keys2.push(symbol);
        }
      });
    }
    return keys2;
  };
  function printIteratorEntries(iterator, config2, indentation, depth, refs, printer2, separator = ": ") {
    let result = "";
    let current = iterator.next();
    if (!current.done) {
      result += config2.spacingOuter;
      const indentationNext = indentation + config2.indent;
      while (!current.done) {
        const name = printer2(
          current.value[0],
          config2,
          indentationNext,
          depth,
          refs
        );
        const value = printer2(
          current.value[1],
          config2,
          indentationNext,
          depth,
          refs
        );
        result += indentationNext + name + separator + value;
        current = iterator.next();
        if (!current.done) {
          result += "," + config2.spacingInner;
        } else if (!config2.min) {
          result += ",";
        }
      }
      result += config2.spacingOuter + indentation;
    }
    return result;
  }
  function printIteratorValues(iterator, config2, indentation, depth, refs, printer2) {
    let result = "";
    let current = iterator.next();
    if (!current.done) {
      result += config2.spacingOuter;
      const indentationNext = indentation + config2.indent;
      while (!current.done) {
        result += indentationNext + printer2(current.value, config2, indentationNext, depth, refs);
        current = iterator.next();
        if (!current.done) {
          result += "," + config2.spacingInner;
        } else if (!config2.min) {
          result += ",";
        }
      }
      result += config2.spacingOuter + indentation;
    }
    return result;
  }
  function printListItems(list, config2, indentation, depth, refs, printer2) {
    let result = "";
    if (list.length) {
      result += config2.spacingOuter;
      const indentationNext = indentation + config2.indent;
      for (let i2 = 0; i2 < list.length; i2++) {
        result += indentationNext;
        if (i2 in list) {
          result += printer2(list[i2], config2, indentationNext, depth, refs);
        }
        if (i2 < list.length - 1) {
          result += "," + config2.spacingInner;
        } else if (!config2.min) {
          result += ",";
        }
      }
      result += config2.spacingOuter + indentation;
    }
    return result;
  }
  function printObjectProperties(val, config2, indentation, depth, refs, printer2) {
    let result = "";
    const keys2 = getKeysOfEnumerableProperties(val, config2.compareKeys);
    if (keys2.length) {
      result += config2.spacingOuter;
      const indentationNext = indentation + config2.indent;
      for (let i2 = 0; i2 < keys2.length; i2++) {
        const key2 = keys2[i2];
        const name = printer2(key2, config2, indentationNext, depth, refs);
        const value = printer2(val[key2], config2, indentationNext, depth, refs);
        result += indentationNext + name + ": " + value;
        if (i2 < keys2.length - 1) {
          result += "," + config2.spacingInner;
        } else if (!config2.min) {
          result += ",";
        }
      }
      result += config2.spacingOuter + indentation;
    }
    return result;
  }
  var AsymmetricMatcher = {};
  Object.defineProperty(AsymmetricMatcher, "__esModule", {
    value: true
  });
  AsymmetricMatcher.test = AsymmetricMatcher.serialize = AsymmetricMatcher.default = void 0;
  var _collections$3 = collections;
  var global$2 = function() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    } else if (typeof global$2 !== "undefined") {
      return global$2;
    } else if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  }();
  var Symbol$2 = global$2["jest-symbol-do-not-touch"] || global$2.Symbol;
  const asymmetricMatcher = typeof Symbol$2 === "function" && Symbol$2.for ? Symbol$2.for("jest.asymmetricMatcher") : 1267621;
  const SPACE$2 = " ";
  const serialize$6 = (val, config2, indentation, depth, refs, printer2) => {
    const stringedValue = val.toString();
    if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
      if (++depth > config2.maxDepth) {
        return "[" + stringedValue + "]";
      }
      return stringedValue + SPACE$2 + "[" + (0, _collections$3.printListItems)(
        val.sample,
        config2,
        indentation,
        depth,
        refs,
        printer2
      ) + "]";
    }
    if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
      if (++depth > config2.maxDepth) {
        return "[" + stringedValue + "]";
      }
      return stringedValue + SPACE$2 + "{" + (0, _collections$3.printObjectProperties)(
        val.sample,
        config2,
        indentation,
        depth,
        refs,
        printer2
      ) + "}";
    }
    if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
      return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
    }
    if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
      return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
    }
    return val.toAsymmetricMatcher();
  };
  AsymmetricMatcher.serialize = serialize$6;
  const test$7 = (val) => val && val.$$typeof === asymmetricMatcher;
  AsymmetricMatcher.test = test$7;
  const plugin$6 = {
    serialize: serialize$6,
    test: test$7
  };
  var _default$2p = plugin$6;
  AsymmetricMatcher.default = _default$2p;
  var ConvertAnsi = {};
  var ansiRegex = ({ onlyFirst = false } = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? void 0 : "g");
  };
  Object.defineProperty(ConvertAnsi, "__esModule", {
    value: true
  });
  ConvertAnsi.test = ConvertAnsi.serialize = ConvertAnsi.default = void 0;
  var _ansiRegex = _interopRequireDefault$d(ansiRegex);
  var _ansiStyles$1 = _interopRequireDefault$d(ansiStylesExports);
  function _interopRequireDefault$d(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  const toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
    switch (match) {
      case _ansiStyles$1.default.red.close:
      case _ansiStyles$1.default.green.close:
      case _ansiStyles$1.default.cyan.close:
      case _ansiStyles$1.default.gray.close:
      case _ansiStyles$1.default.white.close:
      case _ansiStyles$1.default.yellow.close:
      case _ansiStyles$1.default.bgRed.close:
      case _ansiStyles$1.default.bgGreen.close:
      case _ansiStyles$1.default.bgYellow.close:
      case _ansiStyles$1.default.inverse.close:
      case _ansiStyles$1.default.dim.close:
      case _ansiStyles$1.default.bold.close:
      case _ansiStyles$1.default.reset.open:
      case _ansiStyles$1.default.reset.close:
        return "</>";
      case _ansiStyles$1.default.red.open:
        return "<red>";
      case _ansiStyles$1.default.green.open:
        return "<green>";
      case _ansiStyles$1.default.cyan.open:
        return "<cyan>";
      case _ansiStyles$1.default.gray.open:
        return "<gray>";
      case _ansiStyles$1.default.white.open:
        return "<white>";
      case _ansiStyles$1.default.yellow.open:
        return "<yellow>";
      case _ansiStyles$1.default.bgRed.open:
        return "<bgRed>";
      case _ansiStyles$1.default.bgGreen.open:
        return "<bgGreen>";
      case _ansiStyles$1.default.bgYellow.open:
        return "<bgYellow>";
      case _ansiStyles$1.default.inverse.open:
        return "<inverse>";
      case _ansiStyles$1.default.dim.open:
        return "<dim>";
      case _ansiStyles$1.default.bold.open:
        return "<bold>";
      default:
        return "";
    }
  });
  const test$6 = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
  ConvertAnsi.test = test$6;
  const serialize$5 = (val, config2, indentation, depth, refs, printer2) => printer2(toHumanReadableAnsi(val), config2, indentation, depth, refs);
  ConvertAnsi.serialize = serialize$5;
  const plugin$5 = {
    serialize: serialize$5,
    test: test$6
  };
  var _default$2o = plugin$5;
  ConvertAnsi.default = _default$2o;
  var DOMCollection$1 = {};
  Object.defineProperty(DOMCollection$1, "__esModule", {
    value: true
  });
  DOMCollection$1.test = DOMCollection$1.serialize = DOMCollection$1.default = void 0;
  var _collections$2 = collections;
  const SPACE$1 = " ";
  const OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
  const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
  const testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
  const test$5 = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
  DOMCollection$1.test = test$5;
  const isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
  const serialize$4 = (collection, config2, indentation, depth, refs, printer2) => {
    const name = collection.constructor.name;
    if (++depth > config2.maxDepth) {
      return "[" + name + "]";
    }
    return (config2.min ? "" : name + SPACE$1) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections$2.printObjectProperties)(
      isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
        props[attribute.name] = attribute.value;
        return props;
      }, {}) : { ...collection },
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) + "}" : "[" + (0, _collections$2.printListItems)(
      Array.from(collection),
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) + "]");
  };
  DOMCollection$1.serialize = serialize$4;
  const plugin$4 = {
    serialize: serialize$4,
    test: test$5
  };
  var _default$2n = plugin$4;
  DOMCollection$1.default = _default$2n;
  var DOMElement = {};
  var markup = {};
  var escapeHTML$2 = {};
  Object.defineProperty(escapeHTML$2, "__esModule", {
    value: true
  });
  escapeHTML$2.default = escapeHTML$1;
  function escapeHTML$1(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  Object.defineProperty(markup, "__esModule", {
    value: true
  });
  markup.printText = markup.printProps = markup.printElementAsLeaf = markup.printElement = markup.printComment = markup.printChildren = void 0;
  var _escapeHTML = _interopRequireDefault$c(escapeHTML$2);
  function _interopRequireDefault$c(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  const printProps$1 = (keys2, props, config2, indentation, depth, refs, printer2) => {
    const indentationNext = indentation + config2.indent;
    const colors = config2.colors;
    return keys2.map((key2) => {
      const value = props[key2];
      let printed = printer2(value, config2, indentationNext, depth, refs);
      if (typeof value !== "string") {
        if (printed.indexOf("\n") !== -1) {
          printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
        }
        printed = "{" + printed + "}";
      }
      return config2.spacingInner + indentation + colors.prop.open + key2 + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
    }).join("");
  };
  markup.printProps = printProps$1;
  const printChildren$1 = (children, config2, indentation, depth, refs, printer2) => children.map(
    (child) => config2.spacingOuter + indentation + (typeof child === "string" ? printText$1(child, config2) : printer2(child, config2, indentation, depth, refs))
  ).join("");
  markup.printChildren = printChildren$1;
  const printText$1 = (text, config2) => {
    const contentColor = config2.colors.content;
    return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
  };
  markup.printText = printText$1;
  const printComment$1 = (comment, config2) => {
    const commentColor = config2.colors.comment;
    return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
  };
  markup.printComment = printComment$1;
  const printElement$1 = (type2, printedProps, printedChildren, config2, indentation) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type2 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type2 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
  };
  markup.printElement = printElement$1;
  const printElementAsLeaf$1 = (type2, config2) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type2 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
  };
  markup.printElementAsLeaf = printElementAsLeaf$1;
  Object.defineProperty(DOMElement, "__esModule", {
    value: true
  });
  DOMElement.test = DOMElement.serialize = DOMElement.default = void 0;
  var _markup$2 = markup;
  const ELEMENT_NODE$2 = 1;
  const TEXT_NODE$3 = 3;
  const COMMENT_NODE$2 = 8;
  const FRAGMENT_NODE$1 = 11;
  const ELEMENT_REGEXP$1 = /^((HTML|SVG)\w*)?Element$/;
  const testHasAttribute = (val) => {
    try {
      return typeof val.hasAttribute === "function" && val.hasAttribute("is");
    } catch {
      return false;
    }
  };
  const testNode$1 = (val) => {
    const constructorName = val.constructor.name;
    const { nodeType, tagName } = val;
    const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
    return nodeType === ELEMENT_NODE$2 && (ELEMENT_REGEXP$1.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$3 && constructorName === "Text" || nodeType === COMMENT_NODE$2 && constructorName === "Comment" || nodeType === FRAGMENT_NODE$1 && constructorName === "DocumentFragment";
  };
  const test$4 = (val) => {
    var _val$constructor;
    return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode$1(val);
  };
  DOMElement.test = test$4;
  function nodeIsText$1(node) {
    return node.nodeType === TEXT_NODE$3;
  }
  function nodeIsComment$1(node) {
    return node.nodeType === COMMENT_NODE$2;
  }
  function nodeIsFragment$1(node) {
    return node.nodeType === FRAGMENT_NODE$1;
  }
  const serialize$3 = (node, config2, indentation, depth, refs, printer2) => {
    if (nodeIsText$1(node)) {
      return (0, _markup$2.printText)(node.data, config2);
    }
    if (nodeIsComment$1(node)) {
      return (0, _markup$2.printComment)(node.data, config2);
    }
    const type2 = nodeIsFragment$1(node) ? "DocumentFragment" : node.tagName.toLowerCase();
    if (++depth > config2.maxDepth) {
      return (0, _markup$2.printElementAsLeaf)(type2, config2);
    }
    return (0, _markup$2.printElement)(
      type2,
      (0, _markup$2.printProps)(
        nodeIsFragment$1(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(),
        nodeIsFragment$1(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}),
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer2
      ),
      (0, _markup$2.printChildren)(
        Array.prototype.slice.call(node.childNodes || node.children),
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer2
      ),
      config2,
      indentation
    );
  };
  DOMElement.serialize = serialize$3;
  const plugin$3 = {
    serialize: serialize$3,
    test: test$4
  };
  var _default$2m = plugin$3;
  DOMElement.default = _default$2m;
  var Immutable = {};
  Object.defineProperty(Immutable, "__esModule", {
    value: true
  });
  Immutable.test = Immutable.serialize = Immutable.default = void 0;
  var _collections$1 = collections;
  const IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
  const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
  const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
  const IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
  const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
  const IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
  const IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
  const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
  const IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
  const getImmutableName = (name) => "Immutable." + name;
  const printAsLeaf = (name) => "[" + name + "]";
  const SPACE = " ";
  const LAZY = "…";
  const printImmutableEntries = (val, config2, indentation, depth, refs, printer2, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : getImmutableName(type2) + SPACE + "{" + (0, _collections$1.printIteratorEntries)(
    val.entries(),
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) + "}";
  function getRecordEntries(val) {
    let i2 = 0;
    return {
      next() {
        if (i2 < val._keys.length) {
          const key2 = val._keys[i2++];
          return {
            done: false,
            value: [key2, val.get(key2)]
          };
        }
        return {
          done: true,
          value: void 0
        };
      }
    };
  }
  const printImmutableRecord = (val, config2, indentation, depth, refs, printer2) => {
    const name = getImmutableName(val._name || "Record");
    return ++depth > config2.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections$1.printIteratorEntries)(
      getRecordEntries(val),
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) + "}";
  };
  const printImmutableSeq = (val, config2, indentation, depth, refs, printer2) => {
    const name = getImmutableName("Seq");
    if (++depth > config2.maxDepth) {
      return printAsLeaf(name);
    }
    if (val[IS_KEYED_SENTINEL]) {
      return name + SPACE + "{" + // from Immutable collection of entries or from ECMAScript object
      (val._iter || val._object ? (0, _collections$1.printIteratorEntries)(
        val.entries(),
        config2,
        indentation,
        depth,
        refs,
        printer2
      ) : LAZY) + "}";
    }
    return name + SPACE + "[" + (val._iter || // from Immutable collection of values
    val._array || // from ECMAScript array
    val._collection || // from ECMAScript collection in immutable v4
    val._iterable ? (0, _collections$1.printIteratorValues)(
      val.values(),
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) : LAZY) + "]";
  };
  const printImmutableValues = (val, config2, indentation, depth, refs, printer2, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : getImmutableName(type2) + SPACE + "[" + (0, _collections$1.printIteratorValues)(
    val.values(),
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) + "]";
  const serialize$2 = (val, config2, indentation, depth, refs, printer2) => {
    if (val[IS_MAP_SENTINEL]) {
      return printImmutableEntries(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer2,
        val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
      );
    }
    if (val[IS_LIST_SENTINEL]) {
      return printImmutableValues(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer2,
        "List"
      );
    }
    if (val[IS_SET_SENTINEL]) {
      return printImmutableValues(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer2,
        val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
      );
    }
    if (val[IS_STACK_SENTINEL]) {
      return printImmutableValues(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer2,
        "Stack"
      );
    }
    if (val[IS_SEQ_SENTINEL]) {
      return printImmutableSeq(val, config2, indentation, depth, refs, printer2);
    }
    return printImmutableRecord(val, config2, indentation, depth, refs, printer2);
  };
  Immutable.serialize = serialize$2;
  const test$3 = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
  Immutable.test = test$3;
  const plugin$2 = {
    serialize: serialize$2,
    test: test$3
  };
  var _default$2l = plugin$2;
  Immutable.default = _default$2l;
  var ReactElement = {};
  var reactIs = { exports: {} };
  var reactIs_production_min = {};
  /** @license React v17.0.2
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactIs_production_min;
  function requireReactIs_production_min() {
    if (hasRequiredReactIs_production_min) return reactIs_production_min;
    hasRequiredReactIs_production_min = 1;
    var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g2 = 60109, h = 60110, k2 = 60112, l = 60113, m2 = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
    if ("function" === typeof Symbol && Symbol.for) {
      var x = Symbol.for;
      b = x("react.element");
      c = x("react.portal");
      d = x("react.fragment");
      e = x("react.strict_mode");
      f = x("react.profiler");
      g2 = x("react.provider");
      h = x("react.context");
      k2 = x("react.forward_ref");
      l = x("react.suspense");
      m2 = x("react.suspense_list");
      n = x("react.memo");
      p = x("react.lazy");
      q = x("react.block");
      r = x("react.server.block");
      u = x("react.fundamental");
      v = x("react.debug_trace_mode");
      w = x("react.legacy_hidden");
    }
    function y(a) {
      if ("object" === typeof a && null !== a) {
        var t = a.$$typeof;
        switch (t) {
          case b:
            switch (a = a.type, a) {
              case d:
              case f:
              case e:
              case l:
              case m2:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case h:
                  case k2:
                  case p:
                  case n:
                  case g2:
                    return a;
                  default:
                    return t;
                }
            }
          case c:
            return t;
        }
      }
    }
    var z = g2, A = b, B = k2, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
    reactIs_production_min.ContextConsumer = h;
    reactIs_production_min.ContextProvider = z;
    reactIs_production_min.Element = A;
    reactIs_production_min.ForwardRef = B;
    reactIs_production_min.Fragment = C;
    reactIs_production_min.Lazy = D;
    reactIs_production_min.Memo = E;
    reactIs_production_min.Portal = F;
    reactIs_production_min.Profiler = G;
    reactIs_production_min.StrictMode = H;
    reactIs_production_min.Suspense = I;
    reactIs_production_min.isAsyncMode = function() {
      return false;
    };
    reactIs_production_min.isConcurrentMode = function() {
      return false;
    };
    reactIs_production_min.isContextConsumer = function(a) {
      return y(a) === h;
    };
    reactIs_production_min.isContextProvider = function(a) {
      return y(a) === g2;
    };
    reactIs_production_min.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === b;
    };
    reactIs_production_min.isForwardRef = function(a) {
      return y(a) === k2;
    };
    reactIs_production_min.isFragment = function(a) {
      return y(a) === d;
    };
    reactIs_production_min.isLazy = function(a) {
      return y(a) === p;
    };
    reactIs_production_min.isMemo = function(a) {
      return y(a) === n;
    };
    reactIs_production_min.isPortal = function(a) {
      return y(a) === c;
    };
    reactIs_production_min.isProfiler = function(a) {
      return y(a) === f;
    };
    reactIs_production_min.isStrictMode = function(a) {
      return y(a) === e;
    };
    reactIs_production_min.isSuspense = function(a) {
      return y(a) === l;
    };
    reactIs_production_min.isValidElementType = function(a) {
      return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m2 || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g2 || a.$$typeof === h || a.$$typeof === k2 || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
    };
    reactIs_production_min.typeOf = y;
    return reactIs_production_min;
  }
  var reactIs_development = {};
  /** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactIs_development;
  function requireReactIs_development() {
    if (hasRequiredReactIs_development) return reactIs_development;
    hasRequiredReactIs_development = 1;
    if (process.env.NODE_ENV !== "production") {
      (function() {
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          symbolFor("react.scope");
          symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type2) {
          if (typeof type2 === "string" || typeof type2 === "function") {
            return true;
          }
          if (type2 === REACT_FRAGMENT_TYPE || type2 === REACT_PROFILER_TYPE || type2 === REACT_DEBUG_TRACING_MODE_TYPE || type2 === REACT_STRICT_MODE_TYPE || type2 === REACT_SUSPENSE_TYPE || type2 === REACT_SUSPENSE_LIST_TYPE || type2 === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type2 === "object" && type2 !== null) {
            if (type2.$$typeof === REACT_LAZY_TYPE || type2.$$typeof === REACT_MEMO_TYPE || type2.$$typeof === REACT_PROVIDER_TYPE || type2.$$typeof === REACT_CONTEXT_TYPE || type2.$$typeof === REACT_FORWARD_REF_TYPE || type2.$$typeof === REACT_FUNDAMENTAL_TYPE || type2.$$typeof === REACT_BLOCK_TYPE || type2[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type2 = object.type;
                switch (type2) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type2;
                  default:
                    var $$typeofType = type2 && type2.$$typeof;
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
          return void 0;
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
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
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
        function isElement2(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
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
        reactIs_development.ContextConsumer = ContextConsumer;
        reactIs_development.ContextProvider = ContextProvider;
        reactIs_development.Element = Element;
        reactIs_development.ForwardRef = ForwardRef;
        reactIs_development.Fragment = Fragment;
        reactIs_development.Lazy = Lazy;
        reactIs_development.Memo = Memo;
        reactIs_development.Portal = Portal;
        reactIs_development.Profiler = Profiler;
        reactIs_development.StrictMode = StrictMode;
        reactIs_development.Suspense = Suspense;
        reactIs_development.isAsyncMode = isAsyncMode;
        reactIs_development.isConcurrentMode = isConcurrentMode;
        reactIs_development.isContextConsumer = isContextConsumer;
        reactIs_development.isContextProvider = isContextProvider;
        reactIs_development.isElement = isElement2;
        reactIs_development.isForwardRef = isForwardRef;
        reactIs_development.isFragment = isFragment;
        reactIs_development.isLazy = isLazy;
        reactIs_development.isMemo = isMemo;
        reactIs_development.isPortal = isPortal;
        reactIs_development.isProfiler = isProfiler;
        reactIs_development.isStrictMode = isStrictMode;
        reactIs_development.isSuspense = isSuspense;
        reactIs_development.isValidElementType = isValidElementType;
        reactIs_development.typeOf = typeOf;
      })();
    }
    return reactIs_development;
  }
  if (process.env.NODE_ENV === "production") {
    reactIs.exports = requireReactIs_production_min();
  } else {
    reactIs.exports = requireReactIs_development();
  }
  var reactIsExports = reactIs.exports;
  Object.defineProperty(ReactElement, "__esModule", {
    value: true
  });
  ReactElement.test = ReactElement.serialize = ReactElement.default = void 0;
  var ReactIs = _interopRequireWildcard$2(reactIsExports);
  var _markup$1 = markup;
  function _getRequireWildcardCache$2(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache$2 = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard$2(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache2 = _getRequireWildcardCache$2(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key2 in obj) {
      if (key2 !== "default" && Object.prototype.hasOwnProperty.call(obj, key2)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key2) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key2, desc);
        } else {
          newObj[key2] = obj[key2];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const getChildren = (arg, children = []) => {
    if (Array.isArray(arg)) {
      arg.forEach((item) => {
        getChildren(item, children);
      });
    } else if (arg != null && arg !== false) {
      children.push(arg);
    }
    return children;
  };
  const getType = (element) => {
    const type2 = element.type;
    if (typeof type2 === "string") {
      return type2;
    }
    if (typeof type2 === "function") {
      return type2.displayName || type2.name || "Unknown";
    }
    if (ReactIs.isFragment(element)) {
      return "React.Fragment";
    }
    if (ReactIs.isSuspense(element)) {
      return "React.Suspense";
    }
    if (typeof type2 === "object" && type2 !== null) {
      if (ReactIs.isContextProvider(element)) {
        return "Context.Provider";
      }
      if (ReactIs.isContextConsumer(element)) {
        return "Context.Consumer";
      }
      if (ReactIs.isForwardRef(element)) {
        if (type2.displayName) {
          return type2.displayName;
        }
        const functionName = type2.render.displayName || type2.render.name || "";
        return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
      }
      if (ReactIs.isMemo(element)) {
        const functionName = type2.displayName || type2.type.displayName || type2.type.name || "";
        return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
      }
    }
    return "UNDEFINED";
  };
  const getPropKeys$1 = (element) => {
    const { props } = element;
    return Object.keys(props).filter((key2) => key2 !== "children" && props[key2] !== void 0).sort();
  };
  const serialize$1 = (element, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup$1.printElementAsLeaf)(getType(element), config2) : (0, _markup$1.printElement)(
    getType(element),
    (0, _markup$1.printProps)(
      getPropKeys$1(element),
      element.props,
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ),
    (0, _markup$1.printChildren)(
      getChildren(element.props.children),
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ),
    config2,
    indentation
  );
  ReactElement.serialize = serialize$1;
  const test$2 = (val) => val != null && ReactIs.isElement(val);
  ReactElement.test = test$2;
  const plugin$1 = {
    serialize: serialize$1,
    test: test$2
  };
  var _default$2k = plugin$1;
  ReactElement.default = _default$2k;
  var ReactTestComponent = {};
  Object.defineProperty(ReactTestComponent, "__esModule", {
    value: true
  });
  ReactTestComponent.test = ReactTestComponent.serialize = ReactTestComponent.default = void 0;
  var _markup = markup;
  var global$1 = function() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    } else if (typeof global$1 !== "undefined") {
      return global$1;
    } else if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  }();
  var Symbol$1 = global$1["jest-symbol-do-not-touch"] || global$1.Symbol;
  const testSymbol = typeof Symbol$1 === "function" && Symbol$1.for ? Symbol$1.for("react.test.json") : 245830487;
  const getPropKeys = (object) => {
    const { props } = object;
    return props ? Object.keys(props).filter((key2) => props[key2] !== void 0).sort() : [];
  };
  const serialize = (object, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config2) : (0, _markup.printElement)(
    object.type,
    object.props ? (0, _markup.printProps)(
      getPropKeys(object),
      object.props,
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ) : "",
    object.children ? (0, _markup.printChildren)(
      object.children,
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ) : "",
    config2,
    indentation
  );
  ReactTestComponent.serialize = serialize;
  const test$1 = (val) => val && val.$$typeof === testSymbol;
  ReactTestComponent.test = test$1;
  const plugin = {
    serialize,
    test: test$1
  };
  var _default$2j = plugin;
  ReactTestComponent.default = _default$2j;
  Object.defineProperty(build$1, "__esModule", {
    value: true
  });
  var default_1 = build$1.default = DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = void 0;
  var format_1 = build$1.format = format;
  var plugins_1 = build$1.plugins = void 0;
  var _ansiStyles = _interopRequireDefault$b(ansiStylesExports);
  var _collections = collections;
  var _AsymmetricMatcher = _interopRequireDefault$b(
    AsymmetricMatcher
  );
  var _ConvertAnsi = _interopRequireDefault$b(ConvertAnsi);
  var _DOMCollection = _interopRequireDefault$b(DOMCollection$1);
  var _DOMElement = _interopRequireDefault$b(DOMElement);
  var _Immutable = _interopRequireDefault$b(Immutable);
  var _ReactElement = _interopRequireDefault$b(ReactElement);
  var _ReactTestComponent = _interopRequireDefault$b(
    ReactTestComponent
  );
  function _interopRequireDefault$b(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  const toString$1 = Object.prototype.toString;
  const toISOString = Date.prototype.toISOString;
  const errorToString = Error.prototype.toString;
  const regExpToString = RegExp.prototype.toString;
  const getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
  const isWindow = (val) => typeof window !== "undefined" && val === window;
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
    return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
  }
  function printNumber(val) {
    return Object.is(val, -0) ? "-0" : String(val);
  }
  function printBigInt(val) {
    return String(`${val}n`);
  }
  function printFunction(val, printFunctionName) {
    if (!printFunctionName) {
      return "[Function]";
    }
    return "[Function " + (val.name || "anonymous") + "]";
  }
  function printSymbol(val) {
    return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  }
  function printError(val) {
    return "[" + errorToString.call(val) + "]";
  }
  function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
    if (val === true || val === false) {
      return "" + val;
    }
    if (val === void 0) {
      return "undefined";
    }
    if (val === null) {
      return "null";
    }
    const typeOf = typeof val;
    if (typeOf === "number") {
      return printNumber(val);
    }
    if (typeOf === "bigint") {
      return printBigInt(val);
    }
    if (typeOf === "string") {
      if (escapeString) {
        return '"' + val.replace(/"|\\/g, "\\$&") + '"';
      }
      return '"' + val + '"';
    }
    if (typeOf === "function") {
      return printFunction(val, printFunctionName);
    }
    if (typeOf === "symbol") {
      return printSymbol(val);
    }
    const toStringed = toString$1.call(val);
    if (toStringed === "[object WeakMap]") {
      return "WeakMap {}";
    }
    if (toStringed === "[object WeakSet]") {
      return "WeakSet {}";
    }
    if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
      return printFunction(val, printFunctionName);
    }
    if (toStringed === "[object Symbol]") {
      return printSymbol(val);
    }
    if (toStringed === "[object Date]") {
      return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
    }
    if (toStringed === "[object Error]") {
      return printError(val);
    }
    if (toStringed === "[object RegExp]") {
      if (escapeRegex) {
        return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      return regExpToString.call(val);
    }
    if (val instanceof Error) {
      return printError(val);
    }
    return null;
  }
  function printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON) {
    if (refs.indexOf(val) !== -1) {
      return "[Circular]";
    }
    refs = refs.slice();
    refs.push(val);
    const hitMaxDepth = ++depth > config2.maxDepth;
    const min = config2.min;
    if (config2.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
      return printer(val.toJSON(), config2, indentation, depth, refs, true);
    }
    const toStringed = toString$1.call(val);
    if (toStringed === "[object Arguments]") {
      return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer
      ) + "]";
    }
    if (isToStringedArrayType(toStringed)) {
      return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config2.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer
      ) + "]";
    }
    if (toStringed === "[object Map]") {
      return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(
        val.entries(),
        config2,
        indentation,
        depth,
        refs,
        printer,
        " => "
      ) + "}";
    }
    if (toStringed === "[object Set]") {
      return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(
        val.values(),
        config2,
        indentation,
        depth,
        refs,
        printer
      ) + "}";
    }
    return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config2.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer
    ) + "}";
  }
  function isNewPlugin(plugin2) {
    return plugin2.serialize != null;
  }
  function printPlugin(plugin2, val, config2, indentation, depth, refs) {
    let printed;
    try {
      printed = isNewPlugin(plugin2) ? plugin2.serialize(val, config2, indentation, depth, refs, printer) : plugin2.print(
        val,
        (valChild) => printer(valChild, config2, indentation, depth, refs),
        (str) => {
          const indentationNext = indentation + config2.indent;
          return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
        },
        {
          edgeSpacing: config2.spacingOuter,
          min: config2.min,
          spacing: config2.spacingInner
        },
        config2.colors
      );
    } catch (error) {
      throw new PrettyFormatPluginError(error.message, error.stack);
    }
    if (typeof printed !== "string") {
      throw new Error(
        `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
      );
    }
    return printed;
  }
  function findPlugin(plugins2, val) {
    for (let p = 0; p < plugins2.length; p++) {
      try {
        if (plugins2[p].test(val)) {
          return plugins2[p];
        }
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
    }
    return null;
  }
  function printer(val, config2, indentation, depth, refs, hasCalledToJSON) {
    const plugin2 = findPlugin(config2.plugins, val);
    if (plugin2 !== null) {
      return printPlugin(plugin2, val, config2, indentation, depth, refs);
    }
    const basicResult = printBasicValue(
      val,
      config2.printFunctionName,
      config2.escapeRegex,
      config2.escapeString
    );
    if (basicResult !== null) {
      return basicResult;
    }
    return printComplexValue(
      val,
      config2,
      indentation,
      depth,
      refs,
      hasCalledToJSON
    );
  }
  const DEFAULT_THEME = {
    comment: "gray",
    content: "reset",
    prop: "yellow",
    tag: "cyan",
    value: "green"
  };
  const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
  const DEFAULT_OPTIONS = {
    callToJSON: true,
    compareKeys: void 0,
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
  var DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
  function validateOptions(options) {
    Object.keys(options).forEach((key2) => {
      if (!DEFAULT_OPTIONS.hasOwnProperty(key2)) {
        throw new Error(`pretty-format: Unknown option "${key2}".`);
      }
    });
    if (options.min && options.indent !== void 0 && options.indent !== 0) {
      throw new Error(
        'pretty-format: Options "min" and "indent" cannot be used together.'
      );
    }
    if (options.theme !== void 0) {
      if (options.theme === null) {
        throw new Error('pretty-format: Option "theme" must not be null.');
      }
      if (typeof options.theme !== "object") {
        throw new Error(
          `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
        );
      }
    }
  }
  const getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key2) => {
    const value = options.theme && options.theme[key2] !== void 0 ? options.theme[key2] : DEFAULT_THEME[key2];
    const color = value && _ansiStyles.default[value];
    if (color && typeof color.close === "string" && typeof color.open === "string") {
      colors[key2] = color;
    } else {
      throw new Error(
        `pretty-format: Option "theme" has a key "${key2}" whose value "${value}" is undefined in ansi-styles.`
      );
    }
    return colors;
  }, /* @__PURE__ */ Object.create(null));
  const getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key2) => {
    colors[key2] = {
      close: "",
      open: ""
    };
    return colors;
  }, /* @__PURE__ */ Object.create(null));
  const getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
  const getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
  const getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
  const getConfig$1 = (options) => {
    var _options$printBasicPr;
    return {
      callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
      colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
      compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent: options && options.min ? "" : createIndent(
        options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent
      ),
      maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
      min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
      plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
      printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options && options.min ? " " : "\n",
      spacingOuter: options && options.min ? "" : "\n"
    };
  };
  function createIndent(indent) {
    return new Array(indent + 1).join(" ");
  }
  function format(val, options) {
    if (options) {
      validateOptions(options);
      if (options.plugins) {
        const plugin2 = findPlugin(options.plugins, val);
        if (plugin2 !== null) {
          return printPlugin(plugin2, val, getConfig$1(options), "", 0, []);
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
    return printComplexValue(val, getConfig$1(options), "", 0, []);
  }
  const plugins$2 = {
    AsymmetricMatcher: _AsymmetricMatcher.default,
    ConvertAnsi: _ConvertAnsi.default,
    DOMCollection: _DOMCollection.default,
    DOMElement: _DOMElement.default,
    Immutable: _Immutable.default,
    ReactElement: _ReactElement.default,
    ReactTestComponent: _ReactTestComponent.default
  };
  plugins_1 = build$1.plugins = plugins$2;
  var _default$2i = format;
  default_1 = build$1.default = _default$2i;
  const index$1 = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    get DEFAULT_OPTIONS() {
      return DEFAULT_OPTIONS_1;
    },
    get default() {
      return default_1;
    },
    format: format_1,
    get plugins() {
      return plugins_1;
    }
  }, [build$1]);
  var toStr$a = Object.prototype.toString;
  function isCallable$2(fn) {
    return typeof fn === "function" || toStr$a.call(fn) === "[object Function]";
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
  function arrayFrom(arrayLike, mapFn) {
    var C = Array;
    var items = Object(arrayLike);
    if (arrayLike == null) {
      throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    var len = toLength(items.length);
    var A = isCallable$2(C) ? Object(new C(len)) : new Array(len);
    var k2 = 0;
    var kValue;
    while (k2 < len) {
      kValue = items[k2];
      {
        A[k2] = kValue;
      }
      k2 += 1;
    }
    A.length = len;
    return A;
  }
  function _typeof$2(obj) {
    "@babel/helpers - typeof";
    return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof$2(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty$2(obj, key2, value) {
    key2 = _toPropertyKey$1(key2);
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _toPropertyKey$1(arg) {
    var key2 = _toPrimitive$1(arg, "string");
    return _typeof$2(key2) === "symbol" ? key2 : String(key2);
  }
  function _toPrimitive$1(input, hint) {
    if (_typeof$2(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof$2(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var SetLike = /* @__PURE__ */ function() {
    function SetLike2() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      _classCallCheck(this, SetLike2);
      _defineProperty$2(this, "items", void 0);
      this.items = items;
    }
    _createClass(SetLike2, [{
      key: "add",
      value: function add(value) {
        if (this.has(value) === false) {
          this.items.push(value);
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear2() {
        this.items = [];
      }
    }, {
      key: "delete",
      value: function _delete(value) {
        var previousLength = this.items.length;
        this.items = this.items.filter(function(item) {
          return item !== value;
        });
        return previousLength !== this.items.length;
      }
    }, {
      key: "forEach",
      value: function forEach2(callbackfn) {
        var _this = this;
        this.items.forEach(function(item) {
          callbackfn(item, item, _this);
        });
      }
    }, {
      key: "has",
      value: function has2(value) {
        return this.items.indexOf(value) !== -1;
      }
    }, {
      key: "size",
      get: function get() {
        return this.items.length;
      }
    }]);
    return SetLike2;
  }();
  const SetLike$1 = typeof Set === "undefined" ? Set : SetLike;
  function getLocalName(element) {
    var _element$localName;
    return (
      // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
      (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
        // eslint-disable-next-line no-restricted-properties -- required for the fallback
        element.tagName.toLowerCase()
      )
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
    caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
    insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
  };
  function hasGlobalAriaAttributes(element, role2) {
    return [
      "aria-atomic",
      "aria-busy",
      "aria-controls",
      "aria-current",
      "aria-describedby",
      "aria-details",
      // "disabled",
      "aria-dropeffect",
      // "errormessage",
      "aria-flowto",
      "aria-grabbed",
      // "haspopup",
      "aria-hidden",
      // "invalid",
      "aria-keyshortcuts",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-owns",
      "aria-relevant",
      "aria-roledescription"
    ].some(function(attributeName) {
      var _prohibitedAttributes;
      return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role2]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
    });
  }
  function ignorePresentationalRole(element, implicitRole) {
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
    if (mappedByTag !== void 0) {
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
      case "input": {
        var _ref = element, type2 = _ref.type;
        switch (type2) {
          case "button":
          case "image":
          case "reset":
          case "submit":
            return "button";
          case "checkbox":
          case "radio":
            return type2;
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
    var role2 = element.getAttribute("role");
    if (role2 !== null) {
      var explicitRole = role2.trim().split(" ")[0];
      if (explicitRole.length > 0) {
        return explicitRole;
      }
    }
    return null;
  }
  function isElement$1(node) {
    return node !== null && node.nodeType === node.ELEMENT_NODE;
  }
  function isHTMLTableCaptionElement(node) {
    return isElement$1(node) && getLocalName(node) === "caption";
  }
  function isHTMLInputElement(node) {
    return isElement$1(node) && getLocalName(node) === "input";
  }
  function isHTMLOptGroupElement(node) {
    return isElement$1(node) && getLocalName(node) === "optgroup";
  }
  function isHTMLSelectElement(node) {
    return isElement$1(node) && getLocalName(node) === "select";
  }
  function isHTMLTableElement(node) {
    return isElement$1(node) && getLocalName(node) === "table";
  }
  function isHTMLTextAreaElement(node) {
    return isElement$1(node) && getLocalName(node) === "textarea";
  }
  function safeWindow(node) {
    var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
    if (defaultView === null) {
      throw new TypeError("no window available");
    }
    return defaultView;
  }
  function isHTMLFieldSetElement(node) {
    return isElement$1(node) && getLocalName(node) === "fieldset";
  }
  function isHTMLLegendElement(node) {
    return isElement$1(node) && getLocalName(node) === "legend";
  }
  function isHTMLSlotElement(node) {
    return isElement$1(node) && getLocalName(node) === "slot";
  }
  function isSVGElement(node) {
    return isElement$1(node) && node.ownerSVGElement !== void 0;
  }
  function isSVGSVGElement(node) {
    return isElement$1(node) && getLocalName(node) === "svg";
  }
  function isSVGTitleElement(node) {
    return isSVGElement(node) && getLocalName(node) === "title";
  }
  function queryIdRefs(node, attributeName) {
    if (isElement$1(node) && node.hasAttribute(attributeName)) {
      var ids = node.getAttribute(attributeName).split(" ");
      var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
      return ids.map(function(id) {
        return root.getElementById(id);
      }).filter(
        function(element) {
          return element !== null;
        }
        // TODO: why does this not narrow?
      );
    }
    return [];
  }
  function hasAnyConcreteRoles(node, roles2) {
    if (isElement$1(node)) {
      return roles2.indexOf(getRole(node)) !== -1;
    }
    return false;
  }
  function asFlatString(s) {
    return s.trim().replace(/\s\s+/g, " ");
  }
  function isHidden(node, getComputedStyleImplementation) {
    if (!isElement$1(node)) {
      return false;
    }
    if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
      return true;
    }
    var style = getComputedStyleImplementation(node);
    return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
  }
  function isControl(node) {
    return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
  }
  function hasAbstractRole(node, role2) {
    if (!isElement$1(node)) {
      return false;
    }
    switch (role2) {
      case "range":
        return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
      default:
        throw new TypeError("No knowledge about abstract role '".concat(role2, "'. This is likely a bug :("));
    }
  }
  function querySelectorAllSubtree(element, selectors) {
    var elements = arrayFrom(element.querySelectorAll(selectors));
    queryIdRefs(element, "aria-owns").forEach(function(root) {
      elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
    });
    return elements;
  }
  function querySelectedOptions(listbox) {
    if (isHTMLSelectElement(listbox)) {
      return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
    }
    return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
  }
  function isMarkedPresentational(node) {
    return hasAnyConcreteRoles(node, ["none", "presentation"]);
  }
  function isNativeHostLanguageTextAlternativeElement(node) {
    return isHTMLTableCaptionElement(node);
  }
  function allowsNameFromContent(node) {
    return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
  }
  function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
    return false;
  }
  function getValueOfTextbox(element) {
    if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
      return element.value;
    }
    return element.textContent || "";
  }
  function getTextualContent(declaration) {
    var content = declaration.getPropertyValue("content");
    if (/^["'].*["']$/.test(content)) {
      return content.slice(1, -1);
    }
    return "";
  }
  function isLabelableElement(element) {
    var localName = getLocalName(element);
    return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
  }
  function findLabelableElement(element) {
    if (isLabelableElement(element)) {
      return element;
    }
    var labelableElement = null;
    element.childNodes.forEach(function(childNode) {
      if (labelableElement === null && isElement$1(childNode)) {
        var descendantLabelableElement = findLabelableElement(childNode);
        if (descendantLabelableElement !== null) {
          labelableElement = descendantLabelableElement;
        }
      }
    });
    return labelableElement;
  }
  function getControlOfLabel(label) {
    if (label.control !== void 0) {
      return label.control;
    }
    var htmlFor = label.getAttribute("for");
    if (htmlFor !== null) {
      return label.ownerDocument.getElementById(htmlFor);
    }
    return findLabelableElement(label);
  }
  function getLabels$1(element) {
    var labelsProperty = element.labels;
    if (labelsProperty === null) {
      return labelsProperty;
    }
    if (labelsProperty !== void 0) {
      return arrayFrom(labelsProperty);
    }
    if (!isLabelableElement(element)) {
      return null;
    }
    var document2 = element.ownerDocument;
    return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
      return getControlOfLabel(label) === element;
    });
  }
  function getSlotContents(slot) {
    var assignedNodes = slot.assignedNodes();
    if (assignedNodes.length === 0) {
      return arrayFrom(slot.childNodes);
    }
    return assignedNodes;
  }
  function computeTextAlternative(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var consultedNodes = new SetLike$1();
    var window2 = safeWindow(root);
    var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
    function computeMiscTextAlternative(node, context) {
      var accumulatedText = "";
      if (isElement$1(node) && computedStyleSupportsPseudoElements) {
        var pseudoBefore = getComputedStyle(node, "::before");
        var beforeContent = getTextualContent(pseudoBefore);
        accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
      }
      var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
      childNodes.forEach(function(child) {
        var result = computeTextAlternative2(child, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false,
          recursion: true
        });
        var display = isElement$1(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
        var separator = display !== "inline" ? " " : "";
        accumulatedText += "".concat(separator).concat(result).concat(separator);
      });
      if (isElement$1(node) && computedStyleSupportsPseudoElements) {
        var pseudoAfter = getComputedStyle(node, "::after");
        var afterContent = getTextualContent(pseudoAfter);
        accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
      }
      return accumulatedText.trim();
    }
    function useAttribute(element, attributeName) {
      var attribute = element.getAttributeNode(attributeName);
      if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
        consultedNodes.add(attribute);
        return attribute.value;
      }
      return null;
    }
    function computeTooltipAttributeValue(node) {
      if (!isElement$1(node)) {
        return null;
      }
      return useAttribute(node, "title");
    }
    function computeElementTextAlternative(node) {
      if (!isElement$1(node)) {
        return null;
      }
      if (isHTMLFieldSetElement(node)) {
        consultedNodes.add(node);
        var children = arrayFrom(node.childNodes);
        for (var i2 = 0; i2 < children.length; i2 += 1) {
          var child = children[i2];
          if (isHTMLLegendElement(child)) {
            return computeTextAlternative2(child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isHTMLTableElement(node)) {
        consultedNodes.add(node);
        var _children = arrayFrom(node.childNodes);
        for (var _i = 0; _i < _children.length; _i += 1) {
          var _child = _children[_i];
          if (isHTMLTableCaptionElement(_child)) {
            return computeTextAlternative2(_child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isSVGSVGElement(node)) {
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
        var nameFromValue = useAttribute(node, "value");
        if (nameFromValue !== null) {
          return nameFromValue;
        }
        if (node.type === "submit") {
          return "Submit";
        }
        if (node.type === "reset") {
          return "Reset";
        }
      }
      var labels = getLabels$1(node);
      if (labels !== null && labels.length !== 0) {
        consultedNodes.add(node);
        return arrayFrom(labels).map(function(element) {
          return computeTextAlternative2(element, {
            isEmbeddedInLabel: true,
            isReferenced: false,
            recursion: true
          });
        }).filter(function(label) {
          return label.length > 0;
        }).join(" ");
      }
      if (isHTMLInputElement(node) && node.type === "image") {
        var _nameFromAlt = useAttribute(node, "alt");
        if (_nameFromAlt !== null) {
          return _nameFromAlt;
        }
        var nameFromTitle = useAttribute(node, "title");
        if (nameFromTitle !== null) {
          return nameFromTitle;
        }
        return "Submit Query";
      }
      if (hasAnyConcreteRoles(node, ["button"])) {
        var nameFromSubTree = computeMiscTextAlternative(node, {
          isEmbeddedInLabel: false,
          isReferenced: false
        });
        if (nameFromSubTree !== "") {
          return nameFromSubTree;
        }
      }
      return null;
    }
    function computeTextAlternative2(current, context) {
      if (consultedNodes.has(current)) {
        return "";
      }
      if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
        consultedNodes.add(current);
        return "";
      }
      var labelAttributeNode = isElement$1(current) ? current.getAttributeNode("aria-labelledby") : null;
      var labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
      if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
        consultedNodes.add(labelAttributeNode);
        return labelElements.map(function(element) {
          return computeTextAlternative2(element, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: true,
            // this isn't recursion as specified, otherwise we would skip
            // `aria-label` in
            // <input id="myself" aria-label="foo" aria-labelledby="myself"
            recursion: false
          });
        }).join(" ");
      }
      var skipToStep2E = context.recursion && isControl(current) && compute === "name";
      if (!skipToStep2E) {
        var ariaLabel = (isElement$1(current) && current.getAttribute("aria-label") || "").trim();
        if (ariaLabel !== "" && compute === "name") {
          consultedNodes.add(current);
          return ariaLabel;
        }
        if (!isMarkedPresentational(current)) {
          var elementTextAlternative = computeElementTextAlternative(current);
          if (elementTextAlternative !== null) {
            consultedNodes.add(current);
            return elementTextAlternative;
          }
        }
      }
      if (hasAnyConcreteRoles(current, ["menu"])) {
        consultedNodes.add(current);
        return "";
      }
      if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
        if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
          consultedNodes.add(current);
          var selectedOptions = querySelectedOptions(current);
          if (selectedOptions.length === 0) {
            return isHTMLInputElement(current) ? current.value : "";
          }
          return arrayFrom(selectedOptions).map(function(selectedOption) {
            return computeTextAlternative2(selectedOption, {
              isEmbeddedInLabel: context.isEmbeddedInLabel,
              isReferenced: false,
              recursion: true
            });
          }).join(" ");
        }
        if (hasAbstractRole(current, "range")) {
          consultedNodes.add(current);
          if (current.hasAttribute("aria-valuetext")) {
            return current.getAttribute("aria-valuetext");
          }
          if (current.hasAttribute("aria-valuenow")) {
            return current.getAttribute("aria-valuenow");
          }
          return current.getAttribute("value") || "";
        }
        if (hasAnyConcreteRoles(current, ["textbox"])) {
          consultedNodes.add(current);
          return getValueOfTextbox(current);
        }
      }
      if (allowsNameFromContent(current) || isElement$1(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
        var accumulatedText2F = computeMiscTextAlternative(current, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false
        });
        if (accumulatedText2F !== "") {
          consultedNodes.add(current);
          return accumulatedText2F;
        }
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
      var tooltipAttributeValue = computeTooltipAttributeValue(current);
      if (tooltipAttributeValue !== null) {
        consultedNodes.add(current);
        return tooltipAttributeValue;
      }
      consultedNodes.add(current);
      return "";
    }
    return asFlatString(computeTextAlternative2(root, {
      isEmbeddedInLabel: false,
      // by spec computeAccessibleDescription starts with the referenced elements as roots
      isReferenced: compute === "description",
      recursion: false
    }));
  }
  function _typeof$1(obj) {
    "@babel/helpers - typeof";
    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof$1(obj);
  }
  function ownKeys(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = null != arguments[i2] ? arguments[i2] : {};
      i2 % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
        _defineProperty$1(target, key2, source[key2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
      });
    }
    return target;
  }
  function _defineProperty$1(obj, key2, value) {
    key2 = _toPropertyKey(key2);
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key2 = _toPrimitive(arg, "string");
    return _typeof$1(key2) === "symbol" ? key2 : String(key2);
  }
  function _toPrimitive(input, hint) {
    if (_typeof$1(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof$1(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function computeAccessibleDescription(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var description = queryIdRefs(root, "aria-describedby").map(function(element) {
      return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
        compute: "description"
      }));
    }).join(" ");
    if (description === "") {
      var title = root.getAttribute("title");
      description = title === null ? "" : title;
    }
    return description;
  }
  function prohibitsNaming(node) {
    return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
  }
  function computeAccessibleName(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (prohibitsNaming(root)) {
      return "";
    }
    return computeTextAlternative(root, options);
  }
  var lib = {};
  var ariaPropsMap$1 = {};
  var iterationDecorator$1 = {};
  var iteratorProxy$1 = {};
  Object.defineProperty(iteratorProxy$1, "__esModule", {
    value: true
  });
  iteratorProxy$1.default = void 0;
  function iteratorProxy() {
    var values = this;
    var index2 = 0;
    var iter = {
      "@@iterator": function iterator() {
        return iter;
      },
      next: function next() {
        if (index2 < values.length) {
          var value = values[index2];
          index2 = index2 + 1;
          return {
            done: false,
            value
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
    return iter;
  }
  var _default$2h = iteratorProxy;
  iteratorProxy$1.default = _default$2h;
  Object.defineProperty(iterationDecorator$1, "__esModule", {
    value: true
  });
  iterationDecorator$1.default = iterationDecorator;
  var _iteratorProxy = _interopRequireDefault$a(iteratorProxy$1);
  function _interopRequireDefault$a(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function iterationDecorator(collection, entries) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      Object.defineProperty(collection, Symbol.iterator, {
        value: _iteratorProxy.default.bind(entries)
      });
    }
    return collection;
  }
  Object.defineProperty(ariaPropsMap$1, "__esModule", {
    value: true
  });
  ariaPropsMap$1.default = void 0;
  var _iterationDecorator$4 = _interopRequireDefault$9(iterationDecorator$1);
  function _interopRequireDefault$9(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray$4(arr, i2) {
    return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i2) || _unsupportedIterableToArray$4(arr, i2) || _nonIterableRest$4();
  }
  function _nonIterableRest$4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit$4(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
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
  function _arrayWithHoles$4(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper$4(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
  }
  function _arrayLikeToArray$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var properties = [["aria-activedescendant", {
    "type": "id"
  }], ["aria-atomic", {
    "type": "boolean"
  }], ["aria-autocomplete", {
    "type": "token",
    "values": ["inline", "list", "both", "none"]
  }], ["aria-busy", {
    "type": "boolean"
  }], ["aria-checked", {
    "type": "tristate"
  }], ["aria-colcount", {
    type: "integer"
  }], ["aria-colindex", {
    type: "integer"
  }], ["aria-colspan", {
    type: "integer"
  }], ["aria-controls", {
    "type": "idlist"
  }], ["aria-current", {
    type: "token",
    values: ["page", "step", "location", "date", "time", true, false]
  }], ["aria-describedby", {
    "type": "idlist"
  }], ["aria-details", {
    "type": "id"
  }], ["aria-disabled", {
    "type": "boolean"
  }], ["aria-dropeffect", {
    "type": "tokenlist",
    "values": ["copy", "execute", "link", "move", "none", "popup"]
  }], ["aria-errormessage", {
    "type": "id"
  }], ["aria-expanded", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-flowto", {
    "type": "idlist"
  }], ["aria-grabbed", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-haspopup", {
    "type": "token",
    "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
  }], ["aria-hidden", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-invalid", {
    "type": "token",
    "values": ["grammar", false, "spelling", true]
  }], ["aria-keyshortcuts", {
    type: "string"
  }], ["aria-label", {
    "type": "string"
  }], ["aria-labelledby", {
    "type": "idlist"
  }], ["aria-level", {
    "type": "integer"
  }], ["aria-live", {
    "type": "token",
    "values": ["assertive", "off", "polite"]
  }], ["aria-modal", {
    type: "boolean"
  }], ["aria-multiline", {
    "type": "boolean"
  }], ["aria-multiselectable", {
    "type": "boolean"
  }], ["aria-orientation", {
    "type": "token",
    "values": ["vertical", "undefined", "horizontal"]
  }], ["aria-owns", {
    "type": "idlist"
  }], ["aria-placeholder", {
    type: "string"
  }], ["aria-posinset", {
    "type": "integer"
  }], ["aria-pressed", {
    "type": "tristate"
  }], ["aria-readonly", {
    "type": "boolean"
  }], ["aria-relevant", {
    "type": "tokenlist",
    "values": ["additions", "all", "removals", "text"]
  }], ["aria-required", {
    "type": "boolean"
  }], ["aria-roledescription", {
    type: "string"
  }], ["aria-rowcount", {
    type: "integer"
  }], ["aria-rowindex", {
    type: "integer"
  }], ["aria-rowspan", {
    type: "integer"
  }], ["aria-selected", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-setsize", {
    "type": "integer"
  }], ["aria-sort", {
    "type": "token",
    "values": ["ascending", "descending", "none", "other"]
  }], ["aria-valuemax", {
    "type": "number"
  }], ["aria-valuemin", {
    "type": "number"
  }], ["aria-valuenow", {
    "type": "number"
  }], ["aria-valuetext", {
    "type": "string"
  }]];
  var ariaPropsMap = {
    entries: function entries() {
      return properties;
    },
    forEach: function forEach2(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper$4(properties), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray$4(_step.value, 2), key2 = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, key2, properties);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get(key2) {
      var item = properties.find(function(tuple) {
        return tuple[0] === key2 ? true : false;
      });
      return item && item[1];
    },
    has: function has2(key2) {
      return !!ariaPropsMap.get(key2);
    },
    keys: function keys2() {
      return properties.map(function(_ref) {
        var _ref2 = _slicedToArray$4(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return properties.map(function(_ref3) {
        var _ref4 = _slicedToArray$4(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default$2g = (0, _iterationDecorator$4.default)(ariaPropsMap, ariaPropsMap.entries());
  ariaPropsMap$1.default = _default$2g;
  var domMap$1 = {};
  Object.defineProperty(domMap$1, "__esModule", {
    value: true
  });
  domMap$1.default = void 0;
  var _iterationDecorator$3 = _interopRequireDefault$8(iterationDecorator$1);
  function _interopRequireDefault$8(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray$3(arr, i2) {
    return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i2) || _unsupportedIterableToArray$3(arr, i2) || _nonIterableRest$3();
  }
  function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit$3(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
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
  function _arrayWithHoles$3(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper$3(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
  }
  function _arrayLikeToArray$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var dom$1 = [["a", {
    reserved: false
  }], ["abbr", {
    reserved: false
  }], ["acronym", {
    reserved: false
  }], ["address", {
    reserved: false
  }], ["applet", {
    reserved: false
  }], ["area", {
    reserved: false
  }], ["article", {
    reserved: false
  }], ["aside", {
    reserved: false
  }], ["audio", {
    reserved: false
  }], ["b", {
    reserved: false
  }], ["base", {
    reserved: true
  }], ["bdi", {
    reserved: false
  }], ["bdo", {
    reserved: false
  }], ["big", {
    reserved: false
  }], ["blink", {
    reserved: false
  }], ["blockquote", {
    reserved: false
  }], ["body", {
    reserved: false
  }], ["br", {
    reserved: false
  }], ["button", {
    reserved: false
  }], ["canvas", {
    reserved: false
  }], ["caption", {
    reserved: false
  }], ["center", {
    reserved: false
  }], ["cite", {
    reserved: false
  }], ["code", {
    reserved: false
  }], ["col", {
    reserved: true
  }], ["colgroup", {
    reserved: true
  }], ["content", {
    reserved: false
  }], ["data", {
    reserved: false
  }], ["datalist", {
    reserved: false
  }], ["dd", {
    reserved: false
  }], ["del", {
    reserved: false
  }], ["details", {
    reserved: false
  }], ["dfn", {
    reserved: false
  }], ["dialog", {
    reserved: false
  }], ["dir", {
    reserved: false
  }], ["div", {
    reserved: false
  }], ["dl", {
    reserved: false
  }], ["dt", {
    reserved: false
  }], ["em", {
    reserved: false
  }], ["embed", {
    reserved: false
  }], ["fieldset", {
    reserved: false
  }], ["figcaption", {
    reserved: false
  }], ["figure", {
    reserved: false
  }], ["font", {
    reserved: false
  }], ["footer", {
    reserved: false
  }], ["form", {
    reserved: false
  }], ["frame", {
    reserved: false
  }], ["frameset", {
    reserved: false
  }], ["h1", {
    reserved: false
  }], ["h2", {
    reserved: false
  }], ["h3", {
    reserved: false
  }], ["h4", {
    reserved: false
  }], ["h5", {
    reserved: false
  }], ["h6", {
    reserved: false
  }], ["head", {
    reserved: true
  }], ["header", {
    reserved: false
  }], ["hgroup", {
    reserved: false
  }], ["hr", {
    reserved: false
  }], ["html", {
    reserved: true
  }], ["i", {
    reserved: false
  }], ["iframe", {
    reserved: false
  }], ["img", {
    reserved: false
  }], ["input", {
    reserved: false
  }], ["ins", {
    reserved: false
  }], ["kbd", {
    reserved: false
  }], ["keygen", {
    reserved: false
  }], ["label", {
    reserved: false
  }], ["legend", {
    reserved: false
  }], ["li", {
    reserved: false
  }], ["link", {
    reserved: true
  }], ["main", {
    reserved: false
  }], ["map", {
    reserved: false
  }], ["mark", {
    reserved: false
  }], ["marquee", {
    reserved: false
  }], ["menu", {
    reserved: false
  }], ["menuitem", {
    reserved: false
  }], ["meta", {
    reserved: true
  }], ["meter", {
    reserved: false
  }], ["nav", {
    reserved: false
  }], ["noembed", {
    reserved: true
  }], ["noscript", {
    reserved: true
  }], ["object", {
    reserved: false
  }], ["ol", {
    reserved: false
  }], ["optgroup", {
    reserved: false
  }], ["option", {
    reserved: false
  }], ["output", {
    reserved: false
  }], ["p", {
    reserved: false
  }], ["param", {
    reserved: true
  }], ["picture", {
    reserved: true
  }], ["pre", {
    reserved: false
  }], ["progress", {
    reserved: false
  }], ["q", {
    reserved: false
  }], ["rp", {
    reserved: false
  }], ["rt", {
    reserved: false
  }], ["rtc", {
    reserved: false
  }], ["ruby", {
    reserved: false
  }], ["s", {
    reserved: false
  }], ["samp", {
    reserved: false
  }], ["script", {
    reserved: true
  }], ["section", {
    reserved: false
  }], ["select", {
    reserved: false
  }], ["small", {
    reserved: false
  }], ["source", {
    reserved: true
  }], ["spacer", {
    reserved: false
  }], ["span", {
    reserved: false
  }], ["strike", {
    reserved: false
  }], ["strong", {
    reserved: false
  }], ["style", {
    reserved: true
  }], ["sub", {
    reserved: false
  }], ["summary", {
    reserved: false
  }], ["sup", {
    reserved: false
  }], ["table", {
    reserved: false
  }], ["tbody", {
    reserved: false
  }], ["td", {
    reserved: false
  }], ["textarea", {
    reserved: false
  }], ["tfoot", {
    reserved: false
  }], ["th", {
    reserved: false
  }], ["thead", {
    reserved: false
  }], ["time", {
    reserved: false
  }], ["title", {
    reserved: true
  }], ["tr", {
    reserved: false
  }], ["track", {
    reserved: true
  }], ["tt", {
    reserved: false
  }], ["u", {
    reserved: false
  }], ["ul", {
    reserved: false
  }], ["var", {
    reserved: false
  }], ["video", {
    reserved: false
  }], ["wbr", {
    reserved: false
  }], ["xmp", {
    reserved: false
  }]];
  var domMap = {
    entries: function entries() {
      return dom$1;
    },
    forEach: function forEach2(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper$3(dom$1), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray$3(_step.value, 2), key2 = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, key2, dom$1);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get(key2) {
      var item = dom$1.find(function(tuple) {
        return tuple[0] === key2 ? true : false;
      });
      return item && item[1];
    },
    has: function has2(key2) {
      return !!domMap.get(key2);
    },
    keys: function keys2() {
      return dom$1.map(function(_ref) {
        var _ref2 = _slicedToArray$3(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return dom$1.map(function(_ref3) {
        var _ref4 = _slicedToArray$3(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default$2f = (0, _iterationDecorator$3.default)(domMap, domMap.entries());
  domMap$1.default = _default$2f;
  var rolesMap$1 = {};
  var ariaAbstractRoles$1 = {};
  var commandRole$1 = {};
  Object.defineProperty(commandRole$1, "__esModule", {
    value: true
  });
  commandRole$1.default = void 0;
  var commandRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menuitem"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default$2e = commandRole;
  commandRole$1.default = _default$2e;
  var compositeRole$1 = {};
  Object.defineProperty(compositeRole$1, "__esModule", {
    value: true
  });
  compositeRole$1.default = void 0;
  var compositeRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default$2d = compositeRole;
  compositeRole$1.default = _default$2d;
  var inputRole$1 = {};
  Object.defineProperty(inputRole$1, "__esModule", {
    value: true
  });
  inputRole$1.default = void 0;
  var inputRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null
    },
    relatedConcepts: [{
      concept: {
        name: "input"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default$2c = inputRole;
  inputRole$1.default = _default$2c;
  var landmarkRole$1 = {};
  Object.defineProperty(landmarkRole$1, "__esModule", {
    value: true
  });
  landmarkRole$1.default = void 0;
  var landmarkRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$2b = landmarkRole;
  landmarkRole$1.default = _default$2b;
  var rangeRole$1 = {};
  Object.defineProperty(rangeRole$1, "__esModule", {
    value: true
  });
  rangeRole$1.default = void 0;
  var rangeRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuemax": null,
      "aria-valuemin": null,
      "aria-valuenow": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$2a = rangeRole;
  rangeRole$1.default = _default$2a;
  var roletypeRole$1 = {};
  Object.defineProperty(roletypeRole$1, "__esModule", {
    value: true
  });
  roletypeRole$1.default = void 0;
  var roletypeRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {
      "aria-atomic": null,
      "aria-busy": null,
      "aria-controls": null,
      "aria-current": null,
      "aria-describedby": null,
      "aria-details": null,
      "aria-dropeffect": null,
      "aria-flowto": null,
      "aria-grabbed": null,
      "aria-hidden": null,
      "aria-keyshortcuts": null,
      "aria-label": null,
      "aria-labelledby": null,
      "aria-live": null,
      "aria-owns": null,
      "aria-relevant": null,
      "aria-roledescription": null
    },
    relatedConcepts: [{
      concept: {
        name: "rel"
      },
      module: "HTML"
    }, {
      concept: {
        name: "role"
      },
      module: "XHTML"
    }, {
      concept: {
        name: "type"
      },
      module: "Dublin Core"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: []
  };
  var _default$29 = roletypeRole;
  roletypeRole$1.default = _default$29;
  var sectionRole$1 = {};
  Object.defineProperty(sectionRole$1, "__esModule", {
    value: true
  });
  sectionRole$1.default = void 0;
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
        name: "frontmatter"
      },
      module: "DTB"
    }, {
      concept: {
        name: "level"
      },
      module: "DTB"
    }, {
      concept: {
        name: "level"
      },
      module: "SMIL"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$28 = sectionRole;
  sectionRole$1.default = _default$28;
  var sectionheadRole$1 = {};
  Object.defineProperty(sectionheadRole$1, "__esModule", {
    value: true
  });
  sectionheadRole$1.default = void 0;
  var sectionheadRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$27 = sectionheadRole;
  sectionheadRole$1.default = _default$27;
  var selectRole$1 = {};
  Object.defineProperty(selectRole$1, "__esModule", {
    value: true
  });
  selectRole$1.default = void 0;
  var selectRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
  };
  var _default$26 = selectRole;
  selectRole$1.default = _default$26;
  var structureRole$1 = {};
  Object.defineProperty(structureRole$1, "__esModule", {
    value: true
  });
  structureRole$1.default = void 0;
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
    superClass: [["roletype"]]
  };
  var _default$25 = structureRole;
  structureRole$1.default = _default$25;
  var widgetRole$1 = {};
  Object.defineProperty(widgetRole$1, "__esModule", {
    value: true
  });
  widgetRole$1.default = void 0;
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
    superClass: [["roletype"]]
  };
  var _default$24 = widgetRole;
  widgetRole$1.default = _default$24;
  var windowRole$1 = {};
  Object.defineProperty(windowRole$1, "__esModule", {
    value: true
  });
  windowRole$1.default = void 0;
  var windowRole = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-modal": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]]
  };
  var _default$23 = windowRole;
  windowRole$1.default = _default$23;
  Object.defineProperty(ariaAbstractRoles$1, "__esModule", {
    value: true
  });
  ariaAbstractRoles$1.default = void 0;
  var _commandRole = _interopRequireDefault$7(commandRole$1);
  var _compositeRole = _interopRequireDefault$7(compositeRole$1);
  var _inputRole = _interopRequireDefault$7(inputRole$1);
  var _landmarkRole = _interopRequireDefault$7(landmarkRole$1);
  var _rangeRole = _interopRequireDefault$7(rangeRole$1);
  var _roletypeRole = _interopRequireDefault$7(roletypeRole$1);
  var _sectionRole = _interopRequireDefault$7(sectionRole$1);
  var _sectionheadRole = _interopRequireDefault$7(sectionheadRole$1);
  var _selectRole = _interopRequireDefault$7(selectRole$1);
  var _structureRole = _interopRequireDefault$7(structureRole$1);
  var _widgetRole = _interopRequireDefault$7(widgetRole$1);
  var _windowRole = _interopRequireDefault$7(windowRole$1);
  function _interopRequireDefault$7(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
  var _default$22 = ariaAbstractRoles;
  ariaAbstractRoles$1.default = _default$22;
  var ariaLiteralRoles$1 = {};
  var alertRole$1 = {};
  Object.defineProperty(alertRole$1, "__esModule", {
    value: true
  });
  alertRole$1.default = void 0;
  var alertRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-atomic": "true",
      "aria-live": "assertive"
    },
    relatedConcepts: [{
      concept: {
        name: "alert"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$21 = alertRole;
  alertRole$1.default = _default$21;
  var alertdialogRole$1 = {};
  Object.defineProperty(alertdialogRole$1, "__esModule", {
    value: true
  });
  alertdialogRole$1.default = void 0;
  var alertdialogRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "alert"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
  };
  var _default$20 = alertdialogRole;
  alertdialogRole$1.default = _default$20;
  var applicationRole$1 = {};
  Object.defineProperty(applicationRole$1, "__esModule", {
    value: true
  });
  applicationRole$1.default = void 0;
  var applicationRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "Device Independence Delivery Unit"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$1$ = applicationRole;
  applicationRole$1.default = _default$1$;
  var articleRole$1 = {};
  Object.defineProperty(articleRole$1, "__esModule", {
    value: true
  });
  articleRole$1.default = void 0;
  var articleRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "article"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]]
  };
  var _default$1_ = articleRole;
  articleRole$1.default = _default$1_;
  var bannerRole$1 = {};
  Object.defineProperty(bannerRole$1, "__esModule", {
    value: true
  });
  bannerRole$1.default = void 0;
  var bannerRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        constraints: ["direct descendant of document"],
        name: "header"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1Z = bannerRole;
  bannerRole$1.default = _default$1Z;
  var blockquoteRole$1 = {};
  Object.defineProperty(blockquoteRole$1, "__esModule", {
    value: true
  });
  blockquoteRole$1.default = void 0;
  var blockquoteRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1Y = blockquoteRole;
  blockquoteRole$1.default = _default$1Y;
  var buttonRole$1 = {};
  Object.defineProperty(buttonRole$1, "__esModule", {
    value: true
  });
  buttonRole$1.default = void 0;
  var buttonRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-pressed": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-pressed"
        }, {
          name: "type",
          value: "checkbox"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "aria-expanded",
          value: "false"
        }],
        name: "summary"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "aria-expanded",
          value: "true"
        }],
        constraints: ["direct descendant of details element with the open attribute defined"],
        name: "summary"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "button"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "image"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "reset"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "submit"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "button"
      },
      module: "HTML"
    }, {
      concept: {
        name: "trigger"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default$1X = buttonRole;
  buttonRole$1.default = _default$1X;
  var captionRole$1 = {};
  Object.defineProperty(captionRole$1, "__esModule", {
    value: true
  });
  captionRole$1.default = void 0;
  var captionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: ["figure", "grid", "table"],
    requiredContextRole: ["figure", "grid", "table"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1W = captionRole;
  captionRole$1.default = _default$1W;
  var cellRole$1 = {};
  Object.defineProperty(cellRole$1, "__esModule", {
    value: true
  });
  cellRole$1.default = void 0;
  var cellRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-colspan": null,
      "aria-rowindex": null,
      "aria-rowspan": null
    },
    relatedConcepts: [{
      concept: {
        constraints: ["descendant of table"],
        name: "td"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1V = cellRole;
  cellRole$1.default = _default$1V;
  var checkboxRole$1 = {};
  Object.defineProperty(checkboxRole$1, "__esModule", {
    value: true
  });
  checkboxRole$1.default = void 0;
  var checkboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "checkbox"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "option"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default$1U = checkboxRole;
  checkboxRole$1.default = _default$1U;
  var codeRole$1 = {};
  Object.defineProperty(codeRole$1, "__esModule", {
    value: true
  });
  codeRole$1.default = void 0;
  var codeRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1T = codeRole;
  codeRole$1.default = _default$1T;
  var columnheaderRole$1 = {};
  Object.defineProperty(columnheaderRole$1, "__esModule", {
    value: true
  });
  columnheaderRole$1.default = void 0;
  var columnheaderRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-sort": null
    },
    relatedConcepts: [{
      attributes: [{
        name: "scope",
        value: "col"
      }],
      concept: {
        name: "th"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
  };
  var _default$1S = columnheaderRole;
  columnheaderRole$1.default = _default$1S;
  var comboboxRole$1 = {};
  Object.defineProperty(comboboxRole$1, "__esModule", {
    value: true
  });
  comboboxRole$1.default = void 0;
  var comboboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-expanded": "false",
      "aria-haspopup": "listbox"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "email"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "search"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "tel"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "text"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "multiple"
        }, {
          constraints: ["undefined"],
          name: "size"
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "multiple"
        }, {
          name: "size",
          value: 1
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-controls": null,
      "aria-expanded": "false"
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default$1R = comboboxRole;
  comboboxRole$1.default = _default$1R;
  var complementaryRole$1 = {};
  Object.defineProperty(complementaryRole$1, "__esModule", {
    value: true
  });
  complementaryRole$1.default = void 0;
  var complementaryRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "aside"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1Q = complementaryRole;
  complementaryRole$1.default = _default$1Q;
  var contentinfoRole$1 = {};
  Object.defineProperty(contentinfoRole$1, "__esModule", {
    value: true
  });
  contentinfoRole$1.default = void 0;
  var contentinfoRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        constraints: ["direct descendant of document"],
        name: "footer"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1P = contentinfoRole;
  contentinfoRole$1.default = _default$1P;
  var definitionRole$1 = {};
  Object.defineProperty(definitionRole$1, "__esModule", {
    value: true
  });
  definitionRole$1.default = void 0;
  var definitionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dd"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1O = definitionRole;
  definitionRole$1.default = _default$1O;
  var deletionRole$1 = {};
  Object.defineProperty(deletionRole$1, "__esModule", {
    value: true
  });
  deletionRole$1.default = void 0;
  var deletionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1N = deletionRole;
  deletionRole$1.default = _default$1N;
  var dialogRole$1 = {};
  Object.defineProperty(dialogRole$1, "__esModule", {
    value: true
  });
  dialogRole$1.default = void 0;
  var dialogRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dialog"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "window"]]
  };
  var _default$1M = dialogRole;
  dialogRole$1.default = _default$1M;
  var directoryRole$1 = {};
  Object.defineProperty(directoryRole$1, "__esModule", {
    value: true
  });
  directoryRole$1.default = void 0;
  var directoryRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      module: "DAISY Guide"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]]
  };
  var _default$1L = directoryRole;
  directoryRole$1.default = _default$1L;
  var documentRole$1 = {};
  Object.defineProperty(documentRole$1, "__esModule", {
    value: true
  });
  documentRole$1.default = void 0;
  var documentRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "Device Independence Delivery Unit"
      }
    }, {
      concept: {
        name: "body"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$1K = documentRole;
  documentRole$1.default = _default$1K;
  var emphasisRole$1 = {};
  Object.defineProperty(emphasisRole$1, "__esModule", {
    value: true
  });
  emphasisRole$1.default = void 0;
  var emphasisRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1J = emphasisRole;
  emphasisRole$1.default = _default$1J;
  var feedRole$1 = {};
  Object.defineProperty(feedRole$1, "__esModule", {
    value: true
  });
  feedRole$1.default = void 0;
  var feedRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["article"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]]
  };
  var _default$1I = feedRole;
  feedRole$1.default = _default$1I;
  var figureRole$1 = {};
  Object.defineProperty(figureRole$1, "__esModule", {
    value: true
  });
  figureRole$1.default = void 0;
  var figureRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "figure"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1H = figureRole;
  figureRole$1.default = _default$1H;
  var formRole$1 = {};
  Object.defineProperty(formRole$1, "__esModule", {
    value: true
  });
  formRole$1.default = void 0;
  var formRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-label"
        }],
        name: "form"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-labelledby"
        }],
        name: "form"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "name"
        }],
        name: "form"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1G = formRole;
  formRole$1.default = _default$1G;
  var genericRole$1 = {};
  Object.defineProperty(genericRole$1, "__esModule", {
    value: true
  });
  genericRole$1.default = void 0;
  var genericRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "span"
      },
      module: "HTML"
    }, {
      concept: {
        name: "div"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$1F = genericRole;
  genericRole$1.default = _default$1F;
  var gridRole$1 = {};
  Object.defineProperty(gridRole$1, "__esModule", {
    value: true
  });
  gridRole$1.default = void 0;
  var gridRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-multiselectable": null,
      "aria-readonly": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "role",
          value: "grid"
        }],
        name: "table"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
  };
  var _default$1E = gridRole;
  gridRole$1.default = _default$1E;
  var gridcellRole$1 = {};
  Object.defineProperty(gridcellRole$1, "__esModule", {
    value: true
  });
  gridcellRole$1.default = void 0;
  var gridcellRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-selected": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "role",
          value: "gridcell"
        }],
        name: "td"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
  };
  var _default$1D = gridcellRole;
  gridcellRole$1.default = _default$1D;
  var groupRole$1 = {};
  Object.defineProperty(groupRole$1, "__esModule", {
    value: true
  });
  groupRole$1.default = void 0;
  var groupRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null
    },
    relatedConcepts: [{
      concept: {
        name: "details"
      },
      module: "HTML"
    }, {
      concept: {
        name: "fieldset"
      },
      module: "HTML"
    }, {
      concept: {
        name: "optgroup"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1C = groupRole;
  groupRole$1.default = _default$1C;
  var headingRole$1 = {};
  Object.defineProperty(headingRole$1, "__esModule", {
    value: true
  });
  headingRole$1.default = void 0;
  var headingRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-level": "2"
    },
    relatedConcepts: [{
      concept: {
        name: "h1"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h2"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h3"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h4"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h5"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h6"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-level": "2"
    },
    superClass: [["roletype", "structure", "sectionhead"]]
  };
  var _default$1B = headingRole;
  headingRole$1.default = _default$1B;
  var imgRole$1 = {};
  Object.defineProperty(imgRole$1, "__esModule", {
    value: true
  });
  imgRole$1.default = void 0;
  var imgRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "alt"
        }],
        name: "img"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "alt"
        }],
        name: "img"
      },
      module: "HTML"
    }, {
      concept: {
        name: "imggroup"
      },
      module: "DTB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1A = imgRole;
  imgRole$1.default = _default$1A;
  var insertionRole$1 = {};
  Object.defineProperty(insertionRole$1, "__esModule", {
    value: true
  });
  insertionRole$1.default = void 0;
  var insertionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1z = insertionRole;
  insertionRole$1.default = _default$1z;
  var linkRole$1 = {};
  Object.defineProperty(linkRole$1, "__esModule", {
    value: true
  });
  linkRole$1.default = void 0;
  var linkRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "href"
        }],
        name: "a"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "href"
        }],
        name: "area"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "href"
        }],
        name: "link"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default$1y = linkRole;
  linkRole$1.default = _default$1y;
  var listRole$1 = {};
  Object.defineProperty(listRole$1, "__esModule", {
    value: true
  });
  listRole$1.default = void 0;
  var listRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menu"
      },
      module: "HTML"
    }, {
      concept: {
        name: "ol"
      },
      module: "HTML"
    }, {
      concept: {
        name: "ul"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["listitem"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1x = listRole;
  listRole$1.default = _default$1x;
  var listboxRole$1 = {};
  Object.defineProperty(listboxRole$1, "__esModule", {
    value: true
  });
  listboxRole$1.default = void 0;
  var listboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-orientation": "vertical"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: [">1"],
          name: "size"
        }, {
          name: "multiple"
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: [">1"],
          name: "size"
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "multiple"
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        name: "datalist"
      },
      module: "HTML"
    }, {
      concept: {
        name: "list"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["option", "group"], ["option"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default$1w = listboxRole;
  listboxRole$1.default = _default$1w;
  var listitemRole$1 = {};
  Object.defineProperty(listitemRole$1, "__esModule", {
    value: true
  });
  listitemRole$1.default = void 0;
  var listitemRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-level": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        constraints: ["direct descendant of ol, ul or menu"],
        name: "li"
      },
      module: "HTML"
    }, {
      concept: {
        name: "item"
      },
      module: "XForms"
    }],
    requireContextRole: ["directory", "list"],
    requiredContextRole: ["directory", "list"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1v = listitemRole;
  listitemRole$1.default = _default$1v;
  var logRole$1 = {};
  Object.defineProperty(logRole$1, "__esModule", {
    value: true
  });
  logRole$1.default = void 0;
  var logRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-live": "polite"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1u = logRole;
  logRole$1.default = _default$1u;
  var mainRole$1 = {};
  Object.defineProperty(mainRole$1, "__esModule", {
    value: true
  });
  mainRole$1.default = void 0;
  var mainRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "main"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1t = mainRole;
  mainRole$1.default = _default$1t;
  var marqueeRole$1 = {};
  Object.defineProperty(marqueeRole$1, "__esModule", {
    value: true
  });
  marqueeRole$1.default = void 0;
  var marqueeRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1s = marqueeRole;
  marqueeRole$1.default = _default$1s;
  var mathRole$1 = {};
  Object.defineProperty(mathRole$1, "__esModule", {
    value: true
  });
  mathRole$1.default = void 0;
  var mathRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "math"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1r = mathRole;
  mathRole$1.default = _default$1r;
  var menuRole$1 = {};
  Object.defineProperty(menuRole$1, "__esModule", {
    value: true
  });
  menuRole$1.default = void 0;
  var menuRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "vertical"
    },
    relatedConcepts: [{
      concept: {
        name: "MENU"
      },
      module: "JAPI"
    }, {
      concept: {
        name: "list"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }, {
      concept: {
        name: "sidebar"
      },
      module: "DTB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default$1q = menuRole;
  menuRole$1.default = _default$1q;
  var menubarRole$1 = {};
  Object.defineProperty(menubarRole$1, "__esModule", {
    value: true
  });
  menubarRole$1.default = void 0;
  var menubarRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      concept: {
        name: "toolbar"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
  };
  var _default$1p = menubarRole;
  menubarRole$1.default = _default$1p;
  var menuitemRole$1 = {};
  Object.defineProperty(menuitemRole$1, "__esModule", {
    value: true
  });
  menuitemRole$1.default = void 0;
  var menuitemRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "MENU_ITEM"
      },
      module: "JAPI"
    }, {
      concept: {
        name: "listitem"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "menuitem"
      },
      module: "HTML"
    }, {
      concept: {
        name: "option"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default$1o = menuitemRole;
  menuitemRole$1.default = _default$1o;
  var menuitemcheckboxRole$1 = {};
  Object.defineProperty(menuitemcheckboxRole$1, "__esModule", {
    value: true
  });
  menuitemcheckboxRole$1.default = void 0;
  var menuitemcheckboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menuitem"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
  };
  var _default$1n = menuitemcheckboxRole;
  menuitemcheckboxRole$1.default = _default$1n;
  var menuitemradioRole$1 = {};
  Object.defineProperty(menuitemradioRole$1, "__esModule", {
    value: true
  });
  menuitemradioRole$1.default = void 0;
  var menuitemradioRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menuitem"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
  };
  var _default$1m = menuitemradioRole;
  menuitemradioRole$1.default = _default$1m;
  var meterRole$1 = {};
  Object.defineProperty(meterRole$1, "__esModule", {
    value: true
  });
  meterRole$1.default = void 0;
  var meterRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuetext": null,
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-valuenow": null
    },
    superClass: [["roletype", "structure", "range"]]
  };
  var _default$1l = meterRole;
  meterRole$1.default = _default$1l;
  var navigationRole$1 = {};
  Object.defineProperty(navigationRole$1, "__esModule", {
    value: true
  });
  navigationRole$1.default = void 0;
  var navigationRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "nav"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1k = navigationRole;
  navigationRole$1.default = _default$1k;
  var noneRole$1 = {};
  Object.defineProperty(noneRole$1, "__esModule", {
    value: true
  });
  noneRole$1.default = void 0;
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
  var _default$1j = noneRole;
  noneRole$1.default = _default$1j;
  var noteRole$1 = {};
  Object.defineProperty(noteRole$1, "__esModule", {
    value: true
  });
  noteRole$1.default = void 0;
  var noteRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1i = noteRole;
  noteRole$1.default = _default$1i;
  var optionRole$1 = {};
  Object.defineProperty(optionRole$1, "__esModule", {
    value: true
  });
  optionRole$1.default = void 0;
  var optionRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false"
    },
    relatedConcepts: [{
      concept: {
        name: "item"
      },
      module: "XForms"
    }, {
      concept: {
        name: "listitem"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "option"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-selected": "false"
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default$1h = optionRole;
  optionRole$1.default = _default$1h;
  var paragraphRole$1 = {};
  Object.defineProperty(paragraphRole$1, "__esModule", {
    value: true
  });
  paragraphRole$1.default = void 0;
  var paragraphRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$1g = paragraphRole;
  paragraphRole$1.default = _default$1g;
  var presentationRole$1 = {};
  Object.defineProperty(presentationRole$1, "__esModule", {
    value: true
  });
  presentationRole$1.default = void 0;
  var presentationRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$1f = presentationRole;
  presentationRole$1.default = _default$1f;
  var progressbarRole$1 = {};
  Object.defineProperty(progressbarRole$1, "__esModule", {
    value: true
  });
  progressbarRole$1.default = void 0;
  var progressbarRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuetext": null
    },
    relatedConcepts: [{
      concept: {
        name: "progress"
      },
      module: "HTML"
    }, {
      concept: {
        name: "status"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
  };
  var _default$1e = progressbarRole;
  progressbarRole$1.default = _default$1e;
  var radioRole$1 = {};
  Object.defineProperty(radioRole$1, "__esModule", {
    value: true
  });
  radioRole$1.default = void 0;
  var radioRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "radio"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default$1d = radioRole;
  radioRole$1.default = _default$1d;
  var radiogroupRole$1 = {};
  Object.defineProperty(radiogroupRole$1, "__esModule", {
    value: true
  });
  radiogroupRole$1.default = void 0;
  var radiogroupRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        name: "list"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["radio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default$1c = radiogroupRole;
  radiogroupRole$1.default = _default$1c;
  var regionRole$1 = {};
  Object.defineProperty(regionRole$1, "__esModule", {
    value: true
  });
  regionRole$1.default = void 0;
  var regionRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-label"
        }],
        name: "section"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-labelledby"
        }],
        name: "section"
      },
      module: "HTML"
    }, {
      concept: {
        name: "Device Independence Glossart perceivable unit"
      }
    }, {
      concept: {
        name: "frame"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$1b = regionRole;
  regionRole$1.default = _default$1b;
  var rowRole$1 = {};
  Object.defineProperty(rowRole$1, "__esModule", {
    value: true
  });
  rowRole$1.default = void 0;
  var rowRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-expanded": null,
      "aria-level": null,
      "aria-posinset": null,
      "aria-rowindex": null,
      "aria-selected": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "tr"
      },
      module: "HTML"
    }],
    requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
  };
  var _default$1a = rowRole;
  rowRole$1.default = _default$1a;
  var rowgroupRole$1 = {};
  Object.defineProperty(rowgroupRole$1, "__esModule", {
    value: true
  });
  rowgroupRole$1.default = void 0;
  var rowgroupRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "tbody"
      },
      module: "HTML"
    }, {
      concept: {
        name: "tfoot"
      },
      module: "HTML"
    }, {
      concept: {
        name: "thead"
      },
      module: "HTML"
    }],
    requireContextRole: ["grid", "table", "treegrid"],
    requiredContextRole: ["grid", "table", "treegrid"],
    requiredOwnedElements: [["row"]],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$19 = rowgroupRole;
  rowgroupRole$1.default = _default$19;
  var rowheaderRole$1 = {};
  Object.defineProperty(rowheaderRole$1, "__esModule", {
    value: true
  });
  rowheaderRole$1.default = void 0;
  var rowheaderRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-sort": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "scope",
          value: "row"
        }],
        name: "th"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "scope",
          value: "rowgroup"
        }],
        name: "th"
      },
      module: "HTML"
    }],
    requireContextRole: ["row", "rowgroup"],
    requiredContextRole: ["row", "rowgroup"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
  };
  var _default$18 = rowheaderRole;
  rowheaderRole$1.default = _default$18;
  var scrollbarRole$1 = {};
  Object.defineProperty(scrollbarRole$1, "__esModule", {
    value: true
  });
  scrollbarRole$1.default = void 0;
  var scrollbarRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-valuetext": null,
      "aria-orientation": "vertical",
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-controls": null,
      "aria-valuenow": null
    },
    superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
  };
  var _default$17 = scrollbarRole;
  scrollbarRole$1.default = _default$17;
  var searchRole$1 = {};
  Object.defineProperty(searchRole$1, "__esModule", {
    value: true
  });
  searchRole$1.default = void 0;
  var searchRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$16 = searchRole;
  searchRole$1.default = _default$16;
  var searchboxRole$1 = {};
  Object.defineProperty(searchboxRole$1, "__esModule", {
    value: true
  });
  searchboxRole$1.default = void 0;
  var searchboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "search"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input", "textbox"]]
  };
  var _default$15 = searchboxRole;
  searchboxRole$1.default = _default$15;
  var separatorRole$1 = {};
  Object.defineProperty(separatorRole$1, "__esModule", {
    value: true
  });
  separatorRole$1.default = void 0;
  var separatorRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
      "aria-valuenow": null,
      "aria-valuetext": null
    },
    relatedConcepts: [{
      concept: {
        name: "hr"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default$14 = separatorRole;
  separatorRole$1.default = _default$14;
  var sliderRole$1 = {};
  Object.defineProperty(sliderRole$1, "__esModule", {
    value: true
  });
  sliderRole$1.default = void 0;
  var sliderRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-valuetext": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "range"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-valuenow": null
    },
    superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
  };
  var _default$13 = sliderRole;
  sliderRole$1.default = _default$13;
  var spinbuttonRole$1 = {};
  Object.defineProperty(spinbuttonRole$1, "__esModule", {
    value: true
  });
  spinbuttonRole$1.default = void 0;
  var spinbuttonRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-valuetext": null,
      "aria-valuenow": "0"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "number"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
  };
  var _default$12 = spinbuttonRole;
  spinbuttonRole$1.default = _default$12;
  var statusRole$1 = {};
  Object.defineProperty(statusRole$1, "__esModule", {
    value: true
  });
  statusRole$1.default = void 0;
  var statusRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-atomic": "true",
      "aria-live": "polite"
    },
    relatedConcepts: [{
      concept: {
        name: "output"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$11 = statusRole;
  statusRole$1.default = _default$11;
  var strongRole$1 = {};
  Object.defineProperty(strongRole$1, "__esModule", {
    value: true
  });
  strongRole$1.default = void 0;
  var strongRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$10 = strongRole;
  strongRole$1.default = _default$10;
  var subscriptRole$1 = {};
  Object.defineProperty(subscriptRole$1, "__esModule", {
    value: true
  });
  subscriptRole$1.default = void 0;
  var subscriptRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$$ = subscriptRole;
  subscriptRole$1.default = _default$$;
  var superscriptRole$1 = {};
  Object.defineProperty(superscriptRole$1, "__esModule", {
    value: true
  });
  superscriptRole$1.default = void 0;
  var superscriptRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$_ = superscriptRole;
  superscriptRole$1.default = _default$_;
  var switchRole$1 = {};
  Object.defineProperty(switchRole$1, "__esModule", {
    value: true
  });
  switchRole$1.default = void 0;
  var switchRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "button"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox"]]
  };
  var _default$Z = switchRole;
  switchRole$1.default = _default$Z;
  var tabRole$1 = {};
  Object.defineProperty(tabRole$1, "__esModule", {
    value: true
  });
  tabRole$1.default = void 0;
  var tabRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false"
    },
    relatedConcepts: [],
    requireContextRole: ["tablist"],
    requiredContextRole: ["tablist"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
  };
  var _default$Y = tabRole;
  tabRole$1.default = _default$Y;
  var tableRole$1 = {};
  Object.defineProperty(tableRole$1, "__esModule", {
    value: true
  });
  tableRole$1.default = void 0;
  var tableRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-colcount": null,
      "aria-rowcount": null
    },
    relatedConcepts: [{
      concept: {
        name: "table"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$X = tableRole;
  tableRole$1.default = _default$X;
  var tablistRole$1 = {};
  Object.defineProperty(tablistRole$1, "__esModule", {
    value: true
  });
  tablistRole$1.default = void 0;
  var tablistRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-level": null,
      "aria-multiselectable": null,
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      module: "DAISY",
      concept: {
        name: "guide"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["tab"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"]]
  };
  var _default$W = tablistRole;
  tablistRole$1.default = _default$W;
  var tabpanelRole$1 = {};
  Object.defineProperty(tabpanelRole$1, "__esModule", {
    value: true
  });
  tabpanelRole$1.default = void 0;
  var tabpanelRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$V = tabpanelRole;
  tabpanelRole$1.default = _default$V;
  var termRole$1 = {};
  Object.defineProperty(termRole$1, "__esModule", {
    value: true
  });
  termRole$1.default = void 0;
  var termRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dfn"
      },
      module: "HTML"
    }, {
      concept: {
        name: "dt"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$U = termRole;
  termRole$1.default = _default$U;
  var textboxRole$1 = {};
  Object.defineProperty(textboxRole$1, "__esModule", {
    value: true
  });
  textboxRole$1.default = void 0;
  var textboxRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-multiline": null,
      "aria-placeholder": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "type"
        }, {
          constraints: ["undefined"],
          name: "list"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "email"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "tel"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "text"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "input"
      },
      module: "XForms"
    }, {
      concept: {
        name: "textarea"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input"]]
  };
  var _default$T = textboxRole;
  textboxRole$1.default = _default$T;
  var timeRole$1 = {};
  Object.defineProperty(timeRole$1, "__esModule", {
    value: true
  });
  timeRole$1.default = void 0;
  var timeRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$S = timeRole;
  timeRole$1.default = _default$S;
  var timerRole$1 = {};
  Object.defineProperty(timerRole$1, "__esModule", {
    value: true
  });
  timerRole$1.default = void 0;
  var timerRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "status"]]
  };
  var _default$R = timerRole;
  timerRole$1.default = _default$R;
  var toolbarRole$1 = {};
  Object.defineProperty(toolbarRole$1, "__esModule", {
    value: true
  });
  toolbarRole$1.default = void 0;
  var toolbarRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      concept: {
        name: "menubar"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]]
  };
  var _default$Q = toolbarRole;
  toolbarRole$1.default = _default$Q;
  var tooltipRole$1 = {};
  Object.defineProperty(tooltipRole$1, "__esModule", {
    value: true
  });
  tooltipRole$1.default = void 0;
  var tooltipRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$P = tooltipRole;
  tooltipRole$1.default = _default$P;
  var treeRole$1 = {};
  Object.defineProperty(treeRole$1, "__esModule", {
    value: true
  });
  treeRole$1.default = void 0;
  var treeRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-required": null,
      "aria-orientation": "vertical"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default$O = treeRole;
  treeRole$1.default = _default$O;
  var treegridRole$1 = {};
  Object.defineProperty(treegridRole$1, "__esModule", {
    value: true
  });
  treegridRole$1.default = void 0;
  var treegridRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
  };
  var _default$N = treegridRole;
  treegridRole$1.default = _default$N;
  var treeitemRole$1 = {};
  Object.defineProperty(treeitemRole$1, "__esModule", {
    value: true
  });
  treeitemRole$1.default = void 0;
  var treeitemRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-expanded": null,
      "aria-haspopup": null
    },
    relatedConcepts: [],
    requireContextRole: ["group", "tree"],
    requiredContextRole: ["group", "tree"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-selected": null
    },
    superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
  };
  var _default$M = treeitemRole;
  treeitemRole$1.default = _default$M;
  Object.defineProperty(ariaLiteralRoles$1, "__esModule", {
    value: true
  });
  ariaLiteralRoles$1.default = void 0;
  var _alertRole = _interopRequireDefault$6(alertRole$1);
  var _alertdialogRole = _interopRequireDefault$6(alertdialogRole$1);
  var _applicationRole = _interopRequireDefault$6(applicationRole$1);
  var _articleRole = _interopRequireDefault$6(articleRole$1);
  var _bannerRole = _interopRequireDefault$6(bannerRole$1);
  var _blockquoteRole = _interopRequireDefault$6(blockquoteRole$1);
  var _buttonRole = _interopRequireDefault$6(buttonRole$1);
  var _captionRole = _interopRequireDefault$6(captionRole$1);
  var _cellRole = _interopRequireDefault$6(cellRole$1);
  var _checkboxRole = _interopRequireDefault$6(checkboxRole$1);
  var _codeRole = _interopRequireDefault$6(codeRole$1);
  var _columnheaderRole = _interopRequireDefault$6(columnheaderRole$1);
  var _comboboxRole = _interopRequireDefault$6(comboboxRole$1);
  var _complementaryRole = _interopRequireDefault$6(complementaryRole$1);
  var _contentinfoRole = _interopRequireDefault$6(contentinfoRole$1);
  var _definitionRole = _interopRequireDefault$6(definitionRole$1);
  var _deletionRole = _interopRequireDefault$6(deletionRole$1);
  var _dialogRole = _interopRequireDefault$6(dialogRole$1);
  var _directoryRole = _interopRequireDefault$6(directoryRole$1);
  var _documentRole = _interopRequireDefault$6(documentRole$1);
  var _emphasisRole = _interopRequireDefault$6(emphasisRole$1);
  var _feedRole = _interopRequireDefault$6(feedRole$1);
  var _figureRole = _interopRequireDefault$6(figureRole$1);
  var _formRole = _interopRequireDefault$6(formRole$1);
  var _genericRole = _interopRequireDefault$6(genericRole$1);
  var _gridRole = _interopRequireDefault$6(gridRole$1);
  var _gridcellRole = _interopRequireDefault$6(gridcellRole$1);
  var _groupRole = _interopRequireDefault$6(groupRole$1);
  var _headingRole = _interopRequireDefault$6(headingRole$1);
  var _imgRole = _interopRequireDefault$6(imgRole$1);
  var _insertionRole = _interopRequireDefault$6(insertionRole$1);
  var _linkRole = _interopRequireDefault$6(linkRole$1);
  var _listRole = _interopRequireDefault$6(listRole$1);
  var _listboxRole = _interopRequireDefault$6(listboxRole$1);
  var _listitemRole = _interopRequireDefault$6(listitemRole$1);
  var _logRole = _interopRequireDefault$6(logRole$1);
  var _mainRole = _interopRequireDefault$6(mainRole$1);
  var _marqueeRole = _interopRequireDefault$6(marqueeRole$1);
  var _mathRole = _interopRequireDefault$6(mathRole$1);
  var _menuRole = _interopRequireDefault$6(menuRole$1);
  var _menubarRole = _interopRequireDefault$6(menubarRole$1);
  var _menuitemRole = _interopRequireDefault$6(menuitemRole$1);
  var _menuitemcheckboxRole = _interopRequireDefault$6(menuitemcheckboxRole$1);
  var _menuitemradioRole = _interopRequireDefault$6(menuitemradioRole$1);
  var _meterRole = _interopRequireDefault$6(meterRole$1);
  var _navigationRole = _interopRequireDefault$6(navigationRole$1);
  var _noneRole = _interopRequireDefault$6(noneRole$1);
  var _noteRole = _interopRequireDefault$6(noteRole$1);
  var _optionRole = _interopRequireDefault$6(optionRole$1);
  var _paragraphRole = _interopRequireDefault$6(paragraphRole$1);
  var _presentationRole = _interopRequireDefault$6(presentationRole$1);
  var _progressbarRole = _interopRequireDefault$6(progressbarRole$1);
  var _radioRole = _interopRequireDefault$6(radioRole$1);
  var _radiogroupRole = _interopRequireDefault$6(radiogroupRole$1);
  var _regionRole = _interopRequireDefault$6(regionRole$1);
  var _rowRole = _interopRequireDefault$6(rowRole$1);
  var _rowgroupRole = _interopRequireDefault$6(rowgroupRole$1);
  var _rowheaderRole = _interopRequireDefault$6(rowheaderRole$1);
  var _scrollbarRole = _interopRequireDefault$6(scrollbarRole$1);
  var _searchRole = _interopRequireDefault$6(searchRole$1);
  var _searchboxRole = _interopRequireDefault$6(searchboxRole$1);
  var _separatorRole = _interopRequireDefault$6(separatorRole$1);
  var _sliderRole = _interopRequireDefault$6(sliderRole$1);
  var _spinbuttonRole = _interopRequireDefault$6(spinbuttonRole$1);
  var _statusRole = _interopRequireDefault$6(statusRole$1);
  var _strongRole = _interopRequireDefault$6(strongRole$1);
  var _subscriptRole = _interopRequireDefault$6(subscriptRole$1);
  var _superscriptRole = _interopRequireDefault$6(superscriptRole$1);
  var _switchRole = _interopRequireDefault$6(switchRole$1);
  var _tabRole = _interopRequireDefault$6(tabRole$1);
  var _tableRole = _interopRequireDefault$6(tableRole$1);
  var _tablistRole = _interopRequireDefault$6(tablistRole$1);
  var _tabpanelRole = _interopRequireDefault$6(tabpanelRole$1);
  var _termRole = _interopRequireDefault$6(termRole$1);
  var _textboxRole = _interopRequireDefault$6(textboxRole$1);
  var _timeRole = _interopRequireDefault$6(timeRole$1);
  var _timerRole = _interopRequireDefault$6(timerRole$1);
  var _toolbarRole = _interopRequireDefault$6(toolbarRole$1);
  var _tooltipRole = _interopRequireDefault$6(tooltipRole$1);
  var _treeRole = _interopRequireDefault$6(treeRole$1);
  var _treegridRole = _interopRequireDefault$6(treegridRole$1);
  var _treeitemRole = _interopRequireDefault$6(treeitemRole$1);
  function _interopRequireDefault$6(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
  var _default$L = ariaLiteralRoles;
  ariaLiteralRoles$1.default = _default$L;
  var ariaDpubRoles$1 = {};
  var docAbstractRole$1 = {};
  Object.defineProperty(docAbstractRole$1, "__esModule", {
    value: true
  });
  docAbstractRole$1.default = void 0;
  var docAbstractRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "abstract [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$K = docAbstractRole;
  docAbstractRole$1.default = _default$K;
  var docAcknowledgmentsRole$1 = {};
  Object.defineProperty(docAcknowledgmentsRole$1, "__esModule", {
    value: true
  });
  docAcknowledgmentsRole$1.default = void 0;
  var docAcknowledgmentsRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "acknowledgments [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$J = docAcknowledgmentsRole;
  docAcknowledgmentsRole$1.default = _default$J;
  var docAfterwordRole$1 = {};
  Object.defineProperty(docAfterwordRole$1, "__esModule", {
    value: true
  });
  docAfterwordRole$1.default = void 0;
  var docAfterwordRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "afterword [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$I = docAfterwordRole;
  docAfterwordRole$1.default = _default$I;
  var docAppendixRole$1 = {};
  Object.defineProperty(docAppendixRole$1, "__esModule", {
    value: true
  });
  docAppendixRole$1.default = void 0;
  var docAppendixRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "appendix [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$H = docAppendixRole;
  docAppendixRole$1.default = _default$H;
  var docBacklinkRole$1 = {};
  Object.defineProperty(docBacklinkRole$1, "__esModule", {
    value: true
  });
  docBacklinkRole$1.default = void 0;
  var docBacklinkRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "content"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "referrer [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default$G = docBacklinkRole;
  docBacklinkRole$1.default = _default$G;
  var docBiblioentryRole$1 = {};
  Object.defineProperty(docBiblioentryRole$1, "__esModule", {
    value: true
  });
  docBiblioentryRole$1.default = void 0;
  var docBiblioentryRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "EPUB biblioentry [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: ["doc-bibliography"],
    requiredContextRole: ["doc-bibliography"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]]
  };
  var _default$F = docBiblioentryRole;
  docBiblioentryRole$1.default = _default$F;
  var docBibliographyRole$1 = {};
  Object.defineProperty(docBibliographyRole$1, "__esModule", {
    value: true
  });
  docBibliographyRole$1.default = void 0;
  var docBibliographyRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "bibliography [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-biblioentry"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$E = docBibliographyRole;
  docBibliographyRole$1.default = _default$E;
  var docBibliorefRole$1 = {};
  Object.defineProperty(docBibliorefRole$1, "__esModule", {
    value: true
  });
  docBibliorefRole$1.default = void 0;
  var docBibliorefRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "biblioref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default$D = docBibliorefRole;
  docBibliorefRole$1.default = _default$D;
  var docChapterRole$1 = {};
  Object.defineProperty(docChapterRole$1, "__esModule", {
    value: true
  });
  docChapterRole$1.default = void 0;
  var docChapterRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "chapter [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$C = docChapterRole;
  docChapterRole$1.default = _default$C;
  var docColophonRole$1 = {};
  Object.defineProperty(docColophonRole$1, "__esModule", {
    value: true
  });
  docColophonRole$1.default = void 0;
  var docColophonRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "colophon [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$B = docColophonRole;
  docColophonRole$1.default = _default$B;
  var docConclusionRole$1 = {};
  Object.defineProperty(docConclusionRole$1, "__esModule", {
    value: true
  });
  docConclusionRole$1.default = void 0;
  var docConclusionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "conclusion [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$A = docConclusionRole;
  docConclusionRole$1.default = _default$A;
  var docCoverRole$1 = {};
  Object.defineProperty(docCoverRole$1, "__esModule", {
    value: true
  });
  docCoverRole$1.default = void 0;
  var docCoverRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "cover [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]]
  };
  var _default$z = docCoverRole;
  docCoverRole$1.default = _default$z;
  var docCreditRole$1 = {};
  Object.defineProperty(docCreditRole$1, "__esModule", {
    value: true
  });
  docCreditRole$1.default = void 0;
  var docCreditRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "credit [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$y = docCreditRole;
  docCreditRole$1.default = _default$y;
  var docCreditsRole$1 = {};
  Object.defineProperty(docCreditsRole$1, "__esModule", {
    value: true
  });
  docCreditsRole$1.default = void 0;
  var docCreditsRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "credits [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$x = docCreditsRole;
  docCreditsRole$1.default = _default$x;
  var docDedicationRole$1 = {};
  Object.defineProperty(docDedicationRole$1, "__esModule", {
    value: true
  });
  docDedicationRole$1.default = void 0;
  var docDedicationRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "dedication [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$w = docDedicationRole;
  docDedicationRole$1.default = _default$w;
  var docEndnoteRole$1 = {};
  Object.defineProperty(docEndnoteRole$1, "__esModule", {
    value: true
  });
  docEndnoteRole$1.default = void 0;
  var docEndnoteRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "rearnote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: ["doc-endnotes"],
    requiredContextRole: ["doc-endnotes"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]]
  };
  var _default$v = docEndnoteRole;
  docEndnoteRole$1.default = _default$v;
  var docEndnotesRole$1 = {};
  Object.defineProperty(docEndnotesRole$1, "__esModule", {
    value: true
  });
  docEndnotesRole$1.default = void 0;
  var docEndnotesRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "rearnotes [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-endnote"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$u = docEndnotesRole;
  docEndnotesRole$1.default = _default$u;
  var docEpigraphRole$1 = {};
  Object.defineProperty(docEpigraphRole$1, "__esModule", {
    value: true
  });
  docEpigraphRole$1.default = void 0;
  var docEpigraphRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "epigraph [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$t = docEpigraphRole;
  docEpigraphRole$1.default = _default$t;
  var docEpilogueRole$1 = {};
  Object.defineProperty(docEpilogueRole$1, "__esModule", {
    value: true
  });
  docEpilogueRole$1.default = void 0;
  var docEpilogueRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "epilogue [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$s = docEpilogueRole;
  docEpilogueRole$1.default = _default$s;
  var docErrataRole$1 = {};
  Object.defineProperty(docErrataRole$1, "__esModule", {
    value: true
  });
  docErrataRole$1.default = void 0;
  var docErrataRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "errata [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$r = docErrataRole;
  docErrataRole$1.default = _default$r;
  var docExampleRole$1 = {};
  Object.defineProperty(docExampleRole$1, "__esModule", {
    value: true
  });
  docExampleRole$1.default = void 0;
  var docExampleRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$q = docExampleRole;
  docExampleRole$1.default = _default$q;
  var docFootnoteRole$1 = {};
  Object.defineProperty(docFootnoteRole$1, "__esModule", {
    value: true
  });
  docFootnoteRole$1.default = void 0;
  var docFootnoteRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "footnote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$p = docFootnoteRole;
  docFootnoteRole$1.default = _default$p;
  var docForewordRole$1 = {};
  Object.defineProperty(docForewordRole$1, "__esModule", {
    value: true
  });
  docForewordRole$1.default = void 0;
  var docForewordRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "foreword [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$o = docForewordRole;
  docForewordRole$1.default = _default$o;
  var docGlossaryRole$1 = {};
  Object.defineProperty(docGlossaryRole$1, "__esModule", {
    value: true
  });
  docGlossaryRole$1.default = void 0;
  var docGlossaryRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "glossary [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["definition"], ["term"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$n = docGlossaryRole;
  docGlossaryRole$1.default = _default$n;
  var docGlossrefRole$1 = {};
  Object.defineProperty(docGlossrefRole$1, "__esModule", {
    value: true
  });
  docGlossrefRole$1.default = void 0;
  var docGlossrefRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "glossref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default$m = docGlossrefRole;
  docGlossrefRole$1.default = _default$m;
  var docIndexRole$1 = {};
  Object.defineProperty(docIndexRole$1, "__esModule", {
    value: true
  });
  docIndexRole$1.default = void 0;
  var docIndexRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "index [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default$l = docIndexRole;
  docIndexRole$1.default = _default$l;
  var docIntroductionRole$1 = {};
  Object.defineProperty(docIntroductionRole$1, "__esModule", {
    value: true
  });
  docIntroductionRole$1.default = void 0;
  var docIntroductionRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "introduction [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$k = docIntroductionRole;
  docIntroductionRole$1.default = _default$k;
  var docNoterefRole$1 = {};
  Object.defineProperty(docNoterefRole$1, "__esModule", {
    value: true
  });
  docNoterefRole$1.default = void 0;
  var docNoterefRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "noteref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default$j = docNoterefRole;
  docNoterefRole$1.default = _default$j;
  var docNoticeRole$1 = {};
  Object.defineProperty(docNoticeRole$1, "__esModule", {
    value: true
  });
  docNoticeRole$1.default = void 0;
  var docNoticeRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "notice [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]]
  };
  var _default$i = docNoticeRole;
  docNoticeRole$1.default = _default$i;
  var docPagebreakRole$1 = {};
  Object.defineProperty(docPagebreakRole$1, "__esModule", {
    value: true
  });
  docPagebreakRole$1.default = void 0;
  var docPagebreakRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "pagebreak [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "separator"]]
  };
  var _default$h = docPagebreakRole;
  docPagebreakRole$1.default = _default$h;
  var docPagelistRole$1 = {};
  Object.defineProperty(docPagelistRole$1, "__esModule", {
    value: true
  });
  docPagelistRole$1.default = void 0;
  var docPagelistRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "page-list [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default$g = docPagelistRole;
  docPagelistRole$1.default = _default$g;
  var docPartRole$1 = {};
  Object.defineProperty(docPartRole$1, "__esModule", {
    value: true
  });
  docPartRole$1.default = void 0;
  var docPartRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "part [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$f = docPartRole;
  docPartRole$1.default = _default$f;
  var docPrefaceRole$1 = {};
  Object.defineProperty(docPrefaceRole$1, "__esModule", {
    value: true
  });
  docPrefaceRole$1.default = void 0;
  var docPrefaceRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "preface [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$e = docPrefaceRole;
  docPrefaceRole$1.default = _default$e;
  var docPrologueRole$1 = {};
  Object.defineProperty(docPrologueRole$1, "__esModule", {
    value: true
  });
  docPrologueRole$1.default = void 0;
  var docPrologueRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "prologue [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default$d = docPrologueRole;
  docPrologueRole$1.default = _default$d;
  var docPullquoteRole$1 = {};
  Object.defineProperty(docPullquoteRole$1, "__esModule", {
    value: true
  });
  docPullquoteRole$1.default = void 0;
  var docPullquoteRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "pullquote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["none"]]
  };
  var _default$c = docPullquoteRole;
  docPullquoteRole$1.default = _default$c;
  var docQnaRole$1 = {};
  Object.defineProperty(docQnaRole$1, "__esModule", {
    value: true
  });
  docQnaRole$1.default = void 0;
  var docQnaRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "qna [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default$b = docQnaRole;
  docQnaRole$1.default = _default$b;
  var docSubtitleRole$1 = {};
  Object.defineProperty(docSubtitleRole$1, "__esModule", {
    value: true
  });
  docSubtitleRole$1.default = void 0;
  var docSubtitleRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "subtitle [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "sectionhead"]]
  };
  var _default$a = docSubtitleRole;
  docSubtitleRole$1.default = _default$a;
  var docTipRole$1 = {};
  Object.defineProperty(docTipRole$1, "__esModule", {
    value: true
  });
  docTipRole$1.default = void 0;
  var docTipRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "help [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]]
  };
  var _default$9 = docTipRole;
  docTipRole$1.default = _default$9;
  var docTocRole$1 = {};
  Object.defineProperty(docTocRole$1, "__esModule", {
    value: true
  });
  docTocRole$1.default = void 0;
  var docTocRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "toc [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default$8 = docTocRole;
  docTocRole$1.default = _default$8;
  Object.defineProperty(ariaDpubRoles$1, "__esModule", {
    value: true
  });
  ariaDpubRoles$1.default = void 0;
  var _docAbstractRole = _interopRequireDefault$5(docAbstractRole$1);
  var _docAcknowledgmentsRole = _interopRequireDefault$5(docAcknowledgmentsRole$1);
  var _docAfterwordRole = _interopRequireDefault$5(docAfterwordRole$1);
  var _docAppendixRole = _interopRequireDefault$5(docAppendixRole$1);
  var _docBacklinkRole = _interopRequireDefault$5(docBacklinkRole$1);
  var _docBiblioentryRole = _interopRequireDefault$5(docBiblioentryRole$1);
  var _docBibliographyRole = _interopRequireDefault$5(docBibliographyRole$1);
  var _docBibliorefRole = _interopRequireDefault$5(docBibliorefRole$1);
  var _docChapterRole = _interopRequireDefault$5(docChapterRole$1);
  var _docColophonRole = _interopRequireDefault$5(docColophonRole$1);
  var _docConclusionRole = _interopRequireDefault$5(docConclusionRole$1);
  var _docCoverRole = _interopRequireDefault$5(docCoverRole$1);
  var _docCreditRole = _interopRequireDefault$5(docCreditRole$1);
  var _docCreditsRole = _interopRequireDefault$5(docCreditsRole$1);
  var _docDedicationRole = _interopRequireDefault$5(docDedicationRole$1);
  var _docEndnoteRole = _interopRequireDefault$5(docEndnoteRole$1);
  var _docEndnotesRole = _interopRequireDefault$5(docEndnotesRole$1);
  var _docEpigraphRole = _interopRequireDefault$5(docEpigraphRole$1);
  var _docEpilogueRole = _interopRequireDefault$5(docEpilogueRole$1);
  var _docErrataRole = _interopRequireDefault$5(docErrataRole$1);
  var _docExampleRole = _interopRequireDefault$5(docExampleRole$1);
  var _docFootnoteRole = _interopRequireDefault$5(docFootnoteRole$1);
  var _docForewordRole = _interopRequireDefault$5(docForewordRole$1);
  var _docGlossaryRole = _interopRequireDefault$5(docGlossaryRole$1);
  var _docGlossrefRole = _interopRequireDefault$5(docGlossrefRole$1);
  var _docIndexRole = _interopRequireDefault$5(docIndexRole$1);
  var _docIntroductionRole = _interopRequireDefault$5(docIntroductionRole$1);
  var _docNoterefRole = _interopRequireDefault$5(docNoterefRole$1);
  var _docNoticeRole = _interopRequireDefault$5(docNoticeRole$1);
  var _docPagebreakRole = _interopRequireDefault$5(docPagebreakRole$1);
  var _docPagelistRole = _interopRequireDefault$5(docPagelistRole$1);
  var _docPartRole = _interopRequireDefault$5(docPartRole$1);
  var _docPrefaceRole = _interopRequireDefault$5(docPrefaceRole$1);
  var _docPrologueRole = _interopRequireDefault$5(docPrologueRole$1);
  var _docPullquoteRole = _interopRequireDefault$5(docPullquoteRole$1);
  var _docQnaRole = _interopRequireDefault$5(docQnaRole$1);
  var _docSubtitleRole = _interopRequireDefault$5(docSubtitleRole$1);
  var _docTipRole = _interopRequireDefault$5(docTipRole$1);
  var _docTocRole = _interopRequireDefault$5(docTocRole$1);
  function _interopRequireDefault$5(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
  var _default$7 = ariaDpubRoles;
  ariaDpubRoles$1.default = _default$7;
  var ariaGraphicsRoles$1 = {};
  var graphicsDocumentRole$1 = {};
  Object.defineProperty(graphicsDocumentRole$1, "__esModule", {
    value: true
  });
  graphicsDocumentRole$1.default = void 0;
  var graphicsDocumentRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      module: "GRAPHICS",
      concept: {
        name: "graphics-object"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "img"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "article"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]]
  };
  var _default$6 = graphicsDocumentRole;
  graphicsDocumentRole$1.default = _default$6;
  var graphicsObjectRole$1 = {};
  Object.defineProperty(graphicsObjectRole$1, "__esModule", {
    value: true
  });
  graphicsObjectRole$1.default = void 0;
  var graphicsObjectRole = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      module: "GRAPHICS",
      concept: {
        name: "graphics-document"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "group"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "img"
      }
    }, {
      module: "GRAPHICS",
      concept: {
        name: "graphics-symbol"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]]
  };
  var _default$5 = graphicsObjectRole;
  graphicsObjectRole$1.default = _default$5;
  var graphicsSymbolRole$1 = {};
  Object.defineProperty(graphicsSymbolRole$1, "__esModule", {
    value: true
  });
  graphicsSymbolRole$1.default = void 0;
  var graphicsSymbolRole = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]]
  };
  var _default$4 = graphicsSymbolRole;
  graphicsSymbolRole$1.default = _default$4;
  Object.defineProperty(ariaGraphicsRoles$1, "__esModule", {
    value: true
  });
  ariaGraphicsRoles$1.default = void 0;
  var _graphicsDocumentRole = _interopRequireDefault$4(graphicsDocumentRole$1);
  var _graphicsObjectRole = _interopRequireDefault$4(graphicsObjectRole$1);
  var _graphicsSymbolRole = _interopRequireDefault$4(graphicsSymbolRole$1);
  function _interopRequireDefault$4(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
  var _default$3 = ariaGraphicsRoles;
  ariaGraphicsRoles$1.default = _default$3;
  Object.defineProperty(rolesMap$1, "__esModule", {
    value: true
  });
  rolesMap$1.default = void 0;
  var _ariaAbstractRoles = _interopRequireDefault$3(ariaAbstractRoles$1);
  var _ariaLiteralRoles = _interopRequireDefault$3(ariaLiteralRoles$1);
  var _ariaDpubRoles = _interopRequireDefault$3(ariaDpubRoles$1);
  var _ariaGraphicsRoles = _interopRequireDefault$3(ariaGraphicsRoles$1);
  var _iterationDecorator$2 = _interopRequireDefault$3(iterationDecorator$1);
  function _interopRequireDefault$3(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _defineProperty(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _createForOfIteratorHelper$2(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _slicedToArray$2(arr, i2) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i2) || _unsupportedIterableToArray$2(arr, i2) || _nonIterableRest$2();
  }
  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }
  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit$2(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
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
  function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var roles$1 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
  roles$1.forEach(function(_ref) {
    var _ref2 = _slicedToArray$2(_ref, 2), roleDefinition = _ref2[1];
    var _iterator = _createForOfIteratorHelper$2(roleDefinition.superClass), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var superClassIter = _step.value;
        var _iterator2 = _createForOfIteratorHelper$2(superClassIter), _step2;
        try {
          var _loop2 = function _loop3() {
            var superClassName = _step2.value;
            var superClassRoleTuple = roles$1.find(function(_ref3) {
              var _ref4 = _slicedToArray$2(_ref3, 1), name = _ref4[0];
              return name === superClassName;
            });
            if (superClassRoleTuple) {
              var superClassDefinition = superClassRoleTuple[1];
              for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
                var prop = _Object$keys[_i2];
                if (
                  // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                  !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
                ) {
                  Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
                }
              }
            }
          };
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            _loop2();
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
      return roles$1;
    },
    forEach: function forEach2(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator3 = _createForOfIteratorHelper$2(roles$1), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _step3$value = _slicedToArray$2(_step3.value, 2), key2 = _step3$value[0], values = _step3$value[1];
          fn.call(thisArg, values, key2, roles$1);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    get: function get(key2) {
      var item = roles$1.find(function(tuple) {
        return tuple[0] === key2 ? true : false;
      });
      return item && item[1];
    },
    has: function has2(key2) {
      return !!rolesMap.get(key2);
    },
    keys: function keys2() {
      return roles$1.map(function(_ref5) {
        var _ref6 = _slicedToArray$2(_ref5, 1), key2 = _ref6[0];
        return key2;
      });
    },
    values: function values() {
      return roles$1.map(function(_ref7) {
        var _ref8 = _slicedToArray$2(_ref7, 2), values2 = _ref8[1];
        return values2;
      });
    }
  };
  var _default$2 = (0, _iterationDecorator$2.default)(rolesMap, rolesMap.entries());
  rolesMap$1.default = _default$2;
  var elementRoleMap$1 = {};
  var toStr$9 = Object.prototype.toString;
  var isArguments$3 = function isArguments2(value) {
    var str = toStr$9.call(value);
    var isArgs2 = str === "[object Arguments]";
    if (!isArgs2) {
      isArgs2 = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr$9.call(value.callee) === "[object Function]";
    }
    return isArgs2;
  };
  var implementation$b;
  var hasRequiredImplementation;
  function requireImplementation() {
    if (hasRequiredImplementation) return implementation$b;
    hasRequiredImplementation = 1;
    var keysShim2;
    if (!Object.keys) {
      var has2 = Object.prototype.hasOwnProperty;
      var toStr2 = Object.prototype.toString;
      var isArgs2 = isArguments$3;
      var isEnumerable2 = Object.prototype.propertyIsEnumerable;
      var hasDontEnumBug = !isEnumerable2.call({ toString: null }, "toString");
      var hasProtoEnumBug = isEnumerable2.call(function() {
      }, "prototype");
      var dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      var equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      var excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      var hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k2 in window) {
          try {
            if (!excludedKeys["$" + k2] && has2.call(window, k2) && window[k2] !== null && typeof window[k2] === "object") {
              try {
                equalsConstructorPrototype(window[k2]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      var equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim2 = function keys2(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction2 = toStr2.call(object) === "[object Function]";
        var isArguments2 = isArgs2(object);
        var isString2 = isObject && toStr2.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction2 && !isArguments2) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction2;
        if (isString2 && object.length > 0 && !has2.call(object, 0)) {
          for (var i2 = 0; i2 < object.length; ++i2) {
            theKeys.push(String(i2));
          }
        }
        if (isArguments2 && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has2.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k2 = 0; k2 < dontEnums.length; ++k2) {
            if (!(skipConstructor && dontEnums[k2] === "constructor") && has2.call(object, dontEnums[k2])) {
              theKeys.push(dontEnums[k2]);
            }
          }
        }
        return theKeys;
      };
    }
    implementation$b = keysShim2;
    return implementation$b;
  }
  var slice = Array.prototype.slice;
  var isArgs = isArguments$3;
  var origKeys = Object.keys;
  var keysShim = origKeys ? function keys2(o) {
    return origKeys(o);
  } : requireImplementation();
  var originalKeys = Object.keys;
  keysShim.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function() {
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      }(1, 2);
      if (!keysWorksWithArguments) {
        Object.keys = function keys2(object) {
          if (isArgs(object)) {
            return originalKeys(slice.call(object));
          }
          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim;
    }
    return Object.keys || keysShim;
  };
  var objectKeys$2 = keysShim;
  var esErrors = Error;
  var _eval = EvalError;
  var range = RangeError;
  var ref = ReferenceError;
  var syntax = SyntaxError;
  var type$2 = TypeError;
  var uri = URIError;
  var shams$1 = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = shams$1;
  var hasSymbols$5 = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  var test = {
    foo: {}
  };
  var $Object$1 = Object;
  var hasProto$1 = function hasProto2() {
    return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object$1);
  };
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr$8 = Object.prototype.toString;
  var max = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i2 = 0; i2 < a.length; i2 += 1) {
      arr[i2] = a[i2];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i2 = offset, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
      arr[j] = arrLike[i2];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i2 = 0; i2 < arr.length; i2 += 1) {
      str += arr[i2];
      if (i2 + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  var implementation$a = function bind2(that) {
    var target = this;
    if (typeof target !== "function" || toStr$8.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound2;
    var binder = function() {
      if (this instanceof bound2) {
        var result = target.apply(
          this,
          concatty(args, arguments)
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(
        that,
        concatty(args, arguments)
      );
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i2 = 0; i2 < boundLength; i2++) {
      boundArgs[i2] = "$" + i2;
    }
    bound2 = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound2.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound2;
  };
  var implementation$9 = implementation$a;
  var functionBind = Function.prototype.bind || implementation$9;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind$1 = functionBind;
  var hasown = bind$1.call(call, $hasOwn);
  var undefined$1;
  var $Error = esErrors;
  var $EvalError = _eval;
  var $RangeError = range;
  var $ReferenceError = ref;
  var $SyntaxError$2 = syntax;
  var $TypeError$6 = type$2;
  var $URIError = uri;
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD$2 = Object.getOwnPropertyDescriptor;
  if ($gOPD$2) {
    try {
      $gOPD$2({}, "");
    } catch (e) {
      $gOPD$2 = null;
    }
  }
  var throwTypeError = function() {
    throw new $TypeError$6();
  };
  var ThrowTypeError = $gOPD$2 ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD$2(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols$4 = hasSymbols$5();
  var hasProto = hasProto$1();
  var getProto$1 = Object.getPrototypeOf || (hasProto ? function(x) {
    return x.__proto__;
  } : null);
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": $EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols$4 ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError$2,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError$6,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
  };
  if (getProto$1) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto$1(getProto$1(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto$1) {
        value = getProto$1(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = functionBind;
  var hasOwn$2 = hasown;
  var $concat$1 = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace$1 = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var $exec$1 = bind.call(Function.call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError$2("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError$2("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace$1(string, rePropName, function(match, number, quote2, subString) {
      result[result.length] = quote2 ? $replace$1(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn$2(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn$2(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError$6("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError$2("intrinsic " + name + " does not exist!");
  };
  var getIntrinsic = function GetIntrinsic2(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError$6("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError$6('"allowMissing" argument must be a boolean');
    }
    if ($exec$1(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError$2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat$1([0, 1], alias));
    }
    for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
      var part = parts[i2];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError$2("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn$2(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError$6("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD$2 && i2 + 1 >= parts.length) {
          var desc = $gOPD$2(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn$2(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  var GetIntrinsic$8 = getIntrinsic;
  var $defineProperty$2 = GetIntrinsic$8("%Object.defineProperty%", true) || false;
  if ($defineProperty$2) {
    try {
      $defineProperty$2({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty$2 = false;
    }
  }
  var esDefineProperty = $defineProperty$2;
  var GetIntrinsic$7 = getIntrinsic;
  var $gOPD$1 = GetIntrinsic$7("%Object.getOwnPropertyDescriptor%", true);
  if ($gOPD$1) {
    try {
      $gOPD$1([], "length");
    } catch (e) {
      $gOPD$1 = null;
    }
  }
  var gopd$1 = $gOPD$1;
  var $defineProperty$1 = esDefineProperty;
  var $SyntaxError$1 = syntax;
  var $TypeError$5 = type$2;
  var gopd = gopd$1;
  var defineDataProperty$1 = function defineDataProperty2(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") {
      throw new $TypeError$5("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError$5("`property` must be a string or a symbol`");
    }
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
      throw new $TypeError$5("`nonEnumerable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
      throw new $TypeError$5("`nonWritable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
      throw new $TypeError$5("`nonConfigurable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError$5("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd && gopd(obj, property);
    if ($defineProperty$1) {
      $defineProperty$1(obj, property, {
        configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable
      });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
      obj[property] = value;
    } else {
      throw new $SyntaxError$1("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
    }
  };
  var $defineProperty = esDefineProperty;
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!$defineProperty) {
      return null;
    }
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  var hasPropertyDescriptors_1 = hasPropertyDescriptors;
  var keys$2 = objectKeys$2;
  var hasSymbols$3 = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
  var toStr$7 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var defineDataProperty = defineDataProperty$1;
  var isFunction = function(fn) {
    return typeof fn === "function" && toStr$7.call(fn) === "[object Function]";
  };
  var supportsDescriptors$2 = hasPropertyDescriptors_1();
  var defineProperty$1 = function(object, name, value, predicate) {
    if (name in object) {
      if (predicate === true) {
        if (object[name] === value) {
          return;
        }
      } else if (!isFunction(predicate) || !predicate()) {
        return;
      }
    }
    if (supportsDescriptors$2) {
      defineDataProperty(object, name, value, true);
    } else {
      defineDataProperty(object, name, value);
    }
  };
  var defineProperties$1 = function(object, map) {
    var predicates = arguments.length > 2 ? arguments[2] : {};
    var props = keys$2(map);
    if (hasSymbols$3) {
      props = concat.call(props, Object.getOwnPropertySymbols(map));
    }
    for (var i2 = 0; i2 < props.length; i2 += 1) {
      defineProperty$1(object, props[i2], map[props[i2]], predicates[props[i2]]);
    }
  };
  defineProperties$1.supportsDescriptors = !!supportsDescriptors$2;
  var defineProperties_1 = defineProperties$1;
  var callBind$6 = { exports: {} };
  var GetIntrinsic$6 = getIntrinsic;
  var define$5 = defineDataProperty$1;
  var hasDescriptors$1 = hasPropertyDescriptors_1();
  var gOPD$4 = gopd$1;
  var $TypeError$4 = type$2;
  var $floor$1 = GetIntrinsic$6("%Math.floor%");
  var setFunctionLength = function setFunctionLength2(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError$4("`fn` is not a function");
    }
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor$1(length) !== length) {
      throw new $TypeError$4("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD$4) {
      var desc = gOPD$4(fn, "length");
      if (desc && !desc.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc && !desc.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors$1) {
        define$5(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length,
          true,
          true
        );
      } else {
        define$5(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length
        );
      }
    }
    return fn;
  };
  (function(module2) {
    var bind2 = functionBind;
    var GetIntrinsic2 = getIntrinsic;
    var setFunctionLength$1 = setFunctionLength;
    var $TypeError2 = type$2;
    var $apply = GetIntrinsic2("%Function.prototype.apply%");
    var $call = GetIntrinsic2("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic2("%Reflect.apply%", true) || bind2.call($call, $apply);
    var $defineProperty2 = esDefineProperty;
    var $max = GetIntrinsic2("%Math.max%");
    module2.exports = function callBind2(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError2("a function is required");
      }
      var func = $reflectApply(bind2, $call, arguments);
      return setFunctionLength$1(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind2, $apply, arguments);
    };
    if ($defineProperty2) {
      $defineProperty2(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  })(callBind$6);
  var callBindExports = callBind$6.exports;
  var GetIntrinsic$5 = getIntrinsic;
  var callBind$5 = callBindExports;
  var $indexOf$1 = callBind$5(GetIntrinsic$5("String.prototype.indexOf"));
  var callBound$c = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic$5(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf$1(name, ".prototype.") > -1) {
      return callBind$5(intrinsic);
    }
    return intrinsic;
  };
  var objectKeys$1 = objectKeys$2;
  var hasSymbols$2 = shams$1();
  var callBound$b = callBound$c;
  var toObject = Object;
  var $push = callBound$b("Array.prototype.push");
  var $propIsEnumerable = callBound$b("Object.prototype.propertyIsEnumerable");
  var originalGetSymbols = hasSymbols$2 ? Object.getOwnPropertySymbols : null;
  var implementation$8 = function assign2(target, source1) {
    if (target == null) {
      throw new TypeError("target must be an object");
    }
    var to = toObject(target);
    if (arguments.length === 1) {
      return to;
    }
    for (var s = 1; s < arguments.length; ++s) {
      var from = toObject(arguments[s]);
      var keys2 = objectKeys$1(from);
      var getSymbols = hasSymbols$2 && (Object.getOwnPropertySymbols || originalGetSymbols);
      if (getSymbols) {
        var syms = getSymbols(from);
        for (var j = 0; j < syms.length; ++j) {
          var key2 = syms[j];
          if ($propIsEnumerable(from, key2)) {
            $push(keys2, key2);
          }
        }
      }
      for (var i2 = 0; i2 < keys2.length; ++i2) {
        var nextKey = keys2[i2];
        if ($propIsEnumerable(from, nextKey)) {
          var propValue = from[nextKey];
          to[nextKey] = propValue;
        }
      }
    }
    return to;
  };
  var implementation$7 = implementation$8;
  var lacksProperEnumerationOrder = function() {
    if (!Object.assign) {
      return false;
    }
    var str = "abcdefghijklmnopqrst";
    var letters = str.split("");
    var map = {};
    for (var i2 = 0; i2 < letters.length; ++i2) {
      map[letters[i2]] = letters[i2];
    }
    var obj = Object.assign({}, map);
    var actual = "";
    for (var k2 in obj) {
      actual += k2;
    }
    return str !== actual;
  };
  var assignHasPendingExceptions = function() {
    if (!Object.assign || !Object.preventExtensions) {
      return false;
    }
    var thrower = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(thrower, "xy");
    } catch (e) {
      return thrower[1] === "y";
    }
    return false;
  };
  var polyfill$4 = function getPolyfill2() {
    if (!Object.assign) {
      return implementation$7;
    }
    if (lacksProperEnumerationOrder()) {
      return implementation$7;
    }
    if (assignHasPendingExceptions()) {
      return implementation$7;
    }
    return Object.assign;
  };
  var define$4 = defineProperties_1;
  var getPolyfill$5 = polyfill$4;
  var shim$5 = function shimAssign() {
    var polyfill2 = getPolyfill$5();
    define$4(
      Object,
      { assign: polyfill2 },
      { assign: function() {
        return Object.assign !== polyfill2;
      } }
    );
    return polyfill2;
  };
  var defineProperties = defineProperties_1;
  var callBind$4 = callBindExports;
  var implementation$6 = implementation$8;
  var getPolyfill$4 = polyfill$4;
  var shim$4 = shim$5;
  var polyfill$3 = callBind$4.apply(getPolyfill$4());
  var bound = function assign2(target, source1) {
    return polyfill$3(Object, arguments);
  };
  defineProperties(bound, {
    getPolyfill: getPolyfill$4,
    implementation: implementation$6,
    shim: shim$4
  });
  var object_assign = bound;
  var functionsHaveNames = function functionsHaveNames2() {
    return typeof (function f() {
    }).name === "string";
  };
  var gOPD$3 = Object.getOwnPropertyDescriptor;
  if (gOPD$3) {
    try {
      gOPD$3([], "length");
    } catch (e) {
      gOPD$3 = null;
    }
  }
  functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames2() {
    if (!functionsHaveNames() || !gOPD$3) {
      return false;
    }
    var desc = gOPD$3(function() {
    }, "name");
    return !!desc && !!desc.configurable;
  };
  var $bind = Function.prototype.bind;
  functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
    return functionsHaveNames() && typeof $bind === "function" && (function f() {
    }).bind().name !== "";
  };
  var functionsHaveNames_1 = functionsHaveNames;
  var define$3 = defineDataProperty$1;
  var hasDescriptors = hasPropertyDescriptors_1();
  var functionsHaveConfigurableNames = functionsHaveNames_1.functionsHaveConfigurableNames();
  var $TypeError$3 = TypeError;
  var setFunctionName$1 = function setFunctionName2(fn, name) {
    if (typeof fn !== "function") {
      throw new $TypeError$3("`fn` is not a function");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    if (!loose || functionsHaveConfigurableNames) {
      if (hasDescriptors) {
        define$3(fn, "name", name, true, true);
      } else {
        define$3(fn, "name", name);
      }
    }
    return fn;
  };
  var setFunctionName = setFunctionName$1;
  var $TypeError$2 = type$2;
  var $Object = Object;
  var implementation$5 = setFunctionName(function flags2() {
    if (this == null || this !== $Object(this)) {
      throw new $TypeError$2("RegExp.prototype.flags getter called on non-object");
    }
    var result = "";
    if (this.hasIndices) {
      result += "d";
    }
    if (this.global) {
      result += "g";
    }
    if (this.ignoreCase) {
      result += "i";
    }
    if (this.multiline) {
      result += "m";
    }
    if (this.dotAll) {
      result += "s";
    }
    if (this.unicode) {
      result += "u";
    }
    if (this.unicodeSets) {
      result += "v";
    }
    if (this.sticky) {
      result += "y";
    }
    return result;
  }, "get flags", true);
  var implementation$4 = implementation$5;
  var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
  var $gOPD = Object.getOwnPropertyDescriptor;
  var polyfill$2 = function getPolyfill2() {
    if (supportsDescriptors$1 && /a/mig.flags === "gim") {
      var descriptor = $gOPD(RegExp.prototype, "flags");
      if (descriptor && typeof descriptor.get === "function" && typeof RegExp.prototype.dotAll === "boolean" && typeof RegExp.prototype.hasIndices === "boolean") {
        var calls = "";
        var o = {};
        Object.defineProperty(o, "hasIndices", {
          get: function() {
            calls += "d";
          }
        });
        Object.defineProperty(o, "sticky", {
          get: function() {
            calls += "y";
          }
        });
        if (calls === "dy") {
          return descriptor.get;
        }
      }
    }
    return implementation$4;
  };
  var supportsDescriptors = defineProperties_1.supportsDescriptors;
  var getPolyfill$3 = polyfill$2;
  var gOPD$2 = Object.getOwnPropertyDescriptor;
  var defineProperty = Object.defineProperty;
  var TypeErr = TypeError;
  var getProto = Object.getPrototypeOf;
  var regex = /a/;
  var shim$3 = function shimFlags() {
    if (!supportsDescriptors || !getProto) {
      throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
    }
    var polyfill2 = getPolyfill$3();
    var proto = getProto(regex);
    var descriptor = gOPD$2(proto, "flags");
    if (!descriptor || descriptor.get !== polyfill2) {
      defineProperty(proto, "flags", {
        configurable: true,
        enumerable: false,
        get: polyfill2
      });
    }
    return polyfill2;
  };
  var define$2 = defineProperties_1;
  var callBind$3 = callBindExports;
  var implementation$3 = implementation$5;
  var getPolyfill$2 = polyfill$2;
  var shim$2 = shim$3;
  var flagsBound = callBind$3(getPolyfill$2());
  define$2(flagsBound, {
    getPolyfill: getPolyfill$2,
    implementation: implementation$3,
    shim: shim$2
  });
  var regexp_prototype_flags = flagsBound;
  var esGetIterator = { exports: {} };
  var hasSymbols$1 = shams$1;
  var shams = function hasToStringTagShams() {
    return hasSymbols$1() && !!Symbol.toStringTag;
  };
  var hasToStringTag$7 = shams();
  var callBound$a = callBound$c;
  var $toString$4 = callBound$a("Object.prototype.toString");
  var isStandardArguments = function isArguments2(value) {
    if (hasToStringTag$7 && value && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return $toString$4(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments2(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$4(value) !== "[object Array]" && $toString$4(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
  }();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  var isArguments$2 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  const __viteBrowserExternal = {};
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var hasMap = typeof Map === "function" && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === "function" && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var $match = String.prototype.match;
  var $slice$1 = String.prototype.slice;
  var $replace = String.prototype.replace;
  var $toUpperCase = String.prototype.toUpperCase;
  var $toLowerCase = String.prototype.toLowerCase;
  var $test = RegExp.prototype.test;
  var $concat = Array.prototype.concat;
  var $join = Array.prototype.join;
  var $arrSlice = Array.prototype.slice;
  var $floor = Math.floor;
  var bigIntValueOf$1 = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
  var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO$1 = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
    return O.__proto__;
  } : null);
  function addNumericSeparator(num, str) {
    if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
      return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === "number") {
      var int = num < 0 ? -$floor(-num) : $floor(num);
      if (int !== num) {
        var intStr = String(int);
        var dec = $slice$1.call(str, intStr.length + 1);
        return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return $replace.call(str, sepRegex, "$&_");
  }
  var utilInspect = require$$0$1;
  var inspectCustom = utilInspect.custom;
  var inspectSymbol = isSymbol$2(inspectCustom) ? inspectCustom : null;
  var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};
    if (has$1(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has$1(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$1(opts, "customInspect") ? opts.customInspect : true;
    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    }
    if (has$1(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has$1(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }
    if (typeof obj === "string") {
      return inspectString(obj, opts);
    }
    if (typeof obj === "number") {
      if (obj === 0) {
        return Infinity / obj > 0 ? "0" : "-0";
      }
      var str = String(obj);
      return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === "bigint") {
      var bigIntStr = String(obj) + "n";
      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }
    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
    if (typeof depth === "undefined") {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
      return isArray$2(obj) ? "[Array]" : "[Object]";
    }
    var indent = getIndent(opts, depth);
    if (typeof seen === "undefined") {
      seen = [];
    } else if (indexOf(seen, obj) >= 0) {
      return "[Circular]";
    }
    function inspect2(value, from, noIndent) {
      if (from) {
        seen = $arrSlice.call(seen);
        seen.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has$1(opts, "quoteStyle")) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen);
      }
      return inspect_(value, opts, depth + 1, seen);
    }
    if (typeof obj === "function" && !isRegExp(obj)) {
      var name = nameOf(obj);
      var keys2 = arrObjKeys(obj, inspect2);
      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
    }
    if (isSymbol$2(obj)) {
      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
      var s = "<" + $toLowerCase.call(String(obj.nodeName));
      var attrs = obj.attributes || [];
      for (var i2 = 0; i2 < attrs.length; i2++) {
        s += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
      }
      s += ">";
      if (obj.childNodes && obj.childNodes.length) {
        s += "...";
      }
      s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
      return s;
    }
    if (isArray$2(obj)) {
      if (obj.length === 0) {
        return "[]";
      }
      var xs = arrObjKeys(obj, inspect2);
      if (indent && !singleLineValues(xs)) {
        return "[" + indentedJoin(xs, indent) + "]";
      }
      return "[ " + $join.call(xs, ", ") + " ]";
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect2);
      if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
        return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
      }
      if (parts.length === 0) {
        return "[" + String(obj) + "]";
      }
      return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
    }
    if (typeof obj === "object" && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
        return utilInspect(obj, { depth: maxDepth - depth });
      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
        return obj.inspect();
      }
    }
    if (isMap$3(obj)) {
      var mapParts = [];
      if (mapForEach) {
        mapForEach.call(obj, function(value, key2) {
          mapParts.push(inspect2(key2, obj, true) + " => " + inspect2(value, obj));
        });
      }
      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
    }
    if (isSet$3(obj)) {
      var setParts = [];
      if (setForEach) {
        setForEach.call(obj, function(value) {
          setParts.push(inspect2(value, obj));
        });
      }
      return collectionOf("Set", setSize.call(obj), setParts, indent);
    }
    if (isWeakMap$1(obj)) {
      return weakCollectionOf("WeakMap");
    }
    if (isWeakSet$1(obj)) {
      return weakCollectionOf("WeakSet");
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf("WeakRef");
    }
    if (isNumber$1(obj)) {
      return markBoxed(inspect2(Number(obj)));
    }
    if (isBigInt$1(obj)) {
      return markBoxed(inspect2(bigIntValueOf$1.call(obj)));
    }
    if (isBoolean$1(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString$3(obj)) {
      return markBoxed(inspect2(String(obj)));
    }
    if (typeof window !== "undefined" && obj === window) {
      return "{ [object Window] }";
    }
    if (obj === commonjsGlobal) {
      return "{ [object globalThis] }";
    }
    if (!isDate$1(obj) && !isRegExp(obj)) {
      var ys = arrObjKeys(obj, inspect2);
      var isPlainObject = gPO$1 ? gPO$1(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? "" : "null prototype";
      var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice$1.call(toStr$6(obj), 8, -1) : protoTag ? "Object" : "";
      var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
      var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
      if (ys.length === 0) {
        return tag + "{}";
      }
      if (indent) {
        return tag + "{" + indentedJoin(ys, indent) + "}";
      }
      return tag + "{ " + $join.call(ys, ", ") + " }";
    }
    return String(obj);
  };
  function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
    return quoteChar + s + quoteChar;
  }
  function quote(s) {
    return $replace.call(String(s), /"/g, "&quot;");
  }
  function isArray$2(obj) {
    return toStr$6(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isDate$1(obj) {
    return toStr$6(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isRegExp(obj) {
    return toStr$6(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isError(obj) {
    return toStr$6(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isString$3(obj) {
    return toStr$6(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isNumber$1(obj) {
    return toStr$6(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isBoolean$1(obj) {
    return toStr$6(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isSymbol$2(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isBigInt$1(obj) {
    if (!obj || typeof obj !== "object" || !bigIntValueOf$1) {
      return false;
    }
    try {
      bigIntValueOf$1.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  var hasOwn$1 = Object.prototype.hasOwnProperty || function(key2) {
    return key2 in this;
  };
  function has$1(obj, key2) {
    return hasOwn$1.call(obj, key2);
  }
  function toStr$6(obj) {
    return objectToString.call(obj);
  }
  function nameOf(f) {
    if (f.name) {
      return f.name;
    }
    var m2 = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m2) {
      return m2[1];
    }
    return null;
  }
  function indexOf(xs, x) {
    if (xs.indexOf) {
      return xs.indexOf(x);
    }
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (xs[i2] === x) {
        return i2;
      }
    }
    return -1;
  }
  function isMap$3(x) {
    if (!mapSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      mapSize.call(x);
      try {
        setSize.call(x);
      } catch (s) {
        return true;
      }
      return x instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function isWeakMap$1(x) {
    if (!weakMapHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x, weakMapHas);
      try {
        weakSetHas.call(x, weakSetHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isSet$3(x) {
    if (!setSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      setSize.call(x);
      try {
        mapSize.call(x);
      } catch (m2) {
        return true;
      }
      return x instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function isWeakSet$1(x) {
    if (!weakSetHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakSetHas.call(x, weakSetHas);
      try {
        weakMapHas.call(x, weakMapHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function isElement(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
      return true;
    }
    return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString($slice$1.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, "single", opts);
  }
  function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n];
    if (x) {
      return "\\" + x;
    }
    return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
  }
  function markBoxed(str) {
    return "Object(" + str + ")";
  }
  function weakCollectionOf(type2) {
    return type2 + " { ? }";
  }
  function collectionOf(type2, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
    return type2 + " (" + size + ") {" + joinedEntries + "}";
  }
  function singleLineValues(xs) {
    for (var i2 = 0; i2 < xs.length; i2++) {
      if (indexOf(xs[i2], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === "	") {
      baseIndent = "	";
    } else if (typeof opts.indent === "number" && opts.indent > 0) {
      baseIndent = $join.call(Array(opts.indent + 1), " ");
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: $join.call(Array(depth + 1), baseIndent)
    };
  }
  function indentedJoin(xs, indent) {
    if (xs.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
  }
  function arrObjKeys(obj, inspect2) {
    var isArr = isArray$2(obj);
    var xs = [];
    if (isArr) {
      xs.length = obj.length;
      for (var i2 = 0; i2 < obj.length; i2++) {
        xs[i2] = has$1(obj, i2) ? inspect2(obj[i2], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k2 = 0; k2 < syms.length; k2++) {
        symMap["$" + syms[k2]] = syms[k2];
      }
    }
    for (var key2 in obj) {
      if (!has$1(obj, key2)) {
        continue;
      }
      if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
        continue;
      } else if ($test.call(/[^\w$]/, key2)) {
        xs.push(inspect2(key2, obj) + ": " + inspect2(obj[key2], obj));
      } else {
        xs.push(key2 + ": " + inspect2(obj[key2], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable.call(obj, syms[j])) {
          xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
        }
      }
    }
    return xs;
  }
  var GetIntrinsic$4 = getIntrinsic;
  var callBound$9 = callBound$c;
  var inspect = objectInspect;
  var $TypeError$1 = type$2;
  var $WeakMap$1 = GetIntrinsic$4("%WeakMap%", true);
  var $Map$3 = GetIntrinsic$4("%Map%", true);
  var $weakMapGet = callBound$9("WeakMap.prototype.get", true);
  var $weakMapSet = callBound$9("WeakMap.prototype.set", true);
  var $weakMapHas = callBound$9("WeakMap.prototype.has", true);
  var $mapGet$1 = callBound$9("Map.prototype.get", true);
  var $mapSet = callBound$9("Map.prototype.set", true);
  var $mapHas$5 = callBound$9("Map.prototype.has", true);
  var listGetNode = function(list, key2) {
    for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
      if (curr.key === key2) {
        prev.next = curr.next;
        curr.next = list.next;
        list.next = curr;
        return curr;
      }
    }
  };
  var listGet = function(objects, key2) {
    var node = listGetNode(objects, key2);
    return node && node.value;
  };
  var listSet = function(objects, key2, value) {
    var node = listGetNode(objects, key2);
    if (node) {
      node.value = value;
    } else {
      objects.next = {
        // eslint-disable-line no-param-reassign
        key: key2,
        next: objects.next,
        value
      };
    }
  };
  var listHas = function(objects, key2) {
    return !!listGetNode(objects, key2);
  };
  var sideChannel = function getSideChannel2() {
    var $wm;
    var $m;
    var $o;
    var channel2 = {
      assert: function(key2) {
        if (!channel2.has(key2)) {
          throw new $TypeError$1("Side channel does not contain " + inspect(key2));
        }
      },
      get: function(key2) {
        if ($WeakMap$1 && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
          if ($wm) {
            return $weakMapGet($wm, key2);
          }
        } else if ($Map$3) {
          if ($m) {
            return $mapGet$1($m, key2);
          }
        } else {
          if ($o) {
            return listGet($o, key2);
          }
        }
      },
      has: function(key2) {
        if ($WeakMap$1 && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
          if ($wm) {
            return $weakMapHas($wm, key2);
          }
        } else if ($Map$3) {
          if ($m) {
            return $mapHas$5($m, key2);
          }
        } else {
          if ($o) {
            return listHas($o, key2);
          }
        }
        return false;
      },
      set: function(key2, value) {
        if ($WeakMap$1 && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
          if (!$wm) {
            $wm = new $WeakMap$1();
          }
          $weakMapSet($wm, key2, value);
        } else if ($Map$3) {
          if (!$m) {
            $m = new $Map$3();
          }
          $mapSet($m, key2, value);
        } else {
          if (!$o) {
            $o = { key: {}, next: null };
          }
          listSet($o, key2, value);
        }
      }
    };
    return channel2;
  };
  var hasOwn = hasown;
  var channel = sideChannel();
  var $TypeError = type$2;
  var SLOT$1 = {
    assert: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      channel.assert(O);
      if (!SLOT$1.has(O, slot)) {
        throw new $TypeError("`" + slot + "` is not present on `O`");
      }
    },
    get: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      return slots && slots["$" + slot];
    },
    has: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      return !!slots && hasOwn(slots, "$" + slot);
    },
    set: function(O, slot, V) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      if (!slots) {
        slots = {};
        channel.set(O, slots);
      }
      slots["$" + slot] = V;
    }
  };
  if (Object.freeze) {
    Object.freeze(SLOT$1);
  }
  var internalSlot = SLOT$1;
  var SLOT = internalSlot;
  var $SyntaxError = SyntaxError;
  var $StopIteration = typeof StopIteration === "object" ? StopIteration : null;
  var stopIterationIterator = function getStopIterationIterator2(origIterator) {
    if (!$StopIteration) {
      throw new $SyntaxError("this environment lacks StopIteration");
    }
    SLOT.set(origIterator, "[[Done]]", false);
    var siIterator = {
      next: function next() {
        var iterator = SLOT.get(this, "[[Iterator]]");
        var done = SLOT.get(iterator, "[[Done]]");
        try {
          return {
            done,
            value: done ? void 0 : iterator.next()
          };
        } catch (e) {
          SLOT.set(iterator, "[[Done]]", true);
          if (e !== $StopIteration) {
            throw e;
          }
          return {
            done: true,
            value: void 0
          };
        }
      }
    };
    SLOT.set(siIterator, "[[Iterator]]", origIterator);
    return siIterator;
  };
  var toString = {}.toString;
  var isarray = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
  var strValue = String.prototype.valueOf;
  var tryStringObject = function tryStringObject2(value) {
    try {
      strValue.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr$5 = Object.prototype.toString;
  var strClass = "[object String]";
  var hasToStringTag$6 = shams();
  var isString$2 = function isString2(value) {
    if (typeof value === "string") {
      return true;
    }
    if (typeof value !== "object") {
      return false;
    }
    return hasToStringTag$6 ? tryStringObject(value) : toStr$5.call(value) === strClass;
  };
  var $Map$2 = typeof Map === "function" && Map.prototype ? Map : null;
  var $Set$3 = typeof Set === "function" && Set.prototype ? Set : null;
  var exported$2;
  if (!$Map$2) {
    exported$2 = function isMap2(x) {
      return false;
    };
  }
  var $mapHas$4 = $Map$2 ? Map.prototype.has : null;
  var $setHas$4 = $Set$3 ? Set.prototype.has : null;
  if (!exported$2 && !$mapHas$4) {
    exported$2 = function isMap2(x) {
      return false;
    };
  }
  var isMap$2 = exported$2 || function isMap2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $mapHas$4.call(x);
      if ($setHas$4) {
        try {
          $setHas$4.call(x);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $Map$2;
    } catch (e) {
    }
    return false;
  };
  var $Map$1 = typeof Map === "function" && Map.prototype ? Map : null;
  var $Set$2 = typeof Set === "function" && Set.prototype ? Set : null;
  var exported$1;
  if (!$Set$2) {
    exported$1 = function isSet2(x) {
      return false;
    };
  }
  var $mapHas$3 = $Map$1 ? Map.prototype.has : null;
  var $setHas$3 = $Set$2 ? Set.prototype.has : null;
  if (!exported$1 && !$setHas$3) {
    exported$1 = function isSet2(x) {
      return false;
    };
  }
  var isSet$2 = exported$1 || function isSet2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $setHas$3.call(x);
      if ($mapHas$3) {
        try {
          $mapHas$3.call(x);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $Set$2;
    } catch (e) {
    }
    return false;
  };
  var isArguments$1 = isArguments$2;
  var getStopIterationIterator = stopIterationIterator;
  if (hasSymbols$5() || shams$1()) {
    var $iterator = Symbol.iterator;
    esGetIterator.exports = function getIterator2(iterable) {
      if (iterable != null && typeof iterable[$iterator] !== "undefined") {
        return iterable[$iterator]();
      }
      if (isArguments$1(iterable)) {
        return Array.prototype[$iterator].call(iterable);
      }
    };
  } else {
    var isArray$1 = isarray;
    var isString$1 = isString$2;
    var GetIntrinsic$3 = getIntrinsic;
    var $Map = GetIntrinsic$3("%Map%", true);
    var $Set$1 = GetIntrinsic$3("%Set%", true);
    var callBound$8 = callBound$c;
    var $arrayPush = callBound$8("Array.prototype.push");
    var $charCodeAt = callBound$8("String.prototype.charCodeAt");
    var $stringSlice = callBound$8("String.prototype.slice");
    var advanceStringIndex = function advanceStringIndex2(S, index2) {
      var length = S.length;
      if (index2 + 1 >= length) {
        return index2 + 1;
      }
      var first = $charCodeAt(S, index2);
      if (first < 55296 || first > 56319) {
        return index2 + 1;
      }
      var second = $charCodeAt(S, index2 + 1);
      if (second < 56320 || second > 57343) {
        return index2 + 1;
      }
      return index2 + 2;
    };
    var getArrayIterator = function getArrayIterator2(arraylike) {
      var i2 = 0;
      return {
        next: function next() {
          var done = i2 >= arraylike.length;
          var value;
          if (!done) {
            value = arraylike[i2];
            i2 += 1;
          }
          return {
            done,
            value
          };
        }
      };
    };
    var getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
      if (isArray$1(iterable) || isArguments$1(iterable)) {
        return getArrayIterator(iterable);
      }
      if (isString$1(iterable)) {
        var i2 = 0;
        return {
          next: function next() {
            var nextIndex = advanceStringIndex(iterable, i2);
            var value = $stringSlice(iterable, i2, nextIndex);
            i2 = nextIndex;
            return {
              done: nextIndex > iterable.length,
              value
            };
          }
        };
      }
      if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
        return iterable["_es6-shim iterator_"]();
      }
    };
    if (!$Map && !$Set$1) {
      esGetIterator.exports = function getIterator2(iterable) {
        if (iterable != null) {
          return getNonCollectionIterator(iterable, true);
        }
      };
    } else {
      var isMap$1 = isMap$2;
      var isSet$1 = isSet$2;
      var $mapForEach = callBound$8("Map.prototype.forEach", true);
      var $setForEach = callBound$8("Set.prototype.forEach", true);
      if (typeof process === "undefined" || !process.versions || !process.versions.node) {
        var $mapIterator = callBound$8("Map.prototype.iterator", true);
        var $setIterator = callBound$8("Set.prototype.iterator", true);
      }
      var $mapAtAtIterator = callBound$8("Map.prototype.@@iterator", true) || callBound$8("Map.prototype._es6-shim iterator_", true);
      var $setAtAtIterator = callBound$8("Set.prototype.@@iterator", true) || callBound$8("Set.prototype._es6-shim iterator_", true);
      var getCollectionIterator = function getCollectionIterator2(iterable) {
        if (isMap$1(iterable)) {
          if ($mapIterator) {
            return getStopIterationIterator($mapIterator(iterable));
          }
          if ($mapAtAtIterator) {
            return $mapAtAtIterator(iterable);
          }
          if ($mapForEach) {
            var entries = [];
            $mapForEach(iterable, function(v, k2) {
              $arrayPush(entries, [k2, v]);
            });
            return getArrayIterator(entries);
          }
        }
        if (isSet$1(iterable)) {
          if ($setIterator) {
            return getStopIterationIterator($setIterator(iterable));
          }
          if ($setAtAtIterator) {
            return $setAtAtIterator(iterable);
          }
          if ($setForEach) {
            var values = [];
            $setForEach(iterable, function(v) {
              $arrayPush(values, v);
            });
            return getArrayIterator(values);
          }
        }
      };
      esGetIterator.exports = function getIterator2(iterable) {
        return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
      };
    }
  }
  var esGetIteratorExports = esGetIterator.exports;
  var numberIsNaN = function(value) {
    return value !== value;
  };
  var implementation$2 = function is2(a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a === b) {
      return true;
    }
    if (numberIsNaN(a) && numberIsNaN(b)) {
      return true;
    }
    return false;
  };
  var implementation$1 = implementation$2;
  var polyfill$1 = function getPolyfill2() {
    return typeof Object.is === "function" ? Object.is : implementation$1;
  };
  var getPolyfill$1 = polyfill$1;
  var define$1 = defineProperties_1;
  var shim$1 = function shimObjectIs() {
    var polyfill2 = getPolyfill$1();
    define$1(Object, { is: polyfill2 }, {
      is: function testObjectIs() {
        return Object.is !== polyfill2;
      }
    });
    return polyfill2;
  };
  var define2 = defineProperties_1;
  var callBind$2 = callBindExports;
  var implementation = implementation$2;
  var getPolyfill = polyfill$1;
  var shim = shim$1;
  var polyfill = callBind$2(getPolyfill(), Object);
  define2(polyfill, {
    getPolyfill,
    implementation,
    shim
  });
  var objectIs = polyfill;
  var callBind$1 = callBindExports;
  var callBound$7 = callBound$c;
  var GetIntrinsic$2 = getIntrinsic;
  var $ArrayBuffer = GetIntrinsic$2("%ArrayBuffer%", true);
  var $byteLength$2 = callBound$7("ArrayBuffer.prototype.byteLength", true);
  var $toString$3 = callBound$7("Object.prototype.toString");
  var abSlice = !!$ArrayBuffer && !$byteLength$2 && new $ArrayBuffer(0).slice;
  var $abSlice = !!abSlice && callBind$1(abSlice);
  var isArrayBuffer$2 = $byteLength$2 || $abSlice ? function isArrayBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    try {
      if ($byteLength$2) {
        $byteLength$2(obj);
      } else {
        $abSlice(obj, 0);
      }
      return true;
    } catch (e) {
      return false;
    }
  } : $ArrayBuffer ? function isArrayBuffer2(obj) {
    return $toString$3(obj) === "[object ArrayBuffer]";
  } : function isArrayBuffer2(obj) {
    return false;
  };
  var getDay = Date.prototype.getDay;
  var tryDateObject = function tryDateGetDayCall(value) {
    try {
      getDay.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr$4 = Object.prototype.toString;
  var dateClass = "[object Date]";
  var hasToStringTag$5 = shams();
  var isDateObject = function isDateObject2(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    return hasToStringTag$5 ? tryDateObject(value) : toStr$4.call(value) === dateClass;
  };
  var callBound$6 = callBound$c;
  var hasToStringTag$4 = shams();
  var has;
  var $exec;
  var isRegexMarker;
  var badStringifier;
  if (hasToStringTag$4) {
    has = callBound$6("Object.prototype.hasOwnProperty");
    $exec = callBound$6("RegExp.prototype.exec");
    isRegexMarker = {};
    var throwRegexMarker = function() {
      throw isRegexMarker;
    };
    badStringifier = {
      toString: throwRegexMarker,
      valueOf: throwRegexMarker
    };
    if (typeof Symbol.toPrimitive === "symbol") {
      badStringifier[Symbol.toPrimitive] = throwRegexMarker;
    }
  }
  var $toString$2 = callBound$6("Object.prototype.toString");
  var gOPD$1 = Object.getOwnPropertyDescriptor;
  var regexClass = "[object RegExp]";
  var isRegex$1 = hasToStringTag$4 ? function isRegex2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    var descriptor = gOPD$1(value, "lastIndex");
    var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
    if (!hasLastIndexDataProperty) {
      return false;
    }
    try {
      $exec(value, badStringifier);
    } catch (e) {
      return e === isRegexMarker;
    }
  } : function isRegex2(value) {
    if (!value || typeof value !== "object" && typeof value !== "function") {
      return false;
    }
    return $toString$2(value) === regexClass;
  };
  var callBound$5 = callBound$c;
  var $byteLength$1 = callBound$5("SharedArrayBuffer.prototype.byteLength", true);
  var isSharedArrayBuffer$1 = $byteLength$1 ? function isSharedArrayBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    try {
      $byteLength$1(obj);
      return true;
    } catch (e) {
      return false;
    }
  } : function isSharedArrayBuffer2(obj) {
    return false;
  };
  var numToStr = Number.prototype.toString;
  var tryNumberObject = function tryNumberObject2(value) {
    try {
      numToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr$3 = Object.prototype.toString;
  var numClass = "[object Number]";
  var hasToStringTag$3 = shams();
  var isNumberObject = function isNumberObject2(value) {
    if (typeof value === "number") {
      return true;
    }
    if (typeof value !== "object") {
      return false;
    }
    return hasToStringTag$3 ? tryNumberObject(value) : toStr$3.call(value) === numClass;
  };
  var callBound$4 = callBound$c;
  var $boolToStr = callBound$4("Boolean.prototype.toString");
  var $toString$1 = callBound$4("Object.prototype.toString");
  var tryBooleanObject = function booleanBrandCheck(value) {
    try {
      $boolToStr(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var boolClass = "[object Boolean]";
  var hasToStringTag$2 = shams();
  var isBooleanObject = function isBoolean2(value) {
    if (typeof value === "boolean") {
      return true;
    }
    if (value === null || typeof value !== "object") {
      return false;
    }
    return hasToStringTag$2 && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString$1(value) === boolClass;
  };
  var isSymbol$1 = { exports: {} };
  var toStr$2 = Object.prototype.toString;
  var hasSymbols = hasSymbols$5();
  if (hasSymbols) {
    var symToStr = Symbol.prototype.toString;
    var symStringRegex = /^Symbol\(.*\)$/;
    var isSymbolObject = function isRealSymbolObject(value) {
      if (typeof value.valueOf() !== "symbol") {
        return false;
      }
      return symStringRegex.test(symToStr.call(value));
    };
    isSymbol$1.exports = function isSymbol2(value) {
      if (typeof value === "symbol") {
        return true;
      }
      if (toStr$2.call(value) !== "[object Symbol]") {
        return false;
      }
      try {
        return isSymbolObject(value);
      } catch (e) {
        return false;
      }
    };
  } else {
    isSymbol$1.exports = function isSymbol2(value) {
      return false;
    };
  }
  var isSymbolExports = isSymbol$1.exports;
  var isBigint = { exports: {} };
  var $BigInt = typeof BigInt !== "undefined" && BigInt;
  var hasBigints = function hasNativeBigInts() {
    return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
  };
  var hasBigInts = hasBigints();
  if (hasBigInts) {
    var bigIntValueOf = BigInt.prototype.valueOf;
    var tryBigInt = function tryBigIntObject(value) {
      try {
        bigIntValueOf.call(value);
        return true;
      } catch (e) {
      }
      return false;
    };
    isBigint.exports = function isBigInt2(value) {
      if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
        return false;
      }
      if (typeof value === "bigint") {
        return true;
      }
      return tryBigInt(value);
    };
  } else {
    isBigint.exports = function isBigInt2(value) {
      return false;
    };
  }
  var isBigintExports = isBigint.exports;
  var isString = isString$2;
  var isNumber = isNumberObject;
  var isBoolean = isBooleanObject;
  var isSymbol = isSymbolExports;
  var isBigInt = isBigintExports;
  var whichBoxedPrimitive$1 = function whichBoxedPrimitive2(value) {
    if (value == null || typeof value !== "object" && typeof value !== "function") {
      return null;
    }
    if (isString(value)) {
      return "String";
    }
    if (isNumber(value)) {
      return "Number";
    }
    if (isBoolean(value)) {
      return "Boolean";
    }
    if (isSymbol(value)) {
      return "Symbol";
    }
    if (isBigInt(value)) {
      return "BigInt";
    }
  };
  var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
  var $WeakSet$1 = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
  var exported;
  if (!$WeakMap) {
    exported = function isWeakMap2(x) {
      return false;
    };
  }
  var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
  var $setHas$2 = $WeakSet$1 ? $WeakSet$1.prototype.has : null;
  if (!exported && !$mapHas$2) {
    exported = function isWeakMap2(x) {
      return false;
    };
  }
  var isWeakmap = exported || function isWeakMap2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $mapHas$2.call(x, $mapHas$2);
      if ($setHas$2) {
        try {
          $setHas$2.call(x, $setHas$2);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $WeakMap;
    } catch (e) {
    }
    return false;
  };
  var isWeakset = { exports: {} };
  var GetIntrinsic$1 = getIntrinsic;
  var callBound$3 = callBound$c;
  var $WeakSet = GetIntrinsic$1("%WeakSet%", true);
  var $setHas$1 = callBound$3("WeakSet.prototype.has", true);
  if ($setHas$1) {
    var $mapHas$1 = callBound$3("WeakMap.prototype.has", true);
    isWeakset.exports = function isWeakSet2(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      try {
        $setHas$1(x, $setHas$1);
        if ($mapHas$1) {
          try {
            $mapHas$1(x, $mapHas$1);
          } catch (e) {
            return true;
          }
        }
        return x instanceof $WeakSet;
      } catch (e) {
      }
      return false;
    };
  } else {
    isWeakset.exports = function isWeakSet2(x) {
      return false;
    };
  }
  var isWeaksetExports = isWeakset.exports;
  var isMap = isMap$2;
  var isSet = isSet$2;
  var isWeakMap = isWeakmap;
  var isWeakSet = isWeaksetExports;
  var whichCollection$1 = function whichCollection2(value) {
    if (value && typeof value === "object") {
      if (isMap(value)) {
        return "Map";
      }
      if (isSet(value)) {
        return "Set";
      }
      if (isWeakMap(value)) {
        return "WeakMap";
      }
      if (isWeakSet(value)) {
        return "WeakSet";
      }
    }
    return false;
  };
  var fnToStr = Function.prototype.toString;
  var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      reflectApply(function() {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr$1 = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag$1 = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr$1.call(all) === toStr$1.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
          try {
            var str = toStr$1.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
          } catch (e) {
          }
        }
        return false;
      };
    }
  }
  var isCallable$1 = reflectApply ? function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    if (hasToStringTag$1) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass2 = toStr$1.call(value);
    if (strClass2 !== fnClass && strClass2 !== genClass && !/^\[object HTML/.test(strClass2)) {
      return false;
    }
    return tryFunctionObject(value);
  };
  var isCallable = isCallable$1;
  var toStr = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i2 = 0, len = array.length; i2 < len; i2++) {
      if (hasOwnProperty.call(array, i2)) {
        if (receiver == null) {
          iterator(array[i2], i2, array);
        } else {
          iterator.call(receiver, array[i2], i2, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i2 = 0, len = string.length; i2 < len; i2++) {
      if (receiver == null) {
        iterator(string.charAt(i2), i2, string);
      } else {
        iterator.call(receiver, string.charAt(i2), i2, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k2 in object) {
      if (hasOwnProperty.call(object, k2)) {
        if (receiver == null) {
          iterator(object[k2], k2, object);
        } else {
          iterator.call(receiver, object[k2], k2, object);
        }
      }
    }
  };
  var forEach$1 = function forEach2(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (toStr.call(list) === "[object Array]") {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
  var forEach_1 = forEach$1;
  var possibleNames = [
    "BigInt64Array",
    "BigUint64Array",
    "Float32Array",
    "Float64Array",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray"
  ];
  var g$1 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var availableTypedArrays$1 = function availableTypedArrays2() {
    var out = [];
    for (var i2 = 0; i2 < possibleNames.length; i2++) {
      if (typeof g$1[possibleNames[i2]] === "function") {
        out[out.length] = possibleNames[i2];
      }
    }
    return out;
  };
  var forEach = forEach_1;
  var availableTypedArrays = availableTypedArrays$1;
  var callBind = callBindExports;
  var callBound$2 = callBound$c;
  var gOPD = gopd$1;
  var $toString = callBound$2("Object.prototype.toString");
  var hasToStringTag = shams();
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var typedArrays = availableTypedArrays();
  var $slice = callBound$2("String.prototype.slice");
  var getPrototypeOf = Object.getPrototypeOf;
  var $indexOf = callBound$2("Array.prototype.indexOf", true) || /** @type {(array: readonly unknown[], value: unknown) => keyof array} */
  function indexOf2(array, value) {
    for (var i2 = 0; i2 < array.length; i2 += 1) {
      if (array[i2] === value) {
        return i2;
      }
    }
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD && getPrototypeOf) {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        cache["$" + typedArray] = callBind(descriptor.get);
      }
    });
  } else {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      var fn = arr.slice || arr.set;
      if (fn) {
        cache["$" + typedArray] = callBind(fn);
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, typeof cache>} */
      /** @type {any} */
      cache,
      /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */
      function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(
      // eslint-disable-next-line no-extra-parens
      /** @type {any} */
      cache,
      /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */
      function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = $slice(name, 1);
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  var whichTypedArray$1 = function whichTypedArray2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD) {
      return null;
    }
    return tryTypedArrays(value);
  };
  var callBound$1 = callBound$c;
  var $byteLength = callBound$1("ArrayBuffer.prototype.byteLength", true);
  var isArrayBuffer$1 = isArrayBuffer$2;
  var arrayBufferByteLength = function byteLength2(ab) {
    if (!isArrayBuffer$1(ab)) {
      return NaN;
    }
    return $byteLength ? $byteLength(ab) : ab.byteLength;
  };
  var assign = object_assign;
  var callBound = callBound$c;
  var flags = regexp_prototype_flags;
  var GetIntrinsic = getIntrinsic;
  var getIterator = esGetIteratorExports;
  var getSideChannel = sideChannel;
  var is = objectIs;
  var isArguments = isArguments$2;
  var isArray = isarray;
  var isArrayBuffer = isArrayBuffer$2;
  var isDate = isDateObject;
  var isRegex = isRegex$1;
  var isSharedArrayBuffer = isSharedArrayBuffer$1;
  var objectKeys = objectKeys$2;
  var whichBoxedPrimitive = whichBoxedPrimitive$1;
  var whichCollection = whichCollection$1;
  var whichTypedArray = whichTypedArray$1;
  var byteLength = arrayBufferByteLength;
  var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
  var $getTime = callBound("Date.prototype.getTime");
  var gPO = Object.getPrototypeOf;
  var $objToString = callBound("Object.prototype.toString");
  var $Set = GetIntrinsic("%Set%", true);
  var $mapHas = callBound("Map.prototype.has", true);
  var $mapGet = callBound("Map.prototype.get", true);
  var $mapSize = callBound("Map.prototype.size", true);
  var $setAdd = callBound("Set.prototype.add", true);
  var $setDelete = callBound("Set.prototype.delete", true);
  var $setHas = callBound("Set.prototype.has", true);
  var $setSize = callBound("Set.prototype.size", true);
  function setHasEqualElement(set, val1, opts, channel2) {
    var i2 = getIterator(set);
    var result;
    while ((result = i2.next()) && !result.done) {
      if (internalDeepEqual(val1, result.value, opts, channel2)) {
        $setDelete(set, result.value);
        return true;
      }
    }
    return false;
  }
  function findLooseMatchingPrimitives(prim) {
    if (typeof prim === "undefined") {
      return null;
    }
    if (typeof prim === "object") {
      return void 0;
    }
    if (typeof prim === "symbol") {
      return false;
    }
    if (typeof prim === "string" || typeof prim === "number") {
      return +prim === +prim;
    }
    return true;
  }
  function mapMightHaveLoosePrim(a, b, prim, item, opts, channel2) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    var curB = $mapGet(b, altValue);
    var looseOpts = assign({}, opts, { strict: false });
    if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel2)) {
      return false;
    }
    return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel2);
  }
  function setMightHaveLoosePrim(a, b, prim) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    return $setHas(b, altValue) && !$setHas(a, altValue);
  }
  function mapHasEqualEntry(set, map, key1, item1, opts, channel2) {
    var i2 = getIterator(set);
    var result;
    var key2;
    while ((result = i2.next()) && !result.done) {
      key2 = result.value;
      if (
        // eslint-disable-next-line no-use-before-define
        internalDeepEqual(key1, key2, opts, channel2) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel2)
      ) {
        $setDelete(set, key2);
        return true;
      }
    }
    return false;
  }
  function internalDeepEqual(actual, expected, options, channel2) {
    var opts = options || {};
    if (opts.strict ? is(actual, expected) : actual === expected) {
      return true;
    }
    var actualBoxed = whichBoxedPrimitive(actual);
    var expectedBoxed = whichBoxedPrimitive(expected);
    if (actualBoxed !== expectedBoxed) {
      return false;
    }
    if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
      return opts.strict ? is(actual, expected) : actual == expected;
    }
    var hasActual = channel2.has(actual);
    var hasExpected = channel2.has(expected);
    var sentinel;
    if (hasActual && hasExpected) {
      if (channel2.get(actual) === channel2.get(expected)) {
        return true;
      }
    } else {
      sentinel = {};
    }
    if (!hasActual) {
      channel2.set(actual, sentinel);
    }
    if (!hasExpected) {
      channel2.set(expected, sentinel);
    }
    return objEquiv(actual, expected, opts, channel2);
  }
  function isBuffer(x) {
    if (!x || typeof x !== "object" || typeof x.length !== "number") {
      return false;
    }
    if (typeof x.copy !== "function" || typeof x.slice !== "function") {
      return false;
    }
    if (x.length > 0 && typeof x[0] !== "number") {
      return false;
    }
    return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
  }
  function setEquiv(a, b, opts, channel2) {
    if ($setSize(a) !== $setSize(b)) {
      return false;
    }
    var iA = getIterator(a);
    var iB = getIterator(b);
    var resultA;
    var resultB;
    var set;
    while ((resultA = iA.next()) && !resultA.done) {
      if (resultA.value && typeof resultA.value === "object") {
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, resultA.value);
      } else if (!$setHas(b, resultA.value)) {
        if (opts.strict) {
          return false;
        }
        if (!setMightHaveLoosePrim(a, b, resultA.value)) {
          return false;
        }
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, resultA.value);
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        if (resultB.value && typeof resultB.value === "object") {
          if (!setHasEqualElement(set, resultB.value, opts.strict, channel2)) {
            return false;
          }
        } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel2)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }
  function mapEquiv(a, b, opts, channel2) {
    if ($mapSize(a) !== $mapSize(b)) {
      return false;
    }
    var iA = getIterator(a);
    var iB = getIterator(b);
    var resultA;
    var resultB;
    var set;
    var key2;
    var item1;
    var item2;
    while ((resultA = iA.next()) && !resultA.done) {
      key2 = resultA.value[0];
      item1 = resultA.value[1];
      if (key2 && typeof key2 === "object") {
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, key2);
      } else {
        item2 = $mapGet(b, key2);
        if (typeof item2 === "undefined" && !$mapHas(b, key2) || !internalDeepEqual(item1, item2, opts, channel2)) {
          if (opts.strict) {
            return false;
          }
          if (!mapMightHaveLoosePrim(a, b, key2, item1, opts, channel2)) {
            return false;
          }
          if (!set) {
            set = new $Set();
          }
          $setAdd(set, key2);
        }
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        key2 = resultB.value[0];
        item2 = resultB.value[1];
        if (key2 && typeof key2 === "object") {
          if (!mapHasEqualEntry(set, a, key2, item2, opts, channel2)) {
            return false;
          }
        } else if (!opts.strict && (!a.has(key2) || !internalDeepEqual($mapGet(a, key2), item2, opts, channel2)) && !mapHasEqualEntry(set, a, key2, item2, assign({}, opts, { strict: false }), channel2)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }
  function objEquiv(a, b, opts, channel2) {
    var i2, key2;
    if (typeof a !== typeof b) {
      return false;
    }
    if (a == null || b == null) {
      return false;
    }
    if ($objToString(a) !== $objToString(b)) {
      return false;
    }
    if (isArguments(a) !== isArguments(b)) {
      return false;
    }
    var aIsArray = isArray(a);
    var bIsArray = isArray(b);
    if (aIsArray !== bIsArray) {
      return false;
    }
    var aIsError = a instanceof Error;
    var bIsError = b instanceof Error;
    if (aIsError !== bIsError) {
      return false;
    }
    if (aIsError || bIsError) {
      if (a.name !== b.name || a.message !== b.message) {
        return false;
      }
    }
    var aIsRegex = isRegex(a);
    var bIsRegex = isRegex(b);
    if (aIsRegex !== bIsRegex) {
      return false;
    }
    if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
      return false;
    }
    var aIsDate = isDate(a);
    var bIsDate = isDate(b);
    if (aIsDate !== bIsDate) {
      return false;
    }
    if (aIsDate || bIsDate) {
      if ($getTime(a) !== $getTime(b)) {
        return false;
      }
    }
    if (opts.strict && gPO && gPO(a) !== gPO(b)) {
      return false;
    }
    var aWhich = whichTypedArray(a);
    var bWhich = whichTypedArray(b);
    if (aWhich !== bWhich) {
      return false;
    }
    if (aWhich || bWhich) {
      if (a.length !== b.length) {
        return false;
      }
      for (i2 = 0; i2 < a.length; i2++) {
        if (a[i2] !== b[i2]) {
          return false;
        }
      }
      return true;
    }
    var aIsBuffer = isBuffer(a);
    var bIsBuffer = isBuffer(b);
    if (aIsBuffer !== bIsBuffer) {
      return false;
    }
    if (aIsBuffer || bIsBuffer) {
      if (a.length !== b.length) {
        return false;
      }
      for (i2 = 0; i2 < a.length; i2++) {
        if (a[i2] !== b[i2]) {
          return false;
        }
      }
      return true;
    }
    var aIsArrayBuffer = isArrayBuffer(a);
    var bIsArrayBuffer = isArrayBuffer(b);
    if (aIsArrayBuffer !== bIsArrayBuffer) {
      return false;
    }
    if (aIsArrayBuffer || bIsArrayBuffer) {
      if (byteLength(a) !== byteLength(b)) {
        return false;
      }
      return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel2);
    }
    var aIsSAB = isSharedArrayBuffer(a);
    var bIsSAB = isSharedArrayBuffer(b);
    if (aIsSAB !== bIsSAB) {
      return false;
    }
    if (aIsSAB || bIsSAB) {
      if (sabByteLength(a) !== sabByteLength(b)) {
        return false;
      }
      return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel2);
    }
    if (typeof a !== typeof b) {
      return false;
    }
    var ka = objectKeys(a);
    var kb = objectKeys(b);
    if (ka.length !== kb.length) {
      return false;
    }
    ka.sort();
    kb.sort();
    for (i2 = ka.length - 1; i2 >= 0; i2--) {
      if (ka[i2] != kb[i2]) {
        return false;
      }
    }
    for (i2 = ka.length - 1; i2 >= 0; i2--) {
      key2 = ka[i2];
      if (!internalDeepEqual(a[key2], b[key2], opts, channel2)) {
        return false;
      }
    }
    var aCollection = whichCollection(a);
    var bCollection = whichCollection(b);
    if (aCollection !== bCollection) {
      return false;
    }
    if (aCollection === "Set" || bCollection === "Set") {
      return setEquiv(a, b, opts, channel2);
    }
    if (aCollection === "Map") {
      return mapEquiv(a, b, opts, channel2);
    }
    return true;
  }
  var deepEqual = function deepEqual2(a, b, opts) {
    return internalDeepEqual(a, b, opts, getSideChannel());
  };
  Object.defineProperty(elementRoleMap$1, "__esModule", {
    value: true
  });
  elementRoleMap$1.default = void 0;
  var _deepEqual = _interopRequireDefault$2(deepEqual);
  var _iterationDecorator$1 = _interopRequireDefault$2(iterationDecorator$1);
  var _rolesMap$2 = _interopRequireDefault$2(rolesMap$1);
  function _interopRequireDefault$2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray$1(arr, i2) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
  }
  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit$1(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
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
  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper$1(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }
  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var elementRoles$1 = [];
  var keys$1 = _rolesMap$2.default.keys();
  for (var i$1 = 0; i$1 < keys$1.length; i$1++) {
    var key = keys$1[i$1];
    var role = _rolesMap$2.default.get(key);
    if (role) {
      var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
      for (var k = 0; k < concepts.length; k++) {
        var relation = concepts[k];
        if (relation.module === "HTML") {
          var concept = relation.concept;
          if (concept) {
            (function() {
              var conceptStr = JSON.stringify(concept);
              var elementRoleRelation = elementRoles$1.find(function(relation2) {
                return JSON.stringify(relation2[0]) === conceptStr;
              });
              var roles2 = void 0;
              if (elementRoleRelation) {
                roles2 = elementRoleRelation[1];
              } else {
                roles2 = [];
              }
              var isUnique = true;
              for (var _i = 0; _i < roles2.length; _i++) {
                if (roles2[_i] === key) {
                  isUnique = false;
                  break;
                }
              }
              if (isUnique) {
                roles2.push(key);
              }
              elementRoles$1.push([concept, roles2]);
            })();
          }
        }
      }
    }
  }
  var elementRoleMap = {
    entries: function entries() {
      return elementRoles$1;
    },
    forEach: function forEach2(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper$1(elementRoles$1), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray$1(_step.value, 2), _key = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, _key, elementRoles$1);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get(key2) {
      var item = elementRoles$1.find(function(tuple) {
        return (0, _deepEqual.default)(key2, tuple[0]);
      });
      return item && item[1];
    },
    has: function has2(key2) {
      return !!elementRoleMap.get(key2);
    },
    keys: function keys2() {
      return elementRoles$1.map(function(_ref) {
        var _ref2 = _slicedToArray$1(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return elementRoles$1.map(function(_ref3) {
        var _ref4 = _slicedToArray$1(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default$1 = (0, _iterationDecorator$1.default)(elementRoleMap, elementRoleMap.entries());
  elementRoleMap$1.default = _default$1;
  var roleElementMap$1 = {};
  Object.defineProperty(roleElementMap$1, "__esModule", {
    value: true
  });
  roleElementMap$1.default = void 0;
  var _iterationDecorator = _interopRequireDefault$1(iterationDecorator$1);
  var _rolesMap$1 = _interopRequireDefault$1(rolesMap$1);
  function _interopRequireDefault$1(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
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
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var roleElement = [];
  var keys = _rolesMap$1.default.keys();
  var _loop = function _loop2(i2) {
    var key2 = keys[i2];
    var role2 = _rolesMap$1.default.get(key2);
    if (role2) {
      var concepts2 = [].concat(role2.baseConcepts, role2.relatedConcepts);
      for (var k2 = 0; k2 < concepts2.length; k2++) {
        var relation2 = concepts2[k2];
        if (relation2.module === "HTML") {
          var concept2 = relation2.concept;
          if (concept2) {
            var roleElementRelation = roleElement.find(function(item) {
              return item[0] === key2;
            });
            var relationConcepts = void 0;
            if (roleElementRelation) {
              relationConcepts = roleElementRelation[1];
            } else {
              relationConcepts = [];
            }
            relationConcepts.push(concept2);
            roleElement.push([key2, relationConcepts]);
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
    forEach: function forEach2(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper(roleElement), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray(_step.value, 2), key2 = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, key2, roleElement);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get(key2) {
      var item = roleElement.find(function(tuple) {
        return tuple[0] === key2 ? true : false;
      });
      return item && item[1];
    },
    has: function has2(key2) {
      return !!roleElementMap.get(key2);
    },
    keys: function keys2() {
      return roleElement.map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return roleElement.map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
  roleElementMap$1.default = _default;
  Object.defineProperty(lib, "__esModule", {
    value: true
  });
  var roles_1 = lib.roles = roleElements_1 = lib.roleElements = elementRoles_1 = lib.elementRoles = lib.dom = lib.aria = void 0;
  var _ariaPropsMap = _interopRequireDefault(ariaPropsMap$1);
  var _domMap = _interopRequireDefault(domMap$1);
  var _rolesMap = _interopRequireDefault(rolesMap$1);
  var _elementRoleMap = _interopRequireDefault(elementRoleMap$1);
  var _roleElementMap = _interopRequireDefault(roleElementMap$1);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var aria = _ariaPropsMap.default;
  lib.aria = aria;
  var dom = _domMap.default;
  lib.dom = dom;
  var roles = _rolesMap.default;
  roles_1 = lib.roles = roles;
  var elementRoles = _elementRoleMap.default;
  var elementRoles_1 = lib.elementRoles = elementRoles;
  var roleElements = _roleElementMap.default;
  var roleElements_1 = lib.roleElements = roleElements;
  var lzString$1 = { exports: {} };
  lzString$1.exports;
  (function(module2) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character2) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i2 = 0; i2 < alphabet.length; i2++) {
            baseReverseDic[alphabet][alphabet.charAt(i2)] = i2;
          }
        }
        return baseReverseDic[alphabet][character2];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString2._decompress(input.length, 32, function(index2) {
            return getBaseValue(keyStrBase64, input.charAt(index2));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 16384, function(index2) {
            return compressed.charCodeAt(index2) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i2 = 0, TotalLen = compressed.length; i2 < TotalLen; i2++) {
            var current_value = compressed.charCodeAt(i2);
            buf[i2 * 2] = current_value >>> 8;
            buf[i2 * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i2 = 0, TotalLen = buf.length; i2 < TotalLen; i2++) {
              buf[i2] = compressed[i2 * 2] * 256 + compressed[i2 * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index2) {
            return getBaseValue(keyStrUriSafe, input.charAt(index2));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i2, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i2 = 0; i2 < context_numBits; i2++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i2 = 0; i2 < 8; i2++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
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
                  for (i2 = 0; i2 < context_numBits; i2++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i2 = 0; i2 < 16; i2++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
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
                for (i2 = 0; i2 < context_numBits; i2++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
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
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i2 = 0; i2 < context_numBits; i2++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i2 = 0; i2 < 8; i2++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
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
                for (i2 = 0; i2 < context_numBits; i2++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i2 = 0; i2 < 16; i2++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
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
              for (i2 = 0; i2 < context_numBits; i2++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
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
          value = 2;
          for (i2 = 0; i2 < context_numBits; i2++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 32768, function(index2) {
            return compressed.charCodeAt(index2);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i2, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i2 = 0; i2 < 3; i2 += 1) {
            dictionary[i2] = i2;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
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
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
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
      return LZString2;
    }();
    if (module2 != null) {
      module2.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  })(lzString$1);
  var lzStringExports = lzString$1.exports;
  const lzString = /* @__PURE__ */ getDefaultExportFromCjs(lzStringExports);
  function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  const printProps = (keys2, props, config2, indentation, depth, refs, printer2) => {
    const indentationNext = indentation + config2.indent;
    const colors = config2.colors;
    return keys2.map((key2) => {
      const value = props[key2];
      let printed = printer2(value, config2, indentationNext, depth, refs);
      if (typeof value !== "string") {
        if (printed.indexOf("\n") !== -1) {
          printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
        }
        printed = "{" + printed + "}";
      }
      return config2.spacingInner + indentation + colors.prop.open + key2 + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
    }).join("");
  };
  const NodeTypeTextNode = 3;
  const printChildren = (children, config2, indentation, depth, refs, printer2) => children.map((child) => {
    const printedChild = typeof child === "string" ? printText(child, config2) : printer2(child, config2, indentation, depth, refs);
    if (printedChild === "" && typeof child === "object" && child !== null && child.nodeType !== NodeTypeTextNode) {
      return "";
    }
    return config2.spacingOuter + indentation + printedChild;
  }).join("");
  const printText = (text, config2) => {
    const contentColor = config2.colors.content;
    return contentColor.open + escapeHTML(text) + contentColor.close;
  };
  const printComment = (comment, config2) => {
    const commentColor = config2.colors.comment;
    return commentColor.open + "<!--" + escapeHTML(comment) + "-->" + commentColor.close;
  };
  const printElement = (type2, printedProps, printedChildren, config2, indentation) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type2 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type2 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
  };
  const printElementAsLeaf = (type2, config2) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type2 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
  };
  const ELEMENT_NODE$1 = 1;
  const TEXT_NODE$1 = 3;
  const COMMENT_NODE$1 = 8;
  const FRAGMENT_NODE = 11;
  const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
  const testNode = (val) => {
    const constructorName = val.constructor.name;
    const {
      nodeType,
      tagName
    } = val;
    const isCustomElement = typeof tagName === "string" && tagName.includes("-") || typeof val.hasAttribute === "function" && val.hasAttribute("is");
    return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === "Text" || nodeType === COMMENT_NODE$1 && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
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
      test: (val) => {
        var _val$constructor2;
        return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
      },
      serialize: (node, config2, indentation, depth, refs, printer2) => {
        if (nodeIsText(node)) {
          return printText(node.data, config2);
        }
        if (nodeIsComment(node)) {
          return printComment(node.data, config2);
        }
        const type2 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
        if (++depth > config2.maxDepth) {
          return printElementAsLeaf(type2, config2);
        }
        return printElement(type2, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}), config2, indentation + config2.indent, depth, refs, printer2), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config2, indentation + config2.indent, depth, refs, printer2), config2, indentation);
      }
    };
  }
  let chalk = null;
  let readFileSync = null;
  let codeFrameColumns = null;
  try {
    const nodeRequire = module && module.require;
    readFileSync = nodeRequire.call(module, "fs").readFileSync;
    codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns;
    chalk = nodeRequire.call(module, "chalk");
  } catch {
  }
  function getCodeFrame(frame) {
    const locationStart = frame.indexOf("(") + 1;
    const locationEnd = frame.indexOf(")");
    const frameLocation = frame.slice(locationStart, locationEnd);
    const frameLocationElements = frameLocation.split(":");
    const [filename, line, column] = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)];
    let rawFileContents = "";
    try {
      rawFileContents = readFileSync(filename, "utf-8");
    } catch {
      return "";
    }
    const codeFrame = codeFrameColumns(rawFileContents, {
      start: {
        line,
        column
      }
    }, {
      highlightCode: true,
      linesBelow: 0
    });
    return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
  }
  function getUserCodeFrame() {
    if (!readFileSync || !codeFrameColumns) {
      return "";
    }
    const err = new Error();
    const firstClientCodeFrame = err.stack.split("\n").slice(1).find((frame) => !frame.includes("node_modules/"));
    return getCodeFrame(firstClientCodeFrame);
  }
  const TEXT_NODE$2 = 3;
  function jestFakeTimersAreEnabled$1() {
    if (typeof jest !== "undefined" && jest !== null) {
      return (
        // legacy timers
        setTimeout._isMockFunction === true || // modern timers
        Object.prototype.hasOwnProperty.call(setTimeout, "clock")
      );
    }
    return false;
  }
  function getDocument$1() {
    if (typeof window === "undefined") {
      throw new Error("Could not find default container");
    }
    return window.document;
  }
  function getWindowFromNode$1(node) {
    if (node.defaultView) {
      return node.defaultView;
    } else if (node.ownerDocument && node.ownerDocument.defaultView) {
      return node.ownerDocument.defaultView;
    } else if (node.window) {
      return node.window;
    } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
      throw new Error("It looks like the window object is not available for the provided node.");
    } else if (node.then instanceof Function) {
      throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
    } else if (Array.isArray(node)) {
      throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
    } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
      throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
    } else {
      throw new Error("The given node is not an Element, the node type is: " + typeof node + ".");
    }
  }
  function checkContainerType$1(container) {
    if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
      throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
    }
    function getTypeName(object) {
      if (typeof object === "object") {
        return object === null ? "null" : object.constructor.name;
      }
      return typeof object;
    }
  }
  const shouldHighlight = () => {
    let colors;
    try {
      var _process, _process$env2;
      colors = JSON.parse((_process = process) == null ? void 0 : (_process$env2 = _process.env) == null ? void 0 : _process$env2.COLORS);
    } catch (e) {
    }
    if (typeof colors === "boolean") {
      return colors;
    } else {
      return typeof process !== "undefined" && process.versions !== void 0 && process.versions.node !== void 0;
    }
  };
  const {
    DOMCollection
  } = plugins_1;
  const ELEMENT_NODE = 1;
  const COMMENT_NODE = 8;
  function filterCommentsAndDefaultIgnoreTagsTags(value) {
    return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(getConfig().defaultIgnore));
  }
  function prettyDOM(dom2, maxLength2, options) {
    if (options === void 0) {
      options = {};
    }
    if (!dom2) {
      dom2 = getDocument$1().body;
    }
    if (typeof maxLength2 !== "number") {
      maxLength2 = typeof process !== "undefined" && process.env.DEBUG_PRINT_LIMIT || 7e3;
    }
    if (maxLength2 === 0) {
      return "";
    }
    if (dom2.documentElement) {
      dom2 = dom2.documentElement;
    }
    let domTypeName = typeof dom2;
    if (domTypeName === "object") {
      domTypeName = dom2.constructor.name;
    } else {
      dom2 = {};
    }
    if (!("outerHTML" in dom2)) {
      throw new TypeError("Expected an element or document but got " + domTypeName);
    }
    const {
      filterNode = filterCommentsAndDefaultIgnoreTagsTags,
      ...prettyFormatOptions
    } = options;
    const debugContent = format_1(dom2, {
      plugins: [createDOMElementFilter(filterNode), DOMCollection],
      printFunctionName: false,
      highlight: shouldHighlight(),
      ...prettyFormatOptions
    });
    return maxLength2 !== void 0 && dom2.outerHTML.length > maxLength2 ? debugContent.slice(0, maxLength2) + "..." : debugContent;
  }
  const logDOM = function() {
    const userCodeFrame = getUserCodeFrame();
    if (userCodeFrame) {
      console.log(prettyDOM(...arguments) + "\n\n" + userCodeFrame);
    } else {
      console.log(prettyDOM(...arguments));
    }
  };
  let config = {
    testIdAttribute: "data-testid",
    asyncUtilTimeout: 1e3,
    // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
    // forcing react-testing-library to wrap all async functions would've been
    // a total nightmare (consider wrapping every findBy* query and then also
    // updating `within` so those would be wrapped too. Total nightmare).
    // so we have this config option that's really only intended for
    // react-testing-library to use. For that reason, this feature will remain
    // undocumented.
    asyncWrapper: (cb) => cb(),
    unstable_advanceTimersWrapper: (cb) => cb(),
    eventWrapper: (cb) => cb(),
    // default value for the `hidden` option in `ByRole` queries
    defaultHidden: false,
    // default value for the `ignore` option in `ByText` queries
    defaultIgnore: "script, style",
    // showOriginalStackTrace flag to show the full error stack traces for async errors
    showOriginalStackTrace: false,
    // throw errors w/ suggestions for better queries. Opt in so off by default.
    throwSuggestions: false,
    // called when getBy* queries fail. (message, container) => Error
    getElementError(message, container) {
      const prettifiedDOM = prettyDOM(container);
      const error = new Error([message, "Ignored nodes: comments, " + config.defaultIgnore + "\n" + prettifiedDOM].filter(Boolean).join("\n\n"));
      error.name = "TestingLibraryElementError";
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
    if (typeof newConfig === "function") {
      newConfig = newConfig(config);
    }
    config = {
      ...config,
      ...newConfig
    };
  }
  function getConfig() {
    return config;
  }
  const labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
  function getTextContent(node) {
    if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
      return "";
    }
    if (node.nodeType === TEXT_NODE$2) return node.textContent;
    return Array.from(node.childNodes).map((childNode) => getTextContent(childNode)).join("");
  }
  function getLabelContent(element) {
    let textContent;
    if (element.tagName.toLowerCase() === "label") {
      textContent = getTextContent(element);
    } else {
      textContent = element.value || element.textContent;
    }
    return textContent;
  }
  function getRealLabels(element) {
    if (element.labels !== void 0) {
      var _labels;
      return (_labels = element.labels) != null ? _labels : [];
    }
    if (!isLabelable(element)) return [];
    const labels = element.ownerDocument.querySelectorAll("label");
    return Array.from(labels).filter((label) => label.control === element);
  }
  function isLabelable(element) {
    return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === "INPUT" && element.getAttribute("type") !== "hidden";
  }
  function getLabels(container, element, _temp) {
    let {
      selector: selector2 = "*"
    } = _temp === void 0 ? {} : _temp;
    const ariaLabelledBy = element.getAttribute("aria-labelledby");
    const labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
    return labelsId.length ? labelsId.map((labelId) => {
      const labellingElement = container.querySelector('[id="' + labelId + '"]');
      return labellingElement ? {
        content: getLabelContent(labellingElement),
        formControl: null
      } : {
        content: "",
        formControl: null
      };
    }) : Array.from(getRealLabels(element)).map((label) => {
      const textToMatch = getLabelContent(label);
      const formControlSelector = "button, input, meter, output, progress, select, textarea";
      const labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter((formControlElement) => formControlElement.matches(selector2))[0];
      return {
        content: textToMatch,
        formControl: labelledFormControl
      };
    });
  }
  function assertNotNullOrUndefined(matcher) {
    if (matcher === null || matcher === void 0) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
        "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?"
      );
    }
  }
  function fuzzyMatches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== "string") {
      return false;
    }
    assertNotNullOrUndefined(matcher);
    const normalizedText = normalizer(textToMatch);
    if (typeof matcher === "string" || typeof matcher === "number") {
      return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
    } else if (typeof matcher === "function") {
      return matcher(normalizedText, node);
    } else {
      return matchRegExp(matcher, normalizedText);
    }
  }
  function matches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== "string") {
      return false;
    }
    assertNotNullOrUndefined(matcher);
    const normalizedText = normalizer(textToMatch);
    if (matcher instanceof Function) {
      return matcher(normalizedText, node);
    } else if (matcher instanceof RegExp) {
      return matchRegExp(matcher, normalizedText);
    } else {
      return normalizedText === String(matcher);
    }
  }
  function getDefaultNormalizer(_temp) {
    let {
      trim = true,
      collapseWhitespace = true
    } = _temp === void 0 ? {} : _temp;
    return (text) => {
      let normalizedText = text;
      normalizedText = trim ? normalizedText.trim() : normalizedText;
      normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
      return normalizedText;
    };
  }
  function makeNormalizer(_ref) {
    let {
      trim,
      collapseWhitespace,
      normalizer
    } = _ref;
    if (!normalizer) {
      return getDefaultNormalizer({
        trim,
        collapseWhitespace
      });
    }
    if (typeof trim !== "undefined" || typeof collapseWhitespace !== "undefined") {
      throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
    }
    return normalizer;
  }
  function matchRegExp(matcher, text) {
    const match = matcher.test(text);
    if (matcher.global && matcher.lastIndex !== 0) {
      console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.");
      matcher.lastIndex = 0;
    }
    return match;
  }
  function getNodeText(node) {
    if (node.matches("input[type=submit], input[type=button], input[type=reset]")) {
      return node.value;
    }
    return Array.from(node.childNodes).filter((child) => child.nodeType === TEXT_NODE$2 && Boolean(child.textContent)).map((c) => c.textContent).join("");
  }
  const elementRoleList = buildElementRoleList(elementRoles_1);
  function isSubtreeInaccessible(element) {
    if (element.hidden === true) {
      return true;
    }
    if (element.getAttribute("aria-hidden") === "true") {
      return true;
    }
    const window2 = element.ownerDocument.defaultView;
    if (window2.getComputedStyle(element).display === "none") {
      return true;
    }
    return false;
  }
  function isInaccessible(element, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      isSubtreeInaccessible: isSubtreeInaccessibleImpl = isSubtreeInaccessible
    } = options;
    const window2 = element.ownerDocument.defaultView;
    if (window2.getComputedStyle(element).visibility === "hidden") {
      return true;
    }
    let currentElement = element;
    while (currentElement) {
      if (isSubtreeInaccessibleImpl(currentElement)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  function getImplicitAriaRoles(currentNode) {
    for (const {
      match,
      roles: roles2
    } of elementRoleList) {
      if (match(currentNode)) {
        return [...roles2];
      }
    }
    return [];
  }
  function buildElementRoleList(elementRolesMap) {
    function makeElementSelector(_ref) {
      let {
        name,
        attributes
      } = _ref;
      return "" + name + attributes.map((_ref2) => {
        let {
          name: attributeName,
          value,
          constraints = []
        } = _ref2;
        const shouldNotExist = constraints.indexOf("undefined") !== -1;
        if (shouldNotExist) {
          return ":not([" + attributeName + "])";
        } else if (value) {
          return "[" + attributeName + '="' + value + '"]';
        } else {
          return "[" + attributeName + "]";
        }
      }).join("");
    }
    function getSelectorSpecificity(_ref3) {
      let {
        attributes = []
      } = _ref3;
      return attributes.length;
    }
    function bySelectorSpecificity(_ref4, _ref5) {
      let {
        specificity: leftSpecificity
      } = _ref4;
      let {
        specificity: rightSpecificity
      } = _ref5;
      return rightSpecificity - leftSpecificity;
    }
    function match(element) {
      let {
        attributes = []
      } = element;
      const typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
      if (typeTextIndex >= 0) {
        attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)];
      }
      const selector2 = makeElementSelector({
        ...element,
        attributes
      });
      return (node) => {
        if (typeTextIndex >= 0 && node.type !== "text") {
          return false;
        }
        return node.matches(selector2);
      };
    }
    let result = [];
    for (const [element, roles2] of elementRolesMap.entries()) {
      result = [...result, {
        match: match(element),
        roles: Array.from(roles2),
        specificity: getSelectorSpecificity(element)
      }];
    }
    return result.sort(bySelectorSpecificity);
  }
  function getRoles(container, _temp) {
    let {
      hidden = false
    } = _temp === void 0 ? {} : _temp;
    function flattenDOM(node) {
      return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
    }
    return flattenDOM(container).filter((element) => {
      return hidden === false ? isInaccessible(element) === false : true;
    }).reduce((acc, node) => {
      let roles2 = [];
      if (node.hasAttribute("role")) {
        roles2 = node.getAttribute("role").split(" ").slice(0, 1);
      } else {
        roles2 = getImplicitAriaRoles(node);
      }
      return roles2.reduce((rolesAcc, role2) => Array.isArray(rolesAcc[role2]) ? {
        ...rolesAcc,
        [role2]: [...rolesAcc[role2], node]
      } : {
        ...rolesAcc,
        [role2]: [node]
      }, acc);
    }, {});
  }
  function prettyRoles(dom2, _ref6) {
    let {
      hidden,
      includeDescription
    } = _ref6;
    const roles2 = getRoles(dom2, {
      hidden
    });
    return Object.entries(roles2).filter((_ref7) => {
      let [role2] = _ref7;
      return role2 !== "generic";
    }).map((_ref8) => {
      let [role2, elements] = _ref8;
      const delimiterBar = "-".repeat(50);
      const elementsString = elements.map((el) => {
        const nameString = 'Name "' + computeAccessibleName(el, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        }) + '":\n';
        const domString = prettyDOM(el.cloneNode(false));
        if (includeDescription) {
          const descriptionString = 'Description "' + computeAccessibleDescription(el, {
            computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
          }) + '":\n';
          return "" + nameString + descriptionString + domString;
        }
        return "" + nameString + domString;
      }).join("\n\n");
      return role2 + ":\n\n" + elementsString + "\n\n" + delimiterBar;
    }).join("\n");
  }
  const logRoles = function(dom2, _temp2) {
    let {
      hidden = false
    } = _temp2 === void 0 ? {} : _temp2;
    return console.log(prettyRoles(dom2, {
      hidden
    }));
  };
  function computeAriaSelected(element) {
    if (element.tagName === "OPTION") {
      return element.selected;
    }
    return checkBooleanAttribute(element, "aria-selected");
  }
  function computeAriaChecked(element) {
    if ("indeterminate" in element && element.indeterminate) {
      return void 0;
    }
    if ("checked" in element) {
      return element.checked;
    }
    return checkBooleanAttribute(element, "aria-checked");
  }
  function computeAriaPressed(element) {
    return checkBooleanAttribute(element, "aria-pressed");
  }
  function computeAriaCurrent(element) {
    var _ref9, _checkBooleanAttribut;
    return (_ref9 = (_checkBooleanAttribut = checkBooleanAttribute(element, "aria-current")) != null ? _checkBooleanAttribut : element.getAttribute("aria-current")) != null ? _ref9 : false;
  }
  function computeAriaExpanded(element) {
    return checkBooleanAttribute(element, "aria-expanded");
  }
  function checkBooleanAttribute(element, attribute) {
    const attributeValue = element.getAttribute(attribute);
    if (attributeValue === "true") {
      return true;
    }
    if (attributeValue === "false") {
      return false;
    }
    return void 0;
  }
  function computeHeadingLevel(element) {
    const implicitHeadingLevels = {
      H1: 1,
      H2: 2,
      H3: 3,
      H4: 4,
      H5: 5,
      H6: 6
    };
    const ariaLevelAttribute = element.getAttribute("aria-level") && Number(element.getAttribute("aria-level"));
    return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
  }
  const normalize = getDefaultNormalizer();
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  function getRegExpMatcher(string) {
    return new RegExp(escapeRegExp(string.toLowerCase()), "i");
  }
  function makeSuggestion(queryName, element, content, _ref) {
    let {
      variant,
      name
    } = _ref;
    let warning = "";
    const queryOptions = {};
    const queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
    if (name) {
      queryOptions.name = getRegExpMatcher(name);
    }
    if (queryName === "Role" && isInaccessible(element)) {
      queryOptions.hidden = true;
      warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
    }
    if (Object.keys(queryOptions).length > 0) {
      queryArgs.push(queryOptions);
    }
    const queryMethod = variant + "By" + queryName;
    return {
      queryName,
      queryMethod,
      queryArgs,
      variant,
      warning,
      toString() {
        if (warning) {
          console.warn(warning);
        }
        let [text, options] = queryArgs;
        text = typeof text === "string" ? "'" + text + "'" : text;
        options = options ? ", { " + Object.entries(options).map((_ref2) => {
          let [k2, v] = _ref2;
          return k2 + ": " + v;
        }).join(", ") + " }" : "";
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
      variant = "get";
    }
    if (element.matches(getConfig().defaultIgnore)) {
      return void 0;
    }
    const role2 = (_element$getAttribute = element.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];
    if (role2 !== "generic" && canSuggest("Role", method, role2)) {
      return makeSuggestion("Role", element, role2, {
        variant,
        name: computeAccessibleName(element, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        })
      });
    }
    const labelText = getLabels(document, element).map((label) => label.content).join(" ");
    if (canSuggest("LabelText", method, labelText)) {
      return makeSuggestion("LabelText", element, labelText, {
        variant
      });
    }
    const placeholderText = element.getAttribute("placeholder");
    if (canSuggest("PlaceholderText", method, placeholderText)) {
      return makeSuggestion("PlaceholderText", element, placeholderText, {
        variant
      });
    }
    const textContent = normalize(getNodeText(element));
    if (canSuggest("Text", method, textContent)) {
      return makeSuggestion("Text", element, textContent, {
        variant
      });
    }
    if (canSuggest("DisplayValue", method, element.value)) {
      return makeSuggestion("DisplayValue", element, normalize(element.value), {
        variant
      });
    }
    const alt = element.getAttribute("alt");
    if (canSuggest("AltText", method, alt)) {
      return makeSuggestion("AltText", element, alt, {
        variant
      });
    }
    const title = element.getAttribute("title");
    if (canSuggest("Title", method, title)) {
      return makeSuggestion("Title", element, title, {
        variant
      });
    }
    const testId = element.getAttribute(getConfig().testIdAttribute);
    if (canSuggest("TestId", method, testId)) {
      return makeSuggestion("TestId", element, testId, {
        variant
      });
    }
    return void 0;
  }
  function copyStackTrace(target, source) {
    target.stack = source.stack.replace(source.message, target.message);
  }
  function waitFor(callback, _ref) {
    let {
      container = getDocument$1(),
      timeout = getConfig().asyncUtilTimeout,
      showOriginalStackTrace = getConfig().showOriginalStackTrace,
      stackTraceError,
      interval = 50,
      onTimeout = (error) => {
        error.message = getConfig().getElementError(error.message, container).message;
        return error;
      },
      mutationObserverOptions = {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
      }
    } = _ref;
    if (typeof callback !== "function") {
      throw new TypeError("Received `callback` arg must be a function");
    }
    return new Promise(async (resolve, reject) => {
      let lastError, intervalId, observer;
      let finished = false;
      let promiseStatus = "idle";
      const overallTimeoutTimer = setTimeout(handleTimeout, timeout);
      const usingJestFakeTimers = jestFakeTimersAreEnabled$1();
      if (usingJestFakeTimers) {
        const {
          unstable_advanceTimersWrapper: advanceTimersWrapper
        } = getConfig();
        checkCallback();
        while (!finished) {
          if (!jestFakeTimersAreEnabled$1()) {
            const error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
            if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
            reject(error);
            return;
          }
          advanceTimersWrapper(() => {
            jest.advanceTimersByTime(interval);
          });
          checkCallback();
          if (finished) {
            break;
          }
          await advanceTimersWrapper(async () => {
            await new Promise((r) => {
              setTimeout(r, 0);
              jest.advanceTimersByTime(0);
            });
          });
        }
      } else {
        try {
          checkContainerType$1(container);
        } catch (e) {
          reject(e);
          return;
        }
        intervalId = setInterval(checkRealTimersCallback, interval);
        const {
          MutationObserver
        } = getWindowFromNode$1(container);
        observer = new MutationObserver(checkRealTimersCallback);
        observer.observe(container, mutationObserverOptions);
        checkCallback();
      }
      function onDone(error, result) {
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
      }
      function checkRealTimersCallback() {
        if (jestFakeTimersAreEnabled$1()) {
          const error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
          if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
          return reject(error);
        } else {
          return checkCallback();
        }
      }
      function checkCallback() {
        if (promiseStatus === "pending") return;
        try {
          const result = runWithExpensiveErrorDiagnosticsDisabled(callback);
          if (typeof (result == null ? void 0 : result.then) === "function") {
            promiseStatus = "pending";
            result.then((resolvedValue) => {
              promiseStatus = "resolved";
              onDone(null, resolvedValue);
            }, (rejectedValue) => {
              promiseStatus = "rejected";
              lastError = rejectedValue;
            });
          } else {
            onDone(null, result);
          }
        } catch (error) {
          lastError = error;
        }
      }
      function handleTimeout() {
        let error;
        if (lastError) {
          error = lastError;
          if (!showOriginalStackTrace && error.name === "TestingLibraryElementError") {
            copyStackTrace(error, stackTraceError);
          }
        } else {
          error = new Error("Timed out in waitFor.");
          if (!showOriginalStackTrace) {
            copyStackTrace(error, stackTraceError);
          }
        }
        onDone(onTimeout(error), null);
      }
    });
  }
  function waitForWrapper(callback, options) {
    const stackTraceError = new Error("STACK_TRACE_MESSAGE");
    return getConfig().asyncWrapper(() => waitFor(callback, {
      stackTraceError,
      ...options
    }));
  }
  function getElementError(message, container) {
    return getConfig().getElementError(message, container);
  }
  function getMultipleElementsFoundError(message, container) {
    return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
  }
  function queryAllByAttribute(attribute, container, text, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("[" + attribute + "]")).filter((node) => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
  }
  function queryByAttribute(attribute, container, text, options) {
    const els = queryAllByAttribute(attribute, container, text, options);
    if (els.length > 1) {
      throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
    }
    return els[0] || null;
  }
  function makeSingleQuery(allQuery, getMultipleError2) {
    return function(container) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      const els = allQuery(container, ...args);
      if (els.length > 1) {
        const elementStrings = els.map((element) => getElementError(null, element).message).join("\n\n");
        throw getMultipleElementsFoundError(getMultipleError2(container, ...args) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
      }
      return els[0] || null;
    };
  }
  function getSuggestionError(suggestion, container) {
    return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
  }
  function makeGetAllQuery(allQuery, getMissingError2) {
    return function(container) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      const els = allQuery(container, ...args);
      if (!els.length) {
        throw getConfig().getElementError(getMissingError2(container, ...args), container);
      }
      return els;
    };
  }
  function makeFindQuery(getter) {
    return (container, text, options, waitForOptions) => {
      return waitForWrapper(() => {
        return getter(container, text, options);
      }, {
        container,
        ...waitForOptions
      });
    };
  }
  const wrapSingleQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    const element = query(container, ...args);
    const [{
      suggest = getConfig().throwSuggestions
    } = {}] = args.slice(-1);
    if (element && suggest) {
      const suggestion = getSuggestedQuery(element, variant);
      if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
        throw getSuggestionError(suggestion.toString(), container);
      }
    }
    return element;
  };
  const wrapAllByQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    const els = query(container, ...args);
    const [{
      suggest = getConfig().throwSuggestions
    } = {}] = args.slice(-1);
    if (els.length && suggest) {
      const uniqueSuggestionMessages = [...new Set(els.map((element) => {
        var _getSuggestedQuery;
        return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
      }))];
      if (
        // only want to suggest if all the els have the same suggestion.
        uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
          getSuggestedQuery(els[0], variant).queryName
        )
      ) {
        throw getSuggestionError(uniqueSuggestionMessages[0], container);
      }
    }
    return els;
  };
  function buildQueries(queryAllBy, getMultipleError2, getMissingError2) {
    const queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError2), queryAllBy.name, "query");
    const getAllBy = makeGetAllQuery(queryAllBy, getMissingError2);
    const getBy = makeSingleQuery(getAllBy, getMultipleError2);
    const getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get");
    const getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll");
    const findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll"));
    const findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
    return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
  }
  var queryHelpers = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    getElementError,
    wrapAllByQueryWithSuggestion,
    wrapSingleQueryWithSuggestion,
    getMultipleElementsFoundError,
    queryAllByAttribute,
    queryByAttribute,
    makeSingleQuery,
    makeGetAllQuery,
    makeFindQuery,
    buildQueries
  });
  function queryAllLabels(container) {
    return Array.from(container.querySelectorAll("label,input")).map((node) => {
      return {
        node,
        textToMatch: getLabelContent(node)
      };
    }).filter((_ref) => {
      let {
        textToMatch
      } = _ref;
      return textToMatch !== null;
    });
  }
  const queryAllLabelsByText = function(container, text, _temp) {
    let {
      exact = true,
      trim,
      collapseWhitespace,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const textToMatchByLabels = queryAllLabels(container);
    return textToMatchByLabels.filter((_ref2) => {
      let {
        node,
        textToMatch
      } = _ref2;
      return matcher(textToMatch, node, text, matchNormalizer);
    }).map((_ref3) => {
      let {
        node
      } = _ref3;
      return node;
    });
  };
  const queryAllByLabelText = function(container, text, _temp2) {
    let {
      selector: selector2 = "*",
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp2 === void 0 ? {} : _temp2;
    checkContainerType$1(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter((element) => {
      return getRealLabels(element).length || element.hasAttribute("aria-labelledby");
    }).reduce((labelledElements, labelledElement) => {
      const labelList = getLabels(container, labelledElement, {
        selector: selector2
      });
      labelList.filter((label) => Boolean(label.formControl)).forEach((label) => {
        if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) labelledElements.push(label.formControl);
      });
      const labelsValue = labelList.filter((label) => Boolean(label.content)).map((label) => label.content);
      if (matcher(labelsValue.join(" "), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
      if (labelsValue.length > 1) {
        labelsValue.forEach((labelValue, index2) => {
          if (matcher(labelValue, labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
          const labelsFiltered = [...labelsValue];
          labelsFiltered.splice(index2, 1);
          if (labelsFiltered.length > 1) {
            if (matcher(labelsFiltered.join(" "), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
          }
        });
      }
      return labelledElements;
    }, []).concat(queryAllByAttribute("aria-label", container, text, {
      exact,
      normalizer: matchNormalizer
    }));
    return Array.from(new Set(matchingLabelledElements)).filter((element) => element.matches(selector2));
  };
  const getAllByLabelText = function(container, text) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }
    const els = queryAllByLabelText(container, text, ...rest);
    if (!els.length) {
      const labels = queryAllLabelsByText(container, text, ...rest);
      if (labels.length) {
        const tagNames = labels.map((label) => getTagNameOfElementAssociatedWithLabelViaFor(container, label)).filter((tagName) => !!tagName);
        if (tagNames.length) {
          throw getConfig().getElementError(tagNames.map((tagName) => "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.").join("\n\n"), container);
        } else {
          throw getConfig().getElementError("Found a label with the text of: " + text + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
        }
      } else {
        throw getConfig().getElementError("Unable to find a label with the text of: " + text, container);
      }
    }
    return els;
  };
  function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
    const htmlFor = label.getAttribute("for");
    if (!htmlFor) {
      return null;
    }
    const element = container.querySelector('[id="' + htmlFor + '"]');
    return element ? element.tagName.toLowerCase() : null;
  }
  const getMultipleError$7 = (c, text) => "Found multiple elements with the text of: " + text;
  const queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, "query");
  const getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
  const findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "findAll"));
  const findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "find"));
  const getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "getAll");
  const getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "get");
  const queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, "queryAll");
  const queryAllByPlaceholderText = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    checkContainerType$1(args[0]);
    return queryAllByAttribute("placeholder", ...args);
  };
  const getMultipleError$6 = (c, text) => "Found multiple elements with the placeholder text of: " + text;
  const getMissingError$6 = (c, text) => "Unable to find an element with the placeholder text of: " + text;
  const queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, "queryAll");
  const [queryByPlaceholderText, getAllByPlaceholderText, getByPlaceholderText, findAllByPlaceholderText, findByPlaceholderText] = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6);
  const queryAllByText = function(container, text, _temp) {
    let {
      selector: selector2 = "*",
      exact = true,
      collapseWhitespace,
      trim,
      ignore = getConfig().defaultIgnore,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType$1(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    let baseArray = [];
    if (typeof container.matches === "function" && container.matches(selector2)) {
      baseArray = [container];
    }
    return [...baseArray, ...Array.from(container.querySelectorAll(selector2))].filter((node) => !ignore || !node.matches(ignore)).filter((node) => matcher(getNodeText(node), node, text, matchNormalizer));
  };
  const getMultipleError$5 = (c, text) => "Found multiple elements with the text: " + text;
  const getMissingError$5 = function(c, text, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      collapseWhitespace,
      trim,
      normalizer,
      selector: selector2
    } = options;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const normalizedText = matchNormalizer(text.toString());
    const isNormalizedDifferent = normalizedText !== text.toString();
    const isCustomSelector = (selector2 != null ? selector2 : "*") !== "*";
    return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text + "')" : text) + (isCustomSelector ? ", which matches selector '" + selector2 + "'" : "") + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
  };
  const queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, "queryAll");
  const [queryByText, getAllByText, getByText, findAllByText, findByText] = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5);
  const queryAllByDisplayValue = function(container, value, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType$1(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("input,textarea,select")).filter((node) => {
      if (node.tagName === "SELECT") {
        const selectedOptions = Array.from(node.options).filter((option) => option.selected);
        return selectedOptions.some((optionNode) => matcher(getNodeText(optionNode), optionNode, value, matchNormalizer));
      } else {
        return matcher(node.value, node, value, matchNormalizer);
      }
    });
  };
  const getMultipleError$4 = (c, value) => "Found multiple elements with the display value: " + value + ".";
  const getMissingError$4 = (c, value) => "Unable to find an element with the display value: " + value + ".";
  const queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, "queryAll");
  const [queryByDisplayValue, getAllByDisplayValue, getByDisplayValue, findAllByDisplayValue, findByDisplayValue] = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4);
  const VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;
  const queryAllByAltText = function(container, alt, options) {
    if (options === void 0) {
      options = {};
    }
    checkContainerType$1(container);
    return queryAllByAttribute("alt", container, alt, options).filter((node) => VALID_TAG_REGEXP.test(node.tagName));
  };
  const getMultipleError$3 = (c, alt) => "Found multiple elements with the alt text: " + alt;
  const getMissingError$3 = (c, alt) => "Unable to find an element with the alt text: " + alt;
  const queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, "queryAll");
  const [queryByAltText, getAllByAltText, getByAltText, findAllByAltText, findByAltText] = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3);
  const isSvgTitle = (node) => {
    var _node$parentElement;
    return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
  };
  const queryAllByTitle = function(container, text, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType$1(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("[title], svg > title")).filter((node) => matcher(node.getAttribute("title"), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer));
  };
  const getMultipleError$2 = (c, title) => "Found multiple elements with the title: " + title + ".";
  const getMissingError$2 = (c, title) => "Unable to find an element with the title: " + title + ".";
  const queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, "queryAll");
  const [queryByTitle, getAllByTitle, getByTitle, findAllByTitle, findByTitle] = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2);
  function queryAllByRole(container, role2, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      hidden = getConfig().defaultHidden,
      name,
      description,
      trim,
      normalizer,
      queryFallbacks = false,
      selected,
      checked,
      pressed,
      current,
      level,
      expanded
    } = _temp === void 0 ? {} : _temp;
    checkContainerType$1(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    if (selected !== void 0) {
      var _allRoles$get;
      if (((_allRoles$get = roles_1.get(role2)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) {
        throw new Error('"aria-selected" is not supported on role "' + role2 + '".');
      }
    }
    if (checked !== void 0) {
      var _allRoles$get2;
      if (((_allRoles$get2 = roles_1.get(role2)) == null ? void 0 : _allRoles$get2.props["aria-checked"]) === void 0) {
        throw new Error('"aria-checked" is not supported on role "' + role2 + '".');
      }
    }
    if (pressed !== void 0) {
      var _allRoles$get3;
      if (((_allRoles$get3 = roles_1.get(role2)) == null ? void 0 : _allRoles$get3.props["aria-pressed"]) === void 0) {
        throw new Error('"aria-pressed" is not supported on role "' + role2 + '".');
      }
    }
    if (current !== void 0) {
      var _allRoles$get4;
      if (((_allRoles$get4 = roles_1.get(role2)) == null ? void 0 : _allRoles$get4.props["aria-current"]) === void 0) {
        throw new Error('"aria-current" is not supported on role "' + role2 + '".');
      }
    }
    if (level !== void 0) {
      if (role2 !== "heading") {
        throw new Error('Role "' + role2 + '" cannot have "level" property.');
      }
    }
    if (expanded !== void 0) {
      var _allRoles$get5;
      if (((_allRoles$get5 = roles_1.get(role2)) == null ? void 0 : _allRoles$get5.props["aria-expanded"]) === void 0) {
        throw new Error('"aria-expanded" is not supported on role "' + role2 + '".');
      }
    }
    const subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
    function cachedIsSubtreeInaccessible(element) {
      if (!subtreeIsInaccessibleCache.has(element)) {
        subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
      }
      return subtreeIsInaccessibleCache.get(element);
    }
    return Array.from(container.querySelectorAll(
      // Only query elements that can be matched by the following filters
      makeRoleSelector(role2, exact, normalizer ? matchNormalizer : void 0)
    )).filter((node) => {
      const isRoleSpecifiedExplicitly = node.hasAttribute("role");
      if (isRoleSpecifiedExplicitly) {
        const roleValue = node.getAttribute("role");
        if (queryFallbacks) {
          return roleValue.split(" ").filter(Boolean).some((text) => matcher(text, node, role2, matchNormalizer));
        }
        if (normalizer) {
          return matcher(roleValue, node, role2, matchNormalizer);
        }
        const [firstWord] = roleValue.split(" ");
        return matcher(firstWord, node, role2, matchNormalizer);
      }
      const implicitRoles = getImplicitAriaRoles(node);
      return implicitRoles.some((implicitRole) => matcher(implicitRole, node, role2, matchNormalizer));
    }).filter((element) => {
      if (selected !== void 0) {
        return selected === computeAriaSelected(element);
      }
      if (checked !== void 0) {
        return checked === computeAriaChecked(element);
      }
      if (pressed !== void 0) {
        return pressed === computeAriaPressed(element);
      }
      if (current !== void 0) {
        return current === computeAriaCurrent(element);
      }
      if (expanded !== void 0) {
        return expanded === computeAriaExpanded(element);
      }
      if (level !== void 0) {
        return level === computeHeadingLevel(element);
      }
      return true;
    }).filter((element) => {
      if (name === void 0) {
        return true;
      }
      return matches(computeAccessibleName(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }), element, name, (text) => text);
    }).filter((element) => {
      if (description === void 0) {
        return true;
      }
      return matches(computeAccessibleDescription(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }), element, description, (text) => text);
    }).filter((element) => {
      return hidden === false ? isInaccessible(element, {
        isSubtreeInaccessible: cachedIsSubtreeInaccessible
      }) === false : true;
    });
  }
  function makeRoleSelector(role2, exact, customNormalizer) {
    var _roleElements$get;
    if (typeof role2 !== "string") {
      return "*";
    }
    const explicitRoleSelector = exact && !customNormalizer ? '*[role~="' + role2 + '"]' : "*[role]";
    const roleRelations = (_roleElements$get = roleElements_1.get(role2)) != null ? _roleElements$get : /* @__PURE__ */ new Set();
    const implicitRoleSelectors = new Set(Array.from(roleRelations).map((_ref) => {
      let {
        name
      } = _ref;
      return name;
    }));
    return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
  }
  const getNameHint = (name) => {
    let nameHint = "";
    if (name === void 0) {
      nameHint = "";
    } else if (typeof name === "string") {
      nameHint = ' and name "' + name + '"';
    } else {
      nameHint = " and name `" + name + "`";
    }
    return nameHint;
  };
  const getMultipleError$1 = function(c, role2, _temp2) {
    let {
      name
    } = _temp2 === void 0 ? {} : _temp2;
    return 'Found multiple elements with the role "' + role2 + '"' + getNameHint(name);
  };
  const getMissingError$1 = function(container, role2, _temp3) {
    let {
      hidden = getConfig().defaultHidden,
      name,
      description
    } = _temp3 === void 0 ? {} : _temp3;
    if (getConfig()._disableExpensiveErrorDiagnostics) {
      return 'Unable to find role="' + role2 + '"' + getNameHint(name);
    }
    let roles2 = "";
    Array.from(container.children).forEach((childElement) => {
      roles2 += prettyRoles(childElement, {
        hidden,
        includeDescription: description !== void 0
      });
    });
    let roleMessage;
    if (roles2.length === 0) {
      if (hidden === false) {
        roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole";
      } else {
        roleMessage = "There are no available roles.";
      }
    } else {
      roleMessage = ("\nHere are the " + (hidden === false ? "accessible" : "available") + " roles:\n\n  " + roles2.replace(/\n/g, "\n  ").replace(/\n\s\s\n/g, "\n\n") + "\n").trim();
    }
    let nameHint = "";
    if (name === void 0) {
      nameHint = "";
    } else if (typeof name === "string") {
      nameHint = ' and name "' + name + '"';
    } else {
      nameHint = " and name `" + name + "`";
    }
    let descriptionHint = "";
    if (description === void 0) {
      descriptionHint = "";
    } else if (typeof description === "string") {
      descriptionHint = ' and description "' + description + '"';
    } else {
      descriptionHint = " and description `" + description + "`";
    }
    return ("\nUnable to find an " + (hidden === false ? "accessible " : "") + 'element with the role "' + role2 + '"' + nameHint + descriptionHint + "\n\n" + roleMessage).trim();
  };
  const queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, "queryAll");
  const [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1);
  const getTestIdAttribute = () => getConfig().testIdAttribute;
  const queryAllByTestId = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    checkContainerType$1(args[0]);
    return queryAllByAttribute(getTestIdAttribute(), ...args);
  };
  const getMultipleError = (c, id) => "Found multiple elements by: [" + getTestIdAttribute() + '="' + id + '"]';
  const getMissingError = (c, id) => "Unable to find an element by: [" + getTestIdAttribute() + '="' + id + '"]';
  const queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, "queryAll");
  const [queryByTestId, getAllByTestId, getByTestId, findAllByTestId, findByTestId] = buildQueries(queryAllByTestId, getMultipleError, getMissingError);
  var queries = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    queryAllByLabelText: queryAllByLabelTextWithSuggestions,
    queryByLabelText,
    getAllByLabelText: getAllByLabelTextWithSuggestions,
    getByLabelText: getByLabelTextWithSuggestions,
    findAllByLabelText,
    findByLabelText,
    queryByPlaceholderText,
    queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
    getByPlaceholderText,
    getAllByPlaceholderText,
    findAllByPlaceholderText,
    findByPlaceholderText,
    queryByText,
    queryAllByText: queryAllByTextWithSuggestions,
    getByText,
    getAllByText,
    findAllByText,
    findByText,
    queryByDisplayValue,
    queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
    getByDisplayValue,
    getAllByDisplayValue,
    findAllByDisplayValue,
    findByDisplayValue,
    queryByAltText,
    queryAllByAltText: queryAllByAltTextWithSuggestions,
    getByAltText,
    getAllByAltText,
    findAllByAltText,
    findByAltText,
    queryByTitle,
    queryAllByTitle: queryAllByTitleWithSuggestions,
    getByTitle,
    getAllByTitle,
    findAllByTitle,
    findByTitle,
    queryByRole,
    queryAllByRole: queryAllByRoleWithSuggestions,
    getAllByRole,
    getByRole,
    findAllByRole,
    findByRole,
    queryByTestId,
    queryAllByTestId: queryAllByTestIdWithSuggestions,
    getByTestId,
    getAllByTestId,
    findAllByTestId,
    findByTestId
  });
  function getQueriesForElement(element, queries$1, initialValue2) {
    if (queries$1 === void 0) {
      queries$1 = queries;
    }
    if (initialValue2 === void 0) {
      initialValue2 = {};
    }
    return Object.keys(queries$1).reduce((helpers2, key2) => {
      const fn = queries$1[key2];
      helpers2[key2] = fn.bind(null, element);
      return helpers2;
    }, initialValue2);
  }
  const isRemoved = (result) => !result || Array.isArray(result) && !result.length;
  function initialCheck(elements) {
    if (isRemoved(elements)) {
      throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
    }
  }
  async function waitForElementToBeRemoved(callback, options) {
    const timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
    if (typeof callback !== "function") {
      initialCheck(callback);
      const elements = Array.isArray(callback) ? callback : [callback];
      const getRemainingElements = elements.map((element) => {
        let parent = element.parentElement;
        if (parent === null) return () => null;
        while (parent.parentElement) parent = parent.parentElement;
        return () => parent.contains(element) ? element : null;
      });
      callback = () => getRemainingElements.map((c) => c()).filter(Boolean);
    }
    initialCheck(callback());
    return waitForWrapper(() => {
      let result;
      try {
        result = callback();
      } catch (error) {
        if (error.name === "TestingLibraryElementError") {
          return void 0;
        }
        throw error;
      }
      if (!isRemoved(result)) {
        throw timeoutError;
      }
      return void 0;
    }, options);
  }
  const eventMap$2 = {
    // Clipboard Events
    copy: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    cut: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    paste: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Composition Events
    compositionEnd: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionStart: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionUpdate: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Keyboard Events
    keyDown: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyPress: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyUp: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    // Focus Events
    focus: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    blur: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    focusIn: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    focusOut: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // Form Events
    change: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    input: {
      EventType: "InputEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    invalid: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: true
      }
    },
    submit: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    reset: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Mouse Events
    click: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        button: 0,
        composed: true
      }
    },
    contextMenu: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dblClick: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drag: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragEnd: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragEnter: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragExit: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragLeave: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragOver: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragStart: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drop: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseDown: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseEnter: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseLeave: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseMove: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOut: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOver: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseUp: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Selection Events
    select: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Touch Events
    touchCancel: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    touchEnd: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchMove: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchStart: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // UI Events
    resize: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    scroll: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Wheel Events
    wheel: {
      EventType: "WheelEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Media Events
    abort: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlay: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlayThrough: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    durationChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    emptied: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    encrypted: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    ended: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedData: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedMetadata: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadStart: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pause: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    play: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    playing: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    progress: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    rateChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeked: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeking: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    stalled: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    suspend: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    timeUpdate: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    volumeChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    waiting: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Events
    load: {
      // TODO: load events can be UIEvent or Event depending on what generated them
      // This is where this abstraction breaks down.
      // But the common targets are <img />, <script /> and window.
      // Neither of these targets receive a UIEvent
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    error: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Animation Events
    animationStart: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationEnd: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationIteration: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Transition Events
    transitionCancel: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionEnd: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    transitionRun: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionStart: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // pointer events
    pointerOver: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerEnter: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pointerDown: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerMove: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerUp: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerCancel: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    pointerOut: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerLeave: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    gotPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    lostPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // history events
    popState: {
      EventType: "PopStateEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // window events
    offline: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    online: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    }
  };
  const eventAliasMap$1 = {
    doubleClick: "dblClick"
  };
  function fireEvent$1(element, event) {
    return getConfig().eventWrapper(() => {
      if (!event) {
        throw new Error("Unable to fire an event - please provide an event object.");
      }
      if (!element) {
        throw new Error('Unable to fire a "' + event.type + '" event - please provide a DOM element.');
      }
      return element.dispatchEvent(event);
    });
  }
  function createEvent(eventName, node, init, _temp) {
    let {
      EventType = "Event",
      defaultInit = {}
    } = _temp === void 0 ? {} : _temp;
    if (!node) {
      throw new Error('Unable to fire a "' + eventName + '" event - please provide a DOM element.');
    }
    const eventInit = {
      ...defaultInit,
      ...init
    };
    const {
      target: {
        value,
        files,
        ...targetProperties
      } = {}
    } = eventInit;
    if (value !== void 0) {
      setNativeValue(node, value);
    }
    if (files !== void 0) {
      Object.defineProperty(node, "files", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: files
      });
    }
    Object.assign(node, targetProperties);
    const window2 = getWindowFromNode$1(node);
    const EventConstructor = window2[EventType] || window2.Event;
    let event;
    if (typeof EventConstructor === "function") {
      event = new EventConstructor(eventName, eventInit);
    } else {
      event = window2.document.createEvent(EventType);
      const {
        bubbles,
        cancelable,
        detail,
        ...otherInit
      } = eventInit;
      event.initEvent(eventName, bubbles, cancelable, detail);
      Object.keys(otherInit).forEach((eventKey) => {
        event[eventKey] = otherInit[eventKey];
      });
    }
    const dataTransferProperties = ["dataTransfer", "clipboardData"];
    dataTransferProperties.forEach((dataTransferKey) => {
      const dataTransferValue = eventInit[dataTransferKey];
      if (typeof dataTransferValue === "object") {
        if (typeof window2.DataTransfer === "function") {
          Object.defineProperty(event, dataTransferKey, {
            value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => {
              Object.defineProperty(acc, propName, {
                value: dataTransferValue[propName]
              });
              return acc;
            }, new window2.DataTransfer())
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
  Object.keys(eventMap$2).forEach((key2) => {
    const {
      EventType,
      defaultInit
    } = eventMap$2[key2];
    const eventName = key2.toLowerCase();
    createEvent[key2] = (node, init) => createEvent(eventName, node, init, {
      EventType,
      defaultInit
    });
    fireEvent$1[key2] = (node, init) => fireEvent$1(node, createEvent[key2](node, init));
  });
  function setNativeValue(element, value) {
    const {
      set: valueSetter
    } = Object.getOwnPropertyDescriptor(element, "value") || {};
    const prototype = Object.getPrototypeOf(element);
    const {
      set: prototypeValueSetter
    } = Object.getOwnPropertyDescriptor(prototype, "value") || {};
    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        throw new Error("The given element does not have a value setter");
      }
    }
  }
  Object.keys(eventAliasMap$1).forEach((aliasKey) => {
    const key2 = eventAliasMap$1[aliasKey];
    fireEvent$1[aliasKey] = function() {
      return fireEvent$1[key2](...arguments);
    };
  });
  function unindent(string) {
    return string.replace(/[ \t]*[\n][ \t]*/g, "\n");
  }
  function encode(value) {
    return lzString.compressToEncodedURIComponent(unindent(value));
  }
  function getPlaygroundUrl(markup2) {
    return "https://testing-playground.com/#markup=" + encode(markup2);
  }
  const debug = (element, maxLength2, options) => Array.isArray(element) ? element.forEach((el) => logDOM(el, maxLength2, options)) : logDOM(element, maxLength2, options);
  const logTestingPlaygroundURL = function(element) {
    if (element === void 0) {
      element = getDocument$1().body;
    }
    if (!element || !("innerHTML" in element)) {
      console.log("The element you're providing isn't a valid DOM element.");
      return;
    }
    if (!element.innerHTML) {
      console.log("The provided element doesn't have any children.");
      return;
    }
    const playgroundUrl = getPlaygroundUrl(element.innerHTML);
    console.log("Open this URL in your browser\n\n" + playgroundUrl);
    return playgroundUrl;
  };
  const initialValue = {
    debug,
    logTestingPlaygroundURL
  };
  const screen = typeof document !== "undefined" && document.body ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce((helpers2, key2) => {
    helpers2[key2] = () => {
      throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
    };
    return helpers2;
  }, initialValue);
  const dom_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    buildQueries,
    configure,
    createEvent,
    findAllByAltText,
    findAllByDisplayValue,
    findAllByLabelText,
    findAllByPlaceholderText,
    findAllByRole,
    findAllByTestId,
    findAllByText,
    findAllByTitle,
    findByAltText,
    findByDisplayValue,
    findByLabelText,
    findByPlaceholderText,
    findByRole,
    findByTestId,
    findByText,
    findByTitle,
    fireEvent: fireEvent$1,
    getAllByAltText,
    getAllByDisplayValue,
    getAllByLabelText: getAllByLabelTextWithSuggestions,
    getAllByPlaceholderText,
    getAllByRole,
    getAllByTestId,
    getAllByText,
    getAllByTitle,
    getByAltText,
    getByDisplayValue,
    getByLabelText: getByLabelTextWithSuggestions,
    getByPlaceholderText,
    getByRole,
    getByTestId,
    getByText,
    getByTitle,
    getConfig,
    getDefaultNormalizer,
    getElementError,
    getMultipleElementsFoundError,
    getNodeText,
    getQueriesForElement,
    getRoles,
    getSuggestedQuery,
    isInaccessible,
    logDOM,
    logRoles,
    makeFindQuery,
    makeGetAllQuery,
    makeSingleQuery,
    prettyDOM,
    prettyFormat: index$1,
    queries,
    queryAllByAltText: queryAllByAltTextWithSuggestions,
    queryAllByAttribute,
    queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
    queryAllByLabelText: queryAllByLabelTextWithSuggestions,
    queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
    queryAllByRole: queryAllByRoleWithSuggestions,
    queryAllByTestId: queryAllByTestIdWithSuggestions,
    queryAllByText: queryAllByTextWithSuggestions,
    queryAllByTitle: queryAllByTitleWithSuggestions,
    queryByAltText,
    queryByAttribute,
    queryByDisplayValue,
    queryByLabelText,
    queryByPlaceholderText,
    queryByRole,
    queryByTestId,
    queryByText,
    queryByTitle,
    queryHelpers,
    screen,
    waitFor: waitForWrapper,
    waitForElementToBeRemoved,
    within: getQueriesForElement,
    wrapAllByQueryWithSuggestion,
    wrapSingleQueryWithSuggestion
  }, Symbol.toStringTag, { value: "Module" }));
  const domAct = testUtilsExports.act;
  function getGlobalThis() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    throw new Error("unable to locate global object");
  }
  function setIsReactActEnvironment(isReactActEnvironment) {
    getGlobalThis().IS_REACT_ACT_ENVIRONMENT = isReactActEnvironment;
  }
  function getIsReactActEnvironment() {
    return getGlobalThis().IS_REACT_ACT_ENVIRONMENT;
  }
  function withGlobalActEnvironment(actImplementation) {
    return (callback) => {
      const previousActEnvironment = getIsReactActEnvironment();
      setIsReactActEnvironment(true);
      try {
        let callbackNeedsToBeAwaited = false;
        const actResult = actImplementation(() => {
          const result = callback();
          if (result !== null && typeof result === "object" && typeof result.then === "function") {
            callbackNeedsToBeAwaited = true;
          }
          return result;
        });
        if (callbackNeedsToBeAwaited) {
          const thenable = actResult;
          return {
            then: (resolve, reject) => {
              thenable.then((returnValue) => {
                setIsReactActEnvironment(previousActEnvironment);
                resolve(returnValue);
              }, (error) => {
                setIsReactActEnvironment(previousActEnvironment);
                reject(error);
              });
            }
          };
        } else {
          setIsReactActEnvironment(previousActEnvironment);
          return actResult;
        }
      } catch (error) {
        setIsReactActEnvironment(previousActEnvironment);
        throw error;
      }
    };
  }
  const act = withGlobalActEnvironment(domAct);
  const fireEvent = function() {
    return fireEvent$1(...arguments);
  };
  Object.keys(fireEvent$1).forEach((key2) => {
    fireEvent[key2] = function() {
      return fireEvent$1[key2](...arguments);
    };
  });
  const mouseEnter = fireEvent.mouseEnter;
  const mouseLeave = fireEvent.mouseLeave;
  fireEvent.mouseEnter = function() {
    mouseEnter(...arguments);
    return fireEvent.mouseOver(...arguments);
  };
  fireEvent.mouseLeave = function() {
    mouseLeave(...arguments);
    return fireEvent.mouseOut(...arguments);
  };
  const pointerEnter = fireEvent.pointerEnter;
  const pointerLeave = fireEvent.pointerLeave;
  fireEvent.pointerEnter = function() {
    pointerEnter(...arguments);
    return fireEvent.pointerOver(...arguments);
  };
  fireEvent.pointerLeave = function() {
    pointerLeave(...arguments);
    return fireEvent.pointerOut(...arguments);
  };
  const select = fireEvent.select;
  fireEvent.select = (node, init) => {
    select(node, init);
    node.focus();
    fireEvent.keyUp(node, init);
  };
  const blur$2 = fireEvent.blur;
  const focus$2 = fireEvent.focus;
  fireEvent.blur = function() {
    fireEvent.focusOut(...arguments);
    return blur$2(...arguments);
  };
  fireEvent.focus = function() {
    fireEvent.focusIn(...arguments);
    return focus$2(...arguments);
  };
  configure({
    unstable_advanceTimersWrapper: (cb) => {
      return act(cb);
    },
    // We just want to run `waitFor` without IS_REACT_ACT_ENVIRONMENT
    // But that's not necessarily how `asyncWrapper` is used since it's a public method.
    // Let's just hope nobody else is using it.
    asyncWrapper: async (cb) => {
      const previousActEnvironment = getIsReactActEnvironment();
      setIsReactActEnvironment(false);
      try {
        return await cb();
      } finally {
        setIsReactActEnvironment(previousActEnvironment);
      }
    },
    eventWrapper: (cb) => {
      let result;
      act(() => {
        result = cb();
      });
      return result;
    }
  });
  const mountedContainers = /* @__PURE__ */ new Set();
  const mountedRootEntries = [];
  function createConcurrentRoot(container, _ref) {
    let {
      hydrate,
      ui,
      wrapper: WrapperComponent
    } = _ref;
    let root;
    if (hydrate) {
      act(() => {
        root = hydrateRoot(container, WrapperComponent ? /* @__PURE__ */ React__namespace.createElement(WrapperComponent, null, ui) : ui);
      });
    } else {
      root = createRoot(container);
    }
    return {
      hydrate() {
        if (!hydrate) {
          throw new Error("Attempted to hydrate a non-hydrateable root. This is a bug in `@testing-library/react`.");
        }
      },
      render(element) {
        root.render(element);
      },
      unmount() {
        root.unmount();
      }
    };
  }
  function createLegacyRoot(container) {
    return {
      hydrate(element) {
        ReactDOM.hydrate(element, container);
      },
      render(element) {
        ReactDOM.render(element, container);
      },
      unmount() {
        ReactDOM.unmountComponentAtNode(container);
      }
    };
  }
  function renderRoot(ui, _ref2) {
    let {
      baseElement,
      container,
      hydrate,
      queries: queries2,
      root,
      wrapper: WrapperComponent
    } = _ref2;
    const wrapUiIfNeeded = (innerElement) => WrapperComponent ? /* @__PURE__ */ React__namespace.createElement(WrapperComponent, null, innerElement) : innerElement;
    act(() => {
      if (hydrate) {
        root.hydrate(wrapUiIfNeeded(ui), container);
      } else {
        root.render(wrapUiIfNeeded(ui), container);
      }
    });
    return {
      container,
      baseElement,
      debug: function(el, maxLength2, options) {
        if (el === void 0) {
          el = baseElement;
        }
        return Array.isArray(el) ? (
          // eslint-disable-next-line no-console
          el.forEach((e) => console.log(prettyDOM(e, maxLength2, options)))
        ) : (
          // eslint-disable-next-line no-console,
          console.log(prettyDOM(el, maxLength2, options))
        );
      },
      unmount: () => {
        act(() => {
          root.unmount();
        });
      },
      rerender: (rerenderUi) => {
        renderRoot(wrapUiIfNeeded(rerenderUi), {
          container,
          baseElement,
          root
        });
      },
      asFragment: () => {
        if (typeof document.createRange === "function") {
          return document.createRange().createContextualFragment(container.innerHTML);
        } else {
          const template = document.createElement("template");
          template.innerHTML = container.innerHTML;
          return template.content;
        }
      },
      ...getQueriesForElement(baseElement, queries2)
    };
  }
  function render(ui, _temp) {
    let {
      container,
      baseElement = container,
      legacyRoot = false,
      queries: queries2,
      hydrate = false,
      wrapper
    } = _temp === void 0 ? {} : _temp;
    if (!baseElement) {
      baseElement = document.body;
    }
    if (!container) {
      container = baseElement.appendChild(document.createElement("div"));
    }
    let root;
    if (!mountedContainers.has(container)) {
      const createRootImpl = legacyRoot ? createLegacyRoot : createConcurrentRoot;
      root = createRootImpl(container, {
        hydrate,
        ui,
        wrapper
      });
      mountedRootEntries.push({
        container,
        root
      });
      mountedContainers.add(container);
    } else {
      mountedRootEntries.forEach((rootEntry) => {
        if (rootEntry.container === container) {
          root = rootEntry.root;
        }
      });
    }
    return renderRoot(ui, {
      container,
      baseElement,
      queries: queries2,
      hydrate,
      wrapper,
      root
    });
  }
  function cleanup() {
    mountedRootEntries.forEach((_ref3) => {
      let {
        root,
        container
      } = _ref3;
      act(() => {
        root.unmount();
      });
      if (container.parentNode === document.body) {
        document.body.removeChild(container);
      }
    });
    mountedRootEntries.length = 0;
    mountedContainers.clear();
  }
  function renderHook(renderCallback, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      initialProps,
      ...renderOptions
    } = options;
    const result = /* @__PURE__ */ React__namespace.createRef();
    function TestComponent(_ref4) {
      let {
        renderCallbackProps
      } = _ref4;
      const pendingResult = renderCallback(renderCallbackProps);
      React__namespace.useEffect(() => {
        result.current = pendingResult;
      });
      return null;
    }
    const {
      rerender: baseRerender,
      unmount
    } = render(/* @__PURE__ */ React__namespace.createElement(TestComponent, {
      renderCallbackProps: initialProps
    }), renderOptions);
    function rerender(rerenderCallbackProps) {
      return baseRerender(/* @__PURE__ */ React__namespace.createElement(TestComponent, {
        renderCallbackProps: rerenderCallbackProps
      }));
    }
    return {
      result,
      rerender,
      unmount
    };
  }
  var _process$env;
  if (typeof process === "undefined" || !((_process$env = process.env) != null && _process$env.RTL_SKIP_AUTO_CLEANUP)) {
    if (typeof afterEach === "function") {
      afterEach(() => {
        cleanup();
      });
    } else if (typeof teardown === "function") {
      teardown(() => {
        cleanup();
      });
    }
    if (typeof beforeAll === "function" && typeof afterAll === "function") {
      let previousIsReactActEnvironment = getIsReactActEnvironment();
      beforeAll(() => {
        previousIsReactActEnvironment = getIsReactActEnvironment();
        setIsReactActEnvironment(true);
      });
      afterAll(() => {
        setIsReactActEnvironment(previousIsReactActEnvironment);
      });
    }
  }
  const buildTestingLibraryElementError = function(message) {
    const err = new Error(message);
    err.name = "TestingLibraryElementError";
    return err;
  };
  const buildJsGetElementError = function(message, container) {
    const prettyDOMRegex = new RegExp("(?<=[\\s\\S]*)\\s*<\\w+>[\\s\\S]+", "gm");
    const newMessage = (message == null ? void 0 : message.replace(prettyDOMRegex, "")) ?? "";
    const prettyDomOutput = prettyDOM(container);
    return buildTestingLibraryElementError([newMessage, prettyDomOutput].filter(Boolean).join("\n\n"));
  };
  var dist = {};
  var click$1 = {};
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(dom_esm);
  var utils = {};
  var getMouseEventOptions$1 = {};
  Object.defineProperty(getMouseEventOptions$1, "__esModule", {
    value: true
  });
  getMouseEventOptions$1.getMouseEventOptions = getMouseEventOptions;
  function isMousePressEvent(event) {
    return event === "mousedown" || event === "mouseup" || event === "click" || event === "dblclick";
  }
  const BUTTONS_NAMES = {
    none: 0,
    primary: 1,
    secondary: 2,
    auxiliary: 4
  };
  const BUTTON_NAMES = {
    primary: 0,
    auxiliary: 1,
    secondary: 2
  };
  function translateButtonNumber(value, from) {
    var _Object$entries$find;
    const [mapIn, mapOut] = from === "button" ? [BUTTON_NAMES, BUTTONS_NAMES] : [BUTTONS_NAMES, BUTTON_NAMES];
    const name = (_Object$entries$find = Object.entries(mapIn).find(([, i2]) => i2 === value)) == null ? void 0 : _Object$entries$find[0];
    return name && Object.prototype.hasOwnProperty.call(mapOut, name) ? mapOut[name] : 0;
  }
  function convertMouseButtons(event, init, property) {
    if (!isMousePressEvent(event)) {
      return 0;
    }
    if (typeof init[property] === "number") {
      return init[property];
    } else if (property === "button" && typeof init.buttons === "number") {
      return translateButtonNumber(init.buttons, "buttons");
    } else if (property === "buttons" && typeof init.button === "number") {
      return translateButtonNumber(init.button, "button");
    }
    return property != "button" && isMousePressEvent(event) ? 1 : 0;
  }
  function getMouseEventOptions(event, init, clickCount = 0) {
    var _init;
    init = (_init = init) != null ? _init : {};
    return {
      ...init,
      // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
      detail: event === "mousedown" || event === "mouseup" || event === "click" ? 1 + clickCount : clickCount,
      buttons: convertMouseButtons(event, init, "buttons"),
      button: convertMouseButtons(event, init, "button")
    };
  }
  var isClickableInput$1 = {};
  var isElementType$1 = {};
  Object.defineProperty(isElementType$1, "__esModule", {
    value: true
  });
  isElementType$1.isElementType = isElementType;
  function isElementType(element, tag, props) {
    if (element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml") {
      return false;
    }
    tag = Array.isArray(tag) ? tag : [tag];
    if (!tag.includes(element.tagName.toLowerCase())) {
      return false;
    }
    if (props) {
      return Object.entries(props).every(([k2, v]) => element[k2] === v);
    }
    return true;
  }
  Object.defineProperty(isClickableInput$1, "__esModule", {
    value: true
  });
  isClickableInput$1.isClickableInput = isClickableInput;
  var _isElementType$5 = isElementType$1;
  const CLICKABLE_INPUT_TYPES = ["button", "color", "file", "image", "reset", "submit", "checkbox", "radio"];
  function isClickableInput(element) {
    return (0, _isElementType$5.isElementType)(element, "button") || (0, _isElementType$5.isElementType)(element, "input") && CLICKABLE_INPUT_TYPES.includes(element.type);
  }
  var buildTimeValue$1 = {};
  Object.defineProperty(buildTimeValue$1, "__esModule", {
    value: true
  });
  buildTimeValue$1.buildTimeValue = buildTimeValue;
  function buildTimeValue(value) {
    const onlyDigitsValue = value.replace(/\D/g, "");
    if (onlyDigitsValue.length < 2) {
      return value;
    }
    const firstDigit = parseInt(onlyDigitsValue[0], 10);
    const secondDigit = parseInt(onlyDigitsValue[1], 10);
    if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
      let index2;
      if (firstDigit >= 3) {
        index2 = 1;
      } else {
        index2 = 2;
      }
      return build(onlyDigitsValue, index2);
    }
    if (value.length === 2) {
      return value;
    }
    return build(onlyDigitsValue, 2);
  }
  function build(onlyDigitsValue, index2) {
    const hours = onlyDigitsValue.slice(0, index2);
    const validHours = Math.min(parseInt(hours, 10), 23);
    const minuteCharacters = onlyDigitsValue.slice(index2);
    const parsedMinutes = parseInt(minuteCharacters, 10);
    const validMinutes = Math.min(parsedMinutes, 59);
    return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
  }
  var calculateNewValue$1 = {};
  var selectionRange = {};
  Object.defineProperty(selectionRange, "__esModule", {
    value: true
  });
  selectionRange.getSelectionRange = getSelectionRange;
  selectionRange.hasSelectionSupport = hasSelectionSupport;
  selectionRange.setSelectionRange = setSelectionRange;
  var _isElementType$4 = isElementType$1;
  var selectionSupportType;
  (function(selectionSupportType2) {
    selectionSupportType2["text"] = "text";
    selectionSupportType2["search"] = "search";
    selectionSupportType2["url"] = "url";
    selectionSupportType2["tel"] = "tel";
    selectionSupportType2["password"] = "password";
  })(selectionSupportType || (selectionSupportType = {}));
  const InputSelection = Symbol("inputSelection");
  function hasSelectionSupport(element) {
    return (0, _isElementType$4.isElementType)(element, "textarea") || (0, _isElementType$4.isElementType)(element, "input") && Boolean(selectionSupportType[element.type]);
  }
  function getSelectionRange(element) {
    if (hasSelectionSupport(element)) {
      return {
        selectionStart: element.selectionStart,
        selectionEnd: element.selectionEnd
      };
    }
    if ((0, _isElementType$4.isElementType)(element, "input")) {
      var _InputSelection;
      return (_InputSelection = element[InputSelection]) != null ? _InputSelection : {
        selectionStart: null,
        selectionEnd: null
      };
    }
    const selection = element.ownerDocument.getSelection();
    if (selection != null && selection.rangeCount && element.contains(selection.focusNode)) {
      const range2 = selection.getRangeAt(0);
      return {
        selectionStart: range2.startOffset,
        selectionEnd: range2.endOffset
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
    if ((0, _isElementType$4.isElementType)(element, "input")) {
      element[InputSelection] = {
        selectionStart: newSelectionStart,
        selectionEnd: newSelectionEnd
      };
    }
    if ((0, _isElementType$4.isElementType)(element, "input") || (0, _isElementType$4.isElementType)(element, "textarea")) {
      return;
    }
    const range2 = element.ownerDocument.createRange();
    range2.selectNodeContents(element);
    if (element.firstChild) {
      range2.setStart(element.firstChild, newSelectionStart);
      range2.setEnd(element.firstChild, newSelectionEnd);
    }
    const selection = element.ownerDocument.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range2);
    }
  }
  var getValue$1 = {};
  var isContentEditable$1 = {};
  Object.defineProperty(isContentEditable$1, "__esModule", {
    value: true
  });
  isContentEditable$1.isContentEditable = isContentEditable;
  function isContentEditable(element) {
    return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
  }
  Object.defineProperty(getValue$1, "__esModule", {
    value: true
  });
  getValue$1.getValue = getValue;
  var _isContentEditable$1 = isContentEditable$1;
  function getValue(element) {
    if (!element) {
      return null;
    }
    if ((0, _isContentEditable$1.isContentEditable)(element)) {
      return element.textContent;
    }
    return element.value;
  }
  var isValidDateValue$1 = {};
  Object.defineProperty(isValidDateValue$1, "__esModule", {
    value: true
  });
  isValidDateValue$1.isValidDateValue = isValidDateValue;
  function isValidDateValue(element, value) {
    const clone = element.cloneNode();
    clone.value = value;
    return clone.value === value;
  }
  var isValidInputTimeValue$1 = {};
  Object.defineProperty(isValidInputTimeValue$1, "__esModule", {
    value: true
  });
  isValidInputTimeValue$1.isValidInputTimeValue = isValidInputTimeValue;
  function isValidInputTimeValue(element, timeValue) {
    const clone = element.cloneNode();
    clone.value = timeValue;
    return clone.value === timeValue;
  }
  Object.defineProperty(calculateNewValue$1, "__esModule", {
    value: true
  });
  calculateNewValue$1.calculateNewValue = calculateNewValue;
  var _selectionRange$1 = selectionRange;
  var _getValue2$1 = getValue$1;
  var _isValidDateValue = isValidDateValue$1;
  var _isValidInputTimeValue = isValidInputTimeValue$1;
  function calculateNewValue(newEntry, element, value = (() => {
    var _getValue3;
    return (_getValue3 = (0, _getValue2$1.getValue)(element)) != null ? _getValue3 : (
      /* istanbul ignore next */
      ""
    );
  })(), selectionRange2 = (0, _selectionRange$1.getSelectionRange)(element), deleteContent) {
    const selectionStart = selectionRange2.selectionStart === null ? value.length : selectionRange2.selectionStart;
    const selectionEnd = selectionRange2.selectionEnd === null ? value.length : selectionRange2.selectionEnd;
    const prologEnd = Math.max(0, selectionStart === selectionEnd && deleteContent === "backward" ? selectionStart - 1 : selectionStart);
    const prolog = value.substring(0, prologEnd);
    const epilogStart = Math.min(value.length, selectionStart === selectionEnd && deleteContent === "forward" ? selectionEnd + 1 : selectionEnd);
    const epilog = value.substring(epilogStart, value.length);
    let newValue = `${prolog}${newEntry}${epilog}`;
    const newSelectionStart = prologEnd + newEntry.length;
    if (element.type === "date" && !(0, _isValidDateValue.isValidDateValue)(element, newValue)) {
      newValue = value;
    }
    if (element.type === "time" && !(0, _isValidInputTimeValue.isValidInputTimeValue)(element, newValue)) {
      if ((0, _isValidInputTimeValue.isValidInputTimeValue)(element, newEntry)) {
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
  var cursorPosition = {};
  Object.defineProperty(cursorPosition, "__esModule", {
    value: true
  });
  cursorPosition.isCursorAtEnd = isCursorAtEnd;
  cursorPosition.isCursorAtStart = isCursorAtStart;
  var _selectionRange = selectionRange;
  var _getValue2 = getValue$1;
  function isCursorAtEnd(element) {
    var _getValue3;
    const {
      selectionStart,
      selectionEnd
    } = (0, _selectionRange.getSelectionRange)(element);
    return selectionStart === selectionEnd && (selectionStart != null ? selectionStart : (
      /* istanbul ignore next */
      0
    )) === ((_getValue3 = (0, _getValue2.getValue)(element)) != null ? _getValue3 : (
      /* istanbul ignore next */
      ""
    )).length;
  }
  function isCursorAtStart(element) {
    const {
      selectionStart,
      selectionEnd
    } = (0, _selectionRange.getSelectionRange)(element);
    return selectionStart === selectionEnd && (selectionStart != null ? selectionStart : (
      /* istanbul ignore next */
      0
    )) === 0;
  }
  var hasUnreliableEmptyValue$1 = {};
  Object.defineProperty(hasUnreliableEmptyValue$1, "__esModule", {
    value: true
  });
  hasUnreliableEmptyValue$1.hasUnreliableEmptyValue = hasUnreliableEmptyValue;
  var _isElementType$3 = isElementType$1;
  var unreliableValueInputTypes;
  (function(unreliableValueInputTypes2) {
    unreliableValueInputTypes2["number"] = "number";
  })(unreliableValueInputTypes || (unreliableValueInputTypes = {}));
  function hasUnreliableEmptyValue(element) {
    return (0, _isElementType$3.isElementType)(element, "input") && Boolean(unreliableValueInputTypes[element.type]);
  }
  var isEditable$1 = {};
  Object.defineProperty(isEditable$1, "__esModule", {
    value: true
  });
  isEditable$1.editableInputTypes = void 0;
  isEditable$1.isEditable = isEditable;
  isEditable$1.isEditableInput = isEditableInput;
  var _isElementType$2 = isElementType$1;
  var _isContentEditable = isContentEditable$1;
  function isEditable(element) {
    return isEditableInput(element) || (0, _isElementType$2.isElementType)(element, "textarea", {
      readOnly: false
    }) || (0, _isContentEditable.isContentEditable)(element);
  }
  let editableInputTypes;
  isEditable$1.editableInputTypes = editableInputTypes;
  (function(editableInputTypes2) {
    editableInputTypes2["text"] = "text";
    editableInputTypes2["date"] = "date";
    editableInputTypes2["datetime-local"] = "datetime-local";
    editableInputTypes2["email"] = "email";
    editableInputTypes2["month"] = "month";
    editableInputTypes2["number"] = "number";
    editableInputTypes2["password"] = "password";
    editableInputTypes2["search"] = "search";
    editableInputTypes2["tel"] = "tel";
    editableInputTypes2["time"] = "time";
    editableInputTypes2["url"] = "url";
    editableInputTypes2["week"] = "week";
  })(editableInputTypes || (isEditable$1.editableInputTypes = editableInputTypes = {}));
  function isEditableInput(element) {
    return (0, _isElementType$2.isElementType)(element, "input", {
      readOnly: false
    }) && Boolean(editableInputTypes[element.type]);
  }
  var maxLength = {};
  Object.defineProperty(maxLength, "__esModule", {
    value: true
  });
  maxLength.getSpaceUntilMaxLength = getSpaceUntilMaxLength;
  var _isElementType$1 = isElementType$1;
  var _getValue = getValue$1;
  var maxLengthSupportedTypes;
  (function(maxLengthSupportedTypes2) {
    maxLengthSupportedTypes2["email"] = "email";
    maxLengthSupportedTypes2["password"] = "password";
    maxLengthSupportedTypes2["search"] = "search";
    maxLengthSupportedTypes2["telephone"] = "telephone";
    maxLengthSupportedTypes2["text"] = "text";
    maxLengthSupportedTypes2["url"] = "url";
  })(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));
  function getSpaceUntilMaxLength(element) {
    const value = (0, _getValue.getValue)(element);
    if (value === null) {
      return void 0;
    }
    const maxLength2 = getSanitizedMaxLength(element);
    return maxLength2 ? maxLength2 - value.length : void 0;
  }
  function getSanitizedMaxLength(element) {
    var _element$getAttribute;
    if (!supportsMaxLength(element)) {
      return void 0;
    }
    const attr = (_element$getAttribute = element.getAttribute("maxlength")) != null ? _element$getAttribute : "";
    return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
  }
  function supportsMaxLength(element) {
    return (0, _isElementType$1.isElementType)(element, "textarea") || (0, _isElementType$1.isElementType)(element, "input") && Boolean(maxLengthSupportedTypes[element.type]);
  }
  var getActiveElement$1 = {};
  var isDisabled$1 = {};
  Object.defineProperty(isDisabled$1, "__esModule", {
    value: true
  });
  isDisabled$1.isDisabled = isDisabled;
  function isDisabled(element) {
    return Boolean(element && element.disabled);
  }
  Object.defineProperty(getActiveElement$1, "__esModule", {
    value: true
  });
  getActiveElement$1.getActiveElement = getActiveElement;
  var _isDisabled$1 = isDisabled$1;
  function getActiveElement(document2) {
    const activeElement = document2.activeElement;
    if (activeElement != null && activeElement.shadowRoot) {
      return getActiveElement(activeElement.shadowRoot);
    } else {
      if ((0, _isDisabled$1.isDisabled)(activeElement)) {
        return document2.ownerDocument ? (
          // TODO: verify behavior in ShadowRoot
          /* istanbul ignore next */
          document2.ownerDocument.body
        ) : document2.body;
      }
      return activeElement;
    }
  }
  var isFocusable$1 = {};
  var isLabelWithInternallyDisabledControl$1 = {};
  Object.defineProperty(isLabelWithInternallyDisabledControl$1, "__esModule", {
    value: true
  });
  isLabelWithInternallyDisabledControl$1.isLabelWithInternallyDisabledControl = isLabelWithInternallyDisabledControl;
  var _isDisabled = isDisabled$1;
  var _isElementType = isElementType$1;
  function isLabelWithInternallyDisabledControl(element) {
    if (!(0, _isElementType.isElementType)(element, "label")) {
      return false;
    }
    const control2 = element.control;
    return Boolean(control2 && element.contains(control2) && (0, _isDisabled.isDisabled)(control2));
  }
  var selector = {};
  Object.defineProperty(selector, "__esModule", {
    value: true
  });
  selector.FOCUSABLE_SELECTOR = void 0;
  const FOCUSABLE_SELECTOR = ["input:not([type=hidden]):not([disabled])", "button:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[contenteditable=""]', '[contenteditable="true"]', "a[href]", "[tabindex]:not([disabled])"].join(", ");
  selector.FOCUSABLE_SELECTOR = FOCUSABLE_SELECTOR;
  Object.defineProperty(isFocusable$1, "__esModule", {
    value: true
  });
  isFocusable$1.isFocusable = isFocusable;
  var _isLabelWithInternallyDisabledControl = isLabelWithInternallyDisabledControl$1;
  var _selector = selector;
  function isFocusable(element) {
    return !(0, _isLabelWithInternallyDisabledControl.isLabelWithInternallyDisabledControl)(element) && element.matches(_selector.FOCUSABLE_SELECTOR);
  }
  var eventWrapper$1 = {};
  Object.defineProperty(eventWrapper$1, "__esModule", {
    value: true
  });
  eventWrapper$1.eventWrapper = eventWrapper;
  var _dom$c = require$$0;
  function eventWrapper(cb) {
    let result;
    (0, _dom$c.getConfig)().eventWrapper(() => {
      result = cb();
    });
    return result;
  }
  var isVisible$1 = {};
  var helpers = {};
  Object.defineProperty(helpers, "__esModule", {
    value: true
  });
  helpers.TEXT_NODE = void 0;
  helpers.checkContainerType = checkContainerType;
  helpers.getDocument = getDocument;
  helpers.getWindowFromNode = getWindowFromNode;
  helpers.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
  const TEXT_NODE = 3;
  helpers.TEXT_NODE = TEXT_NODE;
  function jestFakeTimersAreEnabled() {
    if (typeof jest !== "undefined" && jest !== null) {
      return (
        // legacy timers
        setTimeout._isMockFunction === true || // modern timers
        Object.prototype.hasOwnProperty.call(setTimeout, "clock")
      );
    }
    return false;
  }
  function getDocument() {
    if (typeof window === "undefined") {
      throw new Error("Could not find default container");
    }
    return window.document;
  }
  function getWindowFromNode(node) {
    if (node.defaultView) {
      return node.defaultView;
    } else if (node.ownerDocument && node.ownerDocument.defaultView) {
      return node.ownerDocument.defaultView;
    } else if (node.window) {
      return node.window;
    } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
      throw new Error(`It looks like the window object is not available for the provided node.`);
    } else if (node.then instanceof Function) {
      throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
    } else if (Array.isArray(node)) {
      throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
    } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
      throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
    } else {
      throw new Error(`The given node is not an Element, the node type is: ${typeof node}.`);
    }
  }
  function checkContainerType(container) {
    if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
      throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
    }
    function getTypeName(object) {
      if (typeof object === "object") {
        return object === null ? "null" : object.constructor.name;
      }
      return typeof object;
    }
  }
  Object.defineProperty(isVisible$1, "__esModule", {
    value: true
  });
  isVisible$1.isVisible = isVisible;
  var _helpers$1 = helpers;
  function isVisible(element) {
    const window2 = (0, _helpers$1.getWindowFromNode)(element);
    for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
      var _el;
      const display = window2.getComputedStyle(el).display;
      if (display === "none") {
        return false;
      }
    }
    return true;
  }
  var isDocument$1 = {};
  Object.defineProperty(isDocument$1, "__esModule", {
    value: true
  });
  isDocument$1.isDocument = isDocument;
  function isDocument(el) {
    return el.nodeType === el.DOCUMENT_NODE;
  }
  var wait$1 = {};
  Object.defineProperty(wait$1, "__esModule", {
    value: true
  });
  wait$1.wait = wait;
  function wait(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time));
  }
  var hasPointerEvents$1 = {};
  Object.defineProperty(hasPointerEvents$1, "__esModule", {
    value: true
  });
  hasPointerEvents$1.hasPointerEvents = hasPointerEvents;
  var _helpers = helpers;
  function hasPointerEvents(element) {
    const window2 = (0, _helpers.getWindowFromNode)(element);
    for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
      var _el;
      const pointerEvents = window2.getComputedStyle(el).pointerEvents;
      if (pointerEvents && !["inherit", "unset"].includes(pointerEvents)) {
        return pointerEvents !== "none";
      }
    }
    return true;
  }
  var hasFormSubmit$1 = {};
  Object.defineProperty(hasFormSubmit$1, "__esModule", {
    value: true
  });
  hasFormSubmit$1.hasFormSubmit = void 0;
  const hasFormSubmit = (form) => !!(form && (form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]')));
  hasFormSubmit$1.hasFormSubmit = hasFormSubmit;
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", {
      value: true
    });
    var _getMouseEventOptions = getMouseEventOptions$1;
    Object.keys(_getMouseEventOptions).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _getMouseEventOptions[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _getMouseEventOptions[key2];
        }
      });
    });
    var _isClickableInput = isClickableInput$1;
    Object.keys(_isClickableInput).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isClickableInput[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isClickableInput[key2];
        }
      });
    });
    var _buildTimeValue = buildTimeValue$1;
    Object.keys(_buildTimeValue).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _buildTimeValue[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _buildTimeValue[key2];
        }
      });
    });
    var _calculateNewValue = calculateNewValue$1;
    Object.keys(_calculateNewValue).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _calculateNewValue[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _calculateNewValue[key2];
        }
      });
    });
    var _cursorPosition = cursorPosition;
    Object.keys(_cursorPosition).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _cursorPosition[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _cursorPosition[key2];
        }
      });
    });
    var _getValue3 = getValue$1;
    Object.keys(_getValue3).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _getValue3[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _getValue3[key2];
        }
      });
    });
    var _hasUnreliableEmptyValue = hasUnreliableEmptyValue$1;
    Object.keys(_hasUnreliableEmptyValue).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _hasUnreliableEmptyValue[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _hasUnreliableEmptyValue[key2];
        }
      });
    });
    var _isContentEditable2 = isContentEditable$1;
    Object.keys(_isContentEditable2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isContentEditable2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isContentEditable2[key2];
        }
      });
    });
    var _isEditable = isEditable$1;
    Object.keys(_isEditable).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isEditable[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isEditable[key2];
        }
      });
    });
    var _isValidDateValue2 = isValidDateValue$1;
    Object.keys(_isValidDateValue2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isValidDateValue2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isValidDateValue2[key2];
        }
      });
    });
    var _isValidInputTimeValue2 = isValidInputTimeValue$1;
    Object.keys(_isValidInputTimeValue2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isValidInputTimeValue2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isValidInputTimeValue2[key2];
        }
      });
    });
    var _maxLength = maxLength;
    Object.keys(_maxLength).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _maxLength[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _maxLength[key2];
        }
      });
    });
    var _selectionRange2 = selectionRange;
    Object.keys(_selectionRange2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _selectionRange2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _selectionRange2[key2];
        }
      });
    });
    var _getActiveElement = getActiveElement$1;
    Object.keys(_getActiveElement).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _getActiveElement[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _getActiveElement[key2];
        }
      });
    });
    var _isFocusable = isFocusable$1;
    Object.keys(_isFocusable).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isFocusable[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isFocusable[key2];
        }
      });
    });
    var _selector2 = selector;
    Object.keys(_selector2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _selector2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _selector2[key2];
        }
      });
    });
    var _eventWrapper = eventWrapper$1;
    Object.keys(_eventWrapper).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _eventWrapper[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _eventWrapper[key2];
        }
      });
    });
    var _isElementType2 = isElementType$1;
    Object.keys(_isElementType2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isElementType2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isElementType2[key2];
        }
      });
    });
    var _isLabelWithInternallyDisabledControl2 = isLabelWithInternallyDisabledControl$1;
    Object.keys(_isLabelWithInternallyDisabledControl2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isLabelWithInternallyDisabledControl2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isLabelWithInternallyDisabledControl2[key2];
        }
      });
    });
    var _isVisible = isVisible$1;
    Object.keys(_isVisible).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isVisible[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isVisible[key2];
        }
      });
    });
    var _isDisabled2 = isDisabled$1;
    Object.keys(_isDisabled2).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isDisabled2[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isDisabled2[key2];
        }
      });
    });
    var _isDocument = isDocument$1;
    Object.keys(_isDocument).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _isDocument[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _isDocument[key2];
        }
      });
    });
    var _wait = wait$1;
    Object.keys(_wait).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _wait[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _wait[key2];
        }
      });
    });
    var _hasPointerEvents = hasPointerEvents$1;
    Object.keys(_hasPointerEvents).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _hasPointerEvents[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _hasPointerEvents[key2];
        }
      });
    });
    var _hasFormSubmit = hasFormSubmit$1;
    Object.keys(_hasFormSubmit).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _hasFormSubmit[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _hasFormSubmit[key2];
        }
      });
    });
  })(utils);
  var hover$1 = {};
  Object.defineProperty(hover$1, "__esModule", {
    value: true
  });
  hover$1.hover = hover;
  hover$1.unhover = unhover;
  var _dom$b = require$$0;
  var _utils$i = utils;
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
    if (!skipPointerEventsCheck && !(0, _utils$i.hasPointerEvents)(element)) {
      throw new Error('unable to hover element as it has or inherits pointer-events set to "none".');
    }
    if ((0, _utils$i.isLabelWithInternallyDisabledControl)(element)) return;
    const parentElements = getParentElements(element).reverse();
    _dom$b.fireEvent.pointerOver(element, init);
    for (const el of parentElements) {
      _dom$b.fireEvent.pointerEnter(el, init);
    }
    if (!(0, _utils$i.isDisabled)(element)) {
      _dom$b.fireEvent.mouseOver(element, (0, _utils$i.getMouseEventOptions)("mouseover", init));
      for (const el of parentElements) {
        _dom$b.fireEvent.mouseEnter(el, (0, _utils$i.getMouseEventOptions)("mouseenter", init));
      }
    }
    _dom$b.fireEvent.pointerMove(element, init);
    if (!(0, _utils$i.isDisabled)(element)) {
      _dom$b.fireEvent.mouseMove(element, (0, _utils$i.getMouseEventOptions)("mousemove", init));
    }
  }
  function unhover(element, init, {
    skipPointerEventsCheck = false
  } = {}) {
    if (!skipPointerEventsCheck && !(0, _utils$i.hasPointerEvents)(element)) {
      throw new Error('unable to unhover element as it has or inherits pointer-events set to "none".');
    }
    if ((0, _utils$i.isLabelWithInternallyDisabledControl)(element)) return;
    const parentElements = getParentElements(element);
    _dom$b.fireEvent.pointerMove(element, init);
    if (!(0, _utils$i.isDisabled)(element)) {
      _dom$b.fireEvent.mouseMove(element, (0, _utils$i.getMouseEventOptions)("mousemove", init));
    }
    _dom$b.fireEvent.pointerOut(element, init);
    for (const el of parentElements) {
      _dom$b.fireEvent.pointerLeave(el, init);
    }
    if (!(0, _utils$i.isDisabled)(element)) {
      _dom$b.fireEvent.mouseOut(element, (0, _utils$i.getMouseEventOptions)("mouseout", init));
      for (const el of parentElements) {
        _dom$b.fireEvent.mouseLeave(el, (0, _utils$i.getMouseEventOptions)("mouseleave", init));
      }
    }
  }
  var blur$1 = {};
  Object.defineProperty(blur$1, "__esModule", {
    value: true
  });
  blur$1.blur = blur;
  var _utils$h = utils;
  function blur(element) {
    if (!(0, _utils$h.isFocusable)(element)) return;
    const wasActive = (0, _utils$h.getActiveElement)(element.ownerDocument) === element;
    if (!wasActive) return;
    (0, _utils$h.eventWrapper)(() => element.blur());
  }
  var focus$1 = {};
  Object.defineProperty(focus$1, "__esModule", {
    value: true
  });
  focus$1.focus = focus;
  var _utils$g = utils;
  function focus(element) {
    if (!(0, _utils$g.isFocusable)(element)) return;
    const isAlreadyActive = (0, _utils$g.getActiveElement)(element.ownerDocument) === element;
    if (isAlreadyActive) return;
    (0, _utils$g.eventWrapper)(() => element.focus());
  }
  Object.defineProperty(click$1, "__esModule", {
    value: true
  });
  click$1.click = click;
  click$1.dblClick = dblClick;
  var _dom$a = require$$0;
  var _utils$f = utils;
  var _hover$1 = hover$1;
  var _blur$2 = blur$1;
  var _focus$3 = focus$1;
  function getPreviouslyFocusedElement(element) {
    const focusedElement = element.ownerDocument.activeElement;
    const wasAnotherElementFocused = focusedElement && focusedElement !== element.ownerDocument.body && focusedElement !== element;
    return wasAnotherElementFocused ? focusedElement : null;
  }
  function clickLabel(label, init, {
    clickCount
  }) {
    if ((0, _utils$f.isLabelWithInternallyDisabledControl)(label)) return;
    _dom$a.fireEvent.pointerDown(label, init);
    _dom$a.fireEvent.mouseDown(label, (0, _utils$f.getMouseEventOptions)("mousedown", init, clickCount));
    _dom$a.fireEvent.pointerUp(label, init);
    _dom$a.fireEvent.mouseUp(label, (0, _utils$f.getMouseEventOptions)("mouseup", init, clickCount));
    fireClick(label, (0, _utils$f.getMouseEventOptions)("click", init, clickCount));
    if (label.control) (0, _focus$3.focus)(label.control);
  }
  function clickBooleanElement(element, init, {
    clickCount
  }) {
    _dom$a.fireEvent.pointerDown(element, init);
    if (!element.disabled) {
      _dom$a.fireEvent.mouseDown(element, (0, _utils$f.getMouseEventOptions)("mousedown", init, clickCount));
    }
    (0, _focus$3.focus)(element);
    _dom$a.fireEvent.pointerUp(element, init);
    if (!element.disabled) {
      _dom$a.fireEvent.mouseUp(element, (0, _utils$f.getMouseEventOptions)("mouseup", init, clickCount));
      fireClick(element, (0, _utils$f.getMouseEventOptions)("click", init, clickCount));
    }
  }
  function clickElement(element, init, {
    clickCount
  }) {
    const previousElement = getPreviouslyFocusedElement(element);
    _dom$a.fireEvent.pointerDown(element, init);
    if (!(0, _utils$f.isDisabled)(element)) {
      const continueDefaultHandling = _dom$a.fireEvent.mouseDown(element, (0, _utils$f.getMouseEventOptions)("mousedown", init, clickCount));
      if (continueDefaultHandling) {
        const closestFocusable = findClosest(element, _utils$f.isFocusable);
        if (previousElement && !closestFocusable) {
          (0, _blur$2.blur)(previousElement);
        } else if (closestFocusable) {
          (0, _focus$3.focus)(closestFocusable);
        }
      }
    }
    _dom$a.fireEvent.pointerUp(element, init);
    if (!(0, _utils$f.isDisabled)(element)) {
      _dom$a.fireEvent.mouseUp(element, (0, _utils$f.getMouseEventOptions)("mouseup", init, clickCount));
      fireClick(element, (0, _utils$f.getMouseEventOptions)("click", init, clickCount));
      const parentLabel = element.closest("label");
      if (parentLabel != null && parentLabel.control) (0, _focus$3.focus)(parentLabel.control);
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
    return void 0;
  }
  function click(element, init, {
    skipHover = false,
    clickCount = 0,
    skipPointerEventsCheck = false
  } = {}) {
    if (!skipPointerEventsCheck && !(0, _utils$f.hasPointerEvents)(element)) {
      throw new Error('unable to click element as it has or inherits pointer-events set to "none".');
    }
    if (!skipHover) (0, _hover$1.hover)(element, init, {
      skipPointerEventsCheck: true
    });
    if ((0, _utils$f.isElementType)(element, "label")) {
      clickLabel(element, init, {
        clickCount
      });
    } else if ((0, _utils$f.isElementType)(element, "input")) {
      if (element.type === "checkbox" || element.type === "radio") {
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
      _dom$a.fireEvent.contextMenu(element, mouseEventOptions);
    } else {
      _dom$a.fireEvent.click(element, mouseEventOptions);
    }
  }
  function dblClick(element, init, {
    skipPointerEventsCheck = false
  } = {}) {
    if (!skipPointerEventsCheck && !(0, _utils$f.hasPointerEvents)(element)) {
      throw new Error('unable to double-click element as it has or inherits pointer-events set to "none".');
    }
    (0, _hover$1.hover)(element, init, {
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
    _dom$a.fireEvent.dblClick(element, (0, _utils$f.getMouseEventOptions)("dblclick", init, 2));
  }
  var type$1 = {};
  var typeImplementation$1 = {};
  var keyboard = {};
  var keyboardImplementation$1 = {};
  var getNextKeyDef$1 = {};
  Object.defineProperty(getNextKeyDef$1, "__esModule", {
    value: true
  });
  getNextKeyDef$1.getNextKeyDef = getNextKeyDef;
  var bracketDict;
  (function(bracketDict2) {
    bracketDict2["{"] = "}";
    bracketDict2["["] = "]";
  })(bracketDict || (bracketDict = {}));
  var legacyModifiers;
  (function(legacyModifiers2) {
    legacyModifiers2["alt"] = "alt";
    legacyModifiers2["ctrl"] = "ctrl";
    legacyModifiers2["meta"] = "meta";
    legacyModifiers2["shift"] = "shift";
  })(legacyModifiers || (legacyModifiers = {}));
  var legacyKeyMap;
  (function(legacyKeyMap2) {
    legacyKeyMap2["ctrl"] = "Control";
    legacyKeyMap2["del"] = "Delete";
    legacyKeyMap2["esc"] = "Escape";
    legacyKeyMap2["space"] = " ";
  })(legacyKeyMap || (legacyKeyMap = {}));
  function getNextKeyDef(text, options) {
    var _options$keyboardMap$;
    const {
      type: type2,
      descriptor,
      consumedLength,
      releasePrevious,
      releaseSelf,
      repeat
    } = readNextDescriptor(text);
    const keyDef = (_options$keyboardMap$ = options.keyboardMap.find((def) => {
      if (type2 === "[") {
        var _def$code;
        return ((_def$code = def.code) == null ? void 0 : _def$code.toLowerCase()) === descriptor.toLowerCase();
      } else if (type2 === "{") {
        var _def$key;
        const key2 = mapLegacyKey(descriptor);
        return ((_def$key = def.key) == null ? void 0 : _def$key.toLowerCase()) === key2.toLowerCase();
      }
      return def.key === descriptor;
    })) != null ? _options$keyboardMap$ : {
      key: "Unknown",
      code: "Unknown",
      [type2 === "[" ? "code" : "key"]: descriptor
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
    const startBracket = text[pos] in bracketDict ? text[pos] : "";
    pos += startBracket.length;
    const startBracketRepeated = startBracket ? text.match(new RegExp(`^\\${startBracket}+`))[0].length : 0;
    const isEscapedChar = startBracketRepeated === 2 || startBracket === "{" && startBracketRepeated > 3;
    const type2 = isEscapedChar ? "" : startBracket;
    return {
      type: type2,
      ...type2 === "" ? readPrintableChar(text, pos) : readTag(text, pos, type2)
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
    const releasePreviousModifier = text[pos] === "/" ? "/" : "";
    pos += releasePreviousModifier.length;
    const descriptor = (_text$slice$match = text.slice(pos).match(/^\w+/)) == null ? void 0 : _text$slice$match[0];
    assertDescriptor(descriptor, text, pos);
    pos += descriptor.length;
    const repeatModifier = (_text$slice$match$ = (_text$slice$match2 = text.slice(pos).match(/^>\d+/)) == null ? void 0 : _text$slice$match2[0]) != null ? _text$slice$match$ : "";
    pos += repeatModifier.length;
    const releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
    pos += releaseSelfModifier.length;
    const expectedEndBracket = bracketDict[startBracket];
    const endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
    if (!endBracket) {
      throw new Error(getErrorMessage([!repeatModifier && "repeat modifier", !releaseSelfModifier && "release modifier", `"${expectedEndBracket}"`].filter(Boolean).join(" or "), text[pos], text));
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
      throw new Error(getErrorMessage("key descriptor", text[pos], text));
    }
  }
  function getEnumValue(f, key2) {
    return f[key2];
  }
  function hasReleaseSelf(startBracket, descriptor, releaseSelfModifier, repeatModifier) {
    if (releaseSelfModifier) {
      return releaseSelfModifier === "/";
    }
    if (repeatModifier) {
      return false;
    }
    if (startBracket === "{" && getEnumValue(legacyModifiers, descriptor.toLowerCase())) {
      return false;
    }
    return true;
  }
  function mapLegacyKey(descriptor) {
    var _getEnumValue;
    return (_getEnumValue = getEnumValue(legacyKeyMap, descriptor)) != null ? _getEnumValue : descriptor;
  }
  function getErrorMessage(expected, found, text) {
    return `Expected ${expected} but found "${found != null ? found : ""}" in "${text}"
    See https://github.com/testing-library/user-event/blob/main/README.md#keyboardtext-options
    for more information about how userEvent parses your input.`;
  }
  var plugins$1 = {};
  var arrow = {};
  Object.defineProperty(arrow, "__esModule", {
    value: true
  });
  arrow.keydownBehavior = void 0;
  var _utils$e = utils;
  const keydownBehavior$3 = [{
    // TODO: implement for contentEditable
    matches: (keyDef, element) => (keyDef.key === "ArrowLeft" || keyDef.key === "ArrowRight") && (0, _utils$e.isElementType)(element, ["input", "textarea"]),
    handle: (keyDef, element) => {
      var _ref;
      const {
        selectionStart,
        selectionEnd
      } = (0, _utils$e.getSelectionRange)(element);
      const direction = keyDef.key === "ArrowLeft" ? -1 : 1;
      const newPos = (_ref = selectionStart === selectionEnd ? (selectionStart != null ? selectionStart : (
        /* istanbul ignore next */
        0
      )) + direction : direction < 0 ? selectionStart : selectionEnd) != null ? _ref : (
        /* istanbul ignore next */
        0
      );
      (0, _utils$e.setSelectionRange)(element, newPos, newPos);
    }
  }];
  arrow.keydownBehavior = keydownBehavior$3;
  var control = {};
  var shared = {};
  var carryValue$1 = {};
  Object.defineProperty(carryValue$1, "__esModule", {
    value: true
  });
  carryValue$1.carryValue = carryValue;
  var _utils$d = utils;
  function carryValue(element, state, newValue) {
    const value = (0, _utils$d.getValue)(element);
    state.carryValue = value !== newValue && value === "" && (0, _utils$d.hasUnreliableEmptyValue)(element) ? newValue : void 0;
  }
  var fireChangeForInputTimeIfValid$1 = {};
  Object.defineProperty(fireChangeForInputTimeIfValid$1, "__esModule", {
    value: true
  });
  fireChangeForInputTimeIfValid$1.fireChangeForInputTimeIfValid = fireChangeForInputTimeIfValid;
  var _dom$9 = require$$0;
  var _utils$c = utils;
  function fireChangeForInputTimeIfValid(el, prevValue, timeNewEntry) {
    if ((0, _utils$c.isValidInputTimeValue)(el, timeNewEntry) && prevValue !== timeNewEntry) {
      _dom$9.fireEvent.change(el, {
        target: {
          value: timeNewEntry
        }
      });
    }
  }
  var fireInputEvent$1 = {};
  Object.defineProperty(fireInputEvent$1, "__esModule", {
    value: true
  });
  fireInputEvent$1.fireInputEvent = fireInputEvent;
  var _dom$8 = require$$0;
  var _utils$b = utils;
  function fireInputEvent(element, {
    newValue,
    newSelectionStart,
    eventOverrides
  }) {
    if ((0, _utils$b.isContentEditable)(element)) {
      applyNative(element, "textContent", newValue);
    } else if ((0, _utils$b.isElementType)(element, ["input", "textarea"])) {
      applyNative(element, "value", newValue);
    } else {
      throw new Error("Invalid Element");
    }
    setSelectionRangeAfterInput(element, newSelectionStart);
    _dom$8.fireEvent.input(element, {
      ...eventOverrides
    });
    setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart);
  }
  function setSelectionRangeAfterInput(element, newSelectionStart) {
    (0, _utils$b.setSelectionRange)(element, newSelectionStart, newSelectionStart);
  }
  function setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart) {
    const value = (0, _utils$b.getValue)(element);
    const isUnreliableValue = value === "" && (0, _utils$b.hasUnreliableEmptyValue)(element);
    if (!isUnreliableValue && value === newValue) {
      const {
        selectionStart
      } = (0, _utils$b.getSelectionRange)(element);
      if (selectionStart === value.length) {
        (0, _utils$b.setSelectionRange)(element, newSelectionStart, newSelectionStart);
      }
    }
  }
  const initial = Symbol("initial input value/textContent");
  const onBlur = Symbol("onBlur");
  function applyNative(element, propName, propValue) {
    const descriptor = Object.getOwnPropertyDescriptor(element, propName);
    const nativeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName);
    if (descriptor && nativeDescriptor) {
      Object.defineProperty(element, propName, nativeDescriptor);
    }
    if (element[initial] === void 0) {
      element[initial] = String(element[propName]);
    }
    element[propName] = propValue;
    if (!element[onBlur]) {
      var _element$ownerDocumen;
      (_element$ownerDocumen = element.ownerDocument.defaultView) == null ? void 0 : _element$ownerDocumen.addEventListener("blur", element[onBlur] = () => {
        const initV = element[initial];
        delete element[onBlur];
        delete element[initial];
        if (String(element[propName]) !== initV) {
          _dom$8.fireEvent.change(element);
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
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", {
      value: true
    });
    var _carryValue = carryValue$1;
    Object.keys(_carryValue).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _carryValue[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _carryValue[key2];
        }
      });
    });
    var _fireChangeForInputTimeIfValid = fireChangeForInputTimeIfValid$1;
    Object.keys(_fireChangeForInputTimeIfValid).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _fireChangeForInputTimeIfValid[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _fireChangeForInputTimeIfValid[key2];
        }
      });
    });
    var _fireInputEvent = fireInputEvent$1;
    Object.keys(_fireInputEvent).forEach(function(key2) {
      if (key2 === "default" || key2 === "__esModule") return;
      if (key2 in exports3 && exports3[key2] === _fireInputEvent[key2]) return;
      Object.defineProperty(exports3, key2, {
        enumerable: true,
        get: function() {
          return _fireInputEvent[key2];
        }
      });
    });
  })(shared);
  Object.defineProperty(control, "__esModule", {
    value: true
  });
  control.keydownBehavior = void 0;
  var _utils$a = utils;
  var _shared$2 = shared;
  const keydownBehavior$2 = [{
    matches: (keyDef, element) => (keyDef.key === "Home" || keyDef.key === "End") && ((0, _utils$a.isElementType)(element, ["input", "textarea"]) || (0, _utils$a.isContentEditable)(element)),
    handle: (keyDef, element) => {
      if (keyDef.key === "Home") {
        (0, _utils$a.setSelectionRange)(element, 0, 0);
      } else {
        var _getValue$length, _getValue3;
        const newPos = (_getValue$length = (_getValue3 = (0, _utils$a.getValue)(element)) == null ? void 0 : _getValue3.length) != null ? _getValue$length : (
          /* istanbul ignore next */
          0
        );
        (0, _utils$a.setSelectionRange)(element, newPos, newPos);
      }
    }
  }, {
    matches: (keyDef, element) => (keyDef.key === "PageUp" || keyDef.key === "PageDown") && (0, _utils$a.isElementType)(element, ["input"]),
    handle: (keyDef, element) => {
      if (keyDef.key === "PageUp") {
        (0, _utils$a.setSelectionRange)(element, 0, 0);
      } else {
        var _getValue$length2, _getValue22;
        const newPos = (_getValue$length2 = (_getValue22 = (0, _utils$a.getValue)(element)) == null ? void 0 : _getValue22.length) != null ? _getValue$length2 : (
          /* istanbul ignore next */
          0
        );
        (0, _utils$a.setSelectionRange)(element, newPos, newPos);
      }
    }
  }, {
    matches: (keyDef, element) => keyDef.key === "Delete" && (0, _utils$a.isEditable)(element) && !(0, _utils$a.isCursorAtEnd)(element),
    handle: (keDef, element, options, state) => {
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$a.calculateNewValue)("", element, state.carryValue, void 0, "forward");
      (0, _shared$2.fireInputEvent)(element, {
        newValue,
        newSelectionStart,
        eventOverrides: {
          inputType: "deleteContentForward"
        }
      });
      (0, _shared$2.carryValue)(element, state, newValue);
    }
  }];
  control.keydownBehavior = keydownBehavior$2;
  var character = {};
  Object.defineProperty(character, "__esModule", {
    value: true
  });
  character.keypressBehavior = void 0;
  var _dom$7 = require$$0;
  var _shared$1 = shared;
  var _utils$9 = utils;
  const keypressBehavior$2 = [{
    matches: (keyDef, element) => {
      var _keyDef$key;
      return ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 && (0, _utils$9.isElementType)(element, "input", {
        type: "time",
        readOnly: false
      });
    },
    handle: (keyDef, element, options, state) => {
      var _state$carryValue;
      let newEntry = keyDef.key;
      const textToBeTyped = ((_state$carryValue = state.carryValue) != null ? _state$carryValue : "") + newEntry;
      const timeNewEntry = (0, _utils$9.buildTimeValue)(textToBeTyped);
      if ((0, _utils$9.isValidInputTimeValue)(element, timeNewEntry)) {
        newEntry = timeNewEntry;
      }
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$9.calculateNewValue)(newEntry, element);
      const prevValue = (0, _utils$9.getValue)(element);
      if (prevValue !== newValue) {
        (0, _shared$1.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            data: keyDef.key,
            inputType: "insertText"
          }
        });
      }
      (0, _shared$1.fireChangeForInputTimeIfValid)(element, prevValue, timeNewEntry);
      state.carryValue = textToBeTyped;
    }
  }, {
    matches: (keyDef, element) => {
      var _keyDef$key2;
      return ((_keyDef$key2 = keyDef.key) == null ? void 0 : _keyDef$key2.length) === 1 && (0, _utils$9.isElementType)(element, "input", {
        type: "date",
        readOnly: false
      });
    },
    handle: (keyDef, element, options, state) => {
      var _state$carryValue2;
      let newEntry = keyDef.key;
      const textToBeTyped = ((_state$carryValue2 = state.carryValue) != null ? _state$carryValue2 : "") + newEntry;
      const isValidToBeTyped = (0, _utils$9.isValidDateValue)(element, textToBeTyped);
      if (isValidToBeTyped) {
        newEntry = textToBeTyped;
      }
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$9.calculateNewValue)(newEntry, element);
      const prevValue = (0, _utils$9.getValue)(element);
      if (prevValue !== newValue) {
        (0, _shared$1.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            data: keyDef.key,
            inputType: "insertText"
          }
        });
      }
      if (isValidToBeTyped) {
        _dom$7.fireEvent.change(element, {
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
      return ((_keyDef$key3 = keyDef.key) == null ? void 0 : _keyDef$key3.length) === 1 && (0, _utils$9.isElementType)(element, "input", {
        type: "number",
        readOnly: false
      });
    },
    handle: (keyDef, element, options, state) => {
      var _ref, _state$carryValue3, _newValue$match, _newValue$match2;
      if (!/[\d.\-e]/.test(keyDef.key)) {
        return;
      }
      const oldValue = (_ref = (_state$carryValue3 = state.carryValue) != null ? _state$carryValue3 : (0, _utils$9.getValue)(element)) != null ? _ref : (
        /* istanbul ignore next */
        ""
      );
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$9.calculateNewValue)(keyDef.key, element, oldValue);
      const valueParts = newValue.split("e", 2);
      if (Number((_newValue$match = newValue.match(/-/g)) == null ? void 0 : _newValue$match.length) > 2 || Number((_newValue$match2 = newValue.match(/\./g)) == null ? void 0 : _newValue$match2.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1])) {
        return;
      }
      (0, _shared$1.fireInputEvent)(element, {
        newValue,
        newSelectionStart,
        eventOverrides: {
          data: keyDef.key,
          inputType: "insertText"
        }
      });
      const appliedValue = (0, _utils$9.getValue)(element);
      if (appliedValue === newValue) {
        state.carryValue = void 0;
      } else {
        state.carryValue = newValue;
      }
    }
  }, {
    matches: (keyDef, element) => {
      var _keyDef$key4;
      return ((_keyDef$key4 = keyDef.key) == null ? void 0 : _keyDef$key4.length) === 1 && ((0, _utils$9.isElementType)(element, ["input", "textarea"], {
        readOnly: false
      }) && !(0, _utils$9.isClickableInput)(element) || (0, _utils$9.isContentEditable)(element)) && (0, _utils$9.getSpaceUntilMaxLength)(element) !== 0;
    },
    handle: (keyDef, element) => {
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$9.calculateNewValue)(keyDef.key, element);
      (0, _shared$1.fireInputEvent)(element, {
        newValue,
        newSelectionStart,
        eventOverrides: {
          data: keyDef.key,
          inputType: "insertText"
        }
      });
    }
  }, {
    matches: (keyDef, element) => keyDef.key === "Enter" && ((0, _utils$9.isElementType)(element, "textarea", {
      readOnly: false
    }) || (0, _utils$9.isContentEditable)(element)) && (0, _utils$9.getSpaceUntilMaxLength)(element) !== 0,
    handle: (keyDef, element, options, state) => {
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$9.calculateNewValue)("\n", element);
      const inputType = (0, _utils$9.isContentEditable)(element) && !state.modifiers.shift ? "insertParagraph" : "insertLineBreak";
      (0, _shared$1.fireInputEvent)(element, {
        newValue,
        newSelectionStart,
        eventOverrides: {
          inputType
        }
      });
    }
  }];
  character.keypressBehavior = keypressBehavior$2;
  var functional = {};
  var getEventProps = {};
  Object.defineProperty(getEventProps, "__esModule", {
    value: true
  });
  getEventProps.getKeyEventProps = getKeyEventProps;
  getEventProps.getMouseEventProps = getMouseEventProps;
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
      keyCode: (_keyDef$keyCode = keyDef.keyCode) != null ? _keyDef$keyCode : (
        // istanbul ignore next
        ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 ? keyDef.key.charCodeAt(0) : void 0
      )
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
  Object.defineProperty(functional, "__esModule", {
    value: true
  });
  functional.preKeyupBehavior = functional.preKeydownBehavior = functional.postKeyupBehavior = functional.keyupBehavior = functional.keypressBehavior = functional.keydownBehavior = void 0;
  var _dom$6 = require$$0;
  var _utils$8 = utils;
  var _getEventProps$1 = getEventProps;
  var _shared = shared;
  const modifierKeys = {
    Alt: "alt",
    Control: "ctrl",
    Shift: "shift",
    Meta: "meta"
  };
  const preKeydownBehavior$1 = [
    // modifierKeys switch on the modifier BEFORE the keydown event
    ...Object.entries(modifierKeys).map(([key2, modKey]) => ({
      matches: (keyDef) => keyDef.key === key2,
      handle: (keyDef, element, options, state) => {
        state.modifiers[modKey] = true;
      }
    })),
    // AltGraph produces an extra keydown for Control
    // The modifier does not change
    {
      matches: (keyDef) => keyDef.key === "AltGraph",
      handle: (keyDef, element, options, state) => {
        var _options$keyboardMap$;
        const ctrlKeyDef = (_options$keyboardMap$ = options.keyboardMap.find((k2) => k2.key === "Control")) != null ? _options$keyboardMap$ : (
          /* istanbul ignore next */
          {
            key: "Control",
            code: "Control"
          }
        );
        _dom$6.fireEvent.keyDown(element, (0, _getEventProps$1.getKeyEventProps)(ctrlKeyDef, state));
      }
    }
  ];
  functional.preKeydownBehavior = preKeydownBehavior$1;
  const keydownBehavior$1 = [{
    matches: (keyDef) => keyDef.key === "CapsLock",
    handle: (keyDef, element, options, state) => {
      state.modifiers.caps = !state.modifiers.caps;
    }
  }, {
    matches: (keyDef, element) => keyDef.key === "Backspace" && (0, _utils$8.isEditable)(element) && !(0, _utils$8.isCursorAtStart)(element),
    handle: (keyDef, element, options, state) => {
      const {
        newValue,
        newSelectionStart
      } = (0, _utils$8.calculateNewValue)("", element, state.carryValue, void 0, "backward");
      (0, _shared.fireInputEvent)(element, {
        newValue,
        newSelectionStart,
        eventOverrides: {
          inputType: "deleteContentBackward"
        }
      });
      (0, _shared.carryValue)(element, state, newValue);
    }
  }];
  functional.keydownBehavior = keydownBehavior$1;
  const keypressBehavior$1 = [{
    matches: (keyDef, element) => keyDef.key === "Enter" && (0, _utils$8.isElementType)(element, "input") && ["checkbox", "radio"].includes(element.type),
    handle: (keyDef, element) => {
      const form = element.form;
      if ((0, _utils$8.hasFormSubmit)(form)) {
        _dom$6.fireEvent.submit(form);
      }
    }
  }, {
    matches: (keyDef, element) => keyDef.key === "Enter" && ((0, _utils$8.isClickableInput)(element) || // Links with href defined should handle Enter the same as a click
    (0, _utils$8.isElementType)(element, "a") && Boolean(element.href)),
    handle: (keyDef, element, options, state) => {
      _dom$6.fireEvent.click(element, (0, _getEventProps$1.getMouseEventProps)(state));
    }
  }, {
    matches: (keyDef, element) => keyDef.key === "Enter" && (0, _utils$8.isElementType)(element, "input"),
    handle: (keyDef, element) => {
      const form = element.form;
      if (form && (form.querySelectorAll("input").length === 1 || (0, _utils$8.hasFormSubmit)(form))) {
        _dom$6.fireEvent.submit(form);
      }
    }
  }];
  functional.keypressBehavior = keypressBehavior$1;
  const preKeyupBehavior$1 = [
    // modifierKeys switch off the modifier BEFORE the keyup event
    ...Object.entries(modifierKeys).map(([key2, modKey]) => ({
      matches: (keyDef) => keyDef.key === key2,
      handle: (keyDef, element, options, state) => {
        state.modifiers[modKey] = false;
      }
    }))
  ];
  functional.preKeyupBehavior = preKeyupBehavior$1;
  const keyupBehavior$1 = [{
    matches: (keyDef, element) => keyDef.key === " " && (0, _utils$8.isClickableInput)(element),
    handle: (keyDef, element, options, state) => {
      _dom$6.fireEvent.click(element, (0, _getEventProps$1.getMouseEventProps)(state));
    }
  }];
  functional.keyupBehavior = keyupBehavior$1;
  const postKeyupBehavior$1 = [
    // AltGraph produces an extra keyup for Control
    // The modifier does not change
    {
      matches: (keyDef) => keyDef.key === "AltGraph",
      handle: (keyDef, element, options, state) => {
        var _options$keyboardMap$2;
        const ctrlKeyDef = (_options$keyboardMap$2 = options.keyboardMap.find((k2) => k2.key === "Control")) != null ? _options$keyboardMap$2 : (
          /* istanbul ignore next */
          {
            key: "Control",
            code: "Control"
          }
        );
        _dom$6.fireEvent.keyUp(element, (0, _getEventProps$1.getKeyEventProps)(ctrlKeyDef, state));
      }
    }
  ];
  functional.postKeyupBehavior = postKeyupBehavior$1;
  Object.defineProperty(plugins$1, "__esModule", {
    value: true
  });
  plugins$1.replaceBehavior = plugins$1.preKeyupBehavior = plugins$1.preKeydownBehavior = plugins$1.postKeyupBehavior = plugins$1.keyupBehavior = plugins$1.keypressBehavior = plugins$1.keydownBehavior = void 0;
  var _utils$7 = utils;
  var arrowKeys = _interopRequireWildcard$1(arrow);
  var controlKeys = _interopRequireWildcard$1(control);
  var characterKeys = _interopRequireWildcard$1(character);
  var functionalKeys = _interopRequireWildcard$1(functional);
  function _getRequireWildcardCache$1(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache$1 = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard$1(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache2 = _getRequireWildcardCache$1(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key2 in obj) {
      if (key2 !== "default" && Object.prototype.hasOwnProperty.call(obj, key2)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key2) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key2, desc);
        } else {
          newObj[key2] = obj[key2];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const replaceBehavior = [{
    matches: (keyDef, element) => keyDef.key === "selectall" && (0, _utils$7.isElementType)(element, ["input", "textarea"]),
    handle: (keyDef, element, options, state) => {
      var _state$carryValue;
      (0, _utils$7.setSelectionRange)(element, 0, ((_state$carryValue = state.carryValue) != null ? _state$carryValue : element.value).length);
    }
  }];
  plugins$1.replaceBehavior = replaceBehavior;
  const preKeydownBehavior = [...functionalKeys.preKeydownBehavior];
  plugins$1.preKeydownBehavior = preKeydownBehavior;
  const keydownBehavior = [...arrowKeys.keydownBehavior, ...controlKeys.keydownBehavior, ...functionalKeys.keydownBehavior];
  plugins$1.keydownBehavior = keydownBehavior;
  const keypressBehavior = [...functionalKeys.keypressBehavior, ...characterKeys.keypressBehavior];
  plugins$1.keypressBehavior = keypressBehavior;
  const preKeyupBehavior = [...functionalKeys.preKeyupBehavior];
  plugins$1.preKeyupBehavior = preKeyupBehavior;
  const keyupBehavior = [...functionalKeys.keyupBehavior];
  plugins$1.keyupBehavior = keyupBehavior;
  const postKeyupBehavior = [...functionalKeys.postKeyupBehavior];
  plugins$1.postKeyupBehavior = postKeyupBehavior;
  Object.defineProperty(keyboardImplementation$1, "__esModule", {
    value: true
  });
  keyboardImplementation$1.keyboardImplementation = keyboardImplementation;
  keyboardImplementation$1.releaseAllKeys = releaseAllKeys;
  var _dom$5 = require$$0;
  var _utils$6 = utils;
  var _getNextKeyDef = getNextKeyDef$1;
  var plugins = _interopRequireWildcard(plugins$1);
  var _getEventProps = getEventProps;
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key2 in obj) {
      if (key2 !== "default" && Object.prototype.hasOwnProperty.call(obj, key2)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key2) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key2, desc);
        } else {
          newObj[key2] = obj[key2];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  async function keyboardImplementation(text, options, state) {
    var _state$repeatKey;
    const {
      document: document2
    } = options;
    const getCurrentElement = () => getActive(document2);
    const {
      keyDef,
      consumedLength,
      releasePrevious,
      releaseSelf,
      repeat
    } = (_state$repeatKey = state.repeatKey) != null ? _state$repeatKey : (0, _getNextKeyDef.getNextKeyDef)(text, options);
    const replace = applyPlugins(plugins.replaceBehavior, keyDef, getCurrentElement(), options, state);
    if (!replace) {
      const pressed = state.pressed.find((p) => p.keyDef === keyDef);
      if (pressed && !state.repeatKey) {
        keyup(keyDef, getCurrentElement, options, state, pressed.unpreventedDefault);
      }
      if (!releasePrevious) {
        const unpreventedDefault = keydown(keyDef, getCurrentElement, options, state);
        if (unpreventedDefault && hasKeyPress(keyDef, state)) {
          keypress(keyDef, getCurrentElement, options, state);
        }
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
        await (0, _utils$6.wait)(options.delay);
      }
      return keyboardImplementation(text.slice(consumedLength), options, state);
    }
    return void 0;
  }
  function getActive(document2) {
    var _getActiveElement;
    return (_getActiveElement = (0, _utils$6.getActiveElement)(document2)) != null ? _getActiveElement : (
      /* istanbul ignore next */
      document2.body
    );
  }
  function releaseAllKeys(options, state) {
    const getCurrentElement = () => getActive(options.document);
    for (const k2 of state.pressed) {
      keyup(k2.keyDef, getCurrentElement, options, state, k2.unpreventedDefault);
    }
  }
  function keydown(keyDef, getCurrentElement, options, state) {
    const element = getCurrentElement();
    if (element !== state.activeElement) {
      state.carryValue = void 0;
      state.carryChar = "";
    }
    state.activeElement = element;
    applyPlugins(plugins.preKeydownBehavior, keyDef, element, options, state);
    const unpreventedDefault = _dom$5.fireEvent.keyDown(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
    state.pressed.push({
      keyDef,
      unpreventedDefault
    });
    if (unpreventedDefault) {
      applyPlugins(plugins.keydownBehavior, keyDef, getCurrentElement(), options, state);
    }
    return unpreventedDefault;
  }
  function keypress(keyDef, getCurrentElement, options, state) {
    const element = getCurrentElement();
    const unpreventedDefault = _dom$5.fireEvent.keyPress(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
    if (unpreventedDefault) {
      applyPlugins(plugins.keypressBehavior, keyDef, getCurrentElement(), options, state);
    }
  }
  function keyup(keyDef, getCurrentElement, options, state, unprevented) {
    const element = getCurrentElement();
    applyPlugins(plugins.preKeyupBehavior, keyDef, element, options, state);
    const unpreventedDefault = _dom$5.fireEvent.keyUp(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
    if (unprevented && unpreventedDefault) {
      applyPlugins(plugins.keyupBehavior, keyDef, getCurrentElement(), options, state);
    }
    state.pressed = state.pressed.filter((k2) => k2.keyDef !== keyDef);
    applyPlugins(plugins.postKeyupBehavior, keyDef, element, options, state);
  }
  function applyPlugins(pluginCollection, keyDef, element, options, state) {
    const plugin2 = pluginCollection.find((p) => p.matches(keyDef, element, options, state));
    if (plugin2) {
      plugin2.handle(keyDef, element, options, state);
    }
    return !!plugin2;
  }
  function hasKeyPress(keyDef, state) {
    var _keyDef$key;
    return (((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 || keyDef.key === "Enter") && !state.modifiers.ctrl && !state.modifiers.alt;
  }
  var keyMap = {};
  var types = {};
  Object.defineProperty(types, "__esModule", {
    value: true
  });
  types.DOM_KEY_LOCATION = void 0;
  let DOM_KEY_LOCATION;
  types.DOM_KEY_LOCATION = DOM_KEY_LOCATION;
  (function(DOM_KEY_LOCATION2) {
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["STANDARD"] = 0] = "STANDARD";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["LEFT"] = 1] = "LEFT";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["RIGHT"] = 2] = "RIGHT";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["NUMPAD"] = 3] = "NUMPAD";
  })(DOM_KEY_LOCATION || (types.DOM_KEY_LOCATION = DOM_KEY_LOCATION = {}));
  Object.defineProperty(keyMap, "__esModule", {
    value: true
  });
  keyMap.defaultKeyMap = void 0;
  var _types = types;
  const defaultKeyMap = [
    // alphanumeric keys
    ..."0123456789".split("").map((c) => ({
      code: `Digit${c}`,
      key: c
    })),
    ...")!@#$%^&*(".split("").map((c, i2) => ({
      code: `Digit${i2}`,
      key: c,
      shiftKey: true
    })),
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
      code: `Key${c.toUpperCase()}`,
      key: c
    })),
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({
      code: `Key${c}`,
      key: c,
      shiftKey: true
    })),
    // alphanumeric block - functional
    {
      code: "Space",
      key: " "
    },
    {
      code: "AltLeft",
      key: "Alt",
      location: _types.DOM_KEY_LOCATION.LEFT,
      keyCode: 18
    },
    {
      code: "AltRight",
      key: "Alt",
      location: _types.DOM_KEY_LOCATION.RIGHT,
      keyCode: 18
    },
    {
      code: "ShiftLeft",
      key: "Shift",
      location: _types.DOM_KEY_LOCATION.LEFT,
      keyCode: 16
    },
    {
      code: "ShiftRight",
      key: "Shift",
      location: _types.DOM_KEY_LOCATION.RIGHT,
      keyCode: 16
    },
    {
      code: "ControlLeft",
      key: "Control",
      location: _types.DOM_KEY_LOCATION.LEFT,
      keyCode: 17
    },
    {
      code: "ControlRight",
      key: "Control",
      location: _types.DOM_KEY_LOCATION.RIGHT,
      keyCode: 17
    },
    {
      code: "MetaLeft",
      key: "Meta",
      location: _types.DOM_KEY_LOCATION.LEFT,
      keyCode: 93
    },
    {
      code: "MetaRight",
      key: "Meta",
      location: _types.DOM_KEY_LOCATION.RIGHT,
      keyCode: 93
    },
    {
      code: "OSLeft",
      key: "OS",
      location: _types.DOM_KEY_LOCATION.LEFT,
      keyCode: 91
    },
    {
      code: "OSRight",
      key: "OS",
      location: _types.DOM_KEY_LOCATION.RIGHT,
      keyCode: 91
    },
    {
      code: "CapsLock",
      key: "CapsLock",
      keyCode: 20
    },
    {
      code: "Backspace",
      key: "Backspace",
      keyCode: 8
    },
    {
      code: "Enter",
      key: "Enter",
      keyCode: 13
    },
    // function
    {
      code: "Escape",
      key: "Escape",
      keyCode: 27
    },
    // arrows
    {
      code: "ArrowUp",
      key: "ArrowUp",
      keyCode: 38
    },
    {
      code: "ArrowDown",
      key: "ArrowDown",
      keyCode: 40
    },
    {
      code: "ArrowLeft",
      key: "ArrowLeft",
      keyCode: 37
    },
    {
      code: "ArrowRight",
      key: "ArrowRight",
      keyCode: 39
    },
    // control pad
    {
      code: "Home",
      key: "Home",
      keyCode: 36
    },
    {
      code: "End",
      key: "End",
      keyCode: 35
    },
    {
      code: "Delete",
      key: "Delete",
      keyCode: 46
    },
    {
      code: "PageUp",
      key: "PageUp",
      keyCode: 33
    },
    {
      code: "PageDown",
      key: "PageDown",
      keyCode: 34
    }
    // TODO: add mappings
  ];
  keyMap.defaultKeyMap = defaultKeyMap;
  var specialCharMap$1 = {};
  Object.defineProperty(specialCharMap$1, "__esModule", {
    value: true
  });
  specialCharMap$1.specialCharMap = void 0;
  const specialCharMap = {
    arrowLeft: "{arrowleft}",
    arrowRight: "{arrowright}",
    arrowDown: "{arrowdown}",
    arrowUp: "{arrowup}",
    enter: "{enter}",
    escape: "{esc}",
    delete: "{del}",
    backspace: "{backspace}",
    home: "{home}",
    end: "{end}",
    selectAll: "{selectall}",
    space: "{space}",
    whitespace: " ",
    pageUp: "{pageUp}",
    pageDown: "{pageDown}"
  };
  specialCharMap$1.specialCharMap = specialCharMap;
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", {
      value: true
    });
    exports3.keyboard = keyboard2;
    exports3.keyboardImplementationWrapper = keyboardImplementationWrapper;
    Object.defineProperty(exports3, "specialCharMap", {
      enumerable: true,
      get: function() {
        return _specialCharMap.specialCharMap;
      }
    });
    var _dom2 = require$$0;
    var _keyboardImplementation = keyboardImplementation$1;
    var _keyMap = keyMap;
    var _specialCharMap = specialCharMap$1;
    function keyboard2(text, options) {
      var _options$delay;
      const {
        promise,
        state
      } = keyboardImplementationWrapper(text, options);
      if (((_options$delay = options == null ? void 0 : options.delay) != null ? _options$delay : 0) > 0) {
        return (0, _dom2.getConfig)().asyncWrapper(() => promise.then(() => state));
      } else {
        promise.catch(console.error);
        return state;
      }
    }
    function keyboardImplementationWrapper(text, config2 = {}) {
      const {
        keyboardState: state = createKeyboardState(),
        delay = 0,
        document: doc = document,
        autoModify = false,
        keyboardMap = _keyMap.defaultKeyMap
      } = config2;
      const options = {
        delay,
        document: doc,
        autoModify,
        keyboardMap
      };
      return {
        promise: (0, _keyboardImplementation.keyboardImplementation)(text, options, state),
        state,
        releaseAllKeys: () => (0, _keyboardImplementation.releaseAllKeys)(options, state)
      };
    }
    function createKeyboardState() {
      return {
        activeElement: null,
        pressed: [],
        carryChar: "",
        modifiers: {
          alt: false,
          caps: false,
          ctrl: false,
          meta: false,
          shift: false
        }
      };
    }
  })(keyboard);
  Object.defineProperty(typeImplementation$1, "__esModule", {
    value: true
  });
  typeImplementation$1.typeImplementation = typeImplementation;
  var _utils$5 = utils;
  var _click$2 = click$1;
  var _keyboard = keyboard;
  async function typeImplementation(element, text, {
    delay,
    skipClick = false,
    skipAutoClose = false,
    initialSelectionStart = void 0,
    initialSelectionEnd = void 0
  }) {
    if (element.disabled) return;
    if (!skipClick) (0, _click$2.click)(element);
    const currentElement = () => (0, _utils$5.getActiveElement)(element.ownerDocument);
    const value = (0, _utils$5.getValue)(currentElement());
    const {
      selectionStart,
      selectionEnd
    } = (0, _utils$5.getSelectionRange)(element);
    if (value != null && (selectionStart === null || selectionStart === 0) && (selectionEnd === null || selectionEnd === 0)) {
      (0, _utils$5.setSelectionRange)(currentElement(), initialSelectionStart != null ? initialSelectionStart : value.length, initialSelectionEnd != null ? initialSelectionEnd : value.length);
    }
    const {
      promise,
      releaseAllKeys: releaseAllKeys2
    } = (0, _keyboard.keyboardImplementationWrapper)(text, {
      delay,
      document: element.ownerDocument
    });
    if (delay > 0) {
      await promise;
    }
    if (!skipAutoClose) {
      releaseAllKeys2();
    }
    return promise;
  }
  Object.defineProperty(type$1, "__esModule", {
    value: true
  });
  type$1.type = type;
  var _dom$4 = require$$0;
  var _typeImplementation = typeImplementation$1;
  function type(element, text, {
    delay = 0,
    ...options
  } = {}) {
    if (delay > 0) {
      return (0, _dom$4.getConfig)().asyncWrapper(() => (0, _typeImplementation.typeImplementation)(element, text, {
        delay,
        ...options
      }));
    } else {
      return void (0, _typeImplementation.typeImplementation)(element, text, {
        delay,
        ...options
      }).catch(console.error);
    }
  }
  var clear$1 = {};
  Object.defineProperty(clear$1, "__esModule", {
    value: true
  });
  clear$1.clear = clear;
  var _utils$4 = utils;
  var _type = type$1;
  function clear(element) {
    var _element$selectionSta, _element$selectionEnd;
    if (!(0, _utils$4.isElementType)(element, ["input", "textarea"])) {
      throw new Error("clear currently only supports input and textarea elements.");
    }
    if ((0, _utils$4.isDisabled)(element)) {
      return;
    }
    const elementType = element.type;
    if (elementType !== "textarea") {
      element.type = "text";
    }
    (0, _type.type)(element, "{selectall}{del}", {
      delay: 0,
      initialSelectionStart: (_element$selectionSta = element.selectionStart) != null ? _element$selectionSta : (
        /* istanbul ignore next */
        void 0
      ),
      initialSelectionEnd: (_element$selectionEnd = element.selectionEnd) != null ? _element$selectionEnd : (
        /* istanbul ignore next */
        void 0
      )
    });
    if (elementType !== "textarea") {
      element.type = elementType;
    }
  }
  var tab$1 = {};
  Object.defineProperty(tab$1, "__esModule", {
    value: true
  });
  tab$1.tab = tab;
  var _dom$3 = require$$0;
  var _utils$3 = utils;
  var _focus$2 = focus$1;
  var _blur$1 = blur$1;
  function getNextElement(currentIndex, shift, elements, focusTrap) {
    if ((0, _utils$3.isDocument)(focusTrap) && (currentIndex === 0 && shift || currentIndex === elements.length - 1 && !shift)) {
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
    const previousElement = (0, _utils$3.getActiveElement)(doc);
    if (!focusTrap) {
      focusTrap = doc;
    }
    const focusableElements = focusTrap.querySelectorAll(_utils$3.FOCUSABLE_SELECTOR);
    const enabledElements = Array.from(focusableElements).filter((el) => el === previousElement || el.getAttribute("tabindex") !== "-1" && !(0, _utils$3.isDisabled)(el) && // Hidden elements are not tabable
    (0, _utils$3.isVisible)(el));
    if (enabledElements.length === 0) return;
    const orderedElements = enabledElements.map((el, idx) => ({
      el,
      idx
    })).sort((a, b) => {
      if (previousElement && previousElement.getAttribute("tabindex") === "-1") {
        return a.idx - b.idx;
      }
      const tabIndexA = Number(a.el.getAttribute("tabindex"));
      const tabIndexB = Number(b.el.getAttribute("tabindex"));
      const diff = tabIndexA - tabIndexB;
      return diff === 0 ? a.idx - b.idx : diff;
    }).map(({
      el
    }) => el);
    const checkedRadio = {};
    let prunedElements = [];
    orderedElements.forEach((currentElement) => {
      const el = currentElement;
      if (el.type === "radio" && el.name) {
        const prev = previousElement;
        if (prev && prev.type === el.type && prev.name === el.name) {
          if (el === prev) {
            prunedElements.push(el);
          }
          return;
        }
        if (el.checked) {
          prunedElements = prunedElements.filter((e) => e.type !== el.type || e.name !== el.name);
          prunedElements.push(el);
          checkedRadio[el.name] = el;
          return;
        }
        if (typeof checkedRadio[el.name] !== "undefined") {
          return;
        }
      }
      prunedElements.push(el);
    });
    const index2 = prunedElements.findIndex((el) => el === previousElement);
    const nextElement = getNextElement(index2, shift, prunedElements, focusTrap);
    const shiftKeyInit = {
      key: "Shift",
      keyCode: 16,
      shiftKey: true
    };
    const tabKeyInit = {
      key: "Tab",
      keyCode: 9,
      shiftKey: shift
    };
    let continueToTab = true;
    if (previousElement) {
      if (shift) _dom$3.fireEvent.keyDown(previousElement, {
        ...shiftKeyInit
      });
      continueToTab = _dom$3.fireEvent.keyDown(previousElement, {
        ...tabKeyInit
      });
    }
    const keyUpTarget = !continueToTab && previousElement ? previousElement : nextElement;
    if (continueToTab) {
      if (nextElement === doc.body) {
        if (previousElement) {
          (0, _blur$1.blur)(previousElement);
        }
      } else {
        (0, _focus$2.focus)(nextElement);
      }
    }
    _dom$3.fireEvent.keyUp(keyUpTarget, {
      ...tabKeyInit
    });
    if (shift) {
      _dom$3.fireEvent.keyUp(keyUpTarget, {
        ...shiftKeyInit,
        shiftKey: false
      });
    }
  }
  var upload$1 = {};
  Object.defineProperty(upload$1, "__esModule", {
    value: true
  });
  upload$1.upload = upload;
  var _dom$2 = require$$0;
  var _click$1 = click$1;
  var _blur = blur$1;
  var _focus$1 = focus$1;
  var _utils$2 = utils;
  function upload(element, fileOrFiles, init, {
    applyAccept = false
  } = {}) {
    var _input$files;
    const input = (0, _utils$2.isElementType)(element, "label") ? element.control : element;
    if (!input || !(0, _utils$2.isElementType)(input, "input", {
      type: "file"
    })) {
      throw new TypeError(`The ${input === element ? "given" : "associated"} ${input == null ? void 0 : input.tagName} element does not accept file uploads`);
    }
    if ((0, _utils$2.isDisabled)(element)) return;
    (0, _click$1.click)(element, init == null ? void 0 : init.clickInit);
    const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]).filter((file) => !applyAccept || isAcceptableFile(file, input.accept)).slice(0, input.multiple ? void 0 : 1);
    (0, _blur.blur)(element);
    (0, _focus$1.focus)(element);
    if (files.length === ((_input$files = input.files) == null ? void 0 : _input$files.length) && files.every((f, i2) => {
      var _input$files2;
      return f === ((_input$files2 = input.files) == null ? void 0 : _input$files2.item(i2));
    })) {
      return;
    }
    const inputFiles = {
      ...files,
      length: files.length,
      item: (index2) => files[index2],
      [Symbol.iterator]() {
        let i2 = 0;
        return {
          next: () => ({
            done: i2 >= files.length,
            value: files[i2++]
          })
        };
      }
    };
    (0, _dom$2.fireEvent)(input, (0, _dom$2.createEvent)("input", input, {
      target: {
        files: inputFiles
      },
      bubbles: true,
      cancelable: false,
      composed: true
    }));
    _dom$2.fireEvent.change(input, {
      target: {
        files: inputFiles
      },
      ...init == null ? void 0 : init.changeInit
    });
  }
  function isAcceptableFile(file, accept) {
    if (!accept) {
      return true;
    }
    const wildcards = ["audio/*", "image/*", "video/*"];
    return accept.split(",").some((acceptToken) => {
      if (acceptToken.startsWith(".")) {
        return file.name.endsWith(acceptToken);
      } else if (wildcards.includes(acceptToken)) {
        return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
      }
      return file.type === acceptToken;
    });
  }
  var selectOptions$1 = {};
  Object.defineProperty(selectOptions$1, "__esModule", {
    value: true
  });
  selectOptions$1.selectOptions = selectOptions$1.deselectOptions = void 0;
  var _dom$1 = require$$0;
  var _utils$1 = utils;
  var _click = click$1;
  var _focus = focus$1;
  var _hover = hover$1;
  function selectOptionsBase(newValue, select2, values, init, {
    skipPointerEventsCheck = false
  } = {}) {
    if (!newValue && !select2.multiple) {
      throw (0, _dom$1.getConfig)().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select2);
    }
    const valArray = Array.isArray(values) ? values : [values];
    const allOptions = Array.from(select2.querySelectorAll('option, [role="option"]'));
    const selectedOptions = valArray.map((val) => {
      if (typeof val !== "string" && allOptions.includes(val)) {
        return val;
      } else {
        const matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
        if (matchingOption) {
          return matchingOption;
        } else {
          throw (0, _dom$1.getConfig)().getElementError(`Value "${String(val)}" not found in options`, select2);
        }
      }
    }).filter((option) => !(0, _utils$1.isDisabled)(option));
    if ((0, _utils$1.isDisabled)(select2) || !selectedOptions.length) return;
    if ((0, _utils$1.isElementType)(select2, "select")) {
      if (select2.multiple) {
        for (const option of selectedOptions) {
          const withPointerEvents = skipPointerEventsCheck ? true : (0, _utils$1.hasPointerEvents)(option);
          if (withPointerEvents) {
            _dom$1.fireEvent.pointerOver(option, init);
            _dom$1.fireEvent.pointerEnter(select2, init);
            _dom$1.fireEvent.mouseOver(option);
            _dom$1.fireEvent.mouseEnter(select2);
            _dom$1.fireEvent.pointerMove(option, init);
            _dom$1.fireEvent.mouseMove(option, init);
            _dom$1.fireEvent.pointerDown(option, init);
            _dom$1.fireEvent.mouseDown(option, init);
          }
          (0, _focus.focus)(select2);
          if (withPointerEvents) {
            _dom$1.fireEvent.pointerUp(option, init);
            _dom$1.fireEvent.mouseUp(option, init);
          }
          selectOption(option);
          if (withPointerEvents) {
            _dom$1.fireEvent.click(option, init);
          }
        }
      } else if (selectedOptions.length === 1) {
        const withPointerEvents = skipPointerEventsCheck ? true : (0, _utils$1.hasPointerEvents)(select2);
        if (withPointerEvents) {
          (0, _click.click)(select2, init, {
            skipPointerEventsCheck
          });
        } else {
          (0, _focus.focus)(select2);
        }
        selectOption(selectedOptions[0]);
        if (withPointerEvents) {
          _dom$1.fireEvent.pointerOver(select2, init);
          _dom$1.fireEvent.pointerEnter(select2, init);
          _dom$1.fireEvent.mouseOver(select2);
          _dom$1.fireEvent.mouseEnter(select2);
          _dom$1.fireEvent.pointerUp(select2, init);
          _dom$1.fireEvent.mouseUp(select2, init);
          _dom$1.fireEvent.click(select2, init);
        }
      } else {
        throw (0, _dom$1.getConfig)().getElementError(`Cannot select multiple options on a non-multiple select`, select2);
      }
    } else if (select2.getAttribute("role") === "listbox") {
      selectedOptions.forEach((option) => {
        (0, _hover.hover)(option, init, {
          skipPointerEventsCheck
        });
        (0, _click.click)(option, init, {
          skipPointerEventsCheck
        });
        (0, _hover.unhover)(option, init, {
          skipPointerEventsCheck
        });
      });
    } else {
      throw (0, _dom$1.getConfig)().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select2);
    }
    function selectOption(option) {
      option.selected = newValue;
      (0, _dom$1.fireEvent)(select2, (0, _dom$1.createEvent)("input", select2, {
        bubbles: true,
        cancelable: false,
        composed: true,
        ...init
      }));
      _dom$1.fireEvent.change(select2, init);
    }
  }
  const selectOptions = selectOptionsBase.bind(null, true);
  selectOptions$1.selectOptions = selectOptions;
  const deselectOptions = selectOptionsBase.bind(null, false);
  selectOptions$1.deselectOptions = deselectOptions;
  var paste$1 = {};
  Object.defineProperty(paste$1, "__esModule", {
    value: true
  });
  paste$1.paste = paste;
  var _dom = require$$0;
  var _utils = utils;
  function isSupportedElement(element) {
    return (0, _utils.isElementType)(element, "input") && Boolean(_utils.editableInputTypes[element.type]) || (0, _utils.isElementType)(element, "textarea");
  }
  function paste(element, text, init, {
    initialSelectionStart,
    initialSelectionEnd
  } = {}) {
    if (!isSupportedElement(element)) {
      throw new TypeError(`The given ${element.tagName} element is currently unsupported.
      A PR extending this implementation would be very much welcome at https://github.com/testing-library/user-event`);
    }
    if ((0, _utils.isDisabled)(element)) {
      return;
    }
    (0, _utils.eventWrapper)(() => element.focus());
    if (element.selectionStart === 0 && element.selectionEnd === 0) {
      (0, _utils.setSelectionRange)(element, initialSelectionStart != null ? initialSelectionStart : element.value.length, initialSelectionEnd != null ? initialSelectionEnd : element.value.length);
    }
    _dom.fireEvent.paste(element, init);
    if (element.readOnly) {
      return;
    }
    text = text.substr(0, (0, _utils.getSpaceUntilMaxLength)(element));
    const {
      newValue,
      newSelectionStart
    } = (0, _utils.calculateNewValue)(text, element);
    _dom.fireEvent.input(element, {
      inputType: "insertFromPaste",
      target: {
        value: newValue
      }
    });
    (0, _utils.setSelectionRange)(
      element,
      // TODO: investigate why the selection caused by invalid parameters was expected
      {
        newSelectionStart,
        selectionEnd: newSelectionStart
      },
      {}
    );
  }
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", {
      value: true
    });
    exports3.default = void 0;
    Object.defineProperty(exports3, "specialChars", {
      enumerable: true,
      get: function() {
        return _keyboard2.specialCharMap;
      }
    });
    var _click2 = click$1;
    var _type2 = type$1;
    var _clear = clear$1;
    var _tab = tab$1;
    var _hover2 = hover$1;
    var _upload = upload$1;
    var _selectOptions = selectOptions$1;
    var _paste = paste$1;
    var _keyboard2 = keyboard;
    const userEvent = {
      click: _click2.click,
      dblClick: _click2.dblClick,
      type: _type2.type,
      clear: _clear.clear,
      tab: _tab.tab,
      hover: _hover2.hover,
      unhover: _hover2.unhover,
      upload: _upload.upload,
      selectOptions: _selectOptions.selectOptions,
      deselectOptions: _selectOptions.deselectOptions,
      paste: _paste.paste,
      keyboard: _keyboard2.keyboard
    };
    var _default2 = userEvent;
    exports3.default = _default2;
  })(dist);
  const index = /* @__PURE__ */ getDefaultExportFromCjs(dist);
  var eventMap$1 = {};
  Object.defineProperty(eventMap$1, "__esModule", {
    value: true
  });
  exports2.eventMap = eventMap$1.eventMap = eventMap$1.eventAliasMap = void 0;
  const eventMap = {
    // Clipboard Events
    copy: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    cut: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    paste: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Composition Events
    compositionEnd: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionStart: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionUpdate: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Keyboard Events
    keyDown: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyPress: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyUp: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    // Focus Events
    focus: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    blur: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    focusIn: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    focusOut: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // Form Events
    change: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    input: {
      EventType: "InputEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    invalid: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: true
      }
    },
    submit: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    reset: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Mouse Events
    click: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        button: 0,
        composed: true
      }
    },
    contextMenu: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dblClick: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drag: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragEnd: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragEnter: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragExit: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragLeave: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragOver: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragStart: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drop: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseDown: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseEnter: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseLeave: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseMove: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOut: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOver: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseUp: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Selection Events
    select: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Touch Events
    touchCancel: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    touchEnd: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchMove: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchStart: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // UI Events
    resize: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    scroll: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Wheel Events
    wheel: {
      EventType: "WheelEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Media Events
    abort: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlay: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlayThrough: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    durationChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    emptied: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    encrypted: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    ended: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedData: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedMetadata: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadStart: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pause: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    play: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    playing: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    progress: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    rateChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeked: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeking: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    stalled: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    suspend: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    timeUpdate: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    volumeChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    waiting: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Events
    load: {
      // TODO: load events can be UIEvent or Event depending on what generated them
      // This is where this abstraction breaks down.
      // But the common targets are <img />, <script /> and window.
      // Neither of these targets receive a UIEvent
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    error: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Animation Events
    animationStart: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationEnd: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationIteration: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Transition Events
    transitionCancel: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionEnd: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    transitionRun: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionStart: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // pointer events
    pointerOver: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerEnter: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pointerDown: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerMove: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerUp: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerCancel: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    pointerOut: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerLeave: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    gotPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    lostPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // history events
    popState: {
      EventType: "PopStateEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // window events
    offline: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    online: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    }
  };
  exports2.eventMap = eventMap$1.eventMap = eventMap;
  const eventAliasMap = {
    doubleClick: "dblClick"
  };
  eventMap$1.eventAliasMap = eventAliasMap;
  configure({
    testIdAttribute: "data-test-id",
    getElementError: buildJsGetElementError
  });
  const fireEventObj = fireEvent;
  exports2.act = act;
  exports2.buildJsGetElementError = buildJsGetElementError;
  exports2.buildQueries = buildQueries;
  exports2.cleanup = cleanup;
  exports2.configure = configure;
  exports2.createEvent = createEvent;
  exports2.findAllByAltText = findAllByAltText;
  exports2.findAllByDisplayValue = findAllByDisplayValue;
  exports2.findAllByLabelText = findAllByLabelText;
  exports2.findAllByPlaceholderText = findAllByPlaceholderText;
  exports2.findAllByRole = findAllByRole;
  exports2.findAllByTestId = findAllByTestId;
  exports2.findAllByText = findAllByText;
  exports2.findAllByTitle = findAllByTitle;
  exports2.findByAltText = findByAltText;
  exports2.findByDisplayValue = findByDisplayValue;
  exports2.findByLabelText = findByLabelText;
  exports2.findByPlaceholderText = findByPlaceholderText;
  exports2.findByRole = findByRole;
  exports2.findByTestId = findByTestId;
  exports2.findByText = findByText;
  exports2.findByTitle = findByTitle;
  exports2.fireEvent = fireEvent;
  exports2.fireEventObj = fireEventObj;
  exports2.getAllByAltText = getAllByAltText;
  exports2.getAllByDisplayValue = getAllByDisplayValue;
  exports2.getAllByLabelText = getAllByLabelTextWithSuggestions;
  exports2.getAllByPlaceholderText = getAllByPlaceholderText;
  exports2.getAllByRole = getAllByRole;
  exports2.getAllByTestId = getAllByTestId;
  exports2.getAllByText = getAllByText;
  exports2.getAllByTitle = getAllByTitle;
  exports2.getByAltText = getByAltText;
  exports2.getByDisplayValue = getByDisplayValue;
  exports2.getByLabelText = getByLabelTextWithSuggestions;
  exports2.getByPlaceholderText = getByPlaceholderText;
  exports2.getByRole = getByRole;
  exports2.getByTestId = getByTestId;
  exports2.getByText = getByText;
  exports2.getByTitle = getByTitle;
  exports2.getConfig = getConfig;
  exports2.getDefaultNormalizer = getDefaultNormalizer;
  exports2.getElementError = getElementError;
  exports2.getMultipleElementsFoundError = getMultipleElementsFoundError;
  exports2.getNodeText = getNodeText;
  exports2.getQueriesForElement = getQueriesForElement;
  exports2.getRoles = getRoles;
  exports2.getSuggestedQuery = getSuggestedQuery;
  exports2.isInaccessible = isInaccessible;
  exports2.logDOM = logDOM;
  exports2.logRoles = logRoles;
  exports2.makeFindQuery = makeFindQuery;
  exports2.makeGetAllQuery = makeGetAllQuery;
  exports2.makeSingleQuery = makeSingleQuery;
  exports2.prettyDOM = prettyDOM;
  exports2.prettyFormat = index$1;
  exports2.queries = queries;
  exports2.queryAllByAltText = queryAllByAltTextWithSuggestions;
  exports2.queryAllByAttribute = queryAllByAttribute;
  exports2.queryAllByDisplayValue = queryAllByDisplayValueWithSuggestions;
  exports2.queryAllByLabelText = queryAllByLabelTextWithSuggestions;
  exports2.queryAllByPlaceholderText = queryAllByPlaceholderTextWithSuggestions;
  exports2.queryAllByRole = queryAllByRoleWithSuggestions;
  exports2.queryAllByTestId = queryAllByTestIdWithSuggestions;
  exports2.queryAllByText = queryAllByTextWithSuggestions;
  exports2.queryAllByTitle = queryAllByTitleWithSuggestions;
  exports2.queryByAltText = queryByAltText;
  exports2.queryByAttribute = queryByAttribute;
  exports2.queryByDisplayValue = queryByDisplayValue;
  exports2.queryByLabelText = queryByLabelText;
  exports2.queryByPlaceholderText = queryByPlaceholderText;
  exports2.queryByRole = queryByRole;
  exports2.queryByTestId = queryByTestId;
  exports2.queryByText = queryByText;
  exports2.queryByTitle = queryByTitle;
  exports2.queryHelpers = queryHelpers;
  exports2.render = render;
  exports2.renderHook = renderHook;
  exports2.screen = screen;
  exports2.userEvent = index;
  exports2.waitFor = waitForWrapper;
  exports2.waitForElementToBeRemoved = waitForElementToBeRemoved;
  exports2.within = getQueriesForElement;
  exports2.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
  exports2.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
