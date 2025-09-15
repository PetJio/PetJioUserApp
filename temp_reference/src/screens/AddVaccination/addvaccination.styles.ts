import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const addvaccinationstyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
     relative: {
          position: 'relative',
      },
      positionDateTimeIcon: {
          width: responsiveWidth(100),
          padding: responsiveWidth(4),
        //   flexDirection: 'row',
        //   justifyContent: 'space-between',
          position: 'absolute',
          top: responsiveHeight(5),
      },
      flexGap: {
          flexDirection: 'row',
          gap: responsiveWidth(1),
      },
      iconColor: {
          tintColor: "#000000",
          top: responsiveHeight(0.30),
      },
      textDateTime: {
          color: "#000000",
          fontSize:18,
          fontWeight: '500',
      },
      addvaccinText:{
        left:responsiveWidth(2.8),
        color: "#000000",
        fontSize:18,
        fontWeight: '500',
      },
      trackingPositionIcon: {
          flexDirection: 'row',
          gap: responsiveWidth(1),
          top: responsiveHeight(0.50),
      },
      trackTextColor: {
          color: "#000000",
      },
     
      GapTextorlabel:{
        gap:responsiveHeight(1.5),
        
    },
    petText:{
        left:responsiveWidth(1),
        color:"#787878",
        top:responsiveHeight(1),
        fontSize:12,
        fontWeight:'500',
        lineHeight:14
    },
    dividedropdown: {
        // margin:8,
        height:responsiveHeight(4.8),
        width:responsiveWidth(90),
        // backgroundColor: '#EEEEEE',
        borderRadius:responsiveWidth(1),
        borderWidth:1,
        paddingHorizontal:responsiveWidth(2),
        borderColor:'#CACACA'
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      bouncyCheckboxWidth:{ 
        width: responsiveWidth(90) 
    },
    borderColorandWidth:{ 
        borderColor: "#299F4D", 
        borderWidth: 2 
    },
    innerIconStyle:{ 
        borderWidth: 1 
    },
    dateBox: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
      },
      DateTimePickerStyle:{
                width:responsiveWidth(90),
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor: '#ccc',
              },


              ImageSize:{
                
                  width:responsiveWidth(90),
                  height:responsiveHeight(12),
                  borderRadius:responsiveWidth(2)
              },
              imagesetCenter:{
                marginTop: responsiveHeight(10.8),
                 justifyContent:'center',
                 alignItems:'center',
              },

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

textStyle:{
            fontSize: 8,
            fontWeight: '500',
            lineHeight: 10,
            letterSpacing: 0,
            color: '#7E7E7E',
            // right:5
        },

Gap:{
  gap:responsiveHeight(2)
},
showCenterDropdown:{
  justifyContent:'center',
  alignItems:'center',
  gap:responsiveHeight(2),
  top:responsiveHeight(1)
}



});

export default addvaccinationstyles;