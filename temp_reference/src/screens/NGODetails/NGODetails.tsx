import {useState} from 'react';
import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native';
import ngodetailstyles from './ngodetails.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import NGOAbout from './NGOAbout';
import NGOReview from './NGOReview';
import NGOService from './NGOService';
import AdoptionModal from '../AdoptionModal/AdoptionModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';




// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    ServiceProviderform:undefined;
    SignIn:undefined;
    BoardingDetails:undefined;
    AddVaccination:undefined;
    BookBoarder:undefined;
    Grooming:undefined;
    NGOUser:undefined;
    Donation:undefined;
};

// Define the navigation prop type
type NGODetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface NGODetailsProps {
  navigation:NGODetailsScreenNavigationProp;
}


const NGODetails: React.FC<NGODetailsProps> = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('about');
    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    
    return (
        <View style={ngodetailstyles.container}>
            <View style={{position:'relative'}}>
             <Image source={images.straypetImage} style={{width:responsiveWidth(100),height:responsiveHeight(28)}}/>
              <View style={ngodetailstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NGOUser')}>
                            <View style={ngodetailstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={ngodetailstyles.iconColor}
                                />
                               
                            </View>
                        </TouchableOpacity>
                        <View style={ngodetailstyles.trackingPositionIcon}>
                            <Image source={Icons.WhiteBiPhone}/>
                            <Image source={Icons.BiMessageSquareDetails} />
                            <Image source={Icons.WhiteMdFavoriteBorder} />
                        </View>
                    </View>




           <View style={{width:responsiveWidth(100),justifyContent:'center', alignItems:'center',  position:'absolute',top:responsiveHeight(25)}}>
                 <Image source={images.petLogoFrame} style={ngodetailstyles.userimage}/>
           </View>
         </View>
          
          <View style={{gap:responsiveHeight(4)}}>
             <View style={{width:responsiveWidth(100),flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(6),top:responsiveHeight(10)}}>
                  <Text style={{fontSize:18,fontWeight:'600',lineHeight:23,letterSpacing:0,color:'#000000'}}>Pashupati Animal Welfare{"\n"} Society-P.A.W.S</Text>
                  <Text style={{fontSize:10,fontWeight:'500',lineHeight:10,letterSpacing:0,color:'#FF851B'}}>Verified</Text>
            </View>

               <View style={{flexDirection:'row', justifyContent:'space-between', top:responsiveHeight(7),paddingHorizontal:responsiveWidth(4)}}>
                   <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                         <Image source={Icons.BiMap} style={{top:responsiveHeight(0.30)}}/>
                         <Text style={{fontSize:11,fontWeight:'500', lineHeight:14,color:'#383838' }} >61, Nabapally Boys School Road (Near Ram {"\n"} Mandir), P.O. Nabapally, P. S. Barasat, Kolkata, {"\n"} India, West Bengal</Text>
                   </View>
                    <View style={ngodetailstyles.ratingGap}>
                        <Image source={Icons.StarIcon} style={ngodetailstyles.ratingHeight}/>
                         <Text style={ngodetailstyles.ratePointSize}>{' '}4.8 </Text>
                    </View>
             </View>
          </View>

          <View style={ngodetailstyles.menuTitleContainer}>
            <TouchableOpacity onPress={() => handleTabPress('about')}>
              <View style={ngodetailstyles.menuTitleAlignment}>
                <Text
                  style={[
                    ngodetailstyles.serviceText,
                    activeTab === 'about' && ngodetailstyles.commonTextColor,
                  ]}>
                  About
                </Text>
                {activeTab === 'about' && (
                  <View style={ngodetailstyles.menuBottomBoarder} />
                )}
              </View>
            </TouchableOpacity>


            {<TouchableOpacity onPress={() => handleTabPress('service')}>
                <View style={ngodetailstyles.menuTitleAlignment}>
                  <Text
                    style={[
                      ngodetailstyles.serviceText,
                      activeTab === 'service' && ngodetailstyles.commonTextColor,
                    ]}>
                    Service
                  </Text>
                  {activeTab === 'service' && (
                    <View style={ngodetailstyles.menuBottomBoarder} />
                  )}
                </View>
              </TouchableOpacity>
             }




            <TouchableOpacity onPress={() => handleTabPress('reviews')}>
                  <View style={ngodetailstyles.menuTitleAlignment}>
                    <Text
                      style={[
                        ngodetailstyles.reviewsText,
                        activeTab === 'reviews' && ngodetailstyles.commonTextColor,
                      ]}>
                      Reviews
                    </Text>
                    {activeTab === 'reviews' && (
                      <View style={ngodetailstyles.menuBottomBoarder} />
                    )}
                  </View>
          </TouchableOpacity>
</View>

  {activeTab === 'about' ? (
    <NGOAbout />
  ) : activeTab === 'service' ? (
    <NGOService />
  ) : (
    <NGOReview />
  )}


   <AdoptionModal modalVisible = {modalVisible} setModalVisible={setModalVisible}/>

 {/* Fixed Next Button */}
            <View style={ngodetailstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={ngodetailstyles.nextBtnContainer}>
                    <View style={ngodetailstyles.divideTextInputField}>
                    <View style={ngodetailstyles.borderRadiousBtn}>
                        <Text style={ngodetailstyles.ButtonText}>Adopt</Text>
                       
                    </View>
                    <TouchableOpacity
                     onPress={()=>navigation.navigate("Donation")}
                    >
                        <View style={ngodetailstyles.selectedborderRadiousBtn}>
                        <Text style={ngodetailstyles.selectedButtonText}>Donate</Text>
                    </View>
                    </TouchableOpacity>
                    
                 </View>
                </TouchableOpacity>
            </View>

 
</View>
    );
};

export default NGODetails;