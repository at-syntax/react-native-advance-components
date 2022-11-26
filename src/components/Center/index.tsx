import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

interface CenterProps {}

interface CenterStateTypes {}

export class Center extends Component<CenterProps, CenterStateTypes> {
  constructor(props: CenterProps) {
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
