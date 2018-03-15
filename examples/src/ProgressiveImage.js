// @flow

import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

import FlexImage from './lib/FlexImage';

export default function ProgressiveImage() {
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
          uri: 'https://i.imgur.com/v0Y4Jfu.jpg',
        }}
        thumbnail={{uri: 'https://i.imgur.com/ngVArkT.jpg'}}
        loadingMethod="progressive"
        loadingComponent={<ActivityIndicator size="large" color="red" />}
      />
    </View>
  );
}

ProgressiveImage.navigationOptions = {
  title: 'Progressive Image',
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
