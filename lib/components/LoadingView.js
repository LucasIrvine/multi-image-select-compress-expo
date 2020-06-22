"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LoadingView;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = _reactNative.StyleSheet.create({
  textWrap: {
    marginTop: -100
  },
  loadingWrap: {
    width: "100%",
    height: "100%",
    top: 60,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    zIndex: -100
  },
  loadingText: {
    color: "#999999",
    fontSize: 26,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "transparent"
  }
});

function LoadingView(_ref) {
  var visible = _ref.visible,
      colors = _ref.colors;
  var opacityValue = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(function () {
    _reactNative.Animated.timing(opacityValue, {
      toValue: visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [visible, opacityValue]);
  return /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, {
    style: [styles.loadingWrap, {
      opacity: opacityValue
    }]
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.textWrap
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: colors.lightText
  })));
} // propTypes


LoadingView.propTypes = {
  visible: _propTypes["default"].bool.isRequired,
  colors: _propTypes["default"].object.isRequired
};