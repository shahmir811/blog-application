import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  const { _id, title, slug, body, created_at, created_by, tag, myPost } = post;

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
            <div className='col-sm-6'>
              {myPost && (
                <Link
                  className='btn btn-sm btn-success'
                  to={`/editPost/${slug}`}
                >
                  <i className='fas fa-edit'></i> Edit Post
                </Link>
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
  post: PropTypes.object.isRequired
};

const postItemStyle = {
  backgroundColor: '#eee',
  boder: '1px solid grey',
  padding: '5px',
  marginBottom: '2px'
};

export default PostItem;
