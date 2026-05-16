(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "165e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "28ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sub_vue_vue_type_style_index_0_id_75d63e28_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b3af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sub_vue_vue_type_style_index_0_id_75d63e28_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sub_vue_vue_type_style_index_0_id_75d63e28_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// NAMESPACE OBJECT: ./src/store/actions.js
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "saveFavoriteList", function() { return actions_saveFavoriteList; });
__webpack_require__.d(actions_namespaceObject, "deleteList", function() { return actions_deleteList; });
__webpack_require__.d(actions_namespaceObject, "saveUsedList", function() { return actions_saveUsedList; });
__webpack_require__.d(actions_namespaceObject, "removeUsedList", function() { return actions_removeUsedList; });
__webpack_require__.d(actions_namespaceObject, "removeFavoriteList", function() { return actions_removeFavoriteList; });

// NAMESPACE OBJECT: ./src/store/getters.js
var getters_namespaceObject = {};
__webpack_require__.r(getters_namespaceObject);
__webpack_require__.d(getters_namespaceObject, "favoriteList", function() { return favoriteList; });
__webpack_require__.d(getters_namespaceObject, "usedList", function() { return usedList; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"52b13ee5-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=5fd27cbf
var Appvue_type_template_id_5fd27cbf_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=5fd27cbf

// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=5fd27cbf&prod&lang=css
var Appvue_type_style_index_0_id_5fd27cbf_prod_lang_css = __webpack_require__("fe76");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue

var script = {}



/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  Appvue_type_template_id_5fd27cbf_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"52b13ee5-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/main.vue?vue&type=template&id=16d1000f&scoped=true


var mainvue_type_template_id_16d1000f_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "layout"
  }, [_c('Layout', {
    staticClass: "layout-full"
  }, [_c('Sider', {
    staticClass: "layout-sider",
    attrs: {
      "breakpoint": "md",
      "collapsible": "",
      "collapsed-width": 78
    },
    model: {
      value: _vm.isCollapsed,
      callback: function callback($$v) {
        _vm.isCollapsed = $$v;
      },
      expression: "isCollapsed"
    }
  }, [_c('div', {
    staticClass: "logo-con"
  }, [_c('a', {
    attrs: {
      "href": "./"
    }
  }, [_c('img', {
    key: "max-logo",
    attrs: {
      "src": "logo.png"
    }
  }), _c('span', {
    staticClass: "logo-text"
  }, [_vm._v("Work")])])]), _c('Menu', {
    class: _vm.menuitemClasses,
    attrs: {
      "active-name": "1-2",
      "theme": "dark",
      "width": "auto"
    },
    on: {
      "on-select": _vm.jumpAnchor
    }
  }, [_c('menu-item', {
    attrs: {
      "name": "我的收藏"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-heart"
    }
  }), _c('span', [_vm._v("我的收藏")])], 1), _c('menu-item', {
    attrs: {
      "name": "常用网址"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-navigate"
    }
  }), _c('span', [_vm._v("常用网址")])], 1), _vm._l(_vm.data, function (item, index) {
    return _c('menu-item', {
      key: index,
      attrs: {
        "name": item.title
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-search"
      }
    }), _c('span', [_vm._v(_vm._s(item.title))])], 1);
  })], 2), _c('div', {
    attrs: {
      "slot": "trigger"
    },
    slot: "trigger"
  }), _vm.enableRb ? _c('div', {
    staticClass: "settings-entry",
    on: {
      "click": function click($event) {
        _vm.showSettings = true;
      }
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-settings-outline"
    }
  }), _c('span', {
    staticClass: "settings-label"
  }, [_vm._v("配置中心")]), _c('span', {
    staticClass: "settings-tag",
    class: {
      'settings-tag-remote': _vm.currentDataMode === 'remote'
    }
  }, [_vm._v(_vm._s(_vm.currentDataMode))])], 1) : _vm._e()], 1), _c('Layout', {
    staticClass: "layout-content-area"
  }, [_c('Header', {
    staticClass: "layout-header-bar"
  }, [_c('span', {
    staticClass: "welcome-text"
  }, [_vm._v("欢迎回来 👋")]), _vm.enableRb && _vm.currentDataMode === 'remote' ? _c('Tag', {
    staticClass: "data-mode-tag",
    attrs: {
      "color": "blue"
    }
  }, [_vm._v(_vm._s(_vm.rbPipeline))]) : _vm._e(), _c('div', {
    staticClass: "header-spacer"
  }), _c('div', {
    staticClass: "search-box"
  }, [_c('Icon', {
    staticClass: "search-icon",
    attrs: {
      "type": "ios-search"
    }
  }), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "search-input",
    attrs: {
      "placeholder": "搜索网址..."
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.searchData.apply(null, arguments);
      },
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }
    }
  })], 1), _c('Button', {
    staticClass: "search-btn",
    on: {
      "click": _vm.searchData
    }
  }, [_vm._v("搜索")]), _c('Button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.searchStatus,
      expression: "searchStatus"
    }],
    staticClass: "reset-btn",
    on: {
      "click": _vm.resetSearch
    }
  }, [_vm._v("重置")])], 1), _c('Content', {
    staticClass: "layout-scroll-area"
  }, [_c('NavSub', {
    attrs: {
      "data": _vm.data,
      "spinShow": _vm.spinShow
    }
  })], 1), _c('Footer', {
    staticClass: "layout-footer-center"
  }, [_vm._v("版权 © 2014-2026 MurphyYi · "), _c('a', {
    attrs: {
      "href": "https://github.com/yi-nology/ework",
      "target": "_blank"
    }
  }, [_vm._v("GitHub (项目地址)")])])], 1)], 1), _c('BackTop'), _vm.enableRb ? _c('SettingsPanel', {
    attrs: {
      "visible": _vm.showSettings
    },
    on: {
      "close": function close($event) {
        _vm.showSettings = false;
      }
    }
  }) : _vm._e()], 1);
};
var mainvue_type_template_id_16d1000f_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/main.vue?vue&type=template&id=16d1000f&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.parse.js
var es_json_parse = __webpack_require__("1236");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.link.js
var es_string_link = __webpack_require__("9911");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"52b13ee5-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/sub.vue?vue&type=template&id=75d63e28&scoped=true
var subvue_type_template_id_75d63e28_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "card-list"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.favoriteList.length,
      expression: "favoriteList.length"
    }],
    staticClass: "card-section",
    attrs: {
      "id": "我的收藏"
    }
  }, [_c('Card', {
    staticClass: "nodeCard"
  }, [_c('p', {
    staticClass: "anchor",
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("我的收藏"), _c('a', {
    attrs: {
      "href": "#我的收藏"
    }
  }, [_vm._v("#")])]), _c('span', {
    staticClass: "card-extra-btn",
    attrs: {
      "slot": "extra"
    },
    on: {
      "click": _vm.removeFavorite
    },
    slot: "extra"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-loop-strong"
    }
  }), _vm._v(" 清空 ")], 1), _c('Nav', {
    attrs: {
      "navData": _vm.favoriteList,
      "del": true,
      "spinShow": _vm.spinShow
    }
  })], 1)], 1), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.usedList.length,
      expression: "usedList.length"
    }],
    staticClass: "card-section",
    attrs: {
      "id": "常用网址"
    }
  }, [_c('Card', {
    staticClass: "nodeCard"
  }, [_c('p', {
    staticClass: "anchor",
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("常用网址"), _c('a', {
    attrs: {
      "href": "#常用网址"
    }
  }, [_vm._v("#")])]), _c('span', {
    staticClass: "card-extra-btn",
    attrs: {
      "slot": "extra"
    },
    on: {
      "click": _vm.removeUsed
    },
    slot: "extra"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-loop-strong"
    }
  }), _vm._v(" 清空 ")], 1), _c('Nav', {
    attrs: {
      "navData": _vm.usedList,
      "del": true,
      "spinShow": _vm.spinShow
    }
  })], 1)], 1), _vm._l(_vm.data, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "card-section",
      attrs: {
        "id": item.title
      }
    }, [_c('Card', {
      staticClass: "nodeCard"
    }, [_c('p', {
      staticClass: "anchor",
      attrs: {
        "slot": "title"
      },
      slot: "title"
    }, [_vm._v(_vm._s(item.title)), _c('a', {
      attrs: {
        "href": '#' + item.title
      }
    }, [_vm._v("#")])]), _c('p', {
      attrs: {
        "slot": "extra"
      },
      slot: "extra"
    }, [_vm._v("共计：" + _vm._s(item.nav.length) + " 个网址")]), _c('Nav', {
      attrs: {
        "navData": item.nav,
        "subTitle": item.title,
        "spinShow": _vm.spinShow
      }
    })], 1)], 1);
  })], 2);
};
var subvue_type_template_id_75d63e28_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/card/sub.vue?vue&type=template&id=75d63e28&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"52b13ee5-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/nav.vue?vue&type=template&id=358a1a22&scoped=true


