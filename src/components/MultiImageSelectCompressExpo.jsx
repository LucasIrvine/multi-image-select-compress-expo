import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import useMediaLibraryImages from "../hooks/useMediaLibraryImages";

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
	const [{ images, fetchMedia }] = useMediaLibraryImages();

	const renderImages = () => {
		console.log(images);
		console.log(fetchMedia);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text>Hello bud how are you, good i hope!</Text>
			<View>{renderImages()}</View>
		</SafeAreaView>
	);
};
