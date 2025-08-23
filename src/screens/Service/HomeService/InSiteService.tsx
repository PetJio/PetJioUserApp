import React from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import insiteservicestyles from './insiteservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    GroomingDetails:undefined;
};

// Define prop types
type InSiteServiceProps = {
    navigation: StackNavigationProp<RootStackParamList, 'GroomingDetails'>;
};



const InSiteService: React.FC<InSiteServiceProps> = ({ navigation }) => {
    return (
        <View style={insiteservicestyles.container}>
        
           <ScrollView  
             showsVerticalScrollIndicator={false}
             contentContainerStyle={insiteservicestyles.paddingBottom}>

            <View style={insiteservicestyles.Gap}>
                 <TouchableOpacity onPress={() => navigation.navigate('GroomingDetails')}>
           <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                             
                                <Text  style={insiteservicestyles.bold}> ₹ 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
              
               <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
             <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
             <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={insiteservicestyles.containerthirdsubchild}>
                <View
                    style={insiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={insiteservicestyles.userimage}/>
                    <View style={insiteservicestyles.gap}>
                        <View
                            style={insiteservicestyles.userTextWidth}>
                            <View
                                style={insiteservicestyles.userTextgap}>
                                <Text style={insiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={insiteservicestyles.borderRadius}>
                                    <Text style={insiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={insiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={insiteservicestyles.ratingHeight} />
                                <Text style={insiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>
                        <View
                            style={insiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={insiteservicestyles.setImageIconPosition}/>
                            <Text style={insiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={insiteservicestyles.widthSpace}>
                            <View
                                style={insiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={insiteservicestyles.setImageIconPosition}
                                />
                                <Text style={insiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={insiteservicestyles.iconTextSpace}>
                                <Text  style={insiteservicestyles.bold}>₹ 7000</Text>
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

export default InSiteService;
