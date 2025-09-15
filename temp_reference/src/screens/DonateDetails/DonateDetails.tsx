

import React from 'react';
import { View, Text,TouchableOpacity,Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import donatedetailstyles from './donatedetails.styles';





// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    NGODetails:undefined;
    Donation:undefined;
    DonateAmount:undefined;
};

// Define the navigation prop type
type DonationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'NGODetails'
>;

// Define props interface for the component
interface DonationProps {
    navigation: DonationScreenNavigationProp;
}


const DonateDetails: React.FC<DonationProps> = ({navigation}) => {
    return (
        <View style={donatedetailstyles.container}>
           <View style={donatedetailstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('Donation')}}>
                            <View style={donatedetailstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={donatedetailstyles.iconColor}
                                />
                                <Text style={donatedetailstyles.textDateTime}>
                                   Donation
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>

                    <ScrollView
                     contentContainerStyle={donatedetailstyles.contentContainerStyle}
                          showsVerticalScrollIndicator={false}                 
                    >

                        <View style={donatedetailstyles.parentGap}>
                            <View style={donatedetailstyles.makemView}>
                                <Image
                                    source={images.dogRestHouseImage}
                                    style={donatedetailstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donatedetailstyles.paddingProgressBar}>

                                <Text style={donatedetailstyles.text}>
                                    Donate for Trauma Center
                                </Text>

                                {/* Progress Bar */}
                                <View style={donatedetailstyles.whiteProgressBar}>
                                    <View style={donatedetailstyles.BlueProgressBar} />
                                </View>

                                <Text style={donatedetailstyles.fundRaisedText}>
                                    <Text style={donatedetailstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>

                             <View style={donatedetailstyles.Gap}>
                            <View style={donatedetailstyles.flexAndGap}>
                                  <Image source={Icons.BiMap}/>
                                  <Text style={donatedetailstyles.locationText}>West Bengal</Text>
                            </View>
                             <View>
                                     <Text style={donatedetailstyles.DonateText}>Donate for Trauma Center</Text>
                             </View>
                             <View>
                                   <Text style={donatedetailstyles.paragraphText}>When an animal is brought to the PAWS Trauma Center. {"\n"}There is no chargeable fee. It is left to the willingness and {"\n"} ability of the person admitting the animal to donate an {"\n"} amount of their choice towards treatment. A small {"\n"} percentage of bear the cost of the treatment. The rest of the cases are borne by PAWS.</Text>
                             </View>
                        </View>
                        </View>
                  
                       

                    </ScrollView>

         
            <View style={donatedetailstyles.fixedButtonContainer}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('DonateAmount')}
                          style={donatedetailstyles.nextBtnContainer}>
                          <Text style={donatedetailstyles.nextBtnText}>Donate</Text>
                      </TouchableOpacity>
              </View>

        </View>
    );
};

export default DonateDetails;

