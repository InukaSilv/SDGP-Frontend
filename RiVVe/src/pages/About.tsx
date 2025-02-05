import Navbar from "../components/navbar/Navbar";
import TeamCard from "../components/teamCards/teamCard";


function About() {
  return (
    <>
      <Navbar/>

      <div className="mt-30 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">About us</h1>
        <p className="text-slate-700">This section will tell the details of our teams and follow us on social media for more details</p>
         {/*Here using the component teamCard*/}
         <TeamCard/>
      </div>
    </>
  );
}
export default About;
