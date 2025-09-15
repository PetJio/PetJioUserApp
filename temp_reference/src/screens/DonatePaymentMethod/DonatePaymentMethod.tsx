import {useState} from 'react';
import { View, Text,TouchableOpacity,Image } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import donatepaymentmethodstyles from './donatepaymentmethod.styles';
import {responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import NGOPetcoinModal from '../NGODetails/NGOPetcoinModal';

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
        DonateAmount:undefined;
        DonatePaymentconfirmmethod:{ section: string };
      };
      
      // Define once
      type PaymentmethodRouteProp = RouteProp<RootStackParamList, 'DonatePaymentconfirmmethod'>;
      
      type ConfirmPaymentScreenNavigationProp = StackNavigationProp<RootStackParamList,'DonatePaymentconfirmmethod'>;
      
      interface ConfirmPaymenProps {
        navigation: ConfirmPaymentScreenNavigationProp;
      }
      

 const DonatePaymentMethod: React.FC<ConfirmPaymenProps> = ({navigation}) => {
        const route = useRoute<PaymentmethodRouteProp>();
        const [modalVisible,setModalVisible] = useState<boolean>(false);
        // const { section } = route?.params;
        const handleTabWithNavigation = () => {
            //     if (section === 'training') {
            //         // navigation.navigate("TrainingConfirmDetails");
            //     }
            };

    return (
        <View style={donatepaymentmethodstyles.container}>
             <View style={donatepaymentmethodstyles.containerchild}>
                    <TouchableOpacity 
                     onPress={()=>navigation.navigate("DonateAmount")}
                    >
                        <View style={donatepaymentmethodstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={donatepaymentmethodstyles.leftarrowicon}
                            />
                            <Text style={donatepaymentmethodstyles.checkoutText}>
                                Bill Total :<Text style={{color:'#DF09A7'}}>₹ 900.00</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
           
                <View style={{gap:responsiveHeight(2.4),top:responsiveHeight(4)}}>
                       <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Recommended</Text>
                       </View>
                       <TouchableOpacity onPress={()=>navigation.navigate('DonatePaymentconfirmmethod', { section: 'Google Pay UPI' })}>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('DonatePaymentconfirmmethod', { section: 'Google Pay UPI' })}>
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
                       <TouchableOpacity onPress={()=>navigation.navigate('DonatePaymentconfirmmethod', { section: 'Google Pay UPI' })}>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('DonatePaymentconfirmmethod', { section: 'Google Pay UPI' })}>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('DonatePaymentconfirmmethod', { section: 'Google Pay UPI' })}>
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
                        <View style={{width:responsiveWidth(100),borderWidth:responsiveWidth(0.20),borderColor:'#ECECEC'}}/>
                        <View style={{paddingHorizontal:responsiveWidth(6.5)}}>
                            <Text style={{fontSize:16,fontWeight:'700',lineHeight:17,color:"#000000"}}>Wallets</Text>
                       </View>
                       
                       <NGOPetcoinModal modalVisible={modalVisible} setModalVisible={setModalVisible}   />

                        <TouchableOpacity
                         onPress={()=>setModalVisible(true)}
                        >
                         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6)}}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <View style={{width:responsiveWidth(15),height:responsiveHeight(4.5),borderWidth:responsiveWidth(0.30),borderRadius:responsiveWidth(1),borderColor:'#EBEBEB',justifyContent:'center',alignItems:'center'}}>
                                   <Image source={Icons.wallet} style={{width:responsiveWidth(6),height:responsiveHeight(3.5)}}  />
                            </View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{fontSize:14,fontWeight:'600',color:'#000000',lineHeight:17}}>Petcoin</Text>
                                        <Text style={{fontSize:10,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#5E5E5E',left:responsiveWidth(1.5)}}>Balance: ₹3 0</Text>
                                </View>
                        </View>
                            <Image source={Icons.IoIosArrowForward}/>
                        </View>
                         

                        </TouchableOpacity>
                </View> 
        </View>
    );
};

export default DonatePaymentMethod;
