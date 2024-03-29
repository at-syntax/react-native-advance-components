import type { ReactNode } from 'react';
import type { ColorValue } from 'react-native';

export type ImageViewerModalProps = React.PropsWithChildren<{
  color?: ColorValue;
  modalAnimationType?: 'none' | 'fade' | 'slide';
  backgroundColor?: ColorValue;
  defaultIconColor?: ColorValue;
  isZoomEnable?: boolean;
}>;

export interface ImageViewerModalStateType {
  _isModalVisible: boolean;
  isLoading: boolean;
  _child?: ReactNode;
}
