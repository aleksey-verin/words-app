import { SingleWord, UserDictionary } from "./types";

export function addDefinition(
  dictionary: UserDictionary,
  word: string,
  definition: string
): UserDictionary {

  const newDictionary = dictionary.map(entry => ({
    ...entry,
    definitions: [...entry.definitions]
  }));
  // Найти индекс слова в словаре
  const index = newDictionary.findIndex(entry => entry.word === word);

  if (index !== -1) {
    // Если слово найдено, проверить наличие определения
    if (!newDictionary[index].definitions.includes(definition)) {
      // Добавить определение, если его нет в списке
      newDictionary[index].definitions.push(definition);
    }
  } else {
    // Если слово не найдено, добавить его в словарь
    const newWord: SingleWord = {
      word: word,
      definitions: [definition],
      progress: 0
    };
    newDictionary.push(newWord);
  }

  return newDictionary;
}

export function updateListOfWords(
  dictionary: UserDictionary,
  listOfWords: UserDictionary,
): UserDictionary {

  const newDictionary = dictionary.map(entry => ({
    ...entry,
    definitions: [...entry.definitions]
  }));

  const newListOfWords = listOfWords.map(entry => ({
    ...entry,
    definitions: [...entry.definitions]
  }));

  const newArray = newDictionary.map(entry => {
    const index = newListOfWords.findIndex(item => item.word === entry.word);
    if (index !== -1) {
      return newListOfWords[index];
  } else {
    return entry;
  }})

  return newArray;
}

export function removeDefinition(
  dictionary: UserDictionary,
  word: string,
  definition: string
): UserDictionary {
  // Копируем словарь, чтобы не изменять оригинальный объект
  const newDictionary = dictionary.map(entry => ({
    ...entry,
    definitions: [...entry.definitions]
  }));

  // Найти индекс слова в словаре
  const index = newDictionary.findIndex(entry => entry.word === word);

  if (index !== -1) {
    // Если слово найдено, удалить определение, если оно существует
    newDictionary[index].definitions = newDictionary[index].definitions.filter(def => def !== definition);

    // Если после удаления определений не осталось, удалить слово из словаря
    if (newDictionary[index].definitions.length === 0) {
      newDictionary.splice(index, 1);
    }
  }

  return newDictionary;
}

export function removeWord(
  dictionary: UserDictionary,
  word: string,
): UserDictionary {
  // Копируем словарь, чтобы не изменять оригинальный объект
  const copyDictionary = dictionary.map(entry => ({
    ...entry,
    definitions: [...entry.definitions]
  }));

  const newDictionary = copyDictionary.filter(item => item.word !== word);

  return newDictionary;
}
