import React from 'react';
import { Link } from 'react-router-dom';

import PostList from '../posts/PostList';
import TagList from '../tags/TagList';

const Dashboard = () => {
  return (
    <div className='mt-5'>
      <h1>Dashboard component</h1>
      <hr />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <select
            name='postSearch'
            id='postSearch'
            className='form-control text-center'
          >
            <option value='all'>All</option>
            <option value='my'>My Posts</option>
          </select>
        </div>
      </div>
      <br />

      <div className='row'>
        <div className='col-md-3'>
          <Link to='/createTag' className='btn btn-sm btn-success mb-3'>
            <i className='fas fa-plus-circle'></i> New Tag
          </Link>

          <div style={tagsStyle}>
            <h3 className='text-center'>All tags list</h3>
            <TagList />
          </div>
        </div>
        <div className='col-md-9'>
          <Link to='/createPost' className='btn btn-sm btn-success mb-3'>
            <i className='fas fa-plus-circle'></i> New Post
          </Link>
          <PostList />
        </div>
      </div>
    </div>
  );
};

const tagsStyle = {
  backgroundColor: '#ddd',
  boder: '1px solid black',
  padding: '5px'
};

const postStyle = {
  padding: '5px'
};

export default Dashboard;
