import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const wishlistproductstyles = StyleSheet.create({
    container: {
               flex:1,
               gap: responsiveHeight(2),
               width: responsiveWidth(100),
               height: responsiveHeight(100),
               backgroundColor: '#FFFFFF',
             
            //    top:responsiveHeight(4)
           },
            containerchild: {
            backgroundColor: '#FFFFFF',
            position:'absolute',
            zIndex:100,
            width: responsiveWidth(100),
            padding: responsiveWidth(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
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
    
         searchparent: {
            top: responsiveHeight(3),
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
            paddingHorizontal: responsiveHeight(2),
        },
    
        searchchild: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderRadius: 10,
            backgroundColor: '#F6F6F6',
            paddingHorizontal: responsiveHeight(2),
        },
         textInput: {
            flex: 1,
            fontSize: 16,
            color: '#333',
            height: responsiveHeight(5),
        },
        filterIcon: {
            width: responsiveWidth(5),
            height: responsiveHeight(2),
        },
         filterbtn: {
            width: responsiveWidth(11),
            height: responsiveHeight(5),
            backgroundColor: '#4494A8',
            borderRadius: responsiveHeight(1),
            justifyContent: 'center',
            alignItems: 'center',
        },

        petFoodView:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',  
        width:responsiveWidth(12),
        height:responsiveHeight(3.8),
        borderRadius:responsiveWidth(1),
        gap:responsiveHeight(0.90),
        top:responsiveHeight(4),
        backgroundColor: '#58B9D0', // optional for clarity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    },
    petHealthView:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',  
        width:responsiveWidth(17),
        height:responsiveHeight(3.8),
        borderWidth:1,
        borderColor:"#EDEDED",
        borderRadius:responsiveWidth(1),
        backgroundColor:'#FFF',
        gap:responsiveHeight(0.90),
        top:responsiveHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    },

    petAccessroriesView:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',  
        width:responsiveWidth(25),
        height:responsiveHeight(3.8),
        borderWidth:1,
        borderColor:'#EDEDED',
        borderRadius:responsiveWidth(1),
        gap:responsiveHeight(0.90),
        top:responsiveHeight(4),
        backgroundColor: '#fff', // optional for clarity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    },

    othersView:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',  
        width:responsiveWidth(14),
        height:responsiveHeight(3.8),
        borderWidth:1,
        borderColor:'#EDEDED',
        borderRadius:responsiveWidth(1),
        gap:responsiveHeight(0.90),
        top:responsiveHeight(4),
        backgroundColor: '#fff', // optional for clarity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    },

starPosition:{
                  flexDirection: 'row',
                  marginTop: responsiveHeight(0.60), 
                },
                   downArrowAndFlexView:{
        flexDirection:'row',
        gap:responsiveWidth(0.90),
        marginTop: responsiveHeight(0.70)
    },
    percentageText:{
        fontSize:10,
        fontWeight:'400',
        lineHeight:13,
        letterSpacing:0,
        color:'#42935B'
    },
    discountamountText:{
        fontSize: 10, 
        fontWeight: '400', 
        textDecorationLine: 'line-through',
        color: '#5A5A5A' 
    },
    priceAmountText:{
        fontSize:10,
        fontWeight:'500',
        lineHeight:13,
        letterSpacing:0,
        color:'#000000'
    },
     wishlistheader:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingHorizontal:responsiveWidth(5),
        top:responsiveHeight(4),
        // position: 'absolute',
        //   top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'white',
        // paddingVertical: responsiveHeight(2),

    },

      dogCollorView:{
        flexDirection: 'column',
        paddingHorizontal:responsiveWidth(2),
        width:responsiveWidth(45),
        height:responsiveHeight(27),
        borderRadius:responsiveWidth(2),
        top:responsiveHeight(4),
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
});

export default wishlistproductstyles;