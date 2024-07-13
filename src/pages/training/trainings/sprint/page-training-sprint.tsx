import FooterTraining from '@/components/trainings/footer-training'
import HeaderTraining from '@/components/trainings/header-training'
import LayoutTraining from '@/components/trainings/layout-training'
import { Button } from '@/components/ui/button'
import TypographyH2 from '@/components/ui/typography/typography-h2'
import TypographyH4 from '@/components/ui/typography/typography-h4'
import TypographyP from '@/components/ui/typography/typography-p'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import { ROUTES } from '@/routes'
import {
  selectorUserTrainingSlice,
  setCorrectAnswerInTrainingList,
  // setCorrectAnswerForWords,
  updateProgressInDictionary,
} from '@/store/reducers/userTrainingSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PageTrainingSprint = () => {
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
  console.log(progress)

  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  const handleAnswer = (isCorrect: boolean) => {
    setCurrentQuestion(currentQuestion + 1)
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
    if (showResult) {
      dispatch(updateProgressInDictionary())
    }
  }, [showResult, dispatch])

  return (
    <LayoutTraining>
      <HeaderTraining progress={progress} handleClose={handleClose} />
      <div className='w-full flex-auto flex flex-col gap-5'>
        <TypographyH4>
          Fast learning of many words in a short period of time:
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
              <div className='w-full text-wrap h-auto p-3 rounded-xl border flex items-center justify-start gap-2'>
                <TypographyP className='text-base font-medium'>
                  {question.answers[0]}
                </TypographyP>
              </div>
            </div>
            <div className='w-full h-[25dvh] flex gap-2 items-center justify-center'>
              <Button
                size={'lg'}
                onClick={() =>
                  handleAnswer(question.answers[0] === question.correctAnswer)
                }
              >
                True
              </Button>
              <Button
                size={'lg'}
                variant={'destructive'}
                onClick={() =>
                  handleAnswer(question.answers[0] !== question.correctAnswer)
                }
              >
                False
              </Button>
            </div>
          </div>
        )}
      </div>
      <FooterTraining correct={correctAnswers} incorrect={incorrectAnswers} />
    </LayoutTraining>
  )
}

export default PageTrainingSprint
