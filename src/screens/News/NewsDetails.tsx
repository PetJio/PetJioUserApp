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
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { NewsArticle } from '../../data/news';

interface NewsDetailsProps {
  route: {
    params: {
      news: NewsArticle;
    };
  };
  navigation: any;
}

const NewsDetails: React.FC<NewsDetailsProps> = ({ route, navigation }) => {
  const { news } = route.params;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${news.title}\n\n${news.description}\n\nRead more: ${news.url}\n\nSource: ${news.source}`,
        title: news.title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('News shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to share this article');
      console.error('Share error:', error);
    }
  };

  const handleReadFullArticle = () => {
    Linking.openURL(news.url).catch(() => {
      Alert.alert('Error', 'Unable to open the article link');
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(dateString);
    }
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
          paddingTop: StatusBar.currentHeight,
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
              Pet News
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              Stay updated with the latest pet care news
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
          source={{ uri: news.image }}
          style={{
            width: '100%',
            height: responsiveHeight(30),
            backgroundColor: '#F3F4F6',
          }}
          resizeMode="cover"
        />

        {/* Content Container */}
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          {/* Category Badge and Date */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <View
              style={{
                backgroundColor: '#DBEAFE',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#3B82F6',
                }}
              >
                {news.category}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: '#6B7280',
              }}
            >
              {getTimeAgo(news.publishedAt)}
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
            {news.title}
          </Text>

          {/* Source Information */}
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
                backgroundColor: '#3B82F6',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <MaterialIcons name="newspaper" size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {news.source}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {formatDate(news.publishedAt)}
              </Text>
            </View>
          </View>

          {/* News Description */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 24,
                color: '#374151',
                textAlign: 'left',
                marginBottom: 8,
              }}
            >
              {news.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetails;
