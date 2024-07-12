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
  setCorrectAnswerForWords,
  updateProgressInDictionary,
} from '@/store/reducers/userTrainingSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PageTrainingWords = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { trainingWords: trainingList } = useAppSelector(selectorUserTrainingSlice)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const numberOfTrainingWords = trainingList.length
  const question = trainingList[currentQuestion]
  const isTrainingFinished = currentQuestion >= numberOfTrainingWords - 1
  const progress = Math.round((100 / (numberOfTrainingWords + 1)) * (currentQuestion + 1))
  console.log(progress);

  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  const handleAnswer = (isCorrect: boolean) => {
    setCurrentQuestion(currentQuestion + 1)
    if (isCorrect) {
      dispatch(setCorrectAnswerForWords(currentQuestion))
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setIncorrectAnswers(incorrectAnswers + 1)
    }
    if (isTrainingFinished) {
      setShowResult(true)
    }
  }

  useEffect(() => {
    if (showResult) {
      dispatch(updateProgressInDictionary())
    }
  }, [showResult, dispatch]);

  return (
    <LayoutTraining>
      <HeaderTraining progress={progress} handleClose={handleClose} />
      <div className='w-full flex-auto flex flex-col'>
        <TypographyH4>
          Choose the correct definition for the given word:
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
          <div className='flex-auto flex flex-col items-center justify-center gap-6'>
            <TypographyH2 className='text-center'>
              {question?.question}
            </TypographyH2>
            <div className='flex flex-col gap-2'>
              {question?.answers?.map((answer, index) => (
                <Button
                  key={index}
                  className='w-full text-wrap h-auto text-base'
                  variant={'outline'}
                  onClick={() =>
                    handleAnswer(answer === question.correctAnswer)
                  }
                >
                  {answer}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterTraining correct={correctAnswers} incorrect={incorrectAnswers} />
    </LayoutTraining>
  )
}

export default PageTrainingWords
