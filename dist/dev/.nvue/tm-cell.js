var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { h, Fragment, getCurrentInstance, inject, onMounted, onUnmounted, ref, computed, watch, createVNode, Text, defineComponent, resolveComponent, openBlock, createBlock, unref, withCtx, normalizeClass, normalizeStyle, renderSlot, createCommentVNode, createElementBlock, withModifiers, createElementVNode, toRaw } from "vue";
import { c as custom_props, e as computedStyle, g as computedClass, _ as __easycom_3, t as tmIcon, i as __easycom_0, r as requireNativePlugin, u as useTmpiniaStore, h as tmTranslate, b as computedDark, d as computedTheme, m as cssDirection, a as __easycom_4, l as __easycom_1, f as formatAppLog } from "./tm-divider.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const language$2 = "English-US";
var en = {
  language: language$2,
  "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
  "index.search.tips": "Chinese/English name",
  "index.search.btntext": "search",
  "index.com.navtitle": "TMUI All platforms",
  "index.com.title": "Category Navigation",
  "index.com.tongyong": "Universal",
  "index.com.row": "Layout",
  "index.com.show": "Display",
  "index.com.form": "Form",
  "index.com.fd": "Reminder",
  "index.com.nav": "Navigation",
  "index.com.yewu": "Business",
  "index.com.other": "Other",
  "index.com.tubiao": "Chart",
  "index.com.tongyongSub": "can't translate",
  "index.com.rowSub": "can't translate",
  "index.com.showSub": "can't translate",
  "index.com.formSub": "can't translate",
  "index.com.fdSub": "can't translate",
  "index.com.navSub": "can't translate",
  "index.com.yewuSub": "can't translate",
  "index.com.otherSub": "can't translate",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.bottom": "tmui 3.0.0 fully compatible",
  "index.com.setLocal": "language setting",
  "index.com.love": "Action support",
  "index.com.loveSub": "Watch an ad",
  "index.com.themetext": "Dynamically switch themes\uFF0Cmore of see docs",
  "index.com.themeGreen": "Yellow",
  "index.com.themeBlue": "Blue",
  "index.com.themeRed": "Red",
  "index.com.themeDefault": "Default",
  "index.com.themeCustText": "custom",
  "message.load.text": "Loading",
  "message.error.text": "Error",
  "message.info.text": "Tips",
  "message.warn.text": "Warning",
  "message.quest.text": "Question",
  "message.success.text": "Success",
  "message.disabled.text": "Disabled",
  "message.wait.text": "Waiting"
};
const language$1 = "\u7B80\u4F53-\u4E2D\u56FD";
var zhHans = {
  language: language$1,
  "index.search.subtext": "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93",
  "index.search.tips": "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
  "index.search.btntext": "\u641C\u7D22\u7EC4\u4EF6",
  "index.com.navtitle": "TMUI \u5168\u5E73\u53F0\u7EC4\u4EF6\u5E93",
  "index.com.title": "\u5206\u7C7B\u5BFC\u822A",
  "index.com.tongyong": "\u901A\u7528\u7EC4\u4EF6",
  "index.com.tongyongSub": "\u9AD8\u9891\u5E38\u7528\u7EC4\u4EF6",
  "index.com.row": "\u5E03\u5C40\u7EC4\u4EF6",
  "index.com.rowSub": "\u5E03\u5C40\u6392\u7248",
  "index.com.show": "\u5C55\u793A\u7EC4\u4EF6",
  "index.com.showSub": "\u5E38\u89C1\u6570\u636E\u5C55\u793A",
  "index.com.form": "\u8868\u5355\u5F55\u5165",
  "index.com.formSub": "\u6570\u636E\u63D0\u4EA4\u7C7B",
  "index.com.fd": "\u53CD\u9988\u7C7B\u578B",
  "index.com.fdSub": "\u63D0\u793A\u5F39\u5C42\u7C7B\u7EC4\u4EF6",
  "index.com.nav": "\u5BFC\u822A\u7C7B\u578B",
  "index.com.navSub": "\u5206\u9875\u5BFC\u822A\u7C7B",
  "index.com.yewu": "\u4E1A\u52A1\u578B\u7EC4\u4EF6",
  "index.com.yewuSub": "\u4F18\u60E0\u5238\u5BFC\u8D2D\u7C7B",
  "index.com.other": "\u5176\u5B83",
  "index.com.otherSub": "\u529F\u80FD\u578B\u7EC4\u4EF6",
  "index.com.tubiao": "\u56FE\u8868\u7EC4\u4EF6",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.bottom": "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9",
  "index.com.setLocal": "\u8BBE\u7F6E\u8BED\u8A00",
  "index.com.love": "TMUI\u7528\u6237\u4E2D\u5FC3",
  "index.com.loveSub": "\u770B\u5E7F\u544A\u8D5A\u79EF\u5206",
  "index.com.themetext": "\u52A8\u6001\u5207\u6362\u4E3B\u9898,\u9ED8\u8BA4\u4E3B\u9898\u89C1\u6587\u6863",
  "index.com.themeGreen": "\u5C0F\u9EC4",
  "index.com.themeBlue": "\u84DD\u8272",
  "index.com.themeRed": "\u7EA2\u8272",
  "index.com.themeDefault": "\u9ED8\u8BA4",
  "index.com.themeCustText": "\u81EA\u5B9A",
  "message.load.text": "\u52A0\u8F7D\u4E2D",
  "message.error.text": "\u64CD\u4F5C\u9519\u8BEF",
  "message.info.text": "\u63D0\u793A\u4FE1\u606F",
  "message.warn.text": "\u8B66\u544A\u4FE1\u606F",
  "message.quest.text": "\u4F3C\u4E4E\u6709\u95EE\u9898",
  "message.success.text": "\u64CD\u4F5C\u6210\u529F",
  "message.disabled.text": "\u7981\u6B62\u64CD\u4F5C",
  "message.wait.text": "\u8BF7\u7A0D\u5019.."
};
/*!
  * @intlify/shared v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
{
  const perf = inBrowser && window.performance;
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = (tag) => perf.mark(tag);
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format(message, ...args) {
  if (args.length === 1 && isObject$2(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function hasOwn$2(obj, key) {
  return hasOwnProperty$2.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$2 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * @intlify/message-resolver v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isObject$1 = (val) => val !== null && typeof val === "object";
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse$1(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn$1(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$2(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: (key, modifier) => {
      const msg = message(key)(ctx);
      return isString(modifier) ? _modifier(modifier)(msg) : msg;
    },
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize
  };
  return ctx;
}
/*!
  * @intlify/message-compiler v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const errorMessages$2 = {
  [0]: `Expected token: '{0}'`,
  [1]: `Invalid token in placeholder: '{0}'`,
  [2]: `Unterminated single quote in placeholder`,
  [3]: `Unknown escape sequence: \\{0}`,
  [4]: `Invalid unicode escape sequence: {0}`,
  [5]: `Unbalanced closing brace`,
  [6]: `Unterminated closing brace`,
  [7]: `Empty placeholder`,
  [8]: `Not allowed nest placeholder`,
  [9]: `Invalid linked format`,
  [10]: `Plural must have messages`,
  [11]: `Unexpected empty linked modifier`,
  [12]: `Unexpected empty linked key`,
  [13]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
/*!
  * @intlify/devtools-if v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const warnMessages$1 = {
  [0]: `Not found '{key}' key in '{locale}' locale messages.`,
  [1]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [2]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [3]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [4]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [5]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage$1(code, ...args) {
  return format(warnMessages$1[code], ...args);
}
const VERSION$1 = "9.1.9";
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = "";
function getDefaultLinkedModifiers() {
  return {
    upper: (val) => isString(val) ? val.toUpperCase() : val,
    lower: (val) => isString(val) ? val.toLowerCase() : val,
    capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
  };
}
let _compiler;
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _cid = 0;
function createCoreContext(options = {}) {
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    onWarn,
    __datetimeFormatters,
    __numberFormatters,
    __meta
  };
  {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function isTranslateFallbackWarn(fallback, key) {
  return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
  return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  {
    const emitter = context.__v_emitter;
    if (emitter) {
      emitter.emit("missing", {
        locale,
        key,
        type,
        groupId: `${type}:${key}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    if (isTranslateMissingWarn(missingWarn, key)) {
      onWarn(getWarnMessage$1(0, { key, locale }));
    }
    return key;
  }
}
function getLocaleChain(ctx, fallback, start) {
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(start);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(start, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  getLocaleChain(ctx, fallback, locale);
}
function createCoreError(code) {
  return createCompileError(code, null, { messages: errorMessages$1 });
}
const errorMessages$1 = {
  [14]: "Invalid arguments",
  [15]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [16]: "The argument provided is not a valid ISO date string"
};
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  if (isString(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
    return key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$2(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn } = context;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(1, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    message = messages[targetLocale] || {};
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue(message, key)) === null) {
      format2 = message[key];
    }
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start && format2) {
        emitter.emit("message-resolve", {
          type: "message-resolve",
          key,
          message: format2,
          time: end - start,
          groupId: `${type}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString(format2) || isFunction(format2))
      break;
    const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
    if (missingRet !== key) {
      format2 = missingRet;
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
  if (inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(14);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("compile-error", {
            message: source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules } = context;
  const resolveMessage = (key) => {
    const val = resolveValue(message, key);
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __datetimeFormatters } = context;
  if (!Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(4));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(5, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
      throw createCoreError(16);
    }
    value = new Date(arg1);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(16);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(15);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(14);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __numberFormatters } = context;
  if (!Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(2));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(3, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(14);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * vue-i18n v9.1.9
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.1.9";
function initFeatureFlags() {
  let needWarn = false;
  {
    needWarn = true;
  }
  if (needWarn) {
    console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
  }
}
const warnMessages = {
  [6]: `Fall back to {type} '{key}' with root locale.`,
  [7]: `Not supported 'preserve'.`,
  [8]: `Not supported 'formatter'.`,
  [9]: `Not supported 'preserveDirectiveContent'.`,
  [10]: `Not supported 'getChoiceIndex'.`,
  [11]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [12]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code, ...args) {
  return format(warnMessages[code], ...args);
}
function createI18nError(code, ...args) {
  return createCompileError(code, null, { messages: errorMessages, args });
}
const errorMessages = {
  [14]: "Unexpected return type in composer",
  [15]: "Invalid argument",
  [16]: "Must be called at the top of a `setup` function",
  [17]: "Need to install with `app.use` function",
  [22]: "Unexpected error",
  [18]: "Not available in legacy mode",
  [19]: `Required in value: {0}`,
  [20]: `Invalid value`,
  [21]: `Cannot setup vue-devtools plugin`
};
const DEVTOOLS_META = "__INTLIFY_META__";
const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
const DatetimePartsSymbol = makeSymbol("__datetimeParts");
const NumberPartsSymbol = makeSymbol("__numberParts");
const EnableEmitter = makeSymbol("__enableEmitter");
const DisableEmitter = makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = makeSymbol("__injectWithOption");
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach(({ locale: locale2, resource }) => {
      if (locale2) {
        ret[locale2] = ret[locale2] || {};
        deepCopy(resource, ret[locale2]);
      } else {
        deepCopy(resource, ret);
      }
    });
  }
  if (options.flatJson) {
    for (const key in ret) {
      if (hasOwn$2(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(20);
  }
  for (const key in src) {
    if (hasOwn$2(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
};
function createComposer(options = {}) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US");
  const _fallbackLocale = ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  function getCoreContext() {
    return createCoreContext({
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      messageCompiler: function compileToFunction(source) {
        return (ctx) => {
          return ctx.normalize([source]);
        };
      },
      datetimeFormats: _datetimeFormats.value,
      numberFormats: _numberFormats.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
      __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
      __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
      __meta: { framework: "vue" }
    });
  }
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !!arg.resolvedMessage === false;
  }
  function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(6, {
            key,
            type: warnType
          }));
        }
        {
          const { __v_emitter: emitter } = _context;
          if (emitter && _fallbackRoot) {
            emitter.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(14);
    }
  }
  function t(...args) {
    return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$2(arg3)) {
      throw createI18nError(15);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) ? createVNode(Text, null, val, 0) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = translate(_context2, ...args);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TransrateVNodeSymbol](...args), (key) => [createVNode(Text, null, key, 0)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return resolveValue(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = resolveValue(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    datetimeFormats,
    numberFormats,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    rt,
    d,
    n,
    te,
    tm,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [TransrateVNodeSymbol]: transrateVNode,
    [NumberPartsSymbol]: numberParts,
    [DatetimePartsSymbol]: datetimeParts,
    [SetPluralRulesSymbol]: setPluralRules,
    [InejctWithOption]: options.__injectWithOption
  };
  {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
({
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    const keys = Object.keys(slots).filter((key) => key !== "_");
    return () => {
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? h(props.tag, assignedAttrs, children) : h(Fragment, assignedAttrs, children);
    };
  }
});
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    return slots.default ? slots.default() : [];
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$2(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    return isString(props.tag) ? h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? h(props.tag, assignedAttrs, children) : h(Fragment, assignedAttrs, children);
  };
}
const NUMBER_FORMAT_KEYS = [
  "localeMatcher",
  "style",
  "unit",
  "unitDisplay",
  "currency",
  "currencyDisplay",
  "useGrouping",
  "numberingSystem",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "notation",
  "formatMatcher"
];
({
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
  }
});
const DATETIME_FORMAT_KEYS = [
  "dateStyle",
  "timeStyle",
  "fractionalSecondDigits",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "localeMatcher",
  "timeZone",
  "hour12",
  "hourCycle",
  "formatMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName"
];
({
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
  }
});
function addTimelineEvent(event, payload) {
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(16);
  }
  if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(17);
  }
  const i18n = inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
  if (!i18n) {
    throw createI18nError(22);
  }
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
  if (scope === "global") {
    let messages = isObject$2(options.messages) ? options.messages : {};
    if ("__i18nGlobal" in instance.type) {
      messages = getLocaleMessages(global2.locale.value, {
        messages,
        __i18n: instance.type.__i18nGlobal
      });
    }
    const locales = Object.keys(messages);
    if (locales.length) {
      locales.forEach((locale) => {
        global2.mergeLocaleMessage(locale, messages[locale]);
      });
    }
    if (isObject$2(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$2(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      {
        warn(getWarnMessage(12));
      }
      composer2 = global2;
    }
    return composer2;
  }
  if (i18n.mode === "legacy") {
    throw createI18nError(18);
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const type = instance.type;
    const composerOptions = assign({}, options);
    if (type.__i18n) {
      composerOptions.__i18n = type.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      const vueI18n = i18nInternal.__getInstance(current);
      if (vueI18n != null) {
        composer = vueI18n.__composer;
      }
      if (useComponent && composer && !composer[InejctWithOption]) {
        composer = null;
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter = null;
  onMounted(() => {
    if (target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
      emitter.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
      emitter && emitter.off("*", addTimelineEvent);
      const _composer = composer;
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.vnode.el.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
  }, target);
}
{
  initFeatureFlags();
}
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format2, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format2.length) {
    let char = format2[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format2[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format2[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index < tokens.length) {
    const token = tokens[index];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== "undefined" && uni.getLocale) {
    return uni.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t = (key, values) => {
    if (typeof getApp !== "function") {
      t = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
const language = function(key) {
  const messages = {
    en,
    "zh-Hans": zhHans
  };
  ({
    locale: uni.getLocale(),
    messages
  });
  const { t } = initVueI18n(messages);
  return t(key);
};
var _style_0$2 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderRadius": 0 } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-button",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    fontColor: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    shadow: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const formtype = computed(() => props.formType);
    let FormParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy == null ? void 0 : proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_c = FormParent == null ? void 0 : FormParent.$parent) != null ? _c : void 0;
        }
      }
    }
    const customCSSStyle = computed(() => {
      return __spreadProps(__spreadValues({
        height: btnSizeObj.value.h + props.unit
      }, computedStyle(props)), {
        border: "0px solid rgba(0, 0, 0, 0)",
        background: "rgba(0, 0, 0, 0)",
        borderRadius: "0px"
      });
    });
    const customClass = computed(() => computedClass(props));
    const isclickOn = ref(false);
    const _load = computed(() => props.loading);
    const _disabled = computed(() => props.disabled);
    const _label = computed(() => props.label);
    const _icon = computed(() => props.icon);
    const sizeObj = computed(() => {
      if (props.unit == "px") {
        return {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 44, h: 18, fontSize: 10, round: 2 },
          small: { w: 60, h: 28, fontSize: 11, round: 3 },
          normal: { w: 110, h: 40, fontSize: 14, round: 3 },
          middle: { w: 180, h: 40, fontSize: 15, round: 3 },
          large: { w: 268, h: 44, fontSize: 16, round: 4 }
        };
      }
      return {
        block: { w: 0, h: 80, fontSize: 28, round: 3 },
        mini: { w: 88, h: 36, fontSize: 20, round: 2 },
        small: { w: 120, h: 56, fontSize: 22, round: 3 },
        normal: { w: 220, h: 80, fontSize: 28, round: 3 },
        middle: { w: 360, h: 80, fontSize: 30, round: 3 },
        large: { w: 535, h: 88, fontSize: 32, round: 4 }
      };
    });
    const btnSizeObj = computed(() => {
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return { w: 0, h: props.height || sizeObj.value.block.h, fontSize: fontSize || sizeObj.value.block.fontSize, round: props.round == -1 ? 0 : props.round || sizeObj.value.normal.round };
      }
      return {
        w: props.width || sizeObj.value[props.size].w,
        h: props.height || sizeObj.value[props.size].h,
        fontSize: fontSize || sizeObj.value[props.size].fontSize,
        round: props.round == -1 ? 0 : props.round || sizeObj.value[props.size].round
      };
    });
    const _fontColor = computed(() => props.fontColor);
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
        FormParent[formtype.value]();
      }
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        uni.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
        ;
    }
    return (_ctx, _cache) => {
      const _component_button = resolveComponent("button");
      return openBlock(), createBlock(__easycom_3, {
        "no-level": "",
        _style: { opacity: isclickOn.value || unref(_disabled) ? 0.7 : 1 },
        "hover-class": "none",
        round: unref(btnSizeObj).round,
        width: unref(btnSizeObj).w,
        height: unref(btnSizeObj).h,
        padding: props.padding,
        margin: props.margin,
        color: props.color,
        shadow: props.shadow,
        transprent: props.transprent,
        linear: props.linear,
        "linear-deep": props.linearDeep,
        text: props.text,
        outlined: props.outlined,
        dark: props.dark,
        "follow-dark": props.followDark,
        "follow-theme": props.followTheme,
        "border-direction": props.borderDirection,
        "border-style": props.borderStyle,
        border: props.border,
        blur: props.blur,
        _class: "flex flex-row flex-center "
      }, {
        default: withCtx(() => [
          createVNode(_component_button, {
            onClick: onclick,
            onTouchstart: touchstart,
            onTouchend: touchend,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            onTouchcancel: _cache[1] || (_cache[1] = ($event) => {
              isclickOn.value = false;
              emits("touchcancel", $event);
            }),
            onTouchmove: _cache[2] || (_cache[2] = ($event) => emits("touchmove", $event)),
            onGetphonenumber: _cache[3] || (_cache[3] = ($event) => emits("getphonenumber", $event)),
            onError: _cache[4] || (_cache[4] = ($event) => emits("error", $event)),
            onOpensetting: _cache[5] || (_cache[5] = ($event) => emits("opensetting", $event)),
            onLaunchapp: _cache[6] || (_cache[6] = ($event) => emits("launchapp", $event)),
            onContact: _cache[7] || (_cache[7] = ($event) => emits("contact", $event)),
            "form-type": props.formType,
            openType: props.openType,
            appParameter: props.appParameter,
            sessionFrom: props.sessionFrom,
            sendMessageTitle: props.sendMessageTitle,
            sendMessagePath: props.sendMessagePath,
            sendMessageImg: props.sendMessageImg,
            sendMessageCard: props.sendMessageCard,
            loading: unref(_load),
            disabled: unref(_disabled),
            "hover-start-time": 1e7,
            "hover-stop-propagation": "",
            "hover-class": "bhover",
            class: normalizeClass(["button flex-1 flex-center", [unref(customClass)]]),
            style: normalizeStyle(unref(customCSSStyle))
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  _class: unref(_label) ? "pr-10" : "",
                  unit: props.unit,
                  fontSize: unref(btnSizeObj).fontSize * 0.9,
                  name: unref(_icon)
                }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : createCommentVNode("v-if", true),
                createVNode(__easycom_0, {
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  fontSize: unref(btnSizeObj).fontSize,
                  unit: props.unit,
                  label: unref(_label)
                }, null, 8, ["color", "fontSize", "unit", "label"])
              ])
            ]),
            _: 3
          }, 8, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "class", "style"])
        ]),
        _: 3
      }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
    };
  }
});
var tmButton = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["styles", [_style_0$2]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-button/tm-button.vue"]]);
var _style_0$1 = { "blurbg": { "": { "opacity": 0 } } };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tm-overlay",
  props: __spreadProps(__spreadValues({}, custom_props), {
    align: {
      type: String,
      default: "flex-center"
    },
    bgColor: {
      type: String,
      default: "rgba(0,0,0,0.35)"
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 200
    }
  }),
  emits: ["click", "open", "close", "update:show"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const props = __props;
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const customCSSStyle = computedStyle(props);
    const customClass = computedClass(props);
    const width = ref(0);
    const height = ref(0);
    const top = ref(0);
    ref(false);
    let timids = uni.$tm.u.getUid(1);
    const sysinfo = uni.getSystemInfoSync();
    width.value = sysinfo.windowWidth;
    height.value = sysinfo.windowHeight;
    uni.hideKeyboard();
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    for (let i = 0; i < uni.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    sysinfo.windowHeight + sysinfo.windowTop;
    if (!isCustomHeader) {
      if (sysinfo.osName == "android") {
        height.value = ((_d = (_c = sysinfo.safeArea) == null ? void 0 : _c.height) != null ? _d : sysinfo.windowHeight) - 44 - ((_f = (_e = sysinfo.safeAreaInsets) == null ? void 0 : _e.bottom) != null ? _f : 0);
      } else {
        height.value = ((_h = (_g = sysinfo.safeArea) == null ? void 0 : _g.height) != null ? _h : sysinfo.windowHeight) - 44;
      }
    } else {
      height.value = ((_j = (_i = sysinfo.safeArea) == null ? void 0 : _i.height) != null ? _j : sysinfo.windowHeight) + ((_k = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _k : 0) + ((_m = (_l = sysinfo.safeAreaInsets) == null ? void 0 : _l.bottom) != null ? _m : 0);
    }
    let timerId = NaN;
    const animationData = ref(null);
    const showMask = ref(false);
    onUnmounted(() => clearTimeout(timerId));
    const align_rpx = computed(() => props.align);
    const bgColor_rp = computed(() => {
      if (!props.bgColor || props.transprent)
        return "rgba(0,0,0,0)";
      return props.bgColor || "rgba(0,0,0,0.2)";
    });
    onMounted(() => {
      if (!props.show)
        return;
      open(props.show);
    });
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    function close(e) {
      try {
        e.stopPropagation();
        e.stopImmediatePropagation();
      } catch (e2) {
      }
      emits("click", e);
      if (timerId) {
        clearTimeout(timerId);
        timerId = NaN;
      }
      debounce(() => {
        if (!props.overlayClick)
          return;
        open(false);
      }, 250, true);
    }
    function open(off) {
      if (off == true) {
        uni.hideKeyboard();
      }
      fadeInNvue(off);
    }
    function fadeInNvue(off = false) {
      if (off == false) {
        if (showMask.value == off)
          return;
        clearTimeout(timids);
        timids = setTimeout(function() {
          var testEl = proxy.$refs.overlay;
          animation.transition(testEl, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 0
            },
            duration: props.duration || 1,
            timingFunction: "ease",
            delay: 0
          }, () => {
            showMask.value = off;
            emits("close");
            emits("update:show", false);
          });
        }, props.duration || 1);
      } else {
        showMask.value = off;
        emits("open");
        clearTimeout(timids);
        timids = setTimeout(function() {
          var testEl = proxy == null ? void 0 : proxy.$refs.overlay;
          animation.transition(testEl, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 1
            },
            duration: props.duration || 1,
            timingFunction: "ease",
            delay: 0
          }, () => {
          });
        }, 50);
      }
    }
    watch(() => props.show, (newval) => {
      open(newval);
    });
    expose({ close, open });
    return (_ctx, _cache) => {
      return showMask.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        ref: "overlay",
        onClick: withModifiers(close, ["stop"]),
        class: normalizeClass([unref(bgColor_rp) && !props.transprent ? "blurbg" : "", unref(align_rpx), " navbarheight flex flex-col  l-0  ", unref(customClass)]),
        style: normalizeStyle([
          unref(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? unref(bgColor_rp) : "" } : "",
          { position: "fixed" },
          __props.zIndex ? { zIndex: __props.zIndex } : "",
          { width: width.value + "px", height: height.value + "px", top: top.value + "px" },
          unref(customCSSStyle)
        ]),
        animation: animationData.value
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 14, ["onClick", "animation"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$1]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
var modelType = /* @__PURE__ */ ((modelType2) => {
  modelType2["load"] = "load";
  modelType2["error"] = "error";
  modelType2["info"] = "info";
  modelType2["warn"] = "warn";
  modelType2["quest"] = "quest";
  modelType2["success"] = "success";
  modelType2["disabled"] = "disabled";
  modelType2["wait"] = "wait";
  return modelType2;
})(modelType || {});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-message",
  props: {
    _style: {
      type: [Array, String, Object],
      default: () => {
      }
    },
    _class: {
      type: [Array, String],
      default: "flex-center"
    },
    mask: {
      type: [Boolean],
      default: true
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  emits: ["click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const tranAni = ref(null);
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const uid = ref(uni.$tm.u.getUid(5));
    const bgColor = ref("white");
    const model_ref = ref(modelType.info);
    const showValue = ref(false);
    const icon_ref = ref("");
    const text_ref = ref("");
    const color_ref = ref("");
    const reverse = ref(false);
    const dur = ref(0);
    const initByWechat = ref(true);
    const showMask = ref(props.mask);
    const dark_ref = ref(false);
    onUnmounted(() => clearTimeout(uid.value));
    watch(() => props.mask, (val) => showMask.value = val);
    let zindex = {};
    const modelIcon = computed(() => {
      return {
        load: {
          icon: "tmicon-loading",
          color: "primary",
          text: language("message.load.text")
        },
        error: {
          icon: "tmicon-times-circle",
          color: "red",
          text: language("message.error.text")
        },
        info: {
          icon: "tmicon-info-circle",
          text: language("message.info.text"),
          color: "black"
        },
        warn: {
          icon: "tmicon-exclamation-circle",
          text: language("message.warn.text"),
          color: "orange"
        },
        quest: {
          icon: "tmicon-question-circle",
          text: language("message.quest.text"),
          color: "pink"
        },
        success: {
          icon: "tmicon-check-circle",
          text: language("message.success.text"),
          color: "green"
        },
        disabled: {
          icon: "tmicon-ban",
          text: language("message.disabled.text"),
          color: "red"
        },
        wait: {
          icon: "tmicon-ios-alarm",
          text: language("message.wait.text"),
          color: "black"
        }
      };
    });
    function msgOver() {
      var _a2, _b2;
      (_a2 = tranAni.value) == null ? void 0 : _a2.stop();
      (_b2 = tranAni.value) == null ? void 0 : _b2.reset();
      clearTimeout(uid.value);
      uid.value = setTimeout(function() {
        if (dur.value > 0 && model_ref.value != "load") {
          reverse.value = false;
          showValue.value = false;
        }
      }, dur.value);
    }
    function show(argFs) {
      let arg = argFs || {};
      let { duration, icon, text, color, dark, model, mask } = arg;
      model_ref.value = typeof model == "undefined" ? model_ref.value : model;
      icon_ref.value = icon = icon != null ? icon : modelIcon.value[model_ref.value].icon;
      text_ref.value = text = text != null ? text : modelIcon.value[model_ref.value].text;
      color_ref.value = color = color != null ? color : modelIcon.value[model_ref.value].color;
      showMask.value = typeof mask === "boolean" ? mask : showMask.value;
      if (dark === true) {
        bgColor.value = "black";
      }
      if (typeof dark !== "boolean") {
        dark = store.tmStore.dark;
      }
      if (color_ref.value == "white" || color_ref.value == "black") {
        color_ref.value = "";
      }
      dark_ref.value = dark;
      if (typeof duration === "undefined") {
        duration = props.duration;
      }
      dur.value = isNaN(parseInt(String(duration))) ? 1500 : parseInt(String(duration));
      reverse.value = false;
      showValue.value = true;
      setTimeout(() => {
        var _a2;
        (_a2 = tranAni.value) == null ? void 0 : _a2.play();
      }, 80);
    }
    function hide() {
      showValue.value = false;
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return showValue.value ? (openBlock(), createBlock(tmOverlay, {
        key: 0,
        blur: "",
        duration: 0,
        transprent: !showMask.value,
        _style: unref(zindex),
        overlayClick: false,
        show: showValue.value,
        "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showValue.value = $event)
      }, {
        default: withCtx(() => [
          createVNode(tmTranslate, {
            initByWechat: initByWechat.value,
            onEnd: msgOver,
            reverse: reverse.value,
            ref_key: "tranAni",
            ref: tranAni,
            name: "zoom",
            duration: 160,
            "auto-play": false
          }, {
            default: withCtx(() => [
              createVNode(__easycom_3, {
                blur: "",
                _style: props._style,
                _class: props._class,
                color: bgColor.value,
                border: 1,
                shadow: 10,
                width: 300,
                height: 300,
                margin: [40, 40],
                round: 12,
                padding: [24, 0]
              }, {
                default: withCtx(() => [
                  createElementVNode("view", {
                    class: "flex flex-center flex-col ma-30",
                    style: { "line-height": "normal" }
                  }, [
                    createVNode(tmIcon, {
                      _style: "line-height: normal",
                      style: { "line-height": "normal" },
                      _class: "pa-10",
                      spin: model_ref.value == "load",
                      color: color_ref.value,
                      fontSize: 72,
                      name: icon_ref.value
                    }, null, 8, ["spin", "color", "name"]),
                    createVNode(__easycom_0, {
                      "font-size": 30,
                      _class: "pt-8 text-overflow-1",
                      label: text_ref.value
                    }, null, 8, ["label"])
                  ])
                ]),
                _: 1
              }, 8, ["_style", "_class", "color"])
            ]),
            _: 1
          }, 8, ["initByWechat", "reverse"])
        ]),
        _: 1
      }, 8, ["transprent", "_style", "show"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmMessage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-message/tm-message.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    focusColor: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    prefix: {
      type: String,
      default: ""
    },
    prefixLabel: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    search: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    errorLabel: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const isAndroid = ref(false);
    isAndroid.value = uni.getSystemInfoSync().platform == "android" ? true : false;
    const _height = computed(() => props.height);
    const _inputPadding = computed(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
    let timerId = NaN;
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    const propsDetail = computed(() => {
      return {
        focus: props.focus,
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: uni.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type,
        cursor: props.cursor,
        showConfirmBar: props.showConfirmBar,
        selectionStart: props.selectionStart,
        selectionEnd: props.selectionEnd,
        disableDefaultPadding: props.disableDefaultPadding,
        fixed: props.fixed
      };
    });
    const tmcfg = computed(() => store.tmStore);
    computed(() => computedStyle(props));
    computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const _requiredError = ref(false);
    const _foucsActive = ref(props.focus || false);
    watch(() => props.focus, () => {
      _foucsActive.value = props.focus;
    });
    const _color = computed(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = computed(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = ref(propsDetail.value.password);
    const showPasswordIcon = computed(() => props.password);
    ref(props.errorLabel);
    const _value = ref(props.modelValue);
    const _valueLenChar = computed(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    watch(() => props.modelValue, () => _value.value = props.modelValue);
    const rulesObj = inject("tmFormItemRules", computed(() => {
      var _a2;
      return [{
        message: (_a2 = props == null ? void 0 : props.errorLabel) != null ? _a2 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: false,
        validator: false
      }];
    }));
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus() {
      _foucsActive.value = true;
      emits("focus");
    }
    function blur() {
      _foucsActive.value = false;
      pushFormItem();
      emits("blur");
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      _value.value = e.detail.value;
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    function inputClick(e, type) {
      e.stopPropagation();
      debounce(() => emits("click", e), 150, true);
    }
    watch(_value, () => debounce(pushFormItem, 150));
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return String(val).length == 0 || typeof val === null ? false : true;
            }
          });
        } else {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return true;
            }
          });
        }
      });
      let rules_filter = rules.filter((el) => {
        return typeof el.validator === "function" && el.required === true;
      });
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_value.value);
            if (vr) {
              res({
                message: String(el.message),
                validator: true
              });
            } else {
              rej({
                message: el.message,
                validator: false
              });
            }
          } else {
            res({
              message: el.message,
              validator: true
            });
          }
        });
      });
      return Promise.all(rules_fun);
    };
    async function pushFormItem(isCheckVail = true) {
      if (parentFormItem) {
        if (isCheckVail) {
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: false,
              componentsName: "tm-input",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: true,
              componentsName: "tm-input",
              message: er.message
            });
          });
        }
      }
    }
    watch(tmFormFun, () => {
      if (tmFormFun.value == "validate") {
        pushFormItem();
      }
      if (tmFormFun.value == "reset") {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
      if (tmFormFun.value == "clearValidate") {
        _requiredError.value = false;
        pushFormItem(false);
      }
    });
    pushFormItem(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(__easycom_3, {
        transprent: true,
        margin: props.margin,
        padding: props.padding
      }, {
        default: withCtx(() => [
          createVNode(__easycom_3, {
            transprent: props.transprent,
            round: props.round,
            "no-level": "",
            margin: [0, 0],
            padding: unref(_inputPadding),
            border: props.border,
            text: props.text,
            color: unref(_color),
            outlined: props.outlined,
            shadow: props.shadow,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: normalizeClass(["flex flex-row", [unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                onClick: _cache[6] || (_cache[6] = ($event) => inputClick($event)),
                style: normalizeStyle([{ height: `${unref(_height)}rpx` }])
              }, [
                unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "px-9"
                })) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "left"),
                unref(propsDetail).prefix ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "pr-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: unref(propsDetail).prefix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).prefixLabel ? (openBlock(), createElementBlock("view", {
                  key: 2,
                  class: "pr-24"
                }, [
                  createVNode(__easycom_0, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).prefixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                !isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 3,
                  onClick: withModifiers(inputClick, ["stop"]),
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-12",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ], 8, ["onClick"])) : createCommentVNode("v-if", true),
                isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 4,
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    onClick: _cache[2] || (_cache[2] = ($event) => emits("click", $event)),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[3] || (_cache[3] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    onClick: _cache[4] || (_cache[4] = ($event) => emits("click", $event)),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[5] || (_cache[5] = ($event) => emits("keyboardheightchange")),
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    autoHeight: unref(propsDetail).autoHeight,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-10",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showClear && unref(_valueLenChar) > 0 ? (openBlock(), createElementBlock("view", {
                  key: 5,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    onClick: clearBtn,
                    "font-size": unref(propsDetail).fontSize * 0.9,
                    name: "tmicon-times-circle-fill"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                _requiredError.value ? (openBlock(), createElementBlock("view", {
                  key: 6,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: "tmicon-exclamation-circle"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffix ? (openBlock(), createElementBlock("view", {
                  key: 7,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize * 0.85,
                    name: unref(propsDetail).suffix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffixLabel ? (openBlock(), createElementBlock("view", {
                  key: 8,
                  class: "pl-16"
                }, [
                  createVNode(__easycom_0, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).suffixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                unref(showPasswordIcon) ? (openBlock(), createElementBlock("view", {
                  key: 9,
                  class: "pl-16"
                }, [
                  createCommentVNode(" tmicon-eyeslash-fill "),
                  createVNode(tmIcon, {
                    onClick: changeSeePassword,
                    "font-size": unref(propsDetail).fontSize,
                    name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 10,
                  class: "pl-16 flex-row flex"
                }, [
                  createVNode(__easycom_0, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(__easycom_0, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 11,
                  class: "pl-16 flex-row flex absolute r-0 b-12"
                }, [
                  createVNode(__easycom_0, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(__easycom_0, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "right", {}, () => [
                  unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    class: "pl-16"
                  }, [
                    createVNode(tmButton, {
                      followTheme: props.followTheme,
                      onClick: searchClick,
                      color: props.focusColor,
                      "font-size": 24,
                      height: unref(_height) - 11,
                      padding: [16, 0],
                      block: "",
                      margin: [0, 0],
                      icon: unref(propsDetail).search,
                      label: unref(propsDetail).searchLabel
                    }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                  ])) : createCommentVNode("v-if", true)
                ])
              ], 6)
            ]),
            _: 3
          }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
          createCommentVNode(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
          createCommentVNode(" _requiredError "),
          createCommentVNode(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
        ]),
        _: 3
      }, 8, ["margin", "padding"]);
    };
  }
});
var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-input/tm-input.vue"]]);
var _style_0 = {};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-cell",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: {
      type: String,
      default: ""
    },
    titleFontSize: {
      type: [Number],
      default: 28
    },
    label: {
      type: String,
      default: ""
    },
    labelColor: {
      type: String,
      default: "grey"
    },
    rightText: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: "tmicon-angle-right"
    },
    rightColor: {
      type: String,
      default: "grey"
    },
    rightTextSize: {
      type: Number,
      default: 24
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarRound: {
      type: Number,
      default: 10
    },
    border: {
      type: [Number],
      default: 0
    },
    borderDirection: {
      type: [String],
      default: cssDirection.bottom
    },
    bottomBorder: {
      type: [Boolean],
      default: false
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    function cellClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url,
            fail(error) {
              formatAppLog("error", "at tmui/components/tm-cell/tm-cell.vue:208", "\u6253\u5F00\u8FDE\u63A5\u9519\u8BEF\uFF1A", error);
            }
          });
        } catch (e2) {
        }
      }
    }
    const _computedValue = computed(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { class: "relative overflow" }, [
        createVNode(__easycom_3, {
          onClick: cellClick,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding,
          _class: props._class,
          _style: props._style,
          "hover-class": "opacity-6"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              userInteractionEnabled: true,
              class: normalizeClass(["flex flex-row flex-row-center-center", [unref(_computedValue).url ? "url" : ""]])
            }, [
              unref(_computedValue).showAvatar ? (openBlock(), createElementBlock("view", {
                key: 0,
                style: normalizeStyle({
                  width: `${unref(_computedValue).avatarSize}rpx`,
                  height: `${unref(_computedValue).avatarSize}rpx`
                }),
                class: "flex flex-row flex-row-center-center"
              }, [
                renderSlot(_ctx.$slots, "avatar", {}, () => [
                  createVNode(__easycom_4, {
                    round: unref(_computedValue).avatarRound,
                    width: unref(_computedValue).avatarSize,
                    height: unref(_computedValue).avatarSize,
                    src: unref(_computedValue).avatar
                  }, null, 8, ["round", "width", "height", "src"])
                ])
              ], 4)) : createCommentVNode("v-if", true),
              createElementVNode("view", {
                class: "flex-1 flex flex-row flex-row-center-between",
                style: { "width": "0px" }
              }, [
                createElementVNode("view", null, [
                  createElementVNode("view", {
                    class: normalizeClass(["flex flex-5 flex-col", [unref(_computedValue).showAvatar ? "pl-24" : ""]])
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(__easycom_0, {
                        fontSize: unref(_computedValue).titleFontSize,
                        label: unref(_computedValue).title
                      }, null, 8, ["fontSize", "label"])
                    ]),
                    renderSlot(_ctx.$slots, "label", {}, () => [
                      unref(_computedValue).label ? (openBlock(), createElementBlock("view", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(__easycom_0, {
                          color: unref(_computedValue).labelColor,
                          fontSize: 22,
                          label: unref(_computedValue).label
                        }, null, 8, ["color", "label"])
                      ])) : createCommentVNode("v-if", true)
                    ])
                  ], 2)
                ]),
                createElementVNode("view", {
                  class: "flex-1 flex-row flex-row-center-end",
                  style: { "width": "0px" }
                }, [
                  renderSlot(_ctx.$slots, "rightText", {}, () => [
                    unref(_computedValue).rightText ? (openBlock(), createBlock(__easycom_0, {
                      key: 0,
                      _class: "nowrap pr-12",
                      color: unref(_computedValue).rightColor,
                      fontSize: unref(_computedValue).rightTextSize,
                      label: unref(_computedValue).rightText
                    }, null, 8, ["color", "fontSize", "label"])) : createCommentVNode("v-if", true)
                  ]),
                  renderSlot(_ctx.$slots, "right", {}, () => [
                    unref(_computedValue).rightIcon ? (openBlock(), createBlock(tmIcon, {
                      key: 0,
                      _class: "opacity-3",
                      name: unref(_computedValue).rightIcon,
                      fontSize: 22
                    }, null, 8, ["name"])) : createCommentVNode("v-if", true)
                  ])
                ])
              ])
            ], 2)
          ]),
          _: 3
        }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
        unref(_computedValue).bottomBorder ? (openBlock(), createBlock(__easycom_1, {
          key: 0,
          margin: [0, 0],
          style: normalizeStyle({
            left: `${unref(_computedValue).avatar !== "" ? unref(_computedValue).avatarSize + unref(_computedValue).margin[0] : 0}rpx`
          })
        }, null, 8, ["style"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-cell/tm-cell.vue"]]);
export { tmInput as a, tmCell as b, tmMessage as c, tmButton as d, tmOverlay as t };
