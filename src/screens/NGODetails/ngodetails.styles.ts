import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const ngodetailstyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // ✅ Needed for absolute positioning to work correctly
        backgroundColor: '#fff'
    },
   userimage: {
           width: responsiveWidth(25),
           height: responsiveWidth(25),
        //    borderRadius: responsiveWidth(20), 
       },

        ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    ratingHeight: {
        top: responsiveHeight(0.2),
        width: responsiveWidth(3),
        height: responsiveHeight(1.5),
    },

    ratePointSize: {
        color: '#848484',
        fontSize: 12,
        fontWeight: '400',
    },
    menuTitleContainer: {
        width:responsiveWidth(100),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        top:responsiveHeight(9)
    },
     menuTitleAlignment: { alignItems: 'center' },
    menuBottomBoarder: {
        borderBottomWidth: responsiveWidth(0.8),
        borderColor: '#58B9D0',
        width: '210%',
        marginLeft: responsiveWidth(2),
        top: responsiveHeight(1),
    },

     commonTextColor:{ 
        color: '#58B9D0', 
        fontSize: 16, 
        fontWeight: '600' 
    },
    serviceText: { 
        color: '#A1A1A1', 
        fontSize: 16, 
        fontWeight: '600' 
    },
    reviewsText: { 
        color: '#A1A1A1', 
        fontSize: 16, 
        fontWeight: '600' 
    },

 
            // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0),
    width: '100%',
    height:responsiveHeight(8),
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
     elevation: 8, 
},
nextBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(92),
    height: responsiveHeight(5),
    borderRadius: responsiveHeight(0.80),
    top:responsiveHeight(0.30)
    // bottom:responsiveHeight(2)
    // backgroundColor: '#58B9D0',
},
nextBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
},
    divideTextInputField:{
        flexDirection:'row',
        justifyContent:'space-between',
        gap:responsiveWidth(4)
    },
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

     ButtonText:{
                 fontSize:12,
                 fontWeight:'600',
                 lineHeight:18,
                 letterSpacing:0,
                 color:'#58B9D0'
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

     selectedButtonText:{
                 fontSize:12,
                 fontWeight:'600',
                 lineHeight:18,
                 letterSpacing:0,
                 color:'#FFFFFF'
    },

     positionDateTimeIcon: {
      width: responsiveWidth(100),
      padding: responsiveWidth(4),
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: responsiveHeight(5),
  },
  flexGap: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
  },
  iconColor: {
      top: responsiveHeight(0.50),
  },
 
  trackingPositionIcon: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
      top: responsiveHeight(0.50),
  },
  trackTextColor: {
      color: "#000000",
  },
  trackIcon: {
      tintColor: "#000000",
      top: responsiveHeight(0.25),
  },



});

export default ngodetailstyles;
