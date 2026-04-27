export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Suggest a recipe using these ingredients: ${ingredients.join(", ")}.`,
          },
        ],
      }),
    },
  };
}