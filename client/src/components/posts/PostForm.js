import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPost, updatePost } from '../../actions/postActions';

const PostForm = props => {
  const { tags, addPost, moveBack, comingPost, updatePost } = props;

  const [post, setPost] = useState({
    title: comingPost ? comingPost.title : '',
    body: comingPost ? comingPost.body : '',
    tagId: comingPost ? comingPost.tagId : ''
  });

  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [tagError, setTagError] = useState('');

  const { title, body, tagId } = post;

  const onChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();

    setTitleError('');
    setBodyError('');
    setTagError('');

    if (title === '') {
      setTitleError('Title is required');
    }

    if (body === '') {
      setBodyError('Enter some details about this title');
    }

    if (tagId === '') {
      setTagError('Select tag from drop down');
    }

    if (title !== '' && body !== '' && tagId !== '') {
      const newPost = {
        title,
        body,
        tagId
      };

      comingPost ? updatePost(newPost) : addPost(newPost);
      moveBack();
    }
  };

  const renderTags = () => {
    if (tags && tags.length > 0) {
      return tags.map(tag => (
        <option value={tag._id} key={tag._id}>
          {tag.name}
        </option>
      ));
    }
  };

  return (
    <div>
      <h1 className='text-center'>{comingPost ? 'Edit' : 'Create'} Post</h1>
      <form onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className={
              titleError !== '' ? 'form-control is-invalid' : 'form-control'
            }
            id='title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
          <small id='titleError' className='form-text' style={{ color: 'red' }}>
            <strong>{titleError && titleError}</strong>
          </small>
        </div>

        <div className='form-group'>
          <label htmlFor='title'>Body</label>
          <textarea
            name='body'
            id='body'
            cols='30'
            rows='10'
            className={
              bodyError !== '' ? 'form-control is-invalid' : 'form-control'
            }
            value={body}
            onChange={e => onChange(e)}
            placeholder='Enter details about this title'
          ></textarea>
          <small id='bodyError' className='form-text' style={{ color: 'red' }}>
            <strong>{bodyError && bodyError}</strong>
          </small>
        </div>

        <div className='form-group'>
          <label htmlFor='tagId'>Tag</label>
          <select
            name='tagId'
            id='tagId'
            value={tagId}
            className={
              tagError !== '' ? 'form-control is-invalid' : 'form-control'
            }
            onChange={e => onChange(e)}
          >
            <option value='' disabled>
              Select Tag
            </option>
            {renderTags()}
          </select>
          <small id='tagError' className='form-text' style={{ color: 'red' }}>
            <strong>{tagError && tagError}</strong>
          </small>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            <i className='fas fa-save'></i> {comingPost ? 'Edit' : 'Create'}
          </button>
        </div>
      </form>
      <Link className='btn btn-danger mt-1' to='/dashboard'>
        <i className='fas fa-ban'></i> Cancel
      </Link>
    </div>
  );
};

PostForm.defaultProps = {
  comingPost: null
};

///////////////////////////// propTypes //////////////////////////////////
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  tags: state.tag.tags
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  addPost: newPost => dispatch(addPost(newPost)),
  updatePost: post => dispatch(updatePost(post))
});

///////////////////////////// propTypes //////////////////////////////////

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
