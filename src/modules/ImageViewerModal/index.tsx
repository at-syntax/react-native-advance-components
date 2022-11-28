import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Center, IconButton } from '../../components';
import { top } from '../../utils/platformSpecific';
import { RNAdvanceComponentContext } from '../../context';
import type { ColorValue } from 'react-native';

export interface ImageViewerModalProps {
  color?: ColorValue;
  modalAnimationType?: 'none' | 'fade' | 'slide';
  backgroundColor?: ColorValue;
  defaultIconColor?: ColorValue;
}

interface ImageViewerModalStateType {
  _isModalVisible: boolean;
  isLoading: boolean;
}

export class ImageViewerModal extends React.Component<
  ImageViewerModalProps,
  ImageViewerModalStateType
> {
  static contextType = RNAdvanceComponentContext;
  // @ts-ignore
  context!: React.ContextType<typeof RNAdvanceComponentContext>;

  private childRef: React.RefObject<{
    _internalFiberInstanceHandleDEV: {
      memoizedProps: any;
    };
  }>;

  constructor(props: ImageViewerModalProps) {
    super(props);

    this.childRef = React.createRef<{
      _internalFiberInstanceHandleDEV: { memoizedProps: any };
    }>();

    this.state = {
      _isModalVisible: false,
      isLoading: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public closeModal(callback?: () => void) {
    this.setState({ _isModalVisible: false }, callback);
  }

  private handleClose() {
    this.setState({ _isModalVisible: false });
  }

  private handleClick() {
    this.setState({ _isModalVisible: true });
  }

  render() {
    const {
      children,
      modalAnimationType,
      backgroundColor = `rgba(0,0,0,0.5)`,
      defaultIconColor,
      color = 'red',
    } = this.props;

    return (
      <>
        <Modal
          animationType={modalAnimationType}
          visible={this.state._isModalVisible}
          onRequestClose={this.handleClose}
          transparent
        >
          <View
            style={[
              styles.imageContainer,
              {
                backgroundColor: backgroundColor,
              },
            ]}
          >
            {(this.state.isLoading ||
              !this.childRef.current?._internalFiberInstanceHandleDEV
                ?.memoizedProps?.source.uri) && (
              <Center>
                <ActivityIndicator size="large" color={color} />
              </Center>
            )}
            <Image
              style={styles.image}
              resizeMode="contain"
              source={
                this.childRef.current?._internalFiberInstanceHandleDEV
                  ?.memoizedProps?.source
              }
              onLoadStart={() => this.setState({ isLoading: true })}
              onLoadEnd={() => this.setState({ isLoading: false })}
            />
            <View style={[styles.closeIconContainer, { top: top }]}>
              <IconButton
                onPress={this.handleClose}
                color={color}
                defaultIconColor={defaultIconColor}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={this.handleClick}>
          {React.Children.map<React.ReactNode, React.ReactNode>(
            children,
            (child) => {
              return React.cloneElement(
                child as
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactPortal,
                {
                  ref: this.childRef,
                }
              );
            }
          )}
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: { width: '100%', height: '100%' },
  image: {
    width: '100%',
    height: '100%',
  },
  closeIconContainer: { position: 'absolute', right: 4 },
});
