import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    Platform, 
    ScrollView, 
    StatusBar,
    Modal,
    FlatList,
    Alert 
} from 'react-native';
import { TextInput } from 'react-native-paper';
import addvaccinationstyles from './addvaccination.styles';
import Icons from '../../../assets/icons';
import images from '../../../assets/images';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import profileStyles from '../Profile/profileStyles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



 // Define your navigation stack's param list
 type RootStackParamList = {
     PetParentform: undefined;
     Main:undefined;
     PetWarriorform:undefined;
     DeliveryPartnerform:undefined;
     ServiceProviderform:undefined;
     SignIn:undefined;
     BoardingDetails:undefined;
     AddVaccination:undefined;
     BoardingRegistrationform:undefined
 };
 
 // Define the navigation prop type
 type AddVaccinationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingRegistrationform'>;
 
 // Define props interface for the component
 interface AddVaccinationProps {
   navigation: AddVaccinationScreenNavigationProp;
 }
 



const vaccine_data = [
    { value: 'dhpp', label: 'DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)' },
    { value: 'rabies', label: 'Rabies' },
    { value: 'leptospirosis', label: 'Leptospirosis' },
    { value: 'bordetella', label: 'Bordetella (Kennel Cough)' },
    { value: 'lyme', label: 'Lyme Disease' },
    { value: 'canine_influenza', label: 'Canine Influenza' },
    { value: 'coronavirus', label: 'Canine Coronavirus' },
    { value: 'giardia', label: 'Giardia' },
    { value: 'fvrcp', label: 'FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)' },
    { value: 'felv', label: 'FeLV (Feline Leukemia)' },
    { value: 'fiv', label: 'FIV (Feline Immunodeficiency Virus)' },
];

