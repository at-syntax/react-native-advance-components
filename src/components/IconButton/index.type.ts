import type { ColorValue, GestureResponderEvent } from 'react-native';

export interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon?: JSX.Element;
  color?: ColorValue;
  defaultIconColor?: ColorValue;
}

export interface IconButtonStateTypes {}
