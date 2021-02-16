const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("dotenv").config();

const createStockRouter = function () {

  const stockRouter = express.Router();

  //This is the API data 

  stockRouter.get('/index/ftse', (req, res ) =>{
    const url = `https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json`; 

    fetch(url)
      .then(jsonData => jsonData.json())
      .then(data => res.json(data));
    }, [])


    stockRouter.get('/company/:symbol', (req, res ) =>{
    const symbol = req.params.symbol
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=demo`; 
  
    fetch(url)
      .then(jsonData => jsonData.json())
      .then(data => res.json(data));
    }, [])

    
    return stockRouter
};


module.exports = createStockRouter;

