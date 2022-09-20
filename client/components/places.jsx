import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import AppContext from '../lib/app-context';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    const { showLogModal } = this.context;
    let { logId, log, lat, lng, location } = this.props;
    lat = Number(lat);
    lng = Number(lng);
    const position = { lat, lng };
    return (
      <>
        <Marker
          logId={logId}
          position={position}
          title={location}
          icon={{
            url: '/images/disk.png',
            scaledSize: new window.google.maps.Size(40, 42),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40)
          }}
          onClick={() => {
            this.setState({ selected: logId });
          }}
        >
          {this.state.selected === logId &&
            <InfoWindow
              key={logId}
              position={position}
              onCloseClick={() => {
                this.setState({ selected: null });
              }}
            >
              <div>
                <h3>{location}</h3>
                <p>{log}</p>
                <button value={logId} onClick={ showLogModal } name="add-photo" className="add-photo">Add Photo</button>
              </div>
            </InfoWindow>
          }
        </Marker >
      </>
    );
  }

}

function LogLists(props) {
  return (
    props.logs.map(log => {
      return (
        <Log
          key={log.logId}
          logId={log.logId}
          log={log.log}
          location={log.location}
          lat={log.latitude}
          lng={log.longitude}
        />
      );
    })
  );
}
Log.contextType = AppContext;
export default LogLists;
