import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const groomingreviewstyles = StyleSheet.create({
    
    container:{ 
        flex: 1,
        top:responsiveHeight(3),
    },

    contentGap:{ 
        gap: responsiveHeight(2), 
        flex: 1 
    },

    // Ensures enough space for the fixed button
     bottomspace:{ 
        paddingBottom: responsiveHeight(12) 
    },

    generatedViewGap:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: responsiveHeight(2),
        top:responsiveHeight(1) 
    },
  
    viewSize:{
               flexDirection: 'row',
               width: responsiveWidth(92),
               height: responsiveHeight(12.5),
               borderRadius: responsiveWidth(1.5),
               borderWidth: 1,
               borderColor: '#CACACA',
               padding: responsiveWidth(2),
               overflow: 'hidden',
               justifyContent: 'space-between', 
             },

    imageTextGap:{ 
        flexDirection: 'row', 
        gap: responsiveWidth(2) 
    },

    userImageSize:{
                     width: responsiveWidth(7),
                     height: responsiveHeight(4),
                     borderRadius: responsiveWidth(20),
            },
       ratingSize:{ 
        color: '#848484', 
        fontSize: 14, 
        fontWeight: '500' 
    },

    nameText:{ 
        color: '#000000', 
        fontSize: 16, 
        fontWeight: '600' 
    },
  
  paragraphText:{ 
    fontSize: 12 
},

datePosition:{ 
    justifyContent: 'flex-start',
    right:responsiveWidth(4) 
},

datefontSize:{ 
    fontSize: 10 
},
    imagesize: {
        width: responsiveWidth(100),
        height: responsiveHeight(25.7),
    },
    relativepostion: { position: 'relative' },
    absoluteposition: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: responsiveHeight(5),
    },
    tintColor: { tintColor: '#FFFFFF' },
    containersecondsubchild: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: responsiveHeight(6),
    },
    onsitetext: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#AAAAAA',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
    },

    homeservicetext: {
        paddingHorizontal: responsiveWidth(12),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#58B9D0',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        width: responsiveWidth(50),
        borderBottomWidth: responsiveWidth(0.5),
        borderColor: '#58B9D0',
    },

    center: { justifyContent: 'center', alignItems: 'center' },
    button: {
        width: responsiveWidth(92),
        height: responsiveHeight(5.4),
        borderRadius: responsiveHeight(0.9),
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContinueText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
    // Fixed Button
    fixedButtonContainer: {
        position: 'absolute',
        bottom:responsiveHeight(2),
        left: 0,
        right: 0,
        backgroundColor: '#fff', // Ensure visibility
        padding: responsiveHeight(2),
        alignItems: 'center',
    },
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(92),
        height: responsiveHeight(5),
        borderRadius: responsiveHeight(0.8),
        backgroundColor: '#58B9D0',
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
    },
});

export default groomingreviewstyles;
