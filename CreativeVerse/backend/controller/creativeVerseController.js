const OpenAI = require("openai");

const openAi = new OpenAI({
  apiKey: process.env.CreativeVerseAPIKey,
});

console.log("just checking");

const CreativeVerseGenerator = async (req, res) => {
  console.log("just checking again");
  try {
    // const { topic, category, language } = req.body
    const topic = "river";
    const category = "story";
    // const { topic, category, language } = ['river','story',]
    const messages = [
      { role: "system", content: "You are poet, Joker and wise man" },
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
    console.log("hello", output);

    return res.send({ output });
  } catch (error) {
    console.log(error.message);
  }
};
CreativeVerseGenerator();

// module.exports = CreativeVerseGenerator;
