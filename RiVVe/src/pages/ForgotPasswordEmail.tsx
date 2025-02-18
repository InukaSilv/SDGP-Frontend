import { useState } from "react";
import {
  auth,
  signInWithPopup,
  googleProvider,
  signInWithEmailAndPassword,
} from "../firebase";
import { getIdToken, sendPasswordResetEmail } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
function ForgotPasswordEmail() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("verificaiton sent to", email);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Reset password</h1>
        <form className="" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="jhon@gmail.com"
            value={email}
            onChange={handleEmail}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
export default ForgotPasswordEmail;
