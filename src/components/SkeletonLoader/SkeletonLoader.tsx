import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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

// Skeleton component for profile header section
export const ProfileHeaderSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
      gap: 12,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    }}>
      {/* Profile avatar */}
      <SkeletonLoader
        width={80}
        height={80}
        borderRadius={40}
      />

      {/* Profile name */}
      <SkeletonLoader
        width={120}
        height={20}
        borderRadius={4}
      />

      {/* Email */}
      <SkeletonLoader
        width={160}
        height={16}
        borderRadius={4}
      />

      {/* Verified badge */}
      <SkeletonLoader
        width={80}
        height={20}
        borderRadius={10}
      />

      {/* Tab buttons */}
      <View style={{
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
      }}>
        <SkeletonLoader
          width={120}
          height={40}
          borderRadius={8}
        />
        <SkeletonLoader
          width={100}
          height={40}
          borderRadius={8}
        />
      </View>
    </View>
  );
};

// Skeleton component for profile form fields
export const ProfileFormFieldSkeleton: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <View style={{ gap: 8 }}>
      {/* Field label */}
      <SkeletonLoader
        width={label ? label.length * 8 : 80}
        height={16}
        borderRadius={4}
      />

      {/* Input field with icon */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
      }}>
        {/* Icon placeholder */}
        <SkeletonLoader
          width={20}
          height={20}
          borderRadius={4}
        />

        {/* Input value */}
        <SkeletonLoader
          width="70%"
          height={16}
          borderRadius={4}
        />
      </View>
    </View>
  );
};

// Skeleton component for personal information section
export const PersonalInfoSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 16,
      marginBottom: 16,
      gap: 20,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    }}>
      {/* Section header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}>
        <SkeletonLoader
          width={24}
          height={24}
          borderRadius={4}
        />
        <SkeletonLoader
          width={160}
          height={20}
          borderRadius={4}
        />
      </View>

      {/* Form fields */}
      <ProfileFormFieldSkeleton label="First Name" />
      <ProfileFormFieldSkeleton label="Last Name" />
      <ProfileFormFieldSkeleton label="Email" />
      <ProfileFormFieldSkeleton label="Phone Number" />
    </View>
  );
};

// Skeleton component for address information section
export const AddressInfoSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 16,
      marginBottom: 16,
      gap: 20,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    }}>
      {/* Section header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}>
        <SkeletonLoader
          width={24}
          height={24}
          borderRadius={4}
        />
        <SkeletonLoader
          width={140}
          height={20}
          borderRadius={4}
        />
      </View>

      {/* Address field - multiline */}
      <View style={{ gap: 8 }}>
        <SkeletonLoader
          width={60}
          height={16}
          borderRadius={4}
        />
        <View style={{
          backgroundColor: '#F8F9FB',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E2E2E2',
          padding: 16,
          gap: 8,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}>
            <SkeletonLoader
              width={20}
              height={20}
              borderRadius={4}
            />
            <SkeletonLoader
              width="80%"
              height={16}
              borderRadius={4}
            />
          </View>
          <SkeletonLoader
            width="60%"
            height={16}
            borderRadius={4}
          />
        </View>
      </View>
    </View>
  );
};

