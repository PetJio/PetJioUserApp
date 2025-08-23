import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const virtualadoptiondetailstyles = StyleSheet.create({
    container: {
         flex: 1,
        position: 'relative', // ✅ Needed for absolute positioning to work correctly
        backgroundColor: '#fff'
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
      tintColor: "#FFFFFF",
      top: responsiveHeight(0.50),
  },
  textDateTime: {
      color: "#FFFFFF",
      fontSize:18,
      fontWeight: '500',
  },

   // Fixed Button Register
  registerfixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#fff', 
    padding: 10,
   
},
 registernextBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(92),
    height: responsiveHeight(5),
    borderWidth:1,
    borderRadius: responsiveHeight(0.80),
    borderColor:'#58B9D0'

},
 registernextBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4494A8',
},







  // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0.30),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#fff', 
    padding: 10,
   
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

export default virtualadoptiondetailstyles;
