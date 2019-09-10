import {
  LOADING_TAGS,
  ALL_TAGS,
  SELECTED_TAG,
  TAGS_ERROR
} from '../actions/types';

const initialState = {
  tags: null,
  selectedTag: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_TAGS:
      return { ...state, tags: payload, loading: false, error: null };

    case SELECTED_TAG:
      return { ...state, selectedTag: payload };

    case TAGS_ERROR:
      return { ...state, error: payload };

    case LOADING_TAGS:
      return { ...state, loading: true };

    default:
      return state;
  }
};
