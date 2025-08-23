import React from 'react';
import { View, Text, Image, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import userdetailstyles from './groomingdetails.styles';
import { RadioButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';


// Define your navigation stack's param list
type RootStackParamList = {
     UserService: undefined;
     UserReview:undefined;
};

// Define the navigation prop type
type UserServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserService'>;

// Define props interface for the component
interface UserServiceProps {
    navigation: UserServiceScreenNavigationProp; // Navigation is now required
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

const UserDetails: React.FC<UserServiceProps> = ({navigation}) => {
    // Define the Type of the Render Function
    // const renderService: ListRenderItem<Service> = ({ item }) => (
    //     <View
    //         style={{
    //             width: responsiveWidth(44),
    //             borderRadius: responsiveWidth(6),
    //         }}>
    //         {/* Image Section */}
    //         <Image
    //             source={item.image}
    //             style={{
    //                 width: '100%',
    //                 height: responsiveHeight(16),
    //                 borderRadius: 10,
    //             }}
    //         />

    //         {/* Text and Icon Section */}
    //         <View
    //             style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //                 marginTop: responsiveHeight(1.5),
    //                 paddingHorizontal: responsiveWidth(2),
    //                 paddingVertical: responsiveHeight(1),
    //             }}>
    //             <View>
    //                 <Text
    //                     style={{
    //                         fontSize: 16,
    //                         fontWeight: 'bold',
    //                         color: '#000',
    //                     }}>
    //                     {item.title}
    //                 </Text>
    //                 <Text
    //                     style={{
    //                         fontSize: 14,
    //                         color: '#A0A0A0',
    //                         marginTop: 4,
    //                     }}>
    //                     Time: {item.time}
    //                 </Text>
    //             </View>

    //             <View
    //                 style={{
    //                     width: responsiveWidth(9),
    //                     height: responsiveHeight(4),
    //                     borderRadius: responsiveWidth(10),
    //                     backgroundColor: '#58B9D0',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }}>
    //                 <Icon name="plus" size={18} color="#FFFFFF" />
    //             </View>
    //         </View>
    //     </View>
    // );

    return (
        <View
            style={userdetailstyles.container}>
            <View style={userdetailstyles.containerchild}>
                <View style={userdetailstyles.containerfirstsubchild}>
                    <Image
                        source={Icons.LeftArrow}
                        style={userdetailstyles.leftarrowicon}
                    />
                </View>
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
                                    source={Icons.Location}
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
                                <Image
                                    source={Icons.StarIcon}
                                    style={
                                        userdetailstyles.setImageIconPosition
                                    }
                                />
                                <Text style={userdetailstyles.bold}>
                                    {' '}
                                    200 - 2000{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={userdetailstyles.menuTitleContainer}>
                    <View style={userdetailstyles.menuTitleAlignment}>
                        <Text style={userdetailstyles.aboutText}>About</Text>
                        <View style={userdetailstyles.menuBottomBoarder} />
                    </View>

                   <TouchableOpacity onPress={()=>navigation.navigate('UserService')}>
                      <View style={userdetailstyles.menuTitleAlignment}>
                            <Text style={userdetailstyles.serviceText}>
                                Services
                            </Text>
                        </View>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>navigation.navigate('UserReview')}>
                     
                   <View style={userdetailstyles.menuTitleAlignment}>
                        <Text style={userdetailstyles.reviewsText}>
                            Reviews
                        </Text>
                    </View>

                   </TouchableOpacity>
                </View>
            </View>
            <View
                style={userdetailstyles.imageContainer}>
                <Text
                    style={userdetailstyles.servicetext}>
                    Services
                </Text>
                <View
                    style={userdetailstyles.smallBreedContainer}>
                    <Text
                        style={{
                            color: '#898989',
                            fontSize: 12,
                            fontWeight: '600',
                        }}>
                        Small Breed
                    </Text>
                    <Image
                        source={Icons.TowerIcon}
                        style={userdetailstyles.TowerIconImageHeight}
                    />
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
             />  */}

            <View style={userdetailstyles.imagecontainer}>
                <View
                    style={userdetailstyles.imageParent}>
                    <View
                        style={userdetailstyles.imageContainerRadius}>
                        {/* Image Section */}
                        <Image
                            source={images.HairCutDog}
                            style={userdetailstyles.imageRadius}
                        />

                        {/* Text and Icon Section */}
                        <View
                            style={userdetailstyles.textIconSection}>
                            <View>
                                <Text
                                    style={userdetailstyles.underimageText}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={userdetailstyles.timeText}>
                                    Time: 40 minutes
                                </Text>
                            </View>

                            <View
                                style={userdetailstyles.plusCircleContainer}>
                                <Icon name="plus" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                    </View>
                    <View
                        style={userdetailstyles.imageContainerRadius}>
                        {/* Image Section */}
                        <Image
                            source={images.HairCutDog}
                            style={userdetailstyles.imageRadius}
                        />

                        {/* Text and Icon Section */}
                        <View
                            style={userdetailstyles.textIconSection}>
                            <View>
                                <Text
                                    style={userdetailstyles.underimageText}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={userdetailstyles.timeText}>
                                    Time: 40 minutes
                                </Text>
                            </View>

                            <View
                                style={userdetailstyles.plusCircleContainer}>
                                <Icon name="plus" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={userdetailstyles.imageParent}>
                    <View
                        style={userdetailstyles.imageContainerRadius}>
                        {/* Image Section */}
                        <Image
                            source={images.HairCutDog}
                            style={userdetailstyles.imageRadius}
                        />

                        {/* Text and Icon Section */}
                        <View
                            style={userdetailstyles.textIconSection}>
                            <View>
                                <Text
                                    style={userdetailstyles.underimageText}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={userdetailstyles.timeText}>
                                    Time: 40 minutes
                                </Text>
                            </View>

                            <View
                                style={userdetailstyles.plusCircleContainer}>
                                <Icon name="plus" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                    </View>
                    <View
                        style={userdetailstyles.imageContainerRadius}>
                        {/* Image Section */}
                        <Image
                            source={images.HairCutDog}
                            style={userdetailstyles.imageRadius}
                        />

                        {/* Text and Icon Section */}
                        <View
                            style={userdetailstyles.textIconSection}>
                            <View>
                                <Text
                                    style={userdetailstyles.underimageText}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={userdetailstyles.timeText}>
                                    Time: 40 minutes
                                </Text>
                            </View>

                            <View
                                style={userdetailstyles.plusCircleContainer}>
                                <Icon name="plus" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={userdetailstyles.parentGap}>
                 <View style={userdetailstyles.parentContainer}>
                      <View style={userdetailstyles.imageTextFlex}>
                             <Image source={images.spaneilDog} style={userdetailstyles.dogImageSize}/>
                             <View style={userdetailstyles.textIconHeight}>
                                  <View style={userdetailstyles.textIconflex}>
                                  <Text
                                    style={userdetailstyles.textsize}>
                                    Hair Cut
                                </Text>
                                  <Image source={Icons.DogmarkIcon} style={userdetailstyles.DogmarkIconHeight}/>   
                                  </View>
                                <Text
                                    style={userdetailstyles.yearText}>
                                       3 years 28 kg
                                </Text>
                             </View>
                      </View>
                      <View>
                             <RadioButton value="option1" />
                      </View>     
                </View>
                 
                 </View>
                 <View style={userdetailstyles.parentGap}>
                 <View style={userdetailstyles.parentContainer}>
                      <View style={userdetailstyles.imageTextFlex}>
                             <Image source={images.goldenDog} style={userdetailstyles.dogImageSize}/>
                             <View style={userdetailstyles.textIconHeight}>
                                  <View style={userdetailstyles.textIconflex}>
                                  <Text
                                    style={userdetailstyles.textsize}>
                                    Hair Cut
                                </Text>
                                  <Image source={Icons.DogmarkIcon} style={userdetailstyles.DogmarkIconHeight}/>   
                                  </View>
                                <Text
                                    style={userdetailstyles.yearText}>
                                       3 years 28 kg
                                </Text>
                             </View>
                      </View>
                      <View>
                             <RadioButton value="option1" />
                      </View>     
                </View>
                 </View>
                 <View style={userdetailstyles.center}>
                  <View style={userdetailstyles.button}>
                    <Text style={userdetailstyles.ContinueText}>Continue</Text>  
                  </View>
            </View>
            </View>
            
        </View>
    );
};

export default UserDetails;
