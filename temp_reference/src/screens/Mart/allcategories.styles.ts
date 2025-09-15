import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const allcategoriesstyles = StyleSheet.create({
    container: {
               flex:1,
               gap: responsiveHeight(2),
               width: responsiveWidth(100),
               height: responsiveHeight(100),
               backgroundColor: '#FFFFFF',
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
        width:responsiveWidth(19),
        height:responsiveHeight(3.8),
        borderRadius:responsiveWidth(2),
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
    petHealthView:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',  
        width:responsiveWidth(20),
        height:responsiveHeight(4.8),
        borderRadius:responsiveWidth(2),
        backgroundColor:'#58B9D0',
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
        width:responsiveWidth(20),
        height:responsiveHeight(3.8),
        borderRadius:responsiveWidth(2),
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
        width:responsiveWidth(18),
        height:responsiveHeight(3.6),
        borderRadius:responsiveWidth(2),
        gap:responsiveHeight(0.90),
        top:responsiveHeight(4),
        backgroundColor: '#fff', // optional for clarity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    }
});

export default allcategoriesstyles;