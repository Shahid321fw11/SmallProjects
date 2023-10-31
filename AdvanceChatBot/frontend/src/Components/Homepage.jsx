import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import { FaUser, FaRobot } from "react-icons/fa"; // Import icons

const Chat = async (value) => {
  try {
    const response = await axios.post("http://localhost:8080/chat", {
      message: value,
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    console.log("final Result : ", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
};

const Homepage = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userMessage.trim() !== "") {
      try {
        setIsLoading(true);
        const data = await Chat(userMessage);
        setBotMessage(data);

        setChatHistory([
          ...chatHistory,
          { role: "user", content: userMessage },
          { role: "bot", content: data },
        ]);
        setUserMessage("");
      } catch (error) {
        alert("An error occurred while generating content.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Input cannot be blank");
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <nav className="bg-blue-500 text-white py-4 text-2xl text-center w-full">
          Smart-Weather-Bot
        </nav>
        <section className="bg-gray-200 min-h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col p-4 m-4 justify-between border-2 bg-white w-full max-w-3xl rounded-lg shadow-lg h-96">
            <div className="border border-gray-300 rounded-lg p-2 mb-4 overflow-y-auto h-full">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.role === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  <p className="flex flex-row">
                    <span className="message-icon">
                      {message.role === "user" ? <FaUser /> : <FaRobot />}
                    </span>
                    <span className="message-content">{message.content}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full">
              <div className="input ">
                <input
                  type="text"
                  value={userMessage}
                  onChange={handleUserMessage}
                  placeholder="Ask about the weather..."
                  className="border border-gray-300 p-2 rounded-md mb-2 w-full"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className={`w-full rounded-md p-2 ${
                  isLoading
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                } flex justify-center items-center`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10m0 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
