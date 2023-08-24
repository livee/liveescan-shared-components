import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

export default class OpenSourceList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                fontSize: 20,
                color: this.props.titleColor || '#000',
                marginBottom: 10,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ marginBottom: 25 }}>{item.text}</Text>
          </View>
        )}
      />
    );
  }
}

