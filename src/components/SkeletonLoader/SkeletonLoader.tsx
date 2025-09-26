import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style = {},
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    };

    startAnimation();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#F8F9FB'],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

// Skeleton card component for boarding services
export const BoardingCardSkeleton: React.FC<{ backgroundColor?: string }> = ({ backgroundColor = '#F8F9FB' }) => {
  return (
    <View style={{
      backgroundColor,
      borderRadius: 16,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Profile Image Skeleton */}
        <SkeletonLoader
          width={80}
          height={80}
          borderRadius={12}
        />
        
        <View style={{ flex: 1, gap: 8 }}>
          {/* Title and Rating Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <SkeletonLoader
              width="60%"
              height={20}
              borderRadius={4}
            />
            <SkeletonLoader
              width={60}
              height={16}
              borderRadius={8}
            />
          </View>
          
          {/* Experience and Registration */}
          <SkeletonLoader
            width="75%"
            height={14}
            borderRadius={4}
          />
          
          {/* Location */}
          <SkeletonLoader
            width="50%"
            height={14}
            borderRadius={4}
          />
          
          {/* Description */}
          <View style={{ gap: 4 }}>
            <SkeletonLoader
              width="100%"
              height={12}
              borderRadius={4}
            />
            <SkeletonLoader
              width="85%"
              height={12}
              borderRadius={4}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// Review card skeleton component
export const ReviewCardSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#F3F4F6',
    }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Profile Image Skeleton */}
        <View style={{ alignItems: 'center', gap: 6 }}>
          <SkeletonLoader
            width={50}
            height={50}
            borderRadius={25}
          />
          <SkeletonLoader
            width={30}
            height={14}
            borderRadius={7}
          />
        </View>
        
        <View style={{ flex: 1, gap: 8 }}>
          {/* Name */}
          <SkeletonLoader
            width="40%"
            height={16}
            borderRadius={4}
          />
          
          {/* Review Text */}
          <View style={{ gap: 4 }}>
            <SkeletonLoader
              width="100%"
              height={12}
              borderRadius={4}
            />
            <SkeletonLoader
              width="90%"
              height={12}
              borderRadius={4}
            />
            <SkeletonLoader
              width="75%"
              height={12}
              borderRadius={4}
            />
          </View>
        </View>
        
        {/* Date */}
        <SkeletonLoader
          width={70}
          height={12}
          borderRadius={4}
        />
      </View>
    </View>
  );
};

// Skeleton component for history view details page
export const HistoryDetailsSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Main Info Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
            <SkeletonLoader width={48} height={48} borderRadius={24} />
            <View style={{ flex: 1, gap: 6 }}>
              <SkeletonLoader width="70%" height={18} borderRadius={4} />
              <SkeletonLoader width="50%" height={14} borderRadius={4} />
            </View>
          </View>
          <SkeletonLoader width={60} height={20} borderRadius={10} />
        </View>
      </View>

      {/* Date Range Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <SkeletonLoader width={120} height={16} borderRadius={4} style={{ marginBottom: 12 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonLoader width="60%" height={14} borderRadius={4} />
            <SkeletonLoader width="80%" height={16} borderRadius={4} />
          </View>
          <View style={{ width: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16 }} />
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonLoader width="60%" height={14} borderRadius={4} />
            <SkeletonLoader width="80%" height={16} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Services Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <SkeletonLoader width={140} height={16} borderRadius={4} style={{ marginBottom: 16 }} />
        {[...Array(4)].map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <SkeletonLoader width={16} height={16} borderRadius={8} />
            <SkeletonLoader width="70%" height={14} borderRadius={4} />
          </View>
        ))}
      </View>

      {/* Provider Details Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <SkeletonLoader width={120} height={16} borderRadius={4} style={{ marginBottom: 16 }} />
        {[...Array(4)].map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <SkeletonLoader width={16} height={16} borderRadius={8} />
            <SkeletonLoader width="75%" height={14} borderRadius={4} />
          </View>
        ))}
      </View>

      {/* Status Timeline Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 80,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <SkeletonLoader width={100} height={16} borderRadius={4} style={{ marginBottom: 16 }} />
        {[...Array(3)].map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <SkeletonLoader width={24} height={24} borderRadius={12} />
            <View style={{ flex: 1, gap: 4 }}>
              <SkeletonLoader width="60%" height={14} borderRadius={4} />
              <SkeletonLoader width="40%" height={12} borderRadius={4} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// Skeleton card component for booking history
export const HistoryCardSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    //   marginHorizontal: 16,
    }}>
      {/* Header with status and date */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <SkeletonLoader
          width={100}
          height={24}
          borderRadius={12}
        />
        <SkeletonLoader
          width={80}
          height={16}
          borderRadius={4}
        />
      </View>

      {/* Service provider info */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
        <SkeletonLoader
          width={50}
          height={50}
          borderRadius={25}
        />
        <View style={{ flex: 1, gap: 6 }}>
          <SkeletonLoader
            width="70%"
            height={18}
            borderRadius={4}
          />
          <SkeletonLoader
            width="50%"
            height={14}
            borderRadius={4}
          />
        </View>
      </View>

      {/* Booking details */}
      <View style={{ gap: 8 }}>
        <SkeletonLoader
          width="60%"
          height={14}
          borderRadius={4}
        />
        <SkeletonLoader
          width="75%"
          height={14}
          borderRadius={4}
        />
      </View>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <SkeletonLoader
          width={80}
          height={32}
          borderRadius={6}
        />
        <SkeletonLoader
          width={100}
          height={32}
          borderRadius={6}
        />
      </View>
    </View>
  );
};

