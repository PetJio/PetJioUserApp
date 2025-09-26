import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardingreviewstyles from './boardingreview.styles';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import { ReviewCardSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

interface BoardingReviewProps {
  rating?: number;
  reviews?: number;
}

const BoardingReview: React.FC<BoardingReviewProps> = ({
  rating = 4.8,
  reviews = 150,
}) => {
  const [show, setShow] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      setLoading(true);
      setError('');

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
        console.log('data.body 000', data.body);
        setReviewData(data.body);
      } else {
        setReviewData([]);
      }
    } catch (error: any) {
      console.error('Error fetching review details:', error);
      setError(error.message || 'Failed to fetch review details');
      setReviewData([]);
    } finally {
      setLoading(false);
    }
  };
  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[...Array(4)].map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </ScrollView>
      </View>
    );
  }

  // Empty state - No reviews
  if (!loading && reviewData.length === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
      }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <MaterialIcons name="rate-review" size={36} color="#9CA3AF" />
        </View>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          No Reviews Yet
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          textAlign: 'center',
          lineHeight: 20,
        }}>
          Be the first to share your experience{'\n'}with this boarding provider
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#58B9D0',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 24,
            marginTop: 24,
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
          }}>
            Write First Review
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={boardingreviewstyles.container}>
      <View style={boardingreviewstyles.contentGap}>
        {/* Content */}
        <ScrollView
          contentContainerStyle={boardingreviewstyles.bottomspace}
          showsVerticalScrollIndicator={false}
        >
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
                      {item?.ratings}
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
    </View>
  );
};

export default BoardingReview;
