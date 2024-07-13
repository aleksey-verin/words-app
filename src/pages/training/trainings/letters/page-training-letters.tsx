import { shuffleArray } from '@/api/training/helpers'
import FooterTraining from '@/components/trainings/footer-training'
import HeaderTraining from '@/components/trainings/header-training'
import LayoutTraining from '@/components/trainings/layout-training'
import { Button } from '@/components/ui/button'
import TypographyH2 from '@/components/ui/typography/typography-h2'
import TypographyH4 from '@/components/ui/typography/typography-h4'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import { ROUTES } from '@/routes'
import {
  selectorUserTrainingSlice,
  setCorrectAnswerInTrainingList,
  // setCorrectAnswerForWords,
  updateProgressInDictionary,
} from '@/store/reducers/userTrainingSlice'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PageTrainingLetters = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { trainingList } = useAppSelector(selectorUserTrainingSlice)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const numberOfTrainingWords = trainingList.length
  const question = trainingList[currentQuestion]
  const isTrainingFinished = currentQuestion >= numberOfTrainingWords - 1
  const progress = Math.round(
    (100 / (numberOfTrainingWords + 1)) * (currentQuestion + 1)
  )

  const correctAnswer = useMemo(() => getLettersArray(question.answers),[question])
  const [answer, setAnswer] = useState<Letter[]>(shuffleArray(correctAnswer))
  const [userAnswer, setUserAnswer] = useState<Letter[]>([])

  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  const handleResult = () => {
    setCurrentQuestion(currentQuestion + 1)
    // setUserAnswer([])

    const finalAnswer = userAnswer.map((item) => item.letter).join('')
    const targetAnswer = question.answers.join('').toLocaleUpperCase()
    const isCorrect = finalAnswer === targetAnswer
    if (isCorrect) {
      dispatch(setCorrectAnswerInTrainingList(currentQuestion))
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setIncorrectAnswers(incorrectAnswers + 1)
    }
    if (isTrainingFinished) {
      setShowResult(true)
    }
  }

  useEffect(() => {
    setAnswer(shuffleArray(correctAnswer))
    setUserAnswer([])
  }, [correctAnswer, currentQuestion]);

  const handleClickAnswerLetter = (letter: Letter) => {
    setUserAnswer([...userAnswer, letter])
    setAnswer(answer.filter((item) => item.id !== letter.id))
  }

  const handleClickResultLetter = (letter: Letter) => {
    setAnswer([...answer, letter])
    setUserAnswer(userAnswer.filter((item) => item.id !== letter.id))
  }

  useEffect(() => {
    if (showResult) {
      dispatch(updateProgressInDictionary())
    }
  }, [showResult, dispatch])

  return (
    <LayoutTraining>
      <HeaderTraining progress={progress} handleClose={handleClose} />
      <div className='w-full flex-auto flex flex-col gap-5'>
        <TypographyH4>
          Make up the correct word from the given letters:
        </TypographyH4>
        {showResult ? (
          <div className='flex flex-col gap-2'>
            <TypographyH4>
              You answered {correctAnswers} correct answers
            </TypographyH4>
            <TypographyH4>
              You answered {incorrectAnswers} incorrect answers
            </TypographyH4>
          </div>
        ) : (
          <div className='flex-auto flex flex-col items-center justify-center gap-5'>
            <div className='w-full flex-auto flex flex-col gap-5 items-center justify-center'>
              <TypographyH2 className='text-center text-balance'>
                {question?.question}
              </TypographyH2>
              <div className='w-full flex-auto text-wrap h-auto p-3 rounded-xl border flex items-center justify-center'>
                <div className='w-full flex justify-center flex-wrap gap-1'>
                  {userAnswer.map((item) => (
                    <Button
                      key={item.id}
                      variant={'outline'}
                      size={'sm'}
                      className='bg-green-200 dark:bg-green-900'
                      onClick={() => handleClickResultLetter(item)}
                    >
                      {item.letter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full h-[20dvh] flex items-center justify-center'>
              <div className='grid grid-cols-5 justify-center gap-1'>
                {answer.map((item) => (
                  <div
                    className='w-10 h-10 border rounded-md flex items-center justify-center cursor-pointer'
                    key={item.id}
                    onClick={() => handleClickAnswerLetter(item)}
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            </div>
            <div className='w-full h-[10dvh] flex gap-2 items-center justify-center'>
              <Button size={'lg'} onClick={handleResult}>
                Check answer
              </Button>
            </div>
          </div>
        )}
      </div>
      <FooterTraining correct={correctAnswers} incorrect={incorrectAnswers} />
    </LayoutTraining>
  )
}

export default PageTrainingLetters

interface Letter {
  id: number
  letter: string
}

function getLettersArray(word: string[]): Letter[] {
  const lettersArray = word.join().toLocaleUpperCase().split('')

  return lettersArray.map((letter, index) => ({
    id: index,
    letter,
  }))
}
