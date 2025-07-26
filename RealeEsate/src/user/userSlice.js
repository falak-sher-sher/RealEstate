import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateUserStart: (state)=>{
      state.loading = true
    },
    UpdateUserSuccess: (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    UpdateUserFailure: (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserSuccess: (state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state,action)=>{
      state.error = action.payload
      state.loading = false
    }
  },
});

export const { signInStart,deleteUserFailure,deleteUserSuccess, signInSuccess, signInFailure,UpdateUserStart,UpdateUserSuccess,UpdateUserFailure} = userSlice.actions;
export default userSlice.reducer;