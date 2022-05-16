import {configureStore} from "@reduxjs/toolkit";
import odometerReducer  from './slices/odometerSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        odometer:odometerReducer,
        user: userReducer,
    },
});