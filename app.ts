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
  const name = req.body.name;

  res.status(201).send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
