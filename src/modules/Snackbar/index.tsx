import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { top } from '../../utils/platformSpecific';
import { IconButton } from '../../components';

export type SnackbarProps = typeof Snackbar.defaultProps & {
  isVisible: boolean;
  status: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
  autoHideDuration?: number;
  anchorOrigin?: 'top' | 'bottom';
  onClose?: (event?: GestureResponderEvent) => void;
};

interface SnackbarStateTypes {
  opacity: Animated.Value;
}

const statusColorMap: Record<
  SnackbarProps['status'],
  {
    color: string;
    icon: string;
  }
> = {
  success: { color: 'green', icon: '☑' },
  error: { color: 'red', icon: '⨯' },
  info: { color: 'blue', icon: 'ℹ' },
  warning: { color: 'orange', icon: '⚠' },
};

export class Snackbar extends React.Component<
  SnackbarProps,
  SnackbarStateTypes
> {
  static defaultProps = {
    anchorOrigin: 'top',
    autoHideDuration: 3000,
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

  render() {
    const { isVisible, message, status, anchorOrigin, onClose } = this.props;

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
          style={[
            styles.messageContainer,
            { backgroundColor: statusColorMap[status].color },
          ]}
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
    color: 'white',
  },
  text: {
    flex: 1,
    color: 'white',
  },
});
