import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alertActions';
import { registerUser } from '../../actions/authActions';

const Register = ({ setAlert, isAuthenticated, registerUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword, phone } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    console.log(user);

    if (password !== confirmPassword) {
      setAlert('Passwords not match', 'danger');
      return;
    }

    registerUser(user);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='mt-5'>
      <h1 className='text-center'>Register</h1>
      <form autoComplete='off' onSubmit={e => submitForm(e)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            id='name'
            className='form-control'
            placeholder='Name'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Phone No</label>
          <input
            type='text'
            name='phone'
            value={phone}
            id='phone'
            className='form-control'
            placeholder='111-111-1111'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='example@abc.com'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            name='password'
            id='password'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            <i className='fas fa-user-plus'></i> Register
          </button>
        </div>
      </form>
      <Link to='/login' className='btn btn-primary'>
        <i className='fas fa-sign-in-alt'></i> Login
      </Link>
    </div>
  );
};

///////////////////////////// propTypes //////////////////////////////////
Register.protoType = {
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

///////////////////////// mapDispatchToProps /////////////////////////////////
const mapDispatchToProps = dispatch => ({
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
  registerUser: user => dispatch(registerUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
