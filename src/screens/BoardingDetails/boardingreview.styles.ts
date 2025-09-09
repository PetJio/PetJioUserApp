
import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const boardingreviewstyles = StyleSheet.create({
    
    container:{ 
        flex: 1,
        top:responsiveHeight(1),
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

    // Loading and Error States
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: responsiveWidth(5),
        marginTop: responsiveHeight(5),
    },

    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: responsiveHeight(2),
        textAlign: 'center',
    },

    // Enhanced review styles
    reviewCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: responsiveWidth(4),
        marginVertical: responsiveHeight(1),
        borderRadius: 16,
        padding: responsiveWidth(4),
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(1),
    },

    reviewerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
        flex: 1,
    },

    reviewDate: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },

    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(0.5),
    },

    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFB800',
        marginLeft: responsiveWidth(2),
    },

    reviewComment: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginTop: responsiveHeight(0.5),
    },

    noReviewsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: responsiveWidth(8),
        marginTop: responsiveHeight(5),
    },

    noReviewsIcon: {
        marginBottom: responsiveHeight(2),
    },

    noReviewsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: responsiveHeight(1),
        textAlign: 'center',
    },

    noReviewsText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default boardingreviewstyles;

