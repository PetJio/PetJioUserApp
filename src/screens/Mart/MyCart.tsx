import React, { useState } from 'react';
import { View, Text,Image,TouchableOpacity,TextInput } from 'react-native';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import Icon from "react-native-vector-icons/Feather";
import mycartstyles from './mycart.styles';
import RemoveCartItemModal from './RemoveCartItemModal';

import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native'

// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    Locality: { section: string };
    Grooming:undefined;
    Walking:undefined;
    Main:undefined;
    PetProductDescription:undefined;
    CheckOut:undefined;
  // Add other routes here as needed
};

// Define the navigation prop type
type LocalityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Locality'>;
type LocalityScreenRouteProp = RouteProp<RootStackParamList, 'Locality'>;


// Define props interface for the component
interface LocalityProps {
  navigation:LocalityScreenNavigationProp;
  route: LocalityScreenRouteProp;
}

const MyCart: React.FC<LocalityProps> = ({navigation}) => {

    const [modalVisible,setModalVisible] = useState<boolean>(false);
    
    return (
        <View style={{width:responsiveWidth(100),height:responsiveHeight(100),backgroundColor:'#FFFFFF'}}>

        <View style={{top:responsiveHeight(7),gap:responsiveHeight(1.5)}}>
        <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
            <View style={{flexDirection:'row',gap:responsiveWidth(1),paddingHorizontal:responsiveWidth(4)}}>
                    <Image source={Icons.LeftArrow} style={{ tintColor: "#000000",top:responsiveHeight(0.50)}}/>
                    <Text style={{color:"#000000",fontSize:20,fontWeight:'500',fontFamily:''}}>MyCart</Text>
            </View>
        </TouchableOpacity>

        <View style={mycartstyles.searchparent}>
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#EBEBEB'}}>
                                    <Image source={Icons.BiMinus}/>
                                </View>
                                <View>
                                       <Text style={{fontSize:14, fontWeight:'500',lineHeight:17, color:'#000000'}}>1</Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#4494A8'}}>
                                      <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                          </View>
                  </View>
             </View>
            </View>
               
        </View>

         <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

           <View style={mycartstyles.searchparent}>
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#EBEBEB'}}>
                                    <Image source={Icons.BiMinus}/>
                                </View>
                                <View>
                                       <Text style={{fontSize:14, fontWeight:'500',lineHeight:17, color:'#000000'}}>1</Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#4494A8'}}>
                                      <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                          </View>
                  </View>
             </View>
            </View>
        </View>

       <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

         <View style={mycartstyles.searchparent}>
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#EBEBEB'}}>
                                    <Image source={Icons.BiMinus}/>
                                </View>
                                <View>
                                       <Text style={{fontSize:14, fontWeight:'500',lineHeight:17, color:'#000000'}}>1</Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#4494A8'}}>
                                      <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                          </View>
                  </View>
             </View>
            </View>
        </View>

        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

        <View style={mycartstyles.searchparent}>
          <View  style={{width:responsiveWidth(90),flexDirection:'row',justifyContent:'space-between'}}>
             <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(60), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#EBEBEB'}}>
                                    <Image source={Icons.BiMinus}/>
                                </View>
                                <View>
                                       <Text style={{fontSize:14, fontWeight:'500',lineHeight:17, color:'#000000'}}>1</Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(5),height:responsiveHeight(1.8),borderRadius:responsiveWidth(0.30),backgroundColor:'#4494A8'}}>
                                      <Image source={Icons.WhiteBiPlusIcon}/>
                                </View>
                              
                          </View>
                  </View>
             </View>
            </View>

             <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(10.5),height:responsiveHeight(10),backgroundColor:'#FEDDDD'}}>
                                        <Image source={Icons.MdDelete} />
            </View>
              
            
            
          </View>   
        

        </View>

         <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

          <View style={{justifyContent:'center', alignItems:'center'}}>
              
          <View style={{width:responsiveWidth(86),height:responsiveHeight(4.5),borderRadius:responsiveWidth(8),backgroundColor:'#F4F4F4'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{justifyContent:'center',alignItems:'center',padding:responsiveWidth(2.8)}}>
                             <Text style={{fontSize:12,fontWeight:'400',lineHeight:15,letterSpacing:0,color:'#838383'}}>Promo Code</Text>
                        </View>
                       <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(24),height:responsiveHeight(4),borderRadius:responsiveWidth(8),backgroundColor:'#58B9D0'}}>
                                   <Text style={{fontSize:12,fontWeight:'400',lineHeight:15,letterSpacing:0,color:'#FFFFFF'}}>Apply</Text>
                       </View>
                </View>
          </View>

          </View>

          <View style={{gap:responsiveHeight(2)}}>

            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(8)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#7D7D7D'}}>Sub-Total</Text>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#303030'}}>₹221.00</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(8)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#7D7D7D'}}>Delivery Charge</Text>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#303030'}}>₹50.00</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(8)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#7D7D7D'}}>Tax</Text>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#303030'}}>₹100.00</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(8)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#7D7D7D'}}>Discount</Text>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#303030'}}>- ₹70.00</Text>
          </View>

          </View>

           <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

             <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(8)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#7D7D7D'}}>Total Cost</Text>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,letterSpacing:0,color:'#303030'}}>₹301.00</Text>
          </View>
   </View>


   <RemoveCartItemModal  modalVisible={modalVisible}  setModalVisible={setModalVisible} />

     {/* Fixed Next Button */}
            <View style={mycartstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CheckOut')}
                    style={mycartstyles.nextBtnContainer}>
                    <Text style={mycartstyles.nextBtnText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
</View>
    );
};

export default MyCart;