var navvue_type_template_id_358a1a22_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('ul', {
    staticClass: "nav-ul"
  }, _vm._l(_vm.navData, function (item, index) {
    return _c('li', {
      key: index,
      staticClass: "nav-li"
    }, [_c('Poptip', {
      staticClass: "nav-poptip",
      attrs: {
        "placement": "right",
        "trigger": "hover",
        "transfer": true,
        "width": "200"
      }
    }, [_c('div', {
      staticClass: "link-item",
      on: {
        "click": function click($event) {
          return _vm.jumpLink(item);
        }
      }
    }, [_c('div', {
      staticClass: "link-icon"
    }, [item.icon ? _c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: item.icon,
        expression: "item.icon"
      }],
      staticClass: "icon",
      attrs: {
        "alt": ""
      }
    }) : _c('span', {
      staticClass: "icon-letter"
    }, [_vm._v(_vm._s((item.name || '?')[0].toUpperCase()))])]), _c('div', {
      staticClass: "link-text"
    }, [_c('span', {
      staticClass: "link-name"
    }, [_vm._v(_vm._s(item.name))]), item.desc ? _c('span', {
      staticClass: "link-desc"
    }, [_vm._v(_vm._s(item.desc))]) : _vm._e()])]), _c('div', {
      staticClass: "poptip-panel",
      attrs: {
        "slot": "content"
      },
      slot: "content"
    }, [_c('div', {
      staticClass: "poptip-url"
    }, [_c('Icon', {
      staticClass: "poptip-url-icon",
      attrs: {
        "type": "ios-link"
      }
    }), _c('span', {
      staticClass: "poptip-url-text"
    }, [_vm._v(_vm._s(item.link))])], 1), _c('div', {
      staticClass: "poptip-actions"
    }, [_c('div', {
      staticClass: "poptip-btn",
      on: {
        "click": function click($event) {
          return _vm.jumpLink(item);
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-open-outline"
      }
    }), _c('span', [_vm._v("打开链接")])], 1), _c('div', {
      staticClass: "poptip-btn",
      on: {
        "click": function click($event) {
          return _vm.copyLink(item.link);
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-copy-outline"
      }
    }), _c('span', [_vm._v("复制链接")])], 1), _c('div', {
      staticClass: "poptip-btn",
      on: {
        "click": function click($event) {
          return _vm.addFavorite(item);
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-heart-outline"
      }
    }), _c('span', [_vm._v("添加收藏")])], 1), _c('div', {
      staticClass: "poptip-btn",
      on: {
        "click": function click($event) {
          return _vm.addBookmarks(item.link, item.name);
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-bookmark-outline"
      }
    }), _c('span', [_vm._v("加入常用")])], 1), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.del,
        expression: "del"
      }],
      staticClass: "poptip-btn poptip-btn-danger",
      on: {
        "click": function click($event) {
          return _vm.delUrl(item);
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-trash-outline"
      }
    }), _c('span', [_vm._v("删除")])], 1)])])])], 1);
  }), 0), _vm.spinShow ? _c('Spin', {
    attrs: {
      "size": "large",
      "fix": ""
    }
  }) : _vm._e()], 1);
};
var navvue_type_template_id_358a1a22_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/card/nav.vue?vue&type=template&id=358a1a22&scoped=true

// EXTERNAL MODULE: ./node_modules/clipboard/dist/clipboard.js
var dist_clipboard = __webpack_require__("b311");
var clipboard_default = /*#__PURE__*/__webpack_require__.n(dist_clipboard);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/nav.vue?vue&type=script&lang=js




