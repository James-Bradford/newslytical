"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

var _store = require("./store/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  vuetify: _vuetify["default"],
  store: _store.store,
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');
//# sourceMappingURL=main.dev.js.map
