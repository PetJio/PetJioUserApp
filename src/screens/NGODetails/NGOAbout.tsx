import React from 'react';
import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ngoaboutstyles from './ngoabout.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const NGOAbout: React.FC  = () => {
    return (
        <View style={ngoaboutstyles.container}>
            <ScrollView>
                  <View style={{gap:responsiveHeight(4)}}>
             <View>
            <Text style={ngoaboutstyles.bioText}>Bio</Text>
            <Text style={ngoaboutstyles.paragraphText}>
                Hi Pet Parents !!!! I am a proficient grooming
                partner with pgroomy have an experience of 7+ years,
                can work efficiently with both dogs and cats. Also
                experienced with different breeds of pets in terms
                of styling and grooming...<Text style={ngoaboutstyles.readMoreText}>Read More</Text>
            </Text>
        </View>
                <View style={ngoaboutstyles.countparentView}>
                        <View>
                             <View style={ngoaboutstyles.centerCountDigit}>
                                 <Text style={ngoaboutstyles.digitNumber}>15,000</Text>
                             </View>
                            <Text style={ngoaboutstyles.digitText}>Animals Rescued</Text>
                        </View>

                        <View>
                             <View style={ngoaboutstyles.centerCountDigit}>
                                  <Text style={ngoaboutstyles.digitNumber}>3,000</Text>
                             </View>
                            <Text style={ngoaboutstyles.animalText}>Animals Adopted</Text>
                        </View>

                        <View>
                            <View style={ngoaboutstyles.centerCountDigit}>
                                   <Text style={ngoaboutstyles.digitNumber}>372</Text>
                            </View>
                            <Text style={ngoaboutstyles.volunteersText}>Volunteers</Text>
                        </View>

                </View>

              
                <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(1)}}>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#343434'}}>Gallery</Text>
                         <View>
                           <Image source={images.dogWithPeopleImage} style={{width:responsiveWidth(90),height:responsiveHeight(22),borderRadius:responsiveWidth(2)}}/>
                         </View>
                </View>

                 <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(1)}}>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#343434'}}>Gallery</Text>
                         <View>
                           <Image source={images.dogWithPeopleImage} style={{width:responsiveWidth(90),height:responsiveHeight(22),borderRadius:responsiveWidth(2)}}/>
                         </View>
                </View>
                 <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(1)}}>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#343434'}}>Gallery</Text>
                         <View>
                           <Image source={images.dogWithPeopleImage} style={{width:responsiveWidth(90),height:responsiveHeight(22),borderRadius:responsiveWidth(2)}}/>
                         </View>
                </View>

                 <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(1)}}>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#343434'}}>Gallery</Text>
                         <View>
                           <Image source={images.dogWithPeopleImage} style={{width:responsiveWidth(90),height:responsiveHeight(22),borderRadius:responsiveWidth(2)}}/>
                         </View>
                </View>

                 <View style={{paddingHorizontal:responsiveWidth(5),gap:responsiveHeight(1)}}>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#343434'}}>Gallery</Text>
                         <View>
                           <Image source={images.dogWithPeopleImage} style={{width:responsiveWidth(90),height:responsiveHeight(22),borderRadius:responsiveWidth(2)}}/>
                         </View>
                </View>

           </View>


            </ScrollView>

        </View>
    );
};

export default NGOAbout;
