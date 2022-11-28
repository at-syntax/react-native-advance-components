import { Platform } from 'react-native';

export const top = Platform.select({
  android: 5,
  ios: 40,
});
