import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const boardingstyles = StyleSheet.create({
  parentContainer: {
      flex: 1,
      backgroundColor: "#FFFFFF",
  },
  relative: {
      position: 'relative',
  },
  positionDateTimeIcon: {
      width: responsiveWidth(100),
      padding: responsiveWidth(4),
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: responsiveHeight(5),
  },
  flexGap: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
  },
  iconColor: {
      tintColor: "#000000",
      top: responsiveHeight(0.50),
  },
  textDateTime: {
      color: "#000000",
      fontSize: 20,
      fontWeight: '500',
  },
  trackingPositionIcon: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
      top: responsiveHeight(0.50),
  },
  trackTextColor: {
      color: "#000000",
  },
  trackIcon: {
      tintColor: "#000000",
      top: responsiveHeight(0.25),
  },
  selectDateText: {
      padding: responsiveWidth(5),
      top: responsiveHeight(11),
      color: "#000000",
      fontSize: 16,
      fontWeight: '600',
  },
  calendarPosition: {
      top: responsiveHeight(11),
      paddingHorizontal: responsiveWidth(3),
  },
  container: {
      gap: responsiveWidth(4),
      padding: responsiveWidth(4),
      top: responsiveHeight(12),
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
  },
  row: {
      flexDirection: "row",
      justifyContent: "space-between",
  },
  inputBox: {
      flexDirection: "row",
      alignItems: "center",
      width: responsiveWidth(45),
      paddingHorizontal: responsiveWidth(0.40),
      backgroundColor: "#fff",
  },
  textInput: {
      flex: 1,
      fontSize: 16,
      color: "#333",
      height: responsiveHeight(5),
      marginLeft: responsiveWidth(1),
  },
  filterIcon: {
      width: responsiveWidth(5),
      height: responsiveHeight(2),
  },

  // Fixed Button
  fixedButtonContainer: {
      position: 'absolute',
      bottom: responsiveHeight(3),
      width: '100%',
      alignItems: 'center',
  },
  nextBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: responsiveWidth(92),
      height: responsiveHeight(5),
      borderRadius: responsiveHeight(0.80),
      backgroundColor: '#58B9D0',
  },
  nextBtnText: {
      fontSize: 16,
      fontWeight: '400',
      color: '#FFFFFF',
  },

  // City Selection Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: responsiveWidth(6),
    borderTopRightRadius: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(3),
    maxHeight: responsiveHeight(60),
    elevation: 20,
    shadowColor: 'rgba(88, 185, 208, 0.4)',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },

  bottomSheetHandle: {
    width: responsiveWidth(10),
    height: responsiveHeight(0.4),
    backgroundColor: 'rgba(88, 185, 208, 0.3)',
    borderRadius: responsiveHeight(0.2),
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(0.5),
  },

  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(88, 185, 208, 0.1)',
    marginBottom: responsiveHeight(1),
  },

  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1D29',
    letterSpacing: -0.3,
  },

  closeButton: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },

  bottomSheetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 242, 245, 0.5)',
    borderRadius: 8,
    marginBottom: 2,
    backgroundColor: '#FAFBFC',
  },

  bottomSheetItemText: {
    fontSize: 15,
    color: '#1A1D29',
    fontWeight: '500',
  },

  checkMark: {
    fontSize: 18,
    color: '#58B9D0',
    fontWeight: 'bold',
  },

});

export default boardingstyles;