import { StyleSheet, Platform } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { FONT_SIZES } from '../../constants/dimensions';
import { typography } from '../../styles/typography';

const styles = StyleSheet.create({
    // Sticky Header Styles
    stickyHeader: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
    },
    
    headerTitleContainer: {
        flex: 1,
    },
    
    stickyHeaderTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: typography.fontWeight.bold,
        color: '#1A1D29',
        marginBottom: 2,
    },
    
    stickyHeaderSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: '#666',
        fontWeight: typography.fontWeight.medium,
    },
    
    headerIcons: {
        flexDirection: 'row',
        gap: responsiveWidth(2.5),
    },
    
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    subcontainer: { top: responsiveHeight(2), gap: responsiveWidth(2.8) },
    subcontainertextwithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(4),
    },
    IconGap: { flexDirection: 'row', gap: responsiveWidth(2.5) },
    iconButton: {
        padding: responsiveWidth(1),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    relative: { position: 'relative' },
    positionofAlertIcon: {
        position: 'absolute',
        top: -2,
        right: -2,
    },
    alertDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
        borderWidth: 1,
        borderColor: '#FFFFFF',
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
    
    // New Pet Section Styles
    petsContainer: {
        paddingHorizontal: responsiveWidth(3.5),
        marginBottom: responsiveHeight(2),
    },
    
    petsDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: responsiveWidth(2),
        flexWrap: 'wrap',
    },
    
    petCard: {
        alignItems: 'center',
        marginHorizontal: responsiveWidth(1),
        marginVertical: responsiveHeight(0.5),
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(4),
        padding: responsiveWidth(3),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        minWidth: responsiveWidth(20),
        maxWidth: responsiveWidth(25),
    },
    
    petImageContainer: {
        position: 'relative',
        borderRadius: responsiveWidth(12),
        padding: responsiveWidth(1),
        marginBottom: responsiveHeight(1),
    },
    
    petImage: {
        width: responsiveWidth(16),
        height: responsiveWidth(16),
        borderRadius: responsiveWidth(8),
        backgroundColor: '#F8F9FB',
    },
    
    petStatusIndicator: {
        position: 'absolute',
        bottom: responsiveWidth(1),
        right: responsiveWidth(1),
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(2.5),
        padding: responsiveWidth(0.5),
        elevation: 2,
    },
    
    petStatusDot: {
        width: responsiveWidth(1.5),
        height: responsiveWidth(1.5),
        borderRadius: responsiveWidth(0.75),
        backgroundColor: '#4CAF50',
    },
    
    petName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A1D29',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.3),
    },
    
    petInfo: {
        fontSize: 9,
        fontWeight: '400',
        color: '#666',
        textAlign: 'center',
    },
    
    emptyPetCard: {
        backgroundColor: 'rgba(248, 249, 251, 0.8)',
        borderWidth: 1,
        borderColor: '#E8EBF0',
        borderStyle: 'dashed',
    },
    
    emptyPetImageContainer: {
        backgroundColor: 'transparent',
    },
    
    emptyPetSubtext: {
        fontSize: 8,
        fontWeight: '400',
        color: '#999',
        textAlign: 'center',
        marginTop: responsiveHeight(0.2),
    },
    
    
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsiveHeight(8),
    },
    
    loadingText: {
        marginTop: responsiveHeight(1),
        fontSize: FONT_SIZES.md,
        color: '#666',
        fontWeight: typography.fontWeight.medium,
    },
    
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsiveHeight(8),
        paddingHorizontal: responsiveWidth(5),
    },
    
    errorText: {
        marginTop: responsiveHeight(1),
        fontSize: FONT_SIZES.md,
        color: '#FF6B6B',
        fontWeight: typography.fontWeight.medium,
        textAlign: 'center',
        marginBottom: responsiveHeight(2),
    },
    
    retryButton: {
        backgroundColor: '#58B9D0',
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(1.5),
        borderRadius: responsiveWidth(6),
    },
    
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.semibold,
    },
    
    defaultPetImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(88, 185, 208, 0.3)',
    },
    
    emptyPetSlot: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(204, 204, 204, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 0.3)',
        borderStyle: 'dashed',
    },
    
    emptyPetText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.3),
    },
});

export default styles;
