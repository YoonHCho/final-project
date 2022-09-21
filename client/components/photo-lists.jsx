import React from 'react';
import AppContext from '../lib/app-context';

export default class ViewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isWaiting: true
    };
  }

  componentDidMount() {
    const { selectedId } = this.context;
    fetch(`/api/photos/${selectedId}`)
      .then(result => result.json())
      .then(photo => this.setState({ photos: photo, isWaiting: false }))
      .catch(err => console.error(err));
  }

  render() {
    const { hideLogModal } = this.context;
    if (this.state.isWaiting) {
      return null;
    }
    if (Object.keys(this.state.photos).length > 0) {
      return (
        <>
          <div className="overlay"></div>
          <div className="view-pht-container" >
            <div className="overflow img-center">
              {
                this.state.photos.map((photo, index) => {
                  return (
                    <img
                      key={index}
                      src={photo.image}
                    />
                  );
                })
              }
            </div>
            <div className='col-full btn-center pad-tb'>
              <button className="exit-btn" onClick={hideLogModal}>Exit</button>
            </div>
          </div>
        </>
      );
    }

    if (Object.keys(this.state.photos).length <= 0) {
      return (
        <>
          <div className="overlay"></div>
          <div className="no-photo-container" >
            <div className="overflow img-center">
              <h3>There are no photos added</h3>
            </div>
            <div className='col-full btn-center pad-tb'>
              <button className="exit-btn" onClick={hideLogModal}>Exit</button>
            </div>
          </div>
        </>
      );
    }

  }
}

ViewPhotos.contextType = AppContext;
