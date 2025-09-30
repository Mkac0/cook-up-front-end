import { createContext, useState } from 'react';

const RecipeContext = createContext();

const getRecipeFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1])).payload;
};

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(getRecipeFromToken());

  const value = { recipes, setRecipes };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeProvider, RecipeContext };