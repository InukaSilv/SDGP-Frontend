import Slider from "@mui/material/Slider";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapControl,
  Pin,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Circle } from "../circle/Circles";

// interface MapHandlerProps {
//   place: google.maps.place.PlaceResult | null;
// }

function GoogleMapComponent() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5);

  // For AutoCompleteSearch
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  type Poi = { key: string; location: google.maps.LatLngLiteral };
  const locations: Poi[] = [
    { key: "galleFaceGreen", location: { lat: 6.9271, lng: 79.8424 } },
    { key: "lotusTower", location: { lat: 6.927079, lng: 79.861244 } },
    { key: "gangaramayaTemple", location: { lat: 6.9155, lng: 79.8561 } },
    { key: "viharamahadeviPark", location: { lat: 6.9136, lng: 79.8608 } },
    { key: "pettahMarket", location: { lat: 6.9375, lng: 79.8507 } },
    { key: "colomboFort", location: { lat: 6.9335, lng: 79.8438 } },
    { key: "nationalMuseum", location: { lat: 6.9185, lng: 79.8591 } },
    { key: "independenceSquare", location: { lat: 6.9063, lng: 79.8611 } },
    { key: "oldParliament", location: { lat: 6.9319, lng: 79.8411 } },
    { key: "dutchHospital", location: { lat: 6.9332, lng: 79.8422 } },
    { key: "beiraLake", location: { lat: 6.9216, lng: 79.8551 } },
    { key: "arcadeIndependence", location: { lat: 6.9047, lng: 79.8617 } },
    { key: "ballysCasino", location: { lat: 6.9253, lng: 79.8578 } },
    { key: "colomboCityCentre", location: { lat: 6.9187, lng: 79.8579 } },
    { key: "marineDrive", location: { lat: 6.9042, lng: 79.8506 } },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // filter the results so that it will be inside the selected radius
  const filteredLocations = locations.filter((poi) => {
    if (
      location &&
      typeof google !== "undefined" &&
      google.maps &&
      google.maps.geometry
    ) {
      const userLatLng = new google.maps.LatLng(location.lat, location.lng);
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

  return (
    <div className="mt-30 m-20 bg-blue-200 p-5 rounded-2xl w-180 items-center">
      <div className="w-100 flex">
        <label className="mr-10">Radius</label>
        <Slider
          defaultValue={5}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={(_, value) => setRadius(value as number)}
          max={10}
        />
      </div>
      <div className="h-180">
        <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            defaultCenter={
              location
                ? { lat: location.lat, lng: location.lng }
                : { lat: 0, lng: 0 }
            }
            mapId="DEMO_MAP_ID"
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          >
            {location && (
              <Circle
                radius={radius * 1000}
                center={location}
                strokeColor={"#0c4cb3"}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={"#3b82f6"}
                fillOpacity={0.3}
              />
            )}

            {filteredLocations.map((poi) => (
              <AdvancedMarker key={poi.key} position={poi.location}>
                <Pin
                  background={"#FBBC04"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>
            ))}
            {/* <AdvancedMarker ref={markerRef} position={null} /> */}
          </Map>
          {/* <MapControl position={ControlPosition.TOP}>
            <div className="autocomplete-conmtrol">
              <PlaceAutocomplete onPlaceSelect={selectedPlace} />
            </div>
          </MapControl> */}
        </APIProvider>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default GoogleMapComponent;
