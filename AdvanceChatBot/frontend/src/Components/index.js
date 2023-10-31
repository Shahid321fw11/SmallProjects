import { createChat, CancelledCompletionError } from "completions";

const chat = createChat({
  apiKey: OPENAI_API_KEY,
  model: "gpt-3.5-turbo-0613",
  functions: [
    {
      name: "sum_of_two_numbers",
      description: "Calculate the sum of two integers",
      parameters: {
        type: "object",
        properties: {
          firstNumber: {
            type: "integer",
            description: "The first integer",
          },
          secondNumber: {
            type: "integer",
            description: "The second integer",
          },
        },
        required: ["firstNumber", "secondNumber"],
      },
      function: async ({ firstNumber, secondNumber }) => {
        const sum = firstNumber + secondNumber;
        return {
          result: sum,
        };
      },
    },
  ],
  functionCall: "auto",
});
