import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import store from './store';
import Navbar from './components/layouts/Navbar';
import Alerts from './components/layouts/Alerts';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alerts />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
