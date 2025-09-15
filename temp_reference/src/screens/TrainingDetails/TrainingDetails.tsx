import React, {useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import trainingdetailstyles from './trainingdetails.styles';
import TrainerAbout from './TrainerAbout';
import TrainerPackage from './TrainerPackage';
import TrainerReview from './TrainerReview';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


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
};

// Define the navigation prop type
type WalkingDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TrainingDetails'>;
type WalkingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TrainingDetails'>;

// Define props interface for the component
interface UserServiceProps {
    navigation: WalkingDetailsScreenNavigationProp; 
    route: WalkingDetailsScreenRouteProp;
}

const TrainingDetails: React.FC<UserServiceProps> = ({ navigation ,route}) => {
    const [activeTab, setActiveTab] = useState<string>('about');

    const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
        setActiveTab(tab);
    };

    return (
        <View style={trainingdetailstyles.container}>
            <View style={trainingdetailstyles.containerchild}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TrainingUser', { section: 'training' })}>
                    <View style={trainingdetailstyles.containerfirstsubchild}>
                        <Image
                            source={Icons.LeftArrow}
                            style={trainingdetailstyles.leftarrowicon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={trainingdetailstyles.locationtext}>
                <Image
                        source={Icons.BiMessageSquareDetail}
                        style={{width:responsiveWidth(4), height:responsiveHeight(1.9)}}
                    />
                    <Image
                        source={Icons.LoveIcon}
                        style={trainingdetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={trainingdetailstyles.containerthirdsubchild}>
                <View style={trainingdetailstyles.shadow}>
                    <Image
                        source={images.walkinguserimage}
                        style={trainingdetailstyles.userimage}
                    />
                    <View style={trainingdetailstyles.gap}>
                        <View style={trainingdetailstyles.userTextWidth}>
                            <View style={trainingdetailstyles.userTextgap}>
                                <Text style={trainingdetailstyles.textSize}>
                                    {' '}
                                    Souvic Das{' '}
                                </Text>
                            </View>
                            <View style={trainingdetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={trainingdetailstyles.ratingHeight}
                                />
                                <Text style={trainingdetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>

                        <View style={trainingdetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                style={trainingdetailstyles.setImageIconPosition}
                            />
                            <Text style={trainingdetailstyles.setTextSize}>
                                {' '}
                                3 years experience{' '}
                            </Text>
                        </View>

                        <View style={trainingdetailstyles.widthSpace}>
                            <View style={trainingdetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={
                                        trainingdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={trainingdetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={trainingdetailstyles.iconTextSpace}>
                                <Text style={trainingdetailstyles.bold}>
                                    {' '}
                                    ₹ 200{' '}
                                </Text>
                                <Text>/Day</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={trainingdetailstyles.menuTitleContainer}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('about', 'UserAbout')}>
                        <View style={trainingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    trainingdetailstyles.serviceText,
                                    activeTab === 'about' &&
                                        trainingdetailstyles.commonTextColor,
                                ]}>
                                About
                            </Text>
                            {activeTab === 'about' && (
                                <View
                                    style={
                                        trainingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('package', 'Packages')}>
                        <View style={trainingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    trainingdetailstyles.serviceText,
                                    activeTab === 'package' &&
                                        trainingdetailstyles.commonTextColor,
                                ]}>
                                Packages
                            </Text>
                            {activeTab === 'package' && (
                                <View
                                    style={
                                        trainingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('reviews', 'Reviews')}>
                        <View style={trainingdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                    trainingdetailstyles.reviewsText,
                                    activeTab === 'reviews' &&
                                        trainingdetailstyles.reviewsText,
                                ]}>
                                Reviews
                            </Text>
                            {activeTab === 'reviews' && (
                                <View
                                    style={
                                        trainingdetailstyles.menuBottomBoarder
                                    }
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'about' && (<TrainerAbout/>)}
            {activeTab === "package" && <TrainerPackage/>}
            {activeTab === "reviews" && <TrainerReview/>}
        </View>
    );
};

export default TrainingDetails;