/* harmony default export */ var navvue_type_script_lang_js = ({
  props: {
    navData: {
      default: []
    },
    subTitle: {
      default: ''
    },
    del: {
      default: false
    },
    spinShow: {
      default: false
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    jumpLink: function jumpLink(item) {
      item.title = this.subTitle;
      this.saveUsedList(item);
      window.open(item.link);
    },
    copyLink: function copyLink(link) {
      var _this = this;
      var clipboard = new clipboard_default.a('.poptip-btn', {
        text: function text() {
          return link;
        }
      });
      clipboard.on('success', function () {
        _this.$Message.success('复制成功');
        clipboard.destroy();
      });
      clipboard.on('error', function () {
        _this.$Message.error('该浏览器不支持自动复制');
        clipboard.destroy();
      });
    },
    addFavorite: function addFavorite(item) {
      item.title = this.subTitle;
      this.saveFavoriteList(item);
      this.$Message.success('添加成功');
    },
    delUrl: function delUrl(item) {
      this.deleteList(item);
    },
    addBookmarks: function addBookmarks(url, title) {
      try {
        if (window.external && window.external.AddFavorite) {
          window.external.AddFavorite(url, title);
        } else {
          this.$Message.info('请使用 Ctrl+D (Mac: Cmd+D) 收藏本页');
        }
      } catch (e) {
        this.$Message.info('请使用 Ctrl+D (Mac: Cmd+D) 收藏本页');
      }
    }
  }, Object(vuex_esm["b" /* mapActions */])(['saveFavoriteList', 'saveUsedList', 'deleteList']))
});
// CONCATENATED MODULE: ./src/components/card/nav.vue?vue&type=script&lang=js
 /* harmony default export */ var card_navvue_type_script_lang_js = (navvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/card/nav.vue?vue&type=style&index=0&id=358a1a22&prod&lang=less&scoped=true
var navvue_type_style_index_0_id_358a1a22_prod_lang_less_scoped_true = __webpack_require__("cbca");

// CONCATENATED MODULE: ./src/components/card/nav.vue






/* normalize component */

var nav_component = Object(componentNormalizer["a" /* default */])(
  card_navvue_type_script_lang_js,
  navvue_type_template_id_358a1a22_scoped_true_render,
  navvue_type_template_id_358a1a22_scoped_true_staticRenderFns,
  false,
  null,
  "358a1a22",
  null
  
)

/* harmony default export */ var nav = (nav_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/sub.vue?vue&type=script&lang=js



/* harmony default export */ var subvue_type_script_lang_js = ({
  props: {
    data: {
      default: {}
    },
    spinShow: {
      default: false
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    removeUsed: function removeUsed() {
      this.removeUsedList();
      this.$Message.success('清空成功');
    },
    removeFavorite: function removeFavorite() {
      this.removeFavoriteList();
      this.$Message.success('清空成功');
    }
  }, Object(vuex_esm["b" /* mapActions */])(['removeUsedList', 'removeFavoriteList'])),
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapGetters */])(['favoriteList', 'usedList'])),
  components: {
    Nav: nav
  }
});
// CONCATENATED MODULE: ./src/components/card/sub.vue?vue&type=script&lang=js
 /* harmony default export */ var card_subvue_type_script_lang_js = (subvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/card/sub.vue?vue&type=style&index=0&id=75d63e28&prod&lang=less&scoped=true
var subvue_type_style_index_0_id_75d63e28_prod_lang_less_scoped_true = __webpack_require__("28ad");

// CONCATENATED MODULE: ./src/components/card/sub.vue






/* normalize component */

var sub_component = Object(componentNormalizer["a" /* default */])(
  card_subvue_type_script_lang_js,
  subvue_type_template_id_75d63e28_scoped_true_render,
  subvue_type_template_id_75d63e28_scoped_true_staticRenderFns,
  false,
  null,
  "75d63e28",
  null
  
)

/* harmony default export */ var sub = (sub_component.exports);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./src/api/config.js
var config = __webpack_require__("da71");

// EXTERNAL MODULE: ./src/common/js/cache.js
var cache = __webpack_require__("cc3b");

// CONCATENATED MODULE: ./src/api/github.js



var service = axios_default.a.create();
service.interceptors.request.use(function (config) {
  return config;
});
service.interceptors.response.use(function (resp) {
  return resp;
}, function (error) {
  return error;
});
var ENABLE_RB = "true" !== 'false';
function GetWebData() {
  var settings = Object(cache["loadRbSettings"])();
  if (!ENABLE_RB) {
    return Object(config["d" /* getLocalData */])(settings.localDataUrl).then(function (data) {
      return {
        data: data
      };
    });
  }
  if (settings.dataMode === 'remote') {
    if (settings.configType === 'rainbow-bridge') {
      return Object(config["a" /* fetchAllNavData */])(settings.baseUrl, settings.environment, settings.skipSslVerify).then(function (data) {
        return {
          data: data
        };
      });
    } else if (settings.configType === 'nacos') {
      return Object(config["c" /* fetchNacosConfig */])(settings.nacosServerAddr, settings.nacosNamespace, settings.nacosDataId, settings.nacosGroup, settings.skipSslVerify).then(function (data) {
        return {
          data: data
        };
      });
    } else if (settings.configType === 'apollo') {
      return Object(config["b" /* fetchApolloConfig */])(settings.apolloMeta, settings.apolloAppId, settings.apolloNamespace, settings.skipSslVerify).then(function (data) {
        return {
          data: data
        };
      });
    }
  }
  return Object(config["d" /* getLocalData */])(settings.localDataUrl, settings.skipSslVerify).then(function (data) {
    return {
      data: data
    };
  });
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/main.vue?vue&type=script&lang=js











/* harmony default export */ var mainvue_type_script_lang_js = ({
  data: function data() {
    var enableRb = "true" !== 'false';
    var currentDataMode = 'local';
    var rbPipeline = 'main';
    if (enableRb) {
      var loadRbSettings = __webpack_require__("cc3b").loadRbSettings;
      var rbSettings = loadRbSettings();
      currentDataMode = rbSettings.dataMode;
      rbPipeline = "prod" || false;
    }
    return {
      isCollapsed: false,
      search: '',
      searchStatus: false,
      data: {},
      sourceData: '',
      serarchNum: 0,
      spinShow: false,
      showSettings: false,
      enableRb: enableRb,
      currentDataMode: currentDataMode,
      rbPipeline: rbPipeline
    };
  },
  computed: {
    menuitemClasses: function menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    }
  },
  methods: {
    githubWebData: function githubWebData() {
      var _this = this;
      this.spinShow = true;
      GetWebData().then(function (data) {
        _this.data = data.data;
      }).catch(function () {
        _this.$Message.error('数据加载失败，请检查配置');
      }).finally(function () {
        _this.spinShow = false;
      });
    },
    jumpAnchor: function jumpAnchor(name) {
      if (document.documentElement.clientWidth <= 768) {
        this.isCollapsed = true;
      }
      document.querySelector('#' + name).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    searchData: function searchData() {
      if (typeof this.search === 'undefined' || this.search === null || this.search === '') {
        this.$Message.error('输入内容呀！');
        return true;
      }
      if (!this.searchStatus) {
        this.sourceData = JSON.parse(JSON.stringify(this.data));
      }
      this.searchStatus = true;
      for (var d in this.data) {
        for (var i = 0; i < this.data[d]['nav'].length; i++) {
          if (this.data[d]['nav'][i]['name'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
            if (this.data[d]['nav'][i]['link'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
              this.data[d]['nav'].splice(i--, 1);
            } else {
              this.serarchNum++;
            }
          } else {
            this.serarchNum++;
          }
        }
      }
      if (this.serarchNum === 0) {
        this.$Message.error('没找到哦.');
      } else {
        this.$Message.success('查找到了' + this.serarchNum + '个相近的.');
      }
    },
    resetSearch: function resetSearch() {
      var _this2 = this;
      this.spinShow = true;
      this.searchStatus = false;
      this.search = '';
      this.serarchNum = 0;
      this.data = JSON.parse(JSON.stringify(this.sourceData));
      setTimeout(function () {
        _this2.spinShow = false;
      }, 1000);
    }
  },
  created: function created() {
    this.githubWebData();
  },
  components: {
    NavSub: sub,
    SettingsPanel:  true ? __webpack_require__("8aab").default : undefined
  }
});
// CONCATENATED MODULE: ./src/components/main.vue?vue&type=script&lang=js
 /* harmony default export */ var components_mainvue_type_script_lang_js = (mainvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/main.vue?vue&type=style&index=0&id=16d1000f&prod&lang=less&scoped=true
var mainvue_type_style_index_0_id_16d1000f_prod_lang_less_scoped_true = __webpack_require__("7617");

// CONCATENATED MODULE: ./src/components/main.vue






/* normalize component */

var main_component = Object(componentNormalizer["a" /* default */])(
  components_mainvue_type_script_lang_js,
  mainvue_type_template_id_16d1000f_scoped_true_render,
  mainvue_type_template_id_16d1000f_scoped_true_staticRenderFns,
  false,
  null,
  "16d1000f",
  null
  
)

/* harmony default export */ var main = (main_component.exports);
// CONCATENATED MODULE: ./src/router/index.js



vue_runtime_esm["default"].use(vue_router_esm["a" /* default */]);
var router = new vue_router_esm["a" /* default */]({
  mode: 'hash',
  base: "",
  routes: [{
    path: '/',
    name: 'Main',
    component: main
  }]
});
router.beforeEach(function (to, from, next) {
  if (to.fullPath !== '/') {
    next('/');
  } else {
    next();
  }
});
/* harmony default export */ var src_router = (router);
// CONCATENATED MODULE: ./src/store/mutation-types.js
var SET_FAVORITE_LIST = 'SET_FAVORITE_LIST';
var SET_USED_LIST = 'SET_USED_LIST';
// CONCATENATED MODULE: ./src/store/actions.js


var actions_saveFavoriteList = function saveFavoriteList(_ref, url) {
  var commit = _ref.commit;
  commit(SET_FAVORITE_LIST, Object(cache["saveFavorite"])(url));
};
var actions_deleteList = function deleteList(_ref2, url) {
  var commit = _ref2.commit;
  if (url.num) {
    commit(SET_USED_LIST, Object(cache["deleteUsed"])(url));
  } else {
    commit(SET_FAVORITE_LIST, Object(cache["deleteFavorite"])(url));
  }
};
var actions_saveUsedList = function saveUsedList(_ref3, url) {
  var commit = _ref3.commit;
  commit(SET_USED_LIST, Object(cache["saveUsed"])(url));
};
var actions_removeUsedList = function removeUsedList(_ref4) {
  var commit = _ref4.commit;
  commit(SET_USED_LIST, Object(cache["removeUsed"])());
};
var actions_removeFavoriteList = function removeFavoriteList(_ref5) {
  var commit = _ref5.commit;
  commit(SET_FAVORITE_LIST, Object(cache["removeFavorite"])());
};
// CONCATENATED MODULE: ./src/store/getters.js
var favoriteList = function favoriteList(state) {
  return state.favoriteList;
};
var usedList = function usedList(state) {
  return state.usedList;
};
// CONCATENATED MODULE: ./src/store/state.js

var state = {
  usedList: Object(cache["loadUsed"])(),
  favoriteList: Object(cache["loadFavorite"])()
};
/* harmony default export */ var store_state = (state);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__("ade3");

// CONCATENATED MODULE: ./src/store/mutaions.js


var matutaions = Object(defineProperty["a" /* default */])(Object(defineProperty["a" /* default */])({}, SET_USED_LIST, function (state, list) {
  state.usedList = list;
}), SET_FAVORITE_LIST, function (state, list) {
  state.favoriteList = list;
});
/* harmony default export */ var mutaions = (matutaions);
// EXTERNAL MODULE: ./node_modules/vuex/dist/logger.js
var logger = __webpack_require__("b054");
var logger_default = /*#__PURE__*/__webpack_require__.n(logger);

// CONCATENATED MODULE: ./src/store/index.js







vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
var debug = "production" !== 'production';
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  actions: actions_namespaceObject,
  getters: getters_namespaceObject,
  state: store_state,
  mutations: mutaions,
  strict: debug,
  plugins: debug ? [logger_default()()] : []
}));
// EXTERNAL MODULE: ./node_modules/iview/dist/iview.js
var iview = __webpack_require__("e069");
var iview_default = /*#__PURE__*/__webpack_require__.n(iview);

// EXTERNAL MODULE: ./node_modules/iview/dist/styles/iview.css
var styles_iview = __webpack_require__("dcad");

// EXTERNAL MODULE: ./node_modules/vue-lazyload/vue-lazyload.esm.js
var vue_lazyload_esm = __webpack_require__("caf9");

// CONCATENATED MODULE: ./src/main.js











vue_runtime_esm["default"].use(iview_default.a);
vue_runtime_esm["default"].use(vue_lazyload_esm["a" /* default */], {
  loading: __webpack_require__("cf1c")
});
vue_runtime_esm["default"].config.productionTip = false;
new vue_runtime_esm["default"]({
  router: src_router,
  store: store,
  render: function render(h) {
    return h(App);
  }
}).$mount('#app');

/***/ }),

