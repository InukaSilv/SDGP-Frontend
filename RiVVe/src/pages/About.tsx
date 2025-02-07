import Navbar from "../components/navbar/Navbar";
import TeamCard from "../components/teamCards/TeamCard";


function About() {
  const teamMembers = [
    {
      name: "Lasal Rathnayake",
      role: "Front End Developer",
      imageUrl: "/images/lasal.jpg", // Replace with actual image URLs
    },
    {
      name: "Ishara Dharmapriya",
      role: "Front End Developer",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Inuka",
      role: "Team Leader",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Dulen Eragoda",
      role: "Back End Developer",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Dulen Perera",
      role: "Back End Developer",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Hasindu Perera",
      role: "AI Developer",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <Navbar />

      {/* About Section */}
      <div className="flex flex-col items-center gap-10 mt-20">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 max-w-2xl text-center">
          This section will tell the details of our teams and follow us on
          social media for more details.
        </p>
      </div>

      {/* Team Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 px-4">
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            role={member.role}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>

      {/* Brand Section */}
      <div
        className="flex flex-col items-center justify-center mt-20 p-10 bg-gradient-to-r from-blue-900 to-purple-900 text-white"
        id="About"
      >
        <h2 className="text-3xl font-semibold mb-4">
          About <span className="text-blue-300">Our Brand</span>
        </h2>
        <p className="max-w-3xl text-center text-gray-200">
          RiVVE’s primary goal is to become the preferred resource for students
          seeking housing by aiming to solve accessibility, transparency, and
          convenience barriers by delivering a single platform designed
          specifically for students.
        </p>
      </div>
    </>
  );
}

export default About;
