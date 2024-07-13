import { UserDictionary } from '../dictionary/types'
import { TrainingQuestion } from './types'

// --> не используется
export function getRandomWords(
  words: UserDictionary,
  amount: number
): UserDictionary {
  // Фильтруем массив, оставляя только объекты с progress меньше 100
  const filteredWords = words.filter((wordObj) => wordObj.progress < 100)

  // Создаем глубокую копию отфильтрованного массива для обеспечения иммутабельности
  const deepCopiedWords = JSON.parse(JSON.stringify(filteredWords))

  // Алгоритм Фишера-Йетса для случайного перемешивания массива
  for (let i = deepCopiedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deepCopiedWords[i], deepCopiedWords[j]] = [
      deepCopiedWords[j],
      deepCopiedWords[i],
    ]
  }

  // Возвращаем первые `amount` объектов
  return deepCopiedWords.slice(0, amount)
}
// <-- не используется

export function getTrainingWords(words: UserDictionary): UserDictionary {
  const filteredWords = words.filter((wordObj) => wordObj.progress < 100)
  const deepCopiedWords = JSON.parse(JSON.stringify(filteredWords))
  return deepCopiedWords
}

export function getRandomAndMixedWords(
  words: UserDictionary,
  amount: number
): UserDictionary {
  const deepCopiedWords = JSON.parse(JSON.stringify(words))
  // Алгоритм Фишера-Йетса для случайного перемешивания массива
  for (let i = deepCopiedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deepCopiedWords[i], deepCopiedWords[j]] = [
      deepCopiedWords[j],
      deepCopiedWords[i],
    ]
  }

  // Возвращаем первые `amount` объектов
  return deepCopiedWords.slice(0, amount)
}

export function generateTrainingQuestionsForWords(
  training_list: UserDictionary
): TrainingQuestion[] {
  // Собираем все возможные ответы из всех определений для случайного выбора неправильных ответов
  const allDefinitions: string[] = training_list.flatMap(
    (singleWord) => singleWord.definitions
  )

  return training_list.map((singleWord, index) => {
    // Извлекаем правильный ответ
    const correctAnswer = singleWord.definitions[0]

    // Выбираем случайные ответы, исключая правильный ответ
    const wrongAnswers = allDefinitions
      .filter((definition) => definition !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    // Собираем 4 ответа, включая правильный, и перемешиваем их
    const answers = [correctAnswer, ...wrongAnswers].sort(
      () => 0.5 - Math.random()
    )

    return {
      question: singleWord.word,
      index: index,
      answers: answers,
      correctAnswer: correctAnswer,
      isUserAnswerCorrect: false,
    }
  })
}

export function generateTrainingQuestionsForDefinitions(training_list: UserDictionary): TrainingQuestion[] {
  // Собираем все возможные слова для случайного выбора неправильных ответов
  const allWords: string[] = training_list.map(singleWord => singleWord.word);

  return training_list.map((singleWord, index) => {
    // Выбираем случайное определение как вопрос
    const question = singleWord.definitions[Math.floor(Math.random() * singleWord.definitions.length)];

    // Извлекаем правильный ответ
    const correctAnswer = singleWord.word;

    // Выбираем случайные ответы, исключая правильный ответ
    const wrongAnswers = allWords
      .filter(word => word !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Собираем 4 ответа, включая правильный, и перемешиваем их
    const answers = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

    return {
      question: question,
      index: index,
      answers: answers,
      correctAnswer: correctAnswer,
      isUserAnswerCorrect: false
    };
  });
}

export function updateResultInTrainingList(
  wordForCurrentTraining: UserDictionary,
  trainingWords: TrainingQuestion[],
  stepForProgress: number
): UserDictionary {
  const deepCopiedWords = JSON.parse(JSON.stringify(wordForCurrentTraining))

  trainingWords.forEach((item, index) => {
    if (item.isUserAnswerCorrect === true) {
      deepCopiedWords[index].progress = deepCopiedWords[index].progress + stepForProgress
    }
  })

  return deepCopiedWords
}
