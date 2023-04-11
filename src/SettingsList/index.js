import React, { Component } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from '../Icon';

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
            <ListItem bottomDivider onPress={() => this.props.onPress(item)}>
              {typeof item.icon === 'string'
                ?  <Icon name={item.icon}/>
                : item.icon
              }
              <ListItem.Content>
                <ListItem.Title>{item.label}</ListItem.Title>
                {item.desc && <ListItem.Subtitle>{item.desc}</ListItem.Subtitle>}
              </ListItem.Content>
              <ListItem.Chevron size={26}/>
            </ListItem>
          )}
          sections={this.props.items}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderWidth: 0,
    backgroundColor: '#efefef'
  },
  sectionTitle: {
    color: 'black',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 16,
    marginTop: 15,
    opacity: 0.8,
    fontWeight: 'bold'
  }
});
