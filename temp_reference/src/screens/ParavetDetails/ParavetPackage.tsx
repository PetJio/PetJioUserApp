import React, { useState } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity,Modal } from 'react-native';
import CheckBox from 'react-native-check-box';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import paravetpackagestyles from './paravetpackage.styles';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import ModalComponent from '../Modal/Modal';
import TrainingModal from '../TrainingModal/TrainingModal';
import { Icon } from 'react-native-paper';


// type ModalComponentProps = {
//   modalVisible: boolean;
// };

// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    ParavetPackage:undefined;
};

// Define the navigation prop type
type WalkingPackageScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Define props interface for the component
interface ParavetPackageProps {
    navigation: WalkingPackageScreenNavigationProp;
}

const ParavetPackage: React.FC<ParavetPackageProps> = ({ navigation }: any) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
          <View style={paravetpackagestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: responsiveHeight(8)}}>
            <View style={{gap:responsiveHeight(1.6)}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: responsiveWidth(1.5),right:responsiveWidth(8),top:responsiveHeight(1)}}>
              <Text>Small Breed</Text>
              <Image source={Icons.TowerIcon} style={{top: responsiveHeight(0.5)}} />
            </View>
            <View style={{ position: 'relative' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={images.firstGradleImage}
                  style={{ width: responsiveWidth(90), borderRadius: responsiveWidth(2.5) }}
                />
              </View>
              <View style={{ width: responsiveWidth(100), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(2) }}>
                <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 14, letterSpacing: 0, color: '#FFFFFF' }}>
                  Premium Pet Walking Package
                </Text>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  checkBoxColor="#FFFFFF"
                  style={{ bottom: responsiveHeight(0.90) }}
                />
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(5.5) }}>
                <Image source={Icons.WhiteBiCalendar}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Duration : 15 Days
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(7.5) }}>
                <Image source={Icons.BiSolidHourglass}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Walk Time : 30 minutes per Day
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(9.5) }}>
                <Image source={Icons.TbCoinRupee}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Price : ₹ 12000
                </Text>
              </View>
              <View style={{width: responsiveWidth(100), paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(12.8) }}>
                <Text style={{fontSize:12,lineHeight:12,fontWeight:'600',letterSpacing:0,color:'#FFFFFF'}}>What’s Included?</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{gap:responsiveHeight(0.90),top:responsiveHeight(0.90)}}>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Daily 30-minute walk for your pet</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Safe and pet-friendly routes</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Personalized care and attention</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Hydration breaks during walks</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Experienced and friendly pet walkers</Text>
                      </View>
                    
                </View>
                    <Image source={images.petdogImage} style={{ width:responsiveWidth(80),height:responsiveHeight(25),resizeMode:'contain',bottom:responsiveHeight(9),right:responsiveWidth(36),transform: [{ rotate: '-180deg' },{ scaleY: -1 }]}}/>
                  </View>
              </View>
            </View>
            <View style={{ position: 'relative' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={images.secondGradleImage}
                  style={{ width: responsiveWidth(90), borderRadius: responsiveWidth(2.5) }}
                />
              </View>
              <View style={{ width: responsiveWidth(100), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(2) }}>
                <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 14, letterSpacing: 0, color: '#FFFFFF' }}>
                  Ultimate Pet Walking Package
                </Text>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  checkBoxColor="#FFFFFF"
                  style={{ bottom: responsiveHeight(0.90) }}
                />
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(5.5) }}>
                <Image source={Icons.WhiteBiCalendar}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                    Duration : 1 Month (30 Days)
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(7.5) }}>
                <Image source={Icons.BiSolidHourglass}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Walk Time : 30 minutes per Day
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(9.5) }}>
                <Image source={Icons.TbCoinRupee}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Price : ₹ 12000
                </Text>
              </View>
              <View style={{width: responsiveWidth(100), paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(12.8) }}>
                <Text style={{fontSize:12,lineHeight:12,fontWeight:'600',letterSpacing:0,color:'#FFFFFF'}}>What’s Included?</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{gap:responsiveHeight(0.90),top:responsiveHeight(0.90)}}>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Daily 30-minute walk for your pet</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Safe and pet-friendly routes</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Personalized care and attention</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Hydration breaks during walks</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Experienced and friendly pet walkers</Text>
                      </View>
                    
                </View>
                    {/* <Image source={images.petdogImage} style={{ width:responsiveWidth(80),height:responsiveHeight(25),resizeMode:'contain',bottom:responsiveHeight(9),right:responsiveWidth(36),transform: [{ rotate: '-180deg' },{ scaleY: -1 }]}}/> */}
                  </View>
              </View>
            </View>
            <View style={{ position: 'relative' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={images.thirdGradleImage}
                  style={{ width: responsiveWidth(90), borderRadius: responsiveWidth(2.5) }}
                />
              </View>
              <View style={{ width: responsiveWidth(100), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(2) }}>
                <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 14, letterSpacing: 0, color: '#FFFFFF' }}>
                  Ultimate Pet Walking Package
                </Text>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  checkBoxColor="#FFFFFF"
                  style={{ bottom: responsiveHeight(0.90) }}
                />
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(5.5) }}>
                <Image source={Icons.WhiteBiCalendar}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                    Duration : 1 Month (30 Days)
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(7.5) }}>
                <Image source={Icons.BiSolidHourglass}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Walk Time : 30 minutes per Day
                </Text>
              </View>
              <View style={{ gap:responsiveWidth(1.5), width: responsiveWidth(100), flexDirection: 'row', paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(9.5) }}>
                <Image source={Icons.TbCoinRupee}   style={{ bottom: responsiveHeight(0.20) }}/>
                <Text style={{ fontSize:11, fontWeight: '600', lineHeight: 12, letterSpacing: 0, color: '#FFFFFF',}}>
                  Price : ₹ 12000
                </Text>
              </View>
              <View style={{width: responsiveWidth(100), paddingHorizontal: responsiveWidth(8),  position: 'absolute', top: responsiveHeight(12.8) }}>
                <Text style={{fontSize:12,lineHeight:12,fontWeight:'600',letterSpacing:0,color:'#FFFFFF'}}>What’s Included?</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{gap:responsiveHeight(0.90),top:responsiveHeight(0.90)}}>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Daily 30-minute walk for your pet</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Safe and pet-friendly routes</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Personalized care and attention</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Hydration breaks during walks</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:responsiveWidth(1.9)}}>
                            <Image source={Icons.Check}/>
                            <Text style={{fontSize:9.5,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#FFFFFF'}}>Experienced and friendly pet walkers</Text>
                      </View>
                    
                </View>
                    <Image source={images.packageImage} style={{ width:responsiveWidth(80),height:responsiveHeight(25),resizeMode:'contain',bottom:responsiveHeight(12),right:responsiveWidth(10)}}/>
                  </View>
              </View>
            </View>
            </View>
            </ScrollView>
            <TrainingModal modalVisible = {modalVisible} setModalVisible={setModalVisible}/>
            {/* <ModalComponent modalVisible = {modalVisible} setModalVisible={setModalVisible}/> */}
              <View style={paravetpackagestyles.fixedButtonContainer}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                          style={paravetpackagestyles.nextBtnContainer}>
                          <Text style={paravetpackagestyles.nextBtnText}>Book Now at ₹200 per walk</Text>
                      </TouchableOpacity>
              </View>
            
          </View>
  );
};

export default ParavetPackage;