// Skeleton component for pets tab content
export const PetsTabSkeleton: React.FC = () => {
  return (
    <View>
      {/* Pets list - vertical layout */}
      <View style={{
        gap: responsiveHeight(1.5),
        marginTop: responsiveHeight(1)
      }}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              padding: responsiveWidth(4),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* Pet Avatar */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: 'rgba(88, 185, 208, 0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: responsiveWidth(4),
              }}
            >
              <SkeletonLoader
                width={32}
                height={32}
                borderRadius={16}
              />
            </View>

            {/* Pet Info */}
            <View style={{ flex: 1 }}>
              {/* Pet Name */}
              <SkeletonLoader
                width="70%"
                height={18}
                borderRadius={4}
                style={{ marginBottom: 8 }}
              />

              {/* Category row */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
                <SkeletonLoader
                  width={16}
                  height={16}
                  borderRadius={8}
                  style={{ marginRight: 6 }}
                />
                <SkeletonLoader
                  width="50%"
                  height={14}
                  borderRadius={4}
                />
              </View>

              {/* Size row */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <SkeletonLoader
                  width={16}
                  height={16}
                  borderRadius={8}
                  style={{ marginRight: 6 }}
                />
                <SkeletonLoader
                  width="40%"
                  height={14}
                  borderRadius={4}
                />
              </View>
            </View>

            {/* Edit Button */}
            <SkeletonLoader
              width={50}
              height={38}
              borderRadius={8}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

// Skeleton component for pet selection modal
export const PetSelectionSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
      {[...Array(7)].map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          <View style={{
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            {/* Pet Avatar */}
            <SkeletonLoader
              width={60}
              height={60}
              borderRadius={30}
              style={{ marginRight: 14 }}
            />

            {/* Pet Info */}
            <View style={{ flex: 1, gap: 8 }}>
              <SkeletonLoader width="60%" height={18} borderRadius={4} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <SkeletonLoader width={60} height={20} borderRadius={6} />
                <SkeletonLoader width={50} height={20} borderRadius={6} />
              </View>
            </View>

            {/* Selection Indicator */}
            <SkeletonLoader width={26} height={26} borderRadius={13} />
          </View>
        </View>
      ))}
    </View>
  );
};

// Skeleton component for app initial loading (matches Home screen)
export const AppLoadingSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header Section */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingBottom: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
        elevation: 1,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* User greeting */}
          <View style={{ flex: 1 }}>
            <SkeletonLoader width={180} height={24} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonLoader width={150} height={14} borderRadius={4} />
          </View>

          {/* Header icons */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <SkeletonLoader width={44} height={44} borderRadius={22} />
            <SkeletonLoader width={44} height={44} borderRadius={22} />
          </View>
        </View>
      </View>

      {/* Pets Section */}
      <View style={{
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
      }}>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          {/* Pet avatars */}
          {[...Array(3)].map((_, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 8 }} />
              <SkeletonLoader width={50} height={12} borderRadius={4} />
            </View>
          ))}
          {/* Add pet button */}
          <View style={{ alignItems: 'center' }}>
            <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 8 }} />
            <SkeletonLoader width={40} height={12} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Empty State Cards */}
      <View style={{ paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(3) }}>
        {/* Appointments Card */}
        <View style={{
          backgroundColor: '#F8F9FB',
          borderRadius: 16,
          padding: responsiveHeight(2.5),
          borderWidth: 1,
          borderColor: '#E5E7EB',
          alignItems: 'center',
          marginBottom: responsiveHeight(2),
        }}>
          <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 12 }} />
          <SkeletonLoader width={220} height={16} borderRadius={4} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="90%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
          <SkeletonLoader width="80%" height={14} borderRadius={4} />
        </View>

        {/* News Card */}
        <View style={{
          backgroundColor: '#F0FCFF',
          borderRadius: 16,
          padding: responsiveHeight(2.5),
          borderWidth: 1,
          borderColor: '#B8E6FF',
          alignItems: 'center',
          marginBottom: responsiveHeight(2),
        }}>
          <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 12 }} />
          <SkeletonLoader width={160} height={16} borderRadius={4} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="90%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
          <SkeletonLoader width="70%" height={14} borderRadius={4} />
        </View>

        {/* Blog Card */}
        <View style={{
          backgroundColor: '#FEF7ED',
          borderRadius: 16,
          padding: responsiveHeight(2.5),
          borderWidth: 1,
          borderColor: '#FED7AA',
          alignItems: 'center',
        }}>
          <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 12 }} />
          <SkeletonLoader width={180} height={16} borderRadius={4} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="90%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
          <SkeletonLoader width="85%" height={14} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

