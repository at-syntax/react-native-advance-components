import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNAdvanceComponentProvider } from 'react-native-advance-components';
import { SnackbarDemo } from './components/SnackbarDemo';

export default function App() {
  return (
    <RNAdvanceComponentProvider mode="light">
      <View style={styles.container}>
        <SnackbarDemo />
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
