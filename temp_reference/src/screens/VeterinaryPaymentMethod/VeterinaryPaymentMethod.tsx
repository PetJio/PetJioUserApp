import React, { useState } from 'react';
import { View, Text,TouchableOpacity,Image, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import veterinarypaymentmethodstyles from './veterinarypaymentmethod.styles';
import VeterinaryPetcoinModal from '../VeterinaryPetcoinModal/VeterinaryPetcoinModal';
import {responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';


// Define your navigation stack's param list
type RootStackParamList = {
        Locality: undefined;
        Grooming: undefined;
        HomeService: undefined;
        Paymentconfirmmethod: { section: string };
        ServicePrice: undefined;
        ConfirmDetails:undefined;
        TrainingConfirmDetails:undefined;
        TrainingPaymentconfirmmethod:{ section: string };
        PharmacyOrderOverview:undefined;
      };
      
      // Define once
      type PaymentmethodRouteProp = RouteProp<RootStackParamList, 'PharmacyOrderOverview'>;
      
      type ConfirmPaymentScreenNavigationProp = StackNavigationProp<RootStackParamList,'PharmacyOrderOverview'>;
      
      interface ConfirmPaymenProps {
        navigation: ConfirmPaymentScreenNavigationProp;
      }
      

 const VeterinaryPaymentMethod: React.FC<ConfirmPaymenProps> = ({navigation}) => {
        const [modalVisible,setModalVisible] = useState<boolean>(false);
    return (
        <View style={veterinarypaymentmethodstyles.container}>
             <View style={veterinarypaymentmethodstyles.containerchild}>
                    <TouchableOpacity 
                         onPress={()=>navigation.navigate("PharmacyOrderOverview")}
                        >
                        <View style={veterinarypaymentmethodstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={veterinarypaymentmethodstyles.leftarrowicon}
                            />
                            <Text style={veterinarypaymentmethodstyles.checkoutText}>
                                Bill Total :<Text style={{color:'#DF09A7'}}>₹ 900.00</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
           
               <ScrollView
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{paddingBottom:90}}
                >
            <View style={{gap:responsiveHeight(2.4),top:responsiveHeight(4)}}>
                       <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Recommended</Text>
                       </View>
                       <TouchableOpacity onPress={()=>navigation.navigate('TrainingPaymentconfirmmethod', { section: 'Google Pay UPI' })}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                        <Image source={Icons.visa}/>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}} >Uco Visa Card</Text>
                                        <Text style={{fontSize:10,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#5E5E5E'}} >******6962|Secured</Text>
                               </View>
                        </View>
                        
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={Icons.IoIosArrowForward}/>
                          </View>
                        
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('TrainingPaymentconfirmmethod', { section: 'Google Pay UPI' })}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                        <Image source={Icons.googlepay}/>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                     <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}}>Google Pay UPI</Text>  
                                </View>
                           </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Image source={Icons.IoIosArrowForward}/>
                                </View>
                        </View>
                        </TouchableOpacity>
                        <View style={{width:responsiveWidth(100),borderWidth:responsiveWidth(0.20),borderColor:'#ECECEC'}}/>
                        <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Cards</Text>
                       </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.card}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}}>Add credit or debit cards</Text>
                                </View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#4494A8',fontSize:12,lineHeight:12}}>ADD</Text>
                        </View>
                        </View>
                        <View style={{width:responsiveWidth(100),borderWidth:responsiveWidth(0.20),borderColor:'#ECECEC'}}/>
                        <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Pay by any UPI app</Text>
                       </View>
                       <TouchableOpacity onPress={()=>navigation.navigate('TrainingPaymentconfirmmethod', { section: 'Google Pay UPI' })}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.phonepay}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}} >PhonePe UPI</Text> 
                                </View>
                        </View>
                        
                           <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={Icons.IoIosArrowForward}/>
                           </View>
                       
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('TrainingPaymentconfirmmethod', { section: 'Google Pay UPI' })}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.paytm}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}} >PhonePe UPI</Text>
                                        
                                </View>
                        </View>
                         
                         <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={Icons.IoIosArrowForward}/>
                        </View>
                       
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('TrainingPaymentconfirmmethod', { section: 'Google Pay UPI' })}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.upi}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}} >Add new UPI ID</Text>
                                        
                                </View>
                        </View>
                     
                         <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={Icons.IoIosArrowForward}/>
                         </View>
                     
                        </View>
                        </TouchableOpacity>

                        <VeterinaryPetcoinModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                        <View style={{width:responsiveWidth(100),borderWidth:responsiveWidth(0.20),borderColor:'#ECECEC'}}/>
                        <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Wallets</Text>
                        </View>
                       
                
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.wallet} style={{width:responsiveWidth(8),height:responsiveHeight(3.5)}}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}}>Petcoin</Text>
                                        <Text style={{fontSize:10,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#5E5E5E',left:responsiveWidth(1.5)}}>Balance: ₹3 0</Text>
                                </View>
                        </View>
                            <Image source={Icons.IoIosArrowForward}/>
                        </View>
                        </TouchableOpacity>
                        <View style={{width:responsiveWidth(100),borderWidth:responsiveWidth(0.20),borderColor:'#ECECEC'}}/>
                                <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                                   <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Pay On Delivery</Text>
                              </View>
                        <View style={{justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={Icons.CashIcon} style={{width:responsiveWidth(8),height:responsiveHeight(3.5)}}/>
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}}>Cash on Delivery</Text>
                                </View>
                           </View>
                            
                        </View>
                        
                        <View style={{paddingHorizontal:responsiveWidth(6)}}>
                                       
                            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(90),height:responsiveHeight(3.5),borderRadius:responsiveWidth(1),backgroundColor:'#FFE1E1'}}>
                                 <Text style={{fontSize:responsiveHeight(1.3),fontWeight:'400',letterSpacing:0,color:'#ED343E'}} >Cash on delivery is not applicable on orders with items total less than ₹50</Text>   
                            </View>
                        </View>

                        </View>

             
                
                 
        
 
                 
           

              </ScrollView> 
        </View>
    );
};

export default VeterinaryPaymentMethod;
