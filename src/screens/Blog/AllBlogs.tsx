import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { blogs, Blog } from '../../data/blogs';

interface AllBlogsProps {
  navigation: any;
}

const AllBlogs: React.FC<AllBlogsProps> = ({ navigation }) => {
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
              Pet Care Blog
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              {blogs.length} helpful articles for pet parents
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(3) }}
      >
        <View style={{ paddingHorizontal: responsiveWidth(5), paddingTop: 16 }}>
          {blogs.map((blog, index) => (
            <TouchableOpacity
              key={blog.id}
              onPress={() => navigation.navigate('BlogDetails', { blog })}
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
                {/* Blog Image */}
                <Image
                  source={{ uri: blog.image }}
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: '#F3F4F6',
                  }}
                  resizeMode="cover"
                />

                {/* Blog Content */}
                <View style={{ padding: 16 }}>
                  {/* Category Badge */}
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#FEF3C7',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#F59E0B',
                      }}
                    >
                      {blog.category}
                    </Text>
                  </View>

                  {/* Blog Title */}
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: 8,
                      lineHeight: 22,
                    }}
                  >
                    {blog.title}
                  </Text>

                  {/* Blog Excerpt */}
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#6B7280',
                      lineHeight: 19,
                      marginBottom: 12,
                    }}
                    numberOfLines={3}
                  >
                    {blog.excerpt}
                  </Text>

                  {/* Meta Info */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="person-outline" size={14} color="#6B7280" />
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#6B7280',
                          marginLeft: 4,
                        }}
                      >
                        {blog.author.split(',')[0]}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="access-time" size={14} color="#6B7280" />
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#6B7280',
                          marginLeft: 4,
                        }}
                      >
                        {blog.readTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllBlogs;
