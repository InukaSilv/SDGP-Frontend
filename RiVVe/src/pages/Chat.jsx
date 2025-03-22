import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/internalChatComp/Contacts";
import ChatContainer from "../components/internalChatComp/ChatContainer";
import { allUsersRoute, host } from "../utils/APIRoutes";
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
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")){
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      if(currentUser && currentUser._id) {
        try {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };
    
    if (isLoaded) {
      fetchContacts();
    }
  }, [currentUser, isLoaded]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // Save draft message when user types
  const handleDraftMessageChange = (chatId, message) => {
    setDraftMessages(prev => ({
      ...prev,
      [chatId]: message
    }));
  };

  // Get draft message for current chat
  const getDraftMessage = (chatId) => {
    return draftMessages[chatId] || "";
  };

  return (
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
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  
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