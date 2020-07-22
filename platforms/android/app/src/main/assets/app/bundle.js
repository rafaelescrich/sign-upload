require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_rx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./vue-rx/dist/vue-rx.esm.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_1__);
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
//
//
//
//
//
//



var app = __webpack_require__("tns-core-modules/application");

var platform = __webpack_require__("../node_modules/@nativescript/core/platform/platform.js");

var fs = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system.js");

var imagePicker = __webpack_require__("nativescript-imagepicker");

var rxjs = __webpack_require__("rxjs");

var operators = __webpack_require__("rxjs/operators");

var bgHttp = __webpack_require__("nativescript-background-http");

nativescript_vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_vue_rx__WEBPACK_IMPORTED_MODULE_0__["default"]); // Vue.config.silent = false; // uncomment for debugging purposes

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      showWelcome: true,
      session: bgHttp.session("image-upload"),
      currentFileNameBeingUploaded: ""
    };
  },

  subscriptions() {
    this.event$ = new rxjs.BehaviorSubject({});
    return {
      event: this.event$,
      eventLog: this.event$.pipe(operators.sampleTime(200), operators.concatMap(value => rxjs.of(value)), operators.scan((acc, logEntry) => {
        acc.push(logEntry);
        return acc;
      }, []), // emit only logs for the this.currentFileNameBeingUploaded
      operators.map(allLogs => allLogs.filter(logEntry => !!logEntry && logEntry.eventTitle && logEntry.eventTitle.indexOf(this.currentFileNameBeingUploaded) > 0)))
    };
  },

  methods: {
    onSelectImageTap() {
      var context = imagePicker.create({
        mode: "single"
      });
      this.startSelection(context);
    },

    startSelection(context) {
      context.authorize().then(() => {
        return context.present();
      }).then(selection => {
        this.showWelcome = false;
        var imageAsset = selection.length > 0 ? selection[0] : null;

        if (imageAsset) {
          this.getImageFilePath(imageAsset).then(path => {
            console.log("path: ".concat(path));
            this.uploadImage(path);
          });
        }
      }).catch(function (e) {
        console.log(e);
      });
    },

    uploadImage(path) {
      var file = fs.File.fromPath(path);
      this.currentFileNameBeingUploaded = file.path.substr(file.path.lastIndexOf("/") + 1);
      var request = this.createNewRequest();
      request.description = "uploading image " + file.path;
      request.headers["File-Name"] = this.currentFileNameBeingUploaded; // -----> multipart upload
      // var params = [{
      //         name: "test",
      //         value: "value"
      //     },
      //     {
      //         name: "fileToUpload",
      //         filename: file.path,
      //         mimeType: "image/jpeg"
      //     }
      // ];
      // var task = this.session.multipartUpload(params, request);
      // <----- multipart upload

      var task = this.session.uploadFile(file.path, request);
      task.on("progress", this.onEvent.bind(this));
      task.on("error", this.onEvent.bind(this));
      task.on("responded", this.onEvent.bind(this));
      task.on("complete", this.onEvent.bind(this));
    },

    createNewRequest() {
      var url; // NOTE: using https://httpbin.org/post for testing purposes,
      // you'll need to use your own service in real-world app

      if (platform.isIOS) {
        url = "https://httpbin.org/post";
      } else {
        url = "http://www.csm-testcenter.org/test";
      }

      var request = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        description: "uploading file...",
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: "NativeScript HTTP background"
      };
      return request;
    },

    getImageFilePath(imageAsset) {
      return new Promise(resolve => {
        if (platform.isIOS) {
          var options = PHImageRequestOptions.new();
          options.synchronous = true;
          options.version = PHImageRequestOptionsVersion.Current;
          options.deliveryMode = PHImageRequestOptionsDeliveryMode.HighQualityFormat;
          PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(imageAsset.ios, options, nsData => {
            // create file from image asset and return its path
            var tempFolderPath = fs.knownFolders.temp().getFolder("nsimagepicker").path;
            var tempFilePath = fs.path.join(tempFolderPath, Date.now() + ".jpg");
            nsData.writeToFileAtomically(tempFilePath, true);
            resolve(tempFilePath);
          });
        } else {
          // return imageAsset.android, since it 's the path of the file
          resolve(imageAsset.android);
        }
      });
    },

    onEvent(e) {
      var eventEntry = {
        eventTitle: e.eventName + " " + e.object.description,
        eventData: {
          error: e.error ? e.error.toString() : e.error,
          currentBytes: e.currentBytes,
          totalBytes: e.totalBytes,
          body: e.data // raw: JSON.stringify(e) // uncomment for debugging purposes

        }
      };
      this.event$.next(eventEntry);
    }

  }
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.home-panel[data-v-763db97b] {\n    vertical-align: center;\n    font-size: 20;\n    margin: 15;\n}\n.description-label[data-v-763db97b] {\n    margin-bottom: 15;\n}\n.text[data-v-763db97b] {\n    text-align:\n        center;\n    font-size: 18px;\n}\n.plugin[data-v-763db97b] {\n    font-weight: 600;\n    font-size: 23px;\n}\n.nativescript-label[data-v-763db97b] {\n    font-size: 60px;\n    background-color: #3d5afe;\n    font-weight: 600;\n    color: white;\n    border-radius: 20px/20px;\n    width: 230px;\n    height: 230px;\n}\n", ""]);

// exports

    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/HelloWorld.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { staticClass: "page" },
    [
      _c("ActionBar", {
        staticClass: "action-bar",
        attrs: { title: "imagepicker + background-http" }
      }),
      _c(
        "GridLayout",
        { attrs: { rows: "*, auto" } },
        [
          !_vm.showWelcome
            ? _c(
                "GridLayout",
                { attrs: { rows: "auto auto auto, *" } },
                [
                  _c("Progress", {
                    attrs: {
                      value:
                        _vm.event && _vm.event.eventData
                          ? _vm.event.eventData.currentBytes
                          : 0,
                      maxValue:
                        _vm.event && _vm.event.eventData
                          ? _vm.event.eventData.totalBytes
                          : 0
                    }
                  }),
                  _vm.event &&
                  _vm.event.eventData &&
                  _vm.event.eventData.currentBytes !== NaN
                    ? _c("Label", {
                        staticClass: "m-10 text",
                        attrs: {
                          row: "1",
                          text:
                            "Transferred: " +
                            _vm.event.eventData.currentBytes / 1000 +
                            " KB"
                        }
                      })
                    : _vm._e(),
                  _c("Label", {
                    staticClass: "m-10 text",
                    attrs: { row: "2", text: "Events" }
                  }),
                  _c(
                    "ListView",
                    {
                      attrs: { row: "3", items: _vm.eventLog, "+alias": "item" }
                    },
                    [
                      _c("v-template", {
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var item = ref.item
                                var $index = ref.$index
                                var $even = ref.$even
                                var $odd = ref.$odd
                                return _c(
                                  "StackLayout",
                                  { staticClass: "t-12" },
                                  [
                                    _c("Label", {
                                      attrs: {
                                        text: item.eventTitle,
                                        textWrap: "true"
                                      }
                                    }),
                                    item.eventData && item.eventData.error
                                      ? _c("Label", {
                                          attrs: {
                                            text: item.eventData
                                              ? "Error: " + item.eventData.error
                                              : "",
                                            textWrap: "true"
                                          }
                                        })
                                      : _vm._e(),
                                    item.eventData && item.eventData.body
                                      ? _c("Label", {
                                          attrs: {
                                            text: item.eventData
                                              ? "Body: " + item.eventData.body
                                              : "",
                                            textWrap: "true"
                                          }
                                        })
                                      : _vm._e(),
                                    item.eventData && item.eventData.raw
                                      ? _c("Label", {
                                          attrs: {
                                            text: item.eventData
                                              ? "Raw: " + item.eventData.raw
                                              : "",
                                            textWrap: "true"
                                          }
                                        })
                                      : _vm._e()
                                  ],
                                  1
                                )
                              }
                            }
                          ],
                          null,
                          false,
                          2680320312
                        )
                      })
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm.showWelcome
            ? _c(
                "StackLayout",
                { attrs: { verticalAlignment: "middle" } },
                [
                  _c("Label", {
                    staticClass: "m-10 nativescript-label text",
                    attrs: { text: "{N}" }
                  }),
                  _vm.showWelcome
                    ? _c("Label", {
                        staticClass: "m-10 text",
                        attrs: {
                          text:
                            "This sample app shows how to pick an image with",
                          textWrap: "true"
                        }
                      })
                    : _vm._e(),
                  _c("Label", {
                    staticClass: "m-10 text plugin",
                    attrs: { text: "nativescript-imagepicker" }
                  }),
                  _vm.showWelcome
                    ? _c("Label", {
                        staticClass: "m-10 text",
                        attrs: { text: "and upload it using", textWrap: "true" }
                      })
                    : _vm._e(),
                  _c("Label", {
                    staticClass: "m-10 text plugin",
                    attrs: { text: "nativescript-background-http" }
                  })
                ],
                1
              )
            : _vm._e(),
          _c("Button", {
            staticClass: "m-b-10 m-t-10 t-20",
            attrs: { row: "1", text: "Choose image to upload" },
            on: {
              tap: function($event) {
                return _vm.onSelectImageTap($event)
              }
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.js": "./app.js",
	"./vue-rx/dist/vue-rx.esm.js": "./vue-rx/dist/vue-rx.esm.js",
	"./vue-rx/dist/vue-rx.js": "./vue-rx/dist/vue-rx.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.registerModule("~nativescript-theme-core/css/core.light.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/nativescript-theme-core/css/core.light.css"));
global.registerModule("nativescript-theme-core/css/core.light.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/nativescript-theme-core/css/core.light.css"));module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"comment","comment":"\nIn many cases you may want to use the NativeScript core theme instead\nof writing your own CSS rules. For a full list of class names in the theme\nrefer to http://docs.nativescript.org/ui/theme.\nThe imported CSS rules must precede all other types of rules.\n"},{"type":"import","import":"'~nativescript-theme-core/css/core.light.css'"}],"parsingErrors":[]}};;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue");

        let applicationCheckPlatform = __webpack_require__("tns-core-modules/application");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("tns-core-modules/ui/frame");
__webpack_require__("tns-core-modules/ui/frame/activity");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("tns-core-modules/bundle-entry-points");
        
 // Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  template: "\n        <Frame>\n            <HelloWorld />\n        </Frame>",
  components: {
    HelloWorld: _components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/HelloWorld.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony import */ var _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "763db97b",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('763db97b')) {
      api.createRecord('763db97b', component.options)
    } else {
      api.reload('763db97b', component.options)
    }
    module.hot.accept("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
(function () {
      api.rerender('763db97b', {
        render: _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/HelloWorld.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"android\":{\"v8Flags\":\"--expose_gc\",\"forceLog\":true,\"markingMode\":\"none\"},\"main\":\"app.js\",\"name\":\"tns-template-vue\",\"version\":\"3.2.0\"}");

/***/ }),

/***/ "./vue-rx/dist/vue-rx.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);


var Vue$1;

var warn = function warn() {}; // NOTE(benlesh): the value of this method seems dubious now, but I'm not sure
// if this is a Vue convention I'm just not familiar with. Perhaps it would
// be better to just import and use Vue directly?


function install(_Vue) {
  Vue$1 = _Vue;
  warn = Vue$1.util.warn || warn;
} // TODO(benlesh): as time passes, this should be updated to use RxJS 6.1's
// `isObservable` method. But wait until you're ready to drop support for Rx 5


function isObservable(ob) {
  return ob && typeof ob.subscribe === 'function';
}

function isObserver(subject) {
  return subject && typeof subject.next === 'function';
}

function defineReactive(vm, key, val) {
  if (key in vm) {
    vm[key] = val;
  } else {
    Vue$1.util.defineReactive(vm, key, val);
  }
}

function getKey(binding) {
  return [binding.arg].concat(Object.keys(binding.modifiers)).join(':');
}

var rxMixin = {
  created: function created() {
    var vm = this;
    var domStreams = vm.$options.domStreams;

    if (domStreams) {
      domStreams.forEach(function (key) {
        vm[key] = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
      });
    }

    var observableMethods = vm.$options.observableMethods;

    if (observableMethods) {
      if (Array.isArray(observableMethods)) {
        observableMethods.forEach(function (methodName) {
          vm[methodName + '$'] = vm.$createObservableMethod(methodName);
        });
      } else {
        Object.keys(observableMethods).forEach(function (methodName) {
          vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName);
        });
      }
    }

    var obs = vm.$options.subscriptions;

    if (typeof obs === 'function') {
      obs = obs.call(vm);
    }

    if (obs) {
      vm.$observables = {};
      vm._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
      Object.keys(obs).forEach(function (key) {
        defineReactive(vm, key, undefined);
        var ob = vm.$observables[key] = obs[key];

        if (!isObservable(ob)) {
          warn('Invalid Observable found in subscriptions option with key "' + key + '".', vm);
          return;
        }

        vm._subscription.add(obs[key].subscribe(function (value) {
          vm[key] = value;
        }, function (error) {
          throw error;
        }));
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
};
var streamDirective = {
  // Example ./example/counter_dir.html
  bind: function bind(el, binding, vnode) {
    var handle = binding.value;
    var event = binding.arg;
    var streamName = binding.expression;
    var modifiers = binding.modifiers;

    if (isObserver(handle)) {
      handle = {
        subject: handle
      };
    } else if (!handle || !isObserver(handle.subject)) {
      warn('Invalid Subject found in directive with key "' + streamName + '".' + streamName + ' should be an instance of Subject or have the ' + 'type { subject: Subject, data: any }.', vnode.context);
      return;
    }

    var modifiersFuncs = {
      stop: function stop(e) {
        return e.stopPropagation();
      },
      prevent: function prevent(e) {
        return e.preventDefault();
      }
    };
    var modifiersExists = Object.keys(modifiersFuncs).filter(function (key) {
      return modifiers[key];
    });
    var subject = handle.subject;
    var next = (subject.next || subject.onNext).bind(subject);

    if (!modifiers.native && vnode.componentInstance) {
      handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(function (e) {
        modifiersExists.forEach(function (mod) {
          return modifiersFuncs[mod](e);
        });
        next({
          event: e,
          data: handle.data
        });
      });
    } else {
      var fromEventArgs = handle.options ? [el, event, handle.options] : [el, event];
      handle.subscription = rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"].apply(void 0, fromEventArgs).subscribe(function (e) {
        modifiersExists.forEach(function (mod) {
          return modifiersFuncs[mod](e);
        });
        next({
          event: e,
          data: handle.data
        });
      }) // store handle on element with a unique key for identifying
      // multiple v-stream directives on the same node
      ;
      (el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle;
    }
  },
  update: function update(el, binding) {
    var handle = binding.value;

    var _handle = el._rxHandles && el._rxHandles[getKey(binding)];

    if (_handle && handle && isObserver(handle.subject)) {
      _handle.data = handle.data;
    }
  },
  unbind: function unbind(el, binding) {
    var key = getKey(binding);
    var handle = el._rxHandles && el._rxHandles[key];

    if (handle) {
      if (handle.subscription) {
        handle.subscription.unsubscribe();
      }

      el._rxHandles[key] = null;
    }
  }
};

function watchAsObservable(expOrFn, options) {
  var vm = this;
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    var _unwatch;

    var watch = function watch() {
      _unwatch = vm.$watch(expOrFn, function (newValue, oldValue) {
        observer.next({
          oldValue: oldValue,
          newValue: newValue
        });
      }, options);
    }; // if $watchAsObservable is called inside the subscriptions function,
    // because data hasn't been observed yet, the watcher will not work.
    // in that case, wait until created hook to watch.


    if (vm._data) {
      watch();
    } else {
      vm.$once('hook:created', watch);
    } // Returns function which disconnects the $watch expression


    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](function () {
      _unwatch && _unwatch();
    });
  });
  return obs$;
}

function fromDOMEvent(selector, event) {
  if (typeof window === 'undefined') {
    // TODO(benlesh): I'm not sure if this is really what you want here,
    // but it's equivalent to what you were doing. You might want EMPTY
    return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
  }

  var vm = this;
  var doc = document.documentElement;
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    function listener(e) {
      if (!vm.$el) {
        return;
      }

      if (selector === null && vm.$el === e.target) {
        return observer.next(e);
      }

      var els = vm.$el.querySelectorAll(selector);
      var el = e.target;

      for (var i = 0, len = els.length; i < len; i++) {
        if (els[i] === el) {
          return observer.next(e);
        }
      }
    }

    doc.addEventListener(event, listener); // Returns function which disconnects the $watch expression

    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](function () {
      doc.removeEventListener(event, listener);
    });
  });
  return obs$;
}

