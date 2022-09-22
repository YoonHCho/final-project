import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleRegister(e) {
    e.preventDefault();
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
      .catch(err => {
        this.setState({ username: '', email: '', password: '' });
        console.error(err);
      });
    this.setState({ username: '', email: '', password: '' });
  }

  render() {
    const { hideLogModal } = this.context;
    return (
      <>
        <h4 className='sign-up-header'>Sign Up</h4>
        <p className='sign-up-para'>Please fill in this form to create an account</p>
        <hr />
        <form onSubmit={this.handleRegister}>
          <label htmlFor="username">
            <input type="text" id="username" name="username" placeholder='Username' className='sign-up-input' value={ this.state.username } onChange={this.handleChange} autoFocus required />
          </label>
          <label htmlFor="email">
            <input type="email" id="email" name="email" placeholder='Email' className='sign-up-input' value={ this.state.email } onChange={this.handleChange} required />
          </label>
          <label htmlFor="password">
            <input type="password" id="password" name="password" placeholder='Password' className='sign-up-input' value={ this.state.password } onChange={this.handleChange} required />
          </label>
          <div className='flex-between'>
            <a href='#'><button type="button" className='reg-cancel-btn' name='cnl-reg' onClick={hideLogModal}>Cancel</button></a>
            <button type='submit' className='register-btn' name='registered'>Register</button>
          </div>
        </form>
      </>
    );
  }
}
AuthForm.contextType = AppContext;
