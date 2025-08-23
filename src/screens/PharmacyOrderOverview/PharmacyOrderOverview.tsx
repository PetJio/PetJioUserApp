
import {useState} from 'react';
import { View, Text,Image,TouchableOpacity,TextInput, ScrollView } from 'react-native';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import Icon from "react-native-vector-icons/Feather";
import pharmacyorderoverviewstyles from './pharmacyorderoverview.styles';
import { StackNavigationProp } from '@react-navigation/stack';





// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    Locality: { section: string };
    Grooming:undefined;
    Walking:undefined;
    Veterinary:undefined;
    VeterinaryCalendar:undefined;
    LiveTalkToVeterinary:undefined;
    VeterinariansDetails:undefined;
    OnlineChatWithVeterinary:undefined;
    PharmacyOrderNow:undefined;
    VeterinaryPharmacy:undefined;
    PharmacyOrderOverview:undefined;
    VeterinaryPaymentMethod:undefined;
    Main:undefined;

 
};

// Define the navigation prop type
type LiveTalkToVeterinaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LiveTalkToVeterinary'>;



// Define props interface for the component
interface VeterinaryPharmacyProps {
  navigation:LiveTalkToVeterinaryScreenNavigationProp;

}

const PharmacyOrderOverview: React.FC<VeterinaryPharmacyProps> = ({navigation }) => {
      
    return (
        <View style={pharmacyorderoverviewstyles.container}>
        <View style={{top:responsiveHeight(7),gap:responsiveHeight(1.5)}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Main")}>
            <View style={{flexDirection:'row',gap:responsiveWidth(1),paddingHorizontal:responsiveWidth(4)}}>
                    <Image source={Icons.LeftArrow} style={{ tintColor: "#000000",top:responsiveHeight(0.50)}}/>
                    <Text style={{color:"#000000",fontSize:20,fontWeight:'500',fontFamily:''}}>Veterinary Pharmacy</Text>
            </View>
        </TouchableOpacity>
   </View>
    <View style={{gap:responsiveHeight(2),top:responsiveHeight(11)}}>
         <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(2)}}>
         <View style={{flexDirection:'row',gap:responsiveWidth(6)}}>
            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveWidth(16),borderRadius:responsiveWidth(0.30),backgroundColor:'#F6F6F6'}}>
              <Image source={images.syrupImage} style={{width:responsiveWidth(12),height:responsiveWidth(8)}}/>
        </View>
        <View>
               <Text style={{fontSize:responsiveWidth(3),fontWeight:'500', letterSpacing:0, color:'#000000' }}>Vetenex Cough Syrup</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(62)}}>
                      <Text style={{fontSize:responsiveWidth(2.5),fontWeight:'500',color:'#B7B7B7'}}>100ml | Single Product</Text>
                      <Text style={{fontSize:responsiveWidth(4),fontWeight:'600',color:'#000000'}}>1</Text>
               </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                   <Text style={{ fontSize: responsiveWidth(3), fontWeight: '600', color: '#B70B8B', marginRight: responsiveWidth(2)}}>₹100.00</Text>

                   {/* Original Price with Strikethrough */}
                   <Text style={{ fontSize: responsiveWidth(3), color: '#B7B7B7',textDecorationLine: 'line-through',}}>₹150.00</Text>
              </View>

        </View>
      </View>
      <View style={{width:responsiveWidth(95),borderBottomWidth:responsiveHeight(0.10),borderBottomColor:'#DBDBDB'}}/>
   </View>
    <View style={{paddingHorizontal:responsiveWidth(5)}}>
         <View style={{flexDirection:'row',gap:responsiveWidth(6)}}>
            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveWidth(16),borderRadius:responsiveWidth(0.30),backgroundColor:'#F6F6F6'}}>
              <Image source={images.syrupImage} style={{width:responsiveWidth(12),height:responsiveWidth(8)}}/>
        </View>
        <View>
               <Text style={{fontSize:responsiveWidth(3),fontWeight:'500', letterSpacing:0, color:'#000000' }}>Vetenex Cough Syrup</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(62)}}>
                      <Text style={{fontSize:responsiveWidth(2.5),fontWeight:'500',color:'#B7B7B7'}}>100ml | Single Product</Text>
                      <Text style={{fontSize:responsiveWidth(4),fontWeight:'600',color:'#000000'}}>1</Text>
               </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                   <Text style={{ fontSize: responsiveWidth(3), fontWeight: '600', color: '#B70B8B', marginRight: responsiveWidth(2)}}>₹100.00</Text>

                   {/* Original Price with Strikethrough */}
                   <Text style={{ fontSize: responsiveWidth(3), color: '#B7B7B7',textDecorationLine: 'line-through',}}>₹150.00</Text>
              </View>

        </View>
      </View>
     
   </View>

    <View style={{justifyContent:'center',alignItems:'center',}}>
          
           <View>
              <View style={{top:responsiveHeight(2)}}>
                 <Text style={{fontSize:responsiveWidth(4),fontWeight:'500',color:'#000000'}}>Delivery Address</Text>

              </View>
                <View style={{top:responsiveHeight(4)}}>

                           <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(90),height:responsiveWidth(16),borderRadius:responsiveWidth(2),backgroundColor:'#58B9D0'}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(83)}}>

                   
                    <View>
                           <Text style={{fontSize:responsiveWidth(3),fontWeight:'500',color:'#FFFFFF'}}>Peter Fernandez</Text>
                           <Text style={{fontSize:responsiveWidth(2),fontWeight:'400',color:'#FFFFFF'}}>32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                           
                    </View>
                   <View style={{justifyContent:'center',alignItems:'center'}}>
                           <Image source={Icons.CgRadioChecked}/>
                   </View>
                   </View>
           </View>
           <View style={{flexDirection:'row'}}>
                 <Text  style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#5F5F5F',top:responsiveHeight(0.60)}}> Delivery in </Text>
                 <Text  style={{fontSize:responsiveWidth(4),fontWeight:'600',color:'#5F5F5F'}}>17 mins</Text>
           </View>




                </View>
           </View>
           
           
    </View>

    <View style={{paddingHorizontal:responsiveWidth(5), top:responsiveHeight(5)}}>
            <Text style={{fontSize:responsiveWidth(3.8),fontWeight:'600',color:"#000000"}}>Order Summary</Text>
    </View>

     <View style={{paddingHorizontal:responsiveWidth(5), top:responsiveHeight(5), gap:responsiveHeight(1.8)}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(0.60)}}>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#303030'}}>Item Total</Text>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#303030'}}>₹ 200.00</Text>
            </View>
             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(0.60)}}>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#303030'}}>Gst @20%</Text>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#303030'}}>₹ 60.00</Text>
            </View>
             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(0.60)}}>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#E94951'}}>Discount @10%</Text>
                   <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',color:'#E94951'}}>₹ 20.00</Text>
            </View>
             <View style={{width:responsiveWidth(95),borderBottomWidth:responsiveHeight(0.10),borderBottomColor:'#DBDBDB'}}/>
             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(0.60)}}>
                   <Text style={{fontSize:responsiveWidth(3.5),fontWeight:'600',color:'#000000'}}>Total</Text>
                   <Text style={{fontSize:responsiveWidth(3.5),fontWeight:'600',color:'#DF09A7'}}>₹ 240.00</Text>
            </View>
    </View>
          
    </View>

   
   


{/* Fixed Button */}
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(4),
      paddingVertical: responsiveHeight(2),
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    }}
  >
    <View style={{ gap: responsiveHeight(1) }}>
      <TouchableOpacity
        onPress={()=>navigation.navigate("VeterinaryPaymentMethod")}
       >
        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
          <Image source={Icons.googlepay} />
          <Text
            style={{
              color: '#414141',
              fontSize: 11,
              fontWeight: '300',
              top: responsiveHeight(0.90),
            }}>
            PAY USING
          </Text>
          <Image source={Icons.IoIosArrowUp} style={{ top: responsiveHeight(1) }} />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          color: '#303030',
          fontSize: 14,
          fontWeight: '400',
          lineHeight: 18,
          letterSpacing: 0,
        }}>
        Google Pay UPI
      </Text>
    </View>

    <View
      style={{
        width: responsiveWidth(63),
        height: responsiveHeight(5.5),
        borderRadius: responsiveWidth(1.5),
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: '600',
          lineHeight: 18,
          letterSpacing: 0,
        }}>
        Place Order
      </Text>
    </View>
  </View>

</View>
    );
};

export default PharmacyOrderOverview;


