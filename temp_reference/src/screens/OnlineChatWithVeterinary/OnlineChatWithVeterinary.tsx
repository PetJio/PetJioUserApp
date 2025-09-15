import React, { useState } from 'react';
import { View, Text,TouchableOpacity,Image, ScrollView, TextInput } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import onlinechatwithveterinarystyles from './onlinechatwithveterinary.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import VeterinaryBookConsultation from '../VeterinaryBookConsultation/VeterinaryBookConsultation';




// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
    VeterinaryReview:undefined;
    VeterinaryDetails:undefined;
    VeterinaryPharmacy:undefined
};

// Define the navigation prop type
type OnlineChatWithVeterinaryScreenNavigationProp = StackNavigationProp<
     RootStackParamList,
    'VeterinaryReview'
>;

// Define props interface for the component
interface OnlineChatWithVeterinaryProps {
    navigation: OnlineChatWithVeterinaryScreenNavigationProp;
}



const OnlineChatWithVeterinary: React.FC<OnlineChatWithVeterinaryProps> = ({navigation}) => {
  
  const [modalVisible,setModalVisible] = useState<boolean>(false);
     
    return (

        <LinearGradient colors={['#ECEEF2', '#D0D4D7',]} style={onlinechatwithveterinarystyles.container}>
            <View style={onlinechatwithveterinarystyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('VeterinaryDetails')}
                            >
                            <View style={onlinechatwithveterinarystyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={onlinechatwithveterinarystyles.iconColor}
                                />
                                 <View>
                                       <Image source={images.doctorImage} style={onlinechatwithveterinarystyles.doctorImageSize}/>
                                 </View>
                                  
                                  <View>
                                     <Text style={onlinechatwithveterinarystyles.textDateTime}>
                                       Dr. Samar Halder
                                     </Text>
                                      <View style={onlinechatwithveterinarystyles.viewFlex}>
                                        <Image source={Icons.Ellipse}/>
                                        <Text style={onlinechatwithveterinarystyles.onlineText} >Online</Text>
                                        </View>
                                  </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <View style={onlinechatwithveterinarystyles.trackingPositionIcon}>
                            <Image
                                source={Icons.BsTelephone}
                                style={onlinechatwithveterinarystyles.trackIcon}
                            />
                        </View>
                        </TouchableOpacity>
                        
             </View>
             <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{
               paddingTop: responsiveHeight(13), // More than header height
               paddingBottom: responsiveHeight(80), // More than bottom button height
               paddingHorizontal: responsiveWidth(4),
                }}
               >
                 <View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(50), height:responsiveHeight(8), borderRadius:responsiveWidth(1), backgroundColor:'#FFFFFF',bottom:responsiveHeight(2)}}>
                         <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                lineHeight: 16,
                                letterSpacing: 0,
                                color: '#393939',
                            }}
                            >
                               Good Morning, tell me what {"\n"} do you want to know?
                            </Text>
                            
                   </View>
                    </View>
                      <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949', marginLeft:responsiveWidth(22),bottom:responsiveHeight(2)}}>7:00 am</Text>
                 </View>


                     {/* Outgoing Message (You) */}

                        <View style={{flexDirection:'row',justifyContent: 'flex-end',gap:responsiveHeight(1)}}>
                         
                         
                         <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end',top:responsiveHeight(2.5) }}>
                                 <Text style={{fontSize:10, fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#494949'}}>You</Text>
                                </View>
                                    <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center', marginTop:responsiveHeight(3) }}>
                                        <View style={{ justifyContent:'center',alignItems:'center',  maxWidth: responsiveWidth(55), minWidth: responsiveWidth(30),  padding: responsiveWidth(3), borderTopStartRadius:responsiveWidth(2),backgroundColor:'#58B9D0',borderEndEndRadius:responsiveWidth(2)  }}>
                                        <Text style={{ fontSize: 12, fontWeight: '500', lineHeight:18, letterSpacing:0, color: '#FFFFFF' }}>
                                            I am good, but my dog is {"\n"} have some kind of rashes {"\n"} on his belly
                                        </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949', marginLeft:responsiveWidth(40)}}>7:01 am</Text>
                            </View>

                                <Image source={images.patientImage} style={onlinechatwithveterinarystyles.imageSize}/>

                         </View>

                        {/* Ingoing Message (You) */}

                    <View style={{flexDirection:'row',justifyContent: 'flex-start',gap:responsiveHeight(1)}}>
                          <Image source={images.doctorImage} style={onlinechatwithveterinarystyles.imageSize}/>
                         
                         <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',top:responsiveHeight(2) }}>
                                 <Text style={{fontSize:10, fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#494949'}}>Dr. Samar Halder</Text>
                                </View>
                                    <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center', marginTop: 20 }}>
                                        <View
                                        style={{
                                            alignSelf: 'center', 
                                            maxWidth: responsiveWidth(55), 
                                            minWidth: responsiveWidth(30), 
                                            padding: responsiveWidth(3),
                                            borderTopStartRadius: responsiveWidth(2),
                                            borderEndEndRadius: responsiveWidth(2),
                                            backgroundColor: '#FFFFFF',
                                        }}
                                        >
                                            <Text
                                                style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                lineHeight: 18,
                                                letterSpacing: 0,
                                                color: '#393939',
                                                textAlign: 'center',
                                                }}
                                            >
                                                Can you send me a picture, {"\n"}
                                                so I can determine what {"\n"}
                                                kind of rashes.
                                            </Text>
                                            </View>

                                    </View>
                                    <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949',}}>7:02 am</Text>
                            </View>

                               

                           </View>

                        {/*Outgoing Message (You)*/}

                         <View style={{flexDirection:'row',justifyContent: 'flex-end',gap:responsiveHeight(1)}}>
                         
                         
                         <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end',top:responsiveHeight(2.5) }}>
                                 <Text style={{fontSize:10, fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#494949'}}>You</Text>
                                </View>
                                    <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(3),marginLeft:responsiveWidth(40)}}>
                                        <View style={{ justifyContent:'center',alignItems:'center', width:responsiveWidth(14) , height:responsiveHeight(6), borderTopStartRadius:responsiveWidth(2),backgroundColor:'#58B9D0',borderEndEndRadius:responsiveWidth(2)}}>
                                        <Text style={{ fontSize: 12, fontWeight: '500', lineHeight:18, letterSpacing:0, color: '#FFFFFF' }}>
                                           Okay
                                        </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949', marginLeft:responsiveWidth(40)}}>7:01 am</Text>
                            </View>

                                <Image source={images.patientImage} style={onlinechatwithveterinarystyles.imageSize}/>

                         </View>

                         {/*Outgoing Message (You)*/}

                           <View style={{flexDirection:'row',justifyContent: 'flex-end',gap:responsiveHeight(1)}}>
                         
                         
                         <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end',top:responsiveHeight(2.5) }}>
                                 <Text style={{fontSize:10, fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#494949'}}>You</Text>
                                </View>
                                    <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(3),marginLeft:responsiveWidth(40)}}>
                                       
                                          
                                       <Image source={images.goldenRetriver} style={onlinechatwithveterinarystyles.goldenRetriverImageSize}/>


                                    </View>
                                    <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949', marginLeft:responsiveWidth(40)}}>7:02 am</Text>
                            </View>

                                <Image source={images.patientImage} style={onlinechatwithveterinarystyles.imageSize}/>

                         </View>

                         
                           {/* Ingoing Message (You) */}

                    <View style={{flexDirection:'row',justifyContent: 'flex-start',gap:responsiveHeight(1)}}>
                          <Image source={images.doctorImage} style={onlinechatwithveterinarystyles.imageSize}/>
                         
                         <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',top:responsiveHeight(2) }}>
                                 <Text style={{fontSize:10, fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#494949'}}>Dr. Samar Halder</Text>
                                </View>
                                    <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center', marginTop: 20 }}>
                                       <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                            
                                       <View
                                        style={{
                                            alignSelf: 'center', 
                                            maxWidth: responsiveWidth(55), 
                                            minWidth: responsiveWidth(30), 
                                            padding: responsiveWidth(2),
                                            borderRadius:responsiveWidth(1.9),
                                            borderWidth:responsiveWidth(1),
                                            borderColor:'#FFFFFF',
                                            backgroundColor: '#E6E6E6',
                                        }}
                                        >
                                           <View style={{flexDirection:'row'}}>
                                                <Image source={Icons.BiSolidFilePng}/>
                                                    <View>
                                                           <Text  style={{fontSize:responsiveWidth(2.6),fontWeight:'500',lineHeight:responsiveHeight(2),letterSpacing:0,color:'#6B6B6B'}} >Tommy Prescription.png</Text>
                                                           <Text  style={{fontSize:responsiveWidth(2.6),fontWeight:'500',lineHeight:responsiveHeight(2),letterSpacing:0,color:'#6B6B6B'}} >4.2MB</Text>
                                                    </View>
                                            </View>
                                            
                                            </View>

                                            <TouchableOpacity 
                                              onPress={()=>navigation.navigate("Main",{
                                                  screen: 'Service',params: {
                                                    screen: 'VeterinaryPharmacy',}
                                              })}
                                              >
                                              <View style={{justifyContent:'center',alignItems:'center'}}>
                                                 <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(7),height:responsiveWidth(7),borderRadius:responsiveWidth(7),backgroundColor:'#58B9D0'}}>
                                                  <Image source={Icons.PiShareFat}/>
                                               </View>
                                              </View>
                                            </TouchableOpacity>

                                       </View>

                                    </View>
                                    <Text style={{ fontSize: 10, fontWeight:'500', lineHeight:16, color: '#494949',}}>7:04 am</Text>
                            </View>

                               

                           </View>
                 </ScrollView>


             <VeterinaryBookConsultation modalVisible={modalVisible} setModalVisible={setModalVisible} />

             {/* Fixed Button at the Bottom */}
                <View style={onlinechatwithveterinarystyles.fixedButtonContainer}>
                     <View style={onlinechatwithveterinarystyles.inputWrapper}>
                        <TextInput
                            placeholder="Write a message"
                            style={onlinechatwithveterinarystyles.textInput}
                            placeholderTextColor="#999"
                        />
                            <View style={onlinechatwithveterinarystyles.iconContainer}>
                                <Image source={Icons.CgAttachment} style={onlinechatwithveterinarystyles.icon} />
                                <Image source={Icons.BiCamera} style={onlinechatwithveterinarystyles.icon} />
                            </View>
                       </View>
                </View>
           </LinearGradient>

     
    );
};

export default OnlineChatWithVeterinary;
