import { useState } from "react";
import * as MediaLibrary from "expo-media-library";

const useMediaLibraryImages = () => {
	const [initialFetch, setInitialFetch] = useState(false);
	const [images, setImages] = useState([]);
	const [pagingCursor, setPagingCursor] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [isImagesLoading, setIsImagesLoading] = useState(false);
	const [isImagesError, setIsImagesError] = useState(false);

	const resetImageState = () => {
		setInitialFetch(false);
		setImages([]);
		setPagingCursor(false);
		setHasNextPage(true);
		setIsImagesError(false);
		setIsImagesLoading(true);
	};

	const fetchMedia = async () => {
		// set initial fetch
		if (!initialFetch) {
			setInitialFetch(true);
		}
		// reset flags
		setIsImagesError(false);
		setIsImagesLoading(true);
		// try to fetch media from expo-media-library
		try {
			// initial params
			const params = {
				first: 24,
			};
			// if current count
			if (pagingCursor) {
				params.after = pagingCursor;
			}
			// if no media pages left just return
			if (!hasNextPage) return;
			// get next media chunk
			const newMedia = await MediaLibrary.getAssetsAsync(params);
			// just return if end cursor
			if (pagingCursor === newMedia.endCursor) return;
			// append new images, update cursor and hasNextPage flag
			setImages([...images, ...newMedia.assets]);
			setPagingCursor(newMedia.endCursor);
			setHasNextPage(newMedia.hasNextPage);
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
			resetImageState,
			fetchMedia,
		},
		[],
	];
};

export default useMediaLibraryImages;
