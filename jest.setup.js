/* eslint-env jest */

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  DarkTheme: {},
  DefaultTheme: {},
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({ children, style }) =>
      React.createElement(View, { style }, children),
    Swipeable: ({ children }) => children,
    RectButton: View,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));
