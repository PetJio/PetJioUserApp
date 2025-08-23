import React from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import trainhomestyles from './TrainatHome.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight } from 'react-native-responsive-dimensions';


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    TrainerAbout:undefined;
    TrainingDetails:undefined;
};

// Define prop types
type InSiteServiceProps = {
    navigation: StackNavigationProp<RootStackParamList, 'UserDetails'>;
};



const TrainatHome: React.FC<InSiteServiceProps> = ({ navigation }) => {
    return (
        <View style={trainhomestyles.container}>
           {/* <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:responsiveHeight(20),gap:responsiveHeight(2)}}
           >

            <TouchableOpacity onPress={() => navigation.navigate('TrainingDetails')}>
           <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away</Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
            <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

              <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
              <View style={trainhomestyles.containerthirdsubchild}>
                <View
                    style={trainhomestyles.shadow}>
                    <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                    <View style={trainhomestyles.gap}>
                        <View
                            style={trainhomestyles.userTextWidth}>
                            <View
                                style={trainhomestyles.userTextgap}>
                                <Text style={trainhomestyles.textSize}> Souvic Das </Text>
                                <View style={trainhomestyles.borderRadius}>
                                    <Text style={trainhomestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={trainhomestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={trainhomestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                            <Text style={trainhomestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={trainhomestyles.widthSpace}>
                            <View
                                style={trainhomestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.Location}
                                    style={trainhomestyles.setImageIconPosition}
                                />
                                <Text style={trainhomestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={trainhomestyles.iconTextSpace}>
                                <Image source={Icons.StarIcon} style={trainhomestyles.setImageIconPosition}
                                />
                                <Text  style={trainhomestyles.bold}> 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </ScrollView> */}
             <View style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={trainhomestyles.contentContainerStyle}>
                <View style={trainhomestyles.viewGap}>

                 <TouchableOpacity onPress={() => navigation.navigate('TrainingDetails')}>
                     
                 <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                    
                 </TouchableOpacity> 
               
                  <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                  <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                  <View style={trainhomestyles.containerthirdsubchild}>
                    <View
                        style={trainhomestyles.shadow}>
                        <Image source={images.UserImage} style={trainhomestyles.userimage}/>
                        <View style={trainhomestyles.gap}>
                            <View
                                style={trainhomestyles.userTextWidth}>
                                <View
                                    style={trainhomestyles.userTextgap}>
                                    <Text style={trainhomestyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={trainhomestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={trainhomestyles.viewFlex}>

                            <View
                                style={trainhomestyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={trainhomestyles.setImageIconPosition}/>
                                <Text style={trainhomestyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={trainhomestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={trainhomestyles.ratingHeight} />
                                    <Text style={trainhomestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={trainhomestyles.widthSpace}>
                                <View
                                    style={trainhomestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={trainhomestyles.setImageIconPosition}
                                    />
                                    <Text style={trainhomestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={trainhomestyles.iconTextSpace}>
                                    <Text  style={trainhomestyles.bold}> ₹ 200 <Text style={trainhomestyles.weekText}>/week</Text> </Text>
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

export default TrainatHome;