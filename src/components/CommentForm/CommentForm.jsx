import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as recipeService from '../../services/RecipeService';

const CommentForm = (props) => {
    const { recipeId, commentId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        comments: '',
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (recipeId && commentId) {
            props.handleUpdateComment(recipeId, formData);
        }
        else {
            props.handleAddComment(recipeId, formData);
        }
        setFormData({ comments: '' });
        navigate(`/recipes/${recipeId}`);
    };
    const handleCancel = () => {
        navigate(`/recipes/${recipeId}`); // Or navigate(-1) to go back
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId);
            // Find comment in fetched recipe data
            setFormData(recipeData.comments.find((comment) => comment._id === commentId));
        };
        if (recipeId && commentId) fetchRecipe();
    }, [recipeId, commentId]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='comments-input'>Comments</label>
                <textarea
                    required
                    rows={5}
                    cols={20}
                    name='comments'
                    id='comments-input'
                    value={formData.comments}
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CommentForm
