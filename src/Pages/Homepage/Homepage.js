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
  <section className="homepage-about">
    <div className="card" id="bottom">
        <h3>Popular Hostels nearby</h3>
        <p> · Showcase images and names of popular hostels in the searched location</p>
        <p> · Add ratings, price range, and availablility to make appealing</p>
    </div>
    <div className="card">
        <h3>Featured accommodation <br/> options</h3>
        <p> · Highlight special accommodations with attractive offers or discounts</p>
    </div>
    <div className="card" id="bottom">
        <h3>User Reviews</h3>
        <p> · Display student review about hostels to help new users trust the platform</p>
        <p> · Use star rating and short user quotes</p>
    </div>
    <div className="card">
        <h3>Hostel category</h3>
        <p> · Filter hostel searches based on different filters and find the one which suits you</p>
    </div>

  </section>

  </section>
  </>;
}

export default Homepage;
