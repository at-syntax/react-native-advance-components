import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ImageViewerModalDemo } from './components/ImageViewerModalDemo';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageViewerModalDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});