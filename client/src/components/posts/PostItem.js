import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PostItem = ({ post }) => {
  const { _id, title, slug, body, created_at, created_by, tag, myPost } = post;

  return (
    <div style={postItemStyle}>
      <div className='row'>
        <div className='col-md-4'>
          <h3>{title}</h3>
        </div>
        <div className='col-md-4 ml-auto'>
          <small>
            <Moment format='YYYY-MM-DD'>{created_at}</Moment>
          </small>
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
