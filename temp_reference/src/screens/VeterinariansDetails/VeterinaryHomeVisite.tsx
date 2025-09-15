

import {useState} from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import veterinaryhomevisitestyles from './veterinaryhomevisite.styles';
import { StackNavigationProp } from '@react-navigation/stack';

// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    GroomingDetails:undefined;
    VeterinaryDetails:undefined
    VeterinaryHomeVisiteDetails:undefined;
};




const VeterinaryHomeVisite: React.FC = () => {
     const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
   
    return (
        <View style={veterinaryhomevisitestyles.container}>
         <View style={veterinaryhomevisitestyles.Gap}>
                 <TouchableOpacity onPress={() => navigation.navigate('VeterinaryHomeVisiteDetails')}>
             <View style={veterinaryhomevisitestyles.containerthirdsubchild}>
                <View
                    style={veterinaryhomevisitestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryhomevisitestyles.userimage}/>
                    <View style={veterinaryhomevisitestyles.gap}>
                        <View
                            style={veterinaryhomevisitestyles.userTextWidth}>
                            <View
                                style={veterinaryhomevisitestyles.userTextgap}>
                                <Text style={veterinaryhomevisitestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryhomevisitestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryhomevisitestyles.ratingHeight} />
                                <Text style={veterinaryhomevisitestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryhomevisitestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryhomevisitestyles.setImageIconPosition}/>
                            <Text style={veterinaryhomevisitestyles.setTextSize}> 6 years experience </Text>
                        </View>

                        <View style={veterinaryhomevisitestyles.widthSpace}>
                            <View
                                style={veterinaryhomevisitestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryhomevisitestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryhomevisitestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
              

            <View style={veterinaryhomevisitestyles.containerthirdsubchild}>
                <View
                    style={veterinaryhomevisitestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryhomevisitestyles.userimage}/>
                    <View style={veterinaryhomevisitestyles.gap}>
                        <View
                            style={veterinaryhomevisitestyles.userTextWidth}>
                            <View
                                style={veterinaryhomevisitestyles.userTextgap}>
                                <Text style={veterinaryhomevisitestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryhomevisitestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryhomevisitestyles.ratingHeight} />
                                <Text style={veterinaryhomevisitestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryhomevisitestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryhomevisitestyles.setImageIconPosition}/>
                            <Text style={veterinaryhomevisitestyles.setTextSize}> 6 years experience </Text>
                        </View>

                        <View style={veterinaryhomevisitestyles.widthSpace}>
                            <View
                                style={veterinaryhomevisitestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryhomevisitestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryhomevisitestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
               <View style={veterinaryhomevisitestyles.containerthirdsubchild}>
                <View
                    style={veterinaryhomevisitestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryhomevisitestyles.userimage}/>
                    <View style={veterinaryhomevisitestyles.gap}>
                        <View
                            style={veterinaryhomevisitestyles.userTextWidth}>
                            <View
                                style={veterinaryhomevisitestyles.userTextgap}>
                                <Text style={veterinaryhomevisitestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryhomevisitestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryhomevisitestyles.ratingHeight} />
                                <Text style={veterinaryhomevisitestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryhomevisitestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryhomevisitestyles.setImageIconPosition}/>
                            <Text style={veterinaryhomevisitestyles.setTextSize}> 6 years experience </Text>
                        </View>

                        <View style={veterinaryhomevisitestyles.widthSpace}>
                            <View
                                style={veterinaryhomevisitestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryhomevisitestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryhomevisitestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={veterinaryhomevisitestyles.containerthirdsubchild}>
                <View
                    style={veterinaryhomevisitestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryhomevisitestyles.userimage}/>
                    <View style={veterinaryhomevisitestyles.gap}>
                        <View
                            style={veterinaryhomevisitestyles.userTextWidth}>
                            <View
                                style={veterinaryhomevisitestyles.userTextgap}>
                                <Text style={veterinaryhomevisitestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryhomevisitestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryhomevisitestyles.ratingHeight} />
                                <Text style={veterinaryhomevisitestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryhomevisitestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryhomevisitestyles.setImageIconPosition}/>
                            <Text style={veterinaryhomevisitestyles.setTextSize}> 6 years experience </Text>
                        </View>

                        <View style={veterinaryhomevisitestyles.widthSpace}>
                            <View
                                style={veterinaryhomevisitestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryhomevisitestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryhomevisitestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
         </View>
        </View>
    );
};

export default VeterinaryHomeVisite;

