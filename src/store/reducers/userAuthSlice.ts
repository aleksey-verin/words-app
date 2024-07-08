import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from '../store'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const userSign = {
  in: 'signIn',
  out: 'signOut',
} as const

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

export const userAuthLogin = createAsyncThunk<
  UserData | null,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('userAuthLogin', async (_, thunkAPI) => {
  try {
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
    if (response) {
      const { email, uid, displayName, photoURL } = response.user
      return {
        email,
        uid,
        displayName,
        photoURL,
      }
    } else {
      return thunkAPI.rejectWithValue('no auth')
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const userAuthLogout = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('userAuthLogout', async (_, thunkAPI) => {
  try {
    await auth.signOut()
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
    builder.addCase(userAuthLogin.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      userAuthLogin.fulfilled,
      (state, { payload }: PayloadAction<UserData | null>) => {
        state.user = payload
        state.isAuth = true
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(userAuthLogin.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(userAuthLogout.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(userAuthLogout.fulfilled, (state) => {
      state.user = null
      state.isAuth = false
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(userAuthLogout.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectorUserAuthSlice = (state: RootState) => state.userAuthSlice

export default userAuthSlice.reducer

// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// // import { storage, storageGetItem } from '@/lib/localstorage'
// import { auth } from '@/lib/firebase'
// import { AppDispatch, IRootState } from '../store'

// export const userSign = {
//   in: 'signIn',
//   out: 'signOut',
// }

// interface UserData {
//   email: string
//   uid: string
//   displayName: string
//   photoURL: string
// }

// interface InitialState {
//   user: UserData | null
//   isLoading: boolean
//   isSuccess: boolean
//   isError: boolean
// }

// const initialState = {
//   user: {
//     email: '',
//     uid: '',
//     displayName: '',
//     photoURL: '',
//   },
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
// }

// export const userAuth = createAsyncThunk<
//   UserData | null,
//   string,
//   {
//     dispatch: AppDispatch
//     state: IRootState
//   }
// >('userAuth', async (typeSign, thunkAPI) => {
//   // console.log('userAuth');
//   try {
//     if (typeSign === userSign.in) {
//       const provider = new GoogleAuthProvider()
//       const response = await signInWithPopup(auth, provider)
//       const { email, uid, displayName, photoURL } = response.user
//       return {
//         email,
//         uid,
//         displayName,
//         photoURL,
//       }
//     }
//     if (typeSign === userSign.out) {
//       await auth.signOut()
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return thunkAPI.rejectWithValue(error)
//   }
// })

// const userAuthSlice = createSlice({
//   name: 'userAuthSlice',
//   initialState: initialState as InitialState,
//   extraReducers: (builder) => {
//     builder.addCase(userAuth.pending, (state) => {
//       state.isSuccess = false
//       state.isLoading = true
//       state.isError = false
//     })
//     builder.addCase(userAuth.fulfilled, (state, { payload }: PayloadAction<UserData>) => {
//       state.user = payload
//       state.isSuccess = true
//       state.isLoading = false
//     })
//     builder.addCase(userAuth.rejected, (state) => {
//       state.isLoading = false
//       state.isError = true
//     })
//   },
// })

// export const selectorUserAuth = (state: IRootState) => state.userAuthSlice

// export default userAuthSlice.reducer

// // export const firestoreApi = createApi({
// //   reducerPath: 'firestoreApi',
// //   baseQuery: fakeBaseQuery(),
// //   endpoints: (builder) => ({
// //     fetchUserDictionary: builder.query({
// //       async queryFn() {
// //         try {
// //           // console.log(user);
// //           const ref = collection(firestore, `dictionary-${userEmail}`);
// //           const querySnapshot = await getDocs(ref);
// //           const userDictionary = [];
// //           querySnapshot?.forEach((doc) => {
// //             userDictionary.push(doc.data());
// //           });
// //           return { data: userDictionary };
// //         } catch (error) {
// //           console.error(error.message);
// //           return { error: error.message };
// //         }
// //       }
// //     })
// //   })
// // });

// // export const { useFetchUserDictionaryQuery, useSetNewHighScoreMutation } = firestoreApi;
// // // const { data, isLoading, isSuccess, isError, error } = useFetchUserDictionaryQuery();
