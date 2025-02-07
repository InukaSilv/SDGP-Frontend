import Navbar from "../components/navbar/Navbar";
import TeamCard from "../components/teamCards/TeamCard";


function About() {
  return (
    <>
      <Navbar/>

      <div className="mt-30 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">About us</h1>
        <p className="text-slate-700">This section will tell the details of our teams and follow us on social media for more details</p>
         {/*Here using the component teamCard*/}

         {/* Horizontal layout for team cards */}
        <div className="flex flex-row flex-wrap justify-center gap-6">
          <TeamCard />
        </div>
      </div>


      <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        <h1>About <span>Our Brand</span></h1>
        <p>RiVVE’s primary goal is to become the preferred resource for students seeking housing by aiming to solve accessibility, transparency, and convenience barriers by delivering a single platform designed specifically for students.</p>
        
      </div>

    </>
  );
}
export default About;
