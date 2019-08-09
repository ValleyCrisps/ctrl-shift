import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import Home from './components/Home/Home';
import Shifts from './components/Shifts/Shifts';
import Availabilities from './components/Availabilities/Availabilities';
import Agents from './components/Agents/Agents';
import NotFound from './components/NotFound';

import './App.css';
import './style/sass/style.css';

const routing = (
  <BrowserRouter>
    <div className="app">
      <AppNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shifts" component={Shifts} />
        <Route path="/availabilities" component={Availabilities} />
        <Route path="/agents" component={Agents} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

const App = () => {
  return routing;
};

export default App;
