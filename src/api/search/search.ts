import { Word } from "./types"

export async function requestWord(word: string) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  )
  const data = (await response.json()) as Word[]
  return data[0]
}