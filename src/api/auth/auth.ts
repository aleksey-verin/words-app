import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { AuthData } from './types'
import { auth } from '@/lib/firebase';

export async function checkAuth(): Promise<AuthData> {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          isAuth: true,
          user: {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      } else {
        resolve({
          isAuth: false,
          user: null,
        });
      }
      unsubscribe();
    }, reject);
  });
}

export async function logInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const response = await signInWithPopup(auth, provider)
  return response
}

export async function logOut() {
  await auth.signOut()
}
