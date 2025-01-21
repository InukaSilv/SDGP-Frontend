import React, { useState } from "react";
import "./navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [mobileState, setMobileState] = useState(false);

  const toggleMobileMenu = () => {
    setMobileState(!mobileState);
  };

  return (
    <>
      <nav>
        <h1>RiVVE</h1>
        <section className={!mobileState?"navbar-main":"navbar-main-mobile"}>
        <div className="main-options">
          <ul className="nav-opt-ul">
            <li>Home</li>
            <li>About</li>
            <li>Hostels</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="main-logins">
            <p>Already a member ? </p>
            <button>LOGIN</button>
            <button>SIGNUP</button>
            <div className="person-icon">
                <PersonIcon fontSize="large"/>
            </div>
        </div>
        </section>
        {!mobileState?
        <div className="menu-icon">
          <MenuIcon fontSize="large" onClick={toggleMobileMenu}/>
        </div>
        :<CloseIcon fontSize="large" onClick={toggleMobileMenu}/>}
      </nav>
    </>
  );
}

export default Navbar;
