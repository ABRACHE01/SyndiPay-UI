import { createSlice } from "@reduxjs/toolkit";

const initialState = {
apartments: [],
apartmentById: null,
};

const apartmentSlice = createSlice({
name: "apartment",
initialState,
reducers: {
setApartments: (state, action) => {
state.apartments = action.payload;
},
setApartmentById: (state, action) => {
state.apartmentById = action.payload;
},
clearApartmentById: (state) => {
state.apartmentById = null;
},
},
});

export const { setApartments, setApartmentById, clearApartmentById } = apartmentSlice.actions;

export default apartmentSlice.reducer;