import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import groomingreviewstyles from './groomingreview.styles';



const GroomingReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
return (
<View style={groomingreviewstyles.container}> 
<View style={groomingreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={groomingreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={groomingreviewstyles.generatedViewGap}>
              <View style={groomingreviewstyles.viewSize}>
              <View style={groomingreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={groomingreviewstyles.userImageSize}
                        />
                        <Text style={groomingreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={groomingreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={groomingreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={groomingreviewstyles.datePosition}>
                    <Text style={groomingreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

{/* Fixed Button at the Bottom */}
<View style={groomingreviewstyles.fixedButtonContainer}>
    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={groomingreviewstyles.nextBtnContainer}>
        <Text style={groomingreviewstyles.nextBtnText}>Write a review</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default GroomingReview;
