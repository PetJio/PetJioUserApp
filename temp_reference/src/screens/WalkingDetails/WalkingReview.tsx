import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import walkingreviewstyles from './walkingreview.styles';




const WalkingReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
return (
<View style={walkingreviewstyles.container}> 
<View style={walkingreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={walkingreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={walkingreviewstyles.generatedViewGap}>
              <View style={walkingreviewstyles.viewSize}>
              <View style={walkingreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={walkingreviewstyles.userImageSize}
                        />
                        <Text style={walkingreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={walkingreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={walkingreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={walkingreviewstyles.datePosition}>
                    <Text style={walkingreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

{/* Fixed Button at the Bottom */}
<View style={walkingreviewstyles.fixedButtonContainer}>
    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={walkingreviewstyles.nextBtnContainer}>
        <Text style={walkingreviewstyles.nextBtnText}>Write a review</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default WalkingReview;
