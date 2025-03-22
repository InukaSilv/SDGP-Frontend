import { Bot, MessageCircle, MinusIcon, SendIcon, X, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Define types for our messages
interface ChatMessage {
  isUser: boolean; // To distinguish between user and bot messages
  content: string; // The actual message content
  timestamp: Date;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get user from localStorage or use a default
  const userId = localStorage.getItem("user") || "guest-user";
  // Generate a conversation ID or get from localStorage if it exists
  const conversationId = localStorage.getItem("conversationId") || `conv-${Date.now()}`;
  
  // Save conversation ID to localStorage if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem("conversationId")) {
      localStorage.setItem("conversationId", conversationId);
    }
  }, [conversationId]);
  
  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to the chat
    const userMessage: ChatMessage = {
      isUser: true,
      content: message,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const sentMessage = message; // Store the sent message
    setMessage(""); // Clear input field
    
    try {
      // Configure axios with proper headers for CORS
      const response = await axios.post('http://localhost:5002/chat', {
        user_id: userId,
        message: sentMessage,
        conversation_id: conversationId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Enable credentials
        withCredentials: false
      });
      
      console.log("API Response:", response.data);
      
      
      const botResponseText = response.data.response || "No response received";
      
      // Add bot response to the chat
      const botMessage: ChatMessage = {
        isUser: false,
        content: botResponseText,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        isUser: false,
        content: "Sorry, there was an error processing your message. Please try again.",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl w-[380px] ${
            isMinimized ? "h-14" : "h-[600px]"
          } transition-all duration-300 ease-in-out transform`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl flex justify-between items-center">
            <Bot size={20} />
            <h1 className="text-white font-semibold">RiVVE ChatBot</h1>
            <div className="flex gap-2">
              <button
                className="rounded-md hover:bg-white/20 p-1 transition-colors duration-200"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <ChevronUp size={19} /> : <MinusIcon size={19} />}
              </button>
              <button
                className="rounded-md hover:bg-white/20 p-1 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="h-[480px] overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Bot size={48} className="mb-2 text-blue-500 opacity-50" />
                    <p>How can I help you today?</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isUser
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t relative bottom-4 z-50 bg-white">
                <div className="flex items-center">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={1}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !message.trim()}
                    className={`ml-2 p-2 rounded-full ${
                      loading || !message.trim() 
                        ? "bg-gray-300 text-gray-500" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <SendIcon size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatbot;