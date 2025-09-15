import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, ScrollView } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import styles from './styles';


const Mart: React.FC = () => {

    const naviagtion = useNavigation();

    const services = [
        { id: '1', name: 'Veterinary', image: images.serviceveterinaryImage },
        { id: '2', name: 'Grooming', image: images.GroomingService },
        { id: '3', name: 'Walking', image: images.Walking },
        { id: '4', name: 'Boarding', image: images.Boarding },
        { id: '5', name: 'ParaVet', image: images.ParaVet },
        { id: '6', name: 'Training', image: images.Training },
        { id: '7', name: 'NGO', image: images.NGOs },
    ];

    const funcName = (type: { name: string }) => {
        naviagtion.navigate(type.name as never); 
    };
    
    return (
        <View style={{ padding: responsiveWidth(4), top:responsiveHeight(4) ,gap: responsiveHeight(2),backgroundColor:'white' }}>
            <Text style={styles.text}>Services</Text>
            <View style={styles.searchparent}>
                <View style={styles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity style={styles.filterbtn}>
                   <Image source={Icons.Filter} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
               <ScrollView 
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingBottom:responsiveHeight(40)}}
               >
                            <View style={styles.card}>
                                <View style={styles.cardindex}>
                                    {services?.map((item, index) =>
                                        index % 2 !== 0 ? (
                                            <View key={index}></View>
                                        ) : (
                                            <TouchableOpacity key={index} onPress={() => funcName({ name: item.name })}>
                                                <Image source={item.image} style={styles.image} />
                                            </TouchableOpacity>
                                        )
                                    )}
                                </View>
                                <View style={styles.cardindex}>
                                    {services?.map((item, index) =>
                                        index % 2 === 0 ? (
                                            <View key={index}></View>
                                        ) : (
                                            <TouchableOpacity key={index} onPress={() => funcName({ name: item.name })}>
                                                <Image source={item.image} style={styles.image} />
                                            </TouchableOpacity>
                                        )
                                    )}
                                </View>
                            </View>
                 </ScrollView>
        </View>
    );
};

export default Mart;