/***/ "6500":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_style_index_0_id_9937f65e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a8ac");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_style_index_0_id_9937f65e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_style_index_0_id_9937f65e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7617":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_id_16d1000f_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7a42");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_id_16d1000f_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_id_16d1000f_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7a42":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8aab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"52b13ee5-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/settings.vue?vue&type=template&id=9937f65e&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible,
      expression: "visible"
    }],
    staticClass: "settings-overlay",
    on: {
      "click": function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        return _vm.close.apply(null, arguments);
      }
    }
  }, [_c('div', {
    staticClass: "settings-panel",
    class: {
      'panel-open': _vm.visible
    }
  }, [_c('div', {
    staticClass: "panel-header"
  }, [_c('span', {
    staticClass: "panel-title"
  }, [_vm._v("三方API 设置")]), _c('Icon', {
    staticClass: "panel-close",
    attrs: {
      "type": "ios-close",
      "size": "18"
    },
    on: {
      "click": _vm.close
    }
  })], 1), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_vm._v("数据模式")]), _c('div', {
    staticClass: "mode-btns"
  }, [_c('div', {
    staticClass: "mode-btn",
    class: {
      active: _vm.form.dataMode === 'local'
    },
    on: {
      "click": function click($event) {
        _vm.form.dataMode = 'local';
      }
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-folder-outline"
    }
  }), _c('span', [_vm._v("Local 本地")])], 1), _c('div', {
    staticClass: "mode-btn",
    class: {
      active: _vm.form.dataMode === 'remote'
    },
    on: {
      "click": function click($event) {
        _vm.form.dataMode = 'remote';
      }
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-cloud-outline"
    }
  }), _c('span', [_vm._v("Remote 远程")])], 1)])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote',
      expression: "form.dataMode === 'remote'"
    }],
    staticClass: "form-section"
  }, [_vm._m(0), _c('div', {
    staticClass: "config-type-btns"
  }, [_c('div', {
    staticClass: "config-type-btn",
    class: {
      active: _vm.form.configType === 'rainbow-bridge'
    },
    on: {
      "click": function click($event) {
        _vm.form.configType = 'rainbow-bridge';
      }
    }
  }, [_c('span', [_vm._v("配置中心")])]), _c('div', {
    staticClass: "config-type-btn",
    class: {
      active: _vm.form.configType === 'nacos'
    },
    on: {
      "click": function click($event) {
        _vm.form.configType = 'nacos';
      }
    }
  }, [_c('span', [_vm._v("Nacos")])]), _c('div', {
    staticClass: "config-type-btn",
    class: {
      active: _vm.form.configType === 'apollo'
    },
    on: {
      "click": function click($event) {
        _vm.form.configType = 'apollo';
      }
    }
  }, [_c('span', [_vm._v("Apollo")])])])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'rainbow-bridge',
      expression: "form.dataMode === 'remote' && form.configType === 'rainbow-bridge'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("API 地址")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.baseUrl))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.baseUrl,
      expression: "form.baseUrl"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "输入配置中心 API 地址"
    },
    domProps: {
      "value": _vm.form.baseUrl
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "baseUrl", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'rainbow-bridge',
      expression: "form.dataMode === 'remote' && form.configType === 'rainbow-bridge'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("环境名称")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.environment))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.environment,
      expression: "form.environment"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "输入环境名称"
    },
    domProps: {
      "value": _vm.form.environment
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "environment", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'nacos',
      expression: "form.dataMode === 'remote' && form.configType === 'nacos'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("Nacos 地址")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.nacosServerAddr))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.nacosServerAddr,
      expression: "form.nacosServerAddr"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "http://localhost:8848/nacos"
    },
    domProps: {
      "value": _vm.form.nacosServerAddr
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "nacosServerAddr", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'nacos',
      expression: "form.dataMode === 'remote' && form.configType === 'nacos'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("命名空间")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.nacosNamespace))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.nacosNamespace,
      expression: "form.nacosNamespace"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "public"
    },
    domProps: {
      "value": _vm.form.nacosNamespace
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "nacosNamespace", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'nacos',
      expression: "form.dataMode === 'remote' && form.configType === 'nacos'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("配置 Data ID")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.nacosDataId))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.nacosDataId,
      expression: "form.nacosDataId"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "ework-nav.json"
    },
    domProps: {
      "value": _vm.form.nacosDataId
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "nacosDataId", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'nacos',
      expression: "form.dataMode === 'remote' && form.configType === 'nacos'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("配置 Group")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.nacosGroup))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.nacosGroup,
      expression: "form.nacosGroup"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "DEFAULT_GROUP"
    },
    domProps: {
      "value": _vm.form.nacosGroup
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "nacosGroup", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'apollo',
      expression: "form.dataMode === 'remote' && form.configType === 'apollo'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("Apollo 地址")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.apolloMeta))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.apolloMeta,
      expression: "form.apolloMeta"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "http://localhost:8080"
    },
    domProps: {
      "value": _vm.form.apolloMeta
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "apolloMeta", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'apollo',
      expression: "form.dataMode === 'remote' && form.configType === 'apollo'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("App ID")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.apolloAppId))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.apolloAppId,
      expression: "form.apolloAppId"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "ework-nav"
    },
    domProps: {
      "value": _vm.form.apolloAppId
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "apolloAppId", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote' && _vm.form.configType === 'apollo',
      expression: "form.dataMode === 'remote' && form.configType === 'apollo'"
    }],
    staticClass: "form-section"
  }, [_c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("Namespace")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("默认: " + _vm._s(_vm.defaults.apolloNamespace))])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.apolloNamespace,
      expression: "form.apolloNamespace"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "application"
    },
    domProps: {
      "value": _vm.form.apolloNamespace
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "apolloNamespace", $event.target.value);
      }
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'local',
      expression: "form.dataMode === 'local'"
    }],
    staticClass: "form-section"
  }, [_vm._m(1), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.localDataUrl,
      expression: "form.localDataUrl"
    }],
    staticClass: "form-input",
    attrs: {
      "type": "text",
      "placeholder": "输入本地 JSON 文件路径"
    },
    domProps: {
      "value": _vm.form.localDataUrl
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.form, "localDataUrl", $event.target.value);
      }
    }
  }), _c('button', {
    staticClass: "btn-format",
    on: {
      "click": function click($event) {
        _vm.showFormatExample = true;
      }
    }
  }, [_vm._v("查看数据格式示例")])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.form.dataMode === 'remote',
      expression: "form.dataMode === 'remote'"
    }],
    staticClass: "form-section"
  }, [_vm._m(2), _c('div', {
    staticClass: "checkbox-item",
    on: {
      "click": function click($event) {
        _vm.form.skipSslVerify = !_vm.form.skipSslVerify;
      }
    }
  }, [_c('span', {
    staticClass: "checkbox",
    class: {
      checked: _vm.form.skipSslVerify
    }
  }, [_vm.form.skipSslVerify ? _c('Icon', {
    attrs: {
      "type": "ios-checkmark",
      "size": "12"
    }
  }) : _vm._e()], 1), _c('span', {
    staticClass: "checkbox-label"
  }, [_vm._v("跳过 SSL 证书验证（用于自签名证书）")])])])]), _c('div', {
    staticClass: "panel-footer"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": _vm.resetDefaults
    }
  }, [_vm._v("恢复默认")]), _c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": _vm.save
    }
  }, [_vm._v("保存并应用")])])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showFormatExample,
      expression: "showFormatExample"
    }],
    staticClass: "modal-overlay",
    on: {
      "click": function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        _vm.showFormatExample = false;
      }
    }
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_c('span', {
    staticClass: "modal-title"
  }, [_vm._v("数据格式示例")]), _c('Icon', {
    staticClass: "modal-close",
    attrs: {
      "type": "ios-close",
      "size": "18"
    },
    on: {
      "click": function click($event) {
        _vm.showFormatExample = false;
      }
    }
  })], 1), _vm._m(3), _c('div', {
    staticClass: "modal-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": function click($event) {
        _vm.showFormatExample = false;
      }
    }
  }, [_vm._v("知道了")])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("配置中心类型")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("本地数据地址")]), _c('span', {
    staticClass: "form-hint"
  }, [_vm._v("支持本地 JSON 文件或远程 URL")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', {
    staticClass: "form-label"
  }, [_c('span', [_vm._v("SSL 证书验证")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal-body"
  }, [_c('div', {
    staticClass: "format-desc"
  }, [_vm._v("本地数据文件 (nav-data.json) 格式如下：")]), _c('pre', {
    staticClass: "code-block"
  }, [_c('code', [_vm._v("[\n  {\n    \"title\": \"分类名称\",\n    \"name\": \"category-key\",\n    \"nav\": [\n      {\n        \"name\": \"链接名称\",\n        \"link\": \"https://example.com\",\n        \"icon\": \"https://example.com/favicon.ico\",\n        \"desc\": \"描述信息\"\n      }\n    ]\n  }\n]")])]), _c('div', {
    staticClass: "format-tips"
  }, [_c('p', [_vm._v("📌 字段说明：")]), _c('ul', [_c('li', [_c('b', [_vm._v("title")]), _vm._v(": 分类显示名称")]), _c('li', [_c('b', [_vm._v("name")]), _vm._v(": 分类唯一标识")]), _c('li', [_c('b', [_vm._v("nav")]), _vm._v(": 该分类下的导航链接数组")]), _c('li', [_c('b', [_vm._v("nav[].name")]), _vm._v(": 链接名称")]), _c('li', [_c('b', [_vm._v("nav[].link")]), _vm._v(": 跳转地址")]), _c('li', [_c('b', [_vm._v("nav[].icon")]), _vm._v(": 图标地址（可选）")]), _c('li', [_c('b', [_vm._v("nav[].desc")]), _vm._v(": 描述文字（可选）")])])])]);
}];

