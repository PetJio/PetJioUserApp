import React, {useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import paravetdetailstyles from './paravetdetails.styles';
import ParavetAbout from './ParavetAbout';
import ParavetPackage from './ParavetPackage';
import ParavetReview from './ParavetReview';
import ParavetServices from './ParavetServices';



// Define your navigation stack's param list
type RootStackParamList = {
    UserService: undefined;
    UserReview: undefined;
    UserAbout: undefined;
    HomeService: undefined;
    WalkingUser:{ section: string };
    Main: undefined;
    Locality: undefined;
    Packages: undefined;
    Reviews: undefined;
    Services:undefined;
    WalkingDetails:{ section: string };
    TrainingUser:{ section: string };
    TrainingDetails:{ section: string };
    ParavetDetails:undefined;
    ParaVetUser:{section:string}
};

// Define the navigation prop type
type WalkingDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParavetDetails'>;
type WalkingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ParavetDetails'>;

// Define props interface for the component
interface UserServiceProps {
    navigation: WalkingDetailsScreenNavigationProp; 
    route: WalkingDetailsScreenRouteProp;
}

const ParavetDetails: React.FC<UserServiceProps> = ({ navigation ,route}) => {
    const [activeTab, setActiveTab] = useState<string>('about');

    const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
        setActiveTab(tab);
    };

    return (
        <View style={paravetdetailstyles.container}>
            <View style={paravetdetailstyles.containerchild}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ParaVetUser', { section: 'paravet' })}>
                    <View style={paravetdetailstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={paravetdetailstyles.leftarrowicon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={paravetdetailstyles.locationtext}>
                    <Image
                        source={Icons.LoveIcon}
                        style={paravetdetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={paravetdetailstyles.containerthirdsubchild}>
                <View style={paravetdetailstyles.shadow}>
                    <Image
                        source={images.paravetUserImage}
                        style={paravetdetailstyles.userimage}
                    />
                    <View style={paravetdetailstyles.gap}>
                        <View style={paravetdetailstyles.userTextWidth}>
                            <View style={paravetdetailstyles.userTextgap}>
                                <Text style={paravetdetailstyles.textSize}>
                                    {' '}
                                    Joe Davis{' '}
                                </Text>
                                
                            </View>
                            <View style={ paravetdetailstyles.ratingGap }>
                              <Image source={ Icons.MdVerifiedUser}/>
                                <Text style={ paravetdetailstyles.verifyText}> Verified</Text>
                         </View>
                        </View>

                        <View style={paravetdetailstyles.experienceverification}>
                        <View style={paravetdetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                style={paravetdetailstyles.setImageIconPosition}
                            />
                            <Text style={paravetdetailstyles.setTextSize}>
                                {' '}
                                3 years experience{' '}
                            </Text>
                        </View>

                        <View style={paravetdetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={paravetdetailstyles.ratingHeight}
                                />
                                <Text style={paravetdetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                       </View>
                        </View>

                        <View style={paravetdetailstyles.widthSpace}>
                            <View style={paravetdetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={
                                        paravetdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={paravetdetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={paravetdetailstyles.iconTextSpace}>
                                
                                <Text style={paravetdetailstyles.bold}>
                                    {' '}
                                    ₹ 350 - ₹ 600
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={paravetdetailstyles.menuTitleContainer}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('about', 'UserAbout')}>
                        <View style={paravetdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    paravetdetailstyles.serviceText,
                                    activeTab === 'about' &&
                                        paravetdetailstyles.commonTextColor,
                                ]}>
                                About
                            </Text>
                            {activeTab === 'about' && (
                                <View
                                    style={
                                        paravetdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('services', 'Services')}>
                        <View style={paravetdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    paravetdetailstyles.serviceText,
                                    activeTab === 'services' &&
                                        paravetdetailstyles.commonTextColor,
                                ]}>
                                Services
                            </Text>
                            {activeTab === 'services' && (
                                <View
                                    style={
                                        paravetdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('reviews', 'Reviews')}>
                        <View style={paravetdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    paravetdetailstyles.reviewsText,
                                    activeTab === 'reviews' &&
                                        paravetdetailstyles.reviewsText,
                                ]}>
                                Reviews
                            </Text>
                            {activeTab === 'reviews' && (
                                <View
                                    style={
                                        paravetdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'about' && (<ParavetAbout/>)}
            {activeTab === "services" && <ParavetServices/>}
            {activeTab === "reviews" && (<ParavetReview/>)}
        </View>
    );
};

export default ParavetDetails;
