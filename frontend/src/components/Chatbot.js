


import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // To toggle the chat window visibility

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', message: userInput },
    ]);

    setLoading(true);

    try {
      console.log("Sending input:", userInput);

      // Send the input to the backend for processing
      const response = await axios.post(
        'http://localhost:3000/company/chatbot',  // Update with your backend URL
        { input: userInput },  // Sending user input
        { withCredentials: true }  // Include credentials (cookies) if needed
      );

      console.log("Backend response:", response.data); // Log the backend response

      // Handle the response and update the chat
      if (response.data.matches && response.data.matches.length > 0) {
        setMatches(response.data.matches);  // Save matches to state for rendering

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', message: 'I found several questions that might match your input. Please select one:' },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', message: 'No match found, connecting to a human agent.' },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', message: 'Sorry, I could not understand that.' },
      ]);
    } finally {
      // Reset loading state and clear input field
      setLoading(false);
      setUserInput('');
    }
  };

  const handleSelectQuestion = (question) => {
    // Once a question is selected, show the answer
    const selectedReply = question.reply;
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', message: question.question },
      { sender: 'bot', message: selectedReply },
    ]);
    setMatches([]);  // Clear the list of matches
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        className="fixed bottom-5 right-5 p-4 bg-blue-600 rounded-full cursor-pointer shadow-xl hover:bg-blue-500 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-3xl">💬</span>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col h-96">
          <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
            <span className="font-bold">Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white bg-transparent border-none text-xl"
            >
              X
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`p-3 rounded-lg max-w-xs break-words ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.message}
                </p>
              </div>
            ))}

            {/* Display matched questions as options */}
            {matches.length > 0 && (
              <div className="mt-4 space-y-2">
                {matches.map((match, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectQuestion(match)}
                    className="block w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    {match.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-4 bg-gray-100 rounded-b-lg">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="ml-3 p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-500 transition duration-200"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
