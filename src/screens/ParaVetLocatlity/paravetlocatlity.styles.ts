import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const paravetlocatlity = StyleSheet.create({
     searchparent:{ 
            flexDirection: "row", 
            alignItems: "center",
            width:responsiveWidth(98),
            gap:responsiveWidth(2),
            paddingHorizontal:responsiveWidth(4)
        },
        searchchild:{
           flexDirection: "row",
           alignItems: "center",
           borderRadius: 10,
           backgroundColor: "#F6F6F6",  
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
          height:responsiveHeight(5.2),
          marginLeft:responsiveWidth(3)
      },
      filterIcon:{ 
        width:responsiveWidth(5), 
        height:responsiveHeight(2) 
      }
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#f5f5f5',
    // },
    // title: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
});

export default paravetlocatlity;