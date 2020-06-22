import React, { useRef } from "react";
import { StyleSheet, View, TouchableHighlight, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

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

export default function ImageTile({
	imageUri,
	width,
	index,
	selected,
	selectImage,
	processingImages,
	colors,
	markImageLoaded,
}) {
	const fadeAnimation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
	const fadeIn = () => {
		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};
	return (
		<TouchableHighlight
			style={styles.imageTile}
			underlayColor="transparent"
			onPress={() => {
				if (!processingImages) {
					fadeIn();
					selectImage(index);
				}
			}}
		>
			<View>
				<Animated.Image
					style={{
						width,
						height: width,
						opacity: selected ? 0.4 : fadeAnimation,
					}}
					source={{ uri: imageUri }}
					onLoad={() => {
						markImageLoaded();
						fadeIn();
					}}
				/>
				{!!selected && (
					<MaterialCommunityIcons
						name="checkbox-marked-circle"
						size={24}
						style={[styles.selectedIcon, { color: colors.selectedCheck }]}
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
	processingImages: PropTypes.bool.isRequired,
	colors: PropTypes.object.isRequired,
	markImageLoaded: PropTypes.func.isRequired,
};
