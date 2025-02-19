import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface SearchBarProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const SearchBar = ({ onPlaceSelect }: SearchBarProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      types: ["university"],
      componentRestrictions: { country: "LK" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="🔎  Search for a university..."
        className="w-140 h-10 p-06 py-9 rounded-3xl mr-1 text-1xl  bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
