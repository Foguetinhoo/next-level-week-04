import React from 'react';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/index";
import New from "./pages/New/index";
import Register from "./pages/Register/index";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/new" component={New} />
              <Route path='*' component={Dashboard} />
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
