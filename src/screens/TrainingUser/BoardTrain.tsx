import React from 'react';
import { View, Text,Image } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardtrainstyles from './BoardTrain.styles';


const BoardTrain: React.FC = () => {
    return (
        <View style={boardtrainstyles.container}>
             <View style={boardtrainstyles.containerthirdsubchild}>
                    <View
                        style={boardtrainstyles.shadow}>
                        <Image source={images.UserImage} style={boardtrainstyles.userimage}/>
                        <View style={boardtrainstyles.gap}>
                            <View
                                style={boardtrainstyles.userTextWidth}>
                                <View
                                    style={boardtrainstyles.userTextgap}>
                                    <Text style={boardtrainstyles.textSize}>Souvic Das</Text>
                                </View>
                                <View style={boardtrainstyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardtrainstyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardtrainstyles.viewFlex}>

                            <View
                                style={boardtrainstyles.setIconTextGap}>
                                <Image source={Icons.Vector} style={boardtrainstyles.setImageIconPosition}/>
                                <Text style={boardtrainstyles.setTextSize}>7 years experience</Text>
                            </View>

                            <View style={boardtrainstyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardtrainstyles.ratingHeight} />
                                    <Text style={boardtrainstyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardtrainstyles.widthSpace}>
                                <View
                                    style={boardtrainstyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardtrainstyles.setImageIconPosition}
                                    />
                                    <Text style={boardtrainstyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardtrainstyles.iconTextSpace}>
                                    <Text  style={boardtrainstyles.bold}> ₹ 200 <Text style={boardtrainstyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        </View>
    );
};

export default BoardTrain;
