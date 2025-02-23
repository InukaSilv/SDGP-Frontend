import { Pencil, Minus, Plus } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden p-5 gap-4 sm:gap-6">
      {/* Image Section */}
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full sm:w-40 h-40 object-cover rounded-lg"
      />
      <div className="flex flex-1 flex-col">
        <h2 className="text-lg sm:text-xl font-semibold">{ad.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{ad.description}</p>
        <p className="text-gray-500 text-xs sm:text-sm">Rooms: {ad.rooms}</p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm sm:text-base">
              Available Slots:
            </span>
            <span className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-md">
              {slots}
            </span>
            <button
              onClick={() => setSlots((prev) => Math.max(0, prev - 1))}
              className="bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => setSlots((prev) => prev + 1)}
              className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-sm sm:text-lg font-semibold text-gray-800">
            {ad.price}
          </span>
        </div>
      </div>

      <button className="self-start sm:self-center p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        <Pencil size={18} />
      </button>
    </div>
  );
}

export default AdCard;
