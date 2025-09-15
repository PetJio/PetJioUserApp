
import { View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';

import { StackNavigationProp } from '@react-navigation/stack';
import confirmdetailstyles from './ConfirmDetails.styles';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    Paymentmethod:{ section: string };
    UserService:undefined;
    WalkingDetails:undefined;
    ConfirmDetails: undefined
   
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Paymentmethod'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp; // Navigation is now required
}



const ConfirmDetails: React.FC<UserDetailsProps> = ({navigation}) => {
    return (
        <View style={confirmdetailstyles.container}>
                <View style={confirmdetailstyles.containerchild}>
                    <TouchableOpacity onPress={()=>navigation.navigate('WalkingDetails')}>
                        <View style={confirmdetailstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={confirmdetailstyles.leftarrowicon}
                            />
                            <Text style={confirmdetailstyles.checkoutText}>
                                Checkout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={confirmdetailstyles.imageposition}>
                    <Image source={images.walkinguserimage} style={confirmdetailstyles.imagesize}/>
                    <View style={confirmdetailstyles.setgapandheight}>
                           <View style={confirmdetailstyles.setTextCenter}>
                                  <Text style={confirmdetailstyles.nameText}>Urmi Jana</Text>
                           </View>
                           <View style={confirmdetailstyles.positionMapIcon}>
                                 <Image source={Icons.BiMap}/>
                                 <Text style={confirmdetailstyles.kilometerText} >2.2km Away</Text>
                           </View>
                    </View>
                </View>
                <View style={confirmdetailstyles.bottomBorder}/>
                <View style={confirmdetailstyles.firstText}>
                       <View style={confirmdetailstyles.textgap}>
                             <Text style={confirmdetailstyles.normalText}>Booking for</Text>
                             <Text style={confirmdetailstyles.countdogText}>2 Dogs</Text>
                       </View>
                       <View>
                             <Text style={confirmdetailstyles.dogText}>Daisy, Leo</Text>
                       </View>
                       
                </View>
                <View style={confirmdetailstyles.secondText}/>
                <View style={confirmdetailstyles.flexView}>
                       <Text style={confirmdetailstyles.normalText}>Start Date</Text>
                       <View style={confirmdetailstyles.gapIcon}>
                             <Text style={confirmdetailstyles.dogText}>25 Oct 2024</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={confirmdetailstyles.thirdText}/>
                <View style={confirmdetailstyles.thirdflexView}>
                       <Text style={confirmdetailstyles.normalText}>Time Slot</Text>
                       <View style={confirmdetailstyles.gapTextIcon}>
                             <Text style={confirmdetailstyles.dogText}>6:00 - 6:30 am</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={confirmdetailstyles.bottomBorder}/>
                <View style={confirmdetailstyles.fourthflexView}>
                       <Text style={confirmdetailstyles.normalText}>Package</Text>
                       <View style={confirmdetailstyles.gapIcon}>
                             <Text style={confirmdetailstyles.dogText}>Elite Pet Walking Package</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={confirmdetailstyles.bottomBorder}/>
                <View style={confirmdetailstyles.fourthflexView}>
                       <Text style={confirmdetailstyles.normalText}>Walking Type</Text>
                       <View style={confirmdetailstyles.gapTextIcon}>
                             <Text style={confirmdetailstyles.dogText}>Normal</Text>
                       </View>
                </View>
                <View style={confirmdetailstyles.bottomBorder}/>
                <View style={confirmdetailstyles.fourthflexView}>
                       <Text style={confirmdetailstyles.normalText}>Breed Category</Text>
                       <View style={confirmdetailstyles.gapTextIcon}>
                             <Text style={confirmdetailstyles.dogText}>Small</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={confirmdetailstyles.bottomBorder}/>
                <View style={confirmdetailstyles.fivethViewHeight}>
                       <View style={confirmdetailstyles.fivethflexView}>
                             <View style={confirmdetailstyles.textAlign}>
                             <View>
                                <Text style={confirmdetailstyles.PeterFernandezText}>Peter Fernandez</Text>
                                <Text style={confirmdetailstyles.addressText}>32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                             </View> 
                             <View style={confirmdetailstyles.borderRadiusText}>
                                      <Text style={confirmdetailstyles.changeText}>CHANGE</Text>
                             </View>
                            </View>
                       </View>
                </View>
                <View>
                       <View style={confirmdetailstyles.viewTop}>
                              <Text style={confirmdetailstyles.priceDetailsText}>Price Details</Text>
                              <View style={confirmdetailstyles.setflexforview}>
                                    <View style={confirmdetailstyles.textGap}>
                                            <Text style={confirmdetailstyles.DogText}>Daisy, Leo</Text>
                                            <Text style={confirmdetailstyles.walkPerMeterText}>200/Walk</Text>
                                     </View>
                                     <View>
                                          <Text style={confirmdetailstyles.priceText}>₹ 18000.00</Text>
                                     </View>
                              </View>
                       </View>
                </View>

                <View style={confirmdetailstyles.bottomparentView}>
                 <View style={confirmdetailstyles.gapHeight}>
                 <TouchableOpacity onPress={() => navigation.navigate('Paymentmethod', { section: 'walking' })}>
                     <View style={confirmdetailstyles.googlePayIconGap}>
                            <Image source={Icons.googlepay} />
                            <Text style={confirmdetailstyles.payUsingText}>PAY USING</Text>
                            <Image source={Icons.IoIosArrowUp}/>
                     </View>
                     </TouchableOpacity>
                     <Text style={confirmdetailstyles.GooglePayUPIText}>Google Pay UPI</Text>
                 </View>
                   <View style={confirmdetailstyles.bookWalkerButton}>
                       <Text style={confirmdetailstyles.BookWalkerText}>Book Walker</Text>
                     </View>
             </View>
        </View>
    );
};

export default ConfirmDetails;

