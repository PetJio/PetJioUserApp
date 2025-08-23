import { StyleSheet } from 'react-native';
import { responsiveWidth,responsiveHeight,} from 'react-native-responsive-dimensions';
const boardingbookingstyles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
   mapImage: {
   width:responsiveWidth(100),
   height: responsiveHeight(100), 
   position: 'relative', 
},

 invoiceandcancelview: {
        justifyContent:'center',
        alignItems:'center',
        top: responsiveHeight(1),

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

 invoicetext: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18,
        color: '#58B9D0'
    },

    cancelbooking: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(36),
        height: responsiveHeight(3.8),
        borderWidth: responsiveWidth(0.20),
        borderRadius: responsiveWidth(0.99),
        borderColor: '#4494A8',
        backgroundColor: '#58B9D0',
    },

     cancelbookingtext: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18,
        color: '#FFFFFF'

    },

  flexview: {
        flexDirection: 'row',
        gap: responsiveWidth(2.8),
        // bottom:responsiveHeight(2)
        // left: responsiveWidth(12)
    },

 remainderTextIconView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: responsiveWidth(2)
    },
    remainderText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#7E7A7A',
        lineHeight: 17,
        letterSpacing: 0
    },
    centercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(1),
        top: responsiveHeight(2.5),
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
        marginLeft: responsiveWidth(6),
        top: responsiveHeight(3.5),
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
      bottom: responsiveHeight(6),
      width: '100%',
      alignItems: 'center',
  },
  imagesize: {
        justifyContent: 'center',
        alignItems: 'center',
        // top: responsiveHeight(10),
        width: responsiveWidth(24),
        height: responsiveHeight(16),
        resizeMode: 'contain',
        left:responsiveWidth(4)
    },

   bookingView: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom:responsiveHeight(1)
        // top: responsiveHeight(10),
    },
    booking: {
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(12.6),
        borderRadius: responsiveWidth(1.9),
        backgroundColor: '#E4FAFF'
    },
    bookingIDText: {
        marginTop: responsiveHeight(1.8),
        fontSize:14,
        fontWeight: '700',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#000000'
    },
    bookingInformationText: {
        marginTop: responsiveHeight(1.5),
        fontSize:14,
        fontWeight: '600',
        lineHeight: 18,
        letterSpacing: 0,
        color: '#4494A8',
        paddingHorizontal: responsiveWidth(8)
    },
    date: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 18,
        letterSpacing: 0,
        color: '#4494A8',
        paddingHorizontal: responsiveWidth(8)
    },

    confirmTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(9),
        // width: responsiveWidth(100),
    },
     text: {
        fontSize:12,
        fontWeight: '600',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#898989'
    },

     textView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(10),
        width: responsiveWidth(100),
    },
    confirmText: {
        fontSize:18,
        fontWeight: '900',
        lineHeight: 26,
        letterSpacing: 0,
        color: '#0D4A59'
    },


});

export default boardingbookingstyles;