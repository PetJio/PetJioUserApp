import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardingreviewstyles from './boardingreview.styles';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';

interface BoardingReviewProps {
  rating?: number;
  reviews?: number;
}

const BoardingReview: React.FC<BoardingReviewProps> = ({
  rating = 4.8,
  reviews = 150,
}) => {
  const [show, setShow] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<any[]>([
    {
      id: 1,
      ratings: '4.5',
      comment: 'Excellent service, my dog loved it!',
      createdAt: '2025-09-06T01:22:49.528Z',
      updatedAt: null,
    },
    {
      id: 2,
      ratings: '4.5',
      comment: 'Excellent service, my dog loved it!',
      createdAt: '2025-09-06T01:22:49.528Z',
      updatedAt: null,
    },
    {
      id: 3,
      ratings: '4.5',
      comment: 'Excellent service, my dog loved it!',
      createdAt: '2025-09-06T01:22:49.528Z',
      updatedAt: null,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      // setLoading(true);
      // setError('');

      // console.log('Fetching boarding details for providerId:', providerId);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BOARDING_REVIEWS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Review API response: =====>', data);

      if (
        data &&
        data.body &&
        Array.isArray(data.body) &&
        data.body.length > 0
      ) {
        // setReviewData(data.body); // Get the first boarding from the list
      } else {
        // If no API data, use default values to match reference UI
        // setServiceDetails({
        //     user: { firstName: 'Kiara', lastName: 'Das' },
        //     reviewAvg: 4.8,
        //     profileImg: null,
        //     description: 'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
        //     experience: 7,
        //     facilityName: 'Kiara\'s Boarding'
        // });
      }
    } catch (error: any) {
      console.error('Error fetching boarding details:', error);
      setError(error.message || 'Failed to fetch boarding details');

      // Set default data to match reference even on error
      // setServiceDetails({
      //     user: { firstName: 'Kiara', lastName: 'Das' },
      //     reviewAvg: 4.8,
      //     profileImg: null,
      //     description: 'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
      //     experience: 7,
      //     facilityName: 'Kiara\'s Boarding'
      // });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={boardingreviewstyles.container}>
      <View style={boardingreviewstyles.contentGap}>
        {/* Content */}
        <ScrollView
          contentContainerStyle={boardingreviewstyles.bottomspace}
          showsVerticalScrollIndicator={false}
        >
          {/* {Array(reviews > 10 ? 10 : reviews)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={boardingreviewstyles.generatedViewGap}>
                <View style={boardingreviewstyles.viewSize}>
                  <View style={boardingreviewstyles.imageTextGap}>
                    <View>
                      <Image
                        source={images?.UserImage}
                        style={boardingreviewstyles.userImageSize}
                      />
                      <Text style={boardingreviewstyles.ratingSize}>
                        {rating}
                      </Text>
                    </View>
                    <View>
                      <Text style={boardingreviewstyles.nameText}>
                        Kamal Sharma
                      </Text>
                      <Text style={boardingreviewstyles.paragraphText}>
                        Lorem Ipsum is simply dummy text of the {'\n'}
                        printing and typesetting industry. Lorem Ipsum {'\n'}
                        has been the industry's standard dummy text{'\n'} ever
                        since the 1500s.
                      </Text>
                    </View>
                  </View>
                  <View style={boardingreviewstyles.datePosition}>
                    <Text style={boardingreviewstyles.datefontSize}>
                      May 13, 2024
                    </Text>
                  </View>
                </View>
              </View>
            ))} */}
          {reviewData.map(item => (
            <View key={item?.id} style={boardingreviewstyles.generatedViewGap}>
              <View style={boardingreviewstyles.viewSize}>
                <View style={boardingreviewstyles.imageTextGap}>
                  <View>
                    <Image
                      source={images?.UserImage}
                      style={boardingreviewstyles.userImageSize}
                    />
                    <Text style={boardingreviewstyles.ratingSize}>
                      {rating}
                    </Text>
                  </View>
                  <View>
                    <Text style={boardingreviewstyles.nameText}>
                      Kamal Sharma
                    </Text>
                    <Text style={boardingreviewstyles.paragraphText}>
                      {item?.comment}
                    </Text>
                  </View>
                </View>
                <View style={boardingreviewstyles.datePosition}>
                  <Text style={boardingreviewstyles.datefontSize}>
                    May 13, 2024
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Fixed Button at the Bottom */}
      {/* <View style={boardingreviewstyles.fixedButtonContainer}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('HomeService')}
          style={boardingreviewstyles.nextBtnContainer}
        >
          <Text style={boardingreviewstyles.nextBtnText}>Write a review</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default BoardingReview;
