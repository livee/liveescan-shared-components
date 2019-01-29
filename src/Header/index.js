import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 80
  },
  textHeader: {
    textAlign: 'center',
    paddingTop: 40,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ ...styles.header, backgroundColor: this.props.backgroundColor }}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textHeader}>{this.props.title}</Text>
      </View>
    );
  }
}
