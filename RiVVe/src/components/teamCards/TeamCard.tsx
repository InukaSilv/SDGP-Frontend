type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

const TeamCard: React.FC<TeamMember> = ({ name, role, imageUrl }) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Team Member Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-64 object-cover"
      />
      {/* Team Member Details */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm font-light text-gray-300">{role}</p>
      </div>
    </div>
  );
};

export default TeamCard;
