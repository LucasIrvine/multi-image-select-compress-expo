import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

// styles
const styles = StyleSheet.create({
	noImagesWrap: {
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
	},
	noImagesText: {
		paddingHorizontal: "10%",
		color: "#999999",
		fontSize: 18,
		textAlign: "center",
	},
});

export default function EmptyList({ colors }) {
	return (
		<View style={styles.noImagesWrap}>
			<Text
				allowFontScaling={false}
				style={[styles.noImagesText, { color: colors.lightText }]}
			>
				No Images to display, make sure this app has access to your camera roll.
			</Text>
		</View>
	);
}

// propTypes
EmptyList.propTypes = {
	colors: PropTypes.object.isRequired,
};
