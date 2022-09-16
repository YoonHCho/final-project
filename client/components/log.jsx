import React from 'react';
import AppContext from '../lib/app-context';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: ''
    };
    this.confirm = this.confirm.bind(this);
    this.handleLog = this.handleLog.bind(this);
  }

  handleLog(e) {
    this.setState({ log: e.target.value });
  }

  confirm(e) {
    e.preventDefault();
    const { markerPosition, name, hideLogModal } = this.context;
    // console.log('log all: ', this.state.log, markerPosition.lat, markerPosition.lng, name);
    const logLatLngName = {
      log: this.state.log,
      location: name,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng
    };

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logLatLngName)
    };

    fetch('/api/log/', option)
      .then(res => res.json())
      .catch(err => {
        console.error('Error in POST', err);
      });

    this.setState({ log: '' });
    hideLogModal();
  }

  render() {
    const { showLogModal } = this.context;
    return (
      <>
        <div className="overlay"></div>
        <div className="container" >
          <form className="row just-between" onSubmit={ this.confirm }>
            <textarea className="textarea col-full"
              name="log"
              placeholder="Enter your log here..."
              value={ this.state.value }
              onChange={ this.handleLog }
              required></textarea>
            <i className="fa-regular fa-circle-xmark left" name="cancel" onClick={ showLogModal }></i>
            <button type="submit" className="right confirm"><i className="fa-regular fa-circle-check"></i></button>
          </form>
        </div>
      </>

    );
  }
}
Log.contextType = AppContext;
// logModal === true ? this.setState({ logModal: false }) : null
