import { useState } from "react";
import { generateRecipeAPI } from "../api/recipeAPI";
import Loader from "./Loader";
import RecipeHistory from "./RecipeHistory";
import ReactMarkdown from "react-markdown";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("⚠ Please enter some ingredients.");
      return;
    }

    setError("");
    setLoading(true);
    setRecipe("");

    try {
      const data = await generateRecipeAPI(ingredients);

      setRecipe(data.recipe);

      setHistory((prev) => [
        {
          ingredients,
          recipe: data.recipe,
        },
        ...prev,
      ]);
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>🍽️ AI Recipe Generator</h1>

      <p className="subtitle">
        Turn everyday ingredients into delicious recipes with AI.
      </p>

      <textarea
        placeholder="Example: Paneer, Onion, Tomato, Cheese"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button onClick={handleGenerateRecipe} disabled={loading}>
        ✨ Generate Recipe
      </button>

      {loading && (
        <div className="loading">
          <Loader />
          <p>🍳 AI Chef is preparing your recipe...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {recipe && (
        <div className="recipe-card">
          <h2>📖 Generated Recipe</h2>
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </div>
      )}

      {history.length > 0 && <RecipeHistory history={history} />}
    </>
  );
}