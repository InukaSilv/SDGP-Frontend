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
};

function GoogleMapComponent({
  radius,
  mapPosition,
  setMapPosition,
  mapLoaded,
  setMapLoaded,
  error,
}: GoogleMapComponentProps) {
  const [markerRef] = useAdvancedMarkerRef();

  type Poi = { key: string; location: google.maps.LatLngLiteral };
  const locations: Poi[] = [
    { key: "galleFaceGreen", location: { lat: 6.9271, lng: 79.8424 } },
    { key: "lotusTower", location: { lat: 6.927079, lng: 79.861244 } },
    { key: "gangaramayaTemple", location: { lat: 6.9155, lng: 79.8561 } },
  ];

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
  const filteredLocations = locations.filter((poi) => {
    if (
      mapPosition &&
      typeof google !== "undefined" &&
      google.maps &&
      google.maps.geometry
    ) {
      const userLatLng = new google.maps.LatLng(
        mapPosition.lat,
        mapPosition.lng
      );
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

  // const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
  //   if (place?.geometry?.location) {
  //     setMapPosition({
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng(),
  //     });
  //   }
  // };

  return (
    <div className="h-screen w-full">
      <div className="h-180 w-full">
        {mapLoaded && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map defaultZoom={13} center={mapPosition} mapId="DEMO_MAP_ID">
              <AdvancedMarker position={mapPosition}>
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
