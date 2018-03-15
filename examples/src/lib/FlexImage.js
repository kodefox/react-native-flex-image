// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';

type Cancellable = {
  cancel: () => void,
};

type Props = {
  source: number | {uri: string, width?: number, height?: number},
  style?: StyleType,
  loadingComponent?: ReactNode,
  onPress?: () => void,
  thumbnail?: number | {uri: string, width?: number, height?: number},
  loadingMethod?: 'indicator' | 'progressive',
};

type State = {
  isLoading: boolean,
  ratio: ?number,
  error: ?string,
  thumbnailOpacity: Animated.Value,
};

export default class FlexImage extends Component<Props, State> {
  _pendingGetSize: ?Cancellable;

  constructor(props: Props, ...args: Array<mixed>) {
    super(props, ...args);
    autobind(this);

    let {source, thumbnail, loadingMethod} = props;
    let ratio;
    let error;
    let isLoading = true;

    let src = thumbnail && loadingMethod === 'progressive' ? thumbnail : source;
    if (typeof src === 'number') {
      let imageSource = resolveAssetSource(src);
      if (imageSource) {
        let {width, height} = imageSource;
        if (width && height) {
          ratio = width / height;
        }
      } else {
        error = 'Error: Failed to retrieve width and height of the image';
      }
      isLoading = false;
    } else {
      this._pendingGetSize = getImageSize(
        src,
        this._onLoadSuccess,
        this._onLoadFail
      );
    }

    this.state = {
      ratio,
      isLoading,
      error,
      thumbnailOpacity: new Animated.Value(0),
    };
  }

  componentWillUnmount() {
    if (this._pendingGetSize) {
      this._pendingGetSize.cancel();
    }
  }

  render() {
    let {
      source,
      style,
      onPress,
      loadingComponent,
      thumbnail,
      loadingMethod,
      ...otherProps
    } = this.props;
    let {isLoading, ratio, error, thumbnailOpacity} = this.state;

    if (isLoading) {
      let loadingIndicator = loadingComponent || (
        <ActivityIndicator size="large" />
      );
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          {loadingIndicator}
        </View>
      );
    }

    if (error) {
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          <Text>{error}</Text>
        </View>
      );
    }

    let imageSource;
    if (typeof source === 'number') {
      imageSource = source;
    } else {
      // eslint-disable-next-line no-unused-vars
      let {uri, width, height, ...other} = source;
      imageSource = {uri, ...other};
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[{aspectRatio: ratio}, style]}
      >
        <Animated.Image
          {...otherProps}
          source={imageSource}
          style={{width: '100%', height: '100%', position: 'absolute'}}
          onLoad={this._onLoad}
        />
        {thumbnail &&
          loadingMethod === 'progressive' && (
            <Animated.Image
              {...otherProps}
              source={thumbnail}
              style={{
                width: '100%',
                height: '100%',
                opacity: thumbnailOpacity,
              }}
              onLoad={this._onThumbnailLoad}
              testID="progressiveThumbnail"
            />
          )}
      </TouchableOpacity>
    );
  }

  _onThumbnailLoad = () => {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
  };

  _onLoad = () => {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  _onLoadSuccess(width: number, height: number) {
    let ratio = width / height;
    this.setState({
      isLoading: false,
      ratio,
    });
  }

  _onLoadFail(error: Error) {
    this.setState({
      isLoading: false,
      error: 'Error: ' + error.message,
    });
  }
}

// A cancellable version of Image.getSize
export function getImageSize(
  source: {uri: string},
  onSuccess: (width: number, height: number) => void,
  onFail: (error: Error) => void
) {
  let isCancelled = false;
  Image.getSize(
    source.uri,
    (width: number, height: number) => {
      if (!isCancelled) {
        onSuccess(width, height);
      }
    },
    (error: Error) => {
      if (!isCancelled) {
        onFail(error);
      }
    }
  );
  return {
    cancel: () => {
      isCancelled = true;
    },
  };
}
