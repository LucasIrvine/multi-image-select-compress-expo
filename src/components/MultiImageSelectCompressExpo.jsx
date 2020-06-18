import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

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
	const renderImages = () => {};

	return (
		<SafeAreaView style={styles.container}>
			<Text>Hello bud how are you, good i hope!</Text>
			<View>{renderImages()}</View>
		</SafeAreaView>
	);
};
