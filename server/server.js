const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/locationdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define Location schema
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  devices: [
    {
      serialNumber: { type: String, required: true },
      type: { type: String, enum: ['pos', 'kiosk', 'signage'], required: true },
      image: String,
      status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    },
  ],
});

const Location = mongoose.model('Location', locationSchema);

// Middleware
app.use(express.json());

// Get all locations
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single location with devices
app.get('/locations/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new location
app.post('/locations', async (req, res) => {
  try {
    const newLocation = req.body;
    const location = await Location.create(newLocation);
    res.status(201).json(location);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Add device to a location
app.post('/locations/:id/devices', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location) {
      const newDevice = req.body;
      location.devices.push(newDevice);
      const updatedLocation = await location.save();
      res.status(201).json(updatedLocation);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Remove device from a location
app.delete('/locations/:locationId/devices/:deviceId', async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (location) {
      const deviceIndex = location.devices.findIndex(
        (device) => device.serialNumber === req.params.deviceId
      );
      if (deviceIndex !== -1) {
        location.devices.splice(deviceIndex, 1);
        const updatedLocation = await location.save();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Device not found' });
      }
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
