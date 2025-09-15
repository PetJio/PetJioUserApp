
import React, { useState } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity,Modal } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import groomingservicestyles from './groomingservice.styles';




// type ModalComponentProps = {
//   modalVisible: boolean;
// };

// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    ParavetPackage:undefined;
    ParaVetCheckout:undefined;
    ServicePrice:undefined;
};

// Define the navigation prop type
type ParavetServicesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Define props interface for the component
interface ParavetServicesProps {
    navigation:ParavetServicesScreenNavigationProp;
}

const GroomingService: React.FC  = () => {
  const navigation = useNavigation<ParavetServicesScreenNavigationProp>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
          <View style={groomingservicestyles.container}>

             <View style={groomingservicestyles.serviceSmallBreedIconflex}>
                <View>
                        <Text style={groomingservicestyles.serviceText}>Services</Text>
                </View>
                <View style={groomingservicestyles.GapTowerIcon}>
                  <Text style={groomingservicestyles.smallbreedText}>Small Breed</Text>
                   <Image source={Icons.TowerIcon} />
                </View>
             </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: responsiveHeight(16)}}>
            
             {/* start parent view */}
                 <View style={{gap:responsiveHeight(2)}}>
                    <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4)}}>
                    <View>
                        <Image source={images.HairCutDog} style={groomingservicestyles.imageSize}/>
                            <View style={groomingservicestyles.textIconFlex}>
                                <View>
                                    <Text style={groomingservicestyles.treatmentText}>Hair Cut</Text>
                                    <Text style={groomingservicestyles.timeText}>Time: 40 minutes</Text>
                                    <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                                </View>
                                <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>
                    
                        <View>
                        <Image source={images.nailclippingImage} style={groomingservicestyles.imageSize}/>
                            <View style={groomingservicestyles.textIconFlex}>
                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                        <Text style={groomingservicestyles.treatmentText}>Nail Clipping</Text>
                                    </View>
                                    <Text style={groomingservicestyles.timeText}>Time: 20 minutes</Text>
                                    <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                                </View>
                                <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>


                    </View>


                    <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                        <View>
                        <Image source={images.bathingImage} style={groomingservicestyles.imageSize}/>
                            <View style={groomingservicestyles.textIconFlex}>
                                <View>
                                    <Text style={groomingservicestyles.treatmentText}>Bathing</Text>
                                    <Text style={groomingservicestyles.timeText}>Time: 40 minutes</Text>
                                    <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                                </View>
                                <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>
                    
                        <View>
                        <Image source={images.furbrushingImage} style={groomingservicestyles.imageSize}/>
                            <View style={groomingservicestyles.textIconFlex}>
                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                        <Text style={groomingservicestyles.treatmentText}>Fur Brushing</Text>
                                    </View>
                                    <Text style={groomingservicestyles.timeText}>Time: 20 minutes</Text>
                                    <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                                </View>
                                <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>


                    </View>



                <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.spabathImage} style={groomingservicestyles.imageSize}/>
                    <View style={groomingservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={groomingservicestyles.treatmentText}>Spa Bath</Text> 
                            </View>
                            <Text style={groomingservicestyles.timeText}>Time: 40 minutes</Text>
                            <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                         </View>
                         <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.nailclippingImage} style={groomingservicestyles.imageSize}/>
                    <View style={groomingservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={groomingservicestyles.treatmentText}>Nail Clipping</Text>
                                   
                            </View>
                            <Text style={groomingservicestyles.timeText}>Time: 20 minutes</Text>
                            <Text style={groomingservicestyles.priceAmount}>Price: ₹100</Text>
                         </View>
                         <View style={groomingservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
                </View>
                 </View>


             {/* end parent view */}

            </ScrollView>
            <View style={groomingservicestyles.fixedButtonContainer}>
                <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                         <Image source={images.paravetUserImage} style={{width:responsiveWidth(9.5),height:responsiveHeight(5),borderRadius:responsiveWidth(6),bottom:responsiveHeight(0.70)}}/>
                          <View style={{top:responsiveHeight(0.90)}}>
                               <Text style={groomingservicestyles.serviceText}>Joe Davis</Text>
                               <Text style={groomingservicestyles.paravetText}>Para Vet</Text>
                          </View>
              </View>
 
              <View>
                <TouchableOpacity 
                 onPress={()=>navigation.navigate("ServicePrice")}
                >

                    <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                        <View style={{justifyContent:'center', alignItems:'center',width:responsiveWidth(32),height:responsiveHeight(6),borderRadius:responsiveWidth(2),backgroundColor:'#58B9D0',gap:responsiveHeight(0.70)}}>
                              <Text style={{fontSize:9,fontWeight:'500',letterSpacing:0,lineHeight:10,color:'#FFFFFF'}}>2 Items | ₹ 400</Text>
                              <Text style={{fontSize:14,fontWeight:'500',letterSpacing:0,lineHeight:18,color:'#FFFFFF'}}>Checkout</Text>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(12),height:responsiveHeight(6),borderRadius:responsiveWidth(2),backgroundColor:'#FFE3E3'}}>
                            <Image source={Icons.RiDeleteBinLine}/>
                        </View>
                  </View>
                  
                </TouchableOpacity>
                    
              </View>

            </View>
          </View>
  );
};

export default GroomingService;
