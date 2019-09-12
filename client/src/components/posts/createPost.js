import React, { Fragment } from 'react';

import PostForm from './PostForm';

const CreatePost = ({ history }) => {
  const moveBackToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <Fragment>
      <PostForm moveBack={() => moveBackToDashboard()} />
    </Fragment>
  );
};

export default CreatePost;
