import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as recipeService from '../../services/RecipeService';

const CommentForm = (props) => {
    const { recipeId, commentId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        text: '',
    });

    const handleChange = (evt) => {        
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (recipeId && commentId) {
            props.handleUpdateComment(recipeId, commentId, formData);
        }
        else {
            props.handleAddComment(recipeId, formData);
        }
        setFormData({ text: '' });
        navigate(`/recipes/${recipeId}`);;
    };

    const handleCancel = () => {
        navigate(`/recipes/${recipeId}`);
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId);
            setFormData(recipeData.comments.find((comment) => comment._id === commentId));
        };
        if (recipeId && commentId) fetchRecipe();
    }, [recipeId, commentId]);

    return (
        <main className="add-comment-page">
            <div className="add-comment-card">
                <h2>Add Comment</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <textarea
                            className="input"
                            required
                            rows={5}
                            cols={20}
                            name="text"
                            id="text-input"
                            value={formData.text}
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
