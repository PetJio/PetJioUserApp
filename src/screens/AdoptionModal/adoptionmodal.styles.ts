import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const adoptionmodalstyles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    subcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    setmodalRadious: {
        backgroundColor: 'white',
        // bottom:-15,
        padding: 20,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        minHeight: responsiveHeight(33),
    },

    adoptionDogView:{
      justifyContent:'center',
      alignItems:'center',
      shadowColor: '#000', // Shadow color
      shadowOffset: { width: 0, height: 4 }, // Shadow only at the bottom (height controls vertical offset)
      shadowOpacity: 0.3, // Shadow opacity
      shadowRadius: 4, // Shadow blur radius
      elevation: 5, // Elevation for Android shadow
      borderRadius:responsiveWidth(2),
      width:responsiveWidth(42),
      height:responsiveHeight(20),
      backgroundColor:'#FFFFFF',
      paddingHorizontal:responsiveWidth(5),
      top:responsiveHeight(0.80)
     
    },

   centerInnerView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:responsiveWidth(4)
},
imageSize:{
    width:responsiveWidth(30),
    height:responsiveHeight(12),
    borderRadius:responsiveWidth(2)
},

text:{
    fontSize:12,
    fontWeight:'600',
    lineHeight:18,
    letterSpacing:0,
    color:'#5E5E5E'
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
    marginLeft:responsiveWidth(5)
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

dogimage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(20),
},
});

export default adoptionmodalstyles;
