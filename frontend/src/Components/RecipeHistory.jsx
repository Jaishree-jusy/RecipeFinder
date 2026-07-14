export default function RecipeHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="history-section">
      <h2>📜 Recipe History</h2>

      {history.map((item, index) => (
        <div className="history-card" key={index}>
          <h3>🥗 Ingredients</h3>
          <p>{item.ingredients}</p>

          <h3>👨‍🍳 Recipe</h3>
          <pre>{item.recipe}</pre>
        </div>
      ))}
    </div>
  );
}