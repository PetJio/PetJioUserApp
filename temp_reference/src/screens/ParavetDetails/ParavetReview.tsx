
// import { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import images from '../../../assets/images';
// import Icons from '../../../assets/icons';
// import paravetreviewstyles from './paravetreview.styles';



// const ParavetReview: React.FC  = () => {
//     const [show, setShow] = useState<boolean>(true);

  
//     return (
// <View style={paravetreviewstyles.container}> 
// <View style={paravetreviewstyles.contentGap}> 
//     {/* Content */}
//     <ScrollView
//         contentContainerStyle={paravetreviewstyles.bottomspace} 
//         showsVerticalScrollIndicator={false}
//     >
//         {Array(100).fill(null).map((_, index) => (
//             <View key={index} style={paravetreviewstyles.generatedViewGap}>
//               <View style={paravetreviewstyles.viewSize}>
//               <View style={paravetreviewstyles.imageTextGap}>
//                     <View>
//                         <Image
//                             source={images?.UserImage}
//                             style={paravetreviewstyles.userImageSize}
//                         />
//                         <Text style={paravetreviewstyles.ratingSize}>4.8</Text>
//                     </View>
//                     <View>
//                         <Text style={paravetreviewstyles.nameText}>Kamal Sharma</Text>
//                         <Text style={paravetreviewstyles.paragraphText}>
//                             Lorem Ipsum is simply dummy text of the {"\n"}
//                             printing and typesetting industry. Lorem Ipsum {"\n"}
//                             has been the industry's standard dummy text{"\n"} ever since the 1500s.
//                         </Text>
//                     </View>
//                 </View>
//                 <View style={paravetreviewstyles.datePosition}>
//                     <Text style={paravetreviewstyles.datefontSize}>May 13, 2024</Text>
//                 </View>
//             </View>

//             </View>
//         ))}
//     </ScrollView>
// </View>


// </View>
//     );
// };

// export default ParavetReview;



import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import paravetreviewstyles from './paravetreview.styles';



const ParavetReview: React.FC  = () => {
    const [show, setShow] = useState<boolean>(true);
return (
<View style={paravetreviewstyles.container}> 
<View style={paravetreviewstyles.contentGap}> 
    {/* Content */}
    <ScrollView
        contentContainerStyle={paravetreviewstyles.bottomspace} 
        showsVerticalScrollIndicator={false}
    >
        {Array(100).fill(null).map((_, index) => (
            <View key={index} style={paravetreviewstyles.generatedViewGap}>
              <View style={paravetreviewstyles.viewSize}>
              <View style={paravetreviewstyles.imageTextGap}>
                    <View>
                        <Image
                            source={images?.UserImage}
                            style={paravetreviewstyles.userImageSize}
                        />
                        <Text style={paravetreviewstyles.ratingSize}>4.8</Text>
                    </View>
                    <View>
                        <Text style={paravetreviewstyles.nameText}>Kamal Sharma</Text>
                        <Text style={paravetreviewstyles.paragraphText}>
                            Lorem Ipsum is simply dummy text of the {"\n"}
                            printing and typesetting industry. Lorem Ipsum {"\n"}
                            has been the industry's standard dummy text{"\n"} ever since the 1500s.
                        </Text>
                    </View>
                </View>
                <View style={paravetreviewstyles.datePosition}>
                    <Text style={paravetreviewstyles.datefontSize}>May 13, 2024</Text>
                </View>
            </View>

            </View>
        ))}
    </ScrollView>
</View>

{/* Fixed Button at the Bottom */}
<View style={paravetreviewstyles.fixedButtonContainer}>
    <TouchableOpacity
        // onPress={() => navigation.navigate('HomeService')}
        style={paravetreviewstyles.nextBtnContainer}>
        <Text style={paravetreviewstyles.nextBtnText}>Write a review</Text>
    </TouchableOpacity>
</View>
</View>
    );
};

export default ParavetReview;




