import React from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function ImageTile({
	imageUri,
	width,
	index,
	selected,
	selectImage,
}) {
	return (
		<TouchableHighlight
			style={styles.imageTile}
			underlayColor="transparent"
			onPress={() => {
				selectImage(index);
			}}
		>
			<View>
				<Image
					style={{
						width: width,
						height: width,
						opacity: selected ? 0.3 : 1,
					}}
					source={{ uri: imageUri }}
				/>
				{!!selected && (
					<MaterialCommunityIcons
						name="checkbox-marked-circle"
						size={24}
						style={styles.selectedIcon}
					/>
				)}
			</View>
		</TouchableHighlight>
	);
}

// propTypes
ImageTile.propTypes = {
	imageUri: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
	selectImage: PropTypes.func.isRequired,
	preparingUpload: PropTypes.bool.isRequired,
};

// styles
const styles = StyleSheet.create({
	imageTile: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "white",
	},
	selectedIcon: {
		position: "absolute",
		top: "8%",
		right: "8%",
		color: "rgb(0,122,255)",
	},
});
