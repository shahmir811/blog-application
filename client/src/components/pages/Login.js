import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='mt-5'>
      <h1 className='text-center'>Login</h1>
      <form autoComplete='off'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='example@abc.com'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder=''
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

export default Login;
