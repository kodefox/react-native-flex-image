// @flow

import {StackNavigator} from 'react-navigation';

import Main from './Main';
import SimpleImageList from './SimpleImageList';
import LocalImage from './LocalImage';
import CustomLoadingIndicator from './CustomLoadingIndicator';
import WithOnPressEvent from './WithOnPressEvent';
import ProgressiveImage from './ProgressiveImage';

export default StackNavigator(
  {
    Main: {screen: Main},
    SimpleImageList: {screen: SimpleImageList},
    LocalImage: {screen: LocalImage},
    WithOnPressEvent: {screen: WithOnPressEvent},
    CustomLoadingIndicator: {screen: CustomLoadingIndicator},
    ProgressiveImage: {screen: ProgressiveImage},
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: {height: 50, paddingTop: 5, backgroundColor: 'white'},
      headerTitleStyle: {fontSize: 15},
    },
  }
);
