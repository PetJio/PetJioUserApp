
import React from 'react';
import { View, Text,Image ,TouchableOpacity,TextInput, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import martstyles from './mart.styles';
import { useRoute, RouteProp } from '@react-navigation/native';



// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    Service:undefined;
    WalkingDetails:{ section: string };
    WalkingUser:{ section: string };
    Walking:undefined;
    MartLocalityAddress:undefined;
    Main:undefined;
    PetjioMartStore:undefined;
    
};

// Define the navigation prop type
type WalkingUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MartLocalityAddress'>;
type WalkingScreenRouteProp = RouteProp<RootStackParamList, 'MartLocalityAddress'>;


// Define prop types
type InSiteServiceProps = {
    navigation: WalkingUserScreenNavigationProp;
    route: WalkingScreenRouteProp;
};



const Mart: React.FC<InSiteServiceProps> = ({ navigation }) => {
  
    const handleTabWithNavigation = () => {
        //   if (section === 'walking') {
        //       navigation.navigate("Walking");
        //   }
      };
       
    return (
        <View style={martstyles.container}>


<View style={martstyles.containerchild}>
               <TouchableOpacity onPress={()=>handleTabWithNavigation()}>
                    <View style={martstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={martstyles.leftarrowicon} />
                            <Text style={martstyles.groomingText}>Pet Mart</Text>
                        </View>
               </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>navigation.navigate("MartLocalityAddress")}
                >
                    <View style={martstyles.locationtext}>
                        <Text style={martstyles.locationtextColor}>Kasba, Kolkata</Text>
                        <Image source={Icons.DownArrow} style={martstyles.downArrowIcon} />
                    </View>
              </TouchableOpacity>
     

               
          </View>

          <View style={martstyles.searchparent}>
                <View style={martstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={martstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={martstyles.filterbtn}>
                   <Image source={Icons.Filter} style={martstyles.filterIcon}/>
                </TouchableOpacity>
            </View>
    
            <View style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={martstyles.contentContainerStyle}>
                <View style={martstyles.viewGap}>

                 <TouchableOpacity onPress={()=>navigation.navigate('PetjioMartStore',)}>
                     
                 <View style={martstyles.containerthirdsubchild}>
                    <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>2.2km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                    
                 </TouchableOpacity> 
               
                <View style={martstyles.containerthirdsubchild}>
                      <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.0km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                      <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.4km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                      <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.9km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                      <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.12km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                     <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}>4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.15km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                    <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.16km Away </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={martstyles.containerthirdsubchild}>
                      <View
                        style={martstyles.shadow}>
                        <Image source={images.istockImage} style={martstyles.userimage}/>
                        <View style={martstyles.gap}>
                            <View
                                style={martstyles.userTextWidth}>
                                <View
                                    style={martstyles.userTextgap}>
                                    <Text style={martstyles.textSize}>PetJio Store</Text>
                                </View>
                                 <View style={martstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={martstyles.ratingHeight} />
                                    <Text style={martstyles.ratePointSize}> 4.8</Text>
                            </View>
                            </View>

                            <View style={martstyles.viewFlex}>

                            <View
                                style={martstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={martstyles.setImageIconPosition}/>
                                <Text style={martstyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>


                            </View>

                            <View style={martstyles.widthSpace}>
                                <View
                                    style={martstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.BiMap}
                                        style={martstyles.setImageIconPosition}
                                    />
                                    <Text style={martstyles.setDigitSize}>3.18km Away </Text>
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

export default Mart;






