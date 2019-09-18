import axios from 'axios';
import {
  LOADING_TAGS,
  ALL_TAGS,
  SELECTED_TAG,
  TAGS_ERROR,
  ADD_TAG
} from './types';

import { setAlert } from './alertActions';

///////////////////////////////////////////////////////////////////////////////
// Get all tags
export const all_tags = () => async (dispatch, getState) => {
  try {
    dispatch(loadingTags());

    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get('/tags', config);

    dispatch({
      type: ALL_TAGS,
      payload: response.data.tags
    });

    const id = response.data.tags[0]._id;

    dispatch(updateSelectedTag(id));
  } catch (error) {
    dispatch({
      type: TAGS_ERROR,
      payload: error.response.data
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// Add new tag
export const addNewTag = tag => async (dispatch, getState) => {
  try {
    dispatch(loadingTags());

    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post('/tags/create', { name: tag }, config);

    dispatch({
      type: ADD_TAG,
      payload: response.data.createdTag
    });

    dispatch(setAlert('New tag created successfully', 'success'));
  } catch (error) {
    dispatch({
      type: TAGS_ERROR,
      payload: error.response.data
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
// set selected tag
export const updateSelectedTag = id => dispatch => {
  dispatch({
    type: SELECTED_TAG,
    payload: id
  });
};

///////////////////////////////////////////////////////////////////////////////
// tags loading to get tags from backend
const loadingTags = () => {
  return {
    type: LOADING_TAGS
  };
};
