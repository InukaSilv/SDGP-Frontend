import Slider from "@mui/material/Slider";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Circle } from "../circle/Circles";

type GoogleMapComponentProps = {
  radius: number;
  mapPosition: { lat: number; lng: number };
  setMapPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  mapLoaded: boolean;
  setMapLoaded: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  Error: string;
  locations: [];
};

function GoogleMapComponent({
  radius,
  mapPosition,
  setMapPosition,
  mapLoaded,
  setMapLoaded,
  error,
  locations,
}: GoogleMapComponentProps) {
  const [markerRef] = useAdvancedMarkerRef();
  const [selected, setSelected] = useState<string>("");

  // when loading, take the location of the user
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) =>
  //         setMapPosition({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         }),
  //       (error) => setError(error.message)
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }

  //   // Force re-render to fix Google Maps not showing correctly
  //   setTimeout(() => setMapLoaded(true), 500);
  // }, []);

  useEffect(() => {
    setMapPosition(mapPosition);
  }, [mapPosition]);

  // filtering based on radius
  // const filteredLocations = locations.filter((poi) => {
  //   if (
  //     mapPosition &&
  //     typeof google !== "undefined" &&
  //     google.maps &&
  //     google.maps.geometry
  //   ) {
  //     const userLatLng = new google.maps.LatLng(
  //       mapPosition.lat,
  //       mapPosition.lng
  //     );
  //     const propLatLng = new google.maps.LatLng(
  //       poi.location.lat,
  //       poi.location.lng
  //     );
  //     const distance =
  //       google.maps.geometry.spherical.computeDistanceBetween(
  //         userLatLng,
  //         propLatLng
  //       ) / 1000;
  //     return distance <= radius;
  //   }
  //   return false;
  // });

  // const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
  //   if (place?.geometry?.location) {
  //     setMapPosition({
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng(),
  //     });
  //   }
  // };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        {mapLoaded && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map defaultZoom={13} center={mapPosition} mapId="DEMO_MAP_ID">
              <AdvancedMarker
                position={mapPosition}
                onClick={() => setSelected(poi)}
              >
                <Pin
                  background={"#FF0000"}
                  glyphColor={"#FFF"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>

              {locations.map((poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                  <Pin
                    background={"#FBBC04"}
                    glyphColor={"#000"}
                    borderColor={"#000"}
                  />
                </AdvancedMarker>
              ))}

              {selected && (
                <AdvancedMarker key={selected.key} position={selected.location}>
                  <Pin
                    background={"#FBBC"}
                    glyphColor={"#000"}
                    borderColor={"#000"}
                  />
                </AdvancedMarker>
              )}

              <Circle
                radius={radius * 1000}
                center={mapPosition}
                strokeColor={"#3b82f6"}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={"#3b82f6"}
                fillOpacity={0.3}
              />
            </Map>
          </APIProvider>
        )}
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
