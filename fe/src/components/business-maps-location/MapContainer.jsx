import { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import "./MapContainer.css";

const mapStyles = {
  width: "90%",
  height: "40%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          lat={this.props.lat}
          lng={this.props.lng}
        >
          <Marker
            position={{ lat: this.props.latitude, lng: this.props.longitude }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCgPWdoEYShIDmxcPQJgsuWZLuhZylyQCA",
})(MapContainer);
