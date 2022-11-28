import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { ColorValue, GestureResponderEvent } from 'react-native';
import { unicode } from '../../utils';

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon?: JSX.Element;
  color?: ColorValue;
  defaultIconColor?: ColorValue;
}

interface IconButtonStateTypes {}

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
