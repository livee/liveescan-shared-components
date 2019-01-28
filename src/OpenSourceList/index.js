import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default class OpenSourceList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.pre}>{item.text}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  pre: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black'
  }
});
