import React from 'react';

const NotFound = props => {
  return (
    <div className='mt-5'>
      <h1 className='x-large text-primary text-center'>
        <i className='fas fa-exclamation-triangle' /> Page not found
      </h1>

      <p className='large text-center'>Sorry, this page does not exits</p>
    </div>
  );
};

export default NotFound;
