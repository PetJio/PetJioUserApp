

import {useState} from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import veterinaryonlinestyles from './veterinaryonline.styles';
import { StackNavigationProp } from '@react-navigation/stack';


// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    GroomingDetails:undefined;
    VeterinaryDetails:undefined
};




const VeterinaryOnline: React.FC = () => {
     const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
   
  
    
   

    return (
        <View style={veterinaryonlinestyles.container}>
         <View style={veterinaryonlinestyles.Gap}>
                 <TouchableOpacity onPress={() => navigation.navigate('VeterinaryDetails')}>
             <View style={veterinaryonlinestyles.containerthirdsubchild}>
                <View
                    style={veterinaryonlinestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryonlinestyles.userimage}/>
                    <View style={veterinaryonlinestyles.gap}>
                        <View
                            style={veterinaryonlinestyles.userTextWidth}>
                            <View
                                style={veterinaryonlinestyles.userTextgap}>
                                <Text style={veterinaryonlinestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryonlinestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryonlinestyles.ratingHeight} />
                                <Text style={veterinaryonlinestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryonlinestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryonlinestyles.setImageIconPosition}/>
                            <Text style={veterinaryonlinestyles.setTextSize}> 7 years experience </Text>
                        </View>

                        <View style={veterinaryonlinestyles.widthSpace}>
                            <View
                                style={veterinaryonlinestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryonlinestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryonlinestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
              

            <View style={veterinaryonlinestyles.containerthirdsubchild}>
                <View
                    style={veterinaryonlinestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryonlinestyles.userimage}/>
                    <View style={veterinaryonlinestyles.gap}>
                        <View
                            style={veterinaryonlinestyles.userTextWidth}>
                            <View
                                style={veterinaryonlinestyles.userTextgap}>
                                <Text style={veterinaryonlinestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryonlinestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryonlinestyles.ratingHeight} />
                                <Text style={veterinaryonlinestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryonlinestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryonlinestyles.setImageIconPosition}/>
                            <Text style={veterinaryonlinestyles.setTextSize}> 7 years experience </Text>
                        </View>

                        <View style={veterinaryonlinestyles.widthSpace}>
                            <View
                                style={veterinaryonlinestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryonlinestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryonlinestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
               <View style={veterinaryonlinestyles.containerthirdsubchild}>
                <View
                    style={veterinaryonlinestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryonlinestyles.userimage}/>
                    <View style={veterinaryonlinestyles.gap}>
                        <View
                            style={veterinaryonlinestyles.userTextWidth}>
                            <View
                                style={veterinaryonlinestyles.userTextgap}>
                                <Text style={veterinaryonlinestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryonlinestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryonlinestyles.ratingHeight} />
                                <Text style={veterinaryonlinestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryonlinestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryonlinestyles.setImageIconPosition}/>
                            <Text style={veterinaryonlinestyles.setTextSize}> 7 years experience </Text>
                        </View>

                        <View style={veterinaryonlinestyles.widthSpace}>
                            <View
                                style={veterinaryonlinestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryonlinestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryonlinestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={veterinaryonlinestyles.containerthirdsubchild}>
                <View
                    style={veterinaryonlinestyles.shadow}>
                    <Image source={images.doctorImage} style={veterinaryonlinestyles.userimage}/>
                    <View style={veterinaryonlinestyles.gap}>
                        <View
                            style={veterinaryonlinestyles.userTextWidth}>
                            <View
                                style={veterinaryonlinestyles.userTextgap}>
                                <Text style={veterinaryonlinestyles.textSize}>Dr. Samar Halder</Text>
                               
                            </View>
                            <View style={veterinaryonlinestyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={veterinaryonlinestyles.ratingHeight} />
                                <Text style={veterinaryonlinestyles.ratePointSize}> 4.8</Text>
                            </View>
                        </View>

                        <View
                            style={veterinaryonlinestyles.setIconTextGap}>
                            <Image source={Icons.Vector} style={veterinaryonlinestyles.setImageIconPosition}/>
                            <Text style={veterinaryonlinestyles.setTextSize}> 7 years experience </Text>
                        </View>

                        <View style={veterinaryonlinestyles.widthSpace}>
                            <View
                                style={veterinaryonlinestyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={veterinaryonlinestyles.setImageIconPosition}
                                />
                                <Text style={veterinaryonlinestyles.setDigitSize}> 2.2km Away  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
         </View>


        </View>
    );
};

export default VeterinaryOnline;

