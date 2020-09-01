import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const Maap = (props) => {
  const position = [props.lat, props.lng];
  return (
    <Map center={position} zoom={props.zoom}>
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

export default Maap;
