import { API_CONFIG } from '../config/api';
import { storageService } from '../utils/storage';

export interface VaccinationData {
  vaccineName: string;
  date: string;
  expiry: string | null;
}

export interface ReadVaccinationDataResponse {
  statusCode: number;
  message: string;
  body: {
    data: VaccinationData;
  };
}

export interface Vaccination {
  id: number;
  vaccineName: string;
  date: string;
  expiry: string | null;
  uploadUrl: string;
  vaccinationProvider?: number;
}

export interface GetVaccinationsResponse {
  statusCode: number;
  message: string;
  body: Vaccination[];
}

export interface CreateVaccinationPayload {
  vaccineName: string;
  date: string;
  expiry: string | null;
  petId: number;
  uploadUrl: string;
  vaccinationProvider?: number;
}

/**
 * Read vaccination data from an image using OCR
 * @param imageUrl S3 image URL
 */
export const readVaccinationData = async (
  imageUrl: string
): Promise<VaccinationData> => {
  try {
    const token = await storageService.getUserToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }

    console.log('📄 Reading vaccination data from image:', imageUrl);

    const url = `${API_CONFIG.BASE_URL}/api/pet-vaccination/read-vaccination-data`;
    const payload = { imageUrl };

    console.log('\n🔍 CURL for Read Vaccination Data:');
    console.log(`curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload)}'\n`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Read vaccination data error:', errorText);
      throw new Error(`Failed to read vaccination data: ${response.status}`);
    }

    const data: ReadVaccinationDataResponse = await response.json();
    console.log('✅ Vaccination data extracted:', data);

    if (data.statusCode === 200 && data.body?.data) {
      return data.body.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('🔥 Error reading vaccination data:', error);
    throw error;
  }
};

/**
 * Create a new vaccination record for a pet
 */
export const createVaccination = async (
  payload: CreateVaccinationPayload
): Promise<any> => {
  try {
    const token = await storageService.getUserToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }

    console.log('💉 Creating vaccination record:', payload);

    const url = `${API_CONFIG.BASE_URL}/api/pet-vaccination`;

    console.log('\n💉 CURL for Create Vaccination:');
    console.log(`curl -X POST "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload, null, 2)}'\n`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Create vaccination error:', errorText);
      throw new Error(`Failed to create vaccination: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Vaccination created successfully:', data);
    return data;
  } catch (error) {
    console.error('🔥 Error creating vaccination:', error);
    throw error;
  }
};

/**
 * Get all vaccinations for a specific pet
 */
export const getVaccinationsByPetId = async (
  petId: number
): Promise<Vaccination[]> => {
  try {
    const token = await storageService.getUserToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }

    console.log('📋 Fetching vaccinations for pet ID:', petId);

    const url = `${API_CONFIG.BASE_URL}/api/pet-vaccination/pet/${petId}`;

    console.log('\n📋 CURL for Get Vaccinations:');
    console.log(`curl -X GET "${url}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json"\n`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Get vaccinations error:', errorText);
      throw new Error(`Failed to get vaccinations: ${response.status}`);
    }

    const data: GetVaccinationsResponse = await response.json();
    console.log('✅ Vaccinations fetched:', data);

    if (data.statusCode === 200 && data.body) {
      return data.body;
    } else {
      return [];
    }
  } catch (error) {
    console.error('🔥 Error fetching vaccinations:', error);
    throw error;
  }
};
