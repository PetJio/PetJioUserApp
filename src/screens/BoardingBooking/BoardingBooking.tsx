import React from 'react';
import { View, Text ,Image,TouchableOpacity,ImageBackground } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import boardingbookingstyles from './boardingbooking.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


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


const BoardingBooking: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={boardingbookingstyles.container}>
            <ImageBackground source={images.googleMap} style={boardingbookingstyles.mapImage}>
            <View style={{width:responsiveWidth(100), height:responsiveHeight(50),backgroundColor:'#FFFFFF',position:'absolute',bottom:0}}>
             <View style={{flexDirection:'row'}}>
                   <Image source={images.happycartoonDog} style={boardingbookingstyles.imagesize}/>
                    <View style={{justifyContent:'flex-start',alignItems:'flex-start',paddingHorizontal:responsiveWidth(5),top:responsiveHeight(4)}}>
                          <Text style={boardingbookingstyles.text}>Hi Wrik,</Text>
                           <Text style={boardingbookingstyles.confirmText}>Your Booking Has Been</Text>
                      <Text style={boardingbookingstyles.confirmText}>Confirmed</Text>
                    </View>
                 
                  
             </View>

              <View style={boardingbookingstyles.bookingView}>
                <View style={boardingbookingstyles.booking}>
                        <Text style={boardingbookingstyles.bookingIDText}>Booking ID TPN-67331 </Text>
                        <Text style={boardingbookingstyles.bookingInformationText}>Your grooming service at home with {"\n"}groomer Souvic Das is on Wednesday,{"\n"}</Text>
                        <Text style={boardingbookingstyles.date}>October 25 at 2:00 PM</Text>
                 </View>
              </View>
                <View style={boardingbookingstyles.invoiceandcancelview}>
                      <View style={boardingbookingstyles.flexview}>
                              <TouchableOpacity 
                                // onPress={()=>navigation.navigate('InvoiceDetails')}
                              >
                                 <View style={boardingbookingstyles.Invoice}>
                                    <Text style={boardingbookingstyles.invoicetext}>View Invoice</Text>
                                 </View>
                              </TouchableOpacity>
                             <View style={boardingbookingstyles.cancelbooking}>
                                    <Text style={boardingbookingstyles.cancelbookingtext}>Cancel Booking</Text>
                             </View>
                      </View>
              </View>
                
              <View style={boardingbookingstyles.centercontainer}>
                        <View style={boardingbookingstyles.remainderTextIconView}>
                                <Image source={Icons.BiAlarmExclamation} />
                                <Text style={boardingbookingstyles.remaindertext}>Add a Reminder</Text>
                        </View>
                        <Text style={boardingbookingstyles.remainderText}>We will remind you 30 minutes in advance</Text>
              </View>


              {/* Fixed Next Button */}
            <View style={boardingbookingstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main')}
                    style={boardingbookingstyles.nextBtnContainer}>
                    <Text style={boardingbookingstyles.nextBtnText}>Go Back to Homepage</Text>
                </TouchableOpacity>
            </View>


                   
            </View>
        </ImageBackground>

            

              
               
        </View>
    );
};

export default BoardingBooking;
