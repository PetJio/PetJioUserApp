import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import donatepaymentconfirmmethodstyles from './donatepaymentconfirmmethod.styles';
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


const DonatePaymentconfirmmethod: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={donatepaymentconfirmmethodstyles.container}>
              <View>
                   <Image source={images.happycartoonDog} style={donatepaymentconfirmmethodstyles.imagesize}/>
              </View>
              <View style={donatepaymentconfirmmethodstyles.textView}>
                     <Text style={donatepaymentconfirmmethodstyles.text}>Hi Wrik,</Text>
              </View>
              <View style={donatepaymentconfirmmethodstyles.confirmTextView}>
                      <Text style={donatepaymentconfirmmethodstyles.confirmText}>Thank You for Your</Text>
                      <Text style={donatepaymentconfirmmethodstyles.confirmText}>Generous Donation!</Text>
              </View>
              <View style={donatepaymentconfirmmethodstyles.bookingView}>
                <View style={donatepaymentconfirmmethodstyles.booking}>
                        <Text style={donatepaymentconfirmmethodstyles.bookingInformationText}>We sincerely appreciate your generous {"\n"} donation! Your support makes a {"\n"} meaningful difference, and we are truly {"\n"} grateful for your kindness.</Text>
                 </View>
              </View>
              <View style={donatepaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={donatepaymentconfirmmethodstyles.flexview}>
                              <TouchableOpacity 
                                // onPress={()=>navigation.navigate('InvoiceDetails')}
                              >
                                 <View style={donatepaymentconfirmmethodstyles.Invoice}>
                                    <Text style={donatepaymentconfirmmethodstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                         
                      </View>
              </View>
              <View style={donatepaymentconfirmmethodstyles.invoiceandcancelview}>
                      <View style={donatepaymentconfirmmethodstyles.centercontainer}>
                        {/* <View style={donatepaymentconfirmmethodstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={donatepaymentconfirmmethodstyles.remaindertext}>Add a Reminder</Text>
                        </View> */}
                        <Text style={donatepaymentconfirmmethodstyles.remainderText}>Donations made to PAWS are exempt U/s 80G of the income {"\n"} tax Act vide approval number AABTGFGDCYTE156 Dated - 2 {"\n"} 5/10/24 & valid up to 25/10/26 </Text>
                      </View>
                       <TouchableOpacity
                        onPress={()=>navigation.navigate("Main", { screen: 'Home' })}
                       >
                        <View style={donatepaymentconfirmmethodstyles.bottomshadow}>
                        <View style={donatepaymentconfirmmethodstyles.nextBtnContainer}>
                            <Text style={donatepaymentconfirmmethodstyles.nextBtnText}>Go Back to Homepage</Text>
                        </View>
                      </View>

                       </TouchableOpacity>
                   
              </View>
        </View>
    );
};

export default DonatePaymentconfirmmethod;
