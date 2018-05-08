import React from 'react';
import { StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharactersList from '../containers/CharactersList';
import {  mapNavStateToProps } from '../functions/commons';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
  },
});

const AppNavigator = StackNavigator({
  CharactersList: {
    screen: CharactersList,
    navigationOptions: {
      title: 'Marvel comic characters',
      headerTintColor: 'white',
      headerStyle: styles.header,
    },
  },
});

export default AppNavigator;
