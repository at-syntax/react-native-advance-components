import { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { IconButtonProps, IconButtonStateTypes } from './index.type';

/**
 * ### IconButton
 * Icon button component.
 *
 * ex:
 * ```ts
 * <IconButton
 *    onPress={this.handleClose}
 *    color={color}
 *    defaultIconColor={defaultIconColor}
 *  />
 * ```
 */
export class IconButton extends Component<
  IconButtonProps,
  IconButtonStateTypes
> {
  constructor(props: IconButtonProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { onPress, icon, color, defaultIconColor = 'white' } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.root, { backgroundColor: color }]}
      >
        {icon ?? <Icon name="close" color={defaultIconColor} size={26} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
