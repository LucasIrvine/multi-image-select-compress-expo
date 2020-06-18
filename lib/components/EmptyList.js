"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EmptyList;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// styles
var styles = _reactNative.StyleSheet.create({
  noImagesWrap: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  noImagesText: {
    paddingHorizontal: "10%",
    color: "#999999",
    fontSize: 18,
    textAlign: "center"
  }
});

function EmptyList(_ref) {
  var colors = _ref.colors;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.noImagesWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: [styles.noImagesText, {
      color: colors.lightText
    }]
  }, "No Images to display, make sure this app has access to your camera roll."));
} // propTypes


EmptyList.propTypes = {
  colors: _propTypes["default"].object.isRequired
};