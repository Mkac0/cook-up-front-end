// src/pages/NewRecipe.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

const defaultForm = {
  contents: '',
  meal_type: 'any',
  dietary_preference: 'none',
}

const NewRecipe = (props) => {
    const { recipeId } = useParams();
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(true);

    async function handleSubmit(evt) {
        evt.preventDefault();
        setLoading(true);
        try {
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, ingredients, steps }),
        });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        {loading && <LoadingOverlay text="Loading recipe..." />}
        <form onSubmit={handleSubmit}>
            <Link to={'/recipes'}></Link>
            <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create recipe"}
            </button>
        </form>
        </>
    );
}

export default NewRecipe;