import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  };

  const handleVideoPlay = (url: string) => {
    Linking.openURL(url).catch(err => 
      console.error('Error opening video:', err)
    );
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
            marginHorizontal: -4,
          }}>
            {serviceUploads.map((url: string, index: number) => {
              const isVideo = url.toLowerCase().includes('.mp4') || 
                            url.toLowerCase().includes('.mov') ||
                            url.toLowerCase().includes('video');
              
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '48%',
                    aspectRatio: 1,
                    marginHorizontal: '1%',
                    marginBottom: 8,
                    borderRadius: 12,
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
                      <MaterialIcons name="play-circle-filled" size={56} color="#58B9D0" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#FFFFFF',
                          marginTop: 8,
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
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      width: screenWidth * 0.8,
                      height: screenWidth * 0.8,
                      backgroundColor: '#1F2937',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                    }}
                  >
                    <MaterialIcons name="play-circle-filled" size={80} color="#58B9D0" />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 24,
                      backgroundColor: '#58B9D0',
                      paddingVertical: 12,
                      paddingHorizontal: 32,
                      borderRadius: 8,
                    }}
                    onPress={() => handleVideoPlay(selectedMedia.url)}
                  >
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      Open Video
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      marginTop: 16,
                      opacity: 0.7,
                    }}
                  >
                    {selectedMedia.filename}
                  </Text>
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
