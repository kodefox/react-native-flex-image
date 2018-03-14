// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';

import FlexImage from './lib/FlexImage';

export default function SimpleImageList() {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <FlexImage
            source={{
              uri:
                'http://images.all-free-download.com/images/graphiclarge/water_waterfall_nature_214751.jpg',
            }}
          />
        </View>
        <View style={styles.flex}>
          <FlexImage
            source={{
              uri:
                'http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_02_hd_picture_166206.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <FlexImage
            source={{
              uri:
                'http://images.all-free-download.com/images/graphiclarge/canoe_water_nature_221611.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <FlexImage
            source={{
              uri:
                'http://media.istockphoto.com/photos/lake-moraine-in-banff-national-park-alberta-canada-picture-id480195516?k=6&m=480195516&s=612x612&w=0&h=HcFzi__-zA4GMGjwNAOwqHMTn8yY-WaUwsZDYhRH-nQ=',
            }}
          />
        </View>
        <View style={styles.flex}>
          <FlexImage
            source={{
              uri:
                'http://www.top13.net/wp-content/uploads/2012/01/Dark-Hedges-along-Bregagh-Road-in-Northern-Ireland.jpg',
            }}
          />
        </View>
        <View style={styles.flex}>
          <FlexImage
            source={{
              uri:
                'http://webneel.com/daily/sites/default/files/images/daily/10-2013/21-nature-picture-forest.preview.jpg',
            }}
          />
        </View>
      </View>
    </View>
  );
}

SimpleImageList.navigationOptions = {
  title: 'Simple Image List',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});
