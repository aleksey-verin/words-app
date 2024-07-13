import { UserDictionary } from '@/api/dictionary/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import {
  generateLettersQuestions,
  generateTrainingQuestionsForDefinitions,
  generateTrainingQuestionsForWords,
  generateTrueFalseQuestions,
  getRandomAndMixedWords,
  getTrainingWords,
  updateResultInTrainingList,
} from '@/api/training/training'
import { TrainingQuestion } from '@/api/training/types'
import { updateDictionary } from './userDictionarySlice'

export type TrainingType = 'WORDS' | 'DEFINITIONS' | 'SPRINT' | 'LETTERS'

export interface UserAuthInitialState {
  allWordsForTraining: UserDictionary
  wordsForCurrentTraining: UserDictionary
  trainingList: TrainingQuestion[]
  // trainingDefinitions: TrainingQuestion[]
  // trainingSprint: TrainingQuestion[]
  // trainingLetters: TrainingQuestion[]
  stepForProgress: number
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: UserAuthInitialState = {
  allWordsForTraining: [],
  wordsForCurrentTraining: [],
  trainingList: [],
  // trainingDefinitions: [],
  // trainingSprint: [],
  // trainingLetters: [],
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
    const trainingList = thunkAPI.getState().userTrainingSlice.trainingList
    const stepForProgress =
      thunkAPI.getState().userTrainingSlice.stepForProgress

    const listForUpdate = updateResultInTrainingList(
      wordForCurrentTraining,
      trainingList,
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
    getTrainingList(
      state,
      {
        payload,
      }: PayloadAction<{
        type: TrainingType
        dictionary: UserDictionary
        wordsCount: number
      }>
    ) {
      const wordsForCurrentTraining = getRandomAndMixedWords(
        payload.dictionary,
        payload.wordsCount
      )
      state.wordsForCurrentTraining = wordsForCurrentTraining

      switch (payload.type) {
        case 'WORDS':
          state.trainingList = generateTrainingQuestionsForWords(
            wordsForCurrentTraining
          )
          break
        case 'DEFINITIONS':
          state.trainingList = generateTrainingQuestionsForDefinitions(
            wordsForCurrentTraining
          )
          break
        case 'SPRINT':
          state.trainingList = generateTrueFalseQuestions(
            wordsForCurrentTraining
          )
          break
        case 'LETTERS':
          state.trainingList = generateLettersQuestions(wordsForCurrentTraining)
          break
        default:
          break
      }
    },
    // getTrainingQuestionsForDefinitions(
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{ dictionary: UserDictionary; wordsCount: number }>
    // ) {
    //   const wordsForCurrentTraining = getRandomAndMixedWords(
    //     payload.dictionary,
    //     payload.wordsCount
    //   )
    //   state.wordsForCurrentTraining = wordsForCurrentTraining
    //   state.trainingDefinitions = generateTrainingQuestionsForDefinitions(
    //     wordsForCurrentTraining
    //   )
    // },
    setCorrectAnswerInTrainingList(state, { payload }: PayloadAction<number>) {
      state.trainingList[payload].isUserAnswerCorrect = true
    },
    // setCorrectAnswerForDefinitions(state, { payload }: PayloadAction<number>) {
    //   state.trainingDefinitions[payload].isUserAnswerCorrect = true
    // },
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
  getAllWordsForTraining,
  getTrainingList,
  setCorrectAnswerInTrainingList,
  // getTrainingQuestionsForDefinitions,
  // setCorrectAnswerForWords,
  // setCorrectAnswerForDefinitions,
} = userTrainingSlice.actions
export const selectorUserTrainingSlice = (state: RootState) =>
  state.userTrainingSlice

export default userTrainingSlice.reducer
