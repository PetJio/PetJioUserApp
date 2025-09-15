
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import paravetstyles from './paravet.styles';





// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; 
    HomeService:undefined;
    TrainingLocalAddress:{ section: string };
    WalkingUser:{ section: string };
    Main:undefined;
    Service:undefined;
    TrainingUser:{ section: string };
    ParaVetLocatlity:{ section: string };
    ParaVetUser:{section:string}
   
 
};

// Define the navigation prop type
type ParaVetScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CalendarSheet'>;

// Define props interface for the component
interface ParaVetProps {
  navigation:ParaVetScreenNavigationProp;
}

// Apply the props interface to the component
const ParaVet: React.FC<ParaVetProps> = ({ navigation }) => {
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
    { id: '1', name: 'Walking', image: images.userparavetImage },
    { id: '2', name: 'Boarding', image: images.userparavetImage},
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

  const renderDotIndicators = () => {
    return Carousel.map((dot: { id: string; name: string; image: any }, index: number) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={paravetstyles.green_dot_Indicator}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={paravetstyles.white_dot_Indicator}
          />
        );
      }
    });
  };

  return (
    <View style={paravetstyles.container}>
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
      <View
        style={paravetstyles.headercontainer}
      >
       <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
          <View style={paravetstyles.flexcontainer}>
              <Image source={Icons.LeftArrow} style={paravetstyles.arrowheight}/>
              <Text style={paravetstyles.WalkingText}>Para Vet</Text>
          </View>
       </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ParaVetLocatlity', { section: 'paravet' })}>
            <View style={paravetstyles.locationIconText}>
              <Text style={paravetstyles.textcolor}>Kasba,Kolkata</Text>
              <Image source={Icons.DownArrow} />
            </View>
        </TouchableOpacity>
      </View>
      
      <View
  style={paravetstyles.bottomparentview}
>
  {/* Home Grooming Service Text */}
  
  <TouchableOpacity onPress={()=>navigation.navigate('ParaVetUser', { section: 'paravet' })}>
  <View
    style={paravetstyles.book_professinal_pet_walker}
  >
    <Text style={paravetstyles.book_professinal_pet_walker_text}>
     Book Professional Para Vet
    </Text>
  </View>
  </TouchableOpacity>

  {/* Sanitized Equipment Text */}
  <View style={paravetstyles.sanitized_equipment_position}>
    <Text style={paravetstyles.sanitized_equipment_text}>
     Compassion, Care, and Expertise for Every Animal.
    </Text>
  </View>

  {/* Dots Indicator */}
  <View
    style={paravetstyles.dots_Indicator}
  >
    {renderDotIndicators()}
  </View>
 </View>
</View>
  );
};

export default ParaVet;
