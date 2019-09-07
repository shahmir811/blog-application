import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Alerts from '../layouts/Alerts';
import NotFound from '../layouts/NotFound';
import PrivateRoute from './PrivateRoute';
import PostList from '../posts/PostList';

const Routes = () => {
  return (
    <section className='container'>
      <Alerts />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/posts' component={PostList} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
