// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import resolveAssetSource from 'resolveAssetSource';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

type Props = {
  source: number | {uri: string; width?: number; height?: number};
  initialRatio?: number;
  style?: StyleSheetTypes;
  loadingComponent?: ReactElement<*>;
  onPress?: () => void;
};

type State = {
  isLoading: boolean;
  ratio: ?number;
  error: ?string;
};

export default class FlexImage extends Component {
  props: Props;
  state: State;
  _pendingGetSize: ?{cancel: () => void};

  constructor() {
    super(...arguments);
    autobind(this);

    let {source} = this.props;
    let ratio;
    let error;
    let isLoading = true;

    if (typeof source === 'number') {
      let imageSource = resolveAssetSource(source);
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
        source,
        this._onLoadSuccess,
        this._onLoadFail
      );
    }

    this.state = {
      ratio,
      isLoading,
      error,
    };
  }

  componentWillUnmount() {
    if (this._pendingGetSize) {
      this._pendingGetSize.cancel();
    }
  }

  render() {
    let {source, style, onPress, loadingComponent, ...otherProps} = this.props;
    let {isLoading, ratio, error} = this.state;
    let component;

    if (isLoading) {
      let loadingIndicator =
        loadingComponent || <ActivityIndicator animating={true} size="large" />;
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          {loadingIndicator}
        </View>
      );
    }

    if (error) {
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          <Text>
            {error}
          </Text>
        </View>
      );
    }

    let imageSource;
    if (typeof source === 'number') {
      imageSource = source;
    } else {
      let {uri, width, height, ...other} = source; // eslint-disable-line
      imageSource = {uri, ...other};
    }

    component = (
      <View style={[{aspectRatio: ratio}, style]}>
        <Image
          {...otherProps}
          source={imageSource}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {component}
        </TouchableOpacity>
      );
    } else {
      return component;
    }
  }

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
  onSuccess: Function,
  onFail: Function
) {
  let isCancelled = false;
  Image.getSize(
    source.uri,
    (...args) => {
      if (!isCancelled) {
        onSuccess(...args);
      }
    },
    (...args) => {
      if (!isCancelled) {
        onFail(...args);
      }
    }
  );
  return {
    cancel: () => {
      isCancelled = true;
    },
  };
}
