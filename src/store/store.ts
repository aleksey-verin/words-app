import { configureStore } from '@reduxjs/toolkit'
import userAuthSlice from './reducers/userAuthSlice'
// ...

export const store = configureStore({
  reducer: {
    userAuthSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// import { configureStore } from '@reduxjs/toolkit'
// import userAuthSlice from './reducers/userAuthSlice'

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       userAuthSlice
//     }
//   })
// }

// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

// import { configureStore } from '@reduxjs/toolkit';
// import userAuthSlice from './reducers/userAuthSlice';
// import { storage, storageSetItem } from '@/lib/localstorage';

// export const store = configureStore({
//   reducer: {
//     userAuthSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
//   // .concat(firestoreApi.middleware)
// });

// store.subscribe(() => {
//   storageSetItem(storage.user, store.getState().userAuthSlice.user);
// });

// export type IRootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch