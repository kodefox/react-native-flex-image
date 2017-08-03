// @flow

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import FlexImage from './FlexImage';

type State = {
  leftClickCount: number;
  rightClickCount: number;
};

export default class WithOnPressEvent extends Component {
  state: State;
  static navigationOptions = {
    title: 'With onPress Event',
  };

  constructor() {
    super(...arguments);

    this.state = {
      leftClickCount: 0,
      rightClickCount: 0,
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <View style={{flex: 1}}>
            <FlexImage
              source={{
                uri:
                  'http://images.all-free-download.com/images/graphiclarge/water_waterfall_nature_214751.jpg',
              }}
              onPress={() => {
                let {leftClickCount} = this.state;
                return this.setState({leftClickCount: leftClickCount + 1});
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <FlexImage
              source={{
                uri:
                  'http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_02_hd_picture_166206.jpg',
              }}
              onPress={() => {
                let {rightClickCount} = this.state;
                return this.setState({rightClickCount: rightClickCount + 1});
              }}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text>
            Left Image Click Count: {this.state.leftClickCount}
          </Text>
          <Text>
            Right Image Click Count: {this.state.rightClickCount}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    paddingTop: 20,
  },
});
