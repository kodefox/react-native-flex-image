// @flow

import {StackNavigator} from 'react-navigation';

import Main from './Main';
import SimpleImageList from './SimpleImageList';
import LocalImage from './LocalImage';
import CustomLoadingIndicator from './CustomLoadingIndicator';
import WithOnPressEvent from './WithOnPressEvent';

export default StackNavigator(
  {
    Main: {screen: Main},
    SimpleImageList: {screen: SimpleImageList},
    LocalImage: {screen: LocalImage},
    WithOnPressEvent: {screen: WithOnPressEvent},
    CustomLoadingIndicator: {screen: CustomLoadingIndicator},
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: {height: 50, paddingTop: 5, backgroundColor: 'white'},
      headerTitleStyle: {fontSize: 15},
    },
  }
);
