import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { generateColor, statusColorMap } from './utils';
import { top } from '../../utils';
import { IconButton } from '../../components';
import { RNAdvanceComponentContext } from '../../context';
import type { GestureResponderEvent } from 'react-native';

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

interface SnackbarStateTypes {
  opacity: Animated.Value;
}

export class Snackbar extends React.Component<
  SnackbarProps,
  SnackbarStateTypes
> {
  static defaultProps = {
    anchorOrigin: 'top',
    autoHideDuration: 3000,
    variant: 'solid',
  };

  static contextType = RNAdvanceComponentContext;
  static context: React.ContextType<typeof RNAdvanceComponentContext>;

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
    const { isVisible, message, status, anchorOrigin, onClose, variant } =
      this.props;
    const theme = this.context;

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
        <View style={[styles.messageContainer, generateColor(variant, status)]}>
          <View style={styles.messageSection}>
            <Text
              style={[
                styles.iconStyle,
                {
                  color:
                    variant !== 'solid'
                      ? statusColorMap[status].color
                      : 'white',
                },
              ]}
            >
              {statusColorMap[status].icon}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: variant !== 'solid' ? theme.colors.text : 'white',
                },
              ]}
              numberOfLines={3}
            >
              {message}
            </Text>
          </View>
          <IconButton
            onPress={onClose}
            defaultIconColor={variant !== 'solid' ? theme.colors.text : 'white'}
          />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 70,
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
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
  },
});
