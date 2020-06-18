import React, { useState } from "react";

import {
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
	Dimensions,
	Modal,
} from "react-native";
import PropTypes from "prop-types";

import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import useMediaLibraryImages from "../hooks/useMediaLibraryImages";
import Header from "./Header";
import ImageTile from "./ImageTile";
import EmptyList from "./EmptyList";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 300,
		backgroundColor: "#fefefe",
	},
});

export default function MultiImageSelectCompressExpo({
	open,
	onProcessingDone,
	onCancelPress,
	useCompression,
	largestDimensionClamp,
	compressionLevel,
	rowLength,
	onEndReachedThreshold,
	maxImages,
	cancelText,
	confirmText,
	headingText,
	colorConfig,
}) {
	const windowWidth = Dimensions.get("window").width;
	const combinedColors = { ...Colors, ...colorConfig };
	const [selectedImages, setSelectedImages] = useState({});
	const [processingImages, setProcessingImages] = useState(false);
	const [{ images, fetchMedia, resetImageState }] = useMediaLibraryImages();
	// reset to inital state
	const reset = () => {
		onCancelPress();
		resetImageState();
		setSelectedImages({});
		setProcessingImages(false);
	};
	// internal call to reset after cancel press
	const internalCancelPress = () => {
		reset();
	};
	// fires after the images have been compressed or selected if no compression
	const onImagesProcessed = (processedImages) => {
		onProcessingDone(processedImages);
		reset();
	};
	// get full uri and filesystem info
	const getFilesystemInfo = (imagesToFind) => {
		return imagesToFind.map((compImg) => {
			// retrieve info on all compressed images
			return FileSystem.getInfoAsync(compImg.uri);
		});
	};
	// compression of single image, returns a promise
	const compressSingleImage = (img) => {
		// Figure out dimensions and compression settings
		let transformConfig = {
			width: largestDimensionClamp,
		};
		// if there is a width and height determine the larger of the two and base the transform on that
		if (img && img.width && img.height) {
			const width = parseInt(img.width, 10);
			const height = parseInt(img.height, 10);
			// find the larger of the 2 to make sure we are not enlarging the image
			const largerDim = width > height ? width : height;
			// if the dimension is larger than largestDimensionClamp resize to largestDimensionClamp =
			const largestSideValue =
				largerDim > largestDimensionClamp ? largestDimensionClamp : largerDim;
			// edit transform config with new data
			if (width > height) {
				transformConfig = {
					width: largestSideValue,
				};
			} else {
				transformConfig = {
					height: largestSideValue,
				};
			}
		}
		// Resize and compress promise
		return ImageManipulator.manipulateAsync(
			img.uri,
			[
				{
					resize: transformConfig,
				},
			],
			{
				compress: compressionLevel,
			}
		);
	};

	const compressImages = async () => {
		// get selected photos
		const selectedPhotos = images.filter((image, index) => {
			return selectedImages[index];
		});
		// if they specify no compression return the media library uris
		if (!useCompression) {
			// returns a FileSystem.getInfoAsync promise that resolves to a info object
			const uncompressedMediaInfoPromises = getFilesystemInfo(selectedPhotos);
			// when all uncompressed image info is retrieved then call onImagesProcessed
			const uncompressedMediaInfo = await Promise.all(
				uncompressedMediaInfoPromises
			);
			// when all uncompressed image info is retrieved then call onImagesProcessed
			onImagesProcessed(uncompressedMediaInfo);
		} else {
			// returns promise that resolves to a compressed image object
			const compressedImagePromises = selectedPhotos.map((img) => {
				return compressSingleImage(img);
			});
			// when all image compression is complete
			const compressedImages = await Promise.all(compressedImagePromises);
			// get info of the compressed versions of the images
			// returns a FileSystem.getInfoAsync promise that resolves to a info object
			const compressedMediaInfoPromises = getFilesystemInfo(compressedImages);
			// when all compressed image info is retrieved then call onImagesProcessed
			const compressedMediaInfo = await Promise.all(
				compressedMediaInfoPromises
			);
			// when all compressed image info is retrieved then call onImagesProcessed
			onImagesProcessed(compressedMediaInfo);
		}
	};

	const selectImage = (index) => {
		// clone selected state
		const selectedCopy = {
			...selectedImages,
		};
		// if already existing at index unselect else mark as selected
		if (selectedCopy[index]) {
			delete selectedCopy[index];
		} else {
			selectedCopy[index] = true;
		}
		// Make sure it does not reach the specified maxImages
		if (Object.keys(selectedCopy).length > maxImages) {
			return;
		}
		// set selections to state
		setSelectedImages(selectedCopy || {});
	};

	const renderImageTile = ({ item, index }) => {
		return (
			<ImageTile
				width={windowWidth / rowLength}
				imageUri={item.uri}
				index={index}
				selected={!!selectedImages && !!selectedImages[index]}
				selectImage={selectImage}
				processingImages={processingImages}
				colors={combinedColors}
			/>
		);
	};

	const renderImages = () => {
		return (
			<FlatList
				key="image-flat-list"
				data={images}
				numColumns={rowLength}
				renderItem={renderImageTile}
				keyExtractor={(_, index) => {
					return index;
				}}
				onEndReached={() => {
					fetchMedia();
				}}
				onEndReachedThreshold={onEndReachedThreshold}
				ListEmptyComponent={<EmptyList colors={combinedColors} />}
				initialNumToRender={50}
			/>
		);
	};
	return (
		<Modal
			animationType="slide"
			transparent
			visible={open}
			onRequestClose={() => {
				console.log("Modal has been closed.");
			}}
		>
			<SafeAreaView style={styles.container}>
				<Header
					processingImages={processingImages}
					cancelText={cancelText}
					cancelFunc={internalCancelPress}
					confirmFunc={() => {
						setProcessingImages(true);
						compressImages();
					}}
					confirmText={confirmText}
					colors={combinedColors}
					headingText={headingText}
				/>
				<View>{renderImages()}</View>
			</SafeAreaView>
		</Modal>
	);
}

// propTypes
MultiImageSelectCompressExpo.propTypes = {
	open: PropTypes.bool,
	onProcessingDone: PropTypes.func,
	onCancelPress: PropTypes.func,
	useCompression: PropTypes.bool,
	largestDimensionClamp: PropTypes.number,
	compressionLevel: PropTypes.number,
	rowLength: PropTypes.number,
	onEndReachedThreshold: PropTypes.number,
	maxImages: PropTypes.number,
	cancelText: PropTypes.string,
	confirmText: PropTypes.string,
	headingText: PropTypes.string,
	colorConfig: PropTypes.object,
};

// Defaults
MultiImageSelectCompressExpo.defaultProps = {
	open: false,
	onProcessingDone: (images) => {
		console.log(
			"You need to set the onProcessingDone function to use the image data:"
		);
		console.log(images);
	},
	onCancelPress: () => {
		console.log(
			"You need to set the onCancelPress function, usually this is what hides the modal"
		);
	},
	useCompression: true,
	largestDimensionClamp: 1500,
	compressionLevel: 0.8,
	rowLength: 3,
	onEndReachedThreshold: 0.5,
	maxImages: 20,
	cancelText: "Cancel",
	confirmText: "Upload",
	headingText: "Choose Images",
	colorConfig: {},
};
