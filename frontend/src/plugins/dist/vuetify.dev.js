"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _lib = _interopRequireDefault(require("vuetify/lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_lib["default"]);

var _default = new _lib["default"]({
  rtl: false,
  theme: {
    options: {
      customProperties: true
    },
    dark: true,
    themes: {
      dark: {
        primary: '#1976D2',
        accent: '#E91E63',
        secondary: '#1DA1F2',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        background: '#F5F5F5'
      },
      light: {
        primary: '#1976D2',
        accent: '#E91E63',
        secondary: '#1DA1F2',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
});

exports["default"] = _default;
//# sourceMappingURL=vuetify.dev.js.map
