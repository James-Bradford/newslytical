"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Analysis = _interopRequireDefault(require("./views/Analysis.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/analysis/:id',
    name: 'analysis',
    component: _Analysis["default"]
  }]
});

exports["default"] = _default;
//# sourceMappingURL=router.dev.js.map
