import { useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function App() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");

  const generateRecipe = async () => {
    try {
      const res = await client.queries.askBedrock({
        ingredients: ingredients.split(",").map((i) => i.trim()),
      });

      setResult(res.data?.body || "No response");
    } catch (err) {
      console.error(err);
      setResult("Error generating recipe");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Derek's AI Recipe Generator</h1>

      <input
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />

      <button onClick={generateRecipe}>Generate</button>

      <p>{result}</p>
    </div>
  );
}

export default App;