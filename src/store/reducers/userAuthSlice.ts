import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../store'
import { checkAuthAndGetData, logInWithGoogle, logOut } from '@/api/auth/auth'

export interface UserData {
  email: string | null
  uid: string | null
  displayName: string | null
  photoURL: string | null
}

export interface UserAuthInitialState {
  isAuth: boolean
  user: UserData | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: UserAuthInitialState = {
  isAuth: false,
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const userLoginWithGoogle = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('userLoginWithGoogle', async (_, thunkAPI) => {
  try {
    const response = await logInWithGoogle()
    if (response) {
      await thunkAPI.dispatch(userCheckAuthGetData())
    } else {
      return thunkAPI.rejectWithValue('no auth')
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userCheckAuthGetData = createAsyncThunk<
  UserData,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('userCheckAuthGetData', async (_, thunkAPI) => {
  try {
    const data = await checkAuthAndGetData()
    if (data) {
      return data
    } else {
      return thunkAPI.rejectWithValue('no auth')
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userLogout = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('userLogout', async (_, thunkAPI) => {
  try {
    await logOut()
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginWithGoogle.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(userLoginWithGoogle.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(userLoginWithGoogle.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(userCheckAuthGetData.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      userCheckAuthGetData.fulfilled,
      (state, { payload }: PayloadAction<UserData>) => {
        state.user = payload
        state.isAuth = true
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(userCheckAuthGetData.rejected, (state) => {
      state.user = null
      state.isAuth = false
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = null
      state.isAuth = false
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(userLogout.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const selectorUserAuthSlice = (state: RootState) => state.userAuthSlice

export default userAuthSlice.reducer