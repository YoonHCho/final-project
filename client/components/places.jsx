import React from 'react';
import { Marker } from '@react-google-maps/api';
// need to destructure logId, log, location later

function Log(props) {
  // console.log('props: ', props);
  let { logId, lat, lng } = props;
  // console.log('locatioin: ', location);
  lat = Number(lat);
  lng = Number(lng);
  const idAttr = `log-id-${logId}`;
  const position = { lat, lng };
  return (
    <Marker
      position={position}
      id={idAttr}
    />
  );
}

function LogLists(props) {
  return (
    props.logs.map(log => {
      return (
        <Log
          key={log.logId}
          log={log.log}
          location={log.location}
          lat={log.latitude}
          lng={log.longitude}
        />
      );
    })
  );
}

export default LogLists;
