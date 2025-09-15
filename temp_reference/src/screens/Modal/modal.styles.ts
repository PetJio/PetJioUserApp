import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const modalstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    subcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    setmodalRadious: {
        backgroundColor: 'white',
        // bottom:-15,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: responsiveHeight(40),
    },

    paddingOfNormalWalkingGroupWalking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(2),
    },

    selectText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#58B9D0',
        width: responsiveWidth(40),
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:responsiveWidth(8)
    },
    unselectText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#AAAAAA',
          width: responsiveWidth(40),
       justifyContent:'center',
        alignItems:'center',
         paddingHorizontal:responsiveWidth(8)
    },
    menuBottomBoarder: {
        borderBottomWidth: 2,
        borderColor: '#58B9D0',
        width: responsiveWidth(40),
       justifyContent:'center',
        alignItems:'center',
        paddingBottom: responsiveHeight(0.9),
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
    },
    filterIcon: {
        width: responsiveWidth(5),
        height: responsiveHeight(2),
    },



// Fixed Button
  fixedButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(0.30),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#fff', 
    padding: 10,
    marginLeft:responsiveWidth(5) 
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

dogimage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(20),
},
});

export default modalstyles;
