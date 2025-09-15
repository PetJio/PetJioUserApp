
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const dogadoptionscreeningformstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
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

    relative: {
        position: 'relative',
    },
    selectDateText: {
        padding: responsiveWidth(5),
        top: responsiveHeight(1.5),
        color: "#000000",
        fontSize: 16,
        fontWeight: '600',
    },
    
     flexGap: {
         flexDirection: 'row',
         gap: responsiveWidth(1),
     },
     iconColor: {
         tintColor: "#000000",
          top: responsiveHeight(2.3),
     },
     textDateTime: {
         color: "#000000",
         fontSize: 20,
         fontWeight: '500',
         top: responsiveHeight(1.8),
     },

     calendarPosition: {
         top: responsiveHeight(11),
         paddingHorizontal: responsiveWidth(3),
     },
     dropdown: {
        // margin:8,
        height:responsiveHeight(4.8),
        width:responsiveWidth(90),
        // backgroundColor: '#EEEEEE',
        borderRadius:responsiveWidth(1),
        borderWidth:1,
        paddingHorizontal:responsiveWidth(2),
        borderColor:'#CACACA'
      },
      dividedropdown: {
        // margin:8,
        height:responsiveHeight(4.8),
        width:responsiveWidth(43),
        // backgroundColor: '#EEEEEE',
        borderRadius:responsiveWidth(1),
        borderWidth:1,
        paddingHorizontal:responsiveWidth(2),
        borderColor:'#CACACA'
      },
      imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },

    dropdownMarginTop:{
        marginTop:responsiveHeight(10.5),
        // justifyContent:'center',
        // alignItems:'center',
        gap:responsiveHeight(1),
        paddingBottom:responsiveHeight(90),
        // zIndex:10
    },
    petText:{
        left:responsiveWidth(1),
        color:"#787878",
        top:responsiveHeight(1),
        fontSize:12,
        fontWeight:'500',
        lineHeight:14
    },
    descriptionText:{
      left:responsiveWidth(1),
        color:"#444444",
        top:responsiveHeight(2),
        fontSize:12,
        fontWeight:'500',
        lineHeight:14
    },
    divideTextInputField:{flexDirection:'row',justifyContent:'space-between',gap:responsiveWidth(4)},
    GapTextorlabel:{gap:responsiveHeight(1.5)},
    addressTextView:{
            gap:responsiveHeight(1.5),
            top:responsiveHeight(1),
    },
    DivideTextInputField:{width:responsiveWidth(43),height:responsiveHeight(4.5),borderWidth:1,borderColor:'#CACACA',borderRadius:responsiveWidth(1)},
    TextInputField:{width:responsiveWidth(90),height:responsiveHeight(4.5),borderWidth:1,borderColor:'#CACACA',borderRadius:responsiveWidth(1)},
    TreatsTextInputField:{width:responsiveWidth(90),height:responsiveHeight(9),borderWidth:1,borderColor:'#CACACA',borderRadius:responsiveWidth(1)},
    borderRadiousBtn:{
           justifyContent:'center',
           alignItems:'center',
           width:responsiveWidth(43),
           height:responsiveHeight(4.8),
           top:responsiveHeight(1),
           borderRadius:responsiveWidth(2),
           borderWidth:1,
           borderColor:'#CACACA',
           backgroundColor:"#FFFFFF"
    },
   
    selectedborderRadiousBtn:{
           justifyContent:'center',
           alignItems:'center',
           width:responsiveWidth(43),
           height:responsiveHeight(4.8),
           top:responsiveHeight(1),
           borderRadius:responsiveWidth(2),
           borderWidth:1,
           borderColor:'#58B9D0',
           backgroundColor:'#58B9D0'
    },

    ButtonText:{
                 fontSize:12,
                 fontWeight:'600',
                 lineHeight:18,
                 letterSpacing:0,
                 color:'#58B9D0'
    },

    selectedButtonText:{
                 fontSize:12,
                 fontWeight:'600',
                 lineHeight:18,
                 letterSpacing:0,
                 color:'#FFFFFF'
    },
    vaccinationView:{
      justifyContent:'center',
      shadowColor: '#000', // Shadow color
      shadowOffset: { width: 0, height: 4 }, // Shadow only at the bottom (height controls vertical offset)
      shadowOpacity: 0.3, // Shadow opacity
      shadowRadius: 4, // Shadow blur radius
      elevation: 5, // Elevation for Android shadow
      borderRadius:responsiveWidth(1.8),
      width:responsiveWidth(90),
      height:responsiveHeight(7),
      backgroundColor:'#FFFFFF',
      paddingHorizontal:responsiveWidth(4),
     
    },


      // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(3),
    width: '100%',
    alignItems: 'center',
},
nextBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(92),
    height: responsiveHeight(5),
    borderRadius: responsiveHeight(0.80),
    // backgroundColor: '#58B9D0',
},
nextBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
},


});

export default dogadoptionscreeningformstyles;
