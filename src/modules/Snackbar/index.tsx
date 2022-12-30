import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { generateColor, statusColorMap } from './utils';
import { top } from '../../utils';
import { IconButton } from '../../components';
import { RNAdvanceComponentContext } from '../../context';
import type { SnackbarProps, SnackbarStateTypes } from './index.type';

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
  // @ts-expect-error
  context!: React.ContextType<typeof RNAdvanceComponentContext>;

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
            backgroundColor:
              variant === 'outline' ? theme.colors.background : undefined,
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
            {statusColorMap[status].icon({
              color:
                variant !== 'solid' ? statusColorMap[status].color : 'white',
              size: 26,
            })}
            <Text
              style={[
                styles.text,
                {
                  color:
                    variant === 'solid'
                      ? '#ffff'
                      : statusColorMap[status].textColor,
                },
              ]}
              numberOfLines={3}
            >
              {message}
            </Text>
          </View>
          <IconButton
            onPress={onClose}
            defaultIconColor={
              variant === 'solid' ? '#ffff' : statusColorMap[status].textColor
            }
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
  text: {
    flex: 1,
    fontSize: 15,
  },
});
