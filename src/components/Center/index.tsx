import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import type { CenterProps, CenterStateTypes } from './index.type';

/**
 * ### Center
 * This will make the child vertically and horizontally center.
 *
 * ex:
 * ```ts
 * <Center>
 *  <View>
 *    <Text>This text will be in center</Text>
 *  </View>
 * </Center>
 * ```
 */
export class Center extends Component<
  React.PropsWithChildren<CenterProps>,
  CenterStateTypes
> {
  constructor(props: React.PropsWithChildren<CenterProps>) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <View style={styles.root}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
