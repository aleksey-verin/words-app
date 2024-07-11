import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../store'
import { UserDictionary } from '@/api/dictionary/types'
import {
  addInUserDictionary,
  getUserDictionary,
  removeDefinitionFromUserDictionary,
  removeWordFromUserDictionary,
} from '@/api/dictionary/dictionary'

export interface UserAuthInitialState {
  dictionary: UserDictionary
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: UserAuthInitialState = {
  dictionary: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const getDictionary = createAsyncThunk<
  UserDictionary,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('getDictionary', async (_, thunkAPI) => {
  try {
    // await thunkAPI.dispatch(userCheckAuthGetData()) // скорее всего нужно будет еще запрашивать словарь при изменениях, поэтому лучше не объединять (хотя багов будет меньше если вдруг сессия закончилась)
    const user = thunkAPI.getState().userAuthSlice.user
    const email = user?.email
    if (!email) return thunkAPI.rejectWithValue('no user for get dictionary')
    const data = await getUserDictionary(email)
    if (data) {
      return data
    } else {
      return thunkAPI.rejectWithValue('no dictionary')
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const addInDictionary = createAsyncThunk<
  void,
  { word: string; definition: string },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('addInDictionary', async ({ word, definition }, thunkAPI) => {
  try {
    const user = thunkAPI.getState().userAuthSlice.user
    const email = user?.email
    if (!email) return thunkAPI.rejectWithValue('no user for get dictionary')
    const dictionary = thunkAPI.getState().userDictionarySlice.dictionary
    await addInUserDictionary(email, word, definition, dictionary)
    await thunkAPI.dispatch(getDictionary())
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const removeDefinitionFormDictionary = createAsyncThunk<
  void,
  { word: string; definition: string },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('removeDefinitionFormDictionary', async ({ word, definition }, thunkAPI) => {
  try {
    const user = thunkAPI.getState().userAuthSlice.user
    const email = user?.email
    if (!email) return thunkAPI.rejectWithValue('no user for get dictionary')
    const dictionary = thunkAPI.getState().userDictionarySlice.dictionary
    await removeDefinitionFromUserDictionary(email, word, definition, dictionary)
    await thunkAPI.dispatch(getDictionary())
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const removeWordFormDictionary = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('removeWordFormDictionary', async (word, thunkAPI) => {
  try {
    const user = thunkAPI.getState().userAuthSlice.user
    const email = user?.email
    if (!email) return thunkAPI.rejectWithValue('no user for get dictionary')
    const dictionary = thunkAPI.getState().userDictionarySlice.dictionary
    await removeWordFromUserDictionary(email, word, dictionary)
    await thunkAPI.dispatch(getDictionary())
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userDictionarySlice = createSlice({
  name: 'userDictionarySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDictionary.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      getDictionary.fulfilled,
      (state, { payload }: PayloadAction<UserDictionary>) => {
        state.dictionary = payload
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(getDictionary.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(addInDictionary.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(addInDictionary.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(addInDictionary.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(removeDefinitionFormDictionary.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(removeDefinitionFormDictionary.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(removeDefinitionFormDictionary.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(removeWordFormDictionary.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(removeWordFormDictionary.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(removeWordFormDictionary.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectorUserDictionarySlice = (state: RootState) =>
  state.userDictionarySlice

export default userDictionarySlice.reducer
