# react-native-advance-components

[![at-syntax](https://img.shields.io/circleci/build/github/at-syntax/react-native-advance-components?logo=circleci&token=9e1f8a230311e7f8e7a8b2e5314e10f9f79ca34c)](https://circleci.com/gh/at-syntax/react-native-advance-components)
[![TypeScript](https://img.shields.io/badge/made%20with-typescript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45?logo=prettier&logoColor=F7BA3E)](https://github.com/prettier/prettier)
[![Supports React Native >= 0.70](https://img.shields.io/badge/react%20native-%3E%3D%200.70-lightgrey?logo=react&logoColor=61DAFB)](https://github.com/facebook/react-native)

Advance components for react native

## Content

- [Installation](#installation)
- [Setup](#setup-theme)
- [Components](#components)
  - [Center](#1-center)
  - [ImageZoomViewer](#2-imagezoomviewer)
- [Modules](#modules)
  - [ImageViewerModal](#1-imageviewermodal)
  - [Snackbar](#2-snackbar)

## Installation

```sh
npm install react-native-advance-components
```

or

```sh
yarn add react-native-advance-components
```

## Usage

### Setup theme

Add `RNAdvanceComponentProvider` in your app entry point (generally App.js).

```ts
import { RNAdvanceComponentProvider } from 'react-native-advance-components';

// ...

export default function App() {
  const themeMode = useColorScheme();
  return (
    <RNAdvanceComponentProvider mode={themeMode ?? 'light'}>
      <View>
        <ImageViewer />
      </View>
    </RNAdvanceComponentProvider>
  );
}
```

## Components

### 1. Center

It will vertically and horizontally center the children element.

- check our [demo](https://snack.expo.dev/@saikat737/center-component)

```ts
import { Center } from 'react-native-advance-components';

// ...
export function CenterDemo() {
  return (
    <Center>
      <Text>This text will be vertically and horizontally center.</Text>
    </Center>
  );
}
```

### 2. ImageZoomViewer

It will make you image zoom enable.

- check our [demo](https://snack.expo.dev/@saikat737/imagezoomviewer-component)

```ts
import { ImageZoomViewer } from 'react-native-advance-components';

// ...
export function ImageZoomViewerDemo() {
  return (
    <ImageZoomViewer
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={200}
      imageHeight={200}
    >
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={{
          uri: 'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg',
        }}
      />
    </ImageZoomViewer>
  );
}
```

## Modules

### 1. ImageViewerModal

- check our [demo](https://snack.expo.dev/@saikat737/imageviewermodal)

```ts
import { ImageViewerModal } from 'react-native-advance-components';

// ...

export function ImageViewer() {
  const ref = React.useRef<ImageViewerModal>(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageViewerModal
        ref={ref}
        modalAnimationType="fade"
        backgroundColor="#6ebef855"
        color="#ffbf00"
        defaultIconColor="black"
      >
        <Image
          style={{ width: 300, height: 150 }}
          resizeMode="cover"
          source={{
            uri: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
          }}
        />
      </ImageViewerModal>
    </View>
  );
}
```

### 2. Snackbar

- check our [demo](https://snack.expo.dev/@saikat737/snackbar)

```ts
import { Snackbar } from 'react-native-advance-components';

// ...

export function SnackbarDemo() {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Button title="Show" onPress={() => setIsVisible(true)} />
      <Button title="Close" onPress={() => setIsVisible(false)} />
      <Snackbar
        isVisible={isVisible}
        status="success"
        message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
        onClose={() => setIsVisible(false)}
        autoClose
        anchorOrigin="top"
        variant="solid"
      />
    </View>
  );
}
```

## Contributors

![contributors](https://contrib.rocks/image?repo=at-syntax/react-native-advance-components)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
