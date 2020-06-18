"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Header;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// styles
var styles = _reactNative.StyleSheet.create({
  headerWrap: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonWrap: {
    paddingHorizontal: 10
  },
  cancelText: {
    color: "rgb(0,122,255)",
    fontSize: 18
  },
  confirmText: {
    color: "rgb(0,122,255)",
    fontSize: 18
  }
});

function Header(_ref) {
  var cancelText = _ref.cancelText,
      cancelFunc = _ref.cancelFunc,
      confirmText = _ref.confirmText,
      confirmFunc = _ref.confirmFunc,
      processingImages = _ref.processingImages;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.headerWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: cancelFunc,
    style: styles.buttonWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: styles.cancelText
  }, cancelText)), !processingImages && /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: confirmFunc,
    style: styles.buttonWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: styles.confirmText
  }, confirmText)));
} // propTypes


Header.propTypes = {
  cancelText: _propTypes["default"].string.isRequired,
  cancelFunc: _propTypes["default"].func.isRequired,
  confirmText: _propTypes["default"].string.isRequired,
  confirmFunc: _propTypes["default"].func.isRequired,
  processingImages: _propTypes["default"].bool.isRequired
};