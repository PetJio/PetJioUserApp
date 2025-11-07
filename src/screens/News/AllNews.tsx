import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { petNews, NewsArticle } from '../../data/news';

interface AllNewsProps {
  navigation: any;
}

const AllNews: React.FC<AllNewsProps> = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    // Sort by published date (most recent first)
    const sortedNews = [...petNews].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    setNewsArticles(sortedNews);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching latest news
    setTimeout(() => {
      loadNews();
      setRefreshing(false);
    }, 1000);
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
      return publishedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
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
              Latest Pet News
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              {newsArticles.length} articles available
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(3) }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
      >
        <View style={{ paddingHorizontal: responsiveWidth(5), paddingTop: 16 }}>
          {newsArticles.map((news, index) => (
            <TouchableOpacity
              key={news.id}
              onPress={() => navigation.navigate('NewsDetails', { news })}
              activeOpacity={0.8}
              style={{ marginBottom: 16 }}
            >
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  overflow: 'hidden',
                }}
              >
                {/* News Image */}
                <Image
                  source={{ uri: news.image }}
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: '#F3F4F6',
                  }}
                  resizeMode="cover"
                />

                {/* News Content */}
                <View style={{ padding: 16 }}>
                  {/* Category Badge and Time */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#DBEAFE',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '600',
                          color: '#3B82F6',
                        }}
                      >
                        {news.category}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#6B7280',
                      }}
                    >
                      {getTimeAgo(news.publishedAt)}
                    </Text>
                  </View>

                  {/* News Title */}
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: 8,
                      lineHeight: 22,
                    }}
                  >
                    {news.title}
                  </Text>

                  {/* News Description */}
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#6B7280',
                      lineHeight: 19,
                      marginBottom: 12,
                    }}
                    numberOfLines={3}
                  >
                    {news.description}
                  </Text>

                  {/* Source */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons name="source" size={14} color="#58B9D0" />
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#58B9D0',
                        marginLeft: 4,
                        fontWeight: '600',
                      }}
                    >
                      {news.source}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Refresh Hint */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 20,
          }}
        >
          <MaterialIcons name="refresh" size={24} color="#D1D5DB" />
          <Text
            style={{
              fontSize: 12,
              color: '#9CA3AF',
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            Pull down to refresh for latest news
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AllNews;
