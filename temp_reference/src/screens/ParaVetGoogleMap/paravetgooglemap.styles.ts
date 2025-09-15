import { StyleSheet } from 'react-native';
import { responsiveWidth,responsiveHeight,} from 'react-native-responsive-dimensions';
const paravetgooglemapstyles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
   mapImage: {
   width:responsiveWidth(100),
   height: responsiveHeight(100), 
   position: 'relative', 
},
 Invoice: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(36),
        height: responsiveHeight(3.8),
        borderWidth: responsiveWidth(0.20),
        borderRadius: responsiveWidth(0.99),
        borderColor: '#4494A8'
    },

    bottomshadow: {
        width: responsiveWidth(100),
        height: responsiveHeight(10.3),
        color: '#FFFFFF',
        shadowColor: '#A1A1A1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5,
        top: responsiveHeight(18),
    },
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(88),
        height: responsiveHeight(5),
        backgroundColor: '#58B9D0',
        marginLeft: responsiveWidth(1),
        // top: responsiveHeight(3.5),
        borderRadius:responsiveWidth(1.5)
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    remaindertext: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18,
        color: '#58B9D0'
    },

    // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0),
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff', // Ensure background color to show shadow correctly
    padding: 10,
    flexDirection:'row', 
    justifyContent:'space-between', 
    gap:responsiveWidth(2),
    // bottom:responsiveHeight(6),
    paddingHorizontal:responsiveWidth(4),
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // Negative height to make shadow appear on top
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    zIndex: 10, // In case it's under other views
},
  
    booking: {
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(12.6),
        borderRadius: responsiveWidth(1.9),
        backgroundColor: '#E4FAFF'
    },
   

    confirmTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(9),
        // width: responsiveWidth(100),
    },
    
     textView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(10),
        width: responsiveWidth(100),
    },
   


});

export default paravetgooglemapstyles;