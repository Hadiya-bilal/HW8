import { useNavigate } from 'react-router-dom';

const Favorites = ({ favoriteMeals, removeFavorite }) => {
  const navigate = useNavigate(); 

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {favoriteMeals.length === 0 ? (
        <p>No favorites yet. Add some!</p>
      ) : (
        <div className="favorites-container">
          {favoriteMeals.map((meal) => (
            <div 
              key={meal.idMeal} 
              className="favorite-item"
              onClick={() => navigate(`/meal/${meal.idMeal}`)}

                style={{ cursor: 'pointer' }}
            >
    <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeFavorite(meal.idMeal);
                }}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
