import  { useState } from 'react';
import { View, Text, Image, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import veterinarydetailstyles from './veterinarydetail.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import {responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
import VeterinaryAbout from './VeterinaryAbout';
import VeterinaryReview from './VeterinaryReview';


// Define your navigation stack's param list
type RootStackParamList = {
     UserService: undefined;
     UserReview:undefined;
     ServicePrice:undefined;
     GroomingDetails:undefined;
     HomeService:undefined;
     VeterinariansDetails:undefined;
     main:undefined;
     ServiceStackNavigator:undefined;
};

// Define the navigation prop type
type UserServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GroomingDetails'>;

// Define props interface for the component
interface UserServiceProps {
    navigation: UserServiceScreenNavigationProp; // Navigation is now required
    route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}



// Define Type for Each Service Item
interface Service {
    id: number;
    title: string;
    time: string;
    image: any;
}

// Example Array of Objects
const services: Service[] = [
    {
        id: 1,
        title: 'Hair Cut',
        time: '40 minutes',
        image: images.HairCutDog,
    },
    {
        id: 2,
        title: 'Nail Clipping',
        time: '20 minutes',
        image: images.HairCutDog,
    },
    {
        id: 3,
        title: 'Bathing',
        time: '20 minutes',
        image: images.HairCutDog,
    },
    {
        id: 4,
        title: 'Fur Brushing',
        time: '15 minutes',
        image: images.HairCutDog,
    },
];

const VeterinaryDetails: React.FC<UserServiceProps> = ({navigation}) => {
    const [activeTab, setActiveTab] = useState<string>("about");
     // Function to handle tab selection and navigation
  const handleTabPress = (tab:string, screen?: keyof RootStackParamList) => {
    setActiveTab(tab);
    // if (screen) {
    //   navigation.navigate(screen);
    // }
  };

   

    return (
        <View
            style={veterinarydetailstyles.container}>
            <View style={veterinarydetailstyles.containerchild}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                <View style={veterinarydetailstyles.containerfirstsubchild}>
                    <Image
                        source={Icons.LeftArrow}
                        style={veterinarydetailstyles.leftarrowicon}
                    />
                </View>
                </TouchableOpacity>
                <View style={veterinarydetailstyles.locationtext}>
                    <Image
                        source={Icons.BiMessageSquareDots}
                        style={veterinarydetailstyles.downArrowIcon}
                    />
                    <Image
                        source={Icons.LoveIcon}
                        style={veterinarydetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={veterinarydetailstyles.containerthirdsubchild}>
                <View style={veterinarydetailstyles.shadow}>
                    <Image
                        source={images.doctorImage}
                        style={veterinarydetailstyles.userimage}
                    />
                    <View style={veterinarydetailstyles.gap}>
                        <View style={veterinarydetailstyles.userTextWidth}>
                            <View style={veterinarydetailstyles.userTextgap}>
                                <Text style={veterinarydetailstyles.textSize}>
                                    {' '}
                                    Dr. Samar Halder{' '}
                                </Text>
                            </View>
                            <View style={veterinarydetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarydetailstyles.ratingHeight}
                                />
                                <Text style={veterinarydetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>

                        <View style={veterinarydetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                
                            />
                            <Text style={veterinarydetailstyles.setTextSize}>
                                {' '}
                                7 years experience{' '}
                            </Text>
                        </View>

                        <View style={veterinarydetailstyles.widthSpace}>
                            <View style={veterinarydetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                  
                                />
                                <Text style={veterinarydetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={veterinarydetailstyles.iconAndTextGap}>
                                <Image source={Icons.BiBriefcase}/>
                                <Text style={veterinarydetailstyles.setDigitSize}>
                                    {' '}
                                    Dentistry{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                    <View style={veterinarydetailstyles.menuTitleContainer}>
                        {/* About Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("about")}>
                            <View style={veterinarydetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                veterinarydetailstyles.serviceText,
                                activeTab === "about" && veterinarydetailstyles.aboutText,
                                ]}
                            >
                                About
                            </Text>
                            {activeTab === "about" && <View style={veterinarydetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>

                        {/* Reviews Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("review")}>
                            <View style={veterinarydetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                veterinarydetailstyles.reviewsText,
                                activeTab === "review" && veterinarydetailstyles.aboutText,
                                ]}
                            >
                                Reviews
                            </Text>
                            {activeTab === "review" && <View style={veterinarydetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
             {activeTab === "about" && <VeterinaryAbout/>}
             {activeTab === "review" && <VeterinaryReview/>}
        </View>
    );
};

export default VeterinaryDetails;
