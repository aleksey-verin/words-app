import { expect, describe, it } from 'vitest'
import { getRandomWords } from './training';
import { UserDictionary } from '../dictionary/types';

describe('getRandomWords', () => {
  it('should return 5 random words if amount 5 and there more than 5 words', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['a fruit', 'tasty'], progress: 20 },
      { word: 'banana', definitions: ['a fruit', 'yellow'], progress: 0 },
      { word: 'orange', definitions: ['a fruit', 'orange in color'], progress: 50 },
      { word: 'grape', definitions: ['a small fruit', 'purple or green'], progress: 100 },
      { word: 'kiwi', definitions: ['a fruit', 'brown and fuzzy'], progress: 30 },
      { word: 'melon', definitions: ['a large fruit', 'sweet'], progress: 80 },
      { word: 'peach', definitions: ['a fruit', 'fuzzy skin'], progress: 70 },
      { word: 'plum', definitions: ['a fruit', 'purple'], progress: 90 },
      { word: 'pear', definitions: ['a fruit', 'green or yellow'], progress: 60 },
      { word: 'strawberry', definitions: ['a fruit', 'red and sweet'], progress: 0 }
    ];

    const wordForTraining = getRandomWords(dictionary, 5)
    expect(wordForTraining.length).toEqual(5)
  })
  it('should return 5 random words if amount 10 but there only 5 words', () => {
    const dictionary: UserDictionary = [
      { word: 'apple', definitions: ['a fruit', 'tasty'], progress: 20 },
      { word: 'banana', definitions: ['a fruit', 'yellow'], progress: 0 },
      { word: 'orange', definitions: ['a fruit', 'orange in color'], progress: 50 },
      { word: 'grape', definitions: ['a small fruit', 'purple or green'], progress: 80 },
      { word: 'kiwi', definitions: ['a fruit', 'brown and fuzzy'], progress: 30 },
    ];
    const wordForTraining = getRandomWords(dictionary, 10)
    expect(wordForTraining.length).toEqual(5)
  })
})