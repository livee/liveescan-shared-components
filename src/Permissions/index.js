import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../Header/index';

const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    marginRight: 15
  },
  step: {
    fontSize: 14,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
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
          <View>
            {text.iosSteps.map(step => (
              <View style={styles.step} key={step.label}>
                <Image source={step.img} style={styles.icons} />
                <Text
                  style={{ fontSize: 16, color: '#505050' }}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ),
      android: (
        <View style={{ alignItems: 'center' }}>
          <View>
            {text.androidSteps.map(step => (
              <View style={styles.step} key={step.label}>
                <Image source={step.img} style={styles.icons} />
                <Text style={{ fontSize: 16, color: '#505050' }}> {step.label}</Text>
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
      <View style={{ flexGrow: 1, backgroundColor: 'white' }}>
        <HeaderComponent title={text.headerTitle} backgroundColor={primaryColor} />
        <View
          style={{
            flexGrow: 1,
            paddingHorizontal: 15,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: 20,
              textAlign: 'center',
              color: primaryColor,
            }}
          >
            {text.title}
          </Text>
          <Text
            style={{
              marginBottom: 30,
              textAlign: 'center',
              color: '#919191'
            }}
          >
            {text.subTitle}
          </Text>
          {this.platformRendering(text)}
        </View>
      </View>
    );
  }
}
