import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	Dimensions,
} from "react-native";
import useMediaLibraryImages from "../hooks/useMediaLibraryImages";
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

export default () => {
	const windowWidth = Dimensions.get("window").width;
	const [selectedImages, setSelectedImages] = useState({});
	const [{ images, fetchMedia }] = useMediaLibraryImages();

	const selectImage = (index) => {
		//clone selected state
		let selectedCopy = { ...selectedImages };
		//if already existing at index unselect else mark as selected
		if (selectedCopy[index]) {
			delete selectedCopy[index];
		} else {
			selectedCopy[index] = true;
		}
		//TODO: parameterize maxImages
		if (Object.keys(selectedCopy).length > 20) {
			return;
		}
		//set selections to state
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
			<Text>Hello bud how are you, good i hope!</Text>
			<View>{renderImages()}</View>
		</SafeAreaView>
	);
};
