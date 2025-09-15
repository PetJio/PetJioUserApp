import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import petmartpaymentconfirmmethodstyles from './petmartpaymentconfirmmethod.styles';   
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    InvoiceDetails:undefined;
    Main:undefined;
  
};

// Define the navigation prop type
type InvoiceDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InvoiceDetails'>;

// Define props interface for the component
interface InvoiceProps {
  navigation: InvoiceDetailsScreenNavigationProp;
}


const PetMartPaymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={petmartpaymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={petmartpaymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={petmartpaymentconfirmmethodstyles.textView}>
                     <Text style={petmartpaymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={petmartpaymentconfirmmethodstyles.confirmTextView}>
                      <Text style={petmartpaymentconfirmmethodstyles.confirmText}>Your Order Has Been</Text>
                      <Text style={petmartpaymentconfirmmethodstyles.confirmText}>Placed</Text>
              </View>
              <View style={petmartpaymentconfirmmethodstyles.bookingView}>
                <View style={petmartpaymentconfirmmethodstyles.booking}>
                        <Text style={petmartpaymentconfirmmethodstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={petmartpaymentconfirmmethodstyles.bookingInformationText}>Thank you for your purpose</Text>
                        
                 </View>
              </View>
              <View style={petmartpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={petmartpaymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity 
                                //   onPress={()=>navigation.navigate('InvoiceDetails')}
                                >
                                 <View style={petmartpaymentconfirmmethodstyles.Invoice}>
                                    <Text style={petmartpaymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={petmartpaymentconfirmmethodstyles.cancelbooking}>
                                    <Text style={petmartpaymentconfirmmethodstyles.cancelbookingtext}>Cancel Order</Text>
                             </View>
                      </View>
              </View>
              <View style={petmartpaymentconfirmmethodstyles.invoiceandcancelview}>
                      {/* <View style={petmartpaymentconfirmmethodstyles.centercontainer}>
                        <View style={petmartpaymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={petmartpaymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={petmartpaymentconfirmmethodstyles.remainderText}>We will remind you 30 minutes in advance</Text>
                      </View> */}
                      <TouchableOpacity
                        onPress={()=>navigation.navigate("Main")}
                      >
                         <View style={petmartpaymentconfirmmethodstyles.bottomshadow}>
                        <View style={petmartpaymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={petmartpaymentconfirmmethodstyles.nextBtnText}>Continue Shopping</Text>
                        </View>
                      </View>

                      </TouchableOpacity>
                   
              </View>
        </View>
    );
};

export default PetMartPaymentconfirmmethod;
