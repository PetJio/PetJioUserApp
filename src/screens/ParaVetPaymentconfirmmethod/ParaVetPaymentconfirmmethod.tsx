import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';

import paravetpaymentconfirmmethodstyles from './paravetpaymentconfirmmethod.styles';
import { StackNavigationProp } from '@react-navigation/stack';




// Define your navigation stack's param list
type RootStackParamList = {
    InvoiceDetails:undefined;
    Home:undefined;
    Main:undefined;
  
};

// Define the navigation prop type
type InvoiceDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InvoiceDetails'>;

// Define props interface for the component
interface InvoiceProps {
  navigation: InvoiceDetailsScreenNavigationProp;
}


const ParaVetPaymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={paravetpaymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={paravetpaymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={paravetpaymentconfirmmethodstyles.textView}>
                     <Text style={paravetpaymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={paravetpaymentconfirmmethodstyles.confirmTextView}>
                      <Text style={paravetpaymentconfirmmethodstyles.confirmText}>Your Booking Has Been</Text>
                      <Text style={paravetpaymentconfirmmethodstyles.confirmText}>Confirmed</Text>
              </View>
              <View style={paravetpaymentconfirmmethodstyles.bookingView}>
                <View style={paravetpaymentconfirmmethodstyles.booking}>
                        <Text style={paravetpaymentconfirmmethodstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={paravetpaymentconfirmmethodstyles.bookingInformationText}>Your grooming service at home with {"\n"}groomer Souvic Das is on Wednesday,{"\n"}</Text>
                        <Text style={paravetpaymentconfirmmethodstyles.date}>October 25 at 2:00 PM</Text>
                 </View>
              </View>
              <View style={paravetpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={paravetpaymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity 
                                // onPress={()=>navigation.navigate('InvoiceDetails')}
                              >
                                 <View style={paravetpaymentconfirmmethodstyles.Invoice}>
                                    <Text style={paravetpaymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={paravetpaymentconfirmmethodstyles.cancelbooking}>
                                    <Text style={paravetpaymentconfirmmethodstyles.cancelbookingtext}>Cancel Booking</Text>
                             </View>
                      </View>
              </View>
              <View style={paravetpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={paravetpaymentconfirmmethodstyles.centercontainer}>
                        <View style={paravetpaymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={paravetpaymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={paravetpaymentconfirmmethodstyles.remainderText}>We will remind you 30 minutes in advance</Text>
                      </View>
                       <TouchableOpacity
                        onPress={()=>navigation.navigate("Main", { screen: 'Home' })}
                       >
                        <View style={paravetpaymentconfirmmethodstyles.bottomshadow}>
                        <View style={paravetpaymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={paravetpaymentconfirmmethodstyles.nextBtnText}>Go Back to Homepage</Text>
                        </View>
                      </View>

                       </TouchableOpacity>
                   
              </View>
        </View>
    );
};

export default ParaVetPaymentconfirmmethod;