// Skeleton component for boarding checkout page
export const BoardingCheckoutSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}>
      {/* Booking Summary Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        {/* Card Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} style={{ marginRight: 8 }} />
          <SkeletonLoader width={140} height={18} borderRadius={4} />
        </View>

        {/* Info Rows */}
        {[...Array(3)].map((_, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8
          }}>
            <SkeletonLoader width={80} height={14} borderRadius={4} />
            <SkeletonLoader width={120} height={14} borderRadius={4} />
          </View>
        ))}
      </View>

      {/* Pricing Details Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        {/* Card Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} style={{ marginRight: 8 }} />
          <SkeletonLoader width={130} height={18} borderRadius={4} />
        </View>

        {/* Price Rows */}
        {[...Array(2)].map((_, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6'
          }}>
            <View style={{ flex: 1 }}>
              <SkeletonLoader width="60%" height={16} borderRadius={4} style={{ marginBottom: 6 }} />
              <SkeletonLoader width="40%" height={12} borderRadius={4} />
            </View>
            <SkeletonLoader width={80} height={18} borderRadius={4} />
          </View>
        ))}

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 }} />

        {/* Total Row */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 8
        }}>
          <SkeletonLoader width={100} height={18} borderRadius={4} />
          <SkeletonLoader width={100} height={22} borderRadius={4} />
        </View>
      </View>

      {/* Note Card */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FDE68A',
      }}>
        <SkeletonLoader width={20} height={20} borderRadius={4} style={{ marginRight: 12 }} />
        <View style={{ flex: 1, gap: 6 }}>
          <SkeletonLoader width="40%" height={14} borderRadius={4} />
          <SkeletonLoader width="100%" height={12} borderRadius={4} />
          <SkeletonLoader width="90%" height={12} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

// Appointment card skeleton component
export const AppointmentCardSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      marginBottom: 12,
    }}>
      {/* Status Badge */}
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <SkeletonLoader width={70} height={20} borderRadius={12} />
      </View>

      {/* Facility Name */}
      <SkeletonLoader width="70%" height={18} borderRadius={4} style={{ marginBottom: 8 }} />

      {/* Provider Name */}
      <SkeletonLoader width="50%" height={14} borderRadius={4} style={{ marginBottom: 12 }} />

      {/* Date Range with Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <SkeletonLoader width={16} height={16} borderRadius={4} style={{ marginRight: 8 }} />
        <SkeletonLoader width="60%" height={14} borderRadius={4} />
      </View>

      {/* Flow Status with Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SkeletonLoader width={16} height={16} borderRadius={4} style={{ marginRight: 8 }} />
        <SkeletonLoader width="45%" height={14} borderRadius={4} />
      </View>
    </View>
  );
};

// Skeleton component for Add/Edit Pet form loading
export const PetFormSkeleton: React.FC = () => {
  return (
    <View style={{ padding: responsiveWidth(4), gap: responsiveHeight(2) }}>
      {/* Form input skeletons - matching CustomTextInput/CustomSelect style */}
      {[...Array(8)].map((_, index) => (
        <View key={index} style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#F9FAFB',
          minHeight: responsiveHeight(7.5),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {/* Icon */}
          <SkeletonLoader
            width={24}
            height={24}
            borderRadius={4}
            style={{ marginRight: 14 }}
          />

          {/* Label and input area */}
          <View style={{ flex: 1, justifyContent: 'center', gap: 4 }}>
            {/* Label */}
            <SkeletonLoader
              width={80 + Math.random() * 40}
              height={11}
              borderRadius={4}
            />
            {/* Input value */}
            <SkeletonLoader
              width={120 + Math.random() * 100}
              height={15}
              borderRadius={4}
            />
          </View>
        </View>
      ))}

      {/* Photo/Video Upload Section Skeleton */}
      <View style={{
        marginTop: responsiveHeight(2),
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        {/* Section Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <SkeletonLoader width={24} height={24} borderRadius={4} />
            <SkeletonLoader width={140} height={16} borderRadius={4} />
          </View>
          <SkeletonLoader width={40} height={16} borderRadius={4} />
        </View>

        {/* Description */}
        <SkeletonLoader width="90%" height={13} borderRadius={4} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="95%" height={12} borderRadius={4} style={{ marginBottom: 12 }} />

        {/* Upload Grid */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -4,
        }}>
          {[...Array(3)].map((_, index) => (
            <SkeletonLoader
              key={index}
              width={`${31.33}%`}
              height={100}
              borderRadius={12}
              style={{
                marginHorizontal: '1%',
                marginBottom: 8,
              }}
            />
          ))}
        </View>

        {/* Upload Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <SkeletonLoader width={50} height={12} borderRadius={4} style={{ marginBottom: 4 }} />
              <SkeletonLoader width={30} height={16} borderRadius={4} />
            </View>
          ))}
        </View>
      </View>

      {/* Submit Button Skeleton */}
      <SkeletonLoader
        width="100%"
        height={50}
        borderRadius={12}
        style={{ marginTop: responsiveHeight(2) }}
      />
    </View>
  );
};

