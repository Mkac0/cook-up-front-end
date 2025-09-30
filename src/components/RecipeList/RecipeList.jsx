import { Link } from 'react-router';

const RecipeList = (props) => {
  return (
    <main>
      {props.recipes && Array.isArray(props.recipes) && props.recipes.map((recipe) => (
        <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
          <article>
            <header>
              <h2>{recipe.title}</h2>
              <p>
                {`${recipe.author.username} posted on
                ${new Date(recipe.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{recipe.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}

export default RecipeList;