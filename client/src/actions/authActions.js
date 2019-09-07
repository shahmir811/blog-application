import axios from 'axios';

import { setAlert } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  SET_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from './types';

///////////////////////////////////////////////////////////////////////////////
//ister new user
export const registerUser = user => async dispatch => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/users/register', user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());

    dispatch(setAlert('Welcome Home', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Login User
export const loginUser = user => async dispatch => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // const body = JSON.stringify({ email, password });

    const response = await axios.post('/auth/signin', user, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());

    dispatch(setAlert('Welcome Home', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Load User

export const loadUser = () => async dispatch => {
  try {
    dispatch(setLoading());

    const token = localStorage.getItem('token');

    if (token) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('auth/currentUser', config);

      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

///////////////////////////////////////////////////////////////////////////////
// Set Loading to true

const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
