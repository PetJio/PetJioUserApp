import React from 'react';
import { View, Text,Image } from 'react-native';
import googlemapstyles from './googlemap.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';

const GoogleMap: React.FC = () => {
    return (
        <View style={googlemapstyles.container}>
           <Image source={images.googleMap}/>
        </View>
    );
};

export default GoogleMap;
