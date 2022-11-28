import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNAdvanceComponentProvider } from 'react-native-advance-components';
import { ImageViewerModalDemo } from './components/ImageViewerModalDemo';

export default function App() {
  return (
    <RNAdvanceComponentProvider mode="dark">
      <View style={styles.container}>
        <ImageViewerModalDemo />
      </View>
    </RNAdvanceComponentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
