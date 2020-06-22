import React, { useRef, useEffect } from "react";
import {
	StyleSheet,
	ActivityIndicator,
	Animated,
	View,
	Text,
} from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
	textWrap: {
		marginTop: -100,
	},
	loadingWrap: {
		width: "100%",
		height: "100%",
		top: 60,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "#ffffff",
		zIndex: -100,
	},
	loadingText: {
		color: "#999999",
		fontSize: 26,
		textAlign: "center",
		marginTop: 10,
		backgroundColor: "transparent",
	},
});

export default function LoadingView({ visible, colors }) {
	const opacityValue = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.timing(opacityValue, {
			toValue: visible ? 1 : 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [visible, opacityValue]);

	return (
		<Animated.View
			style={[
				styles.loadingWrap,
				{
					opacity: opacityValue,
				},
			]}
		>
			<View style={styles.textWrap}>
				<ActivityIndicator size="large" color={colors.lightText} />
			</View>
		</Animated.View>
	);
}

// propTypes
LoadingView.propTypes = {
	visible: PropTypes.bool.isRequired,
	colors: PropTypes.object.isRequired,
};
