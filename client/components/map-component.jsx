import React from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
};

const libraries = ['places'];

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: null,
      userLong: null,
      markerPosition: null
    };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(userCoords => {
      this.setState({ userLat: userCoords.coords.latitude, userLong: userCoords.coords.longitude });
    });
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      this.setState({ markerPosition: { lat, lng } });
    }
  }

  render() {
    const myLatLng = {
      lat: this.state.userLat,
      lng: this.state.userLong
    };
    return (
      // process.env.GOOGLE_MAPS_API_KEY, libraries={['places']}
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={myLatLng}
          zoom={12}
          options={options}
        >
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <div>
              <input
                type='text'
                placeholder='Enter a place'
                className='input-style'
                autoFocus
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </Autocomplete>
          { this.state.markerPosition ? <Marker position={this.state.markerPosition} /> : null}
        </GoogleMap>
      </LoadScript>
    );
  }
}
