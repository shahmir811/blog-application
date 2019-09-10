import axios from 'axios';
import { ALL_POSTS, LOADING_POSTS, POST_ERROR } from './types';

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
// loading posts
const loadingPosts = () => {
  return {
    type: LOADING_POSTS
  };
};
