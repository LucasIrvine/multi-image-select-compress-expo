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
    position: "relative",
    zIndex: 300,
    backgroundColor: "white",
    height: 60,
    width: "98%",
    paddingHorizontal: "1%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: "#999999"
  },
  buttonWrap: {
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: 18,
    color: "#000000"
  },
  headingText: {
    fontSize: 18,
    width: "50%",
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold"
  }
});

function Header(_ref) {
  var cancelText = _ref.cancelText,
      cancelFunc = _ref.cancelFunc,
      confirmText = _ref.confirmText,
      confirmFunc = _ref.confirmFunc,
      processingImages = _ref.processingImages,
      headingText = _ref.headingText,
      colors = _ref.colors;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.headerWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: cancelFunc,
    style: styles.buttonWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: [styles.buttonText, {
      color: colors.cancelButton
    }]
  }, cancelText)), /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: [styles.headingText, {
      color: colors.headingText
    }]
  }, headingText), /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: function onPress() {
      if (!processingImages) {
        confirmFunc();
      }
    },
    style: styles.buttonWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: [styles.buttonText, {
      color: colors.confirmButton
    }]
  }, confirmText)));
} // propTypes


Header.propTypes = {
  cancelText: _propTypes["default"].string.isRequired,
  cancelFunc: _propTypes["default"].func.isRequired,
  confirmText: _propTypes["default"].string.isRequired,
  confirmFunc: _propTypes["default"].func.isRequired,
  processingImages: _propTypes["default"].bool.isRequired,
  headingText: _propTypes["default"].string.isRequired,
  colors: _propTypes["default"].object
};