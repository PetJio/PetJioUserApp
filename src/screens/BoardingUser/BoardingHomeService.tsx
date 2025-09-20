import React from 'react';
import { View, Text,Image ,TouchableOpacity,ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardinghomeservicestyles from './boardinghomeservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    TrainerAbout:undefined;
    TrainingDetails:undefined;
    BoardingDetails:undefined;
};

// Define prop types
type InSiteServiceProps = {
    navigation: StackNavigationProp<RootStackParamList, 'BoardingDetails'>;
};



const BoardingHomeService: React.FC<InSiteServiceProps> = ({ navigation }) => {
    return (
        <View style={boardinghomeservicestyles.container}>
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={boardinghomeservicestyles.contentContainerStyle}>
                <View style={boardinghomeservicestyles.viewGap}>
                 <TouchableOpacity onPress={() => navigation.navigate('BoardingDetails')}> 
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>  
                 </TouchableOpacity> 
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                </View>
                                <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das</Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                </View>
                                <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default BoardingHomeService;