import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    startingMileage: 0,
    oddFillUpObject: {
        odometerStart: null,
        m2EGaugeStart: null,
        gasBrand: '',
    },
    evenFillUpObject: {
        odometerEnd: null,
        m2EGaugeEnd: null,
        gasBrand: '',
    },
};

export const odometerSlice = createSlice({
    name:'odometer',
    initialState,
    reducers: {
        setStartingMileage: (state, action) => {
            state.startingMileage = action.payload;
        },
        setOddFillUpObject: (state, action) => {
            state.oddFillUpObject = {
                odometerStart: action.payload.startingMileage,
                m2EGaugeStart: action.payload.m2EGaugeStart,
                gasBrand:action.payload.gasBrand,
            }
        },
    },
});




export const { setStartingMileage, setOddFillUpObject } = odometerSlice.actions;

//Selectors
export const selectStartingMileage = (state) => state.odometer.startingMileage;
export const selectOddFillUpObject = (state) => state.odometer.oddFillUpObject;

export default odometerSlice.reducer;