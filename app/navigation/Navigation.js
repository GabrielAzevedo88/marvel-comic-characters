import React from 'react';
import { StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharactersList from '../containers/CharactersList';
import CharacterDescription from '../containers/CharacterDescription';
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
            title: 'Marvel Characters',
            headerTintColor: 'white',
            headerStyle: styles.header,
        },
    },
  CharacterDescription: {
        screen: mapNavStateToProps(CharacterDescription),
        navigationOptions: {
            title: 'Description',
            headerTintColor: 'white',
            headerStyle: styles.header,
        },
    },
});

export default AppNavigator;
