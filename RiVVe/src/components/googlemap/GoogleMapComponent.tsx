import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { Circle } from "../circle/circles";

type Location = {
  key: string;
  location: { lat: number; lng: number };
};

type GoogleMapComponentProps = {
  radius: number;
  mapPosition: { lat: number; lng: number };
  setMapPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  mapLoaded: boolean;
  setMapLoaded?: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  error: string;
  locations: Location[];
};

function GoogleMapComponent({
  radius,
  mapPosition,
  setMapPosition,
  mapLoaded,
  error,
  locations,
}: GoogleMapComponentProps) {
  useEffect(() => {
    setMapPosition(mapPosition);
  }, [mapPosition]);

  return (
    <div className="bg-gray-800 h-full w-full">
      <div className="h-full w-full">
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

              {locations.map((poi) => (
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
