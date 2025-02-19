import { Slider } from "@mui/material";
import { useState } from "react";
import TypeButton from "../buttons/TypeButton";
import Checkbox from "@mui/material/Checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

function FilterContent() {
  const [priceRange, setPriceRange] = useState<number[]>([30000, 60000]);
  const [selectedHousingType, setSelectedHousingType] = useState<string[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const options = [
    "Date: Newest on Top",
    "Date: Oldest on Top",
    "Price: High to Low",
    "Price: Low to High",
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    "Date: Newest on Top"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changePrice = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const toggleType = (type: string) => {
    setSelectedHousingType((prevType) =>
      prevType.includes(type)
        ? prevType.filter((typ) => typ !== type)
        : [...prevType, type]
    );
  };

  const toggleRoomType = (type: string) => {
    setSelectedRoomType((prevType) =>
      prevType.includes(type)
        ? prevType.filter((typ) => typ !== type)
        : [...prevType, type]
    );
  };

  const facilityAdd = (facility: string) => {
    setSelectedFacility((prevfacility) =>
      prevfacility.includes(facility)
        ? prevfacility.filter((typ) => typ != facility)
        : [...selectedFacility, facility]
    );
  };

  return (
    <div className="text-black space-y-4">
      <div className="flex justify-between items-center">
        <label>Number of Residents</label>
        <div className="bg-gray-300 p-1 px-2 rounded-2xl w-32 text-center">
          <select className="bg-transparent outline-none">
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
            <option value="10+">10+</option>
          </select>
        </div>
      </div>

      <div>
        <label>Price Range</label>
        <Slider
          value={priceRange}
          valueLabelDisplay="auto"
          onChange={changePrice}
          min={0}
          max={100000}
          step={5000}
          sx={{
            color: "#1f2937",
            height: 6,
          }}
        />
        <div className="flex justify-between text-sm text-gray-700 font-medium">
          <span>LKR {priceRange[0].toLocaleString()}</span>
          <span>LKR {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="flex">
        <label>Housing Type</label>
        <div className="flex space-x-2 ml-5">
          {["Hostel", "Houses", "Apartment"].map((type) => (
            <TypeButton
              key={type}
              type={type}
              isSelected={selectedHousingType.includes(type)}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
      </div>

      <div className="flex">
        <label>Room Type</label>
        <div className="flex space-x-2 ml-5">
          {["Single", "Shared"].map((type) => (
            <TypeButton
              key={type}
              type={type}
              isSelected={selectedRoomType.includes(type)}
              onClick={() => toggleRoomType(type)}
            />
          ))}
        </div>
      </div>

      <div className="flex space-y-3">
        <label className="font-medium text-black">Facilities</label>
        <div className="grid grid-cols-3 ml-5">
          {["A/C", "CCTV", "Study Rooms", "WiFi", "Kitchen", "Food"].map(
            (facility) => (
              <div key={facility} className="flex items-center gap-x-2">
                <Checkbox onChange={() => facilityAdd(facility)} />
                <label className="text-gray-800">{facility}</label>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex">
        <label>Sort by</label>
        <div className="relative w-64">
          <button
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-200 rounded-full text-gray-900 font-medium focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute w-full bg-white rounded-lg shadow-md border"
            >
              {options.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer`}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterContent;
