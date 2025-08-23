
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import Trainingstyles from './Training.styles';




// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    TrainingLocalAddress:{ section: string };
    WalkingUser:{ section: string };
    Main:undefined;
    Service:undefined;
    TrainingUser:{ section: string }
   
 
};

// Define the navigation prop type
type GroomingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CalendarSheet'>;

// Define props interface for the component
interface GroomingProps {
  navigation: GroomingScreenNavigationProp;
}

// Apply the props interface to the component
const Training: React.FC<GroomingProps> = ({ navigation }) => {
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
    { id: '1', name: 'Walking', image: images.trainingDog },
    { id: '2', name: 'Boarding', image: images.trainingDog},
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
            style={Trainingstyles.green_dot_Indicator}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={Trainingstyles.white_dot_Indicator}
          />
        );
      }
    });
  };

  return (
    <View style={Trainingstyles.container}>
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
        style={Trainingstyles.headercontainer}
      >
       <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
          <View style={Trainingstyles.flexcontainer}>
              <Image source={Icons.LeftArrow} style={Trainingstyles.arrowheight}/>
              <Text style={Trainingstyles.WalkingText}>Training</Text>
          </View>
       </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TrainingLocalAddress', { section: 'training' })}>
            <View style={Trainingstyles.locationIconText}>
              <Text style={Trainingstyles.textcolor}>Kasba,Kolkata</Text>
              <Image source={Icons.DownArrow} />
            </View>
        </TouchableOpacity>
      </View>
      
      <View
  style={Trainingstyles.bottomparentview}
>
  {/* Home Grooming Service Text */}
  
  <TouchableOpacity onPress={()=>navigation.navigate('TrainingUser', { section: 'trainer' })}>
  <View
    style={Trainingstyles.book_professinal_pet_walker}
  >
    <Text style={Trainingstyles.book_professinal_pet_walker_text}>
      Book Professional Pet Trainer
    </Text>
  </View>
  </TouchableOpacity>

  {/* Sanitized Equipment Text */}
  <View style={Trainingstyles.sanitized_equipment_position}>
    <Text style={Trainingstyles.sanitized_equipment_text}>
      Smart Training, Happy Pets!
    </Text>
  </View>

  {/* Dots Indicator */}
  <View
    style={Trainingstyles.dots_Indicator}
  >
    {renderDotIndicators()}
  </View>
 </View>
</View>
  );
};

export default Training;
