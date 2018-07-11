/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Login from '../containers/pages/Login';
import Register from '../containers/pages/Register';
import Homepage from '../containers/pages/Homepage';
import History from '../containers/pages/History';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register}/>
          <Route path="/homepage" component={Homepage}/>
          <Route path="/history" component={History}/>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
