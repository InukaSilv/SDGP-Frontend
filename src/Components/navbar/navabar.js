import { Component } from "react";
import "./navbar.css";
import PersonIcon from '@mui/icons-material/Person';

class Navbar extends Component {
state={clicked:false};

handleClick = () =>{
  this.setState({clicked:!this.state.clicked});
}
render(){
return (
    <>
      <nav className="nav-bar">
        <section className="nav-left">
          <h1>RiVVE</h1>
          <ul id="navbar" className="">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Hostels</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </section>
        <section className="nav-right">
          <p>Already a member?</p>
          <button>LOGIN</button>
          <button>SIGNUP</button>

          <PersonIcon fontSize="large" className="person-icon"/>
        </section>
      </nav>
    </>
  );
}
  
}

export default Navbar;
