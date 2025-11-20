
import {

  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { API_CONFIG } from '../../config/api';

// export default function VeterinaryPetSelect({ navigation }) {
//   const [pets, setPets] = useState([]);
//   const [selectedPets, setSelectedPets] = useState(new Set());
//   const [loading, setLoading] = useState(true);

//   // Fetch pets
//   const fetchPets = async () => {
//     try {
//       const res = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`);
//       const json = await res.json();
//       setPets(json.data || []);
//     } catch (e) {
//       console.log("Error fetching pets", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   // Toggle Selection
//   const togglePet = (id) => {
//     const newSet = new Set(selectedPets);
//     newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//     setSelectedPets(newSet);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
//       {/* Header */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           paddingHorizontal: 20,
//           paddingVertical: 16,
//           borderBottomWidth: 1,
//           borderBottomColor: "#F3F4F6",
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: "700" }}>Select Your Pets</Text>

//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="close" size={26} color="#6B7280" />
//         </TouchableOpacity>
//       </View>

//       {/* Pet List */}
//       {loading ? (
//         <ActivityIndicator size="large" style={{ marginTop: 40 }} />
//       ) : (
//         <ScrollView style={{ padding: 20 }}>
//           {pets.map((item) => (
//             <TouchableOpacity
//               key={item._id}
//               style={{
//                 padding: 16,
//                 borderWidth: 1,
//                 borderColor: selectedPets.has(item._id)
//                   ? "#3B82F6"
//                   : "#E5E7EB",
//                 borderRadius: 12,
//                 marginBottom: 12,
//               }}
//               onPress={() => togglePet(item._id)}
//             >
//               <Text style={{ fontSize: 16, fontWeight: "600" }}>
//                 {item.petName}
//               </Text>
//               <Text style={{ fontSize: 12, color: "#6B7280" }}>
//                 {item.breed}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}

//       {/* Continue Button */}
//       <TouchableOpacity
//         onPress={() => {
//           if (selectedPets.size === 0) {
//             alert("Please select at least one pet");
//             return;
//           }

//           // IMPORTANT: Replace navigation to avoid going back to PetSelect
//           navigation.replace("VeterinaryCalendar", {
//             selectedPets: Array.from(selectedPets),
//           });
//         }}
//         style={{
//           backgroundColor: "#3B82F6",
//           padding: 16,
//           borderRadius: 10,
//           margin: 20,
//         }}
//       >
//         <Text
//           style={{
//             textAlign: "center",
//             fontSize: 16,
//             color: "white",
//             fontWeight: "700",
//           }}
//         >
//           Continue
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";


const VeterinaryUser = ({ navigation }) => {
  const [showPetModal, setShowPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoadingPets(true);

      const response = await fetch(
        "https://YOUR_BACKEND_URL/api/user/pets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`, // Token hai toh
          },
        }
      );

      const data = await response.json();

      // backend response example: { pets: [ {id,name,type,breed}, ... ] }
      setPets(data?.pets || []);
    } catch (error) {
      console.log("Error fetching pets:", error);
    } finally {
      setLoadingPets(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* SELECT PET BUTTON */}
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setShowPetModal(true)}
      >
        <Text style={styles.selectText}>
          {selectedPet ? selectedPet.name : "Select Pet"}
        </Text>
      </TouchableOpacity>

      {/* PET SELECT MODAL */}
      <Modal
        visible={showPetModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Your Pet</Text>

            {/* LOADING */}
            {loadingPets ? (
              <Text style={styles.loadingText}>Loading Pets...</Text>
            ) : (
              <ScrollView style={{ maxHeight: 300 }}>
                {pets.map((pet) => (
                  <TouchableOpacity
                    key={pet.id}
                    style={styles.petItem}
                    onPress={() => {
                      setSelectedPet(pet);
                      setShowPetModal(false);
                    }}
                  >
                    <Ionicons
                      name={
                        pet.type === "Dog"
                          ? "paw"
                          : pet.type === "Cat"
                          ? "logo-octocat"
                          : "help"
                      }
                      size={24}
                      color="#333"
                      style={{ marginRight: 10 }}
                    />

                    <View>
                      <Text style={styles.petName}>{pet.name}</Text>
                      <Text style={styles.petDetails}>
                        {pet.type} • {pet.breed}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* CLOSE BTN */}
            <TouchableOpacity
              onPress={() => setShowPetModal(false)}
              style={styles.closeBtn}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => {
          if (!selectedPet) {
            alert("Please select a pet");
            return;
          }

          navigation.navigate("VeterinaryCalendar", {
            selectedPet: selectedPet,
          });
        }}
      >
        <Text style={styles.nextText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VeterinaryUser;
