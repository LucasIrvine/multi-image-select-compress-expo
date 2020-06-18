"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MultiImageSelectCompressExpo;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _propTypes = _interopRequireDefault(require("prop-types"));

var FileSystem = _interopRequireWildcard(require("expo-file-system"));

var ImageManipulator = _interopRequireWildcard(require("expo-image-manipulator"));

var _useMediaLibraryImages = _interopRequireDefault(require("../hooks/useMediaLibraryImages"));

var _Header = _interopRequireDefault(require("./Header"));

var _ImageTile = _interopRequireDefault(require("./ImageTile"));

var _EmptyList = _interopRequireDefault(require("./EmptyList"));

var _Colors = _interopRequireDefault(require("../constants/Colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function MultiImageSelectCompressExpo(_ref) {
  var open = _ref.open,
      onProcessingDone = _ref.onProcessingDone,
      onCancelPress = _ref.onCancelPress,
      useCompression = _ref.useCompression,
      dimensionClamp = _ref.dimensionClamp,
      compressionLevel = _ref.compressionLevel,
      rowLength = _ref.rowLength,
      onEndReachedThreshold = _ref.onEndReachedThreshold,
      maxImages = _ref.maxImages,
      cancelText = _ref.cancelText,
      confirmText = _ref.confirmText,
      headingText = _ref.headingText,
      colorConfig = _ref.colorConfig;

  var windowWidth = _reactNative.Dimensions.get("window").width;

  var combinedColors = _objectSpread(_objectSpread({}, _Colors["default"]), colorConfig);

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      selectedImages = _useState2[0],
      setSelectedImages = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      processingImages = _useState4[0],
      setProcessingImages = _useState4[1];

  var _useMediaLibraryImage = (0, _useMediaLibraryImages["default"])(),
      _useMediaLibraryImage2 = _slicedToArray(_useMediaLibraryImage, 1),
      _useMediaLibraryImage3 = _useMediaLibraryImage2[0],
      images = _useMediaLibraryImage3.images,
      fetchMedia = _useMediaLibraryImage3.fetchMedia,
      resetImageState = _useMediaLibraryImage3.resetImageState; // reset to inital state


  var reset = function reset() {
    onCancelPress();
    resetImageState();
    setSelectedImages({});
    setProcessingImages(false);
  }; // internal call to reset after cancel press


  var internalCancelPress = function internalCancelPress() {
    reset();
  }; // fires after the images have been compressed or selected if no compression


  var onImagesProcessed = function onImagesProcessed(processedImages) {
    onProcessingDone(processedImages);
    reset();
  }; // get full uri and filesystem info


  var getFilesystemInfo = function getFilesystemInfo(imagesToFind) {
    return imagesToFind.map(function (compImg) {
      // retrieve info on all compressed images
      return FileSystem.getInfoAsync(compImg.uri);
    });
  }; // compression of single image, returns a promise


  var compressSingleImage = function compressSingleImage(img) {
    // Figure out dimensions and compression settings
    var transformConfig = {
      width: dimensionClamp
    }; // if there is a width and height determine the larger of the two and base the transform on that

    if (img && img.width && img.height) {
      var width = parseInt(img.width, 10);
      var height = parseInt(img.height, 10); // find the larger of the 2 to make sure we are not enlarging the image

      var largerDim = width > height ? width : height; // if the dimension is larger than dimensionClamp resize to dimensionClamp =

      var largestSideValue = largerDim > dimensionClamp ? dimensionClamp : largerDim; // edit transform config with new data

      if (width > height) {
        transformConfig = {
          width: largestSideValue
        };
      } else {
        transformConfig = {
          height: largestSideValue
        };
      }
    } // Resize and compress promise


    return ImageManipulator.manipulateAsync(img.uri, [{
      resize: transformConfig
    }], {
      compress: compressionLevel
    });
  };

  var compressImages = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var selectedPhotos, uncompressedMediaInfoPromises, uncompressedMediaInfo, compressedImagePromises, compressedImages, compressedMediaInfoPromises, compressedMediaInfo;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // get selected photos
              selectedPhotos = images.filter(function (image, index) {
                return selectedImages[index];
              }); // if they specify no compression return the media library uris

              if (useCompression) {
                _context.next = 9;
                break;
              }

              // returns a FileSystem.getInfoAsync promise that resolves to a info object
              uncompressedMediaInfoPromises = getFilesystemInfo(selectedPhotos); // when all uncompressed image info is retrieved then call onImagesProcessed

              _context.next = 5;
              return Promise.all(uncompressedMediaInfoPromises);

            case 5:
              uncompressedMediaInfo = _context.sent;
              // when all uncompressed image info is retrieved then call onImagesProcessed
              onImagesProcessed(uncompressedMediaInfo);
              _context.next = 18;
              break;

            case 9:
              // returns promise that resolves to a compressed image object
              compressedImagePromises = selectedPhotos.map(function (img) {
                return compressSingleImage(img);
              }); // when all image compression is complete

              _context.next = 12;
              return Promise.all(compressedImagePromises);

            case 12:
              compressedImages = _context.sent;
              // get info of the compressed versions of the images
              // returns a FileSystem.getInfoAsync promise that resolves to a info object
              compressedMediaInfoPromises = getFilesystemInfo(compressedImages); // when all compressed image info is retrieved then call onImagesProcessed

              _context.next = 16;
              return Promise.all(compressedMediaInfoPromises);

            case 16:
              compressedMediaInfo = _context.sent;
              // when all compressed image info is retrieved then call onImagesProcessed
              onImagesProcessed(compressedMediaInfo);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function compressImages() {
      return _ref2.apply(this, arguments);
    };
  }();

  var selectImage = function selectImage(index) {
    // clone selected state
    var selectedCopy = _objectSpread({}, selectedImages); // if already existing at index unselect else mark as selected


    if (selectedCopy[index]) {
      delete selectedCopy[index];
    } else {
      selectedCopy[index] = true;
    } // Make sure it does not reach the specified maxImages


    if (Object.keys(selectedCopy).length > maxImages) {
      return;
    } // set selections to state


    setSelectedImages(selectedCopy || {});
  };

  var renderImageTile = function renderImageTile(_ref3) {
    var item = _ref3.item,
        index = _ref3.index;
    return /*#__PURE__*/_react["default"].createElement(_ImageTile["default"], {
      width: windowWidth / rowLength,
      imageUri: item.uri,
      index: index,
      selected: !!selectedImages && !!selectedImages[index],
      selectImage: selectImage,
      processingImages: processingImages,
      colors: combinedColors
    });
  };

  var renderImages = function renderImages() {
    return /*#__PURE__*/_react["default"].createElement(_reactNative.FlatList, {
      key: "image-flat-list",
      data: images,
      numColumns: rowLength,
      renderItem: renderImageTile,
      keyExtractor: function keyExtractor(_, index) {
        return index;
      },
      onEndReached: function onEndReached() {
        fetchMedia();
      },
      onEndReachedThreshold: onEndReachedThreshold,
      ListEmptyComponent: /*#__PURE__*/_react["default"].createElement(_EmptyList["default"], {
        colors: combinedColors
      }),
      initialNumToRender: 50
    });
  };

  return /*#__PURE__*/_react["default"].createElement(_reactNative.Modal, {
    animationType: "slide",
    transparent: true,
    visible: open,
    onRequestClose: function onRequestClose() {
      console.log("Modal has been closed.");
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement(_Header["default"], {
    processingImages: processingImages,
    cancelText: cancelText,
    cancelFunc: internalCancelPress,
    confirmFunc: function confirmFunc() {
      setProcessingImages(true);
      compressImages();
    },
    confirmText: confirmText,
    colors: combinedColors,
    headingText: headingText
  }), /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, renderImages())));
} // propTypes


