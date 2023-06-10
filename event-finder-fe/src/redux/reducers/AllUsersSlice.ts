import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./storeSlice";


interface AllUsersState {
    Users: User[];
    loading: boolean;
    error: string | null;
  }

  const initialState: AllUsersState = {
    Users: [],
    loading: false,
    error: null,
  
  }

  const AllUsersSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        getUsersStart(state) {
            state.loading = true;
            state.error = null;
          },
          getUsersSucess(state, action: PayloadAction<User[]>) {
            state.Users = action.payload;
            state.loading = false;
            state.error = null;
          },
          getUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
          },
    }
  })

export const {
    getUsersStart,
    getUsersSucess,
    getUsersFailure
}=AllUsersSlice.actions

  
  export default AllUsersSlice.reducer;