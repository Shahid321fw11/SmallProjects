const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 8888;

const app = express();
app.use(cors());
app.use(express.json());

const openAi = new OpenAI({
  apiKey: process.env.CreativeVerseAPIKey,
});

let systemContext = "";
let userContext = "";

// const contentCraft = async (req, res) => {
//   try {
//     const messages = [
//       {
//         role: "system",
//         content: systemContext,
//       },
//       {
//         role: "user",
//         content: userContext,
//       },
//     ];
//     const response = await openAi.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: messages,
//       functions: functions,
//       max_tokens: 200,
//       temperature: 0.7,
//       n: 1,
//     });
//     const output = response.choices[0].message.content;
//     console.log("out", response);
//     return output;
//     // return res.send({ output });
//   } catch (error) {
//     console.log(error.message);
//     return null;
//   }
// };
// contentCraft();
// app.post("/", async (req, res) => {
//   const userInput = req.body.userInput;
//   const output = await contentCraft(userInput);
//   res.send({ output });
// });

function inputForAISwitchCase(userInput, selectedOption) {
  let systemContext = "";
  let userContext = userInput;

  switch (selectedOption) {
    case "text_generation":
      systemContext =
        "You are a text generation machine. Please generate some text based on the input.";
      break;
    case "summarization":
      systemContext =
        "You are a summarization machine. Summarize the provided text.";
      break;
    case "translation":
      systemContext =
        "You are a translation machine. Translate the text as requested from the input, else translate into hindi language.";
      break;
    case "sentiment_analysis":
      systemContext =
        "You are a sentiment analysis machine. Analyze the sentiment of the text. and return the input sentiment in one word.";
      break;
    default:
      systemContext = "You are a smart machine. What can I assist you with?";
  }

  return { systemContext, userContext };
}

app.post("/", async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const selectedOption = req.body.selectedOption;

    const { systemContext, userContext } = inputForAISwitchCase(
      userInput,
      selectedOption
    );

    const messages = [
      {
        role: "system",
        content: systemContext,
      },
      {
        role: "user",
        content: userContext,
      },
    ];

    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
      n: 1,
    });

    const output = response.choices[0].message.content;

    res.json({ response, output });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating content." });
  }
});

app.get("/", async (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
