import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllPosts } from '../../actions/postActions';
import PostItem from './PostItem';
import Spinner from '../layouts/Spinner';

const PostList = ({ getAllPosts, post }) => {
  const { posts, loading } = post;

  useEffect(() => {
    getAllPosts();
    // eslint-disble-next-line
  }, [getAllPosts]);

  const renderPosts = () => {
    if (posts !== null && posts.length > 0 && !loading) {
      return posts.map(post => <PostItem key={post._id} post={post} />);
    } else {
      return <Spinner />;
    }
  };

  return <Fragment>{renderPosts()}</Fragment>;
};

///////////////////////////// propTypes //////////////////////////////////
PostList.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  post: state.post
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