// Skeleton component for chat list items
export const ChatListItemSkeleton: React.FC = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#FFFFFF',
    }}>
      {/* Avatar */}
      <SkeletonLoader
        width={50}
        height={50}
        borderRadius={25}
        style={{ marginRight: 12 }}
      />

      <View style={{ flex: 1, gap: 6 }}>
        {/* Name and timestamp row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <SkeletonLoader
            width="60%"
            height={16}
            borderRadius={4}
          />
          <SkeletonLoader
            width={50}
            height={12}
            borderRadius={4}
          />
        </View>

        {/* Last message and unread count row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <SkeletonLoader
            width="75%"
            height={14}
            borderRadius={4}
          />
          <SkeletonLoader
            width={20}
            height={20}
            borderRadius={10}
          />
        </View>
      </View>
    </View>
  );
};

// Skeleton component for chat messages
export const ChatMessageSkeleton: React.FC<{ isMe?: boolean }> = ({ isMe = false }) => {
  // Create consistent random values per component instance
  const messageWidth = React.useMemo(() => 100 + Math.floor(Math.random() * 150), []);
  const hasSecondLine = React.useMemo(() => Math.random() > 0.6, []);
  const secondLineWidth = React.useMemo(() => 60 + Math.floor(Math.random() * 100), []);

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: isMe ? 'flex-end' : 'flex-start',
      marginVertical: 2,
    }}>
      {!isMe && (
        <SkeletonLoader
          width={32}
          height={32}
          borderRadius={16}
          style={{ marginRight: 8 }}
        />
      )}

      <View style={{
        maxWidth: '75%',
        backgroundColor: isMe ? '#E3F2FD' : '#F8F9FB',
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopLeftRadius: isMe ? 18 : 4,
        borderTopRightRadius: isMe ? 4 : 18,
      }}>
        <SkeletonLoader
          width={messageWidth}
          height={16}
          borderRadius={4}
          style={{ marginBottom: hasSecondLine ? 6 : 0 }}
        />
        {hasSecondLine && (
          <SkeletonLoader
            width={secondLineWidth}
            height={16}
            borderRadius={4}
          />
        )}
      </View>

      {isMe && (
        <SkeletonLoader
          width={32}
          height={32}
          borderRadius={16}
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );
};

// Skeleton component for pets loading in home page
export const PetSkeleton: React.FC = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingHorizontal: 16,
    }}>
      {/* Pet containers */}
      {[...Array(3)].map((_, index) => (
        <View key={index} style={{
          alignItems: 'center',
          gap: 8,
        }}>
          {/* Pet avatar circle */}
          <SkeletonLoader
            width={60}
            height={60}
            borderRadius={30}
          />
          {/* Pet name */}
          <SkeletonLoader
            width={50}
            height={12}
            borderRadius={4}
          />
        </View>
      ))}

      {/* Add pet plus button */}
      <View style={{
        alignItems: 'center',
        gap: 8,
      }}>
        <SkeletonLoader
          width={60}
          height={60}
          borderRadius={30}
        />
        <SkeletonLoader
          width={40}
          height={12}
          borderRadius={4}
        />
      </View>
    </View>
  );
};

// Skeleton component for chat page initial loading
export const ChatPageSkeleton: React.FC = () => {
  return (
    <View style={{
      flex: 1,
    //   paddingTop: 20,
    //   paddingBottom: 20,
      backgroundColor: '#F8F9FB'
    }}>
      {/* Messages skeleton with varied patterns */}
      {[...Array(12)].map((_, index) => {
        const isMe = index % 4 === 0 || index % 4 === 3;
        const isSequential = index > 0 && (index % 4 === 1 && (index - 1) % 4 === 0) || (index % 4 === 2 && (index - 1) % 4 === 1);
        
        return (
          <View key={index} style={{
            // marginBottom: isSequential ? 4 : 16,
            // paddingHorizontal: 16,
          }}>
            <ChatMessageSkeleton isMe={isMe} />
          </View>
        );
      })}
    </View>
  );
};

export default SkeletonLoader;