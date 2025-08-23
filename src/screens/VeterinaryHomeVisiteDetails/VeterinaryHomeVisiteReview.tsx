import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import veterinaryhomevisitereviewstyles from './veterinaryhomevisitereview.styles';
import VeterinaryReviewModal from '../VeterinaryReviewModal/VeterinaryReviewModal';



const VeterinaryHomeVisiteReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
    const [modalVisible,setModalVisible] = useState<boolean>(false);
return (
<View style={veterinaryhomevisitereviewstyles.container}> 
<View style={veterinaryhomevisitereviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={veterinaryhomevisitereviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={veterinaryhomevisitereviewstyles.generatedViewGap}>
              <View style={veterinaryhomevisitereviewstyles.viewSize}>
              <View style={veterinaryhomevisitereviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={veterinaryhomevisitereviewstyles.userImageSize}
                        />
                        <Text style={veterinaryhomevisitereviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={veterinaryhomevisitereviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={veterinaryhomevisitereviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={veterinaryhomevisitereviewstyles.datePosition}>
                    <Text style={veterinaryhomevisitereviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

<VeterinaryReviewModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

{/* Fixed Button at the Bottom */}
<View style={veterinaryhomevisitereviewstyles.fixedButtonContainer}>

   <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={veterinaryhomevisitereviewstyles.writeareviewContainer}>
        <Text style={veterinaryhomevisitereviewstyles.writeareviewText}>Write a review</Text>
    </TouchableOpacity>



    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={veterinaryhomevisitereviewstyles.nextBtnContainer}>
        <Text style={veterinaryhomevisitereviewstyles.nextBtnText}>Book for Consultation</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default VeterinaryHomeVisiteReview;