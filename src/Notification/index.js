import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Icon from '../Icon';
import Triangle from '../Triangle';
import { zIndexWorkaround as zIndex } from './workarounds';

const defaultIcons = {
  error: '\u{e9f3}',
  success: '\u{e9c4}',
  warning: '\u{e918}'
};

const defaultColors = {
  error: '#FF2C2C',
  success: '#00BB0C',
  warning: '#FFB300'
};

/**
 * Props:
 * position: top | bottom
 * duration: the time to show the notification
 * type: success | error | warning
 * onDismissClick: event fired when the notification must be closed
 */
class Notification extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();

    setTimeout(() => {
      this.destroyNotifcation();
    }, this.props.duration || 4000);
  }

  destroyNotifcation() {
    this.props.onDismissClick();
  }

  render() {
    const { position, text, type, translate } = this.props;
    const { fadeAnim } = this.state;

    const colors = { ...defaultColors, ...this.props.colors };
    const icons = { ...defaultIcons, ...this.props.icons };

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={[styles.container, styles[position]]}
          pointerEvents="none"
          onPress={() => this.destroyNotifcation()}
        >
          <View style={[styles.content]}>
            <View style={[styles.leftBar, { backgroundColor: colors[type] }]} />
            <Icon code={icons[type]} iconStyle={[styles.icon, { color: colors[type] }]} />
            <Text style={[styles.text, { color: colors[type] }]}>
              {typeof text === 'string' ? translate(text) : text}
            </Text>
          </View>
          {position === 'bottom' && <Triangle style={styles.triangleDown} />}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    ...zIndex(11)
  },
  content: {
    borderRadius: 5,
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'white',
    elevation: 5
  },
  triangleDown: {
    transform: [{ rotate: '180deg' }],
    height: 10
  },
  leftBar: {
    // This view is used as a workaround with the shadow and border bug in react-native for iPad.
    width: 6,
    backgroundColor: 'red',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  text: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    margin: 10,
    flexWrap: 'wrap'
  },
  icon: {
    marginLeft: 10,
    fontWeight: '200'
  },
  // Custom styles:
  top: {
    top: height * 0.15
  },
  bottom: {
    top: height * 0.8
  }
});

export default Notification;
