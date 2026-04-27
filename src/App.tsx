import { useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";

Amplify.configure(outputs);

const client = generateClient();

function App() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");

  const generateRecipe = async () => {
    const res = await client.queries.askBedrock({
      ingredients: ingredients.split(","),
    });

    setResult(res.data?.body || "No response");
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