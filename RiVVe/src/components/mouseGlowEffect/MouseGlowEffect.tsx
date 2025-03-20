// File: components/effects/MouseGlowEffect.tsx
import React, { useEffect, useState } from "react";

const MouseGlowEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);

      // If we want the glow to fade out when the mouse stops, we can add:
      clearTimeout((window as any).mouseTimeout);
      (window as any).mouseTimeout = setTimeout(() => {
        setIsActive(false);
      }, 1500);
    };

    // Add event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout((window as any).mouseTimeout);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute w-80 h-80 bg-[#2772A0]/20 rounded-full filter blur-[80px] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
    </div>
  );
};

export default MouseGlowEffect;