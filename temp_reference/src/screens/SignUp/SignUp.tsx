import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import signupstyles from './signup.styles';
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    ServiceProviderform:undefined;
    SignIn:undefined;
};

// Define the navigation prop type
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PetParentform'>;

// Define props interface for the component
interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}




const SignUp: React.FC<SignUpProps> = ({navigation}) => {
    return (
        <View style={signupstyles.container}>
            <View style={signupstyles.imagecontainer}>
             {/* <Image source={images.signupImage} style={signupstyles.imagesize}/> */}
             <View style={signupstyles.setLeftIconposition}>
             <Image source={images.signupImage} style={signupstyles.imagesize}/>
         <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} style={signupstyles.arrowIconPosition}>
          <View>
               <Image source={Icons.LeftArrow} style={signupstyles.leftArrowIconSize}/>
          </View>
         </TouchableOpacity>
     </View>
             <Text style={signupstyles.registerText} >Register As</Text>
          </View>
         <View style={signupstyles.setGapOfParent}>
         <View style={signupstyles.setPadding}>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetParentform")}>
                        <View style={signupstyles.petparent}>
                                <Image source={images.petparent} style={signupstyles.serviceImage}/>
                        </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={signupstyles.petparent}>
                      <Image source={images.petwarrior} style={signupstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                    
             </View>
         
                <View style={signupstyles.setPadding}>
                         
                         <TouchableOpacity onPress={()=>navigation.navigate("ServiceProviderform")}>
                            <View style={signupstyles.petparent}>
                              <Image source={images.serviceprovider} style={signupstyles.serviceImage}/>
                            </View>
                         </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate("DeliveryPartnerform")}>
                          <View style={signupstyles.petparent}>
                            <Image source={images.deliverypartner} style={signupstyles.serviceImage}/>
                          </View>
                        </TouchableOpacity>
                </View>
             
         </View>
        </View>
    )
};

export default SignUp;
