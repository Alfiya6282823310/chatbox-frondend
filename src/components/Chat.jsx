import React, { useState } from 'react';  // Import useState

const Chat = () => {  // Capitalize the component name

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { user: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const botReply = await response.json();
            setMessages([...messages, userMessage, { user: 'bot', text: botReply.text }]);
            setInput('');
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }
    };

    return (
        <div>
            <div className="chatbox" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => (
                    <p key={idx} className={msg.user === 'user' ? 'user-msg' : 'bot-msg'} style={{ color: msg.user === 'user' ? 'blue' : 'green' }}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
                style={{ width: '80%', padding: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
        </div>
    );
};

export default Chat;
