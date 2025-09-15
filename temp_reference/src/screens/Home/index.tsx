import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text ,FlatList,Dimensions,Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import Icons from '../../../assets/icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../../../assets/images';


const Home: React.FC = () => {
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
        { id: '4', name: 'thirdwalker', image: images.thirdwalker },
    ];

    const renderItem = ({
        item,
    }: {
        item: { id: string; name: string; image: any };
    }) => {
        return (
            <View style={{ width: screenWidth }}>
                {/* <Image
                    source={item.image}
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(30.8),
                        borderRadius: responsiveWidth(2),
                        marginLeft: responsiveWidth(4.8),
                    }}
                /> */}

                <View  style={{flexDirection:'row', justifyContent:'space-between', width:responsiveWidth(90),height:responsiveHeight(18.5),borderRadius:responsiveWidth(1),backgroundColor:'#58B9D0',marginLeft: responsiveWidth(4.8)}}>
                    <View>
                    <View style={{flexDirection:'row',paddingVertical:responsiveHeight(2.2),paddingHorizontal:responsiveWidth(4),gap:responsiveWidth(2)}}>
                          <Image source={Icons.earthIcon}/>
                          <Text style={{fontSize:12,fontWeight:'500',letterSpacing:0,color:'#FFFFFF',lineHeight:20}}>Law updates</Text>
                    </View>

                    <View>
                    <View style={{flexDirection:'row',paddingHorizontal:responsiveWidth(4)}}>
                            <Text style={{fontSize:20,fontWeight:'500',lineHeight:23,letterSpacing:0,color:'#FFFFFF'}}>+</Text>
                            <Text style={{fontSize:20,fontWeight:'500',lineHeight:23,letterSpacing:0,color:'#FFFFFF'}}>35</Text>
                            <Text style={{fontSize:20,fontWeight:'500',lineHeight:23,letterSpacing:0,color:'#FFFFFF',left:responsiveWidth(2)}}>places</Text>
                     </View>
                       <Text style={{fontSize:13,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#FFFFFF',paddingHorizontal:responsiveWidth(4)}}>New vaccination departments for {"\n"} your pet </Text>
                    </View>
                    </View>
                    <View>
                          <Image source={Icons.IoMdPaw}/>
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
                            style={styles.green_dot_Indicator}
                        />
                    );
                } else {
                    return (
                        <View
                            key={index}
                            style={styles.white_dot_Indicator}
                        />
                    );
                }
            },
        );
    };
    return (
        <View style={styles.container}>
             <View style={styles.subcontainer}>
             <View style={styles.subcontainertextwithIcon}>
                <Text style={styles.text}>Hello, Mira</Text>
                <View style={styles.IconGap}>
                  <Image source={Icons.BlackBiCalendar}/>
                  <View style={styles.relative}>
                       <Image source={Icons.BiBell}/>
                       <View style={styles.positionofAlertIcon}>
                            <Image source={Icons.alertEllipse}/>
                       </View>
                  </View>
               </View>
            </View>

             <View style={styles.doctoranddogimagecontainer}>
              <View>
              <View style={styles.doctorcontainer}>
                   <Image source={images.BellaDog} style={styles.ImageSize}/>   
               </View>
               <Text style={styles.dogname}>Bella</Text> 
              </View>
            <View>
              
              <View>
              <View style={styles.dogcontainer}>
                        <Image source={images.DaisyDog} style={styles.dogimageSize} />    
               </View>
                 <Text style={styles.dogname}>Daisy</Text> 
               </View>


            </View>
            <View style={styles.pluscontainer}>
                  <Image source={Icons.BiPlus}/>
            </View>  
            </View>
         </View>
          
         <View>
                <View style={styles.secondcontainer}>
                        <View style={styles.flex}>
                            <Text style={styles.appointmentText}>Appointments</Text>
                            <Text style={styles.showallText}>Show All</Text>
                        </View>
                </View>
           
         </View>

         <View style={{top:responsiveHeight(5.5),paddingHorizontal:responsiveWidth(5)}}>
                <View style={{width:responsiveWidth(90),borderRadius:responsiveWidth(2),backgroundColor:'#F0FCFF',flexDirection:'row'}}>
                      <View style={{width:responsiveWidth(0.90),backgroundColor:'#58B9D0',borderTopLeftRadius:responsiveWidth(8),borderBottomLeftRadius:responsiveWidth(8)}}></View>
                     <View>
                     <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical:responsiveHeight(0.90), paddingHorizontal:responsiveWidth(3.2),width:responsiveWidth(90),}}>
                             <View>
                                <Text  style={{fontSize:14,fontWeight:'500',lineHeight:17,color:'#3C3C3C'}} >Dr. Samar Halder</Text>
                                <Text  style={{fontSize:11,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#858585'}} >Consultation</Text>
                             </View>
                             <View style={{ flexDirection: 'row', gap: -10 }}>
                                <Image source={images.BellaDog}  style={{ width: 35, height: 35, borderRadius: 17.5, borderWidth: 2,borderColor: '#fff' }} />
                                <View  style={{  width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#C8F8B1', overflow: 'hidden', marginLeft: -10 }}>
                                    <Image source={images.DaisyDog}  style={{ width: 70,  height: 70,  position: 'absolute', top: -20, left: -15, resizeMode: 'cover', }}
                                    />
                                </View>
                            </View>
                      </View>
                          <View style={{width:responsiveWidth(83),borderBottomWidth:responsiveWidth(0.20),borderColor:'#E8E8E8',left:responsiveWidth(2.5)}}/>
                          <View style={{paddingVertical:responsiveHeight(1),paddingHorizontal:responsiveWidth(3),gap:responsiveWidth(2.5)}}>

                          <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                   <Image source={Icons.BiMap}/>
                                   <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,color:'#858585'}}>32/E-1 M . L . B, Road, Bally, Howrah</Text>
                          </View>
                          <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                   <Image source={Icons.BiCalendar}/>
                                   <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,color:'#858585'}}>Wednesday, October 25, 2024</Text>
                          </View>

                          <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                   <Image source={Icons.BiTimeFive}/>
                                   <Text style={{fontSize:10,fontWeight:'400',lineHeight:14,color:'#858585'}}>2:00 PM</Text>
                          </View>
                              
                              

                          </View>
                     </View>
                      
                </View>
         </View>

         <View>

         <View>
                <View style={styles.fourthcontainer}>
                        <View style={styles.flex}>
                            <Text style={styles.appointmentText}>News</Text>
                            <Text style={styles.showallText}>Show All</Text>
                        </View>
                </View>
           
         </View>

         <View style={{top:responsiveHeight(9)}}>
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
   
               {/* Dots Indicator */}

            <View style={styles.bottomparentview}>
                <View style={styles.dots_Indicator}>
                    <TouchableOpacity>
                         <Image source={Icons.IoIosArrowBack} style={{bottom:responsiveWidth(0.90)}}/>
                    </TouchableOpacity>
                       {renderDotIndicators()}
                    <Image source={Icons.IoIosArrowForwardWhite} style={{bottom:responsiveWidth(0.90)}}/>
                </View>
            </View>
        </View>
                  
         </View>

         <View>
                <View style={styles.fivethcontainer}>
                                <View style={styles.flex}>
                                    <Text style={styles.appointmentText}>Blogs</Text>
                                    <Text style={styles.showallText}>Show All</Text>
                                </View>

                               <ScrollView 
                                
                               showsVerticalScrollIndicator={false}

                               contentContainerStyle={styles.paddingBottom}>

                             <View style={styles.GapView}>
                              <View style={{ paddingHorizontal: responsiveWidth(3.5) }}>
                                <View
                                    style={{
                                    width: responsiveWidth(90),
                                    borderRadius: responsiveWidth(2),
                                    borderWidth: responsiveWidth(0.3),
                                    borderColor: '#EBEBEB',
                                    padding: responsiveWidth(2),
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                                    <Image
                                        source={images.silentDog}
                                        style={{
                                        width: responsiveWidth(20),
                                        height: responsiveHeight(9),
                                        borderRadius: responsiveWidth(1),
                                        }}
                                        resizeMode="cover"
                                    />

                                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                        <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '600',
                                            lineHeight: 14,
                                            letterSpacing: 0,
                                            color: '#4B4B4B',
                                        }}
                                        numberOfLines={1}
                                        >
                                        How to Calm Dog Anxiety
                                        </Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(0.5) }}>
                                        <Image
                                            source={Icons.ClockCircle}
                                            style={{
                                            width: responsiveWidth(2.5),
                                            height: responsiveHeight(1.5),
                                            marginRight: responsiveWidth(1),
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text
                                            style={{
                                            fontSize: 9,
                                            fontWeight: '500',
                                            lineHeight: 10,
                                            letterSpacing: 0,
                                            color: '#7B7B7B',
                                            }}
                                        >
                                            10th October 2024
                                        </Text>
                                        </View>

                                        <Text
                                        style={{
                                            fontSize: 10,
                                            lineHeight: 13,
                                            fontWeight: '400',
                                            letterSpacing: 0,
                                            color: '#848484',
                                        }}
                                        numberOfLines={3}
                                        >
                                        All of us have things that scare us, but for our four-legged friends, loud noises, new situations and changes in the{' '}
                                        <Text style={{ color: '#4494A8' }}>Read More</Text>
                                        </Text>
                                    </View>
                                    </View>
                                </View>
                             </View>

                        <View style={{ paddingHorizontal: responsiveWidth(3.5) }}>
                            <View
                                style={{
                                width: responsiveWidth(90),
                                borderRadius: responsiveWidth(2),
                                borderWidth: responsiveWidth(0.3),
                                borderColor: '#EBEBEB',
                                padding: responsiveWidth(2),
                                }}
                            >
                                <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                                <Image
                                    source={images.catwashImage}
                                    style={{
                                    width: responsiveWidth(20),
                                    height: responsiveHeight(9),
                                    borderRadius: responsiveWidth(1),
                                    }}
                                    resizeMode="cover"
                                />

                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        lineHeight: 14,
                                        letterSpacing: 0,
                                        color: '#4B4B4B',
                                    }}
                                    numberOfLines={1}
                                    >
                                    Guide to Grooming your Cat
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(0.5) }}>
                                    <Image
                                        source={Icons.ClockCircle}
                                        style={{
                                        width: responsiveWidth(2.5),
                                        height: responsiveHeight(1.5),
                                        marginRight: responsiveWidth(1),
                                        }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        style={{
                                        fontSize: 9,
                                        fontWeight: '500',
                                        lineHeight: 10,
                                        letterSpacing: 0,
                                        color: '#7B7B7B',
                                        }}
                                    >
                                        10th October 2024
                                    </Text>
                                    </View>

                                    <Text
                                    style={{
                                        fontSize: 10,
                                        lineHeight: 13,
                                        fontWeight: '400',
                                        letterSpacing: 0,
                                        color: '#848484',
                                    }}
                                    numberOfLines={3}
                                    >
                                    All of us have things that scare us, but for our four-legged friends, loud noises, new situations and changes in the{' '}
                                    <Text style={{ color: '#4494A8' }}>Read More</Text>
                                    </Text>
                                </View>
                                </View>
                            </View>
                        </View>


                     <View style={{ paddingHorizontal: responsiveWidth(3.5) }}>
                            <View
                                style={{
                                width: responsiveWidth(90),
                                borderRadius: responsiveWidth(2),
                                borderWidth: responsiveWidth(0.3),
                                borderColor: '#EBEBEB',
                                padding: responsiveWidth(2),
                                }}
                            >
                                <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                                <Image
                                    source={images.catwashImage}
                                    style={{
                                    width: responsiveWidth(20),
                                    height: responsiveHeight(9),
                                    borderRadius: responsiveWidth(1),
                                    }}
                                    resizeMode="cover"
                                />

                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        lineHeight: 14,
                                        letterSpacing: 0,
                                        color: '#4B4B4B',
                                    }}
                                    numberOfLines={1}
                                    >
                                    Guide to Grooming your Cat
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(0.5) }}>
                                    <Image
                                        source={Icons.ClockCircle}
                                        style={{
                                        width: responsiveWidth(2.5),
                                        height: responsiveHeight(1.5),
                                        marginRight: responsiveWidth(1),
                                        }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        style={{
                                        fontSize: 9,
                                        fontWeight: '500',
                                        lineHeight: 10,
                                        letterSpacing: 0,
                                        color: '#7B7B7B',
                                        }}
                                    >
                                        10th October 2024
                                    </Text>
                                    </View>

                                    <Text
                                    style={{
                                        fontSize: 10,
                                        lineHeight: 13,
                                        fontWeight: '400',
                                        letterSpacing: 0,
                                        color: '#848484',
                                    }}
                                    numberOfLines={3}
                                    >
                                    All of us have things that scare us, but for our four-legged friends, loud noises, new situations and changes in the{' '}
                                    <Text style={{ color: '#4494A8' }}>Read More</Text>
                                    </Text>
                                </View>
                                </View>
                            </View>
                        </View>


                          <View style={{ paddingHorizontal: responsiveWidth(3.5) }}>
                            <View
                                style={{
                                width: responsiveWidth(90),
                                borderRadius: responsiveWidth(2),
                                borderWidth: responsiveWidth(0.3),
                                borderColor: '#EBEBEB',
                                padding: responsiveWidth(2),
                                }}
                            >
                                <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                                <Image
                                    source={images.catwashImage}
                                    style={{
                                    width: responsiveWidth(20),
                                    height: responsiveHeight(9),
                                    borderRadius: responsiveWidth(1),
                                    }}
                                    resizeMode="cover"
                                />

                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        lineHeight: 14,
                                        letterSpacing: 0,
                                        color: '#4B4B4B',
                                    }}
                                    numberOfLines={1}
                                    >
                                    Guide to Grooming your Cat
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(0.5) }}>
                                    <Image
                                        source={Icons.ClockCircle}
                                        style={{
                                        width: responsiveWidth(2.5),
                                        height: responsiveHeight(1.5),
                                        marginRight: responsiveWidth(1),
                                        }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        style={{
                                        fontSize: 9,
                                        fontWeight: '500',
                                        lineHeight: 10,
                                        letterSpacing: 0,
                                        color: '#7B7B7B',
                                        }}
                                    >
                                        10th October 2024
                                    </Text>
                                    </View>

                                    <Text
                                    style={{
                                        fontSize: 10,
                                        lineHeight: 13,
                                        fontWeight: '400',
                                        letterSpacing: 0,
                                        color: '#848484',
                                    }}
                                    numberOfLines={3}
                                    >
                                    All of us have things that scare us, but for our four-legged friends, loud noises, new situations and changes in the{' '}
                                    <Text style={{ color: '#4494A8' }}>Read More</Text>
                                    </Text>
                                </View>
                                </View>
                            </View>
                           </View>

                        </View>
                                  
                               </ScrollView>


                 </View>
                 
        </View>
           
        </View>
        
    );
};

export default Home;
