# multi-image-select-compress-expo

A react native component that allows the user to select one or more images from the device's media library with configurable compression and resizing. For Expo projects.

## To-Dos

- ~~Project shell~~
- ~~Decide approach to getting media info and create media pagination hook~~
- ~~Build basic UI that reacts to media pagination hook~~
- ~~Determine approach to compression and resizing and create compression hook (ended up not doing hook)~~
- ~~Determine compressed image local directory storage and clean up~~ (using device managed cache directory)
- ~~Determine onSelected/compressed response object~~
- ~~Work in required parameterized options~~
- animations and loading views
- Test & update documentation with example

## Required Options

- Compression Level
- Largest dimension (width / height) clamp value
- Colors
- Cancel header button text
- Select/Compress header button text
- Row length (how many images per row) for tablet and phone size optimization
