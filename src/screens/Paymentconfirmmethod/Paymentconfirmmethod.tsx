import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Paymentconfirmmethodstyles from './Paymentconfirmmethod.styles';
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


const Paymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={Paymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={Paymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={Paymentconfirmmethodstyles.textView}>
                     <Text style={Paymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={Paymentconfirmmethodstyles.confirmTextView}>
                      <Text style={Paymentconfirmmethodstyles.confirmText}>Your Booking Has Been</Text>
                      <Text style={Paymentconfirmmethodstyles.confirmText}>Confirmed</Text>
              </View>
              <View style={Paymentconfirmmethodstyles.bookingView}>
                <View style={Paymentconfirmmethodstyles.booking}>
                        <Text style={Paymentconfirmmethodstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={Paymentconfirmmethodstyles.bookingInformationText}>Your grooming service at home with {"\n"}groomer Souvic Das is on Wednesday,{"\n"}</Text>
                        <Text style={Paymentconfirmmethodstyles.date}>October 25 at 2:00 PM</Text>
                 </View>
              </View>
              <View style={Paymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={Paymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity onPress={()=>navigation.navigate('InvoiceDetails')}>
                                 <View style={Paymentconfirmmethodstyles.Invoice}>
                                    <Text style={Paymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={Paymentconfirmmethodstyles.cancelbooking}>
                                    <Text style={Paymentconfirmmethodstyles.cancelbookingtext}>Cancel Booking</Text>
                             </View>
                      </View>
              </View>
              <View style={Paymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={Paymentconfirmmethodstyles.centercontainer}>
                        <View style={Paymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={Paymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={Paymentconfirmmethodstyles.remainderText}>We will remind you 30 minutes in advance</Text>
                      </View>
                    <TouchableOpacity  onPress={()=>navigation.navigate("Main", { screen: 'Home' })}>
                           <View style={Paymentconfirmmethodstyles.bottomshadow}>
                        <View style={Paymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={Paymentconfirmmethodstyles.nextBtnText}>Go Back to Homepage</Text>
                        </View>
                      </View>
                   </TouchableOpacity>
                   
              </View>
        </View>
    ); 
};

export default Paymentconfirmmethod;