const AddVaccination: React.FC<AddVaccinationProps> = ({navigation}) => {
    const [selectedVaccine, setSelectedVaccine] = useState<string>('');
    const [vaccineName, setVaccineName] = useState<string>('');
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [showstartdate, setShowstartdate] = useState<boolean>(false);
    const [showenddate, setShowenddate] = useState<boolean>(false);
    const [showVaccineModal, setShowVaccineModal] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>('');
    const [isRequired, setIsRequired] = useState<boolean>(false);
  
    const onChangestartdate = (event:any, selectedDate?: Date) => {
        setShowstartdate(Platform.OS === 'ios');
         if (selectedDate) {
         setStartdate(selectedDate);
         
        }
     };

    const onChangeendtdate = (event: any, selectedDate?: Date) => {
        console.log("End Date", selectedDate);
        setShowenddate(Platform.OS === 'ios');
        if (selectedDate) {
            setEnddate(selectedDate);
        }
    };

    const handleAddVaccination = () => {
        if (!selectedVaccine && !vaccineName) {
            Alert.alert('Error', 'Please select or enter a vaccine name');
            return;
        }

        // Here you would typically save to API
        console.log('Adding vaccination:', {
            vaccine: selectedVaccine || vaccineName,
            startDate: startdate,
            endDate: enddate,
            notes,
            isRequired
        });

        Alert.alert(
            'Success',
            'Vaccination added successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                }
            ]
        );
    };

    const getSelectedVaccineName = () => {
        if (selectedVaccine) {
            const vaccine = vaccine_data.find(v => v.value === selectedVaccine);
            return vaccine ? vaccine.label : '';
        }
        return '';
    };

    return (
        <View style={addvaccinationstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
            
            {/* Standardized Boarding Header */}
            <View style={addvaccinationstyles.boardingStandardHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={addvaccinationstyles.boardingBackButton}
                >
                    <MaterialIcons name="arrow-back" size={22} color="#6B7280" />
                </TouchableOpacity>
                <View style={addvaccinationstyles.boardingHeaderTitleContainer}>
                    <Text style={addvaccinationstyles.boardingHeaderTitle}>Add Vaccination</Text>
                    <Text style={addvaccinationstyles.boardingHeaderSubtitle}>Add vaccination record for your pet</Text>
                </View>
                <View style={addvaccinationstyles.boardingHeaderActions}>
                    {/* Placeholder for future actions */}
                </View>
            </View>

            <ScrollView 
                style={addvaccinationstyles.scrollView}
                contentContainerStyle={addvaccinationstyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Image Section */}
                <View style={addvaccinationstyles.heroSection}>
                    <View style={addvaccinationstyles.heroImageContainer}>
                        <Image 
                            source={images.veterinariTakingImage} 
                            style={addvaccinationstyles.heroImage}
                        />
                    </View>
                    <Text style={addvaccinationstyles.heroTitle}>Vaccination Record</Text>
                    <Text style={addvaccinationstyles.heroSubtitle}>Keep your pet's vaccination records up to date</Text>
                </View>

                {/* Vaccination Details Form */}
                <View style={addvaccinationstyles.formSection}>
                    <View style={addvaccinationstyles.sectionCard}>
                        <View style={addvaccinationstyles.sectionHeader}>
                            <MaterialIcons name="medical-services" size={24} color="#58B9D0" />
                            <Text style={addvaccinationstyles.sectionHeaderTitle}>Vaccination Details</Text>
                        </View>

                        {/* Vaccine Selection */}
                        <View style={addvaccinationstyles.inputGroup}>
                            <Text style={addvaccinationstyles.inputLabel}>Vaccine Name *</Text>
                            <TouchableOpacity 
                                style={addvaccinationstyles.bottomSheetTrigger}
                                onPress={() => setShowVaccineModal(true)}
                            >
                                <Text style={[
                                    addvaccinationstyles.bottomSheetTriggerText,
                                    !selectedVaccine && addvaccinationstyles.bottomSheetPlaceholder
                                ]}>
                                    {getSelectedVaccineName() || 'Select vaccine type'}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Custom Vaccine Name */}
                        <View style={addvaccinationstyles.inputGroup}>
                            <Text style={addvaccinationstyles.inputLabel}>Or enter custom vaccine name</Text>
                            <TextInput
                                mode="outlined"
                                placeholder="Enter vaccine name"
                                value={vaccineName}
                                onChangeText={setVaccineName}
                                style={addvaccinationstyles.textInput}
                                contentStyle={addvaccinationstyles.inputContent}
                                outlineStyle={addvaccinationstyles.inputOutline}
                                theme={{ 
                                    roundness: 16,
                                    colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                                }}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <MaterialIcons 
                                                name="edit" 
                                                size={20} 
                                                color="#666" 
                                            />
                                        )}
                                    />
                                }
                            />
                        </View>

                        {/* Date Range */}
                        <View style={addvaccinationstyles.dateRow}>
                            <View style={addvaccinationstyles.dateColumn}>
                                <Text style={addvaccinationstyles.inputLabel}>Vaccination Date *</Text>
                                <TouchableOpacity
                                    onPress={() => setShowstartdate(true)}
                                    style={addvaccinationstyles.dateButton}
                                >
                                    <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
                                    <Text style={addvaccinationstyles.dateText}>
                                        {startdate.toLocaleDateString('en-GB')}
                                    </Text>
                                </TouchableOpacity>
                                {showstartdate && (
                                    <DateTimePicker
                                        testID="startDatePicker"
                                        value={startdate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangestartdate}
                                    />
                                )}
                            </View>

                            <View style={addvaccinationstyles.dateColumn}>
                                <Text style={addvaccinationstyles.inputLabel}>Expiry Date *</Text>
                                <TouchableOpacity
                                    onPress={() => setShowenddate(true)}
                                    style={addvaccinationstyles.dateButton}
                                >
                                    <MaterialIcons name="event" size={20} color="#FF6B6B" />
                                    <Text style={addvaccinationstyles.dateText}>
                                        {enddate.toLocaleDateString('en-GB')}
                                    </Text>
                                </TouchableOpacity>
                                {showenddate && (
                                    <DateTimePicker
                                        testID="endDatePicker"
                                        value={enddate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeendtdate}
                                    />
                                )}
                            </View>
                        </View>

                        {/* Notes */}
                        <View style={addvaccinationstyles.inputGroup}>
                            <Text style={addvaccinationstyles.inputLabel}>Additional Notes</Text>
                            <TextInput
                                mode="outlined"
                                placeholder="Any special notes about this vaccination"
                                value={notes}
                                onChangeText={setNotes}
                                multiline
                                numberOfLines={3}
                                style={addvaccinationstyles.textInput}
                                contentStyle={addvaccinationstyles.inputContent}
                                outlineStyle={addvaccinationstyles.inputOutline}
                                theme={{ 
                                    roundness: 16,
                                    colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                                }}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <MaterialIcons 
                                                name="note" 
                                                size={20} 
                                                color="#666" 
                                            />
                                        )}
                                    />
                                }
                            />
                        </View>

                        {/* Required Checkbox */}
                        <View style={addvaccinationstyles.checkboxContainer}>
                            <BouncyCheckbox
                                size={20}
                                fillColor="#58B9D0"
                                unFillColor="#FFFFFF"
                                text="This is a required vaccination"
                                iconStyle={{ borderColor: "#58B9D0", borderWidth: 2 }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={addvaccinationstyles.checkboxText}
                                isChecked={isRequired}
                                onPress={setIsRequired}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Sheet Modal for Vaccine Selection */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showVaccineModal}
                onRequestClose={() => setShowVaccineModal(false)}
            >
                <View style={addvaccinationstyles.modalOverlay}>
                    <View style={addvaccinationstyles.bottomSheetContainer}>
                        <View style={addvaccinationstyles.bottomSheetHandle}></View>
                        <View style={addvaccinationstyles.bottomSheetHeader}>
                            <Text style={addvaccinationstyles.bottomSheetTitle}>Select Vaccine</Text>
                            <TouchableOpacity onPress={() => setShowVaccineModal(false)}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={vaccine_data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={addvaccinationstyles.bottomSheetItem}
                                    onPress={() => {
                                        setSelectedVaccine(item.value);
                                        setVaccineName(''); // Clear custom name when selecting from list
                                        setShowVaccineModal(false);
                                    }}
                                >
                                    <Text style={addvaccinationstyles.bottomSheetItemText}>{item.label}</Text>
                                    {selectedVaccine === item.value && (
                                        <MaterialIcons name="check" size={20} color="#58B9D0" />
                                    )}
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={addvaccinationstyles.bottomSheetList}
                        />
                    </View>
                </View>
            </Modal>

            {/* Fixed Bottom Button */}
            <View style={addvaccinationstyles.bottomButtonContainer}>
                <TouchableOpacity 
                    onPress={handleAddVaccination}
                    style={[
                        profileStyles.commonButton,
                        profileStyles.commonButtonPrimary
                    ]}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="add" size={22} color="#58B9D0" style={profileStyles.commonButtonIcon} />
                    <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>
                        Add Vaccination Record
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddVaccination;
