(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./fonts/Overpass/Overpass-Regular.ttf */ "./src/fonts/Overpass/Overpass-Regular.ttf"));

// Module
exports.push([module.i, "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n\n@font-face {\n  font-family: 'Overpass';\n  src: local('Overpass'), url(" + ___CSS_LOADER_URL___0___ + ") format('truetype');\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/components/navbar.css":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/style/components/navbar.css ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/home.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/style/pages/home.css ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/login.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/style/pages/login.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\nbody {\n  font-family: 'Overpass', sans-serif;\n  display: block;\n  overflow: hidden;\n}\n\n.container {\n  display: flex;\n  grid-gap: 12.375rem;\n  gap: 12.375rem;\n  padding: 6.25rem 13.625rem 0 8rem;\n}\n\n/* Estilos para a caixa de login */\n.login-box {\n  z-index: 100;\n  width: 26.75rem;\n  height: 33.5rem;\n  background-color: #ffffff; /* Cor de fundo da caixa de login */\n  border-radius: 0.625rem;\n  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);\n}\n  \n  /* Estilos para o conteúdo da caixa de login, como campos de entrada, botões, etc. */\n.login-box-content {\n  z-index: 100;\n  padding: 0 2.81rem 0 2.96rem;\n}\n\n.form-group {\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 1rem;\n}\n\n  /* Estilos para o título \"Entrar\" */\nh2 {\n  font-size: 3rem;\n  font-weight: 400;\n  color: #003366; /* Cor do texto */\n  padding-top: 1.75rem;\n}\n\nlabel {\n  margin-bottom: 0.5rem;\n}\n\n/* Estilos para o rótulo \"e-mail\" */\nlabel {\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.25rem;\n  letter-spacing: 0.05rem;\n  text-align: left;\n  color: #003366;\n}\n\n/* Estilos para o campo de entrada de e-mail */\ninput{\n  height: 2.1875rem;\n  border: 0.063rem solid #003366; /* Cor da borda do campo de entrada */\n  border-radius: 0.625rem; \n  text-indent: 0.75rem;\n}\n\ninput::placeholder {\n  color: #6C6C6C;\n  font-size: 1rem;\n  letter-spacing: 0.05rem;\n}\n\n/* Estilos para o botão \"LOGIN\" */\nbutton[type=\"submit\"] {\n  width: 16.4375rem;\n  height: 2.5625rem;\n  border-radius: 3.125rem;\n  border: none;\n  background-color: #003366;\n  color: #ffffff;\n  font-size: 1rem;\n  font-weight: 700;\n  text-align: center;\n  line-height: 2.5625rem;\n  letter-spacing: 0.05625rem;\n  cursor: pointer;\n}\n\n.button-container {\n  display: grid;\n  justify-content: center;\n}\n\n/* Estilos para o botão \"Recuperar senha\" */\nbutton[type=\"button\"] {\n  width: 16.4375rem;\n  height: 2.5625rem;\n  font-size: 1rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  letter-spacing: 0.05rem;\n  text-align: center;\n  background-color: transparent;\n  color: #006633;\n  border: none;\n  cursor: pointer;\n}\n\n/* Estilos para a imagem \"pessoas\" */\n.pessoas {\n  width: 29.25rem;\n  height: 39.086875rem;\n}\n\n.buttons {\n  padding-top: 3.4rem;\n  display: flex;\n  flex-direction: column;\n  grid-gap: 3.06rem;\n  gap: 3.06rem;\n}\n\n.ellipse {\n  z-index:-100;\n  width: 48.29838rem;\n  height: 62.73281rem;\n  transform: rotate(-145.25deg);\n  flex-shrink: 0;\n  border-radius: 62.73281rem;\n  background: #036;\n  position: absolute;\n  top: 3%;\n  left: 60%;\n}\n\nbutton:disabled {\n  background-color: #6C6C6C;\n  opacity: 65%;\n  cursor: not-allowed;\n}\n\n@media (max-width: 1210px) {\n  .container {\n    display: flex;\n    flex-direction: column;\n    grid-gap: 5rem;\n    gap: 5rem;\n    padding-left: 2rem;\n    align-items: center;\n  }\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/quemSomos.css":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/style/pages/quemSomos.css ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n    font-family: 'Overpass', sans-serif;\n    display: block;\n    overflow: hidden;\n}\n\n.container {\n    display: flex;\n    grid-gap: 12.375rem;\n    gap: 12.375rem;\n    padding: 6.25rem 13.625rem 0 8rem;\n}\n\n.form-group {\n    display: flex;\n    flex-direction: column;\n    padding-bottom: 1rem;\n}\n\n/* Estilos para o título \"Quem Somos\" */\nh2 {\n    font-size: 3rem;\n    font-weight: 400;\n    color: #003366;\n    /* Cor do texto */\n    padding-top: 1.75rem;\n}\n\np {\n    color: #003366;\n    text-align: center;\n}\n\nlabel {\n    margin-bottom: 0.5rem;\n}\n\ninput::placeholder {\n    color: #6C6C6C;\n    font-size: 1rem;\n    letter-spacing: 0.05rem;\n}\n\n/* Estilos para a imagem \"PessoasDois\" */\n.pessoasDois {\n    width: 29.25rem;\n    height: 39.086875rem;\n}\n\n/* Estilos para a imagem \"PoliciaCivilLogo\" */\n.PoliciaCivilLogo {\n    width: 29.25rem;\n    height: 39.086875rem;\n    text-align: center;\n}\n\n.logo {\n    text-align: center;\n}\n\n.ellipse {\n    z-index: -100;\n    width: 48.29838rem;\n    height: 62.73281rem;\n    transform: rotate(-145.25deg);\n    flex-shrink: 0;\n    border-radius: 62.73281rem;\n    background: #036;\n    position: relative;\n    top: 100%;\n    left: -10%;\n}\n\n@media (max-width: 1210px) {\n    .container {\n        display: flex;\n        flex-direction: column;\n        grid-gap: 5rem;\n        gap: 5rem;\n        padding-left: 2rem;\n        align-items: center;\n    }\n}", ""]);



/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Home */ "./src/pages/Home.js");
/* harmony import */ var _pages_Login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Login */ "./src/pages/Login.js");
/* harmony import */ var _pages_QuemSomos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/QuemSomos */ "./src/pages/QuemSomos.js");
var _jsxFileName = "/home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/App.js";