// CONCATENATED MODULE: ./src/components/settings.vue?vue&type=template&id=9937f65e&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/common/js/cache.js
var cache = __webpack_require__("cc3b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/settings.vue?vue&type=script&lang=js


/* harmony default export */ var settingsvue_type_script_lang_js = ({
  props: {
    visible: {
      default: false
    }
  },
  data: function data() {
    var defaults = Object(cache["getRbDefaults"])();
    var saved = Object(cache["loadRbSettings"])();
    return {
      defaults: defaults,
      showFormatExample: false,
      form: {
        dataMode: saved.dataMode,
        configType: saved.configType,
        baseUrl: saved.baseUrl,
        environment: saved.environment,
        localDataUrl: saved.localDataUrl,
        nacosServerAddr: saved.nacosServerAddr,
        nacosNamespace: saved.nacosNamespace,
        nacosDataId: saved.nacosDataId,
        nacosGroup: saved.nacosGroup,
        apolloMeta: saved.apolloMeta,
        apolloAppId: saved.apolloAppId,
        apolloNamespace: saved.apolloNamespace,
        skipSslVerify: saved.skipSslVerify
      }
    };
  },
  methods: {
    close: function close() {
      this.$emit('close');
    },
    save: function save() {
      Object(cache["saveRbSettings"])(this.form);
      this.$Message.success('设置已保存，正在刷新页面...');
      setTimeout(function () {
        location.reload();
      }, 800);
    },
    resetDefaults: function resetDefaults() {
      Object(cache["removeRbSettings"])();
      this.form = Object(objectSpread2["a" /* default */])({}, this.defaults);
      this.$Message.success('已恢复默认值，正在刷新页面...');
      setTimeout(function () {
        location.reload();
      }, 800);
    }
  }
});
// CONCATENATED MODULE: ./src/components/settings.vue?vue&type=script&lang=js
 /* harmony default export */ var components_settingsvue_type_script_lang_js = (settingsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/settings.vue?vue&type=style&index=0&id=9937f65e&prod&lang=less&scoped=true
var settingsvue_type_style_index_0_id_9937f65e_prod_lang_less_scoped_true = __webpack_require__("6500");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/settings.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_settingsvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "9937f65e",
  null
  
)

/* harmony default export */ var settings = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "a8ac":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b3af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cbca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_vue_vue_type_style_index_0_id_358a1a22_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("165e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_vue_vue_type_style_index_0_id_358a1a22_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_vue_vue_type_style_index_0_id_358a1a22_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "cc3b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFavorite", function() { return loadFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFavorite", function() { return saveFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteFavorite", function() { return deleteFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFavorite", function() { return removeFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUsed", function() { return loadUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveUsed", function() { return saveUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteUsed", function() { return deleteUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeUsed", function() { return removeUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRbSettings", function() { return loadRbSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveRbSettings", function() { return saveRbSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeRbSettings", function() { return removeRbSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRbDefaults", function() { return getRbDefaults; });
/* harmony import */ var _home_runner_work_ework_ework_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5530");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c740");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e9f5");
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7d54");
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9911");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("159b");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a78e");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_8__);









var FAVORITE_KEY = '__favorite__';
var FAVORITE_MAX_LEN = 200;
var USED_KEY = '__used__';
var USED_MAX_LEN = 200;
function insertArray(arr, val, compare, maxLen) {
  var index = arr.findIndex(compare);
  if (index === 0) {
    arr.forEach(function (item) {
      if (item.link === val.link && val.num) {
        item.num += 1;
      }
    });
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}
function deleteFromArray(arr, compare) {
  var index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
function loadFavorite() {
  var value = js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.getJSON(FAVORITE_KEY);
  return value || [];
}
function saveFavorite(url) {
  var urls = loadFavorite();
  insertArray(urls, url, function (item) {
    return item.link === url.link;
  }, FAVORITE_MAX_LEN);
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.set(FAVORITE_KEY, urls);
  return urls;
}
function deleteFavorite(url) {
  var urls = loadFavorite();
  deleteFromArray(urls, function (item) {
    return item.link === url.link;
  });
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.set(FAVORITE_KEY, urls);
  return urls;
}
function removeFavorite() {
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.remove(FAVORITE_KEY);
  return [];
}
function loadUsed() {
  var value = js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.getJSON(USED_KEY);
  return value || [];
}
function saveUsed(url) {
  url.num = 1;
  var urls = loadUsed();
  insertArray(urls, url, function (item) {
    return url.link === item.link;
  }, USED_MAX_LEN);
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.set(USED_KEY, urls);
  return urls;
}
function deleteUsed(url) {
  var urls = loadUsed();
  deleteFromArray(urls, function (item) {
    return item.link === url.link;
  });
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.set(USED_KEY, urls);
  return urls;
}
function removeUsed() {
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.remove(USED_KEY);
  return [];
}
var RB_SETTINGS_KEY = '__rb_settings__';
var RB_DEFAULTS = {
  dataMode: "remote" || false,
  configType: "rainbow-bridge" || false,
  baseUrl: "/rainbow-bridge" || false,
  environment: "navi" || false,
  localDataUrl: "https://ework-1251965636.cos.ap-beijing.myqcloud.com/web.json" || false,
  nacosServerAddr: "http://localhost:8848/nacos" || false,
  nacosNamespace: "public" || false,
  nacosDataId: "ework-nav.json" || false,
  nacosGroup: "DEFAULT_GROUP" || false,
  apolloMeta: "http://localhost:8080" || false,
  apolloAppId: "ework-nav" || false,
  apolloNamespace: "application" || false,
  skipSslVerify: "false" === 'true'
};
function loadRbSettings() {
  var value = js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.getJSON(RB_SETTINGS_KEY);
  if (!value) return Object(_home_runner_work_ework_ework_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, RB_DEFAULTS);
  return {
    dataMode: value.dataMode || RB_DEFAULTS.dataMode,
    configType: value.configType || RB_DEFAULTS.configType,
    baseUrl: value.baseUrl || RB_DEFAULTS.baseUrl,
    environment: value.environment || RB_DEFAULTS.environment,
    localDataUrl: value.localDataUrl || RB_DEFAULTS.localDataUrl,
    nacosServerAddr: value.nacosServerAddr || RB_DEFAULTS.nacosServerAddr,
    nacosNamespace: value.nacosNamespace || RB_DEFAULTS.nacosNamespace,
    nacosDataId: value.nacosDataId || RB_DEFAULTS.nacosDataId,
    nacosGroup: value.nacosGroup || RB_DEFAULTS.nacosGroup,
    apolloMeta: value.apolloMeta || RB_DEFAULTS.apolloMeta,
    apolloAppId: value.apolloAppId || RB_DEFAULTS.apolloAppId,
    apolloNamespace: value.apolloNamespace || RB_DEFAULTS.apolloNamespace,
    skipSslVerify: value.skipSslVerify !== undefined ? value.skipSslVerify : RB_DEFAULTS.skipSslVerify
  };
}
function saveRbSettings(settings) {
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.set(RB_SETTINGS_KEY, settings);
}
function removeRbSettings() {
  js_cookie__WEBPACK_IMPORTED_MODULE_8___default.a.remove(RB_SETTINGS_KEY);
}
function getRbDefaults() {
  return Object(_home_runner_work_ework_ework_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, RB_DEFAULTS);
}

/***/ }),

/***/ "cf1c":
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEAAQAPP/APDw8NPT08rKyuDg4MfHx/////39/enp6dfX1+jo6Obm5tHR0fr6+uLi4snJye/v7yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAQACwAAAAAEAAQAAAEWLDIAkaYODdBSP7F43TgpDDh+BkHJSyomBmIUHVwiNGd1RG5Ca9zKRmPmMCPkMCIfoHBr2mQxEaEAYBDRUhyIlth0PUUgLHGDkE6oz8HjrkjUIAqxSgAEwEAIfkEBQAABgAsCQAAAAcABwAABBIwDFBqIUQMi0ninnV9IimeVQQAIfkEBQAACQAsCgADAAYACgAABBYwSXNkMkiAggkZnRcUZGmeaCmZVhkBACH5BAUAAAYALAkACQAHAAcAAAQTsDxHaiiSkoGzAJghNV0hlmhaRAAh+QQFAAAGACwDAAoACgAGAAAEGNDIyaYsuKx6cyFL5xEg42GkoJxFMABFBAAh+QQFAAAJACwAAAkABwAHAAAEEbDISSs16CIyMeHSIXwUMAQRACH5BAUAAAcALAAAAwAHAAoAAAQZsJRDqZT14qO79wEhEkkxjKUBCGR1DIkbAQAh+QQFAAAGACwAAAAABwAHAAAEErDISastilEglpYDQXhSII5aBAA7"

/***/ }),

/***/ "da71":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchAllNavData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchNacosConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchApolloConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getLocalData; });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a4d3");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e01a");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4de4");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d81d");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4e82");
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("e9f5");
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("910d");
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ab43");
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_json_parse_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1236");
/* harmony import */ var core_js_modules_es_json_parse_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_parse_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("3ca3");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("9911");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_15__);
















