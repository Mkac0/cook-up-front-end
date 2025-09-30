import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

import { UserContext } from './contexts/UserContext';
import { RecipeContext } from './contexts/RecipeContext';

const App = () => {
  const { user } = useContext(UserContext);

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
              element={<RecipeDetails />}
            />
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
