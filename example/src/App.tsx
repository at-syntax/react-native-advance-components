import { StyleSheet, useColorScheme, View } from 'react-native';
import { RNAdvanceComponentProvider } from 'react-native-advance-components';
import { ImageViewerModalDemo } from './components/ImageViewerModalDemo';
import { SnackbarDemo } from './components/SnackbarDemo';

export default function App() {
  const themeMode = useColorScheme();
  return (
    <RNAdvanceComponentProvider mode={themeMode ?? 'light'}>
      <View style={styles.container}>
        <SnackbarDemo />
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
