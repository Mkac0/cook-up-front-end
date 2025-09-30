import { Link } from "react-router";

const Landing = () => {
  return (
    <main className="Landing">
      <section className="hero">
        <div className="hero-inner container">
          <p className="hero-message">Cook faster • Eat better</p>
          <h1 className="hero-title">Welcome to CookUp!</h1>
          <p className="hero-subtitle">
            Plan meals, save favorites, and discover simple, tasty recipes.
          </p>
          <div className="hero-cta">
            <Link className="cta" to="/sign-up">Sign Up Now!</Link>
            <a className="cta secondary" href="#recipes">Browse recipes</a>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </section>

      <section className="features container" aria-label="Highlights">
        <div className="feature-card">
          <div className="feature-emoji" role="img" aria-label="sparkles">✨</div>
          <h3>Curated picks</h3>
          <p>Hand-picked ideas so you never wonder what to cook.</p>
        </div>
        <div className="feature-card">
          <div className="feature-emoji" role="img" aria-label="clock">⏱️</div>
          <h3>Done in 30</h3>
          <p>Simple steps and pantry-friendly ingredients.</p>
        </div>
        <div className="feature-card">
          <div className="feature-emoji" role="img" aria-label="bookmark">🔖</div>
          <h3>Save &amp; organize</h3>
          <p>Save favorites and build your personal cookbook.</p>
        </div>
      </section>

      <section id="recipes" className="container section">
        <header className="section-header">
          <h2>Recipes</h2>
          <p className="section-sub">A taste of what you`ll find inside.</p>
        </header>
        <div className="sample-recipe">

          <article className="recipe1 card">
            <img
              src="https://images.unsplash.com/photo-1653122025256-d1ac2880c511?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Spaghetti Bolognese served with parmesan"
              className="recipe1-img"
              loading="lazy"
            />
            <div className="recipe1-description">
              <h3 className="recipe1-title">🍝 Spaghetti Bolognese</h3>
              <p className="recipe1-instructions"><strong>Instructions:</strong></p>
              <ol className="recipe1-list">
                <li>Cook spaghetti according to package instructions; drain and set aside.</li>
                <li>Heat olive oil in a pan, sauté onion and garlic until soft.</li>
                <li>Add ground beef, cook until browned.</li>
                <li>Stir in tomato paste, chopped tomatoes, oregano, salt, and pepper.</li>
                <li>Simmer for 15 - 20 minutes until sauce thickens.</li>
                <li>Serve sauce over spaghetti and top with Parmesan if desired.</li>
              </ol>
            </div>
          </article>

          <article className="recipe2 card">
            <img
              src="https://images.unsplash.com/photo-1650092194571-d3c1534562be?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Avocado toast topped with chili flakes"
              className="recipe2-img"
              loading="lazy"
            />
            <div className="recipe2-description">
              <h3 className="recipe2-title">🥑 Avocado Toast</h3>
              <p className="recipe2-instructions"><strong>Instructions:</strong></p>
              <ol className="recipe2-list">
                <li>Toast bread until golden.</li>
                <li>Mash avocado in a bowl.</li>
                <li>Season with salt, pepper, olive oil.</li>
                <li>Spread on toast and add toppings.</li>
              </ol>
            </div>
          </article>
        </div>
      </section>
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© {new Date().getFullYear()} CookUp</p>
            <nav className="footer-nav" aria-label="Footer">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
          </div>
        </footer>
    </main>
  );
};

export default Landing;
