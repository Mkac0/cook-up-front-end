import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import * as recipeService from '../../services/RecipeService';
import { UserContext } from '../../contexts/UserContext';

const RecipeDetails = (props) => {
    const { recipeId } = useParams();
    //console.log("recipeid = ", recipeId);

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
        )
    }

    console.log("recipe = ", recipe);
    return (
        <main className='res-page'>
            <header className='res-card recipe-details'>
                <div className='recipe-top'>
                    <div>
                        <h1 className='recipe-title'>{recipe.recipeName}</h1>
                    </div>
                </div>

                <div className='recipe-grid'>
                    <div className='recipe-item'>
                        <span className='recipe-label'>Prep: </span>
                        <span className='recipe-value'>{recipe.prepTime}</span>
                    </div>
                    <div className='recipe-item'>
                        <span className='recipe-label'>Cook Time: </span>
                        <span className='recipe-value'>{recipe.cookTime}</span>
                    </div>
                    <div className='recipe-item'>
                        <span className='recipe-label'>Servings: </span>
                        <span className='recipe-value'>{recipe.servings}</span>
                    </div>
                    <div className='recipe-item'>
                        <span className='recipe-label'>Meal: </span>
                        <span className='recipe-value'>{recipe.mealType}</span>
                    </div>
                    <div className='recipe-item'>
                        <span className='recipe-label'>Diet: </span>
                        <span className='recipe-value'>{recipe.dietaryPreferance}</span>
                    </div>
                </div>
            </header>

            <section className='content-grid'>
                <article className='res-card section-card'>
                    <h2 className='section-title'>Ingredients:</h2>
                    <ul className='ingredients-list'>
                        {recipe.ingredients.map((contents) => (
                            <li key={contents.item}>
                                <span>{contents.item}</span>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className='res-card section-card'>
                    <h2 className='section-title'>Instructions:</h2>
                    <ol className='steps-list'>
                        {recipe.instructions.map((instruction) => (
                            <li key={instruction.step}>
                                <div className='instuction-text'>{instruction.description}</div>
                            </li>
                        ))}
                    </ol>
                </article>

                {recipe.chefNotes ? (
                    <article className='res-card section-card notes-card'>
                        <h2 className='section-title'>Chef Notes:</h2>
                        <p className='notes'>{recipe.chefNotes}</p>
                    </article>
                ) : null}

                <article className='res-card section-card'>
                    <div className='section-title-row'>
                        <h2 className='section-title'>Comments</h2>
                    </div>
                    <ul className='list-reset comments-list'>
                        {recipe.comments.map((comment) => (
                            <li key={comment._id} className='comment'>
                                <div className='comment-body'>
                                    <p>{comment.text}</p>
                                </div>
                                <div className='comment-actions'>
                                    <button
                                        type="button"
                                        id="btnEditComment"
                                        className='btn btn-ghost'
                                    >
                                        Edit Comment
                                    </button>
                                    <button
                                        type="button"
                                        id="btnDeleteComment"
                                        onClick={() => props.handleDeleteComment(recipe._id, comment._id)}
                                        className='btn btn-primary'
                                    >
                                        Delete Comment
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="add-comment">Add a comment.</p>
                </article>
            </section>
            <div className="recipe-details-actions">
                <Link
                    className="btn btn-ghost"
                    to={`/recipes/${recipeId}/comments/new`}
                >
                    Add Comment
                </Link>
                <button
                    className="btn btn-primary"
                    onClick={() => props.handleDeleteRecipe(recipeId)}
                >
                    Delete Recipe
                </button>
            </div>
        </main>
    );
}

export default RecipeDetails;
