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
} from '../actions/types';

const initialState = {
  posts: null,
  loading: false,
  error: null,
  selectedPost: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
        selectedPost: null
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
        error: null
      };

    case EDIT_POST:
    case VIEW_POST:
      return {
        ...state,
        selectedPost: state.posts.filter(post => post.slug === payload)
      };

    case CLEAR_VIEW_POST:
      return { ...state, selectedPost: null };

    case UPDATE_POST:
      return { ...state, loading: false, selectedPost: null };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.slug !== payload),
        loading: false
      };

    case LOADING_POSTS:
      return { ...state, loading: true };

    case POST_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
};
