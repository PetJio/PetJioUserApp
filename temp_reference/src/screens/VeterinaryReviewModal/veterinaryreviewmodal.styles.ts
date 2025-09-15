import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const veterinaryreviewmodalstyles = StyleSheet.create({
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
        padding: 20,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        minHeight: responsiveHeight(58),
        gap:responsiveHeight(2)
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
    fontSize: 12,
    fontWeight: '600',
    lineHeight:18,
    letterSpacing:0,
    color: '#FFFFFF',
},

dogimage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(20),
},
});

export default veterinaryreviewmodalstyles;
