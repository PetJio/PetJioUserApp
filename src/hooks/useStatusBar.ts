import { useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface UseStatusBarOptions {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  animated?: boolean;
}

export const useStatusBar = (options: UseStatusBarOptions = {}) => {
  const {
    backgroundColor = '#FFFFFF',
    barStyle = 'dark-content',
    animated = true,
  } = options;

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(backgroundColor, animated);
        StatusBar.setBarStyle(barStyle, animated);
      } else {
        StatusBar.setBarStyle(barStyle, animated);
      }
    }, [backgroundColor, barStyle, animated])
  );
};

export default useStatusBar;