function subscribeTo(observable, next, error, complete) {
  var subscription = observable.subscribe(next, error, complete);
  (this._subscription || (this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]())).add(subscription);
  return subscription;
}
/**
 * @see {@link https://vuejs.org/v2/api/#vm-on}
 * @param {String||Array} evtName Event name
 * @return {Observable} Event stream
 */


function eventToObservable(evtName) {
  var vm = this;
  var evtNames = Array.isArray(evtName) ? evtName : [evtName];
  var obs$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
    var eventPairs = evtNames.map(function (name) {
      var callback = function callback(msg) {
        return observer.next({
          name: name,
          msg: msg
        });
      };

      vm.$on(name, callback);
      return {
        name: name,
        callback: callback
      };
    });
    return function () {
      // Only remove the specific callback
      eventPairs.forEach(function (pair) {
        return vm.$off(pair.name, pair.callback);
      });
    };
  });
  return obs$;
}
/**
 * @name Vue.prototype.$createObservableMethod
 * @description Creates an observable from a given function name.
 * @param {String} methodName Function name
 * @param {Boolean} [passContext] Append the call context at the end of emit data?
 * @return {Observable} Hot stream
 */


function createObservableMethod(methodName, passContext) {
  var vm = this;

  if (vm[methodName] !== undefined) {
    warn('Potential bug: ' + "Method " + methodName + " already defined on vm and has been overwritten by $createObservableMethod." + String(vm[methodName]), vm);
  }

  var creator = function creator(observer) {
    vm[methodName] = function () {
      var args = Array.from(arguments);

      if (passContext) {
        args.push(this);
        observer.next(args);
      } else {
        if (args.length <= 1) {
          observer.next(args[0]);
        } else {
          observer.next(args);
        }
      }
    };

    return function () {
      delete vm[methodName];
    };
  }; // Must be a hot stream otherwise function context may overwrite over and over again


  return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](creator).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
}
/* global Vue */


function VueRx(Vue) {
  install(Vue);
  Vue.mixin(rxMixin);
  Vue.directive('stream', streamDirective);
  Vue.prototype.$watchAsObservable = watchAsObservable;
  Vue.prototype.$fromDOMEvent = fromDOMEvent;
  Vue.prototype.$subscribeTo = subscribeTo;
  Vue.prototype.$eventToObservable = eventToObservable;
  Vue.prototype.$createObservableMethod = createObservableMethod;
} // auto install


if (typeof Vue !== 'undefined') {
  Vue.use(VueRx);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRx);

/***/ }),

/***/ "./vue-rx/dist/vue-rx.js":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(this, function () {
  'use strict';

  var Vue$1;

  var warn = function warn() {}; // NOTE(benlesh): the value of this method seems dubious now, but I'm not sure
  // if this is a Vue convention I'm just not familiar with. Perhaps it would
  // be better to just import and use Vue directly?


  function install(_Vue) {
    Vue$1 = _Vue;
    warn = Vue$1.util.warn || warn;
  } // TODO(benlesh): as time passes, this should be updated to use RxJS 6.1's
  // `isObservable` method. But wait until you're ready to drop support for Rx 5


  function isObservable(ob) {
    return ob && typeof ob.subscribe === 'function';
  }

  function isObserver(subject) {
    return subject && typeof subject.next === 'function';
  }

  function defineReactive(vm, key, val) {
    if (key in vm) {
      vm[key] = val;
    } else {
      Vue$1.util.defineReactive(vm, key, val);
    }
  }

  function getKey(binding) {
    return [binding.arg].concat(Object.keys(binding.modifiers)).join(':');
  }

  var rxjs =  true ? __webpack_require__("rxjs") : undefined;

  if (!rxjs) {
    throw new Error("[vue-rx]: RxJS is not found.");
  }

  var Observable = rxjs.Observable;
  var Subject = rxjs.Subject;
  var Subscription = rxjs.Subscription;
  var fromEvent = rxjs.fromEvent;
  var NEVER = rxjs.NEVER;
  var rxMixin = {
    created: function created() {
      var vm = this;
      var domStreams = vm.$options.domStreams;

      if (domStreams) {
        domStreams.forEach(function (key) {
          vm[key] = new Subject();
        });
      }

      var observableMethods = vm.$options.observableMethods;

      if (observableMethods) {
        if (Array.isArray(observableMethods)) {
          observableMethods.forEach(function (methodName) {
            vm[methodName + '$'] = vm.$createObservableMethod(methodName);
          });
        } else {
          Object.keys(observableMethods).forEach(function (methodName) {
            vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName);
          });
        }
      }

      var obs = vm.$options.subscriptions;

      if (typeof obs === 'function') {
        obs = obs.call(vm);
      }

      if (obs) {
        vm.$observables = {};
        vm._subscription = new Subscription();
        Object.keys(obs).forEach(function (key) {
          defineReactive(vm, key, undefined);
          var ob = vm.$observables[key] = obs[key];

          if (!isObservable(ob)) {
            warn('Invalid Observable found in subscriptions option with key "' + key + '".', vm);
            return;
          }

          vm._subscription.add(obs[key].subscribe(function (value) {
            vm[key] = value;
          }, function (error) {
            throw error;
          }));
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
    }
  };
  var streamDirective = {
    // Example ./example/counter_dir.html
    bind: function bind(el, binding, vnode) {
      var handle = binding.value;
      var event = binding.arg;
      var streamName = binding.expression;
      var modifiers = binding.modifiers;

      if (isObserver(handle)) {
        handle = {
          subject: handle
        };
      } else if (!handle || !isObserver(handle.subject)) {
        warn('Invalid Subject found in directive with key "' + streamName + '".' + streamName + ' should be an instance of Subject or have the ' + 'type { subject: Subject, data: any }.', vnode.context);
        return;
      }

      var modifiersFuncs = {
        stop: function stop(e) {
          return e.stopPropagation();
        },
        prevent: function prevent(e) {
          return e.preventDefault();
        }
      };
      var modifiersExists = Object.keys(modifiersFuncs).filter(function (key) {
        return modifiers[key];
      });
      var subject = handle.subject;
      var next = (subject.next || subject.onNext).bind(subject);

      if (!modifiers.native && vnode.componentInstance) {
        handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(function (e) {
          modifiersExists.forEach(function (mod) {
            return modifiersFuncs[mod](e);
          });
          next({
            event: e,
            data: handle.data
          });
        });
      } else {
        var fromEventArgs = handle.options ? [el, event, handle.options] : [el, event];
        handle.subscription = fromEvent.apply(void 0, fromEventArgs).subscribe(function (e) {
          modifiersExists.forEach(function (mod) {
            return modifiersFuncs[mod](e);
          });
          next({
            event: e,
            data: handle.data
          });
        }) // store handle on element with a unique key for identifying
        // multiple v-stream directives on the same node
        ;
        (el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle;
      }
    },
    update: function update(el, binding) {
      var handle = binding.value;

      var _handle = el._rxHandles && el._rxHandles[getKey(binding)];

      if (_handle && handle && isObserver(handle.subject)) {
        _handle.data = handle.data;
      }
    },
    unbind: function unbind(el, binding) {
      var key = getKey(binding);
      var handle = el._rxHandles && el._rxHandles[key];

      if (handle) {
        if (handle.subscription) {
          handle.subscription.unsubscribe();
        }

        el._rxHandles[key] = null;
      }
    }
  };

  function watchAsObservable(expOrFn, options) {
    var vm = this;
    var obs$ = new Observable(function (observer) {
      var _unwatch;

      var watch = function watch() {
        _unwatch = vm.$watch(expOrFn, function (newValue, oldValue) {
          observer.next({
            oldValue: oldValue,
            newValue: newValue
          });
        }, options);
      }; // if $watchAsObservable is called inside the subscriptions function,
      // because data hasn't been observed yet, the watcher will not work.
      // in that case, wait until created hook to watch.


      if (vm._data) {
        watch();
      } else {
        vm.$once('hook:created', watch);
      } // Returns function which disconnects the $watch expression


      return new Subscription(function () {
        _unwatch && _unwatch();
      });
    });
    return obs$;
  }

  function fromDOMEvent(selector, event) {
    if (typeof window === 'undefined') {
      // TODO(benlesh): I'm not sure if this is really what you want here,
      // but it's equivalent to what you were doing. You might want EMPTY
      return NEVER;
    }

    var vm = this;
    var doc = document.documentElement;
    var obs$ = new Observable(function (observer) {
      function listener(e) {
        if (!vm.$el) {
          return;
        }

        if (selector === null && vm.$el === e.target) {
          return observer.next(e);
        }

        var els = vm.$el.querySelectorAll(selector);
        var el = e.target;

        for (var i = 0, len = els.length; i < len; i++) {
          if (els[i] === el) {
            return observer.next(e);
          }
        }
      }

      doc.addEventListener(event, listener); // Returns function which disconnects the $watch expression

      return new Subscription(function () {
        doc.removeEventListener(event, listener);
      });
    });
    return obs$;
  }

  function subscribeTo(observable, next, error, complete) {
    var subscription = observable.subscribe(next, error, complete);
    (this._subscription || (this._subscription = new Subscription())).add(subscription);
    return subscription;
  }
  /**
   * @see {@link https://vuejs.org/v2/api/#vm-on}
   * @param {String||Array} evtName Event name
   * @return {Observable} Event stream
   */


  function eventToObservable(evtName) {
    var vm = this;
    var evtNames = Array.isArray(evtName) ? evtName : [evtName];
    var obs$ = new Observable(function (observer) {
      var eventPairs = evtNames.map(function (name) {
        var callback = function callback(msg) {
          return observer.next({
            name: name,
            msg: msg
          });
        };

        vm.$on(name, callback);
        return {
          name: name,
          callback: callback
        };
      });
      return function () {
        // Only remove the specific callback
        eventPairs.forEach(function (pair) {
          return vm.$off(pair.name, pair.callback);
        });
      };
    });
    return obs$;
  }

  var operators =  true ? __webpack_require__("rxjs/operators") : undefined;
  var share = operators.share;
  /**
   * @name Vue.prototype.$createObservableMethod
   * @description Creates an observable from a given function name.
   * @param {String} methodName Function name
   * @param {Boolean} [passContext] Append the call context at the end of emit data?
   * @return {Observable} Hot stream
   */

  function createObservableMethod(methodName, passContext) {
    var vm = this;

    if (vm[methodName] !== undefined) {
      warn('Potential bug: ' + "Method " + methodName + " already defined on vm and has been overwritten by $createObservableMethod." + String(vm[methodName]), vm);
    }

    var creator = function creator(observer) {
      vm[methodName] = function () {
        var args = Array.from(arguments);

        if (passContext) {
          args.push(this);
          observer.next(args);
        } else {
          if (args.length <= 1) {
            observer.next(args[0]);
          } else {
            observer.next(args);
          }
        }
      };

      return function () {
        delete vm[methodName];
      };
    }; // Must be a hot stream otherwise function context may overwrite over and over again


    return new Observable(creator).pipe(share());
  }
  /* global Vue */


  function VueRx(Vue) {
    install(Vue);
    Vue.mixin(rxMixin);
    Vue.directive('stream', streamDirective);
    Vue.prototype.$watchAsObservable = watchAsObservable;
    Vue.prototype.$fromDOMEvent = fromDOMEvent;
    Vue.prototype.$subscribeTo = subscribeTo;
    Vue.prototype.$eventToObservable = eventToObservable;
    Vue.prototype.$createObservableMethod = createObservableMethod;
  } // auto install


  if (typeof Vue !== 'undefined') {
    Vue.use(VueRx);
  }

  return VueRx;
});

/***/ }),

/***/ "@nativescript/core/application":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/application");

/***/ }),

