
import React from 'react';
import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ngoservicestyles from './ngoservice.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const NGOService: React.FC  = () => {
    return (
        <View style={ngoservicestyles.container}>



 <View>
             <View style={ngoservicestyles.margin}>
                 <Text style={ngoservicestyles.serviceText}>Services</Text>
                  <ScrollView

                  showsVerticalScrollIndicator={false}
                  
                  >

                     <View style={{gap:responsiveHeight(2)}}>

                     <View style={ngoservicestyles.centerView}>

                                          <View style={ngoservicestyles.padding}>
                                          <Image source={images.adoptionImage} style={ngoservicestyles.imageSize} />
                                           <View style={{justifyContent:'center',alignItems:'center'}}>
                                               <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>Adoption</Text>
                                           </View>
                              </View>
                                    <View style={ngoservicestyles.padding}>
                                          <Image source={images.animalRescueImage} style={ngoservicestyles.imageSize} />
                                           <View style={{justifyContent:'center',alignItems:'center'}}>
                                               <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>Injection</Text>
                                           </View>
                              </View>
                                          
                      </View>
                     
                       <View style={ngoservicestyles.centerView}>

                         <View style={ngoservicestyles.padding}>
                           <Image source={images.tacticalResecueImage} style={ngoservicestyles.imageSize} />
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                               <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>Tactical Rescues</Text>
                            </View>
                 </View>
                  <View style={ngoservicestyles.padding}>
                        <Image source={images.humanedImage} style={ngoservicestyles.imageSize} />
                         <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>Humane Education</Text>
                         </View>
                    
                 </View>
                         
                       </View>

                        <View style={ngoservicestyles.centerView}>

                         <View style={ngoservicestyles.padding}>
                           <Image source={images.dogRestHouseImage} style={ngoservicestyles.imageSize} />
                           <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>Trauma Center</Text>
                         </View>
                        </View>
                        <View style={ngoservicestyles.padding}>
                         <Image source={images.rabieshelpline} style={ngoservicestyles.imageSize} />
                         <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:12,fontWeight:'600',lineHeight:17,letterSpacing:0,color:'#373737'}}>24*7  Rabies Helpline</Text>
                         </View>
                        </View>
                         
                       </View>
                  </View>
       </ScrollView>
           </View>
           </View>
        </View>
    );
};

export default NGOService;

