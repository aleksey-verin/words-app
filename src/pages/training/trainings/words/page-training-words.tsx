import FooterTraining from '@/components/trainings/footer-training'
import HeaderTraining from '@/components/trainings/header-training'
import LayoutTraining from '@/components/trainings/layout-training'
import { useAppSelector } from '@/hooks/store-hook'
import { ROUTES } from '@/routes'
import { selectorUserTrainingSlice } from '@/store/reducers/userTrainingSlice'
import { useNavigate } from 'react-router-dom'

const PageTrainingWords = () => {
  const navigate = useNavigate()
  const { trainingWords } = useAppSelector(selectorUserTrainingSlice)

  console.log(trainingWords)
  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  return (
    <LayoutTraining>
      <HeaderTraining handleClose={handleClose} />
      <div>PageTrainingWords</div>
      <FooterTraining correct={5} incorrect={0} />
    </LayoutTraining>
  )
}

export default PageTrainingWords
