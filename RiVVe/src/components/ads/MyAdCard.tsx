import axios from "axios";
import { Pencil, Minus, Plus, Users, X } from "lucide-react";
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
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("PLease enter email");
    }
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5001/api/listing/add-student-property",
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
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to add student. Please try again later.");
      }
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
    <>
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
        <button
          className="self-start sm:self-center p-2 bg-gray-200 text-blue-500 rounded-full hover:bg-gray-300 mb-30"
          onClick={() => setAddStudent(true)}
        >
          <Users />
        </button>
      </div>

      {addStudent && (
        <div className="fixed inset-0 bg-trasparent-300 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#CCDDEA] rounded-lg shadow-xl w-96 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Tenant
                </h2>
                <button
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setAddStudent(false)}
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@gmail.com"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <h2 className="text-red-400">{error}</h2>
                <h2 className="text-green-300">{success}</h2>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Add Tenant <Plus />
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
