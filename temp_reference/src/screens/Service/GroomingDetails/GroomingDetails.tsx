import  { useState } from 'react';
import { View, Text, Image, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import userdetailstyles from './groomingdetails.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import {responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
import GroomingAbout from '../Grooming/GroomingAbout';
import GroomingService from '../Grooming/GroomingService';
import GroomingReview from '../Grooming/GroomingReview';


// Define your navigation stack's param list
type RootStackParamList = {
     UserService: undefined;
     UserReview:undefined;
     ServicePrice:undefined;
     GroomingDetails:undefined;
     HomeService:undefined;
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

const GroomingDetails: React.FC<UserServiceProps> = ({navigation}) => {
    const [activeTab, setActiveTab] = useState<string>("about");
     // Function to handle tab selection and navigation
  const handleTabPress = (tab:string, screen?: keyof RootStackParamList) => {
    setActiveTab(tab);
    // if (screen) {
    //   navigation.navigate(screen);
    // }
  };

    // Define the Type of the Render Function
    const renderService: ListRenderItem<Service> = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ServicePrice')}
            style={{
                width: responsiveWidth(44),
                borderRadius: responsiveWidth(6),
            }}>
            {/* Image Section */}
            <Image
                source={item.image}
                style={{
                    width: '100%',
                    height: responsiveHeight(16),
                    borderRadius: 10,
                }}
            />

            {/* Text and Icon Section */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                }}>
                <View>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                        }}>
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#A0A0A0',
                            marginTop: 4,
                        }}>
                        Time: {item.time}
                    </Text>
                </View>

                <View
                    style={{
                        width: responsiveWidth(9),
                        height: responsiveHeight(4),
                        borderRadius: responsiveWidth(10),
                        backgroundColor: '#58B9D0',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Icon name="plus" size={18} color="#FFFFFF" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={userdetailstyles.container}>
            <View style={userdetailstyles.containerchild}>
                <TouchableOpacity onPress={()=>navigation.navigate('HomeService')}>
                <View style={userdetailstyles.containerfirstsubchild}>
                    <Image
                        source={Icons.LeftArrow}
                        style={userdetailstyles.leftarrowicon}
                    />
                </View>
                </TouchableOpacity>
                <View style={userdetailstyles.locationtext}>
                    <Image
                        source={Icons.LoveIcon}
                        style={userdetailstyles.downArrowIcon}
                    />
                </View>
            </View>

            <View style={userdetailstyles.containerthirdsubchild}>
                <View style={userdetailstyles.shadow}>
                    <Image
                        source={images.UserImage}
                        style={userdetailstyles.userimage}
                    />
                    <View style={userdetailstyles.gap}>
                        <View style={userdetailstyles.userTextWidth}>
                            <View style={userdetailstyles.userTextgap}>
                                <Text style={userdetailstyles.textSize}>
                                    {' '}
                                    Souvic Das{' '}
                                </Text>
                                <View style={userdetailstyles.borderRadius}>
                                    <Text
                                        style={userdetailstyles.celebrityText}>
                                        {' '}
                                        Celebrity{' '}
                                    </Text>
                                </View>
                            </View>
                            <View style={userdetailstyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={userdetailstyles.ratingHeight}
                                />
                                <Text style={userdetailstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                        </View>

                        <View style={userdetailstyles.setIconTextGap}>
                            <Image
                                source={Icons.Vector}
                                style={userdetailstyles.setImageIconPosition}
                            />
                            <Text style={userdetailstyles.setTextSize}>
                                {' '}
                                3 years experience{' '}
                            </Text>
                        </View>

                        <View style={userdetailstyles.widthSpace}>
                            <View style={userdetailstyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={
                                        userdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={userdetailstyles.setDigitSize}>
                                    {' '}
                                    2.2km Away{' '}
                                </Text>
                            </View>

                            <View style={userdetailstyles.iconTextSpace}>
                                <Text style={userdetailstyles.bold}>
                                    {' '}
                                    ₹ 200 - ₹ 2000{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                    <View style={userdetailstyles.menuTitleContainer}>
                        {/* About Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("about")}>
                            <View style={userdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                userdetailstyles.serviceText,
                                activeTab === "about" && userdetailstyles.aboutText,
                                ]}
                            >
                                About
                            </Text>
                            {activeTab === "about" && <View style={userdetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>

                        {/* Services Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("service")}>
                            <View style={userdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                userdetailstyles.serviceText,
                                activeTab === "service" && userdetailstyles.aboutText,
                                ]}
                            >
                                Services
                            </Text>
                            {activeTab === "service" && <View style={userdetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>

                        {/* Reviews Tab */}
                        <TouchableOpacity onPress={() => handleTabPress("review")}>
                            <View style={userdetailstyles.menuTitleAlignment}>
                            <Text
                                style={[
                                userdetailstyles.reviewsText,
                                activeTab === "review" && userdetailstyles.aboutText,
                                ]}
                            >
                                Reviews
                            </Text>
                            {activeTab === "review" && <View style={userdetailstyles.menuBottomBoarder} />}
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
           

            {/* <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderService}
                    numColumns={2}
                    columnWrapperStyle={{ 
                        justifyContent: 'space-between', 
                        marginBottom: responsiveHeight(2) 
                    }}
                    contentContainerStyle={{ paddingHorizontal: responsiveWidth(4) }}
             />   */}

             {activeTab === "about" && <GroomingAbout/>}
             {activeTab === "service" && <GroomingService/>}
             {activeTab === "review" && <GroomingReview/>}
        </View>
    );
};

export default GroomingDetails;