function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["BrowserRouter"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Routes"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Home__WEBPACK_IMPORTED_MODULE_2__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 32
      }
    }),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/login",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Login__WEBPACK_IMPORTED_MODULE_3__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 37
      }
    }),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/quem-somos",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_QuemSomos__WEBPACK_IMPORTED_MODULE_4__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 42
      }
    }),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  })));
}
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/assets/PoliciaCivilLogo.svg":
/*!*****************************************!*\
  !*** ./src/assets/PoliciaCivilLogo.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/PoliciaCivilLogo.7b3d1c87.svg";

/***/ }),

/***/ "./src/assets/pessoas.svg":
/*!********************************!*\
  !*** ./src/assets/pessoas.svg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/pessoas.8d802045.svg";

/***/ }),

/***/ "./src/assets/pessoasDois.svg":
/*!************************************!*\
  !*** ./src/assets/pessoasDois.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/pessoasDois.9986b24b.svg";

/***/ }),

/***/ "./src/components/Navbar.js":
/*!**********************************!*\
  !*** ./src/components/Navbar.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_components_navbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/components/navbar.css */ "./src/style/components/navbar.css");
/* harmony import */ var _style_components_navbar_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_components_navbar_css__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/fonts/Overpass/Overpass-Regular.ttf":
/*!*************************************************!*\
  !*** ./src/fonts/Overpass/Overpass-Regular.ttf ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Overpass-Regular.b5d14a34.ttf";

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _reportWebVitals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reportWebVitals */ "./src/reportWebVitals.js");
var _jsxFileName = "/home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/index.js";





const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1___default.a.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.StrictMode, {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 3
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }
})));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
Object(_reportWebVitals__WEBPACK_IMPORTED_MODULE_4__["default"])();

/***/ }),

/***/ "./src/pages/Home.js":
/*!***************************!*\
  !*** ./src/pages/Home.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Navbar */ "./src/components/Navbar.js");
/* harmony import */ var _style_pages_home_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/pages/home.css */ "./src/style/pages/home.css");
/* harmony import */ var _style_pages_home_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_pages_home_css__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/pages/Home.js";



function Home() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  });
}

/***/ }),

/***/ "./src/pages/Login.js":
/*!****************************!*\
  !*** ./src/pages/Login.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_pages_login_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/pages/login.css */ "./src/style/pages/login.css");
/* harmony import */ var _style_pages_login_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_pages_login_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_pessoas_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/pessoas.svg */ "./src/assets/pessoas.svg");
/* harmony import */ var _assets_pessoas_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_pessoas_svg__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/pages/Login.js";



