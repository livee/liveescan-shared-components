import React, { Component } from 'react';
import HeaderComponent from '../Header/index';
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  icons: {
    width: 50,
    height: 50
  },

  iosTitle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold'
  },
  iosSubtitle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    color: '#919191'
  },
  steps: {
    marginLeft: '25%',
    textAlign: 'center',
    marginTop: '10%'
  },
  step: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 10
  }
});

export default class PermissionsComponent extends Component {
  constructor() {
    super();
  }

  platformRendering(text) {
    return Platform.select({
      ios: (
        <View>
          <Text style={styles.iosTitle}>{text.title}</Text>
          <Text style={styles.iosSubtitle}>{text.subTitle}</Text>
          <View style={styles.steps}>
            {text.steps.map(step => (
              <View style={{ flexDirection: 'row', marginVertical: 20 }} key={step.label}>
                <Image source={step.img} style={{ width: 50, height: 50 }} />
                <Text style={styles.step}>{step.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ),
      android: (
        <View>
          <Text style={styles.iosTitle}>{text.title}</Text>
          <Text style={styles.iosSubtitle}>{text.subTitle}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#48B9B0',
                width: '50%',
                height: 60
              }}
              onPress={() => {
                this.componentWillMount();
              }}
            >
              <Text
                style={{
                  padding: 6,
                  fontSize: 30,
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                {text.authorize}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    });
  }

  render() {
    const { text } = this.props;
    return (
      <View>
        <HeaderComponent title={text.headerTitle} backgroundColor="#48B9B0" />
        {this.platformRendering(text)}
      </View>
    );
  }
}
