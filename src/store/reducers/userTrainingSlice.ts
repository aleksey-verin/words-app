import { UserDictionary } from '@/api/dictionary/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getRandomAndMixedWords, getTrainingWords } from '@/api/training/training'

export interface UserAuthInitialState {
  allWordsForTraining: UserDictionary
  trainingWords: UserDictionary
  // isLoading: boolean
  // isSuccess: boolean
  // isError: boolean
}

const initialState: UserAuthInitialState = {
  allWordsForTraining: [],
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
      state.trainingWords = getRandomAndMixedWords(payload.dictionary, payload.wordsCount);
    },
    getAllWordsForTraining(state, { payload }: PayloadAction<UserDictionary>) {
      state.allWordsForTraining = getTrainingWords(payload);
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

export const { getWordsForTraining, getAllWordsForTraining } = userTrainingSlice.actions
export const selectorUserTrainingSlice = (state: RootState) =>
  state.userTrainingSlice

export default userTrainingSlice.reducer
