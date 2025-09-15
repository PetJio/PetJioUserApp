import React from 'react';
import { View, Text,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../assets/images';
import splashstyles from './splash.styles';


const Splash: React.FC = () => {
    return (

        <LinearGradient colors={['#F5EDEE', '#E4FCFF',]} style={splashstyles.container}>
            <Image source={images.petjioLogo}/>
        </LinearGradient>
    );
};

export default Splash;
