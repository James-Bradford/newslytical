"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Whois = void 0;

var _Api = _interopRequireDefault(require("./Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Contains the required methods to access information about a domain
 */
var Whois =
/*#__PURE__*/
function () {
  function Whois() {
    _classCallCheck(this, Whois);
  }

  _createClass(Whois, [{
    key: "lookup",
    value: function lookup(url) {
      return _Api["default"].get("/domain/google.com");
    }
  }]);

  return Whois;
}();

exports.Whois = Whois;
//# sourceMappingURL=Whois.dev.js.map
