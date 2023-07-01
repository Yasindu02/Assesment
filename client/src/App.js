
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import LocationList from './components/LocationList';
import LocationDetails from './components/LocationDetails';
import AddDeviceForm from './components/AddDeviceForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Locations</Link>
            </li>
            <li>
              <Link to="/locations/new">Create Location</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={LocationList} />
          <Route exact path="/locations/:id" component={LocationDetails} />
          <Route exact path="/locations/new" component={AddDeviceForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
