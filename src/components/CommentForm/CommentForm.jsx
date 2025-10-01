import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as recipeService from '../../services/RecipeService';

const CommentForm = (props) => {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        comments: '',
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('added new comment');        
        props.handleUpdateComment(recipeId, formData);
    };
    const handleCancel = () => {
        navigate(`/recipes/${recipeId}`); // Or navigate(-1) to go back
    };

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
