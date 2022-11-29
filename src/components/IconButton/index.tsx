import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { unicode } from '../../utils';
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
        {icon ?? (
          <Text style={[styles.text, { color: defaultIconColor }]}>
            {unicode.close}
          </Text>
        )}
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
  text: {
    fontSize: 28,
    fontWeight: '500',
  },
});
