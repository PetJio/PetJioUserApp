import {useState,useEffect,useRef,useCallback,} from 'react';
import { View, Text,Image, Dimensions,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import veterinaryhomevisiteaboutstyles from './veterinaryhomevisiteabout.styles';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';



const VeterinaryHomeVisiteAbout: React.FC = () => {

    return (
          <View style={veterinaryhomevisiteaboutstyles.containerFlex}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={veterinaryhomevisiteaboutstyles.paddingBottom}>

             <View style={veterinaryhomevisiteaboutstyles.container}>
                 <View style={veterinaryhomevisiteaboutstyles.containerthirdsubchild} />
                <View style={veterinaryhomevisiteaboutstyles.expertiseText}>
                       <Text style={veterinaryhomevisiteaboutstyles.bioText}>Education</Text>
                       <Text style={veterinaryhomevisiteaboutstyles.paragraphText}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                </View>

               
               
                <View style={veterinaryhomevisiteaboutstyles.expertiseText}>
                     <Text style={veterinaryhomevisiteaboutstyles.paragraphText}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                     </Text>
              </View>
   
              <View style={{ marginLeft:responsiveWidth(4),gap:responsiveHeight(1)}}>
                    <Text style={{color:'#343434',fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0}}>Available Time slots</Text>
                    <View style={{flexDirection:'row',gap:responsiveWidth(1),top:responsiveHeight(0.50)}}>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>01:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1, borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',backgroundColor:'#58B9D0'}}>
                           <Text style={{color:'#ffffff',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>02:00 PM</Text>
                           <Text style={{color:'#ffffff',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#6C6C6C',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>03:00 PM</Text>
                           <Text style={{color:'#6C6C6C',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>No Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>03:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    </View>
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:12,fontWeight:'400',lineHeight:16,letterSpacing:0,color:'#1D4650'}}>View all slots</Text>
              </View>
              <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(90),height:responsiveWidth(18),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0'}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(85)}}>
                        <View>
                          <Text style={{fontSize:responsiveHeight(1.5),fontWeight:'500',color:'#FFFFFF'}}>Peter Fernandez</Text>
                          <Text style={{fontSize:responsiveHeight(1.2),fontWeight:'400',color:'#FFFFFF'}}>32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                       </View> 
                       <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(22),height:responsiveHeight(4.6),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:'#E5E5E5'}}>
                            <Text style={{fontSize:responsiveHeight(1.3),fontWeight:'500',letterSpacing:0,color:'#FFFFFF'}}>CHANGE</Text>
                       </View>
                   </View>
              </View>
          </View>
    </ScrollView>

        {/* Fixed Button */}
                    <View
                       style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: responsiveWidth(4),
                        paddingVertical: responsiveHeight(2),
                        backgroundColor: '#ffffff',
                        borderTopWidth: 1,
                        borderTopColor: '#ddd',
                    }}
                    >
                    <View style={{ gap: responsiveHeight(1) }}>
                        <TouchableOpacity
                        //    onPress={()=>navigation.navigate("VeterinaryPaymentMethod")}
                        >
                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                            <Image source={Icons.googlepay} />
                            <Text
                            style={{
                                color: '#414141',
                                fontSize: 11,
                                fontWeight: '300',
                                top: responsiveHeight(0.90),
                            }}>
                            PAY USING
                            </Text>
                            <Image source={Icons.IoIosArrowUp} style={{ top: responsiveHeight(1) }} />
                        </View>
                        </TouchableOpacity>
                        <Text
                        style={{
                            color: '#303030',
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 18,
                            letterSpacing: 0,
                        }}>
                        Google Pay UPI
                        </Text>
                    </View>
                
                    <View
                        style={{
                        width: responsiveWidth(63),
                        height: responsiveHeight(5.5),
                        borderRadius: responsiveWidth(1.5),
                        backgroundColor: '#58B9D0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 12,
                            fontWeight: '600',
                            lineHeight: 18,
                            letterSpacing: 0,
                        }}>
                             Book for Consultation
                        </Text>
                    </View>
                    </View>
    
</View>

       
    );
};

export default VeterinaryHomeVisiteAbout;