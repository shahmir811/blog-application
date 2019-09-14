import axios from 'axios';
import {
  ALL_POSTS,
  LOADING_POSTS,
  POST_ERROR,
  ADD_POST,
  EDIT_POST,
  UPDATE_POST,
  DELETE_POST,
  VIEW_POST,
  CLEAR_VIEW_POST
} from './types';

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
// View Post
export const viewPost = slug => dispatch => {
  dispatch({
    type: VIEW_POST,
    payload: slug
  });
};

///////////////////////////////////////////////////////////////////////////////
// Clear View Post
export const clearViewPost = () => dispatch => {
  dispatch({
    type: CLEAR_VIEW_POST
  });
};

///////////////////////////////////////////////////////////////////////////////
// Edit post
export const editPost = slug => dispatch => {
  dispatch({
    type: EDIT_POST,
    payload: slug
  });
};

///////////////////////////////////////////////////////////////////////////////
// Edit post
export const updatePost = post => async (dispatch, getState) => {
  try {
    dispatch(loadingPosts());

    const token = getState().auth.token;
    const id = getState().post.selectedPost[0]._id;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const record = {
      title: post.title,
      body: post.body,
      tagId: post.tagId
    };

    await axios.put(`/posts/${id}`, record, config);

    dispatch({
      type: UPDATE_POST
    });

    setAlert('Post details updated', 'success');
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Delete post
export const deletePost = slug => async (dispatch, getState) => {
  try {
    dispatch(loadingPosts());

    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`/posts/${slug}`, config);

    dispatch({
      type: DELETE_POST,
      payload: slug
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
