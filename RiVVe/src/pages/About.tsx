import React from "react";
import Navbar from "../components/navbar/Navbar";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  { name: "Lasal Rathnayake", role: "Front End Developer", imageUrl: "https://storage.googleapis.com/rivve-web-trial/lasal" },
  { name: "Ishara Dharmapriya", role: "Front End Developer", imageUrl: "https://storage.googleapis.com/rivve-web-trial/ishara" },
  { name: "Inuka Silva", role: "Team Leader", imageUrl: "https://storage.googleapis.com/rivve-web-trial/inuka" },
  { name: "Dulen Eragoda", role: "Back End Developer", imageUrl: "https://storage.googleapis.com/rivve-web-trial/dulenera" },
  { name: "Dulen Perera", role: "Back End Developer", imageUrl: "https://storage.googleapis.com/rivve-web-trial/dulenperera" },
  { name: "Hasindu Pieris", role: "AI Developer", imageUrl: "https://storage.googleapis.com/rivve-web-trial/hasindu" },
];

// Frontend technologies with their icons
const frontendTech = [
  { name: "React", icon: "https://img.icons8.com/office/40/react.png" },
  { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"}
];

// Backend technologies with their icons
const backendTech = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Google Maps API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"}
];

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />

      {/* About Section */}
      <section className="flex flex-col items-center gap-6 mt-20 text-center px-4">
        <h1 className="text-4xl font-bold text-purple-300">About Us</h1>
        <p className="text-gray-300 max-w-2xl">
          RiVVE is a student-focused hostel booking platform designed to make accommodation searches easier, safer, and more transparent.
        </p>
      </section>

      {/* Our Mission & Vision */}
      <section className="flex flex-col items-center mt-16 p-10 bg-gray-800 rounded-lg shadow-md mx-4 border-l-4 border-blue-500">
        <h2 className="text-3xl font-semibold text-blue-300">Our Mission & Vision</h2>
        <p className="max-w-3xl text-gray-300 text-center mt-4">
          Our mission is to simplify the hostel booking process for students by providing a reliable, transparent, and user-friendly platform. 
          We aim to bridge the gap between students and verified hostel providers, ensuring safe and convenient accommodations.
        </p>
      </section>

      {/* Why Choose RiVVE */}
      <section className="flex flex-col items-center mt-16 p-10 mx-4">
        <h2 className="text-3xl font-semibold text-purple-300">Why Choose RiVVE?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <FeatureCard 
            title="Verified Listings" 
            description="All hostels and accommodations are verified to ensure safety and trust." 
            iconColor="text-green-400"
          />
          <FeatureCard 
            title="Student Chat System" 
            description="Chat with previous tenants to get firsthand insights before booking." 
            iconColor="text-blue-400"
          />
          <FeatureCard 
            title="Google Maps Integration" 
            description="Easily locate hostels near your university with customizable search radius." 
            iconColor="text-red-400"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col items-center mt-16 mx-4">
        <h2 className="text-3xl font-semibold text-blue-300">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} name={member.name} role={member.role} imageUrl={member.imageUrl} />
          ))}
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="mt-16 p-10 mx-4">
        <h2 className="text-3xl font-semibold text-center text-purple-300 mb-12">Technologies We Use</h2>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Frontend Tech Stack */}
          <div className="bg-gray-800 rounded-lg p-8 border border-purple-500 w-full lg:w-2/5">
            <h3 className="text-2xl font-bold text-center text-purple-300 mb-8">FRONTEND</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {frontendTech.map((tech, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={tech.icon} alt={tech.name} className="h-12 w-12 mb-2" />
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Tech Stack */}
          <div className="bg-gray-800 rounded-lg p-8 border border-blue-500 w-full lg:w-2/5">
            <h3 className="text-2xl font-bold text-center text-blue-300 mb-8">BACKEND & DATABASE</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {backendTech.map((tech, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={tech.icon} alt={tech.name} className="h-12 w-12 mb-2" />
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Media */}
      <section className="flex flex-col items-center mt-16 p-10 bg-gray-800 rounded-lg mx-4 mb-16 border-r-4 border-purple-500">
        <h2 className="text-3xl font-semibold text-purple-300">Get in Touch</h2>
        <p className="text-gray-300 max-w-2xl text-center mt-4">
          Have questions or feedback? Connect with us on social media or drop us an email.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <SocialIcon name="LinkedIn" link="https://linkedin.com" color="bg-blue-600" />
          <SocialIcon name="Twitter" link="https://twitter.com" color="bg-blue-400" />
          <SocialIcon name="Facebook" link="https://facebook.com" color="bg-blue-800" />
          <SocialIcon name="Instagram" link="https://instagram.com" color="bg-pink-600" />
        </div>
      </section>
    </div>
  );
};

export default About;

// Feature Card Component
type FeatureProps = { 
  title: string; 
  description: string;
  iconColor: string;
};

const FeatureCard: React.FC<FeatureProps> = ({ title, description, iconColor }) => (
  <div className="p-6 bg-gray-800 shadow-lg rounded-lg text-center border-t-2 border-gray-700 hover:border-blue-500 transition-all duration-300">
    <div className={`text-4xl mb-4 ${iconColor}`}>
      {title === "Verified Listings" && "✓"}
      {title === "Student Chat System" && "💬"}
      {title === "Google Maps Integration" && "📍"}
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 mt-2">{description}</p>
  </div>
);

// Team Card Component
type TeamCardProps = {
  name: string;
  role: string;
  imageUrl: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ name, role, imageUrl }) => {
  const roleColor = role.includes("Front End") 
    ? "text-purple-300" 
    : role.includes("Back End") 
      ? "text-blue-300" 
      : role.includes("AI") 
        ? "text-green-300" 
        : "text-yellow-300";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className={`mt-2 ${roleColor}`}>{role}</p>
      </div>
    </div>
  );
};

// Social Icon Component with SVG icons
type SocialIconProps = { 
  name: string; 
  link: string;
  color: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ name, link, color }) => {
  // Function to render the appropriate SVG icon based on the platform name
  const renderIcon = () => {
    switch (name.toLowerCase()) {
      case "linkedin":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        );
      case "twitter":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 00-.55 2.07 4.09 4.09 0 001.82 3.41 4.05 4.05 0 01-1.86-.51v.05a4.1 4.1 0 003.3 4 3.93 3.93 0 01-1.1.17 4.86 4.86 0 01-.77-.07 4.11 4.11 0 003.83 2.84A8.22 8.22 0 012 18.28a11.57 11.57 0 006.29 1.85A11.59 11.59 0 0020 8.45v-.53a8.43 8.43 0 002-2.12z" />
          </svg>
        );
      case "facebook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        );
      case "instagram":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.669.642-1.275 1.153-1.772a4.904 4.904 0 011.772-1.153c.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.059-4.04-.059zm0 3.064A5.135 5.135 0 1017.135 12 5.134 5.134 0 0012 6.865zm0 8.468A3.333 3.333 0 1115.334 12 3.333 3.333 0 0112 15.333zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${color} text-white p-3 rounded-full hover:opacity-80 transition-opacity duration-300 flex items-center justify-center w-10 h-10`}
      aria-label={name}
    >
      {renderIcon()}
    </a>
  );
};