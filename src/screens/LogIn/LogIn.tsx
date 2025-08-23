import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images'; 
import Icons from '../../../assets/icons';
import loginstyles from './login.styles';


type RootStackParamList = {
  PetParentform: undefined;
  Main: undefined;
  PetWarriorform: undefined;
  DeliveryPartnerform: undefined;
  ServiceProviderform: undefined;
  SignUp:undefined;
  SignIn:undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PetParentform'
>;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

const LogIn: React.FC<SignUpProps> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('ferdinand@gmail.com');
    const [password, setPassword] = useState<string>('');

  return (
    <KeyboardAvoidingView 
      style={loginstyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={loginstyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={loginstyles.headerContainer}>
          <Image source={images.signupImage} style={loginstyles.backgroundImage} />
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.8)', '#ffffff']}
            style={loginstyles.gradientOverlay}
          />
          <TouchableOpacity 
            onPress={()=>navigation.goBack()} 
            style={loginstyles.backButton}
            activeOpacity={0.7}
          >
            <Image source={Icons.LeftArrow} style={loginstyles.backIcon}/>
          </TouchableOpacity>
        </View>

        <View style={loginstyles.contentContainer}>
          <View style={loginstyles.welcomeSection}>
            <Text style={loginstyles.welcomeText}>Welcome back!</Text>
            <Text style={loginstyles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={loginstyles.formSection}>
            <View style={loginstyles.inputGroup}>
              <TextInput
                mode="outlined"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                style={loginstyles.textInput}
                contentStyle={loginstyles.inputContent}
                outlineStyle={loginstyles.inputOutline}
                keyboardType="email-address"
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="email" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />
              
              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                style={loginstyles.textInput}
                contentStyle={loginstyles.inputContent}
                outlineStyle={loginstyles.inputOutline}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="lock" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name={showPassword ? 'visibility-off' : 'visibility'} 
                        size={20} 
                        color="#666" 
                      />
                    )}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>

            <TouchableOpacity style={loginstyles.forgotPasswordContainer}>
              <Text style={loginstyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>navigation.navigate("Main")}
              style={loginstyles.loginButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#58B9D0', '#4A9FB8']}
                style={loginstyles.loginButtonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              >
                <Text style={loginstyles.loginButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={loginstyles.dividerContainer}>
              <View style={loginstyles.dividerLine} />
              <Text style={loginstyles.dividerText}>Or continue with</Text>
              <View style={loginstyles.dividerLine} />
            </View>

            <View style={loginstyles.socialButtonsContainer}>
              <TouchableOpacity style={loginstyles.socialButton} activeOpacity={0.7}>
                <Image source={Icons.googleIcon} style={loginstyles.socialIcon} />
                <Text style={loginstyles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={loginstyles.socialButton} activeOpacity={0.7}>
                <Image source={Icons.facebookIcon} style={loginstyles.socialIcon} />
                <Text style={loginstyles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <View style={loginstyles.signupPrompt}>
              <Text style={loginstyles.signupText}>
                Don't have an account?{' '}
                <Text 
                  style={loginstyles.signupLink}
                  onPress={()=>navigation.navigate("SignUp")}
                >
                  Create Account
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
