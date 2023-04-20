import { Platform } from 'react-native';

// zIndex does not work with dynamic components on Android
// See: https://github.com/facebook/react-native/issues/8968
export function zIndexWorkaround(val) {
  return Platform.select({
    ios: { zIndex: val },
    android: { zIndex: val }
  });
}
