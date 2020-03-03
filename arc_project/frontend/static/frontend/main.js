/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\src\\\\components\\\\App.js: Unexpected token (6:1)\\n\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 5 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mLogin\\u001b[39m from \\u001b[32m'./Login/login'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 6 | \\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<\\u001b[39m \\u001b[33mHEAD\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 7 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mModal\\u001b[39m from \\u001b[32m'./DefaultUI/Modal/modal'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 8 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mCollapsible\\u001b[39m from \\u001b[32m'./DefaultUI/Collapsible/collapsible'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 9 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mMain\\u001b[39m from \\u001b[32m'./Main/main'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n    at Object.raise (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:7017:17)\\n    at Object.unexpected (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8395:16)\\n    at Object.jsxParseIdentifier (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3894:12)\\n    at Object.jsxParseNamespacedName (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3904:23)\\n    at Object.jsxParseElementName (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3915:21)\\n    at Object.jsxParseOpeningElementAt (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4001:22)\\n    at Object.jsxParseElementAt (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4034:33)\\n    at Object.jsxParseElement (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4108:17)\\n    at Object.parseExprAtom (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4115:19)\\n    at Object.parseExprSubscripts (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9259:23)\\n    at Object.parseMaybeUnary (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9239:21)\\n    at Object.parseExprOps (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9109:23)\\n    at Object.parseMaybeConditional (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9082:23)\\n    at Object.parseMaybeAssign (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9037:21)\\n    at Object.parseExpression (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8989:23)\\n    at Object.parseStatementContent (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10819:23)\\n    at Object.parseStatement (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10690:17)\\n    at Object.parseBlockOrModuleBlockBody (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11264:25)\\n    at Object.parseBlockBody (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11251:10)\\n    at Object.parseTopLevel (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10621:10)\\n    at Object.parse (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12222:10)\\n    at parse (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12273:38)\\n    at parser (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\parser\\\\index.js:54:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:93:38)\\n    at normalizeFile.next (<anonymous>)\\n    at run (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\index.js:31:50)\\n    at run.next (<anonymous>)\\n    at Function.transform (C:\\\\Users\\\\minhq\\\\Documents\\\\code\\\\ARC\\\\arc_project\\\\frontend\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transform.js:27:41)\\n    at transform.next (<anonymous>)\");\n\n//# sourceURL=webpack:///./src/components/App.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.js\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });