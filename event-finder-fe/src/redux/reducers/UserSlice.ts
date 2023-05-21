import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./storeSlice";

interface UserState {
  user: User | null;
  viewedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  viewedUser:null,
  loading: false,
  error: null,
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      console.log(state.user)
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateAvatarStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserAvatarSuccess(state,action:PayloadAction<string>){
      state.user!.avatar=action.payload
      state.loading = false;
      state.error = null;
    },
    updateAvatarFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
   getPremium(state){
   state.user!.Premium=true
   state.user!.premiumPoints-=300
   state.loading = false;
   state.error = null;
   },
   followUnfollow(state,action:PayloadAction<User>){
    state.user!.following=(action.payload.following)
    state.loading = false;
    state.error = null;
   },
   getById(state,action:PayloadAction<User>){
    state.viewedUser=action.payload
    state.loading = false;
    state.error = null;
   }
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateAvatarStart,
  updateUserAvatarSuccess,
  updateAvatarFailure,
  getPremium,
  followUnfollow,
  getById
} = userSlice.actions;

export default userSlice.reducer;