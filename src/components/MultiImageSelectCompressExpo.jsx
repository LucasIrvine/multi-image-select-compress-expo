import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
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
	const [selectedImages, setSelectedImages] = useState({});
	const [{ images, fetchMedia }] = useMediaLibraryImages();

	const selectImage = () => {
		console.log("image selected");
	};

	const renderImageTile = ({ item, index }) => {
		return (
			<ImageTile
				width={50}
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
					<Text>No images to show, make sure the app has access to your camera roll in your phone's settings.</Text>
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
