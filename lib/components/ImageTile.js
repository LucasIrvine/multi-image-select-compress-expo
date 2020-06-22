"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImageTile;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _vectorIcons = require("@expo/vector-icons");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// styles
var styles = _reactNative.StyleSheet.create({
  imageTile: {
    borderWidth: _reactNative.StyleSheet.hairlineWidth,
    borderColor: "white"
  },
  selectedIcon: {
    position: "absolute",
    top: "8%",
    right: "8%",
    color: "rgb(0,122,255)"
  }
});

function ImageTile(_ref) {
  var imageUri = _ref.imageUri,
      width = _ref.width,
      index = _ref.index,
      selected = _ref.selected,
      selectImage = _ref.selectImage,
      processingImages = _ref.processingImages,
      colors = _ref.colors,
      markImageLoaded = _ref.markImageLoaded;
  var fadeAnimation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current; // Initial value for opacity: 0

  var fadeIn = function fadeIn() {
    _reactNative.Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  return /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableHighlight, {
    style: styles.imageTile,
    underlayColor: "transparent",
    onPress: function onPress() {
      if (!processingImages) {
        fadeIn();
        selectImage(index);
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.Image, {
    style: {
      width: width,
      height: width,
      opacity: selected ? 0.4 : fadeAnimation
    },
    source: {
      uri: imageUri
    },
    onLoad: function onLoad() {
      markImageLoaded();
      fadeIn();
    }
  }), !!selected && /*#__PURE__*/_react["default"].createElement(_vectorIcons.MaterialCommunityIcons, {
    name: "checkbox-marked-circle",
    size: 24,
    style: [styles.selectedIcon, {
      color: colors.selectedCheck
    }]
  })));
} // propTypes


ImageTile.propTypes = {
  imageUri: _propTypes["default"].string.isRequired,
  width: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired,
  selected: _propTypes["default"].bool.isRequired,
  selectImage: _propTypes["default"].func.isRequired,
  processingImages: _propTypes["default"].bool.isRequired,
  colors: _propTypes["default"].object.isRequired,
  markImageLoaded: _propTypes["default"].func.isRequired
};