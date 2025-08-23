import React from 'react';
import { View, Text,TouchableOpacity,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import virtualadoptionstyles from './virtualadoption.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';




// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    NGODetails:undefined;
    VirtualAdoptionDetails:undefined;
};

// Define the navigation prop type
type VirtualScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'VirtualAdoptionDetails'
>;

// Define props interface for the component
interface VirtualProps {
    navigation: VirtualScreenNavigationProp;
}


const VirtualAdoption: React.FC<VirtualProps> = ({navigation}) => {
    return (
        <View style={virtualadoptionstyles.container}>
           <View style={virtualadoptionstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NGODetails')}>
                            <View style={virtualadoptionstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={virtualadoptionstyles.iconColor}
                                />
                                <Text style={virtualadoptionstyles.textDateTime}>
                                    Virtual Adoption
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
  
                 <View style={{gap:responsiveHeight(2)}}>
                     <View style={{
      width: responsiveWidth(90),
      height: responsiveHeight(18),
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
      top:responsiveHeight(11.4)
    }}>
      <Image
        source={images.anascaledImage} 
        style={{
          width: responsiveWidth(26),
          height:responsiveHeight(16)
        
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#131313' }}>Anna</Text>
         <Text style={{ fontSize: 8, fontWeight: '400', lineHeight: 12, letterSpacing: 0, color: '#989898' }}>
  {"Anna of the soulful kind eyes and sweetest disposition was brought to CARE with one hind limb and one fore limbs badly broken after a vehicle ran her down. We didn’t have much hopes about her ability to walk again but she proved us wrong. Fighting her condition with everything she had, we rooted for her at every step. Sadly, no one knew where she came from and so she lives with us, filling our lives with happiness.".slice(0, 211) + "..."}
</Text>

            <TouchableOpacity
                
                onPress={()=>navigation.navigate("VirtualAdoptionDetails")}

                style={{
                    backgroundColor: '#58B9D0',
                    borderRadius: responsiveWidth(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:responsiveHeight(1),
                    width: responsiveWidth(28),
                    height: responsiveHeight(3), // Increased height
                }}
                >
                    <Text
                        style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        }}
                        numberOfLines={2} // Allow wrapping
                    >
                        Know More
                    </Text>
</TouchableOpacity>
        </View>

     

      </View>

      {/* <AntDesign name="hearto" size={20} color="gray" style={{ position: 'absolute', top: 10, right: 10 }} /> */}
      <Image source={Icons.LoveIcon} style={{ position: 'absolute', top: 10, right: 10 }} />
    </View>
     <View style={{
      width: responsiveWidth(90),
      height: responsiveHeight(18),
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
      top:responsiveHeight(11.4)
    }}>
      <Image
        source={images.anascaledImage} 
        style={{
          width: responsiveWidth(26),
          height:responsiveHeight(16)
        
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#131313' }}>Anna</Text>
          <Text style={{fontSize:8,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#989898' }}>
           Anna of the soulful kind eyes and sweetest disposition was brought to CARE with one hind limb and one fore limbs badly broken after a vehicle ran her down. We didn’t have much hopes about her ability to walk again but she proved us wrong. Fighting her condition with everything she had, we rooted for her at every step. Sadly, no one knew where she came from and so she lives with us, filling our lives with happiness.
          </Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate("VirtualAdoptionDetails")}
                style={{
                    backgroundColor: '#58B9D0',
                    borderRadius: responsiveWidth(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:responsiveHeight(1),
                    width: responsiveWidth(28),
                    height: responsiveHeight(3), // Increased height
                }}
                >
                    <Text
                        style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        }}
                        numberOfLines={2} // Allow wrapping
                    >
                        Know More
                    </Text>
</TouchableOpacity>
        </View>

     

      </View>

      {/* <AntDesign name="hearto" size={20} color="gray" style={{ position: 'absolute', top: 10, right: 10 }} /> */}
      <Image source={Icons.LoveIcon} style={{ position: 'absolute', top: 10, right: 10 }} />
    </View>
     <View style={{
      width: responsiveWidth(90),
      height: responsiveHeight(18),
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
      top:responsiveHeight(11.4)
    }}>
      <Image
        source={images.anascaledImage} 
        style={{
          width: responsiveWidth(26),
          height:responsiveHeight(16)
        
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#131313' }}>Anna</Text>
          <Text style={{fontSize:8,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#989898' }}>
           Anna of the soulful kind eyes and sweetest disposition was brought to CARE with one hind limb and one fore limbs badly broken after a vehicle ran her down. We didn’t have much hopes about her ability to walk again but she proved us wrong. Fighting her condition with everything she had, we rooted for her at every step. Sadly, no one knew where she came from and so she lives with us, filling our lives with happiness.
          </Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate("VirtualAdoptionDetails")}
                style={{
                    backgroundColor: '#58B9D0',
                    borderRadius: responsiveWidth(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:responsiveHeight(1),
                    width: responsiveWidth(28),
                    height: responsiveHeight(3), // Increased height
                }}
                >
                    <Text
                        style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        }}
                        numberOfLines={2} // Allow wrapping
                    >
                        Know More
                    </Text>
           </TouchableOpacity>
        </View>

     

      </View>

      {/* <AntDesign name="hearto" size={20} color="gray" style={{ position: 'absolute', top: 10, right: 10 }} /> */}
      <Image source={Icons.LoveIcon} style={{ position: 'absolute', top: 10, right: 10 }} />
    </View>
     <View style={{
      width: responsiveWidth(90),
      height: responsiveHeight(18),
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
      top:responsiveHeight(11.4)
    }}>
      <Image
        source={images.anascaledImage} 
        style={{
          width: responsiveWidth(26),
          height:responsiveHeight(16)
        
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#131313' }}>Anna</Text>
          <Text style={{fontSize:8,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#989898' }}>
           Anna of the soulful kind eyes and sweetest disposition was brought to CARE with one hind limb and one fore limbs badly broken after a vehicle ran her down. We didn’t have much hopes about her ability to walk again but she proved us wrong. Fighting her condition with everything she had, we rooted for her at every step. Sadly, no one knew where she came from and so she lives with us, filling our lives with happiness.
          </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: '#58B9D0',
                    borderRadius: responsiveWidth(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:responsiveHeight(1),
                    width: responsiveWidth(28),
                    height: responsiveHeight(3), // Increased height
                }}
                >
                    <Text
                        style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        }}
                        numberOfLines={2} // Allow wrapping
                    >
                        Adopt Virtually
                    </Text>
</TouchableOpacity>
        </View>

     

      </View>

      {/* <AntDesign name="hearto" size={20} color="gray" style={{ position: 'absolute', top: 10, right: 10 }} /> */}
      <Image source={Icons.LoveIcon} style={{ position: 'absolute', top: 10, right: 10 }} />
    </View>

     <View style={{
      width: responsiveWidth(90),
      height: responsiveHeight(18),
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
      top:responsiveHeight(11.4)
    }}>
      <Image
        source={images.anascaledImage} 
        style={{
          width: responsiveWidth(26),
          height:responsiveHeight(16)
        
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#131313' }}>Anna</Text>
          <Text style={{fontSize:8,fontWeight:'400',lineHeight:12,letterSpacing:0,color:'#989898' }}>
           Anna of the soulful kind eyes and sweetest disposition was brought to CARE with one hind limb and one fore limbs badly broken after a vehicle ran her down. We didn’t have much hopes about her ability to walk again but she proved us wrong. Fighting her condition with everything she had, we rooted for her at every step. Sadly, no one knew where she came from and so she lives with us, filling our lives with happiness.
          </Text>
            <TouchableOpacity
                 onPress={()=>navigation.navigate("VirtualAdoptionDetails")}
                style={{
                    backgroundColor: '#58B9D0',
                    borderRadius: responsiveWidth(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:responsiveHeight(1),
                    width: responsiveWidth(28),
                    height: responsiveHeight(3), // Increased height
                }}
                >
                    <Text
                        style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        }}
                        numberOfLines={2} // Allow wrapping
                    >
                        Know More
                    </Text>
</TouchableOpacity>
        </View>

     

      </View>

      {/* <AntDesign name="hearto" size={20} color="gray" style={{ position: 'absolute', top: 10, right: 10 }} /> */}
      <Image source={Icons.LoveIcon} style={{ position: 'absolute', top: 10, right: 10 }} />
    </View>



                 </View>
     



        </View>
    );
};

export default VirtualAdoption;
