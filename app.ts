const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));

//リクエストをパースするwebサーバーを作成する

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

//サードパーティクッキーについて理解する

app.use((req, res, next) => { 
  const referrer = req.header("referer");
  res.locals.referrer = referrer;
  console.log(req.cookies);
  next();
},
  express.static('public', {
    
    setHeaders: (res, path) => {
      res.cookie("id", 1, {
        sameSite: "none",
        secure: true
      });
      res.cookie("website", res.locals.referrer, {
        sameSite: "none",
        secure: true
      })
    }
})
);

const siteA = express();
siteA.use(express.static('public-a'));
siteA.listen(8081, () => {
  console.log('Site A listening on port 8081');
});

const siteB = express();
siteB.use(express.static('public-b'));
siteB.listen(8082, () => {
  console.log('Site B listening on port 8082');
});

// CORSについて学ぶ
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
  methods: ['GET','POST']
}

app.options('/cors1', cors(corsOptions))

app.post("/cors1", cors(corsOptions), (req, res) => {  
  res.status(200).json({
    message: 'recieved response from another domain with cors'
  });
});

app.get("/cors2", cors(corsOptions), (req, res) => {  
  res.set('Content-Type', 'text/plain');
  res.send('recieved response from another origin without cors');
});
