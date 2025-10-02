import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import CommentForm from './components/CommentForm/CommentForm';

import { UserContext } from './contexts/UserContext';
import { RecipeContext } from './contexts/RecipeContext';
import * as recipeService from './services/RecipeService';

const App = () => {
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleAddRecipe = async (recipeFormData) => {
    const newRecipe = await recipeService.create(recipeFormData);
    setRecipes([newRecipe, ...recipes]);
    navigate('/');
  };
  const handleDeleteRecipe = async (recipeId) => {
    const deletedRecipe = await recipeService.deleteRecipe(recipeId);
    setRecipes(recipes.filter((recipe) => recipe._id !== deletedRecipe._id));
    navigate('/');
  };
  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    const updatedRecipe = await recipeService.update(recipeId, recipeFormData);
    setRecipes(recipes.map((recipe) => (recipeId === recipe._id ? updatedRecipe : recipe)));
    navigate(`/recipe/${recipeId}`);
  };
  const handleAddComment = async (recipeId, commentFormData) => {
    console.log("commentFormData=", commentFormData);
    const updatedComment = await recipeService.createComment(recipeId, commentFormData);
    setRecipes(recipes.map((recipe) => (recipeId === recipe._id ? updatedComment : recipe)));
    navigate(`/recipes/${recipeId}`);
  };
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/recipes' element={<RecipeList />} />
            <Route
              path='/recipes/:recipeId'
              element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} />}
            />
            <Route path='/recipe/new' element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
            <Route
              path='/recipes/:recipeId/edit'
              element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe} />}
            />
            <Route path="/recipes/:recipeId/comments/new" element={<CommentForm handleAddComment={handleAddComment} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
