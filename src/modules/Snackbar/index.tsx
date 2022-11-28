import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import type { GestureResponderEvent, ViewStyle } from 'react-native';
import { top, unicode } from '../../utils';
import { IconButton } from '../../components';

export type SnackbarProps = typeof Snackbar.defaultProps & {
  isVisible: boolean;
  status: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
  autoHideDuration?: number;
  anchorOrigin?: 'top' | 'bottom';
  onClose?: (event?: GestureResponderEvent) => void;
  variant?: 'solid' | 'left-accent' | 'top-accent' | 'outline';
};

interface SnackbarStateTypes {
  opacity: Animated.Value;
}

const statusColorMap: Record<
  SnackbarProps['status'],
  {
    color: string;
    lightBg: string;
    icon: string;
  }
> = {
  success: { color: 'green', lightBg: '#8aca89', icon: unicode.success },
  error: { color: 'red', lightBg: '#ff8484', icon: unicode.error },
  info: { color: 'blue', lightBg: '#6f87ff', icon: unicode.info },
  warning: { color: 'orange', lightBg: '#ffd374', icon: unicode.warning },
};

export class Snackbar extends React.Component<
  SnackbarProps,
  SnackbarStateTypes
> {
  static defaultProps = {
    anchorOrigin: 'top',
    autoHideDuration: 3000,
    variant: 'solid',
  };

  private timeout: NodeJS.Timeout | null = null;
  private windowDimensions = Dimensions.get('window');

  constructor(props: SnackbarProps) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  private init(): void {
    if (this.props.isVisible === true) {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (
      this.props.isVisible === true &&
      this.props.autoClose === true &&
      this.props.autoHideDuration !== undefined
    ) {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.props.onClose?.();
      }, this.props.autoHideDuration);
    }
  }

  componentDidMount(): void {
    this.init();
  }

  componentDidUpdate(
    prevProps: Readonly<SnackbarProps>,
    prevState: Readonly<SnackbarStateTypes>
  ): void {
    if (
      prevProps.isVisible !== this.props.isVisible ||
      prevProps.autoClose !== this.props.autoClose ||
      prevProps.autoHideDuration !== this.props.autoHideDuration ||
      prevState.opacity !== this.state.opacity
    ) {
      this.init();
    }
  }

  componentWillUnmount(): void {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  private generateColor(
    variant: SnackbarProps['variant'],
    status: SnackbarProps['status']
  ): ViewStyle {
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
      case 'outline':
        return { borderColor: statusColorMap[status].color, borderWidth: 2 };

      default:
        return { backgroundColor: statusColorMap[status].color };
    }
  }

  render() {
    const { isVisible, message, status, anchorOrigin, onClose, variant } =
      this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            top:
              anchorOrigin === 'top' ? top : this.windowDimensions.height - 90,
            opacity: this.state.opacity,
            transform: [
              {
                scale: isVisible
                  ? this.state.opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                  : 1,
              },
            ],
          },
        ]}
      >
        <View
          style={[styles.messageContainer, this.generateColor(variant, status)]}
        >
          <View style={styles.messageSection}>
            <Text style={styles.iconStyle}>{statusColorMap[status].icon}</Text>
            <Text style={styles.text}>
              {message.substring(0, 130)}
              {message.length > 130 && '...'}
            </Text>
          </View>
          <IconButton onPress={onClose} />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    minHeight: 50,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1000,
    elevation: 16,
  },
  messageContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  messageSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 26,
    margin: 5,
  },
  text: {
    flex: 1,
  },
});
