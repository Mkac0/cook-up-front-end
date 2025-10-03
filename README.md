# Cook'Up
![Cook'Up](https://i.imgur.com/R1wX28G.png)

Cook'Up is a MERN Stack CRUD application that helps users create recipes with the power of AI. Simply provide the ingredients you have on hand, and the app will generate the perfect recipe tailored for you.

This project was built to combine **AI-powered creativity** with a clean, user-friendly interface for food lovers who want to expand their culinary skills or make the most out of leftover ingredients.

[Deployed project](https://cookupga.netlify.app/) - [Front-End GitHub Repo](https://github.com/Mkac0/cook-up-front-end) - [Back-End GitHub Repo](https://github.com/Mkac0/cook-up-back-end) - [Project planning](https://trello.com/b/vD8xdvUt/cookup) - [Git Reference](https://github.com/seb-justicia/express-api-jwt-auth-template)


## Why Cook'Up?
Cook'Up is perfect for anyone who wants to get creative in the kitchen. Whether you’re stuck with a few leftover ingredients or looking for fresh inspiration, AI-generated recipes make it easy to discover new dishes and expand your cooking skills.


## Attributions

### Google Gemini Developer API

We use the `gemini-2.5-flash` model for recipe text generation. The backend server calls this API to create recipes dynamically. When a user enters “tomatoes, pasta, garlic,” the API suggests a pasta dish with instructions.

***Example***:

The example below lets AI know its role and how it should respond.

    ```
    const prompt =
        You are a world-class chef. Your task is to create a delicious and 
        easy-to-follow recipe.
        Please use the following ingredients: ${req.body.contents}.
        The recipe should be for:
        - Meal Type:  
            ${req.body.meal_type === 'Any' ? 'any meal' : req.body.meal_type}
        - Dietary Preference: ${req.body.dietary_preference === 'None' ? 
        'no specific dietary restrictions' : req.body.dietary_preference}
        Generate a creative and appealing recipe. If some key ingredients are 
        missing for a classic dish, feel free to suggest a creative alternative 
        or a simpler version. 
        The instructions should be clear for a home cook.
        Return the recipe with an image.
        Return the recipe in the specified JSON format.

        const response = await ai.models.generateContent
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
        responseMimeType: 'application/json',
            temperature: 0.8,
            topP: 0.95,
        }
    ```

For more information on Google Gemini Developer API, visit [Gemini API](https://ai.google.dev/gemini-api/docs).


### React

+ Ract Conditional Rendering - Enables conditional rendering so that messages only appear when content is available. Also, Tailwind CSS - Gives utility-first styling for UI elements such as alerts (`alert`, `alert-error`) to show user-friendly feedback messages.

    ***Example***:

    The example below always displays a welcome header, checks if message exists and not just whitespace using `message?.trim()`.

        ```
        <h1 className="card-title">Welcome back!</h1>

        {message?.trim() && (
        <p className="alert alert-error">{message}</p>
        )}
        ```
        
    For more information on Tailwind CSS, visit [Tailwindcss](https://tailwindcss.com).
        
    For more information on Conditional Rendering, visit [React: Conditional Rendering](https://react.dev/learn/conditional-rendering).

+ React Loader Spinner - The `<TailSpin>` component from `react-loader-spinner` library to display a loading animation. When a user submits ingredients, the `<TailSpin>` component shows while waiting for the AI response.

    ***Example***:

    ```
    import { TailSpin } from "react-loader-spinner";

    {isLoading ? (
    <div style={{ width: "100px", margin: "auto" }}>
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
    </div>
    ) : (
    <div>Recipe Content</div>
    )}
    ```

+ React (Hooks: `useState`) - Used to manage form state and loading states during recipe creation and updates. Used for managing state in forms and CRUD operations. 
    
    ***Example***: 

    The `handleSubmit` function handles recipe creation (`handleAddRecipe`) or updating (`handleUpdateRecipe`) while showing a loading spinner until the request completes.

        ```
        const handleSubmit = (evt) => {
        setIsLoading(true);
        evt.preventDefault();

        if (recipeId) {
            // Update existing recipe
            props.handleUpdateRecipe(recipeId, formData);
        } else {
            // Add new recipe
            props.handleAddRecipe(formData);
        }

        // Stop loading after request
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // example delay
        };
        ```

    For more information on React Loader Spinner, visit [MDN: Load Spinner](https://www.npmjs.com/package/react-loader-spinner).


### JavaScript

+ JavaScript (JSON.stringify) - Used as a fallback to safely display full JSON data if an instruction is missing its `description` field.

    ***Example***:

        ```
        <ul>
        {recipe.instructions.map((instruction, index) => (
            <li key={instruction.step || index}>
            <div className="instruction-text">
                {instruction.description
                ? instruction.description
                : JSON.stringify(instruction)}
            </div>
            </li>
        ))}
        </ul>
        ```

    For more information on JavaScript JSON.stringify, visit [MDN: JSON.stringify](https://www.npmjs.com/package/json-stringify-pretty-compact).

+ JavaScript Fetch API - Handles asynchronous HTTP requests to the backend. Used to send a `PUT` request to the backend for updating an existing recipe.

    ***Example***:

        ```
        const res = await fetch(`${BASE_URL}/${recipeId}/edit`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        ```

    For more information on Fetch API, visit [MDN: Fetch API]((https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)).

+ JWT Authentication (localStorage) - Uses a Bearer token stored in localStorage for secure API requests. Stores the authentication token, which is included in the request headers for secure access to protected routes.

    ***Example***:

        ```
        const res = await fetch(`${BASE_URL}/${recipeId}/edit`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        ```

    For more information on JWT Authentication (localStorage), visit [MDN: loaclStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)


### Technologies Used

***Frontend***
+ React & React Router
+ Vite
+ JavaScript
+ CSS

***Backend***
+ Node.js
+ Express.js

***Database***
+ Mongo DB
+ Mongoose

***AI Integration***
+ GeminiAI API

***App Deployment***
+ Heroku
+ Netlify

## Next Steps
Planned features and stretch goals:   
- Recipe rating & comments system  
- Image uploads for custom recipes  
- Meal plan generator (weekly suggestions)  
- Improved mobile-friendly UI