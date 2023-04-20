import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, StyleSheet, Text, Keyboard } from 'react-native';
import Icon from '../Icon';

export default class SearchBar extends Component {
  state = {
    showCancelButton: false
  };
  opacity = 0;
  searchWidth = 90;
  clearOpacity = 1;
  clearWidth = 20;
  clearScale = 1;
  inputWidth = 80;

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
    this.searchWidth = 90;
    this.opacity = 0;

    this.setState({ showCancelButton: false });
  }

  onSearchTouch() {
    this.searchWidth = 70;
    this.opacity = 1;

    this.setState({ showCancelButton: true });
    this.showHideClearButton(this.props.searchPattern);
  }

  showHideClearButton(text) {
    if (text === '') {
      this.clearOpacity = 0;
      this.clearWidth = 15;
      this.clearScale = 0;
      this.inputWidth = 100;
    } else {
      this.clearOpacity = 1;
      this.clearWidth = 20;
      this.clearScale = 1;
      this.inputWidth = 80;
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
    const progressStyle = {
      width: `${this.searchWidth}%`
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
      width: `${this.clearWidth}%`
    };

    const inputCalculatedStyle = {
      ...styles.searchInput,
      width: `${this.inputWidth}%`,
      borderRightWidth: this.clearOpacity
    };

    return (
      <View style={styles.searchWrapper}>
        <View style={[styles.inputBorder, progressStyle]}>
          <View style={inputCalculatedStyle}>
            <TextInput
              style={{ height: 30 }}
              value={this.props.searchPattern}
              onFocus={() => this.onSearchTouch()}
              onChangeText={text => this.onChangeText(text)}
              placeholder={this.props.searchText}
            />
          </View>
          <View style={[styles.clearSearch, clearWidth]}>
            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0)'}
              style={styles.clearSearchHighlight}
              onPress={() => this.onChangeText('')}
            >
              <Icon code={'\u{e9b9}'} iconStyle={{ color: '#212121', fontSize: 20 }} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={[{}, cancelStyle]}>
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,0)'}
            style={styles.cancelSearch}
            onPress={() => this.onCancelSearch()}
          >
            <Text>{this.props.cancelText}</Text>
          </TouchableHighlight>
        </View>
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
  },
  inputBorder: {
    marginTop: 0,
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
    // marginTop: 20,
    opacity: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
