import { UserDictionary } from '@/api/dictionary/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import {
  generateTrainingQuestionsForDefinitions,
  generateTrainingQuestionsForWords,
  getRandomAndMixedWords,
  getTrainingWords,
  updateResultInTrainingList,
} from '@/api/training/training'
import { TrainingQuestion } from '@/api/training/types'
import { updateDictionary } from './userDictionarySlice'

export interface UserAuthInitialState {
  allWordsForTraining: UserDictionary
  wordsForCurrentTraining: UserDictionary
  trainingWords: TrainingQuestion[]
  trainingDefinitions: TrainingQuestion[]
  trainingSprint: TrainingQuestion[]
  trainingLetters: TrainingQuestion[]
  stepForProgress: number
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: UserAuthInitialState = {
  allWordsForTraining: [],
  wordsForCurrentTraining: [],
  trainingWords: [],
  trainingDefinitions: [],
  trainingSprint: [],
  trainingLetters: [],
  stepForProgress: 20,

  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const updateProgressInDictionary = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('updateProgressInDictionary', async (_, thunkAPI) => {
  try {
    const wordForCurrentTraining =
      thunkAPI.getState().userTrainingSlice.wordsForCurrentTraining
    const trainingWords = thunkAPI.getState().userTrainingSlice.trainingWords
    const stepForProgress =
      thunkAPI.getState().userTrainingSlice.stepForProgress

    const listForUpdate = updateResultInTrainingList(
      wordForCurrentTraining,
      trainingWords,
      stepForProgress
    )
    await thunkAPI.dispatch(updateDictionary(listForUpdate))
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userTrainingSlice = createSlice({
  name: 'userTrainingSlice',
  initialState,
  reducers: {
    getAllWordsForTraining(state, { payload }: PayloadAction<UserDictionary>) {
      state.allWordsForTraining = getTrainingWords(payload)
    },
    getTrainingQuestionsForWords(
      state,
      {
        payload,
      }: PayloadAction<{ dictionary: UserDictionary; wordsCount: number }>
    ) {
      const wordsForCurrentTraining = getRandomAndMixedWords(
        payload.dictionary,
        payload.wordsCount
      )
      state.wordsForCurrentTraining = wordsForCurrentTraining
      state.trainingWords = generateTrainingQuestionsForWords(
        wordsForCurrentTraining
      )
    },
    getTrainingQuestionsForDefinitions(
      state,
      {
        payload,
      }: PayloadAction<{ dictionary: UserDictionary; wordsCount: number }>
    ) {
      const wordsForCurrentTraining = getRandomAndMixedWords(
        payload.dictionary,
        payload.wordsCount
      )
      state.wordsForCurrentTraining = wordsForCurrentTraining
      state.trainingDefinitions = generateTrainingQuestionsForDefinitions(
        wordsForCurrentTraining
      )
    },
    setCorrectAnswerForWords(state, { payload }: PayloadAction<number>) {
      state.trainingWords[payload].userResultCorrect = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProgressInDictionary.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(updateProgressInDictionary.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(updateProgressInDictionary.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {
  getTrainingQuestionsForWords,
  getTrainingQuestionsForDefinitions,
  getAllWordsForTraining,
  setCorrectAnswerForWords,
} = userTrainingSlice.actions
export const selectorUserTrainingSlice = (state: RootState) =>
  state.userTrainingSlice

export default userTrainingSlice.reducer
