import React, { Component } from 'react';
import HeaderComponent from '../Header/index';
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    marginRight: '5%'
  },

  iosTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '5%',
    fontWeight: 'bold'
  },
  iosSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    color: '#919191'
  },
  step: {
    fontSize: 14,
    flexDirection: 'row',
    marginBottom: '5%',
    alignItems: 'center'
  },
  steps: {
    flexDirection: 'column'
  }
});

export default class PermissionsComponent extends Component {
  constructor() {
    super();
  }

  platformRendering(text) {
    return Platform.select({
      ios: (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.steps}>
            {text.iosSteps.map(step => (
              <View style={styles.step} key={step.label}>
                <Image source={step.img} style={styles.icons} />
                <Text>{step.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ),
      android: (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.steps}>
            {text.androidSteps.map(step => (
              <View style={styles.step} key={step.label}>
                <Image source={step.img} style={styles.icons} />
                <Text>{step.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )
    });
  }

  render() {
    const { text, primaryColor } = this.props;
    return (
      <View>
        <HeaderComponent title={text.headerTitle} backgroundColor={primaryColor} />
        <Text style={styles.iosTitle}>{text.title}</Text>
        <Text style={styles.iosSubtitle}>{text.subTitle}</Text>
        {this.platformRendering(text)}
      </View>
    );
  }
}
