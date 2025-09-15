

import { View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import bookboarderstyles from './bookboarder.styles';




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
    BoardingRegistrationform:undefined;
    BoardingPaymentmethod:{ section: string }
   
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Paymentmethod'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp; // Navigation is now required
}



const BookBoarder: React.FC<UserDetailsProps> = ({navigation}) => {
    return (
        <View style={bookboarderstyles.container}>
                <View style={bookboarderstyles.containerchild}>
                    <TouchableOpacity onPress={()=>navigation.navigate('BoardingRegistrationform')}>
                        <View style={bookboarderstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={bookboarderstyles.leftarrowicon}
                            />
                            <Text style={bookboarderstyles.checkoutText}>
                                Checkout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={bookboarderstyles.imageposition}>
                    <Image source={images.walkinguserimage} style={bookboarderstyles.imagesize}/>
                    <View style={bookboarderstyles.setgapandheight}>
                           <View style={bookboarderstyles.setTextCenter}>
                                  <Text style={bookboarderstyles.nameText}>Urmi Jana</Text>
                           </View>
                           <View style={bookboarderstyles.positionMapIcon}>
                                 <Image source={Icons.BiMap}/>
                                 <Text style={bookboarderstyles.kilometerText} >2.2km Away</Text>
                           </View>
                    </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                <View style={bookboarderstyles.firstText}>
                       <View style={bookboarderstyles.textgap}>
                             <Text style={bookboarderstyles.normalText}>Booking for</Text>
                             <Text style={bookboarderstyles.countdogText}>2 Dogs</Text>
                       </View>
                       <View>
                             <Text style={bookboarderstyles.dogText}>Daisy, Leo</Text>
                       </View>
                       
                </View>
                <View style={bookboarderstyles.secondText}/>
                <View style={bookboarderstyles.flexView}>
                       <Text style={bookboarderstyles.normalText}>Start Date</Text>
                       <View style={bookboarderstyles.gapIcon}>
                             <Text style={bookboarderstyles.dogText}>25 Oct 2024</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={bookboarderstyles.thirdText}/>
                <View style={bookboarderstyles.thirdflexView}>
                       <Text style={bookboarderstyles.normalText}>Time Slot</Text>
                       <View style={bookboarderstyles.gapTextIcon}>
                             <Text style={bookboarderstyles.dogText}>6:00 - 6:30 am</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                <View style={bookboarderstyles.fourthflexView}>
                       <Text style={bookboarderstyles.normalText}>Package</Text>
                       <View style={bookboarderstyles.gapIcon}>
                             <Text style={bookboarderstyles.dogText}>Elite Pet Walking Package</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                <View style={bookboarderstyles.fourthflexView}>
                       <Text style={bookboarderstyles.normalText}>Walking Type</Text>
                       <View style={bookboarderstyles.gapTextIcon}>
                             <Text style={bookboarderstyles.dogText}>Normal</Text>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                <View style={bookboarderstyles.fourthflexView}>
                       <Text style={bookboarderstyles.normalText}>Breed Category</Text>
                       <View style={bookboarderstyles.gapTextIcon}>
                             <Text style={bookboarderstyles.dogText}>Small</Text>
                             <Image source={Icons.ForwardArrow}/>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                {/* <View style={bookboarderstyles.fivethViewHeight}>
                       <View style={bookboarderstyles.fivethflexView}>
                             <View style={bookboarderstyles.textAlign}>
                             <View>
                                <Text style={bookboarderstyles.PeterFernandezText}>Peter Fernandez</Text>
                                <Text style={bookboarderstyles.addressText}>32/E-1 M.L.B, Road , Bally, Howrah,</Text>
                             </View> 
                             <View style={bookboarderstyles.borderRadiusText}>
                                      <Text style={bookboarderstyles.changeText}>CHANGE</Text>
                             </View>
                            </View>
                       </View>
                </View> */}
                <View>
                       <View style={bookboarderstyles.viewTop}>
                              <Text style={bookboarderstyles.priceDetailsText}>Price Details</Text>
                              <View style={bookboarderstyles.setflexforview}>
                                    <View style={bookboarderstyles.textGap}>
                                            <Text style={bookboarderstyles.DogText}>Daisy, Leo</Text>
                                            <Text style={bookboarderstyles.walkPerMeterText}>200/Walk</Text>
                                     </View>
                                     <View>
                                          <Text style={bookboarderstyles.priceText}>₹ 20000.00</Text>
                                     </View>
                              </View>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomBorder}/>
                <View>
                       <View style={bookboarderstyles.viewTop}>
                              {/* <Text style={bookboarderstyles.priceDetailsText}>Price Details</Text> */}
                              <View style={bookboarderstyles.setflexforview}>
                                    <View style={bookboarderstyles.textGap}>
                                            <Text style={bookboarderstyles.DogText}>Meals</Text>
                                            <Text style={bookboarderstyles.walkPerMeterText}>16 days</Text>
                                     </View>
                                     <View>
                                          <Text style={bookboarderstyles.priceText}>₹ 20000.00</Text>
                                     </View>
                              </View>
                       </View>
                </View>
                <View style={bookboarderstyles.bottomparentView}>
                 <View style={bookboarderstyles.gapHeight}>
                 <TouchableOpacity onPress={() => navigation.navigate('BoardingPaymentmethod', { section: 'training' })}>
                     <View style={bookboarderstyles.googlePayIconGap}>
                            <Image source={Icons.googlepay} />
                            <Text style={bookboarderstyles.payUsingText}>PAY USING</Text>
                            <Image source={Icons.IoIosArrowUp}/>
                     </View>
                     </TouchableOpacity>
                     <Text style={bookboarderstyles.GooglePayUPIText}>Google Pay UPI</Text>
                 </View>
                   <View style={bookboarderstyles.bookWalkerButton}>
                       <Text style={bookboarderstyles.BookWalkerText}>Book Boarder</Text>
                     </View>
             </View>
        </View>
    );
};

export default BookBoarder;


