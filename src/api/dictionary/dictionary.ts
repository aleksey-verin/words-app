import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { UserDictionary } from './types'
import { addDefinition, removeDefinition } from './helpers'

const user_dictionary = 'user-dictionary'

export async function getUserDictionary(
  email: string
): Promise<UserDictionary | undefined> {
  if (!email) return
  const docRef = doc(db, email, user_dictionary)
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

  const newData = addDefinition(dictionary, word, definition)
  await setDoc(doc(db, email, user_dictionary), {
    dictionary: newData,
  })
}

export async function removeFromUserDictionary(
  email: string,
  word: string,
  definition: string,
  dictionary: UserDictionary
) {
  if (!email) return

  const newData = removeDefinition(dictionary, word, definition)
  await setDoc(doc(db, email, user_dictionary), {
    dictionary: newData,
  })
}



