import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //'not-authenticated', //'authenticated', 'checking', 
        uid: null,
        email: [],
        displayName: null,
        photoUrl:null,
        errorMessage: null,

    },
    reducers: {
        login: (state, {payload}) => {
            state.isLoading = true;
            state.status = 'authenticated'//, 'checking', 
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoUrl = payload.photoUrl;
            state.errorMessage = null;
        },
        logout:(state,{payload}) =>{
           state.status= 'not-authenticated'; //'authenticated', 'checking', 
           state.uid = null;
           state.email = null;
           state.displayName = null;
           state.photoUrl = null;
           state.errorMessage = payload?.errorMessage;
        },
        checkingCredencials:(state)=>{
            state.status= 'checking';

        }
            // {
            //     isLoading: false,
            //     page: 1,
            //     pokemons: []
            // }
        
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredencials } = authSlice.actions;