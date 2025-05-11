import React from 'react'

const MealCard = ({ meal, isRandom = false, onFavoriteToggle, isFavorite }) => {
  return (
    <div className="meal">
      <div className="meal-header">
        {isRandom && <span className="random">Meal of the Day</span>}
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div className="meal-body">
        <h3>{meal.strMeal}</h3>
        <button 
          className="fav-btn" 
          onClick={() => onFavoriteToggle(meal.idMeal)}
        >
          <i className={isFavorite ? "fas fa-heart active" : "far fa-heart"}></i>
        </button>
      </div>
    </div>
  )
}

export default MealCard
