// @flow

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  navigation: {navigate: (route: string) => void};
};

export default function Main(props: Props) {
  let {navigation} = props;
  return (
    <View style={styles.root}>
      <Text style={styles.title}>React Native Flex Image</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SimpleImageList')}
        style={[styles.button, {backgroundColor: '#2196F3'}]}
      >
        <Text style={styles.text}>Simple Image List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LocalImage')}
        style={[styles.button, {backgroundColor: '#009688'}]}
      >
        <Text style={styles.text}>Local Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('WithOnPressEvent')}
        style={[styles.button, {backgroundColor: '#FF5722'}]}
      >
        <Text style={styles.text}>With onPress Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('CustomLoadingIndicator')}
        style={[styles.button, {backgroundColor: '#E91E63'}]}
      >
        <Text style={styles.text}>Custom Loading Indicator</Text>
      </TouchableOpacity>
    </View>
  );
}

Main.navigationOptions = {
  title: 'Example Menu',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});
