import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
const petparentformstyles = StyleSheet.create({
    parentcontainer:{
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    headerContainer: {
        paddingTop: responsiveHeight(5), // give space from top
        paddingBottom: responsiveHeight(2),
        backgroundColor: '#f5f5f5',
        zIndex: 10,
      },
      scrollContent: {
        paddingBottom: responsiveHeight(24), // space for button
      },
  positionDateTimeIcon: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        justifyContent: 'space-between',
        position: 'absolute',
        top: responsiveHeight(5),
    },
    flexGap: {
        justifyContent:'center',
        alignItems:'center',
       bottom:responsiveWidth(5)
    },
    iconColor: {
        tintColor: "#000000",
        top: responsiveHeight(0.50),
    },
    text: {
        color: "#000000",
        fontSize: 24,
        fontWeight: '600',
    },
    formSection: {
        top:responsiveHeight(4),
        padding:responsiveWidth(4),
        gap: 12,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:responsiveWidth(3),
      },
      inputWrapper: {
        flex: 1,
        gap:responsiveHeight(1)
      },
      label: {
        fontSize: 15,
        fontWeight:'600',
        color: '#000000',
     
      },
      required: {
        color: 'red',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding:responsiveWidth(3.5),
        fontSize: 14,
        backgroundColor: '#f9f9f9',
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:responsiveHeight(2),
      },
      countryCode: {
        justifyContent: 'center',
        paddingHorizontal:responsiveWidth(8),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
      },
      code: {
        fontSize: 14,
      },
    mobileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        height:responsiveHeight(5.8)
      },
      codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#f7f7f7',
        borderRightWidth: 1,
        borderColor: '#ccc',
        height: '100%',
      },
      codeText: {
        fontSize: 14,
        color: '#000',
        marginRight: 4,
      },
      dropdownIcon: {
        width:responsiveWidth(4),
        height:responsiveHeight(4),
        resizeMode: 'contain',
        tintColor: '#888',
      },
      mobileInput: {
        flex: 1,
        paddingHorizontal:responsiveWidth(8),
        fontSize: 14,
        color: '#000',
      },
      mapSize:{
        width:responsiveWidth(90),
        height: responsiveHeight(30),
        borderRadius: responsiveWidth(4),
        overflow: 'hidden', // important!
        alignSelf: 'center',
      },
      Bottomborder:{
          
          width:responsiveWidth(90),
          borderBottomWidth:1,
          borderColor:'#CACACA'
      },

      petInformationText:{
           fontSize:18,
           fontWeight:'600',
           lineHeight:18,
           letterSpacing:0,
           color:'#000000',
           marginTop:responsiveHeight(0.80)
      },
      nameText:{
          fontSize:16,
          fontWeight:'500',
          lineHeight:16,
          letterSpacing:0,
          top:responsiveHeight(0.30),
          marginTop:responsiveHeight(0.80)
      },
      TextInput:{
              width:responsiveWidth(18),
              height:responsiveHeight(3.9),
              borderRadius:responsiveWidth(2),
              borderColor:'#CACACA',
              borderWidth:1
      },

      bydefaultTextInput:{
        padding:responsiveWidth(4),
        width:responsiveWidth(90),
        height:responsiveHeight(5.1),
        borderRadius:responsiveWidth(2),
        borderColor:'#CACACA',
        borderWidth:1,
        backgroundColor:'#CACACA',
},

addressTextView:{
  gap:responsiveHeight(0.80),
  // top:responsiveHeight(1),
},

petText:{
  left:responsiveWidth(1),
  color:"#787878",
  // top:responsiveHeight(1),
  fontSize:12,
  fontWeight:'500',
  lineHeight:14
},

TextInputField:{
  width:responsiveWidth(90),
  height:responsiveHeight(5.5),
  borderWidth:1,borderColor:'#CACACA',
  borderRadius:responsiveWidth(2)

},

divideTextInputField:{
  flexDirection:'row',
  // justifyContent:'space-between',
  gap:responsiveWidth(4)
},
GapTextorlabel:{gap:responsiveHeight(1.5)},
dividedropdown: {
  // margin:8,
  height:responsiveHeight(5.5),
  width:responsiveWidth(43),
  // backgroundColor: '#EEEEEE',
  borderRadius:responsiveWidth(2),
  borderWidth:1,
  paddingHorizontal:responsiveWidth(2),
  borderColor:'#CACACA'
},

selectedTextStyle: {
  fontSize: 16,
  marginLeft: 8,
},

iconStyle: {
  width: 20,
  height: 20,
},

imageStyle: {
  width: 24,
  height: 24,
  borderRadius: 12,
},
placeholderStyle: {
  fontSize: 16,
},
      viewflex:{
              flexDirection:'row',
              justifyContent:'space-between',
      },

     flexTextAndInputField:{
              flexDirection:'row',
              gap:responsiveWidth(1)
    },

    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff', 
        padding: responsiveHeight(2),
        alignItems: 'center',
    },
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(92),
        height: responsiveHeight(5),
        borderRadius: responsiveHeight(0.8),
        backgroundColor: '#58B9D0',
    },
    nextBtnText: {
        fontSize:20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    locationAndText:{
        flexDirection:'row',
        gap:responsiveWidth(2)
    },
    selectlocationText:{
        fontSize:14,color:'#FF4B33'
    },

     dropdown: {
        // margin:8,
        height:responsiveHeight(5.5),
        width:responsiveWidth(90),
        // backgroundColor: '#EEEEEE',
        borderRadius:responsiveWidth(2),
        borderWidth:1,
        paddingHorizontal:responsiveWidth(2),
        borderColor:'#CACACA'
      },
  radioGroupContainer: {
    alignItems: 'flex-start',
  },

});

export default petparentformstyles;