import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-advance-components';

export function SnackbarDemo() {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <Button title="Show" onPress={() => setIsVisible(true)} />
      <Button title="Close" onPress={() => setIsVisible(false)} />
      <Snackbar
        isVisible={isVisible}
        status="warning"
        message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
        onClose={() => setIsVisible(false)}
        autoClose
        anchorOrigin="top"
      />
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
