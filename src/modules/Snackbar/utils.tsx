import type { ViewStyle, ColorValue } from 'react-native';
import type { SnackbarProps } from './index.type';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconGenerator = {
  name: string;
  color?: ColorValue;
  size?: number;
};

const IconGenerator = ({ name, color, size }: IconGenerator) => (
  <Icon
    name={name}
    color={color}
    size={size}
    style={{ margin: 5, marginRight: 10 }}
  />
);

export const statusColorMap: Record<
  SnackbarProps['status'],
  {
    color: string;
    lightBg: string;
    textColor: string;
    icon: ({
      color,
      size,
    }: {
      color: IconGenerator['color'];
      size: IconGenerator['size'];
    }) => JSX.Element;
  }
> = {
  success: {
    color: 'green',
    lightBg: '#a7ffa6',
    textColor: '#025e00',
    icon: ({ color, size }) =>
      IconGenerator({ name: 'check-circle', color, size }),
  },
  error: {
    color: 'red',
    lightBg: '#ffa0a0',
    textColor: '#6b0000',
    icon: ({ color, size }) =>
      IconGenerator({ name: 'alert-octagon', color, size }),
  },
  info: {
    color: 'blue',
    lightBg: '#9fafff',
    textColor: '#00126e',
    icon: ({ color, size }) =>
      IconGenerator({ name: 'information', color, size }),
  },
  warning: {
    color: 'orange',
    lightBg: '#ffe2a4',
    textColor: '#5f4100',
    icon: ({ color, size }) => IconGenerator({ name: 'alert', color, size }),
  },
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
        borderWidth: 3,
      };

    default:
      return { backgroundColor: statusColorMap[status].color };
  }
};
