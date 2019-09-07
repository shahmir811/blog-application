import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/authActions';

const Navbar = ({ isAuthenticated, logout, name }) => {
  const renderTopLinks = () => {
    if (isAuthenticated) {
      return (
        <Fragment>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='#!'
              id='navbarDropdownMenuLink'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i className='fa fa-user'></i> Hello {name}
            </a>
            <div
              className='dropdown-menu'
              aria-labelledby='navbarDropdownMenuLink'
            >
              <a className='dropdown-item' href='#!' onClick={() => logout()}>
                <i className='fas fa-sign-out-alt'></i> Logout
              </a>
              {/* <a className='dropdown-item' href='#!'>
                  Another action
                </a>
                <a className='dropdown-item' href='#!'>
                  Something else here
                </a> */}
            </div>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              Register
            </Link>
          </li>
        </Fragment>
      );
    }
  };

  return (
    <nav className='navbar navbar-expand-lg top-main-nav'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Blog
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav ml-auto'>{renderTopLinks()}</ul>
        </div>
      </div>
    </nav>
  );
};

///////////////////////////// propTypes //////////////////////////////////
Navbar.protoType = {
  isAuthenticated: PropTypes.bool.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  name: state.auth.user ? state.auth.user.name : ''
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
