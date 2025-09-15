import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    icon: {
        width: responsiveWidth(6),
        height: responsiveHeight(4),
        resizeMode: 'contain',
    },
});

export default styles;
