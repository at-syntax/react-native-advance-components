import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Center, IconButton, ImageZoomViewer } from '../../components';
import { top } from '../../utils/platformSpecific';
import { RNAdvanceComponentContext } from '../../context';
import type {
  ImageViewerModalProps,
  ImageViewerModalStateType,
} from './index.type';

export class ImageViewerModal extends React.Component<
  ImageViewerModalProps,
  ImageViewerModalStateType
> {
  static contextType = RNAdvanceComponentContext;
  //@ts-expect-error
  context!: React.ContextType<typeof RNAdvanceComponentContext>;

  private windowDimension = Dimensions.get('window');

  constructor(props: ImageViewerModalProps) {
    super(props);

    this.state = {
      _isModalVisible: false,
      _child: undefined,
      isLoading: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getChild = this.getChild.bind(this);
  }

  getChild() {
    this.setState({
      _child: React.Children.only(this.props.children),
    });
  }

  componentDidMount(): void {
    this.getChild();
  }

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<ImageViewerModalProps>>
  ): void {
    if (prevProps.children !== this.props.children) {
      this.getChild();
    }
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
      modalAnimationType,
      backgroundColor = `rgba(0,0,0,0.5)`,
      defaultIconColor,
      color = 'red',
      isZoomEnable = true,
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
            {/* @ts-expect-error */}
            {(this.state.isLoading || !this.state._child?.props.source) && (
              <Center>
                <ActivityIndicator size="large" color={color} />
              </Center>
            )}
            {isZoomEnable ? (
              <ImageZoomViewer
                cropWidth={this.windowDimension.width}
                cropHeight={this.windowDimension.height}
                imageHeight={this.windowDimension.height}
                imageWidth={this.windowDimension.width}
              >
                <Image
                  // @ts-expect-error
                  source={this.state._child?.props.source}
                  style={[styles.image]}
                  resizeMode="contain"
                  onLoadStart={() => this.setState({ isLoading: true })}
                  onLoadEnd={() => this.setState({ isLoading: false })}
                />
              </ImageZoomViewer>
            ) : (
              <Image
                // @ts-expect-error
                source={this.state._child?.props.source}
                style={[styles.image]}
                resizeMode="contain"
                onLoadStart={() => this.setState({ isLoading: true })}
                onLoadEnd={() => this.setState({ isLoading: false })}
              />
            )}
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
          {this.state._child}
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
