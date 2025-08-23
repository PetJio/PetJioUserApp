
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import ngouserdetailstyles from './ngouserdetails.styles';
import { useRoute, RouteProp } from '@react-navigation/native';


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout: undefined;
    Service: undefined;
    WalkingDetails: { section: string };
    WalkingUser: { section: string };
    Walking: undefined;
    ParaVetUser: { section: string };
    ParaVet: undefined;
    ParaVetLocatlity: { section: string };
    ParavetDetails:{ section: string };
    NGO:undefined;
    NGODetails:undefined;

    

};

// Define the navigation prop type
type WalkingUserScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ParaVetUser'
>;
type WalkingScreenRouteProp = RouteProp<RootStackParamList, 'ParaVetUser'>;

// Define prop types
type InSiteServiceProps = {
    navigation: WalkingUserScreenNavigationProp;
    route: WalkingScreenRouteProp;
};

const NGOUserDetails: React.FC<InSiteServiceProps> = ({ navigation, route}) => {
    return (
        <View style={ngouserdetailstyles.container}>
            <View style={ngouserdetailstyles.containerchild}>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate("NGO")}
                    >
                    <View style={ngouserdetailstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={ngouserdetailstyles.leftarrowicon}
                        />
                        <Text style={ngouserdetailstyles.groomingText}>
                            NGOs
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={() =>
                    //     navigation.navigate('ParaVetLocatlity', {
                    //         section: 'paravet',
                    //     })
                    // }
                    >
                        
                    <View style={ngouserdetailstyles.locationtext}>
                        <Text style={ngouserdetailstyles.locationtextColor}>
                            Kasba, Kolkata
                        </Text>
                        <Image
                            source={Icons.DownArrow}
                            style={ngouserdetailstyles.downArrowIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={ngouserdetailstyles.searchparent}>
                <View style={ngouserdetailstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={ngouserdetailstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={ngouserdetailstyles.filterbtn}>
                    <Image
                        source={Icons.Filter}
                        style={ngouserdetailstyles.filterIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        ngouserdetailstyles.contentContainerStyle
                    }>
                    <View style={ngouserdetailstyles.viewGap}>
                        <TouchableOpacity
                            // onPress={() =>
                            //     navigation.navigate('ParavetDetails', {
                            //         section: 'paravet',
                            //     })
                            // }
                            onPress={()=>navigation.navigate("NGODetails")}
                            >
                            <View
                                style={
                                    ngouserdetailstyles.containerthirdsubchild
                                }>
                                <View style={ngouserdetailstyles.shadow}>
                                    <Image
                                        source={images.petLogoImage}
                                        style={ngouserdetailstyles.userimage}
                                    />
                                    <View style={ngouserdetailstyles.gap}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextWidth
                                            }>
                                            <View
                                                style={
                                                    ngouserdetailstyles.userTextgap
                                                }>
                                                <Text
                                                    style={
                                                        ngouserdetailstyles.textSize
                                                    }>
                                                    {' '}
                                                    PAWS{' '}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    ngouserdetailstyles.ratingGap
                                                }>
                                                <Image
                                                    source={
                                                        Icons.MdVerifiedUser
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        ngouserdetailstyles.verifyText
                                                    }>
                                                    Verified
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.viewFlex}>
                                            <View
                                                style={
                                                    ngouserdetailstyles.setIconTextGap
                                                }>
                                                <Image
                                                    source={Icons.BiTimeFive}
                                                    style={
                                                        ngouserdetailstyles.setImageIconPosition
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        ngouserdetailstyles.setTextSize
                                                    }>
                                                    {' '}
                                                    06:00 am - 09:00 pm{' '}
                                                </Text>
                                            </View>

                                            <View
                                                style={
                                                    ngouserdetailstyles.ratingGap
                                                }>
                                                <Image
                                                    source={Icons.StarIcon}
                                                    style={
                                                        ngouserdetailstyles.ratingHeight
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        ngouserdetailstyles.ratePointSize
                                                    }>
                                                    {' '}
                                                    4.8
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={
                                                ngouserdetailstyles.widthSpace
                                            }>
                                            <View
                                                style={
                                                    ngouserdetailstyles.iconAndTextGap
                                                }>
                                                <Image
                                                    source={Icons.BiPhone}
                                                    style={
                                                        ngouserdetailstyles.setImageIconPosition
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        ngouserdetailstyles.setDigitSize
                                                    }>
                                                    {' '}
                                                    +91 8754663446{' '}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>

                                       
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>

                                       
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>

                                       
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ngouserdetailstyles.containerthirdsubchild}>
                            <View style={ngouserdetailstyles.shadow}>
                                <Image
                                    source={images.petLogoImage}
                                    style={ngouserdetailstyles.userimage}
                                />
                                <View style={ngouserdetailstyles.gap}>
                                    <View
                                        style={ngouserdetailstyles.userTextWidth}>
                                        <View
                                            style={
                                                ngouserdetailstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    ngouserdetailstyles.textSize
                                                }>
                                                {' '}
                                                PAWS{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.viewFlex}>
                                        <View
                                            style={
                                                ngouserdetailstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={ngouserdetailstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    ngouserdetailstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={ngouserdetailstyles.widthSpace}>
                                        <View
                                            style={
                                                ngouserdetailstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.BiPhone}
                                                style={
                                                    ngouserdetailstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    ngouserdetailstyles.setDigitSize
                                                }>
                                                {' '}
                                                +91 8754663446{' '}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default NGOUserDetails;
