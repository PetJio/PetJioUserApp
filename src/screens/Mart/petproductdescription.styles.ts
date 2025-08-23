import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const petproductdescriptionstyles = StyleSheet.create({
      container: {
                  flex:1,
                  gap: responsiveHeight(1),
                  width: responsiveWidth(100),
                  height: responsiveHeight(100),
                  backgroundColor: '#FFFFFF',
                 },

    header:{
              height:responsiveHeight(42.5),
              backgroundColor: '#F4F4F4',
    },

containerchild: {
            width: responsiveWidth(100),
            padding: responsiveWidth(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: responsiveHeight(5),
            paddingHorizontal: responsiveHeight(2.5),
        },

         containerfirstsubchild: {
                    flexDirection: 'row',
                    gap: responsiveWidth(1),
                },
            
                leftarrowicon: {
                    tintColor: '#000000',
                    top: responsiveHeight(0.5),
                },
            
                 groomingText: {
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: '500',
                    fontFamily: '',
                },
                locationtext: {
                    flexDirection: 'row',
                    gap: responsiveWidth(2),
                    top: responsiveHeight(0.5),
                },
               
            
                downArrowIcon: {
                    tintColor: '#000000',
                    bottom:responsiveHeight(0.25),
                    position:'relative',
                },

                 ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    ratingHeight: { 
        top: responsiveHeight(0.3) 
    },
    ratePointSize: {
        color: '#848484',
        fontSize: 16,
        fontWeight: '400',
    },

     downArrowAndFlexView:{
        flexDirection:'row',
        gap:responsiveWidth(0.90),
        paddingHorizontal:responsiveWidth(4)
       
    },
    percentageText:{
        fontSize:16,
        fontWeight:'400',
        lineHeight:18,
        letterSpacing:0,
        color:'#42935B'
    },
    discountamountText:{
        fontSize: 16, 
        fontWeight: '400',
        lineHeight:18, 
        textDecorationLine: 'line-through',
        color: '#5A5A5A' 
    },
    priceAmountText:{
        fontSize:16,
        fontWeight:'500',
        lineHeight:18,
        letterSpacing:0,
        color:'#000000'
    },

     dogCollorView:{
        flexDirection: 'column',
        paddingHorizontal:responsiveWidth(2),
        width:responsiveWidth(45),
        height:responsiveHeight(27),
        borderRadius:responsiveWidth(2),
        top:responsiveHeight(1.8),
        gap:responsiveHeight(0.10),
        backgroundColor: '#fff', // optional for clarity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
        zIndex: 10, // In case it's under other views
    },
    dogcollarImageSize:{
                    width: responsiveWidth(40),
                    height: responsiveHeight(17),
                    borderRadius: responsiveWidth(2),
                    marginTop: responsiveHeight(1),
    },

    loveIconPosition:{
                    position: 'absolute',
                    right: responsiveWidth(4.5),
                    top: responsiveHeight(1.5),
    },

      armyprintedDogCollarText:{
                    fontSize: 10,
                    fontWeight: '400',
                    lineHeight: 13,
                    letterSpacing: 0,
                    color: '#000000',
                    marginTop: responsiveHeight(1),
   },
   starPosition:{
                  flexDirection: 'row',
                  marginTop: responsiveHeight(0.60), 
                },

wishlistheader:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingHorizontal:responsiveWidth(5),
        // top:responsiveHeight(4),
        // position: 'absolute',
        //   top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'white',
        // paddingVertical: responsiveHeight(2),

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

export default petproductdescriptionstyles;
