const Landing = () => {
  return (
    <main>
      <h1>Welcome to CookUp!</h1>
      <a className="cta" href="/sign-up">Sign up now</a>

      <section className="mt-8">
        <h2>Recipes</h2>
        <div className="sample-recipe">

          <div className="recipe1">
            <img
              src="https://images.unsplash.com/photo-1653122025256-d1ac2880c511?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Spaghetti Bolognese"
              className="recipe1-img"
            />
            <div className="recipe1-description">
              <h3 className="recipe1-title">🍝 Spaghetti Bolognese</h3>
              <p><strong>Ingredients (2 servings):</strong></p>
              <ul className="recipe1-ingredients">
                <li>200g spaghetti</li>
                <li>200g ground beef (or ground turkey)</li>
                <li>1 medium onion, chopped</li>
                <li>2 garlic cloves, minced</li>
                <li>1 can (400g) chopped tomatoes</li>
                <li>2 tbsp tomato paste</li>
                <li>1 tbsp olive oil</li>
                <li>1 tsp dried oregano</li>
                <li>Salt and pepper to taste</li>
                <li>Grated Parmesan (optional)</li>
              </ul>
              <p className="recipe1-instructions"><strong>Instructions:</strong></p>
              <ol className="recipe1-list">
                <li>Cook spaghetti according to package instructions; drain and set aside.</li>
                <li>Heat olive oil in a pan, sauté onion and garlic until soft.</li>
                <li>Add ground beef, cook until browned.</li>
                <li>Stir in tomato paste, chopped tomatoes, oregano, salt, and pepper.</li>
                <li>Simmer for 15–20 minutes until sauce thickens.</li>
                <li>Serve sauce over spaghetti and top with Parmesan if desired.</li>
              </ol>
            </div>
          </div>

          <div className="recipe2">
            <img
              src="https://images.unsplash.com/photo-1650092194571-d3c1534562be?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Avocado Toast"
              className="recipe2-img"
            />
            <div className="recipe2-description">
              <h3 className="recipe2-title">Avocado Toast</h3>
              <p><strong>Ingredients (1 serving):</strong></p>
              <ul className="recipe2-ingredients">
                <li>1 ripe avocado</li>
                <li>2 slices of bread (sourdough or whole grain)</li>
                <li>1 tsp olive oil (optional)</li>
                <li>Salt and pepper to taste</li>
                <li>Optional: red pepper flakes, cherry tomatoes, feta, poached egg</li>
              </ul>
              <p className="recipe2-instructions"><strong>Instructions:</strong></p>
              <ol className="recipe2-list">
                <li>Toast the bread until golden and crispy.</li>
                <li>Cut avocado in half, remove pit, scoop into a bowl.</li>
                <li>Mash with a fork (smooth or chunky as you like).</li>
                <li>Mix in salt, pepper, and olive oil.</li>
                <li>Spread evenly on toast.</li>
                <li>Add toppings (optional).</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Landing;
