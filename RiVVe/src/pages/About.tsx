import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import MouseGlowEffect from "../components/mouseGlowEffect/MouseGlowEffect";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Lasal Rathnayake",
    role: "Front End Developer",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/lasal",
  },
  {
    name: "Inuka Silva",
    role: "Team Leader",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/inuka",
  },
  {
    name: "Ishara Dharmapriya",
    role: "Front End Developer",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/ishara",
  },
  {
    name: "Dulen Eragoda",
    role: "Front End Developer",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/dulenera",
  },
  {
    name: "Dulen Perera",
    role: "Back End Developer",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/dulenperera",
  },
  {
    name: "Hasindu Pieris",
    role: "Back End Developer",
    imageUrl: "https://storage.googleapis.com/rivve-web-trial/hasindu",
  },
];

// Frontend technologies with their icons
const frontendTech = [
  { name: "React", icon: "https://img.icons8.com/office/40/react.png" },
  {
    name: "Tailwind CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
];

// Backend technologies with their icons
const backendTech = [
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    icon: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Google Maps API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
];

// Student features
const studentFeatures = [
  {
    title: "Smart Search",
    icon: "🔍",
    description:
      "Search by location, price, amenities, and university proximity to find your perfect match.",
  },
  {
    title: "Verified Reviews & Ratings",
    icon: "⭐",
    description: "Get real feedback from past tenants",
  },
  {
    title: "Direct Messaging",
    icon: "💬",
    description:
      "Chat with landlords to get detailed information about hostels",
  },
  {
    title: "Real-Time Availability",
    icon: "🕒",
    description: "See if a spot is open before making inquiries.",
  },
  {
    title: "Price Alerts",
    icon: "💲",
    description:
      "Set alerts for price drops and availability at your favorite hostels.",
  },
  {
    title: "Secure & Reliable",
    icon: "🔐",
    description: "Listings are verified for safety and quality.",
  },
];

// Hostel owner features
const ownerFeatures = [
  {
    title: "Direct Tenant Communication",
    icon: "💬",
    description: "Chat with students directly on the platform.",
  },
  {
    title: "Booking Management",
    icon: "📋",
    description: "Streamlined booking process with updates.",
  },
  {
    title: "Media Management",
    icon: "📷",
    description: "Showcase your property with high-quality photos",
  },
  {
    title: "Free & Paid Listings",
    icon: "📝",
    description: "Advertise your property to thousands of students.",
  },
  {
    title: "Easy Management",
    icon: "🔧",
    description: "Update availability, pricing, and amenities anytime.",
  },
  {
    title: "Multi-language Support",
    icon: "🌐",
    description:
      "Reach international travelers with multiple language options.",
  },
];

// Common amenities
const commonAmenities = [
  { name: "Wi-Fi", icon: "📶" },
  { name: "Common Kitchen", icon: "🍳" },
  { name: "24/7 Access", icon: "🔑" },
  { name: "Clean Bathrooms", icon: "🚿" },
  { name: "Clean Bedding", icon: "🛏️" },
  { name: "Study Areas", icon: "📚" },
  { name: "Security", icon: "🔒" },
  { name: "Public Transport Access", icon: "🚌" },
];

// FAQ items
const faqItems = [
  {
    question: "What is RiVVE?",
    answer:
      "RiVVE is a student-focused hostel booking platform designed to make accommodation searches easier, safer, and more transparent.",
  },
  {
    question: "How do I find hostels near my university?",
    answer:
      "Use our Smart Search feature to search by location and set your university as a reference point with your preferred proximity radius.",
  },
  {
    question: "Are the reviews and ratings verified?",
    answer:
      "Yes, all reviews and ratings on RiVVE come from verified past tenants who have actually stayed at the hostels.",
  },
  {
    question: "How do I contact a hostel owner or current tenant?",
    answer:
      "You can use our Direct Messaging feature to chat with hostel owners. For current tenants, you can request contact through our platform.",
  },
  {
    question: "Can I book my hostel directly on RiVVE?",
    answer:
      "Yes, RiVVE provides a secure booking system that allows you to reserve your accommodation directly on our platform.",
  },
];

// Animated Counter Component
const AnimatedCounter: React.FC<{
  endValue: number;
  suffix?: string;
  title: string;
}> = ({ endValue, suffix = "", title }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = Math.ceil(endValue / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, endValue]);

  return (
    <div
      ref={counterRef}
      className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg border-t-2 border-[#2772A0] transform transition-transform duration-500 hover:scale-105"
    >
      <span className="text-4xl font-bold text-white mb-2">
        {count}
        {suffix}
      </span>
      <h3 className="text-lg text-[#CCDDEA]">{title}</h3>
    </div>
  );
};

// Amenities Slideshow Component with light theme
const AmenitiesSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const totalItems = commonAmenities.length;

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay, totalItems]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  return (
    <div
      className="w-full mt-16 overflow-hidden bg-gradient-to-r from-[#0d192b] to-[#172c47] py-16 px-6 rounded-xl relative shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-4xl font-bold text-center mb-16 relative z-10 tracking-wide text-[#8eafd1]">
        Common Amenities
      </h3>

      <div className="relative h-56 z-10 flex justify-center items-center">
        <div className="flex items-center justify-center w-full">
          {commonAmenities.map((amenity, index) => {
            // Calculate position relative to active item
            const position = (index - activeIndex + totalItems) % totalItems;
            const isActive = position === 0;

            // Calculate transform properties
            let translateX = 0;
            let scale = 0.8;
            let opacity = 0.5;
            let zIndex = 0;

            if (isActive) {
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (position === 1 || position === totalItems - 1) {
              translateX = position === 1 ? 250 : -250;
              scale = 0.9;
              opacity = 0.7;
              zIndex = 5;
            } else if (position === 2 || position === totalItems - 2) {
              translateX = position === 2 ? 450 : -450;
              scale = 0.8;
              opacity = 0.4;
              zIndex = 1;
            } else {
              translateX = position < totalItems / 2 ? 600 : -600;
              opacity = 0;
            }

            return (
              <div
                key={index}
                className={`absolute bg-[#172c47] p-8 rounded-lg shadow-lg flex items-center gap-6 min-w-80 h-40 transition-all duration-500 cursor-pointer ${
                  isActive ? "shadow-[#8eafd1]/40" : "shadow-[#8eafd1]/10"
                } border border-[#8eafd1]/20`}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => handleItemClick(index)}
              >
                <div
                  className={`text-5xl ${
                    isActive ? "text-[#8eafd1]" : "text-[#8eafd1]/80"
                  }`}
                >
                  {amenity.icon}
                </div>
                <span
                  className={`whitespace-nowrap font-medium text-xl ${
                    isActive ? "text-[#8eafd1]" : "text-[#8eafd1]/80"
                  }`}
                >
                  {amenity.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#8eafd1] rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-12">
        {commonAmenities.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-[#8eafd1] w-8" : "bg-[#8eafd1]/40"
            }`}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Section Transition Component with dark blue theme
const SectionTransition: React.FC = () => (
  <div className="w-full flex justify-center my-20">
    <div className="flex items-center w-full max-w-4xl">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8eafd1]/70"></div>
      <div className="mx-4 text-[#8eafd1]">
        <div className="w-2 h-16 bg-[#8eafd1]/30 rounded-full"></div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8eafd1]/70"></div>
    </div>
  </div>
);

// Parallax Background Effect
const ParallaxBackground: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(39, 114, 160, 0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",

        transform: `translateY(${offset * 0.3}px)`,
        opacity: 0.5,
      }}
    ></div>
  );
};

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-100 relative overflow-hidden">
      <ParallaxBackground />
      <MouseGlowEffect />
      <Navbar />

      {/* Hero Section with animated gradient */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#2772A0]/20 to-gray-900/70 z-0"></div>

        {/* Animated circles in background */}
        <div className="absolute  top-1/4 left-1/4 w-64 h-64 bg-[#3a85b3]/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e5f8a]/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mt-20 md:mt-0">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
            About RiVVE
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
            RiVVE is a student-focused hostel booking platform designed to make
            accommodation searches easier, safer, and more transparent.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <AnimatedCounter
              endValue={5000}
              suffix="+"
              title="Happy Students"
            />
            <AnimatedCounter
              endValue={200}
              suffix="+"
              title="Verified Landlords"
            />
            <AnimatedCounter 
              endValue={50} 
              suffix="+"
              title="Universities Covered" />
            <AnimatedCounter
              endValue={98}
              suffix="%"
              title="Satisfaction Rate"
            />
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-[#2772A0] to-[#3a85b3] rounded-full font-medium text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Find a Hostel
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-[#2772A0] rounded-full font-medium text-[#CCDDEA] hover:bg-[#2772A0]/30 transition-all duration-300">
              List Your Property
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <svg
            className="w-6 h-6 text-[#CCDDEA]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      <SectionTransition />

      {/* Our Mission & Vision - Redesigned with cards */}
      <section className="relative px-4 py-20 min-h-screen">
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-16">
          Our Mission & Vision
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-l-4 border-[#2772A0] transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl text-[#3a85b3] mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Our Mission
            </h3>

            <p className="text-gray-300">
              To simplify the hostel booking process for students by providing a
              reliable, transparent, and user-friendly platform. We make finding
              the perfect student accommodation as easy as possible.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-l-4 border-[#CCDDEA] transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl text-[#CCDDEA] mb-4">🔭</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Our Vision
            </h3>

            <p className="text-gray-300">
              To become the leading platform for student accommodation
              worldwide, bridging the gap between students and verified hostel
              providers while ensuring safe, convenient, and affordable housing
              options for all.
            </p>
          </div>
        </div>
      </section>

      <SectionTransition />

      {/* Platform Features with animated hover */}
      <section className="px-4 py-20 relative">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#2772A0]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-[#3a85b3]/10 rounded-full filter blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
            Platform Features
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-16">
            Everything you need to find, book, and enjoy your perfect hostel
            stay, all in one place.
          </p>

          {/* For Students */}
          <div className="mb-20 min-h-screen">
            <h3 className="text-3xl font-bold text-center text-[#3a85b3] mb-12 relative">
              For Students
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#2772A0] to-transparent"></span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 backdrop-blur p-6 rounded-xl shadow-lg border border-gray-700 hover:border-[#2772A0] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[#2772A0]/20 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-[#3a85b3] transition-colors duration-300">
                    {feature.title}
                  </h4>

                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Hostel Owners */}
          <div className="mb-20 min-h-screen">
            <h3 className="text-3xl font-bold text-center text-[#CCDDEA] mb-12 relative ">
              For Hostel Owners
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#CCDDEA] to-transparent"></span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ownerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 backdrop-blur p-6 rounded-xl shadow-lg border border-gray-700 hover:border-[#CCDDEA] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[#CCDDEA]/20 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-[#CCDDEA] transition-colors duration-300">
                    {feature.title}
                  </h4>

                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Amenities with enhanced visualization */}
        <AmenitiesSlideshow />
      </section>

      <SectionTransition />

      {/* FAQ Section with animated accordion */}
      <section className="px-4 py-20 relative min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-16"></div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-gray-800/60 backdrop-blur rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h4 className="text-xl font-medium text-white group-hover:text-[#3a85b3] transition-colors duration-300">
                    {item.question}
                  </h4>
                  <div className="h-8 w-8 rounded-full bg-[#1e5f8a]/50 flex items-center justify-center text-[#CCDDEA] transition-transform duration-300 group-open:rotate-45">
                    +
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-700">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition />

      {/* Why Choose RiVVE - with floating cards effect */}
      <section className="px-4 py-20 relative overflow-hidden min-h-screen">
        <div className="absolute top-1/2 left-1/2 w-full h-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-[#2772A0]/10 rounded-full filter blur-3xl animate-pulse"></div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
            Why Choose RiVVE?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Verified Listings"
              description="All hostels and accommodations are verified to ensure safety and trust."
              iconColor="text-green-400"
            />

            <FeatureCard
              title="Student Chat System"
              description="Chat with previous tenants to get firsthand insights before booking."
              iconColor="text-[#3a85b3]"
            />
            <FeatureCard
              title="Google Maps Integration"
              description="Easily locate hostels near your university with customizable search radius."
              iconColor="text-red-400"
            />
          </div>
        </div>
      </section>

      <SectionTransition />

      {/* Team Section with hover effects */}
      <section className="px-4 py-20 relative">
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
          Meet Our Team
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-16"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </section>

      <SectionTransition />

      {/* Technologies We Use - with animated hover effects */}
      <section className="px-4 py-20 relative">
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#CCDDEA] to-[#3a85b3] mb-6">
          Technologies We Use
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#2772A0] to-[#CCDDEA] mx-auto mb-16"></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 justify-center">
          {/* Frontend Tech Stack */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-[#2772A0]/50 p-8 w-full lg:w-2/5 transform transition-all duration-500 hover:scale-105 group">
            <h3 className="text-2xl font-bold text-center text-[#3a85b3] mb-8 relative">
              FRONTEND
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#2772A0] to-transparent"></span>
            </h3>

            <div className="grid grid-cols-3 gap-8">
              {frontendTech.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-3 bg-gray-700/50 rounded-full p-3 shadow-lg">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-10 w-10"
                    />
                  </div>

                  <span className="text-gray-300 font-medium group-hover:text-[#CCDDEA] transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Tech Stack */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-[#CCDDEA]/50 p-8 w-full lg:w-2/5 transform transition-all duration-500 hover:scale-105 group">
            <h3 className="text-2xl font-bold text-center text-[#CCDDEA] mb-8 relative">
              BACKEND & DATABASE
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#CCDDEA] to-transparent"></span>
            </h3>

            <div className="grid grid-cols-3 gap-8">
              {backendTech.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-3 bg-gray-700/50 rounded-full p-3 shadow-lg">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-10 w-10"
                    />
                  </div>

                  <span className="text-gray-300 font-medium group-hover:text-[#e0ebf3] transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Media */}
      <section className="flex flex-col items-center mt-16 p-10 bg-gray-800 rounded-lg mx-4 mb-16 border-r-4 border-[#2772A0]">
        <h2 className="text-3xl font-semibold text-[#CCDDEA]">Get in Touch</h2>
        <p className="text-gray-300 max-w-2xl text-center mt-4">
          Have questions or feedback? Connect with us on social media or drop us
          an email.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <SocialIcon
            name="LinkedIn"
            link="https://linkedin.com"
            color="bg-[#2772A0]"
          />
          <SocialIcon
            name="Twitter"
            link="https://twitter.com"
            color="bg-[#3a85b3]"
          />
          <SocialIcon
            name="Facebook"
            link="https://facebook.com"
            color="bg-[#1e5f8a]"
          />
          <SocialIcon
            name="Instagram"
            link="https://instagram.com"
            color="bg-[#3a85b3]"
          />
        </div>
      </section>
      <Footer />
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

const FeatureCard: React.FC<FeatureProps> = ({
  title,
  description,
  iconColor,
}) => (
  <div className="p-6 bg-gray-800 shadow-lg rounded-lg text-center border-t-2 border-gray-700 hover:border-[#CCDDEA] transition-all duration-300">
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
    ? "text-[#CCDDEA]"
    : role.includes("Back End")
    ? "text-[#3a85b3]"
    : role.includes("AI")
    ? "text-green-300"
    : "text-[#e0ebf3]";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="h-80 s overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} - ${role}`}
          className="w-full h-full object-cover"
        />
      </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        );
      case "twitter":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 00-.55 2.07 4.09 4.09 0 001.82 3.41 4.05 4.05 0 01-1.86-.51v.05a4.1 4.1 0 003.3 4 3.93 3.93 0 01-1.1.17 4.86 4.86 0 01-.77-.07 4.11 4.11 0 003.83 2.84A8.22 8.22 0 012 18.28a11.57 11.57 0 006.29 1.85A11.59 11.59 0 0020 8.45v-.53a8.43 8.43 0 002-2.12z" />
          </svg>
        );
      case "facebook":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.669.642-1.275 1.153-1.772a4.904 4.904 0 011.772-1.153c.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.059-4.04-.059zm0 3.064A5.135 5.135 0 1017.135 12 5.134 5.134 0 0012 6.865zm0 8.468A3.333 3.333 0 1115.334 12 3.333 3.333 0 0112 15.333zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} text-white p-3 rounded-full hover:opacity-80 transition-opacity duration-300 flex items-center justify-center w-10 h-10`}
        aria-label={name}
      >
        {renderIcon()}
      </a>
    </>
  );
};
