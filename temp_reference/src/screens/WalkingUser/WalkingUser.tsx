import React from 'react';
import { View, Text,Image ,TouchableOpacity,TextInput, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import walkinguserstyles from './WalkingUser.styles';
import { useRoute, RouteProp } from '@react-navigation/native'


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    Service:undefined;
    WalkingDetails:{ section: string };
    WalkingUser:{ section: string };
    Walking:undefined;
    
};

// Define the navigation prop type
type WalkingUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WalkingUser'>;
type WalkingScreenRouteProp = RouteProp<RootStackParamList, 'WalkingUser'>;


// Define prop types
type InSiteServiceProps = {
    navigation: WalkingUserScreenNavigationProp;
    route: WalkingScreenRouteProp;
};



const WalkingUser: React.FC<InSiteServiceProps> = ({ navigation ,route }) => {
  
    const { section } = route?.params;
    const handleTabWithNavigation = () => {
          if (section === 'walking') {
              navigation.navigate("Walking");
          }
      };
       
    return (
        <View style={walkinguserstyles.container}>


<View style={walkinguserstyles.containerchild}>
               <TouchableOpacity onPress={()=>handleTabWithNavigation()}>
                    <View style={walkinguserstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={walkinguserstyles.leftarrowicon} />
                            <Text style={walkinguserstyles.groomingText}>Walking</Text>
                        </View>
               </TouchableOpacity>
                <View style={walkinguserstyles.locationtext}>
                    <Text style={walkinguserstyles.locationtextColor}>Kasba, Kolkata</Text>
                    <Image source={Icons.DownArrow} style={walkinguserstyles.downArrowIcon} />
                </View>
          </View>

          <View style={walkinguserstyles.searchparent}>
                <View style={walkinguserstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={walkinguserstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={walkinguserstyles.filterbtn}>
                   <Image source={Icons.Filter} style={walkinguserstyles.filterIcon} />
                </TouchableOpacity>
            </View>
    
            <View style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={walkinguserstyles.contentContainerStyle}>
                <View style={walkinguserstyles.viewGap}>

                 <TouchableOpacity onPress={()=>navigation.navigate('WalkingDetails', { section: 'walking' })}>
                     
                 <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                    
                 </TouchableOpacity> 
               
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={walkinguserstyles.containerthirdsubchild}>
                    <View
                        style={walkinguserstyles.shadow}>
                        <Image source={images.walkinguserimage} style={walkinguserstyles.userimage}/>
                        <View style={walkinguserstyles.gap}>
                            <View
                                style={walkinguserstyles.userTextWidth}>
                                <View
                                    style={walkinguserstyles.userTextgap}>
                                    <Text style={walkinguserstyles.textSize}> Urmi Jana </Text>
                                </View>
                                <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={walkinguserstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={walkinguserstyles.viewFlex}>

                            <View
                                style={walkinguserstyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={walkinguserstyles.setImageIconPosition}/>
                                <Text style={walkinguserstyles.setTextSize}> 06:00 am - 09:00 pm </Text>
                            </View>

                            <View style={walkinguserstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={walkinguserstyles.ratingHeight} />
                                    <Text style={walkinguserstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={walkinguserstyles.widthSpace}>
                                <View
                                    style={walkinguserstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.Vector}
                                        style={walkinguserstyles.setImageIconPosition}
                                    />
                                    <Text style={walkinguserstyles.setDigitSize}> 7 years experience  </Text>
                                </View>

                                <View style={walkinguserstyles.iconTextSpace}>
                                    <Text  style={walkinguserstyles.bold}> ₹ 200 <Text style={walkinguserstyles.weekText}>/week</Text> </Text>
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

export default WalkingUser;
