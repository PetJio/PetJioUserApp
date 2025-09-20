import { StyleSheet } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const boardingmodalstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  setmodalRadious: {
    backgroundColor: 'white',
    bottom: -20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: responsiveHeight(32),
  },

  paddingOfNormalWalkingGroupWalking: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
  },

  selectText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#58B9D0',
    paddingHorizontal: responsiveWidth(4),
  },
  unselectText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#AAAAAA',
    paddingHorizontal: responsiveWidth(4),
  },
  menuBottomBoarder: {
    borderBottomWidth: 2,
    borderColor: '#58B9D0',
    width: responsiveWidth(40),
    alignItems: 'center',
    paddingBottom: responsiveHeight(0.9),
  },
  // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0.3),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#fff',
    padding: 10,
    marginLeft: responsiveWidth(5),
  },
  nextBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(92),
    height: responsiveHeight(5),
    borderRadius: responsiveHeight(0.8),
    backgroundColor: '#58B9D0',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },

  dogimage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(20),
  },
  setFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  setFlexWithGap: {
    top: responsiveHeight(2),
    flexDirection: 'row',
    gap: responsiveWidth(2.5),
  },
  imageSize: {
    width: responsiveWidth(12),
    height: responsiveHeight(5.2),
    borderRadius: responsiveWidth(30),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexORGap: {
    flexDirection: 'row',
    gap: responsiveWidth(1),
  },
  daisyText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: -0.5,
    color: '#000000',
  },

  yearText: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    letterSpacing: 0.5,
    color: '#979797',
    right: responsiveHeight(1),
  },
  topforImage: {
    top: responsiveHeight(4),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
});

export default boardingmodalstyles;
