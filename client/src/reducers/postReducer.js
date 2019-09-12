import {
  ALL_POSTS,
  LOADING_POSTS,
  POST_ERROR,
  ADD_POST
} from '../actions/types';

const initialState = {
  posts: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_POSTS:
      return { ...state, posts: payload, loading: false, error: null };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
        error: null
      };

    case LOADING_POSTS:
      return { ...state, loading: true };

    case POST_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
};
