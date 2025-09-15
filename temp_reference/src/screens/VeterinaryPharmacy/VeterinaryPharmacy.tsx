
import {useState} from 'react';
import CheckBox from 'react-native-check-box';
import { View, Text,Image,TouchableOpacity,TextInput, ScrollView } from 'react-native';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import Icon from "react-native-vector-icons/Feather";
import veterinarypharmacystyles from './veterinarypharmacy.styles';
import { StackNavigationProp } from '@react-navigation/stack';





// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    Locality: { section: string };
    Grooming:undefined;
    Walking:undefined;
    Veterinary:undefined;
    VeterinaryCalendar:undefined;
    LiveTalkToVeterinary:undefined;
    VeterinariansDetails:undefined;
    OnlineChatWithVeterinary:undefined;
    PharmacyOrderNow:undefined;
  // Add other routes here as needed
};

// Define the navigation prop type
type LiveTalkToVeterinaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LiveTalkToVeterinary'>;



// Define props interface for the component
interface VeterinaryPharmacyProps {
  navigation:LiveTalkToVeterinaryScreenNavigationProp;

}

const VeterinaryPharmacy: React.FC<VeterinaryPharmacyProps> = ({navigation }) => {
      const [isChecked, setIsChecked] = useState<boolean>(false);
    return (
        <View style={veterinarypharmacystyles.container}>
        <View style={{top:responsiveHeight(7),gap:responsiveHeight(1.5)}}>
        <TouchableOpacity onPress={()=>navigation.navigate("OnlineChatWithVeterinary")}>
            <View style={{flexDirection:'row',gap:responsiveWidth(1),paddingHorizontal:responsiveWidth(4)}}>
                    <Image source={Icons.LeftArrow} style={{ tintColor: "#000000",top:responsiveHeight(0.50)}}/>
                    <Text style={{color:"#000000",fontSize:20,fontWeight:'500',fontFamily:''}}>Veterinary Pharmacy</Text>
            </View>
        </TouchableOpacity>

         <View style={{flexDirection:'row',gap:responsiveWidth(2),justifyContent:'flex-end',right:responsiveWidth(5)}}>
                               <Text style={{fontSize:responsiveWidth(3.5),fontWeight:'500',lineHeight:responsiveWidth(10),letterSpacing:0,color:'#605B5B'}} >Select All</Text>
                                <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                 style={{ top: responsiveHeight(1)}}
                                 />
         </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:responsiveHeight(90)}}
             >
               
              <View style={{gap:responsiveHeight(2)}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>

                <View style={{flexDirection:'row',padding:responsiveWidth(2), paddingTop:responsiveWidth(2.5), gap:responsiveWidth(2.5),   width:responsiveWidth(90),height:responsiveWidth(25),borderRadius:responsiveWidth(1),backgroundColor:'#ffffff'}}>
                     
                       <View>
                             <CheckBox
                                isChecked={isChecked}
                                 onClick={() => setIsChecked(!isChecked)}
                                 checkBoxColor="#ACA9A9"
                                //  style={{ top: responsiveHeight(1)}}
                                 />
                      </View>

                     <View>
                         <Image source={images.pharmacyImage} style={{width:responsiveWidth(18),height:responsiveWidth(18),borderRadius:responsiveWidth(20),position:'relative'}}/>
                          <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#4494A8',position:'absolute',left:0,right:responsiveWidth(4),top:responsiveHeight(6)}}>
                             <Image source={Icons.BiSolidPhone}/>
                        </View>
                     </View>


            <View style={{gap:responsiveHeight(0.75)}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(56)}}>
                           <Text style={{fontSize:responsiveWidth(4.5),fontWeight:'700',letterSpacing:0,color:'#000000'}}>Petjio Pharmacy</Text>
                            <View style={veterinarypharmacystyles.ratingGap}>
                                <Image
                                    source={Icons.StarIcon}
                                    style={veterinarypharmacystyles.ratingHeight}
                                />
                                <Text style={veterinarypharmacystyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiMap}/>
                          <Text style={{fontSize:responsiveWidth(2.8),fontWeight:'500',letterSpacing:0,color:'#383838'}}>36, Ballygunge Gardens Rd</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                        <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                          <Image source={Icons.BiTimeFive}/>
                          <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>10:00 am - 09:00 pm</Text>
                        </View>

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.locationposition}/>
                           <Text style={{fontSize:responsiveWidth(2.6),fontWeight:'500',letterSpacing:0,color:'#383838'}}>2.2km Away</Text>
                         </View>
                  </View>
           </View>
                </View>

           </View>

              </View>
            </ScrollView>

             {/* Fixed Next Button */}
            <View style={veterinarypharmacystyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PharmacyOrderNow')}
                    style={veterinarypharmacystyles.nextBtnContainer}>
                    <Text style={veterinarypharmacystyles.nextBtnText}>Send Prescription</Text>
                </TouchableOpacity>
            </View>
   </View>
</View>
    );
};

export default VeterinaryPharmacy;
