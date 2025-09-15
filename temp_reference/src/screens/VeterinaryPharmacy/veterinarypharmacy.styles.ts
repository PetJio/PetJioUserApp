import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const veterinarypharmacystyles = StyleSheet.create({

      container:{
        flex:1,
        position: 'relative',
        width:responsiveWidth(100),
        height:responsiveHeight(100),
        backgroundColor:'#f5f5f5'
      },

       ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },

     ratingHeight: { 
        top: responsiveHeight(0.3) 
    },
     ratePointSize: {
        color: '#848484',
        fontSize: 16,
        fontWeight: '400',
    },

      view: {
        // flexDirection: 'row',
        // justifyContent:'center',
        // alignItems:'center',
        gap: responsiveWidth(2),
        maxWidth: responsiveWidth(90),
        minWidth: responsiveWidth(30),
        padding: responsiveWidth(3),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: responsiveWidth(1),
    },

    // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(17),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff', // Ensure background color to show shadow correctly
    padding:responsiveWidth(8),
  
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
    fontSize:responsiveWidth(3),
    fontWeight: '600',
    color: '#FFFFFF',
},
     
      

});

export default veterinarypharmacystyles;