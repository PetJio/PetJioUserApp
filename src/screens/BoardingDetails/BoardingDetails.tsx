import React, {useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import boardingdetailstyles from './boardingdetails.styles';
import BoardingAbout from './BoardingAbout';
import BoardingReview from './BoardingReview';

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
    TrainingUser:{ section: string };
    TrainingDetails:{ section: string };
    BoardingUser:{ section: string };
    BoardingDetails:undefined;
    BoardingReview:undefined
};

// Define the navigation prop type
type WalkingDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;
type WalkingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface BoardingDetailsProps {
    navigation: WalkingDetailsScreenNavigationProp; 
    route: WalkingDetailsScreenRouteProp;
}

const BoardingDetails: React.FC<BoardingDetailsProps> = ({ navigation}) => {
    const [activeTab, setActiveTab] = useState<string>('about');

    const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
        setActiveTab(tab);
    };

    return (
        <View style={boardingdetailstyles.container}>
            <View style={boardingdetailstyles.containerchild}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('BoardingUser', { section: 'boarding' })}>
                    <View style={boardingdetailstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={boardingdetailstyles.leftarrowicon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={boardingdetailstyles.locationtext}>
                <Image
                        source={Icons.MdOutlineCall}
                        style={boardingdetailstyles.IconSize}
                    />
                    <Image
                        source={Icons.LoveIcon}
                        style={boardingdetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={boardingdetailstyles.containerthirdsubchild}>
                <View style={boardingdetailstyles.shadow}>
                    <Image
                        source={images.walkinguserimage}
                        style={boardingdetailstyles.userimage}
                    />
                    <View style={boardingdetailstyles.gap}>
                        <View style={boardingdetailstyles.userTextWidth}>
                            <View style={boardingdetailstyles.userTextgap}>
                                <Text style={boardingdetailstyles.textSize}>
                                    {' '}
                                    Kiara Das{' '}
                                </Text>
                            </View>
                            <View style={boardingdetailstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardingdetailstyles.verifyText}>Verified</Text>
                           </View>

                         </View>

                        <View style={boardingdetailstyles.flex}>
                        <View style={boardingdetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.BiTimeFive}
                                style={boardingdetailstyles.setImageIconPosition}
                            />
                            <Text style={boardingdetailstyles.setTextSize}>
                                {' '}
                                10:00 am - 09:00 pm{' '}
                            </Text>
                        </View>
                        <View style={boardingdetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={boardingdetailstyles.ratingHeight}
                                />
                                <Text style={boardingdetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>
                        <View style={boardingdetailstyles.widthSpace}>
                            <View style={boardingdetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.locationposition}
                                    style={
                                        boardingdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={boardingdetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={boardingdetailstyles.iconTextSpace}>
                                <Text style={boardingdetailstyles.bold}>
                                    {' '}
                                    ₹ 200{' '}
                                </Text>
                                <Text>/Day</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={boardingdetailstyles.menuTitleContainer}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('about', 'UserAbout')}>
                        <View style={boardingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    boardingdetailstyles.serviceText,
                                    activeTab === 'about' &&
                                        boardingdetailstyles.commonTextColor,
                                ]}>
                                About
                            </Text>
                            {activeTab === 'about' && (
                                <View
                                    style={
                                        boardingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('reviews', 'Reviews')}>
                        <View style={boardingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    boardingdetailstyles.reviewsText,
                                    activeTab === 'reviews' &&
                                        boardingdetailstyles.reviewsText,
                                ]}>
                                Reviews
                            </Text>
                            {activeTab === 'reviews' && (
                                <View
                                    style={
                                        boardingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'about' && (<BoardingAbout/>)}
            {activeTab === "reviews" && <BoardingReview/>}
        </View>
    );
};

export default BoardingDetails;
