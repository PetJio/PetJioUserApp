import React, { useState } from 'react';
import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import petproductdescriptionstyles from './petproductdescription.styles';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import ProductDescriptionModal from './ProductDescriptionModal';


// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
    Mart:undefined;
    PetjioMartStore:undefined;
    WishlistProduct:undefined;
    MyCart:undefined;
};

// Define the navigation prop type
type PetProductDescriptionScreenNavigationProp = StackNavigationProp<RootStackParamList,'PetjioMartStore'>;

// Define props interface for the component
interface PetProductDescriptionProps {
    navigation: PetProductDescriptionScreenNavigationProp;
}



const PetProductDescription: React.FC<PetProductDescriptionProps> = ({navigation}) => {

    const [modalVisible,setModalVisible] = useState<boolean>(false)

    return (
        <View style={petproductdescriptionstyles.container}>
            <View style={petproductdescriptionstyles.header}>

             <View style={petproductdescriptionstyles.containerchild}>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("WishlistProduct")}
                    >
                            <View style={petproductdescriptionstyles.containerfirstsubchild}>
                                    <Image source={Icons.LeftArrow} style={petproductdescriptionstyles.leftarrowicon} />
                                </View>
                    </TouchableOpacity>

                        <TouchableOpacity
                        //   onPress={()=>navigation.navigate("MartLocalityAddress")}
                        >
                            <View style={petproductdescriptionstyles.locationtext}>
                                <Image source={Icons.fourateloveIcon}/>
                                <Image source={Icons.autocartIcon}/>
                            </View>
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={images.tongImage} style={{width:responsiveWidth(48),height:responsiveHeight(22)}} />
                      <Image source={Icons.playBtn} style={{bottom:responsiveHeight(3)}}/>
                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                     <View style={{paddingHorizontal:responsiveWidth(2), paddingVertical:responsiveHeight(0.80), width:responsiveWidth(80),height:responsiveHeight(7),borderRadius:responsiveWidth(2),backgroundColor:'#FFFFFF'}}>
                         <View style={{flexDirection:'row',gap:responsiveWidth(1.5)}}>
                            <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                              <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
                           </View>
                            <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                              <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
                           </View>
                            <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                              <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
                           </View>
                            <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                              <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
                           </View>
                            <View style={{width:responsiveWidth(14),height:responsiveHeight(5.5), borderWidth:1, borderColor:'#FFFFFF', borderRadius:responsiveWidth(2),backgroundColor:'#E8E8E8'}}>
                              <Image source={images.tongImage} style={{width:responsiveWidth(12.5),height:responsiveHeight(4.5),borderRadius:responsiveWidth(2)}} />  
                           </View>

                         </View>
                    </View>

                </View>
            </View>

             <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingBottom:responsiveHeight(20), gap: responsiveHeight(1),}}
             >

                 <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:responsiveWidth(4)}}>
                  <Text style={{fontSize:14,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#949494'}}>Toys</Text>
                   <View style={petproductdescriptionstyles.ratingGap}>
                                <Image
                                    source={Icons.YelloAiFillStar}
                                    style={petproductdescriptionstyles.ratingHeight}
                                />
                                <Text style={petproductdescriptionstyles.ratePointSize}>
                                    {' '}
                                    4.8
                                </Text>
                            </View>
           </View>
 
            <View  style={{paddingHorizontal:responsiveWidth(4)}}>
                   <Text  style={{fontSize:18,fontWeight:'600',lineHeight:24,letterSpacing:0,color:'#484848'}} >HUFT Chompzilla Squeaky {"\n"} Plush Toy For Dog</Text>

            </View>

             <View style={petproductdescriptionstyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={petproductdescriptionstyles.percentageText}>44%</Text>
                   <Text style={petproductdescriptionstyles.discountamountText}>₹399</Text>
                   <Text style={petproductdescriptionstyles.priceAmountText}>₹221</Text>
            </View>

             <View style={{ paddingHorizontal:responsiveWidth(4), flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{gap:responsiveHeight(1)}}>
                   <Text style={{fontSize:15,fontWeight:'500',lineHeight:22,letterSpacing:0,color:'#484848'}}>Seller</Text>
                    <View style={{flexDirection:'row',gap:responsiveWidth(2.5)}}>
                           <Image source={images.petjiostoreImage} style={{width:responsiveWidth(11),height:responsiveHeight(5),borderRadius:responsiveWidth(8)}} />
                           <View>
                                  <Text style={{fontSize:15,fontWeight:'500',lineHeight:22,letterSpacing:0,color:'#484848'}}>PetJio Store</Text>
                                   <Text style={{fontSize:12,fontWeight:'500',fontStyle:'italic',lineHeight:22,letterSpacing:0,color:'#838383'}}>Owner</Text>
                           </View>
                    </View>
            </View>

            <View style={{flexDirection:'row',gap:responsiveWidth(4),top:responsiveHeight(4.5)}}>

                 <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(9),height:responsiveHeight(4),borderRadius:responsiveWidth(6),backgroundColor:'#F6F6F6'}}>
                    <Image source={Icons.BsTelephoneFill}/>
             </View>
              <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(9),height:responsiveHeight(4),borderRadius:responsiveWidth(6),backgroundColor:'#F6F6F6'}}>
                    <Image source={Icons.BiSolidMessageSquareDots}/>
             </View>
                   
            </View>
             </View>
             
           <View style={{paddingHorizontal:responsiveWidth(4),gap:responsiveHeight(1)}}>
                  <View style={{flexDirection:'row',gap:responsiveWidth(0.90)}}>
                         <Text style={{fontSize:14,fontWeight:'500',lineHeight:22,letterSpacing:0,color:'#000000'}}>Select Color :</Text>
                         <Text style={{fontSize:14,fontWeight:'500',lineHeight:22,letterSpacing:0,color:'#949494'}}>Gray</Text>
                  </View>
                  <View style={{flexDirection:'row',gap:responsiveWidth(0.90)}}>
                        <Image source={Icons.grayWhiteIcon}/>
                        <Image source={Icons.yellowIcon}/>
                        <Image source={Icons.redIcon}/>
                        <Image source={Icons.blueIcon}/>
                  </View>
           </View>

           <View style={{paddingHorizontal:responsiveWidth(4),gap:responsiveHeight(1)}}>
               <Text style={{fontSize:14,fontWeight:'500',lineHeight:22,letterSpacing:0}}>Size :</Text>
               <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                    <View style={{ justifyContent:'center',alignItems:'center', width:responsiveWidth(12),height:responsiveHeight(3),borderRadius:responsiveWidth(1),borderWidth:1,borderColor:'#E4E4E4',backgroundColor:'#FFFFFF'}}>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#6C6C6C'}}>15 cm</Text>
                          
                    </View>

                      <View style={{ justifyContent:'center',alignItems:'center', width:responsiveWidth(12),height:responsiveHeight(3),borderRadius:responsiveWidth(1),borderWidth:1,borderColor:'#58B9D0',backgroundColor:'#EAFBFF'}}>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#000000'}}>15 cm</Text>
                          
                    </View>

                     <View style={{ justifyContent:'center',alignItems:'center', width:responsiveWidth(12),height:responsiveHeight(3),borderRadius:responsiveWidth(1),borderWidth:1,borderColor:'#E4E4E4',backgroundColor:'#FFFFFF'}}>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#6C6C6C'}}>25 cm</Text>
                          
                    </View>

               </View>
           </View>

            <TouchableOpacity onPress={()=>setModalVisible(true)}>

            <View style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:responsiveWidth(4)}}>
                    <Text style={{fontSize:14,fontWeight:'500',lineHeight:22,letterSpacing:0}}>Product Details</Text>
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#58B9D0'}}>See All Details</Text>
            </View>

            </TouchableOpacity>
            {/* Bullet Points */}
                <View>
                    {[
                    'Made with soft corduroy fabric',
                    'Safe and non-toxic materials',
                    'Squeaker inside for interactive play',
                    'Lightweight design',
                    'Easy to play with'
                    ].map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row',marginLeft:responsiveWidth(6) }}>
                        <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494'}}>{'\u2022'}</Text>
                        <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494',marginLeft:responsiveWidth(1)}}>{item}</Text>
                    </View>
                    ))}
                </View>
              <View />

             <View>
                
                 <View style={petproductdescriptionstyles.wishlistheader}>
                  <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Similar Products</Text>

                </View>

                 <View style={{gap:responsiveHeight(1)}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

          <View style={petproductdescriptionstyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petproductdescriptionstyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petproductdescriptionstyles.loveIconPosition}/>

                <Text style={petproductdescriptionstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petproductdescriptionstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            
           </View>
            <View style={petproductdescriptionstyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petproductdescriptionstyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petproductdescriptionstyles.loveIconPosition}/>

                <Text style={petproductdescriptionstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petproductdescriptionstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>



        </View> 

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

              <View style={petproductdescriptionstyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petproductdescriptionstyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petproductdescriptionstyles.loveIconPosition}/>

                <Text style={petproductdescriptionstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petproductdescriptionstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>
            <View style={petproductdescriptionstyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petproductdescriptionstyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petproductdescriptionstyles.loveIconPosition}/>

                <Text style={petproductdescriptionstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petproductdescriptionstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
         
           </View>
           </View> 
            </View>
             </View>
             </ScrollView>
  
         
         <ProductDescriptionModal
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
         />

        {/* Fixed Next Button */}
            <View style={petproductdescriptionstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() =>navigation.navigate("MyCart")}
                    style={petproductdescriptionstyles.nextBtnContainer}>
                    <View style={petproductdescriptionstyles.divideTextInputField}>
                    <View style={petproductdescriptionstyles.borderRadiousBtn}>
                        <Text style={petproductdescriptionstyles.ButtonText}>Buy now</Text>
                       
                    </View>
                    <TouchableOpacity
                    //  onPress={()=>navigation.navigate("Donation")}
                    >
                        <View style={petproductdescriptionstyles.selectedborderRadiousBtn}>
                        <Text style={petproductdescriptionstyles.selectedButtonText}>Add To Cart</Text>
                    </View>
                    </TouchableOpacity>
                    
                 </View>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default PetProductDescription;
