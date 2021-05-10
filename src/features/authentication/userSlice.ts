import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { signUpUser } from "./authAPI";
import { User, Credential } from "./entities";

export interface UserState {
  user: User | null;
  status: "idle" | "loading" | "failed";
  message: string;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  message: null,
};

export interface SignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signUpAsync = createAsyncThunk(
  "user/signUp",
  async (
    { firstName, lastName, email, password }: SignUpArgs,
    { rejectWithValue }
  ) => {
    try {
      const credential = new Credential(email, password);
      const user = new User(firstName, lastName, email);
      const response = await signUpUser(user, credential).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      //catches synchronous errors ex. making the user/credential object
      return rejectWithValue(error.message);
    }
  }
);

export const selectLoggedInUser = (state: RootState) => state.user;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.message = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
