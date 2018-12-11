import React from 'react';
import {View, StyleSheet} from 'react-native';

import Routes from './routes';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
});