// Skeleton component for Settlement Checkout page
export const SettlementCheckoutSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: responsiveWidth(5), paddingTop: 20, gap: 16 }}>
      {/* Booking Info Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={120} height={18} borderRadius={4} />
        </View>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SkeletonLoader width="35%" height={14} borderRadius={4} />
            <SkeletonLoader width="40%" height={14} borderRadius={4} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SkeletonLoader width="40%" height={14} borderRadius={4} />
            <SkeletonLoader width="30%" height={16} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Additional Services Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={180} height={18} borderRadius={4} />
        </View>
        <View style={{ gap: 10 }}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkeletonLoader width="60%" height={14} borderRadius={4} />
              <SkeletonLoader width={60} height={14} borderRadius={4} />
            </View>
          ))}
        </View>
      </View>

      {/* Settlement Summary Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={140} height={18} borderRadius={4} />
        </View>
        <View style={{ gap: 12 }}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <SkeletonLoader width="50%" height={14} borderRadius={4} />
              <SkeletonLoader width="25%" height={14} borderRadius={4} />
            </View>
          ))}
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SkeletonLoader width="40%" height={18} borderRadius={4} />
            <SkeletonLoader width="30%" height={20} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Payment Button Skeleton */}
      <SkeletonLoader
        width="100%"
        height={55}
        borderRadius={12}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

// Skeleton component for Grooming/Service List (InSiteService)
export const ServiceListSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: 16, gap: 16 }}>
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Profile Image */}
            <SkeletonLoader width={80} height={80} borderRadius={12} />

            {/* Service Info */}
            <View style={{ flex: 1, gap: 8 }}>
              {/* Name and Badge */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <SkeletonLoader width={100} height={16} borderRadius={4} />
                <SkeletonLoader width={70} height={20} borderRadius={10} />
              </View>

              {/* Rating */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <SkeletonLoader width={16} height={16} borderRadius={4} />
                <SkeletonLoader width={30} height={14} borderRadius={4} />
              </View>

              {/* Experience */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <SkeletonLoader width={16} height={16} borderRadius={4} />
                <SkeletonLoader width={120} height={14} borderRadius={4} />
              </View>

              {/* Location */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <SkeletonLoader width={16} height={16} borderRadius={4} />
                <SkeletonLoader width={90} height={14} borderRadius={4} />
              </View>
            </View>
          </View>

          {/* Specialties */}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {[...Array(3)].map((_, i) => (
              <SkeletonLoader key={i} width={80} height={24} borderRadius={12} />
            ))}
          </View>

          {/* Price and Button */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <SkeletonLoader width={80} height={20} borderRadius={4} />
            <SkeletonLoader width={100} height={36} borderRadius={8} />
          </View>
        </View>
      ))}
    </View>
  );
};

