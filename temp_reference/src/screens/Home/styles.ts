import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    container: {
        top: responsiveHeight(4),
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#FFFFFF',
    },
    subcontainer: { top: responsiveHeight(2), gap: responsiveWidth(2.8) },
    subcontainertextwithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(4),
    },
    IconGap: { flexDirection: 'row', gap: responsiveWidth(2.5) },
    relative: { position: 'relative' },
    positionofAlertIcon: {
        position: 'absolute',
        bottom: responsiveHeight(2.6),
        left: responsiveWidth(3),
    },
    doctoranddogimagecontainer: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(3.5),
        gap: responsiveWidth(2.2),
    },
    doctorcontainer: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(15),
        backgroundColor: '#C8F8B1',
        overflow: 'hidden',
    },
    dogcontainer: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(15),
        backgroundColor: '#FFB11F',
        overflow: 'hidden',
    },
    pluscontainer: {
        width: responsiveWidth(13),
        height: responsiveHeight(6),
        borderRadius: responsiveWidth(8),
        backgroundColor: '#F0FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondcontainer: {
        top: responsiveHeight(4.5),
        paddingHorizontal: responsiveWidth(2),
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
    },
    appointmentText: {
        fontSize: 16,
        lineHeight: 17,
        fontWeight: '500',
        color: '#000000',
    },
    showallText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#B6B6B6',
    },
    fourthcontainer: {
        top: responsiveHeight(8),
        paddingHorizontal: responsiveWidth(2),
    },
    fivethcontainer: {
      top: responsiveHeight(12),
      gap:responsiveWidth(2),
      paddingHorizontal: responsiveWidth(2),
  },

GapView:{
     gap:responsiveWidth(2),
    },
   paddingBottom:{
          
         paddingBottom:responsiveHeight(90),
    
   },

    ImageSize: {
        width: responsiveWidth(26),
        height: responsiveWidth(26),
        position: 'absolute',
        top: -responsiveWidth(1),
        left: -responsiveWidth(4.5),
        resizeMode: 'contain',
    },

    dogimageSize: {
        width: responsiveWidth(24),
        height: responsiveWidth(24),
        position: 'absolute',
        top: responsiveWidth(3),
        left: -responsiveWidth(4.5),
        resizeMode: 'contain',
    },
    dogname: {
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#373636',
        paddingHorizontal: responsiveWidth(4),
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(45),
        paddingHorizontal: responsiveWidth(0.4),
        backgroundColor: '#fff',
    },

    searchContainer: {
        top: responsiveHeight(5),
        backgroundColor: 'white',
        height: responsiveHeight(100),
        gap: responsiveHeight(2),
    },
    searchparent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(100),
        gap: responsiveWidth(2),
        paddingHorizontal: responsiveWidth(3),
    },
    searchchild: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
    },
    filterbtn: {
        width: responsiveWidth(11),
        height: responsiveHeight(5),
        backgroundColor: '#4494A8',
        borderRadius: responsiveHeight(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: responsiveHeight(5),
        marginLeft: responsiveWidth(1),
    },
    filterIcon: {
        width: responsiveWidth(5),
        height: responsiveHeight(2),
    },

    dotPosition: { position: 'relative', alignItems: 'center' },
    dots_Indicator: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        paddingHorizontal:responsiveWidth(4),
        top: responsiveHeight(1.8), // Adjust as needed
    },
    green_dot_Indicator: {
        backgroundColor: '#00809F80',
        height:6,
        width:responsiveWidth(12.5),
        borderRadius: 8,
        
    },
    white_dot_Indicator: {
        backgroundColor: '#FFFFFF',
        height: 6,
        width:responsiveWidth(12.5),
        borderRadius: 8,
       
    },
    bottomparentview: {
        position: 'absolute',
        top: responsiveHeight(13.5), // Adjust as needed
        width: responsiveWidth(100),
        alignItems: 'center',
    },
});

export default styles;
