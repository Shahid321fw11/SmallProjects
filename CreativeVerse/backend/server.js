const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 8888;

const app = express();
app.use(cors());

// this section is for getting output from chatGPT.

const openAi = new OpenAI({
  apiKey: process.env.CreativeVerseAPIKey,
});

const CreativeVerseGenerator = async (req, res) => {
  try {
    const topic = "river";
    const category = "story";
    const messages = [
      {
        role: "system",
        content: "You are poet, storyteller, and integent system",
      },
      // { role: "user", content: ${category} about ${topic} in ${language} under 200 characters }
      {
        role: "user",
        content: `${category} about ${topic} under 200 characters`,
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
    return output;
    // return res.send({ output });
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/", async (req, res) => {
  try {
    const output = await CreativeVerseGenerator();
    console.log(output);
    res.send(output);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