// Skeleton component for Vaccination Upload page
export const VaccinationUploadSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: responsiveWidth(4), paddingTop: 20, gap: 16 }}>
      {/* Header */}
      <View>
        <SkeletonLoader width="80%" height={24} borderRadius={4} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="95%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
        <SkeletonLoader width="90%" height={14} borderRadius={4} />
      </View>

      {/* Upload Area */}
      <View style={{
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
      }}>
        <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 12 }} />
        <SkeletonLoader width={150} height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <SkeletonLoader width={120} height={12} borderRadius={4} />
      </View>

      {/* Certificate Preview Cards */}
      {[...Array(2)].map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Thumbnail */}
            <SkeletonLoader width={80} height={80} borderRadius={8} />

            {/* Info */}
            <View style={{ flex: 1, gap: 8 }}>
              <SkeletonLoader width="70%" height={16} borderRadius={4} />
              <SkeletonLoader width="50%" height={14} borderRadius={4} />
              <SkeletonLoader width="60%" height={14} borderRadius={4} />
            </View>

            {/* Delete Icon */}
            <SkeletonLoader width={24} height={24} borderRadius={12} />
          </View>
        </View>
      ))}

      {/* Submit Button */}
      <SkeletonLoader
        width="100%"
        height={50}
        borderRadius={12}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

