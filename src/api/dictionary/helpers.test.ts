import { expect, describe, beforeEach, it } from 'vitest'
import { addDefinition, removeWord, updateListOfWords } from './helpers'
import { UserDictionary } from './types'

describe('addDefinition', () => {
  it('should add a new definition to an existing word', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['a fruit'], progress: 20 },
      { word: 'banana', definitions: ['a fruit'], progress: 0 },
    ]
    const newDictionary = addDefinition(dictionary, 'apple', 'a yellow fruit')
    expect(newDictionary).toEqual([
      {
        word: 'apple',
        definitions: ['a fruit', 'a yellow fruit'],
        progress: 20,
      },
      { word: 'banana', definitions: ['a fruit'], progress: 0 },
    ])
  })

  it('should add a new word to the dictionary', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['a fruit'], progress: 20 },
      { word: 'banana', definitions: ['a fruit'], progress: 0 },
    ]
    const newDictionary = addDefinition(dictionary, 'pear', 'a fruit')
    expect(newDictionary).toEqual([
      { word: 'apple', definitions: ['a fruit'], progress: 20 },
      { word: 'banana', definitions: ['a fruit'], progress: 0 },
      { word: 'pear', definitions: ['a fruit'], progress: 0 },
    ])
  })

  it('should not add a duplicate definition to a word', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['a fruit'], progress: 20 },
      { word: 'banana', definitions: ['a fruit'], progress: 0 },
    ]
    const newDictionary = addDefinition(dictionary, 'apple', 'a fruit')
    expect(newDictionary).toEqual(dictionary)
  })
})

describe('updateListOfWords', () => {
  let dictionary: UserDictionary
  let listOfWords: UserDictionary

  beforeEach(() => {
    dictionary = [
      {
        word: 'apple',
        definitions: ['a fruit', 'tasty'],
        progress: 0,
      },
      {
        word: 'banana',
        definitions: ['a fruit', 'yellow'],
        progress: 0,
      },
    ]

    listOfWords = [
      {
        word: 'apple',
        definitions: ['a fruit', 'tasty'],
        progress: 20,
      },
      {
        word: 'orange',
        definitions: ['a fruit', 'orange'],
        progress: 0,
      },
    ]
  })

  it('should return an updated dictionary with the same list of words', () => {
    const updatedDictionary = updateListOfWords(dictionary, listOfWords)

    expect(updatedDictionary).toEqual([
      {
        word: 'apple',
        definitions: ['a fruit', 'tasty'],
        progress: 20,
      },
      {
        word: 'banana',
        definitions: ['a fruit', 'yellow'],
        progress: 0,
      },
    ])
  })

  it('should return the original dictionary if the list of words is empty', () => {
    listOfWords = []

    const updatedDictionary = updateListOfWords(dictionary, listOfWords)

    expect(updatedDictionary).toEqual(dictionary)
  })

  it('should return the original dictionary if the dictionary is empty', () => {
    dictionary = []

    const updatedDictionary = updateListOfWords(dictionary, listOfWords)

    expect(updatedDictionary).toEqual(dictionary)
  })

  it('should return an empty array if both the dictionary and the list of words are empty', () => {
    dictionary = []
    listOfWords = []

    const updatedDictionary = updateListOfWords(dictionary, listOfWords)

    expect(updatedDictionary).toEqual([])
  })
})

import { removeDefinition } from './helpers'

describe('removeDefinition function', () => {
  it('should remove a definition from an existing word', () => {
    const dictionary = [
      { word: 'apple', definitions: ['fruit', 'tech'], progress: 20 },
      { word: 'banana', definitions: ['fruit'], progress: 0 },
    ]
    const updatedDictionary = removeDefinition(dictionary, 'apple', 'tech')
    expect(updatedDictionary).toEqual([
      { word: 'apple', definitions: ['fruit'], progress: 20 },
      { word: 'banana', definitions: ['fruit'], progress: 0 },
    ])
  })

  it('should handle removing a non-existent definition', () => {
    const dictionary = [{ word: 'apple', definitions: ['fruit'], progress: 0 }]
    const updatedDictionary = removeDefinition(dictionary, 'apple', 'tech')
    expect(updatedDictionary).toEqual([
      { word: 'apple', definitions: ['fruit'], progress: 0 },
    ])
  })

  it('should remove word if no definitions left after deletion', () => {
    const dictionary = [{ word: 'apple', definitions: ['fruit'], progress: 20 }]
    const updatedDictionary = removeDefinition(dictionary, 'apple', 'fruit')
    expect(updatedDictionary).toEqual([])
  })

  it('should handle removing a definition from a non-existent word', () => {
    const dictionary = [{ word: 'apple', definitions: ['fruit'], progress: 0 }]
    const updatedDictionary = removeDefinition(dictionary, 'banana', 'fruit')
    expect(updatedDictionary).toEqual([
      { word: 'apple', definitions: ['fruit'], progress: 0 },
    ])
  })
})

describe('removeWord function', () => {
  it('should remove a word that exists in the dictionary', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['fruit'], progress: 0 },
      { word: 'banana', definitions: ['fruit'], progress: 20 },
    ];
    const wordToRemove = 'apple';
    const expectedDictionary: UserDictionary = [
      { word: 'banana', definitions: ['fruit'], progress: 20 },
    ];
    
    const result = removeWord(dictionary, wordToRemove);
    
    expect(result).toEqual(expectedDictionary);
  });

  it('should handle removing a word that does not exist in the dictionary', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['fruit'], progress: 20 },
      { word: 'banana', definitions: ['fruit'], progress: 0 },
    ];
    const wordToRemove = 'orange'; // Word not in the dictionary
    const expectedDictionary: UserDictionary = [
      { word: 'apple', definitions: ['fruit'], progress: 20 },
      { word: 'banana', definitions: ['fruit'], progress: 0 },
    ];
    
    const result = removeWord(dictionary, wordToRemove);
    
    expect(result).toEqual(expectedDictionary);
  });
});