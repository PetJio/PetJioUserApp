
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import ngostyles from './ngo.styles';





// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    TrainingLocalAddress:{ section: string };
    WalkingUser:{ section: string };
    Main:undefined;
    Service:undefined;
    TrainingUser:{ section: string }
    NGOUser:undefined;
   
 
};

// Define the navigation prop type
type GroomingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CalendarSheet'>;

// Define props interface for the component
interface GroomingProps {
  navigation: GroomingScreenNavigationProp;
}

// Apply the props interface to the component
const NGO: React.FC<GroomingProps> = ({ navigation }) => {
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


  const Carousel = [
    { id: '1', name: 'Walking', image: images.ngoImage },
    { id: '2', name: 'Boarding', image: images.ngoImage},
  ];

  const renderItem = ({ item }: { item: { id: string; name: string; image: any } }) => {
    return (
      <View style={{ width: screenWidth }}>
        <Image
          source={item.image}
          style={{
            width: screenWidth,
            height: responsiveHeight(100),
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

 

  return (
    <View style={ngostyles.container}>
      <FlatList
        data={Carousel}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        // onScrollToIndexFailed={onScrollFailed}
      />
      <View
        style={ngostyles.headercontainer}
      >
       <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
          <View style={ngostyles.flexcontainer}>
              <Image source={Icons.LeftArrow} style={ngostyles.arrowheight}/>
              <Text style={ngostyles.WalkingText}>NGOs</Text>
          </View>
       </TouchableOpacity>
      </View>
      
      <View
  style={ngostyles.bottomparentview}
>
  {/* Home Grooming Service Text */}
  
  <TouchableOpacity onPress={()=>navigation.navigate('NGOUser')}>
  <View
    style={ngostyles.book_professinal_pet_walker}
  >
    <Text style={ngostyles.book_professinal_pet_walker_text}>
    Explore  to a NGO Services
    </Text>
  </View>
  </TouchableOpacity>

  {/* Dots Indicator */}
  <View
    style={ngostyles.dots_Indicator}
  >
    {/* {renderDotIndicators()} */}
  </View>
 </View>
</View>
  );
};

export default NGO;

