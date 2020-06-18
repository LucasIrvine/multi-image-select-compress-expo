import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import useMediaLibraryImages from "../hooks/useMediaLibraryImages";
import Header from "./Header";
import ImageTile from "./ImageTile";

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

export default ({ onConfirm }) => {
	const windowWidth = Dimensions.get("window").width;
	const [selectedImages, setSelectedImages] = useState({});
	const [processingImages, setProcessingImages] = useState(false);
	const [{ images, fetchMedia }] = useMediaLibraryImages();

	const onImagesCompressed = (imageInfo) => {
		setProcessingImages(false);
		console.log("onImagesCompressed");
		console.log("imageInfo");
		console.log(imageInfo);
	};

	const getCompressedMediaInfo = (compressedImages) => {
		return compressedImages.map((compImg) => {
			// retrieve info on all compressed images
			return FileSystem.getInfoAsync(compImg.uri);
		});
	};

	const compressSingleImage = (img) => {
		// Figure out dimensions and compression settings
		const preferredWidth = 1000;
		let transformConfig = {
			width: preferredWidth,
		};
		// if there is a width and height determine the larger of the two and base the transform on that
		if (img && img.width && img.height) {
			const width = parseInt(img.width, 10);
			const height = parseInt(img.height, 10);
			// find the larger of the 2 to make sure we are not enlarging the image
			const largerDim = width > height ? width : height;
			// if the dimension is larger than preferredWidth resize to preferredWidth =
			const largestSideValue = largerDim > preferredWidth ? preferredWidth : largerDim;
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
				compress: 0.3,
			}
		);
	};

	const compressImages = async () => {
		// get selected photos
		const selectedPhotos = images.filter((image, index) => {
			return selectedImages[index];
		});
		// returns a ImageManipulator.manipulateAsync promise that resolves to a compressed image object
		const compressedImagePromises = selectedPhotos.map((img) => {
			return compressSingleImage(img);
		});
		// when all image compression is complete
		const compressedImages = await Promise.all(compressedImagePromises);
		// get info of the compressed versions of the images
		// returns a FileSystem.getInfoAsync promise that resolves to a info object
		const compressedMediaInfoPromises = getCompressedMediaInfo(compressedImages);
		// when all compressed image info is retrieved then call onImagesCompressed
		const compressedMediaInfo = await Promise.all(compressedMediaInfoPromises);
		// props.onImagesCompressed(compressedMediaInfo)
		onImagesCompressed(compressedMediaInfo);
	};

	const selectImage = (index) => {
		// clone selected state
		const selectedCopy = { ...selectedImages };
		// if already existing at index unselect else mark as selected
		if (selectedCopy[index]) {
			delete selectedCopy[index];
		} else {
			selectedCopy[index] = true;
		}
		// TODO: parameterize maxImages
		if (Object.keys(selectedCopy).length > 20) {
			return;
		}
		// set selections to state
		setSelectedImages(selectedCopy || {});
	};

	const renderImageTile = ({ item, index }) => {
		return (
			<ImageTile
				width={windowWidth / 3}
				imageUri={item.uri}
				index={index}
				selected={!!selectedImages && !!selectedImages[index]}
				selectImage={selectImage}
				processingImages={processingImages}
			/>
		);
	};

	const renderImages = () => {
		return (
			<FlatList
				key="image-flat-list"
				data={images}
				numColumns={3}
				renderItem={renderImageTile}
				keyExtractor={(_, index) => index}
				onEndReached={() => {
					fetchMedia();
				}}
				onEndReachedThreshold={0.5}
				ListEmptyComponent={
					<Text>
						No images to show, make sure the app has access to your camera roll
						in your phone's settings.
					</Text>
				}
				initialNumToRender={50}
			/>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Header
				processingImages={processingImages}
				cancelText="cancel"
				cancelFunc={() => {
					console.log("cancel");
				}}
				confirmFunc={() => {
					setProcessingImages(true);
					compressImages();
				}}
				confirmText="Upload"
			/>
			<View>{renderImages()}</View>
		</SafeAreaView>
	);
};
