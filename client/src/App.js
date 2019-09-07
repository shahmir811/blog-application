import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Routes from './components/routing/Routes';
import store from './store';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';

import { loadUser } from './actions/authActions';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
