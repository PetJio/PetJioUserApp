import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import Icons from '../../../assets/icons';
import boardingaboutstyles from './boardingabout.styles';

interface BoardingAboutProps {
  serviceDetails?: any;
}

const BoardingAbout: React.FC<BoardingAboutProps> = ({ serviceDetails }) => {

  // Extract data from API or use defaults to match reference
  const description =
    serviceDetails?.description ||
    'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.';

  console.log(serviceDetails, 'bordingUserIdbordingUserId');
  

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

      {/* Why Choose Us Section */}
      <View style={{ marginBottom: 24 }}>
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
      </View>

      {/* Facilities Section */}
      <View style={{ marginBottom: 24 }}>
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
      </View>
    </View>
  );
};

export default BoardingAbout;
