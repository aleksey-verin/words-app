import FooterTraining from '@/components/trainings/footer-training'
import HeaderTraining from '@/components/trainings/header-training'
import LayoutTraining from '@/components/trainings/layout-training'
import ResultTraining from '@/components/trainings/result-training'
import TypographyH3 from '@/components/ui/typography/typography-h3'
import TypographyH4 from '@/components/ui/typography/typography-h4'
import TypographyP from '@/components/ui/typography/typography-p'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import { ROUTES } from '@/routes'
import {
  selectorUserTrainingSlice,
  setCorrectAnswerInTrainingList,
  updateProgressInDictionary,
} from '@/store/reducers/userTrainingSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PageTrainingDefinitions = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { trainingList } = useAppSelector(selectorUserTrainingSlice)

  const [currentQuestionCount, setCurrentQuestionCount] = useState<number>(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState<number>(0)
  const [showResult, setShowResult] = useState(false)

  const numberOfTrainingWords = trainingList.length
  const question = trainingList[currentQuestionCount]
  const isTrainingFinished = currentQuestionCount >= numberOfTrainingWords - 1
  const progress = Math.round(
    (100 / (numberOfTrainingWords + 1)) * (currentQuestionCount + 1)
  )

  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  const handleAnswer = (isCorrect: boolean) => {
    setCurrentQuestionCount(currentQuestionCount + 1)
    if (isCorrect) {
      dispatch(setCorrectAnswerInTrainingList(currentQuestionCount))
      setCorrectAnswersCount(correctAnswersCount + 1)
    } else {
      setIncorrectAnswersCount(incorrectAnswersCount + 1)
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
          Choose the correct word for the given definition:
        </TypographyH4>
        {showResult ? (
          <ResultTraining
            correct={correctAnswersCount}
            incorrect={incorrectAnswersCount}
            trainingList={trainingList}
          />
        ) : (
          <div className='flex-auto flex flex-col items-center justify-center gap-5'>
            <TypographyH3 className='text-center text-balance'>
              {question?.question}
            </TypographyH3>
            <div className='w-full flex flex-col gap-2'>
              {question?.answers?.map((answer, index) => (
                <div
                  key={index}
                  className='w-full text-wrap h-auto p-3 rounded-xl border flex items-center justify-center gap-2 transition-colors cursor-pointer active:bg-muted sm:hover:bg-muted'
                  onClick={() =>
                    handleAnswer(answer === question.correctAnswer)
                  }
                >
                  <TypographyP className='text-base font-medium'>
                    {answer}
                  </TypographyP>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterTraining correct={correctAnswersCount} incorrect={incorrectAnswersCount} />
    </LayoutTraining>
  )
}

export default PageTrainingDefinitions
