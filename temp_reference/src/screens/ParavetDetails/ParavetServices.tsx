import React, { useState } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity,Modal } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import paravetpackagestyles from './paravetpackage.styles';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import paravetservicestyles from './paravetservices.styles';



// type ModalComponentProps = {
//   modalVisible: boolean;
// };

// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    ParavetPackage:undefined;
    ParaVetCheckout:undefined;
};

// Define the navigation prop type
type ParavetServicesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Define props interface for the component
interface ParavetServicesProps {
    navigation:ParavetServicesScreenNavigationProp;
}

const ParavetServices: React.FC  = () => {
  const navigation = useNavigation<ParavetServicesScreenNavigationProp>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
          <View style={paravetpackagestyles.container}>

             <View style={paravetservicestyles.serviceSmallBreedIconflex}>
                <View>
                        <Text style={paravetservicestyles.serviceText}>Services</Text>
                </View>
                <View style={paravetservicestyles.GapTowerIcon}>
                  <Text style={paravetservicestyles.smallbreedText} >Small Breed</Text>
                   <Image source={Icons.TowerIcon} />
                </View>
             </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: responsiveHeight(16)}}>
            
             {/* start parent view */}
                 <View style={{gap:responsiveHeight(2)}}>
                    <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4)}}>
                    <View>
                        <Image source={images.fluidscalmImage} style={paravetservicestyles.imageSize}/>
                            <View style={paravetservicestyles.textIconFlex}>
                                <View>
                                    <Text style={paravetservicestyles.treatmentText}>Saline</Text>
                                    <Text style={paravetservicestyles.timeText}>Time: 40 minutes</Text>
                                </View>
                                <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>
                    
                        <View>
                        <Image source={images.veterinaryInjectionImage} style={paravetservicestyles.imageSize}/>
                            <View style={paravetservicestyles.textIconFlex}>
                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                        <Text style={paravetservicestyles.treatmentText}>Injection</Text>
                                        <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(IV,IM)</Text>
                                    </View>
                                    <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                                </View>
                                <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>


                    </View>


                    <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                        <View>
                        <Image source={images.glandcleaningImage} style={paravetservicestyles.imageSize}/>
                            <View style={paravetservicestyles.textIconFlex}>
                                <View>
                                    <Text style={paravetservicestyles.treatmentText}>Gland Cleaning</Text>
                                    <Text style={paravetservicestyles.timeText}>Time: 40 minutes</Text>
                                </View>
                                <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>
                    
                        <View>
                        <Image source={images.bloodtestImage} style={paravetservicestyles.imageSize}/>
                            <View style={paravetservicestyles.textIconFlex}>
                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                        <Text style={paravetservicestyles.treatmentText}>Blood tests for cancer</Text>
                                    </View>
                                    <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                                </View>
                                <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                                    <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                            </View>
                    </View>


                    </View>



                <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.cbcImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>CBC</Text>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(Complete blood count)</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 40 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.buntestImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>BUN</Text>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(Blood urea nitrogen)</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>


                </View>






                <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.bloodtestforDogImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>CHOL</Text>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(Cholesterol)</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 40 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.dogheroImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>GLU</Text>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(Glucose)</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>


                </View>






             <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.shullterstockImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>Liver enzymes</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.tribulindogImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>TBILI</Text>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#747474'}}>(Bilirubin)</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>


                </View>




            <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.ThyroidpanelImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>Thyroid panel</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.shullterStockDogImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>GI panel</Text>
                                   
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>


                </View>



                   <View style={{flexDirection:'row', gap:responsiveWidth(4), paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                 <View>
                   <Image source={images.HeartwormbloodTestImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>Heartworm blood test</Text>
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>
               
                <View>
                   <Image source={images.pregmentImage} style={paravetservicestyles.imageSize}/>
                    <View style={paravetservicestyles.textIconFlex}>
                          <View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(1)}}>
                                   <Text style={paravetservicestyles.treatmentText}>Pregnancy Blood Test</Text>
                                   
                            </View>
                            <Text style={paravetservicestyles.timeText}>Time: 20 minutes</Text>
                         </View>
                         <View style={paravetservicestyles.WhiteBiPlusIconBackgroundcolor}>
                               <Image source={Icons.WhiteBiPlusIcon}/>
                         </View>
                    </View>
              </View>


                </View>
                
                 </View>


             {/* end parent view */}

            </ScrollView>
            <View style={paravetservicestyles.fixedButtonContainer}>
                <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                         <Image source={images.paravetUserImage} style={{width:responsiveWidth(13),height:responsiveHeight(5.7),borderRadius:responsiveWidth(6),bottom:responsiveHeight(0.70)}}/>
                          <View style={{top:responsiveHeight(0.90)}}>
                               <Text style={paravetservicestyles.serviceText}>Joe Davis</Text>
                               <Text style={paravetservicestyles.paravetText}>Para Vet</Text>
                          </View>
              </View>
 
              <View>
                <TouchableOpacity 
                 onPress={()=>navigation.navigate("ParaVetCheckout")}
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

export default ParavetServices;
