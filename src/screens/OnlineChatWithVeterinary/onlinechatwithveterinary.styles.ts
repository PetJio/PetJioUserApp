import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
const onlinechatwithveterinarystyles = StyleSheet.create({
    container: {
        flex: 1,
        width:responsiveWidth(100),
        height:responsiveHeight(100), 
    },
    imageSize:{
        width:responsiveWidth(9),
        height:responsiveWidth(9),
        borderRadius:responsiveWidth(9),
        top:responsiveHeight(2)  
    },

    doctorImageSize:{
        width:responsiveWidth(9),
        height:responsiveWidth(9),
        borderRadius:responsiveWidth(9),
        
    },


    viewFlex:{
        flexDirection:'row',
        gap:responsiveWidth(2)
    },

   goldenRetriverImageSize:{
        width:responsiveWidth(45),
        height:responsiveWidth(25),
        borderRadius:responsiveWidth(1),
        borderWidth:responsiveWidth(0.50),
        borderColor:'#58B9D0',
       
   },


    onlineText:{
        fontSize:12,
        fontWeight:'400',
        lineHeight:16,
        letterSpacing:0,
        color:'#7C7C7C',
        bottom:responsiveHeight(0.55)
    },

      positionDateTimeIcon: {
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(4),
        height: responsiveHeight(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0, // Stick it to the top
        backgroundColor: '#fff', // Must-have for shadows
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        zIndex: 10, // Ensure it's above other views
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
      trackIcon: {
          tintColor: "#000000",
          top: responsiveHeight(0.25),
      },




        // Fixed Button
    fixedButtonContainer: {
        position: 'absolute',
        bottom:responsiveHeight(0),
        left: 0,
        right: 0,
        backgroundColor: '#fff', // Ensure visibility
        padding: responsiveHeight(3),
        borderTopStartRadius:responsiveWidth(2.5),
        borderTopEndRadius:responsiveWidth(2.5),
        alignItems: 'center',
        gap:responsiveHeight(1)
    },

      writeareviewContainer: {
        justifyContent:'center',
        paddingHorizontal:responsiveWidth(2),
        width: responsiveWidth(92),
        height: responsiveHeight(6),
        borderRadius: responsiveHeight(0.4),
        borderWidth:responsiveWidth(0.20),
        borderColor:'#B0B0B0'
    },

      writeareviewText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight:18,
        letterSpacing:0,
        color: '#8D8D8D',
    },


    inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(92),
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(0.4),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#B0B0B0',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: responsiveWidth(2), // If gap doesn't work, use marginRight on icons
  },
  icon: {
    width: responsiveWidth(5),  // adjust based on your icon size
    height: responsiveWidth(5),
    resizeMode: 'contain',
  },
      
   
});

export default onlinechatwithveterinarystyles;
