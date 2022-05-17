import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    startingMileage: 0,
};

export const odometerSlice = createSlice({
    name:'odometer',
    initialState,
    reducers: {
        setStartingMileage: (state, action) => {
            state.startingMileage = action.payload;
        },
    },
});




export const { setStartingMileage,  } = odometerSlice.actions;

//Selectors
export const selectStartingMileage = (state) => state.odometer.startingMileage;

export default odometerSlice.reducer;