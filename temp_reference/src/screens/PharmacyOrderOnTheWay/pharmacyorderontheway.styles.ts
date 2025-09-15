import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const pharmacyorderonthewaystyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#f5f5f5',
    },

    positionDateTimeIcon: {
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(4),
            height: responsiveHeight(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0, // Stick it to the top
            backgroundColor: '#fff', // Must-have for shadows
            elevation: 4, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            zIndex: 10, // Ensure it's above other views
        },
          flexGap: {
              flexDirection: 'row',
              gap: responsiveWidth(1),
          },
          iconColor: {
              tintColor: "#000000",
              top: responsiveHeight(0.50),
          },
          textDateTime: {
              color: "#000000",
              fontSize: 20,
              fontWeight: '500',
          },
         
        centerTitle: {
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize:responsiveWidth(4.2),
            fontWeight: '700',
            color: '#000000',
            bottom:responsiveHeight(3)
        },

          title: {
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize:responsiveWidth(3),
            fontWeight: '500',
            color: '#585858',
            top:responsiveHeight(3)
        },

         // Fixed Button
    fixedButtonContainer: {
        position: 'absolute',
        bottom:responsiveHeight(2),
        left: 0,
        right: 0,
        backgroundColor: '#fff', // Ensure visibility
        padding: responsiveHeight(2),
        alignItems: 'center',
        gap:responsiveHeight(6),
    },

      writeareviewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(92),
        height: responsiveHeight(6),
        borderRadius: responsiveHeight(0.8),
        borderWidth:responsiveWidth(0.30),
        borderColor:'#58B9D0'
    },

      writeareviewText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight:18,
        letterSpacing:0,
        color: '#4494A8',
    },
      
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(92),
        height: responsiveHeight(6),
        borderRadius: responsiveHeight(0.8),
        backgroundColor: '#58B9D0',
    },
    nextBtnText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight:18,
        letterSpacing:0,
        color: '#FFFFFF',
    },

  
  
});

export default pharmacyorderonthewaystyles;
