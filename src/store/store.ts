import { configureStore } from '@reduxjs/toolkit'
import userAuthSlice from './reducers/userAuthSlice'
// import { storage, storageSetItem } from '@/lib/localstorage';

export const store = configureStore({
  reducer: {
    userAuthSlice
  },
})

// store.subscribe(() => {
//   storageSetItem(storage.user, store.getState().userAuthSlice.user);
//   storageSetItem(storage.isAuth, store.getState().userAuthSlice.isAuth);
// });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch