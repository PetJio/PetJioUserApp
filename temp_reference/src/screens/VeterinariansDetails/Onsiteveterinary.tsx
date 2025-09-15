import React from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import onsiteveterinarystyles from './onsiteveterinary.styles';
import { StackNavigationProp } from '@react-navigation/stack';


// Define your navigation type if using TypeScript and StackNavigator
type RootStackParamList = {
  GroomingDetails: undefined;
  // add other routes here
};





const Onsiteveterinary: React.FC = () => {
     const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View style={onsiteveterinarystyles.container}>
        
           <ScrollView  
             showsVerticalScrollIndicator={false}
             contentContainerStyle={onsiteveterinarystyles.paddingBottom}>

            <View style={onsiteveterinarystyles.Gap}>
                 <TouchableOpacity 
                    // onPress={() => navigation.navigate('GroomingDetails')}
                 >
           <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
           </TouchableOpacity>
              
             <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
           <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
                            </View>

                          
                        </View>
                    </View>
                </View>
            </View>
            <View style={onsiteveterinarystyles.containerthirdsubchild}>
                <View
                    style={onsiteveterinarystyles.shadow}>
                    <Image source={images.petjioclinicImage} style={onsiteveterinarystyles.userimage}/>
                    <View style={onsiteveterinarystyles.gap}>
                        <View
                            style={onsiteveterinarystyles.userTextWidth}>
                            <View
                                style={onsiteveterinarystyles.userTextgap}>
                                <Text style={onsiteveterinarystyles.textSize}>Pet Jio Clinic</Text>
                            </View>
                            <View style={onsiteveterinarystyles.ratingGap}>
                                <Image source={Icons.StarIcon} style={onsiteveterinarystyles.ratingHeight} />
                                <Text style={onsiteveterinarystyles.ratePointSize}>4.8</Text>
                            </View>
                        </View>

                        <View
                            style={onsiteveterinarystyles.setIconTextGap}>
                            <Image source={Icons.BiTimeFive} style={onsiteveterinarystyles.setImageIconPosition}/>
                            <Text style={onsiteveterinarystyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                        </View>

                        <View style={onsiteveterinarystyles.widthSpace}>
                            <View
                                style={onsiteveterinarystyles.iconAndTextGap}>
                                <Image
                                    source={Icons.BiMap}
                                    style={onsiteveterinarystyles.setImageIconPosition}
                                />
                                <Text style={onsiteveterinarystyles.setDigitSize}> 2.2km Away  </Text>
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

export default Onsiteveterinary;
