import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text ,FlatList,Dimensions,Image } from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import paravetaboutstyles from './paravetabout.styles';


const ParavetAbout: React.FC = () => {
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
                <Image
                    source={item.image}
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(30.8),
                        borderRadius: responsiveWidth(2),
                        marginLeft: responsiveWidth(4.8),
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
        return Carousel.map(
            (dot: { id: string; name: string; image: any }, index: number) => {
                if (activeIndex === index) {
                    return (
                        <View
                            key={index}
                            style={paravetaboutstyles.green_dot_Indicator}
                        />
                    );
                } else {
                    return (
                        <View
                            key={index}
                            style={paravetaboutstyles.white_dot_Indicator}
                        />
                    );
                }
            },
        );
    };
    return (
        <View
        style={paravetaboutstyles.container}>
        <View>
            <Text style={paravetaboutstyles.bioText}>Bio</Text>
            <Text style={paravetaboutstyles.paragraphText}>
                Hi Pet Parents !!!! I am a proficient grooming
                partner with pgroomy have an experience of 7+ years,
                can work efficiently with both dogs and cats. Also
                experienced with different breeds of pets in terms
                of styling and grooming.
            </Text>
        </View>

        <View style={paravetaboutstyles.languageJobText}>
            <View>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 12,
                        letterSpacing: 0,
                    }}>
                    {' '}
                    Languages{' '}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 18,
                        letterSpacing: 0,
                    }}>
                    {' '}
                    Hindi, English, Bengali
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 12,
                        letterSpacing: 0,
                    }}>
                    {' '}
                    Jobs completed{' '}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '500',
                        lineHeight: 18,
                        letterSpacing: 0,
                        color: '#000000',
                    }}>
                    200+ Jobs
                </Text>
            </View>
        </View>

        <View style={paravetaboutstyles.expertiseText}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <Text
                    style={{
                        color: '#343434',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>
                    Date
                </Text>
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: '500',
                        lineHeight: 12,
                        letterSpacing: 0,
                        color: '#6F6F6F',
                        marginRight: responsiveWidth(4),
                    }}>
                    October 25, 2024
                </Text>
            </View>
            <View style={paravetaboutstyles.setGap}>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        FRI
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        22
                    </Text>
                </View>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        SAT
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        23
                    </Text>
                </View>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        SUN
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        24
                    </Text>
                </View>
                <View style={paravetaboutstyles.selectedDate}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#FFFFFF',
                        }}>
                        MON
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#FFFFFF',
                        }}>
                        25
                    </Text>
                </View>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        TUE
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        26
                    </Text>
                </View>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        WED
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        27
                    </Text>
                </View>
                <View style={paravetaboutstyles.DigitBorder}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            lineHeight: 12,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        THU
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#959595',
                        }}>
                        28
                    </Text>
                </View>
            </View>
        </View>

        <View
            style={{
                marginLeft: responsiveWidth(4),
                top: responsiveHeight(1),
            }}>
            <Text
                style={{
                    color: '#343434',
                    fontSize: 16,
                    fontWeight: '600',
                }}>
                Available Time slots
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    gap: responsiveWidth(1),
                    top: responsiveHeight(0.5),
                }}>
                <View
                    style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(4.8),
                        borderWidth: 1,
                        borderColor: '#D3D3D3',
                        borderRadius: responsiveHeight(0.6),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 14,
                            fontWeight: '600',
                        }}>
                        06:00 - 06:30 am
                    </Text>
                    <Text
                        style={{ color: '#000000', fontSize: 10 }}>
                        Slots available
                    </Text>
                </View>
                <View
                    style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(4.8),
                        borderWidth: 1,
                        borderColor: '#D3D3D3',
                        borderRadius: responsiveHeight(0.6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#58B9D0',
                    }}>
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                        }}>
                        07:30 - 08:00am
                    </Text>
                    <Text
                        style={{ color: '#FFFFFF', fontSize: 10 }}>
                        Slots available
                    </Text>
                </View>
                <View
                    style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(4.8),
                        borderWidth: 1,
                        borderColor: '#D3D3D3',
                        borderRadius: responsiveHeight(0.6),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: '#6C6C6C',
                            fontSize: 14,
                            fontWeight: '600',
                        }}>
                        09:00 - 09:30 am
                    </Text>
                    <Text style={{ color: '#6C6C6C', fontSize: 9 }}>
                        No Slots available
                    </Text>
                </View>
            </View>
        </View>

        <View style={paravetaboutstyles.dotPosition}>
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
            <View style={paravetaboutstyles.bottomparentview}>
                {/* Dots Indicator */}
                <View style={paravetaboutstyles.dots_Indicator}>
                    {renderDotIndicators()}
                </View>
            </View>
        </View>
    </View>
    );
};

export default ParavetAbout;
