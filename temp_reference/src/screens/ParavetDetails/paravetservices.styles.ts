import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';

const paravetservicestyles = StyleSheet.create({
    container: {
           flex:1,
           gap: responsiveHeight(2),
           top: responsiveHeight(2),
       },

imageSize:{
    width:responsiveWidth(44),
    height:responsiveHeight(16),
    borderRadius:responsiveWidth(3)
},

treatmentText:{
    fontSize:12,
    fontWeight:'600',
    lineHeight:17,
    letterSpacing:0,
    color:'#000000'
},

timeText:{
    fontSize:8,
    fontWeight:'500',
    letterSpacing:0,
    lineHeight:12,
    color:'#A0A0A0'
},

paravetText:{
     fontSize:9,
     fontWeight:'500',
     fontStyle: 'italic',
     lineHeight:18,
     letterSpacing:0,
     color:'#8D8A8A'
},

textIconFlex:{
    flexDirection:'row',
    justifyContent:'space-between', 
    width:responsiveWidth(44),
    marginTop:responsiveHeight(1)
},
WhiteBiPlusIconBackgroundcolor:{
    justifyContent:'center',  
    alignItems:'center', 
    width:responsiveWidth(7),
    height:responsiveHeight(3.2),
    borderRadius:responsiveWidth(8),
    backgroundColor:'#58B9D0'
},
serviceSmallBreedIconflex:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:responsiveWidth(4)
},
serviceText:{
    fontSize:16,
    fontWeight:'600',
    lineHeight:16,
    letterSpacing:0,
    color:'#000000'
},

smallbreedText:{
    fontSize:10,
    fontWeight:'500',
    lineHeight:12,
    letterSpacing:0,
    color:'#898989'
},

GapTowerIcon:{
    flexDirection: 'row',  
    gap: responsiveWidth(1.5)
},
     // Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(2),
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
});

export default paravetservicestyles;