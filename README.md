# react-native-flex-image

A flexible-width <Image> component for React Native using `aspectRatio`

## Installation

**Note: Only for React Native version >= 0.40.0**

```
$ yarn add react-native-flex-image
```

 -- or --

 ```
 $ npm install react-native-flex-image --save
 ```

## Usage

Use `<FlexImage>` to display an image sized to the full-width of its parent while maintaining the correct ratio, without explicitly defining the width and height. FlexImage supports local images (asset) and remote images (uri).

Also supports loading indicator for remote images.

## Demo

Expo demo: https://exp.host/@kfox/react-native-flex-image

#### Simple Example

```js
import FlexImage from 'react-native-flex-image';

function App() {
  return (
    <View style={{flex: 1}}>
      <FlexImage
        source={{
          uri: 'image source uri',
        }}
      />
    </View>
  );
}
```

#### Local Image
```js
import FlexImage from 'react-native-flex-image';

function App() {
  return (
    <View style={{flex: 1}}>
      <FlexImage source={require('./assets/react-logo.png')} />
    </View>
  );
}
```

#### With onPress Event
```js
import FlexImage from 'react-native-flex-image';

function App() {
  return (
    <View style={{flex: 1}}>
      <FlexImage
        source={{
          uri: 'https://example.com/path/to/my/image',
        }}
        onPress={() => {
          let {imageClickCount} = this.state;
          this.setState({
            imageClickCount: imageClickCount + 1,
          });
         }}
      />
    </View>
  );
}
```

#### Custom Loading Component
```js
import FlexImage from 'react-native-flex-image';

function App() {
  return (
    <View style={{flex: 1}}>
      <FlexImage
        source={{
          uri: 'image source uri',
        }}
        loadingComponent={
          <ActivityIndicator size="large" color="red" />
        }
      />
    </View>
  );
}
```

#### Progressive Loading Component
```js
import FlexImage from 'react-native-flex-image';

function App() {
  return (
    <View style={{flex: 1}}>
      <FlexImage
        source={{
          uri: 'image source uri',
        }}
        thumbnail={{uri: 'thumbnail image source uri'}}
        loadingMethod="progressive"
      />
    </View>
  );
}
```

## Properties
*Note: Other properties will be passed down to underlying image component.*

| Prop | Type | Description | Default |
|---|---|---|---|
|**`source`**|required|source of the image|*None*|
|**`onPress`**|optional|onPress event when user clicking the image|`null`|
|**`style`**|optional|custom style for the image container |`null`|
|**`loadingComponent`**|optional|custom loading indicator when render the image |`<ActivityIndicator animating={true} size="large" />`|
|**`thumbnail`**|optional|source of the thumbnail|*None*|
|**`loadingMethod`**|optional|enum for select loading method, using `indicator` or `progressive`|`indicator`|


## License

[MIT License](http://opensource.org/licenses/mit-license.html). ©2017 - current, KodeFox, Inc.
