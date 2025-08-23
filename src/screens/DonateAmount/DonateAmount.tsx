

import React from 'react';
import { View, Text,TouchableOpacity,Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import donateamountstyles from './donateamount.styles';


// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    NGODetails:undefined;
    Donation:undefined;
    DonateDetails:undefined;
    DonatePaymentMethod:undefined;
};

// Define the navigation prop type
type DonationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'DonatePaymentMethod'
>;

// Define props interface for the component
interface DonationProps {
    navigation: DonationScreenNavigationProp;
}


const DonateAmount: React.FC<DonationProps> = ({navigation}) => {
    return (
        <View style={donateamountstyles.container}>
           <View style={donateamountstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('DonateDetails')}}>
                            <View style={donateamountstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={donateamountstyles.iconColor}
                                />
                                <Text style={donateamountstyles.textDateTime}>
                                   Donate Amount
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>

                    <ScrollView
                     contentContainerStyle={donateamountstyles.contentContainerStyle}
                          showsVerticalScrollIndicator={false}                 
                    >

                        <View style={donateamountstyles.parentGap}>
                            <View style={donateamountstyles.makemView}>
                                   <Text style={donateamountstyles.enteramountText}>
                                      Enter Donation amount
                                </Text>
                                     <View>
                                <View style={donateamountstyles.Gap}>  
                                 <View>
                                      <Text style={donateamountstyles.howmatchPayText} >How much you want to donate</Text>
                                 </View>
                                 <View style={donateamountstyles.amountView}>
                                       <Text style={donateamountstyles.amount}>₹ 000.00</Text>
                                 </View>
                                 <View style={donateamountstyles.flexRowGap}>
                                         <View style={donateamountstyles.incrementampountView}>
                                                <Text style={donateamountstyles.incrementampount}>₹ 100.00</Text>
                                         </View>
                                         <View style={donateamountstyles.incrementampountView}>
                                                <Text style={donateamountstyles.incrementampount}>₹ 200.00</Text>
                                         </View>
                                           <View style={donateamountstyles.incrementampountView}>
                                                <Text style={donateamountstyles.incrementampount}>₹ 300.00</Text>
                                          </View>
                                            <View style={donateamountstyles.incrementampountView}>
                                                <Text style={donateamountstyles.incrementampount}>₹ 500.00</Text>
                                          </View>  
                                 </View>
                                </View>
                        </View>
                            </View>
                        </View>
                    </ScrollView>

         
          <View style={donateamountstyles.bottomparentView}>
                 <View style={donateamountstyles.gapHeight}>
                 <TouchableOpacity 
                 onPress={() => navigation.navigate('DonatePaymentMethod')}
                    
                    >
                     <View style={donateamountstyles.googlePayIconGap}>
                            <Image source={Icons.googlepay} />
                            <Text style={donateamountstyles.payUsingText}>PAY USING</Text>
                            <Image source={Icons.IoIosArrowUp}/>
                     </View>
                     </TouchableOpacity>
                     <Text style={donateamountstyles.GooglePayUPIText}>Google Pay UPI</Text>
                 </View>
                   <View style={donateamountstyles.bookWalkerButton}>
                       <Text style={donateamountstyles.BookWalkerText}>Make Payment</Text>
                     </View>
             </View>



        </View>
    );
};

export default DonateAmount;

