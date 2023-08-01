import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const apiEndpoint = 'http://localhost:3001/api/v1/login';

export const loginAsync = createAsyncThunk('login/loginAsync', async (credentials) => {
  try {
    const response = await axios.post(apiEndpoint, credentials);
    return response.data
  } catch (error) {
    throw error.response.data.error
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.username
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { logout } = loginSlice.actions
export default loginSlice.reducer
