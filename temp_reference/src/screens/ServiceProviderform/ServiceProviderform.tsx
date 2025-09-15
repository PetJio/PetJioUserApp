import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import serviceproviderformstyles from './serviceproviderform.styles';
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    SignUp:undefined;
    Veterinaryform:undefined
};

// Define the navigation prop type
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PetParentform'>;

// Define props interface for the component
interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}




const ServiceProviderform: React.FC<SignUpProps> = ({navigation}) => {
    return (
        <View style={serviceproviderformstyles.container}>
            <View style={serviceproviderformstyles.headerContainer}>
                  <View style={serviceproviderformstyles.positionDateTimeIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={serviceproviderformstyles.iconColor}
                                />
                            </TouchableOpacity>
                            <View style={serviceproviderformstyles.flexGap}>
                                <Text style={serviceproviderformstyles.text}>Provide Service As</Text>
                            </View>
                </View>
         </View>

         <View style={serviceproviderformstyles.setGapOfParent}>
         <View style={serviceproviderformstyles.setPadding}>
                   <TouchableOpacity onPress={()=>navigation.navigate("Veterinaryform")}>
                        <View style={serviceproviderformstyles.petparent}>
                         <Image source={images.veterinary} style={serviceproviderformstyles.serviceImage}/>
                        </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.grooming} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.trainer} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                    
             </View>
            
                <View style={serviceproviderformstyles.setPadding}>
                        <View style={serviceproviderformstyles.petparent}>
                            <Image source={images.boardingservice} style={serviceproviderformstyles.serviceImage}/>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate("DeliveryPartnerform")}>
                          <View style={serviceproviderformstyles.petparent}>
                            <Image source={images.dogwalking} style={serviceproviderformstyles.serviceImage}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.petsitter} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                </View>
                <View style={serviceproviderformstyles.setPadding}>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetParentform")}>
                        <View style={serviceproviderformstyles.petparent}>
                                <Image source={images.transport} style={serviceproviderformstyles.serviceImage}/>
                        </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.paraverservice} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.ngoconnect} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                    
             </View>
             <View style={serviceproviderformstyles.setPadding}>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetParentform")}>
                        <View style={serviceproviderformstyles.petparent}>
                                <Image source={images.breeder} style={serviceproviderformstyles.serviceImage}/>
                        </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.petmart} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("PetWarriorform")}>
                   <View style={serviceproviderformstyles.petparent}>
                      <Image source={images.laboratory} style={serviceproviderformstyles.serviceImage}/>
                    </View>
                   </TouchableOpacity>
                    
             </View>
         </View>
        </View>
    )
};

export default ServiceProviderform;
