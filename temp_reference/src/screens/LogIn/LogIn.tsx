import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
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
  return (
    <View style={loginstyles.container}>
     <View style={loginstyles.setLeftIconposition}>
          <Image source={images.signupImage} style={loginstyles.topImage} />
         <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} style={loginstyles.arrowIconPosition}>
          <View>
               <Image source={Icons.LeftArrow} style={loginstyles.leftArrowIconSize}/>
          </View>
         </TouchableOpacity>
     </View>

      <View style={loginstyles.formContainer}>
        <View style={{alignItems:'center'}}>
            <Text style={loginstyles.heading}>Log In</Text>
        </View>
        <View style={loginstyles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter your email"
          defaultValue="ferdinand@gmail.com"
          theme={{ roundness: 12 }}
          outlineColor="#E2E2E2"
        />
        <View style={{ position: 'relative' }}>
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          theme={{ roundness: 12 }}
          outlineColor="#E2E2E2"
          right={
            <TextInput.Icon
              icon={showPassword ? Icons.eyeInvisible : Icons.eyeInvisible}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>

        </View>
  

        <TouchableOpacity>
          <Text style={loginstyles.forgotText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={()=>navigation.navigate("Main")}
         style={loginstyles.loginButton}>
          <Text style={loginstyles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={loginstyles.orContainer}>
         <View style={loginstyles.line} />
         <Text style={loginstyles.orText}>Or login with</Text>
         <View style={loginstyles.line} />
        </View>

        <View style={loginstyles.socialButtons}>
          <TouchableOpacity style={loginstyles.socialButton}>
            <Image source={Icons.googleIcon} style={loginstyles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={loginstyles.socialButton}>
            <Image source={Icons.facebookIcon} style={loginstyles.socialIcon} />
          </TouchableOpacity>
        </View>

        <Text style={loginstyles.registerText}>
          Don’t have an account?{' '}
         <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
          <Text style={loginstyles.registerLink}>Register</Text>
         </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LogIn;
