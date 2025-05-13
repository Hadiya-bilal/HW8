import Search from "../components/Search";
import Favorites from "../components/Favorites";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"; //  ADDING THIS IMPORT AS DONE IN CLASS


const RANDOM_API = import.meta.env.VITE_RANDOM_MEAL_API;
const MEAL_BYID_API = import.meta.env.VITE_MEAL_BYID_API;
const SEARCH_API = import.meta.env.VITE_SEARCH_MEAL_API

const Home = () => {
    const [randomMeal, setRandomMeal] = useState(null);
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);
    const [meals, setMeals] = useState([]);

     const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const navigate = useNavigate(); // ADDING THIS LINE TO INITIALIZING NAVIGATION AS DONE IN CLASS

     useEffect(() => {
        const initializeData = async () => {
            try {
                await loadRandomMeal();
                loadFavorites();
            } catch (err) {
                setError("Failed to load meals");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        initializeData();
    }, []);

    const loadRandomMeal = async () => {
        //const meal = await getRandomMeal();
        const resp = await fetch(RANDOM_API);
        const data = await resp.json();
        let meal = data.meals[0];
        console.log(meal);
        setRandomMeal(meal);
      };

    const getMealById = async(id) => {
      const resp = await fetch(MEAL_BYID_API + id);
      const data = await resp.json();
      return data.meals[0];
    }

    const getMealsBySearch = async (searchTerm) => {
      const resp = await fetch(SEARCH_API + searchTerm);
      const data = await resp.json();
      return data.meals;
    }

    const handleSearch = async (searchTerm) => {
      const meals = await getMealsBySearch(searchTerm);
      setMeals(meals);
    }

    const loadFavorites = () => {
      const mealIds = JSON.parse(localStorage.getItem('mealIds')) || [];
      setFavoriteMealIds(mealIds);
      
      // Load full meal data for favorites
      const loadFavoriteMeals = async () => {
        const favoriteMeals = await Promise.all(
          mealIds.map(id => getMealById(id))
        );
        setFavoriteMeals(favoriteMeals);
      };
      
      loadFavoriteMeals();
    };

    //const loadFavorites = 
    //Responsible for adding/removing meals from favorites
    const toggleFavorite = async (mealId) => {
      let updatedFavorites;
      let updatedFavoriteMeals;

      if (favoriteMealIds.includes(mealId)) {
        // Remove from favorites
        updatedFavorites = favoriteMealIds.filter(id => id !== mealId);
        updatedFavoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealId);
      } 
      else {
        // Add to favorites
        updatedFavorites = [...favoriteMealIds, mealId];
        const mealToAdd = meals.find(m => m.idMeal === mealId) || randomMeal;
        if (mealToAdd) {
          updatedFavoriteMeals = [...favoriteMeals, mealToAdd];
        } else {
          // Fallback: fetch the meal if not in current state
          const fetchedMeal = await getMealById(mealId);
          updatedFavoriteMeals = [...favoriteMeals, fetchedMeal];
        }
      }
      
      localStorage.setItem('mealIds', JSON.stringify(updatedFavorites));
      setFavoriteMealIds(updatedFavorites);
      setFavoriteMeals(updatedFavoriteMeals);
      
    };

  return (
    <div className="store">
    <Search onSearch={handleSearch}/>
    
    <Favorites 
        favoriteMeals={favoriteMeals} 
        removeFavorite={toggleFavorite}
      />
    
    <div className="meals" id="meals">
      {meals.length === 0 && randomMeal && (
        <div onClick = {() => navigate(`/meal/${randomMeal.idMeal}`)}>
       


       
        <MealCard 
          meal={randomMeal} 
          isRandom={true} 
          onFavoriteToggle={toggleFavorite}
          isFavorite={favoriteMealIds.includes(randomMeal.idMeal)}
        />
        </div>

      )}

{meals.map(meal => (
                    <div key={`clickable-${meal.idMeal}`} onClick={() => navigate(`/meal/${meal.idMeal}`)}> {/* [4] WRAP EACH MEAL CARD */}
                        <MealCard 
                            meal={meal} 
                            onFavoriteToggle={toggleFavorite}
                            isFavorite={favoriteMealIds.includes(meal.idMeal)}
                        />
                    </div>
      ))}
    </div>
  </div>
  )
}

export default Home;
