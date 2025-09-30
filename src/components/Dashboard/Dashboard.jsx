import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as RecipeService from '../../services/RecipeService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipeData = await RecipeService.index();
        setRecipes(recipeData);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchAllRecipes();
  }, [user])

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const fetchedUsers = await userService.index();
  //       setUsers(fetchedUsers);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   if (user) fetchUsers();
  // }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Saved Recipes
      </p>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
