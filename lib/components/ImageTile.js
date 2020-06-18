"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImageTile;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _vectorIcons = require("@expo/vector-icons");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      processingImages = _ref.processingImages;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableHighlight, {
    style: styles.imageTile,
    underlayColor: "transparent",
    onPress: function onPress() {
      if (!processingImages) {
        selectImage(index);
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, /*#__PURE__*/_react["default"].createElement(_reactNative.Image, {
    style: {
      width: width,
      height: width,
      opacity: selected ? 0.3 : 1
    },
    source: {
      uri: imageUri
    }
  }), !!selected && /*#__PURE__*/_react["default"].createElement(_vectorIcons.MaterialCommunityIcons, {
    name: "checkbox-marked-circle",
    size: 24,
    style: styles.selectedIcon
  })));
} // propTypes


ImageTile.propTypes = {
  imageUri: _propTypes["default"].string.isRequired,
  width: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired,
  selected: _propTypes["default"].bool.isRequired,
  selectImage: _propTypes["default"].func.isRequired,
  processingImages: _propTypes["default"].bool.isRequired
};