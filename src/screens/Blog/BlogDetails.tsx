import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Share,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Blog } from '../../data/blogs';

interface BlogDetailsProps {
  route: {
    params: {
      blog: Blog;
    };
  };
  navigation: any;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ route, navigation }) => {
  const { blog } = route.params;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${blog.title}\n\n${blog.excerpt}\n\nRead more on PetJio!`,
        title: blog.title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Article shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to share this article');
      console.error('Share error:', error);
    }
  };

  // Function to render formatted text content
  const renderFormattedContent = () => {
    const lines = blog.content.split('\n').filter(line => line.trim() !== '');
    const elements: any[] = [];

    lines.forEach((line, index) => {
      // Check if line contains bold markers (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: any[] = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before bold
        if (match.index > lastIndex) {
          parts.push(
            <Text key={`${index}-${lastIndex}`}>
              {line.substring(lastIndex, match.index)}
            </Text>
          );
        }
        // Add bold text
        parts.push(
          <Text key={`${index}-bold-${match.index}`} style={{ fontWeight: '700', color: '#111827' }}>
            {match[1]}
          </Text>
        );
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(
          <Text key={`${index}-${lastIndex}`}>{line.substring(lastIndex)}</Text>
        );
      }

      // Return the line with proper formatting
      if (parts.length > 0) {
        elements.push(
          <Text
            key={index}
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: '#374151',
              textAlign: 'left',
              marginBottom: 8,
            }}
          >
            {parts}
          </Text>
        );
      } else if (line.trim()) {
        elements.push(
          <Text
            key={index}
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: '#374151',
              textAlign: 'left',
              marginBottom: 8,
            }}
          >
            {line}
          </Text>
        );
      }
    });

    return elements;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: Platform.OS === 'ios' ? responsiveHeight(7) : responsiveHeight(4),
          paddingBottom: responsiveHeight(1.5),
          paddingHorizontal: responsiveWidth(5),
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#F8F9FB',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#111827',
                lineHeight: 24,
              }}
            >
              {blog.category}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              Learn more about pet care and wellness
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(3) }}
      >
        {/* Featured Image */}
        <Image
          source={{ uri: blog.image }}
          style={{
            width: '100%',
            height: responsiveHeight(30),
            backgroundColor: '#F3F4F6',
          }}
          resizeMode="cover"
        />

        {/* Content Container */}
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          {/* Category Badge */}
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#E3F2FD',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: '#58B9D0',
              }}
            >
              {blog.category}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#111827',
              marginTop: 12,
              lineHeight: 32,
            }}
          >
            {blog.title}
          </Text>

          {/* Meta Information */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#E5E7EB',
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#58B9D0',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>
                {blog.author.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {blog.author}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#6B7280',
                    marginHorizontal: 8,
                  }}
                />
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  {blog.readTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Blog Content */}
          <View style={{ marginTop: 20 }}>
            {renderFormattedContent()}
          </View>

          {/* Share Section */}
          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.8}
            style={{
              marginTop: 32,
              padding: 20,
              backgroundColor: '#F8F9FB',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialIcons name="share" size={20} color="#58B9D0" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#111827',
                  marginLeft: 8,
                }}
              >
                Share this article
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
              Found this helpful? Share it with other pet parents!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogDetails;