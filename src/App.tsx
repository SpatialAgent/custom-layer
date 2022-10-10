import React, { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import CustomLayer from "./CustomLayer";
import "./App.css";

function App() {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      const map = new Map({ basemap: "satellite" });
      const lyr = new CustomLayer({ color: "#ff0000" });
      map.add(lyr);
      const view = new MapView({
        map: map,
        center: [0, 0],
        zoom: 4,
        container: viewRef.current,
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="map" ref={viewRef} />
    </div>
  );
}

export default App;
