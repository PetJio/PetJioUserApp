import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import trainingpaymentconfirmmethodstyles from './trainingpaymentconfirmmethod.styles';
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


const TrainingPaymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={trainingpaymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={trainingpaymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={trainingpaymentconfirmmethodstyles.textView}>
                     <Text style={trainingpaymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={trainingpaymentconfirmmethodstyles.confirmTextView}>
                      <Text style={trainingpaymentconfirmmethodstyles.confirmText}>Your Booking Has Been</Text>
                      <Text style={trainingpaymentconfirmmethodstyles.confirmText}>Confirmed</Text>
              </View>
              <View style={trainingpaymentconfirmmethodstyles.bookingView}>
                <View style={trainingpaymentconfirmmethodstyles.booking}>
                        <Text style={trainingpaymentconfirmmethodstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={trainingpaymentconfirmmethodstyles.bookingInformationText}>Your grooming service at home with {"\n"}groomer Souvic Das is on Wednesday,{"\n"}</Text>
                        <Text style={trainingpaymentconfirmmethodstyles.date}>October 25 at 2:00 PM</Text>
                 </View>
              </View>
              <View style={trainingpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={trainingpaymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity 
                                // onPress={()=>navigation.navigate('InvoiceDetails')}
                              >
                                 <View style={trainingpaymentconfirmmethodstyles.Invoice}>
                                    <Text style={trainingpaymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={trainingpaymentconfirmmethodstyles.cancelbooking}>
                                    <Text style={trainingpaymentconfirmmethodstyles.cancelbookingtext}>Cancel Booking</Text>
                             </View>
                      </View>
              </View>
              <View style={trainingpaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={trainingpaymentconfirmmethodstyles.centercontainer}>
                        <View style={trainingpaymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={trainingpaymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={trainingpaymentconfirmmethodstyles.remainderText}>We will remind you 30 minutes in advance</Text>
                      </View>
                       <TouchableOpacity
                        onPress={()=>navigation.navigate("Main")}
                       >
                        <View style={trainingpaymentconfirmmethodstyles.bottomshadow}>
                        <View style={trainingpaymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={trainingpaymentconfirmmethodstyles.nextBtnText}>Go Back to Homepage</Text>
                        </View>
                      </View>

                       </TouchableOpacity>
                   
              </View>
        </View>
    );
};

export default TrainingPaymentconfirmmethod;
