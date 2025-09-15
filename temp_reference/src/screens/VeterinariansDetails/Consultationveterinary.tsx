
import {useState} from 'react';
import { View, Text,Image ,TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import consultationveterinarystyles from './consultationveterinary.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import VeterinaryOnline from './VeterinaryOnline';
import VeterinaryHomeVisite from './VeterinaryHomeVisite';




// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    GroomingDetails:undefined;
    VeterinaryDetails:undefined
};




const Consultationveterinary: React.FC = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState<string>('Online');
    
        const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
            setActiveTab(tab);
        };


    return (
        <View style={consultationveterinarystyles.container}>
              <View style={consultationveterinarystyles.centerView}>
                <View style={consultationveterinarystyles.flexGap}>
                   <TouchableOpacity onPress={()=>handleTabPress("Online")}>
                       <View style={activeTab === 'Online'?consultationveterinarystyles.selectOnline:consultationveterinarystyles.unselectOnline}>
                           <Text style={activeTab === 'Online'?consultationveterinarystyles.selectOnlineText:consultationveterinarystyles.unselectOnlineText}>Online</Text>
                       </View>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>handleTabPress("HomeVisit")}>

                     <View style={activeTab === 'HomeVisit'?consultationveterinarystyles.selectHomeVisite:consultationveterinarystyles.unselectHomeVisite}>
                           <Text style={activeTab === 'HomeVisit'?consultationveterinarystyles.selectHomeVisiteText:consultationveterinarystyles.unselectHomeVisiteText}>Home Visit</Text>
                     </View>

                   </TouchableOpacity>
             </View>

              </View>
        
           <ScrollView  
             showsVerticalScrollIndicator={false}
             contentContainerStyle={consultationveterinarystyles.paddingBottom}>
            {activeTab === "Online" && <VeterinaryOnline/>}
            {activeTab === "HomeVisit" && <VeterinaryHomeVisite/>}

           </ScrollView>
        </View>
    );
};

export default Consultationveterinary;

