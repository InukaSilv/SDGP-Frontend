import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser, socket, draftMessage, onDraftMessageChange }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();
  const inputRef = useRef();
  const chatMessagesRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [prevChatId, setPrevChatId] = useState(null);

  useEffect(() => {
    if (currentChat && currentChat._id !== prevChatId) {
      setInputMessage(draftMessage || "");
      setPrevChatId(currentChat._id);
    }
  }, [currentChat, draftMessage, prevChatId]);

  // Save draft message when user types
  useEffect(() => {
    if (onDraftMessageChange && currentChat && inputMessage !== draftMessage) {
      onDraftMessageChange(inputMessage);
    }
  }, [inputMessage, currentChat, onDraftMessageChange, draftMessage]);
  
  
  // Reset messages when chat changes
  useEffect(() => {
    setMessages([]);
  }, [currentChat]);

  // Fetch messages for current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat && currentUser) {
        try {
          const authToken = localStorage.getItem("authToken");
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          }, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim().length > 0) {
      try {
        const authToken = localStorage.getItem("authToken");
        // Send to server
        await axios.post(sendMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
          message: inputMessage,
        },{
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        // Format timestamp
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Emit message to socket
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          message: inputMessage,
        });
        
        // Update local state with new message
        const newMessage = {
          fromSelf: true,
          message: inputMessage,
          timestamp: timestamp
        };
        
        setMessages((prev) => [...prev, newMessage]);
        
        // Clear input field and draft
        setInputMessage("");
        if (onDraftMessageChange) {
          onDraftMessageChange("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setArrivalMessage({
          fromSelf: false, 
          message: msg,
          timestamp: timestamp
        });
      });
    }
    
    // Clean up event listener on component unmount
    return () => {
      if(socket.current) {
        socket.current.off("msg-recieve");
      }
    };
  }, []);

  // Add arrival message to messages
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleEmojiClick = (event, emojiObject) => {
    // Handle different versions of emoji-picker-react
    let emoji;
    if (emojiObject && emojiObject.emoji) {
      emoji = emojiObject.emoji;
    } else if (event && event.emoji) {
      emoji = event.emoji;
    } else if (emojiObject && emojiObject.srcElement) {
      emoji = emojiObject.srcElement.innerText || emojiObject.srcElement.textContent;
    } else {
      console.error("Unrecognized emoji structure:", event, emojiObject);
      return;
    }
    
    const cursorPosition = inputRef.current.selectionStart;
    const textBeforeCursor = inputMessage.slice(0, cursorPosition);
    const textAfterCursor = inputMessage.slice(cursorPosition);
    
    setInputMessage(textBeforeCursor + emoji + textAfterCursor);
    
    setTimeout(() => {
      inputRef.current.focus();
      const newCursorPosition = cursorPosition + emoji.length;
      inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 10);
  };

  // Function to handle sending emoji directly as a message
  const handleSendEmoji = (event, emojiObject) => {
    let emoji;
    
    if (emojiObject && emojiObject.emoji) {
      emoji = emojiObject.emoji;
    } else if (event && event.emoji) {
      emoji = event.emoji;
    } else if (emojiObject && emojiObject.srcElement) {
      emoji = emojiObject.srcElement.innerText || emojiObject.srcElement.textContent;
    } else {
      console.error("Unrecognized emoji structure:", event, emojiObject);
      return;
    }
    
    if (inputMessage.trim().length === 0) {
      setInputMessage(emoji);
      setTimeout(() => {
        handleSendMessage();
      }, 10);
    } else {
      handleEmojiClick(event, emojiObject);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showEmojiPicker && !e.target.closest('.emoji-area')) {
        setShowEmojiPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  // Double-click option to send emoji directly
  const handleEmojiDoubleClick = (event, emojiObject) => {
    handleSendEmoji(event, emojiObject);
    setShowEmojiPicker(false); // Close picker after sending
  };
  
  // Determine the display name for current chat
  const getDisplayName = () => {
    if (!currentChat) return "";
    
    if (currentChat.firstName && currentChat.lastName) {
      return `${currentChat.firstName} ${currentChat.lastName}`;
    }
    
    return currentChat.username || "";
  };
  
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            {currentChat?.avatarImage ? (
              <img src={currentChat.avatarImage} alt="avatar" />
            ) : (
              <div className="avatar-placeholder">
                {currentChat?.firstName?.charAt(0) || currentChat?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="username">
            <h3>{getDisplayName()}</h3>
            {currentChat?.role && (
              <span className="user-role">{currentChat.role}</span>
            )}
            {currentChat?.status && (
              <span className={`user-status ${currentChat.status}`}>
                {currentChat.status}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="chat-messages" ref={chatMessagesRef}>
        <div className="date-divider">
          <span>Today</span>
        </div>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.fromSelf ? "sent" : "received"}`}
            ref={index === messages.length - 1 ? scrollRef : null}
          >
            <div className="content">
              <p>{message.message}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      
      <form className="chat-input" onSubmit={handleSendMessage}>
        <div className="emoji-area">
          <div className="emoji-button">
            <BsEmojiSmileFill onClick={toggleEmojiPicker} />
          </div>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker 
                onEmojiClick={handleEmojiClick}
                onEmojiDoubleClick={handleEmojiDoubleClick}
                searchDisabled={false}
                skinTonesDisabled={true}
                width={280}
                height={350}
              />
            </div>
          )}
        </div>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Type a message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="send-button">
          <span className="send-icon">&#10148;</span>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #0d0d30;
  border-radius: 0 0.5rem 0.5rem 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  
  .chat-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
    background-color: #080420;
    height: 10%;
    min-height: 60px;
    z-index: 10;
    border-bottom: 1px solid #9a86f322;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        img {
          height: 3.5rem;
          width: 3.5rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #9a86f3;
        }
        
        .avatar-placeholder {
          height: 3.5rem;
          width: 3.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #9186f3, #5643cc);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          border: 2px solid #ffffff39;
          box-shadow: 0 0 10px rgba(154, 134, 243, 0.5);
        }
      }
      
      .username {
        display: flex;
        flex-direction: column;
        
        h3 {
          color: white;
          margin-bottom: 0.2rem;
          font-weight: 600;
          font-size: 1.2rem;
        }
        
        .user-role {
          color: #9a86f3;
          font-size: 0.8rem;
          margin-right: 0.5rem;
        }
        
        .user-status {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 1rem;
          background-color: #2c2c2c;
          color: white;
          display: inline-block;
          margin-top: 0.2rem;
          
          &.online {
            background-color: #4caf50;
          }
          
          &.away {
            background-color: #ff9800;
          }
          
          &.offline {
            background-color: #9e9e9e;
          }
        }
      }
    }
  }
  
  .chat-messages {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    min-height: 60px;
    background-color: #0a0a25;
    
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #9a86f3;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .date-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      
      span {
        background-color: #9a86f3;
        color: white;
        padding: 0.3rem 1rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
    }
    
    .message {
      display: flex;
      align-items: flex-end;
      margin-bottom: 0.5rem;
      
      .content {
        max-width: 65%;
        overflow-wrap: break-word;
        padding: 1rem;
        border-radius: 1rem;
        position: relative;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        
        p {
          margin-bottom: 0.8rem;
          word-break: break-word;
          line-height: 1.4;
        }
        
        .timestamp {
          position: absolute;
          bottom: 0.3rem;
          right: 0.8rem;
          font-size: 0.65rem;
          opacity: 0.8;
          font-style: italic;
        }
      }
    }
    
    .sent {
      justify-content: flex-end;
      
      .content {
        background: linear-gradient(to right bottom, rgba(79, 4, 255, 0.7), rgba(79, 4, 255, 0.4));
        color: white;
        border-top-right-radius: 0;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        
        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: -10px;
          width: 0;
          height: 0;
          border-left: 10px solid rgba(79, 4, 255, 0.7);
          border-top: 10px solid transparent;
        }
      }
    }
    
    .received {
      justify-content: flex-start;
      
      .content {
        background: linear-gradient(to right bottom, rgba(153, 0, 255, 0.7), rgba(153, 0, 255, 0.4));
        color: white;
        border-top-left-radius: 0;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: -10px;
          width: 0;
          height: 0;
          border-right: 10px solid rgba(153, 0, 255, 0.7);
          border-top: 10px solid transparent;
        }
        
        
      }
    }
  }
  
  .chat-input {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 5% 85% 10%;
    align-items: center;
    background-color: #080420;
    padding: 0.8rem 2rem;
    height: 10%;
    min-height: 60px;
    z-index: 10;
    border-top: 1px solid #9a86f322;
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
    
    .emoji-area {
      position: relative;
      
      .emoji-button {
        display: flex;
        align-items: center;
        color: rgb(255, 230, 0);
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
      
      .emoji-picker-container {
        position: absolute;
        bottom: 4rem;
        left: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        
        .EmojiPickerReact, .emoji-picker-react {
          background-color: #080420;
          box-shadow: 0 5px 15px #9a86f3;
          border-color: #9a86f3;
          max-width: 280px;
          height: 350px;
          border-radius: 10px;
          
          .epr-search-container, .emoji-search, .emoji-mart-search {
            width: 100%;
            padding: 10px;
            background-color: #080420;
            border-bottom: 1px solid #9a86f3;
            display: flex;
            align-items: center;
            border-radius: 8px;
            gap: 8px;
          }
          
          .epr-search, .emoji-search input, .emoji-mart-search input {
            width: 100%;
            background-color: #ffffff34;
            color: white;
            border: 1px solid #9a86f3;
            border-radius: 4px;
            padding: 6px;
            font-size: 0.9rem;
            
            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            &:focus {
                outline: none;
                border-color: #4e0eff;
            }
          }
          
          .emoji-group-names, .emoji-categories, .epr-category-nav,
          .epr-header-overlay, .emoji-categories-list, .emoji-group-header,
          .epr-category-nav-item, .emoji-category-wrapper, .emoji-categories-nav,
          .emoji-mart-anchors, .emoji-mart-category-label, .emoji-mart-category .emoji-mart-category-label {
            background-color: #080420 !important;
          }
          
          .emoji-group-title, .emoji-category-label, .epr-category-label,
          .epr-emoji-category-label, .emoji-picker-category-title,
          .emoji-mart-category-label, .emoji-category-header {
            background-color: #080420 !important;
          }
          
          .emoji-scroll-wrapper::-webkit-scrollbar,
          .emoji-categories::-webkit-scrollbar,
          .epr-body::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
                background-color: #9a86f3;
            }
          }
          
          .epr-search {
            background-color: transparent;
            border-color: #9a86f3;
          }
        }
      }
    }
    
    input {
      width: 100%;
      height: 70%;
      background-color: #ffffff14;
      color: white;
      border: none;
      padding: 0 1.5rem;
      font-size: 1.1rem;
      border-radius: 2rem;
      transition: all 0.3s ease;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      
      &::selection {
        background-color: #9a86f3;
      }
      
      &:focus {
        outline: none;
        background-color: #ffffff24;
        box-shadow: 0 0 0 2px #9a86f3, inset 0 0 5px rgba(0, 0, 0, 0.2);
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .send-button {
      height: 70%;
      width: 3rem;
      background: linear-gradient(135deg, #9a86f3, #4e0eff);
      border: none;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      margin-left: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(78, 14, 255, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(78, 14, 255, 0.5);
      }
      
      &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 5px rgba(78, 14, 255, 0.5);
      }
      
      .send-icon {
        font-size: 1.3rem;
        transform: rotate(0deg);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .chat-messages .message .content {
      max-width: 85%;
    }
    
    .chat-input {
      grid-template-columns: 10% 75% 15%;
      padding: 0 1rem;
    }
    
    .chat-header {
      padding: 0.8rem 1rem;
    }
  }
`;