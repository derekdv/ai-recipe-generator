export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  const prompt = `Suggest a recipe using these ingredients: ${ingredients.join(", ")}.`;

  return {
    resourcePath: "/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  try {
    const parsed = JSON.parse(ctx.result.body);

    // If Bedrock returns correctly
    if (parsed?.content?.length > 0) {
      return {
        body: parsed.content[0].text,
      };
    }

    // Fallback: show raw response for debugging
    return {
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    return {
      body: "Error parsing response",
    };
  }
}