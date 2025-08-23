

import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import signinstyles from './signin.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { resetCache } from '../../../metro.config';



// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    ServiceProviderform:undefined;
    SignUp:undefined;
    LogIn:undefined;
};

// Define the navigation prop type
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

// Define props interface for the component
interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}




const SignIn: React.FC<SignUpProps> = ({navigation}) => {
    return (
      <View style={signinstyles.container}>
      <Image source={images.signinImage} style={signinstyles.imagesize} />

      <View style={signinstyles.fixpositionButton}>
          <TouchableOpacity 
              style={signinstyles.loginbuttonSize}
              onPress={() => navigation.navigate('LogIn')} // Change as needed
          >
              <Text style={signinstyles.text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={signinstyles.registrationbuttonSize}
              onPress={() => navigation.navigate('SignUp')} // Change as needed
          >
              <Text style={signinstyles.text}>Register As</Text>
          </TouchableOpacity>
      </View>
  </View>
    )
};

export default SignIn;
