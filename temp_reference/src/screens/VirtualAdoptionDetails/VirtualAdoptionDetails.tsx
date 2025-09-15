import React from 'react';
import { View, Text ,TouchableOpacity,Image, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import virtualadoptiondetailstyles from './virtualadoptiondetail.styles';


// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    ServiceProviderform:undefined;
    SignIn:undefined;
    BoardingDetails:undefined;
    AddVaccination:undefined;
    BookBoarder:undefined;
    Grooming:undefined;
    NGOUser:undefined;
    Donation:undefined;
    DogAdoptionScreeningForm:undefined;
};

// Define the navigation prop type
type VirtualAdoptionDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface VirtualAdoptionDetailsProps {
  navigation:VirtualAdoptionDetailsScreenNavigationProp;
}



const VirtualAdoptionDetails: React.FC <VirtualAdoptionDetailsProps> = ({navigation}) => {
    return (
        <View style={virtualadoptiondetailstyles.container}>
             <View style={{position:'relative'}}>
             <Image source={images.gettyImages} style={{width:responsiveWidth(100),height:responsiveHeight(24),resizeMode:'cover'}}/>
              <View style={virtualadoptiondetailstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NGOUser')}>
                            <View style={virtualadoptiondetailstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={virtualadoptiondetailstyles.iconColor}
                                />
                                <Text style={virtualadoptiondetailstyles.textDateTime}>
                                    Virtual Adoption
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
             </View>


              <ScrollView contentContainerStyle={{paddingBottom:responsiveHeight(20)}}>
 
                        <View style={{gap:responsiveHeight(1.5),top:responsiveHeight(2)}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingHorizontal:responsiveWidth(4)}}>
                  <View style={{flexDirection:'row', gap:responsiveWidth(1)}}>
                         <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,color:'#343434',letterSpacing:0}}>Pet Name : </Text>
                         <Text style={{fontSize:12,fontWeight:'400',lineHeight:18,color:'#484848',letterSpacing:0}} >Anna</Text>
                  </View>
                   <View style={{flexDirection:'row', gap:responsiveWidth(1)}}>
                         <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,color:'#343434',letterSpacing:0}}>Current NGO :</Text>
                         <Text style={{fontSize:12,fontWeight:'400',lineHeight:18,color:'#484848',letterSpacing:0}}>Petjio! NGO</Text>
                  </View>
             </View>

            
             <View style={{paddingHorizontal:responsiveWidth(4)}} >
              <View>
                        <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,color:'#343434',letterSpacing:0}}>Pet Details</Text>
                    </View>

                    <View style={{marginTop: responsiveHeight(0.30)}}>
                        <Text style={{fontSize:12,fontWeight:'400',lineHeight:18,color:'#484848',letterSpacing:0,}}>
                                Anna lost his mother when she was a day old. She was {"\n"} fostered by the indomitabe Manjari Chaitanya Colaco{"\n"} and came to Petjio! NGO when she was 5 months old.{"\n"}
                                Today, she has grown into a handsome, intelligent dog {"\n"} and has learnt to unlock the fence of his lawn. He gives {"\n"} our dear workers a tough time and she is tasked with {"\n"} getting her back into the lawn every time she escapes. {"\n"} She greets every visitor to care with her licks and wags, {"\n"} and demands to be pet.
                        </Text>
                    </View>
             </View>


              <View style={{paddingHorizontal:responsiveWidth(4)}}>
                   <View>
                        <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,color:'#343434',letterSpacing:0}}>Images</Text>
                    </View>

                    <View style={{flexDirection:'row',gap:responsiveWidth(3),marginTop: responsiveHeight(1)}}>
                           <Image source={images.indiandogImage}  style={{width:responsiveWidth(29),height:responsiveHeight(9),borderRadius:responsiveWidth(1)}}/>
                           <Image source={images.villagedogImage} style={{width:responsiveWidth(29),height:responsiveHeight(9),borderRadius:responsiveWidth(1)}}/>
                           <Image source={images.towndogImage} style={{width:responsiveWidth(29),height:responsiveHeight(9),borderRadius:responsiveWidth(1)}}/>
                    </View>
             </View>

             <View style={{paddingHorizontal:responsiveWidth(4)}}>
                     <View>
                        <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,color:'#343434',letterSpacing:0}}>Videos</Text>
                    </View>

                    <View style={{position:'relative',marginTop: responsiveHeight(1)}}>    
                           <Image source={images.shepherdogImage} style={{width:responsiveWidth(92.6),height:responsiveHeight(22),borderRadius:responsiveWidth(1),resizeMode:'cover'}} />
                                <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <Image source={Icons.playIcon}/>
                                </View>
                    </View>
                    <View style={{
                                position: 'absolute',
                                top: responsiveHeight(22),
                                left: 0,
                                right: 0,
                                // bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                            <Image source={Icons.dotIcon}/>
                    </View>

             </View>

             </View>

              </ScrollView>


           
  <View>

        <View style={virtualadoptiondetailstyles.registerfixedButtonContainer}>
                            <TouchableOpacity
                                //  onPress={()=>setModalVisible(false)}
                                style={virtualadoptiondetailstyles.registernextBtnContainer}>
                                <Text style={virtualadoptiondetailstyles.registernextBtnText}>
                                    Register to visit physically
                                </Text>
                            </TouchableOpacity>
 </View>



 <View style={virtualadoptiondetailstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate("DogAdoptionScreeningForm")}
                                style={virtualadoptiondetailstyles.nextBtnContainer}>
                                <Text style={virtualadoptiondetailstyles.nextBtnText}>
                                    Adopt Virtually
                                </Text>
                            </TouchableOpacity>
 </View>








  </View>
 
        </View>
    );
};

export default VirtualAdoptionDetails;
