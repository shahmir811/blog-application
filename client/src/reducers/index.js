import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import tag from './tagReducer';
import post from './postReducer';

export default combineReducers({
  default: () => 'Hello',
  auth,
  tag,
  alert,
  post
});
