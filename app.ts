const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send({
    text: 'Hello World!',
  });
});

app.post('/', (req, res) => {
  const contentType = req.headers['content-type'];
  if (contentType !== 'application/json') {
    return res.status(400).send('Bad Request');
  }

  res.status(201).send(req.body);
});

app.post("/form-urlencoded", (req, res) => {
  const contentType = req.headers['content-type'];
  if (contentType !== 'application/x-www-form-urlencoded') {
    return res.status(400).send('Bad Request');
  }
  console.log(req.body);
  
  
  res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
