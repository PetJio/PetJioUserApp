import { StyleSheet, Platform } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    // Sticky Header Styles - Compact version
    stickyHeader: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E8EBF0',
    },
    
    headerTitleContainer: {
        flex: 1,
    },
    
    stickyHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1D29',
        marginBottom: 1,
    },
    
    stickyHeaderSubtitle: {
        fontSize: 12,
        color: '#666',
        fontWeight: '400',
    },
    
    headerIcons: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
    },
    
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(4),
    },
    subcontainer: { top: responsiveHeight(2), gap: responsiveWidth(2.8) },
    
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
    
    petsContainer: {
        paddingHorizontal: responsiveWidth(4),
        marginBottom: responsiveHeight(2),
        marginTop: responsiveHeight(1.5),
    },
    
    // Enhanced pets section header styles - Compact
    petsSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(0.5),
    },
    
    petsSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1D29',
        letterSpacing: 0.3,
    },
    
    petsSectionSubtitle: {
        fontSize: 11,
        fontWeight: '400',
        color: '#666',
        marginTop: responsiveHeight(0.1),
    },
    
    addPetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#58B9D0',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(0.8),
        borderRadius: responsiveWidth(4),
        shadowColor: '#58B9D0',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    
    addPetButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: responsiveWidth(1),
    },
    
    petsDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: responsiveWidth(0.5),
        gap: responsiveWidth(3),
    },
    
    petCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(3),
        padding: responsiveWidth(2.5),
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: responsiveHeight(1.5),
        width: responsiveWidth(43),
        minHeight: responsiveHeight(16),
        position: 'relative',
        overflow: 'hidden',
    },
    
    petCardGradient: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(4),
    },
    
    petImageContainer: {
        position: 'relative',
        borderRadius: responsiveWidth(8),
        padding: responsiveWidth(0.8),
        marginBottom: responsiveHeight(0.6),
        width: responsiveWidth(16),
        height: responsiveWidth(16),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    
    petImage: {
        width: responsiveWidth(14),
        height: responsiveWidth(14),
        borderRadius: responsiveWidth(7),
        backgroundColor: '#F8F9FB',
        resizeMode: 'cover',
    },
    
    petStatusIndicator: {
        position: 'absolute',
        bottom: responsiveWidth(1.5),
        right: responsiveWidth(1.5),
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(3),
        padding: responsiveWidth(0.5),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    
    petStatusDot: {
        width: responsiveWidth(2),
        height: responsiveWidth(2),
        borderRadius: responsiveWidth(1),
        backgroundColor: '#4CAF50',
    },
    
    petInfoContainer: {
        alignItems: 'center',
        width: '100%',
        paddingTop: responsiveHeight(0.5),
    },
    
    petName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A1D29',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.1),
    },
    
    petInfo: {
        fontSize: 9,
        fontWeight: '500',
        color: '#58B9D0',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.2),
        textTransform: 'capitalize',
    },
    
    petAgeInfo: {
        fontSize: 7,
        fontWeight: '400',
        color: '#999',
        textAlign: 'center',
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        paddingHorizontal: responsiveWidth(1.5),
        paddingVertical: responsiveHeight(0.2),
        borderRadius: responsiveWidth(2),
        marginTop: responsiveHeight(0.1),
        overflow: 'hidden',
    },
    
    emptyPetCard: {
        borderColor: 'rgba(88, 185, 208, 0.2)',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(88, 185, 208, 0.02)',
    },
    
    emptyPetImageContainer: {
        backgroundColor: 'rgba(88, 185, 208, 0.05)',
    },
    
    emptyPetSlot: {
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    emptyPetText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#58B9D0',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.1),
    },
    
    emptyPetSubtext: {
        fontSize: 9,
        fontWeight: '400',
        color: '#999',
        textAlign: 'center',
    },
    
    defaultPetImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(4),
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(3),
        marginTop: responsiveHeight(1),
    },
    
    loadingText: {
        marginTop: responsiveHeight(1),
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    
    errorContainer: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(4),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(3),
        marginTop: responsiveHeight(1),
        borderWidth: 1,
        borderColor: '#FFE5E5',
    },
    
    errorText: {
        fontSize: 14,
        color: '#FF6B6B',
        textAlign: 'center',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
    },
    
    retryButton: {
        backgroundColor: '#58B9D0',
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(1),
        borderRadius: responsiveWidth(2),
    },
    
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    subcontainertextwithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(4),
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: 0,
    },
    IconGap: { 
        flexDirection: 'row', 
        gap: responsiveWidth(2.5) 
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
        borderWidth: responsiveWidth(0.3),
        borderColor: '#58B9D0',
        marginTop: responsiveHeight(0.5),
    },
    ImageSize: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(7.5),
    },
    dogimageSize: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(7.5),
    },
    dogname: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0,
        color: '#000000',
        textAlign: 'center',
        marginTop: responsiveHeight(0.5),
    },
    secondcontainer: {
        top: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(5),
    },
    fourthcontainer: {
        top: responsiveHeight(8),
        paddingHorizontal: responsiveWidth(5),
    },
    fivethcontainer: {
        top: responsiveHeight(12),
        paddingHorizontal: responsiveWidth(5),
        paddingBottom: responsiveHeight(5),
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    appointmentText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: 0,
    },
    showallText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#58B9D0',
        letterSpacing: 0,
    },
    dots_Indicator: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    green_dot_Indicator: {
        width: responsiveWidth(2),
        height: responsiveWidth(2),
        borderRadius: responsiveWidth(1),
        backgroundColor: '#58B9D0',
    },
    white_dot_Indicator: {
        width: responsiveWidth(2),
        height: responsiveWidth(2),
        borderRadius: responsiveWidth(1),
        backgroundColor: '#D1D5DB',
    },
    bottomparentview: {
        position: 'absolute',
        top: responsiveHeight(13.5),
        width: responsiveWidth(100),
        alignItems: 'center',
    },
    GapView: {
        gap: responsiveHeight(2),
    },
    paddingBottom: {
        paddingBottom: responsiveHeight(2),
    },
    positionofAlertIcon: {
        position: 'absolute',
        bottom: responsiveHeight(2.6),
        left: responsiveWidth(3),
    },
    doctoranddogimagecontainer: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(3.5),
        gap: responsiveWidth(2.2),
        paddingTop: responsiveHeight(1),
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
