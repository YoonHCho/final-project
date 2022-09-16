import React from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import Log from './log';
import AppContext from '../lib/app-context';

const fakekey = 'dsfdsadf';
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
      markerPosition: null,
      name: '',
      logModal: false
    };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.nullValue = this.nullValue.bind(this);
    this.showLogModal = this.showLogModal.bind(this);
    this.hideLogModal = this.hideLogModal.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(userCoords => {
      this.setState({ userLat: userCoords.coords.latitude, userLong: userCoords.coords.longitude });
    });
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged(e) {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const name = place.name;
      this.setState({ markerPosition: { lat, lng }, name });
    }
  }

  nullValue(e) {
    if (e.target.value === '') {
      this.setState({ markerPosition: null, name: null });
    }
  }

  showLogModal(e) {
    if (e.target.name === 'logModal' && !this.state.logModal) {
      this.setState({ logModal: true });
    } else if (e.target.getAttribute('name') === 'cancel' && this.state.logModal) {
      this.setState({ logModal: false });
    }
  }

  hideLogModal() {
    this.setState({ logModal: false });
  }

  render() {
    let myLatLng;
    if (this.state.markerPosition) {
      myLatLng = this.state.markerPosition;
    } else {
      myLatLng = {
        lat: this.state.userLat,
        lng: this.state.userLong
      };
    }
    const { markerPosition, name, logModal } = this.state;
    const { showLogModal, hideLogModal } = this;
    const contextValue = { markerPosition, name, logModal, showLogModal, hideLogModal };
    return (
      // process.env.GOOGLE_MAPS_API_KEY, libraries={['places']}    fakekey
      <AppContext.Provider value={contextValue}>
        <>
          <LoadScript
            googleMapsApiKey={fakekey}
            libraries={libraries}
          >

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={myLatLng}
              zoom={10}
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
                    value={this.name}
                    onChange={this.nullValue}
                    autoFocus
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </Autocomplete>
              { this.state.markerPosition ? <Marker position={this.state.markerPosition} /> : null}
            </GoogleMap>
          </LoadScript>
          {this.state.name ? <button className="save" name='logModal' onClick={this.showLogModal}>SAVE</button> : null }
          { this.state.logModal && <Log /> }
        </>
      </AppContext.Provider>
    );
  }
}
