
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get('/locations')
      .then((res) => setLocations(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location._id}>
            <Link to={`/locations/${location._id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
