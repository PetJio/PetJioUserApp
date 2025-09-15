
import { View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import trainingConfirmDetailstyles from './TrainingConfirmDetails.styles';



// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    Paymentmethod:{ section: string };
    UserService:undefined;
    WalkingDetails:undefined;
    ConfirmDetails: undefined;
    TrainingDetails:undefined;
    TrainingPaymentmethod:{ section: string };
   
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Paymentmethod'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp; // Navigation is now required
}



const TrainingConfirmDetails: React.FC<UserDetailsProps> = ({navigation}) => {
    return (
        <View style={trainingConfirmDetailstyles.container}>
                <View style={trainingConfirmDetailstyles.containerchild}>
                    <TouchableOpacity onPress={()=>navigation.navigate('TrainingDetails')}>
                        <View style={trainingConfirmDetailstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={trainingConfirmDetailstyles.leftarrowicon}
                            />
                            <Text style={trainingConfirmDetailstyles.checkoutText}>
                                Checkout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={trainingConfirmDetailstyles.imageposition}>
                    <Image source={images.walkinguserimage} style={trainingConfirmDetailstyles.imagesize}/>
                    <View style={trainingConfirmDetailstyles.setgapandheight}>
                           <View style={trainingConfirmDetailstyles.setTextCenter}>
                                  <Text style={trainingConfirmDetailstyles.nameText}>Urmi Jana</Text>
                           </View>
                           <View style={trainingConfirmDetailstyles.positionMapIcon}>
                                 <Image source={Icons.BiMap}/>
                                 <Text style={trainingConfirmDetailstyles.kilometerText} >2.2km Away</Text>
                           </View>
                    </View>
                </View>
                <View style={trainingConfirmDetailstyles.bottomBorder}/>
                <View style={trainingConfirmDetailstyles.firstText}>
                       <View style={trainingConfirmDetailstyles.textgap}>
                             <Text style={trainingConfirmDetailstyles.normalText}>Booking for</Text>
                             <Text style={trainingConfirmDetailstyles.countdogText}>2 Dogs</Text>
                       </View>
                       <View>
                             <Text style={trainingConfirmDetailstyles.dogText}>Daisy, Leo</Text>
                       </View>
                       
                </View>
                <View style={trainingConfirmDetailstyles.secondText}/>
                <View style={trainingConfirmDetailstyles.flexView}>
                       <Text style={trainingConfirmDetailstyles.normalText}>Start Date</Text>
                       <View style={trainingConfirmDetailstyles.gapIcon}>
                             <Text style={trainingConfirmDetailstyles.dogText}>25 Oct 2024</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={trainingConfirmDetailstyles.thirdText}/>
                <View style={trainingConfirmDetailstyles.thirdflexView}>
                       <Text style={trainingConfirmDetailstyles.normalText}>Time Slot</Text>
                       <View style={trainingConfirmDetailstyles.gapTextIcon}>
                             <Text style={trainingConfirmDetailstyles.dogText}>6:00 - 6:30 am</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={trainingConfirmDetailstyles.bottomBorder}/>
                <View style={trainingConfirmDetailstyles.fourthflexView}>
                       <Text style={trainingConfirmDetailstyles.normalText}>Package</Text>
                       <View style={trainingConfirmDetailstyles.gapIcon}>
                             <Text style={trainingConfirmDetailstyles.dogText}>Elite Pet Walking Package</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={trainingConfirmDetailstyles.bottomBorder}/>
                <View style={trainingConfirmDetailstyles.fourthflexView}>
                       <Text style={trainingConfirmDetailstyles.normalText}>Walking Type</Text>
                       <View style={trainingConfirmDetailstyles.gapTextIcon}>
                             <Text style={trainingConfirmDetailstyles.dogText}>Normal</Text>
                       </View>
                </View>
                <View style={trainingConfirmDetailstyles.bottomBorder}/>
                <View style={trainingConfirmDetailstyles.fourthflexView}>
                       <Text style={trainingConfirmDetailstyles.normalText}>Breed Category</Text>
                       <View style={trainingConfirmDetailstyles.gapTextIcon}>
                             <Text style={trainingConfirmDetailstyles.dogText}>Small</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={trainingConfirmDetailstyles.bottomBorder}/>
                <View style={trainingConfirmDetailstyles.fivethViewHeight}>
                       <View style={trainingConfirmDetailstyles.fivethflexView}>
                             <View style={trainingConfirmDetailstyles.textAlign}>
                             <View>
                                <Text style={trainingConfirmDetailstyles.PeterFernandezText}>Peter Fernandez</Text>
                                <Text style={trainingConfirmDetailstyles.addressText}>32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                             </View> 
                             <View style={trainingConfirmDetailstyles.borderRadiusText}>
                                      <Text style={trainingConfirmDetailstyles.changeText}>CHANGE</Text>
                             </View>
                            </View>
                       </View>
                </View>
                <View>
                       <View style={trainingConfirmDetailstyles.viewTop}>
                              <Text style={trainingConfirmDetailstyles.priceDetailsText}>Price Details</Text>
                              <View style={trainingConfirmDetailstyles.setflexforview}>
                                    <View style={trainingConfirmDetailstyles.textGap}>
                                            <Text style={trainingConfirmDetailstyles.DogText}>Daisy, Leo</Text>
                                            <Text style={trainingConfirmDetailstyles.walkPerMeterText}>200/Walk</Text>
                                     </View>
                                     <View>
                                          <Text style={trainingConfirmDetailstyles.priceText}>₹ 18000.00</Text>
                                     </View>
                              </View>
                       </View>
                </View>

                <View style={trainingConfirmDetailstyles.bottomparentView}>
                 <View style={trainingConfirmDetailstyles.gapHeight}>
                 <TouchableOpacity onPress={() => navigation.navigate('TrainingPaymentmethod', { section: 'training' })}>
                     <View style={trainingConfirmDetailstyles.googlePayIconGap}>
                            <Image source={Icons.googlepay} />
                            <Text style={trainingConfirmDetailstyles.payUsingText}>PAY USING</Text>
                            <Image source={Icons.IoIosArrowUp}/>
                     </View>
                     </TouchableOpacity>
                     <Text style={trainingConfirmDetailstyles.GooglePayUPIText}>Google Pay UPI</Text>
                 </View>
                   <View style={trainingConfirmDetailstyles.bookWalkerButton}>
                       <Text style={trainingConfirmDetailstyles.BookWalkerText}>Book Walker</Text>
                     </View>
             </View>
        </View>
    );
};

export default TrainingConfirmDetails;

