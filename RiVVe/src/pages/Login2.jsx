// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";
// import Logo from "../assests/logo1.png";

// export default function Login() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({ email: "" });
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   useEffect(() => {
//     if (localStorage.getItem("chat-app-user")) {
//       navigate("/");
//     }
//   }, []);

//   const handleChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleValidation = () => {
//     const { email } = values;
//     if (email === "") {
//       toast.error("Email is required.", toastOptions);
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (handleValidation()) {
//       const { email } = values;
      
//       try {
//         console.log("Sending login data:", { username: email });
//         const { data } = await axios.post(loginRoute, {
//           username: email, // Send email in the username field to maintain compatibility
//         });
        
//         if (data.status === false) {
//           toast.error(data.msg, toastOptions);
//         } else if (data.status === true) {
//           localStorage.setItem('chat-app-user', JSON.stringify(data.user));
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         toast.error("An error occurred. Please try again.", toastOptions);
//       }
//     }
//   };

//   return (
//     <>
//       <FormContainer>
//         <form action="" onSubmit={handleSubmit}>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h1>Rivve Chat</h1>
//           </div>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             onChange={handleChange}
//             min="3"
//           />
//           <button type="submit">Log In</button>
//         </form>
//       </FormContainer>
//       <ToastContainer />
//     </>
//   );
// }

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;