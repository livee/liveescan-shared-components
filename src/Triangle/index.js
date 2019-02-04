import React from 'react';
import { StyleSheet, View } from 'react-native';

const Triangle = ({ style }) => {
  return <View style={[styles.triangle, style]} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  }
});

export default Triangle;
