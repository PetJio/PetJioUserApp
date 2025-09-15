

import React from 'react';
import { View, Text,TouchableOpacity,Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import donationstyles from './donation.styles';





// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    NGODetails:undefined;
    DonateDetails:undefined;
};

// Define the navigation prop type
type DonationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'DonateDetails'
>;

// Define props interface for the component
interface DonationProps {
    navigation: DonationScreenNavigationProp;
}


const Donation: React.FC<DonationProps> = ({navigation}) => {
    return (
        <View style={donationstyles.container}>
           <View style={donationstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NGODetails')}>
                            <View style={donationstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={donationstyles.iconColor}
                                />
                                <Text style={donationstyles.textDateTime}>
                                   Donation
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>

                    <ScrollView
                     contentContainerStyle={donationstyles.contentContainerStyle}
                          showsVerticalScrollIndicator={false}                 
                    >

                        <View style={donationstyles.parentGap}>
                            
                            <TouchableOpacity
                             onPress={()=>navigation.navigate("DonateDetails")}
                            >

                            <View style={donationstyles.makemView}>
                                <Image
                                    source={images.dogRestHouseImage}
                                    style={donationstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donationstyles.paddingProgressBar}>

                                <Text style={donationstyles.text}>
                                    Donate for Trauma Center
                                </Text>

                                {/* Progress Bar */}
                                <View style={donationstyles.whiteProgressBar}>
                                    <View style={donationstyles.BlueProgressBar} />
                                </View>

                                <Text style={donationstyles.fundRaisedText}>
                                    <Text style={donationstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>


                            </TouchableOpacity>

                            <View style={donationstyles.makemView}>
                                <Image
                                    source={images.foodbowlsImage}
                                    style={donationstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donationstyles.paddingProgressBar}>

                                <Text style={donationstyles.text}>
                                    Dog Bowl Fund
                                </Text>

                                {/* Progress Bar */}
                                <View style={donationstyles.whiteProgressBar}>
                                    <View style={donationstyles.BlueProgressBar} />
                                </View>

                                <Text style={donationstyles.fundRaisedText}>
                                    <Text style={donationstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>

                            <View style={donationstyles.makemView}>
                                <Image
                                    source={images.makedonationImage}
                                    style={donationstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donationstyles.paddingProgressBar}>

                                <Text style={donationstyles.text}>
                                Make a Donation
                                </Text>

                                {/* Progress Bar */}
                                <View style={donationstyles.whiteProgressBar}>
                                    <View style={donationstyles.BlueProgressBar} />
                                </View>

                                <Text style={donationstyles.fundRaisedText}>
                                    <Text style={donationstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>

                            <View style={donationstyles.makemView}>
                                <Image
                                    source={images.donatecareImage}
                                    style={donationstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donationstyles.paddingProgressBar}>

                                <Text style={donationstyles.text}>
                                Donate for Trauma Care
                                </Text>

                                {/* Progress Bar */}
                                <View style={donationstyles.whiteProgressBar}>
                                    <View style={donationstyles.BlueProgressBar} />
                                </View>

                                <Text style={donationstyles.fundRaisedText}>
                                    <Text style={donationstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>



                            <View style={donationstyles.makemView}>
                                <Image
                                    source={images.catcareImage}
                                    style={donationstyles.imageSize}
                                    resizeMode="cover"
                                />

                            <View style={donationstyles.paddingProgressBar}>

                                <Text style={donationstyles.text}>
                                 Care for Cats
                                </Text>

                                {/* Progress Bar */}
                                <View style={donationstyles.whiteProgressBar}>
                                    <View style={donationstyles.BlueProgressBar} />
                                </View>

                                <Text style={donationstyles.fundRaisedText}>
                                    <Text style={donationstyles.amountColor}>₹ 10000.00</Text> fund raised
                                </Text>

                                </View>
                            </View>


                            

                    


                        </View>

                    </ScrollView>

        </View>
    );
};

export default Donation;

