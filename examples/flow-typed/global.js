// @flow
import React from 'react';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// eslint-disable-next-line no-undef
declare type StyleType = StyleObj;

declare type ReactNode =
  | null
  | string
  | number
  | React.Element<*>
  | Array<string | number | React.Element<*>>;
