import axios from 'axios';
import { ALL_POSTS, LOADING_POSTS, POST_ERROR, ADD_POST } from './types';

import { setAlert } from './alertActions';

///////////////////////////////////////////////////////////////////////////////
// Get all posts
export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch(loadingPosts());

    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get('/posts', config);

    dispatch({
      type: ALL_POSTS,
      payload: response.data.posts
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Add new post
export const addPost = post => async (dispatch, getState) => {
  try {
    dispatch(loadingPosts());

    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post('/posts', post, config);

    dispatch({
      type: ADD_POST,
      payload: response.data.post
    });

    setAlert('New post added', 'success');
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// loading posts
const loadingPosts = () => {
  return {
    type: LOADING_POSTS
  };
};
