import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addNewTag } from '../../actions/tagActions';

const CreateTag = ({ addNewTag, history }) => {
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');

  const onChange = e => {
    setTag(e.target.value);
  };

  const submitForm = e => {
    e.preventDefault();

    if (tag === '') {
      setError('Must enter tag name');

      setTimeout(() => {
        setError('');
      }, 5000);

      return;
    }

    addNewTag(tag);
    setTag('');
    history.push('/dashboard');
  };

  return (
    <div className='mt-3'>
      <h1 className='text-center'>Create new tag</h1>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <form action='' onSubmit={e => submitForm(e)}>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Tag Name</label>
              <input
                type='text'
                className='form-control'
                id='tag'
                name='tag'
                onChange={e => onChange(e)}
              />
              <small
                id='emailHelp'
                className='form-text'
                style={{ color: 'red' }}
              >
                <strong>{error && error}</strong>
              </small>
            </div>
            <div>
              <button type='submit' className='btn btn-success'>
                <i className='fas fa-save'></i> Create
              </button>
            </div>
          </form>
          <Link className='btn btn-danger mt-1' to='/dashboard'>
            <i className='fas fa-ban'></i> Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

CreateTag.propTypes = {
  addNewTag: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addNewTag: tag => dispatch(addNewTag(tag))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateTag);
