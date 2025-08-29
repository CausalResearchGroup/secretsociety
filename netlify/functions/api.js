const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

let storedPayloads = [];

app.post('/robotdata', (req, res) => {
  const { cid, artifacts, payload } = req.body;
  if (!cid || !artifacts || !payload) {
    return res.status(400).json({ error: 'Missing data' });
  }
  storedPayloads.push({ cid, artifacts, payload, receivedAt: new Date().toISOString() });
  res.json({ success: true, message: 'Data stored' });
});

app.get('/robotdata', (req, res) => {
  res.json(storedPayloads);
});

module.exports.handler = serverless(app);
