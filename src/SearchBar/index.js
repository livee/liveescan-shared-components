import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, StyleSheet, Text, Keyboard } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';

const {
  set,
  cond,
  concat,
  startClock,
  stopClock,
  clockRunning,
  block,
  timing,
  interpolate,
  debug,
  Value,
  Clock
} = Animated;

const inputRange = [70, 90];
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 250,
    toValue: dest,
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position
  ]);
}

export default class SearchBar extends Component {
  state = {
    showCancelButton: false,
    searchWidth: new Animated.Value(90)
  };

  searchClock = new Clock();
  searchProgress = new Value(90);
  searchBarAnimation = new Value(90);
  searchBarFrames = runTiming(this.searchClock, this.searchProgress, this.searchBarAnimation);
  opacity = interpolate(this.searchBarFrames, {
    inputRange: inputRange,
    outputRange: [1, 0]
  });

  clearWidth = interpolate(this.searchBarFrames, {
    inputRange: inputRange,
    outputRange: [20, 15]
  });

  inputWidth = interpolate(this.searchBarFrames, {
    inputRange: inputRange,
    outputRange: [80, 100]
  });

  constructor(props) {
    super(props);
  }

  onCancelSearch() {
    this.props.onChangeText('');
    this.searchBarAnimation.setValue(90);
    this.setState({ showCancelButton: false });
    Keyboard.dismiss();
  }

  onSearchTouch() {
    this.searchBarAnimation.setValue(70);
    this.setState({ showCancelButton: true });
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    if (text !== '' && this.state.showCancelButton === false) {
      this.setState({ showCancelButton: true });
    }
  }

  render() {
    const { t } = this.props;
    const progressStyle = {
      width: concat(this.searchBarFrames, '%')
    };
    const cancelStyle = {
      opacity: this.opacity,
      visibility: this.state.showCancelButton ? 'visible' : 'collapse'
    };

    const clearWidth = {
      ...cancelStyle,
      width: concat(this.clearWidth, '%'),
      opacity: this.opacity
    };

    const inputCalculatedStyle = {
      ...styles.searchInput,
      width: concat(this.inputWidth, '%'),
      borderRightWidth: this.state.showCancelButton ? 1 : 0
    };

    return (
      <View style={styles.searchWrapper}>
        <Animated.View style={[styles.inputBorder, progressStyle]}>
          <Animated.View style={inputCalculatedStyle}>
            <TextInput
              value={this.props.searchPattern}
              onFocus={() => this.onSearchTouch()}
              onChangeText={text => this.onChangeText(text)}
              placeholder={this.props.searchText}
            />
          </Animated.View>
          <Animated.View style={[styles.clearSearch, clearWidth]}>
            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.1)'}
              style={styles.clearSearchHighlight}
              onPress={() => this.onChangeText('')}
            >
              <Ionicons name="md-close" size={20} color="#212121" />
            </TouchableHighlight>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[{}, cancelStyle]}>
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,0.1)'}
            style={styles.cancelSearch}
            onPress={() => this.onCancelSearch()}
          >
            <Text>{this.props.cancelText}</Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    width: '95%',
    marginLeft: '5%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputBorder: {
    marginTop: 20,
    justifyContent: 'flex-start',
    marginLeft: '2.5%',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#9e9e9e',
    width: '95%',
    borderRadius: 15,
    borderWidth: 1
  },
  searchInput: {
    padding: 10,
    width: '80%',
    borderColor: '#9e9e9e',
    borderRightWidth: 1
  },
  clearSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '15%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 14
  },
  clearSearchHighlight: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cancelSearch: {
    marginLeft: '5%',
    marginTop: 20,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
