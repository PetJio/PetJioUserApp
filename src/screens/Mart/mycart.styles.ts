
import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const mycartstyles = StyleSheet.create({
     searchparent:{ 
            flexDirection: "row", 
            alignItems: "center",
            width:responsiveWidth(98),
            gap:responsiveWidth(2),
            paddingHorizontal:responsiveWidth(4)
        },
        searchchild:{
           flexDirection: "row",
           alignItems: "center",
           borderRadius: 10,
           backgroundColor: "#F6F6F6",  
       },
        filterbtn:{
           width:responsiveWidth(11),
           height:responsiveHeight(5),
           backgroundColor: "#4494A8",
           borderRadius:responsiveHeight(1),
           justifyContent:'center',
           alignItems:'center'
        },
        textInput:{
          flex: 1,
          fontSize: 16,
          color: "#333",
          height:responsiveHeight(5.2),
          marginLeft:responsiveWidth(3)
      },
      filterIcon:{ 
        width:responsiveWidth(5), 
        height:responsiveHeight(2) 
      },
    

       // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0),
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff', // Ensure background color to show shadow correctly
    padding: 10,
    flexDirection:'row', 
    justifyContent:'space-between', 
    gap:responsiveWidth(2),
    // bottom:responsiveHeight(6),
    paddingHorizontal:responsiveWidth(4),
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // Negative height to make shadow appear on top
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    zIndex: 10, // In case it's under other views
},
  
    booking: {
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(12.6),
        borderRadius: responsiveWidth(1.9),
        backgroundColor: '#E4FAFF'
    },
   
    confirmTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(9),
        // width: responsiveWidth(100),
    },
    
     textView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(10),
        width: responsiveWidth(100),
    },

    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(88),
        height: responsiveHeight(5),
        backgroundColor: '#58B9D0',
        marginLeft: responsiveWidth(1),
        // top: responsiveHeight(3.5),
        borderRadius:responsiveWidth(1.5)
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF'
    },

});

export default mycartstyles;
