import React from 'react';
import { StatusBar, Platform } from 'react-native';

interface AppStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  translucent?: boolean;
  animated?: boolean;
}

const AppStatusBar: React.FC<AppStatusBarProps> = ({
  backgroundColor = '#FFFFFF',
  barStyle = 'dark-content',
  translucent = false,
  animated = true,
}) => {
  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      translucent={translucent}
      animated={animated}
    />
  );
};

export default AppStatusBar;