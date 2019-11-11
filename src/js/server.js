/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import fs from 'fs';

const app = express();
const path = 'C:\\Projects\\POD\\lab4';

app.use(express.static('dist'));

app.get('/128', (req, res) => {
  res.sendFile('results128.json', { root: path });
});

app.get('/512', (req, res) => {
  res.sendFile('results512.json', { root: path });
});

app.get('/2', (req, res) => {
  res.sendFile('results2.json', { root: path });
});

app.get('/10', (req, res) => {
  res.sendFile('results10.json', { root: path });
});

app.listen(8080, () => {
  console.log('Server started at http://localhost:8080');
});
