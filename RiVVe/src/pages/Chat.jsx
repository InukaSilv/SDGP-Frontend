import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Contacts from "../components/internalChatComp/Contacts";
import ChatContainer from "../components/internalChatComp/ChatContainer";
import { allUsersRoute, host, getUserProfileRoute } from "../utils/APIRoutes";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [draftMessages, setDraftMessages] = useState({});

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthentication = async () => {
      // First try to get user data from localStorage
      const authToken = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");
      
      if (!authToken || !userData) {
        console.log("No authentication data found, redirecting to login");
        navigate("/login");
        return;
      }
      
      try {
        // Set the current user from localStorage immediately
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData);
        
        // Now also verify with the server (but don't block UI)
        axios.get(getUserProfileRoute, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then(response => {
          // Optional: Update user data if server has newer info
          if (response.data) {
            setCurrentUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("chat-app-user", JSON.stringify(response.data));
          }
        }).catch(error => {
          console.error("Error verifying authentication:", error);
          // Only redirect if it's an auth error (401/403)
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            navigate("/login");
          }
        });
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Error processing user data:", error);
        navigate("/login");
      }
    };
    
    checkAuthentication();
  }, [navigate]);

  // Set up socket connection once user is available
  useEffect(() => {
    if (currentUser && currentUser._id) {
      socket.current = io(host, {
        transports: ['polling']
      });
      
      socket.current.on("connect", () => {
        console.log("Socket connected successfully!");
        socket.current.emit("add-user", currentUser._id);
      });
      
      socket.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
    }
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);
  
  // Fetch contacts once user is loaded
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser && currentUser._id) {
        try {
          const authToken = localStorage.getItem("authToken");
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          
          console.log("Contacts API response:", response.data);
          setContacts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Error fetching contacts:", error);
          // If unauthorized, but don't redirect immediately
          if (error.response && error.response.status === 401) {
            console.warn("Unauthorized when fetching contacts");
          }
          setContacts([]);
        }
      }
    };
    
    if (isLoaded && currentUser) {
      fetchContacts();
    }
  }, [currentUser, isLoaded]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // Draft message handlers
  const handleDraftMessageChange = (chatId, message) => {
    setDraftMessages(prev => ({
      ...prev,
      [chatId]: message
    }));
  };

  const getDraftMessage = (chatId) => {
    return draftMessages[chatId] || "";
  };

  // Show loading state instead of redirecting
  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <Container>
          <div className="loading">Loading chat data...</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="container">
          <Contacts 
            contacts={contacts} 
            currentUser={currentUser} 
            changeChat={handleChatChange}
          />
          {currentChat ? (
            <ChatContainer 
              currentChat={currentChat} 
              currentUser={currentUser}
              socket={socket}
              draftMessage={getDraftMessage(currentChat._id)}
              onDraftMessageChange={(message) => handleDraftMessageChange(currentChat._id, message)}
            />
          ) : (
            <div className="welcome">
              <h1>Welcome to RiVVe Chat!</h1>
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 25px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  overflow: hidden;
  
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #0d0d30;
    height: 100%;
    
    h1 {
      margin-bottom: 1rem;
      background: linear-gradient(to right, #9186f3, #5643cc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2.5rem;
      text-align: center;
    }
    
    p {
      color: #ffffffb9;
      font-size: 1.2rem;
      margin-top: 0.5rem;
    }
  }
`;

export default Chat;