MultiImageSelectCompressExpo.propTypes = {
  open: _propTypes["default"].bool,
  onProcessingDone: _propTypes["default"].func,
  onCancelPress: _propTypes["default"].func,
  useCompression: _propTypes["default"].bool,
  dimensionClamp: _propTypes["default"].number,
  compressionLevel: _propTypes["default"].number,
  rowLength: _propTypes["default"].number,
  onEndReachedThreshold: _propTypes["default"].number,
  maxImages: _propTypes["default"].number,
  cancelText: _propTypes["default"].string,
  confirmText: _propTypes["default"].string,
  headingText: _propTypes["default"].string,
  colorConfig: _propTypes["default"].object
}; // Defaults

MultiImageSelectCompressExpo.defaultProps = {
  open: false,
  onProcessingDone: function onProcessingDone(images) {
    console.log("You need to set the onProcessingDone function to use the image data:");
    console.log(images);
  },
  onCancelPress: function onCancelPress() {
    console.log("You need to set the onCancelPress function, usually this is what hides the modal");
  },
  useCompression: true,
  dimensionClamp: 1500,
  compressionLevel: 0.8,
  rowLength: 3,
  onEndReachedThreshold: 0.5,
  maxImages: 20,
  cancelText: "Cancel",
  confirmText: "Upload",
  headingText: "Choose Images",
  colorConfig: {}
};