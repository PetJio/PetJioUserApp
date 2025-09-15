
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import ngoreviewstyles from './ngoreview.styles';


const NGOReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);

  
    return (
<View style={ngoreviewstyles.container}> 
<View style={ngoreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={ngoreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={ngoreviewstyles.generatedViewGap}>
              <View style={ngoreviewstyles.viewSize}>
              <View style={ngoreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={ngoreviewstyles.userImageSize}
                        />
                        <Text style={ngoreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={ngoreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={ngoreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={ngoreviewstyles.datePosition}>
                    <Text style={ngoreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>


</View>
    );
};

export default NGOReview;


