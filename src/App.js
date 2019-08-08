import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

import "./App.css";
import "./style/sass/style.css";

const routing = (
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

const App = () => {
  return routing;
};

export default App;
