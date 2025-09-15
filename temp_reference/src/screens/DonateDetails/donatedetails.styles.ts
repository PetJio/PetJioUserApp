import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const donatedetailstyles = StyleSheet.create({
    container: {
        width: responsiveWidth(100),
        flex: 1,
       backgroundColor:'#FFFFFF'
    },
    positionDateTimeIcon: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        zIndex: 100,
        top:responsiveHeight(4)
    },

    flexGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    iconColor: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    textDateTime: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
    },
    selectDateText: {
        padding: responsiveWidth(5),
        top: responsiveHeight(11),
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },

    makemView: {
        width: responsiveWidth(90),
        backgroundColor: '#fff',
        borderRadius: responsiveWidth(2),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        alignSelf: 'center',
        top: responsiveHeight(12),
    },
    imageSize: {
        width: responsiveWidth(90),
        height: responsiveHeight(18),
        borderRadius: responsiveWidth(2),
    },
    paddingProgressBar: {
        padding: responsiveHeight(0.9),
    },
    text: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '600',
        letterSpacing: 0,
        marginTop: responsiveHeight(0.6),
    },

    whiteProgressBar: {
        height: responsiveHeight(0.45),
        backgroundColor: '#eee',
        borderRadius: responsiveWidth(12),
        overflow: 'hidden',
        marginTop: responsiveHeight(0.9),
    },
    BlueProgressBar: {
        width: responsiveWidth(35),
        height: responsiveHeight(100),
        backgroundColor: '#4CC9F0',
        borderRadius: responsiveWidth(0.3),
    },

    fundRaisedText: {
        fontSize: 11,
        color: '#7E7E7E',
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 0,
        marginTop: responsiveHeight(0.6),
    },
    contentContainerStyle:{
        paddingBottom: responsiveHeight(20)
    },
    parentGap:{
        gap:responsiveHeight(17)
    },
   
    flexAndGap:{
        flexDirection:'row',
        gap:responsiveWidth(2),
        paddingHorizontal:responsiveWidth(5)
    },

    amountColor:{ 
        color: '#58B9D0', fontWeight: '600' 
    },

    locationText:{
        fontSize:11,
        fontWeight:'500',
        lineHeight:14,
        letterSpacing:0,
        color:'#383838'
    },

    DonateText:{
        fontSize:14,
        fontWeight:'600',
        lineHeight:14,
        letterSpacing:0,
        color:'#000000',
        paddingHorizontal:responsiveWidth(6)
    },
    paragraphText:{
        fontSize:11,
        fontWeight:'500',
        lineHeight:18,
        letterSpacing:0,
        color:'#626060',
        paddingHorizontal:responsiveWidth(6)
    },
    Gap:{
          gap:responsiveHeight(1.5)
    },

     // Fixed Button
   // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff', // Ensure background color to show shadow correctly
    padding: 10,
  
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // Negative height to make shadow appear on top
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
    // Shadow for Android
    elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    zIndex: 10, // In case it's under other views
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

export default donatedetailstyles;
