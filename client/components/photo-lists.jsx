import React from 'react';
import AppContext from '../lib/app-context';

export default class ViewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    const toArray = [];
    const { selectedId } = this.context;
    fetch(`/api/photos/${selectedId}`)
      .then(result => result.json())
      // .then(photo => {
      //   photo.map(index => {
      //     return toArray.push(index.image);
      //   });
      // })
      .then(photo => this.setState({ photos: photo }))
      .catch(err => console.error(err));
    this.setState({ photos: toArray });
  }

  render() {
    const { hideLogModal } = this.context;

    if (Object.keys(this.state.photos).length <= 0) {
      return (
        <>
          <div className="overlay"></div>
          <div className="view-pht-container" >
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
                    // src={photo}
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
}

// function PhotoLists(props) {
//   console.log(props);
//   return (
//     <p>hello</p>
//   );
// }

ViewPhotos.contextType = AppContext;
// export default PhotoLists;
