// @flow

import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

import FlexImage from './lib/FlexImage';

export default function CustomLoadingIndicator() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        This load an image with dimension 3000 x 2000. It might take some time
        to load.
      </Text>
      <Text style={styles.text}>
        This loading component use ActivityIndicator with large size and red
        color
      </Text>
      <FlexImage
        source={{
          uri:
            'http://www.planwallpaper.com/static/images/hd_nature_wallpaper.jpg',
        }}
        loadingComponent={<ActivityIndicator size="large" color="red" />}
      />
    </View>
  );
}

CustomLoadingIndicator.navigationOptions = {
  title: 'Custom Loading Indicator',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    padding: 20,
    marginBottom: 20,
  },
});
