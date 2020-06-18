import { useState } from "react";
import * as MediaLibrary from "expo-media-library";

const useMediaLibraryImages = () => {
	const [initialFetch, setInitialFetch] = useState(false);
	const [images, setImages] = useState([]);
	const [pagingCursor, setPagingCursor] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [isImagesLoading, setIsImagesLoading] = useState(false);
	const [isImagesError, setIsImagesError] = useState(false);

	const fetchMedia = async () => {
		console.log("calling fetchMedia()");

		if (!initialFetch) {
			setInitialFetch(true);
		}

		setIsImagesError(false);
		setIsImagesLoading(true);

		try {
			const params = {
				first: 100,
			};

			if (pagingCursor) {
				params.after = pagingCursor;
			}

			if (!hasNextPage) return;

			const media = await MediaLibrary.getAssetsAsync(params);

			if (pagingCursor === media.endCursor) return;

			setImages([...images, ...media.assets]);
			setPagingCursor(media.endCursor);
			setHasNextPage(media.hasNextPage);
		} catch (error) {
			setIsImagesError(true);
		}

		setIsImagesLoading(false);
	};

	if (!initialFetch) {
		fetchMedia();
	}

	return [
		{
			images,
			pagingCursor,
			hasNextPage,
			isImagesLoading,
			isImagesError,
			fetchMedia,
		},
		[],
	];
};

export default useMediaLibraryImages;
