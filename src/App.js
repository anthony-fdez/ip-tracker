import React from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";

import Loader from "./components/loader";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const apiKey = "at_JV4vJk7g2zA2jU3wkkqnS9FFDkpvE";

  const [isLoading, setIsLoading] = useState(false);

  const [ipAddress, setIpAddress] = useState("");
  const [isp, setIsp] = useState("Google LLC");
  const [location, setLocation] = useState({
    city: "Mountain View",
    country: "US",
    ip: "8.8.8.8",
    lat: "35.6233",
    lng: "-118.4098",
  });
  const [timeZone, setTimeZone] = useState("-07:00");
  const position = [location.lat, location.lng];

  const getTheInfo = () => {
    setIsLoading(true);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
      )
      .then((response) => {
        console.log(response);
        setLocation({
          city: response.data.location.city,
          country: response.data.location.country,
          lat: response.data.location.lat,
          lng: response.data.location.lng,
          ip: response.data.ip,
        });
        setTimeZone(response.data.location.timezone);
        setIsp(response.data.isp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const map = () => {
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  };

  return (
    <div className="App">
      <div>
        <h1 style={{ color: "white" }}>IP Address Tracker</h1>
        <div className="background-picture"></div>
        <div style={{ position: "relative" }}>
          <div className="loader">{isLoading && <Loader />}</div>
          <input
            onChange={(e) => {
              setIpAddress(e.target.value);
            }}
            autoFocus="true"
            placeholder="8.8.8.8"
            className="input-box"
          ></input>
          <button onClick={() => getTheInfo()} className="search-button">
            {">"}
          </button>
        </div>
        <div className="data-to-display">
          <div className="data">
            <div className="item-left">
              <h5>IP ADDRESS</h5>
              <h2>{location.ip}</h2>
            </div>
            <div class="vl"></div>
            <div className="item">
              <h5>LOCATION</h5>
              <h2>
                {location.city} {location.country}
              </h2>
            </div>
            <div class="vl"></div>
            <div className="item">
              <h5>TIMEZONE</h5>
              <h2>UTC: {timeZone}</h2>
            </div>
            <div class="vl"></div>
            <div className="item-right">
              <h5>ISP</h5>
              <h2>{isp}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="map">{map()}</div>
    </div>
  );
}

export default App;
