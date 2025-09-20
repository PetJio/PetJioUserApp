// import React from 'react';
// import { View, Text,Image } from 'react-native';
// import images from '../../../assets/images';
// import Icons from '../../../assets/icons';
// import commercialservicestyles from './commercialservice.styles';

// const CommercialService: React.FC = () => {
//     return (
//         <View style={commercialservicestyles.container}>
//            <View style={commercialservicestyles.containerthirdsubchild}>
//                 <View
//                     style={commercialservicestyles.shadow}>
//                     <Image source={images.UserImage} style={commercialservicestyles.userimage}/>
//                     <View style={commercialservicestyles.gap}>
//                         <View
//                             style={commercialservicestyles.userTextWidth}>
//                             <View
//                                 style={commercialservicestyles.userTextgap}>
//                                 <Text style={commercialservicestyles.textSize}> Souvic Das </Text>
//                                 <View style={commercialservicestyles.borderRadius}>
//                                     <Text style={commercialservicestyles.celebrityText}> Celebrity  </Text>
//                                 </View>
//                             </View>
//                             <View style={commercialservicestyles.ratingGap}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
//                                 <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
//                             </View>
//                         </View>

//                         <View
//                             style={commercialservicestyles.setIconTextGap}>
//                             <Image source={Icons.Vector} style={commercialservicestyles.setImageIconPosition}/>
//                             <Text style={commercialservicestyles.setTextSize}> 3 years experience </Text>
//                         </View>

//                         <View style={commercialservicestyles.widthSpace}>
//                             <View
//                                 style={commercialservicestyles.iconAndTextGap}>
//                                 <Image
//                                     source={Icons.Location}
//                                     style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text style={commercialservicestyles.setDigitSize}> 2.2km Away  </Text>
//                             </View>

//                             <View style={commercialservicestyles.iconTextSpace}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text  style={commercialservicestyles.bold}>  7000 </Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default CommercialService;


import React from 'react';
import { View, Text,Image ,TouchableOpacity,ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import commercialservicestyles from './commercialservice.styles';
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
        <View style={commercialservicestyles.container}>
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={commercialservicestyles.contentContainerStyle}>
                <View style={commercialservicestyles.viewGap}>
                 <TouchableOpacity onPress={() => navigation.navigate('BoardingDetails')}> 
                 <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>  
                 </TouchableOpacity> 
                 <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                </View>
                                <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche</Text>
                                </View>
                                <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={commercialservicestyles.containerthirdsubchild}>
                    <View
                        style={commercialservicestyles.shadow}>
                        <Image source={images.petJiocrecheImage} style={commercialservicestyles.userimage}/>
                        <View style={commercialservicestyles.gap}>
                            <View
                                style={commercialservicestyles.userTextWidth}>
                                <View
                                    style={commercialservicestyles.userTextgap}>
                                    <Text style={commercialservicestyles.textSize}> PetJio Creche </Text>
                                     <View style={commercialservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={commercialservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={commercialservicestyles.viewFlex}>

                            <View
                                style={commercialservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                <Text style={commercialservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={commercialservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                    <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={commercialservicestyles.widthSpace}>
                                <View
                                    style={commercialservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={commercialservicestyles.setImageIconPosition}
                                    />
                                    <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={commercialservicestyles.iconTextSpace}>
                                    <Text  style={commercialservicestyles.bold}> ₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text> </Text>
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
