// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';

import FlexImage from './lib/FlexImage';

export default function LocalImage() {
  return (
    <View style={styles.root}>
      <View style={styles.flex}>
        <FlexImage source={require('./assets/react-logo.png')} />
      </View>
      <View style={styles.flex}>
        <FlexImage source={require('./assets/yarn-logo.jpg')} />
      </View>
    </View>
  );
}

LocalImage.navigationOptions = {
  title: 'Local Image',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});
