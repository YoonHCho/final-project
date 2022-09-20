import React from 'react';
import AppContext from '../lib/app-context';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logId: null
    };
    this.fileInputRef = React.createRef();
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
  }

  handlePhotoSubmit(e) {
    e.preventDefault();

    const { selectedId, hideLogModal } = this.context;
    const formData = new FormData();

    formData.append('logId', selectedId);
    formData.append('image', this.fileInputRef.current.files[0]);
    const option = {
      method: 'POST',
      body: formData
    };

    fetch('/api/upload/', option)
      .then(result => {
        hideLogModal();
      })
      .catch(err => console.error(err));
    hideLogModal();
  }

  render() {
    const { hideLogModal } = this.context;
    return (
      <>
        <div className="overlay"></div>
        <div className="photo-container" >
          <form className="row" onSubmit={ this.handlePhotoSubmit }>
            <div className='choose col-full'>
              <input
                type="file"
                name="image"
                ref={this.fileInputRef}
                accept=".png, .jpg, .jpeg, .gif"
                placeholder='Choose a file'
                className='file-input'
                required
              />
            </div>
            <div className='col-full btn-center'>
              <button type="submit" className='upload-btn'>Upload</button>
            </div>
            <div className='col-full btn-center'>
              <button name="cancel-photo" className='cancel-btn' onClick={ hideLogModal }>Cancel</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

PhotoUpload.contextType = AppContext;
