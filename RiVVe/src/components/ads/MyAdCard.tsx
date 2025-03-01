import { Pencil, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdCardProps {
  ad: {
    id: number;
    title: string;
    description: string;
    rooms: number;
    availableSlots: number;
    price: string;
    imageUrl: string;
  };
}

function AdCard({ ad }: AdCardProps) {
  const [slots, setSlots] = useState(ad.availableSlots);
  const navigate = useNavigate();

  return (
    <div className="flex h-110 md:h-auto flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden p-5 gap-4 sm:gap-6">
      {/* Image Section */}
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full sm:w-40 h-40 object-cover rounded-lg"
      />
      <div className="flex flex-1 flex-col">
        <h2 className="text-lg sm:text-xl font-semibold">{ad.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{ad.description}</p>
        <p className="text-xs sm:text-sm p-3 bg-blue-300/40 w-24 text-center mt-2 py-2 text-blue-500 font-bold rounded-3xl">
          Rooms: {ad.rooms}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm sm:text-base">
              Available Slots:
            </span>
            <button
              onClick={() => setSlots((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
              aria-label="Decrease slots"
            >
              <Minus size={16} />
            </button>

            <span
              className={`px-3 py-1 rounded-md font-semibold ${
                slots === 0
                  ? "bg-red-500 text-white"
                  : slots < 3
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {slots}
            </span>

            <button
              onClick={() => setSlots((prev) => prev + 1)}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
              aria-label="Increase slots"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-sm sm:text-lg font-semibold text-blue-500 ">
            {ad.price}
          </span>
        </div>
      </div>

      <button
        className="self-start sm:self-center p-2 bg-gray-200 text-blue-500 rounded-full hover:bg-gray-300 mb-30"
        onClick={() => navigate(`/edit-ad`, { state: { ad } })}
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}

export default AdCard;