/***/ "@nativescript/core/data/observable-array":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/data/observable-array");

/***/ }),

/***/ "@nativescript/core/platform":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/platform");

/***/ }),

/***/ "@nativescript/core/text/formatted-string":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/text/formatted-string");

/***/ }),

/***/ "@nativescript/core/text/span":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/text/span");

/***/ }),

/***/ "@nativescript/core/ui/action-bar":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/action-bar");

/***/ }),

/***/ "@nativescript/core/ui/activity-indicator":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/activity-indicator");

/***/ }),

/***/ "@nativescript/core/ui/border":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/border");

/***/ }),

/***/ "@nativescript/core/ui/bottom-navigation":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/bottom-navigation");

/***/ }),

/***/ "@nativescript/core/ui/button":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/button");

/***/ }),

/***/ "@nativescript/core/ui/content-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/content-view");

/***/ }),

/***/ "@nativescript/core/ui/core/view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/core/view");

/***/ }),

/***/ "@nativescript/core/ui/date-picker":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/date-picker");

/***/ }),

/***/ "@nativescript/core/ui/frame":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/frame");

/***/ }),

/***/ "@nativescript/core/ui/html-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/html-view");

/***/ }),

/***/ "@nativescript/core/ui/image":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/image");

/***/ }),

/***/ "@nativescript/core/ui/label":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/label");

/***/ }),

/***/ "@nativescript/core/ui/layouts/absolute-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/absolute-layout");

/***/ }),

/***/ "@nativescript/core/ui/layouts/dock-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/dock-layout");

/***/ }),

/***/ "@nativescript/core/ui/layouts/flexbox-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/flexbox-layout");

/***/ }),

/***/ "@nativescript/core/ui/layouts/grid-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/grid-layout");

/***/ }),

/***/ "@nativescript/core/ui/layouts/layout-base":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/layout-base");

/***/ }),

/***/ "@nativescript/core/ui/layouts/stack-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/stack-layout");

/***/ }),

/***/ "@nativescript/core/ui/layouts/wrap-layout":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/wrap-layout");

/***/ }),

/***/ "@nativescript/core/ui/list-picker":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/list-picker");

/***/ }),

/***/ "@nativescript/core/ui/list-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/list-view");

/***/ }),

/***/ "@nativescript/core/ui/page":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/page");

/***/ }),

/***/ "@nativescript/core/ui/placeholder":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/placeholder");

/***/ }),

/***/ "@nativescript/core/ui/progress":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/progress");

/***/ }),

/***/ "@nativescript/core/ui/proxy-view-container":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/proxy-view-container");

/***/ }),

/***/ "@nativescript/core/ui/scroll-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/scroll-view");

/***/ }),

/***/ "@nativescript/core/ui/search-bar":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/search-bar");

/***/ }),

/***/ "@nativescript/core/ui/segmented-bar":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/segmented-bar");

/***/ }),

/***/ "@nativescript/core/ui/slider":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/slider");

/***/ }),

/***/ "@nativescript/core/ui/switch":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/switch");

/***/ }),

/***/ "@nativescript/core/ui/tab-navigation-base/tab-content-item":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/tab-navigation-base/tab-content-item");

/***/ }),

/***/ "@nativescript/core/ui/tab-navigation-base/tab-strip":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/tab-navigation-base/tab-strip");

/***/ }),

/***/ "@nativescript/core/ui/tab-navigation-base/tab-strip-item":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/tab-navigation-base/tab-strip-item");

/***/ }),

/***/ "@nativescript/core/ui/tab-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/tab-view");

/***/ }),

/***/ "@nativescript/core/ui/tabs":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/tabs");

/***/ }),

/***/ "@nativescript/core/ui/text-field":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/text-field");

/***/ }),

/***/ "@nativescript/core/ui/text-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/text-view");

/***/ }),

/***/ "@nativescript/core/ui/time-picker":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/time-picker");

/***/ }),

/***/ "@nativescript/core/ui/web-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/web-view");

/***/ }),

/***/ "@nativescript/core/utils/types":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/utils/types");

/***/ }),

/***/ "@nativescript/core/xml":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/xml");

/***/ }),

/***/ "nativescript-background-http":
/***/ (function(module, exports) {

module.exports = require("nativescript-background-http");

/***/ }),

/***/ "nativescript-imagepicker":
/***/ (function(module, exports) {

module.exports = require("nativescript-imagepicker");

/***/ }),

/***/ "nativescript-vue":
/***/ (function(module, exports) {

module.exports = require("nativescript-vue");

/***/ }),

/***/ "rxjs":
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/bundle-entry-points");

/***/ }),

/***/ "tns-core-modules/file-system":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/file-system");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame/activity");

/***/ }),

