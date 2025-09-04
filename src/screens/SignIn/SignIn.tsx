import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import signinstyles from './signin.styles';
import profileStyles from '../Profile/profileStyles';
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
      <KeyboardAvoidingView 
        style={signinstyles?.container || {flex: 1}} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={signinstyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={signinstyles.headerContainer}>
            <Image source={images?.signinImage || images?.signupImage} style={signinstyles.backgroundImage} />
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.8)', '#ffffff']}
              style={signinstyles.gradientOverlay}
            />
          </View>

          <View style={signinstyles.contentContainer}>
            <View style={signinstyles.welcomeSection}>
              <Text style={signinstyles.welcomeText}>Let's Get Started</Text>
              <Text style={signinstyles.subtitle}>Choose how you want to continue</Text>
            </View>

            <View style={signinstyles.buttonContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('LogIn')} 
                style={[
                  profileStyles.commonButton,
                  profileStyles.commonButtonPrimary
                ]}
                activeOpacity={0.8}
              >
                <MaterialIcons name="login" size={22} color="#58B9D0" />
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>Login</Text>
              </TouchableOpacity>

              <View style={signinstyles.dividerContainer}>
                <View style={signinstyles.dividerLine} />
                <Text style={signinstyles.dividerText}>Or</Text>
                <View style={signinstyles.dividerLine} />
              </View>

              <TouchableOpacity 
                onPress={() => navigation.navigate('SignUp')}
                style={[
                  profileStyles.commonButton,
                  profileStyles.commonButtonGray
                ]}
                activeOpacity={0.8}
              >
                <MaterialIcons name="person-add" size={22} color="#6B7280" />
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextGray]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
};

export default SignIn;
