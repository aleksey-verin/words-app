import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../store'
import { Word } from '@/api/search/types'
import { requestWord } from '@/api/search/search'

export interface UserAuthInitialState {
  requestedWord: string
  requestedResult: Word | null
  errorMessage: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: UserAuthInitialState = {
  requestedWord: '',
  requestedResult: null,
  errorMessage: 'No Definitions Found',
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const getDefinitions = createAsyncThunk<
  Word,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('getDefinitions', async (word, thunkAPI) => {
  try {
    if (!word) return thunkAPI.rejectWithValue('no word')
    const data = await requestWord(word)
    if (data) {
      return data
    } else {
      return thunkAPI.rejectWithValue('nothing returned')
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDefinitions.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      getDefinitions.fulfilled,
      (state, { payload }: PayloadAction<Word>) => {
        state.requestedResult = payload
        state.requestedWord = payload.word
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(getDefinitions.rejected, (state) => {
      state.requestedWord = ''
      state.requestedResult = null
      state.isLoading = false
      state.isError = true
    })
  },
})

export const selectorSearchSlice = (state: RootState) => state.searchSlice

export default searchSlice.reducer
