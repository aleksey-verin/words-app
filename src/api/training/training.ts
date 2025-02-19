import { UserDictionary } from '../dictionary/types'
import { TrainingQuestion } from './types'

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

  return training_list.map((singleWord) => {
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
      answers: answers,
      correctAnswer: correctAnswer,
      isUserAnswerCorrect: false,
    }
  })
}

export function generateTrainingQuestionsForDefinitions(
  training_list: UserDictionary
): TrainingQuestion[] {
  // Собираем все возможные слова для случайного выбора неправильных ответов
  const allWords: string[] = training_list.map((singleWord) => singleWord.word)

  return training_list.map((singleWord) => {
    // Выбираем случайное определение как вопрос
    const question =
      singleWord.definitions[
        Math.floor(Math.random() * singleWord.definitions.length)
      ]

    // Извлекаем правильный ответ
    const correctAnswer = singleWord.word

    // Выбираем случайные ответы, исключая правильный ответ
    const wrongAnswers = allWords
      .filter((word) => word !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    // Собираем 4 ответа, включая правильный, и перемешиваем их
    const answers = [correctAnswer, ...wrongAnswers].sort(
      () => 0.5 - Math.random()
    )

    return {
      question: question,
      answers: answers,
      correctAnswer: correctAnswer,
      isUserAnswerCorrect: false,
    }
  })
}

export function generateTrueFalseQuestions(
  training_list: UserDictionary
): TrainingQuestion[] {
  return training_list.map((singleWord) => {
    // Решаем случайным образом, будет ли значение правильным или нет
    const isCorrectAnswer = Math.random() > 0.5

    let displayedDefinition: string
    let correctDefinition: string

    if (isCorrectAnswer) {
      // Если правильный ответ, выбираем случайное определение из текущего слова
      displayedDefinition =
        singleWord.definitions[
          Math.floor(Math.random() * singleWord.definitions.length)
        ]
      correctDefinition = displayedDefinition
    } else {
      // Если неправильный ответ, выбираем случайное определение из других слов
      const otherDefinitions = training_list
        .flatMap((word) => word.definitions)
        .filter((def) => !singleWord.definitions.includes(def))
      displayedDefinition =
        otherDefinitions[Math.floor(Math.random() * otherDefinitions.length)]
      correctDefinition =
        singleWord.definitions[
          Math.floor(Math.random() * singleWord.definitions.length)
        ]
    }

    return {
      question: singleWord.word,
      answers: [displayedDefinition],
      correctAnswer: correctDefinition,
      isUserAnswerCorrect: false,
    }
  })
}

export function generateLettersQuestions(
  training_list: UserDictionary
): TrainingQuestion[] {
  return training_list.map((singleWord) => {
    const question =
      singleWord.definitions[
        Math.floor(Math.random() * singleWord.definitions.length)
      ]

    return {
      question: question,
      answers: [singleWord.word],
      correctAnswer: singleWord.word,
      isUserAnswerCorrect: false,
    }
  })
}

export function updateResultInTrainingList(
  wordForCurrentTraining: UserDictionary,
  trainingWords: TrainingQuestion[],
  stepForProgress: number
): UserDictionary {
  const deepCopiedWords = JSON.parse(JSON.stringify(wordForCurrentTraining))

  trainingWords.forEach((item, index) => {
    if (item.isUserAnswerCorrect === true) {
      deepCopiedWords[index].progress =
        deepCopiedWords[index].progress + stepForProgress
    }
  })

  return deepCopiedWords
}
