/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 985:
/***/ ((module) => {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"userPostsId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"authGroups"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"lambdaInvokedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":179}};
    doc.loc.source = {"body":"mutation UpdatePost($input: UpdatePostInput!) {\n  updatePost(input: $input) {\n    id\n    userPostsId\n    authGroups\n    createdAt\n    updatedAt\n    lambdaInvokedAt\n    body\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }
    
    module.exports = doc;
    
        module.exports.UpdatePost = oneQuery(doc, "UpdatePost");
        


/***/ }),

/***/ 543:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ appsyncClient)
/* harmony export */ });
/* unused harmony export getClient */
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(336);
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(352);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var aws_appsync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(369);
/* harmony import */ var aws_appsync__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aws_appsync__WEBPACK_IMPORTED_MODULE_2__);




// POLYFILLS
global.WebSocket = (ws__WEBPACK_IMPORTED_MODULE_1___default());
global.window = global.window || {
  setTimeout,
  clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener() {},
  navigator: {
    onLine: true
  }
};
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key];
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  }
};
(__webpack_require__(858).polyfill)();
__webpack_require__(583);
const appsyncClient = new (aws_appsync__WEBPACK_IMPORTED_MODULE_2___default())({
  url: process.env.graphqlEndpoint,
  region: 'us-east-1',
  auth: {
    type: 'AWS_IAM',
    credentials: (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().config.credentials)
  },
  disableOffline: true
});
const getClient = (url = process.env.graphqlEndpoint) => new AWSAppSyncClient({
  url,
  region: 'us-east-1',
  auth: {
    type: 'AWS_IAM',
    credentials: AWS.config.credentials
  },
  disableOffline: true
});


/***/ }),

/***/ 738:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ invokeLambda)
/* harmony export */ });
/* harmony import */ var _service_helpers_appsyncClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(543);
/* harmony import */ var _graphql_updatePost_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(985);
/* harmony import */ var _graphql_updatePost_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_graphql_updatePost_graphql__WEBPACK_IMPORTED_MODULE_1__);


const invokeLambda = async event => {
  console.log(JSON.stringify(event));
  const {
    postId
  } = event.arguments;
  const client = await _service_helpers_appsyncClient__WEBPACK_IMPORTED_MODULE_0__/* .appsyncClient.hydrated */ .g.hydrated();
  const input = {
    id: postId,
    lambdaInvokedAt: new Date().toISOString()
  };
  console.log('input', input);
  return client.mutate({
    mutation: (_graphql_updatePost_graphql__WEBPACK_IMPORTED_MODULE_1___default()),
    fetchPolicy: 'no-cache',
    variables: {
      input
    }
  }).then(({
    data: {
      updatePost: resp
    }
  }) => resp);
};

/***/ }),

/***/ 369:
/***/ ((module) => {

"use strict";
module.exports = require("aws-appsync");

/***/ }),

/***/ 336:
/***/ ((module) => {

"use strict";
module.exports = require("aws-sdk");

/***/ }),

/***/ 858:
/***/ ((module) => {

"use strict";
module.exports = require("es6-promise");

/***/ }),

/***/ 583:
/***/ ((module) => {

"use strict";
module.exports = require("isomorphic-fetch");

/***/ }),

/***/ 352:
/***/ ((module) => {

"use strict";
module.exports = require("ws");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handler": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _invokeLambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(738);

const handler = event => {
  console.log(event);
  const defaultAction = () => console.log(`fieldName ${event.fieldName} has no action`);
  const {
    [event.fieldName]: action = defaultAction
  } = {
    invokeLambda: _invokeLambda__WEBPACK_IMPORTED_MODULE_0__/* .invokeLambda */ .q
  };
  return action(event);
};
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=postService.js.map