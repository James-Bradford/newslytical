"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseDomain = "http://127.0.0.1:4000";
var baseURL = "".concat(baseDomain, "/api");

var _default = _axios["default"].create({
  baseURL: baseURL
});

exports["default"] = _default;
//# sourceMappingURL=Api.dev.js.map
