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
import paravetuserstyles from './paravet.styles';
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
    ParavetDetails:{ section: string }

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

const ParaVetUser: React.FC<InSiteServiceProps> = ({ navigation, route }) => {
    const { section } = route?.params;
    const handleTabWithNavigation = () => {
        if (section === 'paravet') {
            navigation.navigate('ParaVet');
        }
    };

    return (
        <View style={paravetuserstyles.container}>
            <View style={paravetuserstyles.containerchild}>
                <TouchableOpacity onPress={() => handleTabWithNavigation()}>
                    <View style={paravetuserstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={paravetuserstyles.leftarrowicon}
                        />
                        <Text style={paravetuserstyles.groomingText}>
                            Para Vet
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ParaVetLocatlity', {
                            section: 'paravet',
                        })
                    }>
                    <View style={paravetuserstyles.locationtext}>
                        <Text style={paravetuserstyles.locationtextColor}>
                            Kasba, Kolkata
                        </Text>
                        <Image
                            source={Icons.DownArrow}
                            style={paravetuserstyles.downArrowIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={paravetuserstyles.searchparent}>
                <View style={paravetuserstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={paravetuserstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={paravetuserstyles.filterbtn}>
                    <Image
                        source={Icons.Filter}
                        style={paravetuserstyles.filterIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        paravetuserstyles.contentContainerStyle
                    }>
                    <View style={paravetuserstyles.viewGap}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ParavetDetails', {
                                    section: 'paravet',
                                })
                            }>
                            <View
                                style={
                                    paravetuserstyles.containerthirdsubchild
                                }>
                                <View style={paravetuserstyles.shadow}>
                                    <Image
                                        source={images.paravetUserImage}
                                        style={paravetuserstyles.userimage}
                                    />
                                    <View style={paravetuserstyles.gap}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextWidth
                                            }>
                                            <View
                                                style={
                                                    paravetuserstyles.userTextgap
                                                }>
                                                <Text
                                                    style={
                                                        paravetuserstyles.textSize
                                                    }>
                                                    {' '}
                                                    Joe Davis{' '}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    paravetuserstyles.ratingGap
                                                }>
                                                <Image
                                                    source={
                                                        Icons.MdVerifiedUser
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        paravetuserstyles.verifyText
                                                    }>
                                                    Verified
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={paravetuserstyles.viewFlex}>
                                            <View
                                                style={
                                                    paravetuserstyles.setIconTextGap
                                                }>
                                                <Image
                                                    source={Icons.BiTimeFive}
                                                    style={
                                                        paravetuserstyles.setImageIconPosition
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        paravetuserstyles.setTextSize
                                                    }>
                                                    {' '}
                                                    06:00 am - 09:00 pm{' '}
                                                </Text>
                                            </View>

                                            <View
                                                style={
                                                    paravetuserstyles.ratingGap
                                                }>
                                                <Image
                                                    source={Icons.StarIcon}
                                                    style={
                                                        paravetuserstyles.ratingHeight
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        paravetuserstyles.ratePointSize
                                                    }>
                                                    {' '}
                                                    4.8
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.widthSpace
                                            }>
                                            <View
                                                style={
                                                    paravetuserstyles.iconAndTextGap
                                                }>
                                                <Image
                                                    source={Icons.Vector}
                                                    style={
                                                        paravetuserstyles.setImageIconPosition
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        paravetuserstyles.setDigitSize
                                                    }>
                                                    {' '}
                                                    7 years experience{' '}
                                                </Text>
                                            </View>

                                            <View
                                                style={
                                                    paravetuserstyles.iconTextSpace
                                                }>
                                                <Text
                                                    style={
                                                        paravetuserstyles.bold
                                                    }>
                                                    {' '}
                                                    ₹ 350 - ₹ 600
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={paravetuserstyles.containerthirdsubchild}>
                            <View style={paravetuserstyles.shadow}>
                                <Image
                                    source={images.paravetUserImage}
                                    style={paravetuserstyles.userimage}
                                />
                                <View style={paravetuserstyles.gap}>
                                    <View
                                        style={paravetuserstyles.userTextWidth}>
                                        <View
                                            style={
                                                paravetuserstyles.userTextgap
                                            }>
                                            <Text
                                                style={
                                                    paravetuserstyles.textSize
                                                }>
                                                {' '}
                                                Joe Davis{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.MdVerifiedUser}
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.verifyText
                                                }>
                                                Verified
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.viewFlex}>
                                        <View
                                            style={
                                                paravetuserstyles.setIconTextGap
                                            }>
                                            <Image
                                                source={Icons.BiTimeFive}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setTextSize
                                                }>
                                                {' '}
                                                06:00 am - 09:00 pm{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={paravetuserstyles.ratingGap}>
                                            <Image
                                                source={Icons.StarIcon}
                                                style={
                                                    paravetuserstyles.ratingHeight
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.ratePointSize
                                                }>
                                                {' '}
                                                4.8
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={paravetuserstyles.widthSpace}>
                                        <View
                                            style={
                                                paravetuserstyles.iconAndTextGap
                                            }>
                                            <Image
                                                source={Icons.Vector}
                                                style={
                                                    paravetuserstyles.setImageIconPosition
                                                }
                                            />
                                            <Text
                                                style={
                                                    paravetuserstyles.setDigitSize
                                                }>
                                                {' '}
                                                7 years experience{' '}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                paravetuserstyles.iconTextSpace
                                            }>
                                            <Text
                                                style={paravetuserstyles.bold}>
                                                {' '}
                                                ₹ 350 - ₹ 600
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

export default ParaVetUser;
