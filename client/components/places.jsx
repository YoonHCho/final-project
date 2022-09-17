import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import AppContext from '../lib/app-context';

// need to destructure logId, log, location later

// function Log(props) {
//   let { logId, lat, lng, location } = props;
//   lat = Number(lat);
//   lng = Number(lng);
//   const idAttr = `log-id-${logId}`;
//   const position = { lat, lng };
//   return (
//     <Marker
//       position={position}
//       id={idAttr}
//       title={location}
//       icon = {{
//         url: 'https://cdn-icons-png.flaticon.com/512/4659/4659930.png',
//         scaledSize: new window.google.maps.Size(36, 45),
//         origin: new window.google.maps.Point(0, 0),
//         anchor: new window.google.maps.Point(18, 40)
//       }}
//     />
//   );
// }

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    const { getLogInfo } = this.context;
    let { logId, log, lat, lng, location } = this.props;
    lat = Number(lat);
    lng = Number(lng);
    // const logId = logId;
    const position = { lat, lng };
    return (
      <>
        <Marker
          logId={logId}
          position={position}
          title={location}
          icon={{
            url: '/images/disk.png',
            scaledSize: new window.google.maps.Size(36, 45),
            // origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(18, 40)
          }}
          onDblClick={getLogInfo} // this will be to save photops
          onClick={() => {
            // getLogInfo(logId);
            this.setState({ selected: logId });
          }}

          // https://cdn-icons-png.flaticon.com/512/4659/4659930.png
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
                <p>{log}</p>
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
