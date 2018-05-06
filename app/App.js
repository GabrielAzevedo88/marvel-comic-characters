import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import Navigation from './navigation/Navigation';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'red'}
        />
        <Navigation />
      </View>
    );
  }
}

AppRegistry.registerComponent('marvelcomiccharacters', () => App);
