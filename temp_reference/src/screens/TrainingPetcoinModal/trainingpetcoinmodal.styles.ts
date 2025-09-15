import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const trainingpetcoinmodalstyles = StyleSheet.create({
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

    modalRadiousView: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        minHeight: responsiveHeight(22),
    },

    input: {
    borderWidth: 1,
    borderColor: '#9A9A9A',
    borderRadius:responsiveWidth(1),
    padding:responsiveHeight(1.5),
    // marginTop:responsiveHeight(2),
    marginBottom:responsiveWidth(5),
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#5DC4E1',
    paddingVertical:responsiveHeight(1),
    borderRadius:responsiveWidth(6),
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  radioContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    right:responsiveWidth(4),
    gap:responsiveWidth(8) 
  },

  GapView:{
    gap:responsiveHeight(1.5),
    marginTop:responsiveHeight(1.5)
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


});

export default trainingpetcoinmodalstyles;