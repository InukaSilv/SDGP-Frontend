import React from "react";
import Navbar from "../../Components/navbar/navabar";
import "./Signup1.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Signup1() {
  const [accountType, setAccountType] = React.useState("");

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <h1>Let's Get Started</h1>
      <section className="signup-main">
        <h2>Get Started</h2>
        <h3>What is your account type?</h3>
        <div className="custom-select">
          <Box sx={{ minWidth: 300, margin: "0 auto", textAlign: "left", backgroundColor: "#FFF8F8", borderRadius:"10px", borderOutline:"none" }}>
            <FormControl fullWidth>
              <InputLabel id="account-type-label">Account Type</InputLabel>
              <Select
                labelId="account-type-label"
                id="account-type"
                value={accountType}
                label="Account Type"
                onChange={handleChange}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="landlord">Landlord</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </section>
    </>
  );
}

export default Signup1;
