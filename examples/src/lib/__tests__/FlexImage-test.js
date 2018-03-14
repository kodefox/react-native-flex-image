import {getImageSize} from '../FlexImage';

jest.mock('react-native', () => ({
  Image: {
    getSize: jest.fn((uri, callback) => {
      setTimeout(() => {
        callback(200, 300);
      }, 1);
    }),
  },
}));

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
