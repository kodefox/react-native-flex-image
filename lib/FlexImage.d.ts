import { Component, ReactNode } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
declare type Cancellable = {
    cancel: () => void;
};
declare type Source = number | {
    uri: string;
    width?: number;
    height?: number;
};
declare type Props = {
    source: Source;
    style?: StyleProp<ViewStyle>;
    loadingComponent?: ReactNode;
    onPress?: () => void;
    thumbnail?: Source;
    loadingMethod?: 'spinner' | 'progressive';
    errorComponent?: ReactNode;
};
declare type State = {
    isLoading: boolean;
    ratio: number;
    error: string;
    thumbnailOpacity: Animated.Value;
};
export default class FlexImage extends Component<Props, State> {
    _pendingGetSize: Cancellable | null;
    state: {
        isLoading: boolean;
        ratio: number;
        error: string;
        thumbnailOpacity: Animated.Value;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    _onThumbnailLoad: () => void;
    _onLoad: () => void;
    _onLoadSuccess: (width: number, height: number) => void;
    _onLoadFail: (error: Error) => void;
}
export declare function getImageSize(source: {
    uri: string;
}, onSuccess: (width: number, height: number) => void, onFail: (error: Error) => void): {
    cancel: () => void;
};
export {};
