import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Alerts from '../layouts/Alerts';
import NotFound from '../layouts/NotFound';
import PrivateRoute from './PrivateRoute';
import PostList from '../posts/PostList';
import Dashboard from '../dashboard/Dashboard';
import createTag from '../tags/createTag';
import createPost from '../posts/createPost';

const Routes = () => {
  return (
    <section className='container'>
      <Alerts />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        {/* PrivateRoute */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/createTag' component={createTag} />
        <PrivateRoute exact path='/createPost' component={createPost} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
