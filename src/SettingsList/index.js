import React, { Component } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class SettingsList extends Component {
  render() {
    return (
      <View>
        <SectionList
          keyExtractor={item => item.label}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{section.label}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={item.label}
              subtitle={item.desc}
              leftIcon={typeof item.icon === 'string' ? { name: item.icon } : item.icon}
              onPress={() => this.props.onPress(item)}
            />
          )}
          sections={this.props.items}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef'
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8
  }
});
