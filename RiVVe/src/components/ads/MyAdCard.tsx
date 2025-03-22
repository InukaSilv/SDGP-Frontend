import axios, { AxiosError } from "axios";
import { Pencil, Minus, Plus, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [slots, setSlots] = useState(ad.residents);
  const navigate = useNavigate();
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const IncreaseSlots = async (operation: string) => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.put(
        `${API_BASE_URL}/api/listing/add-slot`,
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

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("PLease enter email");
    }
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/api/listing/add-student-property`,
        { adId: ad._id, email: email },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setEmail("");
        setError("");
        setSuccess("Student added to your property successfully!");
      }
    } catch (err) {
      console.error(err);
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.data &&
        err.response.data.error
      ) {
        setError(err.response.data.error);
      } else {
        setError("Failed to add student. Please try again later.");
      }
    }
  };

  useEffect(() => {
    socket.on(
      "slotsUpdated",
      ({ adId, residents }: { adId: string; residents: number }) => {
        console.log("Received slotsUpdated event:", adId, residents);
        if (adId === ad._id) {
          setSlots(residents);
        }
      }
    );
    return () => {
      socket.off("slotsUpdated");
    };
  }, [ad._id]);

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-xl overflow-hidden p-3 sm:p-5 gap-3 sm:gap-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/4 h-48 sm:h-56 lg:h-48 relative">
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">{ad.title}</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2 sm:line-clamp-none">
            {ad.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {ad.roomTypes?.doubleRoom > 0 && (
              <p className="text-xs sm:text-sm bg-blue-300/40 px-4 py-2 text-blue-500 font-bold rounded-full">
                Double Rooms: {ad.roomTypes.doubleRoom}
              </p>
            )}
            {ad.roomTypes?.singleRoom > 0 && (
              <p className="text-xs sm:text-sm bg-blue-300/40 px-4 py-2 text-blue-500 font-bold rounded-full">
                Single Rooms: {ad.roomTypes.singleRoom}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
                Available Slots:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => IncreaseSlots("minus")}
                  className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                  aria-label="Decrease slots"
                >
                  <Minus size={16} />
                </button>

                <span
                  className={`px-4 py-1 rounded-full font-semibold text-sm sm:text-base ${
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
                  className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                  aria-label="Increase slots"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <span className="text-lg sm:text-2xl font-semibold text-blue-500">
              LKR.{ad.price}/month
            </span>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 self-start lg:self-center">
          <button
            className="p-2.5 bg-gray-200 text-blue-500 rounded-full hover:bg-gray-300 transition-colors"
            onClick={() => navigate(`/edit-ad`, { state: { ad } })}
          >
            <Pencil size={20} />
          </button>
          <button
            className="p-2.5 bg-gray-200 text-blue-500 rounded-full hover:bg-gray-300 transition-colors"
            onClick={() => setAddStudent(true)}
          >
            <Users size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {addStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#CCDDEA] rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Tenant
                </h2>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setAddStudent(false)}
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Add a tenant to your hostel so they can leave reviews.
              </p>

              <form className="space-y-4" onSubmit={handleAddSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Student's Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@gmail.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm sm:text-base">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-sm sm:text-base">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Add Tenant <Plus size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdCard;
