import type { ViewStyle } from 'react-native';
import type { SnackbarProps } from './index.type';
import { unicode } from '../../utils';

export const statusColorMap: Record<
  SnackbarProps['status'],
  {
    color: string;
    lightBg: string;
    icon: string;
  }
> = {
  success: { color: 'green', lightBg: '#a7ffa6', icon: unicode.success },
  error: { color: 'red', lightBg: '#ffa0a0', icon: unicode.error },
  info: { color: 'blue', lightBg: '#9fafff', icon: unicode.info },
  warning: { color: 'orange', lightBg: '#ffe2a4', icon: unicode.warning },
};

export const generateColor = (
  variant: SnackbarProps['variant'],
  status: SnackbarProps['status']
): ViewStyle => {
  switch (variant) {
    case 'solid':
      return { backgroundColor: statusColorMap[status].color };
    case 'left-accent':
      return {
        backgroundColor: statusColorMap[status].lightBg,
        borderColor: statusColorMap[status].color,
        borderLeftWidth: 5,
      };
    case 'top-accent':
      return {
        backgroundColor: statusColorMap[status].lightBg,
        borderColor: statusColorMap[status].color,
        borderTopWidth: 5,
      };
    case 'bottom-accent':
      return {
        backgroundColor: statusColorMap[status].lightBg,
        borderColor: statusColorMap[status].color,
        borderBottomWidth: 5,
      };
    case 'outline':
      return {
        borderColor: statusColorMap[status].color,
        borderWidth: 2,
      };

    default:
      return { backgroundColor: statusColorMap[status].color };
  }
};
