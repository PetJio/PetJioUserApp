import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface WhiteStatusBarProps {
  children: React.ReactNode;
}

const WhiteStatusBar: React.FC<WhiteStatusBarProps> = ({ children }) => {
  // Force white status bar immediately
  useEffect(() => {
    setWhiteStatusBar();
  }, []);

  // Force white status bar on focus
  useFocusEffect(
    React.useCallback(() => {
      setWhiteStatusBar();
    }, [])
  );

  const setWhiteStatusBar = () => {
    StatusBar.setBackgroundColor('#FFFFFF', false);
    StatusBar.setBarStyle('dark-content', false);
    console.log('🎨 WhiteStatusBar: Setting white background');
  };

  return (
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
        animated={false}
      />
      {children}
    </>
  );
};

export default WhiteStatusBar;