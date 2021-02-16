const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); 

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/positions_router.js')

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('portfolio');
    const positionsCollection = db.collection('positions');
    const positionsRouter = createRouter(positionsCollection);
    app.use('/api/positions', positionsRouter);
    
  })
  .catch(console.err);

const createStockRouter = require('./helpers/stock_router.js')
const stockRouter = createStockRouter();
app.use('/api/stock', stockRouter);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});