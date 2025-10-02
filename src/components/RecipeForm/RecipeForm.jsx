import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as recipeService from '../../services/RecipeService';
import Loader from "./Loader";
import "../../App.css"

const defaultForm = {
  contents: '',
  meal_type: 'any',
  dietary_preference: 'none',
}

const RecipeForm = (props) => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    if (recipeId) {
      props.handleUpdateRecipe(recipeId, formData);
    } else {
      console.log("add new recipe");
      props.handleAddRecipe(formData);
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000000)
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await recipeService.show(recipeId);
        setFormData(recipeData);
      } catch (err) {
        console.log(err)
      }
      if (recipeId) fetchRecipe();
      return (setFormData(defaultForm));
    }
  }, [recipeId]);

  return (
    <main className="auth-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{recipeId ? 'Edit Recipe' : 'New Recipe'}</h2>
        </div>
        {
          isLoading ? (<div
            style={{
              width: "100px",
              margin: "auto",
            }}><Loader /></div>) :
            (
              <form className="form recipe-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="label" htmlFor="contents-input">Ingredients</label>
                  <input
                    className="input"
                    required
                    type="text"
                    name="contents"
                    id="contents-input"
                    value={formData.contents}
                    onChange={handleChange}
                    placeholder="e.g. 2 eggs, 1 cup flour..."
                  />
                </div>

                <div className="form-row">
                  <label className="label" htmlFor="meal_type_input">Meal Type</label>
                  <select
                    className="input"
                    required
                    name="meal_type"
                    id="meal_type_input"
                    value={formData.meal_type}
                    onChange={handleChange}
                  >
                    <option value="Any">Any</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div className="form-row">
                  <label className="label" htmlFor="dietary_preference_input">Dietary Preference</label>
                  <select
                    className="input"
                    required
                    name="dietary_preference"
                    id="dietary_preference_input"
                    value={formData.dietary_preference}
                    onChange={handleChange}
                  >
                    <option value="None">None</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Dairy-free">Dairy-free</option>
                  </select>
                </div>

                <div className="actions">
                  <button type="submit" className="btn btn-primary">
                    {recipeId ? 'Update Recipe' : 'Add Recipe'}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => window.history.back()}>
                    Cancel
                  </button>
                </div>
              </form>
            )
        }
      </div>
    </main>
  );
};

export default RecipeForm;
