import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';

const boardingaboutstyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: responsiveHeight(2.5),
        marginTop: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        paddingBottom: responsiveHeight(2),
    },
    bioText: { 
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: responsiveHeight(1),
    },
    paragraphText: { 
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#6C6B6B',
    },
    languageJobText: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: responsiveWidth(4),
        gap: responsiveHeight(2),
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    expertiseText: { marginLeft: responsiveWidth(4) },
    setGap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
        top: responsiveHeight(0.5),
    },
    DigitBorder: {
        width: responsiveWidth(11.3),
        height: responsiveHeight(7.5),
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: responsiveHeight(0.9),
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    selectedDate: {
        backgroundColor: '#58B9D0',
        width: responsiveWidth(11.3),
        height: responsiveHeight(7.5),
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: responsiveHeight(0.9),
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },

    text:{ 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#1A1D29',
        marginBottom: responsiveHeight(0.5),
    },

    Text:{ 
        fontSize: 13, 
        fontWeight: '500', 
        color: '#58B9D0',
        lineHeight: 18,
    },
 
   commonText:{
    fontSize:12,
    fontWeight:'400',
    lineHeight:18,
    letterSpacing:0,
    color:'#6C6B6B'
},

mealCareOutSide:{
    fontSize:8,
    fontWeight:'400',
    lineHeight:10,
    letterSpacing:0,
    color:'#4494A8'
},

Gap:{
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: responsiveWidth(4),
    gap: responsiveHeight(1.5),
    borderWidth: 1,
    borderColor: '#E8EBF0',
},
imageTextGap:{
    flexDirection:'row',
    alignItems: 'center',
    gap: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
},
viewGap:{
    flexDirection:'row',
    justifyContent: 'space-around',
    gap: responsiveWidth(2),
},
mealCareOutsideImageTextGap:{
    alignItems: 'center',
    gap: responsiveHeight(0.5),
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
facilityGap:{
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: responsiveWidth(4),
    gap: responsiveHeight(1.5),
    borderWidth: 1,
    borderColor: '#E8EBF0',
}
   
});

export default boardingaboutstyles;

