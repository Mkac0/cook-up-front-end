import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router";
import { UserContext } from '../../contexts/UserContext';

import * as recipeService from '../../services/RecipeService';

import '../../App.css'

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipeData = await recipeService.index();
        setRecipes(recipeData);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
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
        </div>
      </header>

    {loading ? (
      <div className="recipe-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="recipe-card loading">
            <div className="recipe-card-name">
              <div className="loading-line width1" />
              <div className="loading-line width2" />
            </div>
          </div>
        ))}
      </div>
    ) : recipes.length === 0 ? (
      <section className="no-recipes">
        <h3>No saved recipes yet</h3>
        <p>Start by generating your first recipe.</p>
        <Link className="btn btn-primary" to="/recipe/new">Generate a recipe</Link>
      </section>
    ) : (
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
      )}
      <Link className="btn btn-primary" to="/recipe/new">Generate Recipe</Link>
    </main>
  );
};

export default Dashboard;
