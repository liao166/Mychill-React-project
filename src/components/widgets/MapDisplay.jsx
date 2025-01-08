import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"];

function MapDisplay() {
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0 && places[0].geometry) {
      const place = places[0];
      console.log("搜尋的地點:", place);

      if (mapRef.current) {
        mapRef.current.panTo(place.geometry.location);
        mapRef.current.setZoom(15);
        setMarkerPosition(place.geometry.location);
        console.log("移動到:", place.geometry.location);
      } else {
        console.error("地圖尚未初始化");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="d-none d-md-block col-md-5 p-0 mapArea">
        <LoadScript
          googleMapsApiKey="AIzaSyCgVtNCe6n8nTdXm-zFidK0uF8kVnzvO2Q"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={{ lat: 23.75163737835299, lng: 120.95520524708053 }}
            zoom={7.8}
            options={{
              mapTypeControl: false, // 隱藏衛星檢視按鈕
              streetViewControl: false, // 隱藏街景按鈕
              fullscreenControl: false, // 隱藏全螢幕按鈕
            }}
            onLoad={(map) => (mapRef.current = map)}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                placeholder="你想去哪玩?"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `300px`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `16px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-150px",
                  marginTop: "10px",
                }}
              />
            </StandaloneSearchBox>

            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </React.Fragment>
  );
}

export default MapDisplay;
