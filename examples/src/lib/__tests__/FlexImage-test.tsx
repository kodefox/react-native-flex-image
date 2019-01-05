import React from 'react';
import FlexImage, {getImageSize} from '../FlexImage';
import {render} from 'react-native-testing-library';

type Callback = (width: number, height: number) => void;

jest.mock('Image', () => ({
  getSize: jest.fn((_uri: string, callback: Callback) => {
    setTimeout(() => {
      callback(200, 300);
    }, 1);
  }),
}));

jest.mock('Animated', () => ({
  Image: 'Animated.Image',
  View: 'Animated.View',
  createTimer: jest.fn(),
  Value: class AnimatedValue {
    constructor(value: string) {
      return {
        interpolate: () => value,
        __getValue: () => value,
      };
    }
  },
  timing: jest.fn(() => ({
    start: (callback: Callback) => callback && callback(200, 300),
  })),
}));

it('should render thumbnail when loadingMethod is progressive', () => {
  let component = render(
    <FlexImage
      source={{
        uri: 'https://i.imgur.com/v0Y4Jfu.jpg',
      }}
      thumbnail={{uri: 'https://i.imgur.com/ngVArkT.jpg'}}
      loadingMethod="progressive"
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('should run onSuccess function when width and height are resolved', async () => {
  let onSuccess;
  let onFailed;
  await new Promise((resolve, reject) => {
    let source = {uri: 'imageURI'};
    onSuccess = jest.fn(resolve);
    onFailed = jest.fn(reject);
    getImageSize(source, onSuccess, onFailed);
  });
  expect(onSuccess).toHaveBeenCalledWith(200, 300);
  expect(onFailed).not.toHaveBeenCalled();
});

it('should not run onSuccess function when isCancelled is true', () => {
  let source = {uri: 'imageURI'};
  let onSuccess = jest.fn();
  let onFailed = jest.fn();
  let {cancel} = getImageSize(source, onSuccess, onFailed);
  cancel();
  expect(onSuccess).not.toHaveBeenCalled();
});
