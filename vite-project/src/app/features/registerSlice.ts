import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRegisterResponse } from '../../interfaces/Response/IRegisterResponse'
import { ICustomAxiosError } from '../../helper/axiosError';
import axiosInstance from '../../api/axiosConfig';



export interface IUsersState {
  loading: boolean;
  data: IRegisterResponse | null;
  error: ICustomAxiosError | null;
  statusMessage: string;
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
  statusMessage: '',
}

// First, create the thunk
export const userRegister = createAsyncThunk<IRegisterResponse, IRegisterCredentials, { rejectValue: ICustomAxiosError }>(
  'users/register',
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
      state.statusMessage = '';
    },
    setStatusMessage: (state, action: PayloadAction<string>) => {
      state.statusMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.statusMessage = 'Registration in progress...';
    })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<IRegisterResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.statusMessage = 'Registration successful!';
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload ? (action.payload as ICustomAxiosError) : null;
        state.statusMessage = action.payload?.message || 'Registration failed';
      })
  },
})
// Export actions
export const { resetRegistration, setStatusMessage } = registerSlice.actions;

// Enhanced selectors with type safety
export const selectRegister = (state: { register: IUsersState }) => state.register;
export const selectRegistrationStatus = (state: { register: IUsersState }) => state.register.statusMessage;
export const selectRegistrationLoading = (state: { register: IUsersState }) => state.register.loading;
export const selectRegistrationError = (state: { register: IUsersState }) => state.register.error;

export default registerSlice.reducer; // Export the reducer for the register slice

