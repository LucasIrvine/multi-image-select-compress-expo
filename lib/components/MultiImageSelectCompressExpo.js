"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = _reactNative.StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 300,
    backgroundColor: "#fefefe"
  }
});

var _default = function _default() {
  var renderImages = function renderImages() {};

  return /*#__PURE__*/_react["default"].createElement(_reactNative.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, null, "Hello bud how are you"), /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, renderImages()));
};

exports["default"] = _default;