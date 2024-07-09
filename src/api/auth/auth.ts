import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { UserData } from './types'
import { auth } from '@/lib/firebase';

export async function checkAuthAndGetData(): Promise<UserData | null> {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        resolve(null);
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
