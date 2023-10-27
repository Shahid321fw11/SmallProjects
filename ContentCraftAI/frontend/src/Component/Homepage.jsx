import React, { useState } from "react";

const Homepage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("text_generation");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await fetch("http://localhost:8080", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userInput: inputValue,
            selectedOption: selectedOption,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(response);
          console.log(output);
          setOutput(data.output);
        } else {
          alert("Error fetching data from the server");
        }
      } catch (error) {
        alert("An error occurred while generating content.");
        console.error(error);
      }
    } else {
      alert("Input cannot be blank");
    }
  };

  return (
    <div>
      <>
        <nav className="bg-blue-500 text-white py-4 text-2xl text-center">
          Advance AI Content Analyser
        </nav>

        <div className="w-full flex flex-col md:flex-row gap-16 p-16 ">
          <section className="w-full border-2 border-blue-200 shadow-xl rounded-lg p-16">
            <textarea
              type="text"
              placeholder="Write whatever you want to discuss, for getting best result please make as much as clear about context."
              value={inputValue}
              onChange={handleInputChange}
              className="border rounded-lg h-[16rem] w-full p-4"
            />
            <div className="flex justify-between py-4">
              <select
                value={selectedOption}
                onChange={handleDropdownChange}
                className="border rounded-lg p-4"
              >
                <option value="text_generation">Create Text</option>
                <option value="summarization">Create Summarization</option>
                <option value="translation">Translate</option>
                <option value="sentiment_analysis">Show Sentiment</option>
              </select>

              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </section>

          <section className="w-full border-2 border-blue-200 shadow-xl rounded-lg">
            <div className="bg-gray-100 text-xl h-[30rem] w-full flex flex-col justify-center items-center">
              {output ? (
                <div className="text-lg">{output}</div>
              ) : (
                <div className="text-lg">Let's generate the output first</div>
              )}
            </div>
          </section>
        </div>
      </>
    </div>
  );
};

export default Homepage;