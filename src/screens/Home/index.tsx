import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Icons from '../../../assets/icons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import { storageService } from '../../utils/storage';

const Home: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>('User');

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

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const firstName = await storageService.getUserFirstName();
        setUserName(firstName);
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
  }, []);

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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(90),
            height: responsiveHeight(18.5),
            borderRadius: responsiveWidth(1),
            backgroundColor: '#58B9D0',
            marginLeft: responsiveWidth(4.8),
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: responsiveHeight(2.2),
                paddingHorizontal: responsiveWidth(4),
                gap: responsiveWidth(2),
              }}
            >
              <Image source={Icons.earthIcon} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  letterSpacing: 0,
                  color: '#FFFFFF',
                  lineHeight: 20,
                }}
              >
                Law updates
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                  }}
                >
                  +
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                  }}
                >
                  35
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                    left: responsiveWidth(2),
                  }}
                >
                  places
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  lineHeight: 16,
                  letterSpacing: 0,
                  color: '#FFFFFF',
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                New vaccination departments for {'\n'} your pet{' '}
              </Text>
            </View>
          </View>
          <View>
            <Image source={Icons.IoMdPaw} />
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
          return <View key={index} style={styles.green_dot_Indicator} />;
        } else {
          return <View key={index} style={styles.white_dot_Indicator} />;
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stickyHeaderTitle}>Hello, {userName}</Text>
          <Text style={styles.stickyHeaderSubtitle}>Welcome back to PetJio</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="event" size={24} color="#58B9D0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.relative}>
              <MaterialIcons name="notifications" size={24} color="#58B9D0" />
              <View style={styles.positionofAlertIcon}>
                <View style={styles.alertDot} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: responsiveHeight(2) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subcontainer}>

        <View style={styles.doctoranddogimagecontainer}>
          <View>
            <View style={styles.doctorcontainer}>
              <Image source={images.BellaDog} style={styles.ImageSize} />
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
            <Image source={Icons.BiPlus} />
          </View>
        </View>
      </View>

      {/* Coming Soon - Full Appointments Section */}
      <View
        style={{
          top: responsiveHeight(5.5),
          paddingHorizontal: responsiveWidth(5),
          marginBottom: responsiveHeight(3),
        }}
      >
        <View
          style={{
            width: '100%',
            paddingVertical: responsiveHeight(6),
            paddingHorizontal: responsiveWidth(6),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            minHeight: responsiveHeight(25),
          }}
        >
          {/* Large Coming Soon Icon */}
          <MaterialIcons
            name="build-circle"
            size={80}
            color="#58B9D0"
            style={{ marginBottom: responsiveHeight(2) }}
          />

          {/* Main Coming Soon Text */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: '800',
              color: '#2C5282',
              marginBottom: responsiveHeight(1.5),
              textAlign: 'center',
              letterSpacing: 0.5,
            }}
          >
            Coming Soon!
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#58B9D0',
              marginBottom: responsiveHeight(2),
              textAlign: 'center',
            }}
          >
            Exciting Features on the Way
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#718096',
              textAlign: 'center',
              lineHeight: 24,
              paddingHorizontal: responsiveWidth(2),
              marginBottom: responsiveHeight(3),
            }}
          >
            We're working hard to bring you lots of amazing features! This isn't just about appointments - we're building a complete pet care ecosystem for you and your furry friends.
          </Text>

          {/* Feature Preview Pills */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginBottom: responsiveHeight(2),
            }}
          >
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Easy Booking
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Reminders
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Track History
              </Text>
            </View>
          </View>

          {/* Animated Dots */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#58B9D0',
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#A0D8EF',
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#58B9D0',
              }}
            />
          </View>
        </View>
      </View>

      {/* <View>
        <View>
                <View style={styles.fourthcontainer}>
                        <View style={styles.flex}>
                            <Text style={styles.appointmentText}>News</Text>
                            <Text style={styles.showallText}>Show All</Text>
                        </View>
                </View>
           
         </View>

        <View style={{ top: responsiveHeight(9) }}>
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

          <View style={styles.bottomparentview}>
            <View style={styles.dots_Indicator}>
              <TouchableOpacity>
                <Image
                  source={Icons.IoIosArrowBack}
                  style={{ bottom: responsiveWidth(0.9) }}
                />
              </TouchableOpacity>
              {renderDotIndicators()}
              <Image
                source={Icons.IoIosArrowForwardWhite}
                style={{ bottom: responsiveWidth(0.9) }}
              />
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
            contentContainerStyle={styles.paddingBottom}
          >
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
                  <View
                    style={{ flexDirection: 'row', gap: responsiveWidth(2) }}
                  >
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: responsiveHeight(0.5),
                        }}
                      >
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
                        All of us have things that scare us, but for our
                        four-legged friends, loud noises, new situations and
                        changes in the{' '}
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
                  <View
                    style={{ flexDirection: 'row', gap: responsiveWidth(2) }}
                  >
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: responsiveHeight(0.5),
                        }}
                      >
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
                        All of us have things that scare us, but for our
                        four-legged friends, loud noises, new situations and
                        changes in the{' '}
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
                  <View
                    style={{ flexDirection: 'row', gap: responsiveWidth(2) }}
                  >
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: responsiveHeight(0.5),
                        }}
                      >
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
                        All of us have things that scare us, but for our
                        four-legged friends, loud noises, new situations and
                        changes in the{' '}
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
                  <View
                    style={{ flexDirection: 'row', gap: responsiveWidth(2) }}
                  >
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: responsiveHeight(0.5),
                        }}
                      >
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
                        All of us have things that scare us, but for our
                        four-legged friends, loud noises, new situations and
                        changes in the{' '}
                        <Text style={{ color: '#4494A8' }}>Read More</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;
