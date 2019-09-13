import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editPost } from '../../actions/postActions';
import PostForm from './PostForm';

const EditPost = ({ match, editPost, post, history }) => {
  useEffect(() => {
    editPost(match.params.slug);
    // eslint-disable-next-line
  }, []);

  const moveBackToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {post && (
        <PostForm comingPost={post} moveBack={() => moveBackToDashboard()} />
      )}
    </div>
  );
};

///////////////////////////// propTypes //////////////////////////////////
EditPost.propTypes = {
  editPost: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  post: state.post.selectedPost ? state.post.selectedPost[0] : null
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  editPost: slug => dispatch(editPost(slug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
