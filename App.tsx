import { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import Splash from './src/screens/Splash/Splash';
import colors from './src/styles/colors';

const App = () => {
  // const [showSplash, setShowSplash] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Status bar configuration
  const statusBarConfig = {
    backgroundColor: Platform.OS === 'android' ? (isDarkMode ? colors.gray900 : colors.white) : 'transparent',
    barStyle: isDarkMode ? 'light-content' : 'dark-content' as 'default' | 'light-content' | 'dark-content',
    translucent: Platform.OS === 'android'
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (showSplash) {
  //   return (
  //     <SafeAreaProvider>
  //       <StatusBar
  //         backgroundColor={statusBarConfig.backgroundColor}
  //         barStyle={statusBarConfig.barStyle}
  //         translucent={statusBarConfig.translucent}
  //       />
  //       <Splash />
  //     </SafeAreaProvider>
  //   );
  // }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={statusBarConfig.backgroundColor}
        barStyle={statusBarConfig.barStyle}
        translucent={statusBarConfig.translucent}
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
