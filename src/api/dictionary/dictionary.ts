import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { UserDictionary } from './types'

export async function getUserDictionary(email: string): Promise<UserDictionary | undefined> {
  if (!email) return
  const docRef = doc(db, `dictionary-${email}`, 'user-dictionary')
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data().dictionary
  } else {
    await setDoc(docRef, {
      dictionary: [],
    })
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().dictionary
    }
  }
}

export async function addInUserDictionary(
  email: string,
  word: string,
  definition: string,
  dictionary: UserDictionary
) {
  if (!email) return
  const newData = [
    {
      word,
      definition: [definition],
      progress: 0,
    },
    ...dictionary,
  ]
  await setDoc(doc(db, `dictionary-${email}`, 'user-dictionary'), {
    dictionary: newData,
  })
}
