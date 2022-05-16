import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    userObject: {
        name: null,
        email: null,
        firstFill: true,
    },
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userObject = action.payload;
        },
        logout: (state) => {
            state.userObject = null
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUserObject = (state) => state.user.userObject;

export default userSlice.reducer;