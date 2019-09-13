import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost } from '../../actions/postActions';

const PostItem = ({ post, deletePost }) => {
  const { title, slug, body, created_at, created_by, tag, myPost } = post;

  const deleteMentionedPost = slug => {
    const confirm = window.confirm('Are you sure to delete this post ?');
    if (confirm) {
      deletePost(slug);
    }
  };

  return (
    <div style={postItemStyle}>
      <div className='row'>
        <div className='col-md-4'>
          <h3>{title}</h3>
        </div>
        <div className='col-md-4 ml-auto'>
          <div className='row justify-content-between'>
            <div className='col-sm-5'>
              <small>
                <Moment format='YYYY-MM-DD'>{created_at}</Moment>
              </small>
            </div>
            <div className='col-sm-7'>
              {myPost && (
                <Fragment>
                  <Link
                    className='btn btn-sm btn-success'
                    to={`/editPost/${slug}`}
                  >
                    <i className='fas fa-edit'></i> Edit Post
                  </Link>
                  <a
                    href='#!'
                    className='btn btn-danger ml-1'
                    onClick={() => deleteMentionedPost(slug)}
                  >
                    X
                  </a>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <p>{body}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-auto mr-auto'>
          <small>
            Created By: <strong>{created_by}</strong>
          </small>
        </div>
        <div className='col-auto'>
          {myPost ? (
            <span className='badge badge-success'>{tag}</span>
          ) : (
            <span className='badge badge-primary'>{tag}</span>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const postItemStyle = {
  backgroundColor: '#eee',
  boder: '1px solid grey',
  padding: '5px',
  marginBottom: '2px'
};

const mapDispatchToProps = dispatch => ({
  deletePost: slug => dispatch(deletePost(slug))
});

export default connect(
  null,
  mapDispatchToProps
)(PostItem);
