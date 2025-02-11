import Navbar from "../components/navbar/Navbar";
import TeamCard from "../components/teamCards/TeamCard";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  { name: "Lasal Rathnayake", role: "Front End Developer", imageUrl: "/images/lasal.jpg" },
  { name: "Ishara Dharmapriya", role: "Front End Developer", imageUrl: "https://via.placeholder.com/150" },
  { name: "Inuka", role: "Team Leader", imageUrl: "https://via.placeholder.com/150" },
  { name: "Dulen Eragoda", role: "Back End Developer", imageUrl: "https://via.placeholder.com/150" },
  { name: "Dulen Perera", role: "Back End Developer", imageUrl: "https://via.placeholder.com/150" },
  { name: "Hasindu Pieris", role: "AI Developer", imageUrl: "https://via.placeholder.com/150" },
];

const About = () => {
  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="flex flex-col items-center gap-6 mt-20 text-center -z-10">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 max-w-2xl">
          RiVVE is a student-focused hostel booking platform designed to make accommodation searches easier, safer, and more transparent.
        </p>
      </section>

      {/* Our Mission & Vision */}
      <section className="flex flex-col items-center mt-16 p-10 bg-blue-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Our Mission & Vision</h2>
        <p className="max-w-3xl text-gray-700 text-center mt-4">
          Our mission is to simplify the hostel booking process for students by providing a reliable, transparent, and user-friendly platform. 
          We aim to bridge the gap between students and verified hostel providers, ensuring safe and convenient accommodations.
        </p>
      </section>

      {/* Why Choose RiVVE */}
      <section className="flex flex-col items-center mt-16 p-10">
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose RiVVE?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <FeatureCard title="Verified Listings" description="All hostels and accommodations are verified to ensure safety and trust." />
          <FeatureCard title="Student Chat System" description="Chat with previous tenants to get firsthand insights before booking." />
          <FeatureCard title="Google Maps Integration" description="Easily locate hostels near your university with customizable search radius." />
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col items-center mt-16">
        <h2 className="text-3xl font-semibold text-gray-800">Meet Our Team</h2>
        <div className="grid grid-cols-3 gap-8 mt-8 px-4">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} name={member.name} role={member.role} imageUrl={member.imageUrl} />
          ))}
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="flex flex-col items-center mt-32 p-10 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Technologies We Use</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <TechBadge name="React.js" />
          <TechBadge name="Tailwind CSS" />
          <TechBadge name="Node.js" />
          <TechBadge name="Express.js" />
          <TechBadge name="MySQL" />
          <TechBadge name="Google Maps API" />
        </div>
      </section>

      {/* Contact & Social Media */}
      <section className="flex flex-col items-center mt-16 p-10">
        <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 max-w-2xl text-center mt-4">
          Have questions or feedback? Connect with us on social media or drop us an email.
        </p>
        <div className="flex gap-6 mt-6">
          <SocialIcon name="LinkedIn" link="https://linkedin.com" />
          <SocialIcon name="Twitter" link="https://twitter.com" />
          <SocialIcon name="Facebook" link="https://facebook.com" />
          <SocialIcon name="Instagram" link="https://facebook.com" />
        </div>
      </section>
    </>
  );
};

export default About;

// Feature Card Component
type FeatureProps = { title: string; description: string };
const FeatureCard: React.FC<FeatureProps> = ({ title, description }) => (
  <div className="p-6 bg-white shadow-lg rounded-lg text-center w-72">
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

// Tech Badge Component with Hover Effect
type TechBadgeProps = { name: string };
const TechBadge: React.FC<TechBadgeProps> = ({ name }) => (
  <span
    className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 transition-all duration-300 transform hover:bg-blue-700 hover:scale-110 hover:shadow-lg"
  >
    {name}
  </span>
);

// Social Icon Component
type SocialIconProps = { name: string; link: string };
const SocialIcon: React.FC<SocialIconProps> = ({ name, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
    {name}
  </a>
);
