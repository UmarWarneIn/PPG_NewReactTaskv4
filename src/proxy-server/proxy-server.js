const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3001; // You can use any port you prefer

app.use(cors());

app.get('/fetchData', async (req, res) => {
  try {
    const response = await fetch('https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${3000}`);
});
