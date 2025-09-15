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
  
});

export default boardingstyles;


