import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Homepage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("sayari");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const CreativeVerseGenerator = async () => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are a poet, storyteller, and intelligent system",
        },
        {
          role: "user",
          content: `${selectedOption} about ${inputValue} under 200 characters`,
        },
      ];
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
        n: 1,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error(error.message);
      return "An error occurred while generating content.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      try {
        const generatedContent = await CreativeVerseGenerator();
        setOutput(generatedContent);
      } catch (error) {
        alert("An error occurred while generating content.");
        console.error(error);
      }
    } else {
      alert("Input cannot be blank");
    }
  };

  return (
    <>
      <nav className="bg-blue-500 text-white py-4 text-2xl text-center">
        Creative-Verse
      </nav>

      <section className="p-16">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <input
            type="text"
            placeholder="Enter something"
            value={inputValue}
            onChange={handleInputChange}
            className="mb-2 md:mb-0 md:mr-2 px-3 py-2 border rounded-lg w-full md:w-1/2"
          />
          <select
            value={selectedOption}
            onChange={handleDropdownChange}
            className="mb-2 md:mb-0 md:mr-2 px-3 py-2 border rounded-lg w-full md:w-1/4"
          >
            <option value="sayari">Sayari</option>
            <option value="story">Story</option>
            <option value="joke">Joke</option>
            <option value="quote">Quote</option>
          </select>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          >
            Generate
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div className="bg-gray-100 text-xl h-[30rem] w-full flex flex-col justify-center items-center">
          {output ? (
            <div className="text-lg">{output}</div>
          ) : (
            <div className="text-lg">Let's generate the output first</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Homepage;
