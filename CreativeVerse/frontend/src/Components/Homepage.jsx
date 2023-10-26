import styles from "./styles.module.css";
import React, { useState } from "react";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("sayari");
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = () => {
    // Handle form submission, e.g., call an API to generate content
    // You can replace this with your actual logic
    const generatedContent = `Generated content for ${selectedCategory} in ${selectedLanguage}: ${inputText}`;
    setOutput(generatedContent);
  };

  return (
    <>
      <div>
        <nav className={styles.navbar}>
          <h1>CreativeVerse</h1>
        </nav>
      </div>

      <div className={styles.main_container}>
        <div className={styles.left}>
          <div className={styles.row}>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="sayari">Sayari</option>
              <option value="story">Story</option>
              <option value="jokes">Jokes</option>
              <option value="quote">Quote</option>
            </select>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text here"
            />
          </div>
          <div className={styles.row}>
            <button onClick={handleFormSubmit}>Submit</button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.outputDiv}>{output}</div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
