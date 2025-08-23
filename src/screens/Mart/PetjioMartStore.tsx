import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text,Image,TouchableOpacity,TextInput,Dimensions,FlatList, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import petjiomartstorestyles from './petjiomartstore.styles';
import { StackNavigationProp } from '@react-navigation/stack';






// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
    Mart:undefined;
    AllCategories:undefined;
    PetProductDescription:undefined;
    WishlistProduct:undefined;
};

// Define the navigation prop type
type PetjioMartStoreScreenNavigationProp = StackNavigationProp<RootStackParamList,'Mart'>;

// Define props interface for the component
interface PetjioStoreMartProps {
    navigation: PetjioMartStoreScreenNavigationProp;
}

const PetjioMartStore: React.FC<PetjioStoreMartProps> = ({navigation}) => {

 const flatListRef = useRef<FlatList>(null);
        const screenWidth = Dimensions.get('window').width;
        const [activeIndex, setActiveIndex] = useState<number>(0);

           // Memoize the scroll function
    const scrollToIndex = useCallback((index: number) => {
        try {
            flatListRef.current?.scrollToIndex({
                index,
                animated: true,
            });
            setActiveIndex(index);
        } catch (error) {
            console.log('Scroll error:', error);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex =
                activeIndex === Carousel.length - 1 ? 0 : activeIndex + 1;
            scrollToIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex, scrollToIndex]);

     const onScrollFailed = (error: any) => {
        const offset = error.index * screenWidth;
        flatListRef.current?.scrollToOffset({ offset, animated: true });
        setActiveIndex(error.index);
    };

    const getItemLayout = (_data: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const Carousel = [
        { id: '1', name: 'firstwalker', image: images.firstwalker },
        { id: '2', name: 'secondwalker', image: images.secondwalker },
        { id: '3', name: 'thirdwalker', image: images.thirdwalker },
       
    ];

    const renderItem = ({
        item,
    }: {
        item: { id: string; name: string; image: any };
    }) => {
        return (
            <View style={{ width: screenWidth }}>
               <View style={{justifyContent:'center',alignItems:'center',position:'relative'}}>
                         <Image source={images.groomerImage}/>
                         <Text style={{fontSize:12,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#343434',position:'absolute',left:responsiveWidth(18),top:responsiveHeight(2.5)}}>Offers On Accessories</Text>
                         <Text style={{fontSize:19,fontWeight:'500',lineHeight:20,color:'#3A3A3A',position:'absolute',left:responsiveWidth(10),top:responsiveHeight(5.8)}}>Get Special Offer</Text>
                         <View style={{flexDirection:'row',gap:responsiveWidth(1.8),position:'absolute',left:responsiveWidth(10),top:responsiveHeight(9)}}>
                                <Text style={{fontSize:14, fontWeight:'500', letterSpacing:0, lineHeight:14, color:'#616161'}}>Up to</Text>
                                <Text style={{fontSize:36,fontWeight:'600',lineHeight:42, letterSpacing:0,color:'#4494A8'}} >20%</Text>
                         </View>
                         <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(20),height:responsiveHeight(3),borderRadius:responsiveWidth(1.5),backgroundColor:'#58B9D0',position:'absolute',left:responsiveWidth(10),top:responsiveHeight(16)}}>
                               <Text  style={{fontSize:14, fontWeight:'500',letterSpacing:0,lineHeight:18,color:'#FFFFFF'}} >Shop Now</Text>
                         </View>
               </View>
            </View>
        );
    };

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const renderDotIndicators = () => {
        return Carousel.map(
            (dot: { id: string; name: string; image: any }, index: number) => {
                if (activeIndex === index) {
                    return (
                        <View
                            key={index}
                            style={petjiomartstorestyles.green_dot_Indicator}
                        />
                    );
                } else {
                    return (
                        <View
                            key={index}
                            style={petjiomartstorestyles.white_dot_Indicator}
                        />
                    );
                }
            },
        );
    };


    return (
        <View style={petjiomartstorestyles.container}>
           <View style={petjiomartstorestyles.containerchild}>
               <TouchableOpacity 
                 onPress={()=>navigation.navigate("Main")}
               >
                    <View style={petjiomartstorestyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={petjiomartstorestyles.leftarrowicon} />
                            <Text style={petjiomartstorestyles.groomingText}>Pet Mart</Text>
                        </View>
               </TouchableOpacity>

                <TouchableOpacity
                //   onPress={()=>navigation.navigate("MartLocalityAddress")}
                >
                    <View style={petjiomartstorestyles.locationtext}>
                        <Text style={petjiomartstorestyles.locationtextColor}>Kasba, Kolkata</Text>
                        <Image source={Icons.DownArrow} style={petjiomartstorestyles.downArrowIcon} />
                    </View>
              </TouchableOpacity>
     

               
          </View>

          <View style={petjiomartstorestyles.searchparent}>
                <View style={petjiomartstorestyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={petjiomartstorestyles.textInput}
                    />
                </View>
                <TouchableOpacity style={petjiomartstorestyles.filterbtn}>
                   <Image source={Icons.Filter} style={petjiomartstorestyles.filterIcon}/>
                </TouchableOpacity>
            </View>
 
            <View style={{top:responsiveHeight(2.5)}}>
               
              <View style={{gap:responsiveHeight(1)}}>
               <View style={{paddingHorizontal:responsiveWidth(5)}}>
                   <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Special Offers</Text>
             </View>
              <View>
                <FlatList
                    data={Carousel}
                    ref={flatListRef}
                    getItemLayout={getItemLayout}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    bounces={false}
                    onScrollToIndexFailed={onScrollFailed}
                />
              </View>
              </View>

   
               {/* Dots Indicator */}

                <View style={{justifyContent:'center',alignItems:'center'}}>
                   <View style={petjiomartstorestyles.dots_Indicator}>
                        {renderDotIndicators()}
                   </View>
                </View>
        </View>

          <TouchableOpacity
            onPress={()=>navigation.navigate("AllCategories")}
          >
   
             <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(5),top:responsiveHeight(4)}}>
                <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Category</Text>
                <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#58B9D0'}}>See All</Text>
           </View>    
        
         </TouchableOpacity>

           <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',  gap:responsiveWidth(2)}}>

              <View style={petjiomartstorestyles.petFoodView}>
                 <Image source={Icons.catfoodIcon}/>
                 <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#2D2D2D'}}>Pet Food</Text>
              </View>

             <View style={petjiomartstorestyles.petHealthView}>
                <Image source={Icons.pethealthIcon} style={{width:responsiveWidth(4.5),height:responsiveHeight(2.2)}}/>
                <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#FFFFFF'}}>Pet Health</Text>
             </View>
 
             <View style={petjiomartstorestyles.petAccessroriesView}>
               <Image source={Icons.pethampooIcon} style={{width:responsiveWidth(4.5),height:responsiveHeight(2.2)}}/>
               <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#2D2D2D'}}>Pet Accessrories</Text>
             </View>

           </View>

        
           <TouchableOpacity onPress={()=>navigation.navigate("WishlistProduct")}>
             <View style={petjiomartstorestyles.wishlistheader}>
                <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Wishlist</Text>
                <Text style={{fontSize:12,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#58B9D0'}}>See All</Text>
           </View>
           </TouchableOpacity>
          


             <ScrollView 
             contentContainerStyle={{paddingBottom:responsiveHeight(40)}}
             showsVerticalScrollIndicator={false}
             >
             
            <View style={{gap:responsiveHeight(1)}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

          <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={petjiomartstorestyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={petjiomartstorestyles.percentageText}>44%</Text>
                   <Text style={petjiomartstorestyles.discountamountText}>₹399</Text>
                   <Text style={petjiomartstorestyles.priceAmountText}>₹221</Text>
            </View>
           </View>
            <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={petjiomartstorestyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={petjiomartstorestyles.percentageText}>44%</Text>
                   <Text style={petjiomartstorestyles.discountamountText}>₹399</Text>
                   <Text style={petjiomartstorestyles.priceAmountText}>₹221</Text>
            </View>
           </View>



        </View> 

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

              <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={petjiomartstorestyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={petjiomartstorestyles.percentageText}>44%</Text>
                   <Text style={petjiomartstorestyles.discountamountText}>₹399</Text>
                   <Text style={petjiomartstorestyles.priceAmountText}>₹221</Text>
            </View>
           </View>
            <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            <View style={petjiomartstorestyles.downArrowAndFlexView}>
                   <Image source={Icons.BiDownArrowAlt}/>
                   <Text style={petjiomartstorestyles.percentageText}>44%</Text>
                   <Text style={petjiomartstorestyles.discountamountText}>₹399</Text>
                   <Text style={petjiomartstorestyles.priceAmountText}>₹221</Text>
            </View>
           </View>
           </View>
        </View>

             <View style={{top:responsiveHeight(2)}}>
                
                 <View style={petjiomartstorestyles.wishlistheader}>
                  <Text style={{fontSize:16,fontWeight:'500',lineHeight:20,letterSpacing:0,color:'#000000'}}>Recently Viewed</Text>

                </View>

                 <View style={{gap:responsiveHeight(1)}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

          <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
            
           </View>
            <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>
        </View> 

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:responsiveWidth(3)}}>

              <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.dogcollarImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
                    <Image source={Icons.AiFillStar} />
            </View>
           
           </View>
            <View style={petjiomartstorestyles.dogCollorView}>
            <Image source={images.premiumdogcollorImage} style={petjiomartstorestyles.dogcollarImageSize}/>
            <Image source={Icons.WishlisIcon} style={petjiomartstorestyles.loveIconPosition}/>

                <Text style={petjiomartstorestyles.armyprintedDogCollarText}>
                    AlCAZAR premium Quality{"\n"}3D Army Printed Dog Collar..
                </Text>

                <View style={petjiomartstorestyles.starPosition}>
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
           </View>
    );
};

export default PetjioMartStore;
