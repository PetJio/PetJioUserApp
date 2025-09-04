import { StyleSheet, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FONT_SIZES } from '../../constants/dimensions';
import { typography } from '../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  
  // Sticky Header Styles
  stickyHeader: {
    backgroundColor: '#F8F9FB',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBF0',
  },
  
  headerTitleContainer: {
    flex: 1,
  },
  
  stickyHeaderTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: typography.fontWeight.bold,
    color: '#1A1D29',
    marginBottom: 2,
  },
  
  stickyHeaderSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: '#666',
    fontWeight: typography.fontWeight.medium,
  },
  
  headerActions: {
    flexDirection: 'row',
    gap: responsiveWidth(2.5),
  },
  
  headerActionButton: {
    padding: responsiveWidth(1),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#393939',
  },
  searchButton: {
    padding: responsiveWidth(2),
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#58B9D0',
  },
  listContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(8),
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveWidth(4),
    padding: responsiveWidth(4.5),
    marginVertical: responsiveHeight(0.8),
    marginHorizontal: responsiveWidth(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: responsiveWidth(3.5),
    shadowColor: '#58B9D0',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#00C851',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#00C851',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.8),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: typography.fontWeight.bold,
    color: '#1A1D29',
    marginRight: responsiveWidth(2),
    letterSpacing: 0.3,
  },
  professionalBadge: {
    backgroundColor: '#58B9D0',
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    shadowColor: '#58B9D0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  professionText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: typography.fontWeight.medium,
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: typography.fontWeight.regular,
    color: '#8E9297',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(0.2),
  },
  lastMessage: {
    fontSize: FONT_SIZES.md,
    fontWeight: typography.fontWeight.regular,
    color: '#6B7280',
    flex: 1,
    marginRight: responsiveWidth(2),
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: responsiveWidth(3.5),
    minWidth: responsiveWidth(6),
    height: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1.5),
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCount: {
    fontSize: FONT_SIZES.xs,
    fontWeight: typography.fontWeight.semibold,
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: 'transparent',
  },
});

export default styles;
