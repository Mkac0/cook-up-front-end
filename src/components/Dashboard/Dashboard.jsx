import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router";
import { UserContext } from '../../contexts/UserContext';

import * as recipeService from '../../services/RecipeService';

import '../../App.css'

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipeData = await recipeService.index();
        setRecipes(recipeData);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchAllRecipes();
  }, [user])

  return (
    <main className="page dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Welcome, {user?.username}</h1>
          <p className="dash-subtitle">
            Saved Recipes <span className="saved-recipes">{recipes.length}</span>
          </p>
          <ul className="recipe-grid list-reset">
            {recipes.map((recipe) => (
              <li key={recipe._id} className="recipe-card">
                <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
                    <div className="recipe-card-name">
                      <h3 className="recipe-card-title">{recipe.recipeName}</h3>
                    <span className="recipe-card-arrow" aria-hidden>→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Link className="btn btn-primary" to="/recipe/new">Generate Recipe</Link>
    </main>
  );
};

export default Dashboard;
