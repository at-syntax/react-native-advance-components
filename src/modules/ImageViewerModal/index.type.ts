import type { ColorValue, ImageProps } from 'react-native';

export interface ImageViewerModalProps {
  color?: ColorValue;
  modalAnimationType?: 'none' | 'fade' | 'slide';
  backgroundColor?: ColorValue;
  defaultIconColor?: ColorValue;
  isZoomEnable?: boolean;
}

export interface ImageViewerModalStateType {
  _isModalVisible: boolean;
  isLoading: boolean;
  _childProps?: ImageProps;
}