function Login() {
  const [email, setEmail] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [password, setPassword] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [error, setError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('E-mail inválido');
    } else {
      setError(null);
    }
    setEmail(event.target.value);
  };
  const isFormValid = email && password;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _assets_pessoas_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "Pessoas",
    className: "pessoas",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ellipse",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "login-box",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "login-box-content",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 15
    }
  }, "Entrar"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "username",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 19
    }
  }, "e-mail"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    id: "username",
    name: "username",
    placeholder: "email@email.com",
    value: email,
    onChange: handleChange,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 19
    }
  }), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
    style: {
      color: 'red'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 29
    }
  }, error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "password",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 19
    }
  }, "senha"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "************",
    value: password,
    onChange: e => setPassword(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 19
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "buttons",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    disabled: !isFormValid,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 21
    }
  }, "LOGIN")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 21
    }
  }, "Recuperar senha"))))))));
}
/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./src/pages/QuemSomos.js":
/*!********************************!*\
  !*** ./src/pages/QuemSomos.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_pages_quemSomos_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/pages/quemSomos.css */ "./src/style/pages/quemSomos.css");
/* harmony import */ var _style_pages_quemSomos_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_pages_quemSomos_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_pessoasDois_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/pessoasDois.svg */ "./src/assets/pessoasDois.svg");
/* harmony import */ var _assets_pessoasDois_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_pessoasDois_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_PoliciaCivilLogo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/PoliciaCivilLogo.svg */ "./src/assets/PoliciaCivilLogo.svg");
/* harmony import */ var _assets_PoliciaCivilLogo_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_PoliciaCivilLogo_svg__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/pages/QuemSomos.js";




function QuemSomos() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ellipse",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Texto",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, "Quem Somos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet elementum eros. Suspendisse gravida velit id vulputate laoreet. Integer ultrices, nulla at aliquam lacinia, metus ligula dapibus metus, eget ornare turpis sapien vitae lorem. Cras sed lorem nec justo pharetra commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae erat sed felis auctor feugiat. Proin justo lorem, condimentum nec venenatis nec, malesuada vitae ex. Mauris mattis, diam vitae dictum pellentesque, lectus massa interdum augue, ut dictum ligula massa id nibh. Maecenas auctor elit non augue condimentum suscipit. Integer non luctus augue, nec tristique nunc. Integer ut commodo mi, vitae tincidunt neque."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, "Quisque non posuere eros, vel posuere purus. Donec vehicula est eu magna fermentum congue. Nam in mollis nisi, a congue augue. Proin vulputate laoreet ex nec interdum. Aliquam ullamcorper malesuada sem, eget eleifend ex ultrices sed. Donec elementum, turpis sit amet auctor elementum, urna erat tempus ex, fringilla elementum elit massa a arcu. Aliquam lobortis ultricies iaculis.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "logo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _assets_PoliciaCivilLogo_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "PoliciaCivilLogo",
    className: "PoliciaCivilLogo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 8
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _assets_pessoasDois_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "PessoasDois",
    className: "pessoasDois",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  })));
}
/* harmony default export */ __webpack_exports__["default"] = (QuemSomos);

/***/ }),

/***/ "./src/reportWebVitals.js":
/*!********************************!*\
  !*** ./src/reportWebVitals.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! web-vitals */ "./node_modules/web-vitals/dist/web-vitals.js")).then(({
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB
    }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (reportWebVitals);

/***/ }),

/***/ "./src/style/components/navbar.css":
/*!*****************************************!*\
  !*** ./src/style/components/navbar.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./navbar.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/components/navbar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./navbar.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/components/navbar.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./navbar.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/components/navbar.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/pages/home.css":
/*!**********************************!*\
  !*** ./src/style/pages/home.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./home.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/home.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./home.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/home.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./home.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/home.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/pages/login.css":
/*!***********************************!*\
  !*** ./src/style/pages/login.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./login.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/login.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./login.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/login.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./login.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/login.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/pages/quemSomos.css":
/*!***************************************!*\
  !*** ./src/style/pages/quemSomos.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./quemSomos.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/quemSomos.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./quemSomos.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/quemSomos.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./quemSomos.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/style/pages/quemSomos.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /home/igor/Documentos/GitHub/2023.2-PrintGo-FrontEnd/src/index.js */"./src/index.js");


/***/ }),

/***/ 1:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime~main",2]]]);
//# sourceMappingURL=main.chunk.js.map