function createService(skipSslVerify) {
  var config = {
    timeout: 10000
  };
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    var https = __webpack_require__("24f8");
    if (skipSslVerify) {
      config.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
    }
  }
  var service = axios__WEBPACK_IMPORTED_MODULE_15___default.a.create(config);
  service.interceptors.response.use(function (resp) {
    return resp;
  }, function (error) {
    // eslint-disable-next-line no-console
    console.error('Config API Error:', error);
    return Promise.reject(error);
  });
  return service;
}
function configToNavItem(c) {
  var nav = {
    name: c.name || c.alias || '',
    link: '',
    desc: c.remark || '',
    icon: ''
  };
  if (c.type === 'text') {
    nav.link = c.content || '';
  } else if (c.type === 'keyvalue' || c.type === 'object' || c.type === 'json') {
    try {
      var obj = typeof c.content === 'string' ? JSON.parse(c.content) : c.content;
      nav.link = obj.link || obj.url || obj.href || '';
      nav.icon = obj.icon || obj.favicon || '';
      nav.desc = obj.desc || obj.description || nav.desc;
      if (!nav.name && obj.name) nav.name = obj.name;
    } catch (e) {
      nav.link = c.content || '';
    }
  } else if (c.type === 'image') {
    nav.icon = c.content || '';
  }
  return nav;
}
function fetchPipelineConfig(baseUrl, environment, pipelineKey, skipSslVerify) {
  var service = createService(skipSslVerify);
  return service({
    url: baseUrl + '/api/v1/runtime/config',
    method: 'get',
    headers: {
      'x-environment': environment,
      'x-pipeline': pipelineKey
    }
  }).then(function (resp) {
    var body = resp.data;
    if (body && body.code === 200 && body.data && body.data.configs) {
      return body.data.configs.map(configToNavItem).filter(function (n) {
        return n.link || n.icon;
      });
    }
    return [];
  });
}
function fetchAllNavData(baseUrl, environment, skipSslVerify) {
  var service = createService(skipSslVerify);
  return service({
    url: baseUrl + '/api/v1/pipeline/list',
    method: 'get',
    params: {
      environment_key: environment
    }
  }).then(function (resp) {
    var body = resp.data;
    if (!body || body.code !== 200 || !body.data || !body.data.list) {
      return [];
    }
    var pipelines = body.data.list.filter(function (p) {
      return p.is_active !== false;
    }).sort(function (a, b) {
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
    var requests = pipelines.map(function (p) {
      return fetchPipelineConfig(baseUrl, environment, p.pipeline_key, skipSslVerify).then(function (nav) {
        return {
          title: p.pipeline_name || p.pipeline_key,
          name: p.pipeline_key,
          nav: nav
        };
      }).catch(function () {
        return {
          title: p.pipeline_name || p.pipeline_key,
          name: p.pipeline_key,
          nav: []
        };
      });
    });
    return Promise.all(requests).then(function (results) {
      return results.filter(function (r) {
        return r.nav.length > 0;
      });
    });
  });
}
function fetchNacosConfig(serverAddr, namespace, dataId, group, skipSslVerify) {
  var service = createService(skipSslVerify);
  var url = serverAddr + '/v1/cs/configs';
  return service({
    url: url,
    method: 'get',
    params: {
      dataId: dataId,
      group: group,
      tenant: namespace
    }
  }).then(function (resp) {
    var content = resp.data;
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch (e) {
        return content;
      }
    }
    return content;
  });
}
function fetchApolloConfig(meta, appId, namespace, skipSslVerify) {
  var service = createService(skipSslVerify);
  var url = meta + '/configs/' + appId + '/default/' + namespace;
  return service({
    url: url,
    method: 'get'
  }).then(function (resp) {
    var body = resp.data;
    if (body && body.configurations) {
      var navData = body.configurations.navData || body.configurations.ework_nav;
      if (navData) {
        try {
          return JSON.parse(navData);
        } catch (e) {
          return navData;
        }
      }
      return body.configurations;
    }
    return [];
  });
}
function getLocalData(url, skipSslVerify) {
  var service = createService(skipSslVerify);
  return service({
    url: url,
    method: 'get'
  }).then(function (resp) {
    return resp.data;
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "f0ea":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fe76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_5fd27cbf_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f0ea");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_5fd27cbf_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_5fd27cbf_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

},[[0,"runtime","npm.core-js","npm.axios","npm.readable-stream","npm.qs","npm.iview","npm.buffer","npm.vuex","npm.clipboard","npm.url","npm.vue-lazyload","npm.vue-router","npm.vue","vendors~app"]]]);