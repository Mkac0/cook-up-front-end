import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import * as recipeService from '../../services/RecipeService';
import { UserContext } from '../../contexts/UserContext';

const RecipeDetails = (props) => {
    const { recipeId } = useParams();
    //console.log("recipeid = ", recipeId);

    // Access the user object from the UserContext
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId);
            setRecipe(recipeData);
        };
        fetchRecipe();
    }, [recipeId]);
    //console.log(recipe);
     const handleDeleteComment = async (commentId) => {        
        setRecipe({
            ...recipe,
            comments: recipe.comments.filter((comment) => comment._id !== commentId),
        });
    };

    if (!recipe) {
        return (
            <div>
                loading
            </div>
        );
    }

    console.log("recipe = ",recipe);
    return (
        <main>
            <section>
                <header>
                    <h1>{recipe.recipeName}</h1>
                    <div>
                        <p>Prep Time:{recipe.prepTime}</p>
                        <p>Cook Time:{recipe.cookTime}</p>
                        <p>Servings:{recipe.servings}</p>
                        <p>Meal Type:{recipe.mealType}</p>
                        <p>Dietary Preferance:{recipe.dietaryPreferance}</p>
                        <p>Description: {recipe.description}</p>
                    </div>
                    <div>
                        <h2>Ingredients:</h2>
                        <ul>
                            {recipe.ingredients.map((contents) => (
                                <li key={contents.item}>{contents.item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Instructions:</h2>
                        <ul>
                            {recipe.instructions.map((instruction,index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ul>
                    </div>
                    {recipe.chefNotes ? (
                        <div>
                            <h2>Chef Notes:</h2>
                            <p>{recipe.chefNotes}</p>
                        </div>
                    ) : <div></div>
                    }
                    <div>
                        <h2>Comments:</h2>
                        <ul>
                            {recipe.comments.map((comment) => (
                                <li key={comment._id}>
                                    {comment.text} 
                                    <button type="button" id="btnEditComment">Edit Comment</button> 
                                    <button type="button" id="btnDeleteComment" onClick={()=>handleDeleteComment(comment._id)}>Delete Comment</button>
                                </li>                                                                
                            ))}
                        </ul>
                    </div>
                </header>
            </section>
            <section>
                {recipe.author._id === user._id && (
                    <>
                        <Link to={`/recipes/${recipeId}/comments/new`}>Add Comments</Link>
                        <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete Recipe</button>
                    </>
                )}
            </section>
        </main>
    )
}

export default RecipeDetails;
