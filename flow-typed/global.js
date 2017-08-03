// @flow
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// eslint-disable-next-line no-undef
declare type StyleType = StyleObj;

declare type ReactNode =
  | null
  | string
  | number
  | ReactElement<*>
  | Array<string | number | ReactElement<*>>;
