import React from 'react';
import FlexImage, {getImageSize} from '../FlexImage';
import renderer from 'react-test-renderer';

jest.mock('Image', () => ({
  getSize: jest.fn((uri, callback) => {
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
    constructor(value) {
      return {
        interpolate: () => value,
        __getValue: () => value,
      };
    }
  },
  timing: jest.fn(() => ({
    start: (callback) => callback && callback(),
  })),
}));

function findElement(json, testID) {
  if (json) {
    if (json.props && json.props.testID === testID) {
      return json;
    } else if (json.children && json.children.length > 0) {
      for (let x of json.children) {
        let result = findElement(x, testID);
        if (result) {
          return result;
        }
      }
    }
  }
}

it('should render thumbnail when loadingMethod is progressive', () => {
  let component = renderer.create(
    <FlexImage
      source={{
        uri: 'https://i.imgur.com/v0Y4Jfu.jpg',
      }}
      thumbnail={{uri: 'https://i.imgur.com/ngVArkT.jpg'}}
      loadingMethod="progressive"
    />
  );
  component.getInstance()._onLoadSuccess();
  let element = findElement(component.toJSON(), 'progressiveThumbnail');
  const anonymous = () => jest.fn();
  let props = {
    source: {uri: 'https://i.imgur.com/ngVArkT.jpg'},
    style: {
      width: '100%',
      height: '100%',
      opacity: {
        interpolate: () => jest.fn(),
        __getValue: () => jest.fn(),
      },
    },
    onLoad: anonymous,
    testID: 'progressiveThumbnail',
  };
  expect(Object.keys(element)).toEqual(['type', 'props', 'children']);
  expect(element.type).toBe('Animated.Image');
  expect(JSON.stringify(element.props)).toEqual(JSON.stringify(props));
  expect(element.children).toBeNull();
});

it('should run onSuccess function when width and height are resolved', async() => {
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
