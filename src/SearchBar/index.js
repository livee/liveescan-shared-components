import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, StyleSheet, Text, Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from '../Icon';
import Utils from '../utils';
const { concat, Value, interpolate } = Animated;
const { Animate } = Utils;
export default class SearchBar extends Component {
  state = {
    showCancelButton: false
  };
  /* 100 = hide, 0 = show */
  searchBarAnimation = new Value(100);
  searchBarFrames = Animate.createAnimation(100, this.searchBarAnimation);

  /* 100 = hide, 0 = show */
  clearBarAnimation = new Value(100);
  clearBarFrames = Animate.createAnimation(100, this.clearBarAnimation, 100);

  opacity = interpolate(this.searchBarFrames, {
    inputRange: [0, 100],
    outputRange: [1, 0]
  });

  searchWidth = interpolate(this.searchBarFrames, {
    inputRange: [0, 100],
    outputRange: [70, 90]
  });

  clearOpacity = interpolate(this.clearBarFrames, {
    inputRange: [0, 100],
    outputRange: [1, 0]
  });

  clearWidth = interpolate(this.clearBarFrames, {
    inputRange: [0, 100],
    outputRange: [20, 15]
  });

  clearScale = interpolate(this.clearBarFrames, {
    inputRange: [0, 100],
    outputRange: [1, 0]
  });

  inputWidth = interpolate(this.clearBarFrames, {
    inputRange: [0, 100],
    outputRange: [80, 100]
  });

  constructor(props) {
    super(props);
    /* hide the cancel button when keyboard is dismissed */
    this.keyboardEvent = Keyboard.addListener('keyboardDidHide', () => this.hideCancelButton());
  }

  componentWillUnmount() {
    this.keyboardEvent.remove();
  }

  onCancelSearch() {
    this.onChangeText('');
    this.hideCancelButton();
    Keyboard.dismiss();
  }

  hideCancelButton() {
    this.searchBarAnimation.setValue(100);
    this.setState({ showCancelButton: false });
  }
  onSearchTouch() {
    this.searchBarAnimation.setValue(0);
    this.setState({ showCancelButton: true });
    this.showHideClearButton(this.props.searchPattern);
  }

  showHideClearButton(text) {
    if (text === '') {
      this.clearBarAnimation.setValue(100);
    } else {
      this.clearBarAnimation.setValue(0);
    }
  }
  onChangeText(text) {
    this.props.onChangeText(text);
    if (text !== '' && this.state.showCancelButton === false) {
      this.setState({ showCancelButton: true });
    }
    this.showHideClearButton(text);
  }

  render() {
    const { t } = this.props;
    const progressStyle = {
      width: concat(this.searchWidth, '%')
    };
    const cancelStyle = {
      opacity: this.opacity,
      visibility: this.state.showCancelButton ? 'visible' : 'collapse'
    };

    const showClearButton = this.state.showCancelButton && this.props.searchPattern !== '';

    const clearWidth = {
      opacity: this.clearOpacity,
      visibility: showClearButton ? 'visible' : 'collapse',
      transform: [{ scale: this.clearScale }],
      width: concat(this.clearWidth, '%')
    };

    const inputCalculatedStyle = {
      ...styles.searchInput,
      width: concat(this.inputWidth, '%'),
      borderRightWidth: this.clearOpacity
    };

    return (
      <View style={styles.searchWrapper}>
        <Animated.View style={[styles.inputBorder, progressStyle]}>
          <Animated.View style={inputCalculatedStyle}>
            <TextInput
              style={{ height: 30 }}
              value={this.props.searchPattern}
              onFocus={() => this.onSearchTouch()}
              onChangeText={text => this.onChangeText(text)}
              placeholder={this.props.searchText}
            />
          </Animated.View>
          <Animated.View style={[styles.clearSearch, clearWidth]}>
            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0)'}
              style={styles.clearSearchHighlight}
              onPress={() => this.onChangeText('')}
            >
              <Icon code={'\u{e9b9}'} iconStyle={{ color: '#212121', fontSize: 20 }} />
            </TouchableHighlight>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[{}, cancelStyle]}>
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,0)'}
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
    borderColor: '#dedede',
    width: '95%',
    borderRadius: 15,
    borderWidth: 1
  },
  searchInput: {
    padding: 5,
    paddingLeft: 10,
    width: '80%',
    height: 40,
    borderColor: '#dedede',
    borderRightWidth: 1
  },
  clearSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '15%',
    flex: 1,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  clearSearchHighlight: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    flex: 1
  },

  cancelSearch: {
    marginLeft: '5%',
    marginTop: 20,
    opacity: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
