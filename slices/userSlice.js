import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    userEmail: ''
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userEmail = action.payload;
        },
        logout: (state) => {
            state.userEmail = null
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUserEmail  = (state) => state.user.userEmail;

export default userSlice.reducer;