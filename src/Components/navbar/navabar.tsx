import React, { Component } from "react";
import "./navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

interface State {
  mobileState: boolean;
}

class Navbar extends Component<{}, State> {
  // Initialize state
  constructor(props: {}) {
    super(props);
    this.state = {
      mobileState: false,
    };
  }

  // Toggle mobile menu
  toggleMobileMenu = () => {
    this.setState({ mobileState: !this.state.mobileState });
  };

  render() {
    const { mobileState } = this.state;

    return (
      <>
        <nav>
          <h1>RiVVE</h1>
          <section
            className={!mobileState ? "navbar-main" : "navbar-main-mobile"}
          >
            <div className="main-options">
              <ul className="nav-opt-ul">
                <li>
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li>About</li>
                <li>
                  <NavLink to="browse">Hostels</NavLink>
                </li>
                <li>Contact</li>
              </ul>
            </div>

            <div className="main-logins">
              <p>Already a member?</p>
              <button>LOGIN</button>
              <button>
                <NavLink to="signup">SIGNUP</NavLink>
              </button>
              <div className="person-icon">
                <PersonIcon fontSize="large" />
              </div>
            </div>
          </section>
          {!mobileState ? (
            <div className="menu-icon">
              <MenuIcon fontSize="large" onClick={this.toggleMobileMenu} />
            </div>
          ) : (
            <CloseIcon fontSize="large" onClick={this.toggleMobileMenu} />
          )}
        </nav>
      </>
    );
  }
}

export default Navbar;
