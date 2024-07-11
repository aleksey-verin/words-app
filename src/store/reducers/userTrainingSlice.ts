import { UserDictionary } from '@/api/dictionary/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getRandomWords } from '@/api/training/training'

export interface UserAuthInitialState {
  trainingWords: UserDictionary
  // isLoading: boolean
  // isSuccess: boolean
  // isError: boolean
}

const initialState: UserAuthInitialState = {
  trainingWords: [],
  // isLoading: false,
  // isSuccess: false,
  // isError: false,
}

// export const getWordsForTraining = createAsyncThunk<
//   UserDictionary,
//   number,
//   {
//     dispatch: AppDispatch
//     state: RootState
//   }
// >('getWordsForTraining', async (_, thunkAPI) => {
//   try {
//     const dictionary = thunkAPI.getState().userDictionarySlice.dictionary
//     const trainingWords = getRandomWords(dictionary, 10)
//     return trainingWords
//   } catch (error) {
//     console.log(error)
//     return thunkAPI.rejectWithValue(error)
//   }
// })

export const userTrainingSlice = createSlice({
  name: 'userTrainingSlice',
  initialState,
  reducers: {
    getWordsForTraining(state, { payload }: PayloadAction<{ dictionary: UserDictionary, wordsCount: number}>) {
      state.trainingWords = getRandomWords(payload.dictionary, payload.wordsCount);
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getWordsForTraining.pending, (state) => {
  //     state.isLoading = true
  //     state.isSuccess = false
  //     state.isError = false
  //   })
  //   builder.addCase(
  //     getWordsForTraining.fulfilled,
  //     (state, { payload }: PayloadAction<UserDictionary>) => {
  //       state.trainingWords = payload
  //       state.isLoading = false
  //       state.isSuccess = true
  //     }
  //   )
  //   builder.addCase(getWordsForTraining.rejected, (state) => {
  //     state.isLoading = false
  //     state.isError = true
  //   })
  // },
})

export const { getWordsForTraining } = userTrainingSlice.actions
export const selectorUserTrainingSlice = (state: RootState) =>
  state.userTrainingSlice

export default userTrainingSlice.reducer
