export type WordData = Word[]

export interface Word {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License2
  sourceUrls: string[]
}

export interface Phonetic {
  text: string
  audio: string
  sourceUrl?: string
  license?: License
}

export interface License {
  name: string
  url: string
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

export interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

export interface License2 {
  name: string
  url: string
}

export interface ErrorWord {
  title: string
  message: string
  resolution: string
}