import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import trainerreviewstyles from './trainerreview.styles';




const TrainerReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
return (
<View style={trainerreviewstyles.container}> 
<View style={trainerreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={trainerreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={trainerreviewstyles.generatedViewGap}>
              <View style={trainerreviewstyles.viewSize}>
              <View style={trainerreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={trainerreviewstyles.userImageSize}
                        />
                        <Text style={trainerreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={trainerreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={trainerreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={trainerreviewstyles.datePosition}>
                    <Text style={trainerreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

{/* Fixed Button at the Bottom */}
<View style={trainerreviewstyles.fixedButtonContainer}>
    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={trainerreviewstyles.nextBtnContainer}>
        <Text style={trainerreviewstyles.nextBtnText}>Write a review</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default TrainerReview;
