
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardingreviewstyles from './boardingreview.styles';




const BoardingReview: React.FC  = () => {
const [show, setShow] = useState<boolean>(true);
return (
<View style={boardingreviewstyles.container}> 
<View style={boardingreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={boardingreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={boardingreviewstyles.generatedViewGap}>
              <View style={boardingreviewstyles.viewSize}>
              <View style={boardingreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={boardingreviewstyles.userImageSize}
                        />
                        <Text style={boardingreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={boardingreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={boardingreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={boardingreviewstyles.datePosition}>
                    <Text style={boardingreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

{/* Fixed Button at the Bottom */}
<View style={boardingreviewstyles.fixedButtonContainer}>
    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={boardingreviewstyles.nextBtnContainer}>
        <Text style={boardingreviewstyles.nextBtnText}>Write a review</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default BoardingReview;
