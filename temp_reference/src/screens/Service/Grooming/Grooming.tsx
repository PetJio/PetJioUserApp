import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';


// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    Locality:{section:"walking"};
    Main:undefined;
 
};

// Define the navigation prop type
type GroomingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CalendarSheet'>;

// Define props interface for the component
interface GroomingProps {
  navigation: GroomingScreenNavigationProp;
}

// Apply the props interface to the component
const Grooming: React.FC<GroomingProps> = ({ navigation }) => {
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
    { id: '1', name: 'Walking', image: images.FirstGrooming },
    { id: '4', name: 'Boarding', image: images.SecondGrooming },
  ];

  const renderItem = ({ item }: { item: { id: string; name: string; image: any } }) => {
    return (
      <View style={{ width: screenWidth }}>
        <Image
          source={item.image}
          style={{
            width: screenWidth,
            height: responsiveHeight(80),
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
    <View style={{ position: 'relative', alignItems: 'center' }}>
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
        style={{
          width: responsiveWidth(100),
          padding: responsiveWidth(6),
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: responsiveHeight(5),
        }}
      >
       <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
          <View style={{ flexDirection: 'row', gap: responsiveWidth(1)}}>
              <Image source={Icons.LeftArrow} style={{ top: responsiveHeight(0.80) }}/>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '500' }}>Grooming</Text>
          </View>
       </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Locality',{section:"walking"})}>
            <View style={{ flexDirection: 'row', gap: responsiveWidth(1), top: responsiveHeight(1) }}>
              <Text style={{ color: '#FFFFFF' }}>Kasba,Kolkata</Text>
              <Image source={Icons.DownArrow} />
            </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: responsiveWidth(70),
          height: responsiveHeight(5),
          borderRadius: responsiveHeight(0.80),
          backgroundColor: '#58B9D0',
          position: 'absolute',
          top: responsiveHeight(46.5),
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#FFFFFF' }}>
          Home Grooming Service
        </Text>
      </View>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: responsiveHeight(52.5) }}
      >
        <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '500' }}>
          Sanitized Equipment | Organic products
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: responsiveHeight(3),
          position: 'absolute',
          bottom: responsiveHeight(23.3),
          width: responsiveWidth(100),
        }}
      >
        {renderDotIndicators()}
      </View>
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(40),
          borderRadius: responsiveHeight(0.80),
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          top: responsiveHeight(58.5),
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', top: responsiveHeight(2) }}>
          <Text style={{ fontSize: 20, fontWeight: '500', color: '#3E8C9F' }}>How it works?</Text>
        </View>
        <View style={{ gap: responsiveHeight(2)}}>
         <TouchableOpacity onPress={()=>navigation.navigate('CalendarSheet')}>
         <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2.5),
              marginLeft: responsiveWidth(7),
              top: responsiveHeight(5),
            }}
          >
            <Image
              source={Icons.Calendar}
              style={{ width: responsiveWidth(4), height: responsiveHeight(2), top: responsiveHeight(1) }}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>
                Schedule and book-all online
              </Text>
              <Text style={{ color: '#6D6D6D' }}>All you have to do is pick a day and time</Text>
            </View>
          </View>
            
         </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2.5),
              marginLeft: responsiveWidth(7),
              top: responsiveHeight(5),
            }}
          >
            <Image
              source={Icons.Scissors}
              style={{ width: responsiveWidth(4), height: responsiveHeight(2), top: responsiveHeight(1) }}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>
                Pet Groomer brings the equipment
              </Text>
              <Text style={{ color: '#6D6D6D' }}>
                Professional pet groomer comes to your doorstep
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2),
              marginLeft: responsiveWidth(7),
              top: responsiveHeight(5),
            }}
          >
            <Image
              source={Icons.HomeHeart}
              style={{ width: responsiveWidth(4), height: responsiveHeight(2), top: responsiveHeight(1) }}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>
                No travel stress for your pets
              </Text>
              <Text style={{ color: '#6D6D6D' }}>Grooming service happens in your home</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2.5),
              marginLeft: responsiveWidth(7),
              top: responsiveHeight(5),
            }}
          >
            <Image
              source={Icons.Check}
              style={{ width: responsiveWidth(4), height: responsiveHeight(2), top: responsiveHeight(1) }}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>Groomer cleans up</Text>
              <Text style={{ color: '#6D6D6D' }}>You’re all set!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CalendarSheet')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: responsiveWidth(92),
                height: responsiveHeight(5),
                borderRadius: responsiveHeight(0.80),
                backgroundColor: '#58B9D0',
                marginLeft: responsiveWidth(4),
                top: responsiveHeight(5),
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#FFFFFF' }}>
                Book Grooming Professional
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Grooming;