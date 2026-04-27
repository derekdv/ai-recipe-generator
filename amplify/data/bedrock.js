export function request(ctx) {
  const ingredients = ctx.args.ingredients || [];

  return {
    method: "POST",
    resourcePath: "/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Suggest a recipe using these ingredients: ${ingredients.join(", ")}`,
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  const body = JSON.parse(ctx.result.body);

  return {
    body: body.content?.[0]?.text || "No response",
  };
}