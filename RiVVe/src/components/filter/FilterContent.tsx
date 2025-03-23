import { Slider } from "@mui/material";
import { useState } from "react";
import TypeButton from "../buttons/TypeButton";
import Checkbox from "@mui/material/Checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface FilterContentProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  setOnApplyFilters: (filters: {
    priceRange: number[];
    selectedHousingType: string[];
    selectedRoomType: string[];
    selectedFacility: string[];
    selectedResidents: number;
    selectedOption: string;
  }) => void;
  currentFilters: {
    priceRange: number[];
    selectedHousingType: string[];
    selectedRoomType: string[];
    selectedFacility: string[];
    selectedResidents: number;
    selectedOption: string;
  };
}

function FilterContent({
  isExpanded,
  setIsExpanded,
  setOnApplyFilters,
  currentFilters,
}: FilterContentProps) {
  const [priceRange, setPriceRange] = useState<number[]>(
    currentFilters.priceRange
  );
  const [selectedHousingType, setSelectedHousingType] = useState<string[]>(
    currentFilters.selectedHousingType
  );
  const [selectedRoomType, setSelectedRoomType] = useState<string[]>(
    currentFilters.selectedRoomType
  );
  const [selectedFacility, setSelectedFacility] = useState<string[]>(
    currentFilters.selectedFacility
  );
  const [selectedResidents, setSelectedResidents] = useState<number>(
    currentFilters.selectedResidents
  );
  const [selectedOption, setSelectedOption] = useState<string>(
    currentFilters.selectedOption
  );
  const options = [
    "Date: Newest on Top",
    "Date: Oldest on Top",
    "Price: High to Low",
    "Price: Low to High",
  ];
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

  const handleApplyFilters = () => {
    const filters = {
      selectedResidents,
      priceRange,
      selectedHousingType,
      selectedRoomType,
      selectedFacility,
      selectedOption,
    };
    setOnApplyFilters(filters);
    setIsExpanded(false);
  };

  return (
    <div className="relative w-full h-full p-4 sm:p-6 bg-gray-300 text-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] mt-20 md:mt-0">
      <button className="absolute top-4 right-4 text-gray-600 hover:text-black">
        <X
          size={27}
          className="font-bold hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </button>

      <div className="w-full mb-4 mt-3">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Number of Residents
        </label>
        <select
          className="w-full p-2 bg-white rounded-md text-gray-800 border border-gray-400"
          onChange={(e) => setSelectedResidents(parseInt(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="w-full mb-4">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Price Range
        </label>
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
        <div className="flex justify-between text-sm sm:text-base font-medium text-gray-600">
          <span>LKR {priceRange[0].toLocaleString()}</span>
          <span>LKR {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full mb-4">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Housing Type
        </label>
        <div className="flex gap-1 flex-wrap">
          {["Hostel", "House", "Apartment"].map((type) => (
            <TypeButton
              key={type}
              type={type}
              isSelected={selectedHousingType.includes(type)}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
      </div>

      <div className="w-full mb-4">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Room Type
        </label>
        <div className="flex  flex-wrap">
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

      <div className="w-full mb-4">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Facilities
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

      <div className="w-full mb-6">
        <label className="block text-sm sm:text-base font-semibold mb-2">
          Sort by
        </label>
        <div className="relative w-full">
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
              className="absolute w-full bg-white rounded-md shadow-md border border-gray-400 mt-2"
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

      <button
        type="submit"
        className="items-center w-full bg-blue-950 text-white p-2 rounded-2xl"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterContent;
