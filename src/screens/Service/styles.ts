import { StyleSheet, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { FONT_SIZES } from '../../constants/dimensions';
import { typography } from '../../styles/typography';
const styles = StyleSheet.create({
  // Sticky Header Styles
  stickyHeader: {
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
  
  headerContainer: {
    marginBottom: responsiveHeight(2),
  },
  headerTitle: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: '700',
    marginBottom: responsiveHeight(0.5),
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveWidth(3),
    // marginBottom: responsiveHeight(2),
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
  filterButton: {
    width: responsiveWidth(12),
    height: responsiveHeight(5.5),
    backgroundColor: "#58B9D0",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#58B9D0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    justifyContent: 'center',
    flexDirection: 'row',


  },
  image: {
    width: responsiveWidth(44),
    borderRadius: responsiveWidth(2),
    resizeMode: 'stretch',
    marginBottom: responsiveWidth(3)
  },

  cardindex: {
    flexDirection: 'column',
    width: responsiveWidth(47),
    alignItems: 'center',
  },


});

export default styles;
