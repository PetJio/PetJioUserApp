import React from 'react';
import { View, Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import wishlistproductstyles from './wishlistproduct.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
    Mart:undefined;
    PetjioMartStore:undefined;
    PetProductDescription:undefined;
};

// Define the navigation prop type
type AllCategoryScreenNavigationProp = StackNavigationProp<RootStackParamList,'PetjioMartStore'>;

// Define props interface for the component
interface AllCategoryProps {
    navigation: AllCategoryScreenNavigationProp;
}
const WishlistProduct: React.FC <AllCategoryProps> = ({navigation}) => {
    return (
        <View style={wishlistproductstyles.container}>
            <View style={wishlistproductstyles.containerchild}>
               <TouchableOpacity 
                 onPress={()=>navigation.navigate("PetjioMartStore")}
               >
                    <View style={wishlistproductstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={wishlistproductstyles.leftarrowicon} />
                            <Text style={wishlistproductstyles.groomingText}>Wishlist</Text>
                        </View>
               </TouchableOpacity>

                <TouchableOpacity
                //   onPress={()=>navigation.navigate("MartLocalityAddress")}
                >
                    <View style={wishlistproductstyles.locationtext}>
                        <Image source={Icons.BiShoppingBag} style={wishlistproductstyles.downArrowIcon} />
                        <Image source={Icons.BiCart} style={wishlistproductstyles.downArrowIcon} />
                        <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(4),height:responsiveHeight(1.8),borderRadius:responsiveWidth(2),backgroundColor:"#58B9D0",position:'absolute',bottom:responsiveHeight(1.5),left:responsiveWidth(9.5),right:responsiveWidth(0.01)}}>
                              <Text style={{fontSize:8,fontWeight:'500',lineHeight:8,letterSpacing:0,color:'#FFFFFF'}}>2</Text>
                        </View>
                    </View>
              </TouchableOpacity>
     
          </View>

             <View style={{position:'absolute', zIndex:100, top:responsiveHeight(8),   flexDirection:'row', paddingHorizontal:responsiveWidth(4),gap:responsiveWidth(5)}}>

              <View style={wishlistproductstyles.petFoodView}>
                 <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#FFFFFF'}}>All</Text>
              </View>

             <View style={wishlistproductstyles.petHealthView}>
                <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#6B6A6A'}}>Food</Text>
             </View>
 
             <View style={wishlistproductstyles.petAccessroriesView}>
               <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#6B6A6A'}}>Comfortable Bed</Text>
             </View>


              <View style={wishlistproductstyles.othersView}>
               <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#6B6A6A'}}>Toys</Text>
             </View>

             
              <View style={wishlistproductstyles.othersView}>
               <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#6B6A6A'}}>Gear</Text>
             </View>

               </View>

        <ScrollView 
             contentContainerStyle={{paddingBottom:responsiveHeight(40)}}
             showsVerticalScrollIndicator={false}
             >
          <View>

            <View style={{gap:responsiveHeight(1),top:responsiveHeight(14)}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

            <TouchableOpacity 
              onPress={()=>navigation.navigate("PetProductDescription")}
              />

  
            {/* <View style={wishlistproductstyles.dogCollorView}>

            <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
               <Image source={images.dumbellImage} style={wishlistproductstyles.dogcollarImageSize}/>
            </TouchableOpacity>

            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
             <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    Dash Dog Daring Dumbbell{"\n"} Chew Toy For Dog
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={wishlistproductstyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={wishlistproductstyles.percentageText}>44%</Text>
                   <Text style={wishlistproductstyles.discountamountText}>₹399</Text>
                   <Text style={wishlistproductstyles.priceAmountText}>₹221</Text>
            </View>
           </View>


            <View style={wishlistproductstyles.dogCollorView}>
             <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
               <Image source={images.premiumdogcollorImage} style={wishlistproductstyles.dogcollarImageSize}/>
             </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
               <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={wishlistproductstyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={wishlistproductstyles.percentageText}>44%</Text>
                   <Text style={wishlistproductstyles.discountamountText}>₹399</Text>
                   <Text style={wishlistproductstyles.priceAmountText}>₹221</Text>
            </View>
           </View> */}



        </View> 

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

            <View style={wishlistproductstyles.dogCollorView}>
           
              <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>

                  <Image source={images.tongImage} style={wishlistproductstyles.dogcollarImageSize}/>
                
              </TouchableOpacity>


            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    {/* AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar.. */}
                    HUFT Chompzilla Squeaky {"\n"} Plush Toy For Dog..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={wishlistproductstyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={wishlistproductstyles.percentageText}>44%</Text>
                   <Text style={wishlistproductstyles.discountamountText}>₹399</Text>
                   <Text style={wishlistproductstyles.priceAmountText}>₹221</Text>
            </View>
           </View>
            <View style={wishlistproductstyles.dogCollorView}>
             <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
                 <Image source={images.ropedogImage} style={wishlistproductstyles.dogcollarImageSize}/>
             </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
             <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    Trixie Animal with Rope Dog {"\n"} Squeaker Toy...
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={wishlistproductstyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={wishlistproductstyles.percentageText}>44%</Text>
                   <Text style={wishlistproductstyles.discountamountText}>₹399</Text>
                   <Text style={wishlistproductstyles.priceAmountText}>₹221</Text>
            </View>
           </View>


            
            
           </View> 

            </View>

             <View style={{top:responsiveHeight(15)}}>
                
                 {/* <View style={wishlistproductstyles.wishlistheader}>
                  <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Recently Viewed</Text>

                </View> */}

                 <View style={{gap:responsiveHeight(1)}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

          <View style={wishlistproductstyles.dogCollorView}>
            <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
               <Image source={images.dogcollarImage} style={wishlistproductstyles.dogcollarImageSize}/>
            </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
              <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            
           </View>
            <View style={wishlistproductstyles.dogCollorView}>
               <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
                    <Image source={images.premiumdogcollorImage} style={wishlistproductstyles.dogcollarImageSize}/>
               </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
             <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>



        </View> 

        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

         <View style={wishlistproductstyles.dogCollorView}>
             <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
                  <Image source={images.dogcollarImage} style={wishlistproductstyles.dogcollarImageSize}/>
             </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
            <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>
            <View style={wishlistproductstyles.dogCollorView}>
              <TouchableOpacity onPress={()=>navigation.navigate("PetProductDescription")}>
                     <Image source={images.premiumdogcollorImage} style={wishlistproductstyles.dogcollarImageSize}/>
              </TouchableOpacity>
            <Image source={Icons.WishlisIcon} style={wishlistproductstyles.loveIconPosition}/>
             <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(18),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute', top:responsiveHeight(14), right:responsiveWidth(5)}}>
                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:13,letterSpacing:0,color:'#FFFFFF'}}>Add to Cart</Text>
             </View>
                <Text style={wishlistproductstyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={wishlistproductstyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
         
           </View>


            
            
           </View> 

            </View>






             </View>

          </View>
                    


       </ScrollView>    
 

 

            
        </View>
    );
};

export default WishlistProduct;
