import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Provider as PaperProvider, RadioButton } from 'react-native-paper';
import { SelectCountry } from 'react-native-element-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';
import {responsiveWidth,responsiveHeight,} from 'react-native-responsive-dimensions';

import checkoutstyles from './checkout.styles';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    Paymentmethod:{ section: 'walking' };
    UserService:undefined;
    ParavetServices:undefined;
    ParavetDetails:undefined;
    ParaVetPaymentmethod:undefined;
    MyCart:undefined;
    DeliveryAddress:undefined;
    PetMartPaymentMethod:undefined;
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyCart'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp; // Navigation is now required
}

const local_data = [
    {
        value: '1',
        lable: 'Country 1',
    },
    {
        value: '2',
        lable: 'Country 2',
    },
    {
        value: '3',
        lable: 'Country 3',
    },
    {
        value: '4',
        lable: 'Country 4',
    },
    {
        value: '5',
        lable: 'Country 5',
    },
];

const CheckOut: React.FC<UserDetailsProps> = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [fromTime, setFromTime] = useState('From');
    const [toTime, setToTime] = useState('To');
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);
    const [selectedBreed, setSelectedBreed] = useState<string>('1');
    const [country, setCountry] = useState<string>('1');
    const [checked, setChecked] = useState<string>('option1');
    const handleTimeChange = (
        event: any,
        selectedTime: Date | undefined,
        type: 'from' | 'to',
    ) => {
        if (type === 'from') setShowFromPicker(false);
        else setShowToPicker(false);

        if (selectedTime) {
            const formattedTime = selectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            type === 'from'
                ? setFromTime(formattedTime)
                : setToTime(formattedTime);
        }
    };
    return (
        <View style={checkoutstyles.container}>

             <View style={checkoutstyles.containerchild}>
                    <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
                        <View style={checkoutstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={checkoutstyles.leftarrowicon}
                            />
                            <Text style={checkoutstyles.checkoutText}>
                                Checkout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
           
                <View style={{ paddingHorizontal:responsiveWidth(4),top:responsiveHeight(3),gap:responsiveHeight(2)}}>
                       <View>
                      <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#000000'}}>Delivery Address</Text>
               </View>

               <View>
                    <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                           <Image source={Icons.BiMap}/>
                           <View style={{width:responsiveWidth(9)}}>
                                 <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#000000'}}>Home</Text>
                                  <TouchableOpacity
                                //    onPress={()=>navigation.navigate("DeliveryAddress")}
                                  >

                                    <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(85)}}>
                                        <Text style={{fontSize:10,fontWeight:'400',lineHeight:12,color:'#A4A3A3'}} >32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                                         <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(16),height:responsiveHeight(2.5),borderWidth:1,borderColor:'#E5E5E5'}}>
                                               <Text style={{fontSize:10,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#58B9D0'}}>CHANGE</Text>
                                         </View>
                                 </View>

                                  </TouchableOpacity>
                           </View> 
                    </View>
               </View>

                   <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />
                
                   <View style={{gap:responsiveHeight(2)}}>
                    
                      <View>
                            <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#000000'}}>Order List</Text>
                            
                      </View>
                            
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          
                  </View>
             </View>
            </View>
                  
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          
                  </View>
             </View>
            </View>
                  
            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
             <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
            </View>
             <View style={{gap:responsiveHeight(0.20)}}>
                  <Text style={{fontSize:12,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#484848'}}>Chompzilla Squeaky Plush Toy</Text>
                  <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#9D9D9D'}}>Toy</Text>
                  <View style={{ width:responsiveWidth(75), flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontSize:13,fontWeight:'500',letterSpacing:0,lineHeight:14,color:'#000000'}}>₹221.00</Text>
                          
                  </View>
             </View>
            </View>

                   </View>

                </View>



            {/* Fixed Next Button */}
            <View style={checkoutstyles.fixedButtonContainer}>
                 <View style={{ gap: responsiveHeight(1) }}>
                    <TouchableOpacity 
                      onPress={()=>navigation.navigate('PetMartPaymentMethod')}
                    >
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: responsiveWidth(2),
                        }}>
                        <Image source={Icons.googlepay} />
                        <Text
                            style={{
                                color: '#414141',
                                fontSize: 11,
                                fontWeight: '300',
                                top:responsiveHeight(0.90)
                            }}>
                            PAY USING
                        </Text>
                        <Image source={Icons.IoIosArrowUp} style={{ top:responsiveHeight(1)}} />
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
                <TouchableOpacity
                    // onPress={() => navigation.navigate('CheckOut')}
                    style={checkoutstyles.nextBtnContainer}>
                    <Text style={checkoutstyles.nextBtnText}>Make Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckOut;
