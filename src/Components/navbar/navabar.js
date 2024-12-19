import "./navbar.css";

function Navbar() {
  return <>
  <nav>
    <div>
    <div className="navbar-container">
<div className="navbar-logo">
      <h1>RiVVE</h1>
    </div>
    <div className="navbar-menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/hostel">Hostel</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    </div>
    </div>
    <div className="navbar-button">
        <h3>Already a member?</h3>
        <button>Login</button>  
        <button>Signup</button>
    </div>
    
    </nav>
  </>;
}

export default Navbar;
