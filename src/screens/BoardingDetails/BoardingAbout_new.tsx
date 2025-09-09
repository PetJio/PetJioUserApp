import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icons from '../../../assets/icons';
import boardingaboutstyles from './boardingabout.styles';
import BoardingModal from '../BoardingModal/BoardingModal';

interface BoardingAboutProps {
    serviceDetails?: any;
    description?: string;
    providerName?: string;
    facilityName?: string;
    experience?: number;
}

const BoardingAbout: React.FC<BoardingAboutProps> = ({ 
    serviceDetails,
    description = "Professional boarding service for your beloved pets",
    providerName = "Service Provider",
    facilityName = "Pet Boarding Facility",
    experience = 3
}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    // Extract data from API response
    const boarding = serviceDetails?.boarding || {};
    const user = boarding.user || {};
    const breed = serviceDetails?.breed || {};
    const category = serviceDetails?.category || {};
    
    const price = serviceDetails?.price ? `₹${serviceDetails.price}` : '₹500';
    const mealPrice = serviceDetails?.mealPrice ? `₹${serviceDetails.mealPrice}` : '₹100';
    const discount = serviceDetails?.discount || 0;
    const registrationNo = boarding.regNo || 'Not provided';
    const actualExperience = boarding.experience || experience;
    
    // User home details
    const address = user.address || 'Location not specified';
    const city = user.city || '';
    const state = user.state || '';
    const fullAddress = city && state ? `${city}, ${state}` : address;
    
    return (
        <View style={boardingaboutstyles.container}>
            <View>
                <Text style={boardingaboutstyles.bioText}>Bio</Text>
                <Text style={boardingaboutstyles.paragraphText}>
                    {description}
                </Text>
            </View>

            {/* Service Details */}
            <View style={boardingaboutstyles.languageJobText}>
                <View>
                    <Text style={boardingaboutstyles.text}>Facility Name</Text>
                    <Text style={boardingaboutstyles.Text}>{facilityName}</Text>
                </View>

                <View>
                    <Text style={boardingaboutstyles.text}>Registration Number</Text>
                    <Text style={boardingaboutstyles.Text}>{registrationNo}</Text>
                </View>

                <View>
                    <Text style={boardingaboutstyles.text}>Experience</Text>
                    <Text style={boardingaboutstyles.Text}>{actualExperience}+ Years</Text>
                </View>

                <View>
                    <Text style={boardingaboutstyles.text}>Pet Category</Text>
                    <Text style={boardingaboutstyles.Text}>{category.catName || 'All Pets'}</Text>
                </View>

                <View>
                    <Text style={boardingaboutstyles.text}>Pet Size</Text>
                    <Text style={boardingaboutstyles.Text}>{breed.size || 'All Sizes'}</Text>
                </View>
            </View>

            {/* Pricing Details */}
            <View style={boardingaboutstyles.languageJobText}>
                <View>
                    <Text style={boardingaboutstyles.text}>Boarding Price</Text>
                    <Text style={boardingaboutstyles.Text}>{price} per day</Text>
                </View>

                <View>
                    <Text style={boardingaboutstyles.text}>Meal Price</Text>
                    <Text style={boardingaboutstyles.Text}>{mealPrice} per meal</Text>
                </View>

                {discount > 0 && (
                    <View>
                        <Text style={boardingaboutstyles.text}>Discount</Text>
                        <Text style={boardingaboutstyles.Text}>{discount}% off</Text>
                    </View>
                )}
            </View>

            <View style={boardingaboutstyles.Gap}>
                <Text style={boardingaboutstyles.text}>{providerName}'s Home</Text>
                <View style={boardingaboutstyles.imageTextGap}>
                    <Image source={Icons.PiBuildingApartment}/>
                    <Text style={boardingaboutstyles.commonText}>{fullAddress}</Text>
                </View>
                <View style={boardingaboutstyles.imageTextGap}>
                    <Image source={Icons.IoLogoNoSmoking}/>
                    <Text style={boardingaboutstyles.commonText}>Non smoking household</Text>
                </View>
                <View style={boardingaboutstyles.imageTextGap}>
                    <Image source={Icons.MdChildCare}/>
                    <Text style={boardingaboutstyles.commonText}>
                        {boarding.keepCustomerPossessions ? 'Keeps customer possessions safely' : 'No children present'}
                    </Text>
                </View>
            </View>

            <View style={boardingaboutstyles.facilityGap}>
                <Text style={boardingaboutstyles.text}>Facilities</Text>
                <View style={boardingaboutstyles.viewGap}>
                    <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
                        <Image source={Icons.meals}/>
                        <Text style={boardingaboutstyles.mealCareOutSide}>Meals</Text>
                    </View>
                    <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
                        <Image source={Icons.Care}/>
                        <Text style={boardingaboutstyles.mealCareOutSide}>Care</Text>
                    </View>
                    <View style={boardingaboutstyles.mealCareOutsideImageTextGap}>
                        <Image source={Icons.Outside}/>
                        <Text style={boardingaboutstyles.mealCareOutSide}>Outside</Text>
                    </View>
                </View>
            </View>
           
            <BoardingModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <View style={boardingaboutstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={boardingaboutstyles.nextBtnContainer}>
                    <Text style={boardingaboutstyles.nextBtnText}>Book Now at {price} per day</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingAbout;
