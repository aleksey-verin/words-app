import { configureStore } from '@reduxjs/toolkit'
import userAuthSlice from './reducers/userAuthSlice'
import userDictionarySlice from './reducers/userDictionarySlice'
import searchSlice from './reducers/searchSlice'
import userTrainingSlice from './reducers/userTrainingSlice'
// import { storage, storageSetItem } from '@/lib/localstorage';

export const store = configureStore({
  reducer: {
    userAuthSlice,
    searchSlice,
    userDictionarySlice,
    userTrainingSlice
  },
})

// store.subscribe(() => {
//   storageSetItem(storage.user, store.getState().userAuthSlice.user);
//   storageSetItem(storage.isAuth, store.getState().userAuthSlice.isAuth);
// });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch