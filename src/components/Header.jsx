import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

// styles
const styles = StyleSheet.create({
	headerWrap: {
		backgroundColor: "white",
		height: 50,
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	buttonWrap: {
		paddingHorizontal: 10,
	},
	cancelText: {
		color: "rgb(0,122,255)",
		fontSize: 18,
	},
	confirmText: {
		color: "rgb(0,122,255)",
		fontSize: 18,
	},
});

export default function Header({
	cancelText,
	cancelFunc,
	confirmText,
	confirmFunc,
	processingImages,
}) {
	return (
		<View style={styles.headerWrap}>
			<TouchableOpacity onPress={cancelFunc} style={styles.buttonWrap}>
				<Text allowFontScaling={false} style={styles.cancelText}>
					{cancelText}
				</Text>
			</TouchableOpacity>
			{!processingImages && (
				<TouchableOpacity onPress={confirmFunc} style={styles.buttonWrap}>
					<Text allowFontScaling={false} style={styles.confirmText}>
						{confirmText}
					</Text>
				</TouchableOpacity>
			)}
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
};
