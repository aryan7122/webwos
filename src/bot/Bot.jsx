import React, { useState } from 'react';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import './Bot.css';
import { IoSend } from "react-icons/io5";

const Bot = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading indicator
    const [alertMessage, setAlertMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (message.trim() === '') {
            setAlertMessage('Message cannot be empty!');
            setTimeout(() => {
                setAlertMessage('');
            }, 3000); // Clear alert after 3 seconds
            return;
        }

        setLoading(true); // Set loading state to true when sending message
        console.log('Sending message:', message);
        try {
            const res = await axios.post('https://bot-aryan-assistant.vercel.app/dialogflow', {
                query: message,
            });
            console.log('Received response:', res.data);

            const newMessage = { text: message, from: 'user' };
            const botResponse = { text: res.data.fulfillmentText, from: 'bot' };

            setChat([...chat, newMessage, botResponse]);
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading state to false after receiving response
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-wrapper">
            {isOpen ? (
                <div className="Bot open">
                    <div className="bot">
                        <div className="header">
                            <h1>Aryan Assistant</h1>
                            <button className="toggle-btn" onClick={toggleChat}>
                                <IoMdClose />
                            </button>
                        </div>
                        <div className="chat-container">
                            {chat.map((msg, index) => (
                                <div key={index} className={`message ${msg.from}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        {alertMessage && (
                            <div id="alert-message">
                                {alertMessage}
                            </div>
                        )}
                        <div className="input-container">
                            <input
                                type="text"
                                value={message}
                                onChange={handleMessageChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={sendMessage} disabled={loading}>
                                {loading ? 'Sending...' : <span id='input-container'><IoSend /></span>}
                            </button>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="chat-icon">
                    <img id='img' src="https://media.tenor.com/s1Y9XfdN08EAAAAj/bot.gif" alt="bot" className="toggle-btn" onClick={toggleChat} />
                </div>
            )}
        </div>
    );
};

export default Bot;
