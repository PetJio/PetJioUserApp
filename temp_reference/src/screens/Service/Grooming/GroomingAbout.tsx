import {useState,useEffect,useRef,useCallback,} from 'react';
import { View, Text,Image, Dimensions,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import groomingaboutstyles from './groomingabout.styles';

import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';


// Define your navigation stack's param list
// type RootStackParamList = {
//      UserService: undefined;
//      UserReview:undefined;
//      UserAbout:undefined;
//      HomeService:undefined;
// };

// Define the navigation prop type
// type UserServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeService'>;

// Define props interface for the component
// interface UserServiceProps {
//     navigation: UserServiceScreenNavigationProp; // Navigation is now required;
// }

const GroomingAbout: React.FC = () => {

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
      const nextIndex = activeIndex === Carousel.length - 1 ? 0 : activeIndex + 1;
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
    { id: '1', name: 'Walking', image: images.DogServiceImage },
    { id: '2', name: 'Boarding', image: images.DogServiceImage },
    {id:'3', name: 'Boarding', image: images.DogServiceImage },
  ];

  const renderItem = ({ item }: { item: { id: string; name: string; image: any } }) => {
    return (
      <View style={{ width: screenWidth }}>
        <Image
          source={item.image}
          style={{
            width: screenWidth,
            height: responsiveHeight(40),
            resizeMode: 'cover',
          }}
        />
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
    return Carousel.map((dot: { id: string; name: string; image: any }, index: number) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#58B9D0',
              height: 8,
              width: 26,
              borderRadius: 8,
              marginHorizontal: 6,
            }}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#FFFFFF',
              height: 8,
              width: 8,
              borderRadius: 8,
              marginHorizontal: 6,
            }}
          />
        );
      }
    });
  };
 
    return (
           
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:90}}>

             <View style={groomingaboutstyles.container}>
                 <View style={groomingaboutstyles.containerthirdsubchild}>
                </View>
                <View>
                       <Text style={groomingaboutstyles.bioText}>Bio</Text>
                       <Text style={groomingaboutstyles.paragraphText}>
                          Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.
                        </Text>
                </View>

                <View style={groomingaboutstyles.languageJobText}>
                    <View>
                           <Text style={{color:'#343434',fontSize:16,fontWeight:'600'}}> Languages </Text>
                           <Text> Hindi, English, Bengali</Text>
                    </View>
                    <View>
                           <Text style={{color:'#343434',fontSize:16,fontWeight:'600'}}> Jobs completed </Text>
                           <Text>200+ Jobs</Text>
                    </View>
                </View>

               
                <View style={groomingaboutstyles.expertiseText}>
                    <Text style={{color:'#343434',fontSize:16,fontWeight:'600'}}>Expertise</Text>
                    <View style={groomingaboutstyles.setGap}>
                    <View style={groomingaboutstyles.DogBorder}>
                           <Image source={Icons.LuDog}/>
                           <Text style={groomingaboutstyles.dogText}>Dog</Text>
                    </View>
                    <View style={groomingaboutstyles.CatBorder}>
                           <Image source={Icons.LuDog}/>
                           <Text style={groomingaboutstyles.catText}>Cat</Text>
                    </View>
                    </View>
              </View>
   
              <View style={{ marginLeft:responsiveWidth(4),}}>
                    <Text style={{color:'#343434',fontSize:16,fontWeight:'600'}}>Available Time slots</Text>
                    <View style={{flexDirection:'row',gap:responsiveWidth(1),top:responsiveHeight(0.50)}}>
                    <View style={{width:responsiveWidth(21), height:responsiveHeight(4.8), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:14,fontWeight:'600'}}>01:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:10}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(21), height:responsiveHeight(4.8), borderWidth:1, borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',backgroundColor:'#58B9D0'}}>
                           <Text style={{color:'#FFFFFF',fontSize:14,fontWeight:'600'}}>02:00 PM</Text>
                           <Text style={{color:'#FFFFFF',fontSize:10}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(21), height:responsiveHeight(4.8), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#6C6C6C',fontSize:14,fontWeight:'600'}}>03:00 PM</Text>
                           <Text style={{color:'#6C6C6C',fontSize:9}}>No Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(21), height:responsiveHeight(4.8), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:14,fontWeight:'600'}}>03:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:10}}>Slots available</Text>
                    </View>
                    </View>
              </View>

              <View 
                style={{ 
                width: responsiveWidth(90), 
                height: responsiveHeight(30), 
                borderRadius: responsiveWidth(2.5),
                overflow: 'hidden',
                justifyContent: 'center', 
                alignItems: 'center',
                top:responsiveHeight(2),
                marginLeft:responsiveWidth(4)
                }}
              >
               
                 <FlatList
                        data={Carousel}
                        ref={flatListRef}
                        getItemLayout={getItemLayout}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        bounces={false}
                        onScrollToIndexFailed={onScrollFailed}
                      />
      </View>

      <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                left:0,
                right:0,
                // top:responsiveHeight(16),
                // marginTop: responsiveHeight(3),
                position: 'absolute',
                bottom: responsiveHeight(35),
                width: responsiveWidth(100),
              }}
            >
              {renderDotIndicators()}
            </View>


</View>
          


          </ScrollView>

       
    );
};

export default GroomingAbout;