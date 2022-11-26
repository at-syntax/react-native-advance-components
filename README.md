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
