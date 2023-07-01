import React, { useState } from 'react';
import axios from 'axios';
import { Switch } from 'react-router-dom';

const AddDeviceForm = ({ locationId }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const handleAddDevice = async (e) => {
    e.preventDefault();

    const newDevice = {
      serialNumber,
      type,
      status,
    };

    try {
      await axios.post(`/api/locations/${locationId}/devices`, newDevice);
      // Clear form inputs
      setSerialNumber('');
      setType('');
      setStatus('');
      // Optionally, update the location details after adding the device
      // fetchLocation();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add Device</h3>
      <form onSubmit={handleAddDevice}>
        <div>
          <label>Serial Number:</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Add Device</button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
