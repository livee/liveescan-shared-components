import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'eva',
    fontSize: 24
  }
});

const Icon = ({ iconStyle = {}, code }) => {
  return <Text style={[styles.icon, iconStyle]}>{code}</Text>;
};

export default Icon;
