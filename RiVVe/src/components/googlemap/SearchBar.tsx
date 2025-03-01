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
    <div className="autocomplete-container hover:cursor-text">
      <input
        ref={inputRef}
        type="text"
        placeholder="🔎  Search for a university..."
        className=" w-46 md:w-70 outline-0 py-1"
      />
    </div>
  );
};

export default SearchBar;
