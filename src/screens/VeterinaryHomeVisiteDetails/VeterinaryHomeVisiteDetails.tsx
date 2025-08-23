import  { useState } from 'react';
import { View, Text, Image, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import veterinaryhomevisitedetailstyles from './veterinaryhomevisitedetails.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import {responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
import VeterinaryHomeVisiteAbout from './VeterinaryHomeVisiteAbout';
import VeterinaryHomeVisiteReview from './VeterinaryHomeVisiteReview';


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
     Main:undefined;
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

const VeterinaryHomeVisiteDetails: React.FC<UserServiceProps> = ({navigation}) => {
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
            style={veterinaryhomevisitedetailstyles.container}>
            <View style={veterinaryhomevisitedetailstyles.containerchild}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                <View style={veterinaryhomevisitedetailstyles.containerfirstsubchild}>
                    <Image
                        source={Icons.LeftArrow}
                        style={veterinaryhomevisitedetailstyles.leftarrowicon}
                    />
                </View>
                </TouchableOpacity>
                <View style={veterinaryhomevisitedetailstyles.locationtext}>
                    <Image
                        source={Icons.LoveIcon}
                        style={veterinaryhomevisitedetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={veterinaryhomevisitedetailstyles.containerthirdsubchild}>
                <View style={veterinaryhomevisitedetailstyles.shadow}>
                    <Image
                        source={images.doctorImage}
                        style={veterinaryhomevisitedetailstyles.userimage}
                    />
                    <View style={veterinaryhomevisitedetailstyles.gap}>
                        <View style={veterinaryhomevisitedetailstyles.userTextWidth}>
                            <View style={veterinaryhomevisitedetailstyles.userTextgap}>
                                <Text style={veterinaryhomevisitedetailstyles.textSize}>
                                    {' '}
                                    Dr. Samar Halder{' '}
                                </Text>
                            </View>
                            <View style={veterinaryhomevisitedetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinaryhomevisitedetailstyles.ratingHeight}
                                />
                                <Text style={veterinaryhomevisitedetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>

                        <View style={veterinaryhomevisitedetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                
                            />
                            <Text style={veterinaryhomevisitedetailstyles.setTextSize}>
                                {' '}
                                7 years experience{' '}
                            </Text>
                        </View>

                        <View style={veterinaryhomevisitedetailstyles.widthSpace}>
                            <View style={veterinaryhomevisitedetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                  
                                />
                                <Text style={veterinaryhomevisitedetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={veterinaryhomevisitedetailstyles.iconAndTextGap}>
                                <Image source={Icons.BiBriefcase}/>
                                <Text style={veterinaryhomevisitedetailstyles.setDigitSize}>
                                    {' '}
                                    Dentistry{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                    <View style={veterinaryhomevisitedetailstyles.menuTitleContainer}>
                        {/* About Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("about")}>
                            <View style={veterinaryhomevisitedetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                veterinaryhomevisitedetailstyles.serviceText,
                                activeTab === "about" && veterinaryhomevisitedetailstyles.aboutText,
                                ]}
                            >
                                About
                            </Text>
                            {activeTab === "about" && <View style={veterinaryhomevisitedetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>

                        {/* Reviews Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("review")}>
                            <View style={veterinaryhomevisitedetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                veterinaryhomevisitedetailstyles.reviewsText,
                                activeTab === "review" && veterinaryhomevisitedetailstyles.aboutText,
                                ]}
                            >
                                Reviews
                            </Text>
                            {activeTab === "review" && <View style={veterinaryhomevisitedetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
            
             {activeTab === "about" && <VeterinaryHomeVisiteAbout/>}
             {activeTab === "review" && <VeterinaryHomeVisiteReview/>}
        </View>
    );
};

export default VeterinaryHomeVisiteDetails;
