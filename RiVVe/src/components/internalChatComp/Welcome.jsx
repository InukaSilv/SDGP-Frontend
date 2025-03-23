import React from "react";
import styled from "styled-components";


export default function Welcome({ currentUser }) {
    return (
        <Container>
            <h1>Welcome, <span>{currentUser.username}!</span></h1>
            <h3>Select a user to start a chat</h3>
        
        
        </Container>
        )
}


const Container = styled.div``;