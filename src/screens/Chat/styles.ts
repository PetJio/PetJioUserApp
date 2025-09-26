import { StyleSheet, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    backgroundColor: '#F8F9FB',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBF0',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1D29',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F3F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1E7DD',
  },
  // Service page style header
  serviceStyleHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: responsiveHeight(5),
  },
  serviceHeaderContainer: {
    width: responsiveWidth(100),
    padding: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveHeight(2.5),
  },
  serviceHeaderLeft: {
    flexDirection: 'row',
    gap: responsiveWidth(1),
    alignItems: 'center',
  },
  serviceHeaderTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
  serviceHeaderRight: {
    flexDirection: 'row',
    gap: responsiveWidth(1),
    alignItems: 'center',
  },
  serviceHeaderSubtitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(10),
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1D29',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3),
    paddingHorizontal: 20,
    paddingVertical: responsiveHeight(2),
    
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    fontSize: 16,
  },
  inputContent: {
    paddingHorizontal: responsiveWidth(4),
    fontSize: 16,
    color: '#333',
  },
  inputOutline: {
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  chatList: {
    // paddingHorizontal: 20,
    paddingBottom: responsiveHeight(10),
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1D29',
    flex: 1,
  },
  timestamp: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#58B9D0',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#4A9FBF',
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});

export default styles;
