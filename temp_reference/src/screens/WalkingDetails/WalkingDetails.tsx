import React, {useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native'
import walkingdetailstyles from './WalkingDetails.styles';
import WalkingAbout from './WalkingAbout';
import WalkingPackage from './WalkingPackage';
import WalkingReview from './WalkingReview';

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
    WalkingDetails:{ section: string };
};

// Define the navigation prop type
type WalkingDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WalkingDetails'>;
type WalkingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'WalkingDetails'>;

// Define props interface for the component
interface UserServiceProps {
    navigation: WalkingDetailsScreenNavigationProp; 
    route: WalkingDetailsScreenRouteProp;
}

const WalkingDetails: React.FC<UserServiceProps> = ({ navigation ,route}) => {
    const [activeTab, setActiveTab] = useState<string>('about');

    const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
        setActiveTab(tab);
    };

    return (
        <View style={walkingdetailstyles.container}>
            <View style={walkingdetailstyles.containerchild}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('WalkingUser', { section: 'walking' })}>
                    <View style={walkingdetailstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={walkingdetailstyles.leftarrowicon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={walkingdetailstyles.locationtext}>
                    <Image
                        source={Icons.LoveIcon}
                        style={walkingdetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={walkingdetailstyles.containerthirdsubchild}>
                <View style={walkingdetailstyles.shadow}>
                    <Image
                        source={images.walkinguserimage}
                        style={walkingdetailstyles.userimage}
                    />
                    <View style={walkingdetailstyles.gap}>
                        <View style={walkingdetailstyles.userTextWidth}>
                            <View style={walkingdetailstyles.userTextgap}>
                                <Text style={walkingdetailstyles.textSize}>
                                    {' '}
                                    Urmi Jana{' '}
                                </Text>
                            </View>
                            <View style={walkingdetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={walkingdetailstyles.ratingHeight}
                                />
                                <Text style={walkingdetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>

                        <View style={walkingdetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                style={walkingdetailstyles.setImageIconPosition}
                            />
                            <Text style={walkingdetailstyles.setTextSize}>
                                {' '}
                                3 years experience{' '}
                            </Text>
                        </View>

                        <View style={walkingdetailstyles.widthSpace}>
                            <View style={walkingdetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={
                                        walkingdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={walkingdetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={walkingdetailstyles.iconTextSpace}>
                                <Text style={walkingdetailstyles.bold}>
                                    {' '}
                                    ₹ 200/<Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#8E8E8E'}}>walk</Text>{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={walkingdetailstyles.menuTitleContainer}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('about', 'UserAbout')}>
                        <View style={walkingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    walkingdetailstyles.serviceText,
                                    activeTab === 'about' &&
                                        walkingdetailstyles.commonTextColor,
                                ]}>
                                About
                            </Text>
                            {activeTab === 'about' && (
                                <View
                                    style={
                                        walkingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('package', 'Packages')}>
                        <View style={walkingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    walkingdetailstyles.serviceText,
                                    activeTab === 'package' &&
                                        walkingdetailstyles.commonTextColor,
                                ]}>
                                Packages
                            </Text>
                            {activeTab === 'package' && (
                                <View
                                    style={
                                        walkingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('reviews', 'Reviews')}>
                        <View style={walkingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    walkingdetailstyles.reviewsText,
                                    activeTab === 'reviews' &&
                                        walkingdetailstyles.reviewsText,
                                ]}>
                                Reviews
                            </Text>
                            {activeTab === 'reviews' && (
                                <View
                                    style={
                                        walkingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'about' && (<WalkingAbout/>)}
            {activeTab === "package" && <WalkingPackage/>}
            {activeTab === "reviews" && <WalkingReview/>}
        </View>
    );
};

export default WalkingDetails;
