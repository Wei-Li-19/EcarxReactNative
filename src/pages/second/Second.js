import React, { Component } from 'react';
import {StyleSheet,Text,View,} from 'react-native';
import { SafeAreaView } from 'react-navigation';


export default class Second extends Component {




  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>
          Second
        </Text>
      </SafeAreaView>
    );
  }

};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
