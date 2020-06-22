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
- ~~Animation and loading screens~~
- ~~create example app and screenshots~~
- Processing Loading view
- Tests
- Update Readme
- Publish release tag
  
## Usage

### Install:

```npm install multi-image-select-compress-expo```

### Usage:

```
import MultiImageSelectCompressExpo from "multi-image-select-compress-expo";
```

```
<MultiImageSelectCompressExpo
    open={isOpenBoolean}
    onCancelPress={() => setIsOpenBoolean(false)}
    onProcessingDone={(images) => console.log(images)}
/>
```

<img src="examples/gifs/image-select-default-optimized.gif" alt="example gif" width="200"/>


### Options:

| option                | default                                                                                                                                                                   | type     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| open                  | *required                                                                                                                                                                 | boolean  |
| onCancelPress         | *required                                                                                                                                                                 | function |
| onProcessingDone      | *required                                                                                                                                                                 | function |
| useCompression        | true                                                                                                                                                                      | boolean  |
| largestDimensionClamp | 1500                                                                                                                                                                      | int      |
| compressionLevel      | 0.8                                                                                                                                                                       | float    |
| rowLength             | 3                                                                                                                                                                         | int      |
| onEndReachedThreshold | 0.75                                                                                                                                                                      | float    |
| maxImages             | 20                                                                                                                                                                        | int      |
| cancelText            | "Cancel"                                                                                                                                                                  | string   |
| confirmText           | "Upload"                                                                                                                                                                  | string   |
| headingText           | "Select Images"                                                                                                                                                           | string   |
| colorConfig           | {  cancelButton: "rgb(0,122,255)", confirmButton: "rgb(0,122,255)", headingText: "#000000", selectedCheck: "rgb(76,217,100)", normalText: "#000000",lightText: "#999999"} | object   |


### Customize With Options:

```
<MultiImageSelectCompressExpo
    open={isOpenBoolean}
    onCancelPress={() => setIsOpenBoolean(false)}
    onProcessingDone={(images) => console.log(images)}
    largestDimensionClamp={500}
    compressionLevel={0.3}
    rowLength={3}
    maxImages={30}
    cancelText="Forget It"
    confirmText="Do it"
    headingText="Do It for Tammy!"
    colorConfig={{
        cancelButton: "magenta",
        confirmButton: "magenta",
        selectedCheck: "cyan",
    }}
/>
```

<img src="examples/gifs/image-select-tammy-optimized.gif" alt="example gif" width="200"/>