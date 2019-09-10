import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='jumbotron mt-5'>
      <h1 className='display-4 text-center'>Welcome to Blog App!</h1>
      <p className='lead'>
        This is a simple blog website where we can view our blog posts created
        by other users. We can learn from there life experiences and that will
        help alot in reshaping our lives.
      </p>
      <hr className='my-4' />
      <p>
        Users that are already our site members, log in to see all blog posts
        and others are requested to register first.
      </p>
      <Link className='btn btn-success btn-lg mr-3' to='/login'>
        <i className='fas fa-sign-in-alt'></i> Login
      </Link>
      <Link className='btn btn-primary btn-lg' to='/register'>
        <i className='fas fa-user-plus'></i> Register
      </Link>
    </div>
  );
};

//////////////////////////////// propTypes /////////////////////////////
Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

//////////////////////////////// mapStateToProps /////////////////////////////
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Home);
