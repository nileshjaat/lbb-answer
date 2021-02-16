import React, { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

const App = () => {
  const [lat, setLat] = useState(28.6139); //Default lat set for Delhi
  const [lng, setLng] = useState(77.209); //Default lon set for Delhi

  useEffect(() => {
    function initMap() {
      var myLatlng = { lat: lat, lng: lng };

      var map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
      });

      var infoWindow = new window.google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
      });
      infoWindow.open(map);

      map.addListener("click", function (mapsMouseEvent) {
        infoWindow.close();
        let lat = mapsMouseEvent.latLng.lat();
        let lng = mapsMouseEvent.latLng.lng();
        setLat(lat);
        setLng(lng);

        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(mapsMouseEvent.latLng.toString());
        infoWindow.open(map);
      });
    }
    initMap();
  }, []);

  return (
    <div>
      <h4 className="text-center">
        Drop a pointer on the map and see the public images that have been taken
        at that location{" "}
      </h4>
      <div id="map"></div>
      <ImageGallery lat={lat} lon={lng} />
    </div>
  );
};

export default App;
