import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import Icons from '../../../assets/icons';
import boardingaboutstyles from './boardingabout.styles';

interface BoardingAboutProps {
  serviceDetails?: any;
}

const BoardingAbout: React.FC<BoardingAboutProps> = ({ serviceDetails }) => {
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    isVideo: boolean;
    filename: string;
  } | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<any>(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Extract data from API or use defaults to match reference
  const description =
    serviceDetails?.description ||
    'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.';

  const serviceUploads = serviceDetails?.serviceUploads || [];

  console.log(serviceDetails, 'bordingUserIdbordingUserId');

  const handleMediaPress = (url: string) => {
    const isVideo = url.toLowerCase().includes('.mp4') ||
                    url.toLowerCase().includes('.mov') ||
                    url.toLowerCase().includes('video');

    const filename = url.split('/').pop() || 'media';

    setSelectedMedia({ url, isVideo, filename });
    setShowMediaViewer(true);
    if (isVideo) {
      setIsVideoLoading(true);
      setPaused(false);
    }
  };
  
  return (
    <View style={{ flex: 1, paddingVertical: 20, minHeight: 400 }}>
      {/* Bio Section */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1F2937',
          marginBottom: 8
        }}>
          Bio
        </Text>
        <Text style={{
          fontSize: 14,
          lineHeight: 20,
          color: '#6B7280'
        }}>
          {description}
        </Text>
      </View>

      {/* Service Gallery Section */}
      {serviceUploads.length > 0 && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: 12
          }}>
            Gallery
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -3,
          }}>
            {serviceUploads.map((url: string, index: number) => {
              const isVideo = url.toLowerCase().includes('.mp4') ||
                            url.toLowerCase().includes('.mov') ||
                            url.toLowerCase().includes('video');

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '31.33%',
                    aspectRatio: 1,
                    marginHorizontal: '1%',
                    marginBottom: 8,
                    borderRadius: 8,
                    overflow: 'hidden',
                    backgroundColor: '#F8F9FB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                  onPress={() => handleMediaPress(url)}
                >
                  {isVideo ? (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#1F2937',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialIcons name="play-circle-filled" size={32} color="#58B9D0" />
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#FFFFFF',
                          marginTop: 4,
                          fontWeight: '600',
                        }}
                      >
                        VIDEO
                      </Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: url }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Full-Screen Media Viewer Modal */}
      <Modal
        visible={showMediaViewer}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMediaViewer(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowMediaViewer(false)}
          >
            <MaterialIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {selectedMedia && (
            <>
              {selectedMedia.isVideo ? (
                <View style={{ width: screenWidth, height: screenHeight * 0.4, justifyContent: 'center', alignItems: 'center' }}>
                  {/* Video Player */}
                  <Video
                    ref={videoRef}
                    source={{ uri: selectedMedia.url }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    controls={true}
                    resizeMode="contain"
                    paused={paused}
                    onLoadStart={() => setIsVideoLoading(true)}
                    onLoad={() => setIsVideoLoading(false)}
                    onError={(error) => {
                      console.error('Video error:', error);
                      setIsVideoLoading(false);
                    }}
                  />

                  {/* Loading Indicator */}
                  {isVideoLoading && (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                      <ActivityIndicator size="large" color="#58B9D0" />
                      <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Loading video...</Text>
                    </View>
                  )}

                  {/* Play/Pause Button Overlay */}
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: [{ translateX: -30 }, { translateY: -30 }],
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 30,
                    }}
                    onPress={() => setPaused(!paused)}
                  >
                    <MaterialIcons
                      name={paused ? "play-arrow" : "pause"}
                      size={40}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  {/* Filename */}
                  <View style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                  }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        textAlign: 'center',
                      }}
                      numberOfLines={1}
                    >
                      {selectedMedia.filename}
                    </Text>
                  </View>
                </View>
              ) : (
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <Image
                    source={{ uri: selectedMedia.url }}
                    style={{
                      width: screenWidth,
                      height: screenHeight * 0.8,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      marginTop: 16,
                      opacity: 0.7,
                      position: 'absolute',
                      bottom: 20,
                    }}
                  >
                    {selectedMedia.filename}
                  </Text>
                </ScrollView>
              )}
            </>
          )}
        </View>
      </Modal>

      {/* Why Choose Us Section */}
      {/* <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1F2937',
          marginBottom: 8
        }}>
          Why choose us
        </Text>
        <Text style={{
          fontSize: 14,
          lineHeight: 20,
          color: '#6B7280'
        }}>
          {serviceDetails?.whyChooseUs || 'Experienced staff, clean facility, and daily updates.'}
        </Text>
      </View> */}

      {/* Facilities Section */}
      {/* <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1F2937',
          marginBottom: 16
        }}>
          Facilities
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <View style={{
            alignItems: 'center',
            gap: 8
          }}>
            <Image
              source={Icons.meals}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{
              fontSize: 12,
              color: '#58B9D0',
              fontWeight: '500'
            }}>
              Meals
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            gap: 8
          }}>
            <Image
              source={Icons.Care}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{
              fontSize: 12,
              color: '#58B9D0',
              fontWeight: '500'
            }}>
              Care
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            gap: 8
          }}>
            <Image
              source={Icons.Outside}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{
              fontSize: 12,
              color: '#58B9D0',
              fontWeight: '500'
            }}>
              Outside
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default BoardingAbout;
