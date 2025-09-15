import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import veterinaryreviewstyles from './veterinaryreview.styles';
import VeterinaryReviewModal from '../VeterinaryReviewModal/VeterinaryReviewModal';



const VeterinaryReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
    const [modalVisible,setModalVisible] = useState<boolean>(false);
return (
<View style={veterinaryreviewstyles.container}> 
<View style={veterinaryreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={veterinaryreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={veterinaryreviewstyles.generatedViewGap}>
              <View style={veterinaryreviewstyles.viewSize}>
              <View style={veterinaryreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={veterinaryreviewstyles.userImageSize}
                        />
                        <Text style={veterinaryreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={veterinaryreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={veterinaryreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={veterinaryreviewstyles.datePosition}>
                    <Text style={veterinaryreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

<VeterinaryReviewModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

{/* Fixed Button at the Bottom */}
<View style={veterinaryreviewstyles.fixedButtonContainer}>

   <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={veterinaryreviewstyles.writeareviewContainer}>
        <Text style={veterinaryreviewstyles.writeareviewText}>Write a review</Text>
    </TouchableOpacity>



    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={veterinaryreviewstyles.nextBtnContainer}>
        <Text style={veterinaryreviewstyles.nextBtnText}>Book for Consultation</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default VeterinaryReview;