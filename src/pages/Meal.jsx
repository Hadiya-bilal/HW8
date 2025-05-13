import MealDetails from '../components/MealDetails';
import { useParams, useNavigate } from 'react-router-dom';

const Meal = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="meal-page">
       <button 
        onClick={() => navigate('/')}
        className="back-button"
      ><i className="fas fa-arrow-left"></i> Return to Home
      </button>


      <MealDetails mealId={id} />
    </div>
  );
};

export default Meal;