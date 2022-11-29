import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImageViewerModal } from 'react-native-advance-components';

export function ImageViewerModalDemo() {
  const ref = React.useRef<ImageViewerModal>(null);
  const imageRef = React.useRef<Image>(null);

  return (
    <View style={styles.container}>
      <ImageViewerModal
        ref={ref}
        modalAnimationType="fade"
        backgroundColor="#6ebef855"
        color="#ffbf00"
        defaultIconColor="black"
      >
        <Image
          ref={imageRef}
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
          }}
        />
      </ImageViewerModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 300, height: 150 },
});
