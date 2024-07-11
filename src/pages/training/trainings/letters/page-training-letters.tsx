import FooterTraining from "@/components/trainings/footer-training";
import HeaderTraining from "@/components/trainings/header-training";
import LayoutTraining from "@/components/trainings/layout-training"
import { ROUTES } from "@/routes";
import { useNavigate } from "react-router-dom";

const PageTrainingLetters = () => {
  const navigate = useNavigate()

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

export default PageTrainingLetters;