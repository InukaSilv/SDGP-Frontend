import axios from "axios";
import { Pencil, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5001");

interface AdCardProps {
  ad: {
    _id: string;
    title: string;
    description: string;
    roomTypes: {
      singleRoom: number;
      doubleRoom: number;
    };
    residents: number;
    price: string;
    images: string[];
  };
}

function AdCard({ ad }: AdCardProps) {
  const [slots, setSlots] = useState(ad.residents);
  const navigate = useNavigate();

  const IncreaseSlots = async (operation: string) => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.put(
        "http://localhost:5001/api/listing/add-slot",
        { operation, adId: ad._id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (operation === "add") {
        setSlots(slots + 1);
      } else if (operation === "minus") {
        setSlots(slots - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    socket.on("slotsUpdated", ({ adId, residents }) => {
      console.log("Received slotsUpdated event:", adId, residents);
      if (adId === ad._id) {
        setSlots(residents);
      }
    });
    return () => {
      socket.off("slotsUpdated");
    };
  }, [ad._id]);

  return (
    <div className="flex h-110 md:h-auto flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden p-5 gap-4 sm:gap-6">
      {/* Image Section */}
      <img
        src={ad.images[0]}
        alt={ad.title}
        className="w-full sm:w-50 h-40 object-cover rounded-lg"
      />
      <div className="flex flex-1 flex-col">
        <h2 className="text-lg sm:text-xl font-semibold">{ad.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{ad.description}</p>
        <div className="flex">
          {ad.roomTypes?.doubleRoom > 0 && (
            <p className="text-xs sm:text-sm p-3 bg-blue-300/40 w-1/2 md:w-40 text-center mt-2 py-2 text-blue-500 font-bold rounded-3xl ml-2">
              Double Rooms: {ad.roomTypes.doubleRoom}
            </p>
          )}
          {ad.roomTypes?.singleRoom > 0 && (
            <p className="text-xs sm:text-sm p-3 bg-blue-300/40 w-1/2 md:w-40 text-center mt-2 py-2 text-blue-500 font-bold rounded-3xl ml-2">
              Sinlge Rooms: {ad.roomTypes.singleRoom}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm sm:text-base">
              Available Slots:
            </span>
            <button
              onClick={() => IncreaseSlots("minus")}
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
              onClick={() => IncreaseSlots("add")}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
              aria-label="Increase slots"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-sm sm:text-2xl font-semibold text-blue-500 ">
            LKR.{ad.price}/month
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
