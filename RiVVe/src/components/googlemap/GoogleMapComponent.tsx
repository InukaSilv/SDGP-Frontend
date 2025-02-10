import Slider from "@mui/material/Slider";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Circle } from "../circle/Circles";
import SearchBar from "./SearchBar";

function GoogleMapComponent() {
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5);
  const [markerRef] = useAdvancedMarkerRef();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  type Poi = { key: string; location: google.maps.LatLngLiteral };
  const locations: Poi[] = [
    { key: "galleFaceGreen", location: { lat: 6.9271, lng: 79.8424 } },
    { key: "lotusTower", location: { lat: 6.927079, lng: 79.861244 } },
    { key: "gangaramayaTemple", location: { lat: 6.9155, lng: 79.8561 } },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => setError(error.message)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const filteredLocations = locations.filter((poi) => {
    if (
      mapCenter &&
      typeof google !== "undefined" &&
      google.maps &&
      google.maps.geometry
    ) {
      const userLatLng = new google.maps.LatLng(mapCenter.lat, mapCenter.lng);
      const propLatLng = new google.maps.LatLng(
        poi.location.lat,
        poi.location.lng
      );
      const distance =
        google.maps.geometry.spherical.computeDistanceBetween(
          userLatLng,
          propLatLng
        ) / 1000;
      return distance <= radius;
    }
    return false;
  });

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white-20 p-8 rounded-3xl shadow-lg h-90/100">
      <div className="flex items-center justify-between mb-6">
        <div className=" text-xl font-semibold">Map Radius</div>
        <Slider
          defaultValue={5}
          aria-label="Radius"
          valueLabelDisplay="auto"
          onChange={(_, value) => setRadius(value as number)}
          max={10}
          sx={{
            color: "#3b82f6",
            height: 6,
            width: "80%",
            borderRadius: "10px",
          }}
        />
      </div>

      <div className="h-90/100 relative">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map defaultZoom={13} center={mapCenter} mapId="DEMO_MAP_ID">
            <AdvancedMarker position={mapCenter}>
              <Pin
                background={"#FF0000"}
                glyphColor={"#FFF"}
                borderColor={"#000"}
              />
            </AdvancedMarker>

            {filteredLocations.map((poi) => (
              <AdvancedMarker key={poi.key} position={poi.location}>
                <Pin
                  background={"#FBBC04"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>
            ))}

            <Circle
              radius={radius * 1000}
              center={mapCenter}
              strokeColor={"#3b82f6"}
              strokeOpacity={1}
              strokeWeight={3}
              fillColor={"#3b82f6"}
              fillOpacity={0.3}
            />
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>

          <MapControl position={ControlPosition.TOP}>
            <div className="w-90 text-center mt-1">
              <SearchBar onPlaceSelect={onPlaceSelect} />
            </div>
          </MapControl>
        </APIProvider>
      </div>

      {error && (
        <div className="text-red-500 mt-4 text-center text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

export default GoogleMapComponent;
