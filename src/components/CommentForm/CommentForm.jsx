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
        navigate(`/recipes/${recipeId}`);
    };
    return (
        <main className="add-comment-page">
        <div className="add-comment-card">
            <h2>Add Your Comment</h2>
            <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label className="label" htmlFor="comments-input">Comment</label>
                <textarea
                className="input"
                required
                rows={5}
                cols={20}
                name="comments"
                id="comments-input"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Write your comment..."
                />
            </div>
            <div className="actions">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancel
                </button>
            </div>
            </form>
        </div>
        </main>
  );
};
export default CommentForm;
