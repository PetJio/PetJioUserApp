import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import groomingpaymentconfirmmethodstyles from './groomingpaymentconfirmmethod.styles';
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


const GroomingPaymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={groomingpaymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={groomingpaymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={groomingpaymentconfirmmethodstyles.textView}>
                     <Text style={groomingpaymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={groomingpaymentconfirmmethodstyles.confirmTextView}>
                      <Text style={groomingpaymentconfirmmethodstyles.confirmText}>Your Booking Has Been</Text>
                      <Text style={groomingpaymentconfirmmethodstyles.confirmText}>Confirmed</Text>
              </View>
              <View style={groomingpaymentconfirmmethodstyles.bookingView}>
                <View style={groomingpaymentconfirmmethodstyles.booking}>
                        <Text style={groomingpaymentconfirmmethodstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={groomingpaymentconfirmmethodstyles.bookingInformationText}>Your grooming service at home with {"\n"}groomer Souvic Das is on Wednesday,{"\n"}</Text>
                        <Text style={groomingpaymentconfirmmethodstyles.date}>October 25 at 2:00 PM</Text>
                 </View>
              </View>
              <View style={groomingpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={groomingpaymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity 
                                // onPress={()=>navigation.navigate('InvoiceDetails')}
                              >
                                 <View style={groomingpaymentconfirmmethodstyles.Invoice}>
                                    <Text style={groomingpaymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={groomingpaymentconfirmmethodstyles.cancelbooking}>
                                    <Text style={groomingpaymentconfirmmethodstyles.cancelbookingtext}>Cancel Booking</Text>
                             </View>
                      </View>
              </View>
              <View style={groomingpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={groomingpaymentconfirmmethodstyles.centercontainer}>
                        <View style={groomingpaymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={groomingpaymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={groomingpaymentconfirmmethodstyles.remainderText}>We will remind you 30 minutes in advance</Text>
                      </View>
                       <TouchableOpacity
                        onPress={()=>navigation.navigate("Main")}
                       >
                        <View style={groomingpaymentconfirmmethodstyles.bottomshadow}>
                        <View style={groomingpaymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={groomingpaymentconfirmmethodstyles.nextBtnText}>Go Back to Homepage</Text>
                        </View>
                      </View>

                       </TouchableOpacity>
                   
              </View>
        </View>
    );
};

export default GroomingPaymentconfirmmethod;
