import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

const Login = props => {
  const { setAlert, loginUser, isAuthenticated } = props;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginFormSubmitted = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Both fields are required', 'danger');
      return;
    }

    const credentials = {
      email,
      password
    };

    loginUser(credentials);
  };

  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }

  return (
    <div className='mt-5'>
      <h1 className='text-center'>Login</h1>
      <form autoComplete='off' onSubmit={loginFormSubmitted}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='example@abc.com'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder=''
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            <i className='fas fa-sign-in-alt'></i> Login
          </button>
        </div>
      </form>
      <Link to='/register' className='btn btn-primary'>
        <i className='fas fa-user-plus'></i> Register
      </Link>
    </div>
  );
};

///////////////////////////// propTypes //////////////////////////////////
Login.protoType = {
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
  loginUser: user => dispatch(loginUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
