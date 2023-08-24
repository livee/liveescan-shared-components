import React, { Component } from 'react';
import { Text, View, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from '../Icon';

export default class SettingsList extends Component {
  render() {
    return (
      <View style={{
        flexGrow: 1,
        backgroundColor: 'white'
      }}>
        <SectionList
          keyExtractor={item => item.label}
          renderSectionHeader={({ section }) => (
            <View>
              <Text style={{
                marginBottom: 10,
                marginTop: 20,
                marginHorizontal: 15,
                fontSize: 20,
                color: this.props.titleColor || 'black',
              }}
              >{section.label}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <ListItem bottomDivider topDivider onPress={() => this.props.onPress(item)}>
              {typeof item.icon === 'string'
                ?  <Icon name={item.icon}/>
                : item.icon
              }
              <ListItem.Content>
                <ListItem.Title>{item.label}</ListItem.Title>
                {item.desc && <ListItem.Subtitle>{item.desc}</ListItem.Subtitle>}
              </ListItem.Content>
              {!item.hideChevron && <ListItem.Chevron size={26} />}
            </ListItem>
          )}
          sections={this.props.items}
        />
      </View>
    );
  }
}
