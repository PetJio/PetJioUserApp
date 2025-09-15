import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import signinstyles from './signin.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

// Define the navigation prop type
type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

// Define props interface for the component
interface SignInProps {
  navigation: SignInScreenNavigationProp;
}

const SignIn: React.FC<SignInProps> = ({navigation}) => {
    // Defensive check for navigation
    if (!navigation) {
      console.warn('SignIn: Navigation prop is undefined');
      return null;
    }

    return (
      <View style={signinstyles.container}>
        <Image source={images.signinImage} style={signinstyles.imagesize} />

        <View style={signinstyles.fixpositionButton}>
            <TouchableOpacity 
                style={signinstyles.loginbuttonSize}
                onPress={() => navigation.navigate('LogIn')}
            >
                <Text style={signinstyles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={signinstyles.registrationbuttonSize}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={[signinstyles.text, {color: '#58B9D0'}]}>Register As</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
};

export default SignIn;