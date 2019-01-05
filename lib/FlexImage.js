import * as tslib_1 from "tslib";
import React, { Component } from 'react';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Animated, } from 'react-native';
export default class FlexImage extends Component {
    constructor() {
        super(...arguments);
        this._pendingGetSize = null;
        this.state = {
            isLoading: true,
            ratio: -1,
            error: '',
            thumbnailOpacity: new Animated.Value(0),
        };
        this._onThumbnailLoad = () => {
            Animated.timing(this.state.thumbnailOpacity, {
                toValue: 1,
                duration: 250,
            }).start();
        };
        this._onLoad = () => {
            Animated.timing(this.state.thumbnailOpacity, {
                toValue: 0,
                duration: 250,
            }).start();
        };
        this._onLoadSuccess = (width, height) => {
            let ratio = width / height;
            this.setState({
                isLoading: false,
                ratio,
            });
        };
        this._onLoadFail = (error) => {
            this.setState({
                isLoading: false,
                error: 'Error: ' + error.message,
            });
        };
    }
    componentDidMount() {
        let { source, thumbnail, loadingMethod } = this.props;
        let ratio = -1;
        let error = '';
        let isLoading = true;
        let src = thumbnail && loadingMethod === 'progressive' ? thumbnail : source;
        if (typeof src === 'number') {
            let imageSource = resolveAssetSource(src);
            if (imageSource) {
                let { width, height } = imageSource;
                if (width && height) {
                    ratio = width / height;
                }
            }
            else {
                error = 'Error: Failed to retrieve width and height of the image';
            }
            isLoading = false;
        }
        else {
            this._pendingGetSize = getImageSize(src, this._onLoadSuccess, this._onLoadFail);
        }
        this.setState({
            ratio,
            isLoading,
            error,
        });
    }
    componentWillUnmount() {
        if (this._pendingGetSize) {
            this._pendingGetSize.cancel();
        }
    }
    render() {
        let _a = this.props, { source, style, onPress, loadingComponent, thumbnail, loadingMethod, errorComponent } = _a, otherProps = tslib_1.__rest(_a, ["source", "style", "onPress", "loadingComponent", "thumbnail", "loadingMethod", "errorComponent"]);
        let { isLoading, ratio, error, thumbnailOpacity } = this.state;
        if (isLoading && loadingMethod !== 'progressive') {
            let loadingIndicator = loadingComponent || (<ActivityIndicator size="large"/>);
            return (<View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
          {loadingIndicator}
        </View>);
        }
        if (error) {
            return (<View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
          {errorComponent ? errorComponent : <Text>{error}</Text>}
        </View>);
        }
        let imageSource = null;
        if (typeof source === 'number') {
            imageSource = source;
        }
        else {
            // eslint-disable-next-line no-unused-vars
            let { uri, width, height } = source, other = tslib_1.__rest(source, ["uri", "width", "height"]);
            imageSource = Object.assign({ uri }, other);
        }
        return (<TouchableOpacity onPress={onPress} disabled={!onPress} style={[{ aspectRatio: ratio }, style]}>
        {thumbnail && loadingMethod === 'progressive' && (<Animated.Image {...otherProps} source={thumbnail} style={{
            width: '100%',
            height: '100%',
            opacity: thumbnailOpacity,
            zIndex: 1,
        }} onLoad={this._onThumbnailLoad} testID="progressiveThumbnail"/>)}
        <Animated.Image {...otherProps} source={imageSource} style={{ width: '100%', height: '100%', position: 'absolute' }} onLoad={this._onLoad}/>
      </TouchableOpacity>);
    }
}
// A cancellable version of Image.getSize
export function getImageSize(source, onSuccess, onFail) {
    let isCancelled = false;
    Image.getSize(source.uri, (width, height) => {
        if (!isCancelled) {
            onSuccess(width, height);
        }
    }, (error) => {
        if (!isCancelled) {
            onFail(error);
        }
    });
    return {
        cancel: () => {
            isCancelled = true;
        },
    };
}
