import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

// styles
const styles = StyleSheet.create({
	headerWrap: {
		position: "relative",
		zIndex: 300,
		backgroundColor: "white",
		height: 60,
		width: "98%",
		paddingHorizontal: "1%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#999999",
	},
	buttonWrap: {
		paddingHorizontal: 10,
	},
	buttonText: {
		fontSize: 18,
		color: "#000000",
	},
	headingText: {
		fontSize: 18,
		width: "50%",
		textAlign: "center",
		color: "#000000",
		fontWeight: "bold",
	},
});

export default function Header({ cancelText, cancelFunc, confirmText, confirmFunc, processingImages, headingText, colors }) {
	return (
		<View style={styles.headerWrap}>
			<TouchableOpacity onPress={cancelFunc} style={styles.buttonWrap}>
				<Text allowFontScaling={false} style={[styles.buttonText, { color: colors.cancelButton }]}>
					{cancelText}
				</Text>
			</TouchableOpacity>
			<Text
				allowFontScaling={false}
				numberOfLines={1}
				ellipsizeMode="tail"
				style={[styles.headingText, { color: colors.headingText }]}
			>
				{headingText}
			</Text>

			<TouchableOpacity
				onPress={() => {
					if (!processingImages) {
						confirmFunc();
					}
				}}
				style={styles.buttonWrap}
			>
				<Text allowFontScaling={false} style={[styles.buttonText, { color: colors.confirmButton }]}>
					{confirmText}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

// propTypes
Header.propTypes = {
	cancelText: PropTypes.string.isRequired,
	cancelFunc: PropTypes.func.isRequired,
	confirmText: PropTypes.string.isRequired,
	confirmFunc: PropTypes.func.isRequired,
	processingImages: PropTypes.bool.isRequired,
	headingText: PropTypes.string.isRequired,
	colors: PropTypes.object,
};
