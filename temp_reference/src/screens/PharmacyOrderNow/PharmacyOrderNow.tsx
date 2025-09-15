
import {useState} from 'react';
import { View, Text,Image,TouchableOpacity,TextInput, ScrollView } from 'react-native';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import Icon from "react-native-vector-icons/Feather";
import pharmacyordernowstyles from './pharmacyordernow.styles';
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
    VeterinaryPharmacy:undefined;
    PharmacyOrderOverview:undefined
 
};

// Define the navigation prop type
type LiveTalkToVeterinaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LiveTalkToVeterinary'>;



// Define props interface for the component
interface VeterinaryPharmacyProps {
  navigation:LiveTalkToVeterinaryScreenNavigationProp;

}

const PharmacyOrderNow: React.FC<VeterinaryPharmacyProps> = ({navigation }) => {
      const [isChecked, setIsChecked] = useState<boolean>(false);
    return (
        <View style={pharmacyordernowstyles.container}>
        <View style={{top:responsiveHeight(7),gap:responsiveHeight(1.5)}}>
        <TouchableOpacity onPress={()=>navigation.navigate("VeterinaryPharmacy")}>
            <View style={{flexDirection:'row',gap:responsiveWidth(1),paddingHorizontal:responsiveWidth(4)}}>
                    <Image source={Icons.LeftArrow} style={{ tintColor: "#000000",top:responsiveHeight(0.50)}}/>
                    <Text style={{color:"#000000",fontSize:20,fontWeight:'500',fontFamily:''}}>Veterinary Pharmacy</Text>
            </View>
        </TouchableOpacity>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:responsiveHeight(90)}}
             >
               
              <View style={{top:responsiveHeight(1.5)}}>
                <View style={{ alignItems: 'center', marginTop: responsiveHeight(2) }}>
              {/* Card View (Pharmacy Info) */}
                <View
                    style={{
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(4),
                    paddingTop: responsiveWidth(2.5),
                    gap: responsiveWidth(2.5),
                    width: responsiveWidth(90),
                    height: responsiveWidth(25),
                    borderRadius: responsiveWidth(1),
                    backgroundColor: '#ffffff',
                    zIndex: 2, // bring above the button
                    elevation: 4, // for Android shadow
                    }}
                >
                    {/* Image + Phone Icon */}
                    <View>
                    <Image
                        source={images.pharmacyImage}
                        style={{
                        width: responsiveWidth(18),
                        height: responsiveWidth(18),
                        borderRadius: responsiveWidth(20),
                        position: 'relative',
                        }}
                    />
                    <View
                        style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(7),
                        height: responsiveWidth(7),
                        borderRadius: responsiveWidth(7),
                        backgroundColor: '#4494A8',
                        position: 'absolute',
                        left: 0,
                        right: responsiveWidth(4),
                        top: responsiveHeight(6),
                        }}
                    >
                        <Image source={Icons.BiSolidPhone} />
                    </View>
                    </View>

                    {/* Text Details */}
                    <View style={{ gap: responsiveHeight(0.75) }}>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: responsiveWidth(63),
                        }}
                    >
                        <Text
                        style={{
                            fontSize: responsiveWidth(4.5),
                            fontWeight: '700',
                            letterSpacing: 0,
                            color: '#000000',
                        }}
                        >
                        Aster Pharmacy
                        </Text>
                        <View style={pharmacyordernowstyles.ratingGap}>
                        <Image
                            source={Icons.StarIcon}
                            style={pharmacyordernowstyles.ratingHeight}
                        />
                        <Text style={pharmacyordernowstyles.ratePointSize}> 4.8</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.BiMap} />
                        <Text
                        style={{
                            fontSize: responsiveWidth(2.8),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                        }}
                        >
                        36, Ballygunge Gardens Rd
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: responsiveWidth(3) }}>
                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.BiTimeFive} />
                        <Text
                            style={{
                            fontSize: responsiveWidth(2.6),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                            }}
                        >
                            10:00 am - 09:00 pm
                        </Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.locationposition} />
                        <Text
                            style={{
                            fontSize: responsiveWidth(2.6),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                            }}
                        >
                            2.2km Away
                        </Text>
                        </View>
                    </View>
                    </View>
                </View>

          {/* Order Now Button (Below, but overlapped) */}
                <TouchableOpacity
                    onPress={()=>navigation.navigate("PharmacyOrderOverview")}
                  >

                     <View
                    style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: responsiveWidth(85),
                    height: responsiveHeight(7),
                    borderRadius: responsiveHeight(1.5),
                    borderWidth: responsiveWidth(0.3),
                    borderColor: '#4494A8',
                    backgroundColor: '#fff',
                    marginTop: -responsiveHeight(0.90), // overlap upward
                    zIndex: 1
                    }}
                >
                    <Text
                    style={{
                        fontSize: responsiveWidth(4.5),
                        fontWeight: '600',
                        letterSpacing: 0,
                        color: '#4494A8',
                    }}
                    >
                    Order Now
                    </Text>
                </View>

                </TouchableOpacity>
                </View>


                <View style={{ alignItems: 'center', marginTop: responsiveHeight(2) }}>
              {/* Card View (Pharmacy Info) */}
                <View
                    style={{
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(4),
                    paddingTop: responsiveWidth(2.5),
                    gap: responsiveWidth(2.5),
                    width: responsiveWidth(90),
                    height: responsiveWidth(25),
                    borderRadius: responsiveWidth(1),
                    backgroundColor: '#ffffff',
                    zIndex: 2, // bring above the button
                    elevation: 4, // for Android shadow
                    }}
                >
                    {/* Image + Phone Icon */}
                    <View>
                    <Image
                        source={images.pharmacyImage}
                        style={{
                        width: responsiveWidth(18),
                        height: responsiveWidth(18),
                        borderRadius: responsiveWidth(20),
                        position: 'relative',
                        }}
                    />
                    <View
                        style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(7),
                        height: responsiveWidth(7),
                        borderRadius: responsiveWidth(7),
                        backgroundColor: '#4494A8',
                        position: 'absolute',
                        left: 0,
                        right: responsiveWidth(4),
                        top: responsiveHeight(6),
                        }}
                    >
                        <Image source={Icons.BiSolidPhone} />
                    </View>
                    </View>

                    {/* Text Details */}
                    <View style={{ gap: responsiveHeight(0.75) }}>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: responsiveWidth(63),
                        }}
                    >
                        <Text
                        style={{
                            fontSize: responsiveWidth(4.5),
                            fontWeight: '700',
                            letterSpacing: 0,
                            color: '#000000',
                        }}
                        >
                        Aster Pharmacy
                        </Text>
                        <View style={pharmacyordernowstyles.ratingGap}>
                        <Image
                            source={Icons.StarIcon}
                            style={pharmacyordernowstyles.ratingHeight}
                        />
                        <Text style={pharmacyordernowstyles.ratePointSize}> 4.8</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.BiMap} />
                        <Text
                        style={{
                            fontSize: responsiveWidth(2.8),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                        }}
                        >
                        36, Ballygunge Gardens Rd
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: responsiveWidth(3) }}>
                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.BiTimeFive} />
                        <Text
                            style={{
                            fontSize: responsiveWidth(2.6),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                            }}
                        >
                            10:00 am - 09:00 pm
                        </Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                        <Image source={Icons.locationposition} />
                        <Text
                            style={{
                            fontSize: responsiveWidth(2.6),
                            fontWeight: '500',
                            letterSpacing: 0,
                            color: '#383838',
                            }}
                        >
                            2.2km Away
                        </Text>
                        </View>
                    </View>
                    </View>
                </View>

                 {/* Order Now Button (Below, but overlapped) */}
              
                 <TouchableOpacity
                   onPress={()=>navigation.navigate("PharmacyOrderOverview")}
                 >

                  <View
                    style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: responsiveWidth(85),
                    height: responsiveHeight(7),
                    borderRadius: responsiveHeight(1.5),
                    borderWidth: responsiveWidth(0.3),
                    borderColor: '#4494A8',
                    backgroundColor: '#fff',
                    marginTop: -responsiveHeight(0.90), // overlap upward
                    zIndex: 1
                    }}
                >
                    <Text
                    style={{
                        fontSize: responsiveWidth(4.5),
                        fontWeight: '600',
                        letterSpacing: 0,
                        color: '#4494A8',
                    }}
                    >
                    Order Now
                    </Text>
                  </View>
                 </TouchableOpacity>
                </View>

              </View>
            </ScrollView>  
   </View>
</View>
    );
};

export default PharmacyOrderNow;

