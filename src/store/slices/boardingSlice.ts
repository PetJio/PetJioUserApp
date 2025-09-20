import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardingFormData {
  selectedDate: string;
  fromTime: string;
  toTime: string;
  selectedCity: string;
}

interface BoardingState {
  formData: BoardingFormData;
}

const initialState: BoardingState = {
  formData: {
    selectedDate: '',
    fromTime: 'From',
    toTime: 'To',
    selectedCity: 'Kolkata',
  },
};

const boardingSlice = createSlice({
  name: 'boarding',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.formData.selectedDate = action.payload;
    },
    setFromTime: (state, action: PayloadAction<string>) => {
      state.formData.fromTime = action.payload;
    },
    setToTime: (state, action: PayloadAction<string>) => {
      state.formData.toTime = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.formData.selectedCity = action.payload;
    },
    setFormData: (state, action: PayloadAction<BoardingFormData>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const {
  setSelectedDate,
  setFromTime,
  setToTime,
  setSelectedCity,
  setFormData,
  resetFormData,
} = boardingSlice.actions;

export default boardingSlice.reducer;