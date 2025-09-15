import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
const petwarriorstyles = StyleSheet.create({
    parentcontainer:{
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    addressTextView:{
     gap:responsiveHeight(0.80),
  // top:responsiveHeight(1),
},
 nameText:{
          fontSize:16,
          fontWeight:'500',
          lineHeight:16,
          letterSpacing:0,
          top:responsiveHeight(0.30),
          marginTop:responsiveHeight(0.80)
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

 ServicesProvidedText:{
          fontSize:18,
          fontWeight:'600',
          lineHeight:18,
          letterSpacing:0,
          top:responsiveHeight(0.30),
          marginTop:responsiveHeight(0.80)
      },



  checkboxcontainer: { 
    top:responsiveHeight(2),
    padding:responsiveWidth(2) 
  },
  title: { 
    fontWeight: 'bold', 
    bottom: responsiveHeight(2),
    fontSize:14 
  },
  checkboxrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkbox: {
    bottom: responsiveHeight(0.90),
    marginRight: 6,
  },
  servicesproviderText:{
            fontSize:15,
            fontWeight:'500',
            color:'#000000',
            bottom:responsiveHeight(1)
  }

});

export default petwarriorstyles;