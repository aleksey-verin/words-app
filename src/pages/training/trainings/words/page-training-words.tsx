import FooterTraining from "@/components/trainings/footer-training";
import HeaderTraining from "@/components/trainings/header-training";
import LayoutTraining from "@/components/trainings/layout-training"
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { ROUTES } from "@/routes";
import { selectorUserDictionarySlice } from "@/store/reducers/userDictionarySlice";
import { getWordsForTraining, selectorUserTrainingSlice } from "@/store/reducers/userTrainingSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageTrainingWords = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { dictionary } = useAppSelector(selectorUserDictionarySlice)

  const { trainingWords } = useAppSelector(selectorUserTrainingSlice)

  // const words = dispatch(getWordsForTraining({ dictionary, wordsCount: 10 }))
console.log(trainingWords);
  const handleClose = () => {
    navigate(ROUTES.TRAINING)
  }

  useEffect(() => {
    dispatch(getWordsForTraining({ dictionary, wordsCount: 10 }))
  }, [dictionary, dispatch]);

  return (
    <LayoutTraining>
      <HeaderTraining handleClose={handleClose} />
      <div>PageTrainingWords</div>
      <FooterTraining correct={5} incorrect={0} />
    </LayoutTraining>
  )
}

export default PageTrainingWords;