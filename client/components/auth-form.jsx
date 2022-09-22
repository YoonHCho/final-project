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
    // const { route } = this.context;
    // const action = route.path;
    // console.log(action);

    // const option = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };

  }

  render() {
    const { hideLogModal } = this.context;
    return (
      <>
        <h4 className='sign-up-header'>Sign Up</h4>
        <p className='sign-up-para'>Please fill in this form to create an account</p>
        <hr />
        <form onSubmit={this.handleRegister}>
          <input type="text" id="username" name="username" placeholder='Username' className='sign-up-input' onChange={this.handleChange} autoFocus required />
          <input type="text" id="email" name="email" placeholder='Email' className='sign-up-input' onChange={this.handleChange} required />
          <input type="text" id="password" name="password" placeholder='Password' className='sign-up-input' onChange={this.handleChange} required />
          <div className='flex-between'>
            <button type="button" className='reg-cancel-btn' name='cnl-reg' onClick={hideLogModal}>Cancel</button>
            <button type='submit' className='register-btn' >Register</button>
          </div>
        </form>
      </>
    );
  }
}
AuthForm.contextType = AppContext;
