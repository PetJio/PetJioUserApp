import { StyleSheet } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  searchparent: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveWidth(2)

  },
  searchchild: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: responsiveHeight(2)

  },
  filterbtn: {
    width: responsiveWidth(11),
    height: responsiveHeight(5),
    backgroundColor: "#4494A8",
    borderRadius: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: responsiveHeight(5),
    marginTop:responsiveHeight(0.70)
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    justifyContent: 'center',
    flexDirection: 'row',


  },
  image: {
    width: responsiveWidth(44),
    borderRadius: responsiveWidth(2),
    resizeMode: 'stretch',
    marginBottom: responsiveWidth(3)
  },

  cardindex: {
    flexDirection: 'column',
    width: responsiveWidth(47),
    height: responsiveHeight(100),
    //  gap:responsiveWidth(2),
    alignItems: 'center',


  },
  filterIcon: {
    width: responsiveWidth(5),
    height: responsiveHeight(2)
  }


});

export default styles;
