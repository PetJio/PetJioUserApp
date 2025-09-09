
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardingreviewstyles from './boardingreview.styles';
import { apiRequest } from '../../config/api';

interface BoardingReviewProps {
    rating?: number;
    reviews?: number;
    serviceId?: number;
}

const BoardingReview: React.FC<BoardingReviewProps> = ({ 
    rating = 4.8, 
    reviews = 856,
    serviceId = 25
}) => {
    const [reviewsData, setReviewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchReviews();
    }, [serviceId]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError('');
            
            console.log('Fetching reviews for serviceId:', serviceId);
            
            // Call the API endpoint
            const response = await apiRequest(
                `/api/boarding-reviews/get-by-service/${serviceId}`,
                {
                    method: 'GET',
                }
            );
            
            console.log('Reviews API response:', JSON.stringify(response, null, 2));
            
            // Handle the response structure
            let reviewsArray = [];
            if (response && response.body && Array.isArray(response.body)) {
                reviewsArray = response.body;
            } else if (response && Array.isArray(response)) {
                reviewsArray = response;
            }
            
            setReviewsData(reviewsArray);
            console.log('Reviews set successfully, count:', reviewsArray.length);
            
        } catch (error: any) {
            console.error('Error fetching reviews:', error);
            setError(error.message || 'Failed to fetch reviews');
            
            // Set empty array for error state but don't show alert for reviews
            setReviewsData([]);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (ratingValue: number) => {
        const stars = [];
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <MaterialIcons key={i} name="star" size={14} color="#FFB800" />
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <MaterialIcons key="half" name="star-half" size={14} color="#FFB800" />
            );
        }
        
        const emptyStars = 5 - Math.ceil(ratingValue);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <MaterialIcons key={`empty-${i}`} name="star-border" size={14} color="#D1D5DB" />
            );
        }
        
        return stars;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading) {
        return (
            <View style={boardingreviewstyles.loadingContainer}>
                <ActivityIndicator size="large" color="#58B9D0" />
                <Text style={boardingreviewstyles.loadingText}>Loading reviews...</Text>
            </View>
        );
    }
    return (
        <View style={boardingreviewstyles.container}> 
            <View style={boardingreviewstyles.contentGap}> 
                
                {/* Reviews List */}
                {reviewsData.length > 0 ? (
                    <ScrollView
                        contentContainerStyle={boardingreviewstyles.bottomspace} 
                        showsVerticalScrollIndicator={false}
                    >
                        {reviewsData.map((review, index) => (
                            <View key={review.id || index} style={boardingreviewstyles.reviewCard}>
                                <View style={boardingreviewstyles.reviewHeader}>
                                    <Text style={boardingreviewstyles.reviewerName}>
                                        User {review.id}
                                    </Text>
                                    <Text style={boardingreviewstyles.reviewDate}>
                                        {formatDate(review.createdAt)}
                                    </Text>
                                </View>
                                
                                <View style={boardingreviewstyles.starsContainer}>
                                    {renderStars(parseFloat(review.ratings))}
                                    <Text style={boardingreviewstyles.ratingText}>
                                        {review.ratings}/5
                                    </Text>
                                </View>
                                
                                <Text style={boardingreviewstyles.reviewComment}>
                                    {review.comment}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={boardingreviewstyles.noReviewsContainer}>
                        <MaterialIcons 
                            name="rate-review" 
                            size={48} 
                            color="#D1D5DB" 
                            style={boardingreviewstyles.noReviewsIcon}
                        />
                        <Text style={boardingreviewstyles.noReviewsTitle}>No Reviews Yet</Text>
                        <Text style={boardingreviewstyles.noReviewsText}>
                            Be the first one to share your experience with this boarding service!
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default BoardingReview;
