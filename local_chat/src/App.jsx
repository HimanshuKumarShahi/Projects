import { useState, useRef, useEffect } from 'react';
import './index.css';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add user message to UI
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Direct fetch to Docker Model Runner (Make sure CORS is allowed in Docker Desktop)
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma3:270M-F16",
          prompt: input,
          stream: false
        })
      });

      // 3. Catch non-JSON errors (like the 403 Origin Not Allowed)
      if (!res.ok) {
        const textError = await res.text();
        throw new Error(textError || `HTTP Error ${res.status}`);
      }

      const data = await res.json();

      // 4. Add AI response to UI
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);
      
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [...prev, { sender: 'ai', text: `❌ Connection Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>💬 Local AI</h2>
          <span className="badge">Gemma 270M</span>
        </div>
        <div className="sidebar-content">
          <p className="sidebar-info">Running locally via Docker Model Runner.</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-interface">
        <div className="chat-history">
          {messages.length === 0 && (
            <div className="empty-state">
              <h3>How can I help you today?</h3>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-sender">{msg.sender === 'user' ? 'You' : 'Gemma'}</div>
                <div className="message-text">{msg.text}</div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message-wrapper ai typing-indicator">
               <div className="message-avatar">🤖</div>
               <div className="message-content">
                 <div className="dots">
                   <span>.</span><span>.</span><span>.</span>
                 </div>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-box">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text" 
              placeholder="Message local AI..." 
              disabled={isLoading}
              autoFocus
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="send-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;