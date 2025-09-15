import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./src/navigation/StackNavigator";
import Splash from './src/screens/Splash/Splash';
function App(): React.JSX.Element {
    const [isShowSplash,setIsShowSplash] = useState(true)
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(()=>{
          setTimeout(()=>{
            setIsShowSplash(false);
          },3000)
    },[]);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
            {isShowSplash ? <Splash/>: <StackNavigator />}
           
        </NavigationContainer>
    );
}

export default App;
