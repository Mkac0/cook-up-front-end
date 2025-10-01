
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as recipeService from '../../services/RecipeService';

const RecipeForm = (props) => {
    const { recipeId } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        category: 'News',
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (recipeId) {
            props.handleUpdateRecipe(recipeId, formData);
        } else {
            console.log("add new recipe");
            props.handleAddRecipe(formData);
        }
    };
    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId);
            setFormData(recipeData);
        };
        if (recipeId) fetchRecipe();

        // Add a cleanup function
        return () => setFormData({ contents: '', meal_type: '', dietary_preference: 'None' });
    }, [recipeId]);

    return (
        <main>
            <h1>{recipeId ? 'Edit Recipe' : 'New Recipe'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='contents-input'>Ingredients</label>
                <input
                    required
                    type='text'
                    name='contents'
                    id='contents-input'
                    value={formData.contents}
                    onChange={handleChange}
                />
                <label htmlFor='meal_type_input'>Meal Type</label>
                <select
                    required
                    name='meal_type'
                    id='meal_type_input'
                    value={formData.meal_type}
                    onChange={handleChange}
                >
                    <option value='Any'>Any</option>
                    <option value='Breakfast'>Breakfast</option>
                    <option value='Lunch'>Lunch</option>
                    <option value='Dinner'>Dinner</option>
                    <option value='Dessert'>Dessert</option>
                </select>
                <label htmlFor='dietary_preference_input'>Dietary Preference</label>
                <select
                    required
                    name='dietary_preference'
                    id='dietary_preference_input'
                    value={formData.dietary_preference}
                    onChange={handleChange}
                >
                    <option value='None'>None</option>
                    <option value='Vegetarian'>Vegetarian</option>
                    <option value='Vegan'>Vegan</option>
                    <option value='Dairy-free'>Dairy-free</option>
                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default RecipeForm;