/***/ "tns-core-modules/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/styling/style-scope");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzJkOWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT8wMGI1Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU/MjhkYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzUyM2EiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT83ODMyIiwid2VicGFjazovLy8uL3Z1ZS1yeC9kaXN0L3Z1ZS1yeC5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vdnVlLXJ4L2Rpc3QvdnVlLXJ4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS9hcHBsaWNhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS9kYXRhL29ic2VydmFibGUtYXJyYXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvcGxhdGZvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdGV4dC9mb3JtYXR0ZWQtc3RyaW5nXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3RleHQvc3BhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9hY3Rpb24tYmFyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2FjdGl2aXR5LWluZGljYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9ib3JkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvYm90dG9tLW5hdmlnYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvYnV0dG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2NvbnRlbnQtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9jb3JlL3ZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvZGF0ZS1waWNrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvZnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvaHRtbC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2ltYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xhYmVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvbGF5b3V0cy9mbGV4Ym94LWxheW91dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvbGF5b3V0cy93cmFwLWxheW91dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9saXN0LXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9saXN0LXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvcGFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9wbGFjZWhvbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9wcm9ncmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9wcm94eS12aWV3LWNvbnRhaW5lclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zY3JvbGwtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zZWFyY2gtYmFyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3NlZ21lbnRlZC1iYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvc2xpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3N3aXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1jb250ZW50LWl0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXAtaXRlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90YWItdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90YWJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RleHQtZmllbGRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvdGV4dC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RpbWUtcGlja2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3dlYi12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3V0aWxzL3R5cGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3htbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuYXRpdmVzY3JpcHQtdnVlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvYnVuZGxlLWVudHJ5LXBvaW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZS9hY3Rpdml0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiIl0sIm5hbWVzIjpbIkhlbGxvV29ybGQiLCJ0ZW1wbGF0ZSIsIiRzdGFydCIsIlZ1ZSQxIiwid2FybiIsImluc3RhbGwiLCJfVnVlIiwidXRpbCIsImlzT2JzZXJ2YWJsZSIsIm9iIiwic3Vic2NyaWJlIiwiaXNPYnNlcnZlciIsInN1YmplY3QiLCJuZXh0IiwiZGVmaW5lUmVhY3RpdmUiLCJ2bSIsImtleSIsInZhbCIsImdldEtleSIsImJpbmRpbmciLCJhcmciLCJjb25jYXQiLCJPYmplY3QiLCJrZXlzIiwibW9kaWZpZXJzIiwiam9pbiIsInJ4TWl4aW4iLCJjcmVhdGVkIiwiZG9tU3RyZWFtcyIsIiRvcHRpb25zIiwiZm9yRWFjaCIsIlN1YmplY3QiLCJvYnNlcnZhYmxlTWV0aG9kcyIsIkFycmF5IiwiaXNBcnJheSIsIm1ldGhvZE5hbWUiLCIkY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZCIsIm9icyIsInN1YnNjcmlwdGlvbnMiLCJjYWxsIiwiJG9ic2VydmFibGVzIiwiX3N1YnNjcmlwdGlvbiIsIlN1YnNjcmlwdGlvbiIsInVuZGVmaW5lZCIsImFkZCIsInZhbHVlIiwiZXJyb3IiLCJiZWZvcmVEZXN0cm95IiwidW5zdWJzY3JpYmUiLCJzdHJlYW1EaXJlY3RpdmUiLCJiaW5kIiwiZWwiLCJ2bm9kZSIsImhhbmRsZSIsImV2ZW50Iiwic3RyZWFtTmFtZSIsImV4cHJlc3Npb24iLCJjb250ZXh0IiwibW9kaWZpZXJzRnVuY3MiLCJzdG9wIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vZGlmaWVyc0V4aXN0cyIsImZpbHRlciIsIm9uTmV4dCIsIm5hdGl2ZSIsImNvbXBvbmVudEluc3RhbmNlIiwic3Vic2NyaXB0aW9uIiwiJGV2ZW50VG9PYnNlcnZhYmxlIiwibW9kIiwiZGF0YSIsImZyb21FdmVudEFyZ3MiLCJvcHRpb25zIiwiZnJvbUV2ZW50IiwiYXBwbHkiLCJfcnhIYW5kbGVzIiwidXBkYXRlIiwiX2hhbmRsZSIsInVuYmluZCIsIndhdGNoQXNPYnNlcnZhYmxlIiwiZXhwT3JGbiIsIm9icyQiLCJPYnNlcnZhYmxlIiwib2JzZXJ2ZXIiLCJfdW53YXRjaCIsIndhdGNoIiwiJHdhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsIl9kYXRhIiwiJG9uY2UiLCJmcm9tRE9NRXZlbnQiLCJzZWxlY3RvciIsIndpbmRvdyIsIk5FVkVSIiwiZG9jIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJsaXN0ZW5lciIsIiRlbCIsInRhcmdldCIsImVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdWJzY3JpYmVUbyIsIm9ic2VydmFibGUiLCJjb21wbGV0ZSIsImV2ZW50VG9PYnNlcnZhYmxlIiwiZXZ0TmFtZSIsImV2dE5hbWVzIiwiZXZlbnRQYWlycyIsIm1hcCIsIm5hbWUiLCJjYWxsYmFjayIsIm1zZyIsIiRvbiIsInBhaXIiLCIkb2ZmIiwiY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZCIsInBhc3NDb250ZXh0IiwiU3RyaW5nIiwiY3JlYXRvciIsImFyZ3MiLCJmcm9tIiwiYXJndW1lbnRzIiwicHVzaCIsInBpcGUiLCJzaGFyZSIsIlZ1ZVJ4IiwiVnVlIiwibWl4aW4iLCJkaXJlY3RpdmUiLCJwcm90b3R5cGUiLCIkd2F0Y2hBc09ic2VydmFibGUiLCIkZnJvbURPTUV2ZW50IiwiJHN1YnNjcmliZVRvIiwidXNlIiwiZ2xvYmFsIiwiZmFjdG9yeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyeGpzIiwicmVxdWlyZSIsIkVycm9yIiwib3BlcmF0b3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQ0E7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSw2RyxDQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUEsNkNBRkE7QUFHQTtBQUhBO0FBS0EsR0FQQTs7QUFRQTtBQUNBO0FBQ0E7QUFDQSx3QkFEQTtBQUVBLGlDQUNBLHlCQURBLEVBRUEsNENBRkEsRUFHQTtBQUNBO0FBQ0E7QUFDQSxPQUhBLEVBR0EsRUFIQSxDQUhBLEVBT0E7QUFDQSxtS0FSQTtBQUZBO0FBYUEsR0F2QkE7O0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBLEtBTkE7O0FBT0E7QUFDQSxjQUNBLFNBREEsR0FFQSxJQUZBLENBRUE7QUFDQTtBQUNBLE9BSkEsRUFLQSxJQUxBLENBS0E7QUFDQTtBQUVBLDBEQUNBLENBREEsSUFDQSxJQURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FIQTtBQUlBO0FBQ0EsT0FoQkEsRUFpQkEsS0FqQkEsQ0FpQkE7QUFDQTtBQUNBLE9BbkJBO0FBb0JBLEtBNUJBOztBQTZCQTtBQUNBO0FBQ0EsMkRBQ0EsOEJBREE7QUFHQTtBQUNBO0FBQ0EsdUVBUEEsQ0FTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0F6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QUFQLEtBQWUsV0FBbkIsRUFBZ0M7QUFDOUJBLE9BQUcsQ0FBQ08sR0FBSixDQUFRUixLQUFSO0FBQ0Q7O0FBRUQsU0FBT0EsS0FBUDtBQUVELENBdlZBLENBQUQsQzs7Ozs7OztBQ0FBLDJEOzs7Ozs7O0FDQUEscUU7Ozs7Ozs7QUNBQSx3RDs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSw2RDs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHdEOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSwwRTs7Ozs7OztBQ0FBLHNFOzs7Ozs7O0FDQUEseUU7Ozs7Ozs7QUNBQSxzRTs7Ozs7OztBQ0FBLHNFOzs7Ozs7O0FDQUEsdUU7Ozs7Ozs7QUNBQSxzRTs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7QUNBQSx1RTs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsNkQ7Ozs7Ozs7QUNBQSxnRTs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSx1Rjs7Ozs7OztBQ0FBLGdGOzs7Ozs7O0FDQUEscUY7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsNkQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLG1EOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxxRDs7Ozs7OztBQ0FBLDZDOzs7Ozs7O0FDQUEsaUM7Ozs7Ozs7QUNBQSwyQzs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEsaUU7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7QUNBQSxvRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2UgY2xhc3M9XCJwYWdlXCI+XG4gICAgICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJpbWFnZXBpY2tlciArIGJhY2tncm91bmQtaHR0cFwiIGNsYXNzPVwiYWN0aW9uLWJhclwiPjwvQWN0aW9uQmFyPlxuXG4gICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCIqLCBhdXRvXCI+XG4gICAgICAgICAgICA8R3JpZExheW91dCB2LWlmPVwiIXNob3dXZWxjb21lXCIgcm93cz1cImF1dG8gYXV0byBhdXRvLCAqXCI+XG4gICAgICAgICAgICAgICAgPFByb2dyZXNzIDp2YWx1ZT1cImV2ZW50ICYmIGV2ZW50LmV2ZW50RGF0YSA/IGV2ZW50LmV2ZW50RGF0YS5jdXJyZW50Qnl0ZXMgOiAwXCJcbiAgICAgICAgICAgICAgICAgICAgOm1heFZhbHVlPVwiZXZlbnQgJiYgZXZlbnQuZXZlbnREYXRhID8gZXZlbnQuZXZlbnREYXRhLnRvdGFsQnl0ZXMgOiAwXCI+XG4gICAgICAgICAgICAgICAgPC9Qcm9ncmVzcz5cblxuICAgICAgICAgICAgICAgIDxMYWJlbCByb3c9XCIxXCIgdi1pZj1cImV2ZW50ICYmIGV2ZW50LmV2ZW50RGF0YSAmJiBldmVudC5ldmVudERhdGEuY3VycmVudEJ5dGVzICE9PSBOYU5cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm0tMTAgdGV4dFwiIDp0ZXh0PVwiJ1RyYW5zZmVycmVkOiAnICsgZXZlbnQuZXZlbnREYXRhLmN1cnJlbnRCeXRlcyAvIDEwMDAgKyAnIEtCJ1wiPjwvTGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8TGFiZWwgcm93PVwiMlwiIGNsYXNzPVwibS0xMCB0ZXh0XCIgdGV4dD1cIkV2ZW50c1wiPjwvTGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8TGlzdFZpZXcgcm93PVwiM1wiIGZvcj1cIml0ZW0gaW4gZXZlbnRMb2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJ0LTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiaXRlbS5ldmVudFRpdGxlXCIgdGV4dFdyYXA9XCJ0cnVlXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdi1pZj1cIml0ZW0uZXZlbnREYXRhICYmIGl0ZW0uZXZlbnREYXRhLmVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJpdGVtLmV2ZW50RGF0YSA/ICdFcnJvcjogJyArIGl0ZW0uZXZlbnREYXRhLmVycm9yIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0V3JhcD1cInRydWVcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB2LWlmPVwiaXRlbS5ldmVudERhdGEgJiYgaXRlbS5ldmVudERhdGEuYm9keVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0ZXh0PVwiaXRlbS5ldmVudERhdGEgPyAnQm9keTogJyArIGl0ZW0uZXZlbnREYXRhLmJvZHkgOiAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXcmFwPVwidHJ1ZVwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHYtaWY9XCJpdGVtLmV2ZW50RGF0YSAmJiBpdGVtLmV2ZW50RGF0YS5yYXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGV4dD1cIml0ZW0uZXZlbnREYXRhID8gJ1JhdzogJyArIGl0ZW0uZXZlbnREYXRhLnJhdyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFdyYXA9XCJ0cnVlXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L0xpc3RWaWV3PlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHYtaWY9XCJzaG93V2VsY29tZVwiIHZlcnRpY2FsQWxpZ25tZW50PVwibWlkZGxlXCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIGNsYXNzPVwibS0xMCBuYXRpdmVzY3JpcHQtbGFiZWwgdGV4dFwiIHRleHQ9XCJ7Tn1cIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBjbGFzcz1cIm0tMTAgdGV4dFwiIHYtaWY9XCJzaG93V2VsY29tZVwiIHRleHQ9XCJUaGlzIHNhbXBsZSBhcHAgc2hvd3MgaG93IHRvIHBpY2sgYW4gaW1hZ2Ugd2l0aFwiXG4gICAgICAgICAgICAgICAgICAgIHRleHRXcmFwPVwidHJ1ZVwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPExhYmVsIGNsYXNzPVwibS0xMCB0ZXh0IHBsdWdpblwiIHRleHQ9XCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBjbGFzcz1cIm0tMTAgdGV4dFwiIHYtaWY9XCJzaG93V2VsY29tZVwiIHRleHQ9XCJhbmQgdXBsb2FkIGl0IHVzaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFdyYXA9XCJ0cnVlXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8TGFiZWwgY2xhc3M9XCJtLTEwIHRleHQgcGx1Z2luXCIgdGV4dD1cIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWh0dHBcIj48L0xhYmVsPlxuICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDxCdXR0b24gY2xhc3M9XCJtLWItMTAgbS10LTEwIHQtMjBcIiByb3c9XCIxXCIgdGV4dD1cIkNob29zZSBpbWFnZSB0byB1cGxvYWRcIiBAdGFwPVwib25TZWxlY3RJbWFnZVRhcCgkZXZlbnQpXCI+PC9CdXR0b24+XG4gICAgICAgIDwvR3JpZExheW91dD5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBWdWVSeCBmcm9tIFwiLi4vdnVlLXJ4XCI7XG4gICAgaW1wb3J0IFZ1ZSBmcm9tIFwibmF0aXZlc2NyaXB0LXZ1ZVwiO1xuXG4gICAgY29uc3QgYXBwID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgY29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XG4gICAgY29uc3QgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XG4gICAgY29uc3QgaW1hZ2VQaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCIpO1xuICAgIGNvbnN0IHJ4anMgPSByZXF1aXJlKFwicnhqc1wiKTtcbiAgICBjb25zdCBvcGVyYXRvcnMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4gICAgY29uc3QgYmdIdHRwID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWh0dHBcIik7XG5cbiAgICBWdWUudXNlKFZ1ZVJ4KTtcbiAgICAvLyBWdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlOyAvLyB1bmNvbW1lbnQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlc1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzaG93V2VsY29tZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiBiZ0h0dHAuc2Vzc2lvbihcImltYWdlLXVwbG9hZFwiKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RmlsZU5hbWVCZWluZ1VwbG9hZGVkOiBcIlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBzdWJzY3JpcHRpb25zKCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudCQgPSBuZXcgcnhqcy5CZWhhdmlvclN1YmplY3Qoe30pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBldmVudDogdGhpcy5ldmVudCQsXG4gICAgICAgICAgICAgICAgZXZlbnRMb2c6IHRoaXMuZXZlbnQkLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9ycy5zYW1wbGVUaW1lKDIwMCksXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9ycy5jb25jYXRNYXAodmFsdWUgPT4gcnhqcy5vZih2YWx1ZSkpLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcnMuc2NhbigoYWNjLCBsb2dFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobG9nRW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pLFxuICAgICAgICAgICAgICAgICAgICAvLyBlbWl0IG9ubHkgbG9ncyBmb3IgdGhlIHRoaXMuY3VycmVudEZpbGVOYW1lQmVpbmdVcGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcnMubWFwKGFsbExvZ3MgPT4gYWxsTG9ncy5maWx0ZXIobG9nRW50cnkgPT4gISFsb2dFbnRyeSAmJiBsb2dFbnRyeS5ldmVudFRpdGxlICYmIGxvZ0VudHJ5LmV2ZW50VGl0bGUuaW5kZXhPZih0aGlzLmN1cnJlbnRGaWxlTmFtZUJlaW5nVXBsb2FkZWQpID4gMCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgb25TZWxlY3RJbWFnZVRhcCgpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwic2luZ2xlXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5hdXRob3JpemUoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dXZWxjb21lID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZUFzc2V0ID0gc2VsZWN0aW9uLmxlbmd0aCA+IDAgPyBzZWxlY3Rpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMF0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEltYWdlRmlsZVBhdGgoaW1hZ2VBc3NldCkudGhlbihwYXRoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHBhdGg6ICR7cGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRJbWFnZShwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGxvYWRJbWFnZShwYXRoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZpbGVOYW1lQmVpbmdVcGxvYWRlZCA9IGZpbGUucGF0aC5zdWJzdHIoXG4gICAgICAgICAgICAgICAgICAgIGZpbGUucGF0aC5sYXN0SW5kZXhPZihcIi9cIikgKyAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuY3JlYXRlTmV3UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZGVzY3JpcHRpb24gPSBcInVwbG9hZGluZyBpbWFnZSBcIiArIGZpbGUucGF0aDtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbXCJGaWxlLU5hbWVcIl0gPSB0aGlzLmN1cnJlbnRGaWxlTmFtZUJlaW5nVXBsb2FkZWQ7XG5cbiAgICAgICAgICAgICAgICAvLyAtLS0tLT4gbXVsdGlwYXJ0IHVwbG9hZFxuICAgICAgICAgICAgICAgIC8vIHZhciBwYXJhbXMgPSBbe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmFtZTogXCJ0ZXN0XCIsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YWx1ZTogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5hbWU6IFwiZmlsZVRvVXBsb2FkXCIsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmaWxlbmFtZTogZmlsZS5wYXRoLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbWltZVR5cGU6IFwiaW1hZ2UvanBlZ1wiXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyBdO1xuICAgICAgICAgICAgICAgIC8vIHZhciB0YXNrID0gdGhpcy5zZXNzaW9uLm11bHRpcGFydFVwbG9hZChwYXJhbXMsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIC8vIDwtLS0tLSBtdWx0aXBhcnQgdXBsb2FkXG5cbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuc2Vzc2lvbi51cGxvYWRGaWxlKGZpbGUucGF0aCwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgdGFzay5vbihcInByb2dyZXNzXCIsIHRoaXMub25FdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0YXNrLm9uKFwiZXJyb3JcIiwgdGhpcy5vbkV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIHRhc2sub24oXCJyZXNwb25kZWRcIiwgdGhpcy5vbkV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIHRhc2sub24oXCJjb21wbGV0ZVwiLCB0aGlzLm9uRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlTmV3UmVxdWVzdCgpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsO1xuICAgICAgICAgICAgICAgIC8vIE5PVEU6IHVzaW5nIGh0dHBzOi8vaHR0cGJpbi5vcmcvcG9zdCBmb3IgdGVzdGluZyBwdXJwb3NlcyxcbiAgICAgICAgICAgICAgICAvLyB5b3UnbGwgbmVlZCB0byB1c2UgeW91ciBvd24gc2VydmljZSBpbiByZWFsLXdvcmxkIGFwcFxuICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybS5pc0lPUykge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSBcImh0dHBzOi8vaHR0cGJpbi5vcmcvcG9zdFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IFwiaHR0cDovL3d3dy5jc20tdGVzdGNlbnRlci5vcmcvdGVzdFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ1cGxvYWRpbmcgZmlsZS4uLlwiLFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkQXV0b0RlbGV0ZUFmdGVyVXBsb2FkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYW5kcm9pZE5vdGlmaWNhdGlvblRpdGxlOiBcIk5hdGl2ZVNjcmlwdCBIVFRQIGJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm0uaXNJT1MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudmVyc2lvbiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUEhJbWFnZVJlcXVlc3RPcHRpb25zVmVyc2lvbi5DdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kZWxpdmVyeU1vZGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgUEhJbWFnZU1hbmFnZXIuZGVmYXVsdE1hbmFnZXIoKS5yZXF1ZXN0SW1hZ2VEYXRhRm9yQXNzZXRPcHRpb25zUmVzdWx0SGFuZGxlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFzc2V0LmlvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5zRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wRm9sZGVyUGF0aCA9IGZzLmtub3duRm9sZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRlbXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRoID0gZnMucGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZvbGRlclBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRlLm5vdygpICsgXCIuanBnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuc0RhdGEud3JpdGVUb0ZpbGVBdG9taWNhbGx5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZpbGVQYXRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wRmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gaW1hZ2VBc3NldC5hbmRyb2lkLCBzaW5jZSBpdCAncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbWFnZUFzc2V0LmFuZHJvaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FdmVudChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU6IGUuZXZlbnROYW1lICsgXCIgXCIgKyBlLm9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZS5lcnJvciA/IGUuZXJyb3IudG9TdHJpbmcoKSA6IGUuZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Qnl0ZXM6IGUuY3VycmVudEJ5dGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxCeXRlczogZS50b3RhbEJ5dGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogZS5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByYXc6IEpTT04uc3RyaW5naWZ5KGUpIC8vIHVuY29tbWVudCBmb3IgZGVidWdnaW5nIHB1cnBvc2VzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudCQubmV4dChldmVudEVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAuaG9tZS1wYW5lbCB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMjA7XG4gICAgICAgIG1hcmdpbjogMTU7XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uLWxhYmVsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTU7XG4gICAgfVxuXG4gICAgLnRleHQge1xuICAgICAgICB0ZXh0LWFsaWduOlxuICAgICAgICAgICAgY2VudGVyO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuXG4gICAgLnBsdWdpbiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICB9XG5cbiAgICAubmF0aXZlc2NyaXB0LWxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiA2MHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q1YWZlO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHgvMjBweDtcbiAgICAgICAgd2lkdGg6IDIzMHB4O1xuICAgICAgICBoZWlnaHQ6IDIzMHB4O1xuICAgIH1cbjwvc3R5bGU+IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uaG9tZS1wYW5lbFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAyMDtcXG4gICAgbWFyZ2luOiAxNTtcXG59XFxuLmRlc2NyaXB0aW9uLWxhYmVsW2RhdGEtdi03NjNkYjk3Yl0ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxNTtcXG59XFxuLnRleHRbZGF0YS12LTc2M2RiOTdiXSB7XFxuICAgIHRleHQtYWxpZ246XFxuICAgICAgICBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuLnBsdWdpbltkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgZm9udC1zaXplOiAyM3B4O1xcbn1cXG4ubmF0aXZlc2NyaXB0LWxhYmVsW2RhdGEtdi03NjNkYjk3Yl0ge1xcbiAgICBmb250LXNpemU6IDYwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDVhZmU7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweC8yMHB4O1xcbiAgICB3aWR0aDogMjMwcHg7XFxuICAgIGhlaWdodDogMjMwcHg7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInBhZ2VcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiQWN0aW9uQmFyXCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWN0aW9uLWJhclwiLFxuICAgICAgICBhdHRyczogeyB0aXRsZTogXCJpbWFnZXBpY2tlciArIGJhY2tncm91bmQtaHR0cFwiIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvd3M6IFwiKiwgYXV0b1wiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgICFfdm0uc2hvd1dlbGNvbWVcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3dzOiBcImF1dG8gYXV0byBhdXRvLCAqXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiUHJvZ3Jlc3NcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmV2ZW50ICYmIF92bS5ldmVudC5ldmVudERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfdm0uZXZlbnQuZXZlbnREYXRhLmN1cnJlbnRCeXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZXZlbnQgJiYgX3ZtLmV2ZW50LmV2ZW50RGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5ldmVudC5ldmVudERhdGEudG90YWxCeXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uZXZlbnQgJiZcbiAgICAgICAgICAgICAgICAgIF92bS5ldmVudC5ldmVudERhdGEgJiZcbiAgICAgICAgICAgICAgICAgIF92bS5ldmVudC5ldmVudERhdGEuY3VycmVudEJ5dGVzICE9PSBOYU5cbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm0tMTAgdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRyYW5zZmVycmVkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmV2ZW50LmV2ZW50RGF0YS5jdXJyZW50Qnl0ZXMgLyAxMDAwICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBLQlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtLTEwIHRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjJcIiwgdGV4dDogXCJFdmVudHNcIiB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIkxpc3RWaWV3XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiM1wiLCBpdGVtczogX3ZtLmV2ZW50TG9nLCBcIithbGlhc1wiOiBcIml0ZW1cIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVmLml0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInQtMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW0uZXZlbnRUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0V3JhcDogXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RGF0YSAmJiBpdGVtLmV2ZW50RGF0YS5lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogaXRlbS5ldmVudERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiRXJyb3I6IFwiICsgaXRlbS5ldmVudERhdGEuZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXcmFwOiBcInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RGF0YSAmJiBpdGVtLmV2ZW50RGF0YS5ib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLmV2ZW50RGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJCb2R5OiBcIiArIGl0ZW0uZXZlbnREYXRhLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXcmFwOiBcInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RGF0YSAmJiBpdGVtLmV2ZW50RGF0YS5yYXdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW0uZXZlbnREYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlJhdzogXCIgKyBpdGVtLmV2ZW50RGF0YS5yYXdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXcmFwOiBcInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDI2ODAzMjAzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLnNob3dXZWxjb21lXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHZlcnRpY2FsQWxpZ25tZW50OiBcIm1pZGRsZVwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibS0xMCBuYXRpdmVzY3JpcHQtbGFiZWwgdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIntOfVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLnNob3dXZWxjb21lXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtLTEwIHRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGlzIHNhbXBsZSBhcHAgc2hvd3MgaG93IHRvIHBpY2sgYW4gaW1hZ2Ugd2l0aFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0V3JhcDogXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm0tMTAgdGV4dCBwbHVnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIiB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5zaG93V2VsY29tZVxuICAgICAgICAgICAgICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibS0xMCB0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcImFuZCB1cGxvYWQgaXQgdXNpbmdcIiwgdGV4dFdyYXA6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm0tMTAgdGV4dCBwbHVnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCIgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtLWItMTAgbS10LTEwIHQtMjBcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIxXCIsIHRleHQ6IFwiQ2hvb3NlIGltYWdlIHRvIHVwbG9hZFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25TZWxlY3RJbWFnZVRhcCgkZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIF5cXFxcLlxcXFwvYXBwXFxcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLmpzXCI6IFwiLi9hcHAuanNcIixcblx0XCIuL3Z1ZS1yeC9kaXN0L3Z1ZS1yeC5lc20uanNcIjogXCIuL3Z1ZS1yeC9kaXN0L3Z1ZS1yeC5lc20uanNcIixcblx0XCIuL3Z1ZS1yeC9kaXN0L3Z1ZS1yeC5qc1wiOiBcIi4vdnVlLXJ4L2Rpc3QvdnVlLXJ4LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKSg/PCFcXFxcLlxcXFwvXFxcXGJ0ZXN0c1xcXFxiXFxcXC8uKj8pXFxcXC4oeG1sfGNzc3xqc3xrdHwoPzwhXFxcXC5kXFxcXC4pdHN8KD88IVxcXFxiX1tcXFxcdy1dKlxcXFwuKXNjc3MpJFwiOyIsImdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIn5uYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIiwgKCkgPT4gcmVxdWlyZShcIiFuYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svY3NzMmpzb24tbG9hZGVyP3VzZUZvckltcG9ydHMhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIm5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFuYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIikpO21vZHVsZS5leHBvcnRzID0ge1widHlwZVwiOlwic3R5bGVzaGVldFwiLFwic3R5bGVzaGVldFwiOntcInJ1bGVzXCI6W3tcInR5cGVcIjpcImNvbW1lbnRcIixcImNvbW1lbnRcIjpcIlxcbkluIG1hbnkgY2FzZXMgeW91IG1heSB3YW50IHRvIHVzZSB0aGUgTmF0aXZlU2NyaXB0IGNvcmUgdGhlbWUgaW5zdGVhZFxcbm9mIHdyaXRpbmcgeW91ciBvd24gQ1NTIHJ1bGVzLiBGb3IgYSBmdWxsIGxpc3Qgb2YgY2xhc3MgbmFtZXMgaW4gdGhlIHRoZW1lXFxucmVmZXIgdG8gaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy91aS90aGVtZS5cXG5UaGUgaW1wb3J0ZWQgQ1NTIHJ1bGVzIG11c3QgcHJlY2VkZSBhbGwgb3RoZXIgdHlwZXMgb2YgcnVsZXMuXFxuXCJ9LHtcInR5cGVcIjpcImltcG9ydFwiLFwiaW1wb3J0XCI6XCInfm5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzcydcIn1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07O1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkJztcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG4vLyBWdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5uZXcgVnVlKHtcblxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxGcmFtZT5cbiAgICAgICAgICAgIDxIZWxsb1dvcmxkIC8+XG4gICAgICAgIDwvRnJhbWU+YCxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVsbG9Xb3JsZFxuICAgIH1cbn0pLiRzdGFydCgpOyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjc2M2RiOTdiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvcmFmYWVsL1Byb2dyYW1tYXJlL2ZpbGUtdXBsb2FkL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzc2M2RiOTdiJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzc2M2RiOTdiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzc2M2RiOTdiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3NjNkYjk3YicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgTkVWRVIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG52YXIgVnVlJDE7XG52YXIgd2FybiA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBOT1RFKGJlbmxlc2gpOiB0aGUgdmFsdWUgb2YgdGhpcyBtZXRob2Qgc2VlbXMgZHViaW91cyBub3csIGJ1dCBJJ20gbm90IHN1cmVcbi8vIGlmIHRoaXMgaXMgYSBWdWUgY29udmVudGlvbiBJJ20ganVzdCBub3QgZmFtaWxpYXIgd2l0aC4gUGVyaGFwcyBpdCB3b3VsZFxuLy8gYmUgYmV0dGVyIHRvIGp1c3QgaW1wb3J0IGFuZCB1c2UgVnVlIGRpcmVjdGx5P1xuZnVuY3Rpb24gaW5zdGFsbCAoX1Z1ZSkge1xuICBWdWUkMSA9IF9WdWU7XG4gIHdhcm4gPSBWdWUkMS51dGlsLndhcm4gfHwgd2Fybjtcbn1cblxuLy8gVE9ETyhiZW5sZXNoKTogYXMgdGltZSBwYXNzZXMsIHRoaXMgc2hvdWxkIGJlIHVwZGF0ZWQgdG8gdXNlIFJ4SlMgNi4xJ3Ncbi8vIGBpc09ic2VydmFibGVgIG1ldGhvZC4gQnV0IHdhaXQgdW50aWwgeW91J3JlIHJlYWR5IHRvIGRyb3Agc3VwcG9ydCBmb3IgUnggNVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlIChvYikge1xuICByZXR1cm4gb2IgJiYgdHlwZW9mIG9iLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBpc09ic2VydmVyIChzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0ICYmIChcbiAgICB0eXBlb2Ygc3ViamVjdC5uZXh0ID09PSAnZnVuY3Rpb24nXG4gIClcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUgKHZtLCBrZXksIHZhbCkge1xuICBpZiAoa2V5IGluIHZtKSB7XG4gICAgdm1ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBWdWUkMS51dGlsLmRlZmluZVJlYWN0aXZlKHZtLCBrZXksIHZhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0S2V5IChiaW5kaW5nKSB7XG4gIHJldHVybiBbYmluZGluZy5hcmddLmNvbmNhdChPYmplY3Qua2V5cyhiaW5kaW5nLm1vZGlmaWVycykpLmpvaW4oJzonKVxufVxuXG52YXIgcnhNaXhpbiA9IHtcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgZG9tU3RyZWFtcyA9IHZtLiRvcHRpb25zLmRvbVN0cmVhbXM7XG4gICAgaWYgKGRvbVN0cmVhbXMpIHtcbiAgICAgIGRvbVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZtW2tleV0gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG9ic2VydmFibGVNZXRob2RzID0gdm0uJG9wdGlvbnMub2JzZXJ2YWJsZU1ldGhvZHM7XG4gICAgaWYgKG9ic2VydmFibGVNZXRob2RzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYnNlcnZhYmxlTWV0aG9kcykpIHtcbiAgICAgICAgb2JzZXJ2YWJsZU1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgIHZtWyBtZXRob2ROYW1lICsgJyQnIF0gPSB2bS4kY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZChtZXRob2ROYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3Qua2V5cyhvYnNlcnZhYmxlTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgIHZtW29ic2VydmFibGVNZXRob2RzW21ldGhvZE5hbWVdXSA9IHZtLiRjcmVhdGVPYnNlcnZhYmxlTWV0aG9kKG1ldGhvZE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb2JzID0gdm0uJG9wdGlvbnMuc3Vic2NyaXB0aW9ucztcbiAgICBpZiAodHlwZW9mIG9icyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2JzID0gb2JzLmNhbGwodm0pO1xuICAgIH1cbiAgICBpZiAob2JzKSB7XG4gICAgICB2bS4kb2JzZXJ2YWJsZXMgPSB7fTtcbiAgICAgIHZtLl9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICBPYmplY3Qua2V5cyhvYnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSh2bSwga2V5LCB1bmRlZmluZWQpO1xuICAgICAgICB2YXIgb2IgPSB2bS4kb2JzZXJ2YWJsZXNba2V5XSA9IG9ic1trZXldO1xuICAgICAgICBpZiAoIWlzT2JzZXJ2YWJsZShvYikpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgJ0ludmFsaWQgT2JzZXJ2YWJsZSBmb3VuZCBpbiBzdWJzY3JpcHRpb25zIG9wdGlvbiB3aXRoIGtleSBcIicgKyBrZXkgKyAnXCIuJyxcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2bS5fc3Vic2NyaXB0aW9uLmFkZChvYnNba2V5XS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdm1ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHsgdGhyb3cgZXJyb3IgfSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgc3RyZWFtRGlyZWN0aXZlID0ge1xuICAvLyBFeGFtcGxlIC4vZXhhbXBsZS9jb3VudGVyX2Rpci5odG1sXG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQgKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xuICAgIHZhciBoYW5kbGUgPSBiaW5kaW5nLnZhbHVlO1xuICAgIHZhciBldmVudCA9IGJpbmRpbmcuYXJnO1xuICAgIHZhciBzdHJlYW1OYW1lID0gYmluZGluZy5leHByZXNzaW9uO1xuICAgIHZhciBtb2RpZmllcnMgPSBiaW5kaW5nLm1vZGlmaWVycztcblxuICAgIGlmIChpc09ic2VydmVyKGhhbmRsZSkpIHtcbiAgICAgIGhhbmRsZSA9IHsgc3ViamVjdDogaGFuZGxlIH07XG4gICAgfSBlbHNlIGlmICghaGFuZGxlIHx8ICFpc09ic2VydmVyKGhhbmRsZS5zdWJqZWN0KSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0ludmFsaWQgU3ViamVjdCBmb3VuZCBpbiBkaXJlY3RpdmUgd2l0aCBrZXkgXCInICsgc3RyZWFtTmFtZSArICdcIi4nICtcbiAgICAgICAgc3RyZWFtTmFtZSArICcgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFN1YmplY3Qgb3IgaGF2ZSB0aGUgJyArXG4gICAgICAgICd0eXBlIHsgc3ViamVjdDogU3ViamVjdCwgZGF0YTogYW55IH0uJyxcbiAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgKTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBtb2RpZmllcnNGdW5jcyA9IHtcbiAgICAgIHN0b3A6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnN0b3BQcm9wYWdhdGlvbigpOyB9LFxuICAgICAgcHJldmVudDogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTsgfVxuICAgIH07XG5cbiAgICB2YXIgbW9kaWZpZXJzRXhpc3RzID0gT2JqZWN0LmtleXMobW9kaWZpZXJzRnVuY3MpLmZpbHRlcihcbiAgICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG1vZGlmaWVyc1trZXldOyB9XG4gICAgKTtcblxuICAgIHZhciBzdWJqZWN0ID0gaGFuZGxlLnN1YmplY3Q7XG4gICAgdmFyIG5leHQgPSAoc3ViamVjdC5uZXh0IHx8IHN1YmplY3Qub25OZXh0KS5iaW5kKHN1YmplY3QpO1xuXG4gICAgaWYgKCFtb2RpZmllcnMubmF0aXZlICYmIHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICBoYW5kbGUuc3Vic2NyaXB0aW9uID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuJGV2ZW50VG9PYnNlcnZhYmxlKGV2ZW50KS5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbW9kaWZpZXJzRXhpc3RzLmZvckVhY2goZnVuY3Rpb24gKG1vZCkgeyByZXR1cm4gbW9kaWZpZXJzRnVuY3NbbW9kXShlKTsgfSk7XG4gICAgICAgIG5leHQoe1xuICAgICAgICAgIGV2ZW50OiBlLFxuICAgICAgICAgIGRhdGE6IGhhbmRsZS5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmcm9tRXZlbnRBcmdzID0gaGFuZGxlLm9wdGlvbnMgPyBbZWwsIGV2ZW50LCBoYW5kbGUub3B0aW9uc10gOiBbZWwsIGV2ZW50XTtcbiAgICAgIGhhbmRsZS5zdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQuYXBwbHkodm9pZCAwLCBmcm9tRXZlbnRBcmdzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbW9kaWZpZXJzRXhpc3RzLmZvckVhY2goZnVuY3Rpb24gKG1vZCkgeyByZXR1cm4gbW9kaWZpZXJzRnVuY3NbbW9kXShlKTsgfSk7XG4gICAgICAgIG5leHQoe1xuICAgICAgICAgIGV2ZW50OiBlLFxuICAgICAgICAgIGRhdGE6IGhhbmRsZS5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSlcblxuICAgICAgLy8gc3RvcmUgaGFuZGxlIG9uIGVsZW1lbnQgd2l0aCBhIHVuaXF1ZSBrZXkgZm9yIGlkZW50aWZ5aW5nXG4gICAgICAvLyBtdWx0aXBsZSB2LXN0cmVhbSBkaXJlY3RpdmVzIG9uIHRoZSBzYW1lIG5vZGVcbiAgICAgIDsoZWwuX3J4SGFuZGxlcyB8fCAoZWwuX3J4SGFuZGxlcyA9IHt9KSlbZ2V0S2V5KGJpbmRpbmcpXSA9IGhhbmRsZTtcbiAgICB9XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUgKGVsLCBiaW5kaW5nKSB7XG4gICAgdmFyIGhhbmRsZSA9IGJpbmRpbmcudmFsdWU7XG4gICAgdmFyIF9oYW5kbGUgPSBlbC5fcnhIYW5kbGVzICYmIGVsLl9yeEhhbmRsZXNbZ2V0S2V5KGJpbmRpbmcpXTtcbiAgICBpZiAoX2hhbmRsZSAmJiBoYW5kbGUgJiYgaXNPYnNlcnZlcihoYW5kbGUuc3ViamVjdCkpIHtcbiAgICAgIF9oYW5kbGUuZGF0YSA9IGhhbmRsZS5kYXRhO1xuICAgIH1cbiAgfSxcblxuICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCAoZWwsIGJpbmRpbmcpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5KGJpbmRpbmcpO1xuICAgIHZhciBoYW5kbGUgPSBlbC5fcnhIYW5kbGVzICYmIGVsLl9yeEhhbmRsZXNba2V5XTtcbiAgICBpZiAoaGFuZGxlKSB7XG4gICAgICBpZiAoaGFuZGxlLnN1YnNjcmlwdGlvbikge1xuICAgICAgICBoYW5kbGUuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICBlbC5fcnhIYW5kbGVzW2tleV0gPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB3YXRjaEFzT2JzZXJ2YWJsZSAoZXhwT3JGbiwgb3B0aW9ucykge1xuICB2YXIgdm0gPSB0aGlzO1xuICB2YXIgb2JzJCA9IG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgIHZhciBfdW53YXRjaDtcbiAgICB2YXIgd2F0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdW53YXRjaCA9IHZtLiR3YXRjaChleHBPckZuLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoeyBvbGRWYWx1ZTogb2xkVmFsdWUsIG5ld1ZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICAvLyBpZiAkd2F0Y2hBc09ic2VydmFibGUgaXMgY2FsbGVkIGluc2lkZSB0aGUgc3Vic2NyaXB0aW9ucyBmdW5jdGlvbixcbiAgICAvLyBiZWNhdXNlIGRhdGEgaGFzbid0IGJlZW4gb2JzZXJ2ZWQgeWV0LCB0aGUgd2F0Y2hlciB3aWxsIG5vdCB3b3JrLlxuICAgIC8vIGluIHRoYXQgY2FzZSwgd2FpdCB1bnRpbCBjcmVhdGVkIGhvb2sgdG8gd2F0Y2guXG4gICAgaWYgKHZtLl9kYXRhKSB7XG4gICAgICB3YXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS4kb25jZSgnaG9vazpjcmVhdGVkJywgd2F0Y2gpO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgZnVuY3Rpb24gd2hpY2ggZGlzY29ubmVjdHMgdGhlICR3YXRjaCBleHByZXNzaW9uXG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgX3Vud2F0Y2ggJiYgX3Vud2F0Y2goKTtcbiAgICB9KVxuICB9KTtcblxuICByZXR1cm4gb2JzJFxufVxuXG5mdW5jdGlvbiBmcm9tRE9NRXZlbnQgKHNlbGVjdG9yLCBldmVudCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBUT0RPKGJlbmxlc2gpOiBJJ20gbm90IHN1cmUgaWYgdGhpcyBpcyByZWFsbHkgd2hhdCB5b3Ugd2FudCBoZXJlLFxuICAgIC8vIGJ1dCBpdCdzIGVxdWl2YWxlbnQgdG8gd2hhdCB5b3Ugd2VyZSBkb2luZy4gWW91IG1pZ2h0IHdhbnQgRU1QVFlcbiAgICByZXR1cm4gTkVWRVJcbiAgfVxuXG4gIHZhciB2bSA9IHRoaXM7XG4gIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIHZhciBvYnMkID0gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKGUpIHtcbiAgICAgIGlmICghdm0uJGVsKSB7IHJldHVybiB9XG4gICAgICBpZiAoc2VsZWN0b3IgPT09IG51bGwgJiYgdm0uJGVsID09PSBlLnRhcmdldCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKSB9XG4gICAgICB2YXIgZWxzID0gdm0uJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgdmFyIGVsID0gZS50YXJnZXQ7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChlbHNbaV0gPT09IGVsKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAvLyBSZXR1cm5zIGZ1bmN0aW9uIHdoaWNoIGRpc2Nvbm5lY3RzIHRoZSAkd2F0Y2ggZXhwcmVzc2lvblxuICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfSlcbiAgfSk7XG5cbiAgcmV0dXJuIG9icyRcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlVG8gKG9ic2VydmFibGUsIG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICB2YXIgc3Vic2NyaXB0aW9uID0gb2JzZXJ2YWJsZS5zdWJzY3JpYmUobmV4dCwgZXJyb3IsIGNvbXBsZXRlKVxuICA7KHRoaXMuX3N1YnNjcmlwdGlvbiB8fCAodGhpcy5fc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpKSkuYWRkKHN1YnNjcmlwdGlvbik7XG4gIHJldHVybiBzdWJzY3JpcHRpb25cbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3Z1ZWpzLm9yZy92Mi9hcGkvI3ZtLW9ufVxuICogQHBhcmFtIHtTdHJpbmd8fEFycmF5fSBldnROYW1lIEV2ZW50IG5hbWVcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEV2ZW50IHN0cmVhbVxuICovXG5mdW5jdGlvbiBldmVudFRvT2JzZXJ2YWJsZSAoZXZ0TmFtZSkge1xuICB2YXIgdm0gPSB0aGlzO1xuICB2YXIgZXZ0TmFtZXMgPSBBcnJheS5pc0FycmF5KGV2dE5hbWUpID8gZXZ0TmFtZSA6IFtldnROYW1lXTtcbiAgdmFyIG9icyQgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICB2YXIgZXZlbnRQYWlycyA9IGV2dE5hbWVzLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dCh7IG5hbWU6IG5hbWUsIG1zZzogbXNnIH0pOyB9O1xuICAgICAgdm0uJG9uKG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB7IG5hbWU6IG5hbWUsIGNhbGxiYWNrOiBjYWxsYmFjayB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIE9ubHkgcmVtb3ZlIHRoZSBzcGVjaWZpYyBjYWxsYmFja1xuICAgICAgZXZlbnRQYWlycy5mb3JFYWNoKGZ1bmN0aW9uIChwYWlyKSB7IHJldHVybiB2bS4kb2ZmKHBhaXIubmFtZSwgcGFpci5jYWxsYmFjayk7IH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG9icyRcbn1cblxuLyoqXG4gKiBAbmFtZSBWdWUucHJvdG90eXBlLiRjcmVhdGVPYnNlcnZhYmxlTWV0aG9kXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIGZyb20gYSBnaXZlbiBmdW5jdGlvbiBuYW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZE5hbWUgRnVuY3Rpb24gbmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbcGFzc0NvbnRleHRdIEFwcGVuZCB0aGUgY2FsbCBjb250ZXh0IGF0IHRoZSBlbmQgb2YgZW1pdCBkYXRhP1xuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gSG90IHN0cmVhbVxuICovXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlTWV0aG9kIChtZXRob2ROYW1lLCBwYXNzQ29udGV4dCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIGlmICh2bVttZXRob2ROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgd2FybihcbiAgICAgICdQb3RlbnRpYWwgYnVnOiAnICtcbiAgICAgIFwiTWV0aG9kIFwiICsgbWV0aG9kTmFtZSArIFwiIGFscmVhZHkgZGVmaW5lZCBvbiB2bSBhbmQgaGFzIGJlZW4gb3ZlcndyaXR0ZW4gYnkgJGNyZWF0ZU9ic2VydmFibGVNZXRob2QuXCIgK1xuICAgICAgU3RyaW5nKHZtW21ldGhvZE5hbWVdKSxcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxuXG4gIHZhciBjcmVhdG9yID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgdm1bbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgIGlmIChwYXNzQ29udGV4dCkge1xuICAgICAgICBhcmdzLnB1c2godGhpcyk7XG4gICAgICAgIG9ic2VydmVyLm5leHQoYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoYXJnc1swXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlbGV0ZSB2bVttZXRob2ROYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgLy8gTXVzdCBiZSBhIGhvdCBzdHJlYW0gb3RoZXJ3aXNlIGZ1bmN0aW9uIGNvbnRleHQgbWF5IG92ZXJ3cml0ZSBvdmVyIGFuZCBvdmVyIGFnYWluXG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZShjcmVhdG9yKS5waXBlKHNoYXJlKCkpXG59XG5cbi8qIGdsb2JhbCBWdWUgKi9cblxuZnVuY3Rpb24gVnVlUnggKFZ1ZSkge1xuICBpbnN0YWxsKFZ1ZSk7XG4gIFZ1ZS5taXhpbihyeE1peGluKTtcbiAgVnVlLmRpcmVjdGl2ZSgnc3RyZWFtJywgc3RyZWFtRGlyZWN0aXZlKTtcbiAgVnVlLnByb3RvdHlwZS4kd2F0Y2hBc09ic2VydmFibGUgPSB3YXRjaEFzT2JzZXJ2YWJsZTtcbiAgVnVlLnByb3RvdHlwZS4kZnJvbURPTUV2ZW50ID0gZnJvbURPTUV2ZW50O1xuICBWdWUucHJvdG90eXBlLiRzdWJzY3JpYmVUbyA9IHN1YnNjcmliZVRvO1xuICBWdWUucHJvdG90eXBlLiRldmVudFRvT2JzZXJ2YWJsZSA9IGV2ZW50VG9PYnNlcnZhYmxlO1xuICBWdWUucHJvdG90eXBlLiRjcmVhdGVPYnNlcnZhYmxlTWV0aG9kID0gY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZDtcbn1cblxuLy8gYXV0byBpbnN0YWxsXG5pZiAodHlwZW9mIFZ1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgVnVlLnVzZShWdWVSeCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZVJ4O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsLlZ1ZVJ4ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBWdWUkMTtcbiAgdmFyIHdhcm4gPSBmdW5jdGlvbiAoKSB7fTtcblxuICAvLyBOT1RFKGJlbmxlc2gpOiB0aGUgdmFsdWUgb2YgdGhpcyBtZXRob2Qgc2VlbXMgZHViaW91cyBub3csIGJ1dCBJJ20gbm90IHN1cmVcbiAgLy8gaWYgdGhpcyBpcyBhIFZ1ZSBjb252ZW50aW9uIEknbSBqdXN0IG5vdCBmYW1pbGlhciB3aXRoLiBQZXJoYXBzIGl0IHdvdWxkXG4gIC8vIGJlIGJldHRlciB0byBqdXN0IGltcG9ydCBhbmQgdXNlIFZ1ZSBkaXJlY3RseT9cbiAgZnVuY3Rpb24gaW5zdGFsbCAoX1Z1ZSkge1xuICAgIFZ1ZSQxID0gX1Z1ZTtcbiAgICB3YXJuID0gVnVlJDEudXRpbC53YXJuIHx8IHdhcm47XG4gIH1cblxuICAvLyBUT0RPKGJlbmxlc2gpOiBhcyB0aW1lIHBhc3NlcywgdGhpcyBzaG91bGQgYmUgdXBkYXRlZCB0byB1c2UgUnhKUyA2LjEnc1xuICAvLyBgaXNPYnNlcnZhYmxlYCBtZXRob2QuIEJ1dCB3YWl0IHVudGlsIHlvdSdyZSByZWFkeSB0byBkcm9wIHN1cHBvcnQgZm9yIFJ4IDVcbiAgZnVuY3Rpb24gaXNPYnNlcnZhYmxlIChvYikge1xuICAgIHJldHVybiBvYiAmJiB0eXBlb2Ygb2Iuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nXG4gIH1cblxuICBmdW5jdGlvbiBpc09ic2VydmVyIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIHN1YmplY3QgJiYgKFxuICAgICAgdHlwZW9mIHN1YmplY3QubmV4dCA9PT0gJ2Z1bmN0aW9uJ1xuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlICh2bSwga2V5LCB2YWwpIHtcbiAgICBpZiAoa2V5IGluIHZtKSB7XG4gICAgICB2bVtrZXldID0gdmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICBWdWUkMS51dGlsLmRlZmluZVJlYWN0aXZlKHZtLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0S2V5IChiaW5kaW5nKSB7XG4gICAgcmV0dXJuIFtiaW5kaW5nLmFyZ10uY29uY2F0KE9iamVjdC5rZXlzKGJpbmRpbmcubW9kaWZpZXJzKSkuam9pbignOicpXG4gIH1cblxuICB2YXIgcnhqcyA9IHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJ1xuICAgID8gcmVxdWlyZSgncnhqcycpXG4gICAgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyB3aW5kb3cucnhqc1xuICAgICAgOiBudWxsO1xuXG4gIGlmICghcnhqcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlt2dWUtcnhdOiBSeEpTIGlzIG5vdCBmb3VuZC5cIilcbiAgfVxuXG4gIHZhciBPYnNlcnZhYmxlID0gcnhqcy5PYnNlcnZhYmxlO1xuICB2YXIgU3ViamVjdCA9IHJ4anMuU3ViamVjdDtcbiAgdmFyIFN1YnNjcmlwdGlvbiA9IHJ4anMuU3Vic2NyaXB0aW9uO1xuICB2YXIgZnJvbUV2ZW50ID0gcnhqcy5mcm9tRXZlbnQ7XG4gIHZhciBORVZFUiA9IHJ4anMuTkVWRVI7XG5cbiAgdmFyIHJ4TWl4aW4gPSB7XG4gICAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdmFyIGRvbVN0cmVhbXMgPSB2bS4kb3B0aW9ucy5kb21TdHJlYW1zO1xuICAgICAgaWYgKGRvbVN0cmVhbXMpIHtcbiAgICAgICAgZG9tU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2bVtrZXldID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBvYnNlcnZhYmxlTWV0aG9kcyA9IHZtLiRvcHRpb25zLm9ic2VydmFibGVNZXRob2RzO1xuICAgICAgaWYgKG9ic2VydmFibGVNZXRob2RzKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic2VydmFibGVNZXRob2RzKSkge1xuICAgICAgICAgIG9ic2VydmFibGVNZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZtWyBtZXRob2ROYW1lICsgJyQnIF0gPSB2bS4kY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZChtZXRob2ROYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYnNlcnZhYmxlTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdm1bb2JzZXJ2YWJsZU1ldGhvZHNbbWV0aG9kTmFtZV1dID0gdm0uJGNyZWF0ZU9ic2VydmFibGVNZXRob2QobWV0aG9kTmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIG9icyA9IHZtLiRvcHRpb25zLnN1YnNjcmlwdGlvbnM7XG4gICAgICBpZiAodHlwZW9mIG9icyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYnMgPSBvYnMuY2FsbCh2bSk7XG4gICAgICB9XG4gICAgICBpZiAob2JzKSB7XG4gICAgICAgIHZtLiRvYnNlcnZhYmxlcyA9IHt9O1xuICAgICAgICB2bS5fc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBPYmplY3Qua2V5cyhvYnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGRlZmluZVJlYWN0aXZlKHZtLCBrZXksIHVuZGVmaW5lZCk7XG4gICAgICAgICAgdmFyIG9iID0gdm0uJG9ic2VydmFibGVzW2tleV0gPSBvYnNba2V5XTtcbiAgICAgICAgICBpZiAoIWlzT2JzZXJ2YWJsZShvYikpIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICdJbnZhbGlkIE9ic2VydmFibGUgZm91bmQgaW4gc3Vic2NyaXB0aW9ucyBvcHRpb24gd2l0aCBrZXkgXCInICsga2V5ICsgJ1wiLicsXG4gICAgICAgICAgICAgIHZtXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIHZtLl9zdWJzY3JpcHRpb24uYWRkKG9ic1trZXldLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZtW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHsgdGhyb3cgZXJyb3IgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JlRGVzdHJveTogZnVuY3Rpb24gYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBzdHJlYW1EaXJlY3RpdmUgPSB7XG4gICAgLy8gRXhhbXBsZSAuL2V4YW1wbGUvY291bnRlcl9kaXIuaHRtbFxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQgKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xuICAgICAgdmFyIGhhbmRsZSA9IGJpbmRpbmcudmFsdWU7XG4gICAgICB2YXIgZXZlbnQgPSBiaW5kaW5nLmFyZztcbiAgICAgIHZhciBzdHJlYW1OYW1lID0gYmluZGluZy5leHByZXNzaW9uO1xuICAgICAgdmFyIG1vZGlmaWVycyA9IGJpbmRpbmcubW9kaWZpZXJzO1xuXG4gICAgICBpZiAoaXNPYnNlcnZlcihoYW5kbGUpKSB7XG4gICAgICAgIGhhbmRsZSA9IHsgc3ViamVjdDogaGFuZGxlIH07XG4gICAgICB9IGVsc2UgaWYgKCFoYW5kbGUgfHwgIWlzT2JzZXJ2ZXIoaGFuZGxlLnN1YmplY3QpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0ludmFsaWQgU3ViamVjdCBmb3VuZCBpbiBkaXJlY3RpdmUgd2l0aCBrZXkgXCInICsgc3RyZWFtTmFtZSArICdcIi4nICtcbiAgICAgICAgICBzdHJlYW1OYW1lICsgJyBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgU3ViamVjdCBvciBoYXZlIHRoZSAnICtcbiAgICAgICAgICAndHlwZSB7IHN1YmplY3Q6IFN1YmplY3QsIGRhdGE6IGFueSB9LicsXG4gICAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgICApO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdmFyIG1vZGlmaWVyc0Z1bmNzID0ge1xuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKTsgfSxcbiAgICAgICAgcHJldmVudDogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTsgfVxuICAgICAgfTtcblxuICAgICAgdmFyIG1vZGlmaWVyc0V4aXN0cyA9IE9iamVjdC5rZXlzKG1vZGlmaWVyc0Z1bmNzKS5maWx0ZXIoXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG1vZGlmaWVyc1trZXldOyB9XG4gICAgICApO1xuXG4gICAgICB2YXIgc3ViamVjdCA9IGhhbmRsZS5zdWJqZWN0O1xuICAgICAgdmFyIG5leHQgPSAoc3ViamVjdC5uZXh0IHx8IHN1YmplY3Qub25OZXh0KS5iaW5kKHN1YmplY3QpO1xuXG4gICAgICBpZiAoIW1vZGlmaWVycy5uYXRpdmUgJiYgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgaGFuZGxlLnN1YnNjcmlwdGlvbiA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlLiRldmVudFRvT2JzZXJ2YWJsZShldmVudCkuc3Vic2NyaWJlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgbW9kaWZpZXJzRXhpc3RzLmZvckVhY2goZnVuY3Rpb24gKG1vZCkgeyByZXR1cm4gbW9kaWZpZXJzRnVuY3NbbW9kXShlKTsgfSk7XG4gICAgICAgICAgbmV4dCh7XG4gICAgICAgICAgICBldmVudDogZSxcbiAgICAgICAgICAgIGRhdGE6IGhhbmRsZS5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZyb21FdmVudEFyZ3MgPSBoYW5kbGUub3B0aW9ucyA/IFtlbCwgZXZlbnQsIGhhbmRsZS5vcHRpb25zXSA6IFtlbCwgZXZlbnRdO1xuICAgICAgICBoYW5kbGUuc3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50LmFwcGx5KHZvaWQgMCwgZnJvbUV2ZW50QXJncykuc3Vic2NyaWJlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgbW9kaWZpZXJzRXhpc3RzLmZvckVhY2goZnVuY3Rpb24gKG1vZCkgeyByZXR1cm4gbW9kaWZpZXJzRnVuY3NbbW9kXShlKTsgfSk7XG4gICAgICAgICAgbmV4dCh7XG4gICAgICAgICAgICBldmVudDogZSxcbiAgICAgICAgICAgIGRhdGE6IGhhbmRsZS5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc3RvcmUgaGFuZGxlIG9uIGVsZW1lbnQgd2l0aCBhIHVuaXF1ZSBrZXkgZm9yIGlkZW50aWZ5aW5nXG4gICAgICAgIC8vIG11bHRpcGxlIHYtc3RyZWFtIGRpcmVjdGl2ZXMgb24gdGhlIHNhbWUgbm9kZVxuICAgICAgICA7KGVsLl9yeEhhbmRsZXMgfHwgKGVsLl9yeEhhbmRsZXMgPSB7fSkpW2dldEtleShiaW5kaW5nKV0gPSBoYW5kbGU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlIChlbCwgYmluZGluZykge1xuICAgICAgdmFyIGhhbmRsZSA9IGJpbmRpbmcudmFsdWU7XG4gICAgICB2YXIgX2hhbmRsZSA9IGVsLl9yeEhhbmRsZXMgJiYgZWwuX3J4SGFuZGxlc1tnZXRLZXkoYmluZGluZyldO1xuICAgICAgaWYgKF9oYW5kbGUgJiYgaGFuZGxlICYmIGlzT2JzZXJ2ZXIoaGFuZGxlLnN1YmplY3QpKSB7XG4gICAgICAgIF9oYW5kbGUuZGF0YSA9IGhhbmRsZS5kYXRhO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCAoZWwsIGJpbmRpbmcpIHtcbiAgICAgIHZhciBrZXkgPSBnZXRLZXkoYmluZGluZyk7XG4gICAgICB2YXIgaGFuZGxlID0gZWwuX3J4SGFuZGxlcyAmJiBlbC5fcnhIYW5kbGVzW2tleV07XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIGlmIChoYW5kbGUuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsLl9yeEhhbmRsZXNba2V5XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2F0Y2hBc09ic2VydmFibGUgKGV4cE9yRm4sIG9wdGlvbnMpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciBvYnMkID0gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICB2YXIgX3Vud2F0Y2g7XG4gICAgICB2YXIgd2F0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF91bndhdGNoID0gdm0uJHdhdGNoKGV4cE9yRm4sIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgb2xkVmFsdWU6IG9sZFZhbHVlLCBuZXdWYWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgfTtcblxuICAgICAgLy8gaWYgJHdhdGNoQXNPYnNlcnZhYmxlIGlzIGNhbGxlZCBpbnNpZGUgdGhlIHN1YnNjcmlwdGlvbnMgZnVuY3Rpb24sXG4gICAgICAvLyBiZWNhdXNlIGRhdGEgaGFzbid0IGJlZW4gb2JzZXJ2ZWQgeWV0LCB0aGUgd2F0Y2hlciB3aWxsIG5vdCB3b3JrLlxuICAgICAgLy8gaW4gdGhhdCBjYXNlLCB3YWl0IHVudGlsIGNyZWF0ZWQgaG9vayB0byB3YXRjaC5cbiAgICAgIGlmICh2bS5fZGF0YSkge1xuICAgICAgICB3YXRjaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm0uJG9uY2UoJ2hvb2s6Y3JlYXRlZCcsIHdhdGNoKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmV0dXJucyBmdW5jdGlvbiB3aGljaCBkaXNjb25uZWN0cyB0aGUgJHdhdGNoIGV4cHJlc3Npb25cbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3Vud2F0Y2ggJiYgX3Vud2F0Y2goKTtcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JzJFxuICB9XG5cbiAgZnVuY3Rpb24gZnJvbURPTUV2ZW50IChzZWxlY3RvciwgZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRPRE8oYmVubGVzaCk6IEknbSBub3Qgc3VyZSBpZiB0aGlzIGlzIHJlYWxseSB3aGF0IHlvdSB3YW50IGhlcmUsXG4gICAgICAvLyBidXQgaXQncyBlcXVpdmFsZW50IHRvIHdoYXQgeW91IHdlcmUgZG9pbmcuIFlvdSBtaWdodCB3YW50IEVNUFRZXG4gICAgICByZXR1cm4gTkVWRVJcbiAgICB9XG5cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIG9icyQgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgIGZ1bmN0aW9uIGxpc3RlbmVyIChlKSB7XG4gICAgICAgIGlmICghdm0uJGVsKSB7IHJldHVybiB9XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gbnVsbCAmJiB2bS4kZWwgPT09IGUudGFyZ2V0KSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpIH1cbiAgICAgICAgdmFyIGVscyA9IHZtLiRlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgdmFyIGVsID0gZS50YXJnZXQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoZWxzW2ldID09PSBlbCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAvLyBSZXR1cm5zIGZ1bmN0aW9uIHdoaWNoIGRpc2Nvbm5lY3RzIHRoZSAkd2F0Y2ggZXhwcmVzc2lvblxuICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHJldHVybiBvYnMkXG4gIH1cblxuICBmdW5jdGlvbiBzdWJzY3JpYmVUbyAob2JzZXJ2YWJsZSwgbmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKG5leHQsIGVycm9yLCBjb21wbGV0ZSlcbiAgICA7KHRoaXMuX3N1YnNjcmlwdGlvbiB8fCAodGhpcy5fc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpKSkuYWRkKHN1YnNjcmlwdGlvbik7XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvblxuICB9XG5cbiAgLyoqXG4gICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdnVlanMub3JnL3YyL2FwaS8jdm0tb259XG4gICAqIEBwYXJhbSB7U3RyaW5nfHxBcnJheX0gZXZ0TmFtZSBFdmVudCBuYW1lXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEV2ZW50IHN0cmVhbVxuICAgKi9cbiAgZnVuY3Rpb24gZXZlbnRUb09ic2VydmFibGUgKGV2dE5hbWUpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciBldnROYW1lcyA9IEFycmF5LmlzQXJyYXkoZXZ0TmFtZSkgPyBldnROYW1lIDogW2V2dE5hbWVdO1xuICAgIHZhciBvYnMkID0gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICB2YXIgZXZlbnRQYWlycyA9IGV2dE5hbWVzLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAobXNnKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KHsgbmFtZTogbmFtZSwgbXNnOiBtc2cgfSk7IH07XG4gICAgICAgIHZtLiRvbihuYW1lLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB7IG5hbWU6IG5hbWUsIGNhbGxiYWNrOiBjYWxsYmFjayB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE9ubHkgcmVtb3ZlIHRoZSBzcGVjaWZpYyBjYWxsYmFja1xuICAgICAgICBldmVudFBhaXJzLmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHsgcmV0dXJuIHZtLiRvZmYocGFpci5uYW1lLCBwYWlyLmNhbGxiYWNrKTsgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JzJFxuICB9XG5cbiAgdmFyIG9wZXJhdG9ycyA9IHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJ1xuICAgID8gcmVxdWlyZSgncnhqcy9vcGVyYXRvcnMnKVxuICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnJ4anNcbiAgICAgID8gd2luZG93LnJ4anMub3BlcmF0b3JzXG4gICAgICA6IHt9O1xuXG4gIHZhciBzaGFyZSA9IG9wZXJhdG9ycy5zaGFyZTtcblxuICAvKipcbiAgICogQG5hbWUgVnVlLnByb3RvdHlwZS4kY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZFxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIGZyb20gYSBnaXZlbiBmdW5jdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kTmFtZSBGdW5jdGlvbiBuYW1lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Bhc3NDb250ZXh0XSBBcHBlbmQgdGhlIGNhbGwgY29udGV4dCBhdCB0aGUgZW5kIG9mIGVtaXQgZGF0YT9cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gSG90IHN0cmVhbVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZCAobWV0aG9kTmFtZSwgcGFzc0NvbnRleHQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgaWYgKHZtW21ldGhvZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdQb3RlbnRpYWwgYnVnOiAnICtcbiAgICAgICAgXCJNZXRob2QgXCIgKyBtZXRob2ROYW1lICsgXCIgYWxyZWFkeSBkZWZpbmVkIG9uIHZtIGFuZCBoYXMgYmVlbiBvdmVyd3JpdHRlbiBieSAkY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZC5cIiArXG4gICAgICAgIFN0cmluZyh2bVttZXRob2ROYW1lXSksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciBjcmVhdG9yID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICB2bVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChwYXNzQ29udGV4dCkge1xuICAgICAgICAgIGFyZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZSB2bVttZXRob2ROYW1lXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTXVzdCBiZSBhIGhvdCBzdHJlYW0gb3RoZXJ3aXNlIGZ1bmN0aW9uIGNvbnRleHQgbWF5IG92ZXJ3cml0ZSBvdmVyIGFuZCBvdmVyIGFnYWluXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGNyZWF0b3IpLnBpcGUoc2hhcmUoKSlcbiAgfVxuXG4gIC8qIGdsb2JhbCBWdWUgKi9cblxuICBmdW5jdGlvbiBWdWVSeCAoVnVlKSB7XG4gICAgaW5zdGFsbChWdWUpO1xuICAgIFZ1ZS5taXhpbihyeE1peGluKTtcbiAgICBWdWUuZGlyZWN0aXZlKCdzdHJlYW0nLCBzdHJlYW1EaXJlY3RpdmUpO1xuICAgIFZ1ZS5wcm90b3R5cGUuJHdhdGNoQXNPYnNlcnZhYmxlID0gd2F0Y2hBc09ic2VydmFibGU7XG4gICAgVnVlLnByb3RvdHlwZS4kZnJvbURPTUV2ZW50ID0gZnJvbURPTUV2ZW50O1xuICAgIFZ1ZS5wcm90b3R5cGUuJHN1YnNjcmliZVRvID0gc3Vic2NyaWJlVG87XG4gICAgVnVlLnByb3RvdHlwZS4kZXZlbnRUb09ic2VydmFibGUgPSBldmVudFRvT2JzZXJ2YWJsZTtcbiAgICBWdWUucHJvdG90eXBlLiRjcmVhdGVPYnNlcnZhYmxlTWV0aG9kID0gY3JlYXRlT2JzZXJ2YWJsZU1ldGhvZDtcbiAgfVxuXG4gIC8vIGF1dG8gaW5zdGFsbFxuICBpZiAodHlwZW9mIFZ1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBWdWUudXNlKFZ1ZVJ4KTtcbiAgfVxuXG4gIHJldHVybiBWdWVSeDtcblxufSkpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS9hcHBsaWNhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS9wbGF0Zm9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdGV4dC9mb3JtYXR0ZWQtc3RyaW5nXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS90ZXh0L3NwYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2FjdGlvbi1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2FjdGl2aXR5LWluZGljYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvYm9yZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9ib3R0b20tbmF2aWdhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvYnV0dG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9jb250ZW50LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2NvcmUvdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvZGF0ZS1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2ZyYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9odG1sLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2ltYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9sYWJlbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvZmxleGJveC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9saXN0LXBpY2tlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvbGlzdC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9wYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9wbGFjZWhvbGRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvcHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zY3JvbGwtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvc2VhcmNoLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvc2VnbWVudGVkLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvc2xpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zd2l0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLWNvbnRlbnQtaXRlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RhYi12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90YWJzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90ZXh0LWZpZWxkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS90ZXh0LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3RpbWUtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS93ZWItdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdXRpbHMvdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3htbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdnVlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2J1bmRsZS1lbnRyeS1wb2ludHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWUvYWN0aXZpdHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=