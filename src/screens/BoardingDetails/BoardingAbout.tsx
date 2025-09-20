import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardingaboutstyles from './boardingabout.styles';
import BoardingModal from '../BoardingModal/BoardingModal';

interface BoardingAboutProps {
  serviceDetails?: any;
}

const BoardingAbout: React.FC<BoardingAboutProps> = ({ serviceDetails }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Extract data from API or use defaults to match reference
  const description =
    serviceDetails?.description ||
    'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.';

  const providerName = serviceDetails?.user
    ? `${serviceDetails.user.firstName || ''} ${
        serviceDetails.user.lastName || ''
      }`.trim()
    : 'Kiara';

  return (
    <View style={boardingaboutstyles.container}>
      <View>
        <Text style={boardingaboutstyles.bioText}>Bio</Text>
        <Text style={boardingaboutstyles.paragraphText}>{description}</Text>
      </View>

      <View style={boardingaboutstyles.languageJobText}>
        <View>
          <Text style={boardingaboutstyles.text}> Bookings completed </Text>
          <Text style={boardingaboutstyles.Text}> 20+ Bookings</Text>
        </View>

        <View>
          <Text style={boardingaboutstyles.text}> Services Offered </Text>
          <Text style={boardingaboutstyles.Text}>
            {' '}
            Pet Boarding & Pet Walking
          </Text>
        </View>

        <View style={boardingaboutstyles.Gap}>
          <Text style={boardingaboutstyles.text}> {providerName}'s Home </Text>
          <View style={boardingaboutstyles.imageTextGap}>
            <Image source={Icons.PiBuildingApartment} />
            <Text style={boardingaboutstyles.commonText}>
              Lives in an apartment
            </Text>
          </View>
          <View style={boardingaboutstyles.imageTextGap}>
            <Image source={Icons.IoLogoNoSmoking} />
            <Text style={boardingaboutstyles.commonText}>
              Non smoking household
            </Text>
          </View>
          <View style={boardingaboutstyles.imageTextGap}>
            <Image source={Icons.MdChildCare} />
            <Text style={boardingaboutstyles.commonText}>
              No children present{' '}
            </Text>
          </View>
        </View>

        <View style={boardingaboutstyles.facilityGap}>
          <Text style={boardingaboutstyles.text}> Facilities </Text>
          <View style={boardingaboutstyles.viewGap}>
            <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
              <Image source={Icons.meals} />
              <Text style={boardingaboutstyles.mealCareOutSide}>Meals</Text>
            </View>
            <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
              <Image source={Icons.Care} />
              <Text style={boardingaboutstyles.mealCareOutSide}>Care</Text>
            </View>
            <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
              <Image source={Icons.Outside} />
              <Text style={boardingaboutstyles.mealCareOutSide}>Outside</Text>
            </View>
          </View>
        </View>
      </View>
      <BoardingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={boardingaboutstyles.fixedButtonContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={boardingaboutstyles.nextBtnContainer}
        >
          <Text style={boardingaboutstyles.nextBtnText}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardingAbout;
