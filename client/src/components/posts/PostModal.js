import React from 'react';
import { connect } from 'react-redux';

import { clearViewPost } from '../../actions/postActions';
import PropTypes from 'prop-types';

const PostModal = ({ post, clearViewPost }) => {
  const { title, body, image } = post;

  return (
    <div
      className='modal fade'
      id='viewPost'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='viewPostLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title text-center' id='viewPostLabel'>
              {title}
            </h5>
            <a
              className='close'
              data-dismiss='modal'
              aria-label='Close'
              href='#!'
              onClick={() => clearViewPost()}
            >
              <span aria-hidden='true'>&times;</span>
            </a>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                {image && (
                  <img
                    src={image}
                    alt='Post'
                    style={{ width: '150px', height: '120px' }}
                  />
                )}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <p>{body}</p>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <a
              className='btn btn-secondary'
              data-dismiss='modal'
              href='#!'
              onClick={() => clearViewPost()}
            >
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

///////////////////////////// propTypes //////////////////////////////////
PostModal.propTypes = {
  clearViewPost: PropTypes.func.isRequired,
  post: PropTypes.object
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  post: state.post.selectedPost ? state.post.selectedPost[0] : {}
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  clearViewPost: () => dispatch(clearViewPost())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal);
