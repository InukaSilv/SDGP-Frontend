import Navbar from "../../Components/navbar/navabar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Homepage.css";

function Homepage() {
  return <>
    <Navbar/>
  <section className="homepage-main">

<section className="homepage-welcome-search">
  <figure className="hostel-image">
  <img src="/images/hostyell.jpg" alt="hostel-image" />
  </figure>
  <div>
  <h1>Welcome to <br/> RiVVE !</h1>
  <h2>Your hostel search made easy—find trusted stays for every jourrney!</h2>
  <div className="searchbar">
  <SearchBar/>
  </div>
 
  </div>
  </section>

  </section>
  </>;
}

export default Homepage;
