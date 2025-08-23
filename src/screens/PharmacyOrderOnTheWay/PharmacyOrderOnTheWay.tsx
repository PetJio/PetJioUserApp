import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import pharmacyorderonthewaystyles from './pharmacyorderontheway.styles';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';



type RootStackParamList = {
   VeterinaryPaymentMethod:undefined;
};


type PharmacyOrderOnTheWayScreenNavigationProp = StackNavigationProp< RootStackParamList,'VeterinaryPaymentMethod'>;


interface PharmacyOrderOnTheWayProps {
    navigation: PharmacyOrderOnTheWayScreenNavigationProp;
}





const PharmacyOrderOnTheWay: React.FC<PharmacyOrderOnTheWayProps> = ({navigation}) => {
    return (
        <View style={pharmacyorderonthewaystyles.container}>
                <View style={pharmacyorderonthewaystyles.positionDateTimeIcon}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('VeterinaryPaymentMethod')}
                    >
                    <Image source={Icons.LeftArrow} style={pharmacyorderonthewaystyles.iconColor}/>
                    </TouchableOpacity>
                     
                     <Text style={pharmacyorderonthewaystyles.centerTitle}>Arriving in 8 minutes</Text>
                     <Text style={pharmacyorderonthewaystyles.title}>Order is on the way</Text>
               </View>
               <View>
                     <Image source={images.googleMap} style={{width:responsiveWidth(90),height:responsiveHeight(90)}}/>
               </View>
  
          {/* Fixed Button at the Bottom */}
            <View style={pharmacyorderonthewaystyles.fixedButtonContainer}>

          
             <View style={{gap:responsiveHeight(1.5)}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(90)}}>
                   <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                         <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(12),height:responsiveWidth(12),borderRadius:responsiveWidth(12),backgroundColor:'#DDF8FF'}}>
                             <Image source={images.deliverymanImage} style={{width:responsiveWidth(9),height:responsiveWidth(9)}} />
                         </View>
                      <View>
                           <Text  style={{fontSize:responsiveHeight(2),fontWeight:'600',letterSpacing:0,color:'#3A3939'}} >I’m Shekhar, your {"\n"} delivery partner</Text>
                       </View>
                   </View>

                    <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(10),height:responsiveWidth(10),borderRadius:responsiveWidth(10),borderWidth:responsiveWidth(0.30),borderColor:'#DEDEDE',backgroundColor:'#DEDEDE'}}>
                       <Image source={Icons.BiSolidPhoneCall}/>
                   </View>

            </View>

            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(90),height:responsiveHeight(8),borderRadius:responsiveWidth(1.5),backgroundColor:'#DDF8FF'}}>
                 <Text style={{fontSize:responsiveHeight(1.8),fontWeight:'400',letterSpacing:0,color:'#4494A8'}}>I have picked up your order, and I am on the way to {"\n"} your location </Text>   
            </View>
             </View>


             <View style={{gap:responsiveHeight(1.5)}}>
               <TouchableOpacity
                    // onPress={() => setModalVisible(true)}
                    style={pharmacyorderonthewaystyles.writeareviewContainer}>
                    <Text style={pharmacyorderonthewaystyles.writeareviewText}>View Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={() => navigation.navigate('HomeService')}
                    style={pharmacyorderonthewaystyles.nextBtnContainer}>
                    <Text style={pharmacyorderonthewaystyles.nextBtnText}>Go to homepage</Text>
                </TouchableOpacity>
             </View>
            </View>

        </View>
    );
};

export default PharmacyOrderOnTheWay;
