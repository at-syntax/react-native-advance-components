[![at-syntax](https://img.shields.io/circleci/build/github/at-syntax/react-native-advance-components?logo=circleci&token=9e1f8a230311e7f8e7a8b2e5314e10f9f79ca34c)](https://circleci.com/gh/at-syntax/react-native-advance-components)
[![TypeScript](https://img.shields.io/badge/made%20with-typescript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45?logo=prettier&logoColor=F7BA3E)](https://github.com/prettier/prettier)
[![Supports React Native >= 0.70](https://img.shields.io/badge/react%20native-%3E%3D%200.70-lightgrey?logo=react&logoColor=61DAFB)](https://github.com/facebook/react-native)

# react-native-advance-components

Advance components for react native

## Installation

```sh
npm install react-native-advance-components
```

## Usage

### 1. ImageViewerModal

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
