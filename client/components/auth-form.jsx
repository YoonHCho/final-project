import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      duplicate: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.removeDup = this.removeDup.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  removeDup() {
    this.setState({ duplicate: false });
  }

  handleRegister(e) {
    e.preventDefault();
    if (this.state.duplicate) {
      this.setState({ duplicate: false });
    }
    const { route } = this.context;
    const action = route.path;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };

    fetch(`/api/auth/${action}`, option)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ duplicate: true });
        }
      })
      .catch(err => console.error(err));
    this.setState({ username: '', password: '' });
  }

  render() {
    const { route } = this.context;
    const action = route.path;
    let regOrSignIn = '';
    let upOrIn = '';
    let signPara = '';
    if (action === 'sign-up') {
      regOrSignIn = 'Register';
      upOrIn = 'Sign Up';
      signPara = 'Please fill in this form to create an account';
    } else {
      regOrSignIn = 'Sign In';
      upOrIn = 'Sign In';
      signPara = 'Please sign in to your accout';
    }
    const { hideLogModal } = this.context;
    return (
      <>
        { this.state.duplicate &&
          <div className='no-photo-container duplicate' >
            Username is already taken
            <div className='btn-center pad-top'>
              <button onClick={this.removeDup}>CANCEL</button>
            </div>
          </div> }
        <h4 className='sign-up-header'>{upOrIn}</h4>
        <p className='sign-up-para'>{signPara}</p>
        <hr />
        <form onSubmit={this.handleRegister}>
          <label htmlFor="username">
            <input type="text" id="username" name="username" placeholder='Username' className='sign-up-input' value={ this.state.username } onChange={this.handleChange} autoFocus required />
          </label>
          <label htmlFor="password">
            <input type="password" id="password" name="password" placeholder='Password' className='sign-up-input' value={ this.state.password } onChange={this.handleChange} required />
          </label>
          <div className='flex-between'>
            <a href='#'><button type="button" className='reg-cancel-btn' name='cnl-reg' onClick={hideLogModal}>Cancel</button></a>
            <button type='submit' className='register-btn' name='registered'>{regOrSignIn}</button>
          </div>
        </form>
      </>
    );
  }
}
AuthForm.contextType = AppContext;
