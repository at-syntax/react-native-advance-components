import type { Animated, GestureResponderEvent } from 'react-native';
import type { Snackbar } from '.';

export type SnackbarProps = typeof Snackbar.defaultProps & {
  isVisible: boolean;
  status: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
  autoHideDuration?: number;
  anchorOrigin?: 'top' | 'bottom';
  onClose?: (event?: GestureResponderEvent) => void;
  variant?:
    | 'solid'
    | 'left-accent'
    | 'top-accent'
    | 'bottom-accent'
    | 'outline';
};

export interface SnackbarStateTypes {
  opacity: Animated.Value;
}
