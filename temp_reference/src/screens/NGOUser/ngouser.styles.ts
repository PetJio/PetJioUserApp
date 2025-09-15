import { StyleSheet } from 'react-native';
import { shadow } from 'react-native-paper';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const ngouserstyles = StyleSheet.create({
      
    container:{
                gap: responsiveHeight(3),
                height: responsiveHeight(100),
                backgroundColor: '#FFFFFF',
             },
    containerchild:{
                width: responsiveWidth(100),
                padding: responsiveWidth(4),
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: responsiveHeight(5),
                paddingHorizontal: responsiveHeight(2.5),
    },
    containerfirstsubchild:{ 
        flexDirection: 'row', 
        gap: responsiveWidth(1) 
    },
    containersecondsubchild:{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    },
    containerthirdsubchild:{ paddingHorizontal: responsiveWidth(5) },
    leftarrowicon:{ 
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    downArrowIcon:{
                 tintColor: '#000000',
                 top: responsiveHeight(0.25),
                },
    groomingText:{
                   color: '#000000',
                   fontSize: 20,
                   fontWeight: '500',
                   fontFamily: '',
            },
    locationtext:{
                  flexDirection: 'row',
                  gap: responsiveWidth(1),
                  top: responsiveHeight(0.5),
            },
    locationtextColor:{ color: '#000000' },
    onsitetext:{
                 paddingHorizontal: responsiveWidth(5),
                 paddingTop: responsiveHeight(5),
                 paddingBottom: responsiveHeight(1),
                 color: '#AAAAAA',
                 fontSize: 16,
                 fontWeight: '600',
                 lineHeight: 20,
             },
    homeservicetext:{
                paddingHorizontal: responsiveWidth(12),
                paddingTop: responsiveHeight(5),
                paddingBottom: responsiveHeight(1),
                color: '#58B9D0',
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 20,
                width: responsiveWidth(55),
                borderBottomWidth: responsiveWidth(0.5),
                borderColor: '#58B9D0',
            },
        gap:{ gap: responsiveHeight(1) },
        userTextWidth:{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: responsiveWidth(60),
                    },
       userTextgap:{
                     flexDirection: 'row',
                     gap: responsiveWidth(2.5),
                 },
    
     searchparent:{ 
            flexDirection: "row", 
            alignItems: "center", 
            gap:responsiveWidth(2),
            paddingHorizontal:responsiveHeight(2),
            top:responsiveHeight(2)
        },
        textSize:{ fontSize: 16, fontWeight: '800' },
        borderRadius:{
                      width: responsiveWidth(20.6),
                      height: responsiveHeight(2.8),
                      borderRadius: responsiveWidth(4),
                      borderWidth: 1,
                      borderColor: '#58B9D0',
                      alignItems: 'center',
                   },
        searchchild:{
           flexDirection: "row",
           alignItems: "center",
           flex: 1,
           borderRadius: 10,
           backgroundColor: "#F6F6F6",
           paddingHorizontal: responsiveHeight(2)
          
       },
        filterbtn:{
           width:responsiveWidth(11),
           height:responsiveHeight(5),
           backgroundColor: "#4494A8",
           borderRadius:responsiveHeight(1),
           justifyContent:'center',
           alignItems:'center'
        },
        textInput:{
          flex: 1,
          fontSize: 16,
          color: "#333",
          height:responsiveHeight(5)
      },
      filterIcon:{ 
        width:responsiveWidth(5), 
        height:responsiveHeight(2) 
      },
      iconMargin:{ marginRight: responsiveHeight(2)},
      
});

export default ngouserstyles;