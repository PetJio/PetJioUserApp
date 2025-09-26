

import React, { useState, useEffect } from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import onsiteservicestyles from './onsiteservice.styles';
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



const OnSiteService: React.FC<InSiteServiceProps> = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 50,
                }}
            >
                <ActivityIndicator size="large" color="#58B9D0" />
                <Text style={{
                    marginTop: 16,
                    fontSize: 16,
                    color: '#6B7280',
                    fontWeight: '500'
                }}>
                    Loading home services...
                </Text>
            </View>
        );
    }

    return (
        <View style={onsiteservicestyles.container}>
        
           <ScrollView  
             showsVerticalScrollIndicator={false}
             contentContainerStyle={onsiteservicestyles.paddingBottom}>

            <View style={onsiteservicestyles.Gap}>
                 {/* <TouchableOpacity onPress={() => navigation.navigate('GroomingDetails')}>
           <View style={onsiteservicestyles.containerthirdsubchild}>
                <View
                    style={onsiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={onsiteservicestyles.userimage}/>
                    <View style={onsiteservicestyles.gap}>
                        <View
                            style={onsiteservicestyles.userTextWidth}>
                            <View
                                style={onsiteservicestyles.userTextgap}>
                                <Text style={onsiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={onsiteservicestyles.borderRadius}>
                                    <Text style={onsiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={onsiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteservicestyles.ratingHeight} />
                                <Text style={onsiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={onsiteservicestyles.setImageIconPosition}/>
                            <Text style={onsiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={onsiteservicestyles.widthSpace}>
                            <View
                                style={onsiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteservicestyles.setImageIconPosition}
                                />
                                <Text style={onsiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={onsiteservicestyles.iconTextSpace}>
                             
                                <Text  style={onsiteservicestyles.bold}> ₹ 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
               */}

                 <View style={onsiteservicestyles.containerthirdsubchild}>
                <View
                    style={onsiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={onsiteservicestyles.userimage}/>
                    <View style={onsiteservicestyles.gap}>
                        <View
                            style={onsiteservicestyles.userTextWidth}>
                            <View
                                style={onsiteservicestyles.userTextgap}>
                                <Text style={onsiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={onsiteservicestyles.borderRadius}>
                                    <Text style={onsiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={onsiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteservicestyles.ratingHeight} />
                                <Text style={onsiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={onsiteservicestyles.setImageIconPosition}/>
                            <Text style={onsiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={onsiteservicestyles.widthSpace}>
                            <View
                                style={onsiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteservicestyles.setImageIconPosition}
                                />
                                <Text style={onsiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={onsiteservicestyles.iconTextSpace}>
                             
                                <Text  style={onsiteservicestyles.bold}> ₹ 7000 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
               <View style={onsiteservicestyles.containerthirdsubchild}>
                <View
                    style={onsiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={onsiteservicestyles.userimage}/>
                    <View style={onsiteservicestyles.gap}>
                        <View
                            style={onsiteservicestyles.userTextWidth}>
                            <View
                                style={onsiteservicestyles.userTextgap}>
                                <Text style={onsiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={onsiteservicestyles.borderRadius}>
                                    <Text style={onsiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={onsiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteservicestyles.ratingHeight} />
                                <Text style={onsiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={onsiteservicestyles.setImageIconPosition}/>
                            <Text style={onsiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={onsiteservicestyles.widthSpace}>
                            <View
                                style={onsiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteservicestyles.setImageIconPosition}
                                />
                                <Text style={onsiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={onsiteservicestyles.iconTextSpace}>
                                <Text  style={onsiteservicestyles.bold}>₹ 7000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteservicestyles.containerthirdsubchild}>
                <View
                    style={onsiteservicestyles.shadow}>
                    <Image source={images.UserImage} style={onsiteservicestyles.userimage}/>
                    <View style={onsiteservicestyles.gap}>
                        <View
                            style={onsiteservicestyles.userTextWidth}>
                            <View
                                style={onsiteservicestyles.userTextgap}>
                                <Text style={onsiteservicestyles.textSize}> Souvic Das </Text>
                                <View style={onsiteservicestyles.borderRadius}>
                                    <Text style={onsiteservicestyles.celebrityText}> Celebrity  </Text>
                                </View>
                            </View>
                            <View style={onsiteservicestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteservicestyles.ratingHeight} />
                                <Text style={onsiteservicestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteservicestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={onsiteservicestyles.setImageIconPosition}/>
                            <Text style={onsiteservicestyles.setTextSize}> 3 years experience </Text>
                        </View>

                        <View style={onsiteservicestyles.widthSpace}>
                            <View
                                style={onsiteservicestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteservicestyles.setImageIconPosition}
                                />
                                <Text style={onsiteservicestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                            <View style={onsiteservicestyles.iconTextSpace}>
                                
                                <Text  style={onsiteservicestyles.bold}>₹ 7000</Text>
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

export default OnSiteService;

