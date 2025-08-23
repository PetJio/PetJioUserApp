
import { StyleSheet } from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';


const Trainingstyles = StyleSheet.create({
    container: { position: 'relative', alignItems: 'center' },
    headercontainer: {
        width: responsiveWidth(100),
        padding: responsiveWidth(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: responsiveHeight(5),
    },
    flexcontainer:{ flexDirection: 'row', gap: responsiveWidth(1)},
    arrowheight:{ top: responsiveHeight(0.63) },
    downarrow:{ flexDirection: 'row', gap: responsiveWidth(1), top: responsiveHeight(1) },
    WalkingText:{ color: '#FFFFFF', fontSize: 20, fontWeight: '400' },
    locationIconText:{ flexDirection: 'row', gap: responsiveWidth(1), top: responsiveHeight(1)},
    textcolor:{ color: '#FFFFFF' },
    bottomparentview:{
        position: 'absolute',
        bottom: responsiveHeight(4.5), // Adjust as needed
        width: responsiveWidth(100),
        alignItems: 'center',
      },
      book_professinal_pet_walker:{
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(65),
            height: responsiveHeight(4.2),
            borderRadius: responsiveHeight(0.8),
            backgroundColor: '#58B9D0',
            marginBottom: responsiveHeight(0.90), // Spacing
          },
          book_professinal_pet_walker_text:{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
          sanitized_equipment_position:{ justifyContent: 'center', alignItems: 'center' },
          sanitized_equipment_text:{ fontSize: 14, color: '#FFFFFF', fontWeight: '500' },
          dots_Indicator:{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: responsiveHeight(1.8), // Adjust as needed
               },
          green_dot_Indicator:{
                        backgroundColor: '#58B9D0',
                        height: 8,
                        width: 26,
                        borderRadius: 8,
                        marginHorizontal: 6,
            },
        white_dot_Indicator:{
            backgroundColor: '#FFFFFF',
            height: 8,
            width: 8,
            borderRadius: 8,
            marginHorizontal: 6,
          }




});

export default Trainingstyles;

