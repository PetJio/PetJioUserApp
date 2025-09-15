import React from 'react';
import { View, Text,TouchableOpacity,Image,TextInput} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import allcategoriesstyles from './allcategories.styles';
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
};

// Define the navigation prop type
type AllCategoryScreenNavigationProp = StackNavigationProp<RootStackParamList,'PetjioMartStore'>;

// Define props interface for the component
interface AllCategoryProps {
    navigation: AllCategoryScreenNavigationProp;
}
const AllCategories: React.FC <AllCategoryProps> = ({navigation}) => {
    return (
        <View style={allcategoriesstyles.container}>
            <View style={allcategoriesstyles.containerchild}>
               <TouchableOpacity 
                 onPress={()=>navigation.navigate("PetjioMartStore")}
               >
                    <View style={allcategoriesstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={allcategoriesstyles.leftarrowicon} />
                            <Text style={allcategoriesstyles.groomingText}>All Categories</Text>
                        </View>
               </TouchableOpacity>

                <TouchableOpacity
                //   onPress={()=>navigation.navigate("MartLocalityAddress")}
                >
                    <View style={allcategoriesstyles.locationtext}>
                        <Image source={Icons.LoveIcon}/>
                        <Image source={Icons.BiShoppingBag} style={allcategoriesstyles.downArrowIcon} />
                        <Image source={Icons.BiCart} style={allcategoriesstyles.downArrowIcon} />
                        <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(4),height:responsiveHeight(1.8),borderRadius:responsiveWidth(2),backgroundColor:"#58B9D0",position:'absolute',bottom:responsiveHeight(1.5),left:responsiveWidth(16),right:responsiveWidth(0.01)}}>
                              <Text style={{fontSize:8,fontWeight:'500',lineHeight:8,letterSpacing:0,color:'#FFFFFF'}}>2</Text>
                        </View>
                    </View>
              </TouchableOpacity>
     

               
          </View>

          <View style={allcategoriesstyles.searchparent}>
                <View style={allcategoriesstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={allcategoriesstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={allcategoriesstyles.filterbtn}>
                   <Image source={Icons.Filter} style={allcategoriesstyles.filterIcon}/>
                </TouchableOpacity>
            </View>

               <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',  gap:responsiveWidth(5)}}>

              <View style={allcategoriesstyles.petFoodView}>
                 <Image source={images.dogmouthImage} style={{width:responsiveWidth(5),height:responsiveHeight(2)}}/>
                 <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#2D2D2D'}}>Dog</Text>
              </View>

             <View style={allcategoriesstyles.petHealthView}>
                <Image source={Icons.catIcon} />
                <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#FFFFFF'}}>Cat</Text>
             </View>
 
             <View style={allcategoriesstyles.petAccessroriesView}>
               <Image source={Icons.clownfishIcon}/>
               <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#2D2D2D'}}>Fish</Text>
             </View>


              <View style={allcategoriesstyles.othersView}>
               <Image source={Icons.doglegIcon}/>
               <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#2D2D2D'}}>Others</Text>
             </View>

               </View>

 

             <View style={{gap:responsiveHeight(4)}}>

           <View style={{paddingHorizontal:responsiveWidth(4),gap:responsiveHeight(2)}}>

              <View style={{top:responsiveHeight(4),gap:responsiveHeight(2)}}>
                 <Text style={{fontSize:16,fontWeight:'600',lineHeight:20,letterSpacing:0,color:'#000000'}}>Pet Food</Text>
                  
              </View> 

               <View style={{flexDirection:'row',gap:responsiveWidth(4)}}>

                   <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
                    <Image source={images.wetfoodImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Wet Food</Text>
                  
                </View>

               <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.dryfoodImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Dry Food</Text>
                  
              </View>
                  <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.cookedfoodImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Cooked Food</Text>
                  
              </View>

              <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.treatsImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Treats</Text>
                  
              </View>



               </View>         
                      
              
             </View>


            <View style={{paddingHorizontal:responsiveWidth(4),gap:responsiveHeight(2)}}>

              <View style={{top:responsiveHeight(4),gap:responsiveHeight(2)}}>
                 <Text style={{fontSize:16,fontWeight:'600',lineHeight:20,letterSpacing:0,color:'#000000'}}>Pet Accessories</Text>
                  
              </View> 

               <View style={{flexDirection:'row',gap:responsiveWidth(4)}}>

                   <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
                    <Image source={images.toysImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Toys</Text>
                          
                     </View>
                  
                </View>

               <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.collorharnessImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Collar & {"\n"} Harness</Text>
                         
                     </View>
                  
              </View>
                  <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.bowlsImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Bowls</Text>
                     </View>
                  
              </View>

              <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.treatstorageImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                         <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Treat Storage</Text>
                    </View>
                  
              </View>

               <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.litterboxImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                         <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}> Litter Box</Text>

                     </View>
                  
               </View>

               



               </View>         
                      
              
             </View>

             <View style={{paddingHorizontal:responsiveWidth(4)}}>
                  <View style={{flexDirection:'row',gap:responsiveWidth(4)}}>

                   <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
                    <Image source={images.grearImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Gear</Text>
                          
                     </View>
                  
                </View>

               <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.groomingtoolImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Grooming{"\n"}Tools</Text>
                         
                     </View>
                  
              </View>
                  <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.petfurnitureImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Pet Furniture</Text>
                     </View>
                  
              </View>

            
               </View>
                
             </View>


              <View style={{paddingHorizontal:responsiveWidth(4),gap:responsiveHeight(2)}}>

              <View style={{top:responsiveHeight(4),gap:responsiveHeight(2)}}>
                 <Text style={{fontSize:16,fontWeight:'600',lineHeight:20,letterSpacing:0,color:'#000000'}}>Pet Health</Text>
                  
              </View> 

               <View style={{flexDirection:'row',gap:responsiveWidth(4)}}>

                   <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
                    <Image source={images.vitaminsImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Vitamins</Text>
                          
                     </View>
                  
                </View>

               <View style={{top:responsiveHeight(4),gap:responsiveHeight(1),}}>
    
                    <Image source={images.equipmentImage} style={{width:responsiveWidth(12.8),height:responsiveHeight(5.9),borderRadius:responsiveWidth(8)}} />
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#343434'}}>Equipment</Text>
                         
                     </View>
                  
              </View>
                 
               </View>         
             </View>
             </View> 
        </View>
    );
};

export default AllCategories;
