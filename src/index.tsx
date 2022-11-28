/* const LINKING_ERROR =
  `The package 'react-native-advance-components' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AdvanceComponents = NativeModules.AdvanceComponents
  ? NativeModules.AdvanceComponents
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return AdvanceComponents.multiply(a, b);
} */

export * from './modules';
export * from './context';
