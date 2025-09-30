import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router";
import { UserContext } from '../../contexts/UserContext';

import * as recipeService from '../../services/RecipeService';

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
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Saved Recipes
      </p>
      <ul>
        {recipes.map(recipe => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`}><li key={recipe._id}>{recipe.recipeName}</li></Link>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
