const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  const contentType = req.headers['content-type'];
  if (contentType !== 'application/json') {
    return res.status(400).send('Bad Request');
  }

  res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
