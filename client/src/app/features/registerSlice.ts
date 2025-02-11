import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRegisterResponse } from '../../interfaces/Response/IRegisterResponse'
import { ICustomAxiosError } from '../../helper/axiosError';
import axiosInstance from '../../api/axiosConfig';

import { createStandaloneToast } from "@chakra-ui/react"

const { toast } = createStandaloneToast();
export interface IUsersState {
  loading: boolean;
  data: IRegisterResponse | null;
  error: ICustomAxiosError | null;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}

const initialState: IUsersState = {
  loading: false,
  data: null,
  error: null,
}

// First, create the thunk
export const userRegister = createAsyncThunk<IRegisterResponse, IRegisterCredentials, { rejectValue: ICustomAxiosError }>(
  'register/userRegister',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<IRegisterResponse>("/register", credentials)
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Enhanced error handling
      if (!error.response) {
        throw error;
      }
      // console.log("AsyncThunk Error")
      // console.log(error)
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message || 'Registration failed',
        response: error.response.data
        // error: error.response.data
      });
    }
  },
)
// Then, handle actions in your reducers:
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => { // for middleware to handle request-response lifecycle
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<IRegisterResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        toast({
          title: "Register Successfully",
          description: action.payload?.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload ? (action.payload as ICustomAxiosError) : null;
        toast({
          title: action.payload?.message ?? "InValid Register",
          status: "error",
          description: action.payload?.response?.msg,
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
      })
  },
})
// Export actions
export const { resetRegistration } = registerSlice.actions;

// Enhanced selectors with type safety
export const selectRegister = (state: { register: IUsersState }) => state.register;
export const selectRegistrationLoading = (state: { register: IUsersState }) => state.register.loading;
export const selectRegistrationError = (state: { register: IUsersState }) => state.register.error;

export default registerSlice.reducer; // Export the reducer for the register slice