// Skeleton component for Boarding Details page
export const BoardingDetailsSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: responsiveWidth(4), paddingTop: responsiveHeight(2), gap: 24 }}>
      {/* Facility Card */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Profile Image */}
          <SkeletonLoader width={85} height={85} borderRadius={16} />

          {/* Facility Info */}
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonLoader width="80%" height={20} borderRadius={4} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <SkeletonLoader width={20} height={20} borderRadius={4} />
              <SkeletonLoader width={40} height={16} borderRadius={4} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <SkeletonLoader width={16} height={16} borderRadius={4} />
              <SkeletonLoader width={100} height={14} borderRadius={4} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <SkeletonLoader width="48%" height={44} borderRadius={12} />
          <SkeletonLoader width="48%" height={44} borderRadius={12} />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} width={100} height={40} borderRadius={20} />
        ))}
      </View>

      {/* About Section */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={80} height={18} borderRadius={4} />
        </View>
        <SkeletonLoader width="100%" height={14} borderRadius={4} style={{ marginBottom: 6 }} />
        <SkeletonLoader width="95%" height={14} borderRadius={4} style={{ marginBottom: 6 }} />
        <SkeletonLoader width="90%" height={14} borderRadius={4} />
      </View>

      {/* Services/Features Grid */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={120} height={18} borderRadius={4} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={{
              width: `${(100 - 24) / 3}%`,
              backgroundColor: '#F9FAFB',
              borderRadius: 8,
              padding: 12,
              alignItems: 'center',
            }}>
              <SkeletonLoader width={32} height={32} borderRadius={16} style={{ marginBottom: 8 }} />
              <SkeletonLoader width={60} height={12} borderRadius={4} />
            </View>
          ))}
        </View>
      </View>

      {/* Gallery Section */}
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SkeletonLoader width={20} height={20} borderRadius={4} />
          <SkeletonLoader width={100} height={18} borderRadius={4} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {[...Array(4)].map((_, index) => (
            <SkeletonLoader
              key={index}
              width={`${(100 - 12) / 2}%`}
              height={120}
              borderRadius={12}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Dashboard/Home Screen Skeleton Loader
export const DashboardSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header Skeleton */}
      <View style={{ padding: responsiveWidth(5), paddingTop: responsiveHeight(2) }}>
        <SkeletonLoader width={150} height={24} borderRadius={4} style={{ marginBottom: 4 }} />
        <SkeletonLoader width={180} height={14} borderRadius={4} />
      </View>

      {/* My Pets Section */}
      <View style={{ paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View>
            <SkeletonLoader width={80} height={18} borderRadius={4} style={{ marginBottom: 4 }} />
            <SkeletonLoader width={120} height={12} borderRadius={4} />
          </View>
          <SkeletonLoader width={90} height={36} borderRadius={18} />
        </View>

        {/* Pet Avatars */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <SkeletonLoader width={60} height={60} borderRadius={30} style={{ marginBottom: 4 }} />
              <SkeletonLoader width={40} height={10} borderRadius={4} />
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming Appointments Section */}
      <View style={{ paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(2) }}>
        <SkeletonLoader width={180} height={18} borderRadius={4} style={{ marginBottom: 12 }} />
        
        {/* Appointment Card */}
        <View style={{
          backgroundColor: '#F8F9FB',
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <SkeletonLoader width={60} height={16} borderRadius={8} />
            <SkeletonLoader width={70} height={24} borderRadius={12} />
          </View>
          
          <SkeletonLoader width={100} height={20} borderRadius={4} style={{ marginBottom: 8 }} />
          <SkeletonLoader width={140} height={14} borderRadius={4} style={{ marginBottom: 12 }} />
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <SkeletonLoader width={16} height={16} borderRadius={4} />
            <SkeletonLoader width={150} height={12} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Latest Pet News Section */}
      <View style={{ marginTop: responsiveHeight(2) }}>
        <SkeletonLoader 
          width={140} 
          height={18} 
          borderRadius={4} 
          style={{ marginBottom: 12, marginLeft: responsiveWidth(5) }} 
        />
        
        <View style={{ flexDirection: 'row', gap: 16, paddingLeft: responsiveWidth(5) }}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={{
                width: responsiveWidth(80),
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                overflow: 'hidden',
              }}
            >
              {/* News Image */}
              <SkeletonLoader width="100%" height={160} borderRadius={0} />
              
              {/* News Content */}
              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <SkeletonLoader width={60} height={20} borderRadius={12} />
                  <SkeletonLoader width={70} height={12} borderRadius={4} />
                </View>
                
                <SkeletonLoader width="100%" height={16} borderRadius={4} style={{ marginBottom: 6 }} />
                <SkeletonLoader width="80%" height={16} borderRadius={4} style={{ marginBottom: 12 }} />
                
                <SkeletonLoader width="100%" height={12} borderRadius={4} style={{ marginBottom: 4 }} />
                <SkeletonLoader width="60%" height={12} borderRadius={4} style={{ marginBottom: 12 }} />
                
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <SkeletonLoader width={14} height={14} borderRadius={4} />
                  <SkeletonLoader width={120} height={11} borderRadius={4} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* View All News Button */}
        <View style={{ paddingHorizontal: responsiveWidth(5), marginTop: 16 }}>
          <SkeletonLoader width="100%" height={48} borderRadius={12} />
        </View>
      </View>

      {/* Pet Care Blog Section */}
      <View style={{ marginTop: responsiveHeight(2), paddingBottom: responsiveHeight(2) }}>
        <SkeletonLoader 
          width={120} 
          height={18} 
          borderRadius={4} 
          style={{ marginBottom: 12, marginLeft: responsiveWidth(5) }} 
        />
        
        <View style={{ flexDirection: 'row', gap: 16, paddingLeft: responsiveWidth(5) }}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={{
                width: responsiveWidth(75),
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                overflow: 'hidden',
              }}
            >
              {/* Blog Image */}
              <SkeletonLoader width="100%" height={140} borderRadius={0} />
              
              {/* Blog Content */}
              <View style={{ padding: 16 }}>
                <SkeletonLoader width={70} height={20} borderRadius={12} style={{ marginBottom: 8 }} />
                
                <SkeletonLoader width="100%" height={16} borderRadius={4} style={{ marginBottom: 4 }} />
                <SkeletonLoader width="90%" height={16} borderRadius={4} style={{ marginBottom: 12 }} />
                
                <SkeletonLoader width="100%" height={12} borderRadius={4} style={{ marginBottom: 4 }} />
                <SkeletonLoader width="70%" height={12} borderRadius={4} style={{ marginBottom: 12 }} />
                
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <SkeletonLoader width={20} height={20} borderRadius={10} />
                    <SkeletonLoader width={80} height={11} borderRadius={4} />
                  </View>
                  <SkeletonLoader width={70} height={11} borderRadius={4} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SkeletonLoader;