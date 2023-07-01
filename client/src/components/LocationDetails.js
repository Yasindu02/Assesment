
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Switch } from 'react-router-dom';

function LocationDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    axios
      .get(`/locations/${id}`)
      .then((res) => setLocation(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!location) {
    return <div>Loading...</div>;
  }

  const handleRemoveDevice = (deviceId) => {
    axios
      .delete(`/locations/${id}/devices/${deviceId}`)
      .then(() => {
        setLocation((prevLocation) => {
          const updatedDevices = prevLocation.devices.filter(
            (device) => device.serialNumber !== deviceId
          );
          return { ...prevLocation, devices: updatedDevices };
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>{location.name}</h1>
      <p>Address: {location.address}</p>
      <p>Phone: {location.phone}</p>
      <h2>Devices</h2>
      <ul>
        {location.devices.map((device) => (
          <li key={device.serialNumber}>
            Serial Number: {device.serialNumber}, Type: {device.type}
            <button onClick={() => handleRemoveDevice(device.serialNumber)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Locations</Link>
    </div>
  );
}

export default LocationDetails;
