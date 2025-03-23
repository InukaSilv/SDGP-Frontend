import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.firstName && currentUser.lastName) {
        setCurrentUserName(`${currentUser.firstName} ${currentUser.lastName}`);
      } else {
        setCurrentUserName(currentUser.email);
      }
    }
  }, [currentUser]);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <h2>RiVVe Chat</h2>
          </div>
          <div className="contacts">
          {Array.isArray(contacts) && contacts.length > 0 ? (
  contacts.map((contact, index) => (
    <div
      className={`contact ${index === currentSelected ? "selected" : ""}`}
      key={index}
      onClick={() => handleChangeCurrentChat(index, contact)}
    >
      <div className="avatar">
        {contact.profilePhoto ? (
          <img src={contact.profilePhoto} alt="avatar" />
        ) : (
          contact.firstName?.charAt(0) || contact.email?.charAt(0)
        )}
      </div>
      <div className="username">
        <h3>
          {contact.firstName && contact.lastName
            ? `${contact.firstName} ${contact.lastName}`
            : contact.email}
        </h3>
        <p className="role">{contact.role}</p>
      </div>
    </div>
      ))
    ) : (
      <div className="no-contacts">No contacts available</div>
    )}
          </div>
          <div className="current-user">
            <div className="avatar current-user-avatar">
              {currentUser?.firstName?.charAt(0) || currentUser?.username?.charAt(0)}
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
              {currentUser && <p className="role">{currentUser.role}</p>}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background-color: #080420;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  height: 100%;
  max-height: 100vh;
  
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #ffffff16;
    
    img {
      height: 3rem;
      max-width: 100%;
      transition: transform 0.3s ease;
      
      
    }
    
    h2 {
      color: white;
      text-transform: uppercase;
      font-weight: 800;
      font-size: clamp(1rem, 4vw, 1.5rem);
      white-space: nowrap;
      letter-spacing: 1px;
      background: linear-gradient(to right, #9186f3, #5643cc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media screen and (max-width: 480px) {
      gap: 0.5rem;
      
      img {
        height: 2rem;
      }
    }
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 0.8rem;
    
    &::-webkit-scrollbar {
      width: 0.4rem;
      
      &-thumb {
        background-color: #9186f3;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .contact {
      background-color: #ffffff16;
      min-height: 4rem;
      width: 100%;
      cursor: pointer;
      border-radius: 0.6rem;
      padding: 0.8rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.3s ease-in-out;
      border-left: 4px solid transparent;
      
      &:hover {
        background-color: #ffffff28;
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }
      
      .avatar {
        background: linear-gradient(135deg, #9186f3, #5643cc);
        height: 3rem;
        width: 3rem;
        min-width: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 1.2rem;
        text-transform: uppercase;
      }
      
      .username {
        flex: 1;
        overflow: hidden;
        
        h3 {
          color: white;
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .role {
          color: #ffffffb4;
          font-size: 0.8rem;
          font-style: italic;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      @media screen and (min-width: 481px) and (max-width: 1080px) {
        padding: 0.6rem;
        gap: 0.6rem;
        
        .avatar {
          height: 2.5rem;
          width: 2.5rem;
          min-width: 2.5rem;
          font-size: 1rem;
        }
        
        .username {
          h3 {
            font-size: 0.9rem;
          }
          
          .role {
            font-size: 0.7rem;
          }
        }
      }

      @media screen and (max-width: 480px) {
        padding: 0.5rem;
        gap: 0.5rem;
        min-height: 3.5rem;
        
        .avatar {
          height: 2.2rem;
          width: 2.2rem;
          min-width: 2.2rem;
          font-size: 0.9rem;
        }
        
        .username {
          h3 {
            font-size: 0.85rem;
            margin-bottom: 0.2rem;
          }
          
          .role {
            font-size: 0.65rem;
          }
        }
      }
    }
    
    .selected {
      background-color: rgba(145, 134, 243, 0.4);
      border-left: 4px solid #9186f3;
      box-shadow: 0 5px 15px rgba(145, 134, 243, 0.3);
      
      .username {
        h3 {
          color: #ffffff;
        }
        
        .role {
          color: #ffffffd9;
        }
      }
    }
  }
  
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-top: 1px solid #ffffff16;
    
    .current-user-avatar {
      background: linear-gradient(135deg, #5643cc, #9186f3);
      height: 3rem;
      width: 3rem;
      min-width: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 1.2rem;
      text-transform: uppercase;
      border: 2px solid #ffffff39;
    }
    
    .username {
      flex: 1;
      overflow: hidden;
      
      h2 {
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .role {
        color: #9186f3;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
    @media screen and (min-width: 481px) and (max-width: 1080px) {
      gap: 0.8rem;
      
      .current-user-avatar {
        height: 2.5rem;
        width: 2.5rem;
        min-width: 2.5rem;
        font-size: 1rem;
      }
      
      .username {
        h2 {
          font-size: 1rem;
        }
        
        .role {
          font-size: 0.7rem;
        }
      }
    }

    @media screen and (max-width: 480px) {
      gap: 0.5rem;
      padding: 0.4rem;
      
      .current-user-avatar {
        height: 2.2rem;
        width: 2.2rem;
        min-width: 2.2rem;
        font-size: 0.9rem;
      }
      
      .username {
        h2 {
          font-size: 0.9rem;
          margin-bottom: 0.1rem;
        }
        
        .role {
          font-size: 0.65rem;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    border-radius: 0.3rem 0 0 0.3rem;
  }
`;