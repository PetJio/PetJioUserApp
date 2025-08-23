module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Worklets plugin (moved from react-native-reanimated). Must be listed last.
    'react-native-worklets/plugin',
  ],
};
